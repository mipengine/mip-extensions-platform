/**
 * @file mip-video-repeat 带有片头片尾和重播的视频播放组件主文件
 * @author idongde
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);
        var vSrc = $element.attr('v-src');
        var vSrcEnd = $element.attr('v-src-end');
        var targetSrc = $element.attr('target-src');
        var posterSrc = $element.attr('poster-src');
        var autoPlay = $element.attr('auto-play');
        var playBtn = $element.find('.video-play-button');
        var curIndex;
        //  初始化播放器
        var video = document.createElement('video');
        //  初始化video的属性
        $(video).attr({
            'playsinline': 'playsinline',
            'webkit-playsinline': 'webkit-playsinline',
            'controls': '',
            'preload': 'no',
            'poster': posterSrc ? posterSrc : ''
        });
        if (autoPlay === 'true') {
            $(playBtn).hide();
            $(video).attr({
                autoplay: 'autoplay'
            });
        }
        //  初始化video的尺寸大小
        $(video).css('width', document.documentElement.clientWidth + 'px');
        $element[0].appendChild(video);
        $element.find('.rec-video-wrapper').hide();
        $element.find('.video-mask').hide();
        // 检查手机系统及浏览器
        checkSystemAndBrowser();
        //  当前视频播放完毕
        video.onended = function () {
            curIndex += 1;
            whichShouldPlay();
        };
        // 判断是否连续播放，到片尾结束停止
        function whichShouldPlay() {
            switch (curIndex) {
                case 1:
                    video.src = vSrc;
                    video.play();
                    break;
                case 2:
                    video.src = targetSrc;
                    video.play();
                    break;
                case 3:
                    video.src = vSrcEnd;
                    video.play();
                    break;
                case 4:
                    curIndex = 1;
                    // 判断显示哪个遮罩层
                    showWhichReplayPage();
                    break;
                default:
                    break;
            }
        }
        function showWhichReplayPage() {
            // 判断是否有data-recommend属性
            if ($element.attr('rec-video')) {
                // 显示带有推荐视频和重播的遮罩层
                showReplayPageWithRecommend();
            }
            else {
                if (platform.isAndroid() && platform.isChrome()) {
                    return;
                }
                // 显示只有重播的遮罩的界面
                showReplayPage();
            }
        }
        function showReplayPage() {
            $element.find('.video-mask').show();
            // 监听事件
            replayEvent();
        }
        function showReplayPageWithRecommend() {
            $element.find('.rec-video-wrapper').show();
            // 获取推荐视频信息
            getRecVideoData();
            replayEvent();
            bindClickNewVideo();
        }
        function replayEvent() {
            playBtn.on('click', function () {
                $element.find('.rec-video-wrapper').hide();
                $element.find('.video-mask').hide();
                if (platform.isIos() && platform.isUc()) {
                    video.src = targetSrc;
                    curIndex = 2;
                }
                else {
                    if (vSrc && !(platform.isIos() && platform.isQQ())) {
                        video.src = vSrc;
                        curIndex = 1;
                    }
                    else {
                        video.src = targetSrc;
                        curIndex = 2;
                    }
                }
                video.play();
            });
        }
        function getRecVideoData() {
            var recVideoData = JSON.parse($element.attr('rec-video'));
            for (var i = 0; i < recVideoData.length; i++) {
                var title = recVideoData[i].recTitle;
                var thumb = recVideoData[i].recThumb;
                var url = recVideoData[i].recUrl;
                var recVideo = $element.find('.rec-video');
                recVideo.eq(i).find('img').attr('src', thumb);
                recVideo.eq(i).find('.video-title').text(title);
                recVideo.eq(i).attr('href', url);
            }
        }
        function bindClickNewVideo() {
            $element.find('.rec-video').on('click', function (e) {
                event.preventDefault();
                var newUrl = $(e.currentTarget).attr('href');
                targetSrc = newUrl;
                $element.attr('target-src', targetSrc);
                if (vSrc && !(platform.isIos() && platform.isQQ())) {
                    video.src = vSrc;
                    curIndex = 1;
                }
                else {
                    video.src = targetSrc;
                    curIndex = 2;
                }
                $element.find('.rec-video-wrapper').hide();
                removeNode('.rec-video-wrapper');
                video.play();
            });
        }
        function checkSystemAndBrowser() {
            // 如果是Android上的Chrome浏览器，则不显示播放按钮
            if (platform.isAndroid() && platform.isChrome()) {
                playBtn.hide();
            }
            // 如果是手机百度，则不显示播放按钮
            else if (platform.isBaiduApp()) {
                playBtn.hide();
            }
            else {
                playBtn.on('click', function (e) {
                    video.play();
                    $(e.currentTarget).hide();
                    $(video).attr('poster', '');
                });
            }
            //  如果是IOS上的UC浏览器 则不播放片头片尾
            if (platform.isIos() && platform.isUc()) {
                video.src = targetSrc;
                video.poster = posterSrc;
                curIndex = 2;
            }
            else {
                //  如果有片头并且非IOS上的QQ浏览器 则播放片头
                if (vSrc && !(platform.isIos() && platform.isQQ())) {
                    video.src = vSrc;
                    video.poster = posterSrc;
                    curIndex = 1;
                }
                //  否则直接播放内容
                else {
                    video.src = targetSrc;
                    curIndex = 2;
                }
            }
        }
        function removeNode(node) {
            $(node).remove();
        }
    };
    return customElem;
});






