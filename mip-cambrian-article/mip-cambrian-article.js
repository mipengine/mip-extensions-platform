/**
 * @file mip-cambrian-article 寒武纪文章落地页组件
 * @author lixiaoqing
 * @date 2017-05-04
 * @version 1.0.0
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    /**
     * 获取文章请求
     *
     * @const
     * @type {string}
     */
    var URL_ARTICLE = '/officeplatform/message/articlepage?aid=';

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // 获取文章ID
        var element = this.element;
        var aid = element.getAttribute('data-aid');

        if (!aid) {
            return;
        }

        // 获取数据
        fetch(URL_ARTICLE + aid).then(function (res) {
            return res.text();
        }).then(function (text) {
            var data = JSON.parse(text).data;
            // 文章主题内容，分为html和style两部分，把style塞到style标签里
            document.getElementsByTagName('style')[0].insertAdjacentHTML('beforeend', data.content.style);
            // 渲染html
            templates.render(element, data).then(function (html) {
                element.innerHTML = html;
            });
        });
    };

    return customElement;
});
