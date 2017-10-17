/**
 * @file mip-cehome-forumlist 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');
    var ext = {};
    var getExtdata = function () {
        var extdata = {};
        $('script.json-inline').each(function (i, ele) {
            var name = $(ele).attr('data-name');
            var value = $(ele).text();
            var configObj = JSON.parse(value);
            extdata[name] = configObj;
        });
        return extdata;
    };
    ext = getExtdata();
    var myIndexUrl = ext.info.myIndexUrl;
    var threadTopUrl = ext.info.threadTopUrl;
    var forumListUrl = ext.info.forumListUrl;
    var forumIndexUrl = ext.info.forumIndexUrl;

    $('#indexLink').click(function () {
        window.location.href = 'https://m.cehome.com/news/';
    });
    $('#productLink').click(function () {
        window.location.href = 'https://m.cehome.com/zhengji/';
    });
    $('#myIndexLink').click(function () {
        window.location.href = myIndexUrl;
    });
    $('#threadTopLink').click(function () {
        window.location.href = threadTopUrl;
    });
    $('#forumListLink').click(function () {
        window.location.href = forumListUrl;
    });
    $('#threadNewLink').click(function () {
        window.location.href = forumIndexUrl;
    });
    var render = function () {
        $('#banner img').each(function () {
            if (!this.complete || typeof this.naturalWidth === 'undefined' || this.naturalWidth === 0) {
                this.src = 'https://m.cehome.com/bbs/img/defaultImg.png';
            }
        });
    };
    window.onload = function () {
        render();
    };
    return {
        render: render
    };
});
