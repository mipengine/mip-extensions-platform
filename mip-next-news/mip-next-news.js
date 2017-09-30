/**
 * @file mip-next-news 组件，用来给文章内容页增加相关新闻第一篇的效果
 * @author gom
 */

define(function (require) {

    var customElement = require('customElement').create();
    function nextpagenews() {
        var nexturl = $('.g-cmslist li').first().find('a').attr('href');
        $('.m-nexta').attr('href', nexturl);
    }
    customElement.prototype.build = function () {
        nextpagenews();
    };
    return customElement;
});
