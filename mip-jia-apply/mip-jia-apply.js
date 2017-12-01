/**
 * @file mip-jia-apply 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);


    function sendAjax(options) {
        $.ajax({
            url: options.url,
            type: 'get',
            dataType: 'jsonp',
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
    }

    // 验证参数是否是class或id
    function validateParamEle(str) {
        if (str.indexOf('.') === 0 || str.indexOf('#') === 0) {
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
        if (!getUrl) {
            return false;
        }
        var params = data.params[i];
        var $success = data.success[i];
        for (var key in params) {
            if (validateParamEle(params[key])) {
                var $ele = $(params[key]);
                $ele.attr('emptyvalue', true);
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
            }
        }

        sendAjax({
            url: getUrl,
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
                    location.href = $url;
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
        duration = duration || 2000;
        if ($('.popup-maskEdit').length > 0) {
            $('.popup-maskEdit').remove();
        }
        $('body').append('<div class="popup-maskEdit">' + msg + '</div>');
        var tipMaskTimer = setTimeout(function () {
            $('.popup-maskEdit').fadeOut(100, function () {
                $(this).remove();
            });
            clearTimeout(tipMaskTimer);
        }, duration);
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElement.prototype.build = function () {
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
