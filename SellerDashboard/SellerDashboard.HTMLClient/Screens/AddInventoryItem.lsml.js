/// <reference path="~/GeneratedArtifacts/viewModel.js" />
var $uploadControlElement, uploadControlContentItem;

myapp.AddInventoryItem.Upload_execute = function (screen) {
    showUploadPopup(screen);
};
myapp.AddInventoryItem.UploadControl_render = function (element, contentItem) {
    $uploadControlElement = $(element);
    uploadControlContentItem = contentItem;
};
myapp.AddInventoryItem.UploadPhoto_execute = function (screen) {
    if ($("#fileInput").val() != "") {
        $.mobile.loading('show');
        $("#uploadForm").submit();
    }
};