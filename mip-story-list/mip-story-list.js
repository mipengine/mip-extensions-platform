/**
 * @file mip-story-list 组件
 * @author
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = this.element;
        var dataSrc = $el.getAttribute('data-src');

        // 异步获取数据
        fetch(dataSrc, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var listStr = renderList(data.list);
            var listDom = util.dom.create(listStr);
            $el.appendChild(listDom);
        });

        // 渲染列表
        function renderList(list) {
            var str = '';
            for (var i = 0; i < list.length; i++) {
                var currentList = list[i];
                str += ''
                + '\n                    <li class=\"list-item\">\n                        <a href=\"'
                + currentList.href
                + '\" mip-link>\n <mip-img layout=\"responsive\" width=\"540\" height=\"960\" src=\"'
                + currentList.cover
                + '\"></mip-img>\n                            <p class=\"title\">'
                + currentList.title
                + '</p>\n                            <p class=\"desc\">'
                + currentList.description
                + '</p>\n                        </a>\n                    </li>\n                ';
            }
            return '<ul>' + str + '</ul>';
        }
    };

    return customElement;
});
