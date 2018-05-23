/**
* 星座屋mip改造
* @file 星座屋cookie组件
* @author mipxzw@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var element = $(this.element);
        var ele = this.element;
        var k = ele.getAttribute('data-cookie');
        var userinfo = '';
        var c = document.cookie.split('; ');
        for (var i = 0; i < c.length; i++) {
            var p = c[i].split('=');
            if (k === p[0]) {
                try {
                    userinfo = decodeURIComponent(p[1]);
                    if (userinfo) {
                        userinfo = JSON.parse(userinfo);
                        if (!userinfo.aid) {
                            return false;
                        }

                        $(element.find('.username')).text(userinfo.name);
                    }

                }
                catch (e) {
                    return false;
                }
            }

        }
    };
    return customElem;
});
