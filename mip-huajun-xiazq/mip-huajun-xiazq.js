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

    function init() {
        var u = navigator.userAgent;
        var baiduspider = u.indexOf('Baiduspider') > -1;
        if (document.referrer.indexOf('baidu') > -1) {
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
        if (baiduspider) {
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
        init();
    };
    return customElem;
});
