/**
 * @file 广告类，主要是后台设置的一些效果实现，比如轮播、定向
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    var adIcon;
    var utilFun = require('./fun');
    var utilUser = require('./user');
    var utilCss = require('./css');
    var config = require('../config');
    var innerHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.clientHeight;
    function isImpTrack(element, rate) {
        var rect = element.getBoundingClientRect();
        return (!((rect.top + (rect.bottom - rect.top) * rate) > innerHeight) && !(rect.bottom < 0));
    }
    module.exports = {

        /**
         * 处理广告条的随机顺序
         *
         * @param {Array} adPlace 广告位数组
         * @return {Array} 排序好的广告位
         */
        sort: function (adPlace) {
            var adPlaceSort = [];
            var adPlaceRandom = [];
            for (var i = 0; i < adPlace.length; i++) {
                var adBar = adPlace[i];
                if (adBar.is_random === '1') {
                    adPlaceRandom.push(adBar);
                } else {
                    adPlaceSort[i] = adBar;
                }
            }
            adPlaceRandom.sort(function () {
                return 0.5 > Math.random();
            });
            for (var j = 0; j < adPlaceSort.length; j++) {
                if (!adPlaceSort[j]) {
                    adPlaceRandom[j] = adPlaceRandom.pop();
                }
            }
            return adPlaceSort;
        },

        /**
         * 处理广告条轮播，同一个广告位可能有多组轮播
         *
         * @param {Object} adBar 广告条json对象
         * @param {Object} hasRotate 判断当前轮播是否已经展示
         * @return {boolean}
         */
        rotate: function (adBar, hasRotate) {
            if (adBar.rotate.length > 0) {
                if (!hasRotate[adBar.rotate[0]]) {
                    var key = 'bms_rotate' + adBar.rotate[0];
                    var cookie = utilFun.getCookie(key);
                    cookie = cookie ? (cookie > (adBar.rotate.length - 1) ? 0 : cookie) : 0;
                    if (('' + adBar.bid) === adBar.rotate[cookie]) {
                        utilFun.setCookie(key, ++cookie);
                        hasRotate[adBar.rotate[0]] = 1;
                        return true;
                    }
                }
                return false;
            } else {
                return true;
            }
        },

        /**
         * 处理平台判断
         *
         * @param {Object} adBar 广告条json对象
         * @return {boolean}
         */
        checkOS: function (adBar) {
            var regex;
            var isLibwap;
            var platform;
            var fodder = adBar.conf;
            if (fodder.platform && utilFun.indexOf(fodder.platform, '0') === -1) {
                for (var i = 0; platform = fodder.platform[i++];) {
                    isLibwap = 1;
                    switch (platform) {
                        case '1':
                            regex = /Android/;
                            break;
                        case '2':
                            regex = /iPhone/;
                            break;
                        case '4':
                            isLibwap = utilUser.host === 'lib.wap.zol.com.cn';
                            regex = /Android/;
                            break;
                        case '8':
                            isLibwap = utilUser.host === 'lib.wap.zol.com.cn';
                            regex = /iPhone/;
                            break;
                    }
                    if (isLibwap && regex.test(utilUser.ua)) {
                        return true;
                    }
                }
                return false;
            }
            return true;
        },

        /**
         * 处理定向判断
         *
         * @param {Object} adBar 广告条json对象
         * @return {boolean}
         */
        checkCity: function (adBar) {
            var provArr;
            var cityArr;
            var location;
            if (adBar.province) {
                location = utilUser.location();
                provArr = adBar.province.split('{ZOL}');
                cityArr = adBar.city.split('{ZOL}');
                for (var i = 0, len = provArr.length; i < len; i++) {
                    if (location.provStr === provArr[i]) {
                        if (!cityArr[i] || (cityArr[i] === location.cityStr)) {
                            return true;
                        }
                    }
                }
                return false;
            }
            return true;
        },

        /**
         * 添加广告标识
         *
         * @param {Object} element 广告元素
         * @param {Object} adBar 广告条json对象
         */
        addAdIcon: function (element, adBar) {
            var icon;
            var fodder = adBar.conf;
            if (adBar.adtag !== '1') {
                return;
            }
            if (adIcon) {
                icon = adIcon.cloneNode();
            } else {
                icon = new Image(config.adIconWidth, config.adIconHeight);
                icon.src = config.adIcon;
                utilCss(icon, {
                    left: '0',
                    bottom: '0',
                    border: '0',
                    position: 'absolute',
                    width: config.adIconWidth + 'px',
                    height: config.adIconHeight + 'px'
                });
                adIcon = icon;
            }
            utilCss(element, {
                position: 'relative',
                width: fodder.width + 'px',
                height: fodder.height + 'px'
            });
            element.appendChild(icon);
        },

        /**
         * 设置广告边距
         *
         * @param {Object} element 广告元素
         * @param {Object} fodder 广告参数
         */
        addAdMargin: function (element, fodder) {
            if (fodder.top > 0) {
                utilCss(element, 'marginTop', fodder.top);
            } else if (fodder.bottom > 0) {
                utilCss(element, 'marginBottom', fodder.bottom);
            }
        },

        /**
         * 点击监测
         *
         * @param {Object} element 广告元素
         * @param {Object} url 点击地址
         */
        clkTrack: function (element, url) {
            utilFun.addEventListener(element, 'click', function () {
                utilFun.log(url);
            });
        },

        /**
         * ZOL点击监测
         *
         * @param {Object} element 广告元素
         * @param {Object} adBar 广告条json对象
         */
        zolClkTrack: function (element, adBar) {
            this.clkTrack(element, utilUser.pvtest('bms_' + adBar.loc_id + '_' + adBar.bid + '_click'));
        },

        /**
         * 可视曝光监测
         *
         * @param {Object} element 广告元素
         * @param {string} url 曝光地址
         */
        impTrack: function (element, url) {
            if (isImpTrack(element, 0.2)) {
                utilFun.log(url);
            } else {
                utilFun.addEventListener(window, 'scroll', scrollFn);
            }
            function scrollFn() {
                if (isImpTrack(element, 0.2)) {
                    utilFun.removeEventListener(window, 'scroll', scrollFn);
                    utilFun.log(url);
                }
            }
        },

        /**
         * ZOL可视曝光监测
         *
         * @param {Object} element 广告元素
         * @param {Object} adBar 广告条json对象
         */
        zolImpTrack: function (element, adBar) {
            this.impTrack(element, utilUser.pvtest('bms_' + adBar.loc_id + '_' + adBar.bid + '_show'));
        },

        /**
         * 数据中心统计
         *
         * @param {Object} params 参数
         */
        zpv: function (params) {
            if (params.dom) {
                (window['_zpv_events'] = window['_zpv_events'] || []).push(params);
            }
        }
    };
});
