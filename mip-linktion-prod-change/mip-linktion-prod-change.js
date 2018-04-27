/**
 * @file mip-linktion-prod-change 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $el.find('#searchChange').on('click', function (event) {
            var getsrc = $(this).data('src');
            var type = $(this).data('type');
            var query = $(this).data('query');
            var src = getsrc + '?t=' + type + '&q=' + query;
            fetch(src, {
                crossDomain: true,
                credentials: 'include',
                method: 'GET', // or 'PUT'
                headers: {'Content-Type': 'application/json'}
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.code === 0) {
                    var products = data.data.products;
                    getHtml(products);
                }
                else {
                    console.log(data.error);
                }
            });
            function getPlanner(item) {
                var plannerHtml = '';
                if (item.plannerTotal > 0) {
                    item.planners.forEach(function (planner) {
                        if (planner !== null) {
                            plannerHtml = '<div class="module-portrait-icon" th:each="planner : ${product.planners}">'
                                                + '<mip-img src="' + planner.image + '" ></mip-img>'
                                            + '</div>';
                        }
                    });
                }
                return plannerHtml;
            }
            function getHtml(products) {
                var producthtml = '';
                products.forEach(function (item) {
                    var plannerHtml = getPlanner(item);
                    producthtml += '<div class="col-lg-4 col-sm-4">'
                                    + '<a href="/product/product/' + item.id + '">'
                                        + '<div class="card-module-box">'
                                            + '<div class="module-img">'
                                                + '<mip-img src="' + item.image + '"></mip-img>'
                                                + '<p class="module-img-txt">' + item.name + '</p>'
                                            + '</div>'
                                            + '<div class="module-txt">'
                                                + '<div class="module-portrait">'
                                                + plannerHtml
                                                + '</div>'
                                                + '<div class="module-total">'
                                                    + '<p class="module-total-nub">'
                                                    + item.plannerTotal + '</p><span>位</span>'
                                                    + '<p class="module-total-assistant">理财师为您提供免费咨询</p>'
                                                + '</div>'
                                            + '</div>'
                                        + '</div>'
                                    + '</a>'
                                + '</div>';
                });
                $el.find('#productBox').html(producthtml);
            }
        });

    };

    return customElement;
});
