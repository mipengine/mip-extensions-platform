/**
 * @file mip-load-cmstab
 * ==========经线上测试，firstinviewcallback无法满足效果，必须使用build，请通过=======
 * 用于给选项卡里边的内容增加点击加载内容，每个选项卡对应不同的接口，接口id和接口地址通过模版获取，接口网址为https.。
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    customElement.prototype.build = function () {
        var ele = this.element;
        var p = ele.getAttribute('data-page');
        var ajaxUrl = ele.getAttribute('data-topdateurl');
        var gxId = ele.getAttribute('data-tid');
        $(ele).find('#more').click(function () {
            $(this).html('\u5185\u5bb9\u6b63\u5728\u52a0\u8f7d\u4e2d\u002e\u002e\u002e');
            var tabid = $(ele).find('#tab-nav li.hover').attr('data-tabid');
            var tabnum = $(ele).find('#tab-nav li.hover').index();
            p++;
            fetch(ajaxUrl + 'sajax.asp?action=5&t=' + gxId + '&s=' + tabid + '&num=10&o=0&p=' + p)
                .then(function (res) {
                    return res.text();
                }).then(function (data) {
                    var html = '';
                    var data = (new Function('', 'return' + data))();
                    for (var o = 0; o < data.Title.length; ++o) {
                        html += '<li>';
                        html += '<a class="tab-con-li" href="/c/' + data.Id[o] + '">';
                        html += '' + data.Title[o] + '</a>';
                        var date0 = data.DateAndTime[o].replace(/\//ig, '-');
                        var date = date0.substring(0, data.DateAndTime[o].lastIndexOf(' '));
                        html += '<span class="u-deta">发布时间：'
                        + date + '</span><span class="u-read"><a href="/c/'
                        + data.Id[o] + '">查看全部</a></span></li>';
                    }
                    $(ele).find('#tab-div ul').eq(tabnum).append(html);
                    $(ele).find('#more').html('\u70b9\u51fb\u67e5\u770b\u66f4\u591a\u002e\u002e\u002e');
                }).catch(function (err) {
                    $(ele).find('#more').html('\u6ca1\u6709\u66f4\u591a\u5185\u5bb9\u4e86\u002e\u002e\u002e');
                });
        });
    };
    return customElement;
});
