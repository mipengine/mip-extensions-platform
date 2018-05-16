/**
 * @author:JDDFE
 * @date: 2018-05-10
 * @file mip-jdd-tracking.js
 *
 */
define(function (require) {
    var $ = require('zepto');
    var utils = require('util');
    var customElement = require('customElement').create();
    var cookies = require('./js-cookie');

    // build说明：埋点组件，需要第一时间加载，  不显示在页面上
    customElement.prototype.build = function () {
        var el = this.element;
        var config = getConfig(el);
        var trackList = getCustomTrackEvents();
        pageTrack(config);
        bindEvent.call(this, trackList, config);

    };

    /**
     * 获取配置.
     *
     * @param {Object} element jiedian.
     * @return {Object} defaultConfig memeda.
     */
    function getConfig(element) {
        var defaultConfig = {
            url: '',
            appName: '',
            pageId: '',
            extra: ''
        };

        try {
            var config = {};
            var script = element.querySelector('script[type="application/json"]');
            if (script) {
                var customData = JSON.parse(script.textContent);
                if (JSON.stringify(customData) !== '{}') {
                    config = utils.fn.extend({}, defaultConfig, customData);
                }

                return config;
            }

        }
        catch (error) {
            console.warn(error);
        }

        return defaultConfig;
    }

    /**
     * 获取埋点信息
     *
     * @return {Array} trackList
     */
    function getCustomTrackEvents() {
        var trackNodeList = document.querySelectorAll('*[track]');
        var trackList = [];
        for (var i = 0; i < trackNodeList.length; i++) {
            var current = trackNodeList[i];
            var attr = current.getAttribute('track');
            if (attr === '') {
                return;
            }

            var data = attr.split('|');
            var item = {
                dom: current,
                id: data[0],
                type: data[1],
                extra: null
            };
            if (data[2]) {
                var extra = convertQueryStringToJSON(data[2]);
                if (!isEmptyObject(extra)) {
                    item.extra = extra;
                }
            }

            trackList.push(item);
        }
        return trackList;
    }

    /**
     * 页面埋点
     *
     * @param {Object} config 配置
     */
    function pageTrack(config) {
        if (config.pageId) {
            doTrack(config.pageId, {
                extra: config.extra
            }, config);
        }
    }

    /**
     * 绑定埋点事件.
     *
     * @param {Array} trackList 埋点列表
     * @param {Object} config 配置
     */
    function bindEvent(trackList, config) {
        function getParam(attr) {
            if (attr === '') {
                return {};
            }

            var data = attr.split('|');
            var item = {
                id: data[0],
                type: data[1],
                extra: null
            };
            if (data[2]) {
                var extra = convertQueryStringToJSON(data[2]);
                if (!isEmptyObject(extra)) {
                    item.extra = extra;
                }
            }

            return item;
        }
        this.addEventAction('doTrack', function (event, str) {
            var item = getParam(str);
            doTrack(item.id, {
                extra: item.extra
            }, config);
        });

        for (var index = 0; index < trackList.length; index++) {
            (function (i) {
                var current = trackList[i];
                if (current.type === 'click') {
                    current.dom.addEventListener('click', function () {
                        doTrack(current.id, {
                            extra: current.extra
                        }, config);
                    });
                }

            })(index);
        }
    }

    /**
     * 执行.
     *
     * @param {string} id 埋点id.
     * @param {Object} data 埋点信息.
     * @param {Object} config 配置信息.
     */
    function doTrack(id, data, config) {
        var userInfo = cookies.get('userInfo');
        var frm = cookies.get('from') || getParamsCode('frm');
        var params = {
            deviceid: '',
            plateform: 'h5',
            subplateform: 'h5',
            version: '4.0.2',
            channel: 'h5_' + (frm || 'zz'),
            client: '',
            os: '',
            logs: '',
            net: '',
            uid: userInfo ? base64Parse(userInfo.id) : 0
        };
        var now = new Date().getTime();
        var extra = data.extra || {};
        extra.url = window.location.href;

        var logs = [
            {
                uid: params.uid,
                eventid: id,
                eventcontent: JSON.stringify(extra),
                begintime: now,
                pmenu: '',
                menu: '',
                ip: '',
                net: params.netWorkType || '',
                lon: '',
                lat: '',
                areacode: '',
                address: ''
            }
        ];
        params.logs = logs;

        var form = new FormData();

        form.append('json', JSON.stringify(params));
        form.append('appName', config.appName);

        fetch(config.url, {
            method: 'POST',
            body: form
        }).catch(function (error) {
            console.warn(error);
        });
    }

    /**
     * 把query转换为对象
     *
     * @param {string} query 传入的字符串，如：a=3&b=4
     * @return {Object} 返回对象
     */
    function convertQueryStringToJSON(query) {
        var queryStringArr = query.split('&');
        var result = {};
        queryStringArr.forEach(function (item, index) {
            var match = item.split('=');
            if (match[0] && match[0] !== '' && match[1] && match[1] !== '') {
                result[match[0]] = window.decodeURIComponent(match[1]);
            }

        });
        return JSON.parse(JSON.stringify(result));
    }

    /**
     * 判断是否是空对象
     *
     * @param  {Object} object 需要判断的对象
     * @return {boolean}
     */
    function isEmptyObject(object) {
        for (var t in object) {
            if (object.hasOwnProperty(t)) {
                return !1;
            }

        }
        return !0;
    }

    /**
     * 获取url参数
     *
     * @param {string} name is name
     * @return {Object} customElement
     */
    function getParamsCode(name) {
        var search = window.location.href.indexOf('?') > -1 ? window.location.href.split('?')[1].split('&') : [];
        var i = 0;
        var len = search.length;
        var params = {};
        var pos;
        for (; i < len; i++) {
            pos = search[i].indexOf('=');
            if (pos > 0) {
                params[search[i].substring(0, pos)] = decodeURIComponent(search[i].substring(pos + 1));
            }

        }
        return params[name] ? params[name] : undefined;
    }

    var utf8Decode = function (utftext) {
        var string = '';
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
    var utf8Encode = function (string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };

    function base64Parse(input) {
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        var output = '';
        var chr1;
        var chr2;
        var chr3;
        var enc1;
        var enc2;
        var enc3;
        var enc4;
        var i = 0;
        var input = utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    }

    return customElement;
});
