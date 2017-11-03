/**
 * @file ZOL私有业务--评论模块
 * @author  mulianju
 * @time  2017-10-25
 * @version 1.0.0
 */
define(function (require, exports, module) {
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();
    var Gesture = util.Gesture;
    var toast = require('./mip-zol-toast');
    var windowGesture = new Gesture(window);
    var container;
    var form;
    var textarea;
    var counter;
    var scrollY;
    var cancelBtn;
    var checkCodePic;

    function Commenter(options) {
        this.options = options;
        for (var variable in this.defaults) {
            if (!this.options.hasOwnProperty(variable)) {
                this.options[variable] = this.defaults[variable];
            }
        }
        this.options.data && (this.options.data = JSON.parse(this.options.data));
        this.init();
    }
    Commenter.prototype = {
        init: function () {
            if (!container) {
                container = setUpCommentForm();
            }
            this.refresh();
            this.open();
        },
        close: function () {
            container && (container.style.display = 'none');
            windowGesture.on('swipe', preventDefault);
            document.documentElement.classList.remove('commenting');
            window.scrollTo(0, scrollY);
        },
        refresh: function () {
            var me = this;
            container.options = me.options;
            container._commenter = me;
            textarea.setAttribute('maxlength', me.options.maxlength);
            textarea.setAttribute('minlength', me.options.minlength);
            getCheckCode();
            countWords();
            form.onsubmit = me.submit.bind(me);
        },
        open: function () {
            container.style.display = 'block';
            windowGesture.off('swipe', preventDefault);
            scrollY = window.scrollY;
            window.scrollTo(0, 0);
            document.documentElement.classList.add('commenting');
            setTimeout(function () {
                textarea && textarea.focus();
            }, 300);
        },
        submit: function (e) {
            e.preventDefault();
            var me = this;
            var form = container.querySelector('form');
            if (form.isSubmiting) {
                return;
            }
            var data = util.fn.extend(makeData(), me.options.data);

            if (typeof this.options.onBeforeSubmit === 'function') {
                data = this.options.onBeforeSubmit(data);
            }
            if (!data) {
                return false;
            }
            if (!(window.ZOL_USER_INFO && window.ZOL_USER_INFO.userid)) {
                goLogin(data);
                return;
            }

            form.isSubmiting = !0;

            postComment(data, function (request) {
                var msg;
                var isCloseContainer = false;
                switch (request.flag) {
                    case '1000':
                        msg = '\u8bc4\u8bba\u6210\u529f~';
                        isCloseContainer = true;
                        break;
                    case '1008':
                        msg = '\u8bc4\u8bba\u6210\u529f~\u60a8\u7684\u91d1\u8c46\u5df2'
                        + '\u8fbe\u4e0a\u9650\uff0c\u4e0d\u518d\u589e\u52a0';
                        break;
                    case '1002':
                        goLogin(data);
                        msg = '';
                        break;
                    default:
                        msg = request.msg;
                        break;
                }
                getCheckCode();

                if (isCloseContainer) {
                    me.close();
                    form.reset();
                }
                if (msg) {
                    typeof toast === 'function' ? toast(msg) : alert(msg);
                }
                if (typeof form.onSuccess === 'function') {
                    form.onSuccess(request);
                }
                form.isSubmiting = !1;
            });
        }
    };


    function postComment(data, callback) {
        fetchJsonp(makeUrl('//comment.zol.com.cn/index.php?c=Api_DocComment&a=Post', data), {}).then(function (res) {
            return res.json();
        }).then(function (request) {
            callback && callback(request);
        });
    }

    function makeUrl(url, data) {
        var str = url.indexOf('?') > 0 ? '&' : '?';

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (str.length > 1) {
                    str += '&';
                }
                str += key + '=' + data[key];
            }
        }

        return url + str;
    }

    function setUpCommentForm() {
        container = document.querySelector('.m-article-comment');
        if (!container) {
            container = document.createElement('div');
            container.style.display = 'none';
            container.className = 'm-article-comment';
            container.innerHTML = '<form>\
                <textarea name="content" placeholder="\u8bf4\u51fa\u4f60\u7684\u89c2\u70b9\u2026\u2026"></textarea>\
                <input type="submit" value="\u63d0\u4ea4" disabled>\
                <span class="text-length-counter"></span>\
                <input data-role="cancel" type="button" value="\u53d6\u6d88">\
            </form>';
            document.body.appendChild(container);
            form = container.querySelector('form');
            textarea = container.querySelector('textarea');
            counter = container.querySelector('.text-length-counter');
            cancelBtn = container.querySelector('[data-role="cancel"]');

            textarea.addEventListener('input', countWords);
            container.addEventListener('click', function (e) {
                if (e.target === container) {
                    container._commenter && container._commenter.close();
                }
            });
            cancelBtn.addEventListener('click', function (e) {
                container._commenter && container._commenter.close();
            });
        }
        var coder = container.querySelector('.check-code');
        if (!coder) {
            fetchJsonp('//comment.zol.com.cn/index.php?c=Api_User&a=CheckCode', {}).then(function (res) {
                return res.json();
            }).then(function (result) {
                if (parseInt(result, 10) === 1001) {
                    coder = document.createElement('div');
                    coder.className = 'check-code';
                    coder.innerHTML = '<input type="text" name="checkcode" maxlength="3"'
                    + ' placeholder="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801" />'
                    + '<span class="get-check-code-btn"><img src="'
                    + getCheckCode.getUrl() + '"><span/>';

                    checkCodePic = coder.querySelector('img');
                    checkCodePic.addEventListener('click', getCheckCode);
                    textarea.parentNode.insertBefore(coder, textarea.nextElementSibling);
                    coder.addEventListener('input', checkAvailable);
                }
            });
        }

        return container;
    }

    function goLogin(data) {
        data.t = (new Date()).getTime();
        try {
            window.localStorage.setItem('mip_zol_commenter_temp', JSON.stringify(data));
        } catch (e) {

        }
        var href = 'http://service.zol.com.cn/user/mlogin.php?backurl=' + location.href;
        location.href = href;
    }

    goLogin.getData = function () {
        var data = window.localStorage.getItem('mip_zol_commenter_temp');
        var now = (new Date()).getTime();
        if (!data) {
            return;
        }

        if (now - data.t <= 259200000) {
            delete data.t;
            postComment(data, function (request) {
                if (request.flag === '1000') {
                    var msg = '\u8bc4\u8bba\u6210\u529f~';
                    typeof toast === 'function' ? toast(msg) : alert(msg);
                }
            });
        }
        window.localStorage.removeItem('mip_zol_commenter_temp');
    };
    goLogin.getData();

    function getCheckCode() {
        checkCodePic && (checkCodePic.src = getCheckCode.getUrl());
    }
    getCheckCode.getUrl = function () {
        return 'http://service.zol.com.cn/captchasrc.php?param=a0a5L_Ehd9HSfJWrXl0cwfE5-FiO'
        + '8kIuZyUC9DEO6RM1wKbUiwOSGRscrur_nLoOv_0gm13pp4G0q3Ak2lvbCT7dZXLwug&t='
        + (new Date()).getTime();
    };

    function makeData() {
        if (!form) {
            return;
        }
        var data = {};
        [].forEach.call(form.querySelectorAll('[name]'), function (input) {
            data[input.name] = input.value;
        });
        return data;
    }

    function countWords() {
        if (textarea) {
            checkAvailable();
            counter.innerHTML = '<i>' + textarea.value.length + '</i>/' + container.options.maxlength;
        }
    }

    function checkAvailable() {
        var flag = true;
        var submit = container.querySelector('input[type="submit"]');
        var length = textarea.value.length;

        if (length < container.options.minlength || length > container.options.maxlength) {
            flag = false;
        }
        var coder = container.querySelector('input[name="checkcode"]');
        if (coder && coder.value.length !== 3) {
            flag = false;
        }
        submit.disabled = !flag;
        return flag;
    }

    Commenter.prototype.defaults = {
        maxlength: 200,
        minlength: 4,
        data: {},
        onSuccess: null,
        onBeforeSubmit: null
    };

    function preventDefault(e) {
        e.preventDefault();
    }

    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        var element = this.element;
        var options = util.fn.extend({}, element.dataset);
        var gesture = new Gesture(element);

        element.addEventListener('click', function () {
            if (!element._commenter) {
                element._commenter = new Commenter(options);
            } else {
                element._commenter.refresh();
                element._commenter.open();
            }
        });
    };
    return customElement;
});
