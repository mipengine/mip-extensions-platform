/**
 * @file mip-copy 康网点击换一换
 * @author cnkang
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        $(document).ready(function (e) {
            $('[data-change-block]').on('click', '[data-change-btn]', function (event) {
                event.preventDefault();
                var changeBtn = $(this);
                var apiStr = changeBtn.attr('data-change-api');
                var joinChar =  apiStr.indexOf('?') > - 1 ? '&' : '?';
                var fetchApi = apiStr + joinChar + 'ts=' + new Date().getTime();
                var changeContentBlock = changeBtn.parents('[data-change-block]').find('[data-change-content]');
                if (changeBtn.attr('changing')) {
                    return;
                }
                changeBtn.attr('changing', 'yes');
                $.get(fetchApi, function (data) {
                    changeBtn.removeAttr('changing');
                    var htmlStr = $(data).find('[data-change-content]').html();
                    changeContentBlock.html(htmlStr);
                });
            });
        });
    };
    return customElement;
});

