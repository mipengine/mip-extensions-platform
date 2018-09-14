/**
 * @file mip-zol-mrender 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var mustache = require('mip-mustache/mustache');
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

    function setTemplateCache(element) {
        var templateElm = element.querySelector('template');
        var template = templateElm ? templateElm.innerHTML : (element.template ? element.template : 0);
        element.template = template;
        element.addEventListener('touchmove', function (e) {
            e.stopPropagation();
        });
    }

    customElement.prototype.render = function (e, renderByEventAction) {
        var element = this.element;
        // 获取数据表达式
        var exp = this.element.getAttribute('data');
        var data = null;
        var html = '';

        if (renderByEventAction) {
            exp = this.element.getAttribute('login-data');
            if (!exp || exp === '') {
                return;
            }
            // 获取数据
            if (e && e.data) {
                // 获取数据
                var expTemp = exp.replace(/^[window.m|m]./, '').replace(/\[(\d+)\]/g, '.$1');
                var expArr = expTemp.split('.');
                data = e.data;
                expArr.forEach(function (item) {
                    if (/^\d+$/.test(item)) {
                        item = parseInt(item, 10);
                    }
                    data = data[item];
                });
            }
            // 渲染模板
            if (data && element.template) {
                html = mustache.render(element.template, data).trim();
                element.innerHTML = html;
                element.renderComplete = true;
            }
        }
        else {
            if (element.renderComplete || !exp || exp === '') {
                return;
            }
            data = getWithResult(exp)();
            // 渲染模板
            if (data && element.template) {
                html = mustache.render(element.template, data).trim();
                element.innerHTML = html;
                element.renderComplete = true;
            }
        }
    };

    // 绑定找到组件下面元素的方法，并返回给其他组件使用
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var self = this;

        var needLoginAttr = element.getAttribute('isNeedLogin');
        var isNeedLogin = needLoginAttr !== null && needLoginAttr !== '0' && needLoginAttr !== 'false';
        element.isNeedLogin = isNeedLogin;

        setTemplateCache(element);

        // 登录
        if (isNeedLogin) {
            this.addEventAction('render', function (e) {
                self.render(e, true);
            });
        }

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
        setTemplateCache(this.element);
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
        setTemplateCache(this.element);
        if (inViewport) {
            this.render();
        }
    };

    return customElement;

});
