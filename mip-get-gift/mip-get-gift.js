/**
 * @file mip-get-gift 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var giftId = ele.getAttribute('gift_id');
        var mobileDomain = ele.getAttribute('mobile_domain');

        ele.addEventListener('click', function () {
            var options = {
                url: mobileDomain + 'index.php?c=welfare&a=get_gift',
                type: 'POST',
                dataType: 'json',
                data: {'gift_id': giftId},
                success: function (data) {
                    if (data.code === 2) {
                        window.top.location.href = mobileDomain + 'account.php?c=account';
                    }
                    else if (data.code === 1) {
                        $('#rest_num_' + giftId).html($('#rest_num_' + giftId).html() - 1);
                        ele.className = ele.className.replace('get_welfare', 'have_getten');
                        ele.innerHTML = '已领取';
                        showTip(data, 0);
                    }
                    else if (data.code === 10) {
                        showTip(data, 1);
                    }
                    else {
                        showTip(data, 0);
                    }
                }
            };
            $.ajax(options);
        });
    };
    return customElement;
});

function showTip(data, flag) {
    $('.rec_gift_mask').fadeIn(100).removeClass('hide');
    $('.rec_tip').fadeIn(100).removeClass('hide');
    $('.all_content').css('overflow-y', 'hidden');
    if (flag === 1) {
        $('#received').css('font-size', '13px');
        $('#received').html(data.msg);
        $('.received').removeClass('hide');
        $('.dis_received').addClass('hide');
    }
    else {
        if (data.code === 1) {
            $('.received').addClass('hide');
            $('.dis_received').removeClass('hide');
            $('#gift_code').html(data.gift_code);
            $('#receive_msg').html('恭喜您领取成功！');
            $('.dis_received_bbs').addClass('hide');
        }
        else if (data.code === 5) {
            $('.received').addClass('hide');
            $('.dis_received').removeClass('hide');
            $('#gift_code').html(data.gift_code);
            $('#receive_msg').html(data.msg);
            $('.dis_received_bbs').addClass('hide');
        }
        else if (data.code === 24) {
            $('.dis_received_bbs').attr('gid', data.game_id);
            $('.received').removeClass('hide');
            $('#received').html(data.msg);
            $('.dis_received').addClass('hide');
            $('.dis_received_bbs').removeClass('hide');
        }
        else {
            $('.received').removeClass('hide');
            $('#received').html(data.msg);
            $('.dis_received').addClass('hide');
            $('.dis_received_bbs').addClass('hide');
        }
    }
}
