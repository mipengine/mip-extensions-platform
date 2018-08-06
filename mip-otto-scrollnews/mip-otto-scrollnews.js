/**
 * @file mip-otto-scrollnews 首页滚动新闻，优化细节。
 * @author xinbao
 * @date 2018年8月2日
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    // var util = require('util');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var sbox = element.querySelector('.scrollNews__box');
        // var swrap = element.querySelector('.scrollNews__wrap');
        var sul = element.querySelectorAll('.scrollNews__box ul');
        var types = element.querySelector('.scrollNews__head');
        var scrollArr = (function () {
            var arr = [];
            Array.prototype.slice.call(sul).forEach(function (item, index) {
                arr.push(item.offsetTop);
            });
            return arr;
        })();
        function getIndex(offsetop) {
            var i = 0;

            scrollArr.forEach(function (item, index) {
                if (offsetop > item) {
                    i = index;
                }
            });
            return i;
        }

        // var undelegate = util.event.delegate(types,'span','click',go);
        // function go(){
        //     console.log(this)
        // }
        // 搞不定原生写法

        $(types).on('click', 'span', function () {
            // 改变选中状态样式
            var index = $(this).index();
            $(this)
                .parent()
                .find('.scrollNews__type--hover')
                .removeClass('scrollNews__type--hover')
                .addClass('scrollNews__type--hover');

            var res = scrollArr[index] + 20;
            sbox.scrollTo(0, res);
        });

        sbox.addEventListener('scroll', function (e) {
            var i = getIndex(e.target.scrollTop);
            element
                .querySelector('.scrollNews__type--hover')
                .classList.remove('scrollNews__type--hover');
            element
                .querySelectorAll('.scrollNews__type')[i].classList.add('scrollNews__type--hover');
        });
    };

    return customElement;
});
