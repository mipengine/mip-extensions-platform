/**
 * @file mip-ilaw66-baidu-lawyer_noresponse 组件
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
        var lawyerId;
        var $el = $(this.element);
        $(function () {
            var channel = localStorage.getItem('channel');
            if (channel === 'winbaoxian') {
                $el.find('.header_block').hide();
            }

            $el.find('.glyphicon-menu-left').on('click', function () {
                if (!sessionStorage.getItem('loginFlg') && sessionStorage.getItem('loginFlg') === 0) {
                    window.top.location.href = 'mipilaw66baidu_login';
                }
                else {
                    window.top.location.href = './';
                }
            });

            lawyerId = getQueryString('lawyerId');

            var channel = localStorage.getItem('channel');
            var fromChannel = localStorage.getItem('fromChannel');
            var currentHours = new Date().getHours();

            if (currentHours <= 8 && currentHours >= 23) {
                // 非工作时间
                // 应 修改
                $el.find('#js-continueAsk').hide();
                $el.find('.main_text_nonworking').show();
                $el.find('.main_text_busy').hide();
                $el.find('#js-textConsulting').css({
                    'background-color': '#3388FF',
                    'color': '#fff'
                });
            }

            var questionType = getQueryString('questionType');
            var csrfToken = $el.find('#_csrf').val();
            // 点击重新匹配律师按钮
            $el.find('#js-continueAsk').on('touchstart', function () {
                $.ajax({
                    type: 'get',
                    url: 'greeting?questionType=' + questionType + '&_csrf=' + csrfToken,
                    success: function (data) {
                        if (data === 'ERROR' || data === 'ERROR1') {
                            $el.find('#err_msg').html('系统异常，请返回重新咨询');
                            $el.find('.popUp_sysErr').fadeIn();
                        }
                        else if (data === 'ERROR2') {
                            $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
                            $el.find('.popUp_sysErr').fadeIn();
                        }
                        else if (data === 'ERROR3') {
                            $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
                            $el.find('.popUp_sysErr').fadeIn();
                        }
                        else {
                            if (lawyerId) {
                                window.top.location.href = 'mipilaw66baidu_request?data=' + data + '&questionType='
                                    + questionType + '&lawyerId=' + lawyerId;
                            }
                            else {
                                window.top.location.href = 'mipilaw66baidu_request?data='
                                    + data + '&questionType=' + questionType;
                            }
                        }
                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }

                    }
                });
            });

            // 文字咨询按钮
            $el.find('.ruleask').click(function () {
                window.top.location.href = 'https://m.baidu.com/zhuanjia/question#/submit?vn=law&ref=alaqiang&ssid=0&from=0&uid=0&pu=csrc%40app_secr_txt,sz%401320_2001,ta%40iphone_1_11.2_22_2.8,usm%406&bd_page_type=1&baiduid=F90644066BC91C4E0285A23EFBBC5CC9&tj=2gs_2_0_10_l1&htrackid=6ec1913b5246ead3b67a15bc5d256a75';
            });

            // 点击弹窗错误按钮
            $el.find('#err_confirm').click(function () {
                $el.find('.popUp_sysErr').hide();
            });
        });
        // 获取url参数
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }
    };

    return customElement;
});
