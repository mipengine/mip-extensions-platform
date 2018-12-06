/**
 * @file mip-tool-freeread 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var readContent = document.getElementById('readContent');
        var readPanel = document.getElementById('readPanel');
        var setSize = document.querySelectorAll('[data-size]');
        var setTheme = document.querySelectorAll('[data-theme]');
        var text = document.querySelector('.read-text');
        var body = document.querySelector('body');
        if (localStorage.getItem('read_size')) {
            var size = localStorage.getItem('read_size');
            text.style.fontSize = size + 'px';
            setSize[0].classList.remove('active');
            document.querySelector('[data-size="' + size + '"]').classList.add('active');
        }
        if (localStorage.getItem('read_theme')) {
            var theme = localStorage.getItem('read_theme');
            body.className = 'theme' + theme;
            setTheme[0].classList.remove('active');
            document.querySelector('[data-theme="' + theme + '"]').classList.add('active');
        }
        readContent.addEventListener('click', function () {
            readPanel.classList.toggle('open');
        }, false);
        var util = require('util');
        util.event.delegate(document.getElementById('sizePanel'),
            '[data-size]',
            'click', function () {
                text.style.fontSize = this.getAttribute('data-size') + 'px';
                for (var j = 0; j < setSize.length; j++) {
                    setSize[j].classList.remove('active');
                }
                this.classList.add('active');
                localStorage.setItem('read_size', this.getAttribute('data-size'));
            });
        util.event.delegate(document.getElementById('themePanel'),
            '[data-theme]',
            'click', function () {
                body.className = 'theme' + this.getAttribute('data-theme');
                for (var j = 0; j < setTheme.length; j++) {
                    setTheme[j].classList.remove('active');
                }
                this.classList.add('active');
                localStorage.setItem('read_theme', this.getAttribute('data-theme'));
            });
    };

    return customElement;
});
