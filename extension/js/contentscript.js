"use strict";

function getActiveIframe() {
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        if (iframe.contentDocument.body.contenteditable === 'true') {
            return iframe;
        }
    }
}

function getSelectionText(request) {
    var editorFrame = getActiveIframe();
    var text = editorFrame.getSelection().toString();
    return { source: text };
}

function hiliteSelection(request) {
    document.execCommand('insertHTML', false, request.html);
}

var handlers = {
    getSelectionText: getSelectionText,
    hiliteSelection: hiliteSelection
};

function dispatcher(request, sender, sendResponse) {
    sendResponse(handlers[request.type](request));
}

chrome.runtime.onMessage.addListener(dispatcher);
