// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

/// <reference path="viewModel.js" />

(function (lightSwitchApplication) {

    var $element = document.createElement("div");

    lightSwitchApplication.AddEditInventoryItem.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditInventoryItem
        },
        Details: {
            _$class: msls.ContentItem,
            _$name: "Details",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.AddEditInventoryItem,
            value: lightSwitchApplication.AddEditInventoryItem
        },
        Group: {
            _$class: msls.ContentItem,
            _$name: "Group",
            _$parentName: "Details",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.AddEditInventoryItem,
            value: lightSwitchApplication.AddEditInventoryItem
        },
        StockNo: {
            _$class: msls.ContentItem,
            _$name: "StockNo",
            _$parentName: "Group",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.AddEditInventoryItem,
            value: String
        },
        columns: {
            _$class: msls.ContentItem,
            _$name: "columns",
            _$parentName: "Details",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.AddEditInventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        left: {
            _$class: msls.ContentItem,
            _$name: "left",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        ArrivedDate: {
            _$class: msls.ContentItem,
            _$name: "ArrivedDate",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: Date
        },
        BodyStyle: {
            _$class: msls.ContentItem,
            _$name: "BodyStyle",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Brand: {
            _$class: msls.ContentItem,
            _$name: "Brand",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        BuyerEmail: {
            _$class: msls.ContentItem,
            _$name: "BuyerEmail",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        ContactEmail: {
            _$class: msls.ContentItem,
            _$name: "ContactEmail",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        ContactName: {
            _$class: msls.ContentItem,
            _$name: "ContactName",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        ContactPhone: {
            _$class: msls.ContentItem,
            _$name: "ContactPhone",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Engine: {
            _$class: msls.ContentItem,
            _$name: "Engine",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        ExtColor: {
            _$class: msls.ContentItem,
            _$name: "ExtColor",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        right: {
            _$class: msls.ContentItem,
            _$name: "right",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        IntColor: {
            _$class: msls.ContentItem,
            _$name: "IntColor",
            _$parentName: "right",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        MaxPower: {
            _$class: msls.ContentItem,
            _$name: "MaxPower",
            _$parentName: "right",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: Number
        },
        Model: {
            _$class: msls.ContentItem,
            _$name: "Model",
            _$parentName: "right",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Price: {
            _$class: msls.ContentItem,
            _$name: "Price",
            _$parentName: "right",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Status: {
            _$class: msls.ContentItem,
            _$name: "Status",
            _$parentName: "right",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Transmission: {
            _$class: msls.ContentItem,
            _$name: "Transmission",
            _$parentName: "right",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Year: {
            _$class: msls.ContentItem,
            _$name: "Year",
            _$parentName: "right",
            screen: lightSwitchApplication.AddEditInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: Number
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditInventoryItem
        }
    };

    msls._addEntryPoints(lightSwitchApplication.AddEditInventoryItem, {
        /// <field>
        /// Called when a new AddEditInventoryItem screen is created.
        /// <br/>created(msls.application.AddEditInventoryItem screen)
        /// </field>
        created: [lightSwitchApplication.AddEditInventoryItem],
        /// <field>
        /// Called before changes on an active AddEditInventoryItem screen are applied.
        /// <br/>beforeApplyChanges(msls.application.AddEditInventoryItem screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.AddEditInventoryItem],
        /// <field>
        /// Called after the Details content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Details_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("Details"); }],
        /// <field>
        /// Called after the Group content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("Group"); }],
        /// <field>
        /// Called after the StockNo content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        StockNo_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("StockNo"); }],
        /// <field>
        /// Called after the columns content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        columns_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("columns"); }],
        /// <field>
        /// Called after the left content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        left_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("left"); }],
        /// <field>
        /// Called after the ArrivedDate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ArrivedDate_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("ArrivedDate"); }],
        /// <field>
        /// Called after the BodyStyle content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        BodyStyle_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("BodyStyle"); }],
        /// <field>
        /// Called after the Brand content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Brand_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("Brand"); }],
        /// <field>
        /// Called after the BuyerEmail content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        BuyerEmail_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("BuyerEmail"); }],
        /// <field>
        /// Called after the ContactEmail content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContactEmail_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("ContactEmail"); }],
        /// <field>
        /// Called after the ContactName content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContactName_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("ContactName"); }],
        /// <field>
        /// Called after the ContactPhone content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContactPhone_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("ContactPhone"); }],
        /// <field>
        /// Called after the Engine content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Engine_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("Engine"); }],
        /// <field>
        /// Called after the ExtColor content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ExtColor_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("ExtColor"); }],
        /// <field>
        /// Called after the right content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        right_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("right"); }],
        /// <field>
        /// Called after the IntColor content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        IntColor_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("IntColor"); }],
        /// <field>
        /// Called after the MaxPower content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        MaxPower_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("MaxPower"); }],
        /// <field>
        /// Called after the Model content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Model_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("Model"); }],
        /// <field>
        /// Called after the Price content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Price_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("Price"); }],
        /// <field>
        /// Called after the Status content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Status_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("Status"); }],
        /// <field>
        /// Called after the Transmission content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Transmission_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("Transmission"); }],
        /// <field>
        /// Called after the Year content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Year_postRender: [$element, function () { return new lightSwitchApplication.AddEditInventoryItem().findContentItem("Year"); }]
    });

    lightSwitchApplication.BrowseInventoryItems.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.BrowseInventoryItems
        },
        SellerDashboard: {
            _$class: msls.ContentItem,
            _$name: "SellerDashboard",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        Group: {
            _$class: msls.ContentItem,
            _$name: "Group",
            _$parentName: "SellerDashboard",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        LeftNavigation: {
            _$class: msls.ContentItem,
            _$name: "LeftNavigation",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        ContosoTradeMark: {
            _$class: msls.ContentItem,
            _$name: "ContosoTradeMark",
            _$parentName: "LeftNavigation",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        ButtonBoard: {
            _$class: msls.ContentItem,
            _$name: "ButtonBoard",
            _$parentName: "LeftNavigation",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        DataContent: {
            _$class: msls.ContentItem,
            _$name: "DataContent",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        DataContentGroup1: {
            _$class: msls.ContentItem,
            _$name: "DataContentGroup1",
            _$parentName: "DataContent",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        DataContentTitle: {
            _$class: msls.ContentItem,
            _$name: "DataContentTitle",
            _$parentName: "DataContentGroup1",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        RetailerTitle: {
            _$class: msls.ContentItem,
            _$name: "RetailerTitle",
            _$parentName: "DataContentTitle",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        DataContentControl: {
            _$class: msls.ContentItem,
            _$name: "DataContentControl",
            _$parentName: "DataContentGroup1",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        RefreshButton: {
            _$class: msls.ContentItem,
            _$name: "RefreshButton",
            _$parentName: "DataContentControl",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        AddButton: {
            _$class: msls.ContentItem,
            _$name: "AddButton",
            _$parentName: "DataContentControl",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        SearchParam: {
            _$class: msls.ContentItem,
            _$name: "SearchParam",
            _$parentName: "DataContentControl",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: String
        },
        ContosoMotorsQueryListView: {
            _$class: msls.ContentItem,
            _$name: "ContosoMotorsQueryListView",
            _$parentName: "DataContent",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.BrowseInventoryItems,
                _$entry: {
                    elementType: lightSwitchApplication.InventoryItem
                }
            }
        },
        ContosoMotorsQueryTemplate: {
            _$class: msls.ContentItem,
            _$name: "ContosoMotorsQueryTemplate",
            _$parentName: "ContosoMotorsQueryListView",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        ThumbnailUrl: {
            _$class: msls.ContentItem,
            _$name: "ThumbnailUrl",
            _$parentName: "ContosoMotorsQueryTemplate",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        StockNo: {
            _$class: msls.ContentItem,
            _$name: "StockNo",
            _$parentName: "ContosoMotorsQueryTemplate",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Brand: {
            _$class: msls.ContentItem,
            _$name: "Brand",
            _$parentName: "ContosoMotorsQueryTemplate",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Model: {
            _$class: msls.ContentItem,
            _$name: "Model",
            _$parentName: "ContosoMotorsQueryTemplate",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Engine: {
            _$class: msls.ContentItem,
            _$name: "Engine",
            _$parentName: "ContosoMotorsQueryTemplate",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Price: {
            _$class: msls.ContentItem,
            _$name: "Price",
            _$parentName: "ContosoMotorsQueryTemplate",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Status: {
            _$class: msls.ContentItem,
            _$name: "Status",
            _$parentName: "ContosoMotorsQueryTemplate",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        ContactEmail: {
            _$class: msls.ContentItem,
            _$name: "ContactEmail",
            _$parentName: "ContosoMotorsQueryTemplate",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.BrowseInventoryItems
        },
        ContosoMotorsPicturesUploadPopup: {
            _$class: msls.ContentItem,
            _$name: "ContosoMotorsPicturesUploadPopup",
            _$parentName: "Popups",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: lightSwitchApplication.BrowseInventoryItems
        },
        ContosoMotorsPictures: {
            _$class: msls.ContentItem,
            _$name: "ContosoMotorsPictures",
            _$parentName: "ContosoMotorsPicturesUploadPopup",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.BrowseInventoryItems,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.BrowseInventoryItems,
                _$entry: {
                    elementType: lightSwitchApplication.ContosoMotorsPicture
                }
            }
        },
        ContosoMotorsPicturesTemplate: {
            _$class: msls.ContentItem,
            _$name: "ContosoMotorsPicturesTemplate",
            _$parentName: "ContosoMotorsPictures",
            screen: lightSwitchApplication.BrowseInventoryItems,
            data: lightSwitchApplication.ContosoMotorsPicture,
            value: lightSwitchApplication.ContosoMotorsPicture
        }
    };

    msls._addEntryPoints(lightSwitchApplication.BrowseInventoryItems, {
        /// <field>
        /// Called when a new BrowseInventoryItems screen is created.
        /// <br/>created(msls.application.BrowseInventoryItems screen)
        /// </field>
        created: [lightSwitchApplication.BrowseInventoryItems],
        /// <field>
        /// Called before changes on an active BrowseInventoryItems screen are applied.
        /// <br/>beforeApplyChanges(msls.application.BrowseInventoryItems screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.BrowseInventoryItems],
        /// <field>
        /// Called to determine if the AddNewInventoryItem method can be executed.
        /// <br/>canExecute(msls.application.BrowseInventoryItems screen)
        /// </field>
        AddNewInventoryItem_canExecute: [lightSwitchApplication.BrowseInventoryItems],
        /// <field>
        /// Called to execute the AddNewInventoryItem method.
        /// <br/>execute(msls.application.BrowseInventoryItems screen)
        /// </field>
        AddNewInventoryItem_execute: [lightSwitchApplication.BrowseInventoryItems],
        /// <field>
        /// Called after the SellerDashboard content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        SellerDashboard_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("SellerDashboard"); }],
        /// <field>
        /// Called after the Group content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("Group"); }],
        /// <field>
        /// Called after the LeftNavigation content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        LeftNavigation_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("LeftNavigation"); }],
        /// <field>
        /// Called to render the ContosoTradeMark content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContosoTradeMark_render: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("ContosoTradeMark"); }],
        /// <field>
        /// Called to render the ButtonBoard content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ButtonBoard_render: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("ButtonBoard"); }],
        /// <field>
        /// Called after the DataContent content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        DataContent_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("DataContent"); }],
        /// <field>
        /// Called after the DataContentGroup1 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        DataContentGroup1_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("DataContentGroup1"); }],
        /// <field>
        /// Called after the DataContentTitle content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        DataContentTitle_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("DataContentTitle"); }],
        /// <field>
        /// Called to render the RetailerTitle content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        RetailerTitle_render: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("RetailerTitle"); }],
        /// <field>
        /// Called after the DataContentControl content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        DataContentControl_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("DataContentControl"); }],
        /// <field>
        /// Called to render the RefreshButton content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        RefreshButton_render: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("RefreshButton"); }],
        /// <field>
        /// Called to render the AddButton content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        AddButton_render: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("AddButton"); }],
        /// <field>
        /// Called after the SearchParam content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        SearchParam_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("SearchParam"); }],
        /// <field>
        /// Called after the ContosoMotorsQueryListView content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContosoMotorsQueryListView_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("ContosoMotorsQueryListView"); }],
        /// <field>
        /// Called after the ContosoMotorsQueryTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContosoMotorsQueryTemplate_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("ContosoMotorsQueryTemplate"); }],
        /// <field>
        /// Called to render the ThumbnailUrl content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ThumbnailUrl_render: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("ThumbnailUrl"); }],
        /// <field>
        /// Called after the StockNo content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        StockNo_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("StockNo"); }],
        /// <field>
        /// Called after the Brand content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Brand_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("Brand"); }],
        /// <field>
        /// Called after the Model content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Model_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("Model"); }],
        /// <field>
        /// Called after the Engine content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Engine_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("Engine"); }],
        /// <field>
        /// Called after the Price content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Price_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("Price"); }],
        /// <field>
        /// Called after the Status content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Status_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("Status"); }],
        /// <field>
        /// Called to render the ContactEmail content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContactEmail_render: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("ContactEmail"); }],
        /// <field>
        /// Called after the ContosoMotorsPicturesUploadPopup content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContosoMotorsPicturesUploadPopup_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("ContosoMotorsPicturesUploadPopup"); }],
        /// <field>
        /// Called after the ContosoMotorsPictures content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContosoMotorsPictures_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("ContosoMotorsPictures"); }],
        /// <field>
        /// Called after the ContosoMotorsPicturesTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContosoMotorsPicturesTemplate_postRender: [$element, function () { return new lightSwitchApplication.BrowseInventoryItems().findContentItem("ContosoMotorsPicturesTemplate"); }]
    });

    lightSwitchApplication.ViewInventoryItem.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.ViewInventoryItem
        },
        Details: {
            _$class: msls.ContentItem,
            _$name: "Details",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.ViewInventoryItem,
            value: lightSwitchApplication.ViewInventoryItem
        },
        columns: {
            _$class: msls.ContentItem,
            _$name: "columns",
            _$parentName: "Details",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.ViewInventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailsLeft: {
            _$class: msls.ContentItem,
            _$name: "CarDetailsLeft",
            _$parentName: "columns",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailLeftGroup1: {
            _$class: msls.ContentItem,
            _$name: "CarDetailLeftGroup1",
            _$parentName: "CarDetailsLeft",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        Tittle: {
            _$class: msls.ContentItem,
            _$name: "Tittle",
            _$parentName: "CarDetailLeftGroup1",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_Picture: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_Picture",
            _$parentName: "CarDetailsLeft",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        Upload: {
            _$class: msls.ContentItem,
            _$name: "Upload",
            _$parentName: "CarDetailsLeft",
            screen: lightSwitchApplication.ViewInventoryItem
        },
        CarDetailLeftGroup2: {
            _$class: msls.ContentItem,
            _$name: "CarDetailLeftGroup2",
            _$parentName: "CarDetailsLeft",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_Brand: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_Brand",
            _$parentName: "CarDetailLeftGroup2",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_Model: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_Model",
            _$parentName: "CarDetailLeftGroup2",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_Price: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_Price",
            _$parentName: "CarDetailsLeft",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        ContactStatus: {
            _$class: msls.ContentItem,
            _$name: "ContactStatus",
            _$parentName: "CarDetailsLeft",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_ContactPhone: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_ContactPhone",
            _$parentName: "CarDetailsLeft",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailsRight: {
            _$class: msls.ContentItem,
            _$name: "CarDetailsRight",
            _$parentName: "columns",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        Group: {
            _$class: msls.ContentItem,
            _$name: "Group",
            _$parentName: "CarDetailsRight",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        EditButton: {
            _$class: msls.ContentItem,
            _$name: "EditButton",
            _$parentName: "Group",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        DeleteButton: {
            _$class: msls.ContentItem,
            _$name: "DeleteButton",
            _$parentName: "Group",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailsRightPadding: {
            _$class: msls.ContentItem,
            _$name: "CarDetailsRightPadding",
            _$parentName: "CarDetailsRight",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailsRightGroup1: {
            _$class: msls.ContentItem,
            _$name: "CarDetailsRightGroup1",
            _$parentName: "CarDetailsRight",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_Engine: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_Engine",
            _$parentName: "CarDetailsRightGroup1",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_BodyStyle: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_BodyStyle",
            _$parentName: "CarDetailsRightGroup1",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailsRightGroup2: {
            _$class: msls.ContentItem,
            _$name: "CarDetailsRightGroup2",
            _$parentName: "CarDetailsRight",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_Transmission: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_Transmission",
            _$parentName: "CarDetailsRightGroup2",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_MaxPower: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_MaxPower",
            _$parentName: "CarDetailsRightGroup2",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailsRightGroup3: {
            _$class: msls.ContentItem,
            _$name: "CarDetailsRightGroup3",
            _$parentName: "CarDetailsRight",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_ExtColor: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_ExtColor",
            _$parentName: "CarDetailsRightGroup3",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_IntColor: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_IntColor",
            _$parentName: "CarDetailsRightGroup3",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailsRightGroup4: {
            _$class: msls.ContentItem,
            _$name: "CarDetailsRightGroup4",
            _$parentName: "CarDetailsRight",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_ArrivedDate: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_ArrivedDate",
            _$parentName: "CarDetailsRightGroup4",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_Status: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_Status",
            _$parentName: "CarDetailsRightGroup4",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailsRightGroup5: {
            _$class: msls.ContentItem,
            _$name: "CarDetailsRightGroup5",
            _$parentName: "CarDetailsRight",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_StockNo: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_StockNo",
            _$parentName: "CarDetailsRightGroup5",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_Year: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_Year",
            _$parentName: "CarDetailsRightGroup5",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetailsRightGroup6: {
            _$class: msls.ContentItem,
            _$name: "CarDetailsRightGroup6",
            _$parentName: "CarDetailsRight",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        CarDetails_BuyerEmail: {
            _$class: msls.ContentItem,
            _$name: "CarDetails_BuyerEmail",
            _$parentName: "CarDetailsRightGroup6",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.ViewInventoryItem
        },
        UploadPhotos: {
            _$class: msls.ContentItem,
            _$name: "UploadPhotos",
            _$parentName: "Popups",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.ViewInventoryItem,
            value: lightSwitchApplication.ViewInventoryItem
        },
        UploadControl: {
            _$class: msls.ContentItem,
            _$name: "UploadControl",
            _$parentName: "UploadPhotos",
            screen: lightSwitchApplication.ViewInventoryItem,
            data: lightSwitchApplication.ViewInventoryItem,
            value: lightSwitchApplication.ViewInventoryItem
        },
        UploadPhoto: {
            _$class: msls.ContentItem,
            _$name: "UploadPhoto",
            _$parentName: "UploadPhotos",
            screen: lightSwitchApplication.ViewInventoryItem
        }
    };

    msls._addEntryPoints(lightSwitchApplication.ViewInventoryItem, {
        /// <field>
        /// Called when a new ViewInventoryItem screen is created.
        /// <br/>created(msls.application.ViewInventoryItem screen)
        /// </field>
        created: [lightSwitchApplication.ViewInventoryItem],
        /// <field>
        /// Called before changes on an active ViewInventoryItem screen are applied.
        /// <br/>beforeApplyChanges(msls.application.ViewInventoryItem screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.ViewInventoryItem],
        /// <field>
        /// Called to determine if the delete method can be executed.
        /// <br/>canExecute(msls.application.ViewInventoryItem screen)
        /// </field>
        delete_canExecute: [lightSwitchApplication.ViewInventoryItem],
        /// <field>
        /// Called to execute the delete method.
        /// <br/>execute(msls.application.ViewInventoryItem screen)
        /// </field>
        delete_execute: [lightSwitchApplication.ViewInventoryItem],
        /// <field>
        /// Called to determine if the Upload method can be executed.
        /// <br/>canExecute(msls.application.ViewInventoryItem screen)
        /// </field>
        Upload_canExecute: [lightSwitchApplication.ViewInventoryItem],
        /// <field>
        /// Called to execute the Upload method.
        /// <br/>execute(msls.application.ViewInventoryItem screen)
        /// </field>
        Upload_execute: [lightSwitchApplication.ViewInventoryItem],
        /// <field>
        /// Called to determine if the UploadPhoto method can be executed.
        /// <br/>canExecute(msls.application.ViewInventoryItem screen)
        /// </field>
        UploadPhoto_canExecute: [lightSwitchApplication.ViewInventoryItem],
        /// <field>
        /// Called to execute the UploadPhoto method.
        /// <br/>execute(msls.application.ViewInventoryItem screen)
        /// </field>
        UploadPhoto_execute: [lightSwitchApplication.ViewInventoryItem],
        /// <field>
        /// Called after the Details content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Details_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("Details"); }],
        /// <field>
        /// Called after the columns content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        columns_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("columns"); }],
        /// <field>
        /// Called after the CarDetailsLeft content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailsLeft_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailsLeft"); }],
        /// <field>
        /// Called after the CarDetailLeftGroup1 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailLeftGroup1_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailLeftGroup1"); }],
        /// <field>
        /// Called to render the Tittle content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Tittle_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("Tittle"); }],
        /// <field>
        /// Called to render the CarDetails_Picture content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_Picture_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_Picture"); }],
        /// <field>
        /// Called after the Upload content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Upload_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("Upload"); }],
        /// <field>
        /// Called after the CarDetailLeftGroup2 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailLeftGroup2_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailLeftGroup2"); }],
        /// <field>
        /// Called to render the CarDetails_Brand content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_Brand_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_Brand"); }],
        /// <field>
        /// Called to render the CarDetails_Model content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_Model_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_Model"); }],
        /// <field>
        /// Called to render the CarDetails_Price content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_Price_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_Price"); }],
        /// <field>
        /// Called to render the ContactStatus content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContactStatus_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("ContactStatus"); }],
        /// <field>
        /// Called to render the CarDetails_ContactPhone content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_ContactPhone_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_ContactPhone"); }],
        /// <field>
        /// Called after the CarDetailsRight content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailsRight_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailsRight"); }],
        /// <field>
        /// Called after the Group content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("Group"); }],
        /// <field>
        /// Called to render the EditButton content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EditButton_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("EditButton"); }],
        /// <field>
        /// Called to render the DeleteButton content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        DeleteButton_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("DeleteButton"); }],
        /// <field>
        /// Called to render the CarDetailsRightPadding content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailsRightPadding_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailsRightPadding"); }],
        /// <field>
        /// Called after the CarDetailsRightGroup1 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailsRightGroup1_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailsRightGroup1"); }],
        /// <field>
        /// Called to render the CarDetails_Engine content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_Engine_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_Engine"); }],
        /// <field>
        /// Called to render the CarDetails_BodyStyle content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_BodyStyle_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_BodyStyle"); }],
        /// <field>
        /// Called after the CarDetailsRightGroup2 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailsRightGroup2_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailsRightGroup2"); }],
        /// <field>
        /// Called to render the CarDetails_Transmission content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_Transmission_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_Transmission"); }],
        /// <field>
        /// Called to render the CarDetails_MaxPower content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_MaxPower_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_MaxPower"); }],
        /// <field>
        /// Called after the CarDetailsRightGroup3 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailsRightGroup3_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailsRightGroup3"); }],
        /// <field>
        /// Called to render the CarDetails_ExtColor content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_ExtColor_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_ExtColor"); }],
        /// <field>
        /// Called to render the CarDetails_IntColor content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_IntColor_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_IntColor"); }],
        /// <field>
        /// Called after the CarDetailsRightGroup4 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailsRightGroup4_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailsRightGroup4"); }],
        /// <field>
        /// Called to render the CarDetails_ArrivedDate content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_ArrivedDate_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_ArrivedDate"); }],
        /// <field>
        /// Called to render the CarDetails_Status content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_Status_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_Status"); }],
        /// <field>
        /// Called after the CarDetailsRightGroup5 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailsRightGroup5_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailsRightGroup5"); }],
        /// <field>
        /// Called to render the CarDetails_StockNo content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_StockNo_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_StockNo"); }],
        /// <field>
        /// Called to render the CarDetails_Year content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_Year_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_Year"); }],
        /// <field>
        /// Called after the CarDetailsRightGroup6 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetailsRightGroup6_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetailsRightGroup6"); }],
        /// <field>
        /// Called to render the CarDetails_BuyerEmail content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CarDetails_BuyerEmail_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("CarDetails_BuyerEmail"); }],
        /// <field>
        /// Called after the UploadPhotos content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        UploadPhotos_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("UploadPhotos"); }],
        /// <field>
        /// Called to render the UploadControl content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        UploadControl_render: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("UploadControl"); }],
        /// <field>
        /// Called after the UploadPhoto content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        UploadPhoto_postRender: [$element, function () { return new lightSwitchApplication.ViewInventoryItem().findContentItem("UploadPhoto"); }]
    });

    lightSwitchApplication.AddInventoryItem.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddInventoryItem
        },
        Details: {
            _$class: msls.ContentItem,
            _$name: "Details",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.AddInventoryItem,
            value: lightSwitchApplication.AddInventoryItem
        },
        columns: {
            _$class: msls.ContentItem,
            _$name: "columns",
            _$parentName: "Details",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.AddInventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        left: {
            _$class: msls.ContentItem,
            _$name: "left",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        ArrivedDate: {
            _$class: msls.ContentItem,
            _$name: "ArrivedDate",
            _$parentName: "left",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: Date
        },
        BodyStyle: {
            _$class: msls.ContentItem,
            _$name: "BodyStyle",
            _$parentName: "left",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Brand: {
            _$class: msls.ContentItem,
            _$name: "Brand",
            _$parentName: "left",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        BuyerEmail: {
            _$class: msls.ContentItem,
            _$name: "BuyerEmail",
            _$parentName: "left",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        ContactEmail: {
            _$class: msls.ContentItem,
            _$name: "ContactEmail",
            _$parentName: "left",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        ContactName: {
            _$class: msls.ContentItem,
            _$name: "ContactName",
            _$parentName: "left",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        ContactPhone: {
            _$class: msls.ContentItem,
            _$name: "ContactPhone",
            _$parentName: "left",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Engine: {
            _$class: msls.ContentItem,
            _$name: "Engine",
            _$parentName: "left",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        ExtColor: {
            _$class: msls.ContentItem,
            _$name: "ExtColor",
            _$parentName: "left",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        right: {
            _$class: msls.ContentItem,
            _$name: "right",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: lightSwitchApplication.InventoryItem
        },
        IntColor: {
            _$class: msls.ContentItem,
            _$name: "IntColor",
            _$parentName: "right",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        MaxPower: {
            _$class: msls.ContentItem,
            _$name: "MaxPower",
            _$parentName: "right",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: Number
        },
        Model: {
            _$class: msls.ContentItem,
            _$name: "Model",
            _$parentName: "right",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Price: {
            _$class: msls.ContentItem,
            _$name: "Price",
            _$parentName: "right",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Status: {
            _$class: msls.ContentItem,
            _$name: "Status",
            _$parentName: "right",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Transmission: {
            _$class: msls.ContentItem,
            _$name: "Transmission",
            _$parentName: "right",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: String
        },
        Year: {
            _$class: msls.ContentItem,
            _$name: "Year",
            _$parentName: "right",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.InventoryItem,
            value: Number
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddInventoryItem
        },
        UploadPhotos: {
            _$class: msls.ContentItem,
            _$name: "UploadPhotos",
            _$parentName: "Popups",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.AddInventoryItem,
            value: lightSwitchApplication.AddInventoryItem
        },
        UploadControl: {
            _$class: msls.ContentItem,
            _$name: "UploadControl",
            _$parentName: "UploadPhotos",
            screen: lightSwitchApplication.AddInventoryItem,
            data: lightSwitchApplication.AddInventoryItem,
            value: lightSwitchApplication.AddInventoryItem
        },
        UploadPhoto: {
            _$class: msls.ContentItem,
            _$name: "UploadPhoto",
            _$parentName: "UploadPhotos",
            screen: lightSwitchApplication.AddInventoryItem
        }
    };

    msls._addEntryPoints(lightSwitchApplication.AddInventoryItem, {
        /// <field>
        /// Called when a new AddInventoryItem screen is created.
        /// <br/>created(msls.application.AddInventoryItem screen)
        /// </field>
        created: [lightSwitchApplication.AddInventoryItem],
        /// <field>
        /// Called before changes on an active AddInventoryItem screen are applied.
        /// <br/>beforeApplyChanges(msls.application.AddInventoryItem screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.AddInventoryItem],
        /// <field>
        /// Called to determine if the Upload method can be executed.
        /// <br/>canExecute(msls.application.AddInventoryItem screen)
        /// </field>
        Upload_canExecute: [lightSwitchApplication.AddInventoryItem],
        /// <field>
        /// Called to execute the Upload method.
        /// <br/>execute(msls.application.AddInventoryItem screen)
        /// </field>
        Upload_execute: [lightSwitchApplication.AddInventoryItem],
        /// <field>
        /// Called to determine if the UploadPhoto method can be executed.
        /// <br/>canExecute(msls.application.AddInventoryItem screen)
        /// </field>
        UploadPhoto_canExecute: [lightSwitchApplication.AddInventoryItem],
        /// <field>
        /// Called to execute the UploadPhoto method.
        /// <br/>execute(msls.application.AddInventoryItem screen)
        /// </field>
        UploadPhoto_execute: [lightSwitchApplication.AddInventoryItem],
        /// <field>
        /// Called after the Details content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Details_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("Details"); }],
        /// <field>
        /// Called after the columns content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        columns_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("columns"); }],
        /// <field>
        /// Called after the left content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        left_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("left"); }],
        /// <field>
        /// Called after the ArrivedDate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ArrivedDate_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("ArrivedDate"); }],
        /// <field>
        /// Called after the BodyStyle content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        BodyStyle_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("BodyStyle"); }],
        /// <field>
        /// Called after the Brand content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Brand_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("Brand"); }],
        /// <field>
        /// Called after the BuyerEmail content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        BuyerEmail_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("BuyerEmail"); }],
        /// <field>
        /// Called after the ContactEmail content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContactEmail_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("ContactEmail"); }],
        /// <field>
        /// Called after the ContactName content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContactName_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("ContactName"); }],
        /// <field>
        /// Called after the ContactPhone content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ContactPhone_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("ContactPhone"); }],
        /// <field>
        /// Called after the Engine content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Engine_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("Engine"); }],
        /// <field>
        /// Called after the ExtColor content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ExtColor_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("ExtColor"); }],
        /// <field>
        /// Called after the right content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        right_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("right"); }],
        /// <field>
        /// Called after the IntColor content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        IntColor_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("IntColor"); }],
        /// <field>
        /// Called after the MaxPower content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        MaxPower_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("MaxPower"); }],
        /// <field>
        /// Called after the Model content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Model_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("Model"); }],
        /// <field>
        /// Called after the Price content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Price_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("Price"); }],
        /// <field>
        /// Called after the Status content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Status_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("Status"); }],
        /// <field>
        /// Called after the Transmission content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Transmission_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("Transmission"); }],
        /// <field>
        /// Called after the Year content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Year_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("Year"); }],
        /// <field>
        /// Called after the UploadPhotos content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        UploadPhotos_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("UploadPhotos"); }],
        /// <field>
        /// Called to render the UploadControl content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        UploadControl_render: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("UploadControl"); }],
        /// <field>
        /// Called after the UploadPhoto content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        UploadPhoto_postRender: [$element, function () { return new lightSwitchApplication.AddInventoryItem().findContentItem("UploadPhoto"); }]
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
