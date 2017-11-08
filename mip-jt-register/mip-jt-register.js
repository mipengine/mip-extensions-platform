/**
 * @file mip-jt-register 分享组件
 * @author
 * 说明: ------>表单提交
 */


define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var loadJs = function (elem, url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        $(elem).append(script);
        if (typeof callback !== 'function') {
            return false;
        } else {
            script.onload = function () {
                callback();
            };
        }
    };
    var registerUtil = __namespace__.org.cngold.passport.RegisterUtils;
    var validationUtil = __namespace__.org.cngold.passport.ValidationUtils;
    var PASSPORT_DOMAIN = '';
// var PASSPORT_DOMAIN = '//127.0.0.1:3020';
    var ANA_DOMAIN = '//ana.cngold.org';
    var regex = {
        MOBILE: /^1\d{10}$/,
        QQ: /^[0-9][0-9]{4,10}$/,
        EMAIL: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
        REALNAME: /^[\u4E00-\u9FA5]+$/,
        LOGIN_NAME: /^(\w|[\u4E00-\u9FA5])*$/,
        IDENTITY_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    };
    function evil(fn) {
        var Fn = Function;// 一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + fn)();
    }
    var strongFlag = 0;// 密码强度标志位
    var mobileShowFlag = 0;// 图片验证码显示状态
    var captchaShowFlag = 0;// 校验码显示状态
    var mold = 0;//  默认为0服务申请,1邮箱注册和2手机注册
    var needAction = 1;//  0不需要去后台验证, 1需要去后台验证
    var recommendTimes;// 昵称推荐请求次数
    var nicknameShowTimes;// 一个批次的推荐昵称显示次数
    var nicknames = [];// 可用的推荐昵称数组
    var registerMethod = 0;//  0用post提交, 1用get提交 FIXME 临时解决Android, ios, pc端注册的post提交跨域问题, 以后实现更优方案
    var sildeType = 0;// 是否用滑动验证码0/否 1/是
    var isSlideSuccess = 0;// 邮箱注册是否滑动成功0/否 1/是
    var url = {
        CHECK_NICKNAME: PASSPORT_DOMAIN + '/account/checkNickname.htm?callback=?',
        CHECK_LOGIN_NAME: PASSPORT_DOMAIN + '/account/checkLoginName.htm?callback=?',
        CHECK_MOBILE: PASSPORT_DOMAIN + '/account/checkMobile.htm?callback=?',
        CHECK_EMAIL: PASSPORT_DOMAIN + '/account/checkEmail.htm?callback=?',
        MOBILE_CODE: PASSPORT_DOMAIN + '/account/mobileCode.htm?callback=?',
        SAVE: PASSPORT_DOMAIN + '/account/save.htm?callback=?', // 用户注册
        REGISTER: PASSPORT_DOMAIN + '/account/register.htm?callback=?', // 服务申请
        RECOMMEND_NICKNAME: PASSPORT_DOMAIN + '/account/nicknameRecommend.htm?callback=?',
        CHECK_PICCODE: PASSPORT_DOMAIN + '/account/checkPicCode.htm?callback=?', // 校验图片验证码
        REGISTER_SECRECT: PASSPORT_DOMAIN + '/account/registerSecrect.htm?callback=?', // 弹出遮罩层前的提交入库
        CHECK_PIC_MOBILE: PASSPORT_DOMAIN + '/account/captchaStatus.htm?callback=?', // v1.3.3一个请求, 返回图片和手机验证码是否需要
        CHECK_MOBILECODE: PASSPORT_DOMAIN + '/account/checkMobileCode.htm?callback=?', // v1.3.3一个请求, 返回图片和手机验证码是否需要
        EMAIL_CODE: PASSPORT_DOMAIN + '/account/sendAgainEmail.htm?callback=?', // V1.4再次发送邮件
        EMAIL_CALLBACK_CODE: PASSPORT_DOMAIN + '/account/password/emailCode.htm?callback=?', // V1.4再次发送邮件,找回密码
        SEND_MOBILE: PASSPORT_DOMAIN + '/account/password/sendMobile.htm?callback=?', // v.1.4 再次发送短信
        ANA_SEND: ANA_DOMAIN + '/w/sd/transfer.htm?callback=?', // v1.12提供金投统计
        CHECK_SLIDE_CODE: PASSPORT_DOMAIN + '/image/check.htm?callback=?', // v2.1滑动验证
        INIT_SLIDE_CODE: PASSPORT_DOMAIN + '/image/slideValidate.htm?callback=?' // v2.1初始化滑动验证图片
    };

    var passporterrors = [];
    passporterrors.serviceRegister = [];
    passporterrors.serviceRegister[0] = '温馨提示：感谢您的申请，我们会尽快与您取得联系';
    passporterrors.serviceRegister[10020101] = '用户名为空';
    passporterrors.serviceRegister[10020102] = '用户名非法';
    passporterrors.serviceRegister[10020103] = '用户名不能为"请输入姓名"';
    passporterrors.serviceRegister[10020104] = '用户名不能以_开头';
    passporterrors.serviceRegister[10020105] = '用户名不能以cngold_开头';
    passporterrors.serviceRegister[10020106] = '用户名只能由中英文字符、数字、下划线组成';
    passporterrors.serviceRegister[10020107] = '用户名不能以金投用户开头';
    passporterrors.serviceRegister[10020112] = '用户名不能以小金开头';
    passporterrors.serviceRegister[10020108] = '用户名长度必须2个字到7个字,4到15个字符';
    passporterrors.serviceRegister[10020109] = '用户名不能为手机号码格式';
    passporterrors.serviceRegister[10020110] = '用户名不能为邮箱格式';
    passporterrors.serviceRegister[10020111] = '用户名已存在，请选择其他用户名';
    passporterrors.serviceRegister[10020301] = '图片验证码为空';
    passporterrors.serviceRegister[10020302] = '图片验证码错误';
    passporterrors.serviceRegister[10020401] = '手机校验码为空';
    passporterrors.serviceRegister[10020402] = '手机校验码错误';
    passporterrors.serviceRegister[10020403] = '手机校验码不正确';
    passporterrors.serviceRegister[10020701] = '手机不能为空';
    passporterrors.serviceRegister[10020702] = '手机格式不正确';
    passporterrors.serviceRegister[10020703] = '手机已经被使用';
    passporterrors.serviceRegister[10020704] = '短信发送过多，请24小时后再试';
    passporterrors.serviceRegister[10020705] = '手机验证格式未配置,请联系管理员';
    passporterrors.serviceRegister[10020901] = '邮箱不能为空';
    passporterrors.serviceRegister[10020902] = '邮箱格式不正确';
    passporterrors.serviceRegister[10020903] = '邮箱已存在';
    passporterrors.serviceRegister[10020904] = '邮件发送过多，请24小时后再试';
    passporterrors.serviceRegister[10020905] = '邮箱不能被绑定';
    passporterrors.serviceRegister[10021001] = '昵称不能为空';
    passporterrors.serviceRegister[10021002] = '昵称不能以_开头';
    passporterrors.serviceRegister[10021003] = '昵称不能以cngold_开头';
    passporterrors.serviceRegister[10021004] = '昵称只能由中英文字符、数字、下划线组成';
    passporterrors.serviceRegister[10021005] = '昵称不能以"金投用户"开头';
    passporterrors.serviceRegister[10021012] = '昵称不能以"小金"开头';
    passporterrors.serviceRegister[10021006] = '昵称长度必须为4~16个字符';
    passporterrors.serviceRegister[10021007] = '昵称不能为邮箱格式';
    passporterrors.serviceRegister[10021008] = '昵称非法，请填写其他昵称';
    passporterrors.serviceRegister[10021009] = '该昵称已使用';
    passporterrors.serviceRegister[10021010] = '捉弄系统不赚钱，还请你自己取名';
    passporterrors.serviceRegister[10021011] = '昵称可用';
    passporterrors.serviceRegister[10021101] = '真实姓名不能为空 ';
    passporterrors.serviceRegister[10021102] = '真实姓名必须为中文';
    passporterrors.serviceRegister[10021103] = '姓名长度必须在6个汉字以内';
    passporterrors.serviceRegister[10021201] = 'qq不能为空';
    passporterrors.serviceRegister[10021202] = 'qq格式不正确';
    passporterrors.serviceRegister[10021301] = '身份证不能为空';
    passporterrors.serviceRegister[10021302] = '身份证格式不正确';
    passporterrors.serviceRegister[10021401] = '登录密码不能为空';
    passporterrors.serviceRegister[10021402] = '密码长度必须6位以上,16位以下';
    passporterrors.serviceRegister[10021501] = '重复密码不能为空';
    passporterrors.serviceRegister[10021502] = '两次输入密码不一致';
// ip黑名单异常
    passporterrors.serviceRegister[10021601] = '您所使用的IP地址异常，请重新访问。如有疑问，请拨打客服电话：400-103-2211';
// ip  1天次数超过 10次 异常
    passporterrors.serviceRegister[10021602] = '你所使用的IP地址异常，请重新访问。如有疑问，请拨打客服电话：400-103-2211';
// ip 10分钟 次数超过 2次 异常
    passporterrors.serviceRegister[10021603] = '抱歉，您注册次数过于频繁，建议您休息一会儿再试！';
    passporterrors.serviceRegister[10010408] = '你的ip存在异常，请联系客服';
    passporterrors.serviceRegister[10010409] = '您的ip存在异常，请联系客服';// referer
    /** 已申请服务, 返回错误 (已申请该服务! 请耐心等待结果.) */
    passporterrors.serviceRegister[10021604] = '已申请该服务! 请耐心等待结果';// referer
    customElement.prototype.build = function () {
        loadJs(this.element, PASSPORT_DOMAIN + '/resource/cngold/js/touch.js');
    };
    customElement.prototype.firstInviewCallback = function () {
        var el = this.element;
        var $el = $(el);
        $el.touch();
    };

    function __namespace__(ns, parent) {
        if (parent == null) {
            parent = self;
        }

        for (var each in ns) {
            if (parent[each] !== null) {
                __namespace__(ns[each], parent[each]);
            } else {
                parent[each] = ns[each];
            }
        }
        return;
    }

    function __using__(ns) {
        for (var each in ns) {
            if (self[each] == null) {
                self[each] = ns[each];
            }
        }
    }

    function __unlink__(ns) {
        for (var each in ns) {
            if (self[each] === ns[each]) {
                self[each] = null;
            }
        }
    }

    /**
     * 校验表单相关方法
     */
    __namespace__({
        org: {
            cngold: {
                passport: (function () {
                    function ValidationUtils() {
                         // 获取referrer,主要用于取得跳转地址,一般情况下是本页面连接,如果是嵌套的iframe,就用父窗口的url。可以重写。
                         // 和getFromurl的区别是,主要用于手机、邮箱已注册情况下的展示链接
                        ValidationUtils.prototype.getReferrer = function () {
                            var referrer;
                            if (window.parent === window) {// 自身是父页面
                                referrer = location.href;
                            } else {// 自身是iframe
                                referrer = document.referrer;
                            }
                            if (referrer.indexOf('?') > -1) {
                                referrer = referrer.substring(0, referrer.indexOf('?'));
                            }
                            return referrer.replace('#', '%23');
                        };

                        // 去掉referrer后边的参数

                        ValidationUtils.prototype.splitReferrer = function (referrer) {
                            if (referrer.indexOf('?') > -1) {
                                referrer = referrer.substring(0, referrer.indexOf('?'));
                            }
                            return referrer;
                        };

                        // 获取fromUrl,主要是用于获得来源地址,一般情况下是获得所写的url,如果是嵌套的iframe,就用父窗口的url。可以重写。
                        // 和getReferrer的区别是,主要用于获得来源fromUrl，传到后台

                        ValidationUtils.prototype.getFromUrl = function (idPrev) {
                            var fromUrl;
                            if (window.parent === window) {// 自身是父页面
                                if ($(idPrev + 'fromUrl').length > 0) {
                                    fromUrl = $(idPrev + 'fromUrl').val();
                                } else {
                                    fromUrl = location.href;
                                }
                            } else {// 自身是iframe
                                fromUrl = document.referrer;
                            }
                            if (fromUrl.indexOf('?') > -1) {
                                fromUrl = fromUrl.substring(0, fromUrl.indexOf('?'));
                            }
                            return fromUrl.replace('#', '%23');
                        };

                        // 显示错误提示

                        ValidationUtils.prototype.showErrorMsg = function (formId, errorCode, inputId) {
                            // 有错误提示的时候, 也将按钮再次放开...
                            if ($('#button_submit').length > 0) {
                                $('#button_submit').removeAttr('disabled', 'disabled');
                            }
                            var iptId = formId;
                            var idPrev = '#';
                            if (formId) {
                                formId = '#tip_' + formId;
                            }
                            if (errorCode === 10021009) {
                                if (nicknames.length !== 0) {
                                    if (nicknameShowTimes > 0) {
                                        nicknameShowTimes--;
                                    }
                                    this.nextNickname();
                                } else {
                                    this.getNicknameShowHtml(formId);
                                }
                            } else {
                                if (errorCode === 10020703) {
                                    $('#tip_mobile1').html(getMobileShowHtml(this.getErrorMsg(errorCode))); // 临时处理手机提示，等产品重新设计再修改
                                    $(formId).html(getMobileShowHtml(this.getErrorMsg(errorCode)));
                                } else if (errorCode === 10020903) {
                                    $('#tip_email1').html(getMobileShowHtml(this.getErrorMsg(errorCode))); // 临时处理邮箱提示，等产品重新设计再修改
                                    $(formId).html(getEmailShowHtml(this.getErrorMsg(errorCode)));
                                } else {
                                    // 兼容多表单
                                    $(formId).show();
                                    if (inputId !== undefined && inputId !== '#') {
                                        // 加上Tip_开始, 找得到就显示, 找不到显示在formInputId里面
                                        var formInputId;
                                        if (inputId.indexOf('#') !== -1) {
                                            formInputId = inputId.split('#')[1];
                                            idPrev += formInputId.split('_' + iptId)[0] + '_';
                                        } else {
                                            formInputId = inputId + '_' + iptId;
                                        }
                                        // 有错误提示的时候, 也将按钮再次放开...(兼容万恶的多表单)
                                        if ($(idPrev + 'button_submit').length > 0) {
                                            $(idPrev + 'button_submit').removeAttr('disabled', 'disabled');
                                        }
                                        formInputId = '#tip_' + formInputId;
                                        if ($(formInputId).length > 0) {
                                            $(formInputId).html(this.getErrorMsg(errorCode));
                                            $(formInputId).addClass('box_error');
                                            $(formInputId).removeClass('box_ok');
                                            return;
                                        } else {
                                            if (inputId.indexOf('#') !== -1) {
                                                if (mold === 2) {
                                                    $('#msgInfo').html(this.getErrorMsg(errorCode));
                                                    $('.tc_tishi').show();
                                                    setTimeout(function () {
                                                        $('.tc_tishi').hide();
                                                    }, 2000);
                                                    return;
                                                } else {
                                                    $(inputId).val(this.getErrorMsg(errorCode));
//    											$(inputId).blur();
                                                    return;
                                                }

                                            }
                                        }
                                    }
                                    // 如果还是找不到, 那么对不起了, 只能alert了
                                    if ($(formId).length === 0) {
                                        alert(this.getErrorMsg(errorCode));
                                        return;
                                    }
                                    // 正常的走这里
                                    $(formId).html(this.getErrorMsg(errorCode));
                                    if ($('#pwdStrongDisplay').length > 0) {// 密码强度
                                        if (errorCode !== 10021501 && errorCode !== 10021502) {
                                            $('[name="pwd"]').attr('style', 'display:none');
                                            $('#pwdStrongDisplay').removeClass('msg-h2');
                                        }
                                    }
                                }
                                $(formId).addClass('box_error');
                                $(formId).removeClass('box_ok');
                                // 遮罩层特例
                                if ('#tip_pictureCaptcha' === formId) {
                                    $(formId).css('display', 'block');
                                }
                                // 遮罩层特例
                                if ('#tip_mobilecaptcha' === formId) {
                                    $(formId).css('display', 'block');
                                }
                                // 分两步走的情况下, 如果第二步有异常情况, 错误信息显示在手机校验码后面
                                if (formId === 'mobile' && $('#mobile').parent().parent().css('display') === 'none') {
                                    $('#tip_captcha').html(this.getErrorMsg(errorCode));
                                    $('#tip_captcha').addClass('box_error');
                                    $('#tip_captcha').removeClass('box_ok');
                                }
                            }
                        };

                        // @see showErrorMsg调用
                        ValidationUtils.prototype.getErrorMsg = function (errorCode) {
                            var language = 'serviceRegister';
                            if (passporterrors[language] && passporterrors[language][errorCode]) {
                                return passporterrors[language][errorCode];
                            }
                        };

                        // 移除字段属性
                        ValidationUtils.prototype.removeCss = function (formId) {
                            if (formId.indexOf('#') !== -1) {// 兼容多表单#formId_inputId
                                formId = formId.split('#')[1];
                            }
                            if (formId) {
                                formId = '#tip_' + formId;
                            }
                            $(formId).html('');
                            $(formId).removeClass('box_error');
                            $(formId).addClass('box_ok');
                            // 遮罩层特例
                            if ('#tip_pictureCaptcha' === formId) {
                                $(formId).css('display', 'none');
                            }
                            // 遮罩层特例
                            if ('#tip_mobilecaptcha' === formId) {
                                $(formId).css('display', 'none');
                            }
                        };

                        // 移除字段属性
                        ValidationUtils.prototype.encodeURI = function (str) {
                            return encodeURIComponent(encodeURIComponent(str));
                        };

                        // 显示并刷新图片验证码

                        ValidationUtils.prototype.refreshCaptcha = function () {
                            $('#captchaImg').attr('src', PASSPORT_DOMAIN
                             + '/account/authCode.htm?r=' + new Date().getTime());
                        };

                        // 非0即真的判断方法

                        ValidationUtils.prototype.isNeedAction = function () {
                            return needAction !== 0;
                        };

                        // 获取字符串字符数

                        ValidationUtils.prototype.getRealLength = function (s) {
                            if (s == null) {
                                return 0;
                            } else {
                                return (s.length + s.replace(/[\u0000-\u00ff]/g, '').length);
                            }
                        };

                        // 按批次加载推荐昵称

                        ValidationUtils.prototype.getNicknameShowHtml = function (formId) {// 按批次加载推荐昵称
                            nicknames.length = 0;
                            var nickname = $.trim($('#nickname').val());
                            if (this.getRealLength(nickname) >= 16) {// 昵称长度大于等于8的时候，不做推荐，直接显示“昵称已存在”
                                $(formId).addClass('box_error');
                                $(formId).removeClass('box_ok');
                                $(formId).html('昵称' + nickname + '已存在，请选择其他昵称');
                                return;
                            }
                            if (recommendTimes === undefined) {
                                recommendTimes = 1;
                            }
                            var authCodeUrl = encodeURI('nickname=' + nickname + '&times=' + recommendTimes);
                            $.getJSON(url.RECOMMEND_NICKNAME, authCodeUrl, function (json) {
                                nicknameShowTimes = 0;
                                $(formId).addClass('box_error');
                                $(formId).removeClass('box_ok');
                                if (json.data.code === 0) {
                                    // 返回了推荐昵称列表，填充提示区域
                                    recommendTimes = json.data.times;// 更新推荐次数，因为返回的次数跟请求的次数有可能会不一样
                                    for (var i = 0; i < json.data.recommend_nicknames.length; i++) {
                                        nicknames[i] = json.data.recommend_nicknames[i];
                                    }
                                    var str = '该昵称已存在!';
                                    str += '推荐您使用&nbsp;<b id="nickDiv">';
                                    str += json.data.recommend_nicknames[parseInt(nicknameShowTimes, 0)];
                                    str += '</b><a onclick="validationUtil.useThis()" class="use">使用</a>';
                                    str += '&nbsp;<a class="blue" onclick="validationUtil.nextNickname(';
                                    // str += formId;
                                    str += ')">换一换</a>';
                                    $(formId).html(str);
                                } else {
                                    recommendTimes = -1;
                                    // 没有可以推荐的昵称
                                    $(formId).html(json.data.msg);
                                }
                            });
                        };

                        // 将昵称推荐写入昵称框内

                        ValidationUtils.prototype.useThis = function () {
                            $('#nickname').val($('#nickDiv').html());
                            $('#nickname').focus();
                            $('#tip_nickname').html('');
                            $('#tip_nickname').removeClass('box_error');
                        };


                        // 推荐下一个昵称

                        ValidationUtils.prototype.nextNickname = function () {
                            if (nicknames.length === 0) {
                                return;
                            }
                            if (nicknames.length <= nicknameShowTimes + 1) {
                                if (recommendTimes <= 0) {
                                    $('#tip_nickname').html(this.getErrorMsg(10021010));
                                    return;
                                }
                                recommendTimes++;
                                this.getNicknameShowHtml('#tip_nickname');
                            } else {
                                $('#tip_nickname').addClass('box_error');
                                $('#tip_nickname').removeClass('box_ok');
                                if ($('#tip_nickname').html() === '') {
                                    var str = '该昵称已存在!';
                                    str += '推荐您使用&nbsp;<b id="nickDiv">';
                                    str += nicknames[parseInt(nicknameShowTimes + 1, 0)];
//								nicknameShowTimes ++;
                                    str += '</b><a onclick="validationUtil.useThis()" class="use">使用</a>';
                                    str += '&nbsp;<a class="blue" onclick="validationUtil.nextNickname(';
                                    // str += formId;
                                    str += ')">换一换</a>';
                                    $('#tip_nickname').html(str);
                                } else {
                                    $('#nickDiv').html(nicknames[parseInt(nicknameShowTimes + 1, 0)]);
                                }
                                nicknameShowTimes++;
                            }
                        };

                         // 校验昵称

                        ValidationUtils.prototype.checkNickname = function (idPrev) {
                            var nicknameId = 'nickname';
                            var nicknameFormId = idPrev + nicknameId;
                            if ($(nicknameFormId).length > 0) {
                                var nickname = $.trim($(nicknameFormId).val());
                                var strLengthTrue = this.getRealLength(nickname);
                                if (nickname === '') {
//								$(idPrev+'nickname').focus();
                                    this.showErrorMsg(nicknameId, 10021001);// nickname can not blank
                                    return false;
                                } else if (nickname.indexOf('_') === 0) {
                                    $(nicknameFormId).focus();
                                    this.showErrorMsg(nicknameId, 10021002);// 昵称不能以_开头
                                    return false;
                                } else if (nickname.indexOf('cngold_') === 0) {
                                    $(nicknameFormId).focus();
                                    this.showErrorMsg(nicknameId, 10021003);// 昵称不能以'cngold_'开头
                                    return false;
                                } else if (nickname !== '' && !regex.LOGIN_NAME.test(nickname)) {
                                    $(nicknameFormId).focus();
                                    this.showErrorMsg(nicknameId, 10021004);// 昵称只能由中英文字符、数字、下划线组成
                                    return false;
                                } else if (nickname.indexOf('金投用户') === 0) {
                                    $(nicknameFormId).focus();
                                    this.showErrorMsg(nicknameId, 10021005);// 昵称不能以'金投用户'开头
                                    return false;
                                } else if (nickname.indexOf('小金') === 0) {
                                    $(nicknameFormId).focus();
                                    this.showErrorMsg(nicknameId, 10021012);// 昵称不能以'小金'开头
                                    return false;
                                } else if (strLengthTrue < 4 || strLengthTrue > 16) {
                                    $(nicknameFormId).focus();
                                    this.showErrorMsg(nicknameId, 10021006);// 昵称长度必须2个字到8个字
                                    return false;
                                } else if (regex.EMAIL.test(nickname)) {
                                    $(nicknameFormId).focus();
                                    this.showErrorMsg(nicknameId, 10021007);// 昵称不能为邮箱格式
                                    return false;
                                } else {
                                    if (nicknames.length > 0) {// 输入框昵称改变的时候将推荐昵称列表清空，防止推荐昵称牛头不对马嘴
                                        var rN = nicknames[0];
                                        if (rN.indexOf(nickname) === -1) {
                                            nicknames.length = 0;
                                        }
                                    }
                                    nickname = this.encodeURI(nickname);
                                    var a = needAction;
                                    var b = this.isNeedAction();
                                    if (this.isNeedAction()) {
                                        return this.checkNicknameAction(idPrev, nicknameId, nickname);
                                    } else {
                                        this.removeCss(nicknameFormId);
                                        return nicknameId + '=' + nickname;
                                    }
                                }
                            }
                        };

                        // 后台异步校验昵称

                        ValidationUtils.prototype.checkNicknameAction = function (idPrev, nicknameId, nickname) {
                            var authCodeUrl = nicknameId + '=' + nickname;
                            $.getJSON(url.CHECK_NICKNAME, authCodeUrl, function (json) {
                                if (json !== null && json !== '') {
                                    if (json.flag) {
                                        validationUtil.removeCss(idPrev + nicknameId);
                                        return true;
                                    } else {
                                        if ($(idPrev + json.data).length > 0) {
                                            validationUtil.showErrorMsg(json.data, json.code);// 不正确
                                        }
                                        return false;
                                    }
                                }
                            });
                        };

                        // 校验手机

                        ValidationUtils.prototype.checkMobile = function (idPrev) {
                            var mobileId = 'mobile';
                            var mobileFormId = idPrev + mobileId;
                            if ($(mobileFormId).length > 0) {
                                var mobile = $.trim($(mobileFormId).val());
                                if (mobile === '') {
//								$(idPrev+'mobile').focus();
                                    this.showErrorMsg(mobileId, 10020701, mobileFormId);// 手机不能为空
                                    return false;
                                } else if (mobile !== '' && !regex.MOBILE.test(mobile)) {
//								$(mobileFormId).focus();
                                    this.showErrorMsg(mobileId, 10020702, mobileFormId);// 手机号码格式不正确
                                    return false;
                                } else {
                                    if (this.isNeedAction()) {
                                        return this.checkMobileAction(idPrev, mobileId, mobile);
                                    } else {
                                        var formMobileId = mobileId;
                                        if (idPrev !== '#') {
                                            formMobileId = idPrev.split('#')[1] + mobileId;
                                        }
                                        this.removeCss(mobileFormId);
                                        return mobileId + '=' + this.encodeURI(mobile);
                                    }
                                }
                            }
                        };

                        // 后台异步校验手机

                        ValidationUtils.prototype.checkMobileAction = function (idPrev, mobileId, mobile) {
                            var authCodeUrl = mobileId + '=' + mobile;
                            $.getJSON(url.CHECK_MOBILE, authCodeUrl, function (json) {
                                if (json !== null && json !== '') {
                                    if (json.flag) {
                                        validationUtil.removeCss(idPrev + mobileId);
                                        return true;
                                    } else {
                                        if ($(idPrev + json.data).length > 0) {
                                            validationUtil.showErrorMsg(json.data, json.code);// 手机号码格式不正确
                                        }
                                        return false;
                                    }
                                }
                            });
                        };

                        // 校验邮箱Email

                        ValidationUtils.prototype.checkEmail = function (idPrev) {
                            var emailId = 'email';
                            var emailFormId = idPrev + emailId;
                            if ($(emailFormId).length > 0) {
                                var email = $.trim($(emailFormId).val());
                                if (email === '' && $(idPrev + 'email').attr('email_must') === '1') {
//								$(idPrev+'email').focus();
                                    this.showErrorMsg(emailId, 10020901);// 邮箱不能为空
                                    return false;
                                } else if (email !== '' && !regex.EMAIL.test(email)) {
                                    if ($('#myemail') && $('#myemail').css('display') === 'block') {
                                        // 这个时候会弹出mail的层, 失去焦点不去验证..
                                    } else {
                                        $(emailFormId).focus();
                                        this.showErrorMsg(emailId, 10020902);// 邮箱号码格式不正确
                                        return false;
                                    }
                                } else {
                                    if (!new RegExp('^(?!.*@sangame.com)').test(email)) {
                                        $(emailFormId).focus();
                                        this.showErrorMsg(emailId, 10020905);// 邮箱号码不能绑定
                                        return false;
                                    }

                                    if (this.isNeedAction()) {
                                        return this.checkEmailAction(idPrev, emailId, email);
                                    } else {
                                        this.removeCss(emailFormId);
                                        return emailId + '=' + this.encodeURI(email);
                                    }
                                }
                            }
                        };

                        // 后台异步校验邮箱Email

                        ValidationUtils.prototype.checkEmailAction = function (idPrev, emailId, email) {
                            var authCodeUrl = emailId + '=' + email;
                            $.getJSON(url.CHECK_EMAIL, authCodeUrl, function (json) {
                                if (json !== null && json !== '') {
                                    if (json.flag) {
                                        validationUtil.removeCss(idPrev + emailId);
                                        return true;
                                    } else {
                                        if ($(idPrev + json.data).length > 0) {
                                            validationUtil.showErrorMsg(json.data, json.code);// 邮箱已存在
                                        }
                                        return false;
                                    }
                                }
                            });
                        };

                        // 校验登录名

                        ValidationUtils.prototype.checkLoginName = function (idPrev) {
                            var loginNameId = 'loginName';
                            var loginNameFormId = idPrev + loginNameId;
                            if ($(loginNameFormId).length > 0) {
                                var loginName = $.trim($(loginNameFormId).val());
                                if (loginName === '' || $.trim(loginName) === '请输入姓名') {
                                    $(loginNameFormId).val('');
//				    			$(loginNameFormId).focus();
                                    this.showErrorMsg(loginNameId, 10020101);// 请输入姓名
                                    return false;
                                }
                                if (loginName.indexOf('_') === 0) {
                                    $(loginNameFormId).focus();
                                    this.showErrorMsg(loginNameId, 10020104);// 用户名不能以_开头
                                    return false;
                                }
                                if (loginName.indexOf('cngold_') === 0) {
                                    $(loginNameFormId).focus();
                                    this.showErrorMsg(loginNameId, 10020105);// 用户名不能以cngold_开头
                                    return false;
                                }
                                if (!regex.LOGIN_NAME.test(loginName)) {
                                    $(loginNameFormId).focus();
                                    this.showErrorMsg(loginNameId, 10020106);// 用户名只能由中英文字符、数字、下划线组成
                                    return false;
                                }
                                if (loginName.indexOf('金投用户') === 0) {
                                    $(loginNameFormId).focus();
                                    this.showErrorMsg(loginNameId, 10020107);// 用户名不能以金投用户开头
                                    return false;
                                }
                                if (loginName.indexOf('小金') === 0) {
                                    $(loginNameFormId).focus();
                                    this.showErrorMsg(loginNameId, 10020112);// 用户名不能以小金开头
                                    return false;
                                }
                                var strLengthTrue = 0;
                                for (var i = 0; i < loginName.length; i++) {
                                    var c = loginName.charAt(i);
                                    if (/[^\u4e00-\u9fa5]/.test(c)) {
                                        strLengthTrue += 1;
                                    } else {
                                        strLengthTrue += 2;
                                    }
                                }
                                if (strLengthTrue < 4 || strLengthTrue > 15) {
                                    $(loginNameFormId).focus();
                                    this.showErrorMsg(loginNameId, 10020108);// 用户名长度必须2个字到7个字,4到15个字符
                                    return false;
                                }
                                if (regex.MOBILE.test(loginName)) {
                                    $(loginNameFormId).focus();
                                    this.showErrorMsg(loginNameId, 10020109);// 用户名不能为手机号码格式
                                    return false;
                                }
                                if (regex.EMAIL.test(loginName)) {
                                    $(loginNameFormId).focus();
                                    this.showErrorMsg(loginNameId, 10020110);// 用户名不能为邮箱格式
                                    return false;
                                }
                                if (this.isNeedAction()) {
                                    return this.checkLoginNameAction(idPrev, loginNameId, loginName);
                                } else {
                                    this.removeCss(loginNameFormId);
                                    return loginNameId + '=' + loginName;
                                }

                            }
                        };


                        // 后台异步校验登录名

                        ValidationUtils.prototype.checkLoginNameAction = function (idPrev, loginNameId, loginName) {
                            var authCodeUrl = loginNameId + '=' + loginName;
                            $.getJSON(url.CHECK_LOGIN_NAME, authCodeUrl, function (json) {
                                if (json !== null && json !== '') {
                                    if (json.flag) {
                                        validationUtil.removeCss(idPrev + loginNameId);
                                        return true;
                                    } else {
                                        if ($(idPrev + json.data).length > 0) {
                                            validationUtil.showErrorMsg(json.data, json.code);// 用户名已存在
                                        }
                                        return false;
                                    }
                                }
                            });
                        };

                        // 查询图片和手机验证码是否需要 v1.3.3

                        ValidationUtils.prototype.checkCaptcha = function () {
                            $.getJSON(url.CHECK_PIC_MOBILE, function (json) {
                                if (json !== null && json !== '' && json.flag && json.data) {
                                    if (json.data.mobile) {// 需要手机校验码
                                        mobileShowFlag = 1;
                                        $('#captchaView').attr('style', 'display:block');
                                    } else {
                                        if (mold === 2) {
                                            $('#captchaView').attr('style', 'display:block');
                                        }
                                    }
                                    if (json.data.picture) {// 需要图片校验码
                                        captchaShowFlag = 1;
                                    } else {
                                        if ($('#tip_pictureCaptcha').length > 0) {
                                            validationUtil.removeCss('pictureCaptcha');
                                        }
                                    }
                                    if (json.data.slidePicture) {// 需要滑动验证码
                                        sildeType = 1;
                                    }
                                }
                            });
                        };

                        // 校验真实姓名

                        ValidationUtils.prototype.checkRealName = function (idPrev) {
                            var realNameId = 'realName';
                            var realNameFormId = idPrev + realNameId;
                            if ($(realNameFormId).length > 0) {
                                var realName = $.trim($(realNameFormId).val());
                                if (realName === '' || $.trim(realName) === '' || $.trim(realName) === '请输入姓名') {
//			    				$(realNameFormId).focus();
                                    $(realNameFormId).val('');
                                    this.showErrorMsg(realNameId, 10021101, realNameFormId);// 姓名为空,请输入姓名
                                    return false;

                                }
                                if (!regex.REALNAME.test(realName)) {
//			    				$(realNameFormId).focus();
                                    this.showErrorMsg(realNameId, 10021102, realNameFormId);// 必须为中文
                                    return false;
                                }
                                if (realName.length > 6) {
//			    				$(realNameFormId).focus();
                                    this.showErrorMsg(realNameId, 10021103, realNameFormId);// 姓名长度必须在6个汉字以内
                                    return false;
                                }
                                this.removeCss(realNameFormId);
                                if (!this.isNeedAction()) {
                                    return realNameId + '=' + this.encodeURI(realName);
                                }
                            }
                        };

                        // 校验qq

                        ValidationUtils.prototype.checkQq = function (idPrev) {
                            var qqId = 'qq';
                            var qqFormId = idPrev + qqId;
                            if ($(qqFormId).length > 0) {
                                // QQ号码
                                var qq = $.trim($(qqFormId).val());
                                if (qq !== '' && !regex.QQ.test(qq)) {
//								$(qqFormId).focus();
                                    this.showErrorMsg('qq', 10021202, qqFormId);// 手机号码格式不正确
                                    return false;
                                }
                                this.removeCss(qqFormId);
                                if (!this.isNeedAction()) {
                                    if (qq && qq !== '') {
                                        return qqId + '=' + this.encodeURI(qq);
                                    }
                                }
                            }
                        };

                        // 校验身份证

                        ValidationUtils.prototype.checkIdentityCard = function (idPrev) {
                            var identityCardId = 'identityCard';
                            var identityCardFormId = idPrev + identityCardId;
                            if ($(identityCardFormId).length > 0) {
                                var identityCard = $(identityCardFormId).val();
                                if (identityCard === '') {
                                    $(identityCardFormId).focus();
                                    this.showErrorMsg(identityCardId, 10021301);// 身份证不能为空
                                    return false;
                                }
                                // 新的身份证号判断, 暂时就用一个正则
                                if (!regex.IDENTITY_CARD.test(identityCard)) {
                                    $(identityCardId).focus();
                                    this.showErrorMsg(identityCardId, 10021302);// 身份证格式不正确
                                    return false;
                                }
                                this.removeCss(identityCardFormId);
                                if (!this.isNeedAction()) {
                                    return identityCardId + '=' + this.encodeURI(identityCard);
                                }
                            }
                        };

                        // 弹出Email验证码遮罩层

                        ValidationUtils.prototype.openEmailMask = function (activedEmailFlag) {
                            // 隐藏遮罩层并且发送邮件
                            var email = $.trim($('#email').val());
                            var email3 = $.trim($('#email3').val());
                            var emailId = $.trim($('#emailId').val());
                            var clientImg2 = $.trim($('#pictureCaptcha').val());

                            var domain = email3.slice(email3.indexOf('@') + 1);
                            var emailDomain = '//www.' + email3.slice(email3.indexOf('@') + 1);

                            if (domain.indexOf('163.com') > -1 || domain.indexOf('126.com') > -1
                               || domain.indexOf('qq.com') > -1 || domain.indexOf('sina.com') > -1
                               || domain.indexOf('yahoo.com') > -1 || domain.indexOf('sohu.com') > -1
                               || domain.indexOf('sangame.com') > -1) {
                                emailDomain = '//mail.' + email3.slice(email3.indexOf('@') + 1);
                            }
                            var myEmail = '';
                            var sendEmailData;
                            myEmail = email3;
                            if (activedEmailFlag === '2') {
                                myEmail = $('#emailName').val();
                                sendEmailData = 'clientType=&linkType=1&email=' + myEmail + '&clientImg=' + clientImg2;
                                $.getJSON(url.EMAIL_CALLBACK_CODE, sendEmailData, function (json) {
                                    if (json.flag) {
                                        alert('邮件已经再次发送到您的邮箱中，注意查收!');
                                        if ($('#maskDivIOnly').css('display') === 'block') {
                                            $('#maskDivIOnly').attr('style', 'display:none;');
                                        }
                                        return;
                                    } else {
                                        var picFormId = '';
                                        if (json.data === 'email') {
                                            picFormId = 'pictureCaptcha';
                                        } else {
                                            picFormId = json.data;
                                        }
                                        // 刷新验证码(因为后台已经刷新过了, 前台不刷新会报验证码错误)
                                        validationUtil.refreshCaptcha();
                                        validationUtil.showErrorMsg(picFormId, json.code);
                                    }
                                });

                            } else {
                                sendEmailData = 'id=' + emailId + '&email=' + email3;
                                $.getJSON(url.EMAIL_CODE, sendEmailData, function (json) {
                                    if (json.flag) {
                                        alert('邮件已经再次发送到您的邮箱中，注意查收!');
                                        if ($('#maskDivIOnly').css('display') === 'block') {
                                            $('#maskDivIOnly').attr('style', 'display:none;');
                                        }
                                        if ($('#redirectUrl').length > 0) {
                                            var redirectUrl = $('#redirectUrl').val() + '?';
                                            redirectUrl = redirectUrl + '&email=' + email + '&id='
                                                + json.data + '&emailDomain=' + emailDomain + '&service=';
                                            if (redirectUrl && redirectUrl !== '') {
                                                location.href = redirectUrl;
                                            }
                                        }
                                        return;
                                    } else {
                                        var picFormId = '';
                                        if (json.data.id === 'email') {
                                            picFormId = 'pictureCaptcha';
                                        } else {
                                            picFormId = json.data.id;
                                        }
                                        // 刷新验证码(因为后台已经刷新过了, 前台不刷新会报验证码错误)
                                        validationUtil.refreshCaptcha();
                                        validationUtil.showErrorMsg(picFormId, json.code);
                                    }
                                });
                            }
                        };

                        // 弹出mobile验证码遮罩层

                        ValidationUtils.prototype.openMobileMask = function () {
                            // 隐藏遮罩层并且发送短信
                            var data = '';
                            $.getJSON(url.SEND_MOBILE, data, function (json) {
                                if (json.flag) {
                                    alert('短信已经再次发送到您的手机中，注意查收!');
                                    $('#verificationCode').val('');
                                    if ($('#maskDivIOnly').css('display') === 'block') {
                                        $('#maskDivIOnly').attr('style', 'display:none;');
                                    }
                                    $('#activedMobileFlag').val('');
                                    var sendMobile = document.getElementById('sendMobile');
                                    var secs = 60;
                                    var wait = secs * 1000;
                                    $('#sendMobile').html('(' + secs + ')秒后可以重新发送');
                                    sendMobile.onclick = function () {
                                        return false;
                                    };
                                    for (var i = 1; i <= secs; i++) {
                                        window.setTimeout('validationUtil.update(' + i + ',' + wait + ')', i * 1000);
                                    }
                                    window.setTimeout('validationUtil.timer()', wait);
                                } else {
                                    var picFormId = 'pictureCaptcha';
                                    // 刷新验证码(因为后台已经刷新过了, 前台不刷新会报验证码错误)
                                    validationUtil.refreshCaptcha();
                                    validationUtil.showErrorMsg(picFormId, json.code);
                                }
                            });
                        };
                        ValidationUtils.prototype.update = function (num, wait) {
                            var sendMobile = document.getElementById('sendMobile');
                            if (num === (wait / 1000)) {
                                sendMobile = '';
                            } else {
                                var printnr = (wait / 1000) - num;
                                $('#sendMobile').html(printnr + '秒后可重新发');
                            }
                        };
                        ValidationUtils.prototype.timer = function () {
                            var sendMobile = document.getElementById('sendMobile');
                            $('#sendMobile').html('再次发送信息');
                            sendMobile.onclick = function () {
                                $('#activedMobileFlag').val(1);
                                $('#mobileName').val('${mobile}');
                                $('#maskDivIOnly').attr('style', 'display:block;');
                                refreshCaptcha();
                                $('#pictureCaptcha').val('');
                            };
                        };

                        // 校验密码

                        ValidationUtils.prototype.checkPasspwordMd5 = function (idPrev) {
                            var pwdId = 'passwordMd5';
                            var pwdFormId = idPrev + pwdId;
                            if ($(pwdFormId).length > 0) {
                                // 密码
                                var passwordMd5 = $.trim($(pwdFormId).val());
                                if (passwordMd5 === '') {
                                    this.showErrorMsg(pwdId, 10021401, pwdFormId);// 登录密码不能为空
                                    return false;
                                }
                                if (passwordMd5.length < 6 || passwordMd5.length > 16) {
                                    $(pwdFormId).focus();
                                    this.showErrorMsg(pwdId, 10021402, pwdFormId);// 密码长度必须6位以上,16位以下
                                    return false;
                                }
                                this.removeCss(pwdFormId);
                                if (!this.isNeedAction()) {
                                    return pwdId + '=' + this.encodeURI(passwordMd5);
                                }
                            }
                        };

                        // 校验密码强度

                        ValidationUtils.prototype.checkPasswordStrong = function (idPrev, id) {
                            var passwordMd5 = $.trim($(idPrev + id).val());
                            var pwdId = 'pwdStrongDisplay';
                            var pwdFormId = idPrev + pwdId;
                            strongFlag = 0;
                            $('#pwdTip').show();
                            $('[name="pwd"]').attr('style', 'display:none');
                            var rtn = validationUtil.checkPasspwordMd5(idPrev);
                            if (rtn === false) {
                                $('#pwdStrongDisplay').attr('style', 'display:none');
                                return rtn;
                            }
                            if ($(pwdFormId).length > 0) {
                                // weak pwd
                                var regNum = new RegExp('^[0-9]*$');
                                if (regNum.test(passwordMd5) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdWeak');// 密码全是数字
                                }
                                var regStrCap = new RegExp('^[A-Z]+$');
                                if (regStrCap.test(passwordMd5) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdWeak');// 密码全是大写英文字母
                                }
                                var regStrLow = new RegExp('^[a-z]+$');
                                if (regStrLow.test(passwordMd5) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdWeak');// 密码全是小写英文字母
                                }
                                // normal pwd
                                var regNumStrCap = new RegExp('^(([A-Z]+[0-9]+)|([0-9]+[A-Z]+))[A-Z0-9]*$');
                                if (regNumStrCap.test(passwordMd5) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdNormal');// 密码是数字+英文，全大写
                                }
                                var regNumStrLow = new RegExp('^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$');
                                if (regNumStrLow.test(passwordMd5) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdNormal');// 密码是数字+英文，全小写
                                }
                                var regStr = new RegExp('^[A-Za-z]+$');
                                if (regStr.test(passwordMd5) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdNormal');// 密码是英文
                                }
                                // strong pwd
                                var regNumStrSpe = /(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]{6,16}/i;
                                if (regNumStrSpe.test(passwordMd5) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdStrong');// 密码是特殊字符+英文+数字
                                }

                                if (passwordMd5.match(/[0-9]/)
                                    && passwordMd5.match(/[!,@#$%^&*?_~]/) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdNormal');// 密码是特殊字符+数字
                                }
                                if (passwordMd5.match(/[a-z]/)
                                    && passwordMd5.match(/[!,@#$%^&*?_~]/) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdNormal');// 密码是特殊字符+英文
                                }
                                if (passwordMd5.match(/[!,@#$%^&*?_~]/) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdStrong');// 密码全部是特殊字符
                                }
                                var regNumStr = new RegExp('^[A-Za-z0-9]+$');
                                if (regNumStr.test(passwordMd5) && strongFlag === 0) {
                                    this.showPwdStrong(idPrev, 'pwdStrong');// 密码是英文+数字
                                }
                            }
                        };
                        ValidationUtils.prototype.showPwdStrong = function (idPrev, pwdStrong) {
                            var pwdTip = 'tip_passwordMd5';
                            var pwdFormId = idPrev + pwdStrong;
                            strongFlag = 1;
                            $('#pwdTip').hide();
                            $(idPrev + pwdStrong).attr('style', 'display:block');
                            $('#pwdStrongDisplay').attr('style', 'display:block');
                            $('#pwdStrongDisplay').addClass('msg-h2');
                        };

                        // 校验重复密码

                        ValidationUtils.prototype.checkPasspwordMd5Confirm = function (idPrev) {
                            var pwdConfirmId = 'passwordMd5_confirm';
                            var pwdConfirmFormId = idPrev + pwdConfirmId;
                            var pwdId = 'passwordMd5';
                            var pwdFormId = idPrev + pwdId;
                            if ($(pwdConfirmFormId).length > 0) {
                                var passwordMd5Confirm = $.trim($(pwdConfirmFormId).val());
                                var passwordMd5 = $.trim($(pwdFormId).val());
                                if (passwordMd5Confirm === '') {
                                    this.showErrorMsg(pwdConfirmId, 10021501);// 重复密码不能为空
                                    return false;
                                }

                                if (passwordMd5 !== passwordMd5Confirm) {
//								$(pwdConfirmFormId).focus();
                                    this.showErrorMsg(pwdConfirmId, 10021502);// 两次输入密码不一致
                                    return false;
                                }
                                this.removeCss(pwdConfirmFormId);
                                if (!this.isNeedAction()) {
                                    return pwdConfirmId + '=' + this.encodeURI(passwordMd5Confirm);
                                }
                            }
                        };

                        // 后台异步校验图片验证码

                        ValidationUtils.prototype.checkPiccode = function () {
                            var picId = 'pictureCaptcha';
                            var clientImg = 'clientImg=' + $('#' + picId).val();
                            var param = $('#modilecodetxt').val();
                            var type = $('#modilecodetype').val();
                            var formId = $('#realFormId').val();
                            var activedEmailFlag = $('#activedEmailFlag').val();
                            var activedMobileFlag = $('#activedMobileFlag').val();
                            $.getJSON(url.CHECK_PICCODE, clientImg, function (json) {
                                if (json !== null && json !== '') {
                                    if (json.flag) {
                                        if (activedEmailFlag) {
                                            validationUtil.openEmailMask(activedEmailFlag);
                                        }
                                        if (activedMobileFlag) {
                                            validationUtil.openMobileMask();
                                        }
                                        validationUtil.removeCss(picId);
                                        // 获取验证码或者提交表单
                                        param += '&' + clientImg;
                                        if (type === 1) {// 获取手机验证码
                                            // 验证成功, 隐藏遮罩层
                                            validationUtil.displayOrHidden('', '', '');
                                            registerUtil.mobileCode(param, '#', formId);
                                        } else if (type === 2) {// 提交表单
                                            // 如果是表单提交, 则判断是否需要手机校验码
                                            // 并且不是邮箱注册和手机注册
                                            if (mobileShowFlag === 1 && mold !== 1 && mold !== 2) {
                                                validationUtil.displayPic(formId);
                                                registerUtil.mobileCode(param, '#', formId);
                                            } else {// 不需要就直接提交表单
                                                validationUtil.displayOrHidden('', '', '');
                                                registerUtil.formSubmit(param, '#', formId);
                                            }
                                        }
                                        return true;
                                    } else {
                                        if ($('#' + json.data).length > 0) {
                                            validationUtil.showErrorMsg(json.data, json.code);
                                        }
                                        return false;
                                    }
                                }
                            });
                        };

                        // 后台异步校验手机验证码

                        ValidationUtils.prototype.checkMobileCode = function () {
                            var id = 'mobilecaptcha';
                            var param = $('#modilecodetxt').val();
                            var type = $('#modilecodetype').val();
                            var formId = $('#realFormId').val();
                            var butm = 'mobile';
                            if (formId === '' || formId === '#') {
                                butm = '#' + butm;
                            } else {
                                butm = '#' + formId + '_' + butm;
                            }
                            var mobilecode = 'authCode=' + $('#' + id).val() + '&mobile=' + $(butm).val();
                            $.getJSON(url.CHECK_MOBILECODE, mobilecode, function (json) {
                                if (json !== null && json !== '') {
                                    if (json.flag) {
                                        param += '&authCode=' + $('#mobilecaptcha').val();
                                        validationUtil.removeCss(id);
                                        // 验证成功, 隐藏遮罩层
                                        validationUtil.displayOrHidden('', '', '');
                                        // 这里是提交表单
                                        registerUtil.formSubmit(param, '#', formId);
                                        return true;
                                    } else {
                                        if ($('#' + json.data).length > 0) {
                                            validationUtil.showErrorMsg(json.data, json.code);
                                        }
                                        return false;
                                    }
                                }
                            });
                        };
                        // *******************************遮罩层相关js方法start*******************************
                        // 追加遮罩层
                        ValidationUtils.prototype.appendOverlay = function () {
                            if (mold !== 1 && mold !== 2) {// 手机和邮箱例外
                                if ($('#pictureCaptchaView')) {// 如果页面有图片验证码, 则移除
                                    $('#pictureCaptchaView').remove();
                                    $('#pictureCaptcha').remove();
                                    $('#tip_pictureCaptcha').remove();
                                }
                                var maskDiv = '<div id="fvmask" style="display: block;">'
                                    + '<input type="hidden" id="modilecodetxt" value=""/>'
                                    + '<input type="hidden" id="modilecodetype" value=""/>'
                                    + '<input type="hidden" id="realFormId" value=""/>'
                                    + '<div class="mask_bg"></div>'
                                    + '<div id="picCodeDiv" class="main_panel">'
                                    + '<div class="modal-header">'
                                    + '<span onclick="validationUtil.displayOrHidden(\"\",\"\",\"\");" class="close">'
                                    + '</span><h3>图片验证码</h3></div>'
                                    + '<div class="img_wrapper mid" style="left:.8rem">'
                                    + '<img align="center" alt="点击刷新验证码" id="captchaImg" name="captchaImg" '
                                    + 'onclick="javascript:refreshCaptcha()" src=" '
                                    + PASSPORT_DOMAIN + '/account/authCode.htm?r=1412056764448"></div>'
                                    + '<div class="img_reload" onclick="javascript:refreshCaptcha();">看不清换一张</div>'
                                    + '<div class="mid t2_input">'
                                    + '<input id="pictureCaptcha" class="input_kuang code-area errortip item val_m" '
                                    + 'type="text" name="ticket" placeholder="请输入图形中的字符，不区分大小写">'
                                    + '<span id="tip_pictureCaptcha" style="display:none;background: url('
                                    + PASSPORT_DOMAIN
                                    + '/resource/cngold/images/moni_reg_errortb.jpg) no-repeat 3px 12px; '
                                    + 'line-height:18px; max-width:276px; padding: 9px 5px 9px 18px; float:left; '
                                    + 'color:#ab0003; margin-right:-3px;" class="box_ok"><i></i></span>'
                                    + '</div>'
                                    + ' <div class="mid smt_wrapper sub_bg" >'
                                    + '<input onclick="validationUtil.checkPiccode();"'
                                    + 'class="no_bg" type="button" value="提交" id="further_veri"></div>'
                                    + '</div>'
                                    + '<div id="modivCodeDiv" class="main_panel" style="display:none;">'
                                    + '<div class="modal-header">'
                                    + '<span onclick="validationUtil.displayOrHidden(\"\",\"\",\"\");" class="close">'
                                    + '</span><h3>手机验证码</h3></div>'
                                    + '<div class="mid t2_txt"><span id="mobilespan"></span></div>'
                                    + '<div class="mid t2_input">'
                                    + '<input id="mobilecaptcha" type="text" name="captcha" '
                                    + 'class="capInput input_kuang errortip" '
                                    + 'style="display: block;float:left;width:70%;" placeholder="请输入手机收到的校验码" />'
                                    + '<input id="codeButton" type="button" name="" '
                                    + 'value="免费获取校验码" class="free-code" onclick="getMobileAuthCode();">'
                                    + '<span id="tip_mobilecaptcha" class="box_ok"><i></i></span>'
                                    + '</div>'
                                    + ' <div class="mid smt_wrapper sub_bg" >'
                                    + '<input onclick="validationUtil.checkMobileCode();" '
                                    + 'class="no_bg" type="button" value="提交" id="further_veri"></div>'
                                    + '</div>'
                                    + '</div>';
                                var bodys = document.body;
                                var newDiv = document.createElement('div');
                                newDiv.style.display = 'none';
                                newDiv.id = 'maskDivIOnly';
//							newDiv.setAttribute("id", overlayDivId);//TODO
//							newDiv.setAttribute("style", "display:none");
                                newDiv.innerHTML = maskDiv;
                                bodys.appendChild(newDiv);


                            } else if (!$('#pictureCaptchaView') && (mold === 1 || mold === 2)) {// 当为手机注册或者邮箱注册；追加遮罩层,不要手机验证码
                                // if ($("#pictureCaptchaView")) {// 如果页面有图片验证码, 则移除
                                //     $("#pictureCaptchaView").remove();
                                //     $("#pictureCaptcha").remove();
                                //     $("#tip_pictureCaptcha").remove();
                                // }
                                var maskDiv = '<div id="fvmask" style="display: block;">'
                                    + '<input type="hidden" id="modilecodetxt" value=""/>'
                                    + '<input type="hidden" id="modilecodetype" value=""/>'
                                    + '<input type="hidden" id="realFormId" value=""/>'
                                    + '<div class="mask_bg"></div>'
                                    + '<div id="picCodeDiv" class="main_panel">'
                                    + '<div class="modal-header">'
                                    + '<span onclick="validationUtil.displayOrHidden(\"\",\"\",\"\");" class="close">'
                                    + '</span><h3>图片验证码</h3></div>'
                                    + '<div class="img_wrapper mid" style="left:.8rem"> '
                                    + '<img align="center" alt="点击刷新验证码" id="captchaImg" name="captchaImg" '
                                    + 'onclick="javascript:refreshCaptcha()" src="" '
                                    + PASSPORT_DOMAIN + '"/account/authCode.htm?r=1412056764448"></div>'
                                    + '<div class="img_reload" onclick="javascript:refreshCaptcha();">看不清换一张</div>'
                                    + '<div class="mid t2_input">'
                                    + '<input id="pictureCaptcha" class="input_kuang code-area errortip item val_m" '
                                    + 'type="text" name="ticket" placeholder="请输入图形中的字符，不区分大小写">'
                                    + '<span id="tip_pictureCaptcha" style="display:none;background: url("'
                                    + PASSPORT_DOMAIN
                                    + '"/resource/cngold/images/moni_reg_errortb.jpg) no-repeat 3px 12px; '
                                    + 'line-height:18px; max-width:276px; padding: 9px 5px 9px 18px; float:left; '
                                    + 'color:#ab0003; margin-right:-3px;" class="box_ok"><i></i></span>'
                                    + '</div>'
                                    + ' <div class="mid smt_wrapper sub_bg" >'
                                    + '<input onclick="validationUtil.checkPiccode();" '
                                    + 'class="no_bg" type="button" value="提交" id="further_veri"></div>'
                                    + '</div>';
                                var bodys = document.body;
                                var newDiv = document.createElement('div');
                                newDiv.style.display = 'none';
                                newDiv.id = 'maskDivIOnly';
                                newDiv.innerHTML = maskDiv;
                                bodys.appendChild(newDiv);
                            } else {

                            }
                        };

                        /**
                         * PC滑动验证码关闭
                         */
                        ValidationUtils.prototype.closeSlide = function () {
                            $('.verify-fail').css('display', 'none');
                            $('.verify-fail_mobile').css('display', 'none');
                            $('.passport-amazing').hide();

                            var formId = $('#slideFormId').val();
                            var buttonSubmit = 'button_submit';
                            buttonSubmit = '#' + formId + '_' + buttonSubmit;
                            if ($(buttonSubmit).length > 0) {
                                $(buttonSubmit).removeAttr('disabled', 'disabled');
                            }
                        };


                        /**
                         * 添加PC滑动遮罩层
                         */
                        ValidationUtils.prototype.appendSlideLay = function () {
                            var pcSlideDiv = document.createElement('div');
                            pcSlideDiv.className = 'passport-amazing';
                            var newSlideDiv = '<input type=\"hidden\" id=\"slidetxt\" value=\"\"/>'
                                + '<input type=\"hidden\" id=\"slidetype\" value=\"\" />'
                                + '<input type=\"hidden\" id=\"slideFormId\" value=\"\" />'
                                + '<div id=\"modivCodeDiv\" class=\"main_panel\" style=\"display:none;\"></div>'
                                + '<div class=\"passport-popup\"></div>'
                                + '<div class=\"gt_popup_wrap\" onselectstart=\"return false\">'
                                + '	<div class=\"gt_popup_header\">'
                                + '		<div class=\"gt_popup_ready gt_show\">请先完成下方验证</div>'
                                + '		<div class=\"gt_popup_finish gt_hide\">页面将在2秒后跳转</div>'
                                + '<div class=\"gt_pupup_cross\" onclick=\"validationUtil.closeSlide()\">×</div></div>'
                                + '	<div class=\"gt_popup_box\">'
                                + '		<div class=\"gt_widget\" >'
                                + '			<img id=\"wholeImg\" src=\"\"/>'
                                + '			<div id=\"small-scroll-img\" position=\"absolute\" >'
                                + '				<img id=\"repairImg\" src=\"\"  /></div>'
                                + '			<div class=\"gt_bottom\">'
                                + '				<div class=\"verify-success\">验证通过</div>'
                                + '				<div class=\"verify-fail\">验证失败，请拖动滑块悬浮在正确位置</div></div></div>'
                                + '		<div class=\"gt_slider\">'
                                + '			<div class=\"gt_guide_tip gt_show\">按住滑块拖动验证</div>'
                                + '			<div class=\"gt_slider_knob gt_show\"></div></div></div></div>';
                            pcSlideDiv.innerHTML = newSlideDiv;
                            var bodys = document.body;
                            bodys.appendChild(pcSlideDiv);
                        };

                        /**
                         * 添加m滑动遮罩层
                         */
                        ValidationUtils.prototype.appendMSlideLay = function () {
                            var mSlideDiv = document.createElement('div');
                            mSlideDiv.className = 'passport-box-mobile';
                            var newSlideDiv = '<input type=\"hidden\" id=\"slidetxt\" value=\"\"/>'
                                + '<input type=\"hidden\" id=\"slidetype\" value=\"\" />'
                                + '<input type=\"hidden\" id=\"slideFormId\" value=\"\" />'
                                + '<div class=\"passport-mobile-main\"></div>'
                                + '<div class=\"passport-mobile-content\">'
                                + '<div class=\"gt_widget_mobile\">'
                                + '<img id=\"mWholeImg\" src=\"\"/>'
                                + '<div id=\"mobile-scroll-img\">'
                                + '<img id=\"mRepairImg\" src=\"\"/>'
                                + '</div>'
                                + '<div class=\"gt_bottom_mobile\">'
                                + '<div class=\"verify-success_mobile\">验证通过</div>'
                                + '<div class=\"verify-fail_mobile\">验证失败，请拖动滑块悬浮在正确位置</div>'
                                + '</div>'
                                + '</div>'
                                + '<div class=\"gt_slider_mobile\">'
                                + '<div class=\"gt_guide_tip gt_show\">按住滑块拖动验证</div>'
                                + '<div class=\"gt_slider_knob gt_show\"></div>'
                                + '</div>'
                                + '</div>';
                            mSlideDiv.innerHTML = newSlideDiv;
                            var bodys = document.body;
                            bodys.appendChild(mSlideDiv);
                        };

                        // 显示和隐藏遮罩层

                        ValidationUtils.prototype.displayOrHidden = function (param, type, formId) {
                            if (formId === '' || formId === undefined) {
                                formId = $('#realFormId').val();
                            }
                            var divId = '#maskDivIOnly';
                            if ($(divId)) {
                                $('#modilecodetxt').val(param);
                                $('#modilecodetype').val(type);
                                $('#realFormId').val(formId);
                                if ($(divId).css('display') === 'none') {
                                    $(divId).css('display', 'block');
                                    // 如果弹出遮罩层, 并且不需要图片验证码, 那就把图片验证码隐藏
                                    if (captchaShowFlag === 0) {
                                        this.displayPic(formId);
                                        // 如果是不需要图片验证码, 但是需要手机校验码就直接手机校验码了
                                        if (mobileShowFlag === 1) {// && $('#codeButton').val().indexOf('重新发送') < 0
                                            registerUtil.mobileCode(param, '#', formId);
                                        }
                                    } else {
                                        validationUtil.refreshCaptcha();
                                        // 弹出层的时候如果是需要图片验证码的话, 先入库
                                        registerUtil.secretFormSubmit(param);
                                    }
                                } else {
                                    var buttonSubmit = 'button_submit';
                                    if (formId === '' || formId === '#') {
                                        buttonSubmit = '#' + buttonSubmit;
                                    } else {
                                        buttonSubmit = '#' + formId + '_' + buttonSubmit;
                                    }
                                    $('#pictureCaptcha').val('');
                                    $('#mobilecaptcha').val('');
                                    $('#mobilespan').val('');
                                    $(divId).css('display', 'none');
                                    if ($(buttonSubmit).length > 0) {
                                        $(buttonSubmit).removeAttr('disabled', 'disabled');
                                    }
                                    // 将手机验证码暂时隐藏, 将图片验证码放第一步
                                    $('.main_panel').eq(1).hide();
                                    $('.main_panel').eq(0).show();
                                }
                                this.removeCss('pictureCaptcha');
                                this.removeCss('mobilecaptcha');
                            }
                        };

                        // 隐藏图片验证码, 显示手机校验码

                        ValidationUtils.prototype.displayPic = function (formId) {
                            $('.main_panel').eq(0).hide();
                            $('.main_panel').eq(1).show();
                            // 将手机号码填入提示框
                            var butm = 'mobile';
                            if (formId === '' || formId === '#') {
                                butm = '#' + butm;
                            } else {
                                butm = '#' + formId + '_' + butm;
                            }
                        };
                        // *******************************遮罩层相关js方法end*******************************
                        // *******************************滑动验证pc/m相关js方法start*******************************
                        /**
                         * 加载pc端滑动验证的js
                         */
                        ValidationUtils.prototype.pcSlideLoad = function () {
                            $('#wholeImg').attr('src', PASSPORT_DOMAIN
                                + '/image/background.htm?r=' + new Date().getTime());
                            $('#repairImg').attr('src', PASSPORT_DOMAIN
                                + '/image/buffImg.htm?r=' + new Date().getTime());

                            var $div = $('.gt_slider_knob');
                            var offsetpa = $('.gt_slider').offset();
                            var x;


                            $div.mousedown(function (e) {
                                $('.gt_guide_tip').hide();
                                var offsetpa = $('.gt_slider').offset();
                                var x = e.clientX - offsetpa.left;
                                document.onmousemove = function (e) {
                                    $('.gt_widget_hide').show();
                                    var _X = e.clientX - x - offsetpa.left + 'px';
                                    var y = parseInt(_X, 0);
                                    // 可移动距离250px
                                    if (y <= 0) {
                                        $('.gt_slider_knob').css({'left': 0});
                                        $('#small-scroll-img').css({'left': 0, 'opacity': 1});
                                    } else if (y >= 244) {
                                        $('.gt_slider_knob').css({'left': 244 + 'px'});
                                        $('#small-scroll-img').css({'left': 244 + 'px', 'opacity': 1});
                                    } else {
                                        $('.gt_slider_knob').css({'left': _X});
                                        $('#small-scroll-img').css({'left': _X, 'opacity': 1});
                                    }

                                    document.onmouseup = function () {
                                        document.onmousemove = null;
                                        var _X = e.clientX - x - offsetpa.left + 'px';
                                        var y = parseInt(_X, 0);
                                        validationUtil.slideCheck(y);
                                    };


                                };

                            });

//		      /* 绑定鼠标左键按住事件 */
//		      $div.bind('mousedown',function(event) {
//		        /* 获取需要拖动节点的坐标 */
//				 x = event.clientX ;
//		        /* 获取当前鼠标的坐标 */
//		        var mouse_x = event.clientX;
//		       // var mouse_y = event.pageY;
//		        /* 绑定拖动事件 */
//		        $div.bind('mousemove',function(e) {
//		          /* 计算鼠标移动了的位置 */
//		          var _x = e.clientX - mouse_x;
//		          /* 设置移动后的元素坐标 */
//		          var _x = e.clientX - x - offsetpa.left + 'px';
//				  var y = parseInt(_x);
//		          /* 改变目标元素的位置 */
//		          if (y<=0) {
//						$('.gt_slider_knob').css({'left': 0});
//						$('#small-scroll-img').css({'left': 0,'opacity':1});
//					} else if (y>=270) {
//						$('.gt_slider_knob').css({'left': 270+'px'});
//						$('#small-scroll-img').css({'left': 270+'px','opacity':1});
//					} else {
//						$('.gt_slider_knob').css({'left': _x});
//						$('#small-scroll-img').css({'left': _x,'opacity':1});
//					}
//		        });
//		      });
//		      /* 当鼠标左键松开，接触事件绑定 */
//		      $div.bind('mouseup',function(e) {
//		        $(this).unbind('mousemove');
//				var _x = e.clientX - x - offsetpa.left + 'px';
//				var y = parseInt(_x);
//				validationUtil.slideCheck(y);
//
//		      });

                        };

                        /**
                         * 加载m端滑动验证的js
                         */
                        ValidationUtils.prototype.mSlideLoad = function () {
                            // $('#wholeImg').attr('src', PASSPORT_DOMAIN+'/image/background.htm?r=' + new Date().getTime());
                            // $('#repairImg').attr('src', PASSPORT_DOMAIN+'/image/buffImg.htm?r=' + new Date().getTime());

                            // var imgSrc = '验证码图片/' + randomNum(10, 20) + '.png';
                            $('#mWholeImg').attr('src', PASSPORT_DOMAIN + '/image/background.htm?r='
                                + new Date().getTime());
                            $('#mRepairImg').attr('src', PASSPORT_DOMAIN + '/image/buffImg.htm?r='
                                + new Date().getTime());
                            $('#password_mobile_button').click(function () {
                                $('.passport-mobile-main').show();
                                $('.passport-mobile-content').show();
                            });

//                            touch.on('.gt_slider_knob', 'touchstart', function (ev) {
//                                $('#mobile-scroll-img>img').css('opacity', '1');
                                // $('#mRepairImg').attr('src', PASSPORT_DOMAIN+'/image/buffImg.htm?r=' + new Date().getTime());

//                                ev.preventDefault();
//                            });
                            var dx;
//                            touch.on('.gt_slider_knob', 'drag', function (ev) {
//                                $('.gt_guide_tip').hide();
//                                dx = dx || 0;
//                                var offx = dx + ev.x + 'px';
//                                var dy = parseInt(offx, 0);
//                                if (dy <= 0) {
//                                    $('.gt_slider_knob').css({'left': 0});
//                                    $('#mobile-scroll-img').css({'left': 0, 'opacity': 1});
//                                } else if (dy >= 244) {
//                                    $('.gt_slider_knob').css({'left': 244 + 'px'});
//                                    $('#mobile-scroll-img').css({'left': 244 + 'px', 'opacity': 1});
//                                } else {
//                                    $('.gt_slider_knob').css({'left': offx});
//                                    $('#mobile-scroll-img').css({'left': offx, 'opacity': 1});
//                                }
//                            });
//                            touch.on('.gt_slider_knob', 'dragend', function (ev) {
//                                dx += ev.x;
//                                console.log(dx);
//                                var mIsCheck = validationUtil.mSlideCheck(dx);
//                                if (!mIsCheck) {
//                                    dx = 0;
//                                }
//                            });

                        };




                        // 滑动验证校验M

                        ValidationUtils.prototype.mSlideCheck = function (y) {
                            y = Math.floor(y);// 取整
                            var x = 'x=' + y;

                            $.getJSON(url.CHECK_SLIDE_CODE, x, function (data) {
                                if (data !== null && data !== '') {
                                    if (data.flag) {
//	       					document.mouseup = null;
//	                        $('.verify-success').css('display','block');
//	                        $('.verify-fail').css('display','none');

                                        // 这里是发送验证码
                                        var authCodeUrl = $('#slidetxt').val();
                                        var type = $('#slidetype').val();
                                        var formId = $('#slideFormId').val();

                                        $('.verify-success_mobile').show();
                                        $('.verify-fail_mobile').hide();
                                        $('.passport-mobile-main').hide();
                                        $('.passport-mobile-content').hide();

                                        if (mold === 2) {
                                            registerUtil.mobileCode(authCodeUrl, '#', formId);
                                        } else if (mold === 1) {
                                            isSlideSuccess = 1;
                                            serviceRegisterFormSubmit();
                                        } else {
                                            if (type === 1) {// 获取手机验证码
                                                registerUtil.mobileCode(authCodeUrl, '#', formId);
                                            } else if (type === 2) {// 提交表单
                                                // 如果是表单提交, 则判断是否需要手机校验码
                                                // 并且不是邮箱注册和手机注册
                                                if (mobileShowFlag === 1
                                                    && $('#maskDivIOnly').css('display') === 'none'
                                                    && $('#' + (formId === '#' ? '' : formId) + '_'
                                                        + 'codeButton').length <= 0) {
                                                    validationUtil.displayOrHidden(authCodeUrl, 2, formId);
                                                } else if ($('#maskDivIOnly').css('display') === 'block'
                                                    || $('#' + (formId === '#' ? '' : formId)
                                                        + '_' + 'codeButton').length > 0) {
                                                    registerUtil.mobileCode(authCodeUrl, '#', formId);
                                                } else {// 不需要就直接提交表单
                                                    registerUtil.formSubmit(authCodeUrl, '#', formId);
                                                }
                                            }
                                        }

                                        $('.verify-success_mobile').hide();
                                        $('#mobile-scroll-img').css({'left': 0, 'opacity': 1});
                                        $('.gt_slider_knob').animate({left: 0}, 100);
                                        $('#mobile-scroll-img').animate({left: 0}, 100);

                                        $('#mWholeImg').attr('src', PASSPORT_DOMAIN
                                            + '/image/background.htm?r=' + new Date().getTime());
                                        $('#mRepairImg').attr('src', PASSPORT_DOMAIN
                                            + '/image/buffImg.htm?r=' + new Date().getTime());
                                        $('#mobile-scroll-img').css({
                                            'left': 0,
                                            'opacity': 1,
                                            'width': data.data.shapeImgWidth + 'px',
                                            'height': data.data.shapeImgHeight + 'px',
                                            'top': data.data.y + 'px'
                                        });
                                        $('.verify-success').css('display', 'none');
                                        $('.gt_guide_tip').show();

                                        return true;
                                    } else {
                                        $('#mWholeImg').attr('src', PASSPORT_DOMAIN
                                            + '/image/background.htm?r=' + new Date().getTime());
                                        $('#mRepairImg').attr('src', PASSPORT_DOMAIN
                                            + '/image/buffImg.htm?r=' + new Date().getTime());
                                        $('#mobile-scroll-img').css({
                                            'left': 0,
                                            'opacity': 1,
                                            'width': data.data.shapeImgWidth + 'px',
                                            'height': data.data.shapeImgHeight + 'px',
                                            'top': data.data.y + 'px'
                                        });
                                        $('.verify-success_mobile').hide();
                                        $('.verify-fail_mobile').show();
                                        $('.gt_guide_tip').show();
                                        $('.gt_slider_knob').animate({left: 0}, 100);
                                        $('#mobile-scroll-img').animate({left: 0}, 100);
                                        return false;

                                    }
                                }

                            });


                        };



                         // 滑动验证校验PC

                        ValidationUtils.prototype.slideCheck = function (y) {
                            var x = 'x=' + y;
                            $.getJSON(url.CHECK_SLIDE_CODE, x, function (data) {
                                if (data !== null && data !== '') {
                                    if (data.flag) {
                                        document.onmouseup = null;
                                        $('.verify-success').css('display', 'block');
                                        $('.verify-fail').css('display', 'none');

                                        // mold == 2发送验证码；mold == 1获取注册
                                        var authCodeUrl = $('#slidetxt').val();
                                        var type = $('#slidetype').val();
                                        var formId = $('#slideFormId').val();
                                        $('.gt_popup_wrap').hide();
                                        $('.passport-popup').hide();
                                        if (mold === 2) {
                                            registerUtil.mobileCode(authCodeUrl, '#', formId);
                                        } else if (mold === 1) {
                                            isSlideSuccess = 1;
                                            serviceRegisterFormSubmit();
                                        } else {
                                            if (type === 1) {// 获取手机验证码
                                                registerUtil.mobileCode(authCodeUrl, '#', formId);
                                            } else if (type === 2) {// 提交表单
                                                // 如果是表单提交, 则判断是否需要手机校验码
                                                // 并且不是邮箱注册和手机注册
                                                if (mobileShowFlag === 1
                                                    && $('#maskDivIOnly').css('display') === 'none'
                                                    && $('#' + (formId === '#' ? '' : formId)
                                                        + '_' + 'codeButton').length <= 0) {
                                                    validationUtil.displayOrHidden(authCodeUrl, 2, formId);
                                                } else if ($('#maskDivIOnly').css('display') === 'block'
                                                    || $('#' + (formId === '#' ? '' : formId)
                                                        + '_' + 'codeButton').length > 0) {
                                                    registerUtil.mobileCode(authCodeUrl, '#', formId);
                                                } else {// 不需要就直接提交表单
                                                    registerUtil.formSubmit(authCodeUrl, '#', formId);
                                                }
                                            }
                                        }

                                        $('#small-scroll-img').css({'left': 0, 'opacity': 1});
                                        $('.gt_slider_knob').animate({left: 0}, 100);

                                        $('#wholeImg').attr('src', PASSPORT_DOMAIN
                                            + '/image/background.htm?r=' + new Date().getTime());
                                        $('#repairImg').attr('src', PASSPORT_DOMAIN
                                            + '/image/buffImg.htm?r=' + new Date().getTime());
                                        $('#small-scroll-img').css({
                                            'left': 0,
                                            'opacity': 1,
                                            'width': data.data.shapeImgWidth + 'px',
                                            'height': data.data.shapeImgHeight + 'px',
                                            'top': data.data.y + 'px'
                                        });
                                        $('.verify-success').css('display', 'none');
                                        $('.gt_guide_tip').show();

                                        return true;
                                    } else {
                                        document.onmouseup = null;
                                        $('#wholeImg').attr('src', PASSPORT_DOMAIN
                                            + '/image/background.htm?r=' + new Date().getTime());
                                        $('#repairImg').attr('src', PASSPORT_DOMAIN
                                            + '/image/buffImg.htm?r=' + new Date().getTime());
                                        $('.gt_slider_knob').animate({left: 0}, 100);
                                        $('#small-scroll-img').css({
                                            'left': 0,
                                            'opacity': 1,
                                            'width': data.data.shapeImgWidth + 'px',
                                            'height': data.data.shapeImgHeight + 'px',
                                            'top': data.data.y + 'px'
                                        });
                                        $('.verify-success').css('display', 'none');
                                        $('.verify-fail').css('display', 'block');
                                        $('.gt_guide_tip').show();
                                        return false;
                                    }
                                }
                            });


                        };

                        /**
                         * PC加载滑动验证图片初始化的js
                         */
                        ValidationUtils.prototype.pcSlidePicLoad = function () {

                            $.getJSON(url.INIT_SLIDE_CODE, function (data) {
                                if (data !== null && data !== '') {
                                    if (data.flag) {
                                        $('#small-scroll-img').css({
                                            'left': 0,
                                            'opacity': 1,
                                            'width': data.data.shapeImgWidth + 'px',
                                            'height': data.data.shapeImgHeight + 'px',
                                            'top': data.data.y + 'px'
                                        });
                                        validationUtil.pcSlideLoad();// 加载PC滑动功能
                                    }
                                }
                            });

                        };

                        /**
                         * M加载滑动验证图片初始化的js
                         */
                        ValidationUtils.prototype.mSlidePicLoad = function () {

                            $.getJSON(url.INIT_SLIDE_CODE, function (data) {
                                if (data !== null && data !== '') {
                                    if (data.flag) {
                                        $('#mobile-scroll-img').css({
                                            'left': 0,
                                            'opacity': 1,
                                            'width': data.data.shapeImgWidth + 'px',
                                            'height': data.data.shapeImgHeight + 'px',
                                            'top': data.data.y + 'px'
                                        });
                                        validationUtil.mSlideLoad();// 加载M滑动功能
                                    }
                                }
                            });

                        };


                        // *******************************滑动验证pc/m相关js方法end*******************************
                    }// ValidationUtils func end -.-
                    return {ValidationUtils: ValidationUtils};
                })()// ValidationUtils end
            }// passport end
        }// cngold end
    });

    /**
     * 表单提交相关方法
     */
    __namespace__({
        org: {
            cngold: {
                passport: (function () {
                    function RegisterUtils() {

                        // rtn不为undefined 则authCodeUrl加上rtn

                        RegisterUtils.prototype.isUndefined = function (authCodeUrl, rtn) {
                            if (rtn !== undefined) {
                                authCodeUrl += '&' + rtn;
                            }
                            return authCodeUrl;
                        };

                        // 发送短信验证码

                        RegisterUtils.prototype.getMobileAuthCode = function (formId) {
                            var idPrev = '#';
                            if (formId && formId !== '#') {
                                idPrev = '#' + formId + '_';
                            }
                            needAction = 0; // 不需要后台验证
                            var authCodeUrl = '';
                            // 真实姓名
                            var rtn = validationUtil.checkRealName(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);

                            // 手机号码
                            rtn = validationUtil.checkMobile(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // fromUrl
                            authCodeUrl = authCodeUrl + '&fromUrl='
                                + encodeURIComponent(validationUtil.getFromUrl(idPrev));
                            // referrer
                            if ($(idPrev + 'referrer').length > 0) {
                                var referrer = $(idPrev + 'referrer').val();
                                if (referrer && referrer !== '') {
                                    authCodeUrl += '&referrer=' + validationUtil.splitReferrer(referrer);
                                }
                            }
                            // 昵称
                            if ($(idPrev + 'nickname').length > 0) {
                                if ($(idPrev + 'tip_nickname').length > 0) {
                                    if ($(idPrev + 'tip_nickname').html() !== '') {
                                        return false;
                                    }
                                    rtn = validationUtil.checkNickname(idPrev);
                                    if (rtn === false) {
                                        return rtn;
                                    }
                                    authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                                }
                            }
                            // qq
                            rtn = validationUtil.checkQq(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // 邮箱
                            rtn = validationUtil.checkEmail(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // registerType
                            if ($(idPrev + 'registerType').length > 0) {
                                var registerType = $.trim($(idPrev + 'registerType').val());
                                authCodeUrl += '&registerType=' + validationUtil.encodeURI(registerType);
                            }
                            // 简介
                            if ($(idPrev + 'btg').length > 0) {
                                var btg = $.trim($(idPrev + 'btg').val());
                                if (btg !== '') {
                                    authCodeUrl += '&btg=' + btg;
                                }
                            }
                            // 聊天记录
                            if ($(idPrev + 'chatLog').length > 0) {
                                var chatLog = $.trim($(idPrev + 'chatLog').val());
                                if (chatLog !== '') {
                                    authCodeUrl += '&chatLog=' + chatLog;
                                }
                            }
                            // 如果是mold=1或者2, 注册的话就走下面. 否则弹出遮罩层
                            if (mold === 1 || mold === 2) {// 注册走下面
                                // 发送手机验证码, mold用来判断是否是手机或者邮箱注册, 然后判断图片验证码用
                                authCodeUrl += '&mold=' + mold;
                                if (captchaShowFlag === 1) {// 如果需要图片验证码, 则显示图片验证码的层
                                    // 发送验证码弹出层的到时候, 先入库
//							this.secretFormSubmit(authCodeUrl);
                                    // 弹出层. (表单参数和类型<1获取手机验证码,2提交表单>)
                                    if ($('#pictureCaptchaView')) {
                                        var pictureCaptcha = $.trim($(idPrev + 'pictureCaptcha').val());
                                        if (pictureCaptcha === '') {
                                            validationUtil.refreshCaptcha();
                                            $(idPrev + 'pictureCaptcha').focus();
                                            validationUtil.showErrorMsg('pictureCaptcha', 10020301);// 验证码不能为空
                                            return false;
                                        } else {
                                            validationUtil.removeCss('pictureCaptcha');
                                            authCodeUrl += '&clientImg=' + pictureCaptcha;
                                            this.mobileCode(authCodeUrl, idPrev, formId);
                                        }
                                        return;
                                    }
                                    if ($('#maskDivIOnly').css('display') === 'none') {
                                        validationUtil.displayOrHidden(authCodeUrl, 1, formId);
                                    } else if (captchaShowFlag === 1) {// 如果需要图片验证码, 则继续返回图片验证码界面
                                        $('.main_panel').eq(1).hide();
                                        $('.main_panel').eq(0).show();
                                        validationUtil.refreshCaptcha();
                                        $('#pictureCaptcha').val('');
                                    } else {// 直接发送手机校验码
                                        this.mobileCode(authCodeUrl, idPrev, formId);
                                    }
                                    return false;
                                } else if (sildeType === 1) {
                                    $('.passport-amazing').show();
                                    $('.gt_popup_wrap').show();
                                    $('.passport-popup').show();
                                    $('.passport-mobile-main').show();
                                    $('.passport-mobile-content').show();
                                    $('#slidetxt').val(authCodeUrl);
                                    $('#slidetype').val(1);
                                    $('#slideFormId').val(formId);

                                    return false;
                                }

                                // 发送手机验证码
                                this.mobileCode(authCodeUrl, idPrev, formId);
                            } else {
                                if (captchaShowFlag === 1) {// 如果需要图片验证码, 则显示图片验证码的层
                                    // 发送验证码弹出层的到时候, 先入库
//							this.secretFormSubmit(authCodeUrl);
                                    // 弹出层. (表单参数和类型<1获取手机验证码,2提交表单>)
                                    if ($('#maskDivIOnly').css('display') === 'none') {
                                        validationUtil.displayOrHidden(authCodeUrl, 1, formId);
                                    } else if (captchaShowFlag === 1) {// 如果需要图片验证码, 则继续返回图片验证码界面
                                        $('.main_panel').eq(1).hide();
                                        $('.main_panel').eq(0).show();
                                        validationUtil.refreshCaptcha();
                                        $('#pictureCaptcha').val('');
                                    } else {// 直接发送手机校验码
                                        this.mobileCode(authCodeUrl, idPrev, formId);
                                    }
                                } else if (sildeType === 1) {// 如果需要滑动验证，则显示滑动验证遮罩层
                                    $('#maskDivIOnly').css('display', 'none');
                                    $('.passport-amazing').show();
                                    $('.gt_popup_wrap').show();
                                    $('.passport-popup').show();
                                    if ($('#slidetxt').val() === '') {
                                        $('#slidetxt').val(authCodeUrl);
                                    }
                                    if ($('#slidetype').val() === '') {
                                        $('#slidetype').val(1);
                                    }
                                    if ($('#slideFormId').val() === '') {
                                        $('#slideFormId').val(formId);
                                    }
                                } else {// 不需要图片验证码就直接发送手机验证码
                                    if ($('#modivCodeDiv').css('display') === 'block') {
                                        var param = $('#modilecodetxt').val();
                                        authCodeUrl = param;
                                    }
                                    // 发送手机验证码
                                    this.mobileCode(authCodeUrl, idPrev, formId);
                                }
                            }
                        };


                         // 请求手机验证码

                        RegisterUtils.prototype.mobileCode = function (param, idPrev, formId) {
                            startCountDown(formId);// 立即开始倒计时
                            var idPre = '#';
                            if (formId && formId !== '#') {
                                idPre = '#' + formId + '_';
                            }
                            $.getJSON(url.MOBILE_CODE, param, function (json) {
                                // 提交表单之后, 设置表单需要后台异步校验
                                needAction = 1;
                                if (json !== null && json !== '') {
                                    // 往金投统计发送数据
                                    var param = 'cngoldstat=' + getCookieCngoldId() + '&cngoldid='
                                        + json.data.cngoldid + '&flag=' + json.data.flag + '&step='
                                        + json.data.step + '&result=' + json.flag + '&message=' + json.msg;
                                    $.getJSON(url.ANA_SEND, param, function (json) {
                                        var result = json.result;

                                    });
                                    if (json.flag) {
//								if (mobileCaptchaShowFlag == 1) {
//									validationUtil.refreshCaptcha();
//								}
                                        if ($('#modivCodeDiv').css('display') === 'none'
                                            || $('#modivCodeDiv').css('display') === undefined) {
                                            alert('手机校验码已发至您的手机，请查收');
                                        } else {
                                            var mobile = $(idPre + 'mobile').val();
                                            $('#mobilespan').html('我们向您的手机  ' + mobile.substring(0, 3) + '****'
                                                + mobile.substring(7, 11) + ' 发送了一条验证短信');
                                        }
                                        // captchaShowFlag = 1;// 手机验证码发送之后, 设置为1
                                        // 临时表ID用于存服务申请记录表ID
                                        $('#temporaryMemberId').val(json.data.temporaryMemberId);
                                        // 发送手机号码后，调用ajax去测试，是否需要图片验证码 v1.3.3不需要
//								$.getJSON(url.CHECK_IP, function(json) {
//									if (json !== null && json !== '') {
//										if (json.flag) {
//											mobileCaptchaShowFlag = 1;
//										}
//									}
//								});
                                        if (typeof(evil('onSendAuthCodeSuccess')) === 'function') {
                                            evil('onSendAuthCodeSuccess(formId)');
                                        }
                                        if ($('#tip_mobilecaptcha').length > 0) {
                                            $('#tip_mobilecaptcha').html('');
                                            $('#tip_mobilecaptcha').css('display', 'none');
                                        }
                                        return;
                                    }
                                    // 结束倒计时
                                    regainCodeButton(formId);
                                    if (json.data && json.data.id) {
                                        if (json.data.id === 'pictureCaptcha') {
                                            mobileShowFlag = 1;
                                            validationUtil.refreshCaptcha();
                                        }
//								$(idPrev+json.data.id).focus();
                                        // 发送手机验证码异常, 如果是层显示则隐藏遮罩层
                                        if ($('#maskDivIOnly').css('display') === 'block') {
                                            // validationUtil.displayOrHidden('', '', '');
                                            // 直接将错误显示在页面
//									$('#tip_mobilecaptcha').html(validationUtil.getErrorMsg(json.code));
//									$('#tip_mobilecaptcha').addClass('box_error');
//									$('#tip_mobilecaptcha').removeClass('box_ok');
//									$('#tip_mobilecaptcha').css('display', 'block');
                                            $('#mobilespan').html(validationUtil.getErrorMsg(json.code));
                                        } else {
                                            validationUtil.showErrorMsg(json.data.id, json.code, formId);
                                        }
                                    } else {
                                        // 程序异常, TODO
                                        alert(json.msg);
                                    }
                                    return false;
                                }
                            });
                        };


                        // 修改密码提交表单

                        RegisterUtils.prototype.modifySubmit = function (formId) {
                            needAction = 0; // 不需要后台验证
                            var idPrev = '#';
                            if (formId && formId !== '#') {
                                idPrev = '#' + formId + '_';
                            }
                            if ($(idPrev + 'button_submit').length > 0) {
                                $(idPrev + 'button_submit').attr('disabled', 'disabled');
                            }
                            var authCodeUrl = '';
                            // 密码
                            var rtn;
                            rtn = validationUtil.checkPasspwordMd5(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // 重复密码
                            rtn = validationUtil.checkPasspwordMd5Confirm(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            // 账号
                            var username = $('#clientUsername').val();
                            if (username === '') {
                                $('#usernameTip').html('账号为空！');
                                $('#usernameTip').show();
                                return;
                            }

                            var linkType = $('#linkType').val();
                            var passwordMd5Confirm = encodeURIComponent($.trim($('#passwordMd5_confirm').val()));
                            var url = 'reset.htm?callback=?';
                            var data = 'passwordMd5=' + passwordMd5Confirm + '&clientUsername=' + username
                                + '&linkType=' + linkType;
                            $.getJSON(url, data, function (json) {
                                if (json.flag) {
                                    if (json.data && json.data.dzUrl) {
                                        $.getScript(json.data.dzUrl, function () {
                                        });
                                    }
                                    alert(json.msg);
                                    $('#spikForm').submit();
                                } else {
                                    alert(json.msg);
                                }
                            });
                        };

                        // qq登陆提交方法

                        RegisterUtils.prototype.qqSubmit = function (formId) {
                            var idPrev = '#';
                            if (formId && formId !== '#') {
                                idPrev = '#' + formId + '_';
                            }
                            if ($(idPrev + 'serviceCheckbox').length > 0) {
                                if (!$('#serviceCheckbox').attr('checked')) {
                                    alert('请选择同意服务条款和保密协议');
                                    return false;
                                }
                            }
                            if ($(idPrev + 'button_submit').length > 0) {
                                $(idPrev + 'button_submit').attr('disabled', 'disabled');
                            }
                            var authCodeUrl = '';
                            // 昵称
                            var rtn = validationUtil.checkNickname(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            var registerUrl = $('#registerUrl').val();
                            $('#addForm').ajaxSubmit({
                                url: registerUrl,
                                type: 'post',
                                dataType: 'json',
                                success: function (data) {
                                    // 登录成功，转向目标页面
                                    if (data.flag) {
                                        if (data.data.dz) {
                                            if (data.data.dz.flag) {
                                                $.getScript(data.data.dz.url, function () {
                                                    // alert('恭喜注册成功');
                                                    document.location.href = data.data.url + '?service=';
                                                    return;
                                                });
                                            } else {
                                                // discuz登录失败
                                            }
                                        }
                                        alert('恭喜注册成功');
                                        document.location.href = data.data.url + '?service=';
                                        return;
                                    }
                                }
                            });
                        };

                         // 注册提交表单

                        RegisterUtils.prototype.register = function (formId) {
                            needAction = 0; // 不需要后台验证
                            var idPrev = '#';
                            if (formId && formId !== '#') {
                                idPrev = '#' + formId + '_';
                            }
                            if ($(idPrev + 'serviceCheckbox').length > 0) {
                                if (!$('#serviceCheckbox').attr('checked')) {
                                    alert('请选择同意服务条款和保密协议');
                                    return false;
                                }
                            }
                            if ($(idPrev + 'button_submit').length > 0) {
                                $(idPrev + 'button_submit').attr('disabled', 'disabled');
                            }
                            var authCodeUrl = '';
                            // 真实姓名
                            var rtn = validationUtil.checkRealName(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // 昵称
                            var rtn = validationUtil.checkNickname(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // 登录名
                            var rtn = validationUtil.checkLoginName(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // 性别
                            if ($(idPrev + 'sex').length > 0) {
                                var sex = $(idPrev + 'sex').val();
                                if (sex === '先生') {
                                    sex = '2';
                                }
                                if (sex === '女士') {
                                    sex = '3';
                                }
                                authCodeUrl += '&sex=' + sex;
                            }
                            // 身份证
                            var rtn = validationUtil.checkIdentityCard(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // 手机号码
                            rtn = validationUtil.checkMobile(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // 邮箱
                            rtn = validationUtil.checkEmail(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // 密码
                            rtn = validationUtil.checkPasspwordMd5(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);
                            // 重复密码
                            rtn = validationUtil.checkPasspwordMd5Confirm(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            // fromUrl
                            if ($(idPrev + 'fromUrl').length > 0) {
                                var fromUrl = $(idPrev + 'fromUrl').val();
                                if (fromUrl && fromUrl !== '') {
                                    authCodeUrl += '&fromUrl=' + encodeURIComponent(validationUtil.getFromUrl(idPrev));
                                }
                            }
                            // referrer
                            if ($(idPrev + 'referrer').length > 0) {
                                var referrer = $(idPrev + 'referrer').val();
                                if (referrer && referrer !== '') {
                                    authCodeUrl += '&referrer=' + validationUtil.splitReferrer(referrer);
                                }
                            }
                            // registerType
                            if ($(idPrev + 'registerType').length > 0) {
                                var registerType = $(idPrev + 'registerType').val();
                                if (registerType && registerType !== '') {
                                    authCodeUrl += '&registerType=' + validationUtil.encodeURI(registerType);
                                }
                            }
                            // qq
                            rtn = validationUtil.checkQq(idPrev);
                            if (rtn === false) {
                                return rtn;
                            }
                            authCodeUrl = this.isUndefined(authCodeUrl, rtn);

                            if ($(idPrev + 'temporaryMemberId').length > 0) {
                                // 中间表id
                                var temporaryMemberId = $(idPrev + 'temporaryMemberId').val();
                                if (temporaryMemberId !== '') {
                                    authCodeUrl += '&temporaryMemberId=' + temporaryMemberId;
                                }
                            }
                            var str = '';
                            if (formId && formId !== '#') {// 兼容多表单
                                $('#' + formId).find('[name$="attentionVariety"]:checkbox:checked').each(function () {
                                    str += $(this).val() + ',';
                                });
                            } else {
                                $('[name$="attentionVariety"]:checkbox:checked').each(function () {
                                    str += $(this).val() + ',';
                                });
                            }
                            if (str.length > 0) {
                                str = str.substring(0, str.length - 1);
                                authCodeUrl += '&attentionVariety=' + str;
                            }
                            // var maskboolean = false;
                            // 页面有就传到后台
                            if ($(idPrev + 'captcha').length > 0) {
                                var captcha = $.trim($(idPrev + 'captcha').val());
                                if (captcha === '') {
                                    $(idPrev + 'captcha').focus();
                                    validationUtil.showErrorMsg('captcha', 10020401, idPrev + 'captcha');// 校验码不能为空
                                    return false;
                                }
                                validationUtil.removeCss('captcha');
                                authCodeUrl = authCodeUrl + '&authCode=' + captcha;
                            } else {
                                if ((mold === 1 && isSlideSuccess !== 1) || mold === 2) {// 注册走下面
                                    // mold用来判断是否是手机或者邮箱注册, 然后判断图片验证码用
                                    authCodeUrl += '&mold=' + mold;
                                    if (captchaShowFlag === 1) {// 如果需要图片验证码, 则显示图片验证码的层
                                        // 发送验证码弹出层的到时候, 先入库
//							this.secretFormSubmit(authCodeUrl);
                                        // 弹出层. (表单参数和类型<1获取手机验证码,2提交表单>)
                                        if ($('#maskDivIOnly').css('display') === 'none') {
                                            validationUtil.displayOrHidden(authCodeUrl, 2, formId);
                                        } else if (captchaShowFlag === 1) {// 如果需要图片验证码, 则继续返回图片验证码界面
                                            $('.main_panel').eq(1).hide();
                                            $('.main_panel').eq(0).show();
                                            validationUtil.refreshCaptcha();
                                            $('#pictureCaptcha').val('');
                                        }
                                        return false;
                                    } else if (sildeType === 1) {
                                        $('.passport-amazing').show();
                                        $('.gt_popup_wrap').show();
                                        $('.passport-popup').show();
                                        $('.passport-mobile-main').show();
                                        $('.passport-mobile-content').show();
                                        $('#slidetxt').val(authCodeUrl);
                                        $('#slidetype').val(2);
                                        $('#slideFormId').val(formId);

                                        return false;
                                    }
                                } else if (mold !== 1 && mold !== 2) {// 不是注册走下面
                                    // mold用来判断是否是手机或者邮箱注册, 然后判断图片验证码用
                                    authCodeUrl += '&mold=' + mold;
                                    if (captchaShowFlag === 1) {

                                    } else if (sildeType === 1) {
                                        $('.passport-amazing').show();
                                        $('.gt_popup_wrap').show();
                                        $('.passport-popup').show();
                                        $('.passport-mobile-main').show();
                                        $('.passport-mobile-content').show();
                                        $('#slidetxt').val(authCodeUrl);
                                        $('#slidetype').val(2);
                                        $('#slideFormId').val(formId);

                                        return false;
                                    }
                                }

                            }
                            var propFlag = true;
                            var index = 0;
                            if ($('.propInput').length !== undefined) {
                                // identityCard、身份证、330624199005110000
                                $('.propInput').each(function (idx) {
                                    if ($(this).attr('prop_must') === '1' && $(this).val() === '') {
                                        $(this).focus();
                                        $('#tip_' + $(this).attr('prop_key')).removeClass('box_ok');
                                        $('#tip_' + $(this).attr('prop_key')).addClass('box_error');
                                        $('#tip_' + $(this).attr('prop_key')).html($(this).attr('prop_name') + '不能为空');
                                        propFlag = false;
                                        return false;
                                    } else {
                                        if ($(this).val().length > 120) {
                                            $('#tip_' + $(this).attr('prop_key')).removeClass('box_ok');
                                            $('#tip_' + $(this).attr('prop_key')).addClass('box_error');
                                            if ($('#tip_' + $(this).attr('prop_key')).length > 0) {
                                                $('#tip_' + $(this).attr('prop_key'))
                                                    .html($(this).attr('prop_name') + '长度须在120个字以内');
                                            } else {
                                                alert($(this).attr('prop_name') + '长度须在120个字以内');
                                            }
                                            propFlag = false;
                                            return false;
                                        } else {
                                            validationUtil.removeCss($(this).attr('prop_key'));
                                            authCodeUrl += '&props[' + idx + '].key=' + $(this).attr('prop_key')
                                                + '&props[' + idx + '].name='
                                                + validationUtil.encodeURI($(this).attr('prop_name'))
                                                + '&props[' + idx + '].value=' + $(this).val();
                                            index++;
                                        }

                                    }
                                });
                            }
                            if ($('.propCheckbox').length !== undefined) {
                                $('.propCheckbox').each(function (idx) {
                                    var checkboxKey = $(this).attr('prop_key');
                                    var str = '';
                                    $('[name="' + checkboxKey + '"]:checkbox:checked').each(function () {
                                        str += $(this).val() + '&';
                                    });
                                    if (str.length > 0) {
                                        str = str.substring(0, str.length - 1);
                                    }
                                    if (str.length > 0) {
                                        var regUrl = 'props[' + index + '].key=' + $(this).attr('prop_key')
                                            + '&props[' + index + '].name='
                                            + validationUtil.encodeURI($(this).attr('prop_name'))
                                            + '&props[' + index + '].value=' + validationUtil.encodeURI(str) + '&';
                                        index++;
                                    }
                                });
                            }
                            if ($('.propRadio').length !== undefined) {
                                $('.propRadio').each(function (idx) {
                                    var checkboxKey = $(this).attr('prop_key');
                                    var str = '';
                                    $('[name="' + checkboxKey + '"]:radio:checked').each(function () {
                                        str += $(this).val();
                                    });
                                    if (str.length > 0) {
                                        authCodeUrl += '&props[' + index + '].key=' + $(this).attr('prop_key')
                                            + '&props[' + index + '].name='
                                            + validationUtil.encodeURI($(this).attr('prop_name'))
                                            + '&props[' + index + '].value=' + validationUtil.encodeURI(str);
                                        index++;
                                    }
                                });
                            }
                            if (!propFlag) {
                                return false;
                            }


                            if ($(idPrev + 'btg').length > 0) {
                                var btg = $.trim($(idPrev + 'btg').val());
                                if (btg !== '') {
                                    authCodeUrl += '&btg=' + btg;
                                }
                            }

                            if ($(idPrev + 'chatLog').length > 0) {
                                var chatLog = $.trim($(idPrev + 'chatLog').val());
                                if (chatLog !== '') {
                                    authCodeUrl += '&chatLog=' + chatLog;
                                }
                            }

                            authCodeUrl += '&mold=' + mold;
                            // 服务申请提交, 如果要图片或者手机则显示隐藏层. 如果页面有验证码, 则不再弹出
                            if ((captchaShowFlag === 1 || mobileShowFlag === 1)
                                && $(idPrev + 'captcha').length < 1 && mold === 0) {
                                // 弹出层. (表单参数和类型<1获取手机验证码,2提交表单>)
                                validationUtil.displayOrHidden(authCodeUrl, 2, formId);
                            } else {
                                this.formSubmit(authCodeUrl, idPrev, formId);
                            }
                        };
                        RegisterUtils.prototype.formSubmit = function (param, idPrev, formId) {
                            var requestUrl = url.REGISTER;
                            if (mold !== 0) {// 是手机或者邮箱注册, 走注册的URL
                                requestUrl = url.SAVE;
                                // 0是post提交, 1是get. 临时解决Android, ios, pc端注册的post提交跨域问题, 以后实现更优方案
                                if (registerMethod === 0) {// 如果不是0走下面方案
                                    $.post(requestUrl, param, function (json) {
                                        RegisterUtils.prototype.registerCallBack(json, idPrev, formId);
                                    }, 'json');
                                    return;
                                }
                            }
                            $.getJSON(requestUrl, param, function (json) {
                                RegisterUtils.prototype.registerCallBack(json, idPrev, formId);
                            });
                        };

                        // ajax提交表单后的回调函数
                        RegisterUtils.prototype.registerCallBack = function (json, idPrev, formId) {
                            // 提交表单之后, 设置表单需要后台异步校验
                            needAction = 1;
                            if (formId && formId !== '#') {
                                idPrev = '#' + formId + '_';
                            }
                            if ($(idPrev + 'button_submit').length > 0) {
                                $(idPrev + 'button_submit').removeAttr('disabled', 'disabled');
                            }
                            if (json !== null && json !== '') {
                                // 成功或者服务已申请, 都正常提示成功...
                                if (json.flag || json.code === '10021604') {
                                    // 往金投统计发送数据
                                    var param = 'cngoldstat=' + getCookieCngoldId() + '&cngoldid=' + json.data.cngoldid
                                        + '&flag=' + json.data.flag + '&step=' + json.data.step
                                        + '&result=' + json.flag + '&message=' + json.msg;
                                    $.getJSON(url.ANA_SEND, param, function (json) {
                                        var result = json.result;

                                    });
                                    if (json.data && json.data.dz && json.data.dz.flag
                                        && json.data.dz.url && json.data.dz.url.length > 0) {
                                        $.getScript(json.data.dz.url, function () {
                                            if (json.data.isPop) {
                                                onRegisterSuccessPop(idPrev, json, formId, json.data.isPop,
                                                    json.data.popFrom, json.data.imgUrl, json.data.title,
                                                    json.data.popContent, json.data.popBottom, json.data.popType,
                                                    json.data.buttonContent);
                                            } else {
                                                onRegisterSuccess(idPrev, json, formId);
                                            }
                                        });
                                    } else {
                                        // discuz登录失败
                                        if (json.data.isPop) {
                                            onRegisterSuccessPop(idPrev, json, formId, json.data.isPop,
                                                json.data.popFrom, json.data.imgUrl, json.data.title,
                                                json.data.popContent, json.data.popBottom, json.data.popType,
                                                json.data.buttonContent);
                                        } else {
                                            onRegisterSuccess(idPrev, json, formId);
                                        }
                                    }
                                    return;
                                }
                                // 程序异常时, data为null. 直接提示返回的消息
                                if (!json.data) {
                                    alert(json.msg);
                                    return false;
                                }
                                if (json.data.id === 'pictureCaptcha') {
                                    validationUtil.refreshCaptcha();
                                    mobileShowFlag = 1;
                                }
                                $(idPrev + json.data.id).focus();
                                if (mold === 2 && json.code === '10020402') {// 当注册并且返回验证码错误时
                                    validationUtil.showErrorMsg(json.data.id, json.code, '#captcha');
                                    return false;
                                }
                                validationUtil.showErrorMsg(json.data.id, json.code, formId);
                                return false;
                            }
                        };

                         // 发送验证码, 弹出遮罩层之前, 秘密入库. 防止表单数据丢失~~ 好屌的...
                        RegisterUtils.prototype.secretFormSubmit = function (authCodeUrl) {
                            $.getJSON(url.REGISTER_SECRECT, authCodeUrl, function (json) {
                                // 往金投统计发送数据
                                var param = 'cngoldstat=' + getCookieCngoldId() + '&cngoldid='
                                    + json.data.cngoldid
                                    + '&flag=' + json.data.flag + '&step=' + json.data.step
                                    + '&result=' + json.flag + '&message=' + json.msg;
                                $.getJSON(url.ANA_SEND, param, function (json) {
                                    var result = json.result;

                                });
                                // 提交表单之后, 设置表单需要后台异步校验
                                if (json !== null && json !== '') {
                                    // 成功或者服务已申请, 都正常提示成功...
                                    // mobileCaptchaShowFlag = 1;
                                    if ($('#temporaryMemberId').length > 0) {
                                        $('#temporaryMemberId').val(json.data.temporaryMemberId);
                                    }
                                    return false;
                                }
                            });
                        };
                    }// RegisterUtils func end  -.-
                    return {RegisterUtils: RegisterUtils};
                })()
            }
        }
    });


// 获取cookie中的cngoldstat
    function getCookieCngoldId() {
        var objName = 'cngoldstat';
        var arrStr = document.cookie.split('; ');
        for (var i = 0; i < arrStr.length; i++) {
            var cookieStr = decodeURIComponent(arrStr[i]);
            var temp = cookieStr.split('=');
            if (temp[0] === objName) {
                return unescape(temp[1]);
            }
        }
        return '';
    }

    // var registerUtil = new org.cngold.passport.RegisterUtils;
    // var validationUtil = new org.cngold.passport.ValidationUtils;

    /**
     * 服务注册通用脚本(单表单，用于一个页面只有一个表单的情况)
     * 表单即时验证
     */
    /** @description passport register domain . */
    /** 为支持https，此js文件要维护两套，passport内部用时passportdomain不带域名，放到res.cngoldres.com上需要带上域名 */


    function getMobileAuthCode(formId) {
        if (formId) {
            registerUtil.getMobileAuthCode(formId);
        } else {
            registerUtil.getMobileAuthCode('#');
        }
    }

// 密码强度判断方法
    function formPwdStrong(id) {
        validationUtil.checkPasswordStrong('#', id);
    }

// qq登陆提交方法
    function formQqSubmit() {
        registerUtil.qqSubmit('#');
    }

// 修改密码提交方法
    function formModifySubmit() {
        registerUtil.modifySubmit('#');
    }

    function getAuthCode() {
        registerUtil.getMobileAuthCode('#');
    }

    function serviceRegisterFormSubmit() {
        registerUtil.register('#');
    }

    function submitForm(formId) {
        registerUtil.register(formId);
    }


    function fieldOnfocus(fieldId) {
        fieldId = '#' + fieldId;
        var value = $.trim($(fieldId).val());
        if (value === '请输入姓名' || value === '真实姓名不能为空' || value === '真实姓名必须为中文' || value === '姓名长度必须在6个汉字以内') {
            $(fieldId).val('');
            $(fieldId).removeClass('reg_textbox_err');
        }

        if (value === 'qq不能为空' || value === '请输入QQ号' || value === 'qq格式不正确') {
            $(fieldId).val('');
            $(fieldId).removeClass('reg_textbox_err');
        }

        if (value === '手机不能为空' || value === '请输入手机号' || value === '手机格式不正确' || value === '手机已经被使用') {
            $(fieldId).val('');
            $(fieldId).removeClass('reg_textbox_err');
        }
    }

    function keydown(evt, formId, obj) {
        evt = (evt) ? evt : window.event;
        var divId = '#maskDivIOnly';
        var idMobile = '#' + formId + '_mobile';
        // 回车键
        if (evt.keyCode === 13) {
            if ($(divId).css('display') === 'block') {// 遮罩层显示的时候校验验证码
                validationUtil.checkPiccode();
                return false;
            }
            if (mold === 1 || mold === 2) {// 注册
                submitForm();
                return false;
            } else {// 服务申请
                if ($(obj).parents('#moni_reg_1').length !== 0 && $(obj).parents('#moni_reg_2').length === 0) {// 多步之第一步，发送验证码
                    if ($(idMobile).length > 0) {// 带上formId
                        getMobileAuthCode(formId);
                    } else {
                        getMobileAuthCode();
                    }
                } else {
                    if ($(idMobile).length > 0) {// 带上formId
                        submitForm(formId);
                        return false;
                    } else {
                        submitForm();
                        return false;
                    }
                }
            }
        }
    }

    function refreshCaptcha() {
        validationUtil.refreshCaptcha();
    }

// 页面加载完成后执行
    window.onload = function () {
        if (sildeType === 1) {
            // 自动追加遮罩层样式, 适应iframe内部引用，嵌套很小表单，使用另外的样式
            if ($('#formWidth').length > 0 && $('#formWidth form').width() <= 600) {
                validationUtil.appendMSlideLay();// 当需要滑动验证时
                validationUtil.mSlidePicLoad();// M初始化滑动验证图片
            } else {
                validationUtil.appendSlideLay();// 当需要滑动验证时
                validationUtil.pcSlidePicLoad();// PC初始化滑动验证图片
            }
        }
    };

// 给需要验证的输入框, 绑定失去焦点事件
    $(document).ready(function () {
        if ($('#mold') && $('#mold').val() !== undefined && $('#mold').val() !== 0) {
            mold = $('#mold').val();
        }
        if ($('#nickname').length > 0) {
            $('#nickname').blur(function () {
                recommendTimes = 1;
                validationUtil.checkNickname('#');
            });
        }
        if ($('#loginName').length > 0) {
            $('#loginName').blur(function () {
                validationUtil.checkLoginName('#');
            });
        }
        if ($('#passwordMd5').length > 0) {
            $('#passwordMd5').blur(function () {
                validationUtil.checkPasspwordMd5('#');
            });
        }
        if ($('#passwordMd5_confirm').length > 0) {
            $('#passwordMd5_confirm').blur(function () {
                validationUtil.checkPasspwordMd5Confirm('#');
            });
        }
        if ($('#mobile').length > 0) {
            $('#mobile').blur(function () {
                validationUtil.checkMobile('#');
            });
        }
        // 仅当是邮件注册的时候, 才强制不为空判断
        if (mold === 1) {
            if ($('#email').length > 0) {
                $('#email').blur(function () {
                    validationUtil.checkEmail('#');
                });
            }
        }
        if ($('#codeButton').length > 0) {
            $('#codeButton').removeAttr('disabled', 'disabled');
        }
        if ($('#realName').length > 0) {
            $('#realName').blur(function () {
                validationUtil.checkRealName('#');
            });
        }

        validationUtil.checkCaptcha('#');

        // 当时邮箱或者手机注册的时候, 图片验证码默认强制显示
        if (mold === 1 || mold === 2) {
            // 当需要使用滑动验证码时
            if (sildeType === 1) {

            } else {
                mobileShowFlag = 1;
                if ($('#pictureCaptchaView')) {
                    $('#pictureCaptchaView').attr('style', 'display:block');
                }
                validationUtil.refreshCaptcha();
            }

        } else {
            // 服务申请必弹图片验证码

        }
        // FIXME 临时解决Android, ios, pc端注册的post提交跨域问题, 以后实现更优方案
        if ($('#registerMethod').length > 0) {
            registerMethod = $('#registerMethod').val();
        }
        // 追加图片验证码的遮罩层
        validationUtil.appendOverlay();
        // 自动追加遮罩层样式, 适应iframe内部引用，嵌套很小表单，使用另外的样式
        if ($('#formWidth').length > 0 && $('#formWidth form').width() <= 600) {
            $('<link>').attr({
                rel: 'stylesheet',
                type: 'text/css',
                href: PASSPORT_DOMAIN + '/resource/cngold/css/cngold.passport1.mask-min.css'
            }).appendTo('head');
            $('<link>').attr({
                rel: 'stylesheet',
                type: 'text/css',
                href: PASSPORT_DOMAIN + '/resource/passport2/m/css/m_silde_head50.css'
            }).appendTo('head');
            $('<script>').attr({
                type: 'text/javascript',
                src: PASSPORT_DOMAIN + '/resource/cngold/js/zepto.min.js'
            }).appendTo('head');// 滑动验证
            $('<script>').attr({
                type: 'text/javascript',
                src: PASSPORT_DOMAIN + '/resource/cngold/js/touch.js'
            }).appendTo('head');// 滑动验证

        } else {
            $('<link>').attr({
                rel: 'stylesheet',
                type: 'text/css',
                href: PASSPORT_DOMAIN + '/resource/cngold/css/cngold.passport1.mask.css'
            }).appendTo('head');
            $('<link>').attr({
                rel: 'stylesheet',
                type: 'text/css',
                href: PASSPORT_DOMAIN + '/resource/passport2/pc/css/passport.suite.css'
            }).appendTo('head');// 滑动验证

        }

        // 添加回车事件
        $('input').keydown(function (evt) {
            var form = this.form;
            var formId;
            if (form) {
                formId = form.id;
            } else {
                formId = $('#realFormId').val();
            }
            return keydown(evt, formId, this);
        });
        // 兼容多表单, 绑定页面所有form_x的表单, 需要失去焦点校验的字段
        $('form').each(function (i) {
            var formId = this.id;
            if (formId.indexOf('form_') !== -1) {
                formId = '#' + formId + '_';
                // 绑定多表单的鼠标移出事件
                if ($(formId + 'nickname').length > 0) {
                    $(formId + 'nickname').blur(function () {
                        recommendTimes = 1;
                        validationUtil.checkNickname(formId);
                    });
                }
                if ($(formId + 'loginName').length > 0) {
                    $(formId + 'loginName').blur(function () {
                        validationUtil.checkLoginName(formId);
                    });
                }
                if ($(formId + 'passwordMd5').length > 0) {
                    $(formId + 'passwordMd5').blur(function () {
                        validationUtil.checkPasspwordMd5(formId);
                    });
                }
                if ($(formId + 'passwordMd5_confirm').length > 0) {
                    $(formId + 'passwordMd5_confirm').blur(function () {
                        validationUtil.checkPasspwordMd5Confirm(formId);
                    });
                }
                if ($(formId + 'mobile').length > 0) {
                    $(formId + 'mobile').blur(function () {
                        validationUtil.checkMobile(formId);
                    });
                }
                if ($(formId + 'codeButton').length > 0) {
                    $('#codeButton').removeAttr('disabled', 'disabled');
                }
                if ($(formId + 'realName').length > 0) {
                    $(formId + 'realName').blur(function () {
                        validationUtil.checkRealName(formId);
                    });
                }

            }
        });

    });

    function changeMold(type) {
        mold = type;
    }

    var sec = 60;
    var wait = sec * 1000;
    var timer = null;

// 手机验证码发送成功后, 多少秒后可重发
    function startCountDown(formId) {
        var codeButton = 'codeButton';
        if (formId && formId !== '#' && $('#modivCodeDiv').css('display') === 'none') {
            codeButton = '#' + formId + '_' + codeButton;
        } else {
            codeButton = '#' + codeButton;
        }
        if ($('#modivCodeDiv').css('display') === 'block' && $(codeButton).val().indexOf('秒后可重新发送') !== -1) {
            return;
        }
//	$(codeButton).val(sec + "秒后可重新发送");
        $(codeButton).attr('disabled', 'disabled');
        $(codeButton).addClass('after');
        timer = window.setTimeout('timeUpdate("' + sec + '", "' + codeButton + '")', 1000);
    }

// 更新手机验证码重新发送时间
    function timeUpdate(num, codeButton) {
        if (num > 0) {
//		var pntNum = (wait / 1000) - num;
            $(codeButton).val(num + '秒后可重新发送');
            num--;
            timer = window.setTimeout('timeUpdate("' + num + '", "' + codeButton + '")', 1000);
        } else {
            timeOk(codeButton);
        }
    }

// 结束倒计时，恢复按钮状态
    function regainCodeButton(formId) {
        var codeButton = 'codeButton';
        if (formId && formId !== '#' && $('#modivCodeDiv').css('display') === 'none') {
            codeButton = '#' + formId + '_' + codeButton;
        } else {
            codeButton = '#' + codeButton;
        }
        timeOk(codeButton);
    }

// 手机验证码可重发
    function timeOk(codeButton) {
        window.clearTimeout(timer);
        $(codeButton).val('免费获取校验码');
        $(codeButton).removeAttr('disabled', 'disabled');
        $(codeButton).removeClass('after');
    }


	// 申请成功回调函数, 重构下支持页面传入2个参数的回调
    onRegisterSuccess = function (idPrev, result) {
        onRegisterSuccess(idPrev, result, '#');
    };


     // 申请成功回调函数
    function onRegisterSuccess(idPrev, result, formId) {
        var formRedirectUrl = 'redirectUrl';
        if (result.data.frontTip) {
            alert('尊敬的客户，您好！恭喜您提交成功，稍后会有工作人员与您取得联系，请认准集金号官网客服电话4006130507！【集金号】');
        } else {
            alert('尊敬的客户，您好！恭喜您提交成功，稍后会有工作人员与您取得联系，请认准金投网官方客服电话400-664-4881！【金投网】');
        }
        if (formId && formId !== '#') {
            formRedirectUrl = '#' + formId + '_' + formRedirectUrl;
        } else {
            formRedirectUrl = '#' + formRedirectUrl;
        }
        // 注册成功后转跳页面
        if ($(formRedirectUrl).length > 0) {
            var redirectUrl = $(formRedirectUrl).val();
            if (redirectUrl && redirectUrl !== '') {
                location.href = redirectUrl;
            }
        }
        return;
    }

    function getMobileShowHtml(msg) {
        var mobile = $.trim($('#mobile').val());
        try {
            var isFunction = typeof(evil('encrypt')) === 'function';
        } catch (e) {
        }
        if (isFunction) {
            var encodedParam = escape('&username=' + mobile);
            mobile = evil('encrypt(encodedParam, \'123\')');
        }
        return msg + ',请点击此处<a href="' + PASSPORT_DOMAIN + '/account/login.htm?username='
            + mobile + '">登录</a>或<a href="' + PASSPORT_DOMAIN + '/account/password/forgot.htm?username='
            + mobile + '">忘记密码？</a></b>';
    }

    function getEmailShowHtml(msg) {
        var email = $.trim($('#email').val());
        try {
            var isFunction = typeof(evil('encrypt')) === 'function';
        } catch (e) {
        }
        if (isFunction) {
            var encodedParam = escape('&username=' + email);
            email = evil('encrypt(encodedParam, "123")');
        }
        return msg + ',请点击此处<a href="' + PASSPORT_DOMAIN + '/account/login.htm?username='
            + email + '">登录</a>或<a href="' + PASSPORT_DOMAIN + '/account/password/forgot.htm?username='
            + email + '">忘记密码？</a></b>';
    }
    var idPrevPage;
    var resultPage;
    var formIdPage;
    function onRegisterSuccessPop(idPrev, result, formId, isPop,
                                     popFrom, imgUrl, title, popContent, popBottom, popType, buttonContent) {
        if (isPop) {
            idPrevPage = idPrev;
            resultPage = result;
            formIdPage = formId;

            var popInfo = getPCPopInfo(idPrev, result, formId, imgUrl,
                title, popContent, popBottom, popType, buttonContent);
            $('body').append(popInfo);
            // 广告图片大小
            $('.submit_sucLayer .layer_cont>div .img_adv span').height(
                209 * $('.submit_sucLayer .layer_cont>div .img_adv span').width() / 407);
            if (window.innerWidth >= 800) {
                $('.submit_sucLayer .layer_cont').height($('.submit_sucLayer .layer_cont>div').height() + 40);
            }
            // 图片绝对居中
            var imgSize = 0;
            var imgW;
            var imgH;
            $('.img_adv img').each(function () {
                var screenImage = $(this);
                var theImage = new Image();
                theImage.src = screenImage.attr('src');
                theImage.onload = function () {
                    imgW = theImage.width;
                    imgH = theImage.height;
                    imgSize = imgW / imgH;
                    var spanW = $('.img_adv img').parent().width();
                    var spanH = $('.img_adv img').parent().height();
                    var spanSize = spanW / spanH;
                    if (imgSize > spanSize) {
                        $('.img_adv img').css(
                            {
                                'width': spanW + 'px',
                                'height': spanW / imgSize + 'px',
                                'margin-top': (spanH - spanW / imgSize) / 2 + 'px'
                            });
                    } else {
                        $('.img_adv img').css({'width': spanH * imgSize + 'px', 'height': spanH + 'px'});
                    }
                };

            });

        }

        return;
    }
    function showPop() {
        $('#backg').remove();
        $('.submit_sucLayer').remove();
        registerSuccessContinue(idPrevPage, resultPage, formIdPage);
    }
    function registerSuccessContinue(idPrev, result, formId) {
        var formRedirectUrl = 'redirectUrl';
        if (formId && formId !== '#') {
            formRedirectUrl = '#' + formId + '_' + formRedirectUrl;
        } else {
            formRedirectUrl = '#' + formRedirectUrl;
        }
        // 注册成功后转跳页面
        if ($(formRedirectUrl).length > 0) {
            var redirectUrl = $(formRedirectUrl).val();
            if (redirectUrl && redirectUrl !== '') {
                location.href = redirectUrl;
            }
        }
    }
    function getPCPopInfo(idPrev, result, formId, imgUrl, title, popContent, popBottom, popType, buttonContent) {
        var registerSuccessPop = '<div class="submit_sucLayer"><div class="layer_cont br5">'
            + '<div class="clearfix"><span class="close fr" onclick="showPop()"></span><div class="succ_tips textC">';
        if (title) {
            registerSuccessPop += '<p class="succ_tips">' + title + '</p>';
        }
        if (popContent) {
            registerSuccessPop += '<div class="title">' + popContent + '</div>';
        }
        if (imgUrl) {
            registerSuccessPop += '<a href="" class="img_adv"><span><img src="' + imgUrl + '"></span></a>';
        }
        if (popBottom) {
            registerSuccessPop += '<p class="textC">' + popBottom + '</p>';
        }
        if (buttonContent) {
            registerSuccessPop += buttonContent;
        }
        registerSuccessPop += '</div>'
            + '</div></div>';
        return registerSuccessPop;
    }

    return customElement;

});
