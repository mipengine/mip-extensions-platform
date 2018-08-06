/**
 * @file mip-yesky-more 组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var link = window.location.href;
        var inx = link.indexOf('product');
        var common = link.slice(0, inx);
        var productId = $(element).attr('productId');
        // 图片加载更多点击效果
        $(element).on('click', 'button', function () {
            var pageNo = 1;
            var lsitMore = '';
            var productType = $(this).parent('ul').attr('alt');
            var This = $(this);
            pageNo++;
            var num = common + 'front/product/pic/interface.do?id=' + productId + '&type='
                 + productType + '&pageNo=' + pageNo + '&status=mip';
            if (num === common + 'front/product/pic/interface.do?id=' + productId + '&type=100&pageNo='
                + pageNo + '&status=mip') {
                $.ajax({
                    type: 'get',
                    url: num,
                    dataType: 'json',
                    success: function (data) {
                        for (var i = 0; i < data.productpic.length; i++) {
                            if (data.productpic[i].type === 8) {
                                lsitMore += '<li><mip-img src="' + data.productpic[i].cmsimage + '" '
                                    + 'num="' + data.productpic[i].num + '"></mip-img><em>样张</em></li>';
                            }
                            else {
                                lsitMore += '<li><mip-img src="' + data.productpic[i].cmsimage + '"'
                                + 'num="' + data.productpic[i].num + '"></mip-img></li>';
                            }
                        }
                        This.before(lsitMore);
                        if (data.productpic.length < 10) {
                            This.hide();
                        }
                    }
                });
            }
            else {
                $.ajax({
                    type: 'get',
                    url: num,
                    dataType: 'json',
                    success: function (data) {
                        for (var i = 0; i < data.productpic.length; i++) {
                            lsitMore += '<li><mip-img src="' + data.productpic[i].cmsimage + '" '
                                + 'num="' + data.productpic[i].num + '"></mip-img></li>';
                        }
                        This.before(lsitMore);
                        if (data.productpic.length < 10) {
                            This.hide();
                        }
                    }
                });
            }
        });
    };
    return customElement;
});

