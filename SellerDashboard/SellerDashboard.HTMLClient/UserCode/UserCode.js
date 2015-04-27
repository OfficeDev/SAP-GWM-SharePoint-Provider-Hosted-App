var contosoGlobal = {
    ascendingString: " - Ascending",
    descendingString: " - Descending",
    nameCtrl: null,
    companyItem:
    {
        Name: "",
        Description: "",
        ImageURL: "",
        TableTitle: "Contoso Motor",
        TableName: "Contoso",
        AllProperties:
        {
            BodyStyle: "Body Style",                     // this string will be used in 1) list view table header 2) sort key 3) sorted by list control menu 4) sort icon id
            Brand: "Brand",
            BuyerEmail: "Buyer Email",
            Engine: "Engine",
            ExtColor: "Ext Color",
            IntColor: "Int Color",
            Model: "Model",
            Price: "Price",
            Status: "Status",
            Transmission: "Transmission",
            ArrivedDate: "Arrived Date",
            MaxPower: "Max Power",
            Year: "Year",
            ContactEmail: "Contact Email",
            ContactName: "Contact Name",
            ContactPhone: "Contact Phone",
            PictureUrl: "Picture Url",
            ID: "ID",
            StockNo: "StockNo"
        }
    },

    // Hard coded, because the new conmon consent work around can't keep the sharepoint context in a good method.
    sharePointUrl: "https:///*Your SharePoint site Url contains picture library*/",
    sharePointRootUrl: "https:///*Your SharePoint root site Url*/"
};

var contosoAppStatus = {
    currentTableView: "ListView",                                       // valid value: "ListView" or "TileView"
    currentListViewTableColumns: [                                      // valid value: a subset of contosoGlobal.companyList[x].AllProperties
        contosoGlobal.companyItem.AllProperties.ID,
        contosoGlobal.companyItem.AllProperties.Brand,
        contosoGlobal.companyItem.AllProperties.Model,
        contosoGlobal.companyItem.AllProperties.BodyStyle,
        contosoGlobal.companyItem.AllProperties.Engine,
        contosoGlobal.companyItem.AllProperties.Price,
        contosoGlobal.companyItem.AllProperties.Status,
        contosoGlobal.companyItem.AllProperties.ContactName
    ],
    currentTileViewTableInformation: [
        contosoGlobal.companyItem.AllProperties.Brand,
        contosoGlobal.companyItem.AllProperties.Model,
        contosoGlobal.companyItem.AllProperties.Price,
        contosoGlobal.companyItem.AllProperties.Status
    ],
    currentSortColumn: contosoGlobal.companyItem.AllProperties.Price, // valid value: null or contosoGlobal.companyList[x].AllProperties.XXX
    currentSortOrder: "desc",                                 // valid value: "asc" or "desc"          //TODO: change this to bool: currentSortOrderIsAsc
    currentDataNumber: 0,                                               // control data rendering. DO NOT change this value
    triggerPictureLoading: true,                                  // control picture loading
    currentTimerId: undefined,                          // control data request
    needSortAtBeginning: true
};

var _urlCache = new Array();
function removeSpaceInString(str) {
    if (str != null) {
        return str.replace(/\s+/g, "");
    }
    return str;
};

function chromeBarUiTuning() {
    var $backbutton = $('div.msls-back-button-contain');
    $backbutton.removeClass('msls-back-button-contain');
    $backbutton.addClass('msls-logo-back-area');
    $backbutton.children().remove();

    var $container = $("<div class ='msls-logo'></div>");
    $container.append($('<span id="chrome-bar-office365-logo"><img src="Content/Images/o365-logo.png"></span>'));
    $container.append($('<span id="chrome-bar-company-name">| Contoso Motor</span>'));
    $backbutton.append($container);

    $('div.msls-title-area').remove();
    $('div.msls-header-area').attr("id", "chrome-bar-container");
};

function hideScrollBar() {
    $('div.msls-header').parent().attr("style", "overflow: hidden");
};

function initSearchBox(element, contentItem) {
    $(element).attr("id", contosoGlobal.companyItem.TableName + "SearchBox");
    $(element).parent().addClass("search-box-container");
    var $searchBox = $(element).children("div>div>input");
    $searchBox.attr("prev-value", $searchBox.val());
    if ($searchBox.val() === "") {
        $searchBox.css("background", "url(Content/Images/ui-user-search.png) 0 50% no-repeat");
    }
    hideScrollBar();

    $searchBox.focus(function () {
        $searchBox.css("background", "none");
    });
    $searchBox.blur(function () {
        if ($searchBox.val() === "") {
            $searchBox.css("background", "url(Content/Images/ui-user-search.png) 0 50% no-repeat");
        }

        if ($searchBox.attr("prev-value") !== $searchBox.val()) {
            $searchBox.attr("prev-value", $searchBox.val());
            contentItem.screen.SearchParam = $searchBox.val();
        }
    });
    $searchBox.keyup(function (key) {
        if (key.which === 13 && $searchBox.attr("prev-value") !== $searchBox.val()) {
            $searchBox.attr("prev-value", $searchBox.val());
            contentItem.screen.SearchParam = $searchBox.val();
        }
    });
};

function initListView(element, contentItem) {
    $(element).addClass("list-view-table-container");
    $(element).attr("id", contosoGlobal.companyItem.TableName + "ListView");
    if (contosoAppStatus.currentTableView !== "ListView")
        $(element).hide();
};

function createNameCtrlActiveX() {
    var mimeType = "application/x-sharepoint-uc";
    try {
        if (window.ActiveXObject) {
            contosoGlobal.nameCtrl = new ActiveXObject("Name.NameCtrl");
        }
        else if (!!navigator.mimeTypes && !!navigator.mimeTypes[mimeType] && navigator.mimeTypes[mimeType].enabledPlugin) {
            contosoGlobal.nameCtrl = document.getElementById(mimeType);
            if (!contosoGlobal.nameCtrl) {
                var objectElement = document.createElement("object");
                objectElement.id = objectElement.type = mimeType;
                objectElement.width = objectElement.height = "0";
                objectElement.style.setProperty("visibility", "hidden", "");
                document.body.appendChild(objectElement);
                contosoGlobal.nameCtrl = document.getElementById(mimeType);
            }
        }
        else {
            alert("NameCtrl ActiveX hasn't been installed in your browser, so you can't see the contact presence status, and Lync feature will be disabled !\nPlease install Lync desktop client first if you want to enable it!");
        }
    } catch (e) { alert("NameCtrl ActiveX hasn't been installed in your browser, so you can't see the contact presence status, and Lync feature will be disabled !\nPlease install Lync desktop client first if you want to enable it!"); }
    if (isNameCtrlValid(contosoGlobal.nameCtrl))
        contosoGlobal.nameCtrl.OnStatusChange = onLyncPresenceStatusChange;
};

function isNameCtrlValid(nameCtrl) {
    return nameCtrl != null && nameCtrl.PresenceEnabled;
};

function onLyncPresenceStatusChange(sip, newStatusCode, id) {
    setPresenceStatus(sip, newStatusCode);
};

function setPresenceStatus(sip, statusCode) {
    var statusClass = getStatusClassFromNum(statusCode, "pawn");
    var selector = "[contact-name='" + sip + "_pawn']";
    $(selector).removeClass().addClass(statusClass);

    statusClass = getStatusClassFromNum(statusCode, "strip");
    selector = "[contact-name='" + sip + "_strip']";
    $(selector).removeClass().addClass(statusClass);
};

function createPresenceStatusControl(sip, pawnOrStrip) {
    var statusCode = -1;
    if (isNameCtrlValid(contosoGlobal.nameCtrl) && sip !== null) {
        try {
            statusCode = contosoGlobal.nameCtrl.GetStatus(sip, sip);
        }
        catch (e) { alert("createPresenceStatusControl: " + e); }
    }

    var presenceStatusElement = "<a class='msls-sppsv-presence-link ui-link' href='javascript:;'>";
    presenceStatusElement += "<span class='msls-sppsv-presence presence-status-img-" + pawnOrStrip + "'>";
    presenceStatusElement += "<img";
    if (pawnOrStrip === "strip") {
        presenceStatusElement += " id='presence-indicator-strip'";
    }
    if (sip !== null && sip !== undefined) {
        presenceStatusElement += " contact-name='" + sip + "_" + pawnOrStrip + "'";
    }
    presenceStatusElement += " class='" + getStatusClassFromNum(statusCode, pawnOrStrip) + "' src='" + contosoGlobal.sharePointUrl + "/_layouts/15/images/spimn.png'>";
    presenceStatusElement += "</span></a>";
    return $(presenceStatusElement);
};

function updatePresenceStatusForCarDetails(sip) {
    if (isNameCtrlValid(contosoGlobal.nameCtrl)) {
        $("#presence-indicator-strip").attr("contact-name", sip + "_strip");
        var statusCode = contosoGlobal.nameCtrl.GetStatus(sip, sip);
        setPresenceStatus(sip, statusCode);
    }
};

function getStatusClassFromNum(statusCode, pawnOrStrip) {
    var state = "disconnected";
    switch (statusCode) {
        case 0:
            state = "online";
            break;
        case 1:
            state = "offline";
            break;
        case 2:
        case 4:
        case 6:
        case 8:
        case 16:
            state = "away";
            break;
        case 3:
        case 5:
        case 7:
        case 10:
        case 19:
            state = "busy";
            break;
        case 9:
        case 21:
            state = "donotdisturb";
            break;
        case 11:
            state = "online-oof";
            break;
        case 12:
            state = "offline-oof";
            break;
        case 13:
        case 17:
            state = "away-oof";
            break;
        case 14:
        case 20:
            state = "busy-oof";
            break;
        case 15:
            state = "donotdisturb-oof";
            break;
        case 18:
            state = "blocked";
            break;
    }
    return "presence-status-img "
        + "presence-status-img-" + pawnOrStrip + "-" + state;
};

function addContactCardWindow(element, sip) {
    updateContactCardWindow(element, sip, false);
};

function updateContactCardWindow(element, sip, resetEvent) {
    if (isNameCtrlValid(contosoGlobal.nameCtrl)) {
        try {
            // mouseover event
            if (resetEvent) {
                $(element).unbind('mouseover');
            }
            $(element).mouseover(function () {
                contosoGlobal.nameCtrl.ShowOOUI(sip, 0, 0, 0);
            });

            // mouseout event
            if (resetEvent) {
                $(element).unbind('mouseout');
            }
            $(element).mouseout(function () {
                contosoGlobal.nameCtrl.HideOOUI();
            });
        } catch (e) { alert("updateContactCardWindow: " + e); }
    }
};

function addBackButton(element, onClickHandler) {
    var $backButton = $('<div class="back-button"><img class="back-button-img" src="Content/Images/ui-back-button.png"></div>');
    $(element).append($backButton);
    $backButton.click(onClickHandler);
    return $backButton;
};

function enableInfiniteScroll(element, screen) {
    $(element).on('scroll', function () {
        if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
            loadMoreData(screen);
        }
    });
};

function loadMoreData(screen) {
    var dataCollection;
    dataCollection = screen.ContosoMotorsQuery;

    if (dataCollection.canLoadMore) {
        showDataLoadingIndicator("ListView");
        dataCollection.loadMore();
    }
};

function showDataLoadingIndicator(tableView) {
    var tableName = contosoGlobal.companyItem.TableName;
    $("#" + tableName + tableView + "Loading").show();
};

function setBrowserContact($element, item) {
    $presenceStatusCtrl = createPresenceStatusControl(item.ContactEmail, "pawn");
    $presenceStatusCtrl.appendTo($element);
    $('<label>' + item.ContactName + '</label>').appendTo($element);
    addContactCardWindow($element, item.ContactEmail);
}

/////////////////////////////////////////////
///     for detail page                  ////
/////////////////////////////////////////////

function initDetailsPage(element, property, value) {
    $(element).addClass("details-container");

    if (property === contosoGlobal.companyItem.AllProperties.ContactEmail) {
        initDetailsLabel(element, "Contact");
        initDetailsPersonPicture(element, property, value);
    }
    else if (property === contosoGlobal.companyItem.AllProperties.PictureUrl) {
        $(element).removeClass("details-container").addClass("details-img-container");
        initDetailsCarPicture(element, property, value);
    }
    else {
        initDetailsLabel(element, property);
        initDetailsContent(element, property, value);
    }
};

function initDetailsLabel(element, label) {
    if (label) {
        var $title = $("<span class='details-label'>" + label + "</span><br />");
        $title.appendTo($(element));
    }
};

function initDetailsContent(element, property, value) {
    var tableName = contosoGlobal.companyItem.TableName;
    var propertyWithoutSpace = removeSpaceInString(property);

    if (property === contosoGlobal.companyItem.AllProperties.Price) {
        value = "$" + value;
    }

    var $title;
    if (property === contosoGlobal.companyItem.AllProperties.BuyerEmail) {
        $title = $('<a id="' + tableName + 'CarDetails' + propertyWithoutSpace + '" class="details-content ui-link" href="mailto:' + value + '" target="_blank">' + value + '</a>');
    }
    else if (property === contosoGlobal.companyItem.AllProperties.ContactPhone) {
        $title = $('<a id="' + tableName + 'CarDetails' + propertyWithoutSpace + '" class="details-content ui-link" href="tel:' + value + '" target="_blank">' + value + '</a>');
    }
    else {
        $title = $('<div id="' + tableName + 'CarDetails' + propertyWithoutSpace + '" class="details-content">' + value + '</div>');
    }


    $title.appendTo($(element));
};

function initDetailsCarPicture(element, property, value) {
    var tableName = contosoGlobal.companyItem.TableName;
    var propertyWithoutSpace = removeSpaceInString(property);
    var $img = $('<img id="' + tableName + 'CarDetails' + propertyWithoutSpace + '" class="details-picture-large">');
    $(element).append($img);
};

function initDetailsPersonPicture(element, contentItem, value) {
    $(element).append(createPresenceStatusControl(null, "strip"));
    var propertyWithoutSpace = removeSpaceInString(contosoGlobal.companyItem.AllProperties.ContactEmail);
    var tableName = contosoGlobal.companyItem.TableName;
    var imageContainer = "<span id='" + tableName + "CarDetails" + propertyWithoutSpace + "'><a class='msls-sppsv-picture-link ui-link' target='_blank'>";
    imageContainer += "<span class='presence-status-img-picture-container'>";
    imageContainer += "<img class='presence-status-img-picture'>";
    imageContainer += "</span></a></span>";
    var $imageContainer = $(imageContainer);
    $(element).append($imageContainer);
};

function initDetailsTitle(element) {
    $(element).addClass("retailer-title-container");
    var tableName = contosoGlobal.companyItem.TableName;
    var $title = $("<span id='" + tableName + "CarDetailsTitle' class='retailer-title'></span>");
    $title.appendTo($(element));
};

function showDetailsPagePictureLoadingIndicator() {
    var tableName = contosoGlobal.companyItem.TableName;
    var $targetElement = $("#" + tableName + "CarDetailsPictureLoading");
    $targetElement.show();
};

function hideDetailsPagePictureLoadingIndicator() {
    var tableName = contosoGlobal.companyItem.TableName;
    var $targetElement = $("#" + tableName + "CarDetailsPictureLoading");
    $targetElement.hide();
};

function setDetailsTitle(value) {
    if (value) {
        var $targetElement = $("#" + contosoGlobal.companyItem.TableName + "CarDetailsTitle");
        $targetElement.text(value);
    }
};

function setDetailsContent(property, value) {
    if (property) {
        if (!value) {
            value = "";
        }
        if (property === contosoGlobal.companyItem.AllProperties.Price) {
            value = "$" + value;
        }
        if (property === contosoGlobal.companyItem.AllProperties.ArrivedDate) {
            value = value.toDateString();
        }
        var propertyWithoutSpace = removeSpaceInString(property);
        var $targetElement = $("#" + contosoGlobal.companyItem.TableName + "CarDetails" + propertyWithoutSpace);
        $targetElement.text(value);
    }
};

function setDetailsPersonPicture(sip) {
    if (sip) {
        var src = contosoGlobal.sharePointUrl + "/_layouts/15/userphoto.aspx?size=M&accountname=" + encodeURIComponent(sip);
        $("img.presence-status-img-picture").attr("src", src);
        updatePresenceStatusForCarDetails(sip);

        var propertyWithoutSpace = removeSpaceInString(contosoGlobal.companyItem.AllProperties.ContactEmail);
        var $targetElement = $("#" + contosoGlobal.companyItem.TableName + "CarDetails" + propertyWithoutSpace);
        updateContactCardWindow($targetElement, sip, true);
    }
};

function setDetailsCarPicture(pictureUrl) {
    if (!pictureUrl) {
        pictureUrl = "Content/Images/no-image-large.png";
    }
    var propertyWithoutSpace = removeSpaceInString(contosoGlobal.companyItem.AllProperties.PictureUrl);
    var $targetElement = $("#" + contosoGlobal.companyItem.TableName + "CarDetails" + propertyWithoutSpace);
    $targetElement.attr("src", pictureUrl);
};

function setDetailsPage(dataItem) {
    setDetailsTitle(dataItem.Brand + " " + dataItem.Model);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.ArrivedDate, dataItem.ArrivedDate);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.BodyStyle, dataItem.BodyStyle);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Brand, dataItem.Brand);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.BuyerEmail, dataItem.BuyerEmail);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.ContactPhone, dataItem.ContactPhone);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Engine, dataItem.Engine);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.IntColor, dataItem.IntColor);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.ExtColor, dataItem.ExtColor);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.MaxPower, dataItem.MaxPower);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Model, dataItem.Model);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Price, dataItem.Price);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Status, dataItem.Status);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.ID, dataItem.ID);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.StockNo, dataItem.StockNo);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Transmission, dataItem.Transmission);
    setDetailsContent(contosoGlobal.companyItem.AllProperties.Year, dataItem.Year);
    setDetailsPersonPicture(dataItem.ContactEmail);
};

/////////////////////////////////////////////
///              Helper                  ////
/////////////////////////////////////////////

function getStockNo() {
    return randomBetween(1000000000, 2000000000).toString();
};

function setSeed(seed) {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / (233280.0);
};

function random(number) {
    today = new Date();
    seed = today.getTime();
    return Math.ceil(setSeed(seed) * number);
};

function randomBetween(min, max) {
    return Math.floor(min + random(max) / max * (max - min))
};

function getFullImageUrl(stockNo) {
    var urlString = _urlCache[stockNo];
    if (urlString == undefined) {
        return null;
    }
    var urlArray = urlString.split("*#00#");
    return urlArray[0];
};

function getThumbnailUrl(stockNo) {
    var urlString = _urlCache[stockNo];
    if (urlString == undefined) {
        return null;
    }
    var urlArray = urlString.split("*#00#");
    return urlArray[1];
};

function setCacheUrl(stockNo, url) {
    _urlCache[stockNo] = url;
};

function deleteCacheUrl(stockNo) {
    _urlCache[stockNo] = undefined;
};
  
function updateChanges(item) {
    var $tableRows = $("tr.msls-tr.msls-style.ui-shadow.ui-tr.msls-presenter.msls-ctl-table-row-layout.msls-vauto.msls-hstretch.msls-presenter-content.msls-font-style-normal.msls-hscroll.msls-table-row");
    var length = $tableRows.length;
    for (var i = 0; i < length; i++) {
        var stockNo = $tableRows[i].children[1].children[1].children[0].innerText;
        var thumbnailUrl = getThumbnailUrl(stockNo);
        if (thumbnailUrl) {
            $tableRows[i].children[0].children[1].style.background = "url(" + thumbnailUrl + ") center center no-repeat";
        }

        if (item && item.StockNo == stockNo) {
            $targetElement = $tableRows[i].children[7].children[1];
            $targetElement.removeChild($targetElement.children[1]);
            $targetElement.removeChild($targetElement.children[0]);
            setBrowserContact($targetElement, item);
        }
    }
};