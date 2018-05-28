/**
 * @file mip-lxn-tab 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var util = require('util');
    var customElement = require('customElement').create();
    setHtmlRem();

    function setHtmlRem() {
        var b = document;
        var a = {};
        a.Html = b.getElementsByTagName('html')[0];
        a.widthProportion = function () {
            var c = (b.body && b.body.clientWidth || a.Html.offsetWidth) / 750;
            return c > 1 ? 1 : c < 0.4 ? 0.4 : c;
        };
        a.changePage = function () {
            a.Html.setAttribute('style', 'font-size:' + a.widthProportion() * 100 + 'px!important;height:auto');
        };

        a.changePage();
        setInterval(a.changePage, 1000);
    }

    /**
     * 添加tab切换事件
     *
     * @param {string} obj 组件对象
    */
    function tabClick(obj) {
        var ele = obj;
        var activeCls = 'lxn-this';
        var tabShow = 'lxn-show';
        // 当前城市开放的车型总列表
        var carType = ele.querySelector('#car-type');
        // tab-li
        var tabLi = ele.querySelectorAll('.tab-li');
        // lxn-tab-item
        var lxnTabItem = ele.querySelectorAll('.lxn-tab-item');
        //  添加tab切换事件
        util.event.delegate(carType,
            '.tab-li',
            'click', function (ev) {
                var evs = ev || window.event;
                var target = evs.target || evs.srcElement;
                var nodeName = target.nodeName.toLowerCase();
                var nodeFocus = '';
                if (nodeName === 'li') {
                    nodeFocus = target;
                }
                else if (nodeName === 'span') {
                    nodeFocus = target.parentNode;
                }

                tabLi.forEach(function (item) {
                    item.classList.remove(activeCls);
                });
                lxnTabItem.forEach(function (item) {
                    item.classList.remove(tabShow);
                });
                var option = nodeFocus.dataset.option; // 被点击车型的全部信息
                var licls = nodeFocus.dataset.items; // 被点击的车型
                var tabs = nodeFocus.dataset.for; // 需要显示的车型详情
                var tabItem = ele.querySelector(tabs);
                nodeFocus.classList.add(activeCls);
                tabItem.classList.add(tabShow);

                localStorage.setItem('cartype', JSON.stringify({
                    licls: licls,
                    tabcls: tabs,
                    cartype: JSON.parse(option)
                }));

                calPrice(ele);

            });
    }

    /**
     * 计算订单价格
     *
     * @param {string} obj 组件对象
    */
    function calPrice(obj) {
        var ele = obj;
        var priceValue = ele.querySelector('#real-price');
        // console.log(price);
        var cartypeData = JSON.parse(localStorage.getItem('cartype'));
        var orderMove = localStorage.getItem('move');
        // 搬家时间
        var date = localStorage.getItem('move_time');
        // 车型
        var carType = cartypeData.cartype.type;
        // 下单城市
        var focusCity = localStorage.getItem('focuscity');
        // 发货楼层
        var moveOut = '';
        // 收货楼层
        var moveIn = '';
        // 公里数
        var kilometer = localStorage.getItem('distance');

        if (orderMove !== null) {
            var ordermoves = JSON.parse(orderMove);
            moveOut = Number(ordermoves.data.pop.code);
            moveIn = Number(ordermoves.data.push.code);
        }

        if (date !== null) {
            date = Number(date);
        }

        var startStairsNum = 'start_stairs_num';
        var endStairsNum = 'end_stairs_num';
        var data = {
            couponsId: 0, // 所用的优惠券id(默认0)
            carType: carType, // 车型（影响费用）
            channel: 15, // 下单渠道(默认15)
            orderTime: date, // 服务时间(时间戳 单位s)
            orderType: 5, // 订单类型
            orderCity: focusCity, // 下单城市
            serverType: 100, // 服务类型(默认100)
            kilometer: kilometer, // 公里数
            square: 0, // 平米数(默认0)
            cityCode: 12 // 城市code
        };
        data[startStairsNum] = moveOut;
        data[endStairsNum] = moveIn;
        $.ajax({
            type: 'POST',
            url: 'https://www.lanxiniu.com//Order/calPrice', // url
            data: data,
            success: function (result) {
                var price = result.data.showPay;
                priceValue.innerHTML = price; // 设置显示数据
                localStorage.setItem('orderprice', price);
            }
        });
    }

    /**
     * 提交订单
     *
     * @param {string} obj 组件对象
     * @param {number} sessionid sessionid用于记录用户
    */
    function upOrder(obj, sessionid) {
        // var ele = obj;
        // var price = ele.querySelector('#real-price');
        // console.log(price);
        var cartypeData = JSON.parse(localStorage.getItem('cartype'));
        // var orderMove = localStorage.getItem('move');
        // 搬家时间
        var date = localStorage.getItem('move_time');
        // 车型
        var carType = cartypeData.cartype.type;
        // 下单城市
        var focusCity = localStorage.getItem('focuscity');
        // 公里数
        var kilometer = localStorage.getItem('distance');
        // 楼层
        var moveFloor = JSON.parse(localStorage.getItem('move'));
        // 地址
        var moveAddress = JSON.parse(localStorage.getItem('moveAddress'));

        var startStairsNum = 'start_stairs_num';
        var endStairsNum = 'end_stairs_num';

        var moveout = moveAddress.moveout;
        var movein = moveAddress.movein;
        var poiList = [{
            deliver: '',
            deliverAddress: moveout.location.address,
            deliverCity: moveout.location.city,
            deliverLat: moveout.location.lat,
            deliverLng: moveout.location.lng,
            deliverPhone: moveout.other.mOutPhone,
            deliverRemark: moveout.other.mOutXx,
            deliverType: 1
        }, {
            deliver: '',
            deliverAddress: movein.location.address,
            deliverCity: movein.location.city,
            deliverLat: movein.location.lat,
            deliverLng: movein.location.lng,
            deliverPhone: movein.other.mOutPhone,
            deliverRemark: movein.other.mOutXx,
            deliverType: 2
        }];
        var data = {
            Kilometer: kilometer, // 公里数
            OrderNum: '', // 订单号,（空为新建订单）
            Remark: '', // 订单备注信息
            SafePrice: '', // 保价金额
            TransTime: date, // 服务时间
            couponsId: '', // 订单所用的优惠券id
            detailType: '', // 详细的子车型
            discountAmount: '', // 折扣总额
            networkenvironment: '', // 网络环境
            orderCity: focusCity, // 下单城市
            orderFrom: '', // 订单来源
            CarType: carType, // 车型
            userLat: '', //	用户所在 纬度
            userLog: '', // 	用户所在 经度
            // start_stairs_num: moveFloor.pop.code, // 搬家 发货地楼层数
            // end_stairs_num: moveFloor.push.code, // 搬家 目的地楼层数
            orderType: 5, // 订单类型
            usedServeType: '', // 服务类型
            carringType: 0, // 是否需要搬运， 0 无需
            receiptType: 0, // 是否需要回单， 0 不需要回单
            returnMoneyType: '' // 是否需要回款

        };
        data[startStairsNum] = moveFloor.data.pop.code; // 搬家 发货地楼层数
        data[endStairsNum] = moveFloor.data.push.code; // 搬家 目的地楼层数
        var updata = {
            token: sessionid,
            couponsId: 0, // 所用的优惠券id(默认0)
            OrderNum: '', // 订单号(空为新建订单)这里默认新建订单
            assignCarType: 0, // 默认个人选择
            poiList: poiList, // 配送地点信息
            data: data // 订单信息
        };
        $.ajax({
            type: 'POST',
            url: 'https://www.lanxiniu.com//Order/update', // url
            data: updata,
            success: function (result) {
                if (result.code === 0) {
                    var data = result.data;
                    var saveData = {
                        OrderNum: data.OrderNum, // 订单号
                        TransTime: data.TransTime, // 搬家时间
                        poiList: data.poiList, // 搬入搬出地址
                        CarType: data.CarType, // 车型
                        billList: data.billList // 账单信息
                        // start_stairs_num: moveFloor.pop, // 搬家 发货地楼层数
                        // end_stairs_num: moveFloor.push, // 搬家 目的地楼层数
                    };
                    saveData[startStairsNum] = moveFloor.data.pop; // 搬家 发货地楼层数
                    saveData[endStairsNum] = moveFloor.data.push; // 搬家 目的地楼层数

                    localStorage.setItem('ordermsg', JSON.stringify(saveData));
                    window.top.location.href = 'orderList';
                }

            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        tabClick(ele);
        // 当前城市开放的车型总列表
        var carType = ele.querySelector('#car-type');
        // 小面
        var carSmall = ele.querySelector('#car-small');
        // 金杯
        var carMiddle = ele.querySelector('#car-middle');
        // 箱货
        var carBig = ele.querySelector('#car-big');
        // tab-li
        var tabLi = ele.querySelectorAll('.tab-li');
        // lxn-tab-item
        var lxnTabItem = ele.querySelectorAll('.lxn-tab-item');
        // 确认下单
        var orderConfirm = ele.querySelector('#order-confirm');
        // 搬出地址
        var moveOut = ele.querySelector('#move-out-address');
        // 搬出楼层
        var moveOutFloor = ele.querySelector('#move-out-floor');
        // 搬入地址
        var moveIn = ele.querySelector('#move-in-address');
        // 搬入楼层
        var moveInFloor = ele.querySelector('#move-in-floor');
        // 搬家时间
        var moveTime = ele.querySelector('#move-time');
        // 订单价格
        var price = ele.querySelector('#real-price');

        // 城市
        var city = localStorage.getItem('focuscity');
        if (city === null) {
            city = '北京';
            localStorage.setItem('focuscity', '北京');
        }

        // 搬出搬入楼层 本地保存的数据
        var orderMove = localStorage.getItem('move');
        // 搬出搬入地址 本地保存的数据
        var moveAddress = localStorage.getItem('moveAddress');
        // 搬家时间 本地保存的数据
        var moveTimeData = localStorage.getItem('move_time_formate');
        // 本地存储的价格
        var localPrice = localStorage.getItem('orderprice');

        // 设置地址
        if (moveAddress !== null) {
            var moveAddressd = JSON.parse(moveAddress);
            var moveOutKeys = Object.keys(moveAddressd.moveout);
            var moveInKeys = Object.keys(moveAddressd.movein);
            // console.log(JSON.stringify(moveAddressd, null, 2));
            if (moveOutKeys.length === 2) {
                moveOut.value = moveAddressd.moveout.location.title;
            }

            if (moveInKeys.length === 2) {
                moveIn.value = moveAddressd.movein.location.title;
            }
        }

        // 设置楼层
        if (orderMove !== null) {
            var ordermoves = JSON.parse(orderMove);
            moveOutFloor.value = ordermoves.data.pop.name;
            moveInFloor.value = ordermoves.data.push.name;
        }

        // 时间
        if (moveTime !== null) {
            moveTime.value = moveTimeData;
        }

        // 价格
        if (localPrice !== null) {
            price.innerHTML = localPrice;
        }

        moveOut.addEventListener('click', function (e) {
            window.top.location.href = 'moveout';
        });
        moveIn.addEventListener('click', function (e) {
            window.top.location.href = 'movein';
        });
        // 确认下单登录
        this.addEventAction('login', function (event) {
            // 获取用户信息
            // event.userInfo;
            // 后端交互会话标识
            // event.sessionId;

            // 城市
            var city = localStorage.getItem('focuscity');
            if (city === null) {
                city = '北京';
                localStorage.setItem('focuscity', '北京');
            }

            // 搬出搬入楼层 本地保存的数据
            var orderMove = localStorage.getItem('move');
            // 搬出搬入地址 本地保存的数据
            var moveAddress = localStorage.getItem('moveAddress');
            // 搬家时间 本地保存的数据
            var moveTimeData = localStorage.getItem('move_time_formate');
            // 本地存储的价格
            var localPrice = localStorage.getItem('orderprice');

            // 设置地址
            if (moveAddress !== null) {
                var moveAddressd = JSON.parse(moveAddress);
                var moveOutKeys = Object.keys(moveAddressd.moveout);
                var moveInKeys = Object.keys(moveAddressd.movein);
                // console.log(JSON.stringify(moveAddressd, null, 2));
                if (moveOutKeys.length === 2) {
                    moveOut.value = moveAddressd.moveout.location.title;
                }

                if (moveInKeys.length === 2) {
                    moveIn.value = moveAddressd.movein.location.title;
                }
            }

            // 设置楼层
            if (orderMove !== null) {
                var ordermoves = JSON.parse(orderMove);
                moveOutFloor.value = ordermoves.data.pop.name;
                moveInFloor.value = ordermoves.data.push.name;
            }

            // 时间
            if (moveTime !== null) {
                moveTime.value = moveTimeData;
            }

            // 价格
            if (localPrice !== null) {
                price.innerHTML = localPrice;
            }

            setTimeout(function () {
                checkData(event.sessionId);
            }, 300);

        });

        // 确认下单按钮点击方法
        orderConfirm.addEventListener('click', function (e) {
            var keys = 'mip-login-xzh:sessionId://www.lanxiniu.com/Baidu/back';
            var sessionid = localStorage.getItem(keys);
            if (sessionid !== null) {
                checkData(sessionid);
            }

        });
        //  提交订单前检查数据
        function checkData(sessionId) {
            var moveOutValue = moveOut.value;
            var moveOutFloorValue = moveOutFloor.value;
            var moveInValue = moveIn.value;
            var moveInFloorValue = moveInFloor.value;
            var moveTimeValue = moveTime.value;
            if (moveOutValue !== '') {
                if (moveOutFloorValue !== '') {
                    if (moveInValue !== '') {
                        if (moveInFloorValue !== '') {
                            if (moveTimeValue !== '') {
                                upOrder(ele, sessionId);
                            }
                            else {
                                alert('时间不能为空');
                            }
                        }
                        else {
                            alert('搬入楼层不能为空');
                        }
                    }
                    else {
                        alert('搬入地址不能为空!');
                    }
                }
                else {
                    alert('搬出楼层不能为空');
                }
            }
            else {
                alert('搬出地址不能为空!');
            }
        }

        // 请求当前城市的车型列表
        $.ajax({
            url: 'https://www.lanxiniu.com/Setting/getCityData',
            method: 'post',
            data: {
                city: city
            },
            success: function (result) {
                // 车型
                var cartype = localStorage.getItem('cartype');
                // tab 车辆信息
                var car = {};
                var service = result.data.setting.service;
                for (var i = 0; i < service.length; i++) {
                    if (service[i].type === 5) {
                        car = service[i].car;
                        break;
                    }

                }
                if (car.length > 2) {
                    carType.classList.add('lxn-tab-three');
                }

                var option = 'option';
                // console.log(car)
                car.forEach(function (item) {
                    var arr = item.stairs_fee.map(function (item, index) {
                        var arr = {
                            id: index,
                            name: item
                        };
                        return arr;
                    });

                    item.stairsFee = arr;

                    var options = JSON.stringify(item);
                    switch (item.type) {
                        case 3:
                            $(carSmall).data(option, options);
                            if (cartype === null) {
                                localStorage.setItem('cartype', JSON.stringify({
                                    licls: '.tab-li-one',
                                    tabcls: '.tab-item-one',
                                    cartype: item
                                }));
                            }
                            else {

                                var activeCls = 'lxn-this';
                                var tabShow = 'lxn-show';
                                var type = JSON.parse(cartype);
                                tabLi.forEach(function (item) {
                                    item.classList.remove(activeCls);
                                });
                                lxnTabItem.forEach(function (item) {
                                    item.classList.remove(tabShow);
                                });
                                //  $('.tab-li').removeClass(activeCls);
                                //  $('.lxn-tab-item').removeClass(tabShow);

                                $(type.licls).addClass(activeCls);
                                $(type.tabcls).addClass(tabShow);
                            }
                            break;
                        case 2:
                            $(carMiddle).data(option, options);
                            break;
                        case 20:
                            $(carBig).data(option, options);
                            break;
                        default:
                            break;
                    }
                });
                // 开放城市
                localStorage.setItem('open_citys', JSON.stringify(result.data.open_citys));
            }
        });
    };
    return customElement;
});

