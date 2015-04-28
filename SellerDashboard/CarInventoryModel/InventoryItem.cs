// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

using System;
using System.Collections.Generic;
using System.Globalization;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CarInventoryModel
{
    public class InventoryItem : IInventoryItem
    {
        private Dictionary<InventoryPropertyName, object> _properties;

        public InventoryItem()
        {
            _properties = new Dictionary<InventoryPropertyName, object>();
            Images = new List<Uri>();
        }

        public IEnumerable<InventoryPropertyName> ValidPropertyNames
        {
            get
            {
                return _properties.Keys;
            }
        }

        [Required()]
        public DateTime ArrivedDate
        {
            get
            {
                return (DateTime)_properties[InventoryPropertyName.ArrivedDate];
            }

            set
            {
                _properties[InventoryPropertyName.ArrivedDate] = value;
            }
        }

        [Required()]
        public string BodyStyle
        {
            get
            {
                return (string)_properties[InventoryPropertyName.BodyStyle];
            }

            set
            {
                _properties[InventoryPropertyName.BodyStyle] = value;
            }
        }

        [Required()]
        public string Brand
        {
            get
            {
                return (string)_properties[InventoryPropertyName.Brand];
            }

            set
            {
                _properties[InventoryPropertyName.Brand] = value;
            }
        }

        public string BuyerEmail
        {
            get
            {
                return (string)_properties[InventoryPropertyName.BuyerEmail];
            }

            set
            {
                _properties[InventoryPropertyName.BuyerEmail] = value;
            }
        }
        public string ContactEmail
        {
            get
            {
                return (string)_properties[InventoryPropertyName.ContactEmail];
            }

            set
            {
                _properties[InventoryPropertyName.ContactEmail] = value;
            }
        }

        [Required()]
        public string ContactName
        {
            get
            {
                return (string)_properties[InventoryPropertyName.ContactName];
            }

            set
            {
                _properties[InventoryPropertyName.ContactName] = value;
            }
        }

        public string ContactPhone
        {
            get
            {
                return (string)_properties[InventoryPropertyName.ContactPhone];
            }

            set
            {
                _properties[InventoryPropertyName.ContactPhone] = value;
            }
        }

        [Required()]
        public string Engine
        {
            get
            {
                return (string)_properties[InventoryPropertyName.Engine];
            }

            set
            {
                _properties[InventoryPropertyName.Engine] = value;
            }
        }

        [Required()]
        public string ExtColor
        {
            get
            {
                return (string)_properties[InventoryPropertyName.ExtColor];
            }

            set
            {
                _properties[InventoryPropertyName.ExtColor] = value;
            }
        }

        [Key]
        public int ID
        {
            get
            {
                return (int)_properties[InventoryPropertyName.ID];
            }

            set
            {
                _properties[InventoryPropertyName.ID] = value;
            }
        }

        [Required()]
        public string StockNo
        {
            get
            {
                if (_properties[InventoryPropertyName.StockNo] == null)
                {
                    return "";
                }
                else 
                { 
                    return _properties[InventoryPropertyName.StockNo].ToString();
                }
            }
            set
            {
                _properties[InventoryPropertyName.StockNo] = value;
            }
        }

        public IEnumerable<Uri> Images
        {
            get
            {
                return (IEnumerable<Uri>)_properties[InventoryPropertyName.Images];
            }

            private set
            {
                _properties[InventoryPropertyName.Images] = value;
            }
        }

        [Required()]
        public string IntColor
        {
            get
            {
                return (string)_properties[InventoryPropertyName.IntColor];
            }

            set
            {
                _properties[InventoryPropertyName.IntColor] = value;
            }
        }

        [Required()]
        public int MaxPower
        {
            get
            {
                return (int)_properties[InventoryPropertyName.MaxPower];
            }

            set
            {
                _properties[InventoryPropertyName.MaxPower] = value;
            }
        }

        [Required()]
        public string Model
        {
            get
            {
                return (string)_properties[InventoryPropertyName.Model];
            }

            set
            {
                _properties[InventoryPropertyName.Model] = value;
            }
        }

        [Required()]
        public decimal Price
        {
            get
            {
                return (decimal)_properties[InventoryPropertyName.Price];
            }

            set
            {
                _properties[InventoryPropertyName.Price] = value;
            }
        }

        public bool Removed { get; private set; }

        [Required()]
        public string Status
        {
            get
            {
                return (string)_properties[InventoryPropertyName.Status];
            }

            set
            {
                _properties[InventoryPropertyName.Status] = value;
            }
        }

        [Required()]
        public string Transmission
        {
            get
            {
                return (string)_properties[InventoryPropertyName.Transmission];
            }

            set
            {
                _properties[InventoryPropertyName.Transmission] = value;
            }
        }

        [Required()]
        public int Year
        {
            get
            {
                return (int)_properties[InventoryPropertyName.Year];
            }

            set
            {
                _properties[InventoryPropertyName.Year] = value;
            }
        }

        public void AddImageUrl(Uri url)
        {
            if (!(Images is List<Uri>))
            {
                Images = new List<Uri>(Images);
            }

            (Images as List<Uri>).Add(url);
        }

        public bool CopyFrom(IInventoryItem other)
        {
            var otherAsThisType = other as InventoryItem;
            if (null == otherAsThisType)
            {
                throw new NotImplementedException("Only support InventorItem to copy from right now");
            }

            if (_properties.Equals(otherAsThisType._properties))
            {
                return false;
            }

            _properties = new Dictionary<InventoryPropertyName, object>(otherAsThisType._properties);
            Images = new List<Uri>(Images);

            return true;
        }

        public object GetPropertyValue(InventoryPropertyName property)
        {
            return _properties[property];
        }

        public void MarkAsRemoved()
        {
            Removed = true;
        }

        public void SetPropertyValue(InventoryPropertyName property, object value)
        {
            switch (property)
            {
                case InventoryPropertyName.StockNo:
                    { 
                        if (value != null)
                        {
                            string stockNo = ((Int32)value).ToString(CultureInfo.InvariantCulture);
                            _properties[property] = stockNo;
                        }
                        else
                        {
                            _properties[property] = string.Empty;
                        }
                    }
                    break;
                case InventoryPropertyName.Price:
                    {
                        //because the type of Price in SAP side is string, but the definition here is decimal.
                        //TODO: this is just a workaround, need to sync with SAP.
                        var price = value as string;
                        if (!string.IsNullOrEmpty(price))
                        {
                            // remove $ mark from SAP
                            _properties[property] = Decimal.Parse(price.TrimStart('$'));
                        }
                        else
                        {
                            _properties[property] = Decimal.Zero;
                        }
                        break;
                    }
                case InventoryPropertyName.Images:
                    {
                        throw new NotImplementedException();
                    }
                default:
                    {
                        _properties[property] = value;
                        break;
                    }
            }
        }

        public bool IsValid
        {
            get
            {
                return ValidPropertyNames.Contains(InventoryPropertyName.ID);
            }
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
