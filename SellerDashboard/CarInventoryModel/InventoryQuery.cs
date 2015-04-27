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