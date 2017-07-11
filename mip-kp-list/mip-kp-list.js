/**
 * @file mip-kp-list 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');


    function getRequest() {
        var url = window.location.search;
        var theRequest = {};
        if (url.indexOf('?') !== -1) {
            var str = url.substr(1);
            var strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
            }
        }
        return theRequest;
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var url = getRequest();
        $('.list-head-h1').html(url.title);
        if (url.c === 'game') {
            $('mip-infinitescroll').attr('data-src', 'http://www.dianjinghu.com/web.php?m=mip&c=game&a=indexDATA&type=' + url.type);
        }
        else if (url.c === 'Hsbd') {
            $('mip-infinitescroll').attr('data-src', 'http://www.dianjinghu.com/web.php?m=mip&c=Hsbd&a=indexDATA&type=' + url.type);
        }
        $('.list-tip-left').html(url.title);
    };

    return customElement;
});
