/**
 * @file mip-lxn-picker 组件
 * @author lxn(lxn@lanxiniu.com)
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    // var $ = require('zepto');
    // var fetchJsonp = require('fetch-jsonp');
    var Picker = require('./picker');
    // var CustomStorage = util.customStorage;
    // var storage = new CustomStorage(0);

    /**
     * 计算订单价格
     *
     * @param {string} obj 组件对象
    */
    function calPrice(obj) {
        // var ele = obj;

        // 这里使用全局选择器,因为这个时间组件单独的 它的操作 会影响到其他组件的显示

        var priceValue = document.getElementById('real-price');
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
    function pickerMaskOpen(element) {
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

    function pickerMaskClose(element) {
        var picker = element.querySelector('.picker');
        picker.classList.remove('open');
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

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;

        var script = element.querySelector('script[type="application/json"]');
        var params = {};
        if (script) {
            var customParams = JSON.parse(script.textContent.toString());
            params = util.fn.extend(params, customParams);
        }

        var pickerType = params.pickerType || 'time';

        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = pickerType;
        element.appendChild(input);

        if (pickerType === 'time') {
            params = util.fn.extend(params, {
                successCallback: function (val) {
                    input.value = val.value;
                    var date = Date.parse(new Date(val.value)) / 1000;
                    localStorage.setItem('move_time', date);
                    localStorage.setItem('move_time_formate', val.value);

                    // 时间组件 选择值后 赋值给 组件外的dom(该dom不能写在组件里)
                    document.getElementById('move-time').value = val.value;
                    calPrice();
                    pickerMaskClose(element);
                },
                cancelCallback: function () {
                    pickerMaskClose(element);
                },
                createCallback: function () {
                    var mask = element.querySelector('.picker-mask');
                    mask.addEventListener('click', function (e) {
                        pickerMaskClose(element);
                        element.myPicker.hidePicker();
                    });
                }
            });
        }
        else if (pickerType === 'city') {
            params = util.fn.extend(params, {
                successCallback: function (val) {
                    input.value = val.value;
                    var move = JSON.parse(localStorage.getItem('move'));
                    var str1 = '楼层费';
                    var str2 = '...';
                    switch (move.currenttype) {
                        case 'pop':
                            move.data.pop.code = val.code;
                            move.data.pop.name = val.value.replace(str1, str2);
                            document.getElementById('move-out-floor').value = val.value.replace(str1, str2);
                            break;
                        case 'push':
                            move.data.push.code = val.code;
                            move.data.push.name = val.value.replace(str1, str2);
                            document.getElementById('move-in-floor').value = val.value.replace(str1, str2);
                            break;
                        default:
                            break;
                    }
                    localStorage.setItem('move', JSON.stringify(move));
                    calPrice();
                    pickerMaskClose(element);
                },
                cancelCallback: function () {
                    pickerMaskClose(element);
                },
                createCallback: function () {
                    var mask = element.querySelector('.picker-mask');
                    mask.addEventListener('click', function (e) {
                        pickerMaskClose(element);
                        element.myPicker.hidePicker();
                    });
                }
            });
        }

        this.addEventAction('open', function (event, str) {

            // console.log(event);
            // console.log(str);
            // alert(str)

            // 城市数据
            if (pickerType === 'city') {
                // var mipPickerCities = storage.get('mip-picker-cities');
                // var mipPickerCitiesDate = parseInt(storage.get('mip-picker-cities-date'), 10);
                // var nowDate = +new Date();
                // 七天之内不请求 7*24*60*60*1000=604800000
                // var data = storage.get('floor');
                // console.log(data)
                var moves = localStorage.getItem('move');
                var movedata = {
                    currenttype: '', // 当前选择器选择类型(pop/push)
                    data: {
                        pop: { // 搬出
                            code: '',
                            name: ''
                        },
                        push: { // 搬入
                            code: '',
                            name: ''
                        }
                    }
                };
                if (moves === null) {
                    switch (str) {
                        case '\'pop\'':
                            movedata.currenttype = 'pop';
                            localStorage.setItem('move', JSON.stringify(movedata));
                            // localStorage.setItem('move', movedata);
                            break;
                        case '\'push\'':
                            movedata.currenttype = 'push';
                            localStorage.setItem('move', JSON.stringify(movedata));
                            break;
                        default:
                            break;
                    }
                }
                else {
                    var move = JSON.parse(localStorage.getItem('move'));
                    switch (str) {
                        case '\'pop\'':
                            move.currenttype = 'pop';
                            localStorage.setItem('move', JSON.stringify(move));
                            break;
                        case '\'push\'':
                            move.currenttype = 'push';
                            localStorage.setItem('move', JSON.stringify(move));
                            break;
                        default:
                            break;
                    }
                }

                var data = JSON.parse(localStorage.getItem('cartype'));
                // .cartype.stairsFee;
                // console.log(data.cartype.stairsFee);
                params = util.fn.extend(params, {
                    // data: JSON.parse(data)
                    data: data.cartype.stairsFee
                });
                element.myPicker = new Picker(params, element);
                pickerMaskOpen(element);

            // if ((nowDate - mipPickerCitiesDate <= 604800000) && mipPickerCities) {
            //     params = util.fn.extend(params, {
            //         data: JSON.parse(mipPickerCities)
            //     });
            //     element.myPicker = new Picker(params, element);
            //     pickerMaskOpen(element);
            // } else {
            //     // 移除数据
            //     storage.rm('mip-picker-cities');
            //     storage.rm('mip-picker-cities-date');
            //     var url = element.dataset.api;
            //     // 请求数据
            //     fetchJsonp(url, {
            //         jsonpCallback: 'callback'
            //     }).then(function(res) {
            //         return res.json();
            //     }).then(function(res) {
            //         if (!res.status) {
            //             params = util.fn.extend(params, {
            //                 data: res.data
            //             });
            //             element.myPicker = new Picker(params, element);
            //             pickerMaskOpen(element);
            //             // 存本地，避免下次请求
            //             storage.set('mip-picker-cities', JSON.stringify(res.data));
            //             storage.set('mip-picker-cities-date', +new Date());
            //         }
            //     });
            // }
            }
            else {
                element.myPicker = new Picker(params, element);
                pickerMaskOpen(element);
            }
        });

        this.addEventAction('close', function () {
            pickerMaskClose(element);
            element.myPicker.hidePicker();
        });
    };

    return customElement;
});
