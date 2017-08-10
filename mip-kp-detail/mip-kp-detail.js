/**
 * @file mip-kp-detail 组件
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
        if (url.type === 'video') {
            fetchJsonp('https://www.dianjinghu.com/api.php/mip/video/index/id/' + url.id, {jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                var video = data.info.video;
                $('.detail-title').html(video.title);
                $('.detail-time span').html(video.add_time);
                $('.detail-video').show();
                $('.detail-video').attr('src', video.url_src);
                if (video.description) {
                    $('.videoDes').html(video.description);
                }
                $('.share-qq').on('click', function () {
                    window.open('https://connect.qq.com/widget/shareqq/index.html?title=' + video.title + '&url=http://mip.dianjinghu.com/detail.html?id=' + url.id + '&type=' + url.type, '_self');
                });
                $('.share-kongjian').on('click', function () {
                    window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://mip.dianjinghu.com/detail.html?id=' + url.id + '&type=' + url.type + '&title=' + video.title + '&pics=', '_self');
                });
                $('.share-weibo').on('click', function () {
                    window.open('https://service.weibo.com/share/share.php?searchPic=true&appkey=881608998&ralateUid=5607210981&language=zh_cn&url=http://mip.dianjinghu.com/detail.html?id=' + url.id + '&type=' + url.type + '&title=' + video.title + '&pic=', '_self');
                });
                // 推荐
                var list = data.info.video_list;
                for (var i = 0; i < list.length; i++) {
                    $('.list-wrapper').eq(i).find('.list').attr('href', list[i].url);
                    $('.list-main .list-wrapper').eq(i).find('.list-mip-img').attr('src', list[i].cover);
                    $('.list-main .list-wrapper').eq(i).find('.list-title').html(list[i].title);
                    $('.list-main .list-wrapper').eq(i).find('.list-tip-left').html(list[i].type_name);
                    $('.list-main .list-wrapper').eq(i).find('.list-tip-right').html(list[i].add_time);
                    $('.list-main .list-wrapper').eq(i).show();
                }
            });
        }
        else if (url.type === 'news') {
            fetchJsonp('https://www.dianjinghu.com/api.php/mip/news/index/id/' + url.id, {jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                var content = data.info.content;
                $('.detail-title').html(content.title);
                $('.detail-time span').html(content.add_time);
                $('.detail-content').html(content.content);
                if (content.description) {
                    $('.videoDes').html(content.description);
                }
                $('.share-qq').on('click', function () {
                    window.open('https://connect.qq.com/widget/shareqq/index.html?title=' + content.title + '&url=http://mip.dianjinghu.com/detail.html?id=' + url.id + '&type=' + url.type, '_self');
                });
                $('.share-kongjian').on('click', function () {
                    window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://mip.dianjinghu.com/detail.html?id=' + url.id + '&type=' + url.type + '&title=' + content.title + '&pics=', '_self');
                });
                $('.share-weibo').on('click', function () {
                    window.open('https://service.weibo.com/share/share.php?searchPic=true&appkey=881608998&ralateUid=5607210981&language=zh_cn&url=http://mip.dianjinghu.com/detail.html?id=' + url.id + '&type=' + url.type + '&title=' + content.title + '&pic=', '_self');
                });
                // 推荐
                var list = data.info.list;
                for (var i = 0; i < list.length; i++) {
                    $('.list-wrapper').eq(i).find('.list').attr('href', list[i].url);
                    $('.list-main .list-wrapper').eq(i).find('.list-mip-img').attr('src', list[i].cover);
                    $('.list-main .list-wrapper').eq(i).find('.list-title').html(list[i].title);
                    $('.list-main .list-wrapper').eq(i).find('.list-tip-left').html(list[i].type_name);
                    $('.list-main .list-wrapper').eq(i).find('.list-tip-right').html(list[i].add_time);
                    $('.list-main .list-wrapper').eq(i).show();
                }
            });
        }
    };

    return customElement;
});
