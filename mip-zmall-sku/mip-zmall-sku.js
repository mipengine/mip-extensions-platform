/**
 * @file mip-zmall-sku 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var templates = require('templates');

    // 设置遮罩层
    function setCover(element) {
        var elementParentNode = element.parentNode;
        if (elementParentNode.tagName === 'MIP-FIXED') {
            util.css(elementParentNode, {
                height: '100%'
            });
        }
        util.css(element, {
            height: '100%'
        });
    }

    // 移除遮罩层
    function removeCover(element) {
        var elementParentNode = element.parentNode;
        setTimeout(function () {
            if (elementParentNode.tagName === 'MIP-FIXED') {
                util.css(elementParentNode, {
                    height: 'auto'
                });
            }
            util.css(element, {
                height: 'auto'
            });
        }, 300);
    }

    // 关闭
    function closeSkuWindow(element) {
        var skuWindowElement = element.querySelector('aside');
        skuWindowElement.classList.remove('visible');
        removeCover(element);
    }

    // 创建弹层
    function createWindow(settings, callback) {
        var element = this.element;

        // 模板
        var tpl = [
            '<aside class="sku-window">',
            '<div class="sku-window-close">关闭</div>',
            '<div class="sku-window-body">',
            '<div class="sku-window-loading"></div>',
            '</div></aside>',
            '<div class="sku-window-mask"></div>'
        ].join('');

        var skuWindowElement = element.querySelector('aside');
        if (!element.hasSkuWindow || !skuWindowElement) {
            element.insertAdjacentHTML('beforeend', tpl);
        }
        setTimeout(function () {
            callback();
        }, 10);
    }

    function removeActiveAndDisabaled(nodeArr) {
        [].forEach.call(nodeArr, function (ele) {
            ele.classList.remove('disabled', 'active');
        });
    }

    // 事件绑定
    function bindClickEvent(element, settings, data) {
        var skuItems = element.querySelectorAll('#js_sku_filter label');
        var priceElm = element.querySelector('#js_sku_price');
        var originPriceElm = element.querySelector('#js_sku_origin_price');
        var selectedElm = element.querySelector('#js_sku_selected');
        var descElm = element.querySelector('#js_sku_desc');
        [].forEach.call(skuItems, function (item) {
            item.addEventListener('click', function (event) {
                if (item.classList.contains('active')) {
                    return;
                }
                else if (item.classList.contains('disabled')) {
                    removeActiveAndDisabaled(skuItems);
                    item.classList.add('active');
                    setSkuButtonStatus(element, 'disabled');
                    setSkuNumStatus(element, 0);
                    return;
                }
                var currentElm = item.parentNode.querySelector('.active');
                currentElm && currentElm.classList.remove('active');
                item.classList.add('active');
                // 价格、已选择
                var skuInfo = getCurrentSkuInfo(element, data);
                var currentSkuInfo = skuInfo.currentSkuInfo;
                if (currentSkuInfo) {
                    var price = '&yen; ' + currentSkuInfo.suitPrice.showPrice;
                    priceElm.innerHTML = price;
                    var originPrice = '';
                    if (currentSkuInfo.suitPrice.showPrice !== currentSkuInfo.suitPrice.costPrice) {
                        originPrice = '&yen;' + currentSkuInfo.suitPrice.costPrice;
                    }
                    originPriceElm.innerHTML = originPrice;
                    selectedElm.innerHTML = [
                        currentSkuInfo.productTypeName,
                        currentSkuInfo.saleTypeName,
                        currentSkuInfo.colorTypeName,
                        currentSkuInfo.suitTypeName
                    ].join(' ');
                    descElm.innerHTML = currentSkuInfo.suitDesc;
                    // 数量
                    element.price = parseInt(currentSkuInfo.suitPrice.showPrice, 10);
                    element.canBuyNum = parseInt(currentSkuInfo.canBuyNumber, 10);
                    setSkuNumStatus(element, element.canBuyNum);
                    // 按钮
                    element.skuId = currentSkuInfo.skuId;
                    element.suitSetId = currentSkuInfo.suitSetId;
                    setSkuButtonStatus(element, 'enable');
                    // 与 mip-data 交互
                    window.MIP.setData({
                        selectedSuitInfo: {
                            suitProductName: currentSkuInfo.productTypeName,
                            suitSaleName: currentSkuInfo.saleTypeName,
                            suitColorName: currentSkuInfo.colorTypeName,
                            suitName: currentSkuInfo.suitTypeName
                        }
                    });
                }
                else {
                    // 数量
                    setSkuNumStatus(element, 0);
                }
                // 置灰
                var options = util.fn.extend({
                    emptyApi: settings.emptyApi
                }, skuInfo.skuSelected);
                setSkuDisabled(element, options);
            });
        });
    }

    function setSkuNumStatus(element, canBuyNum) {
        var minusElm = element.querySelector('#js_sku_minus');
        var plusElm = element.querySelector('#js_sku_plus');
        var numElm = element.querySelector('#js_sku_num');
        var priceElm = element.querySelector('#js_sku_price');
        var canBuyNumElm = element.querySelector('#js_sku_limit');
        if (canBuyNum <= 1) {
            plusElm.classList.add('disabled');
        }
        minusElm.classList.add('disabled');
        numElm.innerHTML = !canBuyNum ? 0 : 1;
        canBuyNumElm.innerHTML = canBuyNum;
        priceElm.innerHTML = '&yen; ' + element.price + '.00';
    }

    // 操作件数
    function setSkuNum(element) {
        var minusElm = element.querySelector('#js_sku_minus');
        var plusElm = element.querySelector('#js_sku_plus');
        var numElm = element.querySelector('#js_sku_num');
        var priceElm = element.querySelector('#js_sku_price');
        var price = parseInt(element.price, 10);

        minusElm.addEventListener('click', function () {
            if (this.classList.contains('disabled')) {
                return;
            }
            var currentNum = parseInt(numElm.innerHTML, 10);
            currentNum = currentNum - 1;
            if (currentNum <= 1) {
                this.classList.add('disabled');
                currentNum = 1;
            }
            else {
                this.classList.remove('disabled');
            }
            plusElm.classList.remove('disabled');
            numElm.innerHTML = currentNum;
            priceElm.innerHTML = '&yen; ' + (parseInt(price, 10) * currentNum) + '.00';
            setSkuButtonStatus(element, 'enable');
        });

        plusElm.addEventListener('click', function () {
            if (this.classList.contains('disabled')) {
                return;
            }
            var currentNum = parseInt(numElm.innerHTML, 10);
            var canBuyNum = parseInt(element.canBuyNum, 10);
            currentNum = currentNum + 1;
            if (currentNum >= canBuyNum) {
                this.classList.add('disabled');
                currentNum = canBuyNum;
            }
            else {
                this.classList.remove('disabled');
            }
            minusElm.classList.remove('disabled');
            numElm.innerHTML = currentNum;
            priceElm.innerHTML = '&yen; ' + (parseInt(price, 10) * currentNum) + '.00';
            setSkuButtonStatus(element, 'enable');
        });
    }

    // 修改购买按钮状态
    function setSkuButtonStatus(element, status) {
        var skuButton = element.querySelector('#js_sku_button');
        var skuLink = element.querySelector('#js_sku_link');
        var skuNum = element.querySelector('#js_sku_num');

        var num = parseInt(skuNum.innerHTML, 10);
        skuButton.classList.remove('enable', 'disabled');
        skuButton.classList.add(status);
        var href = skuLink.getAttribute('data-href');
        href = href.replace('{SKU}', element.skuId).replace('{SUITSET}', element.suitSetId).replace('{NUM}', num);
        skuLink.setAttribute('href', href);
    }

    // 获取当前SKU信息
    function getCurrentSkuInfo(element, data) {
        var skuRom = element.querySelector('#js_sku_rom .active');
        var skuSale = element.querySelector('#js_sku_sale .active');
        var skuColor = element.querySelector('#js_sku_color .active');
        var skuSuit = element.querySelector('#js_sku_suit .active');
        var skuRomId = skuRom && parseInt(skuRom.dataset.id, 10) || 0;
        var skuSaleId = skuSale && parseInt(skuSale.dataset.id, 10) || 0;
        var skuColorId = skuColor && parseInt(skuColor.dataset.id, 10) || 0;
        var skuSuitId = skuSuit && parseInt(skuSuit.dataset.id, 10) || 0;

        var skuInfo = null;
        data.suitInfo.forEach(function (item) {
            var isRomEqual = (parseInt(item.productTypeId, 10) === skuRomId);
            var isSaleEqual = (parseInt(item.saleTypeId, 10) === skuSaleId);
            var isColorEqual = (parseInt(item.colorTypeId, 10) === skuColorId);
            var isSuitEqual = (parseInt(item.suitTypeId, 10) === skuSuitId);
            if (isRomEqual && isSaleEqual && isColorEqual && isSuitEqual) {
                skuInfo = item;
            }
        });
        return {
            currentSkuInfo: skuInfo,
            skuSelected: {
                rom: skuRomId,
                sale: skuSaleId,
                color: skuColorId,
                suit: skuSuitId
            }
        };
    }

    // 设置灰色样式
    function setDisabledClass(nodes, data) {
        [].forEach.call(nodes, function (item) {
            var id = item.dataset.id;
            if (data.indexOf(id) > -1) {
                item.classList.add('disabled');
            }
            else {
                item.classList.remove('disabled');
            }
        });
    }

    // 设置灰色
    function setSkuDisabled(element, options) {

        var emptyApi = options.emptyApi;
        emptyApi += '&productTypeId=' + options.rom;
        emptyApi += '&saleTypeId=' + options.sale;
        emptyApi += '&colorTypeId=' + options.color;
        emptyApi += '&suitTypeId=' + options.suit;

        var skuRomElm = element.querySelectorAll('#js_sku_rom label');
        var skuSaleElm = element.querySelectorAll('#js_sku_sale label');
        var skuColorElm = element.querySelectorAll('#js_sku_color label');
        var skuSuitElm = element.querySelectorAll('#js_sku_suit label');

        fetchJsonp(emptyApi, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            if (!res.status) {
                setDisabledClass(skuRomElm, res.productType);
                setDisabledClass(skuSaleElm, res.saleType);
                setDisabledClass(skuColorElm, res.colorType);
                setDisabledClass(skuSuitElm, res.suitType);
            }
        });
    }

    // 插入数据
    function insertData(settings, callback) {
        var element = this.element;
        var templatesElement = element.querySelector('template');
        var skuWindowElement = element.querySelector('aside');
        var skuWindowBody = skuWindowElement.querySelector('.sku-window-body');
        if (settings.skuApi && settings.skuApi !== '') {
            fetchJsonp(settings.skuApi, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                if (!res.status) {
                    if (templatesElement) {
                        templates.render(element, res).then(function (html) {
                            skuWindowBody.innerHTML = html;
                            element.removeChild(templatesElement);
                            if (typeof callback === 'function') {
                                callback(res);
                            }
                        });
                    }
                }
                else {
                    element.mipDialogComponent && element.mipDialogComponent.customElement.toast(res.msg);
                }
            });
        }
        else {
            element.mipDialogComponent && element.mipDialogComponent.customElement.toast('参数错误');
        }
    }

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    customElement.prototype.firstInviewCallback = function () {

        var self = this;
        var element = self.element;

        var script = element.querySelector('script[type="application/json"]');
        var settings = {};
        if (script) {
            var customSettings = JSON.parse(script.textContent.toString());
            settings = util.fn.extend(settings, customSettings);
        }

        var mipDialogComponent = document.querySelector('mip-zol-dialog');
        element.mipDialogComponent = mipDialogComponent;

        self.addEventAction('open', function (e) {
            createWindow.call(self, settings, function () {
                // 显示
                var skuWindowElement = element.querySelector('aside');
                var skuWindowBody = skuWindowElement.querySelector('.sku-window-body');
                skuWindowElement.classList.add('visible');
                setCover(element);

                if (!element.hasSkuWindow) {
                    // 只加载一次
                    element.hasSkuWindow = true;
                    // 关闭事件
                    var mask = element.querySelector('.sku-window-mask');
                    var closeButton = element.querySelector('.sku-window-close');
                    mask && mask.addEventListener('click', function (e) {
                        closeSkuWindow(element);
                    });
                    closeButton && closeButton.addEventListener('click', function (e) {
                        closeSkuWindow(element);
                    });
                    // 加载数据
                    insertData.call(self, settings, function (data) {
                        skuWindowBody.classList.add('loaded');
                        element.price = parseInt(data.defaultSuit.suitPrice.showPrice, 10) || 0;
                        element.canBuyNum = parseInt(data.defaultSuit.canBuyNumber, 10) || 0;
                        element.skuId = data.defaultSuit.skuId;
                        element.suitSetId = data.defaultSuit.suitSetId;
                        // 灰色
                        if (settings.emptyApi && settings.emptyApi !== '') {
                            setSkuDisabled(element, {
                                emptyApi: settings.emptyApi,
                                rom: data.defaultSuit.productTypeId,
                                sale: data.defaultSuit.saleTypeId,
                                color: data.defaultSuit.colorTypeId,
                                suit: data.defaultSuit.suitTypeId
                            });
                        }
                        // 按钮
                        setSkuButtonStatus(element, 'enable');
                        // 事件
                        bindClickEvent(element, settings, data);
                        // 操作购买数
                        setSkuNumStatus(element, element.canBuyNum);
                        setSkuNum(element);
                    });
                }
            });
        });

        self.addEventAction('close', function () {
            closeSkuWindow(element);
        });
    };

    return customElement;

});
