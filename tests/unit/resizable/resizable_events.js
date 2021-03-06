/*
 * resizable_events.js
 */
(function($) {

module("resizable: events");

test("start", function() {

    expect(5);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        start: function(event, ui) { 
            equal( ui.size.width, 100, "compare width" );
            equal( ui.size.height, 100, "compare height" );
            equal( ui.originalSize.width, 100, "compare original width" );
            equal( ui.originalSize.height, 100, "compare original height" );
            count++;
        }
    });

    drag(handle, 50, 50);

    equal(count, 1, "start callback should happen exactly once");

});

test("resize", function() {

    expect(9);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        resize: function(event, ui) { 
            if (count === 0) {
                equal( ui.size.width, 101, "compare width" );
                equal( ui.size.height, 101, "compare height" );
                equal( ui.originalSize.width, 100, "compare original width" );
                equal( ui.originalSize.height, 100, "compare original height" );
            }
            else {
                equal( ui.size.width, 150, "compare width" );
                equal( ui.size.height, 150, "compare height" );
                equal( ui.originalSize.width, 100, "compare original width" );
                equal( ui.originalSize.height, 100, "compare original height" );
            }
            count++;
        }
    });

    drag(handle, 50, 50);

    equal(count, 2, "resize callback should happen exactly once per size adjustment");

});

test("resize (min/max dimensions)", function() {

    expect(5);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        minWidth: 60,
        minHeight: 60,
        maxWidth: 100,
        maxHeight: 100,
        resize: function(event, ui) {
            equal( ui.size.width, 60, "compare width" );
            equal( ui.size.height, 60, "compare height" );
            equal( ui.originalSize.width, 100, "compare original width" );
            equal( ui.originalSize.height, 100, "compare original height" );
            count++;
        }
    });

    drag(handle, -50, -50);

    equal(count, 1, "resize callback should happen exactly once per size adjustment");

});

test("resize (containment)", function() {

    expect(5);

    var count = 0,
        handle = '.ui-resizable-se',
        container = $('#resizable1').wrap('<div>').parent().css({
            height: '100px',
            width: '100px'
        });

    el = $("#resizable1").resizable({
        handles: 'all',
        containment: container,
        resize: function(event, ui) {
            equal( ui.size.width, 50, "compare width" );
            equal( ui.size.height, 50, "compare height" );
            equal( ui.originalSize.width, 100, "compare original width" );
            equal( ui.originalSize.height, 100, "compare original height" );
            count++;
        }
    });

    drag(handle, -50, -50);

    equal(count, 1, "resize callback should happen exactly once per size adjustment");

});

test("resize (grid)", function() {

    expect(5);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        grid: 50,
        resize: function(event, ui) {
            equal( ui.size.width, 150, "compare width" );
            equal( ui.size.height, 150, "compare height" );
            equal( ui.originalSize.width, 100, "compare original width" );
            equal( ui.originalSize.height, 100, "compare original height" );
            count++;
        },
    });

    drag(handle, 50, 50);

    equal(count, 1, "resize callback should happen exactly once per grid-unit size adjustment");

});

test("stop", function() {

    expect(5);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        stop: function(event, ui) { 
            equal( ui.size.width, 150, "compare width" );
            equal( ui.size.height, 150, "compare height" );
            equal( ui.originalSize.width, 100, "compare original width" );
            equal( ui.originalSize.height, 100, "compare original height" );
            count++;
        }
    });

    drag(handle, 50, 50);

    equal(count, 1, "stop callback should happen exactly once");

});

})(jQuery);
