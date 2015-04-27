namespace CarInventoryModel
{
    internal abstract class QueryFilterExpression<T>: IQueryFilterExpression
    {
        protected QueryFilterExpression(FilterExpressionOperator theOperator, InventoryPropertyName propertyName, T parameter)
        {
            Operator = theOperator;
            PropertyName = propertyName;
            Parameter = parameter;
        }

        public FilterExpressionOperator Operator { get; private set; }

        public InventoryPropertyName PropertyName { get; private set; }

        public object Parameter { get; private set; }

        public abstract bool Match(IInventoryItem inventory);
    }

    internal class QueryFilterExpressionEquals : QueryFilterExpression<string>
    {
        public QueryFilterExpressionEquals(InventoryPropertyName propertyName, string parameter) :
            base(FilterExpressionOperator.Equals, propertyName, parameter)
        {
        }

        public override bool Match(IInventoryItem inventory)
        {
            return inventory.GetPropertyValue(PropertyName).ToString() == Parameter as string;
        }
    }

    internal class QueryFilterExpressionLikes : QueryFilterExpression<string>
    {
        public QueryFilterExpressionLikes(InventoryPropertyName propertyName, string parameter) :
            base(FilterExpressionOperator.Likes, propertyName, parameter)
        {
        }

        public override bool Match(IInventoryItem inventory)
        {
            var lookupValue = Parameter as string;
            var inventoryValue = inventory.GetPropertyValue(PropertyName);
            return lookupValue != null && inventoryValue != null && inventoryValue.ToString().Contains(lookupValue);
        }
    }
}
