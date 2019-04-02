/**
 * @file mip-orderposts 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var timer = null;
        var currentIndex = 0;
        $('.container .page-section .pic-section').each(function () {
            $(this).height($(this).width());
        });
        $('.container .page-section.second, .container .page-section.third')
            .delegate('.pic-section', 'click', function () {
                $(this).closest('ul').find('.selected').removeClass('selected');
                $(this).addClass('selected');
                if (currentIndex === 2) {
                    if ($('.container .page-section.third .selected').parent().parent().index()) {
                        $('.container .page-section.fourth .subject').each(function () {
                            if ($('.container .page-section.second .sort-list')
                                .find('.selected').parent().parent().index()) {
                                $(this).find('.price-section img')
                                    .attr('src', 'http://www.damoujia.com/images/wise/preorder/price_1099.png');
                                $('.container .page-section.last .display-warpper.server .single-subject-price em')
                                    .text('￥1099');
                            } else {
                                $(this).find('.price-section img')
                                    .attr('src', 'http://www.damoujia.com/images/wise/preorder/price_999.png');
                                $('.container .page-section.last .display-warpper.server .single-subject-price em')
                                    .text('￥999');
                            }
                        });
                    } else {
                        $('.container .page-section.fourth .subject').each(function () {
                            if ($('.container .page-section.second .sort-list').find('.selected').parent().parent()
                                .index()) {
                                $(this).find('.price-section img')
                                    .attr('src', 'http://www.damoujia.com/images/wise/preorder/price_999.png');
                                $('.container .page-section.last .display-warpper.server .single-subject-price em')
                                    .text('￥999');
                            } else {
                                $(this).find('.price-section img')
                                    .attr('src', 'http://www.damoujia.com/images/wise/preorder/price_899.png');
                                $('.container .page-section.last .display-warpper.server .single-subject-price em')
                                    .text('￥899');
                            }
                        });
                    }
                    $('.container .page-section .user-selected').text($('.container .page-section.second .sort-list')
                        .find('.selected .inner-content').text() + ' ' + $('.container .page-section.third .sort-list')
                        .find('.selected .inner-content').text());
                    $('.container .page-section.last .display-warpper.server .title')
                        .text($('.container .page-section.second .sort-list')
                            .find('.selected .inner-content').text() + ' '
                            + $('.container .page-section.third .sort-list').find('.selected .inner-content').text());
                }
                slideAnimate(currentIndex + 1);
            });
        $('.container .page-section.fourth').delegate('.item-content', 'click', function () {
            $(this).toggleClass('selected');
            if ($('.container .page-section.fourth').find('.selected').length) {
                $('.container .page-section.fourth .btn-confirm').prop('disabled', false);
            } else {
                $('.container .page-section.fourth .btn-confirm').prop('disabled', true);
            }
        });
        $('.container .page-section.fourth').delegate('.btn-left, .btn-right', 'click', function (e) {
            if ($(this).hasClass('btn-left')) {
                if (parseInt($(this).parent().find('span').text(), 10) > 1) {
                    $(this).parent().find('span').text(parseInt($(this).parent().find('span').text(), 10) - 1);
                }
            } else {
                $(this).parent().find('span').text(parseInt($(this).parent().find('span').text(), 10) + 1);
            }
            e.stopPropagation();
        });
        $('.container .page-section .section-header button').click(function () {
            slideAnimate(currentIndex - 1);
        });
        $('.container .page-section.fourth .btn-confirm').click(function () {
            var secondIndex = $('.container .page-section.second .selected').parent().parent().index();
            var thirdIndex = $('.container .page-section.third .selected').parent().parent().index();
            var fgValues = $('.fg_values').val();
            var qkValues = $('.fg_values').val();
            $('<div class="title server-title">' + fgValues + '</div>').appendTo('.field');
            $('<div class="title server-title">' + qkValues + '</div>').appendTo('.field');
            var price = 0;
            if (secondIndex === 0) {
                if (thirdIndex === 0) {
                    price = 899;
                } else {
                    price = 999;
                }
            } else {
                if (thirdIndex === 0) {
                    price = 999;
                } else {
                    price = 1099;
                }
            }
            var sum = 0;
            var subjectCount = 0;
            var subsidiaryCount = 0;
            var html = '';
            $('.container .page-section.fourth .subject .selected').each(function () {
                sum += price * parseInt($(this).find('.handler-section span').text(), 10);
                subjectCount += parseInt($(this).find('.handler-section span').text(), 10);
                html += '<li><span>' + $(this).find('.pic-title').text() + '</span><em>' + $(this)
                    .find('.handler-section span').text() + ' x ￥' + price + '</em></li>';
            });
            $('.container .page-section.fourth .subsidiary .selected').each(function () {
                subsidiaryCount += parseInt($(this).find('.handler-section span').text(), 10);
                sum += 299 * parseInt($(this).find('.handler-section span').text(), 10);
                html += '<li><span>' + $(this).find('.pic-title').text() + '</span><em>' + $(this)
                    .find('.handler-section span').text() + ' x ￥299</em></li>';
            });
            if (subjectCount >= 3) {
                if (subsidiaryCount > 0) {
                    if (subsidiaryCount > 2) {
                        sum -= 299 * 2;
                        html += '<li><span>附属区优惠</span><em> -2 x ￥299</em></li>';
                    } else {
                        sum -= 299 * subsidiaryCount;
                        html += '<li><span>附属区优惠</span><em> -' + subsidiaryCount + ' x ￥299</em></li>';
                    }
                }
            }
            $('.container .page-section.last .display-warpper.fee ul').html(html);
            $('.container .page-section.last .display-warpper.fee .title em').text('￥' + sum);
            slideAnimate(currentIndex + 1);
        });

        $('.container .page-section.first .section-content button').click(function () {
            slideAnimate(currentIndex + 1);
        });

        $('.container .page-section.last .section-content button').click(function () {
            var $page = $('.container .page-section.last');
            var $name = $page.find('.input-name');
            var $tel = $page.find('.input-tel');
            var cityv = $('.input-city').val();
            if (!$name.val().length) {
                $('.input-name').parent().css({border: '1px solid red'});
                return;
            } else {
                $('.input-name').parent().css({border: 'none'});
            }
            var statueCode = validatePhone($tel.val());
            if (statueCode !== 1) {
                if (statueCode === 0) {
                    $('.input-tel').parent().css({border: '1px solid red'});
                    return;
                } else if (statueCode === 2) {
                    $('.input-tel').parent().css({border: '1px solid red'});
                    return;
                } else {
                    $('.input-tel').parent().css({border: '1px solid red'});
                    return;
                }
                return;
            } else {
                $('.input-tel').parent().css({border: 'none'});
            }
            if (!cityv) {
                $('.input-city').parent().css({border: '1px solid red'});
                return false;
            } else {
                $('.input-city').parent().css({border: 'none'});
            }
            submitInfo();
        });

        function validatePhone(number) {
            var len = number.length;
            if (len === 0) {
                return 0;
            } else if (len !== 11) {
                return 2;
            } else {
                var reg = /^\w*$/;
                if (!reg.test(number)) {
                    return 3;
                } else {
                    return 1;
                }
            }
        }

        function submitInfo() {
            var hs = $('.container .page-section.second .sort-list').find('.selected').parent().parent().index();
            var st = $('.container .page-section.third .sort-list').find('.selected').parent().parent().index() === 0
                ? 'online' : 'offline';
            var spaces = [];
            var mj = $('.input-mj').val();
            var city = $('.input-city').val();
            var fgValues = $('.fgValues').val();
            var qkValues = $('.qkValues').val();
            var waidi = $('.waidi:checked').val();

            $('.container .page-section.fourth .selected').each(function () {
                spaces.push($(this).find('.pic-title').text() + ':' + $(this).find('.handler-warpper span').text());
            });
            $.post('', {
                contactName: $('.container .page-section.last .input-name').val(),
                contactTel: $('.container .page-section.last .input-tel').val(),
                hs: hs,
                st: st,
                mj: mj,
                city: city,
                fgValues: fgValues,
                qkValues: qkValues,
                waidi: waidi,
                spaces: spaces.join(',')
            }, function (data, status) {
                alert('申请成功');
                location.href = '/preorder';
            });
        }


        $(document).on('click', '.tab_01 li', function () {
            if ($(this).find('i').prop('class') === 'on') {
                $(this).find('i').removeClass('on');
                $(this).closest('.section-content').find('.btn-confirm').prop('disabled', true);
            } else {
                $(this).find('i').addClass('on');
                $(this).closest('.section-content').find('.btn-confirm').prop('disabled', false);
            }
// $(".fg").find(".btn-confirm").prop('disabled', false);
        });

        $(document).on('click', '.tab_02 li', function () {
            $('.tab_02 li i').removeClass('on');
            if ($(this).find('i').prop('class') === 'on') {
                $(this).find('i').removeClass('on');
                $(this).closest('.section-content').find('.btn-confirm').prop('disabled', true);
            } else {
                $(this).find('i').addClass('on');
                $(this).closest('.section-content').find('.btn-confirm').prop('disabled', false);
            }
// $(".fg").find(".btn-confirm").prop('disabled', false);
        });


        $('.fg .btn-confirm,.qk .btn-confirm').click(function () {
            var fgValues = '';
            var qkValues = '';
            $('.tab_01 .on').each(function () {
                fgValues += $(this).prev().prop('title') + ',';
            });

            $('.tab_02 .on').each(function () {
                qkValues += $(this).prev().prop('title') + ',';
            });

            $('.fgValues').val(fgValues);
            $('.qkValues').val(qkValues);
            slideAnimate(currentIndex + 1);
        });


        function slideAnimate(targetIndex) {
            var $obj = null;
            $obj = $('.container .page-world');
            $obj.animate({
                'margin-left': -1.0 / $('.container .page-section').length * targetIndex * $obj.width()
                    + 'px'
            }, function () {
                currentIndex = targetIndex;
            });
        }
    };
    return customElement;
});
