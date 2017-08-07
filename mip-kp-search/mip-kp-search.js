/**
 * @file mip-kp-search 组件
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
        if (url.key) {
            fetchJsonp('https://www.dianjinghu.com/api.php/mip/search/index?keyword=' + url.key, {jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.data.items) {
                    $('mip-infinitescroll').attr('data-src', 'https://www.dianjinghu.com/api.php/mip/search/index?keyword=' + url.key);
                }
                else {
                    $('mip-kp-search').remove();
                    $('.noSearch').show();
                }
            });
            setTimeout(function () {
                if (!$('.mip-infinitescroll-results').html()) {
                    $('.noSearch').show();
                    $('mip-infinitescroll').hide();
                }
            }, 1000);
        }
    };

    return customElement;
});
