/**
 * @file mip-km28-ad1 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var $ele = $(ele);
        var arr = ['/data', '/live', '/odds', '/fight', '/lottery-color', '/lottery-sf', '/yuce/zqsf.html',
        '/yuce/rxj.html', '/yuce/bjdc.html', '/yuce/jczq.html', '/promotion', '/tag-flist/rxj/', '/tag-flist/zqsf/',
        '/tag-flist/bjdc/', '/tag-flist/jczq/', '/lothome/jczq.html', '/introdetail/zqsf.html',
        '/introdetail/jczq.html', '/lothome/jczq.html', '/lothome/zqsf.html', '/lothome/bjdc.html',
        '/lothome/rxj.html', '/lottery/jc.html', 'index'];
        var urls = window.parent.location.href;
        console.log(urls);
        function isInArray(arr, val) {
            var testStr = ',' + arr.join(',') + ',';
            return testStr.indexOf(',' + val + ',') !== -1;
        }
        var sNew =  isInArray(arr, 'b');
        var inurl;
        $.each(arr, function (index, o) {
            if (urls.indexOf(o) !== -1) {
                inurl = true;
            }
            else {
                inurl = false;
            }
        });
        var truedata = {
            dataid: 'm_footer_ad1',
            src: 'https://m.km28.com/css/main/images/adv/footer_l_180419.gif',
            href: 'https://m.laicai88.cn/active/AcCoupon.aspx?EVEntId=10&p=277995'
        };
        var falsedata = {
            dataid: 'm_footer_ad2',
            src: 'https://m.km28.com/css/main/images/adv/footer_h_180402.gif',
            href: 'https://m.laicai88.cn/active/AcCoupon.aspx?EVEntId=10&p=277995'
        };
        if (inurl) {
            $(ele).find('.iframebox').attr('data-id', truedata.dataid);
            $(ele).find('.adimgbox img').attr('src', truedata.src);
            $(ele).find('.adimgbox a').attr('href', truedata.href);
        }
        else {
            $(ele).find('.iframebox').attr('data-id', falsedata.data);
            $(ele).find('.adimgbox img').attr('src', falsedata.src);
            $(ele).find('.adimgbox a').attr('href', falsedata.href);
        };
    };
    return customElement;
});
