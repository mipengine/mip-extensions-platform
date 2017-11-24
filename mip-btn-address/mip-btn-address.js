/**
 * @file mip-btn-address 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var ty = ele.getAttribute('type');
        var stype = ele.getAttribute('stype');
        var pid = parseInt(ele.getAttribute('pid'), 0);
        var at = ele.getAttribute('at');
        var name = ele.getAttribute('name');
        var util = require('util');
        var platform = util.platform;
        var soft = {
            downLinkAddress: function (data) {
                console.log(data);
                if (data == null) {
                    window.location.href = 'http://m.yxdown.com/downbyname';
                } else if (data === 'tuibao') {
                    if (platform.isIos()) {
                        window.location.href = 'http://dps.sj.yxdown.com/tlsb80a8a37/2309';
                    } else {
                        window.location.href = 'ttp://dps.sj.yxdown.com/tlsc34c18d7/2522/?name=' + name;
                    };
                } else {
                    window.location.href = data;
                };
            },
            getIp: function (data) {
                if (location.pathname.indexOf(/s/) >= 0) {
                    var fetchJsonpTw = require('fetch-jsonp');
                    fetchJsonpTw('http://m.yxdown.com/api/down.ashx/getdjdownlink?id=' + pid + '&firstdown=' + data).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        soft.downLinkAddress(data);
                    });
                } else if (location.pathname.indexOf(/pcsoft/) >= 0) {
                    var fetchJsonpTw = require('fetch-jsonp');
                    fetchJsonpTw('http://m.yxdown.com/api/down.ashx/getpcdownlink?id=' + pid + '&firstdown=' + data).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        soft.downLinkAddress(data);
                    });
                } else {
                    var fetchJsonpTw = require('fetch-jsonp');
                    fetchJsonpTw('http://m.yxdown.com/api/down.ashx/getdownlink?id=' + pid + '&firstdown=' + data).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        soft.downLinkAddress(data);
                    });
                }
            },
            getStart: function () {
                var fetchJsonp = require('fetch-jsonp');
                fetchJsonp('http://tb.yxdown.com/api/op.ashx/checkipdown?website=yxdown').then(function (res) {
                    return res.json();
                }).then(function (data) {
                    soft.getIp(data);
                });
            },
            btnDownLink: function () {
                this.getStart();
            }
        };
        ele.addEventListener('click', function () {
            soft.btnDownLink();
            var i = new Image();
            var type = /\/s\//i.test(location.href) ? 's' : stype;
            i.src = 'http://xz.tongji.yxdown.com/count.do?ch=myx&sid=' + pid + '&name=' + name + '&stype=' + type + '&ua=' + navigator.userAgent;
        }, false);
    };
    return customElement;
});