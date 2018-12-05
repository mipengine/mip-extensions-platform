/**
 * @file mip-ifrontend-alert alert提示框
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var ele = self.element;
        var util = require('util');
        var alertTitle = ele.getAttribute('alert-title') || '提示';
        var alertContent = ele.getAttribute('alert-content') || '我的自定义alert美化弹出框';

        self.addEventAction('openAlert', function (event) {
            var layerBg = document.createElement('div');
            var layerBox = document.createElement('div');
            var title = document.createElement('div');
            var content = document.createElement('div');
            var button = document.createElement('div');
            layerBox.className = 'layer-box';
            layerBg.className = 'layer-bg';
            title.className = 'title';
            title.innerHTML = alertTitle;
            content.className = 'content';
            content.innerHTML = alertContent;
            button.className = 'button';
            button.innerHTML = '确认';
            button.onclick = closeAlert;
            layerBox.appendChild(title);
            layerBox.appendChild(content);
            layerBox.appendChild(button);
            ele.appendChild(layerBg);
            ele.appendChild(layerBox);
        });

        // 关闭弹框
        function closeAlert() {
            var layerBgElement = ele.querySelector('.layer-bg');
            var layerBoxElement = ele.querySelector('.layer-box');
            ele.removeChild(layerBgElement);
            ele.removeChild(layerBoxElement);
        }
    };

    return customElement;
});
