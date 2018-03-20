/**
 * @file mip-jia-redpacket 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var fixedElement = require('fixed-element');
    var $ = require('zepto');
    var fetchJsonp = require('fetch-jsonp');
    var util = require('util');
    var viewport = require('viewport');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var scrollTop = {
        body: 0,
        documentElement: 0,
        offset: 0
    };


    /**
     * [open 打开弹层 关闭fixedLayer]
     *
     * @param  {Object} event [事件对象]
     */
    function open(event) {
        fixedElement.hideFixedLayer(fixedElement._fixedLayer);
        event.preventDefault();
        // 保存页面当前滚动状态，因为设置overflow:hidden后页面会滚动到顶部
        scrollTop.body = document.body.scrollTop;
        scrollTop.documentElement = document.documentElement.scrollTop;
        scrollTop.offset = window.pageYOffset;
        document.documentElement.classList.add('mip-no-scroll');
    }


    /**
     * [close 关闭弹层 打开fixedLayer]
     *
     * @param  {Object} event [事件对象]
     */
    function close(event) {
        fixedElement.showFixedLayer(fixedElement._fixedLayer);
        if (event) {
            event.preventDefault();
        }
        document.documentElement.classList.remove('mip-no-scroll');

        // 恢复页面滚动状态到弹层打开之前
        if (typeof (document.body.scrollTo) === 'function') {
            // 先判断存在，因为safari浏览器没有document.body.scrollTo方法
            document.body.scrollTo(0, scrollTop.body);
        }
        if (typeof (document.documentElement.scrollTo) === 'function') {
            // 先判断存在，因为safari浏览器没有document.documentElement.scrollTo方法
            document.documentElement.scrollTo(0, scrollTop.documentElement);
        }
        window.scrollTo(0, scrollTop.offset);
    }

    var TYPE = 'script[type="application/json"]';
    var regPhone = /^1[3|4|5|6|7|8|9]\d{9}$/;

    function jsonParse(json) {
        try {
            return JSON.parse(json);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }

    /**
     * 加密手机号
     *
     * @class
     * @param {string} phone 手机号
     * @param {string} key 加密key
     */
    function mobileEncrypt(phone, key) {
        /* global JSEncryptExports */
        var JSEncrypt = new JSEncryptExports.JSEncrypt();
        JSEncrypt.setKey(key);

        // base64编码在传输到后端的时候，+会变成空格，因此替换掉
        var ep = JSEncrypt.encrypt(phone).replace(/\+/g, '%2B');

        return ep;
    }

    /**
     * 加密手机号
     *
     * @class
     * @param {string} url 获取rsaPubKey接口地址
     * @return {Object}  返回旺铺key
     */
    function getRsaPubKey(url) {
        var promise = new Promise(function (resolve, reject) {
            fetch(url, {
                mode: 'cors',
                method: 'get',
                credentials: 'include'
            }).then(function (res) {
                if (res.ok) {
                    resolve(res);
                }
                else {
                    reject(new Error(this.statusText));
                }
            }).catch(function (err) {
                console.log('Fetch错误:' + err);
            });
        });
        return promise;
    }

    // 装修加密key
    var zxKey = [
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8hgXGmTam',
        '/ZBj9q8UteZ+1Z0sja7g7gQBR1RxfVJBbxGMwLgmW2uc+ij4F',
        'fFsr6poM2IO64JfDxl+9H1tmEq6kEmuju7ue4b/4KcMTftKGjr+',
        'DtbNiwtFhLKIU6iQRKjetWor8pj7/arhR5weSh04AWwEFQNsQchq',
        'M2eA7gEs2wIDAQAB'
    ].join('');


    // 提示层
    var tipMaskTimer = null;

    function tipMask(msg, duration) {
        clearTimeout(tipMaskTimer);
        duration = duration || 2000;
        if ($('.popup-maskEdit').length > 0) {
            $('.popup-maskEdit').remove();
        }
        $('body').append('<div class="popup-maskEdit">' + msg + '</div>');
        tipMaskTimer = setTimeout(function () {
            $('.popup-maskEdit').fadeOut(100, function () {
                $(this).remove();
            });
        }, duration);
    }

    // 需要提前加载，所以用build
    customElement.prototype.build = function () {
        var ele = this.element;
        /* global MIP */
        MIP.prerenderElement(ele);

        // 加密依赖
        /* global JSEncryptExports */
        if (typeof JSEncryptExports === 'undefined') {
            var scriptDom = document.createElement('script');
            scriptDom.src = '//mued2.jia.com/js/mobile/jsencrypt.js';
            document.body.appendChild(scriptDom);
        }

    };

    // 红包
    function RedPacket(element, cfg) {
        this.cfg = cfg;
        this.element = element;
    }

    // 添加红包html
    RedPacket.prototype.appendEle = function () {
        var str = [
            '<div class="hb-popup">',
            '    <div class="popup-box">',
            '        <em class="close"></em>',
            '        <div class="top">',
            '            <div class="img-box">',
            '                <mip-img layout="responsive" width="' + this.cfg.logoW + '" height="',
            this.cfg.logoH + '" src="' + this.cfg.logo + '">',
            '                </mip-img>',
            '            </div>',
            '            <p class="name">' + this.cfg.logoText + '</p>',
            '            <p class="event">' + this.cfg.desc + '</p>',
            '            <h3 class="title">' + this.cfg.couponText + '</h3>',
            '            <div class="input-box">',
            '                <input type="tel" class="form-input" maxlength="11"',
            ' placeholder="输入手机号，限领一次" bdsl-key="phone" bdsl-name-articleHbBottom=""',
            ' bdsl-required="^1[3|4|5|6|7|8|9]\\d{9}$" />',
            '            </div>',
            '        </div>',
            '        <div class="circle-wrap"><div class="circle-box"></div></div>',
            '        <span class="headline-btn" bdsl-extra="{id:10003}" bdsl-submit="articleHbBottom"></span>',
            '        <div class="bottom"><i></i></div>',
            '    </div>',
            '</div>',
            '<div class="popmask"></div><div class="loading-icon"></div>'
        ].join('');

        $(this.element).append(str);
    };

    /**
     * 领取红包
     *
     * @class
     * @param {string} url 接口地址
     * @param {string} parms 接口参数
     * @return {Promise}
     */
    RedPacket.prototype.getRed = function (url, parms) {
        var selF = this;
        var tips = $(this.element).find('.loading-icon');
        tips.css('display', 'block');
        return new Promise(function (resolve, reject) {
            fetchJsonp(url + '?parameters=' + JSON.stringify(parms), {
                jsonpCallback: 'callback'
            }).then(function (res) {
                tips.css('display', 'none');
                return res.json();
            }).then(function (data) {
                if (data.obtainResult === 'SUCCESS'
                    || data.obtainResult === 'OBTAINING'
                    || data.obtainResult === 'USER_NOT_EXIST') {
                    return resolve();
                }
                else if (data.obtainResult === 'REACH_OBTAIN_UPPER_LIMIT') {
                    tipMask('您已领取过该红包~');
                    $(selF.element).find('.popmask, .hb-popup').css('display', 'none');
                    close();
                }
                else {
                    tipMask(data.message);
                }
            });
        });

    };

    /**
     * 获取城市
     *
     * @class
     * @param {string} url 接口地址
     * @return {Promise}
     */
    RedPacket.prototype.getCity = function (url) {
        return new Promise(function (resolve, reject) {
            if (!storage.get('city')) {
                fetchJsonp(url, {
                    jsonpCallback: 'callback'
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    if (data.code !== 0) {
                        var city = data.result.site.area_info;
                        storage.set('city', JSON.stringify(city), 21600000);
                        return resolve(city.area_py);
                    }
                    else {
                        console.log(data.msg);
                    }
                });
            }
            else {
                var city = JSON.parse(storage.get('city')).area_py;
                return resolve(city);
            }
        });

    };


    /**
     * 装修报名
     *
     * @class
     * @param {string} url 接口地址
     * @param {string} parms 接口参数
     * @return {Promise}
     */
    RedPacket.prototype.signUp = function (url, parms) {
        return new Promise(function (resolve, reject) {
            fetchJsonp(url + '?' + parms, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.status === 200) {
                    return resolve();
                }
                else {
                    tipMask(data.info);
                }
            });
        });
    };

    /**
     * [onScroll mip 页面滑动事件]
     *
     * @param {string} ele 操作元素
     */
    RedPacket.prototype.scrollFn = function (ele) {
        // 滚动事件
        viewport.on('scroll', function () {
            // 滚动条滚动的距离
            var scrollTop = viewport.getScrollTop();
            // 内容高度
            var domHeight = viewport.getScrollHeight();
            // 视口高度
            var viewHei = viewport.getHeight();
            if ($(ele.scrollClass).length > 0) {
                var eleTop = $('.related-reading').offset().top;
                if (scrollTop > 10 && eleTop > viewHei / 2) {
                    $(ele.class).parent().addClass('hide');
                }
                else {
                    $(ele.class).parent().removeClass('hide');
                }

                if (eleTop <= viewHei / 2) {
                    $(ele.class).parent().addClass('shake');
                }
                else {
                    $(ele.class).parent().removeClass('shake');
                }
            }
        });
    };



    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var ele = this.element;
        var datas = this.element.querySelector(TYPE);
        var cfg = jsonParse(datas.textContent);
        var redPacket = new RedPacket(ele, cfg);

        // 添加
        redPacket.appendEle();

        // 显示弹层
        $(cfg.class).on('click', function (event) {
            $(this).parent().removeClass('hide');
            $(ele).find('.popmask, .hb-popup').css('display', 'block');
            open.call(self, event);
        });
        if (cfg.eventClass) {
            $(cfg.eventClass).live('click', function (event) {
                $(this).parent().removeClass('hide');
                $(ele).find('.popmask, .hb-popup').css('display', 'block');
                open.call(self, event);
            });
        }

        // 关闭弹层
        $(ele).find('.close, .popmask').click(function (event) {
            $(ele).find('.popmask, .hb-popup').css('display', 'none');
            close.call(self, event);
        });

        // 滚动
        redPacket.scrollFn(cfg);

        // 点击报名
        $(ele).find('.headline-btn').click(function () {
            var tel = $(ele).find('.form-input');
            if (!regPhone.test(tel.val())) {
                tipMask('请输入正确的手机号~');
                return;
            }
            var redParms = cfg.redRequest.parms;

            var signParms = cfg.signRequest.parms;
            var pArray = [];
            for (var key in signParms) {
                if (signParms.hasOwnProperty(key)) {
                    pArray.push(key.concat('=', signParms[key]));
                }
            }

            // 报名成功页所需参数
            var bmPramas = {};

            // 回调拆分一
            function stepOne(key) {
                var redPhone = mobileEncrypt(tel.val(), key);
                redParms.mobileNumber = redPhone;

                // 领取红包
                redPacket.getRed(cfg.redRequest.url, redParms).then(function () {
                    stepTwo();
                });
            }

            // 回调拆分二
            function stepTwo() {
                // 获取城市
                redPacket.getCity(cfg.cityUrl).then(function (city) {
                    var zxPhone = mobileEncrypt(tel.val(), zxKey);
                    pArray.push('mobile=' + zxPhone);
                    pArray.push('city=' + city);
                    bmPramas.zxphone = zxPhone;
                    bmPramas.zxcity = city;

                    // 装修报名
                    redPacket.signUp(cfg.signRequest.url, pArray.join('&')).then(function () {

                        // 种cookie并跳转到成功页
                        bmPramas['refer_url'] = window.location.href;
                        bmPramas['from_source'] = signParms.source;
                        bmPramas = JSON.stringify(bmPramas);
                        storage.set('bm_pramas', bmPramas);
                        window.top.location.href = cfg.signRequest.skipUrl;
                    });
                });
            }

            // 获取旺铺加密KEY
            getRsaPubKey(cfg.keyUrl).then(function (res) {
                res.text().then(function (key) {
                    stepOne(key);
                });
            });
        });

    };

    return customElement;
});
