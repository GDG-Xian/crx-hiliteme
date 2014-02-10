"use strict";

// Global Variables {{{
var TPLS = {
    CLOSE: '<a href="#" class="close" title="Close Preview"></a>' 
};
// }}}

// Helper Methods {{{

function optionToHtml(option) {
   return '<option value="' + option.code + '">' + option.name + '</option>';
}

// Get value from form input component
function getOption($input) {
    var option = {},
        name   = $input.attr('name');

    if ($input.is('input[type=checkbox]')) {
        option[name] = $input.prop('checked');
    } else  {
        option[name] = $input.val();
    }

    return option;
}

// Set value for form input components
function setOption(name, value) {
    var $input = $('[name=' + name + ']');

    if ($input.is('input[type=checkbox]')) {
        $input.prop('checked', value);
    } else  {
        $input.val(value);
    }
}

function loadOptionData(name) {
    var optionsHtml = $.map(data[name], optionToHtml).join('');
    $('[name=' + name + ']').html(optionsHtml);
}

// }}}


// Event Handlers and Callbacks {{{

function onOptionChanged(evt) {
    var option = getOption($(this));
    chrome.storage.sync.set(option);
}

function processHighlightResult(result) {
    $('#preview').show().html(result).prepend(TPLS.CLOSE);
    $('#source').hide();
}

function onHighlight(evt) {
    var params = $(this).serialize();
    $.post('http://hilite.me/api', params, processHighlightResult);
    return false;
}

// }}}


// Initialization {{{

function loadStoredOptions() {
    chrome.storage.sync.get(null, function(options) {
        for (var name in options) {
            setOption(name, options[name]); 
        }     
    }); 
}

// }}}


$(function() {
    // Load data for laxers and styles 
    loadOptionData('lexer')
    loadOptionData('style')
    loadStoredOptions();

    // Event Bindings
    $('#hiliteme').on('submit', onHighlight);
    $('.option').on('change', onOptionChanged);
    $('input.option[type=text]').on('input', onOptionChanged);
});
