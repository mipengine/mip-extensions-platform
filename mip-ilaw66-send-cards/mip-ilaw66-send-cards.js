/**
 * @file mip-ilaw66-send-cards 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    // zepto 不支持is方法属性选择器，所以要用到jquery
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
//      var mycardandcouponsUseddetailsDate;
        var channel = localStorage.getItem('channel');
        $el.find('.mycardandcoupons_sendanyone__btn').css('background', '#FF6100');
        $el.find('.header_block').hide();

        // 未使用卡券赠送页面，点击送卡跳转start
        var csrfToken = $el.find('#_csrf').val();
        //  激活按钮获取
        var immediatelyactivation = $el.find('#sendtoanyone');
        var stateimg = $el.find('#stateimg');
        //  激活状态获取
        var statebg = $el.find('#statebg');
        //  输入提示获取
        var popbg = $el.find('#popbg');
        var gotype = $el.find('#gotype');

        var stateflg = true;
        $el.find('.mycardandcoupons_sendanyone__btn').click(function (event) {
            var activationid = $el.find('#activationid').val();
            var activationidagain = $el.find('#activationidagain').val();
            if (!activationid) {
                popbg.css('display', 'block');
            } else if (!activationidagain) {
                popbg.css('display', 'block');
                $el.find('#telephonecontent').html('请再次输入朋友的手机号');
            } else if (activationid !== activationidagain) {
                popbg.css('display', 'block');
                $el.find('#telephonecontent').html('输入号码不一致，请确认');
            } else {
                var cardType = getQueryString('cardtype');
                var cardid = getQueryString('cardid');

                $.ajax({
                    url: 'card/sendCard?id=' + cardid + '&type=' + cardType + '&phone='
+ activationid + '&channel=' + channel + '&_csrf=' + csrfToken,
                    type: 'post',
                    success: function (data) {
                        if (data.code === 200) {
                            stateimg.src = 'images/wx_bg_success.png';
                            stateflg = true;
                        } else {
                            stateimg.src = 'images/wx_bg_fail.png';
                            stateflg = false;
                        }
                        $el.find('#gocheck').html('确定');
                        statebg.css('display', 'block');
                        // 显示激活状态内容
                        $el.find('#statemsg').html(data.message);

                        var gocheck = $el.find('#gocheck');
                        // 点击【去查看】
                        gocheck.on('click',
                        function () {
                            if (stateflg) {
                                statebg.css('display', 'none');
                                window.top.location.href = 'mycardandcoupons';
                            } else {
                                statebg.css('display', 'none');
                            }
                        });

                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }
                        var loadStatus = 'error';
                    }
                });
            }
        });

        // “请输入朋友的手机号”点击【好的】
        gotype.on('click',
        function () {
            popbg.css('display', 'none');
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
        $el.find('.glyphicon').on('click', function () {
            window.history.back(-1);
        });
    };

    return customElement;
});
