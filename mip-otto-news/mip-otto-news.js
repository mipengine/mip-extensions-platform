/**
 * @file mip-otto-news 组件
 * @author xinbao
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var utilJs = (function () {
            var sign = (function () {
                var res = element.getAttribute('data-sign') || 'index';
                return res;
            })();
            var toggleNav = function (element) {
                var btn = element.querySelector('.nft__menu');
                btn.addEventListener(
                    'click', function () {
                        this.parentElement.nextElementSibling.classList.toggle(
                            'show'
                        );
                    },
                    false
                );
                var slideUp = element.querySelector('.nft__dropDownBtn');
                slideUp.addEventListener(
                    'click', function () {
                        this.parentNode.classList.remove('show');
                    },
                    false
                );
            };
            var index = function (el) {
                var elements = el.parentNode.children;
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i] === el) {
                        return i;
                    }

                }
            };
            var find = function (parentElement, selector) {
                var arr = [];
                if (selector.charAt(0) === '.') {
                    for (var i = 0; i < parentElement.children.length; i++) {
                        // arr =
                        if (
                            parentElement.children[i].classList.contains(
                                selector.slice(1)
                            )
                        ) {
                            arr.push(parentElement.children[i]);
                        }

                    }
                    return arr;
                }

            };
            var dayTestType = function (el) {
                var dayTest = el.querySelector('.ndp__con');
                var types = el.querySelector('.ndp__conOptions');
                var n = [];

                if (dayTest && types) {
                    if (types.getAttribute('data-issingle') === '0') {
                        n = types.getAttribute('data-answer').split(',');
                    }
                    else if (types.getAttribute('data-issingle') === '1') {
                        n.push(types.getAttribute('data-answer'));
                    }
                }
                else {
                    n = null;
                }
                return n;
            };
            var addIconCorrect = function (el) {
                var tmp = document.createElement('i');
                tmp.classList.add('iconfont');
                el.appendChild(tmp);
                el.lastElementChild.classList.add('icon-correct-c');
            };
            var addIconError = function (el) {
                var tmp = document.createElement('i');
                tmp.classList.add('iconfont');
                el.appendChild(tmp);
                el.lastElementChild.classList.add('icon-error-c');
            };
            var judgeOptions = function (el) {
                var res = dayTestType(el);
                var flag = true;
                if (res instanceof Array && res.length > 1) {
                    // 多选
                    var btn = el.querySelector('.ndp__conBtn2');
                    if (btn) {
                        btn.addEventListener(
                            'click', function () {
                                if (flag) {
                                    var correctArr = this.previousElementSibling.dataset.answer.split(
                                        ','
                                    ) || [];
                                    var items = this.previousElementSibling
                                        .children;
                                    for (var i = 0; i < items.length; i++) {
                                        var item = items[i];
                                        var a = item.children[1].innerText
                                            .charAt(0)
                                            .toUpperCase();
                                        if (correctArr.indexOf(a) > -1) {
                                            addIconCorrect(item);
                                        }

                                        if (item.firstElementChild.checked && correctArr.indexOf(a) < 0) {
                                            addIconError(item);
                                        }

                                    }
                                    flag = false;
                                }

                            },
                            false
                        );
                    }
                }
                else if (res instanceof Array && res.length === 1) {
                    // 单选
                    util.event.delegate(
                        el.querySelector('.ndp__conOptions'),
                        'li',
                        'click', function () {
                            if (flag) {
                                if (Number(this.getAttribute('data-isright'))) {
                                    addIconCorrect(this);
                                }
                                else {
                                    // answer error
                                    var items = this.parentElement.children;
                                    addIconError(this);
                                    for (var i = 0; i < items.length; i++) {
                                        if (
                                            items[i].dataset.isright === '1'
                                        ) {
                                            addIconCorrect(items[i]);
                                        }

                                    }
                                }
                                flag = false;
                            }

                        }
                    );
                }
                else {
                    // 论述题下载app
                }
            };
            var showMore = function (el) {
                var btn = el.querySelector('.nc__loadBtn');
                btn.addEventListener('click', function (e) {
                    el.querySelector('.nc__raw').classList.remove('nc__raw');
                    this.classList.add('hide');
                    // e.preventDefault();
                });
            };
            var init = function (el) {
                // addTopBanner(el);
                judgeOptions(el);
                toggleNav(el);
                showMore(el);
            };
            return {
                init: init
            };
        })();

        utilJs.init(element);
    };

    return customElement;
});
