/**
* fixed nav
* @file fixed nav component
* @author 873920193@qq.com
* @version 1.0
* @copyright 2016 onlinedown.net, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function init() {
        $('#h-searchbtn').on('click', function () {
            if ($('#h-searchbox').hasClass('active')) {
                $('#h-searchbox').removeClass('active');
            }
            else {
                $('#h-searchbox').addClass('active');
            }
        });
        $('#h-headerlist').css('transform', 'translateY(-1000px)');
        $('#h-listbtn').on('click', function () {
            if ($('#h-headerlist').hasClass('active')) {
                $('#h-headerlist').css('transform', 'translateY(-1000px)').removeClass('active');
            }
            else {
                $('#h-headerlist').addClass('active').css('transform', 'translateY(0px)');
            }
        });
    }
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});
