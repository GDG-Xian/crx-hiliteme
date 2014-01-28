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

$(function() {
    // Load data for laxers and styles 
    loadOptionData('lexer')
    loadOptionData('style')

    // Event Bindings
    $('#hiliteme').submit(hiliteme);
});
