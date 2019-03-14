/**
 * @file mip-jm-select 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    // zepto一些方法不支持，比如is,animate等，所以使用jquery;
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $el.find('.select-text').click(function () {
            $(this).parents('.relaxed_step_option').find('.for-option').fadeIn();
            $(this).parents('.relaxed_step').siblings('.relaxed_step').find('.for-option').fadeOut();
        });
        $el.find('.select-red').click(function () {
            $(this).parents('.relaxed_step_option').find('.for-option').fadeOut();
        });

        $('.relaxed_step_option').on('click', '.for-option li', function () {
            var index = $(this).index();
            $(this).addClass('select-li');
            $(this).siblings('li').removeClass('select-li');
            $(this).parents('.relaxed_step_option').find('.select-text').text($(this).text());
            $(this).parents('.relaxed_step_option').find('.for-option').fadeOut();
        });

        $(document).click(function (event) {
            var con = $el.find('.relaxed_step_option'); // 设置目标区域
            if (!con.is(event.target) && con.has(event.target).length === 0) {
                $el.find('.for-option').fadeOut();
            }

        });
        $el.find('.fixed_cirle1').click(function () {
            $el.find('.fixedshow').addClass('fixedshowbug');
            $el.find('.dialog_relaxed').show();
        });
        $el.find('.delete').click(function () {
            $el.find('.dialog_relaxed').hide();
            $el.find('.fixedshow').removeClass('fixedshowbug');
        });
        $el.find('.on_look').click(function () {
            $el.find('.relaxed_text1').hide();
            $el.find('.relaxed_text2').show();
        });

        $el.find('.relaxed_step1 .for-option ul li').click(function () {
            selCate($(this).attr('data-id'));
        });

        function selCate(catepid) {
            $.ajax({
                type: 'post',
                url: '/Project/getList',
                data: {
                    'cate_pid': catepid
                },
                success: function (data) {
                    var str = '<li style="display: none;">请选择</li>';
                    var items = data.data;
                    if (items.length > 0) {
                        $.each(items, function (index, item) {
                            str += '<li project-id="' + item.id + '">'
                                + item.name + '</li>';
                        });
                    }

                    $el.find('.get_pinpai').html(str);
                },
                error: function (data) {}
            });
        }

        $('body').on('click', '.Immediatelycheck', function () {
            var content = '预计投资费用：' + $el.find('.relaxed_step3 .select-text').text();
            $el.find('.relaxed_step1 .select-text').text() === '请选择加盟行业'
                ? $el.find('.industry').text('')
                : $el.find('.industry').text($el.find('.relaxed_step1 .select-text').text());
            $el.find('.relaxed_step2 .select-text').text() === '请选择加盟品牌'
                ? $el.find('.trademark').text('')
                : $el.find('.trademark').text($el.find('.relaxed_step2 .select-text').text());
            $el.find('.relaxed_step3 .select-text').text() === '请选择加盟费用'
                ? $el.find('.charge').text('')
                : $el.find('.charge').text($el.find('.relaxed_step3 .select-text').text());
            $el.find('.chargevalue').val(content);
            $el.find('.cateid').val($el.find('.relaxed_text1 .select-li').attr('data-id'));
            $el.find('.projectid').val($el.find('.get_pinpai .select-li').attr('project-id'));
        });
    };
    return customElement;
});
