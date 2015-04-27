using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace AADAuthLib
{
    public class AuthUtil
    {
        private static AuthUtil _instance = new AuthUtil();
        private static ClientCredential _clientCredential = new ClientCredential(ConfigurationManager.AppSettings["ida:ClientId"], ConfigurationManager.AppSettings["ida:ClientSecret"]);
        private static AuthenticationContext _authContext = new AuthenticationContext("https://login.windows.net/common/" + ConfigurationManager.AppSettings["ida:TenantId"]);

        public static AuthUtil Instance
        {
            get { return _instance; }
        }

        public string AuthCodeUrl
        {
            get
            {
                return string.Format("https://login.windows.net/{0}/oauth2/authorize?response_type=code&redirect_uri={1}&client_id={2}&state={3}",
                    ConfigurationManager.AppSettings["ida:TenantId"],
                    ConfigurationManager.AppSettings["ida:RedirectUrl"],
                    ConfigurationManager.AppSettings["ida:ClientId"],
                    Guid.NewGuid().ToString());
            }
        }

        public bool IsAuthorized
        {
            get { return !string.IsNullOrEmpty(RefreshToken); }
        }

        public bool AcquireTokenFromAuthCode(string authCode, string redirectUrl = "redirectUrl")
        {
            if (!IsAuthorized && !string.IsNullOrEmpty(authCode))
            {
                AuthenticationResult authResult = _authContext.AcquireTokenByAuthorizationCode(authCode,
                    new Uri(ConfigurationManager.AppSettings["ida:" + redirectUrl]),
                    _clientCredential,
                    ConfigurationManager.AppSettings["ida:ResourceUrl"]);

                HttpContext.Current.Session["RefreshToken"] = authResult.RefreshToken;
                HttpContext.Current.Session["AccessToken-" + ConfigurationManager.AppSettings["ida:ResourceUrl"]] = new Tuple<string, DateTimeOffset>(authResult.AccessToken, authResult.ExpiresOn);
                HttpContext.Current.Session["SignedInUserId"] = authResult.UserInfo.UserId;

                return true;
            }

            return false;
        }

        public string GetAuthorizeUrl(string hostType, string redirectUrl = "redirectUrl")
        {
            return string.Format("https://login.windows.net/{0}/oauth2/authorize?response_type=code&redirect_uri={1}&client_id={2}&state={3}",
                ConfigurationManager.AppSettings["ida:TenantId"],
                ConfigurationManager.AppSettings["ida:" + redirectUrl],
                ConfigurationManager.AppSettings["ida:ClientId"],
                Guid.NewGuid().ToString());
        }

        public string AccessToken
        {
            get
            {
                if (!IsAuthorized) throw new UnauthorizedAccessException();

                var accessToken = HttpContext.Current.Session["AccessToken-" + ConfigurationManager.AppSettings["ida:ResourceUrl"]] as Tuple<string, DateTimeOffset>;

                if (IsAccessTokenValid(accessToken))
                {
                    return accessToken.Item1;
                }

                accessToken = RenewAccessToken();
                HttpContext.Current.Session["AccessToken-" + ConfigurationManager.AppSettings["ida:ResourceUrl"]] = accessToken;

                return accessToken.Item1;
            }
        }

        public string RefreshToken
        {
            get { return HttpContext.Current.Session["RefreshToken"] as string; }
        }

        public string SignedInUserId
        {
            get { return HttpContext.Current.Session["SignedInUserId"] as string; }
        }

        private AuthUtil() { }

        private Tuple<string, DateTimeOffset> RenewAccessToken()
        {
            AuthenticationResult authResult = _authContext.AcquireTokenByRefreshToken(RefreshToken,
                ConfigurationManager.AppSettings["ida:ClientId"],
                _clientCredential,
                ConfigurationManager.AppSettings["ida:ResourceUrl"]);

            return new Tuple<string, DateTimeOffset>(authResult.AccessToken, authResult.ExpiresOn);
        }

        private bool IsAccessTokenValid(Tuple<string, DateTimeOffset> accessToken)
        {
            return accessToken != null &&
                !string.IsNullOrEmpty(accessToken.Item1) &&
                accessToken.Item2 > DateTimeOffset.UtcNow;
        }
    }
}
