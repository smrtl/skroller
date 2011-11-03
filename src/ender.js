!function ($) {
<<<<<<< HEAD
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
=======
    
    var skroller = require('skroller');
    
    $.ender(skroller, true);
    
}(ender)
>>>>>>> 4a26830c561249d0a78abb3003499edb98e54801
