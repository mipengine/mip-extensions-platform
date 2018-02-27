/**
 * @file mip-click-to-scroll
 * @author idongde
 */
define(function (require) {
    var $ = require('jquery');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = $(this.element);
        // 点击滚动的元素id数组
        var ScrollIdList = JSON.parse(element.attr('bind-id'));
        // 滚动元素时需要暂停视频播放的id数组
        var hasVideoIdList = false;
        if (element.attr('videoWrap-id')) {
            var videoIdList = JSON.parse(element.attr('videoWrap-id'));
            hasVideoIdList = true;
        }
        // 滚动动画是否完成
        var isScrollEnd = false;
        //  绑定事件
        bind();
        function bind() {
            $.each(ScrollIdList, function (index, id) {
                var bindEle = $(document.getElementById(id));
                bindEle.on('click', function () {
                    if (isScrollEnd === true) {
                        return;
                    }
                    getEleOffsetTop(bindEle);
                });
            });
        }
        function getEleOffsetTop(target) {
            // 获取元素距页面顶部高度
            var offsetTop = target.offset().top;
            pauseVideoPlay();
            scrollEle(offsetTop);
        }
        // 页面滚动至该元素位置
        function scrollEle(height) {
            isScrollEnd = true;
            $('html,body').animate({
                scrollTop: height
            }, 300, scrollEnd());
        }
        function pauseVideoPlay() {
            if (hasVideoIdList) {
                $.each(videoIdList, function (index, id) {
                    var video = $(document.getElementById(id));
                    video.find('video')[0].pause();
                    video.find('.video-play-button').show();
                });
            }
        }
        function scrollEnd() {
            isScrollEnd = false;
        }
    };
    return customElem;
});






