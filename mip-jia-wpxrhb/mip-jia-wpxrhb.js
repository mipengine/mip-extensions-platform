/**
 * @file mip-jia-wpxrhb 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();


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
     * @param {number or string} phone 手机号
     * @param {string} type 接口类型：zx(装修)、tg(团购)、wp(旺铺)
     */

    function mobileEncrypt(phone, type) {
        /* global JiaJSEncrypt */
        var JSEncrypt = new JiaJSEncrypt();
        JSEncrypt.setKey(keyArr[type]);
        return JSEncrypt.encrypt(phone);
    }

    // 发送请求
    customElement.prototype.sendAjax = function (pa) {
        var that = this;
        var $self = $(that.element);
        if (!that.data.request.url) {
            console.error('请求url为空');
            that.$click = false;
            return;
        }
        $.ajax({
            url: that.data.request.url,
            type: 'post',
            data: pa,
            beforeSend: function () {
                if ($self.find('.loading-common').length === 0) {
                    $self.append('<div class="loading-common"></div>');
                }
                $self.find('.loading-common').show();
            },
            error: function () {
                that.tipMask('系统繁忙，请稍后再试！');
                $self.find('.loading-common').hide();
                that.$click = false;
            },
            success: function (result) {
                $self.find('.loading-common').hide();
                that.$click = false;
                var response = that.data.response;
                if (response.statusVal && $.isArray(response.statusVal)) {
                    var len = response.statusVal.length;
                    for (var i = 0; i < len; i++) {
                        if (result[response.statusName] === response.statusVal[i].n) {
                            if (response.statusVal[i].v === 'skipto') {
                                window.top.location.href = response.skipurl;
                            }
                            else {
                                that.tipMask(result[response.statusVal[i].v]);
                            }
                            break;
                        }
                    }
                }
                $self.find('input').each(function () {
                    if (/^1[3|4|5|7|8]\d{9}$/.test($(this).val())) {
                        $(this).val('');
                    }
                });
            }
        });
    };

    // 提示层
    var tipMaskTimer = null;
    customElement.prototype.tipMask = function (msg, duration) {
        var self = this;
        var $self = $(self.element);
        clearTimeout(tipMaskTimer);
        duration = duration || 2000;
        if ($self.find('.popup-maskEdit').length > 0) {
            $self.find('.popup-maskEdit').remove();
        }
        $($self).append('<div class="popup-maskEdit">' + msg + '</div>');
        tipMaskTimer = setTimeout(function () {
            $self.find('.popup-maskEdit').fadeOut(100, function () {
                $(this).remove();
            });
        }, duration);
    };

    // 参数处理
    customElement.prototype.paramsFn = function () {
        var that = this;
        var params = {};
        for (var pkey in that.data.params) {
            params[pkey] = that.data.params[pkey];
        }
        var $self = $(that.element);
        for (var key in params) {

            // 修复非字符串参数报错
            if (typeof params[key] !== 'string') {
                continue;
            }
            if (that.validateParamEle(params[key])) {
                var $ele = $(params[key]);
                var $val = $.trim($ele.val());
                if ($ele.attr('request') && $val === '') {
                    that.tipMask($ele.attr('errortxt') || '不能为空');
                    $self.find('.loading-common').hide();
                    that.$click = false;
                    return;
                }
                if ($ele.attr('validatereg')) {
                    var reg = new RegExp($ele.attr('validatereg'));
                    if (!reg.test($val)) {
                        that.tipMask($ele.attr('regtxt') || '不符合规范');
                        $self.find('.loading-common').hide();
                        that.$click = false;
                        return;
                    }
                }
                params[key] = $val;
            }
            // 手机号加密
            if (/^1[3|4|5|6|7|8|9]\d{9}$/.test(params[key])) {
                params[key] = mobileEncrypt(params[key], that.data.encrypt || 'zx');
            }
        }
        that.sendAjax(params);
    };

    // 验证参数
    customElement.prototype.validateParamEle = function (str) {
        if (typeof str === 'string' && (str.indexOf('.') === 0 || str.indexOf('#') === 0)) {
            return true;
        }
        else {
            return false;
        }
    };

    // 绑定事件
    customElement.prototype.setBtnFn = function () {
        var that = this;
        $(that.data.bindEle).on('click', function () {
            if (that.$click) {
                return;
            }
            that.$click = true;
            that.paramsFn();
        });
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        if (elemObj) {
            this.data = JSON.parse(elemObj.textContent.toString());
        }
        this.setBtnFn();
    };

    return customElement;
});
