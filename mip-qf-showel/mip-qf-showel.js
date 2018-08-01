/**
 * @file mip-qf-showel 组件
 * @author 9-lives
 */

define(function (require) {
    const util = require('util');

    let customElement = require('customElement').create();

    /**
     * 显示元素
     * @param {Object} collection HTML 元素 collection
     */

    function show(collection) {
        for (let i = 0; i < collection.length; i++) {
            collection[i].classList.add('active');
        }
    }

    customElement.prototype.firstInviewCallback = function () {
        const component = this.element;

        if (util.platform.isIos()) {
            // ios
            show(component.querySelectorAll('.mip-qf-showel-ios-b'));
            show(document.querySelectorAll('.mip-qf-showel-ios-il'));
            show(document.querySelectorAll('.mip-qf-showel-ios-ilb'));
        }
        else {
            // 默认安卓
            show(document.querySelectorAll('.mip-qf-showel-android-b'));
            show(document.querySelectorAll('.mip-qf-showel-android-il'));
            show(document.querySelectorAll('.mip-qf-showel-android-ilb'));

        }
    };

    return customElement;
});
