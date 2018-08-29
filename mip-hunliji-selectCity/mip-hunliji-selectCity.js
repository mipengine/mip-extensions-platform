/**
 * @file mip-hunliji-selectCity 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');

    var customElement = require('customElement').create();

    function gitCity(api, element) {
        $.ajax({
            url: api,
            type: 'get',
            success: function (result) {
                var addhtml = '';
                for (var i = 0; i < result.data.length; i++) {
                    addhtml += '<span data-id="' + result.data[i].cid + '">' + result.data[i].name + '</span>';
                }
                $(element).find('#selectCity dd').append(addhtml);
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        gitCity(element.getAttribute('urlApi'), element);
        $(element).find('dt').on('click', function () {
            $(this).find('input').blur();
            $(element).find('dd').show();
        });
        $(element).on('click', '#select_cityname span', function () {
            var addcid = $(this).attr('data-id');
            $(element).find('#select_cid').val(addcid);
            $(element).find('dd').hide();
            $(element).find('#select_city').val($(this).html());
        });
        $(element).on('click', '#close_select', function () {
            $(element).find('#select_cityname').hide();
        });
    };

    return customElement;
});
