/**
 * @file toast组件
 * @author 春雨前端开发组
 */
define(function () {
    'use strict';

    var utilFun = function () {
        var util = {};

        /* 判断系统 */
        function detect(ua) {
            var os = this.os = {};
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            if (android) {
                os.android = true;
                os.version = android[2];
            }
        }
        detect.call(util, navigator.userAgent);

        util.render = function (tpl, data) {
            var code = 'var p=[];with(this){p.push(\''
                + tpl.replace(/[\r\t\n]/g, ' ')
                    .split('<%').join('\t')
                    .replace(/((^|%>)[^\t]*)'/g, '$1\r')
                    .replace(/\t=(.*?)%>/g, '\',$1,\'')
                    .split('\t').join('\');')
                    .split('%>').join('p.push(\'')
                    .split('\r').join('\\\'')
                + '\');}return p.join(\'\');';
            return new Function(code).apply(data);
        };

        util.getStyle = function (el, styleProp) {
            var value;
            var defaultView = (el.ownerDocument || document).defaultView;
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
                // sanitize property name to css notation
                // (hypen separated words eg. font-Size)
                styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
                return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
            }
            else if (el.currentStyle) { // IE
                // sanitize property name to camelCase
                styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                    return letter.toUpperCase();
                });
                value = el.currentStyle[styleProp];
                // convert other units to pixels on IE
                if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                    return (function (value) {
                        var oldLeft = el.style.left;
                        var oldRsLeft = el.runtimeStyle.left;
                        el.runtimeStyle.left = el.currentStyle.left;
                        el.style.left = value || 0;
                        value = el.style.pixelLeft + 'px';
                        el.style.left = oldLeft;
                        el.runtimeStyle.left = oldRsLeft;
                        return value;
                    })(value);
                }

                return value;
            }

        };

        return util;
    };

    /**
     * toast 一般用于操作成功时的提示场景
     * @param {string} content toast的文字
     * @param {Object|function=} options 配置项或回调
     * @param {number=} [options.duration=3000] 多少毫秒后关闭toast
     * @param {function=} options.callback 关闭后的回调
     * @param {string=} options.className 自定义类名
     *
     * @example
     * cyui.toast('操作成功', 3000);
     * cyui.toast('操作成功', {
     *     duration: 3000,
     *     className: 'custom-classname',
     *     callback: function(){ console.log('close') }
     * });
     */

    var util = utilFun();
    var tpl = [
        '<div class="<%= className %>">',
        '<div class="cyui-mask_transparent"></div>',
        '<div class="cyui-toast">',
        '<i class="cyui-toast__icon <%= cyuiIcon %>"></i>',
        '<p class="cyui-toast__content"><%= content %></p>',
        '</div>',
        '</div>'
    ].join('');
    var mySington;

    function toast(content, options) {
        if (mySington) {
            return mySington;
        }

        if (typeof options === 'number') {
            options = {
                duration: options
            };
        }

        if (typeof options === 'function') {
            options = {
                callback: options
            };
        }

        options = $.extend({
            content: content || '',
            duration: 3000,
            cyuiIcon: '',
            callback: $.noop,
            className: ''
        }, options || {});

        var $toastWrap = $(util.render(tpl, options));
        var $toast = $toastWrap.find('.cyui-toast');
        var $mask = $toastWrap.find('.cyui-mask');

        if (!options.cyuiIcon) {
            $toastWrap.find('.cyui-icon_toast').remove();
        }

        $('body').append($toastWrap);
        $toast.addClass('cyui-animate-fade-in');
        $mask.addClass('cyui-animate-fade-in');

        setTimeout(function () {
            $mask.addClass('cyui-animate-fade-out');
            $toast
                .addClass('cyui-animate-fade-out')
                .on('animationend webkitAnimationEnd', function () {
                    $toastWrap.remove();
                    mySington = false;
                    options.callback();
                });
        }, options.duration);

        mySington = $toastWrap[0];
        return $toastWrap[0];
    }

    return toast;
});
