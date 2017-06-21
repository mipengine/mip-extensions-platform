/**
 * @file mip-cd-news 两性底部广告有数据时隐藏
 * @author cnkang
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        $(function () {
            var uaStr = navigator.userAgent.toLowerCase();
            var isUc = uaStr.indexOf('ucbrowser') > -1;
            var isQq = uaStr.indexOf('qqbrowser') > -1;
            if (isUc || isQq) {
                var ajaxurl = '//s.cnkang.com/showcodejsonp';
                $.ajax({
                    type: 'get',
                    dataType: 'jsonp',
                    async: false,
                    url: ajaxurl,
                    data: {pid: '72', kw: '白癜风'},
                    success: function (data) {
                        var json = JSON.parse(data.result);
                        if (json['72']) {
                            $('body').append(json['72']);
                            $('body').removeClass('Definition');
                            $('.fuceng').addClass('hide');
                        }
                    }
                });
            }
        });
    };
    return customElement;
});
