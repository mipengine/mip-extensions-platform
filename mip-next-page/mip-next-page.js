/**
 * @file mip-next-page 组件，根据栏目ID号，替换下一页跳转的地址，跳转改分类首页
 * @author gom
 */

define(function (require) {

    var customElement = require('customElement').create();
    function nextpage() {
        var webInfo = {
            catid: $('.f-information').attr('data-categroyId')
        };
        if (webInfo.catid === '9') {
            $('.m-nexta').attr('href', 'http://m.qqtn.com/bq.html');
        } else if (webInfo.catid === '18') {
            $('.m-nexta').attr('href', 'http://m.qqtn.com/ss.html');
        } else if (webInfo.catid === '20') {
            $('.m-nexta').attr('href', 'http://m.qqtn.com/tx.html');
        } else if (webInfo.catid === '23') {
            $('.m-nexta').attr('href', 'http://m.qqtn.com/qm.html');
        } else if (webInfo.catid === '28') {
            $('.m-nexta').attr('href', 'http://m.qqtn.com/wm.html');
        } else if (webInfo.catid === '72') {
            $('.m-nexta').attr('href', 'http://m.qqtn.com/tp.html');
        } else if (webInfo.catid === '74') {
            $('.m-nexta').attr('href', 'http://m.qqtn.com/pf.html');
        }
    }
    customElement.prototype.build = function () {
        nextpage();
    };
    return customElement;
});
