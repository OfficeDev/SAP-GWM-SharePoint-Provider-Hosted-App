// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

using System.Collections.Generic;

namespace CarInventoryModel
{
    public class InventoryQuery : IInventoryQuery, IQueryFilterComplexExpression
    {
        private readonly List<IQueryFilterExpression> _filters;

        public InventoryQuery()
        {
            _filters = new List<IQueryFilterExpression>();
            Filters = _filters;
        }

        public SortParameters? SortParameters { get; private set; }
        public PagingParameters? PagingParameters { get; private set; }

        public IEnumerable<IQueryFilterExpression> Filters { get; private set; }

        public void SortWith(InventoryPropertyName sortPropertyName, SortOrder order)
        {
            SortParameters = new SortParameters
            {
                PropertyName = sortPropertyName,
                SortOrder = order
            };
        }

        public void PagingWith(int pageIndex, int itemCountPerPage)
        {
            PagingParameters = new PagingParameters { PageIndex = pageIndex, ItemCountPerPage = itemCountPerPage };
        }

        public IQueryFilterComplexExpression FilterWith(IQueryFilterExpression filterExpression)
        {
            return Or(filterExpression);
        }

        public IQueryFilterComplexExpression Or(IQueryFilterExpression filterExpression)
        {
            _filters.Add(filterExpression);
            return this;
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
