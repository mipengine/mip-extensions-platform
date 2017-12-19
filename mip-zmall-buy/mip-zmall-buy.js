/**
 * @file mip-zol-shopspec 组件
 * @author viewJY
 * @time 2017-11-22
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 提示框，需自定义样式
     *
     * @param  {string} str 提示信息
     */
    function toast(str) {
        if (this.querySelector('._j_miptoast')) {
            return;
        }

        var toast = document.createElement('div');
        toast.className = '_j_miptoast mip-zol-toast';
        toast.innerHTML = '<span>' + str + '</span>';
        this.appendChild(toast);
        setTimeout(function () {
            toast.parentNode.removeChild(toast);
        }, 800);
    }

    // 存储数量计算
    var SUITNUM = '';

    var commonalityObj = {};

    var allSuitInfo = [];

    var emptUrl = '';

    // 初次请求商品信息数据
    function init() {
        var that = this;
        var element = that.element;

        var script = element.querySelector('script[type="application/json"]');
        var customParams = JSON.parse(script.textContent.toString());

        var dataList = element.dataset;
        var url = dataList.src;
        emptUrl = dataList.empty;

        if (url === null || url === '') {
            return;
        }

        commonalityObj.merchantId = customParams.merchantId;
        commonalityObj.goodsId = customParams.goodsId;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'success_jsonpCallback',
            data: customParams,
            success: function (response) {

                var res = '';
                if (!response) {
                    return;
                }
                if (typeof response === 'string') {
                    res = JSON.parse(response);
                }
                else {
                    res = response;
                }

                if (parseInt(res.flag, 10) === 1) {
                    allSuitInfo = res.suitInfo;
                    loadSuccess.call(that, res);
                    suitEmpty.call(that, customParams, emptUrl);
                }
            },
            error: function (err) {}
        });
    }

    // 请求成功
    function loadSuccess(res) {

        var that = this;
        var dataset = that.element.dataset;

        var specMenuBox = that.elementClone.querySelector('#zmall_buy_panel');
        var formUrl = dataset.form;
        var menuDom = createMenu(res, formUrl);

        if (specMenuBox) {
            appendBox(specMenuBox, menuDom);
        }

        var suitType = res.suitInfo;
        var defaultSuit = {};
        if (suitType) {
            defaultSuit = getsuitDefault(suitType);
        }

        if (Object.keys(defaultSuit).length > 0) {
            setDefaultStyle.call(that, defaultSuit);
        }

        var suitPrice = defaultSuit.suitPrice;

        setPrice.call(that, suitPrice);

        haveChosen.call(that);

        hasSuitDesc.call(that, defaultSuit);

        textInput.call(that, defaultSuit);

        createNum.call(that, defaultSuit);

        setNum.call(that, defaultSuit);

        optRadio.call(that, suitType);

        closeDia.call(that);

        submitFunc.call(that);
    }

    // 关闭弹窗
    function closeDia() {
        var element = this.elementClone;
        var closeBtn = element.querySelector('#zmall_buy_close');
        closeBtn.addEventListener('click', function (evt) {
            element.classList.remove('mip-zmall-buy-show');
        });
    }

    // 操作件数
    function setNum(obj) {
        var that = this;

        var specMenuBox = that.elementClone.querySelector('#zmall_buy_panel');

        var sub = specMenuBox.querySelector('#js_sub');
        var add = specMenuBox.querySelector('#js_add');
        var showNum = specMenuBox.querySelector('#js_showNum');
        var numInput = specMenuBox.querySelector('#goodsNumberInput');
        var buyBtn = specMenuBox.querySelector('#zmall_buy_submit');
        var text = specMenuBox.querySelector('.js_price');

        sub.addEventListener('click', function (evt) {
            if (SUITNUM !== '' && buyBtn.classList.contains('suction-buy__none') === false) {
                if (parseInt(showNum.value, 10) <= 1) {
                    toast.call(that.elementClone, '所选商品数量不能为0');
                    return;
                }
                showNum.value = showNum.value - 1;
                numInput.value = showNum.value;
                text.innerHTML = parseInt(obj.suitPrice.showPrice, 10) * showNum.value;
            }
        });

        add.addEventListener('click', function (evt) {
            if (SUITNUM !== '' && buyBtn.classList.contains('suction-buy__none') === false) {
                if (parseInt(showNum.value, 10) >= parseInt(SUITNUM, 10)) {
                    toast.call(that.elementClone, '所选商品数量不能超过限购数量');
                    return;
                }

                showNum.value = parseInt(showNum.value, 10) + 1;
                numInput.value = showNum.value;
                text.innerHTML = parseInt(obj.suitPrice.showPrice, 10) * showNum.value;
            }
        });
    }

    // 创建商品信息弹窗结构
    function createMenu(data, url) {
        var specMenu = '';
        var imgStr = '';
        var itemStr = '';

        var picUrl = (data.picUrl === undefined) ? '' : data.picUrl;
        var skuList = (data.sku === undefined) ? {} : data.sku;

        if (picUrl !== '') {
            imgStr = createImg(picUrl);
        }

        if (Object.keys(skuList).length > 0) {
            itemStr = createItem(skuList);
        }

        specMenu = '<aside class="select-package">'
            + '<div id="zmall_buy_close" class="select-package__closebtn"></div>'
            + '<div class="select-product clearfix">'
            + '<figure>' + imgStr + '</figure>'
            + '<div class="select-product__price js_price"></div>'
            + '</div>'
            + '<div class="selected-package__types fix-flex">'
            + '<div class="caption">已&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选：</div>'
            + '<div class="flex-item">'
            + '<p class="selected-types-name js_selected_name"></p>'
            + '<p class="selected-types-describe js_selected_suitDesc"></p>'
            + '</div>'
            + '</div>'
            + '<div class="select-package__category">'
            + '<div class="iScollBox">' + itemStr
            + '<div class="category-item fix-flex js_suitNum">'
            + '</div>'
            + '<div class="limit">订单实付金额满<b>399</b>元包邮，提醒您注意检验包装完整。</div>'
            + '</div>'
            + '</div>'
            + '<form id="zmall_buy_form" method="get" action="' + url + '">'
            + '<input type="hidden" id="" name="c" value="Shop_TongChengGou_MixConfirmOrder"/>'
            + '<input type="hidden" id="skuIdInput" name="skuId" value=""/>'
            + '<input type="hidden" id="suitIdInput" name="suitId" value=""/>'
            + '<input type="hidden" id="suitSetIdInput" name="suitSetId" value=""/>'
            + '<input type="hidden" id="goodsIdInput" name="goodsId" value=""/>'
            + '<input type="hidden" id="merchantIdInput" name="merchantId" value=""/>'
            + '<input type="hidden" id="saleSuitIdInput" name="saleSuitId" value=""/>'
            + '<input type="hidden" id="isBaiduInput" name="isBaidu" value=""/>'
            + '<input type="hidden" id="goodsNumberInput" name="goodsNumber" value="1"/>'
            + '<input type="submit" value="确 定" class="suction-buy" id="zmall_buy_submit" data-stats-baidu-obj='
            + '"%7B%22type%22%3A%22click%22%2C%22data%22%3A%22%5B_trackPageview%2C%20%2Fbuy%5D%22%7D" />'
            + '</form>'
            + '</aside>'
            + '<div class="mip-zmall-buy-mask"></div>';

        return specMenu;
    }

    // 创建商品图片信息
    function createImg(url) {
        var imgStr = '';

        if (typeof url === 'undefined' || url === '') {
            return imgStr;
        }

        imgStr = '<mip-img src="' + url + '" alt="商品展示图"></mip-img>';

        return imgStr;
    }

    // 创建商品购买信息
    function createItem(list) {
        if (typeof list === 'undefined' || list === '') {
            return '';
        }

        var skuName = '';
        var skuMenu = '';

        var skuTit = '';
        var skuStr = '';

        for (var skuItem in list) {
            if ({}.hasOwnProperty.call(list, skuItem)) {
                skuName = skuItem;
                skuMenu = list[skuItem];

                switch (skuName) {
                    case 'productType':
                        skuTit = '内存容量';

                        skuStr += createSkuItem(skuTit, skuMenu, skuName);

                        break;
                    case 'colorType':
                        skuTit = '商品颜色';

                        skuStr += createSkuItem(skuTit, skuMenu, skuName);

                        break;
                    case 'saleType':
                        skuTit = '购买方式';

                        skuStr += createSkuItem(skuTit, skuMenu, skuName);

                        break;
                    case 'suitType':
                        skuTit = '选择套装';

                        skuStr += createSkuItem(skuTit, skuMenu, skuName);

                        break;
                    default:
                        break;
                }
            }
        }

        return skuStr;
    }

    // 创建商品单个购买信息
    function createSkuItem(tit, menu, text) {

        var skuStr = '';

        var id = '';
        var name = '';

        if (Array.isArray(menu) && menu.length > 0) {
            skuStr = '<div class="category-item fix-flex" id="' + text + '">';

            if (typeof tit !== 'undefined' && tit !== '') {
                skuStr += '<div class="caption">' + tit + '：</div>';
            }

            skuStr += '<div class="flex-item">';

            for (var item = 0; item < menu.length; item++) {
                id = (menu[item].id === undefined) ? '' : menu[item].id;
                name = (menu[item].name === undefined) ? '' : menu[item].name;

                if (menu[item].isDefault === '1') {
                    skuStr += '<label for="">';
                    skuStr += '<input type="radio" name="' + tit;
                    skuStr += '"report-eventid="' + id + '" report-eventparam="' + name;
                    skuStr += '"report-eventtype="' + text + '" data-is-checked="1"/>';
                    skuStr += '<span>' + name + '</span>';
                    skuStr += '</label>';
                }
                else {
                    skuStr += '<label for="">';
                    skuStr += '<input type="radio" name="' + tit;
                    skuStr += '"report-eventid="' + id + '" report-eventparam="' + name;
                    skuStr += '"report-eventtype="' + text + '" data-is-checked="0"/>';
                    skuStr += '<span>' + name + '</span>';
                    skuStr += '</label>';
                }
            }

            skuStr += '</div>';

            skuStr += '</div>';
        }

        return skuStr;
    }

    // 添加Dom
    function appendBox(box, str) {
        if (typeof str !== 'string' || str !== '') {
            box.innerHTML = str;
        }
    }

    // 获取默认Suit
    function getsuitDefault(obj) {
        var defaultSuit = {};

        for (var i = 0; i < obj.length; i++) {
            var suitData = obj[i];

            for (var prop in suitData) {
                if (suitData.hasOwnProperty(prop)) {
                    if (prop === 'isDefault') {
                        if (parseInt(suitData[prop], 10) === 1) {
                            defaultSuit = suitData;
                        }
                    }
                }
            }
        }

        return defaultSuit;
    }

    // 设置默认样式
    function setDefaultStyle(defaultObj) {
        var that = this;

        if (typeof defaultObj === 'undefined') {
            return;
        }

        // productType
        if (defaultObj.productTypeId) {
            setItemStyle.call(that, defaultObj.productTypeId, 'productType');
        }

        // saleType
        if (defaultObj.saleTypeId) {
            setItemStyle.call(that, defaultObj.saleTypeId, 'saleType');
        }

        // colorType
        if (defaultObj.colorTypeId) {
            setItemStyle.call(that, defaultObj.colorTypeId, 'colorType');
        }

        // suitType
        if (defaultObj.suitTypeId) {
            setItemStyle.call(that, defaultObj.suitTypeId, 'suitType');
        }
    }

    function setItemStyle(byte, id) {
        var that = this;

        var productTypeDom = '';
        var productTypeInput = '';

        if (byte) {
            productTypeDom = that.elementClone.querySelector('#' + id);

            if (productTypeDom) {
                productTypeInput = productTypeDom.querySelectorAll('input[type=\'radio\']');

                if (productTypeInput.length > 0) {
                    for (var i = 0; i < productTypeInput.length; i++) {
                        if (productTypeInput[i].getAttribute('report-eventid') === byte) {
                            productTypeInput[i].setAttribute('data-is-checked', '1');

                            productTypeInput[i].classList.add('checked');
                        }
                    }
                }
            }
        }
    }

    // 设置样式
    function setPrice(price) {
        var that = this;

        var specMenu = that.elementClone.querySelector('#zmall_buy_panel');
        var priceDom = specMenu.querySelector('.js_price');

        var showPrice = '';
        var costPrice = '';

        if (typeof price === 'undefined') {
            return;
        }

        showPrice = price.showPrice;
        costPrice = price.costPrice;

        if (parseInt(showPrice, 10) === parseInt(costPrice, 10)) {
            priceDom.innerHTML = showPrice;
        }

        if (parseInt(showPrice, 10) < parseInt(costPrice, 10)) {
            var str = ' <em>' + costPrice + '</em>';
            priceDom.innerHTML = showPrice + str;
        }
    }

    // 已选显示
    function haveChosen() {
        var that = this;

        var specMenu = that.elementClone.querySelector('#zmall_buy_panel');
        var specInput = specMenu.querySelectorAll('input[type=\'radio\']');
        var textDom = specMenu.querySelector('.js_selected_name');

        var str = '';

        for (var i = 0; i < specInput.length; i++) {
            if (specInput[i].getAttribute('data-is-checked') === '1') {
                str += specInput[i].getAttribute('report-eventparam') + ' ';
            }
        }

        if (textDom && str) {
            textDom.innerHTML = str;
        }
    }

    function hasSuitDesc(obj) {
        var that = this;

        var specMenu = that.elementClone.querySelector('#zmall_buy_panel');
        var textDom = specMenu.querySelector('.js_selected_suitDesc');

        if (obj.suitDesc) {
            textDom.innerHTML = obj.suitDesc;
        }
    }

    // 设置隐藏域信息
    function textInput(obj) {
        var that = this;

        var specMenu = that.elementClone.querySelector('#zmall_buy_panel');

        var goodsId = specMenu.querySelector('#goodsIdInput');
        var merchantId = specMenu.querySelector('#merchantIdInput');
        var suitId = specMenu.querySelector('#suitIdInput');
        var skuId = specMenu.querySelector('#skuIdInput');
        var suitSetId = specMenu.querySelector('#suitSetIdInput');
        var saleSuitId = specMenu.querySelector('#saleSuitIdInput');
        var isBaidu = specMenu.querySelector('#isBaiduInput');

        if (goodsId && commonalityObj.goodsId) {
            goodsId.value = commonalityObj.goodsId;
        }

        if (merchantId && commonalityObj.merchantId) {
            merchantId.value = commonalityObj.merchantId;
        }

        if (suitId && obj.suitId) {
            suitId.value = obj.suitId;
        }

        if (skuId && obj.skuId) {
            skuId.value = obj.skuId;
        }

        if (skuId && obj.skuId) {
            skuId.value = obj.skuId;
        }

        if (suitSetId && obj.suitTypeId) {
            suitSetId.value = obj.suitTypeId;
        }

        if (saleSuitId && obj.saleTypeId) {
            saleSuitId.value = obj.saleTypeId;
        }

        if (isBaidu) {
            isBaidu.value = 1;
        }
    }

    // 限购件数
    function createNum(obj) {
        var that = this;

        var specMenu = that.elementClone.querySelector('#zmall_buy_panel');
        var num = specMenu.querySelector('.js_suitNum');

        var numStr = '';
        var suitnum = '';

        if (obj.suitNumber) {
            suitnum = parseInt(obj.suitNumber, 10);

            SUITNUM = suitnum;
        }

        numStr = '<div class="caption">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</div>'
            + '<div class="amount-item">'
            + '<span class="subtract" id="js_sub">-</span>'
            + '<input type="number" value="1" name="" min="0" max="' + suitnum + '" id="js_showNum" readonly="">'
            + '<span class="add" id="js_add">+</span>'
            + '</div>'
            + '<p class="max-number">限购：<span>' + suitnum + '</span>件</p>';

        num.innerHTML = numStr;

        return numStr;
    }

    // 请求sku制灰数据
    function suitEmpty(data, url) {
        var that = this;

        if (typeof data === 'undefined') {
            return;
        }

        if (data.merchantId === undefined) {
            data.merchantId = commonalityObj.merchantId;
        }

        if (data.goodsId === undefined) {
            data.goodsId = commonalityObj.goodsId;
        }

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: '',
            data: data,
            success: function (response) {
                if (parseInt(response.flag, 10) === 1) {
                    setEmpty.call(that, response);
                }
            },
            error: function (err) {}
        });
    }

    // 设置空样式
    function setEmpty(data) {
        var that = this;

        // 内存容量：
        var productType = data.productType;
        // 购买方式：
        var saleType = data.saleType;
        // 商品颜色：
        var colorType = data.colorType;
        // 选择套装：
        var suitType = data.suitType;

        var specMenu = that.elementClone.querySelector('#zmall_buy_panel');
        var product = specMenu.querySelectorAll('#productType input[type=\'radio\']');
        var sale = specMenu.querySelectorAll('#saleType input[type=\'radio\']');
        var color = specMenu.querySelectorAll('#colorType input[type=\'radio\']');
        var suit = specMenu.querySelectorAll('#suitType input[type=\'radio\']');

        circulationEmpty(product, productType);
        circulationEmpty(sale, saleType);
        circulationEmpty(color, colorType);
        circulationEmpty(suit, suitType);
    }

    // 循环空
    function circulationEmpty(domArr, dataArr) {
        var emptyDom = '';

        for (var i = 0; i < domArr.length; i++) {
            if (!Array.isArray(dataArr)) {
                return;
            }

            domArr[i].removeAttribute('data-empty');
            domArr[i].classList.remove('disabled');

            for (var k = 0; k < dataArr.length; k++) {
                if (dataArr[k] === domArr[i].getAttribute('report-eventid')) {
                    if (domArr[i]) {
                        domArr[i].setAttribute('data-empty', true);

                        emptyDom = domArr[i];

                        emptyDom.classList.add('disabled');
                    }
                }
            }
        }
    }

    // 操作radio
    function optRadio(data) {
        var that = this;

        var specMenu = that.elementClone.querySelector('#zmall_buy_panel');
        var inputArr = specMenu.querySelectorAll('input[type=\'radio\']');

        var product = specMenu.querySelectorAll('#productType input[type=\'radio\']');
        var sale = specMenu.querySelectorAll('#saleType input[type=\'radio\']');
        var color = specMenu.querySelectorAll('#colorType input[type=\'radio\']');
        var suit = specMenu.querySelectorAll('#suitType input[type=\'radio\']');

        var buyBtn = specMenu.querySelector('#zmall_buy_submit');

        var obj = {};

        [].map.call(inputArr, function (dom, index) {
            dom.addEventListener('click', function (evt) {
                evt.stopPropagation();

                var self = this;

                if (self.getAttribute('data-empty') === 'true') {

                    for (var k = 0; k < inputArr.length; k++) {
                        inputArr[k].removeAttribute('checked');

                        inputArr[k].classList.remove('disabled');

                        inputArr[k].classList.remove('checked');

                        setDataChecked(inputArr);

                        inputArr[k].removeAttribute('data-empty');
                    }

                    self.classList.add('checked');

                    buyBtn.classList.add('suction-buy__none');

                    buyBtn.setAttribute('disabled', 'disabled');


                    clearInputVal.call(that);

                    obj = {};

                    if (self.getAttribute('report-eventtype') === 'productType') {
                        obj.productTypeId = self.getAttribute('report-eventid');
                    }
                    else if (self.getAttribute('report-eventtype') === 'saleType') {
                        obj.saleTypeId = self.getAttribute('report-eventid');
                    }
                    else if (self.getAttribute('report-eventtype') === 'colorType') {
                        obj.colorTypeId = self.getAttribute('report-eventid');
                    }
                    else {
                        obj.suitTypeId = self.getAttribute('report-eventid');
                    }

                    setDataChecked(inputArr, self);
                }
                else {
                    for (var w = 0; w < inputArr.length; w++) {
                        if (inputArr[w].getAttribute('data-is-checked') === '1') {
                            if (inputArr[w].getAttribute('report-eventtype') === 'productType') {
                                obj.productTypeId = inputArr[w].getAttribute('report-eventid');
                            }
                            else if (inputArr[w].getAttribute('report-eventtype') === 'saleType') {
                                obj.saleTypeId = inputArr[w].getAttribute('report-eventid');
                            }
                            else if (inputArr[w].getAttribute('report-eventtype') === 'colorType') {
                                obj.colorTypeId = inputArr[w].getAttribute('report-eventid');
                            }
                            else {
                                obj.suitTypeId = inputArr[w].getAttribute('report-eventid');
                            }
                        }
                    }

                    var attrText = self.getAttribute('report-eventtype');
                    var label = '';

                    if (attrText === 'productType') {
                        obj.productTypeId = self.getAttribute('report-eventid');

                        setDataChecked(product, self);
                    }
                    else if (attrText === 'saleType') {
                        obj.saleTypeId = self.getAttribute('report-eventid');

                        setDataChecked(sale, self);
                    }
                    else if (attrText === 'colorType') {
                        obj.colorTypeId = self.getAttribute('report-eventid');

                        setDataChecked(color, self);
                    }
                    else {
                        obj.suitTypeId = self.getAttribute('report-eventid');

                        setDataChecked(suit, self);
                    }

                    self.classList.add('checked');

                    label = siblings(self.parentNode);

                    for (var v = 0; v < label.length; v++) {
                        label[v].querySelector('input[type=\'radio\']').classList.remove('checked');
                    }

                    optAllsuit.call(that, obj);
                }

                suitEmpty.call(that, obj, emptUrl);

                haveChosen.call(that);
            });
        });
    }

    function optAllsuit(obj) {
        var that = this;

        var buyBtn = that.elementClone.querySelector('#zmall_buy_submit');

        var dataNumObj = {};

        for (var x = 0; x < allSuitInfo.length; x++) {
            var aa = allSuitInfo[x].productTypeId === obj.productTypeId;
            var bb = allSuitInfo[x].saleTypeId === obj.saleTypeId;
            var cc = allSuitInfo[x].colorTypeId === obj.colorTypeId;
            var dd = allSuitInfo[x].suitTypeId === obj.suitTypeId;

            if (aa && bb && cc && dd) {
                dataNumObj = allSuitInfo[x];

                setPrice.call(that, dataNumObj.suitPrice);

                textInput.call(that, dataNumObj);

                createNum.call(that, dataNumObj);

                buyBtn.classList.remove('suction-buy__none');

                buyBtn.removeAttribute('disabled');

                setNum.call(that, dataNumObj);

                hasSuitDesc.call(that, dataNumObj);
            }
        }
    }

    function submitFunc() {
        var that = this;

        var specMenu = that.elementClone.querySelector('#zmall_buy_panel');
        var inputArr = specMenu.querySelectorAll('input[type=\'radio\']');
        var from = specMenu.querySelector('#zmall_buy_form');
        var obj = {};

        from.addEventListener('submit', function (evt) {
            evt.stopPropagation();

            for (var n = 0; n < inputArr.length; n++) {
                if (inputArr[n].getAttribute('data-is-checked') === '1') {
                    if (inputArr[n].getAttribute('report-eventtype') === 'productType') {
                        obj.productTypeId = inputArr[n].getAttribute('report-eventid');
                    }

                    if (inputArr[n].getAttribute('report-eventtype') === 'saleType') {
                        obj.saleTypeId = inputArr[n].getAttribute('report-eventid');
                    }

                    if (inputArr[n].getAttribute('report-eventtype') === 'colorType') {
                        obj.colorTypeId = inputArr[n].getAttribute('report-eventid');
                    }

                    if (inputArr[n].getAttribute('report-eventtype') === 'suitType') {
                        obj.suitTypeId = inputArr[n].getAttribute('report-eventid');
                    }
                }
            }

            if (obj.productTypeId === undefined) {
                toast.call(that.elementClone, '请选择内存容量');
                return false;
            }
            else if (obj.saleTypeId === undefined) {
                toast.call(that.elementClone, '请选择购买方式');
                return false;
            }
            else if (obj.colorTypeId === undefined) {
                toast.call(that.elementClone, '请选择商品颜色');
                return false;
            }
            else if (obj.suitTypeId === undefined) {
                toast.call(that.elementClone, '请选择商品套装');
                return false;
            }
        });
    }

    function siblings(elm) {
        var a = [];
        var p = elm.parentNode.children;

        for (var i = 0, pl = p.length; i < pl; i++) {
            if (p[i] !== elm) {
                a.push(p[i]);
            }

        }

        return a;
    }

    function setDataChecked(arr, dom) {
        if (typeof arr === 'undefined') {
            return;
        }

        for (var i = 0; i < arr.length; i++) {
            arr[i].setAttribute('data-is-checked', '0');
        }

        if (dom) {
            dom.setAttribute('data-is-checked', '1');
        }
    }

    // 清空隐藏域
    function clearInputVal() {
        var that = this;

        var specMenu = that.elementClone.querySelector('#zmall_buy_panel');

        var goodsId = specMenu.querySelector('#goodsIdInput');
        var merchantId = specMenu.querySelector('#merchantIdInput');
        var goodsNumber = specMenu.querySelector('#goodsNumberInput');
        var suitId = specMenu.querySelector('#suitIdInput');
        var skuId = specMenu.querySelector('#skuIdInput');
        var suitSetId = specMenu.querySelector('#suitSetIdInput');
        var saleSuitId = specMenu.querySelector('#saleSuitIdInput');
        var isBaidu = specMenu.querySelector('#isBaiduInput');

        goodsId.value = '';
        merchantId.value = '';
        goodsNumber.value = '1';
        suitId.value = '';
        skuId.value = '';
        suitSetId.value = '';
        saleSuitId.value = '';
        isBaidu.value = '1';
    }

    // 判断是否登录
    function islogin() {
        var userId = '';

        typeof ZOL_USER_INFO !== 'undefined' && (userId = window.ZOL_USER_INFO.userid);

        if (!userId || userId === '') {
            return false;
        }

        return true;
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElement.prototype.build = function () {

        var self = this;
        var element = self.element;
        var dataset = element.dataset;

        // 因为 iframe 包含页面时， mip-fixed 的元素build的时候会被 挪到 页面底部
        var couponLayer = document.querySelector('mip-fixed[zmall-fixed-id="' + dataset.target + '"]');
        self.elementClone = couponLayer;

        // 找到触发优惠券弹层的DOM，因不止一处触发，故而用 document.querySelectorAll 来获取
        var entrys = document.querySelectorAll('div[on="' + dataset.trigger + '"]');
        if (!entrys.length) {
            return;
        }

        // 预载入购买弹层
        init.call(self);

        // 循环绑定事件
        [].forEach.call(entrys, function (entry, index) {
            entry.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                // 判断登录
                var isLogin = islogin();
                if (!isLogin) {
                    var href = encodeURIComponent(location.href);
                    window.location.href = '//cashier.zol.com/paygate/baidu/oauth?callbackurl=' + href;
                    return;
                }

                // 显示
                couponLayer.classList.add('mip-zmall-buy-show');

            });
        });
    };

    return customElement;
});
