/**
 * @file mip-anlian-validate 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var Prefix = 'http://' + location.host;

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $element = $(this.element);
        var submit = $element.find('#submit');
        var uName = $element.find('#name');
        var uPhone = $element.find('#phone');
        var uEmail = $element.find('#email');
        var layer = $element.find('.layer');

        function layerMsg(msg) {
            layer.addClass('on');
            layer.text(msg);
            setTimeout(function () {
                layer.removeClass('on');
            }, 2000);
            return;
        }

        submit.on('click', function () {
            var name = uName.val();
            var mobile2 = uPhone.val();
            var email = uEmail.val();
            var alertMsg = '';
            if (!name) {
                alertMsg = '请填写姓名';
                layerMsg(alertMsg);
                return;
            }
            var patternPhone = /^1[34578]\d{9}$/;
            if (!patternPhone.test(mobile2)) {
                alertMsg = '手机号格式不正确!';
                layerMsg(alertMsg);
                return;
            }
            if (!email) {
                alertMsg = '请填写邮箱';
                layerMsg(alertMsg);
                return;
            }

            /* eslint-disable max-len */
            var patternEmail = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
            /* eslint-enable max-len */
            if (!patternEmail.test(email)) {
                alertMsg = '邮箱格式不正确!';
                layerMsg(alertMsg);
                return;
            }
            $.ajax({
                type: 'POST',
                url: Prefix + '/action/information.php',
                data: {
                    email: email,
                    mobile: mobile2,
                    name: name
                },
                dataType: 'json',
                success: function (data) {
                    if (typeof data === 'string') {
                        try {
                            data = $.parseJSON(data);
                        }
                        catch (e) {

                        }
                    }
                    if (data.status === 1) {
                        alertMsg = data.msg;
                        layerMsg(alertMsg);
                        location.href = Prefix;
                    }
                    else {
                        alertMsg = data.msg;
                        layerMsg(alertMsg);
                        return;
                    }
                },
                error: function (jqXHR) {
                    alertMsg = '发生错误：' + jqXHR.status + ',' + jqXHR.readyState;
                    layerMsg(alertMsg);
                    return;
                }
            });
        });
    };
    return customElement;
});
