using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.LightSwitch;
using Microsoft.LightSwitch.Security.Server;
namespace LightSwitchApplication
{
    public partial class ContosoMotorsCarInventoryService
    {
        // define the number of entities in one page.
        //private const int numOfEntitiesPerPage = 10;

        private void QueryByOrder<TKey>(int? order, System.Linq.Expressions.Expression<Func<InventoryItem, TKey>> exp, ref IQueryable<InventoryItem> query)
        {
            if (order != null)
            {
                if (order == 1)
                {
                    query = query.OrderBy(exp);
                }
                else
                {
                    query = query.OrderByDescending(exp);
                }
            }
        }

        private bool LowerCaseCompare(string baseStr, string cmpLowerCaseStr)
        {
            return (baseStr != null) && baseStr.ToLowerInvariant().Contains(cmpLowerCaseStr);
        }

        partial void ContosoMotorsQuery_PreprocessQuery(string SearchParam, string SortColumn, int? SortOrder, int? PageParam, ref IQueryable<InventoryItem> query)
        {
            if (!String.IsNullOrWhiteSpace(SearchParam))
            {
                string SearchParamLower = SearchParam.ToLowerInvariant();
                query = query.Where(x => LowerCaseCompare(x.Brand, SearchParamLower)
                                      || LowerCaseCompare(x.Model, SearchParamLower)
                                      || LowerCaseCompare(x.Year.ToString(), SearchParamLower)
                                      || LowerCaseCompare(x.BodyStyle, SearchParamLower)
                                      || LowerCaseCompare(x.Engine, SearchParamLower)
                                      || LowerCaseCompare(x.MaxPower.ToString(), SearchParamLower)
                                      || LowerCaseCompare(x.Transmission, SearchParamLower)
                                      || LowerCaseCompare(x.ExtColor, SearchParamLower)
                                      || LowerCaseCompare(x.IntColor, SearchParamLower)
                                      || LowerCaseCompare(x.ArrivedDate.ToString(), SearchParamLower)
                                      || LowerCaseCompare(x.Status, SearchParamLower)
                                      || LowerCaseCompare(x.Price.ToString(), SearchParamLower)
                                      || LowerCaseCompare(x.ContactEmail, SearchParamLower)
                                      || LowerCaseCompare(x.ContactName, SearchParamLower)
                                      || LowerCaseCompare(x.ContactPhone, SearchParamLower)
                                      || LowerCaseCompare(x.ID.ToString(), SearchParamLower)
                                      || LowerCaseCompare(x.BuyerEmail, SearchParamLower)
                                      );
            }

            if (SortOrder.HasValue && !String.IsNullOrEmpty(SortColumn))
            {
                switch (SortColumn)
                {
                    case "Brand":
                        QueryByOrder(SortOrder, (x => x.Brand), ref query);
                        break;
                    case "Model":
                        QueryByOrder(SortOrder, (x => x.Model), ref query);
                        break;
                    case "Year":
                        QueryByOrder(SortOrder, (x => x.Year), ref query);
                        break;
                    case "Body Style":
                        QueryByOrder(SortOrder, (x => x.BodyStyle), ref query);
                        break;
                    case "Engine":
                        QueryByOrder(SortOrder, (x => x.Engine), ref query);
                        break;
                    case "Max Power":
                        QueryByOrder(SortOrder, (x => x.MaxPower), ref query);
                        break;
                    case "Transmission":
                        QueryByOrder(SortOrder, (x => x.Transmission), ref query);
                        break;
                    case "Ext Color":
                        QueryByOrder(SortOrder, (x => x.ExtColor), ref query);
                        break;
                    case "Int Color":
                        QueryByOrder(SortOrder, (x => x.IntColor), ref query);
                        break;
                    case "Arrived Date":
                        QueryByOrder(SortOrder, (x => x.ArrivedDate), ref query);
                        break;
                    case "Status":
                        QueryByOrder(SortOrder, (x => x.Status), ref query);
                        break;
                    case "Price":
                        QueryByOrder(SortOrder, (x => x.Price), ref query);
                        break;
                    case "Contact Email":
                        QueryByOrder(SortOrder, (x => x.ContactEmail), ref query);
                        break;
                    case "Contact Name":
                        QueryByOrder(SortOrder, (x => x.ContactName), ref query);
                        break;
                    case "Contact Phone":
                        QueryByOrder(SortOrder, (x => x.ContactPhone), ref query);
                        break;
                    case "ID":
                        QueryByOrder(SortOrder, (x => x.ID), ref query);
                        break;
                    case "Buyer Email":
                        QueryByOrder(SortOrder, (x => x.BuyerEmail), ref query);
                        break;
                    default:
                        // error handling
                        break;
                }
            }

            //if (PageParam.HasValue)
            //{
            //    int intStartingRecord = (Convert.ToInt32(PageParam - 1) * numOfEntitiesPerPage);
            //    query = query.Skip(intStartingRecord).Take(numOfEntitiesPerPage);
            //}
        }
    }
}
