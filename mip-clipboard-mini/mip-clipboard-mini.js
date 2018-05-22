/**
 * @file mip-clipboard-mini 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 给需要复制的dom添加选中状态.
     *
     * @param {Object} element 被添加选中状态的dom.
     */
    var select = function (element) {
        if (element.nodeName === 'SELECT') {
            element.focus();
        }
        else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            var isReadOnly = element.hasAttribute('readonly');

            if (!isReadOnly) {
                element.setAttribute('readonly', '');
            }

            element.select();
            element.setSelectionRange(0, element.value.length);

            if (!isReadOnly) {
                element.removeAttribute('readonly');
            }
        }
        else {
            if (element.hasAttribute('contenteditable')) {
                element.focus();
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        var selectEle = ele.querySelectorAll('[clipboard="select"]')[0];
        var triggerEle = ele.querySelectorAll('[clipboard="trigger"]')[0];
        var actionType = ele.getAttribute('actionType') || 'copy';
        var warnWord = ele.getAttribute('warnWord') || '操作失败!';
        var successWord = ele.getAttribute('successWord') || '操作成功!';

        if (selectEle !== undefined && triggerEle !== undefined) {
            var clickHandler = function () {
                select(selectEle);
                try {
                    var result = document.execCommand(actionType, true);
                    if (result === true) {
                        alert(successWord);
                    }
                    else {
                        alert(warnWord);
                    }
                }
                catch (err) {
                    alert(warnWord);
                }
            };

            triggerEle.addEventListener('click', clickHandler);
        }
    };

    return customElement;
});
