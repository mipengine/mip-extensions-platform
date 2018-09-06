/**
 * @file mip-qtkj-addrem 组件
 * @author yzxsl
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        function hasClassAll(obj, className) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if ((' ' + obj[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
                    return true;
                }
            }
            return false;
        }
        function hasClass(obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }
        function addClass(obj, cls) {
            if (!hasClass(obj, cls)) {
                obj.className += ' ' + cls;
            }
        }
        function removeClass(obj, cls) {
            if (hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }
        function toggleClass(obj, cls) {
            if (hasClass(obj, cls)) {
                removeClass(obj, cls);
            }
            else {
                addClass(obj, cls);
            }
        }
        var ele = document.getElementsByClassName('addrem');
        var eleall = document.getElementsByClassName('addremall');
        for (var i = 0; i < ele.length; i++) {
            ele[i].index = i;
            ele[i].onclick = function () {
                toggleClass(ele[this.index], 'qtact');
            };
        }
        for (var j = 0; j < eleall.length; j++) {
            eleall[j].index = j;
            eleall[j].onclick = function () {
                if (hasClassAll(eleall, 'qtact')) {
                    eleall[this.index].classList.remove('qtact');
                }
                else {
                    eleall[this.index].classList.add('qtact');
                }
            };
        }
    };
    return customElement;
});
