// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
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
//********************************************************* 
// 
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// ""Software""), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// 
//********************************************************* 

