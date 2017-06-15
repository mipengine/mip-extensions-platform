/**
* 星座屋mip改造
* @file 文章列表
* @author mipxzw@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var $li = $('.list li');
        var alen = $li.length;
        $(document).on('click', '.addmorebtn', function () {
            var num = $('.list li[style = "display:none"]').length;
            var s = alen - num;
            for (var i = s; i < s + 10; i++) {
                var t = $li.eq(i);
                var bsrc = $('mip-img', t).attr('_src');
                $('mip-img', t).attr('src', bsrc);
                $('img', t).attr('src', bsrc);
                t.show();
            }
            if (num <= 10) {
                $(this).hide();
            }
        });
    };
    return customElem;
});
