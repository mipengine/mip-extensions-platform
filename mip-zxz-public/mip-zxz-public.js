/**
 * @file mip-zxz-public 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    function seeMore() {
        var button = $('#seeMore');
        if (button.lenght === 0) {
            return;
        }
        button.on('click', function () {
            $('#IHaveMore').css({'max-heigh': 'none'});
            button.hide();
        });
    }
    seeMore();
    return customElement;
});
