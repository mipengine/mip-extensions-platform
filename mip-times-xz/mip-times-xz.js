/**
 * @file 询问底价
 * @author times 程序部
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        getbrand();
        $(element).find('#dd_brand').change(function () {
            getseries();
        });
        $(element).find('#dd_series').change(function () {
            getcar();
        });
        $(element).find('.m_btn').click(function () {
            if ($.trim($(element).find('#dd_car').val()) === '0') {
                window.top.location.href = '/wap/order.html?sid=' + $(element).find('#dd_series').val();
            }
            else {
                window.top.location.href = '/wap/order.html?cid=' + $(element).find('#dd_car').val();
            }
        });
        function getbrand() {
            $(element).find('#dd_brand').html('');
            $(element).find('#dd_brand').append('<option value=\'0\'>选择品牌</option>');
            $(element).find('#dd_series').html('');
            $(element).find('#dd_series').append('<option value=\'0\'>选择车系</option>');
            $(element).find('#dd_car').html('');
            $(element).find('#dd_car').append('<option value=\'0\'>选择车型</option>');
            $.ajax({
                type: 'post',
                url: '/json/get-brand.js',
                cache: true,
                async: true,
                dataType: 'json',
                success: function (area) {
                    $.each(area, function (i, item) {
                        $(element).find('#dd_brand').append($('<option></option>').val(item.id).html(item.name));
                    });
                }
            });
        }
        function getseries() {
            $(element).find('#dd_series').html('');
            $(element).find('#dd_series').append('<option value=\'0\'>选择车系</option>');
            $(element).find('#dd_car').html('');
            $(element).find('#dd_car').append('<option value=\'0\'>选择车型</option>');
            $.ajax({
                type: 'post',
                url: '/json/get-brand-series.js',
                data: {id: $.trim($('#dd_brand').val())},
                cache: true,
                async: true,
                dataType: 'json',
                success: function (area) {
                    $.each(area, function (i, item) {
                        $(element).find('#dd_series').append($('<optgroup></optgroup>').attr('label', item.name));
                        $.each(item.data, function (i, data) {
                            $(element).find('#dd_series').append($('<option></option>').val(data.id).html(data.name));
                        });
                    });
                }
            });
        }
        function getcar() {
            $(element).find('#dd_car').html('');
            $(element).find('#dd_car').append('<option value=\'0\'>选择车型</option>');
            $.ajax({
                type: 'post',
                url: '/json/get-car.js',
                data: {id: $.trim($('#dd_series').val())},
                cache: true,
                async: true,
                dataType: 'json',
                success: function (area) {
                    $.each(area, function (i, item) {
                        $(element).find('#dd_car').append($('<optgroup></optgroup>').attr('label', item.name));
                        $.each(item.data, function (i, data) {
                            $(element).find('#dd_car').append($('<option></option>').val(data.id).html(data.name));
                        });
                    });
                }
            });
        }
    };

    return customElement;
});
