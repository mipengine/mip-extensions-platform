/**
 * @file mip-zol-mrender 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var viewer = require('viewer');

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
        // 检查是否有模板
        var templateElm = element.querySelector('template');
        // 渲染模板
        if (data && templateElm) {
            templates.render(element, data).then(function (html) {
                element.innerHTML = html;
                element.renderComplete = true;
            });
        }
    };

    // 绑定找到组件下面元素的方法，并返回给其他组件使用
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        this.addEventAction('findElement', function (e) {
            var roleSelector = e.itemRole;
            var roleElements = [];
            roleSelector.forEach(function (item) {
                var roleElm = element.querySelector('#' + item);
                if (roleElm) {
                    roleElements.push(roleElm);
                }
            });
            viewer.eventAction.execute('elementFinded', element, {
                roleElement: roleElements,
                targetElement: e.targetElement
            });
        });
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
