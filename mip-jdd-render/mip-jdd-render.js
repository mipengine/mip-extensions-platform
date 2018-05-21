/**
 * @file mip-jdd-render 组件
 * @author yangtong
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var templates = require('templates');
    var viewer = require('viewer');

    //  build说明：组件标签含有render属性则需要立即渲染，没有则监听render事件(firstInviewCallback在组件display:none;的情况下仍会触发。)
    customElement.prototype.build = function () {
        var immediateRender = this.element.hasAttribute('render');
        var self = this;
        var data = getData.call(this);
        this.hasRendered = false;
        if (immediateRender) {
            render.call(this, data);
        }
        else {
            this.addEventAction('render', function () {
                render.call(self, data);
            });
        }
    };

    /**
     * 在组件内渲染模版，触发事件rendered
     *
     * @param {Object} data 数据源
     */
    function render(data) {
        if (this.hasRendered || !data) {
            return;
        }

        this.hasRendered = true;
        var self = this;
        templates.render(this.element, data).then(function (htmls) {
            var html = htmls instanceof Array ? htmls.join('') : htmls;
            self.element.innerHTML = html;
            viewer.eventAction.execute('rendered', self.element, {});
        });
    }

    /**
     * 获取数据
     *
     * @return {Object} 传递给模板用来渲染的数据
     */
    function getData() {
        var element = this.element;
        var script = element.querySelector('script[type="application/json"]');
        return script ? JSON.parse(script.textContent.toString()) : null;
    }

    return customElement;
});
