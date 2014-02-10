"use strict";

var logPrefix = 'hiliteme:';

// Helper Methods {{{

// Get active document
// https://github.com/adam-p/markdown-here/blob/6f5222e45129db32838edd7e6e5c241d391f9de0/src/common/markdown-here.js#L28
function findActiveDocument(document) {
  var activeElement = document.activeElement;

  while (activeElement && activeElement.contentDocument) {
    activeElement = activeElement.contentDocument.activeElement;
  }

  return activeElement.ownerDocument;
}

// }}}

function getSelectionText(request) {
    var selection = '';
    var activeDocument = findActiveDocument(document);
    var selection = activeDocument.getSelection();
    return { source: selection.toString() }
}

function hiliteSelection(request) {
    var activeDocument = findActiveDocument(document);
    if (activeDocument) {
        activeDocument.execCommand('insertHTML', false, request.html);
    }
}

var handlers = {
    getSelectionText: getSelectionText,
    hiliteSelection: hiliteSelection
};

function dispatcher(request, sender, sendResponse) {
    var response = handlers[request.type](request);
    sendResponse(response);
}

// Event Bindings
chrome.runtime.onMessage.addListener(dispatcher);
