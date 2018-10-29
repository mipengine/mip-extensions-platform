/**
 * @file mip-mfk-if 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var attr = this.element.attributes;
        var pass = 'show';
        var result = [];
        var miptag = [];
        for (var i = 0; i < attr.length; i++) {
            var item = attr[i].nodeName;
            var row = item.toLowerCase();
            var val = attr[i].nodeValue;
            var wrong = false;
            if (val.indexOf('!') === 0) {
                wrong = true;
                val = val.substr(1);
            }
            switch (true) {
                case row === 'referrer':
                    var r = document.referrer;
                    r = r.toLowerCase();
                    if (r === '') {
                        if (val === '' && wrong) {
                            result.push(false);
                        }
                        else if (val === '' && !wrong) {
                            result.push(true);
                        }
                        else if (val !== '' && wrong) {
                            result.push(true);
                        }
                        else if (val !== '' && !wrong) {
                            result.push(false);
                        }
                    }
                    else if (wrong && r.indexOf(val) === -1 || !wrong && r.indexOf(val) > -1) {
                        result.push(true);
                    }
                    else {
                        result.push(false);
                    }
                    break;
                case row === 'pass':
                    pass = val;
                    break;
                case row.indexOf('get-') === 0:
                    var para = item.substr(4);
                    var urlpara = getRequest();
                    if (urlpara[para] === undefined) {
                        result.push(false);
                    }
                    else if (wrong && urlpara[para] !== val || !wrong && urlpara[para] === val) {
                        result.push(true);
                    }
                    else {
                        result.push(false);
                    }
                    break;
                case row === 'domain':
                    var domain = document.domain;
                    if (wrong && domain.indexOf(val) === -1 || !wrong && domain.indexOf(val) > -1) {
                        result.push(true);
                    }
                    else {
                        result.push(false);
                    }
                    break;
                case row === 'mip-tags':
                    pass = val;
                    miptag = val.split(',');
                    break;
            }
        }
        var inner = element.innerHTML;
        var Reg;
        for (var i = 0; i < miptag.length; i++) {
            if (miptag[i] === '') {
                continue;
            }
            Reg = new RegExp('<' + miptag[i], 'gim');
            inner = inner.replace(Reg, '<mip-' + miptag[i], inner);
            Reg = new RegExp('</\\s*' + miptag[i] + '>', 'gim');
            inner = inner.replace(Reg, '</mip-' + miptag[i] + '>', inner);
        }
        if (result.indexOf(false) === -1) {
            if (pass === 'hide') {
                element.style.display = 'none';
            }
            else if (pass === 'show') {
                element.innerHTML = inner;
                element.style.display = 'block';
            }
            else if (pass === 'remove') {
                element.parentNode.removeChild(element);
            }
            else {
                element.innerHTML = inner;
            }
        }
        else {
            element.innerHTML = inner;
        }

        /**
         * [getRequest 获取url参数]
         *
         * @return {Object}
         */
        function getRequest() {
            var url = location.search;
            var theRequest = {};
            if (url.indexOf('?') > -1) {
                var str = url.substr(1);
                str = str.split('&');
                for (var i = 0; i < str.length; i++) {
                    theRequest[str[i].split('=')[0]] = unescape(str[i].split('=')[1]);
                }
            }
            return theRequest;
        }
    };

    return customElement;
});
