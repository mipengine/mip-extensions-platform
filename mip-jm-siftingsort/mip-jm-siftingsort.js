/**
 * @file mip-jm-siftingsort 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    $('.side_left li').click(function () {
        $(this).addClass('side_left_active').siblings().removeClass('side_left_active');
        bianhuan($(this), $(this).attr('data-pinyin'));
    });

    function bianhuan(obj, pinyin) {
        $.ajax({
            type: 'post',
            url: '/Common/cate_lst',
            data: {
                ppinyin: pinyin
            },
            dataType: 'json',
            success: function (data) {
                $('.get_catelists').empty();
                if (data.length > 0) {
                    var html = '<li class="side_right_active"><a data-type="mip" href="/'
                        + data[0].ppinyin + '/">' + data[0].name + '</a></li>';
                    for (var i = 1; i < data.length; i++) {
                        html += '<li>'
                            + '<a data-type="mip" href="/' + data[i].ppinyin
                            + '/' + data[i].cpinyin + '/">' + data[i].name + '</a>'
                            + '</li>';
                    }
                }
                else {
                    var html = '<li class="side_right_active"><a data-type="mip" href="/'
                        + data[0].ppinyin + '/">' + data[0].name + '</a></li>';
                }
                $('.get_catelists').html(html);
            }
        });
    }
    customElement.prototype.firstInviewCallback = function () {
        // TODO
    };

    return customElement;
});
