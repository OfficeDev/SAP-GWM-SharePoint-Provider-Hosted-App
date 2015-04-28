// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

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
