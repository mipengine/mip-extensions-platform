/**
 * @file mip-qtkj-roll 组件
 * @author yzxsl
 */
define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        function Marquee() {
            this.direction = arguments[0];
            this.step = arguments[1];
            this.speed = arguments[2] || 30;
            this.delayTime = arguments[3];
            this.waitTime = arguments[4];
            this.ScrollStep = this.direction > 1 ? parseInt(element.
                getAttribute('delayWidth'), 10) : parseInt(element.
                getAttribute('delayHeight'), 10);
            this.CTL = this.StartID = this.Stop = this.MouseOver = 0;
            element.style.overflowX = element.style.overflowY = 'hidden';
            element.noWrap = true;
            this.ClientScroll = this.direction > 1 ? element.scrollWidth : element.scrollHeight;
            element.innerHTML += element.innerHTML;
            this.start(this, this.speed, this.delayTime, this.waitTime);
        }
        Marquee.prototype.start = function (msobj, timer, waittime, stoptime) {
            msobj.StartID = function () {
                msobj.scroll();
            };
            msobj.Continue = function () {
                if (msobj.MouseOver === 1) {
                    setTimeout(msobj.Continue, waittime);
                }
                else {
                    clearInterval(msobj.TimerID);
                    msobj.CTL = msobj.Stop = 0;
                    msobj.TimerID = setInterval(msobj.StartID, timer);
                }
            };
            msobj.pause = function () {
                msobj.Stop = 1;
                clearInterval(msobj.TimerID);
                setTimeout(msobj.Continue, waittime);
            };
            msobj.begin = function () {
                msobj.TimerID = setInterval(msobj.StartID, timer);
                element.onmouseover = function () {
                    msobj.MouseOver = 1;
                    clearInterval(msobj.TimerID);
                };
                element.onmouseout = function () {
                    msobj.MouseOver = 0;
                    if (msobj.Stop === 0) {
                        clearInterval(msobj.TimerID);
                        msobj.TimerID = setInterval(msobj.StartID, timer);
                    }
                };
            };
            setTimeout(msobj.begin, stoptime);
        };
        Marquee.prototype.scroll = function () {
            switch (this.direction) {
                case 0:
                    this.CTL += this.step;
                    if (this.CTL >= this.ScrollStep && this.delayTime > 0) {
                        element.scrollTop += this.ScrollStep + this.step - this.CTL;
                        this.pause();
                        return;
                    }
                    else {
                        if (element.scrollTop >= this.ClientScroll) {
                            element.scrollTop -= this.ClientScroll;
                        }
                        element.scrollTop += this.step;
                    }
                    break;
                case 1:
                    this.CTL += this.step;
                    if (this.CTL >= this.ScrollStep && this.delayTime > 0) {
                        element.scrollTop -= this.ScrollStep + this.step - this.CTL;
                        this.pause();
                        return;
                    }
                    else {
                        if (element.scrollTop <= 0) {
                            element.scrollTop += this.ClientScroll;
                        }
                        element.scrollTop -= this.step;
                    }
                    break;
                case 2:
                    this.CTL += this.step;
                    if (this.CTL >= this.ScrollStep && this.delayTime > 0) {
                        element.scrollLeft += this.ScrollStep + this.step - this.CTL;
                        this.pause();
                        return;
                    }
                    else {
                        if (element.scrollLeft >= this.ClientScroll) {
                            element.scrollLeft -= this.ClientScroll;
                        }
                        element.scrollLeft += this.step;
                    }
                    break;
                case 3:
                    this.CTL += this.step;
                    if (this.CTL >= this.ScrollStep && this.delayTime > 0) {
                        element.scrollLeft -= this.ScrollStep + this.step - this.CTL;
                        this.pause();
                        return;
                    }
                    else {
                        if (element.scrollLeft <= 0) {
                            element.scrollLeft += this.ClientScroll;
                        }
                        element.scrollLeft -= this.step;
                    }
                    break;
            }
        };
        new Marquee(
            parseInt(element.getAttribute('direction'), 10),
            parseInt(element.getAttribute('step'), 10),
            parseInt(element.getAttribute('speed'), 10),
            parseInt(element.getAttribute('delayTime'), 10),
            parseInt(element.getAttribute('waitTime'), 10)
        );
    };
    return customElement;
});
