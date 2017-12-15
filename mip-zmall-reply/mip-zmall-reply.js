/**
 * @file mip-zol-reply 组件
 * @author wen
 * @time 2017-11-17
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    var LOGIN_URL = '//cashier.zol.com/paygate/baidu/oauth?callbackurl=';

    /**
     * 提示框
     *
     * @param {string} str 提示信息
     */
    function toast(str) {
        if (this.querySelector('._j_miptoast')) {
            return;
        }

        var toast = document.createElement('div');
        toast.className = '_j_miptoast mip-zol-toast';
        toast.innerHTML = '<span>' + str + '</span>';
        this.appendChild(toast);
        document.body.style.pointerEvents = 'none';
        setTimeout(function () {
            toast.parentNode.removeChild(toast);
            document.body.style.pointerEvents = 'all';
        }, 800);
    }

    var reply = {
        // 重置
        resetForm: function (dom) {
            dom.textarea.value = '';
            dom.replyBtn.classList.remove('current');
        },

        events: function (dom, param, mipElement) {

            var self = this;

            // 循环绑定事件 弹出输入框
            [].forEach.call(dom.triggers, function (trigger, index) {
                trigger.addEventListener('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var userInfo = window.ZOL_USER_INFO;
                    if (userInfo && userInfo.sid && userInfo.sid !== '') {
                        dom.panel.classList.add('mip-zmall-reply-fixed-show');
                        dom.textarea.focus();
                    }
                    else {
                        var href = encodeURIComponent(location.href);
                        window.location.href = LOGIN_URL + href;
                    }
                }, false);
            });

            // 输入
            dom.textarea.addEventListener('keyup', function () {
                var val = this.value;
                if (val.length > 0) {
                    dom.replyBtn.classList.add('current');
                }
                else {
                    dom.replyBtn.classList.remove('current');
                }
            });

            // 关闭
            dom.closeBtn.addEventListener('click', function () {
                self.resetForm(dom);
                dom.textarea.blur();
                dom.panel.classList.remove('mip-zmall-reply-fixed-show');
            });


            // 回复
            dom.replyBtn.addEventListener('click', function () {

                var data = {
                    reviewId: param.reviewId,
                    fUserId: window.ZOL_USER_INFO.sid,
                    tUserId: param.tUserId,
                    reviewContent: dom.textarea.value
                };

                if (this.classList.contains('current')) {
                    $.ajax({
                        url: param.url,
                        type: 'POST',
                        data: data,
                        dataType: 'json',
                        success: function (res) {
                            if (res.flag === 0) {
                                toast.call(dom.panel, res.info);
                                dom.panel.classList.remove('mip-zmall-reply-fixed-show');
                                self.resetForm(dom);
                            }
                            else {
                                window.location.reload();
                            }
                        },
                        error: function () {
                            dom.panel.classList.remove('mip-zmall-reply-fixed-show');
                            self.resetForm(dom);
                        }
                    });
                }
            });
        },

        init: function (mipElement) {

            var ele = mipElement.element;
            var data = ele.dataset;
            var triggers = mipElement.triggers;
            var panel = mipElement.panel;

            // 输入框
            var textarea = panel.querySelector('.textarea');
            // 回复区域
            var inputRegion = panel.querySelector('.reply-input-box');
            // 回复按钮
            var replyBtn = panel.querySelector('.reply-btn');
            // 关闭按钮
            var closeBtn = panel.querySelector('.reply-input--hd .close');

            var reviewId = data.reviewId;
            var tUserId = data.userId;

            var dom = {
                panel: panel,
                triggers: triggers,
                textarea: textarea,
                inputRegion: inputRegion,
                replyBtn: replyBtn,
                closeBtn: closeBtn
            };
            var param = {
                reviewId: reviewId,
                tUserId: tUserId,
                url: data.src
            };

            this.events(dom, param, mipElement);
        }
    };

    /**
     * build 方法，元素插入到文档时执行，仅会执行一次
     * 必须用build，这个是一个吸底的元素，所以为了体验，需要用build
     */
    customElement.prototype.build = function () {

        var ele = this.element;
        var data = ele.dataset;

        // 因为 iframe 包含页面时， mip-fixed 的元素build的时候会被 挪到 页面底部
        var replyLayer = document.querySelector('mip-fixed[zmall-fixed-id="' + data.target + '"]');

        // 找到触发优惠券弹层的DOM，因不止一处触发，故而用 document.querySelectorAll 来获取
        var buttons = document.querySelectorAll('div[on="' + data.trigger + '"]');
        if (!buttons.length) {
            return;
        }

        this.triggers = buttons;

        this.panel = replyLayer;

        reply.init(this);
    };

    return customElement;
});
