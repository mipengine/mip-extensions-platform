/**
 * @file mip-rz-photoswipe 组件
 * @author
 */


define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var PhotoSwipe = require('./js/photoswipe.min');
    var photoSwipeUIDefault = require('./js/photoswipe-ui-default.min');

    function writeDom(element) {
        var str = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">'
            + '<div class="pswp__bg"></div>'
                + '<div class="pswp__scroll-wrap">'
                    + '<div class="pswp__container">'
                        + '<div class="pswp__item"></div>'
                        + '<div class="pswp__item"></div>'
                        + '<div class="pswp__item"></div>'
                    + '</div>'
                    + '<div class="pswp__ui pswp__ui--hidden">'
                    + '<div class="pswp__top-bar">'
                            + '<div class="pswp__counter"></div>'
                            + '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'
                            + '<button class="pswp__button pswp__button--share" title="Share"></button>'
                            + '<div class="pswp__preloader">'
                                + '<div class="pswp__preloader__icn">'
                                    + '<div class="pswp__preloader__cut">'
                                        + '<div class="pswp__preloader__donut"></div>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                        + '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'
                            + '<div class="pswp__share-tooltip"></div>'
                        + '</div>'
                        + '<button class="pswp__button pswp__button--arrow--left" title="Previous(arrow left)">'
                        + '</button>'
                        + '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>'
                        + '<div class="pswp__caption">'
                            + '<div class="pswp__caption__center"></div>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>';
        element.innerHTML = str;
    }

    function openPhotoSwipe(nowparams, pswpElement) {
        // build items array
        // var items = [
        //     {
        //         src: 'http://trustcdn.baidu.com/xzhmip/1530502191_5902168zxyxald755945.jpg',
        //         w: 281,
        //         h: 211,
        //         title: '特斯拉Semi卡车亮相：2019年生产'
        //     },
        // ];
        // define options (if needed)
        var options = {
            index: nowparams.order, // 开始的滑块（图片），必须为数字，默认0（第一张）
            showHideOpacity: false, // 当调用时是否展示透明度和比例变化动画，默认false。
            loop: false, // 是否循环展示图片，当左右滑动图片时。
            closeOnScroll: false, // 在页面上滚动关闭图集， 仅适用于没有硬件触摸支持的设备。
            escKey: true, // 是否可以使用Esc键关闭图集，默认true。
            history: true, // 是否使用history模式，默认true，历史记录模式支持url返回。
            focus: true,
            arrowKeys: true, // 是否可以使用左右方向键导航切换，默认true。
            maxSpreadZoom: 3, // 最大放大倍数。
            showAnimationDuration: 0, // 展示动画过渡时间，默认333，数字。
            hideAnimationDuration: 0 // 隐藏动画过渡间隔时间，默认333，数字。
            // galleryUID: 1, // 当多个图集时，用来表示某个图集，默认1，数字，URL会变成http://example.com/#&gid=1&pid=2
            // galleryPIDs: 1, // 表示某一张图片，配合图集galleryUID一起使用。
            // preload: [1, 1] // 预加载，数组，默认[1,1]，是指在切换图片时，预先懒加载前后图片的张数，不能小于1。
        };
        var gallery = new PhotoSwipe(pswpElement, photoSwipeUIDefault, nowparams.items, options);
        return gallery;
        // PhotoSwipe也提供了许多方法调用，以下方法有可能你会用得到：
        // var pswp = new PhotoSwipe( /* ... */ );
        // pswp.init(); //初始化
        // pswp.goTo(index); //跳到第几张图
        // pswp.next(); //下一张
        // pswp.prev(); //上一张
        // pswp.close(); //关闭图集
        // pswp.destroy(); //关闭图集后销毁图集

        // // 动态添加图片
        // pswp.items.push({
        //     src: "path/to/image.jpg",  w:1200,h:500
        // });
    }

    // 尽早绑定事件，写在 build 声明周期中。
    customElement.prototype.build = function () {
        var element = this.element;
        // 定义 openfull 事件，方便 eventAction 从外部触发。
        this.addEventAction('openfull', function (params) {
            openPhotoSwipe(params, element.querySelectorAll('.pswp')[0]).init();
        });
    };
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        writeDom(element);
    };
    return customElement;
});
