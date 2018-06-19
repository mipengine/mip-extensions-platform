/**
 * @file mip-ck-domain 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $body = document.querySelector('body'); // 业务需求操作body元素的class

    // 主体功能方法
    function setHtmlDomain(elem, data) {

        var elemDomainType = elem.getAttribute('domain') || '';
        var domainsType = elemDomainType.split(',') || [];
        var len = domainsType.length;
        var i = 0;
        var domainType = '';
        var converse = elem.getAttribute('converse');
        var domainClass = domainsType.join('__').replace(/\./g, '-');
        var converseClass = '';

        if (converse !== null) {
            converseClass = '-' + 'converse';
        }

        for (i; i < len; i++) {
            domainType = domainsType[i];

            var flag = false;

            // 判断元素是否domain取反
            if (converse === null) {
                if (domainType === data) { // 判断domain
                    flag = true;
                    break;
                }
            }
            else {
                if (domainType === data) {
                    flag = false;
                    break;
                }
                else {
                    flag = true;
                }
            }
        }

        if (flag) {
            // 真 显示元素
            elem.classList.add('mip-ck-domain--show');
            $body.classList.add('view-mip-ck-domain-' + domainClass + converseClass); // 向body添加特定的class,目的是为了以后可以方便地的通过选择器来控制页面元素的相关展示
        }
        else {
            // 假 移除元素
            elem.parentNode.removeChild(elem);
        }
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
    };


    /**
     * 展示逻辑内容在首屏展示，需要尽快加载
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        setHtmlDomain(element, document.domain);
    };

    return customElement;
});
