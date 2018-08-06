/**
 * @file mip-xiandu-showmorebtn 组件
 * @author
 */
var pagecount = 1;
var pageIndex = 1;
var target = '';
var jsurl = '';
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
        var script = document.createElement('script');
        // 穿件一个script 标签
        script.src = jsurl + target + '_' + pageIndex + '.js';
        // 把script的src设置为我们请求数据的地址并传递参数 和回调函数
        document.body.appendChild(script);
        // 把script 插入到body里面
        if (pageIndex > pagecount) {
            return;
        }
        script.onload = function () {
            var nowJson = JSON.parse((document.getElementById('tbList').getAttribute('remoteJson')));
            fillData(nowJson, target);
            document.getElementById('tbList').removeAttribute('remoteJson');
        };
        ele.addEventListener('click', function () {
            if (pageIndex > pagecount) {
                return;
            }
            var script = document.createElement('script');
            // 穿件一个script 标签
            script.src = jsurl + target + '_' + pageIndex + '.js';
            // 把script的src设置为我们请求数据的地址并传递参数 和回调函数
            document.body.appendChild(script);
            // 把script 插入到body里面
            script.onload = function () {
                var nowJson = JSON.parse((document.getElementById('tbList').getAttribute('remoteJson')));
                fillData(nowJson, target);
                document.getElementById('tbList').removeAttribute('remoteJson');
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
    if (pageIndex >= pagecount) {
        document.getElementById('divMore').innerHTML = '没有更多了';
    }
    else {
        pageIndex += 1;
    }
}
