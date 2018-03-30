/**
 * @file mip-hlj-statistic 用于婚礼纪网站访问数据统计
 * @author xue_nuo
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var customElement = require('customElement').create();

    function getUrlParam(name) {
        var reg = new RegExp('(^|$)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    function sdkData(data) {
        var obj = '{"events":[' + JSON.stringify(data) + ']}';
        $.ajax({
            url: 'https://www.hunliji.com/v1/api/app/tracker/batch.json',
            type: 'POST',
            data: obj,
            headers: {'appName': 'web'},
            success: function (res) {
                // do nothing
            }
        });
    }

    function rans(len) {
        if (storage.get('rans')) {
            return storage.get('rans');
        } else {
            len = len || 32;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            storage.set('rans', pwd);
            return pwd;
        }
    }

    function getType() {
        var type = '';
        var pathname = location.pathname;
        if (pathname.indexOf('ask') > 0) {
            type = 'answerDetail';
        } else if (pathname.indexOf('note') > 0) {
            type = 'Note';
        } else if (pathname.indexOf('community') > 0) {
            type = 'Community';
        }
        return type;
    }

    function sdk($type, $uid) {
        var url = location.href;
        var id = getUrlParam('id');
        var ip;
        if (id) {
            id = parseInt(id, 10);
        } else if (url.indexOf('detail_') > 0) {
            var idArr = url.match(/detail_?[0-9]+/g)[0].split('_');
            id = +idArr[1];
        } else {
            id = 0;
        }
        $.ajax({
            url: 'https://www.hunliji.com/sms/ip',
            type: 'get',
            success: function (result) {
                ip = result;
                sdkData({
                    action: 'hit',
                    eventableType: $type,
                    eventableId: id,
                    additional: {
                        shareData: +$uid,
                        ip: ip,
                        num: rans(32)
                    }
                });
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var uid = getUrlParam('share_uid');
        var type = getType();
        if (uid) {
            sdk(type, uid);
        }
    };

    return customElement;
});
