// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
using CarInventoryModel;
using CarInventoryBoxXDataOperation.CRUD;
using CarInventoryBoxXDataOperation.Util;
using System.Data.EntityClient;
using System.Linq;
using System.ServiceModel.DomainServices.Hosting;
using System.ServiceModel.DomainServices.Server;
using System.Web.Configuration;

namespace BoxXDataService
{
    [EnableClientAccess()]
    public class BoxXDataService : DomainService
    {
        private const int DataNumPerPage = 20;

        [Query(IsDefault = true)]
        public IQueryable<InventoryItem> GetAllCarInventory()
        {
            BoxXDataReader dataReader = BoxXDataReader.Instance;
            IInventoryCollection dataCollection = ModelFactory.CreateInventoryCollection(dataReader.SchemaPropertyNames);
            IInventoryQuery query = QueryFactory.CreateQuery();
            dataReader.GetData(dataCollection, query);

            return dataCollection.Items.Cast<InventoryItem>().AsQueryable();
        }

        [Update]
        public void UpdateCarInventoryItem(InventoryItem carInventoryItem)
        {
            BoxXDataUpdater dataUpdater = BoxXDataUpdater.Instance;
            dataUpdater.UpdateInventoryItem(carInventoryItem);
        }

        [Insert]
        public void InsertCarInventoryItem(InventoryItem carInventoryItem)
        {
            BoxXDataCreater dataCreater = BoxXDataCreater.Instance;
            dataCreater.CreateInventoryItem(carInventoryItem);
        }

        [Delete]
        public void DeleteCarInventoryItem(InventoryItem carInventoryItem)
        {
            BoxXDataDeleter.DeleteInventoryItem(carInventoryItem.ID);
        }

        public IQueryable<InventoryItem> GetFilteredCarInventory(string searchParam, string sortColumn, int? sortOrder, int? pageParam)
        {
            BoxXDataReader dataReader = BoxXDataReader.Instance;
            IInventoryCollection dataCollection = ModelFactory.CreateInventoryCollection(dataReader.SchemaPropertyNames);
            IInventoryQuery query = QueryFactory.CreateQuery();
            SortOrder? parsedSortOrder = ParseSortOrder(sortOrder);

            if (parsedSortOrder.HasValue)
            {
                var propertyName = BoxXDataReader.GetPropertyNameFromColumnName(sortColumn);
                if (propertyName.HasValue)
                {
                    query.SortWith(propertyName.Value, parsedSortOrder.Value);
                }
            }

            if (pageParam.HasValue)
            {
                query.PagingWith(pageParam.Value, DataNumPerPage);
            }

            foreach (var propertyName in dataReader.SchemaPropertyNames)
            {
                query.FilterWith(propertyName.ValueLikes(searchParam));
            }

            dataReader.GetData(dataCollection, query);
            return dataCollection.Items.Cast<InventoryItem>().AsQueryable();
        }

        private static SortOrder? ParseSortOrder(int? sortOrder)
        {
            switch (sortOrder)
            {
                case 0:
                    return SortOrder.Descending;
                case 1:
                    return SortOrder.Ascending;
                default:
                    return null;
            }
        }

        // Override the Count method in order for paging to work correctly
        protected override int Count<T>(IQueryable<T> query)
        {
            return query.Count();
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
