/**
 * @file mip-ajax-carousel 组件
 * @author yan
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var self = this;
        var element = self.element;
        var params = JSON.parse($(element).attr('mip-ajax-params').replace(/'/g, '"'));
        fetch(params.url).then(function (res) {
            return res.json();
        }).then(function (data) {
            for (var i = 0; i < data.info.list.length; i++) {
                $('.carousel-img' + i).find('img').attr('src', data.info.list[i].cover);
                $('.carousel-img' + i).find('a').attr('href', data.info.list[i].url);
            }
        });
    };

    return customElement;
});
