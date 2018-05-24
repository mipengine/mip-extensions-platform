/**
* 星座屋mip改造
* @file 星座屋float组件
* @author mipxzw@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var element = $(this.element);
        var layer = $(element.find('.m_layer'));
        var float = $(element.find('.float_sbox'));
        var button = $('#openlayer');
        function showlayer() {
            layer.fadeIn(400).on('touchmove', function (e) {
                e.preventDefault();
            });
            layer.click(function (e) {
                hidelayer();
            });
            $(float).removeClass('slide-down').addClass('slide-up');
        }
        function hidelayer() {
            layer.fadeOut(400, function () {
                $(layer).hide();
            });
            $(float).removeClass('slide-up').addClass('slide-down');
        }
        button.click(function () {
            showlayer();
        });
    };
    return customElem;
});
