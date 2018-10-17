/**
 * @file mip-append-video 带有广告的视频播放组件主文件
 * @author youlai
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElem = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 播放器需要在首屏显示，需要尽快加载
     */
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);
        var adSrc = $element.attr('ad-src');
        var adSrcEnd = $element.attr('ad-src-end');
        var targetSrc = $element.attr('target-src');
        var poster = $element.attr('poster');
        var aliSrc = $element.attr('ali-src');
        // 广告提示的dom
        var domAdTip = document.createElement('div');
        // domAdTip.innerHTML = '广告';
        // domAdTip.className = 'ad-tip';
        // 初始化播放器
        var video = document.createElement('video');
        var src = adSrc && !(platform.isIos() && platform.isQQ()) ? adSrc : targetSrc;
        // 根据时长替换视频地址
        var replaceVideoSrc = function (src) {
            $(video).attr({
                id: 'vide',
                controls: '',
                src: src,
                poster: poster,
                preload: 'no'
            });
        };

        video.poster = poster;
        video.controls = true;

        if (aliSrc) {

            // 根据视频地址获取是否可以正常播放的接口地
            var videoInterfaceUrl = '//s.cnkang.com/mip/video/check?video_url=' + encodeURIComponent(targetSrc);
            fetchJsonp(videoInterfaceUrl, {
                jsonpCallback: 'callback',
                timeout: 1000
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                data = data || {};
                var code = data.code;
                var tmpSrc = src;
                if (code !== 200) {
                    tmpSrc = aliSrc;
                }
                replaceVideoSrc(tmpSrc);
            }).catch(function () {
                replaceVideoSrc(aliSrc);
            });
        }
        else {
            replaceVideoSrc(src);
        }

        //  初始化video的尺寸大小
        var height = window.innerWidth / 16 * 9 + 'px';
        $(video).css('height', height);
        $element[0].appendChild(video);
        $('.shipin,.box2,.box3').height(height);
        $('#video').css('height', 'height');
        //  当播放开始的时候设置为自动播放
        video.onplay = function () {
            video.autoplay = true;
            $('.video_logo').hide();
            $('.box2, .box3').addClass('hide');
            $('.play').addClass('hide');
        };
        // 如果有广告并且非IOS上的QQ浏览器 则播放广告
        if (adSrc && !(platform.isIos() && platform.isQQ())) {
            $element[0].appendChild(domAdTip);
            // 广告播放完毕
            video.onended = function () {
                if (video.src === targetSrc && adSrcEnd) {
                    // 显示广告提示
                    domAdTip.style.display = 'block';
                    video.src = adSrcEnd;
                    video.autoplay = false;
                }
                else {
                    // 隐藏广告提示
                    domAdTip.style.display = 'none';
                    video.src = targetSrc;
                    video.autoplay = true;
                    video.setAttribute('autoplay', 'autoplay');
                    video.play();
                }
            };
            $('.play').click(function () {
                video.play();
                $('.box2, .box3').addClass('hide');
                $('.play').addClass('hide');
            });
        }
        else {
            // 否则直接播放内容
            video.onended = function () {
                this.webkitExitFullScreen();
                $('.box2, .box3').removeClass('hide');
                $('.play').removeClass('hide');
            };
            $('.play').click(function () {
                video.play();
                $('.box2, .box3').addClass('hide');
                $('.play').addClass('hide');
            });
        }
    };
    $('.close').click(function () {
        $('.box2, .box3').addClass('hide');
        $('.play').addClass('hide');
    });
    var constant = $('.changliang').html();
    var constant1 = $('.changliang1').html();
    $.ajax({
        url: 'https://m.youlai.cn/mapi/gInfo?did=' + constant + '&aid=' + constant1 + '&callback=adsf',
        dataType: 'jsonp',
        data: '',
        jsonp: 'callback',
        success: function (data) {
            if (!data) {
                $('.box2, .box3').css('display', 'none');
                $('.play').css('display', 'none');
            }
            if (data.length === 2) {
                $('.neirong a').eq(0).text(data[0].title);
                $('.gaodu').eq(0).attr('src', data[0].litpic);
                $('.pic img').eq(0).attr('src', data[0].litpic);
                $('.neirong a').eq(1).text(data[1].title);
                $('.gaodu').eq(1).attr('src', data[1].litpic);
                $('.pic img').eq(1).attr('src', data[1].litpic);
                $('.pic').eq(0).attr('href', 'https://m.youlai.cn/video/mip/' + data[0].id + '.html');
                $('.pic').eq(1).attr('href', 'https://m.youlai.cn/video/mip/' + data[1].id + '.html');
                $('.neirong a').eq(0).attr('href', 'https://m.youlai.cn/video/mip/' + data[0].id + '.html');
                $('.neirong a').eq(1).attr('href', 'https://m.youlai.cn/video/mip/' + data[1].id + '.html');
            }
            if (data.length === 1) {
                $('.juli').addClass('hide');
                $('.pic,.neirong a').css('margin-left', '26%');
                $('.neirong a').eq(0).text(data[0].title);
                $('.gaodu').eq(0).attr('src', data[0].litpic);
                $('.pic img').eq(0).attr('src', data[0].litpic);
                $('.pic').eq(0).attr('href', 'https://m.youlai.cn/video/mip/' + data[0].id + '.html');
                $('.neirong a').eq(0).attr('href', 'https://m.youlai.cn/video/mip/' + data[0].id + '.html');
            }
        }
    });
    return customElem;
});

