/**
 * @file mip-yuandun-appointment 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    function baseResultFun(baseResult) {
        if (baseResult.status === 1) {
            $('#msg-content').html(baseResult.message);
            $('#alert-msg-btn').trigger('click');
            setTimeout(function () {
                $('div[on="tap:mip_alertmsg.close"]').trigger('click');
                window.location.reload();
            }, 2000);
        }
        else {
            $('#msg-content').html(baseResult.message);
            $('#alert-msg-btn').trigger('click');
            setTimeout(function () {
                $('div[on="tap:mip_alertmsg.close"]').trigger('click');
                $('#start-app').trigger('click');
            }, 1000);
        }
    }
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('appurl');
        element.addEventListener('click', function () {
            $('#MIP-LLIGTBOX-MASK').trigger('click');
            var name = $('#name').val();
            var mobile = $('#mobile').val();
            var emotion = $('#emotion').val();
            var problem = $('#problem').val();
            var vcode = $('#vcode').val();
            var time = $('#time').val();
            var formData = new FormData();
            formData.append('name', name);
            formData.append('mobile', mobile);
            formData.append('emotion', emotion);
            formData.append('problem', problem);
            formData.append('vcode', vcode);
            formData.append('time', time);
            var opts = {
                method: 'POST',
                body: formData
            };
            fetch(url, opts)
            .then(function (responseText) {
                return responseText.json();
            })
            .then(function (baseResult) {
                baseResultFun(baseResult);
            })
            .catch(function (error) {
            });
        });
    };
    return customElement;
});
