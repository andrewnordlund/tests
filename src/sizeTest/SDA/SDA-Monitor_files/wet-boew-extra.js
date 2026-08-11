(function ($, wb) {
    /* ---------------------------------
    Removes the link to the Skip links navigation
    @param text: Text to display in the anchor or button
    @param attr: JSO with { attribute: value, ... } to add attributes to the anchor or button. Minimum is { href: "#your-anchor" } for the anchor tag
    @param isBtn: (Optional) Bool if true element is a button, otherwise it is an anchor by default
    -------------------------------- */
    wb.removeSkipLink = function (text, attr, isBtn) {
        var list = document.getElementById("wb-tphp"),
            li = document.createElement("li"),
            elm = document.createElement((isBtn ? "button" : "a")),
            key;

        // Add skip link's proprietary classes to new element
        li.className = "wb-slc";
        elm.className = "wb-sl";

        // Add given attributes to element
        for (key in attr) {
            elm.setAttribute(key, attr[key]);
        }

        // Append text and new element to the skip link list (after main content)
        elm.appendChild(document.createTextNode(text));
        li.appendChild(elm);

        var listChildren = list.children;
        for (var i = 0; i < listChildren.length; i++) {
            if (listChildren[i].innerHTML.trim() === li.innerHTML.trim()) {
                listChildren[i].remove();
            }
        }
        return true;
    };
})(jQuery, wb);

(function ($, window, wb) {
    "use strict";

    /*
     * Variable and function definitions.
     * These are global to the event - meaning that they will be initialized once per page,
     * not once per instance of event on the page.
     */
    var componentName = "wb-remove-skip-link",
        selector = "#wb-tphp",
        $document = wb.doc,

        /**
         * @method init
         * @param {jQuery Event} event Event that triggered the function call
         */
        init = function (event) {
            // Start initialization
            // returns DOM object = proceed with init
            // returns undefined = do not proceed with init (e.g., already initialized)
            var elm = wb.init(event, componentName, selector, true),
                nQuery = "?",
                pageUrl = wb.pageUrlParts,
                param,
                i18n = wb.i18n;

            // Rebuild the query string
            for (param in pageUrl.params) {
                if (param && Object.prototype.hasOwnProperty.call(pageUrl.params, param) && param !== "wbdisable") {
                    nQuery += param + "=" + pageUrl.params[param] + "&";
                }
            }

            if (elm) {

                // Remove the added Basic HTML version link version
                // Add link to disable WET plugins and polyfills
                wb.removeSkipLink(wb.i18n("wb-disable"), {
                    href: nQuery + "wbdisable=true",
                    rel: "alternate"
                }, false, true);

                // Identify that initialization has completed
                wb.ready($document, componentName);
            }
        };

    // Bind the events
    $document.on("timerpoke.wb", selector, init);

    // Add the timer poke to initialize the plugin
    wb.add(selector);

})(jQuery, window, wb);

// Get Query String Values from URL Parameters.
(function ($) {
    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);