/**
 * @file mip-liAHMclick 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        element.querySelector('#titA').onclick = function () {
            var classVal =  element.querySelector('#lia').getAttribute('class');
            classVal = classVal.replace('active', '');
            element.querySelector('#lia').setAttribute('class', classVal);
            element.querySelector('#lib').setAttribute('class', classVal);
            element.querySelector('#lic').setAttribute('class', classVal);
            var util = require('util');
            util.css(element.querySelector('#titA'), 'color', '#5a97c1');
            util.css(element.querySelector('#titH'), 'color', '#333');
            util.css(element.querySelector('#titM'), 'color', '#333');
            util.css(element.querySelector('#aHM'), 'display', 'block');
            util.css(element.querySelector('#AhM'), 'display', 'none');
            util.css(element.querySelector('#AHm'), 'display', 'none');
            element.querySelector('#lia').classList.add('active');
        };
        element.querySelector('#titH').onclick = function () {
            var classVal =  element.querySelector('#lia').getAttribute('class');
            classVal = classVal.replace('active', '');
            element.querySelector('#lia').setAttribute('class', classVal);
            element.querySelector('#lib').setAttribute('class', classVal);
            element.querySelector('#lic').setAttribute('class', classVal);
            var util = require('util');
            util.css(element.querySelector('#titH'), 'color', '#5a97c1');
            util.css(element.querySelector('#titA'), 'color', '#333');
            util.css(element.querySelector('#titM'), 'color', '#333');
            element.querySelector('#H_stocke').innerHTML = '';
            asyncfun('/getHMData?stocktype=H', function (data) {
                codeHMback(data, element, 'H');
            });
            util.css(element.querySelector('#AhM'), 'display', 'block');
            util.css(element.querySelector('#aHM'), 'display', 'none');
            util.css(element.querySelector('#AHm'), 'display', 'none');
            element.querySelector('#lib').classList.add('active');
        };
        element.querySelector('#titM').onclick = function () {
            var classVal =  element.querySelector('#lia').getAttribute('class');
            classVal = classVal.replace('active', '');
            element.querySelector('#lia').setAttribute('class', classVal);
            element.querySelector('#lib').setAttribute('class', classVal);
            element.querySelector('#lic').setAttribute('class', classVal);
            var util = require('util');
            util.css(element.querySelector('#titM'), 'color', '#5a97c1');
            util.css(element.querySelector('#titH'), 'color', '#333');
            util.css(element.querySelector('#titA'), 'color', '#333');
            asyncfun('/getHMData?stocktype=M', function (data) {
                codeHMback(data, element, 'M');
            });
            util.css(element.querySelector('#AHm'), 'display', 'block');
            util.css(element.querySelector('#AhM'), 'display', 'none');
            util.css(element.querySelector('#aHM'), 'display', 'none');
            element.querySelector('#lic').classList.add('active');
        };
    };
    function codeHMback(data, element, type) {
        if (data.status === true) {
            var list = data.dto.listStock;
            var html = htmlHM(list, type);
            if (type === 'H') {
                $('#H_stocke', element).html(html);
                // 港股数据添加
                var codelist = '';
                for (var i = 0; i < list.length; i++) {
                    if (i === (list.length - 1)) {
                        codelist += list[i].keywordName;
                    } else {
                        codelist += list[i].keywordName + ',';
                    }
                    var id = 'l_' + list[i].keywordName;
                    var html2 = '<mip-loadJS-tgb code="' + list[i].keywordName + '"code-id="';
                    html2 += id + '"+ code-type="H" code-count="two"></mip-loadJS-tgb>';
                    $('#H_stocke', element).append(html2);
                }
            } else if (type === 'M') {
                $('#M_stocke', element).html(html);
                // 美股数据添加
                var codelist = '';
                // 需要判断股票代码是否以gb_开头
                for (var i = 0; i < list.length; i++) {
                    var head = list[i].keywordName.toLowerCase().substring(0, 3);
                    if (i === (list.length - 1)) {
                        if ('gb_' === head) {
                            codelist += list[i].keywordName.toLowerCase();
                        } else {
                            codelist += 'gb_' + list[i].keywordName.toLowerCase();
                        }
                    } else {
                        if ('gb_' === head) {
                            codelist += list[i].keywordName.toLowerCase() + ',';
                        } else {
                            codelist += 'gb_' + list[i].keywordName.toLowerCase() + ',';
                        }
                    }
                    if ('gb_' === head) {
                        var id = 'l_' + list[i].keywordName.toLowerCase();
                        var html2 = '<mip-loadJS-tgb code="' + list[i].keywordName.toLowerCase() + '"code-id="';
                        html2 += id + '"+ code-type="M" code-count="two"></mip-loadJS-tgb>';
                        $('#M_stocke').append(html2);
                    } else {
                        var id = 'l_gb_' + list[i].keywordName.toLowerCase();
                        var code = 'gb_' + list[i].keywordName.toLowerCase();
                        var html2 = '<mip-loadJS-tgb code="' + code + '"code-id="';
                        html2 += id + '"+ code-type="M" code-count="two"></mip-loadJS-tgb>';
                        $('#M_stocke', element).append(html2);
                    }
                }

            }
        }
    }
    function htmlHM(list, type) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            html += '<div class="zfb_list_gupiao">' + '<a  id=' + list[i].keywordID + '  href="/mip/quotes/';
            html += list[i].keywordName + '"><div class="gupiao_name">' + list[i].keywordName;
            html += '</div></a>' + '<a    href="/mip/quotes/' + list[i].keywordName;
            html += '"><div class="gupiao_name_hm  gangmei_name" >' + list[i].stockName + '</div></a>';
            if ('M' === type) {
                if (list[i].keywordName.toLowerCase().substring(0, 3) === 'gb_') {
                    html += '<div id=l_' + list[i].keywordName.toLowerCase() + '   class="gupiao_zhi_hm">';
                } else {
                    html += '<div id=l_gb_' + list[i].keywordName.toLowerCase() + '   class="gupiao_zhi_hm">';
                }
            } else {
                html += '<div id=l_' + list[i].keywordName + '   class="gupiao_zhi_hm">';
            }
            html += '<div class="gupiao_price_hm  other_color" >--</div>';
            html += '<div class="gupiao_zdf_hm other_color" >--</div>' + '</div>' + '</div>';
        }
        return html;
    }
    function asyncfun(url, fun) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: fun,
            timeout: 30000,
            async: true,
            // 超时时间设置，单位毫秒
            complete: function (XMLHttpRequest, status) {
                // 请求完成后最终执行参数
                if (status === 'timeout') {
                    // 超时,status还有success,error等值的情况
                    alert('超时');
                }
            }
        });
    }
    return customElement;
});