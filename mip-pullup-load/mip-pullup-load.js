/**
 * @file mip-pullup-load 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var me = this.element;
        var url = me.getAttribute('url') || window.location.href;
        var target = me.getAttribute('target') || 'list';
        var name = me.getAttribute('name') || 'p';
        var page = me.getAttribute('value') || 1;
        var offset = me.getAttribute('offset') || 0;
        var locked = false;
        var xmlhttp = new XMLHttpRequest();
        var lastOffset = getOffset();

        window.addEventListener('scroll', function () {
            var lof = lastOffset;
            var cof = getOffset();
            lastOffset = cof;
            if (cof < lof && cof <= offset && !locked) {
                locked = true;
                me.innerHTML = '--- 数据加载中,请稍候 ---';
                xmlhttp.open('POST', url, true);
                xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xmlhttp.onreadystatechange = function () {
                    var data;
                    var tmpNode;
                    var nodes;
                    if (xmlhttp.readyState === 4) {
                        if (xmlhttp.status === 200) {
                            try {
                                data = JSON.parse(xmlhttp.responseText);
                                if (data.html) {
                                    tmpNode = document.createElement('div');
                                    tmpNode.innerHTML = data.html;
                                    nodes = tmpNode.children;
                                    while (nodes.length > 0) {
                                        document.getElementById(target).appendChild(nodes[0]);
                                    }
                                }
                                if (page < data.maxpage) {
                                    locked = false;
                                } else {
                                    me.innerHTML = '--- 已加载到最后一页 ---';
                                }
                            } catch (e) {
                                locked = false;
                            }
                        } else {
                            locked = false;
                        }
                    }
                };
                xmlhttp.send(name + '=' + (++page));
            }
        });
    };

    function getOffset() {
        var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        var scrollTop = 0;
        var clientHeight = 0;

        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }

        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        }
        else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }


        return scrollHeight - scrollTop - clientHeight;
    }

    return customElement;
});
