/**
 * @file 小说阅读页组件
 * @author>
 */

define(function (require) {
    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var setTimtoutRange;   // 记录频繁点击标志
    var setTimtoutRangere;
    var reduseInterval;   // 设置字体减小动画的定时器
    var increaseInterval; // 设置字体增加动画的定时器
    var flag = true;     // true已经清除定时器，false定时器还没完成

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
        self.setConfig(this.getConfig());
        self._hidden = true;
        self.appendHtml();
        self.addEvent();
        self.stopHandler();

    };

    /**
     * 切换阅读控制条
     */
    customElement.prototype.toggle = function () {
        var self = this;
        var element = self.element;
        element.classList.remove('rea');
        element.classList.remove('non');
        element.classList.remove('show-control');
        element.classList.remove('show-theme');
        element.classList.remove('show-mask');
        if (self._hidden) {
            element.classList.add('show-control');
            element.classList.add('show-mask');
            fobidscroll(element);
        } else {
            allscroll(element);
            element.classList.add('rea');
            setTimeout(function () {
                element.classList.add('non');
            }, 240);
        }
        self._hidden = !self._hidden;

        /**
         *  函数说明：底部弹层弹出时，禁止滑动
         */
        // 底部弹层弹出时，禁止滑动
        function fobidscroll(element) {
            element.addEventListener('touchmove', function (e) {
                e.preventDefault && e.preventDefault();
                e.returnValue = false;
                e.stopPropagation && e.stopPropagation();
            }, false);
        }

        /**
         * 函数说明：底部弹层关闭时，允许滑动
         */
        // 底部弹层关闭时，允许滑动
        function allscroll(element) {
            element.addEventListener('touchmove', function (e) {
                e.returnValue = true;
            }, false);
        }
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
        catch (e) {
        }
        return config;
    };


    /**
     * 阻止底部下一章按钮事件冒泡
     *
     */
    customElement.prototype.stopHandler = function () {
        var self = this;
        var element = self.element;
        if (element.querySelector('.page-end')) {
            element.querySelector('.page-end').addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
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
        ;
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
        element.querySelector('.reduce').addEventListener('click', triggerReduce);
        element.querySelector('.increase').addEventListener('click', triggerIncrease);

        $range.addEventListener('change', function () {
            var $nowfont1 = document.documentElement.getAttribute('mip-xiaoshuo-read-font-size') - 0;
            setFontSize();
            if ($range.value % 0.5 !== 0) {
                var end = $range.value;
                if ($range.value > $nowfont1) {
                    clickIncreaseBefore();
                    $range.value = end;
                } else if ($range.value < $nowfont1) {
                    clickReduceBefore();
                    $range.value = end;
                }
                return;
            }
            flag = true;
            clearAll();
            return;
        });


        // 函数声明：点击字体放大时，设置动画，滑动
        function triggerReduce() {
            clickReduceBefore();
            clearAll();
            var $startRange = $range.value - 0.5;
            setTimtoutRangere = $range.value;
            reduseInterval = setInterval(function () {
                if (setTimtoutRangere === $range.value) {
                    flag = false;
                    if ($startRange < $range.value - 0 && $range.value > 1) {
                        $range.value = $range.value - 0.01;
                        setTimtoutRangere = $range.value;
                        $range.value = setTimtoutRangere;
                    } else {
                        setFontSize();
                        flag = true;
                        clearAll();
                    }
                } else {
                    $range.value = setTimtoutRangere;
                    setFontSize();
                    clearAll();
                }
            }, 1);
            setFontSize();
        }

        // 函数声明：点击字体缩小时，设置动画，滑动
        function triggerIncrease() {
            clickIncreaseBefore();
            clearAll();
            setTimtoutRange = $range.value;
            var $startRange1 = $range.value - 0 + 0.5;
            if ($startRange1 < 5.5) {
                increaseInterval = setInterval(function () {
                    if (setTimtoutRange === $range.value) {
                        flag = false;
                        if ($startRange1 > $range.value - 0 && $range.value < 5) {
                            $range.value = $range.value - 0 + 0.01;
                            setTimtoutRange = $range.value;
                            $range.value = setTimtoutRange;
                        } else {
                            flag = true;
                            setFontSize();
                            clearAll();
                        }
                    } else {
                        $range.value = setTimtoutRange;
                        setFontSize();
                        clearAll();
                    }
                }, 1);
                setFontSize();
            }
            setFontSize();
        }

        // 快点增加按钮时需要快速处理上一次未完成的动画
        function clickIncreaseBefore() {
            var intRange = parseInt($range.value, 10);
            intRange = intRange - 0 + 0.5;
            if ($range.value % 0.5 !== 0) {
                if (intRange > $range.value) {
                    $range.value = intRange;
                    setFontSize();
                } else if (intRange < $range.value) {
                    $range.value = intRange - 0 + 1;
                    setFontSize();
                }
            }

        }

        // 快点减小按钮时需要快速处理上一次未完成的动画
        function clickReduceBefore() {
            var intRange = parseInt($range.value, 10);
            intRange = intRange - 0.5;
            if ($range.value % 0.5 !== 0) {
                if (intRange < $range.value) {
                    $range.value = intRange;
                    setFontSize();
                } else if (intRange < $range.value) {
                    $range.value = intRange - 0.5;
                    setFontSize();
                }
            }

        }

        function clearAll() {
            clearInterval(reduseInterval);
            clearInterval(increaseInterval);
        }
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
            '<input type="range" step="0.001" min="1" max="5"  value="' + fontsize + '">',
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
