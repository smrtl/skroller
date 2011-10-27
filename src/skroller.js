!function (name, definition) {
    if (typeof define == 'function') define(definition)
    else if (typeof module != 'undefined') module.exports = definition()
    else this[name] = definition()
}('skroller', function () {
    
    function skrollTo(el, to, duration, fn)
    {
        el = $(el);
        to = typeof to == 'number' ? to : $(to).first().offset().top - el.first().offset().top;
        
        var from = el.scrollTop();
        if (from == to) {
            if (typeof fn == 'function') fn();
            return;
        }
        $.tween(duration || 800,function(p) { el.scrollTop(p); },fn,false,from,to);
    }
    
    // Expose
    return {
        skrollTo: function(to, duration, fn) {
            skrollTo(this, to, duration, fn);
        }
    };
})
