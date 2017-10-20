/**
 * @file mip-control-but 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var $element = $(this.element);
        var conType = $element.attr('con-type');
        var conSelecter = $element.attr('con-selecter');
        var conDom = $(document).find(conSelecter);
        if (conType === 'shiwHide') {
            $element[0].addEventListener('click', function () {
                var now = conDom.css('display');
                if (now === 'none') {
                    conDom.show();
                }
                else {
                    conDom.hide();
                }
            }, false);
        }
        else {
            $element[0].addEventListener('click', function () {
                conDom.remove();
            }, false);
        }
    };
    return customElement;
});
