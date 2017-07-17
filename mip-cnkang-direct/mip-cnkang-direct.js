/**
 * @file mip-cnkang-direct 康网直投广告
 * @author cnkang
 */

define(function (require) {
    var util = require('util');
    var $ = require('zepto');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        $(function () {
            var yuming = $('.neirong').html();
            var ajaxurl = yuming + '/showcodejsonp';
            var cateid = $('#tags').val();
            var ggg;
            $.ajax({
                type: 'get',
                dataType: 'jsonp',
                async: false,
                url: ajaxurl,
                data: {pid: '52', cateid: cateid},
                success: function (data) {
                    var jsona = JSON.parse(data.result);
                    if (!jsona['52']) {
                        $('.Adware').css('display', 'none');
                        $('.close').css('display', 'none');
                        $('.guanggao').css('display', 'none');
                    } else {
                        $('.Adware').append(jsona['52']);
                        $('.close').click(function () {
                            $('.Adware').css('display', 'none');
                            $('.close').css('display', 'none');
                            $('.guanggao').css('display', 'none');
                        });
                    }
                }
            });
        });
    };
    return customElement;
});
