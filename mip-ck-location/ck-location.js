/**
 * @author: yoyoyoo
 * @date: 2016-12-12
 * @file: mip-ck-location.js
 */

define(function (require) {
    var module = {};
    var $ = require('zepto');
    var url = 'https://m.cnkang.com/video/areaname?' + (+new Date());

    module.get = function (cb) {
        cb = cb || function () { };
        // 默认使用0
        var defaultLocation = 0;

        $.ajax({
            url: url,
            method: 'get',
            dataType: 'jsonp',
            timeout: 3000,
            success: function (res) {
                var errno = +res.errno;

                if (errno === 0) {
                    cb(res.default);
                }
                else {
                    cb(defaultLocation);
                }
            },
            error: function () {
                cb(defaultLocation);
            }
        });
    };

    return module;
});
