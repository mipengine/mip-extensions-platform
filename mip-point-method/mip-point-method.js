/**
 * @file mip-point-method 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    // 获取id
    function gt(objID) {
        return document.getElementById(objID);
    }
    // 展开回复
    function replyclick(obj, num) {
        if (gt(obj + num).style.display === 'none') {
            gt(obj + num).style.display = 'block';
        }
        else {
            gt(obj + num).style.display = 'none';
        }
    }
    // 顶
    function dingComment(index, str, str2, ding, idname) {
        var p = '/' + index + '.php?m=' + str2 + '&a=' + ding + '&id=' + str + '&now=' + Math.random();
        var htmlobj = $.ajax({url: p, async: false});
        $('#' + idname + str).html($.trim(htmlobj.responseText));
    }
    // 验证码刷新
    function reloadImgCode(name, src, imgcode) {
        if ($('#' + name).length) {
            var img = document.getElementById(imgcode);
            img.setAttribute('src', src + Math.random());
        }
    }
    // 多个验证码刷新
    function reloadImgCodes(name, src, str, imgcode) {
        if ($('#' + name + str).length) {
            var img = document.getElementById(imgcode + str);
            img.setAttribute('src', src + Math.random());
        }
    }
    // 图片自适应屏高距离垂直居中
    function changeTops(href, imgName, offinfo) {
        var img = new Image();
        img.src = href;
        var iw = img.width;
        var ih = img.height;
        var wh = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
        var ww = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        var fw = ww / iw;
        var fh = wh / ih;
        var W;
        var H;
        var th =  document.getElementById(offinfo).offsetHeight;
        if (iw === 0) {
            W = 0.3333333333333333 * 960;
            H = 0.3333333333333333 * 600;
        }
        else {
            if (fw < fh) {
                W = fw * iw;
                H = fw * ih;
            }
            else {
                W = fh * iw;
                H = fh * ih;
            }
        }
        $('#' + imgName).css({width: W, height: H});
        var L = wh - H;
        $('#' + imgName).css('margin-top', ((L - th) / 2) + 'px');
    }
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;
        var code = element.getAttribute('data-code') || '';
        var parameter = element.getAttribute('data-parameter') || '';
        if (!parameter && !code) {
            alert('请仔细阅读文档说明再使用，避免参数填写错误，导致效果不佳');
            return;
        }
        var par = parameter.split(',');
        if (code === 'replyclick') {
            replyclick(par[0], par[1] ? par[1] : '');
        }
        if (code === 'changeTops') {
            changeTops(par[0], par[1], par[2]);
        }
        element.addEventListener('click', function () {
            if (code === 'replyclick') {
                replyclick(par[0], par[1] ? par[1] : '');
            }
            else if (code === 'dingComment') {
                dingComment(par[0], par[1], par[2], par[3], par[4]);
            }
            else if (code === 'reloadImgCode') {
                reloadImgCode(par[0], par[1], par[2]);
            }
            else if (code === 'reloadImgCodes') {
                reloadImgCodes(par[0], par[1], par[2], par[3]);
            }
            else if (code === 'changeTops') {
                changeTops(par[0], par[1], par[2]);
            }
            else {
                return alert('暂无组件函数，需新增……');
            }
        });
    };

    return customElement;
});
