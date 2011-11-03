Skroller
===

A tiny library to skroll around. It looks like this :

    skroller($('body'), $('#somewhere'), {
        axis: 'xy',
        duration: 800,
        complete: function() {
            alert('Skrolling is completed !'):
        }
    });


API
---

###skroller(element, to, options)

General skrolling function.

####Arguments:

    element           Element to scroll (or string).
    to                Target element to scroll to or number.
    options           Skroll options:
     - axis             Scroll axis (x,y,xy,yx,both)
                        'both' will scroll on both axis at the same time (diagonal scroll), this is the default.
                        'xy' will scroll on axis x and then on axis y.
     - duration         Scroll duration in ms.
     - complete         On complete callback.

###skroller.href(element, options)

- Binds to the _element_ click event
- Looks for the href attribute of _element_ (&lt;a href="#anchor">).
- Scrolls to the corresponding anchor (&lt;a name="anchor">).
    
####Arguments:

    element         Element to bind to (usually an A tag).
    options         Skroll options:
     - element        Element to scroll (if undefined, the function will search a parent scrollable element)
     - axis           \
     - duration       | -> see skroller()
     - complete       /

Ender
---

Got ender ?

    $('body').skrollTo('#element', {
        duration: 600,
    });
    
    $('a').skrollHref({
        duration: 800,
        axis: 'xy',
    });