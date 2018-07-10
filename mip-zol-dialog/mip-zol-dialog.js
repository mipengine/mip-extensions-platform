/**
 * @file mip-zmall-yunfei 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');

    // toast
    function toast(str, pause) {
        var element = this.element;
        var toastHtml = '<div class="mip-dialog-toast">' + str + '</div>';
        if (element.dataset.toastMask && element.dataset.toastMask === 'true') {
            toastHtml += '<div class="mip-dialog-mask"></div>';
        }
        element.innerHTML = toastHtml;
        setDailogElementCover(element);
        var toastElm = element.querySelector('.mip-dialog-toast');
        setTimeout(function () {
            toastElm.classList.add('show');
        }, 0);
        pause = pause || 1500;
        setTimeout(function () {
            toastElm.classList.remove('show');
            removeDailogElementCover(element);
        }, pause);
    }

    function confirm(str, options) {
        var element = this.element;
        var yesBtnText = (options && options.ok && options.ok !== '') ? options.ok : '确定';
        var noBtnText = (options && options.cansel && options.cansel !== '') ? options.cansel : '取消';
        var uiConfirmHtml = [
            '<div id="_ui_confirm" class="mip-dialog-confirm">',
            '<div class="mip-confirm-body"><p>' + str + '</p></div>',
            '<div id="_ui_confirm_button" class="mip-confirm-button">',
            '<button class="mip-confirm-cansel">' + noBtnText + '</button>',
            '<button class="mip-confirm-yes">' + yesBtnText + '</button>',
            '</div></div>'
        ].join('');

        if (element.dataset.confirmMask && element.dataset.confirmMask === 'true') {
            uiConfirmHtml += '<div class="mip-dialog-mask"></div>';
        }

        element.innerHTML = uiConfirmHtml;
        setDailogElementCover(element);

        var uiConfirmElement = element.querySelector('#_ui_confirm');
        setTimeout(function () {
            uiConfirmElement.classList.add('show');
        }, 0);

        var button = element.querySelector('#_ui_confirm_button');
        button.addEventListener('click', function (e) {
            var targetButton = e.target;
            removeDailogElementCover(element);
            if (targetButton.classList.contains('mip-confirm-yes')) {
                (options && typeof options.okCallback === 'function') && options.okCallback();
            }
            else {
                (options && typeof options.canselCallback === 'function') && options.canselCallback();
            }
        });
    }

    function selector(options) {
        var element = this.element;
        var title = options.title;
        var buttonText = options.buttonText;
        var optionsList = '';
        var type = options.type ? options.type : 'radio';
        options.list.forEach(function (item) {
            var value = item.value;
            var name = item.name;
            var checked = item.checked ? ' checked' : '';
            var customInput = '';
            if (item.custom) {
                customInput = [
                    '<div class="ui-mip-selecor-area">',
                    '<textarea id="_ui_options_custom_content"></textarea>',
                    '</div>'
                ].join('');
            }
            optionsList += [
                '<div class="ui-mip-selecor-item">',
                '<input name="selector" type="' + type + '" id="_ui_options_' + value + '" ',
                'data-name="' + name + '" value="' + value + '"' + checked + ' />',
                '<label for="_ui_options_' + value + '">' + name + '</label>',
                customInput + '</div>'
            ].join('');
        });
        var uiSelectorHtml = [
            '<div id="_ui_selector" class="mip-dialog-selector">',
            '<div class="ui-mip-selecor-title">' + title + '</div>',
            '<div id="_ui_selector_close" class="ui-mip-selecor-close"></div>',
            '<div class="ui-mip-selecor-options">' + optionsList + '</div>',
            '<div id="_ui_selector_button" class="ui-mip-selecor-button">' + buttonText + '</div>',
            '</div>'
        ].join('');

        uiSelectorHtml += '<div class="mip-dialog-mask"></div>';

        element.innerHTML = uiSelectorHtml;
        setDailogElementCover(element);

        var uiSelectorElement = element.querySelector('#_ui_selector');
        setTimeout(function () {
            uiSelectorElement.classList.add('show');
        }, 0);

        var closeElm = element.querySelector('#_ui_selector_close');
        closeElm.addEventListener('click', function () {
            removeDailogElementCover(element);
        });

        var button = element.querySelector('#_ui_selector_button');
        button.addEventListener('click', function () {
            var checkedInput = uiSelectorElement.querySelectorAll('input:checked');
            var selectedResult = getSelectedFormData(checkedInput);
            removeDailogElementCover(element);
            if (options.callback && typeof options.callback === 'function') {
                options.callback(selectedResult);
            }
        });
    }

    function getSelectedFormData(selectedElement) {
        var formData = [];
        [].forEach.call(selectedElement, function (item) {
            var ret = {};
            ret.value = item.value;
            ret.name = item.dataset.name;
            var textarea = item.parentNode.querySelector('textarea');
            if (textarea) {
                ret.content = textarea.value;
            }
            formData.push(ret);
        });
        return formData;
    }

    function setDailogElementCover(element) {
        var elementParentNode = element.parentNode;
        if (elementParentNode.tagName === 'MIP-FIXED') {
            util.css(elementParentNode, {
                height: '100%'
            });
        }
        util.css(element, {
            height: '100%'
        });
        if (element.dataset.mask && element.dataset.mask === 'true') {
            var maskElement = element.querySelector('.mip-dialog-cover');
            maskElement.addEventListener('touchmove', function (e) {
                e.preventDefault();
            });
        }
    }

    function removeDailogElementCover(element) {
        var elementParentNode = element.parentNode;
        setTimeout(function () {
            if (elementParentNode.tagName === 'MIP-FIXED') {
                util.css(elementParentNode, {
                    height: 'auto'
                });
            }
            util.css(element, {
                height: 'auto'
            });
            element.innerHTML = '';
        }, 201);
    }

    customElement.prototype.build = function () {

        var self = this;

        // 自定义事件给DOM来触发
        self.addEventAction('toast', function (e, str) {
            toast.call(self, str);
        });

        self.addEventAction('confirm', function (e, str) {
            confirm.call(self, str);
        });

    };

    // 自定义方法给别的组件来调用
    customElement.prototype.toast = function (str) {
        toast.call(this, str);
    };
    customElement.prototype.confirm = function (str, options) {
        confirm.call(this, str, options);
    };
    customElement.prototype.selector = function (options) {
        selector.call(this, options);
    };

    return customElement;

});
