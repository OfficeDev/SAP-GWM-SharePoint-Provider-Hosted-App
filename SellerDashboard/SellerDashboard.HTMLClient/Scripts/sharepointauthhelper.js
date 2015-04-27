$(document).ready(function () {
    var paramName = "SPAppWebUrl";
    var match = RegExp('[?&]' + paramName + '=([^&]*)')
    .exec(window.location.search);
    var appWebUrl = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    if (appWebUrl) {
        var authproxy = appWebUrl + "/_layouts/15/appwebproxy.aspx"
        var iframe = $("<iframe src='" + authproxy + "' style='width: 0px; height: 0px; border: 0px'/>");
        $("body").append(iframe);
    }
});