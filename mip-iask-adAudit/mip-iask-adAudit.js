/**
* @file 脚本支持
* @author hejieye
* @time  2018-11-15
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var fetchJsonp = require('fetch-jsonp');
    var customElem = require('customElement').create();
    var stat = {};
    stat = {
        getTimestamp: function () {
            var timestamp = Date.parse(new Date());
            return timestamp;
        },
        genId: function (wname) {
            var id = this.getTimestamp();
            id = wname + '-' + id + '-' + Math.round(Math.random() * 3000000000);
            return id;
        },
        genStatId: function () {
            var id = this.getTimestamp();
            id = 'vlstat' + '-' + id + '-' + Math.round(Math.random() * 3000000000);
            return id;
        },
        getReferrer: function () {
            return document.referrer;
        },
        getScreen: function () {
            return window.screen.height + '*' + window.screen.width;
        },
        getIask: function () {
            return 'https://dd.iask.cn/ddd/';
        }
    };
    // 初始化页面ID
    var initconnId = function () {
        var connId = stat.genId('connId');
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('id', 'connId');
        input.setAttribute('value', connId);
        document.body.appendChild(input);
    };
    // 创建隐藏的img标签
    var reportAuditInfo = function (url) {
        try {
            fetchJsonp(url);
        } catch (e) {

        }
    };
    // 上报浏览器信息
    var reportBrowser = function () {
        var connId = document.getElementById('connId').value;
        var statId = stat.genStatId();
        var referrer = stat.getReferrer();
        var screen = stat.getScreen();
        var adStat = stat.getIask() + 'stat?statId=' + statId;
        adStat += '&referrer=' + referrer + '&screen=' + screen + '&connId=' + connId;
        reportAuditInfo(adStat);
    };
    // 扫描所有百度广告
    var scanning = function () {
        reportBrowser();
        var connId = document.getElementById('connId').value;
        // 上报分母
        $('.mip-hidden-bdcontent').each(function () {
            var sendUrl = stat.getIask();
            sendUrl += 'adAudit?positionId=' + $(this).attr('positionid');
            sendUrl += '&advertId=' + $(this).attr('advertid');
            sendUrl += '&contentId=' + $(this).attr('contentid');
            sendUrl += '&connId=' + connId;
            reportAuditInfo(sendUrl);
        });
        // 上报分子
        var intervalID = window.setInterval(function () {
            $('mip-ad').each(function () {
                var $embed = $(this);
                // 判断百度广告是否展示
                // 根据token去获取广告对应的相关信息
                var embedToken = $embed.attr('token');
                var adInfo = $embed.html();
                if (!!adInfo && adInfo.indexOf('iframe') > 0) {
                    $('.mip-hidden-bdcontent').each(function () {
                        var token = $(this).attr('token');
                        if (token === embedToken) {
                            var sendUrl = stat.getIask();
                            sendUrl += 'adStatus?positionId=' + $(this).attr('positionid');
                            sendUrl += '&advertId=' + $(this).attr('advertid');
                            sendUrl += '&contentId=' + $(this).attr('contentid');
                            sendUrl += '&status=1';
                            sendUrl += '&connId=' + connId;
                            $(this).remove();
                            reportAuditInfo(sendUrl);
                        }
                        if ($('.mip-hidden-bdcontent').length === 0) {
                            clearInterval(intervalID);
                        }
                    });
                }
            });
        }, 500);
    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var randomNumber = parseInt((Math.random() * 10), 0);
        if (randomNumber === 0) {
            initconnId();
            scanning();
        }
    };
    return customElem;
});
