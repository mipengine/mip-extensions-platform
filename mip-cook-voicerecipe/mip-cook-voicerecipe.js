/**
 * @file mip-cook-voicerecipe 组件
 * @author cxtom(cxtom2008@gmail.com)
 */

/* eslint-disable no-var */

define(function (require) {

    var instance = require('customElement').create();
    var $ = require('zepto');
    var util = require('util');
    var Bdbox = require('./bdbox');

    var CustomStorage = util.customStorage;
    var platform = util.platform;
    var Naboo = util.naboo;

    var STORAGE_KEY = 'mip_cook_voicerecipe_wakeup_key';

    var cs = new CustomStorage(0);

    /* eslint-disable fecs-valid-var-jsdoc */
    var Storage = {

        /**
         * 读所有 localstorage 数据
         *
         * @return {Object} flags 所有 localstorage 数据
         */
        get: function () {
            var flags = cs.get(STORAGE_KEY);
            try {
                flags = JSON.parse(flags) || {};
            }
            catch (e) {
                flags = {};
            }
            return flags;
        },

        /**
         * 写数据
         *
         * @param {Object} data 唤醒数据
         */
        set: function (data) {
            var flags = Storage.get();
            $.extend(flags, data);
            cs.set(STORAGE_KEY, JSON.stringify(flags));
        }
    };
    /* eslint-enable fecs-valid-var-jsdoc */

    function fadeIn(dom) {
        new Naboo().animate(dom, {
            opacity: 1
        }, {
            duration: 300
        }).start();
    }

    function fadeOut(dom, cb) {
        new Naboo().animate(dom, {
            opacity: 1
        }, {
            duration: 300,
            cb: cb
        }).start();
    }

    /**
     * tips 相关
     *
     * @param  {Object} element element
     */
    function initTip(element) {

        var tip = element.find('.mip-cook-voicerecipe-tips').get(0);

        $(tip).css({
            opacity: 0,
            display: 'block'
        });

        var onScroll = function () {

            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            if (scrollTop > 200) {

                $(window).off('scroll', onScroll);

                fadeIn(tip);

                // 有任何点击就退场
                $(document.body).one('touchstart', function () {
                    tip && fadeOut(tip, function () {
                        $(tip).remove();
                        tip = null;
                    });
                });

                $(window).off('scroll touchmove', onScroll);
            }
        };

        $(window).on('scroll', onScroll);
    }

    var MAIN_HTML = ''
        + '<div class="mip-cook-voicerecipe-wrapper">'
        +     '<button type="button" data-action="start">开始语音烹饪</button>'
        +     '<div class="mip-cook-voicerecipe-tips" style="display: none">小度语音助手，彻底解放你的双手</div>'
        + '</div>';

    /**
     * 构造元素，只会运行一次
     */
    instance.prototype.build = function () {

        // 只在手百 9.2 以上显示入口
        if (!Bdbox.isBox
            || (platform.isIos() && Bdbox.versionCompare(Bdbox.version, '9.2') < 0)
            || (platform.isAndroid() && Bdbox.versionCompare(Bdbox.version, '9.1') < 0)
        ) {
            return;
        }

        var element = $(this.element);

        // 去掉这个类，否则弹窗和 tips 都显示不出来
        element.removeClass('mip-layout-size-defined');

        element.html(MAIN_HTML);

        element.on('click', '[data-action=start]', function () {
            var pageUrl = util.parseCacheUrl(location.href);
            pageUrl = pageUrl.replace(/\#.*?$/, '');
            location.href = 'http://m.baidu.com/sf?pd=life_cookbook&openapi=1&dspName=iphone&from_sf=1&resource_id=4669&word='
                + encodeURIComponent(pageUrl) + '&title=菜谱语音助手&ms=1';
        });

        element.css({
            left: '0px',
            height: '59px'
        });

        var store = Storage.get();

        if (!store.visited) {
            initTip(element);
            Storage.set({
                visited: true
            });
        }
    };

    return instance;
});
