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

            // 弹出输入框
            dom.textBtn.addEventListener('click', function () {
                // 是否登录验证
                if (window.ZOL_USER_INFO.sid) {
                    dom.inputRegion.classList.remove('bottom');
                    dom.inputRegion.classList.add('top');

                    dom.textarea.focus();
                }
                else {
                    var href = encodeURIComponent(location.href);
                    window.location.href = LOGIN_URL + href;
                }
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
                dom.inputRegion.classList.remove('top');
                dom.inputRegion.classList.add('bottom');
                self.reset(dom);
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
                                toast.call(mipElement, res.info);
                                dom.inputRegion.classList.remove('top');
                                dom.inputRegion.classList.add('bottom');
                                self.resetForm(dom);
                            }
                            else {
                                window.location.reload();
                            }
                        },
                        error: function () {
                            dom.inputRegion.classList.remove('top');
                            dom.inputRegion.classList.add('bottom');
                            self.resetForm(dom);
                        }
                    });
                }
            });
        },

        init: function (dom, param, mipElement) {
            this.events(dom, param, mipElement);
        }
    };

    /**
     * build 方法，元素插入到文档时执行，仅会执行一次
     * 必须用build，这个是一个吸底的元素，所以为了体验，需要用build
     */
    customElement.prototype.build = function () {

        var ele = this.element;

        var textarea = ele.querySelector('.textarea'); // 输入框
        var inputRegion = ele.querySelector('.reply-input'); // 回复区域
        var replyBtn = ele.querySelector('.reply-btn'); // 回复按钮
        var closeBtn = ele.querySelector('.reply-input--hd .close'); // 关闭按钮
        var textBtn = ele.querySelector('.textareaDiv');

        var reviewId = ele.querySelector('#reviewId').value;
        var tUserId = ele.querySelector('#tUserId').value;

        var dom = {
            textBtn: textBtn,
            textarea: textarea,
            inputRegion: inputRegion,
            replyBtn: replyBtn,
            closeBtn: closeBtn
        };
        var param = {
            reviewId: reviewId,
            tUserId: tUserId,
            url: ele.dataset.src
        };

        reply.init(dom, param, this);
    };

    return customElement;
});
