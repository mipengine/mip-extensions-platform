/**
 * @file mip-yuandun-vcode 组件
 * @author
 */
define(function (require) {
    var orderCounter = 60;
    var orderCounterId = -1;
    var $ = require('zepto');
    function startOrderCounter() {
        if (orderCounter <= 0) {
            clearInterval(orderCounterId);
            $('#vcodeBtn').html('获取验证码');
            orderCounter = 60;
            orderCounterId = -1;
            return;
        }
        $('#vcodeBtn').html(orderCounter + '秒后重试');
        orderCounter--;
    }
    function error(baseResult) {
        if (baseResult.status === 1) {
            orderCounterId = setInterval(startOrderCounter, 1000);
            return;
        }
        $('div[on="tap:mip_order.close"]').trigger('click');
        $('#msg-content').html(baseResult.message);
        $('#alert-msg-btn').trigger('click');
        setTimeout(function () {
            $('div[on="tap:mip_alertmsg.close"]').trigger('click');
            $('#start-app').trigger('click');
        }, 1000);
    }
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('vcodeurl');
        element.addEventListener('click', function () {
            if (orderCounterId > 0) {
                return;
            }
            var patternPhone = /^1[34578]\d{9}$/;
            var mobile = $('#mobile').val();
            if (!patternPhone.test(mobile)) {
                $('div[on="tap:mip_order.close"]').trigger('click');
                $('#msg-content').html('错误的手机号码');
                $('#alert-msg-btn').trigger('click');
                setTimeout(function () {
                    $('div[on="tap:mip_alertmsg.close"]').trigger('click');
                    $('#start-app').trigger('click');
                }, 1000);
                return;
            }
            var formData = new FormData();
            formData.append('mobile', mobile);
            var opts = {
                method: 'POST',
                body: formData
            };
            fetch(url, opts)
            .then(function (responseText) {
                return responseText.json();
            })
            .then(function (baseResult) {
                error(baseResult);
            })
            .catch(function (error) {
            });
        });
    };
    return customElement;
});
