/**
 * @file mip-jpd-coupon 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customEle = require('customElement').create();
    customEle.prototype.build = function () {
        var ele = this.element;
        var oInput = ele.querySelector('#input-num');
        var oJian = ele.querySelector('.num-jian');
        var oJia = ele.querySelector('.num-jia');
        /**
         * 减少
         */
        $(oJian).on('click', function (m) {
            var obj = $(this).closest('.count').find('.input-num');
            if (obj.val() <= 1) {
                obj.val(1);
            } else {
                obj.val(parseInt(obj.val(), 0) - 1);
            }
            obj.change();
        });
        /**
         * 增加
         */
        $(oJia).on('click', function (m) {
            console.log(m);
            var obj = $(this).closest('.count').find('.input-num');
            obj.val(parseInt(obj.val(), 0) + 1);
            obj.change();
        });
        /**
         * 键盘判断
         */
        $(oInput).keypress(function (b) {
            var keyCode = b.keyCode ? b.keyCode : b.charCode;
            if (keyCode !== 0 && (keyCode < 48 || keyCode > 57) && keyCode !== 8 && keyCode !== 37 && keyCode !== 39) {
                return false;
            } else {
                return true;
            }
        }).keyup(function (e) {
            var keyCode = e.keyCode ? e.keyCode : e.charCode;
            console.log(keyCode);
            if (keyCode !== 8) {
                var numVal = parseInt($(oInput).val(), 0) || 0;
                numVal = numVal < 1 ? 1 : numVal;
                $(oInput).val(numVal);
            }
        }).blur(function () {
            var numVal = parseInt($(oInput).val(), 0) || 0;
            numVal = numVal < 1 ? 1 : numVal;
            $(oInput).val(numVal);
        });
    };


    return customEle;
});
