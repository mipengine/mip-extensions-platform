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
            switch (true) {
                case row === 'referrer':
                    var r = document.referrer;
                    console.log('referrer', r);
                    r = r.toLowerCase();
                    result.push(handleLogic(val, r));
                    break;
                case row === 'pass':
                    pass = val;
                    break;
                case row.indexOf('get-') === 0:
                    var para = item.substr(4);
                    var urlpara = getRequest();
                    console.log('get-' + para, urlpara[para]);
                    result.push(handleLogic(urlpara[para], val));
                    break;
                case row === 'domain':
                    var domain = document.domain;
                    console.log('domain', domain);
                    result.push(handleLogic(domain, val));
                    break;
                case row === 'mip-tags':
                    miptag = val.split(',');
                    break;
            }
        }
        var inner = element.innerHTML;
        var Reg;
        for (var j = 0; j < miptag.length; j++) {
            if (miptag[j] === '') {
                continue;
            }
            Reg = new RegExp('<' + miptag[j], 'gim');
            inner = inner.replace(Reg, '<mip-' + miptag[j], inner);
            Reg = new RegExp('</\\s*' + miptag[j] + '>', 'gim');
            inner = inner.replace(Reg, '</mip-' + miptag[j] + '>', inner);
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

        function handleLogic(val, logic) {
            val = val ? val : '';
            var res = [];
            var sym = [];
            logic = logic.replace(/\|+/g, '|');
            logic = logic.replace(/\&+/g, '&');
            for (var o = 0; o < logic.length; o++) {
                if (logic.substr(o, 1) === '|' || logic.substr(o, 1) === '&') {
                    sym.push(logic.substr(o, 1));
                }
            }
            logic = logic.replace(/\&+/g, '|');
            logic = logic.split('|');
            if (logic.length > 0) {
                var pro;
                var rowres;
                for (var k = 0; k < logic.length; k++) {
                    var wrong = false;
                    if (logic[k].indexOf('!') === 0) {
                        wrong = true;
                        logic[k] = logic[k].substr(1);
                    }
                    if (val === '') {
                        if (logic[k] === '' && wrong) {
                            rowres = false;
                        }
                        else if (logic[k] === '' && !wrong) {
                            rowres = true;
                        }
                        else if (logic[k] !== '' && wrong) {
                            rowres = true;
                        }
                        else if (logic[k] !== '' && !wrong) {
                            rowres = false;
                        }
                    }
                    else if (logic[k] === '') {
                        if (wrong) {
                            rowres = false;
                        }
                        else if (!wrong) {
                            rowres = false;
                        }
                    }
                    else if (wrong && val.indexOf(logic[k]) === -1 || !wrong && val.indexOf(logic[k]) > -1) {
                        rowres = true;
                    }
                    else {
                        rowres = false;
                    }
                    if (k < 1) {
                        pro = rowres;
                    }
                    else if (sym[k - 1] === '&') {
                        pro = pro && rowres;
                    }
                    else if (sym[k - 1] === '|') {
                        pro = pro || rowres;
                    }
                }
                res.push(pro);
            }
            else {
                res.push(val === '');
            }
            return !(res.indexOf(false) > -1);
        }
    };

    return customElement;
});
