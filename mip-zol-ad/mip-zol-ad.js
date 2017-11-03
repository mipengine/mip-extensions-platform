/**
 * @file zol广告组件
 * @author bms
 * @copyright www.zol.com.cn
 *
 * render()->renderPlace()->renderBar()->checkOs()->renderType()->renderFodder()
 * @todo 定向、轮换功能
 */
define(function (require) {
    var config = {
        view: '//ca.w8.com.cn/view',
        pv: '//ca.w8.com.cn/rpv?s=zol&on=zol',
        clk: '//ca.w8.com.cn/cgrclk?s=zol&on=zol',
        icon: '//pic.zol-img.com.cn/201510/thisad_1016.png'
    };
    var customElement = require('customElement').create();

    /**
     * 入口渲染方法
     *
     * @param {Object} se 当前对象
     */
    var render = function (se) {
        var url = config.view + '?nocallback&g=' + se.element.getAttribute('pid');
        fetch(url).then(function (response) {
            response.json().then(function (json) {
                if (json[0] && json[0].length > 0) {
                    renderPlace(json[0], se);
                } else {
                    se.element.style.display = 'none';
                }
            });
        });
    };

    /**
     * 渲染广告（图片、iframe)
     */
    var renderFodder = {
        pic: renderBanner,
        iframe: renderIframe,
        iframeCode: renderIframe
    };

    /**
     * 渲染广告模版（普通模板）
     */
    var renderType = {
        normal: renderNormal
    };

    /**
     * 渲染广告位
     *
     * @param {Array} place 广告位数组
     * @param {Object} se 当前组件对象
     */
    function renderPlace(place, se) {
        place.forEach(function (bar) {
            renderBar(bar, se);
        });
    }

    /**
     * 渲染广告条
     *
     * @param {Object} bar 广告条对象
     * @param {Object} se 当前组件对象
     */
    function renderBar(bar, se) {
        if (renderType[bar.type] && checkOs(bar)) {
            renderType[bar.type](bar, se);
        }
    }

    /**
     * 渲染普通模板
     *
     * @param {Object} bar 广告条对象
     * @param {Object} se 当前组件对象
     */
    function renderNormal(bar, se) {
        // 变量改成驼峰规则，要不然通不过fecs验证
        if (bar.conf.type === 'iframe_code') {
            bar.conf.type = 'iframeCode';
        }
        if (renderFodder[bar.conf.type]) {
            renderFodder[bar.conf.type](bar, se);
        }
    }

    /**
     * 渲染图片
     *
     * @param {Object} bar 广告条对象
     * @param {Object} se 当前组件对象
     */
    function renderBanner(bar, se) {
        var a = document.createElement('a');
        a.href = bar.conf.click_url;
        a.target = '_blank';
        var img = new Image(bar.conf.width, bar.conf.height);
        img.style.width = bar.conf.width + 'px';
        img.style.height = bar.conf.height + 'px';
        img.src = bar.conf.src;
        a.appendChild(img);
        se.element.appendChild(a);
        setComponentStyle(bar, se);
        bindPv(bar);
        bindClk(a, bar);
    }

    /**
     * 渲染iframe
     *
     * @param {Object} bar 广告条对象
     * @param {Object} se 当前组件对象
     */
    function renderIframe(bar, se) {
        var iframe;
        iframe = document.createElement('iframe');
        iframe.src = bar.conf.src;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.position = 'absolute';
        se.element.style.width = '100%';
        se.element.style.height = '0';
        se.element.style.paddingBottom = ((bar.conf.height / bar.conf.width) * 100) + '%';
        se.element.style.position = 'relative';
        se.element.appendChild(iframe);
        se.element.appendChild(getIcon());
    }

    /**
     * 设置组件div样式
     *
     * @param {Object} bar 广告条对象
     * @param {Object} se 当前组件对象
     */
    function setComponentStyle(bar, se) {
        se.element.style.width = bar.conf.width + 'px';
        se.element.style.height = bar.conf.height + 'px';
        se.element.style.position = 'relative';
        se.element.appendChild(getIcon());
    }

    /**
     * 获取广告标识
     *
     * @return {element}
     */
    function getIcon() {
        var icon = new Image(29, 16);
        icon.style.left = 0;
        icon.style.bottom = 0;
        icon.style.width = '29px';
        icon.style.height = '16px';
        icon.style.position = 'absolute';
        icon.src = config.icon;
        return icon;
    }

    /**
     * 处理系统验证
     *
     * @param {Object} bar 广告条对象
     * @return {boolean}
     */
    function checkOs(bar) {
        var fodder = bar.conf;
        var host = window.location.host;
        var ua = window.navigator.userAgent;
        var regex;
        var isApp;
        var platform;
        if (fodder.platform && fodder.platform.indexOf('0') === -1) {
            for (var i = 0; platform = fodder.platform[i++];) {
                isApp = 1;
                switch (platform) {
                    case '1':
                        regex = /Android/;
                        break;
                    case '2':
                        regex = /iPhone/;
                        break;
                    case '4':
                        isApp = host === 'lib.wap.zol.com.cn';
                        regex = /Android/;
                        break;
                    case '8':
                        isApp = host === 'lib.wap.zol.com.cn';
                        regex = /iPhone/;
                        break;
                }
                if (isApp && regex.test(ua)) {
                    return 1;
                }
            }
            return 0;
        }
        return 1;
    }

    /**
     * 展现统计
     *
     * @param {Object} bar 广告条对象
     */
    function bindPv(bar) {
        (bar.is_imp === '1') && setImage0(config.pv + '&id=' + bar.bid);
    }

    /**
     * 点击统计
     *
     * @param {element} tag 需要绑定的元素
     * @param {Object} bar 广告条对象
     */
    function bindClk(tag, bar) {
        var id = bar.bid;
        tag.onmousedown = function () {
            setImage0(config.clk + '&id=' + id);
        };
    }

    /**
     * 发送统计
     *
     * @param {string} url 统计地址
     */
    function setImage0(url) {
        new Image(0, 0).src = url + '&_=' + Math.random();
    }

    customElement.prototype.build = function () {
        render(this);
    };
    return customElement;
});
