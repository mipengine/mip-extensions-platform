/**
 * @file mip-qtkj-tab 组件
 * @author yzxsl
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        function Tab() {
            this.tabTit = arguments[0];
            this.tabCon = arguments[1];
            this.change();
        }
        Tab.prototype.change = function () {
            var tabCon = this.tabCon;
            for (var i = 0; i < this.tabTit.length; i++) {
                this.tabTit[i].index = i;
                this.tabTit[i].onclick = function () {
                    tabCon[this.index].style.display = 'block';
                    for (var i = 0; i < tabCon.length; i++) {
                        if (tabCon[i] === tabCon[this.index]) {
                            tabCon[i].style.display = 'block';
                        }
                        else {
                            tabCon[i].style.display = 'none';
                        }
                    }
                };
            }
        };
        new Tab(
            document.getElementsByClassName('tab-tit')[parseInt(element.getAttribute('tindex'), 10) || 0]
            .getElementsByClassName('tab-list'),
            document.getElementsByClassName('tab-con')[parseInt(element.getAttribute('cindex'), 10) || 0]
            .getElementsByClassName('tab-list')
        );
    };
    return customElement;
});
