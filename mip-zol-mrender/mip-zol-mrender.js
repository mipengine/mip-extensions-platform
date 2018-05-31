/**
 * @file mip-zol-mrender 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');

    /**
     * Simplified variable writing, such as m.name.firstName, we can write as name.firstName
     *
     * @param {string} exp value of directive
     * @return {string} anonymous funtion which change runtime scope and return expression
     */
    function getWithResult(exp) {
        return new Function((''
            + 'with(this){'
            +   'try {'
            +       'return ' + exp
            +   '} catch (e) {'
            +       'throw e'
            +   '}'
            + '}'
        ));
    }

    customElement.prototype.render = function () {
        var element = this.element;
        if (element.renderComplete) {
            return;
        }
        // 获取数据表达式
        var exp = this.element.getAttribute('data');
        // 获取数据
        var data = getWithResult(exp)();
        // 渲染模板
        if (data) {
            templates.render(element, data).then(function (html) {
                element.innerHTML = html;
                element.renderComplete = true;
            });
        }
    };

    /**
     * 属性发生变化时
     *
     * @param {string} attributeName 属性名
     * @param {string} oldValue 旧值
     * @param {string} newValue 新值
     */
    customElement.prototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {
        // 属性发生变化的时候才执行
        if (attributeName === 'data' && newValue && oldValue !== newValue) {
            this.render();
        }
    };

    /**
     * 进入可视区回调
     *
     * @param  {boolean} inViewport 判断是进入可视区还是离开可视区
     */
    customElement.prototype.viewportCallback = function (inViewport) {
        if (inViewport) {
            this.render();
        }
    };

    return customElement;

});
