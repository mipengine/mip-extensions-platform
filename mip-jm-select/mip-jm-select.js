/**
 * @file mip-jm-select 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    // zepto一些方法不支持，比如is,animate等，所以使用jquery;
    var viewport = require('viewport');
    // 获取视口;
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var $fixedshow = $el.find('.fixedshow');
        var $dialog = $el.find('.dialog_relaxed');
        var $relaxedcontent = $el.find('.relaxed_content');
        var $industry = $el.find('.industry');
        var $trademark = $el.find('.trademark');
        var $charge = $el.find('.charge');
        var mo = function (e) {
            e.preventDefault();
        };

        function stop() {
            document.body.style.overflow = 'hidden';
            document.addEventListener('touchmove', mo, false); // 禁止页面滑动
        }

        /***取消滑动限制***/
        function move() {
            document.body.style.overflow = ''; // 出现滚动条
            document.removeEventListener('touchmove', mo, false);
        }
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
            var getScrollTop = viewport.getScrollTop();
            $fixedshow.addClass('fixedshowbug');
            $dialog.css('height', getScrollTop + 1000 + 'px').show();
            $relaxedcontent.css('top', getScrollTop + 300 + 'px');
            stop();
            $relaxedcontent.bind('touchmove', mo);
            $dialog.bind('touchmove', mo);
        });
        $el.find('.delete').click(function () {
            $dialog.hide();
            $fixedshow.removeClass('fixedshowbug');
            move();
        });
        $el.find('.on_look').click(function () {
            $el.find('.relaxed_text1').hide();
            $el.find('.relaxed_text2').show();
            stop();
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
                ? $industry.text('')
                : $industry.text($el.find('.relaxed_step1 .select-text').text());
            $el.find('.relaxed_step2 .select-text').text() === '请选择加盟品牌'
                ? $trademark.text('')
                : $trademark.text($el.find('.relaxed_step2 .select-text').text());
            $el.find('.relaxed_step3 .select-text').text() === '请选择加盟费用'
                ? $charge.text('')
                : $charge.text($el.find('.relaxed_step3 .select-text').text());
            $el.find('.chargevalue').val(content);
            $el.find('.cateid').val($el.find('.relaxed_text1 .select-li').attr('data-id'));
            $el.find('.projectid').val($el.find('.get_pinpai .select-li').attr('project-id'));
        });
    };
    return customElement;
});
