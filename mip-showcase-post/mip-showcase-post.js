/**
 * @file mip-showcase-post 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

     /**
     * 组件构建
     */
    customElement.prototype.build = function () {
        var me = this;
        var ele = me.element;
        var url = ele.getAttribute('url');
        var method = ele.getAttribute('method');
        if (url) {
            me.addEventAction('post', function(e) {
                console.log(arguments);
                $.ajax({
                    url: url,
                    method: method,
                }).then(function(d) {
                    console.log(d);
                });
            });
        }
    };

    return customElement;
});
