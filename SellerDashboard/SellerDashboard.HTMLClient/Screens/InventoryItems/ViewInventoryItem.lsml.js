/// <reference path="~/GeneratedArtifacts/viewModel.js" />
var $uploadControlElement, uploadControlContentItem;

myapp.ViewInventoryItem.ContactStatus_render = function (element, contentItem) {
    initContactStatus(element, contentItem);
};

myapp.ViewInventoryItem.Tittle_render = function (element, contentItem) {
    var $backButton = addBackButton(element, function () {
        myapp.navigateBack().then(updateChanges(contentItem.screen.InventoryItem));
    });

    $(element).addClass("retailer-title-container");
    var tableName = contosoGlobal.companyItem.TableName;
    var $title = $("<span id='" + tableName + "CarDetailsTitle' class='retailer-title'></span>")
    $title.appendTo($(element));
    
    setDetailsTitle(contentItem.screen.InventoryItem.Brand + " " + contentItem.screen.InventoryItem.Model);
};


myapp.ViewInventoryItem.CarDetailsRight_postRender = function (element, contentItem) {
    $(element).attr("id", "CarDetailsRight");
    $(element).addClass("car-details-right");
};

myapp.ViewInventoryItem.CarDetailsLeft_postRender = function (element, contentItem) {
    $(element).attr("id", "CarDetailsLeft");
    $(element).addClass("car-details-left");
};

myapp.ViewInventoryItem.CarDetailsRightPadding_render = function (element, contentItem) {
    $(element).css("padding-bottom", "0");
    $(element).css("padding-top", "81px");
};

myapp.ViewInventoryItem.Details_postRender = function (element, contentItem) {
    chromeBarUiTuning();
};

myapp.ViewInventoryItem.EditButton_render = function (element, contentItem) {
    $(element).attr("id", "edit-button-container");
    $(element).addClass("button-container");
    var $EditContainer = $("<span></span>");
    $EditContainer.appendTo($(element));
    var $EditIcon = $("<img src='Content/Images/icon-edit-clickable.png'>");
    var $EditText = $("<span>Edit</span>");
    $EditIcon.appendTo($EditContainer);
    $EditText.appendTo($EditContainer);

    $(element).hover(function () {
        $EditText.css("color", "#212121");
    }, function () {
        $EditText.removeAttr("style");
    });

    $(element).click(function () {
        myapp.showAddEditInventoryItem(contentItem.screen.InventoryItem, {
            afterClosed: function (addEditScreen, navigationAction) {
                if (navigationAction === msls.NavigateBackAction.commit)
                {
                    setDetailsPage(addEditScreen.InventoryItem);
                }
            }
        });
    });
};

myapp.ViewInventoryItem.DeleteButton_render = function (element, contentItem) {
    $(element).attr("id", "delete-button-container");
    $(element).addClass("button-container");
    var $DeleteContainer = $("<span></span>");
    $DeleteContainer.appendTo($(element));
    var $DeleteIcon = $("<img src='Content/Images/icon-delete-clickable.png'>");
    var $DeleteText = $("<span>Delete</span>");
    $DeleteIcon.appendTo($DeleteContainer);
    $DeleteText.appendTo($DeleteContainer);

    $(element).hover(function () {
        $DeleteText.css("color", "#212121");
    }, function () {
        $DeleteText.removeAttr("style");
    });

    $(element).click(function () {
        contentItem.screen.InventoryItem.deleteEntity();

        return myapp.commitChanges().then(null, function fail(e) {
            myapp.cancelChanges();
            throw e;
        });
    });
};

myapp.ViewInventoryItem.CarDetails_Brand_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.Brand);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Brand, contentItem.screen.InventoryItem.Brand);
};

myapp.ViewInventoryItem.CarDetails_Model_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.Model);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Model, contentItem.screen.InventoryItem.Model);
};

myapp.ViewInventoryItem.CarDetails_Price_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.Price);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Price, contentItem.screen.InventoryItem.Price);
};

myapp.ViewInventoryItem.CarDetails_ContactPhone_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.ContactPhone);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.ContactPhone, contentItem.screen.InventoryItem.ContactPhone);
};

myapp.ViewInventoryItem.CarDetails_Engine_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.Engine, contentItem);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Engine, contentItem.screen.InventoryItem.Engine);
};

myapp.ViewInventoryItem.CarDetails_BodyStyle_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.BodyStyle);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.BodyStyle, contentItem.screen.InventoryItem.BodyStyle);
};

myapp.ViewInventoryItem.CarDetails_Transmission_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.Transmission);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Transmission, contentItem.screen.InventoryItem.Transmission);
};

myapp.ViewInventoryItem.CarDetails_MaxPower_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.MaxPower);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.MaxPower, contentItem.screen.InventoryItem.MaxPower);
};

myapp.ViewInventoryItem.CarDetails_ExtColor_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.ExtColor);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.ExtColor, contentItem.screen.InventoryItem.ExtColor);
};

myapp.ViewInventoryItem.CarDetails_IntColor_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.IntColor);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.IntColor, contentItem.screen.InventoryItem.IntColor);
};

myapp.ViewInventoryItem.CarDetails_ArrivedDate_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.ArrivedDate);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.ArrivedDate, contentItem.screen.InventoryItem.ArrivedDate);
};

myapp.ViewInventoryItem.CarDetails_Status_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.Status);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Status, contentItem.screen.InventoryItem.Status);
};

myapp.ViewInventoryItem.CarDetails_StockNo_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.StockNo);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.StockNo, contentItem.screen.InventoryItem.StockNo);
};

myapp.ViewInventoryItem.CarDetails_Year_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.Year);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Year, contentItem.screen.InventoryItem.Year);
};

myapp.ViewInventoryItem.CarDetails_BuyerEmail_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.BuyerEmail);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.BuyerEmail, contentItem.screen.InventoryItem.BuyerEmail);
};

myapp.ViewInventoryItem.ContactStatus_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.ContactEmail);
    setDetailsPersonPicture(contentItem.screen.InventoryItem.ContactEmail);
};

myapp.ViewInventoryItem.CarDetails_Picture_render = function (element, contentItem) {
    initDetailsPage(element, contosoGlobal.companyItem.AllProperties.PictureUrl);
    var cacheUrl = getFullImageUrl(contentItem.screen.InventoryItem.StockNo);

    if (cacheUrl && cacheUrl != undefined) {
        setDetailsCarPicture(cacheUrl);
    }
    else if (contentItem.screen.InventoryItem.ContosoMotorsPicture) {
        setDetailsCarPicture(contentItem.screen.InventoryItem.ContosoMotorsPicture.FullImageUrl);
    }
    else {
        setDetailsCarPicture(null);
    }
};

myapp.ViewInventoryItem.Upload_execute = function (screen) {
    showUploadPopup(screen);
};
myapp.ViewInventoryItem.UploadControl_render = function (element, contentItem) {
    $uploadControlElement = $(element);
    uploadControlContentItem = contentItem;
};
myapp.ViewInventoryItem.UploadPhoto_execute = function (screen) {
    if ($("#fileInput").val() != "") {
        $.mobile.loading('show');
        $("#uploadForm").submit();
    }
};