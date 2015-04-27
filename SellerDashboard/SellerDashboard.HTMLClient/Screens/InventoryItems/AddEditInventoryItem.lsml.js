/// <reference path="~/GeneratedArtifacts/viewModel.js" />
myapp.AddEditInventoryItem.Group_postRender = function (element, contentItem) {
    if (contentItem.screen.InventoryItem.ID == "0")
        $(element).hide();
};
