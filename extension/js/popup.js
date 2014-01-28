"use strict";

function optionToHtml(option) {
   return '<option value="' + option.code + '">' + option.name + '</option>';
}

function loadOptionData(name) {
    var optionsHtml = $.map(data[name], optionToHtml).join('');
    $('[name=' + name + ']').html(optionsHtml);
}

$(function() {
    // Load data for laxers and styles 
    loadOptionData('lexer')
    loadOptionData('style')
});
