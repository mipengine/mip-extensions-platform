/**
 * @file 春雨自定义广告组件
 * @author 春雨web开发组
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // 获取mip-cy-ad元素
        var $ele = $(this.element);
        // 从春雨后台获取广告信息
        $.ajax({
            url: '/ad/get_ad_info/?ad_pos=seo_mip_qa_top_banner',
            success: function (res) {
                var ad = res.ad_list && res.ad_list[0];
                if (res.success && ad) {
                    var html = [
                        '<div class="mip-cy-ad">',
                        '  <a href="' + ad.ad_url + '">',
                        '    <span class="ad-tag">广告</span>',
                        '    <img class="ad-img" src="' + ad.image_url + '" >',
                        '  </a>',
                        '  <button class="ad-close">关闭</button>',
                        '</div>'
                    ].join('');
                    $ele.append(html);
                    // 添加关闭公告事件
                    $('button', $ele).on('click', function () {
                        // 关闭广告位置
                        $ele.remove();
                    });
                }
            },
            error: function (xhr, errorType, error) {
                // 出错关闭广告位置
                $ele.remove();
            }
        });
    };

    return customElement;
});
