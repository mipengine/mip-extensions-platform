/**
 * @file mip-qf-download 组件
 * @author 9-lives
 */

define(function (require) {
    var getLink = require('./getLink');
    var util = require('util');
    var viewer = require('viewer');
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var component = this.element; // 组件元素
        var a = component.querySelector('a');

        if (!a) {
            throw new Error('<a> not found.');
        }

        if (util.platform.isWechatApp()) {
            // 微信浏览器
            return component.addEventListener('click', function (e) {
                e.preventDefault();
                viewer.eventAction.execute('wechat', component, {});
            }, false);
        }

        var link = getLink(getParams(component));

        a.setAttribute('href', link);

        var dsClass = component.getAttribute('class-disabled');

        if (dsClass && (link === 'javascript:void(0)' || !link)) {
            a.classList.add(dsClass);
        }
    };

    return customElement;
});

/**
 * 生成初始化下载链接所需的参数对象
 * @param {Object} el 组件元素
 * @return {Object} 参数对象
 */
function getParams(el) {
    return {
        apkHref: el.getAttribute('apk-href') ? el.getAttribute('apk-href') : '',
        ipaHref: el.getAttribute('ipa-href') ? el.getAttribute('ipa-href') : '',
        prefix: el.getAttribute('prefix') ? el.getAttribute('prefix') : '',
        prefixMb: el.getAttribute('ipa-prefix-mb') ? el.getAttribute('ipa-prefix-mb') : '',
        prefixNonMb: el.getAttribute('ipa-prefix-nonmb') ? el.getAttribute('ipa-prefix-nonmb') : ''
    };
}
