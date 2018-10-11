/**
 * @file 360doc 自定义逻辑组件
 * @author www.360doc.com技术部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',
        'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var element = $(this.element);
        if ($(element.find('.hiddenoriginal')).val() === '1' || $(element.find('.hiddenoriginal')).val() === 1) {
            artImgLog(1);
            $(window).scroll(GetArtImgLog);
            $(window).resize(GetArtImgLog);
        }
        // 滚动条到内容80%
        var IsArtImgLog = true;
        function GetArtImgLog() {
            var wH = $(window).height();
            var scrT = $(window).scrollTop();
            if (IsArtImgLog) {
                if (wH + scrT > $(element.find('.btop20')).height()) {
                    artImgLog(2);
                    IsArtImgLog = false;
                }
            }
        }

        // 文章统计
        function artImgLog(imgOrder) {
            var img = new Image();
            var key = 'broswerlog_' + Math.floor(Math.random() * 2147483648).toString(36);
            window[key] = img;
            var uid = (new Date()).getTime();
            img.onload = img.onerror = function () {
                img.onload = img.onerror = null;
                img = null;
                window[key] = null;
            };
            var url = '';
            switch (imgOrder) {
                case 1:
                case 2:
                    url = 'http://eclick.360doc.com/mipartpage' + imgOrder + '.jpg';
                    break;
                case 3:
                    url = 'http://eclick.360doc.com/mipartpage1.jpg';
                    break;
                case 4:
                    url = 'http://eclick.360doc.com/mipartpage2.jpg';
                    break;
            }
            // 判断是否登陆
            var artid = getID();
            if (getCookie('360doc_pid3') === null || getCookie('360doc_pid3') === '') {
                setCookie('360doc_pid3', generateMixed(16) + uid, 24 * 30);
            }
            var pid = getCookie('360doc_pid3');
            var refer = encodeURIComponent(document.referrer);
            img.src = url + '?artid=' + artid + '&pid=' + pid + '&ts=' + uid
            + '&refer=' + refer + '&sign=' + generateMixed(8);
        }
        //  获取文章id
        function getID() {
            var artid = $(element.find('.mip-360doc-script-saveid')).html();
            return artid;
        }
        function generateMixed(n) {
            var res = '';
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += chars[id];
            }
            return res;
        }
        function setCookie(name, value, Hours) {
            var d = new Date();
            var offset = 8;
            var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            var nd = utc + (3600000 * offset);
            var exp = new Date(nd);
            exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
            var content = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
            + ';';
            document.cookie = content;
        }
        function getCookie(name) {
            var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
            if (arr != null) {
                return unescape(arr[2]);
            }
            return null;
        }



    };
    return customElem;
});
