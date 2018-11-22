/**
 * @file mip-yifeng 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    $('.form_btn').on('click', function () {
        var banjiaType = $('#banjia_type').val();
        var startCity = $('#start_city').val();
        var endCity = $('#end_city').val();
        var mobile = $('#mobile').val();
        if (startCity === '') {
            $('.start_msg').show();
            return false;
        }
        if (endCity === '') {
            $('.end_msg').show();
            return false;
        }
        if (mobile === '' || !checkPhone(mobile)) {
            $('.mobile_msg').show();
            return false;
        }
        $.ajax({
            cache: true,
            dataType: 'json',
            crossDomain: true,
            type: 'POST',
            timeout: 4000,
            url: 'https://api.yifeng.com/admin/api/web_zixun/pass/yifeng',
            data: {
                'banjia_type': banjiaType,
                'start_city': startCity,
                'end_city': endCity,
                'mobile': mobile
            },
            async: true,
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                alert(XmlHttpRequest.responseText);
            },
            success: function (data) {
                console.log(data);
                if (data.status === 'true') {
                    $('.msg_p p').html(data.msg);
                    $('.msg_box').show();
                    setTimeout(function () {
                        $('.msg_box').hide();
                    }, 2000);
                }
                else {
                    $('.msg_p p').html(data.msg);
                    $('.msg_box').show();
                    setTimeout(function () {
                        $('.msg_box').hide();
                    }, 2000);
                }
            }
        });
        return false;
    });
    function checkPhone(phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    }
    setInterval(function () {
        var oneR = Math.floor(Math.random() * 10);
        $('#one mip-img').hide();
        $('#one mip-img').eq(oneR).show();
        var twoR = Math.floor(Math.random() * 10);
        $('#two mip-img').hide();
        $('#two mip-img').eq(twoR).show();
        var threeR = Math.floor(Math.random() * 10);
        $('#three mip-img').hide();
        $('#three mip-img').eq(threeR).show();
        var fourR = Math.floor(Math.random() * 10);
        $('#four mip-img').hide();
        $('#four mip-img').eq(fourR).show();
    }, 350);
});

