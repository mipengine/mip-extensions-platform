/**
 * @file 工具包
 * @author 9-lives
 */

define(function (require) {
    const fetchJsonp = require('fetch-jsonp');
    const util = require('util');

    /**
     * 获取自定义参数
     * @param {Object} el 组件元素
     * @return {Object} 请求参数对象
     */

    function getCustomParams(el) {
        let params = {
            clientType: util.platform.isAdr() ? 'apk' : 'ipa', // 客户端类型。apk 安卓；ipa 苹果；
            columns: '', // 返回的列
            cpFlag: 'Y', // 价值
            pageIndex: 0, // 开始页数
            pageSize: 20, // 分页大小
            publishTarget: 'Html5', // PC 端 'pc'， 移动端 'Html5'
            rankCode: undefined, // 自定义榜单编码
            siteId: undefined, // 站点 ID
            type: undefined // 排行榜类型。1 热门; 7 自定义
        }; // 默认参数

        try {
            let script = el.querySelector('script[type="application/json"]');
            if (script) {
                params = util.fn.extend(params, JSON.parse(script.textContent));
            }
        }
        catch (e) {
            if (e && e.message) {
                console.error(e.message);
            }

            return false;
        }

        return params;
    }

    /**
     * 获取数据
     * @param {Function} failure 失败回调
     * @param {Function} success 成功回调
     * @param {number} timeout 超时时长
     * @param {string} url 请求地址
     */

    function getDataByJsonp(failure, success, timeout, url) {
        if (typeof failure !== 'function') {
            failure = function () {};
        }
        if (typeof success !== 'function') {
            success = function () {};
        }

        fetchJsonp(url, {
            jsonpCallback: 'callback',
            timeout: timeout
        })
            .then(function (rs) {
                return rs.json();
            })
            .then(function (rs) {
                if (rs.status !== 0) {
                    throw new Error('status code:', rs.status);
                }

                success(rs.data.items);
            })
            .catch(function (e) {
                if (e && e.message) {
                    console.error(e.message);
                }

                failure();
            });
    }

    /**
     * 获取 HTML 属性
     * @param {Object} el 组件元素
     * @return {Object} HTML 标签属性对象
     */

    function getHtmlProperties(el) {
        let properties = {
            completedTxt: '加载完毕', // 完成文本
            failedTxt: '加载失败', // 失败文本
            gap: 0, // 触发间距
            loadingTxt: '正在加载...', // 加载文本
            mbPrefix: undefined, // IOS 越狱包手机百度链接前缀
            nonMBPrefix: undefined, // IOS 越狱包非手机百度链接前缀
            timeout: 7000, // jsonp 超时时间
            url: undefined // jsonp 地址
        };

        let completedTxt = el.getAttribute('txt-completed');
        if (completedTxt) {
            properties.completedTxt = completedTxt;
        }

        let failedTxt = el.getAttribute('txt-failed');
        if (failedTxt) {
            properties.failedTxt = failedTxt;
        }

        let gap = el.getAttribute('gap');
        if (gap) {
            properties.gap = Number.parseInt(gap, 10);
        }

        let loadingTxt = el.getAttribute('txt-loading');
        if (loadingTxt) {
            properties.loadingTxt = loadingTxt;
        }

        let mbPrefix = el.getAttribute('ipa-prefix-mb');
        if (mbPrefix) {
            properties.mbPrefix = mbPrefix;
        }

        let nonMBPrefix = el.getAttribute('ipa-prefix-nonmb');
        if (nonMBPrefix) {
            properties.nonMBPrefix = nonMBPrefix;
        }

        let url = el.getAttribute('data-url');
        if (url) {
            properties.url = url;
        }
        else {
            throw new Error('invalid argument: data-url');
        }

        let timeout = el.getAttribute('timeout');
        if (timeout) {
            properties.timeout = Number.parseInt(timeout, 10) * 1000;
        }

        return properties;
    }

    /**
     * 检测被动事件兼容性
     * @return {boolean} 是否支持被动事件
     */

    function isPassiveEvtSupport() {
        let passiveSupported = false;
        let obj;

        obj = Object.defineProperty({}, 'passive', {
            get() {
                passiveSupported = true;
                return false;
            }
        });

        window.addEventListener('_testpassive', null, obj);

        return passiveSupported;
    }

    /**
     * 请求动画帧
     * @param {Function} callback 待执行的方法
     */

    const rqFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

    /**
     * 设置 url 参数
     * @param {string} url 处理前的url
     * @param {Object} params 请求参数
     * @return {string} 处理后的 url
     */

    function setUrlParams(url, params) {
        /* eslint-disable */
        url += '?';
        /* eslint-disable */

        let flag = true;
        for (let key of Object.keys(params)) {
            url += (flag ? '' : '&') + key.toLowerCase() + '=' + params[key];
            flag = false;
        }

        return url;
    }

    return {
        getCustomParams,
        getDataByJsonp,
        getHtmlProperties,
        isPassiveEvtSupport,
        rqFrame,
        setUrlParams
    };
});
