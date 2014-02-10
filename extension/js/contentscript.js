"use strict";

var logPrefix = 'hiliteme:',
    currentFrame = null;

// Helper Methods {{{

// Get active element
// https://github.com/adam-p/markdown-here/blob/6f5222e45129db32838edd7e6e5c241d391f9de0/src/common/markdown-here.js#L28
function findActiveDocument(document) {
  var focusedElem = document.activeElement;

  // If the focus is within an iframe, we'll have to drill down to get to the
  // actual element.
  while (focusedElem && focusedElem.contentDocument) {
    focusedElem = focusedElem.contentDocument.activeElement;
  }

  return focusedElem.ownerDocument;
}

// }}}

// Event Handlers {{{


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
    response && sendResponse(response);
}

// Event Bindings
chrome.runtime.onMessage.addListener(dispatcher);
