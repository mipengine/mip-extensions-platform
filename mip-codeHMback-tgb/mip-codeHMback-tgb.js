/**
 * @file mip-codeHMback-tgb 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var funId = element.getAttribute('funId') || '';
        var obj = element.getAttribute('data') || '';
        var type = element.getAttribute('type') || '';
        var data = JSON.parse(obj);
        if (data.status === true) {
            var list = data.dto.listStock;
            var html = htmlHM(list, type);
            if (type === 'H') {
                document.getElementById('H_stocke').innerHTML = html;
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
                    $('#H_stocke').append(html2);
                }
            } else if (type === 'M') {
                document.getElementById('M_stocke').innerHTML = html;
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
                        $('#M_stocke').append(html2);
                    }
                }

            }
        }
    };
    function htmlHM(list, type) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            html += '<div class="zfb_list_gupiao">' + '<a  id=' + list[i].keywordID + '  href="/quotes/';
            html += list[i].keywordName + '"><div class="gupiao_name">' + list[i].keywordName;
            html += '</div></a>' + '<a    href="/quotes/' + list[i].keywordName;
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
    return customElement;
});