/**
 * @file 东方财富行情自有业务组件
 * @author www.eastmoney.com技术部
 */
define(function (require) {
    var $ = require('zepto');
    var module = {};
    var stockid = '3000592';
    module.intital = function (stockcode) {
        stockid = stockcode;
        $('#wdmxContainer').css('height', ($(window).width() * 177 / 365));
        $('.share_wx_close').on('click', function () {
            $('share_wx_bg').hide();
            $('share_wx_div').hide();
        });
        $('.btnRef').on('click', function () {
            location.reload();
        });
        $('.navitems').on('click', '.gd', function () {
            $('.navitems').addClass('on');
        }).on('click', '.sq', function () {
            $('.navitems').removeClass('on');
        });
        $('#searchbox').on('click', function () {
            window.location.href = 'http://wap.eastmoney.com/quoteCenter/center/Search.shtml';
        });
        $('#pic_plans_box td').on('click', function () {
            $('#pic_plans_box td').removeClass('hover');
            $(this).addClass('hover');
            var hqpic = 'https://cooperation.eastmoney.com/hqpic.aspx?id=';
            hqpic = hqpic + stockid;
            hqpic = hqpic + '&token=894050c76af8597a853f5b408b759f5d&' + $(this).data('type');
            $('#wdmxContainer').data('url', hqpic);
            $('#wdmxContainer').html('<img src="' + hqpic + '&r=' + Math.random() + '">');
        });
    };
    return module;
});
