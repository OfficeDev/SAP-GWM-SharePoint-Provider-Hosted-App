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

namespace CarInventoryBoxXDataOperation.CRUD
{
    public class BoxXDataReader : IDataGetter
    {
        // Private member
        private static BoxXDataReader _instance = new BoxXDataReader();
        private IEdmModel _model;
        private enum ODataMessageType
        {
            Feed,
            Entry
        }

        // Public method
        public static BoxXDataReader Instance { get { return _instance; } }

        public static InventoryPropertyName? GetPropertyNameFromColumnName(string columnName)
        {
            return QueryOptionHelpers.GetPropertyNameFromColumnName(columnName);
        }

        public IEnumerable<InventoryPropertyName> SchemaPropertyNames
        {
            get
            {
                return QueryOptionHelpers.GetSupportedSchemaPropertyNames();
            }
        }

        public void GetData(IInventoryCollection dataCollection, IInventoryQuery query)
        {
            GetValueWithoutLocallyFiltering(dataCollection, query);

            if (query.Filters.Any())
            {
                var filteredCollection = dataCollection.Filter(inventoryItem =>
                    query.Filters.Any(filter => filter.Match(inventoryItem)));

                dataCollection.CopyFrom(filteredCollection);
            }
        }

        // TODO: Remove this method once the test failed.
        public void GetValueWithoutLocallyFiltering(IInventoryCollection dataCollection, IInventoryQuery query)
        {
            if (dataCollection == null)
            {
                throw new ArgumentNullException("dataCollection");
            }

            if (_model == null)
            {
                _model = BoxXDataCRUDHelpers.GetMetadata(BoxXDataCRUDHelpers.MetadataUrl);
            }

            var requestMessage = new ODataClientRequestMessage(new Uri(BoxXDataCRUDHelpers.DataCollectionUrl + query.GetQueryUriOptions()),
                                                                ODataConstants.MethodGet);
            BoxXDataCRUDHelpers.GetFeedOrEntryRequsetHeaderSetter(requestMessage, AuthUtil.Instance.AccessToken);
            IODataResponseMessage responseMessage = requestMessage.GetResponse();

            using (var messageReader = new ODataMessageReader(responseMessage, new ODataMessageReaderSettings(), _model))
            {
                switch (GetMessageType(responseMessage))
                {
                    case ODataMessageType.Feed:
                        {
                            ODataReader reader = messageReader.CreateODataFeedReader();
                            ParseDataFromFeedOrEntry(dataCollection, reader);
                            break;
                        }
                    case ODataMessageType.Entry:
                        {
                            ODataReader reader = messageReader.CreateODataEntryReader();
                            ParseDataFromFeedOrEntry(dataCollection, reader);
                            break;
                        }
                    default:
                        {
                            throw new ArgumentOutOfRangeException();
                        }
                }
            }
        }

        // Private method
        private ODataMessageType GetMessageType(IODataResponseMessage response)
        {
            //TODO: add implementation to decide the type
            return ODataMessageType.Feed;
        }

        private void ParseDataFromFeedOrEntry(IInventoryCollection dataCollection, ODataReader reader)
        {
            while (reader.Read())
            {
                if (reader.State == ODataReaderState.EntryEnd)
                {
                    {
                        var entry = reader.Item as ODataEntry;
                        if (entry != null)
                        {
                            if (entry.MediaResource != null)
                            {
                                WriteValue(null, "OData_MediaResource", entry.Properties);
                            }

                            var item = WriteProperties(entry.Properties);
                            if (item.IsValid)
                            {
                                dataCollection.AddItem(item);
                            }
                        }
                    }
                }
            }
        }

        private IInventoryItem WriteProperties(IEnumerable<ODataProperty> properties)
        {
            IInventoryItem inventoryItem = ModelFactory.CreateInventoryItem();
            foreach (ODataProperty property in properties)
            {
                WriteValue(inventoryItem, property.Name, property.Value);
            }

            return inventoryItem;
        }

        private void WriteValue(IInventoryItem item, string property, object value)
        {
            var complexValue = value as ODataComplexValue;
            if (complexValue != null)
            {
                //TODO: add complex value support in the IInventoryItem.
                WriteProperties(complexValue.Properties);
                return;
            }

            var multiValue = value as ODataCollectionValue;
            if (multiValue != null)
            {
                foreach (object itemValue in multiValue.Items)
                {
                    WriteValue(item, property, itemValue);
                }

                return;
            }

            if (item == null)
            {
                // OData_MediaResource case, skip
                return;
            }

            InventoryPropertyName? inventoryProperty = GetPropertyNameFromColumnName(property);
            if (inventoryProperty.HasValue)
            {
                item.SetPropertyValue(inventoryProperty.Value, value);
            }
        }

        private BoxXDataReader() { }
    }
}