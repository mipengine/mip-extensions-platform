/**
 * @file mip-kuhou-xzq 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var util = require('util');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var xzqid = element.getAttribute('xzqid');
        var gsxzq = element.querySelector('[gsxzid]');
        var puxzq = element.querySelector('[ptid]');
        document.getElementById(xzqid).addEventListener('click', function () {
            if (this.checked === true) {
                util.css(gsxzq, 'display', 'block');
                util.css(puxzq, 'display', 'none');
            }
			else {
                util.css(gsxzq, 'display', 'none');
                util.css(puxzq, 'display', 'block');
            }
        });
    };
    return customElement;
});
