var requestFilter = {
    urls: ["<all_urls>"]
},

extraInfoSpec = ['requestHeaders', 'blocking'],
handler = function(details) {

var isAcceptLanguageSet = false;
var isContentLanguageSet = false;

var headers = details.requestHeaders,
    blockingResponse = {};

for (var i = 0, l = headers.length; i < l; ++i) {
    if (headers[i].name == 'Accept-Language') {
        headers[i].value = "zh";
        isAcceptLanguageSet = true;
    }
    if (headers[i].name == 'Content-Language') {
        headers[i].value = "zh";
        isContentLanguageSet = true;
    }
    if(isContentLanguageSet && isAcceptLanguageSet){
     	break;
    }
}

if (!isAcceptLanguageSet) {
    headers.push({
        name: "Accept-Language",
        value: "zh"
    });
}
if (!isContentLanguageSet) {
    headers.push({
        name: "Content-Language",
        value: "zh"
    });
}

blockingResponse.requestHeaders = headers;
return blockingResponse;
};

chrome.webRequest.onBeforeSendHeaders.addListener(handler, requestFilter, extraInfoSpec);
