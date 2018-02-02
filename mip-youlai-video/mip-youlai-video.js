/**
 * @file mip-youlai-video 带有三条广告的视频播放组件主文件
 * @author youlai
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);
        var adSrc = $element.attr('ad-src');
        var adSrcstart = $element.attr('ad-src-start');
        var adSrcEnd = $element.attr('ad-src-end');
        var targetSrc = $element.attr('target-src');
        var poster = $element.attr('poster');
        // 广告提示的dom
        var domAdTip = document.createElement('div');
        // domAdTip.innerHTML = '广告';
        // domAdTip.className = 'ad-tip';
        // 初始化播放器
        var video = document.createElement('video');
        // 初始化video的属性
        $(video).attr({
            'id': 'vide',
            'controls': '',
            'src': '',
            'poster': poster,
            'preload': 'no'
        });
        //  初始化video的尺寸大小
        $(video).css('height', window.innerWidth / 16 * 9 + 'px');
        $element[0].appendChild(video);
        var height = $element.find('#vide').height();
        $element.find('#video').css('height', 'height');
        var xieyi = document.location.protocol;
        //  当播放开始的时候设置为自动播放
        video.onplay = function () {
            video.autoplay = true;
            $element.find('#video .video_logo').hide();
            $element.find('#video .box2, #video .box3').addClass('hide');
            $element.find('#video .play').addClass('hide');
        };
        // 如果有广告并且非IOS上的QQ浏览器 则播放广告
        if (adSrc && !(platform.isIos() && platform.isQQ())) {
            video.src = adSrc;
            $element[0].appendChild(domAdTip);
            // 广告播放完毕
            video.onended = function () {
                if (video.src === xieyi + adSrc) {
                    // 隐藏广告提示
                    domAdTip.style.display = 'none';
                    video.src = adSrcstart;
                    video.autoplay = true;
                    video.setAttribute('autoplay', 'autoplay');
                    video.play();
                    video.onended = function () {
                        if (video.src === xieyi + adSrcstart) {
							// 显示广告提示
                            domAdTip.style.display = 'none';
                            video.src = targetSrc;
                            video.autoplay = true;
                            video.setAttribute('autoplay', 'autoplay');
                            video.onended = function () {
                                if (video.src === xieyi + targetSrc) {
									// 显示广告提示
                                    domAdTip.style.display = 'none';
                                    video.src = adSrcEnd;
                                    video.autoplay = true;
                                    video.setAttribute('autoplay', 'autoplay');
                                    video.onended = function () {
                                        this.webkitExitFullScreen();
                                        if (video.src === xieyi + adSrcEnd) {
											// 显示广告提示
                                            domAdTip.style.display = 'none';
                                            $element.find('#video .box2, #video .box3').removeClass('hide');
                                            $element.find('#video .play').removeClass('hide');
                                            $element.find('#video .play').click(function () {
                                                video.src = adSrcstart;
                                                video.play();
                                                $element.find('#video .box2, #video .box3').addClass('hide');
                                                $element.find('#video .play').addClass('hide');
                                                video.onended = function () {
                                                    if (video.src === xieyi + adSrcstart) {
														// 显示广告提示
                                                        domAdTip.style.display = 'none';
                                                        video.src = targetSrc;
                                                        video.autoplay = true;
                                                        video.setAttribute('autoplay', 'autoplay');
                                                        video.onended = function () {
                                                            this.webkitExitFullScreen();
                                                            if (video.src === xieyi + targetSrc) {
																// 显示广告提示
                                                                domAdTip.style.display = 'none';
                                                                $element.find('.box2,.box3').removeClass('hide');
                                                                $element.find('.play').removeClass('hide');
                                                            }
                                                        };
                                                    }
                                                };
                                            });
                                        }
                                    };
                                }
                            };
                        }
                    };
                }
            };
        } else {
			// 否则直接播放内容
            video.src = targetSrc;
        }
        $element.find('#video .close').click(function () {
            $element.find('#video .box2, .box3').addClass('hide');
            $element.find('#video .play').addClass('hide');
        });
        var constant = $element.find('#video .changliang').html();
        var constant1 = $element.find('#video .changliang1').html();
        $.ajax({
            url: 'https://m.youlai.cn/mapi/gInfo?did=' + constant + '&aid=' + constant1 + '&callback=adsf',
            dataType: 'jsonp',
            data: '',
            jsonp: 'callback',
            success: function (data) {
                if (!data) {
                    $element.find('#video .box2, #video .box3').css('display', 'none');
                    $element.find('#video .play').css('display', 'none');
                }
                if (data.length === 2) {
                    $element.find('.neirong a').eq(0).text(data[0].title);
                    $element.find('.gaodu').eq(0).attr('src', data[0].litpic);
                    $element.find('.pic img').eq(0).attr('src', data[0].litpic);
                    $element.find('.neirong a').eq(1).text(data[1].title);
                    $element.find('.gaodu').eq(1).attr('src', data[1].litpic);
                    $element.find('.pic img').eq(1).attr('src', data[1].litpic);
                    $element.find('.pic').eq(0).attr('href', 'https://m.youlai.cn/video/mip/' + data[0].id + '.html');
                    $element.find('.pic').eq(1).attr('href', 'https://m.youlai.cn/video/mip/' + data[1].id + '.html');
                    $element.find('.neirong a').eq(0).attr('href', 'https://m.youlai.cn/video/mip/' + data[0].id + '.html');
                    $element.find('.neirong a').eq(1).attr('href', 'https://m.youlai.cn/video/mip/' + data[1].id + '.html');
                }
                if (data.length === 1) {
                    $element.find('.juli').addClass('hide');
                    $element.find('.pic,.neirong a').css('margin-left', '26%');
                    $element.find('.neirong a').eq(0).text(data[0].title);
                    $element.find('.gaodu').eq(0).attr('src', data[0].litpic);
                    $element.find('.pic img').eq(0).attr('src', data[0].litpic);
                    $element.find('.pic').eq(0).attr('href', 'https://m.youlai.cn/video/mip/' + data[0].id + '.html');
                    $element.find('.neirong a').eq(0).attr('href', 'https://m.youlai.cn/video/mip/' + data[0].id + '.html');
                }
            }
        });
    };
    return customElem;
});

