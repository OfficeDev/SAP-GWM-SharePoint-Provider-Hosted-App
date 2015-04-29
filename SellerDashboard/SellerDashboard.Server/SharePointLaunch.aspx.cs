// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

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
