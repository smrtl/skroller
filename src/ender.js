!function ($) {
    var skroller = require('skroller');
    
    $.ender({
        skrollTo: function(to,o) {
            return this.each(function(el) {
                skroller(el,to,o);
            });
        },
        
        skrollHref: function(o) {
            return this.each(function(el) {
                skroller.href(el, o);
            });
        },
        
    }, true);
}(ender)
