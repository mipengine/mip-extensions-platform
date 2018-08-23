/**
 * @file mip-code-msg 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var loadJS = function (params) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.onload = script.onreadystatechange = script.onerror = function () {
            if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) {
                return;
            }
            script.onload = script.onreadystatechange = script.onerror = null;
            script.src = '';
            script.parentNode.removeChild(script);
            script = null;
            if (params.listCode) {
                params.callback(params.listCode, params.element);
            } else {
                params.callback();
            }
        };
        script.charset = params.charset || document.charset || document.characterSet || 'gb2312';
        script.src = params.src;
        try {
            head.appendChild(script);
        } catch (exp) {}
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var codelist = element.getAttribute('code') || '';
        if (codelist.substring(0, 2) === 'sh'
        || codelist.substring(0, 2) === 'sz'
        || codelist.substring(0, 2) === 'hk'
        || codelist.substring(0, 2) === 'gb') {

        } else {
            codelist = 'gb_' + codelist.toLowerCase();
        };
        loadJS({
            src: 'https://hq.sinajs.cn/list=' + codelist,
            charset: 'gb2312',
            callback: xjChangeA,
            listCode: codelist,
            element: element
        });
    };
    function xjChangeA(listCode, element) {
        // 三元数组 利用数组进行排序
        var arr = listCode.split(',');
        var codeNum = 0;
        // 当前价
        var currentPrice = '--';
        // 涨跌幅
        var zdRateStr = '--';
        // 涨跌额
        var riseFallAmount = '--';
        var zdRate = '--';
        // 今开
        var todayStartPri = '--';
        // 昨收
        var yestodEndPri = '--';
        // 最高
        var todayMax = '--';
        // 最低
        var todayMin = '--';
        // 时间
        var datetime = '--';
        for (var i = 0; i < arr.length; i++) {
            // 这里集合长度只有1
            var code = arr[i];
            var hqObj = window['hq_str_' + code].split(',');
            currentPrice = '--';
            zdRateStr = '--';
            zdRate = '--';
            riseFallAmount = '--';
            // 今开
            todayStartPri = '--';
            // 昨收
            yestodEndPri = '--';
            // 最高
            todayMax = '--';
            // 最低
            todayMin = '--';
            datetime = '--';
            if (hqObj.length > 1) {
                if (code.substring(0, 2) === 'sz' || code.substring(0, 2) === 'sh') {
                    // 泸深
                    if (hqObj[3] !== 0) {
                        // 泸深当前价格不为0计算才有意义
                        zdRate = (hqObj[3] - hqObj[2]) / hqObj[2] * 100;
                        if (zdRate > 0) {
                            // 涨跌幅
                            zdRateStr = '+' + zdRate.toFixed(2) + '%';
                            // 涨跌额
                            riseFallAmount = '+' + parseFloat(hqObj[3] - hqObj[2]).toFixed(2);
                        } else {
                            zdRateStr = zdRate.toFixed(2) + '%';
                            riseFallAmount = parseFloat(hqObj[3] - hqObj[2]).toFixed(2);
                        }
                        currentPrice = '¥' + parseFloat(hqObj[3]).toFixed(2);
                    } else {
                        riseFallAmount = parseFloat(0).toFixed(2);
                        zdRate = 0;
                        zdRateStr = zdRate.toFixed(2) + '%';
                        currentPrice = '¥' + parseFloat(hqObj[3]).toFixed(2);
                    }
                    todayStartPri = parseFloat(hqObj[1]).toFixed(2);
                    yestodEndPri = parseFloat(hqObj[2]).toFixed(2);
                    todayMax = parseFloat(hqObj[4]).toFixed(2);
                    todayMin = parseFloat(hqObj[5]).toFixed(2);
                    datetime = hqObj[30] + '  ' + hqObj[31] + ' (北京时间)';
                } else if (code.substring(0, 2) === 'hk') {
                    currentPrice = 'HK$' + parseFloat(hqObj[6]).toFixed(2);
                    if (hqObj[8] > 0) {
                        zdRateStr = '+' + hqObj[8] + '%';
                        riseFallAmount = '+' + parseFloat(hqObj[7]).toFixed(2);
                    } else {
                        zdRateStr = hqObj[8] + '%';
                        riseFallAmount = parseFloat(hqObj[7]).toFixed(2);
                    }
                    // 今开
                    todayStartPri = parseFloat(hqObj[2]).toFixed(2);
                    // 昨收
                    yestodEndPri = parseFloat(hqObj[3]).toFixed(2);
                    // 最高
                    todayMax = parseFloat(hqObj[4]).toFixed(2);
                    // 最低
                    todayMin = parseFloat(hqObj[5]).toFixed(2);
                    datetime = hqObj[17] + '  ' + hqObj[18] + ' (北京时间)';
                } else {
                    // 美股
                    currentPrice = '$' + parseFloat(hqObj[1]).toFixed(2);
                    if (hqObj[2] > 0) {
                        zdRateStr = '+' + hqObj[2] + '%';
                        riseFallAmount = '+' + parseFloat(hqObj[4]).toFixed(2);
                    } else {
                        zdRateStr = hqObj[2] + '%';
                        riseFallAmount = parseFloat(hqObj[4]).toFixed(2);
                    }
                    // 今开
                    todayStartPri = parseFloat(hqObj[21]).toFixed(2);
                    // 昨收
                    yestodEndPri = parseFloat(hqObj[26]).toFixed(2);
                    // 最高
                    todayMax = parseFloat(hqObj[6]).toFixed(2);
                    // 最低
                    todayMin = parseFloat(hqObj[7]).toFixed(2);
                    datetime = hqObj[25] + ' (美东时间)';
                }
                commonHtml(code, currentPrice, zdRateStr, riseFallAmount,
                todayStartPri, yestodEndPri, todayMax, todayMin, datetime, element);
            }
        }
    }

    function commonHtml(code, currentPrice, zdRateStr, riseFallAmount,
     todayStartPri, yestodEndPri, todayMax, todayMin, datetime, element) {
        var util = require('util');
        if (code.substring(0, 2) === 'sh' || code.substring(0, 2) === 'sz') {
            element.querySelector('#todayStartPri').innerHTML = todayStartPri;
            element.querySelector('#yestodEndPri').innerHTML = yestodEndPri;
            if (todayStartPri >= yestodEndPri) {
                util.css(element.querySelector('#todayStartPri'), 'color', '#ed3713');
            } else {
                util.css(element.querySelector('#todayStartPri'), 'color', '#0bb60b');
            }
            if (todayMin >= yestodEndPri) {
                util.css(element.querySelector('#todayMin'), 'color', '#ed3713');
            } else {
                util.css(element.querySelector('#todayMin'), 'color', '#0bb60b');
            }
            if (todayMax >= yestodEndPri) {
                util.css(element.querySelector('#todayMax'), 'color', '#ed3713');
            } else {
                util.css(element.querySelector('#todayMax'), 'color', '#0bb60b');
            }
            // 最高
            element.querySelector('#todayMax').innerHTML = todayMax;
            // 最低
            element.querySelector('#todayMin').innerHTML = todayMin;
            // 时间
            element.querySelector('#datetime').innerHTML = datetime;
        }
        // 当前价
        element.querySelector('#currentPrice').innerHTML = currentPrice;
        // 涨跌额
        $('#riseFallAmount').text(riseFallAmount);
        if (riseFallAmount > 0) {
            util.css(element.querySelectorAll('.mhq_top'), 'background', '#ed3713');
        } else if (riseFallAmount < 0) {
            util.css(element.querySelectorAll('.mhq_top'), 'background', '#0bb60b');
        } else {
            util.css(element.querySelectorAll('.mhq_top'), 'background', '#ccc');
        }
        // 涨跌幅
        element.querySelector('#zdRateStr').innerHTML = zdRateStr;
    }
    return customElement;
});