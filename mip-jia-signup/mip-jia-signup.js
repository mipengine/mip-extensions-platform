/**
 * @file mip-jia-signup 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    // 获取url参数，返回键值对object
    var urlHrefObject = (function () {
        var hrefUrlArr = [];
        var obj = {};
        if (window.location.search.substr(1) && window.location.search.substr(1).length > 2) {
            hrefUrlArr = window.location.search.substr(1).split('&');
            for (var i = 0; i < hrefUrlArr.length; i++) {
                var arr = hrefUrlArr[i].split('=');
                obj[arr[0]] = arr[1];
            }
            return obj;
        }
    })();

    function sendAjax(options) {
        $.ajax({
            url: options.url,
            type: 'get',
            dataType: 'jsonp',
            jsonp: options.jsonp,
            data: options.params,
            beforeSend: function () {
                if ($('.loading-common').length === 0) {
                    $('body').append('<div class="loading-common"></div>');
                }
                $('.loading-common').show();
            },
            error: function () {
                tipMask('系统繁忙，请稍后再试！');
                $('.loading-common').hide();
            },
            success: function (result) {
                $('.loading-common').hide();
                if (result[options.status] === options.statusval) {
                    typeof options.success === 'function' && options.success(result);
                }
                else {
                    if (!options.failed) {
                        return false;
                    }
                    var arr = options.failed.split('.');
                    for (var i = 0; i < arr.length; i++) {
                        result = result[arr[i]];
                    }
                    tipMask(result);
                }
                $('[emptyvalue="true"]').each(function () {
                    if (/^1[3|4|5|7|8]\d{9}$/.test($(this).val())) {
                        $(this).val('');
                    }
                });
            }
        });
    }

    // [装修、团购、旺铺] 公钥
    var keyArr = {
        'zx': 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8hgXGmTam'
        + '/ZBj9q8UteZ+1Z0sja7g7gQBR1RxfVJBbxGMwLgmW2uc+ij4F'
        + 'fFsr6poM2IO64JfDxl+9H1tmEq6kEmuju7ue4b/4KcMTftKGjr+'
        + 'DtbNiwtFhLKIU6iQRKjetWor8pj7/arhR5weSh04AWwEFQNsQchqM2eA7gEs2wIDAQAB',
        'tg': 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCC0w+gQPas'
        + 'CFul1A/LVYfU4A2C0niMgcb9t+nftc5behMmf5l0aT6fmMa1e+'
        + 'wdfmzleVljEaFcnVi/yOY13HqPa5fymwkVC6k+7beVnFUTDUSK5'
        + 'SJTep+jSHmNCKPM+nVhm2xQu+SjZbxbeIiFdm0mfSJH/8faNXdiWU4rv9NuwIDAQAB',
        'wp': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAurXXoxX'
        + 'AHK4vwRMDDQRFhkQH6tDbVN/k69JGBAGxm2N4+2TVDCKWrBqKjgm'
        + 'jQSqubHiURa9O3bfAXUDYyV7S3/Vajc+NP0kU0l6Fl8q4AldSsQkSf'
        + 'Lq5NrcxU0QsXJbfRCEIyS+lfG9/O+XGVrvpy21hOqs6Zmgvsa5//d6BT'
        + 'C31FOb/d9H4C/iFgIXqAvcEJms+agPpXTMDDjxbB6/6P8qZoqKR1iztv3'
        + 'bzwowU7YRpMVwwdr74K+ka7p0Y+KnnE4oiX3b5rDfQ/GOdG9OJhpGMAUkpR'
        + 'jXy01hu9bT+ep7sYTlhVPhwr+8OICO7tsxNoNW7InOix26oY0IvqWcGjwIDAQAB'
    };

    // 手机号加密
    function loadEncrypt() {
        if (typeof JSEncryptExports !== 'object') {
            var loadNode = document.createElement('script');
            loadNode.type = 'text/javascript';

            // 手机号加密js
            loadNode.src = '//mued2.jia.com/js/mobile/jsencrypt.js';
            document.body.appendChild(loadNode);
        }
    }

    /**
     * 加密手机号
     *
     * @class
     * @param {number or string} phone 手机号
     * @param {string} type 接口类型：zx(装修)、tg(团购)、wp(旺铺)
     */

    function mobileEncrypt(phone, type) {
        /* global JSEncryptExports */
        var JSEncrypt = new JSEncryptExports.JSEncrypt();
        JSEncrypt.setKey(keyArr[type]);
        return JSEncrypt.encrypt(phone);
    }

    // 设置点击事件
    function setBtnFn(data, that) {
        var obj = $(that);
        if (typeof (data.button) === 'undefined') {
            return false;
        }
        if (data.button === undefined || data.button === '') {
            getBtnAjax(data, obj);
        }
        else {
            // 按钮事件
            $(data.button).click(function () {
                getBtnAjax(data, obj);
            });
        }
        // 加密
        loadEncrypt();
    }

    // 验证参数是否是class或id
    function validateParamEle(str) {
        if (typeof str === 'string' && (str.indexOf('.') === 0 || str.indexOf('#') === 0)) {
            return true;
        } else {
            return false;
        }
    }

    // 获取城市
    function cityFn(callback) {
        if (!storage.get('city')) {
            $.ajax({
                url: '//m.jia.com/city/getCurrentAreaNew',
                type: 'get',
                dataType: 'jsonp',
                success: function (a) {
                    if (a.code > 0) {
                        var city = JSON.stringify(a.result.site.area_info);
                        storage.set('city', city, 21600000);
                        typeof callback === 'function' && callback();
                    }
                },
                error: function (a) {
                    console.log('获取城市失败');
                }
            });
        }
    }

    cityFn();

    function forEachFn(data, obj, i, fn) {
        var getUrl = data.url[i];
        if (typeof data.jsonptypes !== 'undefined') {
            var jsonType = data.jsonptypes[i];
        }
        else {
            var jsonType = 'callback';
        }
        if (!getUrl) {
            return false;
        }
        var params = {};
        for (var pkey in data.params[i]) {
            params[pkey] = data.params[i][pkey];
        }
        var $success = data.success[i];
        for (var key in params) {
            // 传入参数不是字符串
            if (typeof params[key] !== 'string') {
                continue;
            }
            if (validateParamEle(params[key])) {
                var $ele = $(params[key]);
                if (data.params.length - 1 === i) {
                    $ele.attr('emptyvalue', true);
                }
                var $val = $.trim($ele.val());
                if ($ele.attr('request') && $val === '') {
                    tipMask($ele.attr('errortxt'));
                    $('.loading-common').hide();
                    return false;
                }
                if ($ele.attr('validatereg')) {
                    var reg = new RegExp($ele.attr('validatereg'));
                    if (!reg.test($val)) {
                        tipMask($ele.attr('regtxt'));
                        $('.loading-common').hide();
                        return false;
                    }
                }
                params[key] = $val;
            }
            else if (params[key].indexOf('city-') === 0) {
                if (storage.get('city')) {
                    var city = JSON.parse(storage.get('city'));
                    switch (params[key]) {
                        case 'city-area_py':
                            params[key] = city['area_py'];
                            break;
                        case 'city-area_cn':
                            params[key] = city['area_cn'];
                            break;
                        case 'city-city_cn':
                            params[key] = city['city_cn'];
                            break;
                        case 'city-city_py':
                            params[key] = city['city_py'];
                            break;
                    }
                }
                else {
                    cityFn(function () {
                        var city = JSON.parse(storage.get('city'));
                        switch (params[key]) {
                            case 'city-area_py':
                                params[key] = city['area_py'];
                                break;
                            case 'city-area_cn':
                                params[key] = city['area_cn'];
                                break;
                            case 'city-city_cn':
                                params[key] = city['city_cn'];
                                break;
                            case 'city-city_py':
                                params[key] = city['city_py'];
                                break;
                        }
                    });
                }
            }
            else if (params[key].indexOf('[') > -1) {
                var arr = params[key].match(/\[[.#][\w-]+\]/g);
                for (var i = 0; i < arr.length; i++) {
                    var x = arr[i].replace(/\[|\]/g, '');
                    params[key] = params[key].replace(arr[i], $(x).val() || $(x).html());
                }
            } else if (params[key].indexOf('{') > -1) {
                if (params[key].indexOf('#') > -1 || params[key].indexOf('.') > -1) {
                    var objParams = {};
                    var dParams = params[key].replace(/'/g, '"');
                    var newParams = JSON.parse(dParams);
                    for (var key2 in newParams) {
                        if (validateParamEle(newParams[key2])) {
                            var $ele2 = $(newParams[key2]);
                            if (data.params.length - 1 === i) {
                                $ele2.attr('emptyvalue', true);
                            }
                            var $val2 = $.trim($ele2.val());
                            if ($ele2.attr('request') && $val2 === '') {
                                tipMask($ele2.attr('errortxt'));
                                $('.loading-common').hide();
                                return false;
                            }
                            if ($ele2.attr('validatereg')) {
                                var reg2 = new RegExp($ele2.attr('validatereg'));
                                if (!reg2.test($val2)) {
                                    tipMask($ele2.attr('regtxt'));
                                    $('.loading-common').hide();
                                    return false;
                                }
                            }
                            objParams[key2] = $val2;
                        }
                    }
                    objParams = JSON.stringify(objParams);
                    params[key] = objParams;
                }
                else {
                    var sParams = params[key].replace(/'/g, '"');
                    params[key] = sParams;
                }
            } else if (params[key].indexOf('bd-') === 0) {
                var newBd = params[key].split('bd-')[1];
                if (urlHrefObject[newBd]) {
                    params[key] = urlHrefObject[newBd];
                }
                else {
                    params[key] = '3209171095';
                }
            }
            // 手机号加密
            if (/^1[3|4|5|7|8]\d{9}$/.test(params[key])) {
                params[key] = mobileEncrypt(params[key], params.encrypt || 'zx');
            }
        }
        sendAjax({
            url: getUrl,
            jsonp: jsonType,
            params: params,
            status: $success['status'],
            statusval: $success['statusval'],
            failed: $success['failed'],
            success: function (data) {
                if ($success['suc']) {
                    var arr = $success['suc'].split('.');
                    var $data = data;
                    for (var i = 0; i < arr.length; i++) {
                        $data = $data[arr[i]];
                    }
                }
                if ($success['type'] === 'html') {
                    $($success['element']).append($data);
                }
                else if ($success['type'] === 'form') {
                    if ($($success['element']).length > 0) {
                        $($success['element']).val($data);
                    }
                    else {
                        if ($success['element'].indexOf('.') === 0) {
                            var a = $success['element'].replace(/^\./, '');
                            $('body').append('<input type="hidden" class="' + a + '" value="' + $data + '" />');
                        }
                        else if ($success['element'].indexOf('#') === 0) {
                            var a = $success['element'].replace(/^#/, '');
                            $('body').append('<input type="hidden" id="' + a + '" value="' + $data + '" />');
                        }
                    }
                }
                else if ($success['type'] === 'text') {
                    if (typeof $data === 'undefined') {
                        tipMask($success['value']);
                    }
                    else {
                        tipMask($data);
                    }
                }
                else if ($success['type'] === 'url') {
                    var $url;
                    if (typeof $data === 'undefined') {
                        $url = $success['value'];
                    }
                    else {
                        $url = $data;
                    }
                    $url = decodeURIComponent($url);
                    if ($url.indexOf('$') > -1) {
                        var arr = $url.match(/\$[.#]*[\w-]+\$/g);
                        for (var i = 0; i < arr.length; i++) {
                            var x = arr[i].replace(/\$/g, '');
                            if (x.indexOf('city-') === 0) {
                                if (storage.get('city')) {
                                    var city = JSON.parse(storage.get('city'));
                                    switch (x) {
                                        case 'city-area_py':
                                            x = city['area_py'];
                                            break;
                                        case 'city-area_cn':
                                            x = city['area_cn'];
                                            break;
                                        case 'city-city_cn':
                                            x = city['city_cn'];
                                            break;
                                        case 'city-city_py':
                                            x = city['city_py'];
                                            break;
                                    }
                                }
                                else {
                                    cityFn(function () {
                                        var city = JSON.parse(storage.get('city'));
                                        switch (x) {
                                            case 'city-area_py':
                                                x = city['area_py'];
                                                break;
                                            case 'city-area_cn':
                                                x = city['area_cn'];
                                                break;
                                            case 'city-city_cn':
                                                x = city['city_cn'];
                                                break;
                                            case 'city-city_py':
                                                x = city['city_py'];
                                                break;
                                        }
                                    });
                                }
                                $url = $url.replace(arr[i], x);
                            }
                            else {
                                $url = $url.replace(arr[i], $(x).val() || $(x).html());
                            }
                        }
                    }
                    window.top.location.href = $url;
                }
                else if ($success['type'] === 'class') {
                    $($success['element']).addClass($success['value']);
                }
                typeof fn === 'function' && fn();
            }
        });
    }

    // 报名ajax
    function getBtnAjax(data, obj) {
        var i = 0;
        var len = data.url.length - 1;

        function fn() {
            i++;
            if (i > len) {
                return false;
            }
            forEachFn(data, obj, i, fn);
        }

        forEachFn(data, obj, i, fn);
    }

    // 弹出提示层
    function tipMask(msg, duration) {
        clearTimeout(window.tipMaskTimer);
        window.tipMaskTimer = null;
        duration = duration || 2000;
        if ($('.popup-maskEdit').length > 0) {
            $('.popup-maskEdit').remove();
        }
        $('body').append('<div class="popup-maskEdit">' + msg + '</div>');
        window.tipMaskTimer = setTimeout(function () {
            $('.popup-maskEdit').fadeOut(100, function () {
                $(this).remove();
            });
        }, duration);
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElement.prototype.firstInviewCallback = function () {
        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
        }
        catch (e) {
            thisObj.innerHTML = '';
            return false;
        }
        setBtnFn(data, thisObj);
    };
    return customElement;
});
