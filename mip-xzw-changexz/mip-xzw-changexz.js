/**
* 星座屋mip改造
* @file 星座屋changexz组件
* @author mipxzw@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        var element = $(this.element);
        var ele = this.element;
        var k = ele.getAttribute('data-cookie');
        var url = ele.getAttribute('data-url');
        var userinfo = '';
        var xzid = '';
        var c = document.cookie.split('; ');
        for (var i = 0; i < c.length; i++) {
            var p = c[i].split('=');
            if (k === p[0]) {
                try {
                    userinfo = decodeURIComponent(p[1]);
                }
                catch (e) {
                    return false;
                }
            }

        }
        if (userinfo) {
            userinfo = JSON.parse(userinfo);
            xzid = userinfo.aid;
        }

        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                id: xzid
            },
            jsonp: 'callback',
            cache: true,
            success: function (data) {
                $(element.find('.imgtbox')).html(data[0]);
                $(element.find('.febox')).html(data[1]);
                $(element.find('.xzname')).text(data[2]);
            },
            timeout: 3000
        });

    };
    return customElem;
});
