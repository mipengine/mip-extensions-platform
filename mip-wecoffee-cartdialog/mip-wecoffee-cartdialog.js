/**
 * @file mip-wecoffee-cartdialog 组件
 * @author
 */

define(function (require) {
    'use strict';
    var templates = require('templates');
    var viewer = require('viewer');
    var customElement = require('customElement').create();
    var key = 'wecoffee_store';
    var coffeeListKey = 'wecoffee_list';
    var $ = require('zepto');
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var m = window.m || {};
    var MIP = window.MIP || {};


    function openDialog() {
        var me = this;
        var $element = $(this.element);
        var cover = $element.find('.cart-dialog')[0];
        var dialog = $element.find('.cart-dialog-content')[0];
        var cartdialog = $element.css({
            transform: 'translateY(0)'
        });
        var cartitem = $element.find('.cart-item').css({
            display: 'flex'
        });
        cover.style.display = 'block';
        $(cover).on('touchmove', function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        });
        if (!cover.animate) {
            $(cover).css('opacity', 0.5);
        } else {
            cover.animate([
                {
                    opacity: 0
                },
                {
                    opacity: 0.5
                }
            ], {
                    fill: 'forwards',
                    easing: 'ease-in',
                    duration: 280
                }).play();
        }


        dialog.style.display = 'block';
        if (!dialog.animate) {
            $(dialog).css({transform: 'translate3D(0, 0, 0)', 'opacity': 1});
        } else {
            var eleAnimation = dialog.animate([
                {transform: 'translate3D(0, 100%, 0)', opacity: 0},
                {transform: 'translate3D(0, 0, 0)', opacity: 1}
            ], {fill: 'forwards', easing: 'ease-in', duration: 280});
            eleAnimation.play();
        }

        $(cover).on('touchmove', touchPreventScroll);
        $(dialog).on('touchmove', touchPreventScroll);
        var $cartContainBox = $(dialog).find('.cart-item-contain');
        me.scrollAble = undefined;
        $cartContainBox.on('touchmove', function (e) {
            e.stopPropagation();
            if (typeof me.scrollAble === 'undefined') {
                me.scrollAble = $cartContainBox.height() < $cartContainBox[0].scrollHeight;
            }

            // alert( $cartContainBox.height() +' '+ $cartContainBox[0].scrollHeight)

            !me.scrollAble && touchPreventScroll(e);
        });
        viewer.eventAction.execute('open', me.element, {});
    }

    function touchPreventScroll(e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    function closeDialog() {
        var me = this;
        var element = me.element;
        var dialog = element.querySelector('.cart-dialog-content');
        var cover = element.querySelector('.cart-dialog');

        if (!dialog.animate) {
            $(dialog).css({
                'transform': 'translate3D(0, 100%, 0)',
                opacity: 0,
                display: 'none'
            });
            $(cover).css({
                opacity: 0,
                display: 'none'
            });
        } else {

            var eleAnimation = dialog.animate([
                {transform: 'translate3D(0, 0, 0)', opacity: 1},
                {transform: 'translate3D(0, 100%, 0)', opacity: 0, display: 'none'}
            ], {fill: 'forwards', easing: 'ease-out', duration: 280});

            eleAnimation.play();
            eleAnimation.onfinish = function () {
                dialog.style.display = 'none';
            };
            var coverAnimation = cover.animate([
                {
                    opacity: 0.5
                },
                {
                    opacity: 0
                }
            ], {
                    fill: 'forwards',
                    easing: 'ease-in',
                    duration: 280
                });
            coverAnimation.onfinish = function () {
                cover.style.display = 'none';
            };
            coverAnimation.play();
        }


        me.element.querySelector('.cart-dialog').style.display = 'none';
        viewer.eventAction.execute('close', me.element, {});
        setTimeout(function () {
            var cartdialog = $('.cartdialog').css({
                transform: 'translateY(-100vh)'
            });
            var cartitem = $('.cart-item').css({
                display: 'none'
            });
        }, 280);
    }

    function renderTemplate(data) {
        var me = this;
        if (data) {
            templates.render(
                me.element, data
            ).then(render.bind(me));
        }
        else {
            console.error('数据不符合规范');
        }
    }

    function render(htmls) {
        var me = this;
        var fragment = document.createDocumentFragment();
        var node = document.createElement('div');
        node.innerHTML = htmls;
        node.setAttribute('class', 'cart-contain');
        fragment.appendChild(node);
        me.container.appendChild(fragment);
        setTimeout(function () {
            viewer.eventAction.execute('rendered', me.element);
        }, 0);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        var element = me.element;
        me.addEventAction('open', function () {
            var goodscount = m.goodscount;
            if (goodscount === 0) {
                return;
            }

            var display = element.querySelector('.cart-dialog').style.display;
            if (display === 'none' || display === '') {
                me.initHtml();
                setTimeout(function () {
                    openDialog.call(me);
                }, 0);
            }
            else {
                closeDialog.call(me);
            }
        });
        me.addEventAction('close', function () {
            closeDialog.call(me);
        });
        me.addEventAction('clear', function () {
            var list = [];
            storage.set(key, JSON.stringify(list));
            storage.set(key, list);
            setTimeout(function () {
                MIP.setData({
                    goodscount: 0,
                    price: '0'
                });
            }, 1000);
            closeDialog.call(me);
            var wecoffeeCart = $('.wecoffee-cart');
            wecoffeeCart.addClass('wecoffee-cart-clear');
            var cartbottom = $('.cartbottom-change');
            if (cartbottom.hasClass('rotate')) {
                cartbottom.removeClass('rotate');
            }

            cartbottom.addClass('rotate-out');
        });
        me.addEventAction('update', function () {
            me.initData();
        });
        me.addEventAction('add', function (e, id) {
            me.changeData(id, 'add');
        });
        me.addEventAction('detail', function (info, id) {
            me.changeData(id, 'detail');
        });
    };

    customElement.prototype.getHTMLStr = function () {
        var me = this;

        me.initData();
        var data = m.list.orderList;
        var htmlCodes = [];
        var content = '';
        if (Array.isArray(data)) {
            data.forEach(function (item) {
                var options = [];
                Object.keys(item.options).forEach(function (key) {
                    typeof item.options[key] === 'string' && options.push(item.options[key]);
                });
                var content = '<div class="cart-item" data-id="' + item.id + '" style="display: flex">'
                    + '<span class="cart-goods">'
                    + '<span class="cart-discribe">'
                    + '<img class="cart-img" src="' + item.img + '"/>'
                    + '</span>'
                    + '<span class="cart-name">'
                    + '<div class="cart-title">' + item.title + '(' + item.options.cup + ')</div>'
                    + '<div class="cart-options">' + options.join('/') + '</div>'
                    + '</span>'
                    + '</span>'
                    + '<span class="cart-operation">'
                    + '<span class="cart-all-price">￥' + item.allPrice + '</span>'
                    + '<span class="cart-amount" data-type=' + item.key + '>'
                    + '<span class="cart-change reduce" ripple ripple-color="#81aad2"'
                    + 'on="tap:cartdialog.detail(' + item.id + ')">'
                    + '<svg class="rt-svg-icon reduce"> <use xlink:href="#reduce" /></svg></span>'
                    + '<span class="cart-change-amount">' + item.amount + '</span>'
                    + '<span class="cart-change plus" ripple on="tap:cartdialog.add(' + item.id + ')">'
                    + '<svg class="rt-svg-icon plus"> <use xlink:href="#plus" /></svg></span>'
                    + '</span>'
                    + '</span>'
                    + '</div>';
                htmlCodes.push(content);
            });
        }

        var html = htmlCodes.join('');
        return html;
    };

    customElement.prototype.changeData = function (id, action) {
        var me = this;
        if (typeof id !== 'undefined') {
            try {
                me.scrollAble = undefined;

                var changeId = Number(id);
                var data = storage.get(key) || '[]';
                var allData = JSON.parse(data);
                var changeItem = allData.filter(function (value) {
                    return +value.id === +id;
                });
                changeItem = changeItem && changeItem[0] || {};
                if (action === 'add' && changeItem) {
                    changeItem.amount++;
                }

                if (action === 'detail' && changeItem) {
                    changeItem.amount--;
                }

                if (+changeItem.amount === 0) {
                    allData.splice(changeId, 1);
                }

                allData = allData.filter(function (value) {
                    return value.amount;
                });
                storage.set(key, JSON.stringify(allData));
                var allPrice = me.initTotal();
                if (+allPrice.price === 0) {
                    var wecoffeeCart = $('.wecoffee-cart');
                    wecoffeeCart.addClass('wecoffee-cart-clear');
                    var cartbottom = $('.cartbottom-change');
                    if (cartbottom.hasClass('rotate')) {
                        cartbottom.removeClass('rotate');
                    }

                    cartbottom.addClass('rotate-out');
                    closeDialog.call(me);
                }
                else {
                    // me.initHtml();
                    if (changeItem.amount) {
                        $(me.element).find('[data-id="' + id + '"] .cart-change-amount').text(changeItem.amount);
                    }
                    else {
                        $(me.element).find('[data-id="' + id + '"]')
                            .animate({height: '0', opacity: 0}, 200, 'ease-in-out', function () {
                                this.remove();
                            });
                    }

                    var carticon = $('.carticon');
                    var circle = $('.cartbottom-change-circle');
                    if (carticon.hasClass('shake')) {
                        carticon.removeClass('shake');
                        circle.removeClass('circle');
                        setTimeout(function () {
                            circle.addClass('circle');
                            carticon.addClass('shake');
                        }, 0);
                    }
                    else {
                        circle.addClass('circle');
                        carticon.addClass('shake');
                    }
                }
            }
            catch (e) {
                console.warn(e);
            }
        }

    };

    customElement.prototype.initData = function () {
        var me = this;
        var coffee = me.formatData();
        MIP.setData({
            list: coffee
        });
    };

    customElement.prototype.initHtml = function () {
        var me = this;
        var element = me.element;
        var html = me.getHTMLStr();
        var container = element.querySelector('.cart-item-contain');

        container.innerHTML = html;
    };
    customElement.prototype.formatData = function () {
        var me = this;
        var lists = storage.get(coffeeListKey) || '[]';
        var coffeeList = JSON.parse(lists);
        var order = storage.get(key) || '[]';
        var orderList = JSON.parse(order);
        var newData = [];
        var endData = [];
        coffeeList.forEach(function (items) {
            items.list.map(function (item) {
                newData.push(item);
            });
        });
        orderList.forEach(function (item, key) {
            var data = {};
            newData.forEach(function (coffeeItem) {
                if (item.itemid === coffeeItem.id && item.amount > 0) {
                    data = item;
                    data.title = coffeeItem.title;
                    data.discribe = coffeeItem.discribe;
                    data.img = coffeeItem.img;
                    data.allPrice = item.price * item.amount;
                    data.key = key;
                    data.classkey = 'cart-item-' + key;
                    endData.push(data);
                }

            });
        });
        return {
            orderList: endData
        };
    };

    customElement.prototype.initTotal = function () {
        var me = this;
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
        MIP.setData({
            goodscount: count,
            price: total || '0'
        });
        var data = {
            goodscount: count,
            price: total
        };
        return data;
    };

    return customElement;
});
