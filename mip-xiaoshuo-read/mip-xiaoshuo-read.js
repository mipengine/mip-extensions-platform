/**
 * @file 小说阅读页组件
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    /**
     * 本地储存名称
     *
     * @type {string}
     * @const
     */
    var LOCAL_KEY = 'xiaoshuo_config';

    /**
     * 默认配置参数，主题是默认，字号为3号
     *
     * @type {Object}
     * @const
     */
    var DEFAULTS = {
        theme: 'default',
        fontSize: 3
    };

    /**
     * 需要在第一时间执行，因为要换页面文字的主题
     */
    customElement.prototype.build = function () {
        var self = this;

        self._hidden = true;
        self.appendHtml();
        self.addEvent();
        self.setConfig(this.getConfig());
    };

    /**
     * 切换阅读控制条
     */
    customElement.prototype.toggle = function () {
        var self = this;
        var element = self.element;

        element.classList.remove('show-control');
        element.classList.remove('show-theme');
        element.classList.remove('show-mask');

        if (self._hidden) {
            element.classList.add('show-control');
            element.classList.add('show-mask');
        }

        self._hidden = !self._hidden;
    };

    /**
     * 获取小说阅读配置
     *
     * @return {Object} {theme, fontSize}
     */
    customElement.prototype.getConfig = function () {
        var config = DEFAULTS;

        try {
            config = util.fn.extend(config, JSON.parse(storage.get(LOCAL_KEY)));
        }
        catch (e) {}
        return config;
    };

    /**
     * 设置配置，会和当前的配置做合并处理
     *
     * @param {Object} config 配置，有主题配置和字号配置
     */
    customElement.prototype.setConfig = function (config) {
        config = util.fn.extend(this.getConfig(), config);
        storage.set(LOCAL_KEY, JSON.stringify(config));

        if (config.theme) {
            document.documentElement.setAttribute('mip-xiaoshuo-read-theme', config.theme);
        }
        if (config.fontSize) {
            document.documentElement.setAttribute('mip-xiaoshuo-read-font-size', config.fontSize);
        }
    };

    /**
     * 绑定事件
     */
    customElement.prototype.addEvent = function () {
        var self = this;
        var element = self.element;

        // 点击页面显示控制条
        element.addEventListener('click', self.toggle.bind(self));
        element.querySelector('[control]').addEventListener('click', function (event) {
            event.stopPropagation();
        });
        element.querySelector('[theme]').addEventListener('click', function (event) {
            event.stopPropagation();
        });

        // 点击设置按钮
        [].slice.call(element.querySelectorAll('[settings]')).forEach(function (el) {
            el.addEventListener('click', function () {
                element.classList.remove('show-control');
                element.classList.add('show-theme');
            });
        });

        // 设置主题色块
        [
            'default',
            'green',
            'paper',
            'night'
        ].forEach(function (key) {
            [].slice.call(element.querySelectorAll('[mode-' + key + ']')).forEach(function (el) {
                el.addEventListener('click', function () {
                    self.setConfig({
                        theme: key
                    });
                });
            });
        });

        var $range = element.querySelector('input[type="range"]');
        var setFontSize = function () {
            self.setConfig({
                fontSize: $range.value
            });
        };
        element.querySelector('.reduce').addEventListener('click', function () {
            $range.value -= 1;
            setFontSize();
        });
        element.querySelector('.increase').addEventListener('click', function () {
            $range.value = $range.value - 0 + 1;
            setFontSize();
        });
        $range.addEventListener('change', setFontSize);
        $range.addEventListener('click', setFontSize);
    };

    /**
     * 插入 HTML 片段到页面
     */
    customElement.prototype.appendHtml = function () {
        var fontsize = this.getConfig().fontSize;

        var html = [
            '<div class="mip-xiaoshuo-read-control" theme>',
                '<div class="mip-xiaoshuo-read-control-fontsize">',
                    '<ul>',
                        '<li class="reduce">A-</li>',
                        '<li class="progress">',
                            '<input type="range" step="1" min="1" max="5" value="' + fontsize + '">',
                        '</li>',
                        '<li class="increase">A+</li>',
                    '</ul>',
                '</div>',
                '<div class="mip-xiaoshuo-read-control-theme">',
                    '<ul>',
                        '<li><span class="theme-default" mode-default></span></li>',
                        '<li><span class="theme-green" mode-green></span></li>',
                        '<li><span class="theme-paper" mode-paper></span></li>',
                    '</ul>',
                '</div>',
            '</div>'
        ].join('');

        this.element.appendChild(util.dom.create(html));
    };

    return customElement;
});
