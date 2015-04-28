// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
using CarInventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarInventoryBoxXDataOperation.Util
{
    internal static class QueryOptionHelpers
    {
        public static InventoryPropertyName? GetPropertyNameFromColumnName(string columnName)
        {
            var noneOrOne = AllSchemaInfos.Where(schemaInfo => schemaInfo.ColumnName == columnName).ToArray();
            if (noneOrOne.Any())
            {
                return noneOrOne.Single().PropertyName;
            }

            return null;
        }

        public static IEnumerable<InventoryPropertyName> GetSupportedSchemaPropertyNames()
        {
            return AllSchemaInfos.Select(schemaInfo => schemaInfo.PropertyName);
        }

        public static string GetQueryUriOptions(this IInventoryQuery query)
        {
            var queryOptions = new List<string>();
            ParseSearchOption(query.Filters, queryOptions);
            ParseSortOption(query.SortParameters, queryOptions);
            ParsePagingOption(query.PagingParameters, queryOptions);

            if (!queryOptions.Any())
            {
                return "";
            }

            return "?" + string.Join("&", queryOptions.Select(Uri.EscapeUriString));
        }

        private struct SchemaInfo
        {
            public readonly InventoryPropertyName PropertyName;
            public readonly Type ColumnType;
            public readonly string ColumnName;

            public SchemaInfo(InventoryPropertyName propertyName, Type columnType, string columnName)
            {
                PropertyName = propertyName;
                ColumnType = columnType;
                ColumnName = columnName;
            }
        }

        private static readonly SchemaInfo[] AllSchemaInfos =
        {
#if PRIVATE_ODATA
            new SchemaInfo(InventoryPropertyName.ArrivedDate, typeof(DateTime), "ArrivedDate"),
#else
            new SchemaInfo(InventoryPropertyName.ArrivedDate, typeof(DateTime), "Arrived_Date"),
#endif
            new SchemaInfo(InventoryPropertyName.ID, typeof(Int32), "ID"),
            new SchemaInfo(InventoryPropertyName.BodyStyle, typeof(string), "BodyStyle"),
            new SchemaInfo(InventoryPropertyName.Brand, typeof(string), "Brand"),
            new SchemaInfo(InventoryPropertyName.BuyerEmail, typeof(string), "BuyerEmail"),
            new SchemaInfo(InventoryPropertyName.ContactEmail, typeof(string), "ContactEmail"),
            new SchemaInfo(InventoryPropertyName.ContactName, typeof(string), "ContactName"),
            new SchemaInfo(InventoryPropertyName.ContactPhone, typeof(string), "ContactPhone"),
            new SchemaInfo(InventoryPropertyName.Engine, typeof(string), "Engine"),
            new SchemaInfo(InventoryPropertyName.ExtColor, typeof(string), "ExtColor"),
            new SchemaInfo(InventoryPropertyName.IntColor, typeof(string), "IntColor"),
            new SchemaInfo(InventoryPropertyName.MaxPower, typeof(Int32), "MaxPower"),
            new SchemaInfo(InventoryPropertyName.Model, typeof(string), "Model"),
            new SchemaInfo(InventoryPropertyName.Price, typeof(string), "Price"),
            new SchemaInfo(InventoryPropertyName.Status, typeof(string), "Status"),
            new SchemaInfo(InventoryPropertyName.StockNo, typeof(string), "StockNo"),
            new SchemaInfo(InventoryPropertyName.Transmission, typeof(string), "Transmission"),
            new SchemaInfo(InventoryPropertyName.Year, typeof(Int32), "Year")
        };

        private static void ParseSearchOption(IEnumerable<IQueryFilterExpression> filters, ICollection<string> queryOptions)
        {
            var filterOptions = filters
                .Select(GetODataQueryOptionFromFilter)
                .Where(queryOption => !String.IsNullOrWhiteSpace(queryOption))
                .ToArray();

            if (filterOptions.Any())
            {
                queryOptions.Add("$filter=" + String.Join(" or ", filterOptions));
            }
        }

        private static void ParseSortOption(SortParameters? sortParameters, ICollection<string> queryOptions)
        {
            if (sortParameters.HasValue)
            {
                var option = string.Format(
                    "$orderby={0} {1}",
                    sortParameters.Value.PropertyName.GetColumnName(),
                    sortParameters.Value.SortOrder == SortOrder.Ascending ? "asc" : "desc");

                queryOptions.Add(option);
            }
        }

        private static void ParsePagingOption(PagingParameters? pagingParameters, ICollection<string> queryOptions)
        {
            if (pagingParameters.HasValue)
            {
                // TODO: 0 based index
                if (pagingParameters.Value.PageIndex > 1)
                {
                    queryOptions.Add(string.Format("$skip={0}", (pagingParameters.Value.PageIndex - 1) * pagingParameters.Value.ItemCountPerPage));
                }

                queryOptions.Add(string.Format("$top={0}", pagingParameters.Value.ItemCountPerPage));
            }
        }

        private static string GetColumnName(this InventoryPropertyName propertyName)
        {
            return propertyName.GetSchemaInfo().ColumnName;
        }

        private static string GetODataQueryOptionFromFilter(IQueryFilterExpression filter)
        {
            var propertyStringName = filter.PropertyName.GetColumnName();
            var parameter = filter.Parameter;

            switch (filter.Operator)
            {
                case FilterExpressionOperator.Equals:
                    {
                        var propertyType = filter.PropertyName.GetSchemaInfo().ColumnType;

                        if (typeof(string) == propertyType)
                        {
                            return propertyStringName + " eq '" + parameter + "'";
                        }

                        if (typeof(Int32) == propertyType)
                        {
                            return parameter + " eq " + propertyStringName;
                        }

                        return null;
                    }
                case FilterExpressionOperator.Likes:
                    {
                        var propertyType = filter.PropertyName.GetSchemaInfo().ColumnType;

                        if (typeof(string) == propertyType)
                        {
                            return "substringof('" + parameter + "'," + propertyStringName + ")";
                        }

                        if (typeof(Int32) == propertyType)
                        {
                            return parameter + " eq " + propertyStringName;
                        }

                        return null;
                    }
                default:
                    throw new ArgumentException();
            }
        }

        private static SchemaInfo GetSchemaInfo(this InventoryPropertyName propertyName)
        {
            return AllSchemaInfos.Single(schemaInfo => schemaInfo.PropertyName == propertyName);
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
