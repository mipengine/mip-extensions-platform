/**
 * @file mip-xxd-input-item 组件
 * @author xwchris
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    var customElement = require('customElement').create();
    var viewer = require('viewer');
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 根据传入的类型渲染不同输入框
     *
     * @param {string} type 输入框类型
     * @param {string} data 输入框数据
     * @return {string} 插入的元素html
     */
    function renderInputItemWithType(type, data) {
        var childHtml = '';

        switch (type) {
            case 'select':
                childHtml = renderSelect(data);
                break;
            case 'selectInput':
                childHtml = renderSelectInput(data);
                break;
            case 'captchaPic':
                childHtml = renderCaptchaPic(data);
                break;
            case 'captcha':
                childHtml = renderCaptcha(data);
                break;
            case 'textarea':
                childHtml = renderTextarea(data);
                break;
            case 'input':
                childHtml = renderInput(data);
                break;
            default:
                childHtml = '';
                break;
        }

        if (data.hidden) {
            childHtml = '';
        }
        return childHtml;
    }

    /**
     * 渲染select
     *
     * @param {Object} data data-item数据
     * @return {string} 需要渲染的html
     */
    function renderSelect(data) {
        var options = generateOptionsHtml(data, data.value);

        var html = '<label class="mip-xxd-input-item-box">'
                    + '<div class="mip-xxd-input-item-title">' + data.title + '</div>'
                    + '<select'
                        + ' class="mip-xxd-input-item-input item-select"'
                        + ' id=' + data.key
                        + ' value=' + data.value
                    + '>'
                        + options
                    + '</select>'
                    + '<div class="mip-xxd-input-item-arrow"></div>'
                + '</label>';
        return html;
    }

    /**
     * 渲染selectInput
     *
     * @param {Object} data data-item数据
     * @return {string} 需要渲染的html
     */
    function renderSelectInput(data) {
        var options = generateOptionsHtml(data, data.selectValue);

        var html = '<label class="mip-xxd-input-item-box" for=' + data.selectKey + '>'
                    + '<div class="mip-xxd-input-item-title is-select">'
                        + '<select'
                            + ' class="mip-xxd-input-item-select"'
                            + ' id=' + data.selectKey
                        + '>'
                            + options
                        + '</select>'
                        + '<span class="icon-box"></span>'
                    + '</div>'
                    + '<input'
                        + ' class="mip-xxd-input-item-input"'
                        + ' type="input"'
                        + ' placeholder=' + data.placeholder
                        + ' id=' + data.key
                        + ' value="' + (data.value || '') + '"'
                        + ' disabled'
                    + ' />'
                + '</label>';

        return html;
    }

    /**
     * 渲染input数据
     *
     * @param {Object} data data-item数据
     * @return {string} 需要渲染的html
     */
    function renderInput(data) {
        var html = '<label class="mip-xxd-input-item-box">'
                    + '<div class="mip-xxd-input-item-title">' + data.title + '</div>'
                    + '<input'
                        + ' class="mip-xxd-input-item-input"'
                        + ' type="input"'
                        + ' placeholder=' + data.placeholder
                        + ' id=' + data.key
                        + ' value="' + (data.value || '') + '"'
                    + ' />'
                + '</label>';

        return html;
    }

    /**
     * 渲染input数据
     *
     * @param {Object} data data-item数据
     * @return {string} 需要渲染的html
     */
    function renderTextarea(data) {
        var html = '<textarea'
                    + ' class="mip-xxd-input-item-textarea"'
                    + ' placeholder=' + data.placeholder
                    + ' id=' + data.key
                    + ' value=' + (data.value || '')
                + '></textarea>';

        return html;
    }

    /**
     * 渲染图形验证码
     *
     * @param {Object} data data-item数据
     * @return {string} 需要渲染的html
     */
    function renderCaptchaPic(data) {
        var html = '<div class="mip-xxd-input-item-box">'
                    + '<label class="input-area">'
                        + '<div class="mip-xxd-input-item-title">' + data.title + '</div>'
                        + '<input'
                            + ' class="mip-xxd-input-item-input has-after"'
                            + ' type="input"'
                            + ' placeholder=' + data.placeholder
                            + ' id=' + data.key
                            + ' value="' + (data.value || '') + '"'
                        + ' />'
                    + '</label>'
                    + '<div class="is-after"></div>'
                + '</div>';

        return html;
    }

    /**
     * 渲染短信验证码
     *
     * @param {Object} data data-item数据
     * @return {string} 需要渲染的html
     */
    function renderCaptcha(data) {
        var html = '<div class="mip-xxd-input-item-box">'
                    + '<label class="input-area">'
                        + '<div class="mip-xxd-input-item-title">' + data.title + '</div>'
                        + '<input'
                            + ' class="mip-xxd-input-item-input has-after"'
                            + ' type="input"'
                            + ' placeholder=' + data.placeholder
                            + ' id=' + data.key
                            + ' value="' + (data.value || '') + '"'
                        + ' />'
                    + '</label>'
                    + '<div class="is-after"><div class="send-captcha-btn">获取验证码</div></div>'
                + '</div>';

        return html;
    }

    /**
     * 生成select的options
     *
     * @param {Object} data 所需数据
     * @param  {string} defaultValue 默认值
     * @return {string} options的html字符串
     */
    function generateOptionsHtml(data, defaultValue) {
        var options = (data.data || []).map(
            function (optionData) {
                var optionHtml = '<option'
                            + ' value=' + '"' + (optionData.value || '') + '"'
                            + (optionData.value === defaultValue ? ' selected' : '')
                        + '>'
                            + optionData.name
                        + '</option>';
                return optionHtml;
            }).join('');

        return options;
    }

    /**
     * 绑定改变事件
     *
     * @param {string} type input类型(input, select, selectInput)
     */
    function bindChangeEvent() {
        var element = this.element;
        var self = this;
        element.addEventListener('change', function (event) {

            // 记录当前值
            var value = event.target.value;

            if (self.type === 'select') {
                element.dataset.value = value;
                viewer.eventAction.execute('change', element, event);
            }
            else if (self.type === 'selectInput') {
                var inputElement = _$('input', element);
                var selectElement = _$('select', element);
                element.dataset.key = selectElement.value;

                if (inputElement.value && selectElement.value) {
                    element.dataset.value = inputElement.value;
                }

                if (event.target.tagName === 'SELECT') {
                    if (selectElement.value) {
                        inputElement.disabled = false;
                        _$('label', element).htmlFor = '';
                    }
                    else {
                        inputElement.disabled = true;
                        inputElement.value = '';
                        element.dataset.value = '';
                        _$('label', element).htmlFor = selectElement.id;
                    }
                    viewer.eventAction.execute('change', element, event);
                }
            }
            else {
                element.dataset.value = value;
            }
        });
    }

    /**
     * 查找dom元素
     *
     * @param {string} selector 选择器
     * @param {dom} dom 要查找的范围节点末尾为document
     * @return {dom} 符合条件的dom节点
     */
    function _$(selector, dom) {
        return dom ? dom.querySelector(selector) : document.querySelector(selector);
    }

    /**
     * 处理刷新行为
     *
     * @param {string} action 刷新行为
     * @param {string} value 当前值
     * @param {string} data 数据MAP
     */
    function handleRefreshActions(action, value, data) {
        var element = this.element;
        var html = '';
        var actionFunc = this.type === 'select' ? renderSelect : renderSelectInput;
        if (action === 'changeList') {

            // 切换列表行为
            var originData = JSON.parse(element.dataset.item);
            originData.data = data[value];
            html = actionFunc(originData);
            element.innerHTML = html;
            element.dataset.value = '';
        }
        else if (action === 'toggleShow') {

            // 切换显隐行为
            var isShow = data[value];
            if (isShow && this.oldData) {
                html = actionFunc(this.oldData);
            }
            else {
                html = '';
            }

            if (this.type === 'selectInput') {
                element.dataset.key = '';
            }
            element.innerHTML = html;
            element.dataset.value = '';
        }
        else if (action === 'changePlaceholder') {

            // 切换提示文字
            var inputElement = _$('input', element);
            var selectElement = _$('select', element);
            value = selectElement.value || '';
            inputElement.placeholder = data[value];
        }
    }

    /**
     * 解析参数字符串得出所需参数
     *
     * @param {string} str 参数字符串
     * @return {Object} 渲染所需参数
     */
    function getRefreshParams(str) {
        var element = this.element;
        var arr = str.split('|');
        var targetDataset = _$('#' + arr[0]).dataset;
        var id = element.id;
        var value = targetDataset.value;
        var action = arr[1];
        var data = JSON.parse(targetDataset.map)[id];
        return {
            value: value,
            action: action,
            data: data
        };
    }

    /**
     * 请求验证码
     *
     * @param {Object} userService 验证码请求地址
     */
    function fetchCaptchaPic(userService) {
        var self = this;
        var element = self.element;

        fetchJsonp(userService, {
            jsonpCallback: 'callback',
            timeout: 10000
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.status === 0) {
                var data = json.data;
                var nonce = data.nonce;

                // 记录该值
                var nonceElement = _$('#nonceItem');
                if (nonceElement) {
                    nonceElement.dataset.value = nonce;
                }

                // 生成图形验证码
                var image = data.image;
                var container = _$('.is-after', element);
                container.innerHTML = '';
                var captchaImage = document.createElement('div');
                captchaImage.className = 'captcha-image';
                captchaImage.innerHTML = image;
                var picCaptchaElement = _$('svg', captchaImage);
                picCaptchaElement.setAttribute('width', '100%');
                picCaptchaElement.setAttribute('height', '100%');
                picCaptchaElement.setAttribute('viewBox', '0 0 150 50');
                container.appendChild(captchaImage);
            }
        });
    }

    /**
     * 处理图形验证码点击事件
     *
     * @param {Object} data item数据对象
     */
    function handleCaptchaPicClick(data) {
        var self = this;
        var element = self.element;
        var userService = data.userService;
        var container = _$('.is-after', element);

        // 初始设置验证码
        fetchCaptchaPic.call(self, userService);
        container.addEventListener('click', function (e) {

            // 设置验证码
            fetchCaptchaPic.call(self, userService);
        });
    }

    /**
     * 设置短信验证码倒计时
     *
     * @param {Object} context 上下文
     * @param {dom} btnElement 按钮元素
     */
    function setCountDown(context, btnElement) {
        if (context.countDown > 1) {
            var btnText = (--context.countDown) + '秒';
            btnElement.textContent = btnText;
            setTimeout(function () {
                setCountDown(context, btnElement);
            }, 1000);
        }
        else {
            context.countDown = 30;
            btnElement.textContent = '获取验证码';
        }
    }

    /**
     * 短信验证码点击事件
     *
     * @param {string} data 所需数据
     */
    function handleCaptchaClick(data) {
        var self = this;
        var element = self.element;
        var btnElement = _$('.send-captcha-btn', self.element);
        var url = data.api;

        btnElement.addEventListener('click', function (event) {
            if (self.countDown !== 30) {
                return;
            }

            // 获取图形验证码
            var phone = _$('#phoneItem').dataset.value;
            var picCaptcha = _$('#captchaPicItem').dataset.value;
            var nonce = _$('#nonceItem').dataset.value;

            // 校验手机号和图片验证码
            if (!/^1\d{10}/.test(phone)) {
                element.setAttribute('on', 'show:mip-xxd-logic-form.showTip(请填写正确的手机号)');
                viewer.eventAction.execute('show', element, event);
                return;
            }

            if (!picCaptcha) {
                element.setAttribute('on', 'show:mip-xxd-logic-form.showTip(请填写图形验证码)');
                viewer.eventAction.execute('show', element, event);
                return;
            }

            var requestUrl = url + '?phone=' + phone + '&captcha=' + picCaptcha + '&nonce=' + nonce;

            fetchJsonp(requestUrl, {
                jsonpCallback: 'callback',
                timeout: 10000
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                if (json.status === 0) {
                    setCountDown(self, btnElement);
                }
                else {
                    element.setAttribute('on', 'show:mip-xxd-logic-form.showTip(' + json.msg + ')');
                    viewer.eventAction.execute('show', element, event);
                    return;
                }
            });
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        // 数据校验 弹出提示框
        var self = this;
        var element = self.element;

        // 解析data-item属性对象
        var data = JSON.parse(element.dataset.item);
        var type = data.type;

        // 记录旧的值
        this.oldData = data;
        this.type = type;

        // 设置验证码发送倒计时
        this.countDown = 30;

        // 根据传入的类型来渲染不同的输入框
        // 类型有input select-input select
        var childHtml = renderInputItemWithType(type, data);
        element.innerHTML = childHtml;
        element.dataset.key = data.key || '';
        element.dataset.value = data.value || '';

        if (type === 'selectInput') {
            element.dataset.key = data.selectValue || '';
        }

        // 绑定改变事件
        bindChangeEvent.call(this);

        if (type === 'captchaPic') {
            handleCaptchaPicClick.call(self, data);
        }

        if (type === 'captcha') {
            handleCaptchaClick.call(self, data);
        }
    };

    // build说明：需要尽早绑定action
    customElement.prototype.build = function () {
        var self = this;

        // 监听事件
        self.addEventAction('refreshData', function (event, str) {

            // 获取参数
            var params = getRefreshParams.call(this, str);

            // 处理刷新行为
            handleRefreshActions.call(self, params.action, params.value, params.data);
        });
    };

    return customElement;
});
