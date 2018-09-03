/**
 * @file 处理下载逻辑有关的返回值
 * @author 9-lives
 */

define(function (require) {
    var util = require('util');

    /**
     * 根据平台返回下载链接
     * @param {Object} options 参数对象
     * @return {string} 下载链接
     */
    function getLink(options) {
        if (isEmpty(options)) {
            return 'javascript:void(0)';
        }

        // 默认下载安卓包
        return options.prefix + (util.platform.isIos() ? ipaLink : apkLink)(options);
    }

    function apkLink(options) {
        return options.apkHref;
    }

    function ipaLink(options) {
        var link = '';

        if (/jailbreak=Y/i.test(options.ipaHref)) {
            // 越狱包
            link = options[util.platform.isBaiduApp() ? 'prefixMb' : 'prefixNonMb'];
        }

        return link += options.ipaHref;
    }

    return getLink;

    /**
     * 是否缺少下载链接
     * @param {Object} options 参数对象
     * @return {boolean} true 是；false 否
     */
    function isEmpty(options) {
        if (util.platform.isIos() && !options.ipaHref) {
            // IOS
            return true;
        } else if (!options.apkHref) {
            // 默认安卓
            return true;
        }

        return false;
    }
});
