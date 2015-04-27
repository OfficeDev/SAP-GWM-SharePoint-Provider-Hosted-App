using AADAuthLib;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace LightSwitchApplication
{
    public partial class SharePointLaunch : Microsoft.LightSwitch.Framework.Server.SharePointLaunchBase
    {
        private static readonly string AccountToStoreRefreshToken = ConfigurationManager.AppSettings["Ida:AccountToStoreRefreshToken"];

        protected override void Page_Load(object sender, EventArgs e)
        {
            // The following code gets the client context and Title property by using TokenHelper.
            // To access other properties, the app may need to request permissions on the host web.
            if (!IsPostBack)
            {
                SharePointContext spContext = SharePointContextProvider.Current.GetSharePointContext(Context);
                if (spContext != null)
                {
                    _spContext = spContext;
                }

                AuthUtil.Instance.AcquireTokenFromAuthCode(Request.QueryString["code"]);

                if (!AuthUtil.Instance.IsAuthorized)
                {
                    Response.Redirect(AuthUtil.Instance.AuthCodeUrl);
                }
            }

            base.Page_Load(sender, e);
        }

        static public ClientContext getAppWebContext()
        {
            return _spContext.CreateAppOnlyClientContextForSPHost();
        }

        static private SharePointContext _spContext = null;
    }
}