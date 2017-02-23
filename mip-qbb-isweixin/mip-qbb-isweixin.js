/**
 * @file mip-qbb-isweixin 组件
 * @author yml
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();

    var scrollFlagt;
    // 判断是否在微信中打开
    function isWeiXin() {
        var uaa = navigator.userAgent.toLowerCase();
        var kg = true;
        if (uaa.indexOf('micromessenger') > 0) {
            if (platform.isIos()) { // if ios
                $('body').append('<div class="mask main-bg">'
                    + '<mip-img src="http://m.qbaobei.com/Public/Down/qbaobeimobile/image/pgwx.png"></mip-img></div>');
            }

            if (platform.isAndroid()) { // if android
                $('body').append('<div class="mask main-bg">'
                    + '<mip-img src="http://m.qbaobei.com/Public/Down/qbaobeimobile/image/tipwx.png"></mip-img></div>');
            }

            $('.mask img').css({position: 'fixed', right: '22px', top: '15px'});
            document.addEventListener('touchmove', function (e) { // 清除底层文档默认滑动；
                if (kg) {
                    e.preventDefault();
                    e.stopPropagation();
                }

            }, false);
            $('.mask').click(function () {
                $('.mask').remove();
                kg = false;
            });
            return false;
        }
    }

    function setDownUrl() {
        var u = navigator.userAgent;
        if (platform.isAndroid() || u.indexOf('Linux') > -1) {
            $('a.down').attr('href', $('#android-down').val());
            $('a.downscroll').attr('href', $('#android-down').val());
            scrollFlagt = true;
        }
        else if (u.indexOf('iPhone') > -1) {
            $('a.down').attr('href', $('#iphone-down').val());
            $('a.downscroll').attr('href', $('#iphone-down').val());
            scrollFlagt = true;
        }
        else if (u.indexOf('iPad') > -1) {
            $('a.down').attr('href', $('#ipad-down').val());
            $('a.downscroll').attr('href', $('#ipad-down').val());
            scrollFlagt = true;
        }
        else {
            $('a.down').addClass('sc');
            $('a.down').html('正在上架...');
            $('a.down').attr('href', 'javascript:void(0);');
        }
        if (u.indexOf('MicroMessenger') > -1) {
            scrollFlagt = false;
            $('a.down').attr('href', 'javascript:isWeiXin();');
        }

        var url = $('a.down').attr('href');
        if (url === '') {
            scrollFlagt = false;
            $('a.down').addClass('sc');
            $('a.down').html('正在上架...');
            $('a.down').attr('href', 'javascript:void(0);');
        }

        $('a.down').show();
    }

    customElement.prototype.firstInviewCallback = function () {
        setDownUrl();
    };

    return customElement;
});
