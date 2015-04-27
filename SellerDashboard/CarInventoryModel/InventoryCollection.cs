using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CarInventoryModel
{
    internal class InventoryCollection : IInventoryCollection
    {
        private readonly Dictionary<int, IInventoryItem> _idToInventory;
        private readonly List<IInventoryItem> _inventoriesItems;
        private readonly HashSet<InventoryPropertyName> _propertyNames;

        public InventoryCollection(IEnumerable<InventoryPropertyName> propertyNames)
        {
            _idToInventory = new Dictionary<int, IInventoryItem>();
            _inventoriesItems = new List<IInventoryItem>();
            _propertyNames = new HashSet<InventoryPropertyName>(propertyNames);
        }

        public IEnumerable<InventoryPropertyName> QueriedPropertyNames
        {
            get { return _propertyNames; }
        }

        public IEnumerable<IInventoryItem> Items
        {
            get { return _inventoriesItems; }
        }

        public bool Valid
        {
            get { return _inventoriesItems.All(inventoryItem => _propertyNames.IsSubsetOf(inventoryItem.ValidPropertyNames)); }
        }

        public void AddItem(IInventoryItem inventoryItem)
        {
            if (inventoryItem.Removed)
            {
                throw new InvalidDataException("inventoryItem has already been removed.");
            }

            _idToInventory[inventoryItem.ID] = inventoryItem;
            _inventoriesItems.Add(inventoryItem);
        }

        public bool Contains(int id)
        {
            return _idToInventory.ContainsKey(id);
        }

        public IInventoryItem this[int id]
        {
            get { return _idToInventory[id]; }
        }

        public IInventoryCollection Filter(Predicate<IInventoryItem> match)
        {
            IInventoryCollection newCollection = ModelFactory.CreateInventoryCollection(QueriedPropertyNames);
            foreach (IInventoryItem inventoryItem in _inventoriesItems.Where(inventoryItem => match(inventoryItem)))
            {
                newCollection.AddItem(inventoryItem);
            }

            return newCollection;
        }

        public bool CopyFrom(IInventoryCollection other)
        {
            var currentIDs = Items.Select(item => item.ID).ToArray();
            var newIDs = other.Items.Select(item => item.ID).ToArray();

            var idsToRemove = currentIDs.Except(newIDs).ToArray();
            foreach (var id in idsToRemove)
            {
                RemoveItemByID(id);
            }

            bool anyItemUpdated = false;
            var idsToUpdate = newIDs.Intersect(idsToRemove);
            foreach (var id in idsToUpdate)
            {
                if (this[id].CopyFrom(other[id]))
                {
                    anyItemUpdated = true;
                }
            }

            var idsToAdd = newIDs.Except(currentIDs).ToArray();
            foreach (var id in idsToAdd)
            {
                AddItem(other[id]);
            }

            return anyItemUpdated ||
                (0 < idsToRemove.Length) ||
                (0 < idsToAdd.Length);
        }

        private void RemoveItemByID(int id)
        {
            var inventoryItem = _idToInventory[id];
            _idToInventory.Remove(inventoryItem.ID);
            _inventoriesItems.Remove(inventoryItem);

            inventoryItem.MarkAsRemoved();
        }
    }
}