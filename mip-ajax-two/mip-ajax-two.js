/**
 * @file mip-ajax-two 组件
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
        var target = ele.getAttribute('target');
        var cid = ele.getAttribute('cid');
        var page = 2;
        var vNum = 0;
        $(ele).on('click', function () {
            var wurl = '/index.php?m=witness&c=index&a=video_list&is_ajax=1&cid=' + cid + '&page=' + page;
            $.get(wurl, function (data) {
                if (data.totalPage <= page) {
                    $(ele).html('没有更多内容了');
                    return false;
                }
                page++;
                response($.parseHTML(data.list));
            });
            function response(result) {
                var html = '';
                $(result).each(function (i, o) {
                    html += '<div class="fg"></div>';
                    html += '<div class="videoDetail">';
                    html += '<mip-video-list data-and="';
                    html += o['video_code'];
                    html += '" data-id="videovNum"';
                    html += ++vNum;
                    html += '></mip-video-list>';
                    html += '<div class="videoBox">';
                    html += '<mip-vd-baidu layout="responsive"';
                    html += ' id="videovNum';
                    html += vNum;
                    html += '"';
                    html += ' title="';
                    html += o['title'];
                    html += '"';
                    html += ' src="http://www.5etv.com/video/flv/user/6381/201781510491088374.mp4"';
                    html += ' poster="http://www.aidigong.com/uploadfile/';
                    html += o['thumb_path'];
                    html += '">';
                    html += '</mip-vd-baidu>';
                    html += '</div>';
                    html += '<div class="videoWz">';
                    html += o['title'];
                    html += '</div>';
                    html += '<div class="videoBottom clear">';
                    html += '<a href="type_<?php echo $info["id"];?>.html" class="baike lf">';
                    html += '<span class="andIcon"></span><?php echo $info[title]?></a>';
                    html += '<a href="/news/2727';
                    html += o['news_id'];
                    html += '.html" class="xqBtn rt">详情></a>';
                    html += '</div>';
                    html += '</div>';
                });
                var $target = $('#' + target);
                $target.html($target.html() + html);
            }
        });
    };
    return customElement;
});
