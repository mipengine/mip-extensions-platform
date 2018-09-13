/**
 * @file mip-zmall-yksku 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var templates = require('templates');
    var viewer = require('viewer');

    var mySKU = {
        selectedGoodsNum: 1
    };

    var skuMethod = {
        // 置灰的选项是否可以点击
        isDisabledSkuCanClick: false,

        // 减
        goodsMinus: function (element) {
            var num = mySKU.selectedGoodsNum;
            if (num <= 1) {
                return;
            }
            num--;
            mySKU.selectedGoodsNum = num;
            mySKU.totalPrice = (mySKU.skuInfo.price * num).toFixed(2);
            render(element, mySKU);
        },

        // 加
        goodsAdd: function (element) {
            var num = mySKU.selectedGoodsNum;
            var stock = mySKU.skuInfo.number;
            if (num >= stock) {
                return;
            }
            num++;
            mySKU.selectedGoodsNum = num;
            mySKU.totalPrice = (mySKU.skuInfo.price * num).toFixed(2);
            render(element, mySKU);
        },

        convert2Arr: function (o) {
            var arr = [];
            for (var key in o) {
                if (!o.hasOwnProperty(key)) {
                    continue;
                }
                var temp = o[key];
                temp.convertKey = key;
                arr.push(temp);
            }
            return arr;
        },

        // 获取所有SKU集合
        getSkuList: function (skuList) {
            // 取SKU维度
            var keys = [];
            for (var skuAttrKey in skuList[0]) {
                if (!skuList[0].hasOwnProperty(skuAttrKey)) {
                    continue;
                }
                if (skuAttrKey !== 'skuInfo') {
                    keys.push(skuAttrKey);
                }
            }
            // 所有SKU集合
            var skuData = this.combineSkuAttr(skuList, keys);
            var skuSetMap = this.buildSkuMap(skuData.skuList);
            // SKU维度数据
            var skuTypeData = skuData.skuTypeData;
            var skuTypeDataArr = this.convert2Arr(skuTypeData);
            // 默认已选的SKU组合
            var skuSelectedCache = this.getSkuSelected(skuTypeData);
            // 默认已选的SKU数据
            var skuInfo = this.getSkuInfo(keys, skuSelectedCache, skuSetMap);
            // 更新数据
            window.MIP.setData({
                selectedSkuInfo: skuInfo
            });
            mySKU.skuInfo = skuInfo;
            mySKU.skuTypeKeys = keys;
            mySKU.skuSetMap = skuSetMap;
            mySKU.skuTypeDataArr = skuTypeDataArr;
            mySKU.skuSelectedCache = skuSelectedCache;
            mySKU.totalPrice = skuInfo.price;
            // 更新选择视图
            this.updateSkuStatus(skuSelectedCache, keys, skuTypeData, skuSetMap);
        },

        // 点击切换SKU
        switchSkuByTap: function (e) {
            // 获取初始化的一些数据
            var skuTypeData = mySKU.skuTypeData;
            var keys = mySKU.skuTypeKeys;
            var skuSelectedCache = mySKU.skuSelectedCache;
            var skuSetMap = mySKU.skuSetMap;
            var isDisabledSkuCanClick = this.isDisabledSkuCanClick;
            // 获取点击元素数据
            var targetElem = e.target;
            var dataset = targetElem.dataset;
            // 灰色
            if (parseInt(dataset.disabled, 10) && !isDisabledSkuCanClick) {
                return;
            }
            // 处理已经选择
            var targetTypeIndex = keys.indexOf(dataset.typeid);
            skuSelectedCache[targetTypeIndex] = dataset.id;
            // 处理当前样式
            Object.keys(skuTypeData).forEach(function (key) {
                var skuTypeItems = skuTypeData[key].items;
                // 灰色可点击释放
                if (isDisabledSkuCanClick) {
                    skuTypeItems.forEach(function (item) {
                        if (parseInt(dataset.disabled, 10)) {
                            item.selected = 0;
                            if (key === dataset.typeid && item.id === dataset.id) {
                                item.isDisabledActive = 1;
                                item.selected = 1;
                            }
                            else {
                                item.isDisabledActive = 0;
                            }
                        }
                        else {
                            item.isDisabledActive = 0;
                            if (key === dataset.typeid) {
                                item.selected = item.id === dataset.id ? 1 : 0;
                            }
                        }
                    });
                }
                else {
                    skuTypeItems.forEach(function (item) {
                        if (key === dataset.typeid) {
                            item.selected = item.id === dataset.id ? 1 : 0;
                        }
                    });
                }
            });
            // 可点击释放的时候更新已选
            if (isDisabledSkuCanClick) {
                skuSelectedCache = this.getSkuSelected(skuTypeData);
            }
            // 获取SKU信息
            var skuInfo = this.getSkuInfo(keys, skuSelectedCache, skuSetMap);
            setTimeout(function () {
                window.MIP.setData({
                    selectedSkuInfo: skuInfo
                });
            }, 0);
            // 更新数据
            mySKU.skuSelectedCache = skuSelectedCache;
            mySKU.skuInfo = skuInfo;
            mySKU.selectedGoodsNum = 1;
            mySKU.totalPrice = skuInfo.price;
            // 更新视图数据
            this.updateSkuStatus(skuSelectedCache, keys, skuTypeData, skuSetMap);
        },

        // 获取当前SKU信息
        getSkuInfo: function (keys, skuSelectedCache, skuSetMap) {
            var skuInfo = {};
            var skuInfoKey = '';
            if (this.isDisabledSkuCanClick) {
                var tempSelectedArr = skuSelectedCache.filter(function (x) {
                    return x && x.trim();
                });
                skuInfoKey = tempSelectedArr.join('-');
                skuInfo = tempSelectedArr.length === keys.length ? skuSetMap[skuInfoKey].skus[0] : {};
            }
            else {
                skuInfoKey = skuSelectedCache.join('-');
                skuInfo = skuSetMap[skuInfoKey].skus[0];
            }
            skuInfo.pic = '//icon.zol-img.com.cn/newshop/mip/empty-pic.png';
            if (skuInfo.pictureInfo && skuInfo.pictureInfo.length) {
                skuInfo.pic = skuInfo.pictureInfo[0];
            }
            skuInfo.number = parseInt(skuInfo.number, 10) ? skuInfo.number : 0;
            return skuInfo;
        },

        // 获取已选择的sku组合
        getSkuSelected: function (skuTypeData) {
            var skuSelectedCache = [];
            for (var skuTypeKey in skuTypeData) {
                if (!skuTypeData.hasOwnProperty(skuTypeKey)) {
                    continue;
                }
                var items = skuTypeData[skuTypeKey].items;
                var id = '';
                for (var i in items) {
                    if (items.hasOwnProperty(i) && items[i].selected) {
                        id = items[i].id;
                    }
                }
                skuSelectedCache.push(id);
            }
            return skuSelectedCache;
        },

        // 取得SKU集合的所有子集「幂集」
        getSkuPowerSet: function (arr) {
            var ps = [[]];
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0, len = ps.length; j < len; j++) {
                    ps.push(ps[j].concat(arr[i]));
                }
            }
            return ps;
        },

        // 更新sku选择的状态
        updateSkuStatus: function (selected, keys, skuTypeData, skuSetMap) {
            var result = skuTypeData;
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var data = result[key].items;
                var copy = selected.slice();

                for (var j = 0; j < data.length; j++) {
                    var item = data[j];
                    copy[i] = item.id;
                    var tempCopy = copy.filter(function (x) {
                        return x && x.trim();
                    });
                    var skuMapKey = tempCopy.join('-');
                    item.disabled = skuSetMap[skuMapKey] ? 0 : 1;
                }
            }
            mySKU.skuTypeData = result;
        },

        // 生成所有子集是否可选、库存状态 map
        buildSkuMap: function (items) {
            // 拿到所有SKU集合的key
            var allKeys = [];
            var res = {};
            for (var key in items) {
                if (!items.hasOwnProperty(key)) {
                    continue;
                }
                allKeys.push(key);
            }

            for (var i = 0; i < allKeys.length; i++) {
                var curr = allKeys[i];
                var sku = items[curr].skuInfo;
                var values = curr.split('-');
                var allSets = this.getSkuPowerSet(values);

                // 每个组合的子集
                for (var j = 0; j < allSets.length; j++) {
                    var setItem = allSets[j];
                    var k = setItem.join('-');

                    if (res[k]) {
                        res[k].skus.push(sku);
                    }
                    else {
                        res[k] = {
                            skus: [sku]
                        };
                    }
                }
            }
            return res;
        },

        // 计算SKU组合数据
        combineSkuAttr: function (data, keys) {
            var allKeys = {};
            var skuTypeData = {};
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var values = [];
                var ids = [];
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j];
                    values.push(item[key].value);
                    ids.push(item[key].id);
                    item[key].selected = !i ? 1 : 0;

                    if (!skuTypeData[key]) {
                        skuTypeData[key] = {
                            name: '',
                            itemsIdArr: [],
                            items: []
                        };
                    }
                    if (skuTypeData[key].itemsIdArr.indexOf(item[key].id) < 0) {
                        skuTypeData[key].name = item[key].typeName;
                        skuTypeData[key].itemsIdArr.push(item[key].id);
                        skuTypeData[key].items.push(item[key]);
                    }
                }
                var path = ids.join('-');
                allKeys[path] = {
                    valuePath: values.join('-'),
                    skuInfo: item.skuInfo
                };
            }
            return {
                skuTypeData: skuTypeData,
                skuList: allKeys
            };
        }
    };

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
    function createWindow(callback) {
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

    // 事件绑定
    function bindClickEvent(element) {
        // 操作件数
        var minusElm = element.querySelector('#js_sku_minus');
        var plusElm = element.querySelector('#js_sku_plus');
        minusElm.addEventListener('click', function () {
            skuMethod.goodsMinus(element);
        });
        plusElm.addEventListener('click', function () {
            skuMethod.goodsAdd(element);
        });
        // 切换SKU
        var skuItems = element.querySelectorAll('#js_sku_filter label');
        [].forEach.call(skuItems, function (item) {
            item.addEventListener('click', function (event) {
                skuMethod.switchSkuByTap(event);
                render(element, mySKU);
            });
        });
    }

    // 渲染
    function render(element, data, callback) {
        var templatesElement = element.querySelector('template');
        var skuWindowElement = element.querySelector('aside');
        var skuWindowBody = skuWindowElement.querySelector('.sku-window-body');
        if (templatesElement) {
            getSkuButtonStatus(element.confirmUrl);
            templates.render(element, mySKU).then(function (html) {
                skuWindowBody.innerHTML = html;
                bindClickEvent(element);
                if (typeof callback === 'function') {
                    callback(data);
                }
            });
        }
    }

    // 修改购买按钮状态
    function getSkuButtonStatus(url) {
        var num = mySKU.selectedGoodsNum;
        var skuId = mySKU.skuInfo.id;
        var store = parseInt(mySKU.skuInfo.number, 10);
        var status = store < 1 ? 'disabled' : 'enable';
        var href = url.replace('{SKU}', skuId).replace('{SUITSET}', 1).replace('{NUM}', num);
        mySKU.confirm = {
            status: status,
            href: href
        };
    }

    // 插入数据
    function insertData(settings, callback) {
        var element = this.element;
        if (settings.skuApi && settings.skuApi !== '') {
            fetchJsonp(settings.skuApi, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                if (!res.status) {
                    var skuList = res.data;
                    skuMethod.getSkuList(skuList);
                    render(element, mySKU, function (data) {
                        callback(data);
                    });
                }
            });
        }
        else {
            viewer.eventAction.execute('error', element, {
                msg: '参数错误'
            });
        }
    }

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;

        var script = element.querySelector('script[type="application/json"]');
        var settings = {};
        if (script) {
            var customSettings = JSON.parse(script.textContent.toString());
            settings = util.fn.extend(settings, customSettings);
        }
        element.confirmUrl = settings.url;

        // 灰色的是否可以点击
        skuMethod.isDisabledSkuCanClick = settings.isDisabledSkuCanClick;

        createWindow.call(self, function () {
            var skuWindowElement = element.querySelector('aside');
            var skuWindowBody = skuWindowElement.querySelector('.sku-window-body');
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
            insertData.call(self, settings, function () {
                skuWindowBody.classList.add('loaded');
            });
        });

        self.addEventAction('open', function () {
            // 显示
            var skuWindowElement = element.querySelector('aside');
            skuWindowElement.classList.add('visible');
            setCover(element);
        });

        self.addEventAction('close', function () {
            closeSkuWindow(element);
        });
    };

    return customElement;
});
