/**
 * @file 处理下载逻辑有关的返回值
 * @author 9-lives
 */

define(function (require) {
    const util = require('util');

    const emptyLink = null; // 空下载链接

    /**
     * 解析 API 返回的 downloadLink 下载包对象数组
     * @param {Array} arr 下载对象数组
     * @param {string} mBPrefix IOS 越狱包手机百度链接前缀
     * @param {string} nonMBPrefix IOS 越狱包非手机百度链接前缀
     * @return {string} 下载链接
     */

    function parse(arr, mBPrefix = '', nonMBPrefix = '') {
        if (!(arr instanceof Array)) {
            // 非数组
            throw new Error('arr is not an array');
        }

        if (util.platform.isWechatApp()) {
            // 微信浏览器
            return emptyLink;
        }

        // 默认下载安卓包
        return util.platform.isIos() ? parseIos(arr, mBPrefix, nonMBPrefix) : parseAndroid(arr);
    }

    /**
     * Android 客户端解析下载包
     * @param {Array} arr 下载对象数组
     * @return {string} 下载链接
     */

    function parseAndroid(arr) {
        let link = emptyLink; // 无安卓下载包

        for (let linkObj of arr) {
            if (linkObj.type === 'apk' && linkObj.link) {
                link = linkObj.link;

                if (linkObj.defaultpackage === 'Y') {
                    // 默认包
                    break;
                }
            }
        }

        return link;
    }

    /**
     * IOS 客户端解析下载包
     * @param {Array} arr 下载对象数组
     * @param {string} mBPrefix IOS 越狱包手机百度链接前缀
     * @param {string} nonMBPrefix IOS 越狱包非手机百度链接前缀
     * @return {string} 下载链接
     */

    function parseIos(arr, mBPrefix, nonMBPrefix) {
        let isJb; // 是否为越狱包
        let link = emptyLink; // 无 IOS 下载包

        for (let linkObj of arr) {
            if (linkObj.type === 'ipa' && linkObj.link) {
                link = linkObj.link;
                isJb = linkObj.jailbreak === 'Y';

                if (linkObj.defaultpackage === 'Y') {
                    // 默认包，不再查找其后的对象
                    break;
                }
            }
        }

        if (isJb) {
            link = jailBreaking(link, mBPrefix, nonMBPrefix);
        }

        return link;
    }

    /**
     * 越狱包处理
     * @param {string} link 原始下载链接
     * @param {string} mBPrefix IOS 越狱包手机百度链接前缀
     * @param {string} nonMBPrefix IOS 越狱包非手机百度链接前缀
     * @return {string} 下载链接
     */
    function jailBreaking(link, mBPrefix, nonMBPrefix) {
        if (util.platform.isBaiduApp()) {
            // 手机百度
            link = mBPrefix + link;
        }
        else {
            // 非手机百度
            link = nonMBPrefix + link;
        }

        return link;
    }

    return parse;
});
