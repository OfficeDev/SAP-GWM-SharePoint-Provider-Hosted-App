// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
using AADAuthLib;
using CarInventoryBoxXDataOperation.Util;
using CarInventoryModel;
using Microsoft.Data.Edm;
using Microsoft.Data.OData;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;

namespace CarInventoryBoxXDataOperation.Util
{
    public static class BoxXDataCRUDHelpers
    {
        // Public method
        public static string MetadataUrl
        {
            get 
            {
                return ConfigurationManager.AppSettings["Ida:ODataServiceMetadataUrl"];
            }
        }

        public static string DataCollectionUrl
        {
            get 
            {
                return ConfigurationManager.AppSettings["Ida:ODataServiceBaseUrl"]
                     + ConfigurationManager.AppSettings["Ida:DataCollection"];
            }
        }

        public static string DefaultID
        {
            get
            {
                return ConfigurationManager.AppSettings["Ida:DefaultID"];
            }
        }

        public static IEdmModel GetMetadata(string uri)
        {
            var requestMessage = new ODataClientRequestMessage(new Uri(uri), ODataConstants.MethodGet);
            GetMetadataRequestHeaderSetter(requestMessage, AuthUtil.Instance.AccessToken);

            using (var messageReader = new ODataMessageReader(requestMessage.GetResponse()))
            {
                return messageReader.ReadMetadataDocument();
            }
        }

        public static void GetFeedOrEntryRequsetHeaderSetter(ODataClientRequestMessage requestMessage, string accessToken)
        {
            ODataCRUDHeaderSetter(requestMessage, accessToken);
        }

        public static void CreateEntryRequestHeaderSetter(ODataClientRequestMessage requestMessage, string accessToken)
        {
            ODataCRUDHeaderSetter(requestMessage, accessToken);
            requestMessage.SetHeader("ContentType", ConfigurationManager.AppSettings["Ida:ODataContentType"]);
        }

        public static void UpdateEntryRequestHeaderSetter(ODataClientRequestMessage requestMessage, string accessToken)
        {
            ODataCRUDHeaderSetter(requestMessage, accessToken);
            requestMessage.SetHeader("ContentType", ConfigurationManager.AppSettings["Ida:ODataContentType"]);
        }

        public static void DeleteEntryRequestHeaderSetter(ODataClientRequestMessage requestMessage, string accessToken)
        {
            ODataCRUDHeaderSetter(requestMessage, accessToken);
        }

        public static void SetODataRequestContent(IODataRequestMessage requestMessage, IEdmModel model, IInventoryItem inventoryItem)
        {
            var setting = new ODataMessageWriterSettings();
            setting.SetContentType(ODataFormat.Atom);
            ODataMessageWriter oDatamessageWriter = new ODataMessageWriter(requestMessage, setting, model);
            ODataWriter oDataEntrywriter = oDatamessageWriter.CreateODataEntryWriter();

            oDataEntrywriter.WriteStart(new ODataEntry()
            {
                TypeName = TypeName,
                Properties = GetODataProperties(inventoryItem)
            });

            oDataEntrywriter.WriteEnd();
        }

        // Private method
        private static void ODataServiceVersionSetter(ODataClientRequestMessage requestMessage)
        {
            requestMessage.SetHeader("DataServiceVersion", ConfigurationManager.AppSettings["Ida:ODataVersion"]);
            requestMessage.SetHeader("MaxDataServiceVersion", ConfigurationManager.AppSettings["Ida:ODataMaxVersion"]);
        }

        private static void ODataCRUDHeaderSetter(ODataClientRequestMessage requestMessage, string accessToken)
        {
            requestMessage.SetHeader("Accept", ConfigurationManager.AppSettings["Ida:ODataFeedOrEntryFormat"]);
            ODataServiceVersionSetter(requestMessage);

            if (accessToken != null)
            {
                requestMessage.SetHeader("Authorization", "Bearer " + accessToken);
            }
        }

        private static void GetMetadataRequestHeaderSetter(ODataClientRequestMessage requestMessage, string accessToken)
        {
            requestMessage.SetHeader("Accept", ConfigurationManager.AppSettings["Ida:ODataMetadataFormat"]);
            ODataServiceVersionSetter(requestMessage);

            if (accessToken != null)
            {
                requestMessage.SetHeader("Authorization", "Bearer " + accessToken);
            }
        }

        private static string TypeName
        {
            get
            {
                return ConfigurationManager.AppSettings["Ida:ODataWriterTypeName"];
            }
        }

        private static int DefaultStockNo
        {
            get 
            {
                return int.Parse(ConfigurationManager.AppSettings["Ida:DefaultStockNo"]);
            }
        }


        private static List<ODataProperty> GetODataProperties(IInventoryItem inventoryItem)
        {
            List<ODataProperty> oDataProperties = new List<ODataProperty>();
            IEnumerable<InventoryPropertyName> supportedSchemaPropertyNames = QueryOptionHelpers.GetSupportedSchemaPropertyNames();
            List<string> inventoryPropertys = new List<string>();

            foreach (var propertyName in supportedSchemaPropertyNames)
            {
                string propertyNameStr = Enum.GetName(typeof(InventoryPropertyName), propertyName);
                inventoryPropertys.Add(propertyNameStr);
            }

            foreach (var property in inventoryItem.GetType().GetProperties())
            {
                if (inventoryPropertys.Contains(property.Name))
                {
                    switch (property.Name)
                    {
                        case "Price":
                            string price = property.GetValue(inventoryItem).ToString();
                            oDataProperties.Add(new ODataProperty
                            {
                                Name = property.Name,
                                Value = '$' + price
                            });
                            break;
                        case "ArrivedDate":
                            oDataProperties.Add(new ODataProperty
                            {
                                Name = "Arrived_Date",
                                Value = property.GetValue(inventoryItem)
                            });
                            break;
                        case "StockNo":
                            oDataProperties.Add(new ODataProperty
                            {
                                Name = property.Name,
                                Value = int.Parse(property.GetValue(inventoryItem).ToString())
                            });
                            break;
                        default:
                            oDataProperties.Add(new ODataProperty
                            {
                                Name = property.Name,
                                Value = property.GetValue(inventoryItem)
                            });
                            break;
                    }
                }
            }

            return oDataProperties;
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
