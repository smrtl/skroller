/*!
 * Skroller - Skroll around
 * https://github.com/smrtl/skroller - (c) Samuel Suter 2011
 * License MIT
 */
!function (name, definition) {
    if (typeof define == 'function') define(definition)
    else if (typeof module != 'undefined') module.exports = definition()
    else this[name] = definition()
}('skroller', function () {
    /**
     * Skroller.
     *
     * @param el        Element to scroll.
     * @param to        Target (element or number).
     * @param o         Options: 
     *      duration        Scroll duration in ms.
     *      axis            Scroll axis (x, y, xy, yx or both).
     *      complete        Complete callback.
     */
    function skroller(el, to, o)
    {
        var skx,sky,d,a,s;
        el = $(el);
        eo = el.first().offset();
        to = typeof(to) == 'number' ? to : $(to).first().offset();
        o  = typeof(o) == 'object' ? o : {};
        d  = typeof(o.duration) == 'number' ? o.duration : 800;
        a  = typeof(o.axis) == 'string' && o.axis.length ? o.axis : 'both';

        if (el[0].skroll) {
            el[0].skroll.stop();
        }

        if (a != 'y') {
            skx = {from:el.scrollLeft()};
            skx.diff = (typeof(to) == 'number' ? to : to.left - eo.left) - skx.from;
            skx.diff = Math.min(skx.diff, el[0].scrollWidth - el.width() - skx.from);
            if (skx.diff == 0) skx = false;
            else skx.fn = function(p) { el.scrollLeft((p * skx.diff) + skx.from); };
        }
        if (a != 'x') {
            s = el[0].scrollHeight - el.height();   
            sky = {from:el.scrollTop()};
            sky.diff = (typeof(to) == 'number' ? to : to.top - eo.top) - sky.from;
            sky.diff = Math.min(sky.diff, s > 0 ? s - sky.from : el[0].scrollHeight - sky.from); // Fix when body.heiht == body.scrollHeight
            if (sky.diff == 0) sky = false;
            else sky.fn = function(p) { el.scrollTop((p * sky.diff) + sky.from) };
        }

        function done() {
            el[0].skroll && delete el[0].skroll;
            typeof(o.complete) == 'function' && o.complete();
        }
        
        if (a[0] == 'x' && skx) {
            el[0].skroll = $.tween(d,skx.fn,function() { sky ? el[0].skroll = $.tween(d,sky.fn,done) : done() });
        } else if (a[0] == 'y' && sky) {
            el[0].skroll = $.tween(d,sky.fn,function() { skx ? el[0].skroll = $.tween(d,skx.fn,done) : done() });
        } else if (skx && sky) {
            el[0].skroll = $.tween(d,function(p) {skx.fn(p);sky.fn(p);},done);
        } else if (skx) {
            el[0].skroll = $.tween(d,skx.fn,done);
        } else if (sky) {
            el[0].skroll = $.tween(d,sky.fn,done);
        } else {
            done();
        }
    }
    
    /**
     * Bind to HREF
     *
     * @param el        Element to bind to.
     * @param o         Options (element, duration, axis, complete)
     */
    skroller.href = function(el, o)
    {
        el = $(el);
        var to = el.attr('href'), p, pi, of, ov;

        o  = typeof(o) == 'object' ? o : {};
        to = typeof(to) == 'string' && to.length && to[0] == '#' ? $('a[name='+to.substring(1,to.length)+']') : false;
        if (!to) return;
        
        if (!o.element) {
            p = to.parents('*');
            for (var i=0;i<p.length;i++) {
                pi = $(p[i]); of = pi.offset(); ov = pi.css('overflow');
                if (ov != 'visible' && ov != 'hidden' && (p[i].scrollHeight-of.height>0 || p[i].scrollWidth-of.width>0)) {
                    o.element = p[i];
                    break;
                }
            }            
        }
        if (!o.element) o.element = $('body');

        el.click(function(e) {
            e.preventDefault();
            skroller(o.element, to, o);
        });
    }
    
    return skroller;
})
