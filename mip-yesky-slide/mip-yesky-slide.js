/**
 * @file mip-yesky-slide 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var productId = $(element).attr('productId');
        var link = window.location.href;
        var inx = link.indexOf('product');
        var common = link.slice(0, inx);
        // 图片加载更多点击效果
        $(element).on('click', '.piclist li', function () {
            $('.addlist').html('');
            // 获取当前图片分类信息，远程抓取数据加入到浮层DOM中
            var productType = $(this).parent().attr('alt');
            var thisNum = parseInt($(this).find('mip-img').attr('num'), 10);
            var thisName = $(this).parent().attr('type');
            var thisTotal = $(this).parent().attr('total');
            var lsitDOM = '';
            var url = common + 'front/product/pic/interfaceAll.do?id='
                + productId + '&type=' + productType + '&status=mip';
            var num = $(this).index();
            var width = $('body').width();
            var imgnum = '<span class="swiper-pagination-current">'
                       + thisNum + '</span> /' + thisTotal + '（' + thisName + '）';
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'json',
                success: function (data) {
                    for (var i = 0; i < data.productpic.length; i++) {
                        lsitDOM += '<div class="swiper-slide"><img src="' + data.productpic[i].cmsimage + '"></div>';
                    }
                    $('#swiper-container' + productType).find('.addlist').html(lsitDOM);
                    $('.swiper-slide:lt(" + num + ")').css('margin-left', '-' + width + 'px');
                    $('#swiper-container' + productType).show();
                    $('.swiper-pagination').html(imgnum);
                    $('.swiper-button-next').on('click', function (e) {
                        if (num === 0) {
                            num = 0;
                        }
                        else if (num === thisTotal - 1) {
                            num = thisTotal - 2;
                        }
                        $('.swiper-slide').eq(num).animate({'margin-left': '-' + width + 'px'});
                        num = num + 1;
                        var imgnum = '<span class="swiper-pagination-current">'
                            + (num + 1) + '</span> /' + thisTotal + '（' + thisName + '）';
                        $('.swiper-pagination').html(imgnum);
                    });
                    $('.swiper-button-prev').click(function (e) {
                        if (num === 0) {
                            num = 1;
                        }
                        $('.swiper-slide').eq(num - 1).animate({'margin-left': 0});
                        num = num - 1;
                        var imgnum = '<span class="swiper-pagination-current">'
                            + (num + 1) + '</span> /' + thisTotal + '（' + thisName + '）';
                        $('.swiper-pagination').html(imgnum);
                    });
                }
            });
        });
    };
    return customElement;
});
