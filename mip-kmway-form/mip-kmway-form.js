/**
 * @file mip-kmway-form 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var addEvent = function () {
        var self = this;
        var msgSubUrl = this.getAttribute('msgSubUrl');
        var countUrl = this.getAttribute('countUrl');
        var reTel = new RegExp(this.getAttribute('reTel'));

        var agreeFn = function () {
            this.classList.toggle('_on');
        };

        var countFn = function () {
            fetch(countUrl, {
                type: 'GET'
            });
        };

        var subFn = function () {
            var fetchJsonp = require('fetch-jsonp');
            var $agree = self.querySelectorAll('._agree')[0];
            var sub = {};
            var ProjectID = self.querySelector('#form_msg_ProjectID');
            var Name = self.querySelector('#user');
            var Tel = self.querySelector('#mobile');
            var Message = self.querySelector('#message');

            sub.URL = document.location.href;
            sub.URLTitle = document.title;
            sub.ProjectID = ProjectID !== null && ProjectID !== undefined ? ProjectID.value : '';
            sub.Name = Name !== null && Name !== undefined ? Name.value : '';
            sub.Tel = Tel !== null && Tel !== undefined ? Tel.value : '';
            sub.Message = Message !== null && Message !== undefined ? Message.value : '';

            if ($agree !== undefined && $agree.classList.contains('_on') === false) {
                alert('请选择我同意将我的联系方式推荐给商家!');
                return;
            }

            if (reTel.test(sub.Tel) === false) {
                alert('请输入正确的联系方式!');
                return;
            }

            var query = '';
            Object.keys(sub).forEach(function (k) {
                query = query + k + '=' + sub[k] + '&';
            });
            if (query.lastIndexOf('&') !== -1) {
                query = query.substring(0, query.length - 1);
            };

            fetchJsonp(msgSubUrl + '?' + query, {
                jsonpCallback: 'jsonpCallback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                countFn();
                alert(data.msg);
            });
        };

        this.querySelectorAll('._agree')[0].addEventListener('click', agreeFn);
        this.querySelectorAll('[name=submit]')[0].addEventListener('click', subFn);
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        addEvent.call(element);
    };

    return customElement;
});
