/**
 * @file mip-load-more 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

    function getData(src, moreNum) {
        $.ajax({
            type: 'GET',
            url: src + '&flag=' + moreNum + '&now=' + Math.random(),
            dataType: 'json',
            success: function (reponse) {
                var data = reponse;
                var sum = reponse.length;
                var result = '';
                if (data === 0) {
                    $('#wenda_more').css({border: 'none', background: 'none'});
                    $('#wenda_more').html('到底啦，已经没有更多了哦!');
                }
                else {
                    for (var i = 0; i < sum; i++) {
                        result += '<li><div class="video_img"><a href="/mip/video/v' + data[i].id + '.html"><mip-img src="http://shenzhen.66zhuang.com' + data[i].picname + '"></mip-img><i class="icon-video mark-video"></i></a></div><div class="video_cont"><a href="/mip/video/v' + data[i].id + '.html"><span class="title">' + data[i].title + '</span></a><span class="view"><i class="icon-video page-view"></i>' + (Number(data[i].play_num) + Number(data[i].add_time.substr(7))) + '</span></div></li>';
                    }
                    $('#more').html(result);
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

        // 如果没有写data-src, 则报错提示
        if (!src) {
            alert('未填写src字段，不能获取数据');
            element.remove();
            return;
        }
        $('#wenda_more').show();
        // 监听加载更多
        $(element).on('click', '#wenda_more', function () {
            var moreNum = document.getElementById('more_num').innerHTML;
            counter++;
            getData(src, moreNum);
            var num = moreNum - 1 + 2;
            $('#more_num').html(num);
        });
    };

    return customElement;
});
