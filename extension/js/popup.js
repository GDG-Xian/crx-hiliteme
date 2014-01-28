"use strict";

function optionToHtml(option) {
   return '<option value="' + option.code + '">' + option.name + '</option>';
}

function loadOptionData(name) {
    var optionsHtml = $.map(data[name], optionToHtml).join('');
    $('[name=' + name + ']').html(optionsHtml);
}

function processHighlightResult(result) {
    console.log(result);
}

function hiliteme(evt) {
    var params = $(this).serialize();
    $.post('http://hilite.me/api', params, processHighlightResult);
    return false;
}

function loadSelectedSource() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'getSelectionText' }, function(response) {
            $('[name=code]').val(response.source);
        });
    });
}


$(function() {
    // Load data for laxers and styles 
    loadOptionData('lexer')
    loadOptionData('style')

    // Load selected source code.
    loadSelectedSource();

    // Event Bindings
    $('#hiliteme').submit(hiliteme);
});

