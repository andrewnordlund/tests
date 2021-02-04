// jQuery Plugin popToTextbox
// Use to put a value into selector 

(function($) {

    $.popToTextbox = function (element) {
        //$element needs 
        // someclassname-text to pull information text or
        // someclassname-val to pull information value
        var plugin = this;

        var $element = $(element);


        plugin.init = function () {
            var classes = $element.attr('class').split(/\s+/);
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].match(/(po(-[\w\d]*)+)/g)) plugin.pullClass = classes[i];
            }

            plugin.insertToClass = plugin.pullClass.replace("po", "pi");

            // Check if we want to pop the text inside the control or the value
            if (element.className.indexOf('-text') > -1) plugin.infoType = 'text';
            else if (element.className.indexOf('-val') > -1) plugin.infoType = 'value';

            //Init the type of control
            if ($element.find('select').length > 0) {
                plugin.controlType = 'select';
            } else if ($element.find('input[type=radio]').length > 0) {
                plugin.controlType = 'radio';
            } else if ($element.find('.ctlLiteral').length > 0) { // make the change here, wont be any user input
                plugin.controlType = 'literal';
                $('.' + plugin.insertToClass).find('textarea, input[type=text], input[type=hidden]').val($element.find('.ctlLiteral').text());
            } else if ($element.find('input[type=hidden]').length > 0) { // make the change here, wont be any user input
                plugin.controlType = 'hidden';
                $('.' + plugin.insertToClass).find('textarea, input[type=text], input[type=hidden]').val($element.find('input[type=hidden]').val());
            }
            // Initialize the different parts

            // if ctlLiteral we just insert the value, will not change from user input
            if (plugin.controlType != 'literal') {
                plugin.$pullFromControl = $element.find('input[type=radio],select');
                plugin.$insertIntoControls = $('.' + plugin.insertToClass);


                // Change listener to push the information into the corresponding textbox
                plugin.$pullFromControl.on('change load', function () {
                    var that = this;
                    plugin.$insertIntoControls.each(function () {
                        var $textControl = $(this).find('textarea, input[type=text], input[type=hidden]');
                        switch (plugin.controlType) {
                            case ('select'): if (plugin.infoType == 'text') $textControl.val($(that).find('option:selected').text());
                            else if (plugin.infoType == 'value') $textControl.val($(that).find('option:selected').val());
                                break;
                            case ('radio'): 
                                if (plugin.infoType == 'text') $textControl.val($(that).closest('label').text());
                                else if (plugin.infoType == 'value') $textControl.val($(that).val());

                                break;
                        }
                    });
                });
            }
        };
        plugin.init();
    };

    $.fn.popToTextbox = function (options) {

        return this.each(function () {
            if (undefined === $(this).data('popToTextbox')) {
                var plugin = new $.popToTextbox(this, options);
                $(this).data('popToTextbox', plugin);
            }
        });
    };

})(jQuery);

$(document).ready(function(){	
	$('.popOut-text,.popOut-val').popToTextbox();
});