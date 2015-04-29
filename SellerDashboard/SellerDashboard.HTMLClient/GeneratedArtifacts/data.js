// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

/// <reference path="../Scripts/msls.js" />

window.myapp = msls.application;

(function (lightSwitchApplication) {

    var $Entity = msls.Entity,
        $DataService = msls.DataService,
        $DataWorkspace = msls.DataWorkspace,
        $defineEntity = msls._defineEntity,
        $defineDataService = msls._defineDataService,
        $defineDataWorkspace = msls._defineDataWorkspace,
        $DataServiceQuery = msls.DataServiceQuery,
        $toODataString = msls._toODataString;

    function InventoryItem(entitySet) {
        /// <summary>
        /// Represents the InventoryItem entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this inventoryItem.
        /// </param>
        /// <field name="ArrivedDate" type="Date">
        /// Gets or sets the arrivedDate for this inventoryItem.
        /// </field>
        /// <field name="BodyStyle" type="String">
        /// Gets or sets the bodyStyle for this inventoryItem.
        /// </field>
        /// <field name="Brand" type="String">
        /// Gets or sets the brand for this inventoryItem.
        /// </field>
        /// <field name="BuyerEmail" type="String">
        /// Gets or sets the buyerEmail for this inventoryItem.
        /// </field>
        /// <field name="ContactEmail" type="String">
        /// Gets or sets the contactEmail for this inventoryItem.
        /// </field>
        /// <field name="ContactName" type="String">
        /// Gets or sets the contactName for this inventoryItem.
        /// </field>
        /// <field name="ContactPhone" type="String">
        /// Gets or sets the contactPhone for this inventoryItem.
        /// </field>
        /// <field name="Engine" type="String">
        /// Gets or sets the engine for this inventoryItem.
        /// </field>
        /// <field name="ExtColor" type="String">
        /// Gets or sets the extColor for this inventoryItem.
        /// </field>
        /// <field name="ID" type="Number">
        /// Gets or sets the iD for this inventoryItem.
        /// </field>
        /// <field name="IntColor" type="String">
        /// Gets or sets the intColor for this inventoryItem.
        /// </field>
        /// <field name="MaxPower" type="Number">
        /// Gets or sets the maxPower for this inventoryItem.
        /// </field>
        /// <field name="Model" type="String">
        /// Gets or sets the model for this inventoryItem.
        /// </field>
        /// <field name="Price" type="String">
        /// Gets or sets the price for this inventoryItem.
        /// </field>
        /// <field name="Removed" type="Boolean">
        /// Gets or sets the removed for this inventoryItem.
        /// </field>
        /// <field name="Status" type="String">
        /// Gets or sets the status for this inventoryItem.
        /// </field>
        /// <field name="Transmission" type="String">
        /// Gets or sets the transmission for this inventoryItem.
        /// </field>
        /// <field name="Year" type="Number">
        /// Gets or sets the year for this inventoryItem.
        /// </field>
        /// <field name="IsValid" type="Boolean">
        /// Gets or sets the isValid for this inventoryItem.
        /// </field>
        /// <field name="ContosoMotorsPicture" type="ContosoMotorsPicture">
        /// Gets or sets the contosoMotorsPicture for this inventoryItem.
        /// </field>
        /// <field name="StockNo" type="String">
        /// Gets or sets the stockNo for this inventoryItem.
        /// </field>
        /// <field name="details" type="msls.application.InventoryItem.Details">
        /// Gets the details for this inventoryItem.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function ContosoMotorsPicture(entitySet) {
        /// <summary>
        /// Represents the ContosoMotorsPicture entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this contosoMotorsPicture.
        /// </param>
        /// <field name="Name" type="String">
        /// Gets or sets the name for this contosoMotorsPicture.
        /// </field>
        /// <field name="Title" type="String">
        /// Gets or sets the title for this contosoMotorsPicture.
        /// </field>
        /// <field name="Id" type="Number">
        /// Gets or sets the id for this contosoMotorsPicture.
        /// </field>
        /// <field name="ContentTypeID" type="String">
        /// Gets or sets the contentTypeID for this contosoMotorsPicture.
        /// </field>
        /// <field name="PictureWidth" type="Number">
        /// Gets or sets the pictureWidth for this contosoMotorsPicture.
        /// </field>
        /// <field name="PictureHeight" type="Number">
        /// Gets or sets the pictureHeight for this contosoMotorsPicture.
        /// </field>
        /// <field name="DatePictureTaken" type="Date">
        /// Gets or sets the datePictureTaken for this contosoMotorsPicture.
        /// </field>
        /// <field name="Description" type="String">
        /// Used as alternative text for the picture.
        /// </field>
        /// <field name="Keywords" type="String">
        /// For example: scenery, mountains, trees, nature
        /// </field>
        /// <field name="StockID" type="String">
        /// Gets or sets the stockID for this contosoMotorsPicture.
        /// </field>
        /// <field name="ContentType" type="String">
        /// Gets or sets the contentType for this contosoMotorsPicture.
        /// </field>
        /// <field name="Created" type="Date">
        /// Gets or sets the created for this contosoMotorsPicture.
        /// </field>
        /// <field name="Modified" type="Date">
        /// Gets or sets the modified for this contosoMotorsPicture.
        /// </field>
        /// <field name="CopySource" type="String">
        /// Gets or sets the copySource for this contosoMotorsPicture.
        /// </field>
        /// <field name="ApprovalStatus" type="String">
        /// Gets or sets the approvalStatus for this contosoMotorsPicture.
        /// </field>
        /// <field name="Path" type="String">
        /// Gets or sets the path for this contosoMotorsPicture.
        /// </field>
        /// <field name="VirusStatus" type="String">
        /// Gets or sets the virusStatus for this contosoMotorsPicture.
        /// </field>
        /// <field name="IsCurrentVersion" type="Boolean">
        /// Gets or sets the isCurrentVersion for this contosoMotorsPicture.
        /// </field>
        /// <field name="Owshiddenversion" type="Number">
        /// Gets or sets the owshiddenversion for this contosoMotorsPicture.
        /// </field>
        /// <field name="Version" type="String">
        /// Gets or sets the version for this contosoMotorsPicture.
        /// </field>
        /// <field name="CreatedBy" type="msls.application.UserInformationList">
        /// Gets or sets the createdBy for this contosoMotorsPicture.
        /// </field>
        /// <field name="ModifiedBy" type="msls.application.UserInformationList">
        /// Gets or sets the modifiedBy for this contosoMotorsPicture.
        /// </field>
        /// <field name="CheckedOutTo" type="msls.application.UserInformationList">
        /// Gets or sets the checkedOutTo for this contosoMotorsPicture.
        /// </field>
        /// <field name="InventoryItem" type="InventoryItem">
        /// Gets or sets the inventoryItem for this contosoMotorsPicture.
        /// </field>
        /// <field name="ContactPhoto" type="String">
        /// Gets or sets the contactPhoto for this contosoMotorsPicture.
        /// </field>
        /// <field name="FullImageUrl" type="String">
        /// Gets or sets the fullImageUrl for this contosoMotorsPicture.
        /// </field>
        /// <field name="ThumbnailUrl" type="String">
        /// Gets or sets the thumbnailUrl for this contosoMotorsPicture.
        /// </field>
        /// <field name="StockNo" type="String">
        /// Gets or sets the stockNo for this contosoMotorsPicture.
        /// </field>
        /// <field name="details" type="msls.application.ContosoMotorsPicture.Details">
        /// Gets the details for this contosoMotorsPicture.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function UserInformationList(entitySet) {
        /// <summary>
        /// All people.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this userInformationList.
        /// </param>
        /// <field name="Id" type="Number">
        /// Gets or sets the id for this userInformationList.
        /// </field>
        /// <field name="ContentType" type="String">
        /// Gets or sets the contentType for this userInformationList.
        /// </field>
        /// <field name="ContentTypeID" type="String">
        /// Gets or sets the contentTypeID for this userInformationList.
        /// </field>
        /// <field name="Name" type="String">
        /// Gets or sets the name for this userInformationList.
        /// </field>
        /// <field name="Account" type="String">
        /// Gets or sets the account for this userInformationList.
        /// </field>
        /// <field name="WorkEmail" type="String">
        /// Gets or sets the workEmail for this userInformationList.
        /// </field>
        /// <field name="MobilePhone" type="String">
        /// Gets or sets the mobilePhone for this userInformationList.
        /// </field>
        /// <field name="AboutMe" type="String">
        /// Gets or sets the aboutMe for this userInformationList.
        /// </field>
        /// <field name="SIPAddress" type="String">
        /// Gets or sets the sIPAddress for this userInformationList.
        /// </field>
        /// <field name="IsSiteAdmin" type="Boolean">
        /// Gets or sets the isSiteAdmin for this userInformationList.
        /// </field>
        /// <field name="Deleted" type="Boolean">
        /// Gets or sets the deleted for this userInformationList.
        /// </field>
        /// <field name="Hidden" type="Boolean">
        /// Gets or sets the hidden for this userInformationList.
        /// </field>
        /// <field name="Picture" type="String">
        /// Gets or sets the picture for this userInformationList.
        /// </field>
        /// <field name="Department" type="String">
        /// Gets or sets the department for this userInformationList.
        /// </field>
        /// <field name="Title" type="String">
        /// Gets or sets the title for this userInformationList.
        /// </field>
        /// <field name="FirstName" type="String">
        /// Gets or sets the firstName for this userInformationList.
        /// </field>
        /// <field name="LastName" type="String">
        /// Gets or sets the lastName for this userInformationList.
        /// </field>
        /// <field name="WorkPhone" type="String">
        /// Gets or sets the workPhone for this userInformationList.
        /// </field>
        /// <field name="UserName" type="String">
        /// Gets or sets the userName for this userInformationList.
        /// </field>
        /// <field name="WebSite" type="String">
        /// Gets or sets the webSite for this userInformationList.
        /// </field>
        /// <field name="AskMeAbout" type="String">
        /// Gets or sets the askMeAbout for this userInformationList.
        /// </field>
        /// <field name="Office" type="String">
        /// Gets or sets the office for this userInformationList.
        /// </field>
        /// <field name="PictureTimestamp" type="String">
        /// Gets or sets the pictureTimestamp for this userInformationList.
        /// </field>
        /// <field name="PicturePlaceholderState" type="Number">
        /// Gets or sets the picturePlaceholderState for this userInformationList.
        /// </field>
        /// <field name="PictureExchangeSyncState" type="Number">
        /// Gets or sets the pictureExchangeSyncState for this userInformationList.
        /// </field>
        /// <field name="Modified" type="Date">
        /// Gets or sets the modified for this userInformationList.
        /// </field>
        /// <field name="Created" type="Date">
        /// Gets or sets the created for this userInformationList.
        /// </field>
        /// <field name="Owshiddenversion" type="Number">
        /// Gets or sets the owshiddenversion for this userInformationList.
        /// </field>
        /// <field name="Version" type="String">
        /// Gets or sets the version for this userInformationList.
        /// </field>
        /// <field name="Path" type="String">
        /// Gets or sets the path for this userInformationList.
        /// </field>
        /// <field name="CreatedBy" type="msls.application.UserInformationList">
        /// Gets or sets the createdBy for this userInformationList.
        /// </field>
        /// <field name="ModifiedBy" type="msls.application.UserInformationList">
        /// Gets or sets the modifiedBy for this userInformationList.
        /// </field>
        /// <field name="details" type="msls.application.UserInformationList.Details">
        /// Gets the details for this userInformationList.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function ContosoMotorsCarInventory(dataWorkspace) {
        /// <summary>
        /// Represents the ContosoMotorsCarInventory data service.
        /// </summary>
        /// <param name="dataWorkspace" type="msls.DataWorkspace">
        /// The data workspace that created this data service.
        /// </param>
        /// <field name="InventoryItems" type="msls.EntitySet">
        /// Gets the InventoryItems entity set.
        /// </field>
        /// <field name="details" type="msls.application.ContosoMotorsCarInventory.Details">
        /// Gets the details for this data service.
        /// </field>
        $DataService.call(this, dataWorkspace);
    };

    function ContosoMotorsPictureLibrary(dataWorkspace) {
        /// <summary>
        /// Represents the ContosoMotorsPictureLibrary data service.
        /// </summary>
        /// <param name="dataWorkspace" type="msls.DataWorkspace">
        /// The data workspace that created this data service.
        /// </param>
        /// <field name="ContosoMotorsPictures" type="msls.EntitySet">
        /// Gets the ContosoMotorsPictures entity set.
        /// </field>
        /// <field name="UserInformationLists" type="msls.EntitySet">
        /// Gets the UserInformationLists entity set.
        /// </field>
        /// <field name="details" type="msls.application.ContosoMotorsPictureLibrary.Details">
        /// Gets the details for this data service.
        /// </field>
        $DataService.call(this, dataWorkspace);
    };
    function DataWorkspace() {
        /// <summary>
        /// Represents the data workspace.
        /// </summary>
        /// <field name="ContosoMotorsCarInventory" type="msls.application.ContosoMotorsCarInventory">
        /// Gets the ContosoMotorsCarInventory data service.
        /// </field>
        /// <field name="ContosoMotorsPictureLibrary" type="msls.application.ContosoMotorsPictureLibrary">
        /// Gets the ContosoMotorsPictureLibrary data service.
        /// </field>
        /// <field name="details" type="msls.application.DataWorkspace.Details">
        /// Gets the details for this data workspace.
        /// </field>
        $DataWorkspace.call(this);
    };

    msls._addToNamespace("msls.application", {

        InventoryItem: $defineEntity(InventoryItem, [
            { name: "ArrivedDate", type: Date },
            { name: "BodyStyle", type: String },
            { name: "Brand", type: String },
            { name: "BuyerEmail", type: String },
            { name: "ContactEmail", type: String },
            { name: "ContactName", type: String },
            { name: "ContactPhone", type: String },
            { name: "Engine", type: String },
            { name: "ExtColor", type: String },
            { name: "ID", type: Number },
            { name: "IntColor", type: String },
            { name: "MaxPower", type: Number },
            { name: "Model", type: String },
            { name: "Price", type: String },
            { name: "Removed", type: Boolean, isReadOnly: true },
            { name: "Status", type: String },
            { name: "Transmission", type: String },
            { name: "Year", type: Number },
            { name: "IsValid", type: Boolean, isReadOnly: true },
            { name: "ContosoMotorsPicture", kind: "virtualReference", type: ContosoMotorsPicture },
            { name: "StockNo", type: String }
        ]),

        ContosoMotorsPicture: $defineEntity(ContosoMotorsPicture, [
            { name: "Name", type: String },
            { name: "Title", type: String },
            { name: "Id", type: Number, isReadOnly: true },
            { name: "ContentTypeID", type: String, isReadOnly: true },
            { name: "PictureWidth", type: Number, isReadOnly: true },
            { name: "PictureHeight", type: Number, isReadOnly: true },
            { name: "DatePictureTaken", type: Date },
            { name: "Description", type: String },
            { name: "Keywords", type: String },
            { name: "StockID", type: String },
            { name: "ContentType", type: String },
            { name: "Created", type: Date, isReadOnly: true },
            { name: "Modified", type: Date, isReadOnly: true },
            { name: "CopySource", type: String, isReadOnly: true },
            { name: "ApprovalStatus", type: String },
            { name: "Path", type: String, isReadOnly: true },
            { name: "VirusStatus", type: String, isReadOnly: true },
            { name: "IsCurrentVersion", type: Boolean },
            { name: "Owshiddenversion", type: Number, isReadOnly: true },
            { name: "Version", type: String, isReadOnly: true },
            { name: "CreatedBy", kind: "reference", type: UserInformationList },
            { name: "ModifiedBy", kind: "reference", type: UserInformationList },
            { name: "CheckedOutTo", kind: "reference", type: UserInformationList },
            { name: "InventoryItem", kind: "virtualReference", type: InventoryItem },
            { name: "ContactPhoto", type: String },
            { name: "FullImageUrl", type: String },
            { name: "ThumbnailUrl", type: String },
            { name: "StockNo", type: String }
        ]),

        UserInformationList: $defineEntity(UserInformationList, [
            { name: "Id", type: Number, isReadOnly: true },
            { name: "ContentType", type: String },
            { name: "ContentTypeID", type: String, isReadOnly: true },
            { name: "Name", type: String, isReadOnly: true },
            { name: "Account", type: String, isReadOnly: true },
            { name: "WorkEmail", type: String, isReadOnly: true },
            { name: "MobilePhone", type: String, isReadOnly: true },
            { name: "AboutMe", type: String, isReadOnly: true },
            { name: "SIPAddress", type: String, isReadOnly: true },
            { name: "IsSiteAdmin", type: Boolean, isReadOnly: true },
            { name: "Deleted", type: Boolean, isReadOnly: true },
            { name: "Hidden", type: Boolean, isReadOnly: true },
            { name: "Picture", type: String, isReadOnly: true },
            { name: "Department", type: String, isReadOnly: true },
            { name: "Title", type: String, isReadOnly: true },
            { name: "FirstName", type: String, isReadOnly: true },
            { name: "LastName", type: String, isReadOnly: true },
            { name: "WorkPhone", type: String, isReadOnly: true },
            { name: "UserName", type: String, isReadOnly: true },
            { name: "WebSite", type: String, isReadOnly: true },
            { name: "AskMeAbout", type: String, isReadOnly: true },
            { name: "Office", type: String, isReadOnly: true },
            { name: "PictureTimestamp", type: String, isReadOnly: true },
            { name: "PicturePlaceholderState", type: Number, isReadOnly: true },
            { name: "PictureExchangeSyncState", type: Number, isReadOnly: true },
            { name: "Modified", type: Date, isReadOnly: true },
            { name: "Created", type: Date, isReadOnly: true },
            { name: "Owshiddenversion", type: Number, isReadOnly: true },
            { name: "Version", type: String, isReadOnly: true },
            { name: "Path", type: String, isReadOnly: true },
            { name: "CreatedBy", kind: "reference", type: UserInformationList },
            { name: "ModifiedBy", kind: "reference", type: UserInformationList }
        ]),

        ContosoMotorsCarInventory: $defineDataService(ContosoMotorsCarInventory, lightSwitchApplication.rootUri + "/ContosoMotorsCarInventory.svc", [
            { name: "InventoryItems", elementType: InventoryItem }
        ], [
            {
                name: "InventoryItems_SingleOrDefault", value: function (ID) {
                    return new $DataServiceQuery({ _entitySet: this.InventoryItems },
                        lightSwitchApplication.rootUri + "/ContosoMotorsCarInventory.svc" + "/InventoryItems(" + "ID=" + $toODataString(ID, "Int32?") + ")"
                    );
                }
            },
            {
                name: "ContosoMotorsQuery", value: function (SearchParam, SortColumn, SortOrder, PageParam) {
                    return new $DataServiceQuery({ _entitySet: this.InventoryItems },
                        lightSwitchApplication.rootUri + "/ContosoMotorsCarInventory.svc" + "/ContosoMotorsQuery()",
                        {
                            SearchParam: $toODataString(SearchParam, "String?"),
                            SortColumn: $toODataString(SortColumn, "String?"),
                            SortOrder: $toODataString(SortOrder, "Int32?"),
                            PageParam: $toODataString(PageParam, "Int32?")
                        });
                }
            },
            {
                name: "GetFilteredCarInventory", value: function (searchParam, sortColumn, sortOrder, pageParam) {
                    return new $DataServiceQuery({ _entitySet: this.InventoryItems },
                        lightSwitchApplication.rootUri + "/ContosoMotorsCarInventory.svc" + "/GetFilteredCarInventory()",
                        {
                            searchParam: $toODataString(searchParam, "String?"),
                            sortColumn: $toODataString(sortColumn, "String?"),
                            sortOrder: $toODataString(sortOrder, "Int32?"),
                            pageParam: $toODataString(pageParam, "Int32?")
                        });
                }
            }
        ]),

        ContosoMotorsPictureLibrary: $defineDataService(ContosoMotorsPictureLibrary, lightSwitchApplication.rootUri + "/ContosoMotorsPictureLibrary.svc", [
            { name: "ContosoMotorsPictures", elementType: ContosoMotorsPicture },
            { name: "UserInformationLists", elementType: UserInformationList }
        ], [
            {
                name: "ContosoMotorsPictures_SingleOrDefault", value: function (Id) {
                    return new $DataServiceQuery({ _entitySet: this.ContosoMotorsPictures },
                        lightSwitchApplication.rootUri + "/ContosoMotorsPictureLibrary.svc" + "/ContosoMotorsPictures(" + "Id=" + $toODataString(Id, "Int32?") + ")"
                    );
                }
            },
            {
                name: "UserInformationLists_SingleOrDefault", value: function (Id) {
                    return new $DataServiceQuery({ _entitySet: this.UserInformationLists },
                        lightSwitchApplication.rootUri + "/ContosoMotorsPictureLibrary.svc" + "/UserInformationLists(" + "Id=" + $toODataString(Id, "Int32?") + ")"
                    );
                }
            }
        ]),

        DataWorkspace: $defineDataWorkspace(DataWorkspace, [
            { name: "ContosoMotorsCarInventory", type: ContosoMotorsCarInventory },
            { name: "ContosoMotorsPictureLibrary", type: ContosoMotorsPictureLibrary }
        ])

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
