/**
 * @file mip-jm-siftingsort 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $el.find('.side_left li').click(function () {
            $(this).addClass('side_left_active').siblings().removeClass('side_left_active');
            $el.find('.siftingsort').val($(this).attr('data-pinyin'));
            ajaxRequest($el.find('.siftingsort').val());
        });
        // ajax请求获取页面跳转地址
        function ajaxRequest(pinyin) {
            var formData = new FormData();
            var formUrl = '/Common/cate_lst';
            formData.append('ppinyin', pinyin);
            fetch(formUrl, {
                method: 'POST',
                body: formData
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                if (response) {
                    $el.find('.get_catelists').empty();
                    if (response.length > 0) {
                        var html = '<li class="side_right_active"><a data-type="mip" href="/'
                        + response[0].ppinyin + '/">' + response[0].name + '</a></li>';
                        for (var i = 1; i < response.length; i++) {
                            html += '<li>'
                            + '<a data-type="mip" href="/' + response[i].ppinyin
                            + '/' + response[i].cpinyin + '/">' + response[i].name + '</a>'
                            + '</li>';
                        }
                    }
                    else {
                        var html = '<li class="side_right_active"><a data-type="mip" href="/'
                        + response[0].ppinyin + '/">' + response[0].name + '</a></li>';
                    }
                    $el.find('.get_catelists').html(html);
                }

            }).catch(function (e) {});
        }
    };

    return customElement;
});
