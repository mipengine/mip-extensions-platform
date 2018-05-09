/**
 * @file mip-jpd-shoppingCart 组件
 * @author zc
 */
define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var APP = {
            URLS: {
                oGwcs: '/vshop/Ajax/Post/AddShoppingCart.html'
            }
        };
        var ele = this.element;
        var oGg = ele.querySelectorAll('#good_gwc input');
        /**
         * 弹窗
         * */
        var omyLin3 = ele.querySelector('#my-lightbox3');
        /**
         * 购物车规格btn
         * */
        var gwcGm = ele.querySelector('#gwcGm');
        /**
         * gb
         * */
        var gb = ele.querySelector('.gp');
        /**
         * 规格具体
         * */
        var colorCurrent = ele.querySelector('#colorCurrent');
        var datalist = {};
        /**
         * 数量
         * */
        var numberas = ele.querySelector('#numberas');
        /**
         * 商品规格数
         * */
        var oGgas = ele.querySelectorAll('.item-right li');
        /**
         * event 对应的事件对象 str  事件参数 点击加入购物车
         * */
        this.addEventAction('JPD_gwc', function (event, str) {
            // console.log(oGg);
            if (oGg[2].value === '0') {
                /**
                 * 规格null 没有规格 if库存
                 * console.log(typeof(oGg[2].value));
                 * console.log(typeof(oGg[4].value));
                 * */
                if (oGg[4].value === '0') {
                    alert('商品库存不足');
                }
                else {
                    var datalist = {
                        'goods_no': oGg[1].value,
                        'Num': numberas.value,
                        'itemId': oGg[6].value,
                        'productId': oGg[6].value,
                        'goodname': oGg[7].value
                    };
                    console.log(datalist);
                    ajaxs(datalist);
                }
            }
            else {
                /**
                 * 有规格
                 * */
                omyLin3.style.display = 'block';
                $(omyLin3).css('display', 'block');
                $(omyLin3).show();
            }
        });
        /**
         * 选择规格
         */
        this.addEventAction('gwcGm', function (event, str) {
            /**
             * console.log(oGg[3].value); console.log(typeof(oGg[3].value));
             * 选择规格
             */
            if (oGg[3].value === 'colorCurrent') {
                /**
                 * if 是否有库存 console.log(oGgas.length);
                 * console.log(typeof(oGgas.length));
                 */
                if (oGgas.length === 0) {
                    // console.log(oGgas.length);
                    alert('商品库存不足');
                }
                else {
                    alert('请选择规格');
                }
            }
            else {
                console.log('成功');
                var datalist = {
                    'goods_no': oGg[1].value,
                    'Num': numberas.value,
                    'itemId': oGg[6].value,
                    'productId': oGg[6].value,
                    'goodname': oGg[7].value
                };
                // console.log(datalist);
                ajaxs(datalist);
            }
        });
        /**
         * 关闭弹窗
         */
        $(gb).on('click', function () {
            $(omyLin3).css('display', 'none');
        });
        function ajaxs(datalist) {
            console.log(datalist);
            $.ajax({
                type: 'post',
                url: APP.URLS.oGwcs,
                data: datalist,
                dataType: 'json',
                json: 'callback',
                success: function (data) {
                    // console.log(data);
                    // console.log(typeof(data.Status));
                    if (data.Status === 0) {
                        omyLin3.style.display = 'none';
                        alert('已加入购物车');
                    }
                    else {
                        alert('加入购物车失败，请从新购买');
                    }
                }
            });
        }

    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
    };

    return customElement;
});
