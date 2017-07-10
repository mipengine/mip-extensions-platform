/**
 * @file mip-pbcontent 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var $ = require('jquery');
        var element = this.element;
        var pt = element.getAttribute('type');
        var id = element.getAttribute('pid');
        var at = element.getAttribute('at');
        var title = element.getAttribute('titl');
        var href = location.href;
        if (pt && id && at) {
            window.pb = function (data) {
                if (data) {
                    window.location = '/404?pb=' + at + '&href=' + href;
                }
            };
            $.getScript('http://pb.sys.pp8.com/getpb.do?pt=' + pt + '&id=' + id + '&at=' + at + '&callback=pb&title=' + title);
        }
    };
    return customElement;
});
