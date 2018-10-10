/**
 * @file mip-load-more 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

    function getData(src, offset, size) {
        $.ajax({
            type: 'GET',
            url: src + '&now=' + Math.random(),
            dataType: 'json',
            success: function (reponse) {
                var data = reponse;
                var sum = reponse.length;
                var result = '';
                if (sum - offset < size) {
                    size = sum - offset;
                }
                // 使用for循环模拟SQL里的limit(offset,size)
                for (var i = offset; i < (offset + size); i++) {
                    var num = Number(data[i].play_num) + Number(data[i].add_time.substr(7));
                    result += '<div class="video_img">' + '<a href="/video/v' + data[i].id + '.html">' + '<mip-img src="http://shenzhen.66zhuang.com' + data[i].picname + '"></mip-img>' + '<i class="icon-video mark-video"></i>' + '</a>' + '</div>' + '<div class="video_cont">' + '<a href="/video/v' + data[i].id + '.html"><span class="title">' + data[i].title + '</span></a>' + '<span class="view"><i class="icon-video page-view"></i>' + num + '</span>' + '</div>';
                }
                $('.js-blog-list').append(result);
                // 隐藏more
                if ((Number(offset) + Number(size)) >= sum) {
                    $('.js-load-more').hide();
                }
                else {
                    $('.js-load-more').show();
                }
            },
            error: function (xhr, type) {
                alert('Ajax error!');
            }
        });
    }

    customElement.prototype.firstInviewCallback = function () {

        var self = this;
        var element = self.element;
        var src = element.getAttribute('data-src') || '';
        var counter = 0;
        var pageStart = 0;
        var pageSize = element.getAttribute('load-number') || 5;

        // 如果没有写data-src, 则报错提示
        if (!src) {
            alert('未填写src字段，不能获取数据');
            element.remove();
            return;
        }
        $('.js-load-more').show();
        // 监听加载更多
        $(element).on('click', '.js-load-more', function () {
            counter++;
            pageStart = counter * pageSize;
            getData(src, pageStart, pageSize);
        });
    };

    return customElement;
});
