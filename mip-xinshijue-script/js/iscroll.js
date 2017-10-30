/**
 * @file Iscroll 滚动插件
 * @author iscroll
 */
define(function (require, exports, module) {
    (function (window, document, Math) {
        var rAF = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        var utils = (function () {
            var me = {};
            var elementStyle = document.createElement('div').style;
            var vendor = (function () {
                var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
                var transform;
                var i = 0;
                var l = vendors.length;
                for (; i < l; i++) {
                    transform = vendors[i] + 'ransform';
                    if (transform in elementStyle) {
                        return vendors[i].substr(0, vendors[i].length - 1);
                    }
                }
                return false;
            })();
            function prefixStyle(style) {
                if (vendor === false) {
                    return false;
                }
                if (vendor === '') {
                    return style;
                }
                return vendor + style.charAt(0).toUpperCase() + style.substr(1);
            }
            me.getTime = Date.now || function getTime() {
                return new Date().getTime();
            };
            me.extend = function (target, obj) {
                for (var i in obj) {
                    target[i] = obj[i];
                }
            };
            me.addEvent = function (el, type, fn, capture) {
                el.addEventListener(type, fn, !!capture);
            };
            me.removeEvent = function (el, type, fn, capture) {
                el.removeEventListener(type, fn, !!capture);
            };
            me.prefixPointerEvent = function (pointerEvent) {
                var msPointer = 'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10);
                return window.MSPointerEvent ? msPointer : pointerEvent;
            };
            me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
                var distance = current - start;
                var speed = Math.abs(distance) / time;
                var destination;
                var duration;

                deceleration = deceleration === undefined ? 0.0006 : deceleration;

                destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
                duration = speed / deceleration;
                if (destination < lowerMargin) {
                    destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
                    distance = Math.abs(destination - current);
                    duration = distance / speed;
                } else if (destination > 0) {
                    destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
                    distance = Math.abs(current) + destination;
                    duration = distance / speed;
                }
                return {
                    destination: Math.round(destination),
                    duration: duration
                };
            };

            var transformFun = prefixStyle('transform');
            me.extend(me, {
                hasTransform: transformFun !== false,
                hasPerspective: prefixStyle('perspective') in elementStyle,
                hasTouch: 'ontouchstart' in window,
                hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
                hasTransition: prefixStyle('transition') in elementStyle
            });
            var aTest = /Android /.test(window.navigator.appVersion);
            var cTest = !(/Chrome\/\d/.test(window.navigator.appVersion));
            me.isBadAndroid = aTest && cTest;
            me.extend(me.style = {}, {
                transform: transformFun,
                transitionTimingFunction: prefixStyle('transitionTimingFunction'),
                transitionDuration: prefixStyle('transitionDuration'),
                transitionDelay: prefixStyle('transitionDelay'),
                transformOrigin: prefixStyle('transformOrigin')
            });
            me.hasClass = function (e, c) {
                var re = new RegExp('(^|\\s)' + c + '(\\s|$)');
                return re.test(e.className);
            };
            me.addClass = function (e, c) {
                if (me.hasClass(e, c)) {
                    return;
                }
                var newclass = e.className.split(' ');
                newclass.push(c);
                e.className = newclass.join(' ');
            };
            me.removeClass = function (e, c) {
                if (!me.hasClass(e, c)) {
                    return;
                }
                var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
                e.className = e.className.replace(re, ' ');
            };
            me.offset = function (el) {
                var left = -el.offsetLeft;
                var top = -el.offsetTop;
                while (el = el.offsetParent) {
                    left -= el.offsetLeft;
                    top -= el.offsetTop;
                }
                return {
                    left: left,
                    top: top
                };
            };

            me.preventDefaultException = function (el, exceptions) {
                for (var i in exceptions) {
                    if (exceptions[i].test(el[i])) {
                        return true;
                    }
                }
                return false;
            };

            me.extend(me.eventType = {}, {
                touchstart: 1,
                touchmove: 1,
                touchend: 1,
                mousedown: 2,
                mousemove: 2,
                mouseup: 2,
                pointerdown: 3,
                pointermove: 3,
                pointerup: 3,
                MSPointerDown: 3,
                MSPointerMove: 3,
                MSPointerUp: 3
            });

            me.extend(me.ease = {}, {
                quadratic: {
                    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fn: function (k) {
                        return k * (2 - k);
                    }
                },
                circular: {
                    style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
                    fn: function (k) {
                        return Math.sqrt(1 - (--k * k));
                    }
                },
                back: {
                    style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    fn: function (k) {
                        var b = 4;
                        return (k = k - 1) * k * ((b + 1) * k + b) + 1;
                    }
                },
                bounce: {
                    style: '',
                    fn: function (k) {
                        if ((k /= 1) < (1 / 2.75)) {
                            return 7.5625 * k * k;
                        } else if (k < (2 / 2.75)) {
                            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                        } else if (k < (2.5 / 2.75)) {
                            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                        } else {
                            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                        }
                    }
                },
                elastic: {
                    style: '',
                    fn: function (k) {
                        var f = 0.22;
                        var e = 0.4;

                        if (k === 0) {
                            return 0;
                        }
                        if (k === 1) {
                            return 1;
                        }

                        return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
                    }
                }
            });

            me.tap = function (e, eventName) {
                var ev = document.createEvent('Event');
                ev.initEvent(eventName, true, true);
                ev.pageX = e.pageX;
                ev.pageY = e.pageY;
                e.target.dispatchEvent(ev);
            };

            me.click = function (e) {
                var target = e.target;
                var ev;
                if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
                    ev = document.createEvent('MouseEvents');
                    ev.initMouseEvent('click', true, true, e.view, 1,
                        target.screenX, target.screenY, target.clientX, target.clientY,
                        e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                        0, null);
                    ev._constructed = true;
                    target.dispatchEvent(ev);
                }
            };
            return me;
        })();

        function IScroll(el, options) {
            this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
            this.scroller = this.wrapper.children[0];
            this.scrollerStyle = this.scroller.style; // cache style for better performance
            this.options = {
                resizeScrollbars: true,
                mouseWheelSpeed: 20,
                snapThreshold: 0.334,
                startX: 0,
                startY: 0,
                scrollY: true,
                directionLockThreshold: 5,
                momentum: true,
                bounce: true,
                bounceTime: 600,
                bounceEasing: '',
                preventDefault: true,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: true,
                useTransition: true,
                useTransform: true
            };

            for (var i in options) {
                this.options[i] = options[i];
            }

            this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';
            this.options.useTransition = utils.hasTransition && this.options.useTransition;
            this.options.useTransform = utils.hasTransform && this.options.useTransform;
            var eventPassthroughFlag = this.options.eventPassthrough === true;
            this.options.eventPassthrough = eventPassthroughFlag ? 'vertical' : this.options.eventPassthrough;
            this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
            this.options.scrollY = this.options.eventPassthrough === 'vertical' ? false : this.options.scrollY;
            this.options.scrollX = this.options.eventPassthrough === 'horizontal' ? false : this.options.scrollX;
            this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
            var epe = this.options.eventPassthrough === true;
            this.options.directionLockThreshold = epe ? 0 : this.options.directionLockThreshold;
            var bounceEasingString = typeof this.options.bounceEasing === 'string';
            var bounceEasingStringResult = utils.ease[this.options.bounceEasing] || utils.ease.circular;
            this.options.bounceEasing = bounceEasingString ? bounceEasingStringResult : this.options.bounceEasing;
            this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
            if (this.options.tap === true) {
                this.options.tap = 'tap';
            }
            if (this.options.shrinkScrollbars === 'scale') {
                this.options.useTransition = false;
            }
            this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
            this.x = 0;
            this.y = 0;
            this.directionX = 0;
            this.directionY = 0;
            this._events = {};
            this.init();
            this.refresh();
            this.scrollTo(this.options.startX, this.options.startY);
            this.enable();
        }

        IScroll.prototype = {
            version: '5.1.3',
            init: function () {
                this.initEvents();
                if (this.options.scrollbars || this.options.indicators) {
                    this.initIndicators();
                }
                if (this.options.mouseWheel) {
                    this.initWheel();
                }
                if (this.options.snap) {
                    this.initSnap();
                }
                if (this.options.keyBindings) {
                    this.initKeys();
                }
            },
            destroy: function () {
                this.initEvents(true);
                this.execEventFun('destroy');
            },
            transitionEnd: function (e) {
                if (e.target !== this.scroller || !this.isInTransition) {
                    return;
                }
                this.transitionTime();
                if (!this.resetPosition(this.options.bounceTime)) {
                    this.isInTransition = false;
                    this.execEventFun('scrollEnd');
                }
            },
            startFun: function (e) {
                if (utils.eventType[e.type] !== 1) {
                    if (e.button !== 0) {
                        return;
                    }
                }
                if (!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
                    return;
                }
                var pdep = this.options.preventDefaultException;
                var utilsPex = !utils.preventDefaultException(e.target, pdep);
                if (this.options.preventDefault && !utils.isBadAndroid && utilsPex) {
                    e.preventDefault();
                }
                var point = e.touches ? e.touches[0] : e;
                var pos;
                this.initiated = utils.eventType[e.type];
                this.moved = false;
                this.distX = 0;
                this.distY = 0;
                this.directionX = 0;
                this.directionY = 0;
                this.directionLocked = 0;
                this.transitionTime();
                this.startTime = utils.getTime();
                if (this.options.useTransition && this.isInTransition) {
                    this.isInTransition = false;
                    pos = this.getComputedPosition();
                    this.translate(Math.round(pos.x), Math.round(pos.y));
                    this.execEventFun('scrollEnd');
                } else if (!this.options.useTransition && this.isAnimating) {
                    this.isAnimating = false;
                    this.execEventFun('scrollEnd');
                }
                this.startX = this.x;
                this.startY = this.y;
                this.absStartX = this.x;
                this.absStartY = this.y;
                this.pointX = point.pageX;
                this.pointY = point.pageY;
                this.execEventFun('beforeScrollStart');
            },

            moveFun: function (e) {
                if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
                    return;
                }
                if (this.options.preventDefault) {
                    e.preventDefault();
                }
                var point = e.touches ? e.touches[0] : e;
                var deltaX = point.pageX - this.pointX;
                var deltaY = point.pageY - this.pointY;
                var timestamp = utils.getTime();
                var newX;
                var newY;
                var absDistX;
                var absDistY;
                this.pointX = point.pageX;
                this.pointY = point.pageY;
                this.distX += deltaX;
                this.distY += deltaY;
                absDistX = Math.abs(this.distX);
                absDistY = Math.abs(this.distY);
                if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
                    return;
                }
                if (!this.directionLocked && !this.options.freeScroll) {
                    if (absDistX > absDistY + this.options.directionLockThreshold) {
                        this.directionLocked = 'h'; // lock horizontally
                    } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
                        this.directionLocked = 'v'; // lock vertically
                    } else {
                        this.directionLocked = 'n'; // no lock
                    }
                }
                if (this.directionLocked === 'h') {
                    if (this.options.eventPassthrough === 'vertical') {
                        e.preventDefault();
                    } else if (this.options.eventPassthrough === 'horizontal') {
                        this.initiated = false;
                        return;
                    }
                    deltaY = 0;
                } else if (this.directionLocked === 'v') {
                    if (this.options.eventPassthrough === 'horizontal') {
                        e.preventDefault();
                    } else if (this.options.eventPassthrough === 'vertical') {
                        this.initiated = false;
                        return;
                    }
                    deltaX = 0;
                }
                deltaX = this.hasHorizontalScroll ? deltaX : 0;
                deltaY = this.hasVerticalScroll ? deltaY : 0;
                newX = this.x + deltaX;
                newY = this.y + deltaY;
                if (newX > 0 || newX < this.maxScrollX) {
                    newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
                }
                if (newY > 0 || newY < this.maxScrollY) {
                    newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
                }
                this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
                this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
                if (!this.moved) {
                    this.execEventFun('scrollStart');
                }
                this.moved = true;
                this.translate(newX, newY);
                if (timestamp - this.startTime > 300) {
                    this.startTime = timestamp;
                    this.startX = this.x;
                    this.startY = this.y;
                }
            },
            endFun: function (e) {
                if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
                    return;
                }
                var topde = this.options.preventDefaultException;
                if (this.options.preventDefault && !utils.preventDefaultException(e.target, topde)) {
                    e.preventDefault();
                }
                var point = e.changedTouches ? e.changedTouches[0] : e;
                var momentumX;
                var momentumY;
                var duration = utils.getTime() - this.startTime;
                var newX = Math.round(this.x);
                var newY = Math.round(this.y);
                var distanceX = Math.abs(newX - this.startX);
                var distanceY = Math.abs(newY - this.startY);
                var time = 0;
                var easing = '';
                this.isInTransition = 0;
                this.initiated = 0;
                this.endTime = utils.getTime();
                if (this.resetPosition(this.options.bounceTime)) {
                    return;
                }
                this.scrollTo(newX, newY);
                if (!this.moved) {
                    if (this.options.tap) {
                        utils.tap(e, this.options.tap);
                    }
                    if (this.options.click) {
                        utils.click(e);
                    }
                    this.execEventFun('scrollCancel');
                    return;
                }
                if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
                    this.execEventFun('flick');
                    return;
                }
                if (this.options.momentum && duration < 300) {
                    var ow = this.options.bounce ? this.wrapperWidth : 0;
                    var oxresult = {
                        destination: newX,
                        duration: 0
                    };
                    var od = this.options.deceleration;
                    var umx = utils.momentum(this.x, this.startX, duration, this.maxScrollX, ow, od);
                    momentumX = this.hasHorizontalScroll ? umx : oxresult;
                    var ob = this.options.bounce ? this.wrapperHeight : 0;
                    var oyresult = {
                        destination: newY,
                        duration: 0
                    };
                    var umy = utils.momentum(this.x, this.startX, duration, this.maxScrollX, ow, od);
                    momentumY = this.hasVerticalScroll ? umy : oyresult;
                    newX = momentumX.destination;
                    newY = momentumY.destination;
                    time = Math.max(momentumX.duration, momentumY.duration);
                    this.isInTransition = 1;
                }
                if (this.options.snap) {
                    var snap = this.nearestSnap(newX, newY);
                    this.currentPage = snap;
                    time = this.options.snapSpeed || Math.max(
                        Math.max(
                            Math.min(Math.abs(newX - snap.x), 1000),
                            Math.min(Math.abs(newY - snap.y), 1000)
                        ), 300);
                    newX = snap.x;
                    newY = snap.y;

                    this.directionX = 0;
                    this.directionY = 0;
                    easing = this.options.bounceEasing;
                }
                if (newX !== this.x || newY !== this.y) {
                    if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                        easing = utils.ease.quadratic;
                    }
                    this.scrollTo(newX, newY, time, easing);
                    return;
                }
                this.execEventFun('scrollEnd');
            },
            resizeFun: function () {
                var that = this;
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(function () {
                    that.refresh();
                }, this.options.resizePolling);
            },
            resetPosition: function (time) {
                var x = this.x;
                var y = this.y;
                time = time || 0;
                if (!this.hasHorizontalScroll || this.x > 0) {
                    x = 0;
                } else if (this.x < this.maxScrollX) {
                    x = this.maxScrollX;
                }
                if (!this.hasVerticalScroll || this.y > 0) {
                    y = 0;
                } else if (this.y < this.maxScrollY) {
                    y = this.maxScrollY;
                }
                if (x === this.x && y === this.y) {
                    return false;
                }
                this.scrollTo(x, y, time, this.options.bounceEasing);
                return true;
            },
            disable: function () {
                this.enabled = false;
            },
            enable: function () {
                this.enabled = true;
            },
            refresh: function () {
                var rf = this.wrapper.offsetHeight;
                this.wrapperWidth = this.wrapper.clientWidth;
                this.wrapperHeight = this.wrapper.clientHeight;
                this.scrollerWidth = this.scroller.offsetWidth;
                this.scrollerHeight = this.scroller.offsetHeight;
                this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
                this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
                this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
                this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
                if (!this.hasHorizontalScroll) {
                    this.maxScrollX = 0;
                    this.scrollerWidth = this.wrapperWidth;
                }
                if (!this.hasVerticalScroll) {
                    this.maxScrollY = 0;
                    this.scrollerHeight = this.wrapperHeight;
                }
                this.endTime = 0;
                this.directionX = 0;
                this.directionY = 0;
                this.wrapperOffset = utils.offset(this.wrapper);
                this.execEventFun('refresh');
                this.resetPosition();
            },
            on: function (type, fn) {
                if (!this._events[type]) {
                    this._events[type] = [];
                }
                this._events[type].push(fn);
            },
            off: function (type, fn) {
                if (!this._events[type]) {
                    return;
                }
                var index = this._events[type].indexOf(fn);
                if (index > -1) {
                    this._events[type].splice(index, 1);
                }
            },
            execEventFun: function (type) {
                if (!this._events[type]) {
                    return;
                }
                var i = 0;
                var l = this._events[type].length;
                if (!l) {
                    return;
                }
                for (; i < l; i++) {
                    this._events[type][i].apply(this, [].slice.call(arguments, 1));
                }
            },
            scrollBy: function (x, y, time, easing) {
                x = this.x + x;
                y = this.y + y;
                time = time || 0;
                this.scrollTo(x, y, time, easing);
            },
            scrollTo: function (x, y, time, easing) {
                easing = easing || utils.ease.circular;
                this.isInTransition = this.options.useTransition && time > 0;
                if (!time || (this.options.useTransition && easing.style)) {
                    this.transitionTimingFunction(easing.style);
                    this.transitionTime(time);
                    this.translate(x, y);
                } else {
                    this.animateFun(x, y, time, easing.fn);
                }
            },
            scrollToElement: function (el, time, offsetX, offsetY, easing) {
                el = el.nodeType ? el : this.scroller.querySelector(el);
                if (!el) {
                    return;
                }
                var pos = utils.offset(el);
                pos.left -= this.wrapperOffset.left;
                pos.top -= this.wrapperOffset.top;
                if (offsetX === true) {
                    offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
                }
                if (offsetY === true) {
                    offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
                }
                pos.left -= offsetX || 0;
                pos.top -= offsetY || 0;
                pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
                pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;
                var xyp = Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top));
                time = time === undefined || time === null || time === 'auto' ? xyp : time;
                this.scrollTo(pos.left, pos.top, time, easing);
            },

            transitionTime: function (time) {
                time = time || 0;
                this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';
                if (!time && utils.isBadAndroid) {
                    this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
                }
                if (this.indicators) {
                    for (var i = this.indicators.length; i--;) {
                        this.indicators[i].transitionTime(time);
                    }
                }
            },
            transitionTimingFunction: function (easing) {
                this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
                if (this.indicators) {
                    for (var i = this.indicators.length; i--;) {
                        this.indicators[i].transitionTimingfunction(easing);
                    }
                }
            },
            translate: function (x, y) {
                if (this.options.useTransform) {
                    this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
                } else {
                    x = Math.round(x);
                    y = Math.round(y);
                    this.scrollerStyle.left = x + 'px';
                    this.scrollerStyle.top = y + 'px';
                }
                this.x = x;
                this.y = y;
                if (this.indicators) {
                    for (var i = this.indicators.length; i--;) {
                        this.indicators[i].updatePosition();
                    }
                }
            },

            initEvents: function (remove) {
                var eventType = remove ? utils.removeEvent : utils.addEvent;
                var target = this.options.bindToWrapper ? this.wrapper : window;
                eventType(window, 'orientationchange', this);
                eventType(window, 'resize', this);
                if (this.options.click) {
                    eventType(this.wrapper, 'click', this, true);
                }
                if (!this.options.disableMouse) {
                    eventType(this.wrapper, 'mousedown', this);
                    eventType(target, 'mousemove', this);
                    eventType(target, 'mousecancel', this);
                    eventType(target, 'mouseup', this);
                }
                if (utils.hasPointer && !this.options.disablePointer) {
                    eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
                    eventType(target, utils.prefixPointerEvent('pointermove'), this);
                    eventType(target, utils.prefixPointerEvent('pointercancel'), this);
                    eventType(target, utils.prefixPointerEvent('pointerup'), this);
                }
                if (utils.hasTouch && !this.options.disableTouch) {
                    eventType(this.wrapper, 'touchstart', this);
                    eventType(target, 'touchmove', this);
                    eventType(target, 'touchcancel', this);
                    eventType(target, 'touchend', this);
                }
                eventType(this.scroller, 'transitionend', this);
                eventType(this.scroller, 'webkitTransitionEnd', this);
                eventType(this.scroller, 'oTransitionEnd', this);
                eventType(this.scroller, 'MSTransitionEnd', this);
            },
            getComputedPosition: function () {
                var matrix = window.getComputedStyle(this.scroller, null);
                var x;
                var y;
                if (this.options.useTransform) {
                    matrix = matrix[utils.style.transform].split(')')[0].split(', ');
                    x = +(matrix[12] || matrix[4]);
                    y = +(matrix[13] || matrix[5]);
                } else {
                    x = +matrix.left.replace(/[^-\d.]/g, '');
                    y = +matrix.top.replace(/[^-\d.]/g, '');
                }
                return {
                    x: x,
                    y: y
                };
            },
            initIndicators: function () {
                var interactive = this.options.interactiveScrollbars;
                var customStyle = typeof this.options.scrollbars !== 'string';
                var indicators = [];
                var indicator;
                var that = this;
                this.indicators = [];
                if (this.options.scrollbars) {
                    // Vertical scrollbar
                    if (this.options.scrollY) {
                        indicator = {
                            el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
                            interactive: interactive,
                            defaultScrollbars: true,
                            customStyle: customStyle,
                            resize: this.options.resizeScrollbars,
                            shrink: this.options.shrinkScrollbars,
                            fade: this.options.fadeScrollbars,
                            listenX: false
                        };
                        this.wrapper.appendChild(indicator.el);
                        indicators.push(indicator);
                    }
                    if (this.options.scrollX) {
                        indicator = {
                            el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
                            interactive: interactive,
                            defaultScrollbars: true,
                            customStyle: customStyle,
                            resize: this.options.resizeScrollbars,
                            shrink: this.options.shrinkScrollbars,
                            fade: this.options.fadeScrollbars,
                            listenY: false
                        };
                        this.wrapper.appendChild(indicator.el);
                        indicators.push(indicator);
                    }
                }
                if (this.options.indicators) {
                    indicators = indicators.concat(this.options.indicators);
                }
                for (var i = indicators.length; i--;) {
                    this.indicators.push(new Indicator(this, indicators[i]));
                }
                function indicatorsMap(fn) {
                    for (var i = that.indicators.length; i--;) {
                        fn.call(that.indicators[i]);
                    }
                }
                if (this.options.fadeScrollbars) {
                    this.on('scrollEnd', function () {
                        indicatorsMap(function () {
                            this.fade();
                        });
                    });
                    this.on('scrollCancel', function () {
                        indicatorsMap(function () {
                            this.fade();
                        });
                    });
                    this.on('scrollStart', function () {
                        indicatorsMap(function () {
                            this.fade(1);
                        });
                    });
                    this.on('beforeScrollStart', function () {
                        indicatorsMap(function () {
                            this.fade(1, true);
                        });
                    });
                }
                this.on('refresh', function () {
                    indicatorsMap(function () {
                        this.refresh();
                    });
                });
                this.on('destroy', function () {
                    indicatorsMap(function () {
                        this.destroy();
                    });
                    delete this.indicators;
                });
            },
            initWheel: function () {
                utils.addEvent(this.wrapper, 'wheel', this);
                utils.addEvent(this.wrapper, 'mousewheel', this);
                utils.addEvent(this.wrapper, 'DOMMouseScroll', this);
                this.on('destroy', function () {
                    utils.removeEvent(this.wrapper, 'wheel', this);
                    utils.removeEvent(this.wrapper, 'mousewheel', this);
                    utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
                });
            },
            wheel: function (e) {
                if (!this.enabled) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                var wheelDeltaX;
                var wheelDeltaY;
                var newX;
                var newY;
                var that = this;
                if (this.wheelTimeout === undefined) {
                    that.execEventFun('scrollStart');
                }
                clearTimeout(this.wheelTimeout);
                this.wheelTimeout = setTimeout(function () {
                    that.execEventFun('scrollEnd');
                    that.wheelTimeout = undefined;
                }, 400);
                if ('deltaX' in e) {
                    if (e.deltaMode === 1) {
                        wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
                        wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
                    } else {
                        wheelDeltaX = -e.deltaX;
                        wheelDeltaY = -e.deltaY;
                    }
                } else if ('wheelDeltaX' in e) {
                    wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
                    wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                } else if ('wheelDelta' in e) {
                    wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
                } else if ('detail' in e) {
                    wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
                } else {
                    return;
                }
                wheelDeltaX *= this.options.invertWheelDirection;
                wheelDeltaY *= this.options.invertWheelDirection;
                if (!this.hasVerticalScroll) {
                    wheelDeltaX = wheelDeltaY;
                    wheelDeltaY = 0;
                }
                if (this.options.snap) {
                    newX = this.currentPage.pageX;
                    newY = this.currentPage.pageY;
                    if (wheelDeltaX > 0) {
                        newX--;
                    } else if (wheelDeltaX < 0) {
                        newX++;
                    }
                    if (wheelDeltaY > 0) {
                        newY--;
                    } else if (wheelDeltaY < 0) {
                        newY++;
                    }
                    this.goToPage(newX, newY);
                    return;
                }
                newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
                newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);
                if (newX > 0) {
                    newX = 0;
                } else if (newX < this.maxScrollX) {
                    newX = this.maxScrollX;
                }
                if (newY > 0) {
                    newY = 0;
                } else if (newY < this.maxScrollY) {
                    newY = this.maxScrollY;
                }
                this.scrollTo(newX, newY, 0);
            },

            initSnap: function () {
                this.currentPage = {};
                if (typeof this.options.snap === 'string') {
                    this.options.snap = this.scroller.querySelectorAll(this.options.snap);
                }
                this.on('refresh', function () {
                    var i = 0;
                    var l;
                    var m = 0;
                    var n;
                    var cx;
                    var cy;
                    var x = 0;
                    var y;
                    var stepX = this.options.snapStepX || this.wrapperWidth;
                    var stepY = this.options.snapStepY || this.wrapperHeight;
                    var el;
                    this.pages = [];
                    if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
                        return;
                    }
                    if (this.options.snap === true) {
                        cx = Math.round(stepX / 2);
                        cy = Math.round(stepY / 2);
                        while (x > -this.scrollerWidth) {
                            this.pages[i] = [];
                            l = 0;
                            y = 0;
                            while (y > -this.scrollerHeight) {
                                this.pages[i][l] = {
                                    x: Math.max(x, this.maxScrollX),
                                    y: Math.max(y, this.maxScrollY),
                                    width: stepX,
                                    height: stepY,
                                    cx: x - cx,
                                    cy: y - cy
                                };
                                y -= stepY;
                                l++;
                            }
                            x -= stepX;
                            i++;
                        }
                    } else {
                        el = this.options.snap;
                        l = el.length;
                        n = -1;
                        for (; i < l; i++) {
                            if (i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) {
                                m = 0;
                                n++;
                            }
                            if (!this.pages[m]) {
                                this.pages[m] = [];
                            }
                            x = Math.max(-el[i].offsetLeft, this.maxScrollX);
                            y = Math.max(-el[i].offsetTop, this.maxScrollY);
                            cx = x - Math.round(el[i].offsetWidth / 2);
                            cy = y - Math.round(el[i].offsetHeight / 2);
                            this.pages[m][n] = {
                                x: x,
                                y: y,
                                width: el[i].offsetWidth,
                                height: el[i].offsetHeight,
                                cx: cx,
                                cy: cy
                            };
                            if (x > this.maxScrollX) {
                                m++;
                            }
                        }
                    }
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
                    if (this.options.snapThreshold % 1 === 0) {
                        this.snapThresholdX = this.options.snapThreshold;
                        this.snapThresholdY = this.options.snapThreshold;
                    } else {
                        var thpw = this.pages[this.currentPage.pageX][this.currentPage.pageY].width;
                        this.snapThresholdX = Math.round(thpw * this.options.snapThreshold);
                        var thph = this.pages[this.currentPage.pageX][this.currentPage.pageY].height;
                        this.snapThresholdY = Math.round(thph * this.options.snapThreshold);
                    }
                });
                this.on('flick', function () {
                    var time = this.options.snapSpeed || Math.max(
                        Math.max(
                            Math.min(Math.abs(this.x - this.startX), 1000),
                            Math.min(Math.abs(this.y - this.startY), 1000)
                        ), 300);
                    this.goToPage(
                        this.currentPage.pageX + this.directionX,
                        this.currentPage.pageY + this.directionY,
                        time
                    );
                });
            },
            nearestSnap: function (x, y) {
                if (!this.pages.length) {
                    return {
                        x: 0,
                        y: 0,
                        pageX: 0,
                        pageY: 0
                    };
                }
                var i = 0;
                var l = this.pages.length;
                var m = 0;
                if (Math.abs(x - this.absStartX) < this.snapThresholdX
                    && Math.abs(y - this.absStartY) < this.snapThresholdY) {
                    return this.currentPage;
                }
                if (x > 0) {
                    x = 0;
                } else if (x < this.maxScrollX) {
                    x = this.maxScrollX;
                }
                if (y > 0) {
                    y = 0;
                } else if (y < this.maxScrollY) {
                    y = this.maxScrollY;
                }
                for (; i < l; i++) {
                    if (x >= this.pages[i][0].cx) {
                        x = this.pages[i][0].x;
                        break;
                    }
                }
                l = this.pages[i].length;
                for (; m < l; m++) {
                    if (y >= this.pages[0][m].cy) {
                        y = this.pages[0][m].y;
                        break;
                    }
                }
                if (i === this.currentPage.pageX) {
                    i += this.directionX;

                    if (i < 0) {
                        i = 0;
                    } else if (i >= this.pages.length) {
                        i = this.pages.length - 1;
                    }

                    x = this.pages[i][0].x;
                }
                if (m === this.currentPage.pageY) {
                    m += this.directionY;

                    if (m < 0) {
                        m = 0;
                    } else if (m >= this.pages[0].length) {
                        m = this.pages[0].length - 1;
                    }

                    y = this.pages[0][m].y;
                }
                return {
                    x: x,
                    y: y,
                    pageX: i,
                    pageY: m
                };
            },
            goToPage: function (x, y, time, easing) {
                easing = easing || this.options.bounceEasing;
                if (x >= this.pages.length) {
                    x = this.pages.length - 1;
                } else if (x < 0) {
                    x = 0;
                }
                if (y >= this.pages[x].length) {
                    y = this.pages[x].length - 1;
                } else if (y < 0) {
                    y = 0;
                }
                var posX = this.pages[x][y].x;
                var posY = this.pages[x][y].y;
                time = time === undefined ? this.options.snapSpeed || Math.max(
                    Math.max(
                        Math.min(Math.abs(posX - this.x), 1000),
                        Math.min(Math.abs(posY - this.y), 1000)
                    ), 300) : time;
                this.currentPage = {
                    x: posX,
                    y: posY,
                    pageX: x,
                    pageY: y
                };
                this.scrollTo(posX, posY, time, easing);
            },
            next: function (time, easing) {
                var x = this.currentPage.pageX;
                var y = this.currentPage.pageY;
                x++;
                if (x >= this.pages.length && this.hasVerticalScroll) {
                    x = 0;
                    y++;
                }
                this.goToPage(x, y, time, easing);
            },

            prev: function (time, easing) {
                var x = this.currentPage.pageX;
                var y = this.currentPage.pageY;
                x--;
                if (x < 0 && this.hasVerticalScroll) {
                    x = 0;
                    y--;
                }
                this.goToPage(x, y, time, easing);
            },
            initKeys: function (e) {
                // default key bindings
                var keys = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                var i;
                if (typeof this.options.keyBindings === 'object') {
                    for (i in this.options.keyBindings) {
                        if (typeof this.options.keyBindings[i] === 'string') {
                            this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
                        }
                    }
                } else {
                    this.options.keyBindings = {};
                }

                for (i in keys) {
                    this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
                }
                utils.addEvent(window, 'keydown', this);
                this.on('destroy', function () {
                    utils.removeEvent(window, 'keydown', this);
                });
            },

            keyFun: function (e) {
                if (!this.enabled) {
                    return;
                }
                var snap = this.options.snap;
                var newX = snap ? this.currentPage.pageX : this.x;
                var newY = snap ? this.currentPage.pageY : this.y;
                var now = utils.getTime();
                var prevTime = this.keyTime || 0;
                var acceleration = 0.250;
                var pos;
                if (this.options.useTransition && this.isInTransition) {
                    pos = this.getComputedPosition();

                    this.translate(Math.round(pos.x), Math.round(pos.y));
                    this.isInTransition = false;
                }
                this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;
                switch (e.keyCode) {
                    case this.options.keyBindings.pageUp:
                        if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
                            newX += snap ? 1 : this.wrapperWidth;
                        } else {
                            newY += snap ? 1 : this.wrapperHeight;
                        }
                        break;
                    case this.options.keyBindings.pageDown:
                        if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
                            newX -= snap ? 1 : this.wrapperWidth;
                        } else {
                            newY -= snap ? 1 : this.wrapperHeight;
                        }
                        break;
                    case this.options.keyBindings.end:
                        newX = snap ? this.pages.length - 1 : this.maxScrollX;
                        newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
                        break;
                    case this.options.keyBindings.home:
                        newX = 0;
                        newY = 0;
                        break;
                    case this.options.keyBindings.left:
                        newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.up:
                        newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.right:
                        newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.down:
                        newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    default:
                        return;
                }
                if (snap) {
                    this.goToPage(newX, newY);
                    return;
                }
                if (newX > 0) {
                    newX = 0;
                    this.keyAcceleration = 0;
                } else if (newX < this.maxScrollX) {
                    newX = this.maxScrollX;
                    this.keyAcceleration = 0;
                }
                if (newY > 0) {
                    newY = 0;
                    this.keyAcceleration = 0;
                } else if (newY < this.maxScrollY) {
                    newY = this.maxScrollY;
                    this.keyAcceleration = 0;
                }
                this.scrollTo(newX, newY, 0);
                this.keyTime = now;
            },
            animateFun: function (destX, destY, duration, easingFn) {
                var that = this;
                var startX = this.x;
                var startY = this.y;
                var startTime = utils.getTime();
                var destTime = startTime + duration;
                function step() {
                    var now = utils.getTime();
                    var newX;
                    var newY;
                    var easing;
                    if (now >= destTime) {
                        that.isAnimating = false;
                        that.translate(destX, destY);

                        if (!that.resetPosition(that.options.bounceTime)) {
                            that.execEventFun('scrollEnd');
                        }
                        return;
                    }
                    now = (now - startTime) / duration;
                    easing = easingFn(now);
                    newX = (destX - startX) * easing + startX;
                    newY = (destY - startY) * easing + startY;
                    that.translate(newX, newY);
                    if (that.isAnimating) {
                        rAF(step);
                    }
                }
                this.isAnimating = true;
                step();
            },
            handleEvent: function (e) {
                switch (e.type) {
                    case 'touchstart':
                    case 'pointerdown':
                    case 'MSPointerDown':
                    case 'mousedown':
                        this.startFun(e);
                        break;
                    case 'touchmove':
                    case 'pointermove':
                    case 'MSPointerMove':
                    case 'mousemove':
                        this.moveFun(e);
                        break;
                    case 'touchend':
                    case 'pointerup':
                    case 'MSPointerUp':
                    case 'mouseup':
                    case 'touchcancel':
                    case 'pointercancel':
                    case 'MSPointerCancel':
                    case 'mousecancel':
                        this.endFun(e);
                        break;
                    case 'orientationchange':
                    case 'resize':
                        this.resizeFun();
                        break;
                    case 'transitionend':
                    case 'webkitTransitionEnd':
                    case 'oTransitionEnd':
                    case 'MSTransitionEnd':
                        this.transitionEnd(e);
                        break;
                    case 'wheel':
                    case 'DOMMouseScroll':
                    case 'mousewheel':
                        this.wheel(e);
                        break;
                    case 'keydown':
                        this.keyFun(e);
                        break;
                    case 'click':
                        if (!e._constructed) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        break;
                }
            }
        };

        function createDefaultScrollbar(direction, interactive, type) {
            var scrollbar = document.createElement('div');
            var indicator = document.createElement('div');
            if (type === true) {
                scrollbar.style.cssText = 'position:absolute;z-index:9999';
                var cssHtml = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;';
                cssHtml = cssHtml + 'box-sizing:border-box;position:absolute;';
                cssHtml = cssHtml + 'background:rgba(0,0,0,0.5);';
                cssHtml = cssHtml + 'border:1px solid rgba(255,255,255,0.9);border-radius:3px;';
                indicator.style.cssText = cssHtml;
            }
            indicator.className = 'iScrollIndicator';
            if (direction === 'h') {
                if (type === true) {
                    scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
                    indicator.style.height = '100%';
                }
                scrollbar.className = 'iScrollHorizontalScrollbar';
            } else {
                if (type === true) {
                    scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
                    indicator.style.width = '100%';
                }
                scrollbar.className = 'iScrollVerticalScrollbar';
            }
            scrollbar.style.cssText += ';overflow:hidden';
            if (!interactive) {
                scrollbar.style.pointerEvents = 'none';
            }
            scrollbar.appendChild(indicator);
            return scrollbar;
        }

        function Indicator(scroller, options) {
            this.wrapper = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
            this.wrapperStyle = this.wrapper.style;
            this.indicator = this.wrapper.children[0];
            this.indicatorStyle = this.indicator.style;
            this.scroller = scroller;
            this.options = {
                listenX: true,
                listenY: true,
                interactive: false,
                resize: true,
                defaultScrollbars: false,
                shrink: false,
                fade: false,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var i in options) {
                this.options[i] = options[i];
            }
            this.sizeRatioX = 1;
            this.sizeRatioY = 1;
            this.maxPosX = 0;
            this.maxPosY = 0;
            if (this.options.interactive) {
                if (!this.options.disableTouch) {
                    utils.addEvent(this.indicator, 'touchstart', this);
                    utils.addEvent(window, 'touchend', this);
                }
                if (!this.options.disablePointer) {
                    utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
                    utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
                }
                if (!this.options.disableMouse) {
                    utils.addEvent(this.indicator, 'mousedown', this);
                    utils.addEvent(window, 'mouseup', this);
                }
            }
            if (this.options.fade) {
                this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
                this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
                this.wrapperStyle.opacity = '0';
            }
        }

        Indicator.prototype = {
            handleEvent: function (e) {
                switch (e.type) {
                    case 'touchstart':
                    case 'pointerdown':
                    case 'MSPointerDown':
                    case 'mousedown':
                        this.startFun(e);
                        break;
                    case 'touchmove':
                    case 'pointermove':
                    case 'MSPointerMove':
                    case 'mousemove':
                        this.moveFun(e);
                        break;
                    case 'touchend':
                    case 'pointerup':
                    case 'MSPointerUp':
                    case 'mouseup':
                    case 'touchcancel':
                    case 'pointercancel':
                    case 'MSPointerCancel':
                    case 'mousecancel':
                        this.endFun(e);
                        break;
                }
            },
            destroy: function () {
                if (this.options.interactive) {
                    utils.removeEvent(this.indicator, 'touchstart', this);
                    utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
                    utils.removeEvent(this.indicator, 'mousedown', this);
                    utils.removeEvent(window, 'touchmove', this);
                    utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
                    utils.removeEvent(window, 'mousemove', this);
                    utils.removeEvent(window, 'touchend', this);
                    utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
                    utils.removeEvent(window, 'mouseup', this);
                }
                if (this.options.defaultScrollbars) {
                    this.wrapper.parentNode.removeChild(this.wrapper);
                }
            },

            startFun: function (e) {
                var point = e.touches ? e.touches[0] : e;
                e.preventDefault();
                e.stopPropagation();
                this.transitionTime();
                this.initiated = true;
                this.moved = false;
                this.lastPointX = point.pageX;
                this.lastPointY = point.pageY;
                this.startTime = utils.getTime();
                if (!this.options.disableTouch) {
                    utils.addEvent(window, 'touchmove', this);
                }
                if (!this.options.disablePointer) {
                    utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
                }
                if (!this.options.disableMouse) {
                    utils.addEvent(window, 'mousemove', this);
                }
                this.scroller.execEventFun('beforeScrollStart');
            },
            moveFun: function (e) {
                var point = e.touches ? e.touches[0] : e;
                var deltaX;
                var deltaY;
                var newX;
                var newY;
                var timestamp = utils.getTime();
                if (!this.moved) {
                    this.scroller.execEventFun('scrollStart');
                }
                this.moved = true;
                deltaX = point.pageX - this.lastPointX;
                this.lastPointX = point.pageX;
                deltaY = point.pageY - this.lastPointY;
                this.lastPointY = point.pageY;
                newX = this.x + deltaX;
                newY = this.y + deltaY;
                this.posFun(newX, newY);
                e.preventDefault();
                e.stopPropagation();
            },
            endFun: function (e) {
                if (!this.initiated) {
                    return;
                }
                this.initiated = false;
                e.preventDefault();
                e.stopPropagation();
                utils.removeEvent(window, 'touchmove', this);
                utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
                utils.removeEvent(window, 'mousemove', this);
                if (this.scroller.options.snap) {
                    var snap = this.scroller.nearestSnap(this.scroller.x, this.scroller.y);
                    var time = this.options.snapSpeed || Math.max(
                        Math.max(
                            Math.min(Math.abs(this.scroller.x - snap.x), 1000),
                            Math.min(Math.abs(this.scroller.y - snap.y), 1000)
                        ), 300);
                    if (this.scroller.x !== snap.x || this.scroller.y !== snap.y) {
                        this.scroller.directionX = 0;
                        this.scroller.directionY = 0;
                        this.scroller.currentPage = snap;
                        this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
                    }
                }
                if (this.moved) {
                    this.scroller.execEventFun('scrollEnd');
                }
            },
            transitionTime: function (time) {
                time = time || 0;
                this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';

                if (!time && utils.isBadAndroid) {
                    this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
                }
            },
            transitionTimingFunction: function (easing) {
                this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
            },
            refresh: function () {
                this.transitionTime();
                if (this.options.listenX && !this.options.listenY) {
                    this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
                } else if (this.options.listenY && !this.options.listenX) {
                    this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
                } else {
                    var hhts = this.scroller.hasHorizontalScroll;
                    var hvts = this.scroller.hasVerticalScroll;
                    this.indicatorStyle.display = hhts || hvts ? 'block' : 'none';
                }
                if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
                    utils.addClass(this.wrapper, 'iScrollBothScrollbars');
                    utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');
                    if (this.options.defaultScrollbars && this.options.customStyle) {
                        if (this.options.listenX) {
                            this.wrapper.style.right = '8px';
                        } else {
                            this.wrapper.style.bottom = '8px';
                        }
                    }
                } else {
                    utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
                    utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

                    if (this.options.defaultScrollbars && this.options.customStyle) {
                        if (this.options.listenX) {
                            this.wrapper.style.right = '2px';
                        } else {
                            this.wrapper.style.bottom = '2px';
                        }
                    }
                }
                var r = this.wrapper.offsetHeight;
                if (this.options.listenX) {
                    this.wrapperWidth = this.wrapper.clientWidth;
                    if (this.options.resize) {
                        var hsch = this.scroller.scrollerWidth || this.wrapperWidth || 1;
                        var wsch = this.wrapperWidth * this.wrapperWidth / hsch;
                        this.indicatorWidth = Math.max(Math.round(wsch), 8);
                        this.indicatorStyle.width = this.indicatorWidth + 'px';
                    } else {
                        this.indicatorWidth = this.indicator.clientWidth;
                    }
                    this.maxPosX = this.wrapperWidth - this.indicatorWidth;
                    if (this.options.shrink === 'clip') {
                        this.minBoundaryX = -this.indicatorWidth + 8;
                        this.maxBoundaryX = this.wrapperWidth - 8;
                    } else {
                        this.minBoundaryX = 0;
                        this.maxBoundaryX = this.maxPosX;
                    }
                    var sxFlag = this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX);
                    this.sizeRatioX = this.options.speedRatioX || sxFlag;
                }
                if (this.options.listenY) {
                    this.wrapperHeight = this.wrapper.clientHeight;
                    if (this.options.resize) {
                        var sh = this.scroller.scrollerHeight || this.wrapperHeight || 1;
                        var wh = this.wrapperHeight * this.wrapperHeight / sh;
                        this.indicatorHeight = Math.max(Math.round(wh), 8);
                        this.indicatorStyle.height = this.indicatorHeight + 'px';
                    } else {
                        this.indicatorHeight = this.indicator.clientHeight;
                    }
                    this.maxPosY = this.wrapperHeight - this.indicatorHeight;
                    if (this.options.shrink === 'clip') {
                        this.minBoundaryY = -this.indicatorHeight + 8;
                        this.maxBoundaryY = this.wrapperHeight - 8;
                    } else {
                        this.minBoundaryY = 0;
                        this.maxBoundaryY = this.maxPosY;
                    }
                    this.maxPosY = this.wrapperHeight - this.indicatorHeight;
                    var yScroll = this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY);
                    this.sizeRatioY = this.options.speedRatioY || yScroll;
                }
                this.updatePosition();
            },
            updatePosition: function () {
                var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0;
                var y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
                if (!this.options.ignoreBoundaries) {
                    if (x < this.minBoundaryX) {
                        if (this.options.shrink === 'scale') {
                            this.width = Math.max(this.indicatorWidth + x, 8);
                            this.indicatorStyle.width = this.width + 'px';
                        }
                        x = this.minBoundaryX;
                    } else if (x > this.maxBoundaryX) {
                        if (this.options.shrink === 'scale') {
                            this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
                            this.indicatorStyle.width = this.width + 'px';
                            x = this.maxPosX + this.indicatorWidth - this.width;
                        } else {
                            x = this.maxBoundaryX;
                        }
                    } else if (this.options.shrink === 'scale' && this.width !== this.indicatorWidth) {
                        this.width = this.indicatorWidth;
                        this.indicatorStyle.width = this.width + 'px';
                    }
                    if (y < this.minBoundaryY) {
                        if (this.options.shrink === 'scale') {
                            this.height = Math.max(this.indicatorHeight + y * 3, 8);
                            this.indicatorStyle.height = this.height + 'px';
                        }
                        y = this.minBoundaryY;
                    } else if (y > this.maxBoundaryY) {
                        if (this.options.shrink === 'scale') {
                            this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
                            this.indicatorStyle.height = this.height + 'px';
                            y = this.maxPosY + this.indicatorHeight - this.height;
                        } else {
                            y = this.maxBoundaryY;
                        }
                    } else if (this.options.shrink === 'scale' && this.height !== this.indicatorHeight) {
                        this.height = this.indicatorHeight;
                        this.indicatorStyle.height = this.height + 'px';
                    }
                }

                this.x = x;
                this.y = y;
                if (this.scroller.options.useTransform) {
                    var str = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
                    this.indicatorStyle[utils.style.transform] = str;
                } else {
                    this.indicatorStyle.left = x + 'px';
                    this.indicatorStyle.top = y + 'px';
                }
            },

            posFun: function (x, y) {
                if (x < 0) {
                    x = 0;
                } else if (x > this.maxPosX) {
                    x = this.maxPosX;
                }
                if (y < 0) {
                    y = 0;
                } else if (y > this.maxPosY) {
                    y = this.maxPosY;
                }
                x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
                y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;
                this.scroller.scrollTo(x, y);
            },

            fade: function (val, hold) {
                if (hold && !this.visible) {
                    return;
                }
                clearTimeout(this.fadeTimeout);
                this.fadeTimeout = null;
                var time = val ? 250 : 500;
                var delay = val ? 0 : 300;
                val = val ? '1' : '0';
                this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';
                var callBack = function (val) {
                    this.wrapperStyle.opacity = val;
                    this.visible = +val;
                };
                this.fadeTimeout = setTimeout(callBack.bind(this, val), delay);
            }
        };
        IScroll.utils = utils;
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = IScroll;
        } else {
            window.IScroll = IScroll;
        }
    })(window, document, Math);
});
