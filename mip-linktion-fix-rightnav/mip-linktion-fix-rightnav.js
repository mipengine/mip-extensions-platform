/**
 * @file mip-linktion-fix-rightnav 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $el.find('#list-service').on('mouseenter', function () {
            $(this).children('.nav-icon').attr('src', '/img/icon/service_hover.png');
        });
        $el.find('#list-service').on('mouseleave', function () {
            $(this).children('.nav-icon').attr('src', '/img/icon/service.png');
        });
        $el.find('#erweima-reply').on('mouseenter', function () {
            $(this).children('.nav-icon').attr('src', '/img/icon/tickling_hover.png');
        });
        $el.find('#erweima-reply').on('mouseenter', function () {
            $(this).children('.nav-icon').attr('src', '/img/icon/tickling.png');
        });
        $el.find('#list-top').on('mouseenter', function () {
            $(this).children('.nav-icon').attr('src', '/img/icon/top_hover.png');
            $(this).children('.stack-txt').css('color', '#fff');
        });
        $el.find('#list-top').on('mouseleave', function () {
            $(this).children('.nav-icon').attr('src', '/img/icon/top.png');
            $(this).children('.stack-txt').css('color', '#ccc');
        });
        $el.find('#erweima-reply').on('click', function () {
            $(this).children('.erweima-reply').show();
        });
        $el.find('#reply-hidden').on('click', function () {
            $(this).parent().parent('.erweima-reply').fadeOut();
        });
        $el.find('.retroaction-form button').on('click', function () {
            var retroactionText = $(this).siblings('textarea').val();
            if (retroactionText === '') {
                alert('请输入反馈内容！');
            }
            else {
                // console.log(retroactionText);
                var bodyData = JSON.stringify({
                    content: retroactionText
                });
                var consultUrl = $(this).data('src');
                fetch(consultUrl, {
                    crossDomain: true,
                    credentials: 'include',
                    method: 'POST', // or 'PUT'
                    headers: {'Content-Type': 'application/json'},
                    body: bodyData// data can be `string` or {object}!
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    if (data.code === 1009) {
                        alert('请登录');
                    }
                    else if (data.code === 0) {
                        $el.find('#reply-hidden').trigger('click');
                        alert('提交成功');
                    }
                });
            }
        });
    };
    return customElement;
});
