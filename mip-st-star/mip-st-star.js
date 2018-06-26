/**
 * @file mip-st-star 组件
 * @author
 */

/* global MIP, m */

define(function (require) {

    var customElement = require('customElement').create();

    var starImg0 = 'data:image/svg+xml;utf8,<svg width="66" height="67" xmlns="http://www.w3.org/2000/svg"><path d="M33 54.361L12.605 66l4.225-23.992L0 25.21l23.006-3.189L33 0l9.994 22.021L66 25.21 49.17 42.008 53.395 66z" stroke="#999" fill="none" fill-rule="evenodd" opacity=".99"/></svg>';
    var starImg1 = 'data:image/svg+xml;utf8,<svg width="66" height="66" xmlns="http://www.w3.org/2000/svg"><path d="M33 54.361L12.605 66l4.225-23.992L0 25.21l23.006-3.189L33 0l9.994 22.021L66 25.21 49.17 42.008 53.395 66z" fill="#F60" fill-rule="evenodd"/></svg>';

    var starDescArr = ['很差', '差', '一般', '满意', '非常满意'];

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var element = this.element;
        // var editable = element.getAttribute('editable');
        var total = element.getAttribute('total');
        var value = element.getAttribute('value') || 0;
        value = value - 0;
        var size = element.getAttribute('size') || 22;
        var field = element.getAttribute('field');
        if (total) {
            total = total - 0;
        }
        else {
            total = 5;
        }
        var stars = {};
        for (var i = 1; i <= total; i++) {
            stars['star' + i] = starImg0;
        }
        var data = {};
        data[field] = 0;
        MIP.setData(data);
        MIP.setData({
            star: 0,
            stars: stars
        });

        var html = '<div class="star-wrapper">';
        for (i = 1; i <= total; i++) {
            html += '<mip-img height="' + size + '" width="' + size + '" m-bind:src="stars.star'
                + i + '" src=\'' + (i <= value ? starImg1 : starImg0) + '\'></mip-img>';
        }
        html += '</div>';

        element.innerHTML = html;
        var imgs = element.querySelectorAll('mip-img');
        for (i = 1; i <= imgs.length; i++) {
            (function (i) {
                var img = imgs[i - 1];
                img.addEventListener('click', function (e) {
                    for (var j = 1; j <= total; j++) {
                        if (j <= i) {
                            stars['star' + j] = starImg1;
                        }
                        else {
                            stars['star' + j] = starImg0;
                        }
                    }
                    var key = m.data.star_rating[0].rating_id;
                    var param = {};
                    param[key] = i;
                    data[field] = param;
                    MIP.setData(data);
                    MIP.setData({stars: stars});
                    MIP.setData({starDesc: starDescArr[i - 1]});
                }, false);
            })(i);
        }
    };

    return customElement;
});
