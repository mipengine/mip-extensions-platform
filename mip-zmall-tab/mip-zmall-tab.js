/**
 * @file mip-zol-tab 组件
 * @author wenxd
 * @time 2017-11-17
 */

define(function (require) {

    var customElement = require('customElement').create();

    function tabFn(tabs, panels) {
        var self = this;
        var data = self.element.dataset;
        [].map.call(tabs, function (dom, index) {
            dom.addEventListener('click', function () {

                var sib = siblings(this);
                for (var i = 0; i < sib.length; i++) {
                    sib[i].classList.remove(data.tabCurrent);
                }
                this.classList.add(data.tabCurrent);

                var panel = this.dataset.panel;
                var panelElm = self.element.querySelector('div[panel="' + panel + '"]');
                var panelSib = siblings(panelElm);
                for (var j = 0; j < panelSib.length; j++) {
                    panelSib[j].classList.remove(data.panelCurrent);
                }

                panelElm.classList.add(data.panelCurrent);
            });
        });
    }

    function siblings(elm) {
        var a = [];
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

        tabFn.call(this, tabItems, panels);
    };

    return customElement;
});
