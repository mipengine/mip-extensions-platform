/**
 * @file mip-lc-homejs 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        // 变量声明
        // url路径
        var globalCurrentDomain = 'https://m.190cai.com';
        // 暂未开放
        $(element).on('click', '.layer-close', function () {
            // 关闭按钮
            $(element).find('#layui-m-layer8').html('');
            try {
                clearInterval(setTime);
            }
            catch (e) {}
        });
        // 声明变量
        var setTime;
        $(element).on('click', '.show_layer_tips', function () {
            var time = 3;
            var html = '<div class="layui-m-layershade"></div>'
                + '<div class="layui-m-layermain">'
                + '<div class="layui-m-layersection">'
                + '<div class="layui-m-layerchild  layui-m-anim-scale">'
                + '<div class="layui-m-layercont">'
                + '<div><div class="tips_title tc"><p>提示</p><em class="layer-close"></em></div><div class="layer-con">'
                + '正在建设中 敬请期待...<em id="time">' + time + '</em><em>s</em></div></div>'
                + '</div></div></div></div>';
            $(element).find('#layui-m-layer8').html(html);
            setTime = setInterval(function () {
                if (time <= 0) {
                    clearInterval(setTime);
                    $(element).find('#layui-m-layer8').html('');
                }
                else {
                    $(element).find('#time').html(--time);
                }
            }, 1000);
        });

        // 声明本地存储自定义方法
        var localStorageChi = function () {
            var Base64 = {
                KEYSTR: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                ENCODE: function (input) {
                    var output = '';
                    var chr1;
                    var chr2;
                    var chr3;
                    var enc1;
                    var enc2;
                    var enc3;
                    var enc4;
                    var i = 0;
                    var fecs1 = Base64.ADMAD;
                    input = fecs1(input);
                    while (i < input.length) {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        }
                        else if (isNaN(chr3)) {
                            enc4 = 64;
                        }

                        output = output
                        + Base64.KEYSTR.charAt(enc1) + Base64.KEYSTR.charAt(enc2)
                        + Base64.KEYSTR.charAt(enc3) + Base64.KEYSTR.charAt(enc4);
                    }
                    return output;
                },
                DECODE: function (input) {
                    var output = '';
                    var chr1;
                    var chr2;
                    var chr3;
                    var enc1;
                    var enc2;
                    var enc3;
                    var enc4;
                    var i = 0;
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
                    while (i < input.length) {
                        enc1 = Base64.KEYSTR.indexOf(input.charAt(i++));
                        enc2 = Base64.KEYSTR.indexOf(input.charAt(i++));
                        enc3 = Base64.KEYSTR.indexOf(input.charAt(i++));
                        enc4 = Base64.KEYSTR.indexOf(input.charAt(i++));
                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;
                        output = output + String.fromCharCode(chr1);
                        if (Number(enc3) !== 64) {
                            output = output + String.fromCharCode(chr2);
                        }

                        if (Number(enc4) !== 64) {
                            output = output + String.fromCharCode(chr3);
                        }

                    }
                    var fecs2 = Base64.UTFDECODE;
                    output = fecs2(output);
                    return output;
                },
                ADMAD: function (string) {
                    string = string.replace(/\r\n/g, '\n');
                    var utftext = '';
                    for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);
                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        }
                        else if ((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                    }
                    return utftext;
                },
                UTFDECODE: function (utftext) {
                    var string = '';
                    var i = 0;
                    var c = 0;
                    var c1 = 0;
                    var c2 = 0;
                    var c3;
                    while (i < utftext.length) {
                        c = utftext.charCodeAt(i);
                        if (c < 128) {
                            string += String.fromCharCode(c);
                            i++;
                        }
                        else if ((c > 191) && (c < 224)) {
                            c2 = utftext.charCodeAt(i + 1);
                            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                            i += 2;
                        }
                        else {
                            c2 = utftext.charCodeAt(i + 1);
                            c3 = utftext.charCodeAt(i + 2);
                            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                            i += 3;
                        }
                    }
                    return string;
                }
            };
            var MyStorage = {
                FECSTIMEOUT: 1800000,
                GETVALUE: function (key, timeOut) {
                    MyStorage.FECSTIMEOUT = 1800000;
                    if (timeOut !== undefined && (timeOut * 1000 > 1000)) {
                        MyStorage.FECSTIMEOUT = timeOut * 1000;
                    }

                    // web存储必须为window下
                    var value = window.localStorage.getItem(key);
                    if (value === null) {
                        return null;
                    }

                    var fecsDecode = Base64.DECODE;
                    var obj = JSON.parse(fecsDecode(value));
                    var fecsISAVAILABLE = MyStorage.ISAVAILABLE;
                    if (fecsISAVAILABLE(obj, timeOut)) {
                        return obj.value;
                    }
                    else {
                        // web存储必须为window下
                        window.localStorage.removeItem(key);
                        return null;
                    }
                },
                GETVALUEBYTIME: function (key, timeOut) {
                    MyStorage.FECSTIMEOUT = 1800000;
                    if (timeOut !== undefined && (timeOut * 1000 > 1000)) {
                        MyStorage.FECSTIMEOUT = timeOut * 1000;
                    }

                    // web存储必须为window下
                    var value = window.localStorage.getItem(key);
                    if (value === null) {
                        return null;
                    }

                    var fecsDecode = Base64.DECODE;
                    var obj = JSON.parse(fecsDecode(value));
                    var fecsISAVAILABLE = MyStorage.ISAVAILABLE;
                    if (fecsISAVAILABLE(obj, timeOut)) {
                        return obj;
                    }
                    else {
                        return {
                            value: {
                                ft: obj.value.ft
                            }
                        };
                    }
                },
                SETVALUE: function (key, value) {
                    var fecsCREATESTORAGE = MyStorage.CREATESTORAGE;
                    var obj = fecsCREATESTORAGE(value);
                    value = JSON.stringify(obj);
                    var baseEnCode = Base64.ENCODE;
                    value = baseEnCode(value);

                    // web存储必须为window下
                    window.localStorage.setItem(key, value);
                },
                CLEARVALUE: function (key) {

                    // web存储必须为window下
                    window.localStorage.removeItem(key);
                },
                CREATESTORAGE: function (value) {
                    var obj = {};
                    obj.value = value;
                    obj.updateTime = Date.parse(new Date());
                    return obj;
                },
                ISAVAILABLE: function (obj, t) {
                    var n = 0;
                    var nowTime = Date.parse(new Date());
                    if (!t) {
                        n = MyStorage.FECSTIMEOUT - nowTime;
                    }
                    else {
                        n = nowTime - obj.updateTime;
                    }
                    if (n > MyStorage.FECSTIMEOUT) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            };
            var MysessionStorage = {
                GETVALUE: function (key) {
                    // web存储必须为window下
                    var value = window.sessionStorage.getItem(key);
                    if (!value) {
                        return null;
                    }

                    var fecsDECODE = Base64.DECODE;
                    var obj = JSON.parse(fecsDECODE(value));
                    return obj.value;
                },
                SETVALUE: function (key, value) {
                    var fecsCREATESTORAGE = MyStorage.CREATESTORAGE;
                    var obj = fecsCREATESTORAGE(value);
                    value = JSON.stringify(obj);
                    var fecsENCODE = Base64.ENCODE;
                    value = fecsENCODE(value);

                    // web存储必须为window下
                    window.sessionStorage.setItem(key, value);
                },
                REMOVEVALUE: function (key, id) {
                    var fecsGetvalue = MysessionStorage.GETVALUE;
                    var obj = fecsGetvalue(key);
                    if (obj.length) {
                        var j = null;
                        for (var i = 0; i < obj.length; i++) {
                            if (String(obj[i].Guid) === String(id)) {
                                j = i;
                                break;
                            }

                        }
                        if (null != j) {
                            obj.splice(j, 1);
                        }
                    }
                    var fecsSETVALUE = this.SETVALUE;
                    fecsSETVALUE(key, obj);
                },
                CLEARVALUE: function (key) {
                    // web存储必须为window下
                    window.sessionStorage.removeItem(key);
                }
            };
            this.MyStorage = MyStorage;
            this.MysessionStorage = MysessionStorage;
        };

        var localStorage = {
            init: localStorageChi
        };
        // 常亮声明
        var configChi = function () {
            var lotConfing = {
                c11x5: [
                    {id: 111001, lot: 'sd11x5', name: '山东', qname: '山东11选5'},
                    {id: 111002, lot: 'gd11x5', name: '广东', qname: '广东11选5'},
                    {id: 111004, lot: 'zj11x5', name: '浙江', qname: '浙江11选5'},
                    {id: 111005, lot: 'ah11x5', name: '安徽', qname: '安徽11选5'},
                    {id: 111006, lot: 'shx11x5', name: '陕西', qname: '陕西11选5'},
                    {id: 111015, lot: 'yn11x5', name: '云南', qname: '云南11选5'},
                    {id: 111007, lot: 'hb11x5', name: '湖北', qname: '湖北11选5'},
                    {id: 111010, lot: 'js11x5', name: '江苏', qname: '江苏11选5'},
                    {id: 111013, lot: 'xj11x5', name: '新疆', qname: '新疆11选5'},
                    {id: 111012, lot: 'sh11x5', name: '上海', qname: '上海11选5'},
                    {id: 111016, lot: 'gs11x5', name: '甘肃', qname: '甘肃11选5'},
                    {id: 111017, lot: 'sx11x5', name: '山西', qname: '山西11选5'},
                    {id: 111018, lot: 'jl11x5', name: '吉林', qname: '吉林11选5'},
                    {id: 111003, lot: 'jx11x5', name: '江西', qname: '江西11选5'},
                    {id: 111011, lot: 'ln11x5', name: '辽宁', qname: '辽宁11选5'},
                    {id: 111020, lot: 'gz11x5', name: '贵州', qname: '贵州11选5'},
                    {id: 111014, lot: 'heb11x5', name: '河北', qname: '河北11选5'},
                    {id: 111019, lot: 'fj11x5', name: '福建', qname: '福建11选5'},
                    {id: 111021, lot: 'tj11x5', name: '天津', qname: '天津11选5'},
                    {id: 111008, lot: 'gx11x5', name: '广西', qname: '广西11选5'},
                    {id: 111022, lot: 'hn11x5', name: '河南', qname: '河南11选5'},
                    {id: 111026, lot: 'nx11x5', name: '宁夏', qname: '宁夏11选5'},
                    {id: 111009, lot: 'qh11x5', name: '青海', qname: '青海11选5'},
                    {id: 111025, lot: 'bj11x5', name: '北京', qname: '北京11选5'},
                    {id: 111023, lot: 'hlj11x5', name: '黑龙江', qname: '黑龙江11选5'},
                    {id: 111024, lot: 'nmg11x5', name: '内蒙古', qname: '内蒙古11选5'},
                    {id: 111028, lot: 'sc11x5', name: '四川', qname: '四川11选5'},
                    {id: 111029, lot: 'cq11x5', name: '重庆', qname: '重庆11选5'},
                    {id: 111027, lot: 'xz11x5', name: '西藏', qname: '西藏11选5'}
                ],
                ck3: [
                    {id: 211001, lot: 'jsk3', name: '江苏', qname: '江苏快3'},
                    {id: 211003, lot: 'jxk3', name: '江西', qname: '江西快3'},
                    {id: 211004, lot: 'jlk3', name: '吉林', qname: '吉林快3'},
                    {id: 211002, lot: 'ahk3', name: '安徽', qname: '安徽快3'},
                    {id: 211005, lot: 'hbk3', name: '湖北', qname: '湖北快3'},
                    {id: 211006, lot: 'hebk3', name: '河北', qname: '河北快3'},
                    {id: 211007, lot: 'nmgk3', name: '内蒙古', qname: '内蒙古快3'},
                    {id: 211015, lot: 'qhk3', name: '青海', qname: '青海快3'},
                    {id: 211016, lot: 'xzk3', name: '西藏', qname: '西藏快3'},
                    {id: 211008, lot: 'gzk3', name: '贵州', qname: '贵州快3'},
                    {id: 211009, lot: 'shk3', name: '上海', qname: '上海快3'},
                    {id: 211010, lot: 'fjk3', name: '福建', qname: '福建快3'},
                    {id: 211011, lot: 'bjk3', name: '北京', qname: '北京快3'},
                    {id: 211012, lot: 'hnk3', name: '河南', qname: '河南快3'},
                    {id: 211013, lot: 'gxk3', name: '广西', qname: '广西快3'},
                    {id: 211014, lot: 'gsk3', name: '甘肃', qname: '甘肃快3'}
                ],
                cnormal: [
                    {id: 101001, lot: 'dlt', name: '大乐透', qname: '大乐透'},
                    {id: 103001, lot: 'pl3', name: '排列3', qname: '排列3'},
                    {id: 105001, lot: 'pl5', name: '排列5', qname: '排列5'},
                    {id: 201001, lot: 'ssq', name: '双色球', qname: '双色球'},
                    {id: 203001, lot: 'fc3d', name: '福彩3D', qname: '福彩3D'}
                ],
                cjc: [
                    {id: 121001, lot: 'jczq', name: '竞彩足球', qname: '竞彩足球'},
                    {id: 122001, lot: 'jclq', name: '竞彩篮球', qname: '竞彩篮球'}
                ]
            };

            this.lotConfing = lotConfing;
        };

        var config = {
            init: configChi
        };

        var utilChi = function () {
            var tellMe = {};
            var utils = {
                // 页面是否加载完成
                isOK: function (count) {
                    if (count <= 0 && typeof (tellMe)) {
                        try {
                            // tellMe.IsOk();
                        }
                        catch (e) {}
                    }

                },
                // 一般程序异常、网络请求异常、网络超时，使用 IsFail
                IsFail: function () {
                    if (typeof (IsFail)) {
                        try {
                            // tellMe.IsFail();
                        }
                        catch (e) {}
                    }

                },
                // 获取成功但数据为空 使用 IsEmpty
                IsEmpty: function () {
                    if (typeof (IsEmpty)) {
                        try {
                            // tellMe.IsEmpty();
                        }
                        catch (e) {}
                    }

                },
                // 列表描述控制在一行半
                cutOutString: function (value) {
                    if (value.length > 30) {
                        return value.substring(0, 30) + '...';
                    }
                    else {
                        return value;
                    }
                },
                // 时间格式06-13 05:08
                toDateMDHM: function (value) {
                    if (!value) {
                        return '';
                    }

                    value = value.toString();
                    var year = value.substring(0, 4);
                    var month = value.substring(5, 7);
                    var day = value.substring(8, 10);
                    var hour = value.substring(11, 13);
                    var minute = value.substring(14, 16);
                    var second = value.substring(17, 19);
                    return month + '-' + day + ' ' + hour + ':' + minute;
                }
            };
            this.utils = utils;
        };

        var utils = {
            init: utilChi
        };
        // 常亮声明
        var kjInfoChi = function () {
            var currlots = '';

            var dayTermNo = '每10分钟一期';
            var lotskjconfig = {
                sd11x5: {
                    lot: 'sd11x5',
                    lotName: '山东11选5',
                    logo: 'sd11x5.png', // logo
                    sellTime: '8:26-22:56', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天87期', // 每天总期数
                    kjTermno: 1807033, // 开奖期数
                    willKjTermNo: 1807034, // 即将开奖期数
                    kjTime: '05:20', // 开奖倒计时
                    openNums: ['03', '10', '01', '02', '07'] // 开奖号码
                },
                sh11x5: {
                    lot: 'sh11x5',
                    lotName: '上海11选5',
                    logo: 'sh11x5.png', // logo
                    sellTime: '8:50-23:50', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天90期', // 每天总期数
                    kjTermno: 18070331, // 开奖期数
                    willKjTermNo: 18070332, // 即将开奖期数
                    kjTime: '08:10', // 开奖倒计时
                    openNums: ['05', '08', '11', '03', '07'] // 开奖号码
                },
                zj11x5: {
                    lot: 'zj11x5',
                    lotName: '浙江11选5',
                    logo: 'zj11x5.png', // logo
                    sellTime: '8:20-22:30', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天85期', // 每天总期数
                    kjTermno: 18070335, // 开奖期数
                    willKjTermNo: 18070336, // 即将开奖期数
                    kjTime: '09:05', // 开奖倒计时
                    openNums: ['07', '11', '06', '02', '05'] // 开奖号码
                },
                gd11x5: {
                    lot: 'gd11x5',
                    lotName: '广东11选5',
                    logo: 'gd11x5.png', // logo
                    sellTime: '9:01-23:01', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天84期', // 每天总期数
                    kjTermno: 18070332, // 开奖期数
                    willKjTermNo: 18070333, // 即将开奖期数
                    kjTime: '01:02', // 开奖倒计时
                    openNums: ['10', '07', '02', '11', '05'] // 开奖号码
                },
                hb11x5: {
                    lot: 'hb11x5',
                    lotName: '河北11选5',
                    logo: 'hb11x5.png', // logo
                    sellTime: '8:25-21:55', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天81期', // 每天总期数
                    kjTermno: 18070337, // 开奖期数
                    willKjTermNo: 18070338, // 即将开奖期数
                    kjTime: '02:08', // 开奖倒计时
                    openNums: ['03', '08', '11', '06', '04'] // 开奖号码
                },
                xj11x5: {
                    lot: 'xj11x5',
                    lotName: '新疆11选5',
                    logo: 'xj11x5.png', // logo
                    sellTime: '9:50-2:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天97期', // 每天总期数
                    kjTermno: 18070328, // 开奖期数
                    willKjTermNo: 18070329, // 即将开奖期数
                    kjTime: '05:10', // 开奖倒计时
                    openNums: ['01', '05', '06', '07', '04'] // 开奖号码
                },
                ln11x5: {
                    lot: 'ln11x5',
                    lotName: '辽宁11选5',
                    logo: 'ln11x5.png', // logo
                    sellTime: '8:40-22:30', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天83期', // 每天总期数
                    kjTermno: 18070336, // 开奖期数
                    willKjTermNo: 18070337, // 即将开奖期数
                    kjTime: '08:08', // 开奖倒计时
                    openNums: ['07', '03', '05', '04', '01'] // 开奖号码
                },
                ah11x5: {
                    lot: 'ah11x5',
                    lotName: '安徽11选5',
                    logo: 'ah11x5.png', // logo
                    sellTime: '8:30-22:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天81期', // 每天总期数
                    kjTermno: 18070337, // 开奖期数
                    willKjTermNo: 18070338, // 即将开奖期数
                    kjTime: '07:20', // 开奖倒计时
                    openNums: ['01', '06', '04', '09', '02'] // 开奖号码
                },
                jx11x5: {
                    lot: 'jx11x5',
                    lotName: '江西11选5',
                    logo: 'jx11x5.png', // logo
                    sellTime: '9:00-23:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天84期', // 每天总期数
                    kjTermno: 18062779, // 开奖期数
                    willKjTermNo: 18062780, // 即将开奖期数
                    kjTime: '03:15', // 开奖倒计时
                    openNums: ['07', '02', '01', '08', '06'] // 开奖号码
                },
                js11x5: {
                    lot: 'js11x5',
                    lotName: '江苏11选5',
                    logo: 'js11x5.png', // logo
                    sellTime: '8:26-22:06', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天82期', // 每天总期数
                    kjTermno: 18070338, // 开奖期数
                    willKjTermNo: 18070339, // 即将开奖期数
                    kjTime: '07:20', // 开奖倒计时
                    openNums: ['03', '04', '07', '06', '10'] // 开奖号码
                },
                heb11x5: {
                    lot: 'heb11x5',
                    lotName: '河北11选5',
                    logo: 'heb11x5.png', // logo
                    sellTime: '8:20-22:30', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天85期', // 每天总期数
                    kjTermno: 18070339, // 开奖期数
                    willKjTermNo: 18070340, // 即将开奖期数
                    kjTime: '01:02', // 开奖倒计时
                    openNums: ['07', '02', '03', '06', '09'] // 开奖号码
                },
                yn11x5: {
                    lot: 'yn11x5',
                    lotName: '云南11选5',
                    logo: 'yn11x5.png', // logo
                    sellTime: '8:51-23:01', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天85期', // 每天总期数
                    kjTermno: 18062779, // 开奖期数
                    willKjTermNo: 18062780, // 即将开奖期数
                    kjTime: '02:08', // 开奖倒计时
                    openNums: ['09', '07', '02', '01', '08'] // 开奖号码
                },
                gs11x5: {
                    lot: 'gs11x5',
                    lotName: '甘肃11选5',
                    logo: 'gs11x5.png', // logo
                    sellTime: '10:00-23:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天78期', // 每天总期数
                    kjTermno: 18070330, // 开奖期数
                    willKjTermNo: 18070331, // 即将开奖期数
                    kjTime: '05:10', // 开奖倒计时
                    openNums: ['04', '01', '10', '07', '03'] // 开奖号码
                },
                sx11x5: {
                    lot: 'sx11x5',
                    lotName: '山西11选5',
                    logo: 'sx11x5.png', // logo
                    sellTime: '8:15-23:55', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天94期', // 每天总期数
                    kjTermno: 1807033, // 开奖期数
                    willKjTermNo: 1807034, // 即将开奖期数
                    kjTime: '08:08', // 开奖倒计时
                    openNums: ['02', '07', '03', '10', '06'] // 开奖号码
                },
                jl11x5: {
                    lot: 'jl11x5',
                    lotName: '吉林11选5',
                    logo: 'jl11x5.png', // logo
                    sellTime: '8:20-21:30', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天79期', // 每天总期数
                    kjTermno: 1807030, // 开奖期数
                    willKjTermNo: 1807031, // 即将开奖期数
                    kjTime: '08:08', // 开奖倒计时
                    openNums: ['07', '06', '02', '03', '10'] // 开奖号码
                },
                fj11x5: {
                    lot: 'fj11x5',
                    lotName: '福建11选5',
                    logo: 'fj11x5.png', // logo
                    sellTime: '7:59-22:59', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天90期', // 每天总期数
                    kjTermno: 18062759, // 开奖期数
                    willKjTermNo: 18062760, // 即将开奖期数
                    kjTime: '07:20', // 开奖倒计时
                    openNums: ['09', '04', '03', '08', '05'] // 开奖号码
                },
                shx11x5: {
                    lot: 'shx11x5',
                    lotName: '陕西11选5',
                    logo: 'shx11x5.png', // logo
                    sellTime: '8:21-23:01', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天88期', // 每天总期数
                    kjTermno: 18070338, // 开奖期数
                    willKjTermNo: 18070339, // 即将开奖期数
                    kjTime: '03:15', // 开奖倒计时
                    openNums: ['06', '04', '10', '02', '03'] // 开奖号码
                },
                gz11x5: {
                    lot: 'gz11x5',
                    lotName: '贵州11选5',
                    logo: 'gz11x5.png', // logo
                    sellTime: '8:50-22:10', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天80期', // 每天总期数
                    kjTermno: 18070336, // 开奖期数
                    willKjTermNo: 18070337, // 即将开奖期数
                    kjTime: '07:20', // 开奖倒计时
                    openNums: ['04', '02', '03', '06', '08'] // 开奖号码
                },
                sc11x5: {
                    lot: 'sc11x5',
                    lotName: '四川11选5',
                    logo: 'sc11x5.png', // logo
                    sellTime: '9:00-22:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天78期', // 每天总期数
                    kjTermno: 17010906, // 开奖期数
                    willKjTermNo: 17010907, // 即将开奖期数
                    kjTime: '01:02', // 开奖倒计时
                    openNums: ['05', '06', '08', '10', '11'] // 开奖号码
                },
                tj11x5: {
                    lot: 'tj11x5',
                    lotName: '天津11选5',
                    logo: 'tj11x5.png', // logo
                    sellTime: '8:50-23:50', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天90期', // 每天总期数
                    kjTermno: 18070337, // 开奖期数
                    willKjTermNo: 18070338, // 即将开奖期数
                    kjTime: '05:20', // 开奖倒计时
                    openNums: ['11', '01', '05', '08', '10'] // 开奖号码
                },
                gx11x5: {
                    lot: 'gx11x5',
                    lotName: '广西11选5',
                    logo: 'gx11x5.png', // logo
                    sellTime: '8:51-23:51', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天90期', // 每天总期数
                    kjTermno: 18070337, // 开奖期数
                    willKjTermNo: 18070338, // 即将开奖期数
                    kjTime: '08:10', // 开奖倒计时
                    openNums: ['02', '09', '03', '11', '10'] // 开奖号码
                },
                hn11x5: {
                    lot: 'hn11x5',
                    lotName: '河南11选5',
                    logo: 'hn11x5.png', // logo
                    sellTime: '8:35-23:15', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天85期', // 每天总期数
                    kjTermno: 18070528, // 开奖期数
                    willKjTermNo: 18070529, // 即将开奖期数
                    kjTime: '09:05', // 开奖倒计时
                    openNums: ['03', '06', '07', '10', '11'] // 开奖号码
                },
                nx11x5: {
                    lot: 'nx11x5',
                    lotName: '宁夏11选5',
                    logo: 'nx11x5.png', // logo
                    sellTime: '9:02-0:48', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天79期', // 每天总期数
                    kjTermno: 18070341, // 开奖期数
                    willKjTermNo: 18070342, // 即将开奖期数
                    kjTime: '01:02', // 开奖倒计时
                    openNums: ['08', '01', '03', '07', '06'] // 开奖号码
                },
                qh11x5: {
                    lot: 'qh11x5',
                    lotName: '青海11选5',
                    logo: 'qh11x5.png', // logo
                    sellTime: '9:05-22:45', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天82期', // 每天总期数
                    kjTermno: 18070337, // 开奖期数
                    willKjTermNo: 18070338, // 即将开奖期数
                    kjTime: '02:08', // 开奖倒计时
                    openNums: ['07', '05', '10', '11', '06'] // 开奖号码
                },
                hlj11x5: {
                    lot: 'hlj11x5',
                    lotName: '黑龙江11选5',
                    logo: 'hlj11x5.png', // logo
                    sellTime: '7:55-22:35', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天88期', // 每天总期数
                    kjTermno: 18070344, // 开奖期数
                    willKjTermNo: 18070345, // 即将开奖期数
                    kjTime: '05:10', // 开奖倒计时
                    openNums: ['05', '04', '11', '06', '09'] // 开奖号码
                },
                nmg11x5: {
                    lot: 'nmg11x5',
                    lotName: '内蒙古11选5',
                    logo: 'neg11x5.png', // logo
                    sellTime: '9:35-22:05', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天75期', // 每天总期数
                    kjTermno: 18070340, // 开奖期数
                    willKjTermNo: 18070341, // 即将开奖期数
                    kjTime: '08:08', // 开奖倒计时
                    openNums: ['11', '06', '07', '09', '10'] // 开奖号码
                },
                bj11x5: {
                    lot: 'bj11x5',
                    lotName: '北京11选5',
                    logo: 'bj11x5.png', // logo
                    sellTime: '8:50-23:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天85期', // 每天总期数
                    kjTermno: 18070340, // 开奖期数
                    willKjTermNo: 18070341, // 即将开奖期数
                    kjTime: '07:20', // 开奖倒计时
                    openNums: ['03', '07', '08', '11', '10'] // 开奖号码
                },
                cq11x5: {
                    lot: 'cq11x5',
                    lotName: '重庆11选5',
                    logo: 'cq11x5.png', // logo
                    sellTime: '8:50-23:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天85期', // 每天总期数
                    kjTermno: 18072023, // 开奖期数
                    willKjTermNo: 18072024, // 即将开奖期数
                    kjTime: '07:20', // 开奖倒计时
                    openNums: ['10', '01', '02', '03', '07'] // 开奖号码
                },
                xz11x5: {
                    lot: 'xz11x5',
                    lotName: '西藏11选5',
                    logo: 'xz11x5.png', // logo
                    sellTime: '8:50-23:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天85期', // 每天总期数
                    kjTermno: 16011237, // 开奖期数
                    willKjTermNo: 16011238, // 即将开奖期数
                    kjTime: '07:20', // 开奖倒计时
                    openNums: ['08', '02', '09', '11', '03'] // 开奖号码
                },
                hbk3: {
                    lot: 'hbk3',
                    lotName: '湖北快3',
                    logo: 'hbk3.png', // logo
                    sellTime: '9:00-22:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天78期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703002, // 即将开奖期数
                    kjTime: '05:20', // 开奖倒计时
                    openNums: ['1', '4', '6'], // 开奖号码
                    hz: 11
                },
                hebk3: {
                    lot: 'hebk3',
                    lotName: '河北快3',
                    logo: 'hebk3.png', // logo
                    sellTime: '8:30-22:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天81期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '08:10', // 开奖倒计时
                    openNums: ['4', '5', '6'], // 开奖号码
                    hz: 15
                },
                nmgk3: {
                    lot: 'nmgk3',
                    lotName: '内蒙古快3',
                    logo: 'nmgk3.png', // logo
                    sellTime: '9:35-21:45', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天73期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '09:05', // 开奖倒计时
                    openNums: ['4', '5', '6'], // 开奖号码
                    hz: 15
                },
                qhk3: {
                    lot: 'qhk3',
                    lotName: '青海快3',
                    logo: 'qhk3.png', // logo
                    sellTime: '9:00-22:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天78期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '01:02', // 开奖倒计时
                    openNums: ['4', '5', '5'], // 开奖号码
                    hz: 14
                },
                xzk3: {
                    lot: 'xzbk3',
                    lotName: '西藏快3',
                    logo: 'xzk3.png', // logo
                    sellTime: '8:30-21:50', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天80期', // 每天总期数
                    kjTermno: 160928033, // 开奖期数
                    willKjTermNo: 160928033, // 即将开奖期数
                    kjTime: '02:08', // 开奖倒计时
                    openNums: ['2', '2', '4'], // 开奖号码
                    hz: 8
                },
                gzk3: {
                    lot: 'gzk3',
                    lotName: '贵州快3',
                    logo: 'gzk3.png', // logo
                    sellTime: '9:00-22:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天78期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '05:10', // 开奖倒计时
                    openNums: ['1', '3', '4'], // 开奖号码
                    hz: 8
                },
                shk3: {
                    lot: 'shk3',
                    lotName: '上海快3',
                    logo: 'shk3.png', // logo
                    sellTime: '8:48-22:28', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天82期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '08:08', // 开奖倒计时
                    openNums: ['1', '1', '1'], // 开奖号码
                    hz: 3
                },
                fjk3: {
                    lot: 'fjk3',
                    lotName: '福建快3',
                    logo: 'fjk3.png', // logo
                    sellTime: '8:50-21:50', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天78期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '07:20', // 开奖倒计时
                    openNums: ['2', '3', '6'], // 开奖号码
                    hz: 11
                },
                bjk3: {
                    lot: 'bjk3',
                    lotName: '北京快3',
                    logo: 'bjk3.png', // logo
                    sellTime: '9:00-23:50', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天89期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '03:15', // 开奖倒计时
                    openNums: ['1', '2', '5'], // 开奖号码
                    hz: 8
                },
                hnk3: {
                    lot: 'hnk3',
                    lotName: '河南快3',
                    logo: 'hnk3.png', // logo
                    sellTime: '8:35-22:35', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天84期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '07:20', // 开奖倒计时
                    openNums: ['1', '1', '6'], // 开奖号码
                    hz: 8
                },
                gxk3: {
                    lot: 'gxk3',
                    lotName: '广西快3',
                    logo: 'gxk3.png', // logo
                    sellTime: '9:28-22:28', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天78期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '01:02', // 开奖倒计时
                    openNums: ['1', '2', '6'], // 开奖号码
                    hz: 9
                },
                jxk3: {
                    lot: 'jxk3',
                    lotName: '江西快3',
                    logo: 'jxk3.png', // logo
                    sellTime: '8:55-22:52', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天84期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '02:08', // 开奖倒计时
                    openNums: ['2', '2', '6'], // 开奖号码
                    hz: 10
                },
                ahk3: {
                    lot: 'ahk3',
                    lotName: '安徽快3',
                    logo: 'ahk3.png', // logo
                    sellTime: '8:40-22:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天80期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '05:10', // 开奖倒计时
                    openNums: ['1', '1', '3'], // 开奖号码
                    hz: 5
                },
                jsk3: {
                    lot: 'jsk3',
                    lotName: '江苏快3',
                    logo: 'jsk3.png', // logo
                    sellTime: '8:27-22:10', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天82期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '08:08', // 开奖倒计时
                    openNums: ['1', '3', '6'], // 开奖号码
                    hz: 10
                },
                jlk3: {
                    lot: 'jlk3',
                    lotName: '吉林快3',
                    logo: 'jlk3.png', // logo
                    sellTime: '7:30-22:00', // 销售时间
                    dec: dayTermNo, // 描述
                    dayTerm: '每天87期', // 每天总期数
                    kjTermno: 180703001, // 开奖期数
                    willKjTermNo: 180703001, // 即将开奖期数
                    kjTime: '08:08', // 开奖倒计时
                    openNums: ['1', '2', '4'], // 开奖号码
                    hz: 7
                },
                dlt: {
                    lot: 'dlt',
                    lotName: '大乐透',
                    logo: 'dlt.png', // logo
                    sellTime: '周一、三、六', // 销售时间
                    dayKjTime: '20:30分开奖', // 每天开奖时间
                    dec: '3元可中1500万', // 描述
                    kjTermno: 18076, // 开奖期数
                    willKjTermNo: 18077, // 即将开奖期数
                    kjTime: '07-04 20:30', // 开奖倒计时
                    openNums: ['01', '06', '09', '15', '26', '08', '09'] // 开奖号码
                },
                ssq: {
                    lot: 'ssq',
                    lotName: '双色球',
                    logo: 'ssq.png', // logo
                    sellTime: '周二、四、日', // 销售时间
                    dayKjTime: '21:30开奖', // 每天开奖时间
                    dec: '2元可中1000万', // 描述
                    kjTermno: 18075, // 开奖期数
                    willKjTermNo: 18076, // 即将开奖期数
                    kjTime: '07-03 21:15', // 开奖倒计时
                    openNums: ['07', '09', '12', '13', '22', '24', '11'] // 开奖号码
                },
                pl3: {
                    lot: 'pl3',
                    lotName: '排列三',
                    logo: 'pl3.png', // logo
                    sellTime: '20:30分开奖', // 销售时间
                    dayTerm: '每天一期', // 描述
                    kjTermno: 18077, // 开奖期数
                    willKjTermNo: 18078, // 即将开奖期数
                    kjTime: '07-04 20:30', // 开奖倒计时
                    openNums: ['2', '2', '2'] // 开奖号码
                },
                fc3d: {
                    lot: 'fc3d',
                    lotName: '福彩3D',
                    logo: 'fc3d.png', // logo
                    sellTime: '20:30分开奖', // 销售时间
                    dayTerm: '每天一期', // 描述
                    kjTermno: 18077, // 开奖期数
                    willKjTermNo: 18078, // 即将开奖期数
                    kjTime: '07-04 21:15', // 开奖倒计时
                    openNums: ['1', '0', '2'] // 开奖号码
                },
                pl5: {
                    lot: 'pl5',
                    lotName: '排列五',
                    logo: 'pl5.png', // logo
                    sellTime: '20:30分开奖', // 销售时间
                    dayTerm: '每天一期', // 描述
                    kjTermno: 18077, // 开奖期数
                    willKjTermNo: 18078, // 即将开奖期数
                    kjTime: '07-04 20:30', // 开奖倒计时
                    openNums: ['2', '2', '2', '5', '7'] // 开奖号码
                }
            };
            this.lotskjconfig = lotskjconfig;
        };

        var kjInfo = {
            init: kjInfoChi
        };

        var reqChi = function () {
            // 初始化
            localStorage.init();
            config.init();

            // 获取本地存储模块
            var stor = localStorage;
            // 获取彩种
            var lotConfing = config;
            var consts = {
                AGENTID: 100,
                AGENTSECRET: 888
            };

            // 公共请求
            var crequestComm = {
                EXP_TIME: 300,
                ST: null,
                // 获取超时时间
                getTimeOut: function (timeout) {
                    var t = 5000;
                    if (!!timeout) {
                        t = timeout;
                    }

                    return t;
                },
                getBASEURL: function () {
                    var cbaseurl = 'http://ext.190cai.cn';
                    // var str='/ext',
                    // _win=window;
                    // var _protocol = _win.location.protocol,
                    //     do_main =_win.location.host;
                    // var cbaseurl=_protocol+'//'+do_main+'/ext';
                    return cbaseurl;
                },
                // 获取本地存储数据
                getStor: function (key, time) {
                    var fecsGETVALUEBYTIME = stor.MyStorage.GETVALUEBYTIME;
                    var cstordata = fecsGETVALUEBYTIME(key, time);
                    return cstordata;
                },
                // 身份验证
                checkAuth: function (sucFn) {
                    var fecsGETVALUE = stor.MyStorage.GETVALUE;
                    this.EXP_TIME = fecsGETVALUE('expires_in');
                    if (!this.EXP_TIME) {
                        this.EXP_TIME = 300;
                    }

                    var cstordata = this.getStor('auth_token', this.EXP_TIME);
                    var granttype = 'create';
                    var crefreshtoken = '';
                    var flg = false;
                    if (!cstordata) {
                        flg = true;
                    }
                    else {
                        if (!cstordata.updateTime) {
                            if (!!cstordata.value.ft) {
                                flg = true;
                                granttype = 'refresh';
                                crefreshtoken = cstordata.value.ft;
                            }
                            else {
                                flg = true;
                            }
                        }
                    }
                    if (flg) {
                        var url = '/api/token/Auth';
                        var param = {granttype: granttype, agentid: consts.AGENTID,
                            agentsecret: consts.AGENTSECRET, crefreshtoken: crefreshtoken};
                        requests.authPost(url, param, false, function (json) {
                            clearInterval(crequestComm.ST);
                            if ('success' === json.Msg) {
                                var strs = json.Data;
                                if (!!strs) {
                                    var arrs = JSON.parse(strs);
                                    var fecsSETVALUE = stor.MyStorage.SETVALUE;
                                    fecsSETVALUE('expires_in', ((arrs.expires_in - 5)));
                                    fecsSETVALUE('auth_token', {at: arrs.accessToken,
                                        ft: arrs.crefreshtoken});
                                    sucFn(arrs.accessToken);
                                }
                            }
                            else {
                                crequestComm.restGetAuth(sucFn);
                            }
                        });
                    }
                    else {
                        var v = cstordata.value.at;
                        sucFn(v);
                    }
                },
                // 清除缓存
                clearAuthToken: function () {
                    var fecsCLEARVALUE = stor.MyStorage.CLEARVALUE;
                    fecsCLEARVALUE('auth_token');
                },
                // 重新验证请求
                restGetAuth: function (sucFn) {
                    // crequestComm.ST=setInterval(function(){
                    crequestComm.clearAuthToken();
                    crequestComm.checkAuth(sucFn);
                    // },3000)
                },
                // 获取彩种配置
                getLots: function (sucFn) {
                    var lots = lotConfing.lotConfing; // stor.MyStorage.GETVALUE('cm_lots', 604800);//7天
                    var isAsyc = !!sucFn && typeof sucFn === 'function';
                    if (!lots) {
                        var flg = crequestComm.isStaticByRealTime();
                        if (flg) { // 静态化
                            return;
                        }

                        requests.post('/api/data', {
                            action: 100150
                        }, isAsyc, function (json) {
                            if ('success' === json.Error) {
                                var v = json.Value;
                                var fecsSETVALUE = stor.MyStorage.SETVALUE;
                                fecsSETVALUE('cm_lots', v);
                                if (isAsyc) {
                                    sucFn(v);
                                }
                                else {
                                    return v;
                                }
                            }

                        });
                    }

                    if (isAsyc) {
                        sucFn(lots);
                    }
                    else {
                        return lots;
                    }
                },
                getLotItem: function (lot) {
                    var lots = crequestComm.getLots();
                    for (var i in lots) {
                        if (lots.hasOwnProperty(i)) {
                            var arr = lots[i];
                            for (var j = 0; j < arr.length; j++) {
                                if (String(arr[j].lot) === String(lot)) {
                                    return arr[j];
                                }

                            }
                        }

                    }
                    return null;
                },
                getLotTitle: function (lot) {
                    var lot = crequestComm.getLotItem(lot);
                    if (!!lot) {
                        return lot.qname;
                    }

                    return lot;
                },
                // 根据静态时间去动态更新数据
                isStaticByRealTime: function (realtime) {
                    var flg = true;
                    var fecsst = '';

                    flg = false;
                    // if(!fecsst){
                    //     flg=false;
                    // }else{
                    //     if(!!realtime){
                    //         flg= crequestComm.getTimes(realtime,fecsst);
                    //     }

                    // }
                    return flg;
                },
                // 获取时间差
                getTimes: function (realtime, fecsst) {
                    var rt = new Date(realtime).getTime();
                    var st = new Date(fecsst).getTime();
                    if (rt - st >= 0) {
                        return false;
                    }

                    return true;
                },
                errCounts: {

                },
                isClear: false,
                // 重新获取请求,请求失败后重新请求次数为2
                // s:请求失败状态 ,fc：请求方法,i：请求次数标识
                getResetReq: function (s, i) {
                    if (typeof crequestComm.errCounts[i] === 'undefined') {
                        crequestComm.errCounts[i] = 2;
                    }

                    crequestComm.errCounts[i]--;
                    if (crequestComm.errCounts[i] > 0) {
                        if (401 === Number(s)) {
                            if (!crequestComm.isClear) {
                                crequestComm.isClear = true;
                                crequestComm.clearAuthToken();
                            }
                        }

                        return false;
                    }

                    return true;
                }
            };

            var reqAjax = {
                // isNotAuth:是否不加权限验证
                getAjaxCross: function (type, url, param, isAsync, sucFn, errFn, compFn, realtime, timeout, isNotAuth) {
                    var flg = crequestComm.isStaticByRealTime(realtime);
                    if (flg) { // 静态化
                        return;
                    }

                    // var cbaseurl = crequestComm.getBASEURL();
                    var cbaseurl = 'http://zhibo.190cai.cn/ext';
                    if (!url) {
                        url = cbaseurl;
                    }
                    else {
                        url = cbaseurl + url;
                    }
                    if (!isNotAuth) {
                        var accessToken = '';
                        crequestComm.checkAuth(function (json) {
                            if (typeof json !== 'undefined') {
                                accessToken = json;
                            }

                        });
                        ajaxParam.headers = {
                            Authorization: 'Bearer ' + accessToken
                        };
                    }

                    // param['accessToken'] =accessToken;
                    var cfecst = crequestComm.getTimeOut(timeout);
                    var ajaxParam = {
                        url: url,
                        data: param,
                        dataType: 'json',
                        type: type,
                        async: isAsync,
                        timeout: cfecst,
                        crossDomain: true,
                        contentType: 'json',
                        success: function (data) {
                            if (typeof sucFn !== 'undefined' && typeof sucFn === 'function') {
                                sucFn(data);
                            }

                        },
                        error: function (data) {

                            if (typeof errFn !== 'undefined' && typeof errFn === 'function') {
                                errFn(data);
                            }

                        },
                        complete: function (XHR, TS) {
                            if (!!compFn && typeof compFn === 'function') {
                                compFn(XHR, TS);
                            }

                        }
                    };
                    if (!isNotAuth) {
                        ajaxParam.headers = {
                            Authorization: 'Bearer ' + accessToken
                        };
                    }

                    $.ajax(ajaxParam);
                },
                getAjax: function (type, url, param, isAsync, sucFn, errFn, compFn, realtime, timeout, isNotAuth) {
                    var flg = crequestComm.isStaticByRealTime(realtime);
                    if (flg) { // 静态化
                        return;
                    }

                    // var cbaseurl = crequestComm.getBASEURL();
                    var cbaseurl = 'http://zhibo.190cai.cn/ext';
                    if (!url) {
                        url = cbaseurl;
                    }
                    else {
                        url = cbaseurl + url;
                    }
                    if (!isNotAuth) {
                        var accessToken = '';
                        crequestComm.checkAuth(function (json) {
                            if (typeof json !== 'undefined') {
                                accessToken = json;
                            }

                        });
                    }

                    // 超时时间
                    var cfecst = crequestComm.getTimeOut(timeout);
                    var ajaxParam = {
                        url: url,
                        data: param,
                        dataType: 'json',
                        type: type,
                        async: isAsync,
                        timeout: cfecst,
                        success: function (data) {
                            if (typeof sucFn !== 'undefined' && typeof sucFn === 'function') {
                                sucFn(data);
                            }

                        },
                        error: function (data) {
                            if (401 === Number(data.status)) {
                                crequestComm.clearAuthToken();
                            }

                            if (typeof errFn !== 'undefined' && typeof errFn === 'function') {
                                errFn(data);
                            }

                        },
                        complete: function (XHR, TS) {
                            if (!!compFn && typeof compFn === 'function') {
                                compFn(XHR, TS);
                            }

                        }
                    };
                    if (!isNotAuth) {
                        ajaxParam.headers = {
                            Authorization: 'Bearer ' + accessToken
                        };
                    }

                    $.ajax(ajaxParam);
                }
            };

            // 接口初始化
            var requests = {
                // param:参数  sync:是否异步 timeout:设置请求超时时间 默认3000 ,realtime(传入格式例如：2018/6/29/15:29)：实时更新时间
                get: function (url, param, isAsync, sucFn, errFn, compFn, realtime, timeout) {
                    reqAjax.getAjax('GET', url, param, isAsync, sucFn, errFn, compFn, realtime, timeout);
                },
                post: function (url, param, isAsync, sucFn, errFn, compFn, realtime, timeout) {
                    reqAjax.getAjax('POST', url, param, isAsync, sucFn, errFn, compFn, realtime, timeout);
                },
                authGet: function (url, param, isAsync, sucFn, errFn, compFn, realtime, timeout) {
                    reqAjax.getAjax('GET', url, param, isAsync, sucFn, errFn, compFn, realtime, timeout, true);
                },
                authPost: function (url, param, isAsync, sucFn, errFn, compFn, realtime, timeout) {
                    reqAjax.getAjax('POST', url, param, isAsync, sucFn, errFn, compFn, realtime, timeout, true);
                }
            };
            var loaing = {
                showLoding: function () {}
            };

            // 暴露字段
            this.BASE_URL = crequestComm.getBASEURL();
            this.requests = requests;
            this.getLots = crequestComm.getLots;
            this.getResetReq = crequestComm.getResetReq;
            this.getLotTitle = crequestComm.getLotTitle;
        };

        var req = {
            init: reqChi
        };

        var newsCommChi = function (req) {
            // 初始化
            req.init();
            var req = req;
            // 公告

            var cnewscomm = {
                // gonggao:公告
                // jiajiang：加奖
                // cgc：常规彩
                // _11x5：11x5
                // k3：k3
                // xinwen：新闻
                // jiqiao：技巧
                // zhongjiang:中奖新闻
                // tuijian:推荐阅读
                // jingping精品推荐
                // isNeedOriData:是否需要原数据
                // isCateType:是否需要根据所传分类返回数据
                cateName: ['gonggao', 'jiajiang', 'yuce', 'cgc', '_11x5', 'k3',
                  'xinwen', 'jiqiao', 'zhongjiang', 'tuijian', 'jingping'],
                getNews: function (type, cateType, cateName, sort, page, size, sucFn,
                    errFn, isNeedOriData, isCateType) {
                    var param = {
                        action: 100010,
                        Type: type,
                        cateType: cateType,
                        cateName: cateName,
                        sort: sort,
                        page: page,
                        size: size
                    };
                    var url = '/api/data';
                    req.requests.post(url, param, true, function (json) {
                        if ('success' === json.Error) {
                            var v = json.Value;
                            if (isNeedOriData) {
                                sucFn(cnewscomm.dealData(v, cateName, isCateType), v);
                            }
                            else {
                                sucFn(cnewscomm.dealData(v, cateName, isCateType));
                            }
                        }
                        else {
                        }
                    }, function (data) {
                        if (typeof errFn !== 'undefined' && typeof errFn === 'function') {
                            errFn(data);
                        }

                    });
                },
                jsons: {},
                // 处理数据
                dealData: function (v, cateName, isCateType) {
                    var fecscates = cateName;
                    if (!!fecscates && typeof fecscates === 'string') {
                        fecscates = fecscates.split(',');
                    }

                    if (!isCateType) {
                        fecscates = cnewscomm.cateName;
                    }

                    if (v.length > 0) {
                        for (var i = 0; i < v.length; i++) {
                            var cate = v[i].catename;
                            for (var j = 0; j < cate.length; j++) {
                                var fecsindex = $.inArray(cate[j], fecscates);
                                if (-1 !== Number(fecsindex)) {
                                    if (typeof cnewscomm.jsons[fecscates[fecsindex]] === 'undefined') {
                                        cnewscomm.jsons[fecscates[fecsindex]] = [];
                                    }

                                    var flg = cnewscomm.getNorepeat(cnewscomm.jsons[fecscates[fecsindex]], v[i].id);
                                    if (flg) {
                                        cnewscomm.jsons[fecscates[fecsindex]].push(v[i]);
                                    }
                                }

                            }
                        }
                        return cnewscomm.jsons;
                    }

                },
                // 根据id数组去重
                getNorepeat: function (a, id) {
                    var flg = true;
                    for (var i = 0; i < a.length; i++) {
                        if (String(a[i].id) === String(id)) {
                            flg = false;
                            break;
                        }

                    }
                    return flg;
                }
            };

            var tagsConfig = {
                tagTitles: {
                    'gonggao': '公告',
                    'jiajiang': '加奖',
                    'yuce': '预测',
                    'xinwen': '新闻',
                    'jiqiao': '技巧',
                    'zhongjiang': '中奖新闻',
                    'tuijian': '推荐阅读',
                    'jingping': '精品推荐',
                    'redian': '热点资讯',
                    'zixun': '资讯',
                    'cgc': '常规彩',
                    'jc': '竞彩',
                    'gpc': '高频彩',
                    '11x5': '11选5',
                    'k3': '快3',
                    'kuaisan': '快3',
                    'jc': '竞彩'
                },
                largeLotTags: {
                    '11x5': '11x5',
                    'k3': 'k3',
                    'jczq': 'jc',
                    'jclq': 'jc',
                    'ssq': 'cgc',
                    'dlt': 'cgc',
                    'pl3': 'cgc',
                    'pl5': 'cgc',
                    'fc3d': 'cgc'
                },
                getTagName: function (tag) {
                    var configs = tagsConfig.tagTitles;
                    var val = configs[tag];
                    if (!!val) {
                        return val;
                    }
                    else {
                        return req.getLotTitle(tag);
                    }
                },
                getLargeTag: function (tag) {
                    var configs = tagsConfig.largeLotTags;
                    for (var k in configs) {
                        if (Number(tag.indexOf(k)) !== -1) {
                            return configs[k];
                        }

                    }
                    return tag;
                },
                dealData: function (data, k) {
                    for (var i = 0; i < data.length; i++) {
                        var name = data[i].name;
                        var fecsindex = name.indexOf(k);
                        data[i].name = name.substring(0, fecsindex);
                    }
                    return data;
                }
            };
            // 处理11x5\k3和常规彩
            var fecsnewscz = {
                getNews: function (type, cateType, cateName, sort, page, size, sucFn, errFn) {
                    var param = {
                        action: 100010,
                        Type: type,
                        cateType: cateType,
                        cateName: cateName,
                        sort: sort,
                        page: page,
                        size: size
                    };
                    var url = '/api/data';
                    req.requests.post(url, param, true, function (json) {
                        if ('success' === json.Error) {
                            var v = json.Value;
                            sucFn(v);
                        }
                        else {
                        }
                    }, function (data) {
                        if (typeof errFn !== 'undefined' && typeof errFn === 'function') {
                            errFn(data);
                        }

                    });
                },
                data11x5: [],
                datak3: [],
                // 11x5、k3类的彩种
                dealDataVague: function (v, cateType) {
                    // v：接口返回的原始数据
                    // cateType:为要遍历的标签此为11x5、k3类的彩种
                    var objs = {};
                    if (v.length > 0) {
                        for (var i = 0; i < v.length; i++) {
                            var cate = v[i].catename;
                            for (var j = 0; j < cate.length; j++) {
                                if (cateType.length > 0) {
                                    var index11x5 = cate[j].indexOf(cateType[0]);
                                    if (-1 !== Number(index11x5)) {
                                        if (typeof objs[cateType[0]] === 'undefined') {
                                            objs[cateType[0]] = [];
                                        }

                                        objs[cateType[0]].push(v[i]);
                                        break;
                                    }

                                    if (cateType.length > 1) {
                                        var indexk3 = cate[j].indexOf(cateType[1]);
                                        if (-1 !== Number(indexk3)) {
                                            if (typeof objs[cateType[1]] === 'undefined') {
                                                objs[cateType[1]] = [];
                                            }

                                            objs[cateType[1]].push(v[i]);
                                            break;
                                        }
                                    }
                                }

                            }
                        }
                        return objs; // 返回的数据为所需的标签数组如：｛xinwen:{0:[id:''....]}｝
                    }

                }
            };

            this.cnewscomm = cnewscomm;
            this.tagsConfig = tagsConfig;
            this.fecsnewscz = fecsnewscz;
        };

        var newsComm = {
            init: newsCommChi
        };

        newsComm.init(req);

        newsComm.cnewscomm.getNews(10, 10, 'cgc|yuce,11x5|yuce,k3|yuce', 20, 1, 5, function (data) {
            // 格式化填充数据
            dealDataVague(data.yuce);
        }, function () {});

        // 调用资讯接口
        newsComm.cnewscomm.getNews(10, 10, 'zixun,xinwen,jiqiao,zhongjiang', 20, 1, 5, function (data) {
            fillData(data);
        }, function () {});

        function fillData(data) {
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    if ('yuce' === String(i)) {
                        dealDataVague(data[i]);
                    }
                    else {
                        fillHtml(data[i], 'home_' + i);
                    }
                }

            }
        }

        function dealDataVague(data) {
            var type = ['11x5', 'k3', 'cgc'];
            var homenews = {};
            if (typeof homenews.yuceList[type[0]] === 'undefined') {
                homenews.yuceList[type[0]] = [];
            }

            if (typeof homenews.yuceList[type[1]] === 'undefined') {
                homenews.yuceList[type[1]] = [];
            }

            if (typeof homenews.yuceList[2] === 'undefined') {
                homenews.yuceList[type[2]] = [];
            }

            for (var i = 0; i < data.length; i++) {
                if (Number(data[i].catename[0].indexOf(type[0])) !== -1) {
                    homenews.yuceList['11x5'].push(data[i]);
                }
                else if (Number(data[i].catename[0].indexOf(type[1])) !== -1) {
                    homenews.yuceList.k3.push(data[i]);
                }
                else {
                    homenews.yuceList.cgc.push(data[i]);
                }
            }
            for (var i in homenews.yuceList) {
                if (homenews.yuceList.hasOwnProperty(i)) {
                    this.fillHtml(homenews.yuceList[i], 'home_' + i);
                }

            }
        }

        // 预测
        var yuceList = {};

        // 预测
        function dealDataVague(data) {
            var type = ['11x5', 'k3', 'cgc'];
            if (typeof yuceList[type[0]] === 'undefined') {
                yuceList[type[0]] = [];
            }

            if (typeof yuceList[type[1]] === 'undefined') {
                yuceList[type[1]] = [];
            }

            if (typeof yuceList[2] === 'undefined') {
                yuceList[type[2]] = [];
            }

            for (var i = 0; i < data.length; i++) {
                if (Number(data[i].catename[0].indexOf(type[0])) !== -1) {
                    yuceList['11x5'].push(data[i]);
                }
                else if (Number(data[i].catename[0].indexOf(type[1])) !== -1) {
                    yuceList.k3.push(data[i]);
                }
                else {
                    yuceList.cgc.push(data[i]);
                }
            }
            for (var i in yuceList) {
                if (yuceList.hasOwnProperty(i)) {
                    fillHtml(yuceList[i], 'home_' + i);
                }

            }
        }

        // 填充数据
        function fillHtml(data, nodeId) {
            var html = '';
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html += '<li class="lists-con borderB">';
                    html += '<a class="block" href="' + globalCurrentDomain + '/'
                      + item.catename[0] + '/' + item.id + '.html" title="' + item.title + '">';
                    html += '<h2 class="ellipsis">' + item.title + '</h2>';
                    if (item.brief.length > 30) {
                        html += '<p class="c666">' + item.brief.substring(0, 30) + '...</p>';
                    }
                    else {
                        html += '<p class="c666">' + item.brief + '</p>';
                    }
                    html += '<div class="list-foot">';
                    // html+='<span class="reads"><em>'+item.views+'</em>&nbsp;阅读</span>';
                    html += '</div>';
                    html += '</a>';
                    html += '</li>';
                }
            }

            // dom操作
            $(element).find('#' + nodeId).html(html);
        }
        var redianList = [];
        var param = {
            action: 100010,
            Type: 10,
            cateType: 10,
            cateName: 'redian',
            sort: 20,
            page: 1,
            size: 5
        };
        var url = '/api/data';
        // 上下轮播
        req.requests.post(url, param, false, function (json) {
            if ('success' === json.Error) {
                var redianList = json.Value;
                fillReDian(redianList);
            }
            else {
                var fecsIsEmpty = utils.utils.IsEmpty;
                fecsIsEmpty();
            }
        }, function () {
            // errFn();
        });

        function fillReDian(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<a class="swiper-slide block swiper-slide-duplicate white-space" href="https://m.190cai.com/zixun/' + data[i].id + '.html" title="' + data[i].title + '" data-swiper-slide-index="0" style="height: 23px;"><p class="fl">' + data[i].title + '</p></a>';
            }
            $(element).find('#scroll_content').html(html);
            score();
        }

        function score() {
            var scrollArea = $(element).find('#scroll_content')[0];
            var li = scrollArea.getElementsByTagName('a');
            if (li.length < 2) {
                $(element).find(scrollArea).addClass('rem06');
            }
            else {
                $(element).find(scrollArea).addClass('rem06');
                // 滚动
                var liHeight = li[0].offsetHeight; // 单行滚动的高度
                var speed = 20; // 滚动的速度
                var timer;
                var delay = 2000; // 滚动的间隔
                scrollArea.scrollTop = 0;
                scrollArea.innerHTML += scrollArea.innerHTML;
                function startScroll() {
                    timer = setInterval(scrollUp, speed);
                    scrollArea.scrollTop++;
                }
                function scrollUp() {
                    if (scrollArea.scrollTop % liHeight === 0) {
                        clearInterval(timer);
                        setTimeout(startScroll, delay);
                    }
                    else {
                        if (scrollArea.scrollTop >= scrollArea.scrollHeight / 2 - 3) {
                            scrollArea.scrollTop = 0;
                        }

                        scrollArea.scrollTop++;
                    }
                }
                setTimeout(startScroll, delay);
            }
        }

    };

    return customElement;
});
