/**
 * @file mip-cr173-addapp 组件，用来动态给页面添加内容，该内容需要在首屏显示，越快加载越好，必须使用build，不要再打回了
 * @author gom
 */

define(function (require) {

    var $ = require('zepto');

    var customElement = require('customElement').create();
    function addlist() {
        var aurl = $('.f-ajul').attr('data-topdateurl');
        var ajatxturl = aurl + 'app/top_az.json';
        if (/iphone|ipad/i.test(navigator.userAgent)) {
            var ajatxturl = aurl + 'app/top_ios.json';
        }
        fetch(ajatxturl)
        .then(function (res) {
            return res.text();
        }).then(function (data) {
            var html = '';
            var data = (new Function('', 'return' + data))();
            var n = data.list;
            for (var o = 0; o < n.length; ++o) {
                html += '<li><a href="' + n[o].url + '"><mip-img src="' + n[o].SmallImg + '">';
                html += '</mip-img><h3>' + n[o].ResName + '</h3></a></li>';
            }
            $('.f-ajul').append(html);
        }).catch(function (err) {
        });
    }
    customElement.prototype.build = function () {
        addlist();
    };
    return customElement;
});
