/**
 * @file mip-codeGif 组件
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
        var codeType = element.getAttribute('codeType') || 'A';
        var fullcode = element.getAttribute('fullcode') || '';
        element.querySelectorAll('span')[0].onclick = function () {
            var url = '';
            var classVal =  element.querySelectorAll('span')[0].getAttribute('class');
            classVal = classVal.replace('m_hq_title_act', '');
            element.querySelectorAll('span')[0].setAttribute('class', classVal);
            element.querySelectorAll('span')[1].setAttribute('class', classVal);
            element.querySelectorAll('span')[2].setAttribute('class', classVal);
            element.querySelectorAll('span')[3].setAttribute('class', classVal);
            element.querySelectorAll('span')[0].classList.add('m_hq_title_act');
            if ('A' === codeType) {
                url = 'http://image.sinajs.cn/newchart/min/' + fullcode + '.gif';
            } else if ('H' === codeType) {
                // 分时
                url = 'http://image.sinajs.cn/newchart/hk_stock/min/' + fullcode + '.gif';
            } else {
                // 分时
                url = 'http://image.sinajs.cn/newchart/usstock/min/' + fullcode + '.gif';
            }
            element.querySelectorAll('span')[2].classList.add('hq_frzy_active');
            element.querySelectorAll('mip-img')[0].setAttribute('src', url);
        };
        element.querySelectorAll('span')[1].onclick = function () {
            var url = '';
            var classVal = document.getElementById('min').getAttribute('class');
            classVal = classVal.replace('m_hq_title_act', '');
            element.querySelectorAll('span')[0].setAttribute('class', classVal);
            element.querySelectorAll('span')[1].setAttribute('class', classVal);
            element.querySelectorAll('span')[2].setAttribute('class', classVal);
            element.querySelectorAll('span')[3].setAttribute('class', classVal);
            element.querySelectorAll('span')[1].classList.add('m_hq_title_act');
            if ('A' === codeType) {
                // 日线
                url = 'http://image.sinajs.cn/newchart/daily/' + fullcode + '.gif';
            } else if ('H' === codeType) {
                url = 'http://image.sinajs.cn/newchart/hk_stock/daily/' + fullcode + '.gif';
            } else {
                // 日线
                url = 'http://image.sinajs.cn/newchart/usstock/daily/' + fullcode + '.gif';
            }
            element.querySelectorAll('span')[1].classList.add('hq_frzy_active');
            element.querySelectorAll('mip-img')[0].setAttribute('src', url);
        };
        element.querySelectorAll('span')[2].onclick = function () {
            var url = '';
            var classVal = element.querySelectorAll('span')[2].getAttribute('class');
            classVal = classVal.replace('m_hq_title_act', '');
            element.querySelectorAll('span')[0].setAttribute('class', classVal);
            element.querySelectorAll('span')[1].setAttribute('class', classVal);
            element.querySelectorAll('span')[2].setAttribute('class', classVal);
            element.querySelectorAll('span')[3].setAttribute('class', classVal);
            element.querySelectorAll('span')[2].classList.add('m_hq_title_act');
            if ('A' === codeType) {
                // 周线
                url = 'http://image.sinajs.cn/newchart/weekly/' + fullcode + '.gif';
            } else if ('H' === codeType) {
                // 周线
                url = 'http://image.sinajs.cn/newchart/hk_stock/weekly/' + fullcode + '.gif';
            } else {
                // 周线
                url = 'http://image.sinajs.cn/newchart/usstock/weekly/' + fullcode + '.gif';
            }
            element.querySelectorAll('span')[2].classList.add('hq_frzy_active');
            element.querySelectorAll('mip-img')[0].setAttribute('src', url);
        };
        element.querySelectorAll('span')[3].onclick = function () {
            var url = '';
            var classVal = element.querySelectorAll('span')[3].getAttribute('class');
            classVal = classVal.replace('m_hq_title_act', '');
            element.querySelectorAll('span')[0].setAttribute('class', classVal);
            element.querySelectorAll('span')[1].setAttribute('class', classVal);
            element.querySelectorAll('span')[2].setAttribute('class', classVal);
            element.querySelectorAll('span')[3].setAttribute('class', classVal);
            element.querySelectorAll('span')[3].classList.add('m_hq_title_act');
            if ('A' === codeType) {
                // 月线
                url = 'http://image.sinajs.cn/newchart/monthly/' + fullcode + '.gif';
            } else if ('H' === codeType) {
                // 月线
                url = 'http://image.sinajs.cn/newchart/hk_stock/monthly/' + fullcode + '.gif';
            } else {
                // 月线
                url = 'http://image.sinajs.cn/newchart/usstock/monthly/' + fullcode + '.gif';
            }
            element.querySelectorAll('span')[3].classList.add('hq_frzy_active');
            element.querySelectorAll('mip-img')[0].setAttribute('src', url);
        };
    };

    return customElement;
});