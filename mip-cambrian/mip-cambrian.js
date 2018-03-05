/**
 * @file mip-cambrian 寒武纪组件
 *
 * @author liulangyu huangjing02
 * @date 2017-04-20
 * @version 1.1.1
 */

define(function (require) {
    var customElement = require('customElement').create();

    // mip 组件开发支持 zepto
    var $ = require('zepto');

    // viewer 窗口
    var viewer = require('viewer');
    // 是否已经使用过，在一个page内组件只允许调用一次
    var ifBuild = false;

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // 组件只允许调用一次
        if (ifBuild) {
            return;
        }

        // 获取script标签里的内容
        var el = $('[type$=json]');
        var config = {};
        // 如果存在元素
        if (el.size() > 0) {
            var jsonStr = el.get(0).innerText;

            try {
                config = JSON.parse(jsonStr);
            }
            catch (e) {
                config = {};
            }
        }


        var id = this.element.getAttribute('site-id');

        if (id) {
            // 获取页面描述
            var description = $('meta[name=description]').attr('content');

            ifBuild = true;

            viewer.sendMessage(
                'cambrian-header',
                {
                    id: id,
                    title: config.title || document.title,
                    images: config.images,
                    description: config.description || description
                }
            );
        }
    };

    return customElement;
});
