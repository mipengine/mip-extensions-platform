/**
 * @file mip-game-recommend 组件
 * @author zhouqian04<zhouqian04@baidu.com>
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var element = null;
    var util = require('util');
    var IScroll = require('./dep/iscroll.min');

    /**
     * [renderTemplate 获取模板]
     *
     * @param  {Object} data 渲染数据
     */
    function renderTemplate(data) {
        var platform = util.platform;

        if (data && data.gameList && data.gameList instanceof Array) {
            data.gameList.map(function (game) {
                game.downloadUrl = platform.isIos() ? game.iosUrl : game.androidUrl;
            });
            templates.render(
                element, data
            ).then(function (html) {
                element.querySelector('[data-role="games-container"]').innerHTML = html;
                initScroll();
            });
        }
        else {
            console.error('数据不符合规范');
        }
    }

    function initScroll() {
        var scroll = new IScroll('.game-recommend-bd', {
            scrollX: true,
            click: true,
            disableMouse: true,
            disablePointer: true,
            disableTouch: false,
            tap: false
        });
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        element = this.element;
        // 同步配置数据
        if (element.hasAttribute('synchronous-data')) {
            var script = element.querySelector('script[type="application/json"]');
            var data = script ? JSON.parse(script.textContent.toString()) : null;
            renderTemplate(data);
            return;
        }

        // 异步获取数据
        var src = element.getAttribute('src') || '';
        var url = src;
        if (!src) {
            console.error('mip-list 的 src 属性不能为空');
        }
        fetch(url).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (+json.errno !== 0) {
                return;
            }
            renderTemplate(json.data);
        });
    };

    return customElement;
});
