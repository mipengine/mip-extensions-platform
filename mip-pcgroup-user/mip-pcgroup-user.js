/**
 * @file mip-pcgroup-user 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var site = element.getAttribute('data-site') || 'pconline';
        var domain = site + '.com.cn';
        if (site === 'geeknev') {
            domain = site + 'com';
        }

        var url = '//my.' + domain + '/intf/getLogedUser.jsp';

        fetchJsonp(url, {
            jsonpCallback: 'callback',
            jsonpCallbackFunction: 'getLogedUser'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var pic = '';
            if (data.id > 0) {
                var ret = [];
                var id = '' + data.id; // 变成字符
                var i = 0;
                var l = id.length;
                while (i + 2 <= l) {
                    ret.push(id.slice(i, i + 2));
                    i += 2;
                }

                if (i < l) {
                    ret.push(id.charAt(i));
                }

                pic = '//i1.3conline.com/images/upload/upc/face/' + ret.join('/') + '/' + id + '_50x50';
            }
            data.head = pic;
            window.PCGROUND_USER_INFO = data;
        });
    };

    return customElement;
});
