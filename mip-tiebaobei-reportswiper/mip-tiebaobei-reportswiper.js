/**
 * @file mip-tiebaobei-reportswiper 组件
 * @author weiss
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var script = this.element.querySelector('script[type="application/json"]');
        var textContent = JSON.parse(script.textContent);
        var apiUrl = textContent.apiUrl;
        var fetchJsonp = require('fetch-jsonp');
        var util = require('util');
        // 类对象
        var instance = '';
        var moveXY = function (options) {
            var defaults = {
                targetObj: 'li',
                effect: 'yToBottom',
                speed: 1000,
                timer: 3000
            };
            var opts = $.extend({}, defaults, options);
            var $this = ele.find('.swiper-wrapper');
            var $li = $this.find(opts.targetObj);
            var slideSize = '';
            slideSize = parseInt($li.height(), 10);
            slideSize += parseInt($li.css('padding-top'), 10) + parseInt($li.css('padding-bottom'), 10) + 1;
            var doPlay = function () {
                // console.log(111)
                // 实例对象
                var NaBooA = util.naboo;
                var NaBoo = new NaBooA();
                instance = NaBoo.animate($this[0], {
                    transform: 'translateY(' + (-slideSize) + 'px)'
                }, {
                    duration: 1000,
                    ease: 'ease',
                    delay: 500,
                    mode: 'transition',
                    cb: function () {
                        // console.log(33)
                        var $cl = $this.find(opts.targetObj).eq(0);
                        $cl.css({opacity: 0, filter: 'alpha(opacity=0)'});
                        $this.attr('style', '');
                        $this.append($cl);
                        $cl.css({opacity: 1}, opts.speed);
                        NaBoo.cancel();
                    }
                }).start();
            };
            // 自动播放函数
            var autoPlay = setInterval(doPlay, opts.timer);
            $li.mouseenter(function () {
                instance.cancel();
                if (autoPlay) {
                    clearInterval(autoPlay);
                }
            }).mouseleave(function () {
                if (autoPlay) {
                    clearInterval(autoPlay);
                }
                autoPlay = setInterval(doPlay, opts.timer);
            });
        };
        // 战报
        fetchJsonp(apiUrl + 'api/app/getSuccOrder', {
            jsonpCallback: 'callback'
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (parseInt(result.ret, 10) === 0) {
                var li = '';
                for (var i = 0; i < result.result.length; i++) {
                    li += '<li class="swiper-slide"><div><em>' + result.result[i].desc + '</em><span>';
                    li += result.result[i].time + '</span></div></li>';
                }
                ele.find('.report-sec ul').html(li);
                setTimeout(function () {
                    moveXY();
                }, 1000);
            }
        }).catch(function (ex) {
           // console.log('parsing failed', ex);
        });
    };
    return customElement;
});
