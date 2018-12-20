/**
 * @file ripple DOM Compile funtion
 * @author Zhuguoxi
 * @email zhuguoxi@email.com
 */

define(function (require) {

    var $ = require('zepto');

    var util = require('util');
    var fn = util.fn;

    var RIPPLE_ATTR = 'ripple';
    var RIPPLE_HEIGHT = 10;
    var RIPPLE_WIDTH = 10;


    /**
    * Compile Class
    *
    * @class
    */
    var Compile = function () {
        this._el = document.documentElement;
    };

    /**
     * Compile module entry function
     *
     */
    Compile.prototype.start = function () {
        var that = this;
        $(this._el).on('touchstart', '[ripple]', function (e) {
            that._onTouchStart.call(this, e, {
                value: e.currentTarget.getAttribute('ripple-color') || 'while'
            });
        });
    };

    Compile.fixer = function ($el, key, fixValue, verifyFn) {
        var orivalue = $el.css(key);
        if (verifyFn(orivalue)) {
            $el.css(key, fixValue);
        }

        $el.data(key, orivalue);
    };

    Compile.fixerStyle = function ($el, rollback) {
        if (rollback) {
            $el.css('position', $el.data('position'));
            $el.css('overflow', $el.data('overflow'));
            $el.css('transform', $el.data('transform'));
            return;
        }
        Compile.fixer($el, 'position', 'relative', function (orivalue) {
            return (!orivalue || orivalue === 'static');
        });

        Compile.fixer($el, 'overflow', 'hidden', function (orivalue) {
            return orivalue !== 'hidden';
        });

        Compile.fixer($el, 'transform', 'translateZ(0)', function (orivalue) {
            console.log(orivalue);
            return !orivalue || orivalue === 'none';
        });
    };



    Compile.prototype._onTouchStart = function (event, binding) {
        binding = binding || {};
        var $el = $(this);
        var btnOffset = $el.offset();

        var xPos = event.touches[0].pageX - btnOffset.left;
        var yPos = event.touches[0].pageY - btnOffset.top;

        var $ripple = $('<div/>')
            .addClass('ripple-effect')
            .css('height', RIPPLE_HEIGHT)
            .css('width', RIPPLE_WIDTH)
            .css({
                top: yPos - (RIPPLE_HEIGHT / 2),
                left: xPos - (RIPPLE_WIDTH / 2),
                background: binding.value || 'white'
            })
            .appendTo($(this));

        Compile.fixerStyle($el);



        window.setTimeout(function () {
            $ripple.remove();
            Compile.fixerStyle($el, true);
        }, 1000);
    };


    return Compile;
});
