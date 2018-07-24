/**
 * @file mip-ilaw66-baidu-login 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('jquery');

    /**
     * 因有些方法zepto不支持故使用jquery
     */

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var interval;
        var min;
        var sec;
        var timeout = 60;
        var loginTimes = parseInt($el.find('#error').val().slice(5, 6), 10);
        var csrfToken = $el.find('#_csrf').val();
        var channel = $el.find('#channel').val();
        var userId = $el.find('#userId').val();
        var head = $el.find('.header_block');
        var t1;
        var phoneChangedFlagAndHasOrderUnpaid = false;

        var channelInUrl = getQueryString('channel');
        if (!channel && channelInUrl) {
            channel = channelInUrl;
        }

        setTimeout(function () {
            $el.find('.loading_pop').hide();
        }, 2000);

        choose(channel);
        if (channel === 'eleme') {
            $el.find('.header_block').css('background', '#089EFF');
        }
        else if (channel === 'weiche') {
            $el.find('.header_block').addClass('header_weiche');
            $el.find('.btn_into').addClass('btn_into_weiche');
        }
        else if (channel === 'mmbang' || channel === 'hers') {
            if (channel === 'mmbang') {
                $el.find('.header_block').css('margin-top', '48px');
            }

            $el.find('.header_block').css('background', '#ff6191');
        }
        else if (channel === 'weixin' || channel === 'onstar'
            || channel === 'falv' || channel === 'jbh' || channel === 'linjia') {
            $el.find('.header_block').css('background', '#ff6100');
        }
        else if (channel === 'WxiaoApp' || channel === 'fengniao' || channel === 'fengniaozb') {
            if (channel === 'WxiaoApp') {
                $el.find('.header_block').hide();
            }
            else {
                $el.find('.header_block').css('background', '#5C7DC0');
            }
        }
        else if (channel === 'dayima') {
            $el.find('.top_header,.header_block').css('background', '#fff');
            $el.find('.div_header,.glyphicon-menu-left:before,.glyphicon,.header_block').css('color', '#000');
        }
        else if (channel === 'winbaoxian') {
            $el.find('.glyphicon').hide();
            $el.find('.header_block').hide();
            $el.find('.btn').css('background', '#8698C6');
            $el.find('.content_inputCodeText').css('color', '#8698C6');
            $el.find('.tile_ele').css('text-algin', 'center');
            $el.find('.common_number').css('height', '48px');
            $el.find('.common_number').text('');
        }
        else if (channel === 'baidusearch') {
            $el.find('.header_block').html('准备咨询');
            $el.find('.header_block').css('color', '#000');
            $el.find('.header_block').css('background', '#fff');
            $el.find('.glyphicon').css('color', '#000000');
            $el.find('#sms').css('color', '#4992FF');
            $el.find('#login').text('去匹配律师');
            $el.find('#login').css('background', '#3388FF');
            $el.find('#login').css('height', '45px');
            $el.find('.radio-rule').show();
            $el.find('.botText01').show();
            $el.find('#botText_div').hide();
        }
        else {
            $el.find('.header_block').css('background', '#ff6100');
        }

        if (head && head.is(':hidden')) {
            $el.find('.content_inputCodeText').css({
                top: '3.76rem'
            });
        }

        function choose(channel) {
            if (channel) {
                if (channel === 'eleme') {
                    $el.find('head').append(
                        '<link href="tempeleme/css/wenlvshi.eleme.css?v=20170807"'
                        + ' rel="stylesheet" type="text/css" />');
                }
                else if (channel === 'hlx') {
                    $el.find('head').append('<link href="temphualongxiang/css/wenlvshi.hualongxiang.css"'
                        + ' rel="stylesheet" type="text/css" />');
                    $el.find('#unitprice').html('5');
                }
                else if (channel === 'dsc') {
                    $el.find('head').append('<link href="tempdasouche/css/wenlvshi.dasouche.css"'
                        + ' rel="stylesheet" type="text/css" />');
                }
                else if (channel === 'mmbang' || channel === 'hers') {
                    $el.find('head').append('<link href="tempmmbang/css/wenlvshi.mmbang.css"'
                        + ' rel="stylesheet" type="text/css" />');
                }
                else if (channel === 'fengniao' || channel === 'fengniaozb') {
                    $el.find('.header_block').removeClass().addClass('header_block_fengniao');
                    $el.find('.btn').removeClass().addClass('btn_fengniao');
                    $el.find('head').append('<link href="css/wenlvshi.base.css?v=20170928"'
                        + ' rel="stylesheet" type="text/css" />');
                }
                else if (channel === 'baidusearch') {
                    $el.find('head').append('<link href="css/wenlvshi.eleme.css?20180619"'
                        + ' rel="stylesheet" type="text/css" />');
                }
                else {
                    $el.find('head').append('<link href="css/wenlvshi.base.css?v=20170928"'
                        + ' rel="stylesheet" type="text/css" />');
                }
            }
            else {
                $el.find('head').append('<link href="css/wenlvshi.base.css?v=20170928"'
                    + ' rel="stylesheet" type="text/css" />');
            }
        }
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }
        function load() {
            if (!channel && channelInUrl) {
                channel = channelInUrl;
            }

            choose(channel);
        }
        var settings = {
            e: 'idcode',
            codeType: {name: 'follow', len: 4},
            codeTip: 'refresh?',
            inputID: 'Txtidcode'
        };

        var set = {
            storeLable: 'codeval',
            store: '#ehong-code-input',
            codeval: '#ehong-code'
        };
        $.idcode = {
            getCode: function (option) {
                commSetting(option);
                return storeData(set.storeLable, null);
            },
            setCode: function (option) {
                commSetting(option);
                setCodeStyle('#' + settings.e, settings.codeType.name, settings.codeType.len);

            },
            validateCode: function (option) {
                commSetting(option);
                var inputV;
                if (settings.inputID) {
                    inputV = $('#' + settings.inputID).val();
                }
                else {
                    inputV = $(set.store).val();
                }

                if (inputV === storeData(set.storeLable, null)) {
                    return true;
                }
                else {
                    setCodeStyle('#' + settings.e, settings.codeType.name, settings.codeType.len);
                    return false;
                }
            }
        };

        function commSetting(option) {
            $.extend(settings, option);
        }

        function storeData(dataLabel, data) {
            var store = $(set.codeval).get(0);
            if (data) {
                $.data(store, dataLabel, data);
            }
            else {
                return $.data(store, dataLabel);
            }
        }

        function setCodeStyle(eid, codeType, codeLength) {
            var codeObj = createCode(settings.codeType.name, settings.codeType.len);
            var randNum = Math.floor(Math.random() * 6);
            var htmlCode = '';
            if (!settings.inputID) {
                htmlCode = '<span><input id="ehong-code-input" type="text" maxlength="4" /></span>';
            }

            htmlCode += '<div id="ehong-code" class="ehong-idcode-val ehong-idcode-val';
            htmlCode += String(randNum);
            htmlCode += '" href="#" onblur="return false" onfocus="return false" oncontextmenu="return false"'
                + ' onclick="$.idcode.setCode()">' + setStyle(codeObj) + '</div><span id="ehong-code-tip-ck"'
                + ' class="ehong-code-val-tip" onclick="$.idcode.setCode()">'

                /*+ settings.codeTip*/ + '</span>';
            $(eid).html(htmlCode);
            storeData(set.storeLable, codeObj);
        }

        function setStyle(codeObj) {
            var fnCodeObj = [];

            /*var col = new Array('#BF0C43', '#E69A2A', '#707F02', '#18975F', '#BC3087', '#73C841'
                , '#780320', '#90719B', '#1F72D8', '#D6A03C', '#6B486E', '#243F5F', '#16BDB5');*/
            var col = [];
            col.push('#BF0C43');
            col.push('#E69A2A');
            col.push('#707F02');
            col.push('#18975F');
            col.push('#BC3087');
            col.push('#73C841');
            col.push('#780320');
            col.push('#90719B');
            col.push('#1F72D8');
            col.push('#D6A03C');
            col.push('#6B486E');
            col.push('#243F5F');
            col.push('#16BDB5');

            var charIndex;
            for (var i = 0; i < codeObj.length; i++) {
                charIndex = Math.floor(Math.random() * col.length);
                fnCodeObj.push('<font color="' + col[charIndex] + '">' + codeObj.charAt(i) + '</font>');
            }
            return fnCodeObj.join('');
        }
        function createCode(codeType, codeLength) {
            var codeObj;
            if (codeType === 'follow') {
                codeObj = createCodeFollow(codeLength);
            }
            else if (codeType === 'calc') {
                codeObj = createCodeCalc(codeLength);
            }
            else {
                codeObj = '';
            }
            return codeObj;
        }

        function createCodeCalc(codeLength) {
            var code1;
            var code2;
            var codeResult;
            // var selectChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
            var selectChar = [];
            selectChar.push('0');
            selectChar.push('1');
            selectChar.push('2');
            selectChar.push('3');
            selectChar.push('4');
            selectChar.push('5');
            selectChar.push('6');
            selectChar.push('7');
            selectChar.push('8');
            selectChar.push('9');
            var charIndex;
            for (var i = 0; i < codeLength; i++) {
                charIndex = Math.floor(Math.random() * selectChar.length);
                code1 += selectChar[charIndex];

                charIndex = Math.floor(Math.random() * selectChar.length);
                code2 += selectChar[charIndex];
            }
            return [parseInt(code1, 10), parseInt(code2, 10), parseInt(code1, 10) + parseInt(code2, 10)];
        }

        function createCodeFollow(codeLength) {
            var code = '';
            var selectChar = [];
            selectChar.push('0');
            selectChar.push('1');
            selectChar.push('2');
            selectChar.push('3');
            selectChar.push('4');
            selectChar.push('5');
            selectChar.push('6');
            selectChar.push('7');
            selectChar.push('8');
            selectChar.push('9');
            selectChar.push('A');
            selectChar.push('B');
            selectChar.push('C');
            selectChar.push('D');
            selectChar.push('E');
            selectChar.push('F');
            selectChar.push('G');
            selectChar.push('H');
            selectChar.push('I');
            selectChar.push('J');
            selectChar.push('K');
            selectChar.push('L');
            selectChar.push('M');
            selectChar.push('N');
            selectChar.push('O');
            selectChar.push('P');
            selectChar.push('Q');
            selectChar.push('R');
            selectChar.push('S');
            selectChar.push('T');
            selectChar.push('U');
            selectChar.push('V');
            selectChar.push('W');
            selectChar.push('X');
            selectChar.push('Y');
            selectChar.push('Z');

            /*var selectChar = new Array('0', '1', '2', '3', '4',
             '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
                , 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
*/
            for (var i = 0; i < codeLength; i++) {
                var charIndex = Math.floor(Math.random() * selectChar.length);
                if (charIndex % 2 === 0) {
                    // code += selectChar[charIndex].toLowerCase();
                    code += selectChar[charIndex];
                }
                else {
                    code += selectChar[charIndex];
                }
            }
            return code;
        }
        function PopUp(option) {
            this.init(option);
            return this;
        }
        PopUp.prototype = {
            constructor: PopUp,
            init: function (option) {
                var This = this;
                This.option = {
                    title: '弹窗标题',
                    main: '弹窗内容',
                    yes: '确定',
                    no: '取消',
                    popYes: function () {},
                    popNo: function () {}
                };
                $.extend(true, this.option, option || {});
                This.dom();
                This.bindEvent();
            },
            dom: function () {
                var This = this;
                This.body = $('body');
                var btnN = '<div class="back-leave" id="js-back-leave">'
                    + This.option.yes + '</div>' + '<div class="back-continue" id="js-back-continue">'
                    + This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
                        + This.option.no + '</div>';
                }

                This.main = '<div class="back__pop popUP" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper"></div>' + '<div class="back__popLayer">' + '<span>'
                    + This.option.title + '</span>' + '<span>' + This.option.main
                    + '</span>' + btnN + '</div>' + '</div>';
                This.body.append(This.main);
                This.PopUp = $('.popUP');
                This.PopUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  点击离开事件
                This.PopUp.on('click', '#js-back-leave', function () {
                    This.PopUp.remove();
                    This.option.popYes();
                });
                //  点击确认事件
                This.PopUp.on('click', '#js-back-continue', function () {
                    This.PopUp.remove();
                    This.option.popNo();

                });
                //  点击遮罩层事件 --- 点击不关闭，必须点按钮

                /*This.PopUp.on('click', '.layer__wrapper', function () {
                 This.PopUp.remove();
                 })*/

            }
        };

        window.PopUp = PopUp;

        // 取消内容显示样式
        function ToastUp(option) {
            this.init(option);
            return this;
        }
        ToastUp.prototype = {
            constructor: ToastUp,
            init: function (option) {
                var This = this;
                This.option = {
                    main: '显示内容'
                };
                $.extend(true, this.option, option || {});
                This.dom();
                This.bindEvent();
            },
            dom: function () {
                var This = this;
                This.body = $('body');
                This.main = '<div class="back__pop ToastUp" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper layer__wrapper__toast"></div>'
                    + '<div class="back__popLayer__toast">' + '<span>'
                    + This.option.main + '</span>' + '</div>' + '</div>';
                This.body.append(This.main);
                This.ToastUp = $('.ToastUp');
                This.ToastUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  显示内容2秒
                setTimeout(function () {
                    This.ToastUp.remove();
                },
                    2000);
            }
        };

        window.ToastUp = ToastUp;

        function backOr(f, a, e, d, c, b) {
            new PopUp({
                title: f,
                main: a,
                yes: e,
                no: d,
                popYes: function (g) {
                    c.call(this, g);
                },
                popNo: function (g) {
                    b.call(this, g);
                }
            });
        }

        function toastOr(a) {
            new ToastUp({
                main: a
            });
        }

        $.idcode.setCode(); // 加载生成验证码方法
        if (sessionStorage.getItem('activity_dayimaLogin') === 1) {
            toastOr('登录后方可领券');
            sessionStorage.setItem('activity_dayimaLogin', 0);
        }

        if (channel === 'jsbchina') {
            $el.find('.bottomText').show();
        }

        if (loginTimes === 3) {
            toastOr('错误次数过多，请输入图形验证码');
        }

        if (loginTimes >= 3) {
            $el.find('#code_div').show();
        }

        $el.find('#sms').click(function () {
            sendSms();
        });

        // qyy add
        if (channel === 'baidusearch') { // 返回《按钮
            $el.find('#precautions-back').click(function () {
                if (channel === 'baidusearch') {
                    location.href = './';
                }
                else {
                    history.go(-1);
                }
            });
            // 我已阅读并同意《分秒律师用户服务协议》
            var agreeImgSrc = $el.find('.radio-rule').find('img').attr('src');
            $el.find('.radio-rule').on('click', function () {
                console.log(agreeImgSrc);
                $el.find(this).hasClass('rule-checked') ? $el.find(this).removeClass('rule-checked')
                    : $el.find(this).addClass('rule-checked');
                var type = $el.find(this).data('type');
                if ($el.find('#radio-rule-icon' + type).hasClass('isChecked')) {
                    $el.find('#radio-rule-icon' + type).attr('src', 'images/button_ok_s.png').removeClass('isChecked');
                }
                else {

                    /*$el.find("#radio-rule-icon" + type).attr("src", "images/button_ok_c.png").addClass('isChecked');*/
                    $el.find('#radio-rule-icon' + type).attr('src', agreeImgSrc).addClass('isChecked');
                }
                isCheckedConsulting(type);
            });
            function isCheckedConsulting(type) {
                // 判断开始咨询按钮状态
                if ($el.find('#js-radio-rule' + type).hasClass('rule-checked')) {
                    $el.find('#login').css('background', '#3388FF');
                    $el.find('#login').removeClass('noChecked');
                }
                else {
                    $el.find('#login').css('background', '#BBBBBB');
                    $el.find('#login').addClass('noChecked');
                }
            }
            // 《分秒律师用户服务协议》
            $el.find('.rulePA').on('click', function () {
                location.href = 'rule';
            });
        }

        // qyy end

        $el.find('.link_btn_sysErrConfirm').click(function () {
            $el.find('.popUp_sysErr').hide();
        });

        $el.find('.footer_block').click(function () {
            var phone = $el.find('#username').val();

            if (!check(phone)) {
                return;
            }

            console.log(loginTimes);

            if (loginTimes > 2) {
                var IsBy = $.idcode.validateCode(); // 调用返回值，返回值结果为true或者false
                if (IsBy) {
                    login();
                    $.idcode.setCode();
                }
                else {
                    toastOr('图形验证码错误');
                }
            }
            else {
                // qyy add
                if (channel === 'baidusearch') {
                    if ($el.find('#login').hasClass('noChecked')
                        && !$el.find('#radio-rule-iconCT002').hasClass('isChecked')) {
                        alert('请阅读并同意《分秒律师用户服务协议》');
                        return false;
                    }
                    else {
                        var flag = sessionStorage.getItem('loginFlg');
                        if (userId && flag === 0) {
                            // 修改手机号
                            updateTel();
                        }
                        else {
                            // 用户首次登陆
                            sessionStorage.setItem('loginFlg', 0);
                        }
                        login();
                    }
                }
                else {
                    // qyy end
                    login();
                }
            }
        });

        function login() {
            var action = window.location.origin + '/jasmine/login';
            var frmLogin = $el.find('#frmLogin form');
            $(frmLogin).attr('action', action);
            $(frmLogin).attr('method', 'post');
            $(frmLogin).attr('target', '_self');
            $(frmLogin).submit();
        }

        function sendSms() {
            var phone = $el.find('#username').val();
            if (check(phone)) {
                $el.find('#sms').prop('disabled', true).off('click');
                var csrfToken = $el.find('#_csrf').val();
                var channel = $el.find('#channel').val();

                /** 倒计时*/
                $el.find('#sms').text(timeout + 's');
                var dateTime = new Date();
                min = dateTime.getMinutes();
                sec = dateTime.getSeconds();
                interval = setInterval(function () {
                    fnDate();
                }, 1000);

                /** 发送短信*/
                $.ajax({
                    type: 'GET',
                    url: 'sendSms?phone=' + phone + '&channel=' + channel + '&_csrf=' + csrfToken,
                    success: function (data) {
                        if (data === 'ERROR') {
                            $el.find('#sendSMSError_msg').text('发送短信失败');
                            $el.find('.popUp_sysErr').fadeIn();
                        }
                        else if (data === 'ERROR1') {
                            $el.find('#sendSMSError_msg').text('链接异常');
                            $el.find('.popUp_sysErr').fadeIn();
                        }
                        else if (data === 'ERROR2') {
                            $el.find('#sendSMSError_msg').text('您已申请过，请稍后申请');
                            $el.find('.popUp_sysErr').fadeIn();
                        }

                    }
                });
            }
        }

        function fnDate() {
            var date = new Date();
            t1 = (date.getMinutes() - min) * timeout + (date.getSeconds() - sec);
            if (t1 >= timeout) {
                clearInterval(interval);
                $el.find('#sms').prop('disabled', false).text('重试');
                $el.find('#sms').on('click', sendSms);
            }
            else {
                var time = timeout - t1;
                $el.find('#sms').text(time + 's');
            }
        }

        function check(phone) {
            if (!phone) {
                $el.find('#smsCheckError_msg').text('请输入手机号码');
                return false;
            }
            else {
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
                if (!reg.test(phone)) {
                    // alert("电话号码填写不正确");
                    $el.find('#smsCheckError_msg').text('电话号码填写不正确');
                    return false;
                }
                else {
                    return true;
                }
            }
        }

        /*修改手机号*/
        function updateTel() { // 修改手机号
            var phone = $el.find('#username').val();
            var smsCode = $el.find('#password').val();
            var csrfToken = $el.find('#_csrf').val();
            $.ajax({
                async: true,
                type: 'POST',
                url: 'updateUserPhoneNumber?phoneNumber=' + phone + '&smsCode=' + smsCode + '&_csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    if (data.code === 1) {
                        $el.find('#ok_msg').html(data.errMsg);
                        $el.find('.popUp_ok').fadeIn();
                    }
                    else {
                        if (data.code === 4) {
                            phoneChangedFlagAndHasOrderUnpaid = true;
                            $el.find('#ok_msg').html(data.errMsg);
                            $el.find('.popUp_ok').fadeIn();
                        }
                        else if (data.code === 3) {
                            $el.find('#err_msg').html(data.errMsg);
                            $el.find('.popUp_error').fadeIn();
                            $el.find('#sms').val('重发验证码').text('refresh');
                            $el.find('#sms').prop('disabled', false).text('refresh');
                        }
                        else {
                            $el.find('#err_msg').html(data.errMsg);
                            $el.find('.popUp_error').fadeIn();
                        }
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        // window.location.reload();
                    }

                }
            });
        }

    };

    return customElement;
});
