/**
 * @file mip-tiebaobei-zhuanticall 组件
 * @author weiss
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var urlHost = window.location.host;
        var ele = $(this.element);
        var par = ele.closest('.lightbox-wrap');
        var basePhone = ele.find('#nativ_show').attr('data-tel');
        var baseEqid = ele.find('#nativ_show').attr('data-eqid');
        var baseEquipmentStatus = ele.find('#nativ_show').attr('data-equipmentStatus');
        var baseEquipmentCityId = ele.find('#nativ_show').attr('data-equipmentCityId');
        var baseLoginCustomerTel = ele.find('#nativ_show').attr('data-loginCustomerTel');
        var apiUrl = '';
        if (urlHost === 'm.tiebaobei.com' || (urlHost === 'h5.tiebaobei.com')) {
            apiUrl = 'https://api2.tiebaobei.com/';
        }
        else if (urlHost === 'm.test.tiebaobei.com' || (urlHost === 'h5.test.tiebaobei.com')) {
            apiUrl = 'http://api2.test.tiebaobei.com/';
        }
        else {
            apiUrl = 'http://api2.test.tiebaobei.com/';
        }
        var fetchJsonp = require('fetch-jsonp');
        var getRandomNum = function (min, max) {
            var range = max - min;
            var rand = Math.random();
            return (min + Math.round(rand * range));
        };
        var getQueryString = function (name, b) {
            var url = decodeURIComponent(b);
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            if (url.split('?')[1]) {
                var r = url.split('?')[1].match(reg);
                if (r != null) {
                    return unescape(r[2]);
                }
            }
            return null;
        };
        ele.find('.fix-free-tel').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.find('#dialBox').show();
            ele.find('#dialBox .inp input').focus();
        });
        ele.find('#dialBox .Jclose').on('click', function (e) {
            e.stopPropagation();
            ele.find('#dialBox').hide();
        });
        ele.find('#dialBox .clear').on('click', function () {
            ele.find(this).closest('div').find('input').focus().val('');
        });
        // 拨打电话提交按钮
        ele.find('.dialBtn').on('click', function (e) {
            // e.stopPropagation();
            var ths = $(this);
            var mobileReg = /^1+\d{10}$/;
            if (mobileReg.test(ele.find('#userPhone').val())) {
                ele.find('#callOutPic .co_tt').html('您的手机 <span>' + ele.find('#userPhone').val() + '</span> 将接到');
                ele.find('#callOutPic .co_t').text('铁甲的来电请注意接听');
                ele.find('#callOutPic').show();
                ele.find('#dialBox').hide();
                $('#indexContent').attr('style', '');
                var uniqueSymbol = getRandomNum(10000, 99999) + '$' + getRandomNum(10000, 99999999);
                // scFnE28('免费通话');
                var datass = '?customerNumber=' + ele.find('#userPhone').val();
                datass += '&pageFromType=L';
                datass += '&uniqueSymbol=' +  uniqueSymbol;
                datass += '&channel:6';
                datass += '&hotlineShare=""';
                datass += '&currentUserId=""';
                datass += '&currentUserWorkPhone=""';
                datass += '&code=""';
                datass += '&distinctId=' + getRandomNum(10000, 99999999);
                fetchJsonp(apiUrl + 'api/app/callCenter' + datass, {
                    jsonpCallback: 'callback'
                }).then(function (response) {
                    return response.json();
                }).then(function (result) {
                    if (result.ret === 0) {
                        ele.find('#dialBox').hide();
                    }
                    else if (result.ret === 1106) {
                        ele.find('#dialBox').hide();
                        ele.find('.srlj-wrap-con').show();
                        ele.find('#checkYzm').focus();
                        ele.find('#callOutPic').hide();
                    }
                    else if (result.ret === 1104) {
                        ele.find('#callOutPic').find('.co_tt').text('');
                        ele.find('#callOutPic').find('.co_t').text('验证失败，请在24小时后再发起通话');
                        ele.find('#callOutPic').show();
                    }
                    else {
                        ele.find('#callOutPic').find('.co_tt').text('');
                        ele.find('#callOutPic').find('.co_t').text('信号不太好, 请再试一下吧');
                        ele.find('#callOutPic').show();
                    }
                }).catch(function (ex) {
                    // console.log('parsing failed', ex);
                });
            }
            else {
                alert('手机号不合法');
                return false;
            }
        });
    };
    return customElement;
});
