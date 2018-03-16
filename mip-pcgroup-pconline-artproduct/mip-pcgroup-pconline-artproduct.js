/**
 * @file mip-pcgroup-pconline-artproduct 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    function html1(d) {
        var h = '';
        h += '<div class="m-hd">';
        h += '<h2 class="m-mark">产品概览</h2>';
        if (d.varianceId) {
            h += '<a class="fgray fz14 m-sub-mark" ';
            h += 'href="http://g.pconline.com.cn/product/series/' + d.varianceId + '.html">';
            h += '系列共' + d.seriesTotal + '款</a>';
        }
        h += '</div>';
        return h;
    }

    function html2(d) {
        var h = '';

        h += '<div class="js5-div">';
        h += '    <a class="js5-a clearfix" href="' + d.indexUrl + '">';
        h += '        <img class="pic" height="75" src="' + d.picUrl + '" width="100"/>';
        h += '        <div class="txt">';
        h += '            <p class="name">' + d.shortName + '</p>';
        h += '            <span class="price">';
        h += /\d+/.test(d.mainPrice) ? '<em class="fgray">参考价</em> ' + d.mainPrice : d.mainPrice;
        h += '            </span>';
        h += '        </div>';
        h += '    </a>';
        h += d.subTitle ? '<p class="desc">' + d.subTitle + '</p>' : '<p class="desc"></p>';
        h += '    <div class="js5-sub-div">';
        h += '        <div class="m-sub-mark ">';
        if (d.detailUrl) {
            h += '       <a href="' + d.detailUrl + '">参数</a>';
        }
        if (d.pictureUrl) {
            h += '       <a href="' + d.pictureUrl + '">图片</a>';
        }
        if (d.commentUrl) {
            h += '       <a href="' + d.commentUrl + '">点评</a>';
        }
        h += '        </div>';
        h += '        <p class="score">';
        h += '            <span class="star-bg">';
        h += '                <i class="star">';
        h += '                </i>';
        h += '            </span>';
        h += '            <span>' + ((d.score !== 0) ? d.score : '暂无评') + '</span>';
        h += '        </p>';
        h += '    </div>';
        h += '</div>';

        return h;
    }


    function html3(d) {
        var h = '';

        h += '<div class="mallLink">';
        if (d.mallList && d.mallList.length > 0) {
            var i = 0;
            h += '<a href="' + d.mallList[i].url + '" class="js5-item">';
            h += '<img src="' + d.mallList[i].mallLogo + '">';
            h += '<span class="mall-name">' + d.mallList[i].mallName + '</span>';
            h += '<span class="item-tit">' + d.mallList[i].title + '</span>';
            h += '<span class="price">￥' + d.mallList[i].price + '</span>';
            h += '<span class="buy">购买</span>';
            h += '</a>';
        }
        h += '</div>';

        if (d.mallList && d.mallList.length > 1) {
            h += '<a class="m-more m-more-blue"  href="' + d.priceUrl + '">查看更多网购价格<i class="s2"></i></a>';
        }

        return h;
    }

    function showHtml(data, elemt) {
        if (data.status === 1) {
            var d = data.result[0];
            var i = 0;

            var html = '<div class="m-box product-info">';
            html += html1(d);
            html += html2(d);
            html += html3(d);
            html += '</div>';
            elemt.innerHTML = html;

            var stara = elemt.querySelector('.star');
            var scroeWidth = d.score / 5;
            stara.style.width = scroeWidth * 100 + '%';

            // 添加a方案计数代码
            var ads = ['7593', '7594', '7595', '7596', '7597'];
            var alist = elemt.querySelectorAll('a');
            for (i = 0; i < alist.length; i++) {
                var a = alist[i];
                var link = a.href;
                a.href = link + '#ad=' + ads[i];
                if (i === (alist.length - 1)) {
                    a.href = link + '#ad=' + ads[4];
                }
            }
        }
        else {
            elemt.style.display = 'none';
        }
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var id = element.getAttribute('data-productid');

        if (!id) {
            element.style.display = 'none';
            return;
        }

        var url = '//g.pconline.com.cn/product/do/get_product_4_js5.jsp?productId=' + id;
        fetchJsonp(url).then(function (res) {
            return res.json();
        }).then(function (data) {
            showHtml(data, element);
        });
    };

    return customElement;
});
