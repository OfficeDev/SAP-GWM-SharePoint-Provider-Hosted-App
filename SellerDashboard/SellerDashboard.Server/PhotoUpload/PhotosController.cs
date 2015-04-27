using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Net;
using System.Web.Http;
using LightSwitchApplication;
using Microsoft.SharePoint.Client;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

public class PhotosController : ApiController
{


    private ClientContext appWebContext;
    private ClientContext AppWebContext
    {
        get
        {
            if (appWebContext == null)
            {
                appWebContext = SharePointLaunch.getAppWebContext();
            }
            return appWebContext;
        }
    }

    public Task<HttpResponseMessage> PostFormData()
    {
        if (!Request.Content.IsMimeMultipartContent())
        {
            throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
        }

        // Since we're uploading the image to Sharepoint directly, we'll just read the Http content into memory
        var memoryStream = new MultipartMemoryStreamProvider();
        // We need to get the appweb context before forking the new task; otherwise the LightSwitch runtime will 
        // throw because there is no HttpContext available on the calling thread.
        var sharepointContext = this.AppWebContext;
        var task = Request.Content.ReadAsMultipartAsync(memoryStream).
            ContinueWith<HttpResponseMessage>(t =>
            {
                if (t.IsFaulted || t.IsCanceled)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, t.Exception);
                }

                StringBuilder fileList = new StringBuilder();
                // We use form transfer the StockNo, wihich will used to do the data mapping with the SAP data source
                // memoryStrem.Contents[0] is the picture, which would be uploaded
                // memoryStrem.Contents[1] is the StockNo, which would be used for data mapping
                if (memoryStream.Contents.Count == 2)
                {
                    var sourceFileName = Path.GetFileName(memoryStream.Contents[0].Headers.ContentDisposition.FileName.Replace("\"", ""));
                    var stockNo = memoryStream.Contents[1].Headers.ContentDisposition.Name.Replace("\"", "");

                    try
                    {
                        // Read the contents of the file into memory and upload it to Sharepoint
                        var fileReadTask = memoryStream.Contents[0].ReadAsByteArrayAsync().
                            ContinueWith<string>(frt =>
                            {
                                var photoURL = PhotoListHelper.AddPhoto(frt.Result, sourceFileName, sharepointContext);
                                PhotoListHelper.UpdatePhotoProperty(photoURL, stockNo, sharepointContext);
                                return photoURL;
                            });
                        fileReadTask.Wait();
                        fileList.AppendLine(fileReadTask.Result);
                    }
                    catch (Exception ex)
                    {
                        fileList.AppendLine(@"FAILED::" + ex.Message);
                    }
                }

                return Request.CreateResponse(HttpStatusCode.Created, fileList.ToString(), new MediaTypeHeaderValue("application/xml"));
            });

        return task;
    }
}