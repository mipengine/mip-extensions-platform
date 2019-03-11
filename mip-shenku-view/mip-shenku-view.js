/**
 * @file mip-shenku-view 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        // 姓名Id
        var viewId = this.element.getAttribute('viewId');
        // URL
        var viewUrl = this.element.getAttribute('viewUrl');
		// 联系方式ID
        var viewPage = this.element.getAttribute('viewPage');
        if (viewPage === 'brand') {
            $.getJSON(viewUrl + 'brand_view.jspx',
            {
                'brandId': viewId
            },
            function (data) {
            });
        }
        if (viewPage === 'article') {
            $.getJSON(viewUrl + 'article_view.jspx',
            {
                'articleId': viewId
            },
            function (data) {
            });
        }
    };

    return customElement;
});
