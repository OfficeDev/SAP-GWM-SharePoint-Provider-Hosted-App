// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseInventoryItems.created = function (screen) {
    createNameCtrlActiveX();
};

myapp.BrowseInventoryItems.RefreshButton_render = function (element, contentItem) {
    $(element).attr("id", "refresh-button-container");
    $(element).addClass("button-container");
    var $refreshContainer = $("<span></span>");
    $refreshContainer.appendTo($(element));
    var $link = $()
    var $refreshIcon = $("<img src='Content/Images/icon-refresh-clickable.png'>");
    var $refreshText = $("<span>Refresh</span>");
    $refreshIcon.appendTo($refreshContainer);
    $refreshText.appendTo($refreshContainer);

    $(element).hover(function () {
        $refreshText.css("color", "#212121");
    }, function () {
        $refreshText.removeAttr("style");
    });

    $(element).click(function () {
        contentItem.screen.ContosoMotorsQuery.load().then(updateChanges(null));
    });
};

myapp.BrowseInventoryItems.AddButton_render = function (element, contentItem) {
    $(element).attr("id", "add-button-container");
    $(element).addClass("button-container");
    var $AddContainer = $("<span></span>");
    $AddContainer.appendTo($(element));
    var $link = $()
    var $AddIcon = $("<img src='Content/Images/icon-add-clickable.png'>");
    var $AddText = $("<span>Add</span>");
    $AddIcon.appendTo($AddContainer);
    $AddText.appendTo($AddContainer);

    $(element).hover(function () {
        $AddText.css("color", "#212121");
    }, function () {
        $AddText.removeAttr("style");
    });

    $(element).click(function () {
        myapp.showAddInventoryItem(null, {
            beforeShown: function (addNewScreen) {
                var newInventoryItem = new myapp.InventoryItem();
                var currentDate = new Date();
                newInventoryItem.ID = 0;
                newInventoryItem.Year = currentDate.getFullYear();
                newInventoryItem.ArrivedDate = currentDate;
                newInventoryItem.StockNo = getStockNo();
                addNewScreen.InventoryItem = newInventoryItem;
            },
            afterClosed: function (addNewScreen, navigationAction) {
                if (navigationAction === msls.NavigateBackAction.commit) {
                    contentItem.screen.ContosoMotorsQuery.load().then(updateChanges(null));
                }
            }
        });
    });
};

myapp.BrowseInventoryItems.SellerDashboard_postRender = function (element, contentItem) {
    chromeBarUiTuning();
    $(element).parent().attr("id", "content-container");
};

myapp.BrowseInventoryItems.ContosoTradeMark_render = function (element, contentItem) {
    $(element).attr("id", "left-navigation-company-logo");
    var addicon = "<img src='Content/Images/ContosoIcon.PNG'/>";
    $(addicon).appendTo($(element));
};

myapp.BrowseInventoryItems.ButtonBoard_render = function (element, contentItem) {
    $(element).addClass("left-navigation-seller-dashboard-section");
    $(element).attr("id", contosoGlobal.companyItem.TableName + "Navigation");
    $(element).css("background-color", "#cce3f4");
    var $section = $("<div>Seller Dashboard</div>");
    $section.appendTo($(element));
};

myapp.BrowseInventoryItems.RetailerTitle_render = function (element, contentItem) {
    $(element).addClass("retailer-title-container");

    var $title = $("<span id='RetailerTitle' class='retailer-title'>" + contosoGlobal.companyItem.TableTitle + "</span>");
    $title.appendTo($(element));
};

myapp.BrowseInventoryItems.ContosoMotorsQueryListView_postRender = function (element, contentItem) {
    initListView(element, contentItem);
};

myapp.BrowseInventoryItems.DataContent_postRender = function (element, contentItem) {
    $(element).attr("id", "DataContentPane");
    $(element).addClass("data-content-pane");
    enableInfiniteScroll(element, contentItem.screen);
};

myapp.BrowseInventoryItems.Method_execute = function (screen) {
    screen.ContosoMotorsQuery.load();
};

myapp.BrowseInventoryItems.LeftNavigation_postRender = function (element, contentItem) {
    $(element).addClass("left-navigation");
};

myapp.BrowseInventoryItems.SearchParam_postRender = function (element, contentItem) {
    initSearchBox(element, contentItem);
};

myapp.BrowseInventoryItems.ContactEmail_render = function (element, contentItem) {
    $dataTemplate = $('<span></span>');
    $dataTemplate.appendTo($(element));
    setBrowserContact($dataTemplate, contentItem.data);
};

myapp.BrowseInventoryItems.ThumbnailUrl_render = function (element, contentItem) {
    // Write code here.
    var $pictureContainer = $('<div class="msls-clear msls-presenter msls-ctl-value-custom-control msls-vauto msls-hauto msls-compact-padding msls-leaf msls-redraw msls-presenter-content msls-font-style-normal tile-view-picture"></div>');
    $pictureContainer.appendTo($(element));

    var $pictureLoadingIndicator = $('<div class="msls-list-loading"></div>');
    $pictureLoadingIndicator.appendTo($pictureContainer);
    
    //contentItem.screen.ContosoMo
    contentItem.data.getContosoMotorsPicture().then(function (picture) {
        $pictureLoadingIndicator.remove();

        if (picture) {
            //var pictureUrl = contosoGlobal.sharePointRootUrl + picture.Path + "/" + picture.Name;
            $pictureContainer.css({
                "background": "url(" + picture.ThumbnailUrl + ") center center no-repeat",
                "-ms-background-size": "140px",
                "background-size": "140px"
            });
        } else {
            $pictureContainer.css("background", "url(Content/Images/no-image-small.png) center center no-repeat");
        }

    });
};

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
