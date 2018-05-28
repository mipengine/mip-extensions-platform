/**
 * @file mip-jia-design 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    var cityArr = ['上海', '北京', '天津', '重庆', '香港'];
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

    // 绑定事件
    customElement.prototype.setBtnFn = function () {
        var that = this;
        var params = that.data.params;
        for (var key in params) {
            if (that.validateParamEle(params[key])) {
                var $ele = $(params[key]);
                if ($ele.attr('type') === 'checkbox') {
                    that.checkboxFn($ele, key);
                }
            }
        }
        if (that.data.button === undefined || that.data.button === '') {
            return;
        }
        else {
            $(that.data.button).click(function () {
                if (that.$click) {
                    return;
                }
                that.$click = true;
                that.paramsFn();
            });
            that.getStorageObj();
        }
        $(that.data.loginbtn).click(function () {
            that.setStorageObj();
        });
    };

    customElement.prototype.paramsFn = function () {
        var that = this;
        var request = that.data.request;
        var params = that.data.params;
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
            else if (params[key].indexOf('[') > -1) {
                var arr = params[key].match(/\[[.#][\w-]+\]/g);
                for (var i = 0; i < arr.length; i++) {
                    var x = arr[i].replace(/\[|\]/g, '');
                    params[key] = params[key].replace(arr[i], $(x).val() || $(x).html());
                }
            }
        }
        if (params.city) {
            var city = params.city;
            city = city.replace(/\s+/g, ' ');
            var $city = city.split(' ');
            if ($.inArray($city[0], cityArr) > -1) {
                params.city = $city[0];
            }
            else {
                params.city = $city[1];
            }
        }
        console.log(that.data.params);
        that.sendAjax();
    };

    customElement.prototype.sendAjax = function () {
        var that = this;
        var $self = $(that.element);
        if (!that.data.request.url) {
            console.error('请求url为空');
            that.$click = false;
            return;
        }
        $.ajax({
            url: that.data.request.url,
            type: 'get',
            dataType: 'jsonp',
            jsonpCallback: 'callback',
            data: {params: JSON.stringify(that.data.params)},
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
                if (result.status_code === 200) {
                    that['tp_order_id'] = result.bid_id;
                    var $url = that.data.request.skipto;
                    if (!$url) {
                        console.error('跳转url为空');
                        return;
                    }
                    $url = decodeURIComponent($url);
                    if ($url.indexOf('$') > -1) {
                        var arr = $url.match(/\$[.#]*[\w-]+\$/g);
                        for (var i = 0; i < arr.length; i++) {
                            var x = arr[i].replace(/\$/g, '');
                            $url = $url.replace(arr[i], $(x).val() || $(x).html());
                        }
                    }
                    if (that.data.params.is_free === 'true') {
                        window.top.location.href = result.cashier_url;
                    }
                    else {
                        window.top.location.href = $url;
                    }
                }
                else {
                    that.tipMask(result.message);
                }
            }
        });
    };

    customElement.prototype.setStorageObj = function () {
        var that = this;
        var params = that.data.params;
        var obj = {};
        for (var key in params) {
            if (that.validateParamEle(params[key])) {
                obj[params[key]] = $(params[key]).val();
            }
        }
        storage.set('obj', JSON.stringify(obj), 86400000);
    };

    customElement.prototype.getStorageObj = function () {
        var that = this;
        if (storage.get('obj')) {
            var obj = JSON.parse(storage.get('obj'));
            for (var key in obj) {
                if ($(key).attr('type') === 'checkbox') {
                    switch (obj[key]) {
                        case '0':
                            $(key).removeAttr('checked').val('0').siblings('.check-icon').removeClass('cur');
                            break;
                        case '1':
                            $(key).attr('checked', true).val('1').siblings('.check-icon').addClass('cur');
                            break;
                    }
                }
                else {
                    $(key).val(obj[key]);
                }

            }
            $(that.data.button).trigger('click');
            storage.rm('obj');
        }
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

    // 处理checkbox
    customElement.prototype.checkboxFn = function (ele, key) {
        var that = this;

        function fn(t) {
            if (t.checked) {
                $(t).val(1).siblings('.check-icon').addClass('cur');
            } else {
                $(t).val(0).siblings('.check-icon').removeClass('cur');
            }
        }

        fn(ele[0]);
        ele.on('click', function () {
            fn(this);
        });
    };

    /**
     * 按钮在底部，需提前渲染，并绑定事件，故用build
     */
    customElement.prototype.build = function () {
        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        if (elemObj) {
            this.data = JSON.parse(elemObj.textContent.toString());
        }
        this.setBtnFn();
    };

    return customElement;
});
