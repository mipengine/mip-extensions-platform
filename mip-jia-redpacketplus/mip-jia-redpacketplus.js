/**
 * @file mip-jia-redpacketplus 组件
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
        if (!document.documentElement.classList.contains('mip-no-scroll')) {
            // 保存页面当前滚动状态，因为设置overflow:hidden后页面会滚动到顶部
            scrollTop.body = document.body.scrollTop;
            scrollTop.documentElement = document.documentElement.scrollTop;
            scrollTop.offset = window.pageYOffset;
            document.documentElement.classList.add('mip-no-scroll');
        }
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
    var regPhone = /^1[3456789]\d{9}$/;

    function jsonParse(json) {
        try {
            return JSON.parse(json);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }

    // [装修、团购、旺铺] 公钥
    var keyArr = {
        zx: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8hgXGmTam'
        + '/ZBj9q8UteZ+1Z0sja7g7gQBR1RxfVJBbxGMwLgmW2uc+ij4F'
        + 'fFsr6poM2IO64JfDxl+9H1tmEq6kEmuju7ue4b/4KcMTftKGjr+'
        + 'DtbNiwtFhLKIU6iQRKjetWor8pj7/arhR5weSh04AWwEFQNsQchqM2eA7gEs2wIDAQAB',
        tg: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCC0w+gQPas'
        + 'CFul1A/LVYfU4A2C0niMgcb9t+nftc5behMmf5l0aT6fmMa1e+'
        + 'wdfmzleVljEaFcnVi/yOY13HqPa5fymwkVC6k+7beVnFUTDUSK5'
        + 'SJTep+jSHmNCKPM+nVhm2xQu+SjZbxbeIiFdm0mfSJH/8faNXdiWU4rv9NuwIDAQAB',
        wp: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAurXXoxX'
        + 'AHK4vwRMDDQRFhkQH6tDbVN/k69JGBAGxm2N4+2TVDCKWrBqKjgm'
        + 'jQSqubHiURa9O3bfAXUDYyV7S3/Vajc+NP0kU0l6Fl8q4AldSsQkSf'
        + 'Lq5NrcxU0QsXJbfRCEIyS+lfG9/O+XGVrvpy21hOqs6Zmgvsa5//d6BT'
        + 'C31FOb/d9H4C/iFgIXqAvcEJms+agPpXTMDDjxbB6/6P8qZoqKR1iztv3'
        + 'bzwowU7YRpMVwwdr74K+ka7p0Y+KnnE4oiX3b5rDfQ/GOdG9OJhpGMAUkpR'
        + 'jXy01hu9bT+ep7sYTlhVPhwr+8OICO7tsxNoNW7InOix26oY0IvqWcGjwIDAQAB'
    };

    /**
     * 加密手机号
     *
     * @class
     * @param {string} phone 手机号
     * @param {string} type 类型
     */
    function mobileEncrypt(phone, type) {
        /* global JiaJSEncrypt */
        var JSEncrypt = new JiaJSEncrypt();
        JSEncrypt.setKey(keyArr[type]);
        // base64编码在传输到后端的时候，+会变成空格，因此替换掉
        var ep = JSEncrypt.encrypt(phone).replace(/\+/g, '%2B');
        return ep;
    }

    // 红包
    function RedPacket(element, cfg) {
        this.cfg = cfg;
        this.element = element;
    }

    // 添加红包html
    RedPacket.prototype.appendEle = function () {
        var str = '';
        str += '<div class="hb-popup">';
        str += '    <div class="popup-box">';
        str += '        <em class="close"></em>';
        str += '        <div class="top">';
        str += '            <div class="img-box">';
        str += '                <mip-img layout="responsive" width="' + this.cfg.logoW + '" height="';
        str += this.cfg.logoH + '" src="' + this.cfg.logo + '">';
        str += '                </mip-img>';
        str += '            </div>';
        str += '            <p class="name">' + this.cfg.logoText + '</p>';
        str += '            <p class="event">' + this.cfg.desc + '</p>';
        if (this.cfg.couponText) {
            str += '            <h3 class="title">' + this.cfg.couponText + '</h3>';
        }
        if (this.cfg.countDown) {
            str += '            <div class="countDown-box">' + this.cfg.countDown.title;
            str += '<p class="' + (this.cfg.countDown.class || 'countDown') + '"></p></div>';
        }
        str += '            <div class="input-box">';
        str += '                <input type="tel" class="form-input" maxlength="11"';
        str += ' placeholder="输入手机马上领取红包" bdsl-key="phone" bdsl-name-articleHbBottom=""';
        str += ' bdsl-required="^1[3|4|5|6|7|8|9]\\d{9}$" />';
        str += '            </div>';
        str += '        </div>';
        str += '        <div class="circle-wrap"><div class="circle-box"></div></div>';
        str += '        <span class="headline-btn" bdsl-extra="{id:10003}" bdsl-submit="articleHbBottom"></span>';
        str += '        <div class="bottom"><i></i></div>';
        str += '    </div>';
        str += '</div>';
        str += '<div class="popmask"></div><div class="loading-icon"></div>';
        $(this.element).append(str);
        this.cfg.countDown && this.countDown();
    };

    /**
     * 倒计时
     *
     * @class
     */
    RedPacket.prototype.countDown = function () {
        var that = this;
        var $ele = $(this.element).find('.' + (this.cfg.countDown.class || 'countDown'));
        console.log(this.cfg.countDown);
        that.times = this.cfg.countDown.time * 60 * 60;
        window.clearInterval(that.timer);
        that.timer = null;
        that.timer = window.setInterval(function () {
            that.times = that.times - 1;
            if (that.times < 0) {
                that.times = that.cfg.countDown.time * 60 * 60;
            }
            var day = Math.floor(that.times / (3600 * 24));
            var hour = Math.floor((that.times - day * 3600 * 24) / 3600);
            var minutes = Math.floor((that.times - day * 3600 * 24 - hour * 3600) / 60);
            minutes < 10 ? minutes = '0' + minutes : minutes;
            var second = Math.floor(that.times - day * 3600 * 24 - hour * 3600 - minutes * 60);
            second < 10 ? second = '0' + second : second;
            var msg = '';
            msg += '<em>' + hour + '</em> : <em>' + minutes + '</em> : <em>' + second + '</em>';
            $ele.html(msg);
        }, 1000);
    };


    /**
     * 编译参数
     *
     * @class
     * @param {Object} data 参数对象
     * @return {string} 返回参数
     */
    RedPacket.prototype.dataFormat = function (data) {
        if (typeof data !== 'object') {
            return '';
        }
        else {
            var str = '?';
            for (var i in data) {
                str += i + '=' + data[i] + '&';
            }
            str = str.slice(0, -1);
            return str;
        }
    };

    /**
     * 领取红包
     *
     * @class
     * @param {string} url 接口地址
     * @param {string} parms 接口参数
     * @return {Promise}
     */
    RedPacket.prototype.getRedNew = function (url, parms) {
        var selF = this;
        var tips = $(this.element).find('.loading-icon');
        tips.css('display', 'block');
        return new Promise(function (resolve, reject) {
            fetchJsonp(url + selF.dataFormat(parms), {
                jsonpCallback: 'callback'
            }).then(function (res) {
                tips.css('display', 'none');
                return res.json();
            }).then(function (data) {
                if (data.status === 200) {
                    var res = data.info;
                    if (res.status === 'ACTIVE') {
                        $(selF.element).find('.popmask, .hb-popup').css('display', 'none');
                        resolve(data);
                    }
                    else if (res.status === 'OVER_CLAIM_TIMES') {
                        selF.tipMask('您已领取过该红包~');
                        $(selF.element).find('.popmask, .hb-popup').css('display', 'none');
                        close();
                        reject(data);
                    }
                    else {
                        reject(data);
                        selF.tipMask({text: res.info.msg});
                    }
                }
                else {
                    reject(data);
                    selF.tipMask({text: data.info});
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
        var selF = this;
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
                    selF.tipMask(data.info);
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
                var eleTop = $(ele.scrollClass).offset().top;
                if (location.host === 'm.jia.com' || util.platform.isAndroid()) {
                    if (scrollTop > 10 && eleTop > scrollTop + viewHei / 2) {
                        $(ele.class).parent().addClass('hide');
                    }
                    else {
                        $(ele.class).parent().removeClass('hide');
                    }

                    if (eleTop <= scrollTop + viewHei / 2) {
                        $(ele.class).parent().addClass('shake');
                    }
                    else {
                        $(ele.class).parent().removeClass('shake');
                    }
                }
                else {
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
            }
        });
    };


    // 提示层
    RedPacket.prototype.tipMask = function (msg, duration) {
        var selF = this;
        var $ele = $(selF.element);
        clearTimeout(window.tipMaskTimer);
        window.tipMaskTimer = null;
        duration = duration || 2000;
        if ($ele.find('.popup-maskedit').length > 0) {
            $ele.find('.popup-maskedit').remove();
        }
        $ele.append('<div class="popup-maskedit">' + msg + '</div>');
        window.tipMaskTimer = setTimeout(function () {
            $ele.find('.popup-maskedit').fadeOut(100, function () {
                $(this).remove();
            });
        }, duration);
    };


    // html代码在底部，页面进来时就要运行呈现给用户，所以用build
    customElement.prototype.build = function () {
        var self = this;
        var ele = this.element;
        var datas = this.element.querySelector(TYPE);
        var cfg = jsonParse(datas.textContent);
        var redPacket = new RedPacket(ele, cfg);
        var clickflag = false;

        // 添加
        redPacket.appendEle();

        // 显示弹层
        $(cfg.class).on('click', function (event) {
            $(this).parent().removeClass('hide');
            $(ele).find('.popmask, .hb-popup').css('display', 'block');
            open.call(self, event);
        });
        if (cfg.eventClass) {
            cfg.eventClass = cfg.eventClass.replace('.', '');
            var parent = document;
            parent.addEventListener('click', function (e) {
                var el = e.target;
                if ($(el).hasClass(cfg.eventClass)) {
                    $(el).parent().removeClass('hide');
                    $(ele).find('.popmask, .hb-popup').css('display', 'block');
                    open.call(self, e);
                }
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
            if (clickflag) {
                return false;
            }
            var tel = $(ele).find('.form-input');
            if (!regPhone.test(tel.val())) {
                redPacket.tipMask('请输入正确的手机号~');
                return;
            }
            clickflag = true;
            $(redPacket.element).find('.loading-icon').css('display', 'block');
            var redParms = {};
            var signParms = cfg.signRequest.parms;
            var pArray = [];
            for (var key in signParms) {
                if (signParms.hasOwnProperty(key)) {
                    pArray.push(key.concat('=', signParms[key]));
                }
            }

            // 报名成功页所需参数
            var bmPramas = {};

            function stepFour() {
                // 领取红包
                redPacket.getRedNew(cfg.newRedRequest, redParms).then(function (a) {
                    redPacket.tipMask('领取成功~');
                    tel.val('');
                    clickflag = false;
                    bmPramas['refer_url'] = window.location.href;
                    bmPramas['from_source'] = signParms.source;
                    bmPramas = JSON.stringify(bmPramas);
                    storage.set('bm_pramas', bmPramas);
                    window.top.location.href = cfg.signRequest.skipUrl;
                }, function (b) {
                    tel.val('');
                    clickflag = false;
                });
            }

            // 回调拆分二
            function stepTwo() {
                // 获取城市
                redPacket.getCity(cfg.cityUrl).then(function (city) {
                    var zxPhone = mobileEncrypt(tel.val(), 'zx');
                    pArray.push('mobile=' + zxPhone);
                    pArray.push('city=' + city);
                    bmPramas.zxphone = zxPhone;
                    bmPramas.zxcity = city;

                    // 装修报名
                    redPacket.signUp(cfg.signRequest.url, pArray.join('&')).then(function () {
                        redParms.mobile = zxPhone;
                        stepFour();
                    });
                });
            }

            stepTwo();
        });

    };

    return customElement;
});
