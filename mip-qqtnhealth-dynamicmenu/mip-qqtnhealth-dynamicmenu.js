/**
 * @file mip-qqtnhealth-dynamicmenu 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var templates = require('templates');
    var util = require('util');
    var customElement = require('customElement').create();
    $.fn.scrollTo = function (options) {
        var defaults = {
            toT: 0, // 滚动目标位置
            durTime: 160, // 过渡动画时间
            delay: 30, // 定时器时间
            callback: null // 回调函数
        };
        var opts = $.extend(defaults, options);
        var timer = null;
        var thisThis = this;
        var curTop = thisThis.scrollTop();
        var subTop = opts.toT - curTop;
        var index = 0;
        var dur = Math.round(opts.durTime / opts.delay);
        var smoothScroll = function (t) {
                index++;
                var per = Math.round(subTop / dur);
                if (index >= dur) {
                    thisThis.scrollTop(t);
                    window.clearInterval(timer);
                    if (opts.callback && typeof opts.callback === 'function') {
                        opts.callback();
                    }

                    return;
                }
                else {
                    thisThis.scrollTop(curTop + index * per);
                }
            };
        timer = window.setInterval(function () {
            smoothScroll(opts.toT);
        }, opts.delay);
        return thisThis;
    };
    var pageJs = {
        init: function () {
            this.typeSetting(); // 重新排版
            this.fixedNav(); // H3漂浮导航
        },
        typeSetting: function () {
            var chongZuHtml = '';
            var contChildrenSize = $('.g-cont').children().length;
            var i = 0;
            for (i = 0; i < contChildrenSize; i++) {
                var divName = $('.g-cont').children().eq(i).prop('tagName');
                if (divName !== 'H3') {
                    var pObj = $('.g-cont').children().eq(i);
                    if (pObj.find('img').length > 0) {
                        var imgSrc = pObj.find('img').attr('src');
                        chongZuHtml += '<p><mip-img src="' + imgSrc + '"></mip-img></p>';
                    } else {
                        chongZuHtml += '<p>' + pObj.html() + '</p>';
                    }
                }
                else {
                    chongZuHtml += '<b class="m-float-top"></b></div><div class="g-cont-obj"><h3>'
                    + $('.g-cont').children().eq(i).html() + '</h3>';
                }
            }
            chongZuHtml = '<div class="g-content">' + chongZuHtml + '<b class="m-float-top"></b></div>';
            $('.g-cont').removeClass('g-cont-bg');
            $('.g-cont').html(chongZuHtml);
            var contText = ['正文', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];
            $('.m-float-top').each(function (i) {
                $(this).text(contText[i]);
            });
        },
        fixedNav: function () {
            var h3Text = '';
            var data = {
                list: []
            };
            $('.g-cont h3').each(function (i) {
                i++;
                data.list.push({'title': (i++) + '、' + $(this).text()});
            });

            // 获取数据后，通过 template 模板渲染到页面的 mip-sidebar 组件节点中
            var node = document.querySelector('#mip-sidebar');
            templates.render(node, data).then(function (html) {
                node.innerHTML = html;
            });

            // 事件代理 li 节点点击事件
            util.event.delegate(node, 'li', 'click', function () {
                var n = $(this).index();
                var h3Top = $('.g-cont h3').eq(n).parent().offset().top;
                $('body').scrollTo({
                    toT: h3Top
                });
            });
        }
    };
    customElement.prototype.build = function () {
        pageJs.init();
    };

    return customElement;
});
