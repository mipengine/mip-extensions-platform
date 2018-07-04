/**
 * @file mip-ilaw66-give-coupons 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
//      var mycardandcouponsUseddetailsDate;
        var channel = localStorage.getItem('channel');
        $el.find('.mycardandcoupons_sendanyone__btn').css('background', '#FF6100');
        $el.find('.header_block').hide();

        // 未使用卡券赠送页面，点击送卡跳转start
        var csrfToken = document.getElementById('csrf').value;
        //  激活按钮获取
        var immediatelyactivation = document.getElementById('sendtoanyone');
        var stateimg = document.getElementById('stateimg');
        //  激活状态获取
        var statebg = document.getElementById('statebg');
        //  输入提示获取
        var popbg = document.getElementById('popbg');
        var gotype = document.getElementById('gotype');

        var stateflg = true;
        $el.find('.mycardandcoupons_sendanyone__btn').click(function (event) {
            var activationid = document.getElementById('activationid').value;
            var activationidagain = document.getElementById('activationidagain').value;
            if (!activationid) {
                popbg.style.display = 'block';
            } else if (!activationidagain) {
                popbg.style.display = 'block';
                $el.find('#telephonecontent').html('请再次输入朋友的手机号');
            } else if (activationid !== activationidagain) {
                popbg.style.display = 'block';
                $el.find('#telephonecontent').html('输入号码不一致，请确认');
            } else {
                var cardType = getQueryString('cardtype');
                var cardid = getQueryString('cardid');

                $.ajax({
                    url: 'card/sendCard',
                    type: 'post',
                    data: {
                        id: cardid,
                        type: cardType,
                        phone: activationid,
                        channel: channel,
                        csrf: $el.find('#csrf').val()
                    },
                    success: function (data) {
                        if (data.code === 200) {
                            stateimg.src = 'images/wx_bg_success.png';
                            stateflg = true;
                        } else {
                            stateimg.src = 'images/wx_bg_fail.png';
                            stateflg = false;
                        }
                        $el.find('#gocheck').html('确定');
                        statebg.style.display = 'block';
                        // 显示激活状态内容
                        $el.find('#statemsg').html(data.message);

                        var gocheck = document.getElementById('gocheck');
                        // 点击【去查看】
                        gocheck.addEventListener('click',
                        function () {
                            if (stateflg) {
                                statebg.style.display = 'none';
                                window.top.location.href = 'mycardandcoupons';
                            } else {
                                statebg.style.display = 'none';
                            }
                        });

                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }
//                      loadStatus = 'error';
                    }
                });
            }
        });

        // “请输入朋友的手机号”点击【好的】
        gotype.addEventListener('click',
        function () {
            popbg.style.display = 'none';
        });
        // 未使用卡券赠送页面，点击送卡跳转end
        // 解析url参数值
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }
        }
    };

    return customElement;
});
