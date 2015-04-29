// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

/// <reference path="data.js" />

(function (lightSwitchApplication) {

    var $Screen = msls.Screen,
        $defineScreen = msls._defineScreen,
        $DataServiceQuery = msls.DataServiceQuery,
        $toODataString = msls._toODataString,
        $defineShowScreen = msls._defineShowScreen;

    function AddEditInventoryItem(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the AddEditInventoryItem screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="InventoryItem" type="msls.application.InventoryItem">
        /// Gets or sets the inventoryItem for this screen.
        /// </field>
        /// <field name="ContosoMotorsPicture" type="msls.application.ContosoMotorsPicture">
        /// Gets the contosoMotorsPicture for this screen.
        /// </field>
        /// <field name="details" type="msls.application.AddEditInventoryItem.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "AddEditInventoryItem", parameters);
    }

    function BrowseInventoryItems(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the BrowseInventoryItems screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="ContosoMotorsQuery" type="msls.VisualCollection" elementType="msls.application.InventoryItem">
        /// Gets the contosoMotorsQuery for this screen.
        /// </field>
        /// <field name="SearchParam" type="String">
        /// Gets or sets the searchParam for this screen.
        /// </field>
        /// <field name="ContosoMotorsPictures" type="msls.VisualCollection" elementType="msls.application.ContosoMotorsPicture">
        /// Gets the contosoMotorsPictures for this screen.
        /// </field>
        /// <field name="details" type="msls.application.BrowseInventoryItems.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "BrowseInventoryItems", parameters);
    }

    function ViewInventoryItem(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the ViewInventoryItem screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="InventoryItem" type="msls.application.InventoryItem">
        /// Gets or sets the inventoryItem for this screen.
        /// </field>
        /// <field name="ContosoMotorsPicture" type="msls.application.ContosoMotorsPicture">
        /// Gets the contosoMotorsPicture for this screen.
        /// </field>
        /// <field name="Id" type="msls.application.ContosoMotorsPicture">
        /// Gets or sets the id for this screen.
        /// </field>
        /// <field name="details" type="msls.application.ViewInventoryItem.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "ViewInventoryItem", parameters);
    }

    function AddInventoryItem(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the AddInventoryItem screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="InventoryItem" type="msls.application.InventoryItem">
        /// Gets or sets the inventoryItem for this screen.
        /// </field>
        /// <field name="details" type="msls.application.AddInventoryItem.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "AddInventoryItem", parameters);
    }

    msls._addToNamespace("msls.application", {

        AddEditInventoryItem: $defineScreen(AddEditInventoryItem, [
            { name: "InventoryItem", kind: "local", type: lightSwitchApplication.InventoryItem },
            {
                name: "ContosoMotorsPicture", kind: "reference", type: lightSwitchApplication.ContosoMotorsPicture,
                createQuery: function (Id) {
                    return this.dataWorkspace.ContosoMotorsPictureLibrary.ContosoMotorsPictures_SingleOrDefault(Id);
                }
            }
        ], [
        ]),

        BrowseInventoryItems: $defineScreen(BrowseInventoryItems, [
            {
                name: "ContosoMotorsQuery", kind: "collection", elementType: lightSwitchApplication.InventoryItem,
                createQuery: function (SearchParam, SortColumn, SortOrder, PageParam) {
                    return this.dataWorkspace.ContosoMotorsCarInventory.ContosoMotorsQuery(SearchParam, SortColumn, SortOrder, PageParam);
                }
            },
            { name: "SearchParam", kind: "local", type: String },
            {
                name: "ContosoMotorsPictures", kind: "collection", elementType: lightSwitchApplication.ContosoMotorsPicture,
                createQuery: function () {
                    return this.dataWorkspace.ContosoMotorsPictureLibrary.ContosoMotorsPictures;
                }
            }
        ], [
            { name: "AddNewInventoryItem" }
        ]),

        ViewInventoryItem: $defineScreen(ViewInventoryItem, [
            { name: "InventoryItem", kind: "local", type: lightSwitchApplication.InventoryItem },
            {
                name: "ContosoMotorsPicture", kind: "reference", type: lightSwitchApplication.ContosoMotorsPicture,
                createQuery: function (Id) {
                    return this.dataWorkspace.ContosoMotorsPictureLibrary.ContosoMotorsPictures_SingleOrDefault(Id);
                }
            },
            { name: "Id", kind: "local", type: lightSwitchApplication.ContosoMotorsPicture }
        ], [
            { name: "delete" },
            { name: "Upload" },
            { name: "UploadPhoto" }
        ]),

        AddInventoryItem: $defineScreen(AddInventoryItem, [
            { name: "InventoryItem", kind: "local", type: lightSwitchApplication.InventoryItem }
        ], [
            { name: "Upload" },
            { name: "UploadPhoto" }
        ]),

        showAddEditInventoryItem: $defineShowScreen(function showAddEditInventoryItem(InventoryItem, options) {
            /// <summary>
            /// Asynchronously navigates forward to the AddEditInventoryItem screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("AddEditInventoryItem", parameters, options);
        }),

        showBrowseInventoryItems: $defineShowScreen(function showBrowseInventoryItems(options) {
            /// <summary>
            /// Asynchronously navigates forward to the BrowseInventoryItems screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 0);
            return lightSwitchApplication.showScreen("BrowseInventoryItems", parameters, options);
        }),

        showViewInventoryItem: $defineShowScreen(function showViewInventoryItem(InventoryItem, options) {
            /// <summary>
            /// Asynchronously navigates forward to the ViewInventoryItem screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("ViewInventoryItem", parameters, options);
        }),

        showAddInventoryItem: $defineShowScreen(function showAddInventoryItem(InventoryItem, options) {
            /// <summary>
            /// Asynchronously navigates forward to the AddInventoryItem screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("AddInventoryItem", parameters, options);
        })

    });

}(msls.application));

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
