using System;
using System.Collections.Generic;
using System.Linq;

namespace CarInventoryModel
{
    public static class ModelFactory
    {
        public static IInventoryCollection CreateInventoryCollection(IEnumerable<InventoryPropertyName> propertyNames)
        {
            return new InventoryCollection(propertyNames);
        }

        public static IInventoryItem CreateInventoryItem()
        {
            return new InventoryItem();
        }
    }

    public static class QueryFactory
    {
        public static IInventoryQuery CreateQuery()
        {
            return new InventoryQuery();
        }

        public static IInventoryQuery CreateQueryWithIDs(IEnumerable<int> ids)
        {
            IInventoryQuery query = CreateQuery();
            foreach (int id in ids)
            {
                query.FilterWith(InventoryPropertyName.ID.ValueEquals(id));
            }

            return query;
        }
    }

    public static class QueryFilterExpressionFactory
    {
        public static IQueryFilterExpression ValueEquals(this InventoryPropertyName propertyName, int value)
        {
            return new QueryFilterExpressionEquals(propertyName, value.ToString());
        }

        public static IQueryFilterExpression ValueLikes(this InventoryPropertyName propertyName, string lookupValue)
        {
            return new QueryFilterExpressionLikes(propertyName, lookupValue);
        }
    }

    public enum InventoryPropertyName
    {
        ArrivedDate,
        BodyStyle,
        Brand,
        BuyerEmail,
        ContactEmail,
        ContactName,
        ContactPhone,
        Engine,
        ExtColor,
        ID,
        Images,
        IntColor,
        MaxPower,
        Model,
        Price,
        Status,
        StockNo,
        Transmission,
        Year,
    }

    public static class InventoryPropertyNameSet
    {
        public static IEnumerable<InventoryPropertyName> AllPropertyNames
        {
            get { return Enum.GetValues(typeof(InventoryPropertyName)).OfType<InventoryPropertyName>(); }
        }
    }

    public interface IInventoryItem
    {
        IEnumerable<InventoryPropertyName> ValidPropertyNames { get; }
        bool IsValid { get; }

        int ID { get; set; }
        DateTime ArrivedDate { get; set; }
        string BodyStyle { get; set; }
        string Brand { get; set; }
        string BuyerEmail { get; set; }
        string ContactEmail { get; set; }
        string ContactName { get; set; }
        string ContactPhone { get; set; }
        string Engine { get; set; }
        string ExtColor { get; set; }
        IEnumerable<Uri> Images { get; }
        string IntColor { get; set; }
        int MaxPower { get; set; }
        string Model { get; set; }
        decimal Price { get; set; }
        bool Removed { get; }
        string Status { get; set; }
        string StockNo { get; set; }
        string Transmission { get; set; }
        int Year { get; set; }

        void AddImageUrl(Uri url);
        bool CopyFrom(IInventoryItem other);
        object GetPropertyValue(InventoryPropertyName property);
        void MarkAsRemoved();
        void SetPropertyValue(InventoryPropertyName property, object value);
    }

    public interface IInventoryCollection
    {
        IEnumerable<InventoryPropertyName> QueriedPropertyNames { get; }
        IEnumerable<IInventoryItem> Items { get; }
        bool Valid { get; }

        IInventoryItem this[int id] { get; }
        bool Contains(int id);
        void AddItem(IInventoryItem inventoryItem);
        IInventoryCollection Filter(Predicate<IInventoryItem> match);
        bool CopyFrom(IInventoryCollection other);
    }

    public enum SortOrder
    {
        Ascending,
        Descending
    }

    public struct SortParameters
    {
        public InventoryPropertyName PropertyName;
        public SortOrder SortOrder;
    }

    public struct PagingParameters
    {
        public int PageIndex;
        public int ItemCountPerPage;
    }

    public interface IInventoryQuery
    {
        SortParameters? SortParameters { get; }
        PagingParameters? PagingParameters { get; }
        IEnumerable<IQueryFilterExpression> Filters { get; }

        void SortWith(InventoryPropertyName sortPropertyName, SortOrder order);
        void PagingWith(int pageIndex, int itemCountPerPage);
        IQueryFilterComplexExpression FilterWith(IQueryFilterExpression filterExpression);
    }

    public enum FilterExpressionOperator
    {
        Equals,
        Likes
    }

    public interface IQueryFilterExpression
    {
        FilterExpressionOperator Operator { get; }
        InventoryPropertyName PropertyName { get; }
        object Parameter { get; }
        bool Match(IInventoryItem inventory);
    }

    public interface IQueryFilterComplexExpression
    {
        IQueryFilterComplexExpression Or(IQueryFilterExpression filterExpression);
    }

    public interface IDataGetter
    {
        IEnumerable<InventoryPropertyName> SchemaPropertyNames { get; }

        void GetData(IInventoryCollection dataCollection, IInventoryQuery query);
    }
}