/**
 * @file mip-zol-wapnav 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * 禁用滑动屏幕
     *
     * @param  {Object} e 事件
     */
    function touchMoveCansel(e) {
        e.preventDefault();
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var element = this.element;
        var navs = {};

        // 获取用户设置参数
        try {
            var script = element.querySelector('script[type="application/json"]');
            if (script) {
                var customParams = JSON.parse(script.textContent.toString());
                navs = util.fn.extend(navs, customParams);
            }

        }
        catch (e) {
            // eslint-disable-line
            console.warn('json is illegal');
            // eslint-disable-line
            console.warn(e);
            return;
        }

        // 创建导航
        var navHtml = '';
        var navArr = navs.nav;
        var template = [
            '<nav class="nav-box">',
            '<div class="nav-trigger"><span>请选择</span></div>',
            '<div class="nav"><ul class="nav-list">{{NAVLIST}}</ul>',
            '</div><div class="nav-line"></div></nav>'
        ].join('');
        navArr.forEach(function (item, index) {
            var current = item.isActive ? ' class="current"' : '';
            navHtml += '<li' + current + '><a data-type="mip" href="'
                     + item.link + '"><span>' + item.name + '</span></a></li>';
        });
        var html = template.replace('{{NAVLIST}}', navHtml);
        element.innerHTML = html;
        document.body.classList.add('header-with-nav');

        // 相关元素
        var navElm = element.querySelector('.nav-box');
        var navSwitchElm = element.querySelector('.nav-trigger');
        var scrollBox = element.querySelector('.nav');
        var scrollElm = scrollBox.firstElementChild;

        // 将当前的显示出来
        var currentElm = scrollBox.querySelector('.current');
        currentElm.scrollIntoView(false);

        // 滚动偏差修正值
        var SCROLL_LEFT_MODIFIER = 15;
        var scrollElmWidth = scrollElm.scrollWidth;
        var scrollBoxWidth = scrollBox.clientWidth;
        var scrollLeft = scrollBox.scrollLeft;

        // 滚动两边的遮罩
        if (scrollBoxWidth < scrollElmWidth - SCROLL_LEFT_MODIFIER) {
            navElm.classList.add('nav-scroller-r');
        }

        if (scrollLeft >= SCROLL_LEFT_MODIFIER) {
            navElm.classList.add('nav-scroller-l');
        }

        scrollBox.addEventListener('scroll', function () {
            var scrollLeft = this.scrollLeft;
            if (scrollElmWidth - scrollBoxWidth - SCROLL_LEFT_MODIFIER <= scrollLeft) {
                navElm.classList.remove('nav-scroller-r');
            }
            else {
                navElm.classList.add('nav-scroller-r');
            }
            if (scrollLeft <= SCROLL_LEFT_MODIFIER) {
                navElm.classList.remove('nav-scroller-l');
            }
            else {
                navElm.classList.add('nav-scroller-l');
            }
        });

        // 遮罩层以及关闭事件
        var cover = document.createElement('div');
        cover.classList.add('zol-wapnav-cover');
        cover.addEventListener('click', function () {
            navElm.classList.remove('nav-expanded');
            this.parentNode.removeChild(cover);
            document.removeEventListener('touchmove', touchMoveCansel);
        });

        // 展开和关闭
        navSwitchElm.addEventListener('click', function () {
            if (navElm.classList.contains('nav-expanded')) {
                document.body.removeChild(cover);
                navElm.classList.remove('nav-expanded');
                document.removeEventListener('touchmove', touchMoveCansel);
            }
            else {
                navElm.classList.add('nav-expanded');
                document.body.appendChild(cover);
                document.addEventListener('touchmove', touchMoveCansel);
            }
        });
    };

    return customElement;
});
