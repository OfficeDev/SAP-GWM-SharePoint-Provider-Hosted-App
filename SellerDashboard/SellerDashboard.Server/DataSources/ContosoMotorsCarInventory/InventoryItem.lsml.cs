using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.LightSwitch;
namespace LightSwitchApplication
{
    public partial class InventoryItem
    {
        partial void Price_Validate(EntityValidationResultsBuilder results)
        {
            if(Price < 0)
            {
                results.AddPropertyError("Price must be greater than zero.");
            }
        }

        partial void Year_Validate(EntityValidationResultsBuilder results)
        {
            if (Year < 1930 || Year > 2030)
            {
                results.AddPropertyError("Year must be in 1930 to 2030.");
            }
        }
    }
}
