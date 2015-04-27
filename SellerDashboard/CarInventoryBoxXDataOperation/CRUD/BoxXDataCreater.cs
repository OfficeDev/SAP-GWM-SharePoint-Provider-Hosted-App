using AADAuthLib;
using CarInventoryBoxXDataOperation.Util;
using CarInventoryModel;
using Microsoft.Data.Edm;
using Microsoft.Data.OData;
using System;
using System.Threading.Tasks;

namespace CarInventoryBoxXDataOperation.CRUD
{
    public class BoxXDataCreater
    {
        // Private member
        private static BoxXDataCreater _instance = new BoxXDataCreater();
        private IEdmModel _model;

        // Public method
        public static BoxXDataCreater Instance { get { return _instance; } }

        public void CreateInventoryItem(IInventoryItem inventoryItem)
        {
            if (_model == null)
            {
                _model = BoxXDataCRUDHelpers.GetMetadata(BoxXDataCRUDHelpers.MetadataUrl);
            }

            // Create new entry request generate
            var requestMessage = new ODataClientRequestMessage(new Uri(BoxXDataCRUDHelpers.DataCollectionUrl),
                                                                ODataConstants.MethodPost);
            BoxXDataCRUDHelpers.CreateEntryRequestHeaderSetter(requestMessage, AuthUtil.Instance.AccessToken);
            BoxXDataCRUDHelpers.SetODataRequestContent(requestMessage, _model, inventoryItem);

            // Create new entry request execute
            IODataResponseMessage responseMessage = requestMessage.GetResponse();
        }

        // Private method
        private BoxXDataCreater() { }
    }
}
