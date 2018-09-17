/**
 * @file mip-boolaw-tabs
 * @author yuzongde
 */

define(function (require) {
    // viewport.setScrollTop无法设置滚动时长，Naboo插件无法设置动画完成回调函数，故使用jquery动画
    var $ = require('jquery');
    var viewport = require('viewport');
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        // element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);

        /**
		 * Bind Class
		 *
		 * @class
		 */
        var Tabswitch = function () {
            this.init();
            this.addListener();
        };
        Tabswitch.prototype.init = function () {
            if ($element.attr('default-selected-id')) {
                this.defaultId = $element.attr('default-selected-id'); // 希望初始显示的content的id
            }
            else {
                this.defaultId = 0;
            }
            this.tabNav = $element.find('section');
            this.navItems = $element.find('.tab-nav .tab-nav-li'); // tab导航栏里的items
            this.tabContents = $element.find('.tab-content'); // tab每个item所对应的内容
            this.tabContents.eq(this.defaultId).css({display: 'block'}); // 初始显示的content
            this.tabContentScrollTop = this.tabContents.eq(0).offset().top; // content距顶部距离
            this.tabNavScrollTop = this.tabNav.offset().top; // tab距顶部距离
            this.tabNavHeight = this.tabNav.outerHeight(true); // tab包含margin的高度
            this.isScroll = false;
        };
        // 事件监听
        Tabswitch.prototype.addListener = function () {
            var self = this;
            this.navItems.on('click', function () {
                $('.tab-nav-li').removeClass('activy');
                $(this).addClass('activy');
                if (!this.isScroll) {
                    var index = this.getAttribute('data-id');
                    self.changeContentVisibility(index);
                }
            });
            // 页面 scroll 事件
            viewport.on('scroll', function () {
                var scrollTop =  viewport.getScrollTop();
                if (scrollTop >= self.tabNavScrollTop) {
                    self.fixTabNav();
                }
                else {
                    self.recoveryTabNav();
                }
            });
        };
        // tab的切换效果
        Tabswitch.prototype.changeContentVisibility = function (idx) {
            var self = this;
            this.tabContents.map(function (index) {
                if (index + '' === idx) {
                    $(this).css({display: 'block'});
                    self.setTabContentPosition();
                }
                else {
                    $(this).css({display: 'none'});
                }
            });
        };
        // tab悬浮效果
        Tabswitch.prototype.fixTabNav = function () {
            this.tabNav.addClass('fixed');
            $element.css({'padding-top': this.tabNavHeight});
        };
        // 解除tab悬浮效果
        Tabswitch.prototype.recoveryTabNav = function () {
            $element.css({'padding-top': 0});
            this.tabNav.removeClass('fixed');
        };
        // 切换tab时，设置content的初始位置
        Tabswitch.prototype.setTabContentPosition = function () {
            // viewport.setScrollTop无法设置滚动时长，故使用jquery动画
            this.isScroll = true;
            // 要滚动的元素本身没有滚动条，所以只能滚动屏幕了。。。
            $('html,body').animate({
                scrollTop: this.tabNavScrollTop
            }, 300, function () {
                this.isScroll = false;
            });
        };
        new Tabswitch();
    };
    return customElem;
});
