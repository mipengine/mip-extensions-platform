/**
 * @file ZOL私有业务--问答堂举报模块
 * @author  mulianju
 * @time  2017-11-29
 * @version 1.0.0
 */
define(function (require, exports, module) {
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();
    var mipToast = require('./mip-zol-toast');
    var toast = function (msg, t) {
        mipToast('<div class="mip-zol-toast-container">' + msg + '</div>', t);
    };
    var section = document.querySelector('.report-mol');


    function createElement() {
        section = document.createElement('section');
        section.className = 'report-mol';
        section.innerHTML = '<div class="report-mc">\
                <i class="success-close"></i>\
                <div class="report-tit">\
                    <span>\u4e3e\u62a5</span>\
                </div>\
                <div class="report-bd clearfix">\
                    <span data-type="1">\u5e7f\u544a\u5185\u5bb9</span>\
                    <span data-type="2">\u53cd\u52a8\u8a00\u8bba</span>\
                    <span data-type="3">\u8272\u60c5\u5185\u5bb9</span>\
                    <span data-type="4">\u5176\u4ed6\u8fdd\u89c4\u8fdd\u6cd5\u5185\u5bb9</span>\
                </div>\
            </div>';
        document.body.appendChild(section);
        return section;
    }

    function makeUrl(url, data) {
        var str = url.indexOf('?') > 0 ? '&' : '?';

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (str.length > 1) {
                    str += '&';
                }
                str += key + '=' + data[key];
            }
        }

        return url + str;
    }

    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        var element = this.element;

        var options = util.fn.extend({}, element.dataset);
        if (!section) {
            section = createElement();
        }
        element.addEventListener('click', function () {
            section.classList.toggle('report-mol-on');
        });
        section.addEventListener('click', function (e) {
            var target = e.target;

            if (/^span$/i.test(target.tagName) && target.parentNode.classList.contains('report-bd')) {
                var url = options.url;
                if (!window.ZOL_USER_INFO.userid) {
                    location.href = '';
                }
                var data = util.fn.extend({}, options);
                data.reporter = window.ZOL_USER_INFO.userid;
                data.type = target.dataset.type;
                section.classList.remove('report-mol-on');
                fetchJsonp(makeUrl(url, data), {}).then(function (res) {
                    return res.json();
                }).then(function (request) {
                    if (parseInt(request.state, 10) === 1) {
                        toast(
                            '<span class="report-top">\u4e3e\u62a5\u6210\u529f</span>'
                            + '<p class="report-success-txt">'
                            + '\u7ecf\u8fc7\u6838\u5b9e'
                            + '\u540e\u5c06\u4f1a\u505a\u51fa\u5904\u7406'
                            + '<br>\u611f\u8c22\u60a8\u4e3a\u793e\u533a\u548c\u8c10\u505a\u51fa\u8d21\u732e</p>'
                        );
                    } else if (request.msg) {
                        toast(request.msg);
                    }
                });
            }

            if (/^i$/i.test(target.tagName) && target.classList.contains('success-close')) {
                section.classList.remove('report-mol-on');
            }
        });
    };
    return customElement;
});
