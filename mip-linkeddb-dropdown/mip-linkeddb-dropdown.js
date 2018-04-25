/**
 * @file mip-linkeddb-dropdown 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        (function ($) {
            'use strict';

            $.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd',
                'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                var i;
                var dom = this;

                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) {
                        return;
                    }
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };

            $.support = (function () {
                var support = {
                    touch: !!(('ontouchstart' in window)
                        || window.DocumentTouch && document instanceof window.DocumentTouch)
                };
                return support;
            })();

            $.touchEvents = {
                start: $.support.touch ? 'touchstart' : 'mousedown',
                move: $.support.touch ? 'touchmove' : 'mousemove',
                end: $.support.touch ? 'touchend' : 'mouseup'
            };

            $.getTouchPosition = function (e) {
                e = e.originalEvent || e;
                if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
                    return {
                        x: e.targetTouches[0].pageX,
                        y: e.targetTouches[0].pageY
                    };
                } else {
                    return {
                        x: e.pageX,
                        y: e.pageY
                    };
                }
            };

            $.fn.scrollHeight = function () {
                return this[0].scrollHeight;
            };

            $.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform
                    = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
            $.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration
                    = elStyle.msTransitionDuration = elStyle.MozTransitionDuration
                    = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };

            $.requestAnimationFrame = function (callback) {
                if (window.requestAnimationFrame) {
                    return window.requestAnimationFrame(callback);
                }
                else if (window.webkitRequestAnimationFrame) {
                    return window.webkitRequestAnimationFrame(callback);
                }
                else if (window.mozRequestAnimationFrame) {
                    return window.mozRequestAnimationFrame(callback);
                }
                else {
                    return window.setTimeout(callback, 1000 / 60);
                }
            };

            $.cancelAnimationFrame = function (id) {
                if (window.cancelAnimationFrame) {
                    return window.cancelAnimationFrame(id);
                }
                else if (window.webkitCancelAnimationFrame) {
                    return window.webkitCancelAnimationFrame(id);
                }
                else if (window.mozCancelAnimationFrame) {
                    return window.mozCancelAnimationFrame(id);
                }
                else {
                    return window.clearTimeout(id);
                }
            };

            $.fn.join = function (arg) {
                return this.toArray().join(arg);
            };
        })($);

        +(function ($) {
            'use strict';

            var getOffset = function (container) {
                var tagName = container[0].tagName.toUpperCase();
                var scrollTop;
                if (tagName === 'BODY' || tagName === 'HTML') {
                    scrollTop = container.scrollTop() || $(window).scrollTop();
                } else {
                    scrollTop = container.scrollTop();
                }
                var offset = container.scrollHeight() - ($(window).height() + scrollTop);
                return offset;
            };
            var attachEvents;
            var Infinite = function (el, distance) {
                this.container = $(el);
                this.container.data('infinite', this);
                this.distance = distance || 50;
                this.attachEvents();
            };

            Infinite.prototype.scroll = function () {
                var container = this.container;
                this._check();
            };

            Infinite.prototype.attachEvents = function (off) {
                var el = this.container;
                var scrollContainer = (el[0].tagName.toUpperCase() === 'BODY' ? $(document) : el);
                scrollContainer[off ? 'off' : 'on']('scroll', $.proxy(this.scroll, this));
            };
            Infinite.prototype.detachEvents = function (off) {
                this.attachEvents(true);
            };
            Infinite.prototype._check = function () {
                var offset = getOffset(this.container);
                if (Math.abs(offset) <= this.distance) {
                    this.container.trigger('infinite');
                }
            };

            var infinite = function (el) {
                attachEvents(el);
            };

            $.fn.infinite = function (distance) {
                return this.each(function () {
                    new Infinite(this, distance);
                });
            };
            $.fn.destroyInfinite = function () {
                return this.each(function () {
                    var infinite = $(this).data('infinite');
                    if (infinite && infinite.detachEvents) {
                        infinite.detachEvents();
                    }
                });
            };

        })($);
        var pageNum = 2;
        var pageType = $(this.element).find('.all-list').attr('data-type');
        var loading = false;
        var getUrl;

        $(this.element).find('.assembly').infinite().on('infinite', function () {
            // 如果正在加载，则退出
            if (loading) {
                return;
            }
            // 设置flag
            loading = true;
            if (pageType === 'person') {
                getUrl = 'https://mip.linkeddb.com/person/?page=' + pageNum;
            } else if (pageType === 'tv' || pageType === 'movie') {
                getUrl = 'https://mip.linkeddb.com/movie/?page=' + pageType + '/?page=' + pageNum;
            } else {
                getUrl = 'https://mip.linkeddb.com/movies/?page=' + pageNum;
            }

            $.get(getUrl, function (html) {
                if (html) {
                    // 重置加载flag
                    loading = false;
                    // 添加新条目
                    $(this.element).find('.infinite-list').append(html);
                    pageNum++;
                    // 容器发生改变,如果是js滚动，需要刷新滚动
                    // $.refreshScroller();
                } else {
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $(this.element).find('.assembly').destroyInfinite();
                    // 删除加载提示符
                    $(this.element).find('.assembly .weui-loadmore').remove();

                    $(this.element).find('.no-more').removeClass('hide');
                    setTimeout(function () {
                        $(this.element).find('.no-more').addClass('hide');
                    }, 1500);
                    return false;
                }
            });
        });
    };
    return customElement;
});
