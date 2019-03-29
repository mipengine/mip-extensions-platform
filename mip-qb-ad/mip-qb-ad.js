/**
 * @file mip-qb-ad 组件
 * @author
 */

define(function (require) {
    'use strict';

    let customElement = require('customElement').create();

    /**
   * 第一次进入可视区回调，只会执行一次
   */
    customElement.prototype.firstInviewCallback = function () {
    };
    /**
   * 构造元素，只会运行一次
   */
    // build说明: 异步广告备用组件
    customElement.prototype.build = function () {
        let el = this.element;
        let type = el.getAttribute('type') || '';
        let src = el.getAttribute('src') || '';
        let sogouW = el.getAttribute('w') || '';
        let sogouH = el.getAttribute('h') || '';
        let script = el.getAttribute('script') || '';
        let innerScriptNode = document.createElement('script');
        let adScriptLoaderNode = document.createElement('script');
        let container = document.createElement('div');
        container.style.minHeight = '50px';
        let scriptHtml = '';
        if (type === 'default') {
            // 适合只有src属性的单条script
            adScriptLoaderNode.src = src;
        } else if (type === 'smua') {
            // 适合 <script type="text/javascript" smua="d=m&s=b&u=u3687389&h=106" src="//www.smucdn.com/smu0/o.js"></script>
            adScriptLoaderNode.src = '//www.smucdn.com/smu0/o.js';
            adScriptLoaderNode.setAttribute('smua', src);
        } else if (type === 'sogou') {
            // 适合异步的sogou广告
            container.id = 'sogou_wap_' + src;
            scriptHtml = 'var sogou_div = document.getElementById("sogou_wap_' + src + '"); ';
            scriptHtml += 'window.sogou_un = window.sogou_un || [];';
            scriptHtml += 'window.sogou_un.push({id: ' + src + ',ele:sogou_div});';
            adScriptLoaderNode.src = script || '//theta.sogoucdn.com/wap/js/aw.js';
        } else if (type === 'sogou_auto') {
            // 适合需要自定义配置w和h的搜狗广告
            container.id = 'sogou_wap_' + src;
            scriptHtml = 'var sogou_div = document.getElementById("sogou_wap_' + src + '"); ';
            scriptHtml += 'window.sogou_un = window.sogou_un || [];';
            scriptHtml += 'window.sogou_un.push({id: ' + src + ',ele:sogou_div,w:' + sogouW + ',h:' + sogouH + '});';
            adScriptLoaderNode.src = script || '//theta.sogoucdn.com/wap/js/aw.js';
        }
        innerScriptNode.innerHTML = scriptHtml;
        // adScriptLoaderNode.onload = () => el.customElement.applyFillContent(container, true)
        container.appendChild(innerScriptNode);
        container.appendChild(adScriptLoaderNode);
        el.appendChild(container);
    };

    return customElement;
});
