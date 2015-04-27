using Microsoft.LightSwitch;
using Microsoft.LightSwitch.Security.Server;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Security;
using System.Text;
using System.Web;

namespace LightSwitchApplication
{
    public class PhotoListHelper
    {
        public static void UpdatePhotoProperty(string photoUri, string stockNo, ClientContext siteContext)
        {
            Web web = siteContext.Web;
            siteContext.Load(web);//, webSite => webSite.Title);

            siteContext.ExecuteQuery();

            CamlQuery caml = new CamlQuery();
            List list = siteContext.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["Ida:SPPicLib"]);
            ListItemCollection items = list.GetItems(caml);

            siteContext.Load<List>(list);
            siteContext.Load<ListItemCollection>(items);
            siteContext.ExecuteQuery();

            // Delete the old picture item
            foreach (ListItem item in items)
            {
                if (!string.IsNullOrEmpty((string)(item["StockNo"])))
                {
                    string tempStockNo = item["StockNo"].ToString();
                    if (tempStockNo.Equals(stockNo))
                    {
                        item.DeleteObject();
                        siteContext.ExecuteQuery();
                        break;
                    }
                }
            }

            // Update the new picture item
            foreach (ListItem item in items)
            {
                string fullImageName = item["FileLeafRef"].ToString();
                string thumbnailName = fullImageName.Replace('.', '_') + ".jpg";

                if (photoUri.Contains(fullImageName))
                {
                    item["StockNo"] = stockNo;
                    item["Description"] = stockNo;
                    item["FullImageUrl"] = photoUri;
                    item["ThumbnailUrl"] = photoUri.Replace(fullImageName, "_t/" + thumbnailName);
                    item.Update();
                    siteContext.ExecuteQuery();
                    break;
                }
            }
        }

        public static string AddPhoto(byte[] fileData, string name,  ClientContext siteContext)
        {
            if (fileData == null || fileData.Length <= 0)
                throw new ArgumentNullException("fileData");
            if (string.IsNullOrEmpty(name))
                throw new ArgumentNullException("name");
            if (siteContext == null)
                throw new InvalidOperationException("Could not retrieve the Sharepoint context");

            Web appWeb = siteContext.Web;
            ListCollection webLists = appWeb.Lists;
            List appPicList = webLists.GetByTitle(ConfigurationManager.AppSettings["Ida:SPPicLib"]);
            Folder appPicListFolder = appPicList.RootFolder;
            FileCollection appPicListPictures = appPicListFolder.Files;

            FileCreationInformation createPicFileInfo = new FileCreationInformation();
            createPicFileInfo.Content = fileData;
            createPicFileInfo.Url = String.Format("{0:yyyy-MM-dd_hh-mm-ss-tt}", DateTime.Now) + "_" + name;
            createPicFileInfo.Overwrite = true;

            try
            {
                Microsoft.SharePoint.Client.File file = appPicListPictures.Add(createPicFileInfo);
                siteContext.Load(file);
                siteContext.Load(siteContext.Web);
                siteContext.ExecuteQuery();

                string relativePhotoPathUri = file.ServerRelativeUrl;
                string photoPathUri = new Uri(new Uri(siteContext.Web.Url), relativePhotoPathUri).AbsoluteUri;
                return photoPathUri;
            }
            catch (Exception e)
            {
                // Some browsers do not handle Http errors returned from POST request gracefully (IE, for example),
                // so we're sticking the error message in the result.  
                return @"FAILED::" + e.Message;
            }

        }
    }
}