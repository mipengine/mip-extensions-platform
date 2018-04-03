/**
 * @file mip-audio-frequency 主文件
 * @author idongde
 */

define(function (require) {
    /*
    * Naboo动画api中的naboo.cancel()无法达到jquery动画中.stop(true)的功能,原生动画api又过于繁琐
    * 所以需要引入jQuery，相关的dom操作为了统一风格，故也使用jQuery
    */
    var $ = require('jquery');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        // element 可取到当前实例对应的 dom 元素
        var mip = this;
        var $element = $(this.element);
        var playingIconClass = $element.attr('audio-playing-class'); // 音频播放时显示的图标class
        var stopedIconClass = $element.attr('audio-stoped-class'); // 音频暂停时显示的图标class
        var row = $element.attr('row'); // 横向的柱状条数量
        var cloumn = $element.attr('cloumn'); // 纵向的柱状条里小方块的数量
        var Frequency = function () {
            this.topUl = $element.find('.top ul');
            this.bottomUl = $element.find('.bottom ul');
            this.row = row;
            this.cloumn = cloumn;
            this.baseRate;
            this.audioPlaying = true;
            this.firstPlay = true;
            this.init();
        };
        Frequency.prototype.init = function () {
            // 创建频谱dom元素
            this.createRowItemAndInsert();
            // 初始化频谱柱状条高度
            this.setEachCloumnHeight();
            // 添加跨组件监听
            this.listener();
        };
        Frequency.prototype.listener = function () {
            var self = this;
            // mip组件机制绑定事件，监听mip-audio组件的暂停，播放事件
            mip.addEventAction('audio_event', function (event, str) {
                var currentClass = event.target.getAttribute('class'); // 按钮点击前的class
                if (currentClass === playingIconClass) {
                    // 此时音频状态为暂停
                    self.audioPlaying = false;
                }
                else if (currentClass === stopedIconClass) {
                    // 此时音频状态为播放
                    self.audioPlaying = true;
                    self.setEachCloumnHeight();
                }
            });
        };
        Frequency.prototype.createRowItemAndInsert = function () {
            var topUl = this.topUl;
            var bottomUl = this.bottomUl;
            var liTemplate = '<li><div></div></li>';
            var spanTemplate = '<span></span>';
            for (var i = 0; i < this.row; i++) {
                topUl.append(liTemplate);
                bottomUl.append(liTemplate);
                var topLi = topUl.find('li').last().find('div');
                var bottomLi = bottomUl.find('li').last().find('div');
                for (var j = 0; j < this.cloumn; j++) {
                    topLi.append(spanTemplate);
                    bottomLi.append(spanTemplate);
                }
            }
            this.cloumnHeight = topUl.outerHeight();
        };
        Frequency.prototype.setEachCloumnHeight = function () {
            var self = this;
            var itemsTop = this.topUl.find('li');
            var itemsBottom = this.bottomUl.find('li');
            for (var i = 0; i < itemsTop.length; i++) {
                var ulHeight = Math.floor(this.cloumnHeight * this.getBaseRate()); // 得到一个高度乘以百分比后的值,并取整
                if (ulHeight <= 3) {
                    ulHeight = 3;
                }
                this.itemAnimate(itemsTop.eq(i), itemsBottom.eq(i));
            }
            self.firstPlay = false;
        };
        Frequency.prototype.getBaseRate = function () {
            var baseRate = Math.floor(Math.random() * 100 + 1) / 100; // 1~100随机数
            return baseRate;
        };
        Frequency.prototype.itemAnimate = function (itemTop, itemBottom) {
            var self = this;
            // 第一次载入先绘制一遍
            if (this.firstPlay) {
                var randomHeight = Math.floor(this.cloumnHeight * this.getBaseRate());
                itemTop.animate({
                    height: randomHeight
                }, 100, 'linear');
                itemBottom.animate({
                    height: Math.floor(randomHeight / 4)
                }, 100, 'linear');
                return;
            }
            if (!this.audioPlaying) {
                // 清空动画队列
                this.stopAnimate();
                return;
            }
            var randomHeight = Math.floor(this.cloumnHeight * this.getBaseRate());
            itemTop.animate({
                height: randomHeight
            }, 1000, 'linear', function () {
                if (!self.audioPlaying) {
                    // 清空动画队列
                    self.stopAnimate();
                    return;
                }
                return self.itemAnimate(itemTop, itemBottom);
            });
            itemBottom.animate({
                height: Math.floor(randomHeight / 4)
            }, 1000, 'linear', function () {
                if (!self.audioPlaying) {
                    // 清空动画队列
                    self.stopAnimate();
                    return;
                }
                return self.itemAnimate(itemTop, itemBottom);
            });
        };
        Frequency.prototype.stopAnimate = function () {
            this.topUl.find('li').stop(true); // true 表示清空动画队列，包括未执行的动画
            this.bottomUl.find('li').stop(true);
        };
        new Frequency();
    };
    return customElem;
});