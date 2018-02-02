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
    var mipToast = require('./mip-zol-toast');
    var toast = function (msg, t) {
        mipToast('<div class="mip-zol-toast-container">' + msg + '</div>', t);
    };
    var windowGesture = new Gesture(window);
    var container;
    var form;
    var textarea;
    var counter;
    var scrollY;
    var cancelBtn;
    var fileInput;
    var uploadIFrame;
    var options;
    var uplist;

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

    var bbsData = {};

    // 评论弹窗相关
    function createCommentForm() {
        if (!createCommentForm.container) {
            createCommentForm.container = document.createElement('div');
            createCommentForm.container.id = 'bbs-detail-comment';
            document.body.appendChild(createCommentForm.container);
        }
        createCommentForm.init();
        createCommentForm.show();
    }
    createCommentForm.show = function (notSetState) {
        if (!window.ZOL_USER_INFO.checkLogState()) {
            return;
        }
        clearTimeout(createCommentForm.timer);

        createCommentForm.scrollY = window.scrollY;
        if (createCommentForm.container) {
            createCommentForm.container.style.display = 'block';
            createCommentForm.container.classList.add('show');
        }

        createCommentForm.timer = setTimeout(function () {
            document.documentElement.classList.add('commenting');
        }, 600);

        uploadIFrame.src = makeUrl(options.uploadPicUrl, bbsData);

        options.postUrl = makeUrl(options.postUrl, bbsData);

        if (!notSetState) {
            history.pushState({
                url: location.href,
                title: document.title,
                action: 'commenting'
            }, document.title, '#commenting');
        }
    };
    window.addEventListener('popstate', function (e) {
        if (!e.state) {
            createCommentForm.hide();
        } else if (e.state.action === 'commenting') {
            createCommentForm.show(true);
        }
    });
    createCommentForm.hide = function () {
        document.documentElement.classList.remove('commenting');
        window.scrollTo(0, createCommentForm.scrollY || 0);
        createCommentForm.scrollY = 0;
        if (createCommentForm.container) {
            createCommentForm.container.classList.remove('show');
            setTimeout(function () {
                createCommentForm.container.style.display = 'none';
            }, 500);
        }
    };

    window.addEventListener('message', function (e) {
        var data = e.data;
        switch (data.action) {
            case 2:
                fileUploaded(data.data);
                break;
            default:
                break;
        }
    });


    createCommentForm.init = function () {
        if (!window.ZOL_USER_INFO.checkLogState()) {
            return;
        }
        createCommentForm.container.innerHTML = '\
            <form id="comment-form" class="comment-form nm" \
                method="post" action="//m.zol.com.cn/article/reply_comment.php">\
                <header>\
                    <input data-role="cancel" type="button" value="\u53d6\u6d88">\
                    <input role="button" type="submit" value="\u63d0\u4ea4" class="view-btn">\
                    <p class="form-title">\u53d1\u8868\u56de\u5e16</p>\
                </header>\
                <div class="comment-form-main">\
                    <textarea name="comm" class="empty" data-min="6" \
                        maxlength="400" placeholder="6-400\u5b57\u8bf4\u8bf4\u4f60\u7684\u770b\u6cd5..."></textarea>\
                    <div class="upPic">\
                        <p>\u6700\u591a\u4e0a\u4f206\u5f20\u56fe\u7247</p>\
                        <ul class="uplist clearfix">\
                            <li class="pic"><iframe border=0 class="add-pic"></iframe></li>\
                        </ul>\
                    </div>\
                </div>\
            </form>';
        var form = createCommentForm.container.querySelector('form');
        form.addEventListener('submit', postComment);
        createCommentForm.replyId = null;

        cancelBtn = createCommentForm.container.querySelector('input[data-role="cancel"]');

        cancelBtn.addEventListener('click', function (e) {
            createCommentForm.hide();
        });

        uploadIFrame = createCommentForm.container.querySelector('iframe.add-pic');
        uplist = createCommentForm.container.querySelector('.uplist');
    };

    createCommentForm.container = document.getElementById('bbs-detail-comment');

    function fileUploaded(data) {
        var li = document.createElement('li');
        li.innerHTML = '<img src="' + data + '"><span class="delete">';
        uplist.insertBefore(li, uplist.querySelector('li'));
        var deleter = li.querySelector('.delete');
        deleter && deleter.addEventListener('click', function (e) {
            var li = this.parentNode;
            li && li.remove();
            uplist.querySelector('li.pic').style.display = 'block';
        });
        if (uplist.querySelectorAll('li').length > 6) {
            uplist.querySelector('li.pic').style.display = 'none';
        }
    }

    function postComment(e) {
        e.preventDefault();
        var data = options.data || {};
        data.imgs = '';
        var contentText = createCommentForm.container.querySelector('textarea');

        contentText && (data.content = contentText.value);
        if (!data.content) {
            var msg = '\u8bf7\u586b\u5199\u8bc4\u8bba\u5185\u5bb9~';
            toast(msg);
            return;
        }
        createCommentForm.replyId && (data['to_id'] = createCommentForm.replyId);
        createCommentForm.container.querySelectorAll('.uplist img').forEach(function (img) {
            data.imgs += encodeURIComponent('#') + /#/.test(img.src) ? img.src.split('#')[0] : img.src;
        });
        fetchJsonp(makeUrl(options.postUrl, data), {}).then(function (res) {
            return res.json();
        }).then(function (request) {
            if (request.info === 'ok') {
                /#commenting/.test(location.href) && history.go(-1);
                createCommentForm.hide();
            }
            toast(request.msg);
        });
    }

    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        var element = this.element;
        var dataset = element.dataset;

        element.addEventListener('click', function () {
            options = util.fn.extend({}, dataset);
            var customData;
            try {
                var script = document.querySelector('[data-name="bbs-comment-config"]');
                if (script) {
                    customData = JSON.parse(script.textContent);
                }
            }
            catch (e) {
                console.warn('json is illegal'); // eslint-disable-line
                console.warn(e); // eslint-disable-line
            }
            for (var key in dataset) {
                if (dataset.hasOwnProperty(key)) {
                    if (/^data([A-Z][\w]+)/.test(key)) {
                        var pkey = key;
                        pkey = pkey.replace(/^data[A-Z]/, pkey.slice(4, 5).toLowerCase());
                        if (customData || (customData = {})) {
                            customData[pkey] = dataset[key];
                        }
                    }
                }
            }
            customData && (options.data = customData);
            if (!createCommentForm.container) {
                createCommentForm();
            } else {
                createCommentForm.init();
                createCommentForm.show();
            }
        });
    };
    return customElement;
});
