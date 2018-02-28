/**
 * @file dom工具类
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    var utilCss = require('./css');
    function setAttribute(element, attribute, value) {
        if (attribute === 'id') {
            element.id = value;
        } else {
            element.setAttribute(attribute, value);
        }
    }
    function getAttribute(element, attribute) {
        if (attribute === 'id') {
            return element.id;
        } else {
            return element.getAttribute(attribute);
        }
    }
    module.exports = {
        createElement: function (tag, attribute, css) {
            var element = document.createElement(tag);
            attribute && this.attr(element, attribute);
            css && utilCss(element, css);
            return element;
        },
        attr: function attr(elements, attribute, value) {
            var element;
            if (!elements || !attribute) {
                return elements;
            }
            if (elements.length && elements[0]) {
                for (var i = 0; i < elements.length; i++) {
                    attr(elements[i], attribute, value);
                }
                return elements;
            }
            element = elements;
            if (element.nodeType !== 1) {
                return element;
            }
            if (typeof attribute !== 'string' || value !== undefined) {
                if (typeof attribute !== 'string') {
                    for (var j in attribute) {
                        setAttribute(element, j, attribute[j]);
                    }
                } else {
                    setAttribute(element, attribute, value);
                }
                return element;
            } else {
                return getAttribute(attribute);
            }
        }
    };
});
