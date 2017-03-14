/**
 * @author: Qi
 * @date: 2017-3-14
 * @file: mip-wangxia-topc.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var userAgent = navigator.userAgent;

    // 判断是否移动
    function isMobile() {
        var reBit = false;
        var reArr = [
            'MIDP',
            'SymbianOS',
            'NOKIA',
            'SAMSUNG',
            'LG',
            'NEC',
            'TCL',
            'Alcatel',
            'BIRD',
            'DBTEL',
            'Dopod',
            'PHILIPS',
            'HAIER',
            'LENOVO',
            'MOT-',
            'Nokia',
            'SonyEricsson',
            'SIE-',
            'Amoi',
            'ZTE',
            'Android',
            'Iphone',
            'AppleWebKit.*mobile'
        ];
        var reRep = new RegExp(reArr.join('|'), 'i');
        if (reRep.test(userAgent)) {
            reBit = true;
        }
        return reBit;
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var Element = this.element;
        var ToUrl = Element.getAttribute('url') || '';
        if (ToUrl === '') {
            return false;
        }
        if (!isMobile()) {
            window.location.href = ToUrl;
        }
    };
    return customElem;
});
