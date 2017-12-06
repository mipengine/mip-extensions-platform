/**
* 下载站mip改造
* @file 下载链接加密
* @author 576604471@qq.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        var jQuery =  require('md5');
        var element = this.element;
        var referId = $(element).attr('data-id');
        var filepath = $(element).attr('data-url');
        var hexTime = Math.floor(new Date().getTime() / 1000).toString(16);
        var md5 = jQuery.md5('yesky_download' + filepath + hexTime);
        var newlink = 'http://cdn1.mydown.yesky.com/' + hexTime + '/' + md5 + filepath;
        $(element).find('.down').attr('href', newlink);
        $(element).click(function () {
            var url = 'http://more.tianjimedia.com/soft/mdown.jsp?id=' + referId + '&f=1&rnd=' + Date.parse(new Date());
            $.getScript(url);
        });
    };
    return customElem;
});
