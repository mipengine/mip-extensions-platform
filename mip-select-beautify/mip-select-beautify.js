/**
 * @file mip-select-beautify 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        // 关闭父级
        var myThis = this.element;
        var domList = myThis.querySelector('.placeholder');
        var domListulli = myThis.querySelectorAll('li');
        var domBody = document.getElementsByTagName('body');

        domList.addEventListener('click', function (e) {
            var parent = $(this).closest('.select');
            if (!parent.hasClass('is-open')) {
                parent.addClass('is-open');
                $(this).not(parent).removeClass('is-open');
            }
            else {
                parent.removeClass('is-open');
            }
            e.stopPropagation();
        });

        for (var i = 0; i < domListulli.length; i++) {
            domListulli[i].addEventListener('click', function (e) {
                var parent = $(this).closest('.select');
                parent.removeClass('is-open').find('.placeholder').text($(this).text());
            });
        }

        domBody[0].addEventListener('click', function (e) {
            myThis.classList.remove('is-open');
        });

    };

    return customElement;
});
