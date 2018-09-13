/**
 * @file mip-apple-func 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
    };

    /*回答*/

    $('.open-answer-box').click(function () {
        $('.answer-box').show();
    });
    $('.answer-box').find('.cancel').click(function () {
        $('.answer-box').hide();
    });

    $('.answer-box .submit').click(function () {
        var id = $(this).data('id');
        var url = $(this).data('url');
        var cont = $('.answer-box .answer-text').val();
        if (cont === '') {
            showPromptInfo('请输入评论内容！');
            return;
        }
        $.post(url, {'content': cont, 'id': id}, function (json) {
            if (json.code === 10000) {
                $('.answer-box').hide();
                window.location.reload();
            } else {
                showPromptInfo(json.msg);
            }
        });
    });

    /*评论*/

    $('.comments-i i').click(function (e) {
        var id = e.target.id;
        $(this).data.id = id;
        var i;
        for (i = 0; i < id; i++) {
            $('.comments-i i').eq(i).css({'color': '#EEB422'});
        }
        for (i = 5; i >= id; i--) {
            $('.comments-i i').eq(i).css({'color': '#D4D4D4'});
        }
    });
    $('.comment-win .btn').click(function () {
        var url = $('.comment-win').data('url');
        var id = $('.comment-win').data('id');
        var len = $('.upload-img img').length - 1;
        var urlArr = [];
        for (var i = 0; i < len; i++) {
            urlArr.push($('.upload-img input').eq(i).data('name'));
        }
        var star = $('.comments-i i').data.id;
        if (typeof (star) === 'undefined') {
            showHintMsg('请为服务打分!');
            return;
        }
        var content = $('textarea').val();
        if (urlArr.length === 0 && !content) {
            showHintMsg('请输入评论内容或上传图片!');
            return;
        }
        $.post(
            url,
            {'content': $('textarea').val(), 'images': urlArr, 'star': $('.comments-i i').data.id, 'id': id},
            function (result) {
                if (result.code !== 10000) {
                    showHintMsg(result.msg);
                    return;
                }
                $('.comment-win #Prompt').html(result.msg);
                $('.comment-win .Prompt').show();
                window.setTimeout(function () {
                    $('.comment-win').hide();
                    $('.full-cover').hide();
                    $('.comment-win .Prompt').hide();
                    window.location.reload();
                }, 1500);
            });
    });
    $('.comment-win .mobile-btn').click(function () {
        var url = $('.comment-win').data('url');
        var id = $('.comment-win').data('id');
        var len = $('.upload-img img').length - 1;
        var urlArr = [];
        for (var i = 0; i < len; i++) {
            urlArr.push($('.upload-img input').eq(i).data('name'));
        }
        var star = $('.comments-i i').data.id;
        if (typeof (star) === 'undefined') {
            showHintMsg('请为服务打分!');
            return;
        }
        var content = $('textarea').val();
        if (urlArr.length === 0 && !content) {
            showHintMsg('请输入评论内容或上传图片!');
            return;
        }
        $.post(
            url,
            {'content': $('textarea').val(), 'images': urlArr, 'star': $('.comments-i i').data.id, 'id': id},
            function (result) {
                if (result.code !== 10000) {
                    showHintMsg(result.msg);
                    return;
                }
                $('.comment-win #Prompt').html(result.msg);
                $('.comment-win .Prompt').show();
                window.setTimeout(function () {
                    // $('.comment-win').hide();
                    // $('.full-cover').hide();
                    // $('.comment-win .Prompt').hide();
                    window.location.href = document.referrer;
                }, 1500);
            });
    });
    $('.comment-win .cancel').click(function () {
        hideComment();
    });

    function comment() {
        $('.full-cover').show();
        $('.comment-win').show();
    }

    function hideComment() {
        $('.full-cover').hide();
        $('.comment-win').hide();
    }


    var imgNum = 0;
    var imgMax = 5;
    var offsBooL = true;
    uploadImg();

    function uploadImg() {
        $('.upload-img input').eq(imgNum).change(function () {
            if (imgNum >= imgMax) {
                showHintMsg('上传图片已超过限制数量！');
                return;
            }
            var that = $(this);
            var formdata = new FormData();
            formdata.append('image', this.files[0]);
            var id = $('.comment-win').data('id');
            var url = $('.comment-win').data('upurl') + '&id=' + id;
            var str = '<div class="upload-img left">'
                + '<img src="" alt="">'
                + '<input type="file" name="images" style="opacity:0" accept="image/*" capture="camera"/>'
                + '<i class="iconfont icon-lajitong"></i><i class="iconfont icon-tianjia"></i>'
                + '<div class="over-cover"></div>'
                + '</div>';
            $.ajax({
                type: 'POST',
                url: url,
                data: formdata,
                async: false,
                processData: false,
                contentType: false,
                dataType: 'json',
                headers: {'X-CSRF-TOKEN': 'json'},
                success: function (result) {
                    if (result.code === 10000) {
                        that.data('name', result.data.name);
                        that.css({'z-index': '0'});
                        $('.upload-win .icon-tianjia').hide();
                        $('.upload-win img').eq(imgNum).attr({'src': result.data.url});
                        imgNum++;
                        $('.upload-img-hint span').html(imgNum);
                        if (imgNum < imgMax) {
                            $('.upload-img-hint').before(str);
                        }
                        uploadImg();
                    } else {
                        showHintMsg(result.msg);
                    }
                }
            });
            $('.upload-img').mouseover(function () {
                if ($(this).children('img').attr('src') !== '') {
                    $(this).children('.icon-lajitong').show();
                    $(this).children('.over-cover').show();
                }
                $('.icon-lajitong').click(function () {
                    $(this).parent().remove();
                    if (offsBooL) {
                        offsBooL = false;
                        setTimeout(function () {
                                offsBooL = true;
                                imgNum--;
                                $('.upload-img-hint span').html(imgNum);
                            },
                            50);
                    }
                });
            });
            $('.upload-img').mouseout(function () {
                $('.icon-lajitong').hide();
                $('.over-cover').hide();
            });
        });
    }

    function showHintMsg(msg) {
        $('.comment-win #Prompt').html(msg);
        $('.comment-win .Prompt').show();
        window.setTimeout(function () {
            $('.comment-win .Prompt').hide();
        }, 2000);
    }

    /*登录 注册 修改密码 找回密码*/

    var promptHtml = '<div class="promptInfo"><span></span></div>';

    $('body').append(promptHtml);

    function showPromptInfo(info) {
        $('.promptInfo').find('span').html(info);
        $('.promptInfo').show();
        setTimeout(function () {
            $('.promptInfo').hide();
        }, 2000);
    }


    /*验证*/
    var dataType = $('meta[name="_token"]').attr('content');
    var mobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    var passwordReg = /^[\w]{6,12}$/;

    $('input[name="mobile"]').on('change', function () {
        var val = $(this).val();
        if (!mobileReg.test(val)) {
            showPromptInfo('请输入正确的手机号');
        } else {
        }
    });
    $('input[name="password"]').on('change', function () {
        var val = $(this).val();
        if (!passwordReg.test(val)) {
            showPromptInfo('请设置6-12位密码');
        } else {
        }
    });

    $('.loginButton').click(function () {
        var mobileNumber = $(this).parent().parent().find('input[name="mobile"]').val();
        var password = $(this).parent().parent().find('input[name="password"]').val();

        if (!mobileReg.test(mobileNumber)) {
            showPromptInfo('请输入正确的手机号');
        } else if (!passwordReg.test(password)) {
            showPromptInfo('请设置6-12位密码');
        } else {
            $.ajax({
                type: 'POST',
                url: $('.login-win').data('url'),
                data: {'mobile': mobileNumber, 'password': password},
                headers: {'X-CSRF-TOKEN': dataType},
                success: function (result) {
                    if (result.code === 10000) {
                        showPromptInfo('登陆成功');
                        setTimeout(function () {
                            window.location.href = document.referrer;
                        }, 1500);
                    } else {
                        showPromptInfo(result.msg);
                    }
                }
            });
        }
    });


    $('.registerButton').click(function () {
        var mobileNumber = $(this).parent().parent().find('input[name="mobile"]').val();
        var codeNumber = $(this).parent().parent().find('input[name="code"]').val();
        var password = $(this).parent().parent().find('input[name="password"]').val();

        if (!mobileReg.test(mobileNumber)) {
            showPromptInfo('请输入正确的手机号');
        } else if (typeof (codeNumber) === 'undefined' || codeNumber === '') {
            showPromptInfo('请填写验证码');
        } else if (!passwordReg.test(password)) {
            showPromptInfo('请设置6-12位密码');
        } else {
            $.ajax({
                type: 'POST',
                url: $('.register-win').data('url'),
                data: {
                    'mobile': mobileNumber,
                    'code': codeNumber,
                    'password': password
                },
                headers: {'X-CSRF-TOKEN': dataType},
                success: function (result) {
                    if (result.code === 10000) {
                        showPromptInfo('注册成功');
                        setTimeout(function () {
                            window.location.href = $('.public-login').data('login');
                        }, 1500);
                    } else {
                        showPromptInfo(result.msg);
                    }
                }
            });
        }
    });

    $('.findPasswordButton').click(function () {
        var mobileNumber = $(this).parent().parent().find('input[name="mobile"]').val();
        var codeNumber = $(this).parent().parent().find('input[name="code"]').val();
        var password = $(this).parent().parent().find('input[name="password"]').val();

        if (!mobileReg.test(mobileNumber)) {
            showPromptInfo('请输入正确的手机号');
        } else if (typeof (codeNumber) === 'undefined' || codeNumber === '') {
            showPromptInfo('请填写验证码');
        } else if (!passwordReg.test(password)) {
            showPromptInfo('请设置6-12位密码');
        } else {
            $.ajax({
                type: 'POST',
                url: $('.forgot-win').data('url'),
                data: {
                    'mobile': mobileNumber,
                    'code': codeNumber,
                    'password': password
                },
                headers: {'X-CSRF-TOKEN': dataType},
                success: function (result) {
                    showPromptInfo(result.msg);
                    if (result.code === 10000) {
                        setTimeout(function () {
                            window.location.href = $('.public-login').data('login');
                        }, 1500);
                    }
                }
            });
        }
    });

    $('.changePasswordButton').click(function () {
        var password = $(this).parent().parent().find('input[name="password"]').val();
        var newPassword = $(this).parent().parent().find('input[name="new-password"]').val();
        var confirmPassword = $(this).parent().parent().find('input[name="confirm-password"]').val();

        if (!passwordReg.test(password)) {
            showPromptInfo('旧密码为设置6-12位密码');
        } else if (!passwordReg.test(newPassword)) {
            showPromptInfo('请设置6-12位新密码');
        } else if (confirmPassword !== newPassword) {
            showPromptInfo('两次密码输入不一致');
        } else {
            $.ajax({
                type: 'POST',
                url: $('.change-password').attr('action'),
                data: {
                    'password': password,
                    'new-password': newPassword,
                    'confirm-password': confirmPassword
                },
                headers: {'X-CSRF-TOKEN': dataType},
                success: function (result) {
                    showPromptInfo(result.msg);
                }
            });
        }
    });


    $('.bindButton').click(function () {
        if (!mobileReg.test($('.bind-phone input[name="mobile"]').val())) {
            showPromptInfo('请输入正确的手机号');
        } else if (typeof ($('.register-win input[name="code"]').val()) === 'undefined'
            || $('.bind-phone input[name="code"]').val() === '') {
            showPromptInfo('请填写验证码');
        } else if (!passwordReg.test($('.bind-phone input[name="password"]').val())) {
            showPromptInfo('请设置6-12位密码');
        } else {
            $.ajax({
                type: 'POST',
                url: $('.bind-phone').attr('action'),
                data: {
                    'mobile': $('.bind-phone input[name="mobile"]').val(),
                    'code': $('.bind-phone input[name="code"]').val(),
                    'password': $('.bind-phone input[name="password"]').val()
                },
                headers: {'X-CSRF-TOKEN': dataType},
                success: function (result) {
                    showPromptInfo(result.msg);
                }
            });
        }
    });


    var isGetCode = false;
    $('.getCode').click(function () {
        var self = this;
        var seconds = 30;
        var mobileNumber = $(this).parent().parent().find('input[name="mobile"]').val();
        var url = $(this).data('url');
        if (!isGetCode) {
            if (!mobileReg.test(mobileNumber)) {
                showPromptInfo('请输入正确的手机号');
            } else {
                $.post(url, {'mobile': mobileNumber}, function (result) {
                    if (result.code === 10000) {
                        showPromptInfo(result.msg);
                        isGetCode = true;
                        countDown(seconds, self);
                    } else {
                        showPromptInfo(result.msg);
                    }
                });
            }
        }

        function countDown(s, self) {
            setTimeout(function () {
                $(self).html(s).css({'color': '#999'});
                ;
                seconds--;
                if (seconds > 0) {
                    countDown(seconds, self);
                } else {
                    $(self).html('获取验证码').css({'color': '#0070c9'});
                    isGetCode = false;
                }
            }, 1000);
        }
    });

    $('.mobile_getCode').click(function () {
        var self = this;
        var seconds = 30;
        var mobileNumber = $(this).parent().parent().find('input[name="mobile"]').val();
        var url = $(this).data('url');
        if (!isGetCode) {
            if (!mobileReg.test(mobileNumber)) {
                showPromptInfo('请输入正确的手机号');
            } else {
                $.post(url, {'mobile': mobileNumber}, function (result) {
                    if (result.code === 10000) {
                        showPromptInfo(result.msg);
                        isGetCode = true;
                        countDown(seconds, self);
                    } else {
                        showPromptInfo(result.msg);
                    }
                });
            }
        }

        function countDown(s, self) {
            setTimeout(function () {
                $(self).html(s).css({'color': '#999'});
                seconds--;
                if (seconds > 0) {
                    countDown(seconds, self);
                } else {
                    $(self).html('获取验证码').css({'color': '#0070c9'});
                    isGetCode = false;
                }
            }, 1000);
        }
    });


// 选中效果
    $('.book-item').on('click', function () {
        $(this).siblings().removeClass('selected-item');
        $(this).addClass('selected-item');
    });

    return customElement;
});
