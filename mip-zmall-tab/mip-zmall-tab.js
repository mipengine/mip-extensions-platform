/**
 * @file mip-zol-tab 组件
 * @author wenxd
 * @time 2017-11-17
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var event = require('dom/event');

    function siblings(elm) {
        var a = [];
        // console.log(elm)
        var p = elm.parentNode.children;

        for (var i = 0, pl = p.length; i < pl; i++) {
            if (p[i] !== elm) {
                a.push(p[i]);
            }
        }
        return a;
    }

    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var tabItems = ele.querySelectorAll('[data-panel]');
        var panels = ele.querySelectorAll('div[panel]');
        var data = ele.dataset;
        // 判断选项卡是否被吸顶，及用到mip-semi-fixed
        var hasMipSemiFixed = ele.querySelector('mip-semi-fixed');
        if (hasMipSemiFixed) {
            // 当选项卡吸顶的时候，因为mip-semi-fixed组件会复制一个tab，造成吸顶的时候没法点击
            // 因此采用事件代理的形式
            $(document).on('click', 'mip-semi-fixed [data-panel]', function () {
                var panel = this.dataset.panel;
                var panelElm = ele.querySelector('div[panel="' + panel + '"]');
                var panelSib = siblings(panelElm);
                for (var j = 0; j < panelSib.length; j++) {
                    panelSib[j].classList.remove(data.panelCurrent);
                }
                panelElm.classList.add(data.panelCurrent);

                // 因为tab选项卡会复制一个，所以不能只是操作组件内的DOM，因此采用zepto来选择
                var panelTab = $('[data-panel="' + panel + '"]');
                panelTab.addClass(data.tabCurrent).siblings().removeClass(data.tabCurrent);
            });
        }
        else {
            [].map.call(tabItems, function (dom, index) {
                dom.addEventListener('click', function () {
                    var sib = siblings(this);
                    for (var i = 0; i < sib.length; i++) {
                        sib[i].classList.remove(data.tabCurrent);
                    }
                    this.classList.add(data.tabCurrent);
                    var panel = this.dataset.panel;
                    var panelElm = ele.querySelector('div[panel="' + panel + '"]');
                    var panelSib = siblings(panelElm);
                    for (var j = 0; j < panelSib.length; j++) {
                        panelSib[j].classList.remove(data.panelCurrent);
                    }
                    panelElm.classList.add(data.panelCurrent);
                });
            });
        }
    };

    return customElement;
});
