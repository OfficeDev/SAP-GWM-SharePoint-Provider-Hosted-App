/// <reference path="../GeneratedArtifacts/viewModel.js" />

var API_URL = "../api/photos/";
var errorPrefix = "FAILED::";

function showUploadPopup(screen) {

    screen.showPopup("UploadPhotos").then(function () {
        var errorPrefix = "FAILED::"
        var uploadForm = $("#uploadForm");

        if (uploadForm.length === 0) {
            uploadForm = $(
             '<form id="uploadForm" method="POST" enctype="multipart/form-data" action="' + API_URL + '"  data-ajax="false" target="uploadTargetIFrame">' +
             '   <input name="fileInput" id="fileInput" type="file" size="30" data-theme="c" accept="image/*" multiple="true"/>' +
             '   <input type="hidden" name=' + screen.InventoryItem.StockNo + '>' +
             '</form>');
            uploadForm.appendTo($uploadControlElement);

            var $uploadTargetIFrame = $('<iframe name="uploadTargetIFrame"  style="width: 0px; height: 0px; border: 0px solid #fff;"></iframe>');
            $uploadControlElement.append($uploadTargetIFrame);
            $uploadTargetIFrame.load(function () {
                if ($.mobile.popup.active) {
                    var serverResponse = null;
                    serverResponse = $uploadTargetIFrame.contents().find("string").text();
                    var uploadedFiles = removeDuplicates(serverResponse.split("\n"));
                    if (uploadedFiles && uploadedFiles.length && completeUpload) {
                        if (serverResponse.substring(0, errorPrefix.length) === errorPrefix) {
                            error(serverResponse);
                        } else {
                            msls.promiseOperation(function (op) {
                                completeUpload(uploadedFiles);
                                op.complete();
                            });
                        }
                    }
                    $.mobile.loading('hide');
                }
            });
        }

        function completeUpload(uploadedFiles) {
            var fullImageUrl = uploadedFiles[0];
            var photoNameWithExt = fullImageUrl.substr(fullImageUrl.lastIndexOf('/') + 1);
            var photoNameWithoutExt = photoNameWithExt.substr(0, photoNameWithExt.lastIndexOf("."));
            var photoPathUri = fullImageUrl.substr(0, fullImageUrl.lastIndexOf('/'));
            var photoExt = photoNameWithExt.substr(photoNameWithExt.lastIndexOf(".") + 1, photoNameWithExt.length);
            var thumbnailUrl = photoPathUri + "/_t/" + photoNameWithoutExt + "_" + photoExt + ".jpg";
            setCacheUrl(screen.InventoryItem.StockNo, fullImageUrl + "*#00#" + thumbnailUrl);
            setDetailsCarPicture(fullImageUrl);
            screen.closePopup();
        }

        function removeDuplicates(source) {
            var newArray = [];
            for (var index in source) {
                if (source[index]) {
                    newArray.push(source[index]);
                }
            }
            return newArray;
        }

        function onError(e) {
            alert(e);
        };
    });
}
