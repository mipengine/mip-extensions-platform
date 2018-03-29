/**
 * @file mip-zol-address 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 创建地址编辑层
     *
     * @param {HTMLElement} element 组件DOM
     * @param {JSON} data 数据
     */
    function create(element, data) {

        // 空地址提示
        var emptyTip = '';
        var saveButton = '';
        var hiddeClass = ' show';
        var fixedSaveButton = '<button id="js_address_save_fixed" class="address-edit-save-fixed disabled">保存</button>';
        if (element.dataset.type === 'component') {
            emptyTip = [
                '<div class="address-empty-tip">亲，您还没有添加收货地址！',
                '<span id="js_edit_show">点击添加</span></div>'
            ].join('');
            saveButton = '<button id="js_address_save" class="address-edit-save">保存地址</button>';
            hiddeClass = '';
            fixedSaveButton = '';
        }

        var addressTpl = [
            emptyTip,
            '<div id="js_edit_box" class="address-edit-box' + hiddeClass + '"><div class="address-edit">',
            '<div class="address-edit-item fix-flex">',
            '<div class="label">收货人</div><div class="flex-item">',
            '<input type="text" name="truename" placeholder="请填写收货人姓名" maxlength="15" value="">',
            '</div></div>',
            '<div class="address-edit-item fix-flex">',
            '<div class="label">电话</div><div class="flex-item">',
            '<input type="tel" name="mobile" placeholder="请填写收货人手机号" maxlength="15" value="">',
            '</div></div>',
            '<div class="address-edit-item address-edit-arrow fix-flex" on="tap:myCityPicker.open">',
            '<div class="label">省份/城市</div><div class="flex-item">',
            '<div class="address-edit-text" m-text="userSelectedCityName" ',
            'm-bind:selected="userSelectedCityName!==\'\'?\'true\':\'\'">请选择省份/城市</div>',
            '</div></div>',
            '<div class="address-edit-item address-edit-arrow fix-flex" id="js_map_picker">',
            '<div class="label">街道/建筑物</div><div class="flex-item">',
            '<div class="address-edit-text" m-text="userSelectedPOI" ',
            'm-bind:selected="userSelectedPOI!==\'\'?\'true\':\'\'">请选择街道/建筑物</div>',
            '</div></div>',
            '<div class="address-edit-item address-edit-auto fix-flex">',
            '<div class="label">详细地址</div><div class="flex-item">',
            '<div class="expanding-area"><pre><span></span></pre>',
            '<textarea name="address" placeholder="请输入楼号门牌等详细地址"></textarea>',
            '</div></div></div>',
            '<div class="address-edit-item fix-flex">',
            '<div class="label">设为默认地址</div><div class="flex-item">',
            '<input name="default" id="js_address_default" type="checkbox" value="1">',
            '<label for="js_address_default" class="address-edit-default">',
            '</label></div></div>',
            '</div>' + saveButton + '</div>' + fixedSaveButton,
            '<input name="city" type="hidden" value="" m-bind:value="userSelectedCityName">',
            '<input name="cityId" type="hidden" value="" m-bind:value="userSelectedCityId">',
            '<input name="provinceId" type="hidden" value="" m-bind:value="userSelectedProvinceId">',
            '<input name="poi" type="hidden" value="" m-bind:value="userSelectedPOI">',
            '<input name="lat" type="hidden" value="" m-bind:value="userSelectedLat">',
            '<input name="lng" type="hidden" value="" m-bind:value="userSelectedLng">'
        ].join('');

        if (element.dataset.type === 'component') {
            element.innerHTML = addressTpl;
        }

        // 新增地址之前没有运费
        window.MIP.setData({
            yunfei: {
                price: -1
            }
        });
    }

    // 获取表单的值
    function getValues(element) {
        // 姓名
        var truename = element.querySelector('input[name="truename"]').value;
        // 手机
        var mobile = element.querySelector('input[name="mobile"]').value;
        // 用户选择的省
        var provinceId = element.querySelector('input[name="provinceId"]').value;
        // 用户选择的市
        var cityId = element.querySelector('input[name="cityId"]').value;
        // 经纬度
        var lat = element.querySelector('input[name="lat"]').value;
        var lng = element.querySelector('input[name="lng"]').value;
        // 百度地图建筑物
        var poi = element.querySelector('input[name="poi"]').value;
        // 详细地址
        var address = element.querySelector('textarea[name="address"]').value;

        return {
            truename: truename,
            mobile: mobile,
            provinceId: provinceId,
            cityId: cityId,
            lat: lat,
            lng: lng,
            poi: poi,
            address: address
        };
    }

    // 保存按钮是否可用
    function setFixedButtonEnabled(element) {
        var values = getValues(element);
        var enabled = true;
        // 判断是否都填了
        for (var i in values) {
            if (values.hasOwnProperty(i)) {
                if (values[i].trim() === '') {
                    enabled = false;
                }
            }
        }
        // 按钮可点
        var fixedSaveButton = element.querySelector('#js_address_save_fixed');
        if (fixedSaveButton) {
            if (enabled) {
                fixedSaveButton.classList.remove('disabled');
            }
            else {
                fixedSaveButton.classList.add('disabled');
            }
        }
    }

    // 输入事件绑定
    function bindInputElementEvent(element) {

        var truenameInput = element.querySelector('input[name="truename"]');
        truenameInput && truenameInput.addEventListener('input', function () {
            setFixedButtonEnabled(element);
        }, false);

        var mobileInput = element.querySelector('input[name="mobile"]');
        mobileInput && mobileInput.addEventListener('input', function () {
            setFixedButtonEnabled(element);
        }, false);

        // texarea 自适应高度
        var addressInput = element.querySelector('textarea[name="address"]');
        var pre = element.querySelector('.expanding-area pre');
        var span = pre.querySelector('.expanding-area pre span');
        pre.appendChild(document.createElement('br'));
        addressInput.addEventListener('input', function () {
            setFixedButtonEnabled(element);
            span.textContent = addressInput.value;
        }, false);
        addressInput.textContent = addressInput.value;
    }

    // 其他事件绑定
    function initEvent(element) {

        bindInputElementEvent(element);

        // 展开添加地址
        var editShowTrigger = element.querySelector('#js_edit_show');
        var editBox = element.querySelector('#js_edit_box');
        editShowTrigger && editShowTrigger.addEventListener('click', function () {
            this.parentNode.classList.add('hide');
            editBox.classList.add('show');
        });

        //  on="tap:myMapPicker.open"
        var mapPickerTrigger = element.querySelector('#js_map_picker');
        var mapPicker = document.getElementById('myMapPicker');
        var mipDialogComponent = document.querySelector('mip-zol-dialog');
        mapPickerTrigger.addEventListener('click', function () {
            // 用户选择的省
            var provinceId = element.querySelector('input[name="provinceId"]').value;
            // 用户选择的市
            var cityId = element.querySelector('input[name="cityId"]').value;
            if (provinceId === '' || cityId === '') {
                mipDialogComponent.customElement.toast('请先选择省份/城市');
                return;
            }
            // 打开地图
            mapPicker.customElement.open();
        });

        // 保存地址
        var saveButton = element.querySelector('#js_address_save');
        saveButton && saveButton.addEventListener('click', function () {
            saveAddress(element);
            // 更新运费
            var mipComponentsYunfei = document.getElementById('yunfei');
            mipComponentsYunfei && mipComponentsYunfei.customElement.changeFreight();
        });
        var fixedSaveButton = element.querySelector('#js_address_save_fixed');
        fixedSaveButton && fixedSaveButton.addEventListener('click', function () {
            if (this.classList.contains('disabled')) {
                return;
            }
            saveAddress(element, saveBack);
        });
    }

    function saveBack() {
        setTimeout(function () {
            window.history.go(-1);
        }, 300);
    }

    // 保存地址
    function saveAddress(element, callback) {

        // 用户
        var userId = (window.ZOL_USER_INFO && window.ZOL_USER_INFO.sid) ? window.ZOL_USER_INFO.sid : 0;
        // 默认与否
        var checkedDefaultButton = element.querySelector('#js_address_default:checked');
        var isDefault = checkedDefaultButton ? parseInt(checkedDefaultButton.value, 10) : 0;

        // 地址ID
        var addressId = element.dataset.addressid;

        // 用户输入的值
        var values = getValues(element);

        // 验证
        var mipDialogComponent = document.querySelector('mip-zol-dialog');
        var mobileReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (values.truename.trim() === '') {
            mipDialogComponent.customElement.toast('请填写收货人姓名');
            return;
        }
        else if (values.mobile.trim() === '') {
            mipDialogComponent.customElement.toast('请填写收货人手机号码');
            return;
        }
        else if (values.mobile.trim().length < 11 || !mobileReg.test(values.mobile.trim())) {
            mipDialogComponent.customElement.toast('请填写正确手机号');
            return;
        }
        else if (values.provinceId === '' || values.cityId === '') {
            mipDialogComponent.customElement.toast('请选择省份/城市');
            return;
        }
        else if (values.poi === '') {
            mipDialogComponent.customElement.toast('请选择街道/建筑物');
            return;
        }
        else if (values.address.trim() === '') {
            mipDialogComponent.customElement.toast('请填写详细地址');
            return;
        }

        $.ajax({
            url: element.dataset.save,
            type: 'POST',
            data: {
                addressId: addressId,
                userId: userId,
                truename: values.truename,
                mobile: values.mobile,
                provinceId: values.provinceId,
                cityId: values.cityId,
                lat: values.lat,
                lng: values.lng,
                poi: values.poi,
                address: values.address,
                isDefault: isDefault
            },
            dataType: 'json',
            success: function (res) {
                if (res.flag) {
                    mipDialogComponent.customElement.toast('地址保存成功');
                    // 保存成功回显
                    window.MIP.setData({
                        address: {
                            status: 200,
                            info: res.info
                        }
                    });
                    // 回调
                    if (typeof callback === 'function') {
                        callback(res.info);
                    }
                }
                else {
                    mipDialogComponent.customElement.toast(res.msg);
                }
            },
            error: function (e) {
                mipDialogComponent.customElement.toast('保存地址错误，请稍后');
            }
        });
    }

    customElement.prototype.firstInviewCallback = function () {

        var element = this.element;
        var data = element.dataset;

        create(element);

        initEvent(element);

        if (data.type !== 'component' && parseInt(data.addressid, 10) && data.list && data.list !== '') {
            fetchJsonp(data.list, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                var addressData = res.address;
                if (addressData.status === 200) {
                    var userAddress = addressData.info.address;
                    var index = userAddress.lastIndexOf('/');
                    var poi = userAddress.substr(0, index);
                    var address = userAddress.substr(index + 1);
                    window.MIP.setData({
                        userSelectedCityName: addressData.info.provinceName + ' ' + addressData.info.cityName,
                        userSelectedCityId: addressData.info.cityId,
                        userSelectedProvinceId: addressData.info.provinceId,
                        userSelectedPOI: poi,
                        userSelectedLat: addressData.info.lat,
                        userSelectedLng: addressData.info.lng
                    });
                    // 姓名
                    var truenameInput = element.querySelector('input[name="truename"]');
                    truenameInput.value = addressData.info.truename;
                    // 电话
                    var mobileInput = element.querySelector('input[name="mobile"]');
                    mobileInput.value = addressData.info.mobile;
                    // 详细地址
                    var addressArea = element.querySelector('textarea[name="address"]');
                    addressArea.value = address;
                    // 是否默认
                    if (addressData.info.isDefault) {
                        element.querySelector('#js_address_default').checked = true;
                    }
                    setFixedButtonEnabled(element);
                }
            });
        }
    };

    // 自定义方法给别的组件来调用
    customElement.prototype.enable = function () {
        setFixedButtonEnabled(this.element);
    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;

});
