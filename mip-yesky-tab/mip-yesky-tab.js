/**
 * @file mip-yesky-tab 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var productId = $(element).attr('productId');
        var link = window.location.href;
        var inx = link.indexOf('product');
        var common = link.slice(0, inx);
        var offh = $(element).offset().top;
        $(window).scroll(function () {
            var scrh = $(this).scrollTop();
            if (scrh >= offh) {
                $(element).show();
                $(element).css({'width': '100%',
                    'position': 'fixed',
                    'top': '45px',
                    'left': '0px',
                    'z-index': 1000,
                    'background': '#fff'
                });
                $('#zhan').show();
            }
            else {
                $(element).css('position', 'static');
                $('#zhan').hide();
            }
        });
        // 点击其他分类执行结果
        $(element).find('#line li').click(function () {
            var lsitMore = '';
            var productType = $(this).attr('alt');
            var ThisIndex = $(this).index();
            var url = common + 'front/product/pic/interface.do?id='
                + productId + '&type = ' + productType + '&pageNo = 1&status=mip';
            // var url= "http://wap.yesky.com/front/product/pic/interface.do?id=1049907&type=3&pageNo=1";
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'json',
                success: function (data) {
                    for (var i = 0; i < data.productpic.length; i++) {
                        lsitMore += '<li><mip-img src="' + data.productpic[i].cmsimage + '" '
                            + 'num="' + data.productpic[i].num + '">'
                            + '</mip-img></li>';
                    }
                    $('.piclist ul').eq(ThisIndex).html('').show().addClass('active')
                        .siblings('ul').removeClass('active').hide();
                    if (data.productpic.length < 10) {
                        $('.piclist ul').eq(ThisIndex).html(lsitMore);
                    }
                    else {
                        $('.piclist ul').eq(ThisIndex).html(lsitMore + '<button>加载更多</button>');
                    }
                }
            });
        });
    };
    return customElement;
});
