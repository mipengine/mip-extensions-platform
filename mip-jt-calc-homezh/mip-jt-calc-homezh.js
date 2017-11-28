/**
 * @file mip-jt-calc-homezh 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    customElement.prototype.firstInviewCallback = function () {
        // TODO

        $('#calculator').click(function () {
            $('#result').val('正在计算...');
            var money = $('#amount').val();
            var regex = /^[0-9]*(\.[0-9]{1,100})?$/;
            if (money === '') {
                alert('请输入兑换金额！');
                $('#amount').focus();
                return;
            }
            if (!regex.test(money)) {
                alert('兑换金额输入不正确！');
                $('#amount').focus();
                return;
            }
            var from = $('#keyfrom').val();
            var to = $('#keyto').val();
            var param = 'from=' + from + '&to=' + to + '&amount=' + money;
            var url = 'https://api.jijinhao.com/plus/unitResult.htm?' + param;
            // $.getScript(url, function () {
            //     $('#result').val(result);
            // });
            $.ajax({
                url: url,
                type: 'get',
                success: function (res) {
                    var result = res.split('\'');
                    $('#result').val(result[1]);
                }
            });
        });

    };

    return customElement;
});
