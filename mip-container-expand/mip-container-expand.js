/**
 * @file mip-container-expand
 * @author idongde
 */

define(function (require) {
    var $ = require('jquery');
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);
        // 获取其他在展开时需要隐藏的元素的class及对应元素
        var ctCollapseClass = $element.attr('container-collapse-class');
        var ctCollapse = $(document.getElementsByClassName(ctCollapseClass));
        // 每个元素高度数组
        var ctHeightList = [];
        // 获取展开的按钮的id及对应元素
        var expandBtnId = $element.attr('expand-button-id');
        var expandBtn = $(document.getElementById(expandBtnId));
        // 获取折叠的按钮的id及对应元素
        var collapseBtnId = $element.attr('collapse-button-id');
        var collapseBtn = $(document.getElementById(collapseBtnId));
        // 获取展开和折叠的内容
        var ctContent = $('.expand-content');
        var ctContentHeight = ctContent.outerHeight(true);
        // 获取页面内的视频
        var videoClass = $element.attr('video-wrap-class');

        $element.hide();
        //  绑定事件
        bind();
        function bind() {
            expandBtn.on('click', function () {
                changeBtnClass.call(this);
            });
            collapseBtn.on('click', function () {
                changeBtnClass.call(this);
            });
        }
        // 切换按钮的显示
        function changeBtnClass() {
            if ($(this).eq(0).attr('id') === expandBtnId) {
                // 点击的是展开按钮
                $(this).removeClass('active');
                collapseBtn.addClass('active');
                expandContent();
                getContainerHeight();
                collapseOtherCt();
            }
            else {
                $(this).removeClass('active');
                expandBtn.addClass('active');
                collapseContent();
                expandOtherCt();
            }
        }
        // 展开内容
        function expandContent() {
            $element.show();
            $element.animate({
                height: ctContentHeight
            }, 300, 'swing');
        }
        // 折叠内容
        function collapseContent() {
            $element.animate({
                height: 0
            }, 300, 'swing', function () {
                $element.hide();
            });
        }
        // 获取每个要隐藏的容器的高度
        function getContainerHeight() {
            $.each(ctCollapse, function (index, node) {
                ctHeightList.push(($(node).outerHeight(true)));
            });
        }
        // 折叠页面中其他要隐藏的元素
        function collapseOtherCt() {
            pauseVideo();
            ctCollapse.animate({
                height: 0
            }, 300, 'swing', function () {
                ctCollapse.hide();
            });
        }
        // 恢复页面中刚隐藏的元素
        function expandOtherCt() {
            $.each(ctCollapse, function (index, node) {
                var ctHeight = ctHeightList[index];
                $(node).show();
                $(node).animate({
                    height: ctHeight
                }, 300, 'swing');
            });
            ctHeightList = [];
            continueVideo();
        }
        // 暂停视频
        function pauseVideo() {
            // 是否有video
            if (videoClass) {
                var video = $(document.getElementsByClassName(videoClass)).find('video')[0];
                video.pause();
            }
        }
        // 继续播放视频
        function continueVideo() {
            if (videoClass) {
                var video = $(document.getElementsByClassName(videoClass)).find('video')[0];
                video.play();
            }
        }
    };
    return customElem;
});






