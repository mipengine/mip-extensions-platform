/**
 * @file mip-code 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var $ = require('zepto');
        var element = this.element;
        var website = element.getAttribute('website');
        var catepath = element.getAttribute('catepath');
        var type = element.getAttribute('type');
        var url = element.getAttribute('url');
        var ids = element.getAttribute('ids');
        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp(url + '?website=' + website + '&catepath=' + catepath + '&type=' + type + '&pk=' + ids, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data != null) {
                $('.sm .qr .mip_img').attr('src', data.imgpath);
                $('.sm .qr img').attr('src', data.imgpath);
                $('.sm .text h4').html(data.word1);
                $('.sm .text strong').html(data.word2);
            }
        });
    };
    return customElement;
});
