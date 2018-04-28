/**
 * @file mip-zmall-popup-window 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var templates = require('templates');
    var viewer = require('viewer');

    function preventTouch(e) {
        e.preventDefault();
    }

    // 设置遮罩层
    function setPopupWindowCover(element) {
        var elementParentNode = element.parentNode;
        if (elementParentNode.tagName === 'MIP-FIXED') {
            util.css(elementParentNode, {
                height: '100%'
            });
        }
        util.css(element, {
            height: '100%'
        });
        element.addEventListener('touchmove', preventTouch);
    }

    // 移除遮罩层
    function removePopupWindowCover(element) {
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
        }, 300);
        element.removeEventListener('touchmove', preventTouch);
    }

    // 关闭
    function closePopupWindow(element) {
        var popupWindowElement = element.querySelector('aside');
        popupWindowElement.classList.remove('visible');
        removePopupWindowCover(element);
    }

    // 插入数据
    function insertData(settings, callback) {
        var element = this.element;
        var templatesElement = element.querySelector('template');
        var presetHtmlElement = element.querySelector('.preset-html');
        var popupWindowElement = element.querySelector('aside');
        var popupWindowBody = popupWindowElement.querySelector('.popup-window-body');
        if (presetHtmlElement) {
            popupWindowBody.innerHTML = presetHtmlElement.innerHTML;
            element.removeChild(presetHtmlElement);
            if (typeof callback === 'function') {
                callback();
            }
        }
        else if (settings.url && settings.url !== '') {
            fetchJsonp(settings.url, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                if (!res.status) {
                    if (templatesElement) {
                        templates.render(element, res).then(function (html) {
                            popupWindowBody.innerHTML = html;
                            element.removeChild(templatesElement);
                            if (typeof callback === 'function') {
                                callback(res);
                            }
                        });
                    }
                }
                else {
                    element.mipDialogComponent.customElement.toast(res.msg);
                }
            });
        }
        else if (settings.data) {
            if (templatesElement) {
                templates.render(element, settings.data).then(function (html) {
                    popupWindowBody.innerHTML = html;
                    element.removeChild(templatesElement);
                    if (typeof callback === 'function') {
                        callback(settings.data);
                    }
                });
            }
        }
        else {
            element.mipDialogComponent.customElement.toast('参数错误');
        }
    }

    function createWindow(settings, callback) {
        var element = this.element;
        var type = element.getAttribute('type');

        // 模板
        var tpl = [
            '<aside class="popup-window" type="' + type + '">',
            '<header>' + settings.title + '</header>',
            '<div class="popup-window-close">关闭</div>',
            '<div class="popup-window-body">',
            '<div class="popup-window-loading"></div>',
            '</div></aside>',
            '<div class="popup-window-mask"></div>'
        ].join('');

        var popupWindowElement = element.querySelector('aside');
        if (!element.hasPopupWindow || !popupWindowElement) {
            element.insertAdjacentHTML('beforeend', tpl);
        }
        setTimeout(function () {
            callback();
        }, 10);
    }

    // mip-img 再渲染
    function renderMipImg(element) {
        // 图片显示
        var mipImgElement = element.querySelectorAll('mip-img');
        [].forEach.call(mipImgElement, function (item) {
            item.customElement.firstInviewCallback();
        });
    }

    // 事件绑定
    function bindClickEvent(element, settings) {
        var needEventElement = element.querySelectorAll('[on^="click"]');
        [].forEach.call(needEventElement, function (item) {
            item.addEventListener('click', function (event) {
                if (settings.type && settings.type === 'select') {
                    var selectedElement = element.querySelector('.label-radio--checked');
                    selectedElement.classList.remove('label-radio--checked');
                    item.querySelector('.label-radio').classList.add('label-radio--checked');
                }
            });
        });
    }

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    customElement.prototype.firstInviewCallback = function () {

        var self = this;
        var element = self.element;

        var script = element.querySelector('script[type="application/json"]');
        var settings = {};
        if (script) {
            var customSettings = JSON.parse(script.textContent.toString());
            settings = util.fn.extend(settings, customSettings);
        }

        var mipDialogComponent = document.querySelector('mip-zol-dialog');
        element.mipDialogComponent = mipDialogComponent;

        self.addEventAction('open', function (e, title) {
            if (title) {
                settings.title = title;
            }
            createWindow.call(self, settings, function () {

                // 显示
                var popupWindowElement = element.querySelector('aside');
                var popupWindowBody = popupWindowElement.querySelector('.popup-window-body');
                popupWindowElement.classList.add('visible');
                setPopupWindowCover(element);

                if (!element.hasPopupWindow) {
                    // 只加载一次
                    element.hasPopupWindow = true;
                    // 关闭事件
                    var mask = element.querySelector('.popup-window-mask');
                    var closeButton = element.querySelector('.popup-window-close');
                    mask && mask.addEventListener('click', function (e) {
                        closePopupWindow(element);
                    });
                    closeButton && closeButton.addEventListener('click', function (e) {
                        closePopupWindow(element);
                    });
                    // 加载数据
                    insertData.call(self, settings, function () {
                        popupWindowBody.classList.add('loaded');
                        renderMipImg(element);
                        // 事件
                        bindClickEvent(element, settings);
                    });
                }
            });
        });

        self.addEventAction('close', function () {
            closePopupWindow(element);
        });
    };

    return customElement;

});
