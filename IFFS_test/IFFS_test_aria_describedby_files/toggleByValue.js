/***************************************************************************/
/* V1.1 06-09-2018											               */
/* - Added code to hide questions with no answers in summary               */
/* - Added code to hide questions with class triggerToggle-f               */
/* - Added code to hide questions from list from question frame togglelist */
/* - Fix code to hide multiple triggers for children of toggleMe           */
/*                                                                         */
/* V1.2 20-09-2018											               */
/* - Added code to expand details element in summary                       */
/* V1.3 01-11-2018	                                                       */
/* - removed expand detail on summary just add class=' print-open'         */
/* - toggleMe radio frames Hide in summary if text is -999 and             */
/*   change value to -999 on radio if user goes back and hides the frame   */
/*                                                                         */
/* V2                                                                      */
/* - invoke function with a selector (can be easily added in utils in the  */
/*   future)                                                               */
/* V2.1                                                                    */
/* hideInSummary - added summaryDiv to search in toggleList for info frames*/
/* V2.2                                                                    */
/* TriggerToggle name now accept up to 4 chars ex: tr9999-1                */
/* Trigger can be a literal to be able to trigger item from previous page  */
/* Make sure info frame items do not have a response                       */
/* Added function getResponses and checkTrigger                            */
/* Added info type item for information frame toggled                      */
/* hideInSummary                                                           */
/*       modified userAnswer to be used with multiple panels               */
/*       if only one item in list will remove the list                     */
/*       removed the space '\s' in regex for responses with spaces         */
/* V2.3                                                                    */
/* Trigger can now be the new hidden control                               */
/* Update for new custom radio and check Lists                             */
/* Remove value in datePicker when 'untoggle'                              */
/* V2.4                                                                    */
/* Bug Fix when item is not a trigger should not affect data-iffs_toggling */
/* V2.5                                                                    */
/* Bug Fix removing data-iffs_toggling and passing "deselect" object if    */
/* triggerToggle input is "deselected"                                     */
/* V2.6                                                                    */
/* Adding the fileUpload item to the type of triggered item                */
/* V2.7                                                                    */
/* Adding and, andAtLeast conditions                                       */
/* V2.8
 * fixed some invalid code when running javascript validator
/***************************************************************************/

//jQuery Plugin to toggle  show/Hide questions base on a user answer
(function($) {

    $.iffs_toggle = function (element) {
		/*
		element expected:  selector
		
		*/
        var plugin = this;

        plugin.settings = {};
        plugin.triggers = [];
        var $element = $(element);

        plugin.init = function () {
            plugin.$question = $element;
            plugin.$prompt = plugin.$question.parent('.promptStyle');


            // if prompt is type = fieldset (groupPanels = true) inputs are inside
            // else type=label (groupPanels = false) inputs are inside next sibling

            if (plugin.$prompt.is('fieldset')) 
                plugin.$response = plugin.$prompt.first('div');
            else
                plugin.$response = (plugin.$prompt.next());            

            plugin.classes = plugin.$question.attr('class').match(/(tr[0-9]{1,4}(-[\w\d]*)+)/g);
            plugin.triggerType = "";
            // save all trigger info and item info
            for (var indexTrigger = 0; indexTrigger < plugin.classes.length; indexTrigger++) {

                //	Build trigger object
                var trigger = {};
                trigger.values = plugin.classes[indexTrigger].split(/-/);
                trigger.name = trigger.values[0];
                trigger.values.shift();	// keep only values for this trigger							

                var $itemQuestions = $('.' + trigger.name.replace("tr", "it"));

                if (plugin.$response.has('[type="checkbox"]').length > 0) plugin.triggerType = 'checkbox';
                else if (plugin.$response.has('[type="radio"]').length > 0) plugin.triggerType = 'radio';
                else if (plugin.$response.has('select').length > 0) plugin.triggerType = 'select';
                else if (plugin.$response.has('.ctlLiteral').length > 0) plugin.triggerType = 'literal';
                else if (plugin.$response.has('[type="hidden"]').length > 0) plugin.triggerType = 'hidden';

                var items = plugin.initItems($itemQuestions);

                plugin.triggers.push({
                    values: trigger.values,
                    name: trigger.name,
                    items: items
                });
            }
            var responses;
            //literal an hidden types are only checked on page load no events attached
            if (plugin.triggerType == 'literal') {
                plugin.$inputs = plugin.$response.text().trim();
                responses = plugin.getResponses();
                plugin.checkTrigger(this, responses);
            } else if (plugin.triggerType == 'hidden') {
                plugin.$inputs = plugin.$response.find('input:hidden');
                responses = plugin.getResponses();
                plugin.checkTrigger(this, responses);
            } else {
                plugin.$inputs = plugin.$response.find('input:radio,input:checkbox,select');
                plugin.bindEvents();
            }
        };

        // Buid Item objects
        // if prompt is type = fieldset (groupPanels = true) inputs are inside
        // else type=label (groupPanels = false) inputs are inside next sibling
        plugin.initItems = function ($itemQuestions) {
            var items = [];
            $itemQuestions.each(function () {
                // for backward compatibility because in css is display:none by default
                $(this).removeClass('toggleMe');

                var $itemPrompt = $(this).parent('.promptStyle').hide();

                var $itemResponse;

                if ($itemPrompt.is('fieldset')) {
                    $itemResponse = $itemPrompt.find('legend + div').hide();
                } else {
                    // if info frame we do not have a response so nothing to hide
                    if (!$itemPrompt.next().hasClass('promptStyle'))
                        $itemResponse = $itemPrompt.next().hide();
                    else
                        $itemResponse = null;
                }
                var type;
                var classes;
                if ($itemResponse === null) {
                    classes = null;
                    type = 'info';
                } else {
                    if ($itemResponse.has('input:checkbox').length > 0) type = 'checkbox';
                    else if ($itemResponse.has('[type="radio"]').length > 0) type = 'radio';
                    else if ($itemResponse.has('select').length > 0) type = 'select';
                    else if ($itemResponse.has('[type="file"]').length > 0) type = 'file';
                    else type = 'other';
                    var $checkNullRadio;
                    if (type == 'radio') {
                        $itemResponse.find('input:radio').each(function () {
                            // Hide input with value -999
                            if ($(this).val() == "-999") {
                                $(this).css({
                                    "position": "absolute",
                                    "clip": "rect(1px,1px,1px,1px)",
                                    "overflow": "hidden !important",
                                    "margin": "0 !important"
                                });
                                var $label = $(this).closest('label');
                                $label.css({
                                    "position": "absolute",
                                    "clip": "rect(1px,1px,1px,1px)",
                                    "overflow": "hidden !important",
                                    "margin": "0 !important"
                                });
                                $checkNullRadio = $(this);
                            }

                        });
                    }

                    classes = $(this).attr('class').match(/(tr[0-9]{1,4}(-[\w\d]*)+)/g);

                    // add change event to item if value -999 exists
                    if ($checkNullRadio !== undefined && $checkNullRadio.length > 0) {
                        $itemResponse.find('input:radio').each(function () {
                            // see if we already have a listener on item

                            $(this).one('change', function () {

                                // if we are de-selecting then check value -999 and toggle data-iffs_toggling
                                if ($(this).attr('data-iffs_toggling') == 'true') {
                                    $checkNullRadio.addClass('checked');
                                    $checkNullRadio.prop('checked', true);
                                    $checkNullRadio.checked = true;
                                    // check to see if item is also a trigger, let the trigger toggle the data-iffs_toggling
                                    if (classes === null)
                                        $(this).removeAttr('data-iffs_toggling');
                                }
                            });
                        });
                    }
                }

                items.push({
                    $question: $(this),
                    $prompt: $itemPrompt,
                    $response: $itemResponse,
                    triggerClasses: classes,
                    type: type
                });

            });
            //$element.trigger("toggleInit_done", items);
            return items;
        };
        plugin.showItem = function (items) {
            for (var i = 0; i < items.length; i++) {
                $(items[i].$prompt).show();
                $(items[i].$response).show();
            }
        };
        plugin.hideItems = function (items) {
            function setCheckedProperties(itemType, response) {
                if (itemType == 'radio' && $(response).val() == "-999") {
                    $(response).prop('checked', true);
                    $(response).addClass('checked');
                    $(response).checked = true;
                }
                else if ($(response).is(':checked') || $(response).attr('data-iffs_toggling') == 'true') {
                    $(response).prop('checked', false).change(); //To make sure to trigger other listener (ex: date_utils)
                    $(response).removeClass('checked');
                    $(response).checked = false;
                    $(response).removeAttr('checked');
                    $(response).removeAttr('data-iffs_toggling');
                }
            }
            // reset items values
            for (var i = 0; i < items.length; i++) {
                $(items[i].$prompt).hide();
                if (items[i].type !== 'info') {
                    $(items[i].$response).hide();

                    items[i].$response.find('textarea,input[type=text],input[type=date], input[type=file]').not('[id *= du_original_filename]').val('');

                    items[i].$response.find('textarea').html('');

                    var responses = items[i].$response.find('input:radio,input:checkbox');
                    for (var countResponse = 0; countResponse < responses.length; countResponse++) {
                        setCheckedProperties(items[i].type, responses[countResponse]);
                    }                    

                    if (items[i].type == 'select') {
                        items[i].$response.find('select option[selected]').removeAttr("selected");
                        (items[i].$response.find('select option').first()).prop('selected', true);
                    }

                }
                // Hide current and children
                for (var indexClass = 0; items[i].triggerClasses !== null && items[i].triggerClasses !== undefined && indexClass < items[i].triggerClasses.length; indexClass++) {
                    var triggerName = items[i].triggerClasses[indexClass].split(/-/)[0];
                    plugin.hideItems(plugin.initItems($('.' + triggerName.replace('tr', 'it'))));
                }
            }
        };
        plugin.bindEvents = function () {

            plugin.$inputs.each(function () {
                // verify for class checked because of feature deselect
                if (plugin.triggerType == 'radio') {
                    $(this).on('click', function () {
                        // we are deselecting! 
                        if (this.className.indexOf("checked") !== -1) {
                            $(this).triggerHandler('change', { "deselecting": true });
                        }
                    });
                }
                $(this).on('change', function (event, deselect) {
                    var responses = plugin.getResponses();
                    plugin.checkTrigger(this, responses, deselect);
                });
                // trigger change event onLoad to make sure the 'not' trigger gets called on load
                if ($(this).is('select') || $(this).is(':checked')) {
                    $(this).trigger('change');
                }
            });
        };
        plugin.getResponses = function () {
            var responses = [];
            if (plugin.triggerType == 'literal') {
                responses = plugin.$inputs.split(',');
            } else if (plugin.triggerType == 'hidden') {
                responses = plugin.$inputs.val().split(',');
            } else {
                plugin.$inputs.each(function () {
                    if ($(this).is(':checked')) {
                        responses.push($(this).val());
                    }
                    if (plugin.triggerType == 'select') {
                        $(this).find('option:selected').each(function () {
                            responses.push($(this).val());
                        });
                    }
                });
            }
            return responses;
        };
        plugin.checkTrigger = function (element, responses, deselect) {
            function findValue(val) { return responses.indexOf(val) >= 0; }
            function removeIFFS_Toggling (object) {
                $(object).removeAttr('data-iffs_toggling');
            }
            var foundTrigger = false;
            var vals = [];
            // we need to find out if all values checked/selected triggers an item					
            for (var i = 0; i < plugin.triggers.length; i++) {

                vals = plugin.triggers[i].values.slice();
                var triggerItem = false;

                // check for condition and
                if (vals.indexOf('and') != -1) {
                    vals.shift(); // keep only values for this trigger			
                    if (responses.length)
                        triggerItem = JSON.stringify(vals) == JSON.stringify(responses);
                }
                else if (vals.indexOf('andAtLeast') != -1) {
                    vals.shift(); // keep only values for this trigger			
                    if (responses.length)
                        triggerItem = vals.every(findValue);
                }
                // check for condition not

                else if ((vals.indexOf('not')) != -1) {
                    triggerItem = false;
                    vals.shift(); // keep only values for this trigger	
                    for (var j = 0; j < responses.length && !triggerItem; j++) {
                        if ((vals.indexOf(responses[j])) == -1) {
                            triggerItem = true;
                        }
                    }
                } else {
                    triggerItem = false;
                    // check for any condition and values											
                    for (var k = 0; k < responses.length && !triggerItem; k++) {
                        if ((vals.indexOf(responses[k]) != -1) || vals.indexOf('any') != -1) {	// found value or any value accepted							
                            triggerItem = true;
                        }
                    }
                }
                //	element is the one that was triggered/clicked				
                if (triggerItem && (deselect === undefined || deselect === false)) {

                    // remove all data-iffs_toggling							
                    if (plugin.triggerType == 'radio') {
                        for (var countInput = 0; countInput < plugin.$inputs.length; countInput++) {
                            removeIFFS_Toggling(plugin.$inputs[countInput]);
                        }                        
                        // add data-iffs_toggling for current selection
                        $(element).attr('data-iffs_toggling', 'true');
                    }
                    plugin.showItem(plugin.triggers[i].items);

                    foundTrigger = true;


                } else {
                    plugin.hideItems(plugin.triggers[i].items);
                }
            }
            // if trigger not found reset radio data
            if (!foundTrigger && plugin.triggerType == "radio") {
                plugin.$inputs.each(function () {
                    $(this).removeAttr('data-iffs_toggling');
                });
            }
        };
        plugin.init();

    };

    $.fn.iffs_toggle = function (options) {

        return this.each(function () {
            if (undefined === $(this).data('iffs_toggle')) {
                var plugin = new $.iffs_toggle(this, options);
                $(this).data('iffs_toggle', plugin);
            }
        });
    };

})(jQuery);
// Function to hide selector with class triggerToggle-f and
// Hide empty userAnswers
// Hide a list of questions ID togglelist (comma seperated list)
function hideInSummary(){	
	$('.summaryContainer').find('.summaryFieldset').each(function(){	
		var that = this;
		var $userAnswers = $(this).find('.responsePanel .userAnswer');
		$userAnswers.each(function(){
			var answerText = ($(this).text()).replace(/[\t\n\r]+/g, '');
			if(answerText === "" || answerText == "-999"){
				if($userAnswers.length == 1){ $(that).hide();} // Hide the hole fieldset if only one reponse panel
				else {$(this).hide();} // Hide only current answerText if multiple panels
			}else if($(this).find('.triggerToggle-f').length > 0){
				$(that).hide();
			}
			// remove the list if only one item
			if($(this).find('li').length == 1){
				answerText = $(this).find('li').html();
				$(this).html(answerText);
			}	
			var $toggleList = $(that).find('[id*="togglelist"], .toggleList');
			if($toggleList.length > 0){			
				var list = (($(this).text()).replace(/[\t\n\r]+/g, '')).split(',');
				for(var i=0;i<list.length;i++){
					($('[id*="'+list[i]+'"]').closest('.summaryFieldset,.summaryDiv')).hide();
				}
			}			
		});		
	});
}
$(document).ready(function(){
	// init the triggerToggles
    //not used for now but we could check if -999 is still visible and show a warning on page
    //$('.triggerToggle').on("toggleInit_done", function (event, data) {
    //    console.log("done");
    //});
    $('.triggerToggle').iffs_toggle();	
    
	// Hide toggles in summary
	hideInSummary();		
});
