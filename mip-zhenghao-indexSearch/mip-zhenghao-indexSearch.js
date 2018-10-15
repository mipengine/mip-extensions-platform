/**
 * @file 整好 首页搜索 插件
 * @author chenrong <812069449@qq.com>
 * @version 1.0
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var util = require('util');
    var CustomStorage = util.customStorage;
    var __Storage = new CustomStorage(0);

    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {

        // 服务器地址
        var ServerHref = $('#server_href').val();
        ServerHref = !empty(ServerHref) ? ServerHref : location.protocol + '://' + location.host + '/mip_search.html?keyWord=';

        /**
         * 是否为空
         * @param {string} keyWord  字符串
         * @return {boolean}
         */
        function empty(keyWord) {
            if (typeof(keyWord) !== 'undefined' && keyWord !== null && keyWord !== '' && keyWord !== false) {
                return false;
            } else {
                return true;
            }

        }

        /**
         * 刷新历史数据 包括数据 和 界面
         * @param {string} keyWord 字符串
         */
        function refreshHistorical(keyWord) {

            // 清空
            if (keyWord === false) {
                __Storage.rm('indexSearchList');
            }
            var indexSearchList = __Storage.get('indexSearchList');
            indexSearchList = empty(indexSearchList) ? [] : indexSearchList.split('#####');

            // 搜索用
            if (!empty(keyWord)) {
                indexSearchList.push(keyWord);
                if (indexSearchList.length > 12) {
                    indexSearchList.shift();
                }
            }

            // 更新数据
            __Storage.set('indexSearchList', indexSearchList.join('#####'));

            // 更新界面
            $('#historical').empty();
            $.each(indexSearchList, function (i) {
                var itemHtml = '<a href="' + createUrlByWord(indexSearchList[i]) + '">' + indexSearchList[i] + '</a>';
                $('#historical').append(itemHtml);
            });
        }

        /**
         * 创建搜索目标地址
         * @param {string} word 字符串
         * @return {string}
         */
        function createUrlByWord(word) {
            // return _server_href+encodeURI(encodeURI(word));
            return ServerHref + word;
        }

        /**
         * 全角转半角
         * @param {string} str 字符串
         * @return {string}
         */
        function c2h(str) {
            var result = '';
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) === 12288) {
                    result += String.fromCharCode(str.charCodeAt(i) - 12256);
                    continue;
                }

                if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
                    result += String.fromCharCode(str.charCodeAt(i) - 65248);
                } else {
                    result += String.fromCharCode(str.charCodeAt(i));
                }
            }
            return result;
        }


        // 显示搜索页面
        $('#index_search_box').click(function () {
            $('#index_search_page').show();
            refreshHistorical();
        });

        // 点击取消后 隐藏页面
        $('#index_search_page_hide_btn').click(function () {
            $('#index_search_page').hide();
        });

        // 搜索
        $('#index_search_input').keydown(function (event) {

            // 回车
            if (13 === event.keyCode) {
                var currentVal = $('#index_search_input').val();
                currentVal = currentVal.replace(/[\\\/\#\?\$\&\=\>\<\-]/g, ' ');
                currentVal = c2h($.trim(currentVal));
                if (empty(currentVal)) {
                    return false;
                }
                refreshHistorical(currentVal);
                window.location.href = createUrlByWord(currentVal);
            }
        });

        // 清空历史记录
        $('#index_search_clear').click(function () {
            refreshHistorical(false);
        });

    };
    return customElem;
});
