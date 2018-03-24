/**
 * @file mip-jpd-purchase 组件
 * @author zc
 */
define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');
    $('#bookNum').keypress(function (b) {
        var keyCode = b.keyCode ? b.keyCode : b.charCode;
        if (keyCode !== 0 && (keyCode < 48 || keyCode > 57) && keyCode !== 8 && keyCode !== 37 && keyCode !== 39) {
            return false;
        } else {
            return true;
        }
    }) .keyup(function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.charCode;
        console.log(keyCode);
        if (keyCode !== 8) {
            var numVal = parseInt($('#bookNum').val(), 0) || 0;
            numVal = numVal < 1 ? 1 : numVal;
            $('#bookNum').val(numVal);
        }
    }) .blur(function () {
        var numVal = parseInt($('#bookNum').val(), 0) || 0;
        numVal = numVal < 1 ? 1 : numVal;
        $('#bookNum').val(numVal);
    });
    // 增加
    $('#add').click(function () {
        var num = parseInt($('#bookNum').val(), 0) || 0;
        $('#bookNum').val(num + 1);
    });

    // 减去
    $('#sub').click(function () {
        var num = parseInt($('#bookNum').val(), 0) || 0;
        num = num - 1;
        num = num < 1 ? 1 : num;
        $('#bookNum').val(num);
    });

    /**
    * 第一次进入可视区回调，只会执行一次
    */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
    };
    return customElement;
});
