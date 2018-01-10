/**
 * @file mip-ychlyxgs-adddata 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var pageInfo = {
            phpUrl: $(ele).find('.f-information').attr('data-phpurl')
        };
        var province = '';
        var city = '';
        var remotIpInfo = {
            ret: 1,
            start: -1,
            end: -1,
            country: '\u4e2d\u56fd',
            province: '\u6e56\u5317',
            city: '\u6b66\u6c49',
            district: '',
            isp: '',
            type: '',
            desc: ''
        };
        fetchJsonp('https://ca.6071.com/mip/index/c/' + pageInfo.phpUrl, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var equipment;
            var recomdCityCont;
            var ejectCityCont;
            var openAndroidEject = data.openAndroidEject;
            var openIosEject = data.openIosEject;
            var allData;
            if (data.platformOpend === true) {
                if (platform.isIos()) { // ios
                    equipment = 'ios';
                }
                else { // 安卓
                    equipment = 'android';
                }
            }
            else {
                equipment = 'default';
            }
            province = remotIpInfo.province;
            city = remotIpInfo.city;
            var recomdCity = data.recomdCity;
            if (data.recomdCityOpen === true) {
                if ($.inArray(city, recomdCity) !== -1) { // 在指定城市
                    recomdCityCont = 'in';
                }
                else {
                    recomdCityCont = 'out';
                }
            }
            else {
                recomdCityCont = 'default';
            }
            if (typeof(data.recomddata[equipment + '_' + recomdCityCont]) === 'undefined') {
                allData = [];
            } else {
                allData = data.recomddata[equipment + '_' + recomdCityCont];
            }
            var i = 0;
            for (i = 0; i < allData.length; i++) {
                $('.' + allData[i].className).html(allData[i].contHtml);
            }
            var ejectCity = data.ejectCity;
            if (data.EjectCityOpen === true) {
                if ($.inArray(city, ejectCity) !== -1) { // 在指定城市
                    ejectCityCont = 'in';
                }
                else {
                    ejectCityCont = 'out';
                }
            }
            else {
                ejectCityCont = 'default';
            }
            allData = data.eject[equipment + '_' + ejectCityCont];
            if (typeof openAndroidEject === 'undefined') {
                openAndroidEject = true;
            }
            if (typeof openIosEject === 'undefined') {
                openIosEject = true;
            }
            if (platform.isIos()) { // ios
                if (openIosEject === true) {
                    clickFunction(allData);
                }
            }
			else { // 安卓
                if (openAndroidEject === true) {
                    clickFunction(allData);
                }
            }
        }, function (error) {
            console.error(error);
        }).catch(function (evt) {
            console.error(evt);
        });
        function clickFunction(allData) {
            $(ele).find('.f-eject-btn').click(function () {
                var btnFlag = $(this).attr('data-flag');
                if (typeof (btnFlag) !== 'undefined' && typeof (allData[btnFlag]) !== 'undefined') {
                    $(ele).find('.f-eject-cont .m-hideshow-top').html(allData[btnFlag]);
                }
                else {
                    $(ele).find('.f-eject-cont .m-hideshow-top').html('');
                }
                setTimeLoad();
            });
            $('.m-close-btn,.m-black-bg').click(function () {
                $(ele).find('.f-eject-cont').hide();
            });
        }
        function setTimeLoad() {
            var setTimer = setTimeout(function () {
                $(ele).find('.f-eject-cont').show();
            }, 100);
        }
    };
    return customElement;
});
