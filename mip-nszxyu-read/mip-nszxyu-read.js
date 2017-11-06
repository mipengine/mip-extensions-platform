/**
 * @file mip-nszxyu-read 组件
 * @author nszxyu
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    customElement.prototype.build = function () {
        var element = this.element;
        var configElement = $(element).find('#mip-nszxyu-read');
        if (configElement.length === 0) {
            return;
        }
        var config = JSON.parse(configElement.html());

        init(config);

        this.addEventAction('dark', function (event, str) {
            var conf = config.dark;
            var state = storage.get('dark') || '0';
            state = (state === '1' ? '0' : '1');
            setDark(conf, state);
            storage.set('dark', state);
            storage.set('eye', '0');
        });

        this.addEventAction('eye', function (event, str) {
            var conf = config.eye;
            var state = storage.get('eye') || '0';
            state = (state === '1' ? '0' : '1');
            setEye(conf, state);
            storage.set('eye', state);
            storage.set('dark', '0');
        });

        this.addEventAction('font', function (event, str) {
            var conf = config.font;
            if (typeof (conf[str]) === 'undefined') {
                return;
            }
            setFont(conf[str]);
            storage.set('font', str);
        });
    };

    /**
     * [从存储中读取设置并且初始化]
     *
     * @param {string} config [配置信息]
     */
    function init(config) {
        var darkState = storage.get('dark') || '0';
        if (darkState === '1') {
            setDark(config.dark, darkState);
        }

        var eyeState = storage.get('eye') || '0';
        if (eyeState === '1') {
            setEye(config.eye, eyeState);
        }

        var font = storage.get('font');
        if (font) {
            setFont(config.font[font]);
        }
    }

    /**
     * [关灯]
     *
     * @param {string} config [配置信息]
     * @param {string} state [状态，取值0：开灯，1：关灯]
     */
    function setDark(config, state) {
        var index = (state === '1' ? 1 : 0);
        if (typeof (config) === 'object') {
            for (var k in config) {
                var conf = config[k];
                if (conf.length !== 2) {
                    continue;
                }
                var css = getCss(conf[index]);
                $(k).css(css);
            }
        }
    }

    /**
     * [开启护眼模式]
     *
     * @param {string} config [配置信息]
     * @param {string} state [状态，取值0：关闭，1：开启]
     */
    function setEye(config, state) {
        var index = (state === '1' ? 1 : 0);
        if (typeof (config) === 'object') {
            for (var k in config) {
                var conf = config[k];
                if (conf.length !== 2) {
                    continue;
                }
                var css = getCss(conf[index]);
                $(k).css(css);
            }
        }
    }

    /**
     * [设置字体大小]
     *
     * @param {string} config [配置信息]
     */
    function setFont(config) {
        if (typeof (config) === 'object') {
            for (var k in config) {
                var conf = config[k];
                var css = getCss(conf[1]);
                $(k).css(css);
            }
        }
    }

    /**
     * [分割style字符串获得css对象]
     *
     * @param {string} str [style字符串]
     * @return {{}}
     */
    function getCss(str) {
        var list = str.split(';');
        var cssList = {};
        if (typeof (list) === 'object') {
            for (var k in list) {
                var tmp = list[k].split(':');
                cssList[tmp[0]] = tmp[1];
            }
        }
        return cssList;
    }

    return customElement;
});
