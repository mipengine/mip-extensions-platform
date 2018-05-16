/**
 * @file mip-st-checkbox 组件
 * @author
 */

/* global MIP */
define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var imgUnselected = 'data:image/svg+xml;utf8,<svg width="44" height="44" xmlns="http://www.w3.org/2000/svg"><path d="M21.993 4C12.072 4 4 12.071 4 21.993c0 9.922 8.072 17.993 17.993 17.993 9.922 0 17.993-8.071 17.993-17.993C39.986 12.071 31.915 4 21.993 4m0 38.986C10.417 42.986 1 33.568 1 21.993 1 10.417 10.417 1 21.993 1c11.575 0 20.993 9.417 20.993 20.993 0 11.575-9.418 20.993-20.993 20.993zM17.897 26.25l-5.36-5.592a1.464 1.464 0 0 0-2.092-.022 1.52 1.52 0 0 0-.017 2.131l6.063 6.266a3 3 0 0 0 4.27.041l12.6-12.52a1.493 1.493 0 0 0 .003-2.114 1.503 1.503 0 0 0-2.122-.004L19.324 26.268a1 1 0 0 1-1.427-.018z" fill="#999" stroke="#979797" fill-rule="evenodd"/></svg>';
    var imgSelected = 'data:image/svg+xml;utf8,<svg width="42" height="42" xmlns="http://www.w3.org/2000/svg"><path d="M21 42C9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21-9.402 21-21 21zm-3.097-15.724l-5.36-5.592a1.464 1.464 0 0 0-2.092-.022 1.52 1.52 0 0 0-.017 2.132l6.063 6.265a3 3 0 0 0 4.27.042l12.6-12.52a1.493 1.493 0 0 0 .003-2.114 1.503 1.503 0 0 0-2.122-.004L19.33 26.294a1 1 0 0 1-1.427-.018z" fill="#555" fill-rule="evenodd"/></svg>';

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var field = element.getAttribute('field');
        var data = {};
        data[field] = false;
        data[field + 'img'] = imgUnselected;
        MIP.setData(data);
        // var text = element.getAttribute('text');
        // var html = '';
        // html += '<div class="st-checkbox-container">';
        // html += '   <mip-img width="14" height="14" m-bind:src="' + field + 'img" class="st-checkbox">';
        // html += '   </mip-img>';
        // html += '   <div class="st-text">';
        // html += text;
        // html += '   </div>';
        // html += '</div>';
        // element.innerHTML = html;
        var checkbox = element.querySelector('.st-checkbox-container');
        checkbox.addEventListener('click', function () {
            data[field] = !data[field];
            data[field + 'img'] = data[field] ? imgSelected : imgUnselected;
            MIP.setData(data);
        }, false);
    };

    return customElement;
});
