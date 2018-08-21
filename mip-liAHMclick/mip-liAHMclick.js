/**
 * @file mip-liAHMclick 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var type = element.getAttribute('type') || ' A ';
        var aliId = element.getAttribute('aId') || 'titA';
        $('#' + aliId).click(function () {
            $('#lia').removeClass('active');
            $('#lib').removeClass('active');
            $('#lic').removeClass('active');
            if ('A' === type) {
                $('#titA').css('color', '#5a97c1');
                $('#titH').css('color', '#333');
                $('#titM').css('color', '#333');
                $('#aHM').show();
                $('#AhM').hide();
                $('#AHm').hide();
                $('#lia').addClass('active');
            } else if ('H' === type) {
                $('#titH').css('color', '#5a97c1');
                $('#titA').css('color', '#333');
                $('#titM').css('color', '#333');
                $('#AhM').show();
                $('#aHM').hide();
                $('#AHm').hide();
                $('#lib').addClass('active');
            } else {
                $('#titM').css('color', '#5a97c1');
                $('#titH').css('color', '#333');
                $('#titA').css('color', '#333');
                $('#AHm').show();
                $('#AhM').hide();
                $('#aHM').hide();
                $('#lic').addClass('active');
            }
        });
    };

    return customElement;
});