/**
 * @file mip-cnkang-details 康网mip内容化
 * @author cnkang
 */

define(function (require) {
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        $(document).ready(function (e) {
            var askLength = $('.askcon').children('dl').length;
            if (askLength > 2) {
                $('.askcon').children('dl').slice(2).hide();
                $('.viewall').removeClass('hide');
            }
        });
        $(function () {
            var screen = window.screen.width;
            $('.p_text').each(function () {
                var textAll = $(this).text();
                $(this).attr('content', textAll);
                if (screen >= 320 && screen < 375) {
                    if ($(this).text().length > 55) {
                        var text = $(this).text().substring(0, 55) + '...';
                        $(this).text(text);
                    } else {
                        $(this).parent().find('.stateUp').css('display', 'none');
                    }
                }
                if (screen >= 375 && screen < 414) {
                    if ($(this).text().length > 65) {
                        var text = $(this).text().substring(0, 65) + '...';
                        $(this).text(text);
                    } else {
                        $(this).parent().find('.stateUp').css('display', 'none');
                    }
                }
                if (screen >= 414) {
                    if ($(this).text().length > 77) {
                        var text = $(this).text().substring(0, 77) + '...';
                        $(this).text(text);
                    } else {
                        $(this).parent().find('.stateUp').css('display', 'none');
                    }
                }
            });
            $('.stateUp').click(function () {
                var textAll = $(this).parent().find('.p_text').attr('content');
                $(this).siblings('.p_text').text(textAll);
                $(this).hide();
            });
            $('.viewall').click(function () {
                $('.askcon').children('dl').show();
                $(this).hide();
            });
            $('.close').on('click', function () {
                $('.Adwareall').addClass('hide');
            });
        });
    };
    return customElement;
});
