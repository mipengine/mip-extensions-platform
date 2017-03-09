/**
 * @file mip-qbb-comment 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var fetch = require('fetch');
    // 评论
    var commentIsLogin = 0;
    var commentStatus = -1;
    var commentUserInfo = [];

    /**
     * 判断是否登录
     */
    var comments = {
        // base64编码
        base64encode: function (str) {
            var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            var out;
            var i;
            var len;
            var c1;
            var c2;
            var c3;
            len = str.length;
            i = 0;
            out = '';
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i === len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += '==';
                    break;
                }

                c2 = str.charCodeAt(i++);
                if (i === len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += '=';
                    break;
                }

                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;

        },
        hideShow: function (flag) {
            flag ? $('.comments-box').animate({
                bottom: 0
            }) : $('.comments-box').animate({
                bottom: '-100%'
            });
            this.maskFn(flag);
        },
        maskFn: function (flag) {
            if (flag) {
                if ($('.comment-mask').length <= 0) {
                    $('body').append('<div class="comment-mask" style="position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,.6);"><mip-img src="http://m.qbaobei.com/Public/Home/qbaobeimobile2/images/video.png" style="width:100%;height:100%;opacity:0"></mip-img></div>');
                }

                $('.comment-mask').show();
            }
            else {
                $('.comment-mask').hide();
            }
        },
        valiNub: function (o) {
            if ($(o).val().length > 0) {
                $('.btn-ok').attr('disabled', false).removeClass('btn-notj');
            }
            else {
                $('.btn-ok').attr('disabled', true).addClass('btn-notj');
            }
            if ($(o).val().length >= 140) {
                $(o).val($(o).val().substring(0, 140));
                $('.comments-box .tit em').text(0);
            }
            else {
                $('.comments-box .tit em').text(140 - $(o).val().length);
            }
        },
        init: function () {
            getCommentList();
            var that = this;

            $('.comments-box textarea').keyup(function () {
                that.valiNub($(this));
            });
            $('.comments-wrap input[type=button]').click(function () {
                isCommentLogin();
                if (commentIsLogin !== 1) { // 需要修改条件

                }
                else {
                    that.hideShow(true);
                }
            });
            $(document).on('click', '.comment-mask, .btn-cancel', function () {
                that.hideShow(false);
                that.maskFn(false);
            });
            $(document).on('click', '.btn-ok', function () {
                isCommentLogin();
                if (commentIsLogin) {
                    submitComment();
                }

            });
        }
    };

    function isCommentLogin() {
        var ajaxLgUrl = 'https://m.qbaobei.com/Member/api/getUserInfo/theme/mobile/time/' + new Date().getTime();
        var url = window.location.href;
        url = comments.base64encode(url);
        var loginUrl = 'http://m.qbaobei.com/Member/MLogin/login/returnUrl/' + url + '/';
        var regUrl = 'http://m.qbaobei.com/Member/MLogin/reg/returnUrl/' + url + '/';
        if (ajaxLgUrl !== '') {
            var myInit = {
                method: 'GET'
            };
            fetch(ajaxLgUrl, myInit).then(function (res) {
                return res.json();
            }).then(function (json) {
                if (typeof (json.user_info) !== 'undefined' && json.user_info !== null
                    && typeof (json.user_info.userid) !== 'undefined') {
                    if (json.user_info.userid > 0) {
                        commentIsLogin = 1;
                        commentUserInfo = json.user_info;
                    }
                    else {
                        new PopModel({
                            width: '260px',
                            height: '100px',
                            headHtml: '',
                            bodyHtml: '<h4>登录才能评论哦~</h4>',
                            footHtml: '<a href="' + loginUrl + '" class="confirm" target="_blank">登录</a>'
                                + '<a href="' + regUrl + '" class="cancel" target="_blank">注册</a>'

                        });
                    }
                }
                else {
                    new PopModel({
                        width: '260px',
                        height: '100px',
                        headHtml: '',
                        bodyHtml: '<h4>登录才能评论哦~</h4>',
                        footHtml: '<a href="' + loginUrl + '" class="confirm" target="_blank">登录</a>'
                            + '<a href="' + regUrl + '" class="cancel" target="_blank">注册</a>'

                    });
                }

            });
        }
    }

    /**
     * 提交评论
     */
    function submitComment() {
        var id = $('.commenthid').attr('data-id');
        var model = $('.commenthid').attr('data-model');
        var message = $('.comments-show').val().trim();
        var nickname = commentUserInfo.nickname;
        var uid = commentUserInfo.userid;
        var msg;
        var url = window.location.href;
        url = comments.base64encode(url);
        var loginUrl = 'http://m.qbaobei.com/Member/MLogin/login/returnUrl/' + url + '/';
        var regUrl = 'http://m.qbaobei.com/Member/MLogin/reg/returnUrl/' + url + '/';
        var ajaxUrl = 'https://dynamic.qbaobei.com' + '/dynamic.php?s=Qbaobeimobile/subComment';
        var data = '&id=' + id + '&model=' + model + '&uname=' + nickname + '&message=' + message + '&uid=' + uid;
        if (message === '') {
            alert('请填写评论内容！');
            $('.comments-show').focus();
            return;
        }

        fetchJsonp(ajaxUrl + data, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            commentStatus = json.status;
            msg = json.msg;
            if (commentStatus === -2) {
                alert(msg);
            }

            var status = commentStatus;
            if (status === 0) {
                $('body').append('<div class="comments-dialog">您的评论<br/>含有敏感词~</div>');
                setTimeout(function () {
                    $('.comments-dialog').remove();
                }, 1500);
                $('.comments-show').focus();
            }
            else if (status === -1) {
                new PopModel({
                    width: '260px',
                    height: '100px',
                    headHtml: '',
                    bodyHtml: '<h4>登录才能评论哦~</h4>',
                    footHtml: '<a href="' + loginUrl + '" class="confirm" target="_blank">登录</a>'
                        + '<a href="' + regUrl + '" class="cancel" target="_blank">注册</a>'
                });
            }
            else if (status === -2) {
                alert('异常状态码');
            }
            else if (status === 1) {
                $('.comments-show').val('');
                $('.comments-show').attr('placeholder', '我来说几句...');
                $('body').append('<div class="comments-dialog">评论已经提交<br/>审核后就能看见啦~</div>');
                setTimeout(function () {
                    comments.hideShow(false);
                    comments.maskFn(false);
                    $('.comments-dialog').remove();
                }, 1500);
            }
            else {
                alert('异常状态码');
            }
        }).catch(function (ex) {});
    }

    /**
     * 评论列表
     */
    function getCommentList() {
        var id = $('.commenthid').attr('data-id');
        var model = $('.commenthid').attr('data-model');
        var count;
        var list;
        var status;
        var msg;
        var ajaxUrl = 'https://dynamic.qbaobei.com' + '/dynamic.php?s=Qbaobeimobile/loadComment';
        var data = '&id=' + id + '&model=' + model;

        fetchJsonp(ajaxUrl + data, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            count = json.count;
            list = json.list;
            msg = json.msg;
            status = json.status;
            if (count > 0) {
                $('.comment-item1').hide();
                $('.comment-item2 .bd-title').find('span').text(count);
                $('.comments-user-info .name').text(list.uname);
                $('.comments-user-info .time').text(list.time);
                $('.comments-user-text').text(list.message);
                var commentUrl = 'http://m.qbaobei.com' + '/comment-list/id/' + id + '/model/' + model;
                $('.bd-title').find('a').attr('href', commentUrl);
                $('.comment-item2').show();
            }
            else {
                $('.comment-item1').show();
                $('.comment-item2').hide();
            }

        }).catch(function (ex) {});
    }

    function PopModel(options) {
        var that = this;
        this.defaults = {
            width: '100px', // 默认框
            height: '120px', // 默认高
            isMask: true, // 是否遮罩
            dir: 'mid', // mid中间，left左下，right右下
            addClass: '', // 设置不同样式的class
            headHtml: '<button type="button" class="close">关闭</button>', // 头部，不需要直接设置为空
            bodyHtml: '', // 内容
            footHtml: '<input type="button" value="确定" class="confirm"><input type="button" value="取消" class="cancel">', // 底部，不需要直接设置为空
            confireFn: function () {}, // 确认回调
            cancelFn: function () {} // 取消回调
        };
        this.opts = $.extend({}, this.defaults, options);
        this.dialogWrap = $('<div class="dialog-wrap">');
        this.modal = $('<div class="qbb-dialog ' + this.opts.addClass + '" '
            + 'style="position:fixed;border-radius:5px;background:#fff;z-index:99999;'
            + ' width:' + this.opts.width + ';height:' + this.opts.height + '">');
        this.header = $('<div class="modal-header">');
        this.obody = $('<div class="modal-body">');
        this.footer = $('<div class="modal-footer">');
        this.mask = $('<div class="mask" style="position:fixed;left:0;top:0;'
            + 'width:100%;height:100%;z-index:9999;background:#000;opacity:0.5">'); // 遮罩

        this.objDir(this.modal, this.opts.dir);
        if (this.opts.headHtml !== '') {
            this.header.append(this.opts.headHtml);
            this.modal.append(this.header);
        }

        if (this.opts.bodyHtml !== '') {
            this.obody.append(this.opts.bodyHtml);
            this.modal.append(this.obody);
        }

        if (this.opts.footHtml !== '') {
            this.footer.append(this.opts.footHtml);
            this.modal.append(this.footer);
        }

        if (this.opts.isMask) {
            $(this.dialogWrap).append(this.mask);
        }

        this.dialogWrap.append(this.modal);
        $('body').append(this.dialogWrap);

        $(document).on('click', '.mask, .dialog-wrap .close', function () {
            that.closeFn();
        });

        $(this.footer).find('.confirm').on('click', function () {
            that.opts.confireFn();
            that.closeFn();
        });
        $(this.footer).find('.cancel').on('click', function () {
            that.opts.cancelFn();
            that.closeFn();
        });
    }

    PopModel.prototype = {
        constructor: PopModel,

        // 关闭函数
        closeFn: function () {
            this.dialogWrap.remove();
        },

        // 位置函数
        objDir: function (o, dir) {
            var w = $(o).outerWidth(true);
            var h = $(o).outerHeight(true);
            var winW = $(window).width();
            var winH = $(window).height();
            var oTop = (winH - h) / 2;
            var oLeft = (winW - w) / 2;
            if (dir === 'mid') {
                $(o).css({left: oLeft, top: oTop});
            }
            else if (dir === 'left') {
                $(o).css({left: 0, bottom: 0});
            }
            else if (dir === 'right') {
                $(o).css({right: 0, bottom: 0});
            }

        }
    };

    customElement.prototype.firstInviewCallback = function () {
        comments.init(); // 执行对象
    };

    return customElement;
});
