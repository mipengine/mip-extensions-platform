/**
 * @file mip-ajax-one 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    var $ = require('jquery');
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        $(ele).on('click', function () {
            var type = ele.getAttribute('type');
            var page = ele.getAttribute('page');
            var target = ele.getAttribute('target');
            var url = '/index.php?m=splist&c=index&a=getzt_data';
            var data = {
                page: page,
                type: type
            };
            $.post(url, data, function (result) {
                // var html = '';
                // $(result).each(function (i, o) {
                //     if (i % 2 === 0) {
                //         html += '<div class="mainDetailModel lf">';
                //     } else {
                //         html += '<div class="mainDetailModel rt">';
                //     }
                //     html += '<div class="mainDetailPic"><a href="/special/';
                //     html += o.tag_pinyin;
                //     html += '.html"><img src="http://www.aidigong.com/uploadfile/';
                //     html += o.path;
                //     html += '" alt=""></a></div>';
                //     html += '<p class="mainDetailTitle">';
                //     html += o.name;
                //     html += '</p>';
                //     html += '<p class="mainDetailText">';
                //     html += o.seo_describe;
                //     html += '<a href="/special/';
                //     html += o.tag_pinyin;
                //     html += '.html">[详情]</a></p></div>';
                // });
                response(result);
            });
            function response(result) {
                var html = '';
                $(result).each(function (i, o) {
                    if (i % 2 === 0) {
                        html += '<div class="mainDetailModel lf">';
                    } else {
                        html += '<div class="mainDetailModel rt">';
                    }
                    html += '<div class="mainDetailPic"><a href="/special/';
                    html += o.tag_pinyin;
                    html += '.html"><img src="http://www.aidigong.com/uploadfile/';
                    html += o.path;
                    html += '" alt=""></a></div>';
                    html += '<p class="mainDetailTitle">';
                    html += o.name;
                    html += '</p>';
                    html += '<p class="mainDetailText">';
                    html += o.seo_describe;
                    html += '<a href="/special/';
                    html += o.tag_pinyin;
                    html += '.html">[详情]</a></p></div>';
                });
                $('#' + target).html(html);
            }
        });
    };
    return customElement;
});
