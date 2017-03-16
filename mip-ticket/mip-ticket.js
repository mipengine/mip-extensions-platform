/**
 * @file mip-ticket 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        // TODO
        var element = this.element;
        var totalpay = element.querySelector('[totalpay]');
        var ticketname = element.querySelector('[ticketname]');
        var totalnum = element.querySelector('[totalnum]');
        var priceid = element.querySelector('[priceid]');
        var $element = $(element);
        $element.on('click',  '.mip-ticket-list', function () {
            var name = $(this).attr('data-name');
            var price = $(this).attr('data-price');
            var id = $(this).attr('data-id');
            var $number = $(this).find('.mip-number');
            var num = parseInt($number.text(), 0);
            if (ticketname.tagName === 'INPUT') {
                $(ticketname).val(name);
            }
            else {
                $(ticketname).text(name);
            }
            if (totalnum.tagName === 'INPUT') {
                $(totalnum).val(num);
            }
            else {
                $(totalnum).text(num);
            }
            if (totalpay.tagName === 'INPUT') {
                $(totalpay).val(num * price);
            }
            else {
                $(totalpay).text(num * price);
            }
            if (priceid.tagName === 'INPUT') {
                $(priceid).val(id);
            }
            else {
                $(priceid).text(id);
            }
            $element.find('.mip-ticket-list').eq($(this).index()).addClass('active').siblings().removeClass('active');
            $('.all').text('￥' + num * price);
        });
        $element.find('.mip-ticket-list').on('click', '.mip-btn', function () {
            var role = $(this).attr('role');
            var $ticket = $(this).parents('.mip-ticket-list');
            var max = $ticket.attr('data-max');
            var min = $ticket.attr('data-min');
            var price = $ticket.attr('data-price');
            var $number = $ticket.find('.mip-number');
            var num = parseInt($number.text(), 0);
            if (role === 'add') {
                if (num <= max) {
                    $number.text(num + 1);
                }
            }
            else if (role === 'sub') {
                if (num > min) {
                    $number.text(num - 1);
                }
            }

            if (totalnum.tagName === 'INPUT') {
                $(totalnum).val(num);
            }
            else {
                $(totalnum).text(num);
            }
            if (totalpay.tagName === 'INPUT') {
                $(totalpay).val(num * price);
            }
            else {
                $(totalpay).text(num * price);
            }
            $('.all').text('￥' + num * price);
        });
    };

    return customElement;
});
