/**
   * @file: mip-53pop.js
   *
   * @author: 891995590@qq.com
   * @date: 2018-03-12
   */

define(function (require) {
    'use strict';
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var fixedElement = require('fixed-element');
    var util = require('util');
    var Gesture = util.Gesture;
    var scrollTop = {
        body: 0,
        documentElement: 0,
        offset: 0
    };

    /**
     * render
     *
     */

    function render() {
        customElement.prototype.firstInviewCallback = function () {
            var self = this;
            self.open = false;
            self.id = this.element.id;
            self.scroll = this.element.hasAttribute('content-scroll');
            // 盒子ID
            var divId = this.element.getAttribute('divId');
            // 姓名Id
            var popContact = this.element.getAttribute('popContact');
            // 联系方式ID
            var popTel = this.element.getAttribute('popTel');
            // 留言内容id
            var popInfo = this.element.getAttribute('popInfo');
            // 提交按钮Id
            var popButton = this.element.getAttribute('popButton');
            var projectId = this.element.getAttribute('projectId');
            var popId = this.element.getAttribute('id');
            //  获取当前宽高比例
            var popWidth = this.element.getAttribute('Dwidth');
            // 获取当前的属性值
            var projectIdValue = '';
            // 获取联系方式的属性值
            var popTelValue = '';
            // 获取姓名的属性值
            var popContactValue = '';
            // 获取留言内容的属性值
            var popInfoValue = '';
            // bottom 不能为0，不然会覆盖遮盖曾，导致无法关闭lightbox
            util.css(self.element, {
                'position': 'fixed',
                'z-index': 10001,
                'top': (($(window).height() - $(window).width() * popWidth) / 2),
                'right': 0,
                'left': 0,
                'transition': 'opacity 0.1s ease-in'
            });
            changeParentNode.call(self);
            // 事件注册
            self.addEventAction('close', function (event) {
                close.call(self, event);
            });
            self.addEventAction('open', function (event) {
                open.call(self, event);
            });
            self.addEventAction('toggle', function (event) {
                toggle.call(self, event);
            });
            $('#' + popButton + '').click(function () {
                var tval = $('#' + popTel + '').text();
                var add = true;
                var reTel = /^1\d{10}$/;
                var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
                // 判断名字是否为空
                if (popContact !== '') {
                    if ($.trim($('#' + popContact + '').text()) === '') {
                        $('#' + popContact + '').attr('placeholder', '请输入你的姓名');
                        $('#' + popContact + '').css('border-color', '#FF0000');
                    }
                else {
                        $('#' + popContact + ' ').css('border-color', '#d2d2d2');
                        popContactValue = $.trim($('#' + popContact + ' ').text());
                    }
                }
                // 判断联系方式是否为空
                if ($.trim(tval) === ' ') {
                    $('#' + popTel + '').css('border-color', '#FF0000');
                    $('#' + popTel + '').attr('placeholder', '请输入你的手机号码');
                    return;
                }
                else if (reTel.test(tval) === false && reg.test(tval) === false) {
                    $('#' + popTel + '').css('border-color', '#FF0000');
                    $('#' + popTel + '').text('');
                    $('#' + popTel + '').attr('placeholder', '输入的联系方式不正确');
                    return;
                }
                else {
                    $('#' + popTel + '').css('border-color', '#d2d2d2');
                    popTelValue = $.trim(tval);
                }
                if (popInfo !== ' ') {
                    popInfoValue = $.trim($('#' + popInfo + '').text());
                }
                var loginReqbody = {
                    'tid': projectId,
                    'type': 'addMsg',
                    'tel': popTelValue,
                    'popInfo': popInfoValue,
                    'popContact': popContactValue
                };
                // 获取数据
                $.ajax({
                    url: 'https://m.53.com.cn/common/mipwebdo.ashx',
                    type: 'POST',
                    async: false,
                    data: JSON.stringify(loginReqbody),
                    error: function () {
                        alert('留言失败');
                    },
                    success: function (data, status) {
                        if (status = 'success' && data !== '') {
                            alert(data);
                            $('#' + popTel + '').text('');
                            $('#' + popId + '').toggle();
                            $('.MIP-53POP-MASK').css('display', 'none');
                            document.documentElement.classList.remove('mip-no-scroll');
                            self.open = false;
                        } else {
                            alert('留言失败');
                        }
                    }
                });
            });
        };
    }
        // 自动关闭弹层
    function autoClose() {
            var self = this;
            var count = self.element.getAttribute('autoclosetime');
            var seconds = self.element.querySelector('.mip-53pop-seconds');
            // 判断是否有 autoclose 和 seconds
            if (Number(count) && seconds) {
                // 取出用户自定义的 time 值
                var time = Math.abs(Math.ceil(count));
                // 倒计时
                seconds.innerHTML = time;
                this.interval = setInterval(function () {
                    time -= 1;
                    seconds.innerHTML = time;
                    if (time <= 0) {
                        close.call(self);
                    }
                }, 1000);
            }
        }
    function changeParentNode() {
            var self = this;
            var nodes = [];
            var index = 0;
            var CHILDRENS = self.element.childNodes;

            for (index = 0; index < CHILDRENS.length; index++) {
                if (CHILDRENS[index].nodeType === 1) {
                    nodes.push(CHILDRENS[index]);
                }
            }

            self.container = document.createElement('div');
            self.applyFillContent(self.container);
            self.element.appendChild(self.container);

            for (index = 0; index < nodes.length; index++) {
                self.container.appendChild(nodes[index]);
            }
        }

        /**
        * [toggle description]
        *
        * @param  {Object} event [事件对象]
        */
    function toggle(event) {
            isOpen.call(this) ? close.call(this, event) : open.call(this, event);
        }

        /**
        * [open 打开 sidebar]
        *
        * @param  {Object} event [事件对象]
        */
    function open(event) {
            var self = this;
            if (self.open) {
                return;
            }
            fixedElement.hideFixedLayer(fixedElement._fixedLayer);
            event.preventDefault();
            if (!self.scroll) {
                new Gesture(self.element, {
                    preventY: true
                });
            }
            self.open = true;
            util.css(self.element, {display: 'block'});
            // 保存页面当前滚动状态，因为设置overflow:hidden后页面会滚动到顶部
            scrollTop.body = document.body.scrollTop;
            scrollTop.documentElement = document.documentElement.scrollTop;
            scrollTop.offset = window.pageYOffset;
            document.documentElement.classList.add('mip-no-scroll');
            openMask.call(self);
            autoClose.call(self);
        }

        /**
        * [close 关闭 sidebar]
        *
        * @param  {Object} event [事件对象]
        */
    function close(event) {
            var self = this;
            if (!self.open) {
                return;
            }
            fixedElement.showFixedLayer(fixedElement._fixedLayer);
            if (event) {
                event.preventDefault();
            }
            self.open = false;
            closeMask.call(self);
            util.css(self.element, {display: 'none'});
            document.documentElement.classList.remove('mip-no-scroll');
            // 恢复页面滚动状态到lightbox打开之前
            if (typeof (document.body.scrollTo) === 'function') {
            // 先判断存在，因为safari浏览器没有document.body.scrollTo方法
                document.body.scrollTo(0, scrollTop.body);
            }
            if (typeof (document.documentElement.scrollTo) === 'function') {
            // 先判断存在，因为safari浏览器没有document.documentElement.scrollTo方法
                document.documentElement.scrollTo(0, scrollTop.documentElement);
            }
            window.scrollTo(0, scrollTop.offset);
        }

        /**
        * [isOpen description]
        *
        * @return {boolean} [是否打开标志]
        */
    function isOpen() {
            return this.open;
        }

        /**
         * [openMask 打开浮层]
         */
    function openMask() {
            var self = this;
            // 不存在遮盖层时先创建
            if (!self.maskElement) {
                var mask = document.createElement('div');
                mask.id = 'MIP-53POP-MASK';
                mask.className = 'MIP-53POP-MASK';
                mask.setAttribute('on', 'tap:' + self.id + '.close');
                mask.style.display = 'block';

                // 与mip-53pop 同级dom
                self.element.parentNode.appendChild(mask);
                if (!self.scroll) {
                    mask.addEventListener('touchmove', function (evt) {
                        evt.preventDefault();
                    }, false);
                }
                self.maskElement = mask;
            }

            // 样式设置
            util.css(self.maskElement, {display: 'block'});
        }

        /**
         * [closeMask 关闭遮盖层]
         *
         */
    function closeMask() {
            if (this.maskElement) {
                util.css(this.maskElement, {display: 'none'});
                clearInterval(this.interval);
            }
        }

        /**
         * 初始化
         *
         */
    customElement.prototype.build = render;
    customElement.prototype.detachedCallback = function () {
        clearInterval(this.interval);
        document.documentElement.classList.remove('mip-no-scroll');
    };
    return customElement;
});


