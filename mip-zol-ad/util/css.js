/**
 * @file css工具类
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {

    /**
     * 设置和获取css
     *
     * @param {Array|Object} elements element元素，允许多个
     * @param {Object|string} property 设置的属性，键值对和字符串
     * @param {?string} value 不填表示获取
     * @return {Object|string} 设置返回对象，获取返回字符串
     */
    module.exports = function css(elements, property, value) {
        var element;
        if (!elements || !property) {
            return elements;
        }
        if (elements.length && elements[0]) {
            for (var i = 0; i < elements.length; i++) {
                css(elements[i], property, value);
            }
            return elements;
        }
        element = elements;
        if (element.nodeType !== 1) {
            return element;
        }
        if (typeof property !== 'string' || value !== undefined) {
            if (typeof property !== 'string') {
                for (var j in property) {
                    element.style[j] = property[j];
                }
            } else {
                element.style[property] = value;
            }
            return element;
        } else {
            return element.style[property];
        }
    };
});
