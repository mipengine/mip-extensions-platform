/**
 * @file mip-blog-search 组件
 * @author
 */

define(function (require) {
    'use strict';

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    var customElement = require('customElement').create();
    var templates = require('templates');

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var searchIco = element.querySelector('#search');
        var searchWrap = element.querySelector('#search-wrap');
        var keyInput = element.querySelector('#key');
        var back = element.querySelector('#back');
        var searchPanel = element.querySelector('#search-panel');
        var searchResult = element.querySelector('#search-result');
        var searchLayer = element.querySelector('#search-panel-layer');
        var searchData;
        var keywords;

        function loadData(success) {

            success = typeof success === 'function' ? success : function () {
            };

            if (!searchData) {
                fetch('https://shaoshilei.com/content.json').then(function (res) {
                    return res.text();
                }).then(function (text) {
                    searchData = JSON.parse(text);
                    success(searchData);
                }).catch(function () {
                });
            }
            else {
                success(searchData);
            }
        }

        var docEl = document[navigator.userAgent.indexOf('Firefox') !== -1 ? 'documentElement' : 'body'];
        var noop = function () {
        };

        var control = {
            showBox: function () {
                window.innerWidth < 760 ? docEl.classList.add('lock-size') : noop;
                searchPanel.classList.add('in');
                searchLayer.classList.add('in');
            },
            hideBox: function () {
                window.innerWidth < 760 ? docEl.classList.remove('lock-size') : noop;
                searchPanel.classList.remove('in');
                searchLayer.classList.remove('in');
            }
        };

        function render(data, element) {
            data = data || [];
            var html = '';
            var res = {};

            res.data = data;
            res.sTitle = function () {
                return this.title.replace(keywords, '<i>' + keywords + '</i>');
            };
            res.sDate = function () {
                return new Date(this.date).toLocaleDateString();
            };

            if (data.length) {
                templates.render(element, res).then(function (html) {
                    searchResult.innerHTML = html;
                });
            }
            else {
                html = '<li class="tips"><i class="icon icon-coffee icon-3x"></i><p>Results not found!</p></li>';
            }

            searchResult.innerHTML = html;
        }

        function matcher(post, regExp) {

            return regExp.test(post.title) || post.tags.some(function (tag) {
                return regExp.test(tag.name);
            }) || regExp.test(post.text);
        }

        function search(e, element) {
            var key = this.value.trim();
            keywords = key;
            if (!key) {
                return;
            }

            var regExp = new RegExp(key.replace(/[ ]/g, '|'), 'gmi');

            loadData(function (data) {

                var result = data.filter(function (post) {
                    return matcher(post, regExp);
                });

                render(result, element);
                control.showBox();
            });

            e.preventDefault();
        }


        // TODO
        if (!(searchIco && searchLayer && back && keyInput)) {
            return;
        }
        searchIco.addEventListener('click', function () {
            searchWrap.classList.toggle('in');
            searchLayer.classList.toggle('in');
            keyInput.value = '';
        });

        back.addEventListener('click', function () {
            searchWrap.classList.remove('in');
            searchLayer.classList.remove('in');
            control.hideBox();
        });

        document.addEventListener('click', function (e) {
            if (e.target.id !== 'key') {
                control.hideBox();
            }
        });

        keyInput.addEventListener('input', function (e) {
            search.bind(this)(e, element);
        });
        keyInput.addEventListener('click', function (e) {
            search.bind(this)(e, element);
        });
    };

    return customElement;
});
