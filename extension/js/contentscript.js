"use strict";

function getSelectionText(request) {
    var text = window.getSelection().toString();
    console.log(text);
    return { source: text };
}

var handlers = {
    getSelectionText: getSelectionText
};

function dispatcher(request, sender, sendResponse) {
    console.log(request);
    sendResponse(handlers[request.type](request));
}

chrome.runtime.onMessage.addListener(dispatcher);
