/**
 * @file mip-loadJS-tgb 组件
 * @author
 */

define(function (require) {
    'use strict';

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
                params.callback(params.listCode, params.type, params.count, params.codeid);
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
    function xjChange(listCode, type, count, codeid) {
        var arr = listCode.split(',');
        var codeNum = 0;
        var currentPrice = '--';
        var zdRateStr = '--';
        var riseFallAmount = '--';
        var zdRate = '--';
        for (var i = 0; i < arr.length; i++) {
            var code = arr[i];
            var hqObj = window['hq_str_' + code].split(',');
            currentPrice = '--';
            zdRateStr = '--';
            zdRate = '--';
            riseFallAmount = '--';
            if (hqObj.length > 1) {
                if ('A' === type) {
                    if (hqObj[3] !== 0) {
                        riseFallAmount = parseFloat(hqObj[3] - hqObj[2]).toFixed(2);
                        zdRate = (hqObj[3] - hqObj[2]) / hqObj[2] * 100;
                        zdRateStr = zdRate.toFixed(2) + '%';
                        currentPrice = parseFloat(hqObj[3]).toFixed(2);
                    } else {
                        currentPrice = '--';
                        riseFallAmount = '--';
                        zdRateStr = '--';
                    }
                } else if ('H' === type) {
                    currentPrice = parseFloat(hqObj[6]).toFixed(2);
                    zdRateStr = parseFloat(hqObj[8]).toFixed(2) + '%';
                    riseFallAmount = parseFloat(hqObj[7]).toFixed(2);
                } else if ('M' === type) {
                    currentPrice = parseFloat(hqObj[1]).toFixed(2);
                    zdRateStr = parseFloat(hqObj[2]).toFixed(2) + '%';
                    riseFallAmount = parseFloat(hqObj[4]).toFixed(2);
                } else if ('AHZ' === type) {
                // 上证，深证，创业，恒生 ,红筹 ,国企
                    currentPrice = parseFloat(hqObj[1]).toFixed(2);
                    zdRateStr = hqObj[3] + '%';
                    riseFallAmount = parseFloat(hqObj[2]).toFixed(2);
                } else if ('MZ' === type) {
                    currentPrice = parseFloat(hqObj[1]).toFixed(2);
                    zdRateStr = hqObj[2] + '%';
                    riseFallAmount = parseFloat(hqObj[4]).toFixed(2);
                }
                commonHtml(code, currentPrice, zdRateStr, riseFallAmount, type, count, codeid);
            }
        }
    }
    function commonHtml(code, currentPrice, zdRateStr, riseFallAmount, type, count, codeid) {
        var h1 = '';
        var h2 = '';
        var h3 = '';
        if (riseFallAmount > 0) {
        // 涨
            if ('H' === type || 'M' === type) {
                h1 += '<div class="gupiao_price_hm  zhang_color" >' + currentPrice;
                h1 += '</div><div class="gupiao_zdf_hm  zhang_color" >' + zdRateStr + '</div>';
            } else if ('A' === type) {
                h1 += '<div class="gupiao_price  zhang_color" >' + currentPrice;
                h1 += '</div><div class="gupiao_zde  zhang_color" >' + riseFallAmount;
                h1 += '</div><div class="gupiao_zdf  zhang_color">' + zdRateStr + '</div>';
            } else if ('AHZ' === type) {
                h1 += '<div class="top_data_price  zhang_color" >';
                h1 += currentPrice;
                h1 += '</div><div class="top_data_zhangfu"><span class="zhangfu_s  zhang_color" >';
                h1 += riseFallAmount;
                h1 += '</span><span class="zhangfu_b  zhang_color" >';
                h1 += zdRateStr + '</span></div></div>';
            }

        } else if (riseFallAmount < 0) {
        // 跌
            if ('H' === type || 'M' === type) {
                h2 += '<div class="gupiao_price_hm  die_color" >' + currentPrice;
                h2 += '</div><div class="gupiao_zdf_hm  die_color" >' + zdRateStr + '</div>';
            } else if ('A' === type) {
                h2 += '<div class="gupiao_price   die_color" >' + currentPrice;
                h2 += '</div><div class="gupiao_zde  die_color" >' + riseFallAmount;
                h2 += '</div><div class="gupiao_zdf  die_color" >' + zdRateStr + '</div>';
            } else if ('AHZ' === type) {
                h2 += '<div class="top_data_price  die_color" >';
                h2 += currentPrice;
                h2 += '</div><div class="top_data_zhangfu"><span class="zhangfu_s  die_color" >';
                h2 += riseFallAmount;
                h2 += '</span><span class="zhangfu_b  die_color" >';
                h2 += zdRateStr + '</span></div></div>';
            }
        } else {
        // 不涨不跌
            if ('H' === type || 'M' === type) {
                h3 += '<div class="gupiao_price_hm  other_color" >' + currentPrice;
                h3 += '</div><div class="gupiao_zdf_hm  other_color" >' + zdRateStr + '</div>';
            } else if ('A' === type) {
                h3 += '<div class="gupiao_price  other_color" >' + currentPrice;
                h3 += '</div><div class="gupiao_zde  other_color">';
                h3 += riseFallAmount + '</div><div class="gupiao_zdf  other_color" >' + zdRateStr + '</div>';
            } else if ('AHZ' === type) {
                h3 += '<div class="top_data_price  other_color" >';
                h3 += currentPrice;
                h3 += '</div><div class="top_data_zhangfu"><span class="zhangfu_s  other_color" >';
                h3 += riseFallAmount;
                h3 += '</span><span class="zhangfu_b  other_color" >';
                h3 += zdRateStr + '</span></div></div>';
            }
        }
        // type为类型，a为沪深，h为港股，m为美股，count为标识，其中three代表有当前价涨跌幅涨跌额，two代表有当前价，涨跌幅
        if (riseFallAmount > 0) {
        // 涨
            codeid.innerHTML = h1;
        } else if (riseFallAmount < 0) {
        // 跌
            codeid.innerHTML = h2;
        } else {
        // 不涨不跌
            codeid.innerHTML = h3;
        }
    }
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var code1 = element.getAttribute('code') || ' sh600330 ';
        var codetype1 = element.getAttribute('code-type') || ' A ';
        var codecount1 = element.getAttribute('code-count') || ' three ';
        var codeid1 = element.getAttribute('code-id') || '  ';
        var codeDataDiv = document.getElementById(codeid1);
        loadJS({
            src: 'https://hq.sinajs.cn/list=' + code1,
            charset: 'gb2312',
            callback: xjChange,
            listCode: code1,
            type: codetype1,
            count: codecount1,
            codeid: codeDataDiv
        });
    };
    return customElement;
});