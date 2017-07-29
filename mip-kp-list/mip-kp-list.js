/**
 * @file mip-kp-list 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var fetchJsonp = require('fetch-jsonp');

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
        // 有c就进行有参数的数据请求，没有就进行搜索的请求
        if (url.c) {
            $('.list-head-h1').html(url.title);
            if (url.c === 'game') {
                $('mip-infinitescroll').attr('data-src', 'http://www.dianjinghu.com/web.php?m=mip&c=game&a=indexDATA&type=' + url.type);
            }
            else if (url.c === 'Hsbd') {
                $('mip-infinitescroll').attr('data-src', 'http://www.dianjinghu.com/web.php?m=mip&c=Hsbd&a=indexDATA&type=' + url.type);
            }
            $('.list-tip-left').html(url.title);
        }
        $('.search-touch').on('click', function () {
            var searchVal = $('.search-ipt').val();
            if (!searchVal) {
                $('.search-main').hide();
                $('.noSearch').show();
            }
            else {
                $(this).attr('href', 'http://www.dianjinghu.com/web.php?m=mip&c=search&a=result&key=' + searchVal);
            }
        });
    };
    return customElement;
});
