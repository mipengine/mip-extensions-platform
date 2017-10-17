/**
 * @file mip-cehome-common 组件
 * @author
 */

define(function (require) {

    (function () {
        var docEl = document.documentElement;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        var recalc = function () {
                var clientWidth = document.body.scrollWidth;
                if (!clientWidth) {
                    return;
                }
                docEl.style.fontSize = (100 * (clientWidth / 750) > 100 ? 100 : 100 * (clientWidth / 750)) + 'px';
            };
        if (!document.addEventListener) {
            return;
        }
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);
    })();

    window.isWeiXin = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
            return true;
        } else {
            return false;
        }
    };

    window.getRoot = function () {
        var hostname = location.hostname;
        var pathname = location.pathname;
        var contextPath = pathname.split('/')[1];
        var port = location.port;
        var protocol = location.protocol;
        return protocol + '//' + hostname + '/' + contextPath;
    };

    window.nofind = function (type) {

        var img = event.srcElement;
        var baseurl = window.getRoot();

        if (type === 'avatar') {
            img.src = baseurl + '/img/defaultUser.png';
        } else if (type === 'img') {
            img.src = baseurl + '/img/defaultImg.png';
        }

        img.onerror = null;
    };

    var timer;
    window.processIos8 = function (tid) {
        var appUrl = tid ? 'cehomeapp://threadDetailPage?tid=' + tid : 'cehomeapp://';

        var sendObjectMessage = function (url) {
            var iframe = document.createElement('iframe');
            iframe.setAttribute('src', url);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        };

        sendObjectMessage(appUrl);

        timer = setTimeout(function () {
            $('.openAppLoading').addClass('hide');
            var targetUrl = 'https://itunes.apple.com/cn/app/tie-jia-lun-tan-tie-jia-gong/id989144923?mt=8';
            window.location = targetUrl;
        }, 1500);
    };

    window.openApp = function (tid) {
        var host = 'http://bbs.cehome.com/';
        var iswx = window.isWeiXin() ? '1' : '0';
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {

            if (Boolean(navigator.userAgent.match(/OS [8]_\d[_\d]* like Mac OS X/i))) {
                window.processIos8(tid);
            } else {
                window.location = tid ? 'cehomeapp://threadDetailPage?tid=' + tid : 'cehomeapp://';
                timer = setTimeout(function () {
                    $('.openAppLoading').addClass('hide');
                    window.location.href = 'https://itunes.apple.com/cn/app/tie-jia-lun-tan-tie-jia-gong/id989144923?mt=8';
                }, 1500);
            }


        } else if (navigator.userAgent.match(/android/i)) {
            window.location = tid ? 'cehomeapp://threadDetailPage?tid=' + tid : 'cehomeapp://';
            timer = setTimeout(function () {
                $('.openAppLoading').addClass('hide');
                window.location.href = host + 'cehomeapph5/zt/wap/download2300/index.html?resource=bbs&wx=' + iswx;
            }, 1500);
        } else {
            location.href = host + 'cehomeapph5/zt/wap/download2300/index.html?resource=bbs&wx=' + iswx;
        }
    };

    window.bindOpenFunc = function () {
        $('div[rel=\'tid\']').click(function () {
            var tid = $(this).attr('tid');
            window.openApp(tid);
        });
    };

    window.nofindAvatar = function () {
        $('div.userBox img').each(function () {
            if (!this.complete || typeof this.naturalWidth === 'undefined' || this.naturalWidth === 0) {
                this.src = 'https://m.cehome.com/bbs/img/defaultUser.png';
            }
        });
    };

    window.nofindImg = function () {
        $('ul.imgBox img').each(function () {
            if (!this.complete || typeof this.naturalWidth === 'undefined' || this.naturalWidth === 0) {
                this.src = 'https://m.cehome.com/bbs/img/defaultImg.png';
            }
        });
    };

});
