/**
* 下载站mip改造
* @file 下载百度自动推送
* @author 576604471@qq.com
* @version 1.0.0
*/
define(function (require) {
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        var curProtocol = window.location.protocol.split(':')[0];
        curProtocol === 'https' ? require('https://zz.bdstatic.com/linksubmit/push')() : require('http://push.zhanzhang.baidu.com/push')();
    };
    return customElem;
});
