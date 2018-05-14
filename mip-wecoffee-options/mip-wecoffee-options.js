/**
 * @file mip-wecoffee-options 组件
 * @author susc
 * @description 此组件只为showcase，请勿在正式产品使用。
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var viewer = require('viewer');
    var $ = require('zepto');
    var itemClass = 'menuitem';
    var activeClass = 'menuitemact';
    var change = 'change';
    var key = 'wecoffee_store';
    var m = window.m || {};
    var MIP = window.MIP || {};
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    /**
     * 组件构建
     */
    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        me.menuSelect = {
            products: [],
            speaciKey: '_温度'
        };
        me.refresh();
    };

    customElement.prototype.refresh = function () {
        var me = this;
        var id = m.activeProductId;
        if (id) {
            me.id = id;
            me.getData(id);
            var str = me.getHTMLStr(me.data);
            if (str) {
                me.renders(str);
            }
        }

    };

    /**
     * 获取接口信息
     * @param {string} id 商量ID
     */
    customElement.prototype.getData = function (id) {
        var me = this;
        var data = {
            types: m.fetchData.productOption.types
        };
        me.skulist = m.fetchData.productOption.skuList || [];
        me.data = data;

        if (data.types) {

            var wecoffeeList = JSON.parse(storage.get('wecoffee_list'));

            wecoffeeList.forEach(function (wlist) {
                if (data.productDesc) {
                    return;
                }

                wlist.list.forEach(function (subList) {
                    if (subList.id === id) {
                        data.productDesc = subList;
                    }

                });

            });
            data.productDesc = data.productDesc || {};
            me.data = data;
        }

    };

    /**
     * 根据数据组装html
     * @param {Object} data 返回html
     * @return {string} 返回结果
     */
    customElement.prototype.getHTMLStr = function (data) {
        var html = [];
        var me = this;
        if (Array.isArray(data.types)) {
            me.menuSelect.products = [];

            data.types.forEach(function (it) {
                var content = '';
                var list = it.list;
                var types = it.type || {};
                var type = types.name || '';
                var infoseleft = {
                    key: types.key
                };

                if (Array.isArray(list)) {
                    list.forEach(function (i) {
                        var n = i || '';
                        if (it.default === n && types.key !== me.menuSelect.speaciKey) {
                            infoseleft.value = n;
                            content += '<div ripple class="'
                                + itemClass + ' '
                                + activeClass
                                + '" data-pidx='
                                + me.menuSelect.products.length
                                + '>' + n + '</div>';
                        }
                        else {
                            content += '<div ripple ripple-color="#cec1b3" class="'
                                + itemClass
                                + '"  data-pidx='
                                + me.menuSelect.products.length
                                + '>' + n + '</div>';
                        }
                    });
                }

                me.menuSelect.products.push(infoseleft);

                var htmlCodes = [
                    '<div class="itemlist-box">',
                    '<header class="menuheader">' + type + '</header>',
                    '<div class="itemlist">',
                    content,
                    '</div>',
                    '</div>'
                ].join('');
                html.push(htmlCodes);
            });
        }

        return [
            '<div class="menuPicTitle">',
            '    <div class="menuPicTitle__bg" data-url="' + data.productDesc.wideImg + '"></div>',
            '    <div ripple class="menuPicTitle__closeBox">',
            '        <svg class="rt-svg-icon menuPicTitle__close">',
            '            <use xlink:href="#close" />',
            '        </svg>',
            '    </div>',
            '    <span class="menuPicTitle__zh">' + data.productDesc.title + '</span>',
            '    <span class="menuPicTitle__en">' + data.productDesc.alias + '</span>',
            '</div>',
            '<div class="menuContentBox">',
            '    ' + html.join('') + '',
            '    <div class="productDesc">',
            '        <span class="productDesc__title">商品描述</span>',
            '        <span class="productDesc__con">' + data.productDesc.discribe + '</span>',
            '    </div>',
            '</div>',
            '<div class="diaprice">',
            '    <div class="diaprice__total">\xA5<span class="diapricetext"></span></div>',
            '    <div class="diaprice__detail"></div>',
            '</div>',
            '<div class="menuSubmitBox">',
            '    <div ripple ripple-color="#89afd6" class="menuSubmitBox__cancel">',
            '       <svg class="rt-svg-icon"><use xlink:href="#cancel" /> </svg>取消',
            '   </div>',
            '    <div ripple class="menuSubmitBox__add">',
            '       <svg class="rt-svg-icon"><use xlink:href="#shopping" />  </svg>加入购物车',
            '   </div>',
            '</div>'
        ].join('');
    };

    /**
     * 刷新dom内容
     * @param {string} str html字符串
     */
    customElement.prototype.renders = function (str) {
        var ele = this.element;
        if (typeof str === 'string') {
            this.contentDestroy();
            ele.innerHTML = str;
            this.bindEvent();
        }

    };

    /**
     * 清除事件绑定
     */
    customElement.prototype.contentDestroy = function () {
        var ele = this.element;
        $(ele).off('click');
    };

    /**
     * 绑定选项点击事件
     * @param {string} str html字符串
     */
    customElement.prototype.bindEvent = function () {
        var me = this;
        var ele = this.element;
        var d = me.getOptions();
        var goodsInfo = me.getPrice();
        goodsInfo.options = d;
        goodsInfo.itemid = me.id;
        goodsInfo.amount = 1;

        MIP.setData({
            addingData: goodsInfo
        });
        $(ele).on('click', '.' + itemClass, function (e) {
            var $target = $(e.target);

            if ($target.hasClass(activeClass)) {
                return;
            }

            $target.siblings().removeClass(activeClass).attr('ripple-color', '#cec1b3');
            $target.addClass(activeClass).removeAttr('ripple-color', '');
            me.menuSelect.products[$target.data('pidx')].value = $target.text();

            var d = me.getOptions();
            goodsInfo = me.getPrice();
            goodsInfo.options = d;
            goodsInfo.itemid = me.id;
            goodsInfo.amount = 1;
            viewer.eventAction.execute(change, ele, goodsInfo);
        });
        $(ele).on('click', '.menuPicTitle__closeBox, .menuSubmitBox__cancel', function () {
            viewer.eventAction.execute('cancel', ele, {});
        }).on('click', '.menuSubmitBox__add', function () {
            var speaci = me.menuSelect.products.filter(function (product) {
                return product.key === me.menuSelect.speaciKey;
            });
            if (speaci.length) {
                if (!speaci[0].value) {
                    alert('请选择喜欢的温度~');
                    return;
                }
            }

            if (me.menuSelect.products.filter(function (product) {
                    return product.key === me.menuSelect.speaciKey && product.key;
                })) {
                viewer.eventAction.execute('ok', ele, {});
            }

        });

        $(ele).on({});

        var bgShadow = $(ele).find('.menuPicTitle__bg');
        var bgimage = new Image();
        bgimage.src = bgShadow.data('url');
        $(bgimage).on('load', function () {
            bgShadow.css('background-image', 'url(' + $(this).attr('src') + ')').css('opacity', 1);
        });

        var $contentBox = $(ele).find('.menuContentBox');
        var isScroll;
        setTimeout(function () {
            isScroll = $contentBox.height() < $contentBox[0].scrollHeight;
        }, 300);
        $contentBox.on('touchmove', function (e) {
            e.stopPropagation();
            !isScroll && e.preventDefault();
        });
        $(ele).on('touchmove', function (e) {

            e.preventDefault();
            e.stopPropagation();
        });

    };

    customElement.prototype.getTotal = function () {
        var info = storage.get(key) || '[]';
        var tmp = JSON.parse(info);
        var count = 0;
        var total = 0;
        tmp.forEach(function (item) {
            if (item.amount !== 1) {
                total += Number(item.price) * item.amount;
            }
            else {
                total += Number(item.price);
            }
            count += Number(item.amount);
        });
        return {
            count: count,
            total: total
        };
    };

    customElement.prototype.getPrice = function () {
        var pctt = {};
        var detailPrice = [];
        this.menuSelect.products.forEach(function (product) {
            if (!/^_/.test(product.key)) {
                pctt[product.key] = product.value;
            }

            detailPrice.push(product.value);
        });
        detailPrice = [this.data.productDesc.title].concat([detailPrice.join('+')]);
        var skulist = this.skulist;
        if (Array.isArray(skulist)) {
            for (var i = 0; i < skulist.length; i++) {
                var it = skulist[i];
                var spec = it.spec || {};
                if (ojbIsEquel(spec, pctt)) {
                    var p = it.price || 0;

                    $(this.element).find('.diapricetext').text(p);
                    $(this.element).find('.diaprice__detail').text(detailPrice.join(' '));

                    return {
                        id: it.id,
                        price: p
                    };
                }

            }
        }

        return {id: '', price: 0};
    };

    function ojbIsEquel(a, b) {
        var fKeys = Object.keys(a);
        var sKeys = Object.keys(b);
        if (fKeys.length !== sKeys.length) {
            return false;
        }

        for (var item in a) {
            if (!(item in b)) {
                return false;
            }

            if (a[item] !== b[item]) {
                return false;
            }

        }
        return true;
    }

    /**
     * 获取选项信息
     * @return {Object} 返回结果
     */
    customElement.prototype.getOptions = function () {
        var rs = {};

        this.menuSelect.products.forEach(function (item) {
            if (item.value) {
                rs[item.key] = item.value;
            }

        });
        return rs;

    };

    return customElement;
});
