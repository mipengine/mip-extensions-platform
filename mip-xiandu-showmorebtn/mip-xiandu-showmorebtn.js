/**
 * @file mip-xiandu-showmorebtn 组件
 * @author
 */
var pagecount = 1;
var pageIndex = 1;
var target = '';
var jsurl = '';
var moreId = '';
var resultJson = {};
define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        target = ele.getAttribute('target');
        pagecount = ele.getAttribute('pagecount');
        jsurl = ele.getAttribute('jsurl');
        moreId = ele.getAttribute('moreId');
        // 把script 插入到body里面
        if (pagecount === 1) {
            document.getElementById(moreId).innerHTML = '没有更多了';
            pageIndex += 1;
            return;
        }
        ele.addEventListener('click', function () {
            if (pageIndex >= pagecount) {
                return;
            }
            var script = document.createElement('script');
            // 创建一个script 标签
            script.src = jsurl + target + '_' + pageIndex + '.js?t=' + (new Date()).valueOf();
            // 把script的src设置为我们请求数据的地址并传递参数 和回调函数
            document.body.appendChild(script);
            // 把script 插入到body里面
            script.onload = function () {
                var nowJson = JSON.parse((document.getElementById(target).getAttribute('remoteJson')));
                fillData(nowJson, target);
                document.getElementById(target).removeAttribute('remoteJson');
            };
        }, false);
    };
    return customElement;
});

// 填充数据
// json:填充数据的json串
// id:填充dom的id
function fillData(json, id) {
    for (var i = 0; i < json.length; i++) {
        document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + json[i].html;
    }
    pageIndex += 1;
    if (pageIndex >= pagecount) {
        document.getElementById(moreId).innerHTML = '没有更多了';
    }
}
