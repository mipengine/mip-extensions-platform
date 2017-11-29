/**
 * @file mip-zmall-share 组件
 * @author wenxd
 */

define(function (require) {

    var customElement = require('customElement').create();

    // build说明: 在首屏展示，需要尽快加载
    customElement.prototype.build = function () {

        var ele = this.element;

        var btnId = ele.getAttribute('data-btn-id');
        var shareBtn = document.getElementById(btnId);

        var sharePanel = ele.querySelector('.mip-share-container');

        var mask = document.createElement('div');
        mask.classList.add('mip-zmall-share-mask');
        ele.appendChild(mask);

        shareBtn && shareBtn.addEventListener('click', function () {
            mask.classList.add('mip-zmall-share-mask-show');
            sharePanel.classList.add('mip-share-container-show');
        });

        mask.addEventListener('click', function () {
            mask.classList.remove('mip-zmall-share-mask-show');
            sharePanel.classList.remove('mip-share-container-show');
        });
    };

    return customElement;
});
