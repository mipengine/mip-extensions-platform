/**
 * @file mip-sy-news 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $ = require('jquery');
        var element = this.element;
        var tweixinImg = element.getAttribute('tweixin-imgsrc') || 'http://prt.zoosnet.net/LR/Chatpre.aspx?id=PRT92425424&lng=cn';
        var swtUrl = element.getAttribute('swtUrl') || 'http://2g.3751888.com/templets/default/images/icon02.png';
        var info1 = element.getAttribute('tweixin-info1') || ' 你好 ';
        var info2 = element.getAttribute('tweixin-info12') || ' 你有什么知心的 ';
        var weixinRootBz = document.createElement('div');
        var weixinRoot = document.createElement('div');
        var weixinImgdiv = document.createElement('div');
        var weixinImg = document.createElement('div');
        var weixinRight = document.createElement('div');
        var weixinRightP1 = document.createElement('p');
        var weixinRightP2 = document.createElement('p');
        var p = document.createTextNode(info1);
        weixinRootBz.setAttribute('class', 'weixinRootBz');
        weixinRoot.setAttribute('class', 'lvsu_tuisong');
        weixinImgdiv.setAttribute('class', 'lvsu_tuisong_left');
        weixinRoot.appendChild(weixinImgdiv);
        weixinImg.setAttribute('src', tweixinImg);
        weixinImgdiv.appendChild(weixinImg);
        weixinImgdiv.style.width = '10vw';
        weixinImgdiv.style.height = '5vh';
        weixinImgdiv.style.background = 'url(' + tweixinImg + ')';
        weixinRight.setAttribute('class', 'lvsu_tuisong_right');
        weixinRoot.appendChild(weixinRight);
        weixinRightP1.setAttribute('class', 'p1');
        weixinRight.appendChild(weixinRightP1);
        weixinRightP2.setAttribute('class', 'p2');
        weixinRight.appendChild(weixinRightP2);
        weixinRightP1.appendChild(p);
        p = document.createTextNode(info2);
        weixinRightP2.appendChild(p);
        weixinRootBz.appendChild(weixinRoot);
        element.appendChild(weixinRootBz);
        setTimeout(function () {
            showW(weixinRootBz);
        }, 5000);
        weixinRootBz.onclick = function () {
            location.href = swtUrl;
        };
    };
    return customElement;
});
function showW(dom) {
    $(dom).fadeIn(2000);
    setTimeout(function () {
        hideW(dom);
    }, 10000);
}
function hideW(dom) {
    $(dom).fadeOut(2000);
    setTimeout(function () {
        showW(dom);
    }, 15000);
}
