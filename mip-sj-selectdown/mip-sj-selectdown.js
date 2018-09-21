/**
 * @file mip-sj-demo 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var listbtn = ele.querySelector('#selectdown-item').querySelectorAll('li');
        var letter = ele.querySelector('#selectdown-cont').querySelectorAll('div');
        for (var i = 0; i < listbtn.length; i++) {
            listbtn[i].onclick = function () {
                change(this);
            };
        }
        function change(obj) {
            for (var i = 0; i < listbtn.length; i++) {
                if (listbtn[i] === obj) {
                    if (letter[i].className === 'show') {
                        letter[i].className = 'hidde';
                        obj.className = '';
                    }
                    else {
                        letter[i].className = 'show';
                    }
                }
                else {
                    letter[i].className = 'hidde';
                    obj.className = '';
                }
            }
        }
    };
    return customElement;
});
