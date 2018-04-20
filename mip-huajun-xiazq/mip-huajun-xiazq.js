/**
* fixed nav
* @file fixed nav component
* @author 873920193@qq.com
* @version 1.0
* @copyright 2018 onlinedown.net, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function init(isid) {
        var ba = document.referrer.indexOf('baidu') > -1;
        var bb = (isid === '1219170');
        var bc = document.referrer.indexOf('www.onlinedown.net') > -1;
        if (ba || bb || bc) {
            $('em.icon').addClass('checkhover');
            $('#spdownload').hide();
            $('#download').show();
            $('.text2').hide();
            $('.text1').show();
        }
        else {
            $('em.icon').removeClass('checkhover');
            if ($('#spdownload').attr('href')) {
                $('#spdownload').show();
                $('#download').hide();
            }
            else {
                $('#spdownload').hide();
                $('#download').show();
            }
            $('.text1').hide();
            $('.text2').show();
        }
    }
    //
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        var hsId = $(element).attr('hsId');
        init(hsId);
    };
    return customElem;
});
