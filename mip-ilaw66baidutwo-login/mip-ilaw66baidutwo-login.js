/**
 * @file mip-ilaw66baidutwo-login 组件
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
        //           	alert("W")
        var interval;
        var min;
        var sec;
        var timeout = 60;
        var loginTimes = parseInt($el.find('#error').val().slice(5, 6), 10);
        var csrfToken = $el.find('#_csrf').val();
        var channel = 'baidusearch';
        var userId = false;
        var head = $el.find('.header_block');
        var t1;
        var phoneChangedFlagAndHasOrderUnpaid = false;
        var channelInUrl = getQueryString('channel');
        var MIP = window.MIP;
        var sesidtype = getQueryString('questionType');
        var sessionId = getQueryString('sessionId');

        if (!channel && channelInUrl) {
            channel = channelInUrl;
        }

        var hosturl = 'https://www.ilaw66.com/jasmine/';
        function returhostname() {
            var hostweb = location.protocol;
            var hostname = location.hostname;
            console.log(hostname);
            if (hostname === 'www-ilaw66-com.mipcdn.com' || hostname === 'www.ilaw66.com') {
                hosturl = 'https://www.ilaw66.com/jasmine/';
            }
            else if (hostname === 'localhost') {
                var hostport = location.port;
                hosturl = 'http://' + hostname + ':' + hostport + '/jasmine/';
            }
            else if (hostname === 'test-ilaw66-com.mipcdn.com') {
                hosturl = 'https://test.ilaw66.com/jasmine/';
            }
            else {
                hosturl = 'https://' + hostname + '/jasmine/';
            }
        }
        returhostname();

        function locahost(topsurl, toptitle) {
            if (topsurl === './') {
                topsurl = 'baidusearch';
            }

            var topurl = hosturl + topsurl;
            if (MIP.viewer.isIframed) {
                if (topsurl === 'baidusearch') {
                    window.top.location.href = 'https://m.baidu.com/mip/c/s/www.ilaw66.com/jasmine/baidusearch';
                }
                else {
                    MIP.viewer.sendMessage('loadiframe', {
                        title: toptitle,
                        click: '',
                        url: topurl
                    });
                }
            }
            else {
                location.assign(topurl);
            }
        }

        var mipsesid = 'mip-login-xzh:sessionId:' + hosturl + 'baidusearch/authorize2';
        sessionId = localStorage.getItem(mipsesid);
        console.log(sessionId);
        this.addEventAction('login', function (event) {
            console.log('授权成功');
            var sessid = event.sessionId;
            sessionId = sessid;
            var islogin = parseInt(event.userInfo.isLogin, 10);
            if (!islogin) { // 未注册
                userId = false;
            }
            else {
                console.log('登录成功');
                sessionId = sessid;
                userId = true;
            }
        });
        //      alert(sessionId)
        //      localStorage.setItem(mipsesid, data.sessionId);

        //      console.log(hosturl);
        setTimeout(function () {
            $el.find('.loading_pop').hide();
        }, 2000);

        $el.find('.header_block .headertitle').html('准备咨询');
        $el.find('.header_block').css('color', '#000');
        $el.find('.header_block').css('background', '#fff');
        $el.find('.glyphicon').css('color', '#000000');
        $el.find('#sms').css('color', '#4992FF');
        if (sessionStorage.getItem('ishomeorder')) {
            $el.find('#login').text('提交');
        }
        else {
            $el.find('#login').text('去匹配律师');
        }
        $el.find('.popUp_sysErr').css('position', 'fixed');
        $el.find('#login').css('background', '#3388FF');
        $el.find('#login').css('height', '45px');
        $el.find('.radio-rule').show();
        $el.find('.botText01').show();
        $el.find('#botText_div').hide();

        if (head && head.is(':hidden')) {
            $el.find('.content_inputCodeText').css({
                top: '3.76rem'
            });
        }

        //      function choose(channel) {
        //         $el.find('head').append('<link href="css/wenlvshi.eleme.css?20180619"'
        //                      + ' rel="stylesheet" type="text/css" />');
        //      }
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
        if (channel === 'baidusearch' || channel === 'baidu_xzh') { // 返回《按钮
            $el.find('#precautions-back').click(function () {
                sessionStorage.clear('ishomeorder');
                if (channel === 'baidusearch' || channel === 'baidu_xzh') {
                    //                  window.top.location.href = './';
                    locahost('./', '开始咨询');
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
                //              window.top.location.href = 'rule';
                locahost('rule', '分秒律师用户服务协议');
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
                if (channel === 'baidusearch' || channel === 'baidu_xzh') {
                    if ($el.find('#login').hasClass('noChecked')
                        && !$el.find('#radio-rule-iconCT002').hasClass('isChecked')) {
                        alert('请阅读并同意《分秒律师用户服务协议》');
                        return false;
                    }
                    else {
                        var flag = sessionStorage.getItem('loginFlg');
                        if (userId) {
                        // 修改手机号
                        //                          updateTel();
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
        function startConsulting(questionType) {
            var ajaxdatas = {};
            ajaxdatas.questionType = questionType;
            ajaxdatas._csrf = $el.find('#_csrf').val();
            ajaxdatas.channel = 'baidusearch';
            ajaxdatas.sessionId = sessionId;
            $.ajax({
                url: hosturl + 'greeting2',
                type: 'POST',
                data: ajaxdatas,
                success: function (datas) {
                    var indexmessage = datas.data;
                    if (localStorage.getItem('baiduquestionType')) {
                        localStorage.removeItem('baiduquestionType');
                    }

                    if (indexmessage === 'ERROR' || indexmessage === 'ERROR1') {
                        //                      $el.find('#sendSMSError_msg').text('系统异常，请返回重新咨询');
                        //                      $el.find('.popUp_sysErr').fadeIn();
                        setTimeout(function () {
                            locahost('./', '电话咨询');
                        }, 1500);
                    }
                    else if (indexmessage === 'ERROR2') {
                        //                      $el.find('#sendSMSError_msg').text('您有订单未支付，请支付后再咨询');
                        //                      $el.find('.popUp_sysErr').fadeIn();
                        setTimeout(function () {
                            locahost('./', '电话咨询');
                        }, 1500);
                    }
                    else if (indexmessage === 'ERROR3') {
                        //                      $el.find('#sendSMSError_msg').text('您有订单未结束，请等待1分钟后再试');
                        //                      $el.find('.popUp_sysErr').fadeIn();
                        setTimeout(function () {
                            locahost('./', '电话咨询');
                        }, 1500);
                    }
                    else if (indexmessage === 'ERROR4') {
                        //                      $el.find('#sendSMSError_msg').text('您今日取消咨询已达3次，请明天再来');
                        //                      $el.find('.popUp_sysErr').fadeIn();
                        setTimeout(function () {
                            locahost('./', '电话咨询');
                        }, 1500);
                    }
                    else {
                        var requesturl = 'mipilaw66baidu'
                            + '_request?data=' + indexmessage + '&questionType=' + questionType
                            + '&sessionId=' + sessionId;
                        locahost(requesturl, '匹配律师');
                    }

                },
                error: function () {
                    $el.find('#sendSMSError_msg').text('匹配律师发生错误，请返回首页重新下单！');
                    $el.find('.popUp_sysErr').fadeIn();
                    //                  window.location.reload();
                }
            });
        }
        function login() {
            var phone = $el.find('#username').val();
            if (check(phone)) {
                var smsCode = $el.find('#password').val();
                if (smsCode === '') {
                    $el.find('#sendSMSError_msg').text('请输入正确验证码');
                    $el.find('.popUp_sysErr').fadeIn();
                    return;
                }

                $.ajax({
                    type: 'POST',
                    url: hosturl + 'baidusearch/login?username=' + phone + '&channel='
                        + channel + '&password=' + smsCode + '&sessionId=' + sessionId,
                    success: function (data) {
                        if (data.status === 0 && data.data.isLogin === '1') {
                            var sesidtypes = localStorage.getItem('baiduquestionType');
                            //                          console.log(sesidtypes);
                            if (!sesidtype && sesidtypes) {
                                sesidtype = sesidtypes;
                            }

                            if (sesidtype) {
                                startConsulting(sesidtype);
                            }
                            else {
                                locahost('./', '电话咨询');
                            }
                        }

                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 500) {
                            $el.find('#sendSMSError_msg').text(jqXHR.responseJSON.data);
                            $el.find('.popUp_sysErr').fadeIn();
                            //    	console.log(jqXHR.responseJSON.data)
                        }

                    }
                });
            }

            sessionStorage.clear('ishomeorder');
        }

        function sendSms() {
            var phone = $el.find('#username').val();
            if (check(phone)) {
                $el.find('#sms').prop('disabled', true).off('click');

                /** 倒计时*/
                $el.find('#sms').text(timeout + 's');
                var dateTime = new Date();
                min = dateTime.getMinutes();
                sec = dateTime.getSeconds();
                interval = setInterval(function () {
                    fnDate();
                }, 1000);

                /** 发送短信*/
                //              var flag = sessionStorage.getItem('loginFlg');

                //                              if (userId) { // 修改手机号
                $.ajax({
                    type: 'GET',
                    url: hosturl + 'sms?phone=' + phone + '&channel=' + channel
                        + '&sessionId=' + sessionId,
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
                            $el.find('#sendSMSError_msg').text('10分钟内不能重复发送');
                            $el.find('.popUp_sysErr').fadeIn();
                        }

                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 500) {
                            $el.find('#sendSMSError_msg').text(jqXHR.responseJSON.data);
                            $el.find('.popUp_sysErr').fadeIn();
                            //    	console.log(jqXHR.responseJSON.data)
                        }

                    }
                });
                //                              }
                //              else {
                //              $.ajax({
                //                  type: 'GET',
                //                  url: hosturl + 'sendSms?phone=' + phone + '&channel=' + channel
                //                      + '&_csrf=' + csrfToken + '&sessionId=' + sessionId,
                //                  success: function (data) {
                //                      if (data === 'ERROR') {
                //                          $el.find('#sendSMSError_msg').text('发送短信失败');
                //                          $el.find('.popUp_sysErr').fadeIn();
                //                      }
                //                      else if (data === 'ERROR1') {
                //                          $el.find('#sendSMSError_msg').text('链接异常');
                //                          $el.find('.popUp_sysErr').fadeIn();
                //                      }
                //                      else if (data === 'ERROR2') {
                //                          $el.find('#sendSMSError_msg').text('您已申请过，请稍后申请');
                //                          $el.find('.popUp_sysErr').fadeIn();
                //                      }
                //
                //                  }
                //              });
                //              }
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
                url: hosturl + 'baidusearch/updatePhone?phone=' + phone
                    + '&code=' + smsCode + '&sessionId=' + sessionId + '&_csrf='
                    + csrfToken + '&channel=' + channel,
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
                    if (jqXHR.status === 500) {
                        $el.find('#sendSMSError_msg').text(jqXHR.responseJSON.data);
                        $el.find('.popUp_sysErr').fadeIn();
                        //    	console.log(jqXHR.responseJSON.data)
                    }

                }
            });
        }

    };

    return customElement;
});
