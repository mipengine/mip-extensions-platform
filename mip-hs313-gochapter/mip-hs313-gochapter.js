/**
* @file mip-hs313-gochapter 组件
* @author hs313.net
*/

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var ele = this.element;
        var novelid = ele.getAttribute('novelid');
        if (novelid) {
            ele.getElementsByTagName('button')[0].addEventListener('click', function () {
                var chapterid = document.getElementById('chapterid').value;
                var re = /^[0-9]+.?[0-9]*$/;
                if (!re.test(chapterid)) {
                    var tag = document.createElement('div');
                    tag.setAttribute('class', 'mip-gochapter-alert');
                    tag.innerHTML = '请输入数字！';
                    ele.appendChild(tag);
                    setTimeout(function () {
                        ele.removeChild(document.getElementsByClassName('mip-gochapter-alert')[0]);
                    }, 1000);
                    return false;
                }
                var url = 'https://m.hs313.net/book/' + novelid + '/' + chapterid + '.html';
                window.top.location.href = url;
            });
        }
    };
    return customElement;
});
