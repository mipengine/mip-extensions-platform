/**
 * 处理手机端页面的触摸工具
 * @file TouchMove 组件
 * @author Summer
 */
define(function (require) {

    var $ = require('zepto');

    var TouchMove = function (parms) {
        this.parm = parms;
        this.init();
        this.start();

    };

    TouchMove.prototype.init = function () {

        var that = this;
        var parm = that.parm;

        // 是否为上下触摸
        var isTop = parm.type !== 'left';

        parm.elem.on('touchstart', function (e) {

            parm.startFn && parm.startFn(that);

            // if(!parm.startSt) return;

            var et = e.touches[0];
            this._startLocation = {
                x: et.pageX,
                y: et.pageY
            };
            this._isStart = false;

            this.moveVal = isTop ? $(this).css('top').split('px')[0] : $(this).css('left').split('px')[0];

        }).on('touchmove', function (e) {

            // if(!parm.startSt) return;
            if (e.touches.length > 1 || e.scale && e.scale !== 1) {
                return;
            }

            var et = e.touches[0];
            var distX = et.pageX - this._startLocation.x;
            var distY = et.pageY - this._startLocation.y;
            var that = $(this);

            if (!this._isStart) {
                if (isTop) {
                    this._isStart = Math.abs(distX) < Math.abs(distY); // 上下动作
                } else {
                    this._isStart = Math.abs(distX) > Math.abs(distY); // 左右动作
                }

            }

            if (this._isStart) {
                parm.moveLong = isTop ? distY : distX;
                parm.moveFn && parm.moveFn(that);

                if (parm.startSt) {
                    e.preventDefault();

                    if (isTop) {
                        that.css('top', (parseInt(this.moveVal, 0) + distY) + 'px');
                    } else {
                        that.css('left', (parseInt(this.moveVal, 0) + distX) + 'px');
                    }

                    if (parm.moveLong > 0) {
                        parm.movePre = true;
                        parm.moveNext = false;
                    } else {
                        parm.moveNext = true;
                        parm.movePre = false;
                    }
                }
            }

        }).on('touchend touchcancel', function (e) {

            if (this._isStart) {
                e.preventDefault();

                parm.endFn && parm.endFn(that);
            }
        });

    };

    /*
     * 开始
     * */
    TouchMove.prototype.start = function () {
        this.parm.startSt = true;
    };

    /*
     * 关闭
     * */
    TouchMove.prototype.close = function () {
        this.parm.startSt = false;
    };

    TouchMove.prototype.getElem = function () {
        return this.parm.elem;
    };

    return function (parms) {
        return new TouchMove(parms);
    };

});