/**
* fixed nav
* @file fixed nav component
* @author 873920193@qq.com
* @version 1.1
* @copyright 2018 onlinedown.net, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function init(isid, element) {
        var ba = document.referrer.indexOf('baidu') > -1;
        var bb = (isid === '1219170');
        var bb1 = (isid === '637958');
        var bc = document.referrer.indexOf('www.onlinedown.net') > -1;
        if (ba || bb || bb1 || bc) {
            $(element).find('em.icon').addClass('checkhover');
            $(element).find('#spdownload').hide();
            $(element).find('#download').show();
            $(element).find('.text2').hide();
            $(element).find('.text1').show();
        }
        else {
            $(element).find('em.icon').removeClass('checkhover');
            if ($(element).find('#spdownload').attr('href')) {
                $(element).find('#spdownload').show();
                $(element).find('#download').hide();
            }
            else {
                $(element).find('#spdownload').hide();
                $(element).find('#download').show();
            }
            $(element).find('.text1').hide();
            $(element).find('.text2').show();
        }
    }
    //
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        var hsId = $(element).attr('hsId');
        init(hsId, element);
    };
    return customElem;
});
