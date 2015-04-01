var requestFilter = {
    urls: ["<all_urls>"]
},

extraInfoSpec = ['requestHeaders', 'blocking'],
handler = function(details) {

var isRefererSet = false;
var headers = details.requestHeaders,
    blockingResponse = {};

for (var i = 0, l = headers.length; i < l; ++i) {
    if (headers[i].name == 'Accept-Language') {
        headers[i].value = "zh";
        isRefererSet = true;
        break;
    }
}

if (!isRefererSet) {
    headers.push({
        name: "Accept-Language",
        value: "zh"
    });
}

blockingResponse.requestHeaders = headers;
return blockingResponse;
};

chrome.webRequest.onBeforeSendHeaders.addListener(handler, requestFilter, extraInfoSpec);
