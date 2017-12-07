/**
 * @file mip-search-prompt 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    var util = require('util');
    var methods = {
        init: function (opts) {
            var showError = function (error) {
                console.log(error);
            };

            var render = function (parent, json, ddiv, opts) {
                var res = json.data || json;
                var appendStr = '<div class="tt-dataset">';
                var len = res.length > 6 ? 6 : res.length;
                for (var i = 0; i < len; i += 1) {
                    res[i].worde = encodeURI(res[i].word.trim().replace(/\./g, ' '));
                    appendStr += opts.tpl.replace(/\{([a-z]+)\}/ig, function (m, n) {
                        return res[i][n];
                    });
                }
                appendStr += '</div>';
                ddiv.innerHTML = appendStr;
            };

            var getPointWord = function (p) {
                return p.getElementsByTagName('a')[0].textContent;
            };

            var jebind = function (parent, a, ddiv, opts) {
                ddiv.append(a);
                var tt = ddiv.getElementsByClassName('tt-suggestion');
                for (var i = 0; i < tt.length; i += 1) {
                    tt[i].addEventListener('click', function () {
                        parent.val(getPointWord($(this)));
                        parent.focus();
                    });
                }
            };

            var processData = function (json) {
                if (!json || json.s.length === 0) {
                    return false;
                }
                var jsonStr = '{"data":[';
                for (var i = json.s.length - 1; i >= 0; i--) {
                    jsonStr += '{"id":"' + i
                        + '","word":"' + json.s[i]
                        + '", "description": ""},';
                }
                jsonStr += '],"defaults":"baidu"}';

                return json = (new Function('return ' + jsonStr))();
            };

            var refreshDropDiv = function (parent, json, ddiv, opts) {
                var left;
                var height;
                var top;
                var width;
                var validData;
                json = validData = processData(json);
                if (!validData || !json.data.length) {
                    util.css(ddiv, 'display', 'none');
                    return false;
                }
                render(parent, json, ddiv, opts);
                parent.focus();
                util.css(ddiv, 'display', 'block');
            };

            var getData = function (word, parent, callback, ddiv, opts) {
                if (!word) {
                    return;
                }
                var json;
                var validData;
                var date = new Date().getTime();
                var worde = encodeURIComponent(word);
                var URL = 'http://unionsug.baidu.com/su?p=3&t=' + date + '&wd=' + worde;
                var fetchJsonp = require('fetch-jsonp');
                fetchJsonp(URL, {
                    jsonpCallback: 'cb'
                }).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    callback(parent, json, ddiv, opts);
                });
            };

            var checkData = function (json) {
                var isEmpty = !Array.isArray(json.data);
                if (isEmpty) {
                    showError('返回数据格式错误!');
                    return false;
                }
                if (!json['data'].length) {
                    showError('返回数据为空!');
                    return false;
                }
                return json;
            };

            var options = $.extend({
                url: '',
                jsonp: null,
                style: 'default',
                dropDivClassName: 'tt-menu',
                listHoverCSS: 'jhover',
                tpl: '<h6 class="tt-suggestion"><a href="' + opts.urlPrefix + '{worde}" >{word}</a></h6>',
                processData: processData,
                getData: getData,
                keyEnter: 13,
                element: null,
                elementP: null,
                elementC: null
            }, opts);

            var data = this.data('searchsuggest');

            if (data) {
                return this;
            }
            this.data('searchsuggest', {
                target: this,
                options: options
            });
            data = this.data('searchsuggest');
            var dropDiv = data.options.elementP.getElementsByClassName(data.options.dropDivClassName)[0];
            data.options.element.addEventListener('keyup', function () {
                if (event.keyCode === options.keyDown || event.keyCode === options.keyUp) {
                    return;
                }

                var word = this.value.trim();

                if (word === '') {
                    util.css(dropDiv, 'display', 'none');
                }

                if (word && word === this.getAttribute('alt')) {
                    return;
                }
                this.setAttribute('alt', word);

                getData(word, this, refreshDropDiv, dropDiv, options);
            });
            data.options.element.addEventListener('click', function () {
                var word = this.value.trim();
                if (word && word === this.getAttribute('alt') || util.css(dropDiv, 'display') !== 'none') {
                    util.css(dropDiv, 'display', 'block');
                    return;
                }
                getData(word, this, refreshDropDiv, dropDiv, options);
            });
            data.options.elementC.addEventListener('click', function () {
                util.css(dropDiv, 'display', 'none');
                return true;
            });
            data.options.elementB.addEventListener('click', function () {
                methods.link();
            });
            data.options.element.addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    methods.link();
                }
            });
        },
        data: function (key, value) {
            var res = this[key];
            if (value === undefined) {
                return res;
            }
            this[key] = res ? util.fn.extend(res, value) : value;
        },
        link: function () {
            var data = this.data('searchsuggest');
            var word = data.options.element.value;
            if (!word.trim()) {
                return;
            }
            window.location.href = data.options.urlPrefix + encodeURI(word.trim().replace(/\./g, ' '));
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var url = ele.getAttribute('url-prefix');
        var ipt = ele.getElementsByClassName('s-ipt');
        var close = ele.getElementsByClassName('tt-menu-close');
        var btn = ele.getElementsByClassName('s-bn');
        var viewport = require('viewport');
        var width = viewport.getScrollWidth();
        util.css(ipt, 'width', width - 153);
        methods.init({
            element: ipt[0],
            elementB: btn[0],
            elementC: close[0],
            elementP: ele,
            urlPrefix: url
        });
    };
    return customElement;
});