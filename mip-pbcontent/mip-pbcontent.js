/**
 * @file mip-pbcontent 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        var pt = element.getAttribute('type');
        var id = element.getAttribute('pid');
        var at = element.getAttribute('at');
        var title = element.getAttribute('titl');
        var href = location.href;
        if (pt && id && at) {
            var url = 'https://syspb.391k.com/getpb.do?pt=' + pt + '&id=' + id + '&at=' + at + '&title=' + title;
            var fetchJsonp = require('fetch-jsonp');
            fetchJsonp(url).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data) {
                    window.location = '/404?pb=' + at + '&href=' + href;
                }
            });
        }
    };
    return customElement;
});
