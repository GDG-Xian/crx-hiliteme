"use strict";

var logPrefix = 'hiliteme:',
    currentFrame = null;

// Event Handlers {{{

// When an iframe is focused, set activeIframe to it.
function onIframeFocused() {
    console.log(logPrefix, 'Iframe', this.location.href, 'focused.');
    activeIframe = this;
}

// }}}

function getSelectionText(request) {
    var selection = '';
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        try {
            selection = iframe.contentWindow.getSelection();
            if (selection && selection.type !== 'None') {
                currentFrame = iframe;
                return { source: selection.toString() };
            }
        } catch(e) { /* origin mismatch ignored */ }
    }
}

function hiliteSelection(request) {
    if (currentFrame) {
        currentFrame.contentDocument.execCommand('insertHTML', false, request.html);
        currentFrame = null;
    }
}

var handlers = {
    getSelectionText: getSelectionText,
    hiliteSelection: hiliteSelection
};

function dispatcher(request, sender, sendResponse) {
    var response = handlers[request.type](request);
    response && sendResponse(response);
}

// Event Bindings
chrome.runtime.onMessage.addListener(dispatcher);
