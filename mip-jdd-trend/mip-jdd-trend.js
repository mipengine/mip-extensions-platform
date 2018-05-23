/**
 * @file mip-jdd-trend 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * build说明：组件标签含有trend属性则需要立即初始化，没有则监听trend事件(firstInviewCallback在组件display:none;的情况下仍会触发。)
     *
     */
    customElement.prototype.build = function () {
        var self = this;

        this.notClassific = this.element.hasAttribute('notClassific');
        var immediateTrend = this.element.hasAttribute('trend');
        this.hasInited = false;
        if (immediateTrend) {
            build.call(this);
        }
        else {
            this.addEventAction('trend', function () {
                build.call(self);
            });
        }
    };

    /**
     *  根据notClassific判断是否根据类名分别渲染折线
     *
     */
    function build() {
        if (this.hasInited) {
            return;
        }
        this.hasInited = true;
        var self = this;
        var spans = this.element.querySelectorAll('[class^="ball-"],[class^="rect-"]');

        if (this.notClassific) {
            renderTrend.apply(this, [spans, 'rgb(220, 59, 64)']);
            return;
        }

        var trendMap = {};

        spans.forEach(function (span) {
            var className = span.getAttribute('class');
            if (!trendMap[className]) {
                trendMap[className] = [];
            }

            trendMap[className].push(span);
        });
        for (var x in trendMap) {
            var borderColor = util.css(this.element.querySelector('.' + x), 'backgroundColor');
            renderTrend.apply(this, [trendMap[x], borderColor]);
        }
    }

    /**
     * 计算连线位置，渲染连线
     *
     * @param {Object} spans 连线的所有标签.
     * @param {string} borderColor 连线的颜色.
     */
    function renderTrend(spans, borderColor) {
        var self = this;
        var pointList = [];
        var lineList = [];

        spans.forEach(function (item) {
            var hightLightEl = item.parentNode;
            var elWidth = hightLightEl.clientWidth;
            var elHeight = hightLightEl.clientHeight;
            var elOffsetLeft = hightLightEl.offsetLeft;
            var elOffsetTop = hightLightEl.offsetTop;
            pointList.push({
                x: elOffsetLeft + elWidth / 2,
                y: elOffsetTop + elHeight / 2
            });
        });
        pointList.forEach(function (item, index) {
            if (index + 1 === pointList.length) {
                return;
            }

            var nextItem = pointList[index + 1];
            var rotate;
            if (item.x - nextItem.x < 0) {
                rotate = Math.atan((item.y - nextItem.y) / (item.x - nextItem.x)) / Math.PI * 180;
            }
            else {
                rotate = (Math.atan((item.y - nextItem.y) / (item.x - nextItem.x)) / Math.PI * 180 - 180);
            }
            var res = {
                x: item.x,
                y: item.y,
                width: Math.sqrt(Math.pow(item.x - nextItem.x, 2) + Math.pow(item.y - nextItem.y, 2)),
                rotate: rotate
            };
            var i = document.createElement('i');
            i.style.left = res.x + 'px';
            i.style.top = res.y + 'px';
            i.style.width = res.width + 'px';
            i.style.transform = 'rotate(' + res.rotate + 'deg)';
            i.style.borderTopColor = borderColor;
            util.dom.insert(self.element, i);
        });
    }

    return customElement;
});
