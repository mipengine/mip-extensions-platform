/**
 * @file mip-tiebaobei-det-fixcall 组件
 * @author weiss
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var urlHost = window.location.host;
        var ele = $(this.element);
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
        var E270 = function () {
        };
        var phoneClick = function (plateName, isSdqy) {
            // 弹出引导层或手机号输入框
            if (isSdqy) {
                ele.find('#dialBox').show();
                ele.find('#dialBox .inp input').focus();
            }
            else {
                var telLocal = window.localStorage.getItem('localTel');
                if (telLocal && (telLocal !== 'undefined')) {
                    newCall(telLocal);
                }
                else {
                    ele.find('#dialBox').show();
                    ele.find('#dialBox .inp input').focus();
                }
            }
        };
        var E280 = function (tel, uniqueSymbol) {
        };
        var phoneSuccClick = function (uniqueSymbol, buttonName) {
        };
        var callCityManager = function (phone400, userPhone, eqId, equipmentCityId, ise280) {
            // 呼叫城市经理
            var timestamp = new Date().getTime();
            // var uniqueSymbol = hex_md5(userPhone + '_' + timestamp + '_' + getRandomNum(100, 999));
            var uniqueSymbol = getRandomNum(10000, 99999) + '$' + getRandomNum(10000, 99999);
            // var workMobile = ele.find('#workMobile').val();
            ele.find('#checkUserPhone').val(userPhone);
            var hotline = getQueryString('hotlineShare') ? true : '';
            var currentUserId = getQueryString('currentUserId') ? getQueryString('currentUserId') : '';
            var getcurrentPhone = getQueryString('currentUserWorkPhone');
            var currentUserWorkPhone = getcurrentPhone ? getcurrentPhone : '';
            var datass = '?customerNumber=' + userPhone + '&eqId=' + eqId;
            datass += '&pageFromType=E';
            datass += '&uniqueSymbol=' + uniqueSymbol;
            datass += '&channel=6';
            datass += '&hotlineShare=' + hotline;
            datass += '&currentUserId=' + currentUserId;
            datass += '&currentUserWorkPhone=' + currentUserWorkPhone;
            datass += '&code=';
            datass += '&distinctId=' + getRandomNum(1000, 99999999);
            fetchJsonp(apiUrl + 'api/app/callCenter' + datass, {
                jsonpCallback: 'callback'
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                ele.find('.srlj-wrap-con .h-tips').html('');
                ele.find('.srlj-wrap-con .error-btn').hide();
                ele.find('#checkYzm').val('');
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
                    // ele.find('#callOutPic').find('.co_t').text('验证失败，请在24小时后再发起通话');
                    ele.find('#callOutPic').show();
                }
                else {
                    // ele.find('#callOutPic .co_p img').attr('src', dialFailurePicUrl);
                    ele.find('#callOutPic').find('.co_tt').text('');
                    ele.find('#callOutPic').find('.co_t').text('信号不太好, 请再试一下吧');
                    ele.find('#callOutPic').show();
                }
            }).catch(function (ex) {
               // console.log('parsing failed', ex);
            });
        };
        var newCall = function (tel) {
            var tel = tel ? tel : ele.find('#userPhone').val();
            if (!tel || !tel.match(/^1+\d{10}$/)) {
                alert('请检查手机号是否正确输入');
                return;
            }
            ele.find('.zxgj-wrap-con .m-bd').show();
            try {
                window.localStorage.setItem('localTel', tel);
            }
            catch (e) {
            }
            ele.find('#dialBox').hide();
            ele.find('#userPhone').val(tel);
            ele.find('#telLocal').text(tel);
            ele.find('.telInput').css('display', 'none');
            ele.find('.telCall').css('display', 'block');
            ele.find('#callOutPic .co_tt').html('您的手机 <span>' + tel + '</span> 将接到');
            ele.find('#callOutPic .co_t').text('铁甲的来电请注意接听');
        };
        var telLocal = window.localStorage.getItem('localTel');
        if (telLocal && (telLocal !== 'undefined')) {
            ele.find('#userPhone').val(telLocal);
            ele.find('#telLocal').text(telLocal);
            // ele.find('#telInp').val(telLocal);
            ele.find('.telInput').css('display', 'none');
            ele.find('.telCall').css('display', 'block');
        }
        else {
            if (baseLoginCustomerTel !== '') {
                try {
                    window.localStorage.setItem('localTel', baseLoginCustomerTel);
                } catch (e) {
                }
                telLocal = window.localStorage.getItem('localTel');
                ele.find('#telLocal').text(telLocal);
                ele.find('#userPhone').val(telLocal);
                ele.find('.telInput').css('display', 'none');
                ele.find('.telCall').css('display', 'block');
            }
            else {
                ele.find('.telInput').css('display', 'block');
            }
        }
        // 绑定事件，其它元素可通过 on='xxx' 触发
        this.addEventAction('telBtn_event', function (event/* 对应的事件对象 */, str /* 事件参数 */) {
            phoneClick();
        });
        ele.find('#nativ_show').on('click', '.telInput, .telCall', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.find('#dialBox').show();
            ele.find('#dialBox .inp input').focus();
            // E270();
        });
        ele.find('#nativ_show').on('click', '.telNow', function (e) {
            telLocal = window.localStorage.getItem('localTel');
            if (telLocal) {
                newCall(telLocal);
                // E270();
            }
            else {
                e.preventDefault();
                e.stopPropagation();
                ele.find('#dialBox').show();
                ele.find('#dialBox .inp input').focus();
                // E270();
            }
        });
        ele.find('#dialBox .Jclose').on('click', function (e) {
            e.stopPropagation();
            ele.find('#dialBox').hide();
            var uniqueSymbol = getRandomNum(10000, 99999) + '$' + getRandomNum(1000, 99999999);
            phoneSuccClick(uniqueSymbol, '关闭');
        });
        // 马上咨询 end
        ele.find('.zxgj-wrap-con .cancel').click(function () {
            ele.find('.zxgj-wrap-con .m-bd').hide();
            phoneSuccClick(getRandomNum(10000, 99999) + '$' + getRandomNum(1000, 99999999), '取消');
        });
        ele.find('.zxgj-wrap-con .ok').click(function () {
            ele.find('#callOutPic').show();
            phoneSuccClick(getRandomNum(10000, 99999) + '$' + getRandomNum(1000, 99999999), '咨询管家');
            callCityManager(basePhone, window.localStorage.getItem('localTel'), baseEqid, baseEquipmentCityId);
            ele.find('.zxgj-wrap-con .m-bd').hide();
        });
        // 清空输入框
        ele.find('#dialBox .clear').on('click', function () {
            ele.find(this).closest('div').find('input').focus().val('');
        });
        // 气泡
        // 设备状态1.待审核 2.审核通过 3.审核未通过4.已售 5下架',tradedPic
        if (parseInt(baseEquipmentStatus, 10) !== 2) {
        // if(ele.find('.tradedPic img').length>0 && ele.find('.tradedPic img').attr('src').indexOf('sold.png')!=-1){
            ele.find('.fix-tel, .pop-tip-mode').css('display', 'none');
            ele.find('#connactManagePhone, #connactSellerPhone, .fixedBottom').css('display', 'none');
            ele.find('#detailContent').css('bottom', 0);
            ele.find('#detailContent').css('paddingBottom', 0);
        }
        else {
            setTimeout(function () {
                ele.find('.pop-tip-mode').removeClass('hide');
            }, 10000);
            setTimeout(function () {
                ele.find('.pop-tip-mode').addClass('hide');
            }, 15000);
        }
        ele.find('.pop-tip-mode img').attr('src', ele.find('#galleryBox a').eq(1).find('img').attr('src'));
        // 点击输入手机号弹层
        ele.find('#dial .dial1, .dial2').on('click', function () {
            ele.find(this).hide().parent().hide();
        });
        ele.find('#callOutPic .co_c').on('click', function () {
            ele.find('#callOutPic').hide();
        });
        ele.find('#dialBox .conBox').on('click', function (e) {
            e.stopPropagation();
        });
        // 呼叫
        ele.find('.dialBtn').on('click', function (e) {
            var tel = ele.find('#userPhone').val().trim();
            if (!tel || !tel.match(/^1+\d{10}$/)) {
                alert('请检查手机号是否正确输入');
                return;
            }
            try {
                window.localStorage.setItem('localTel', tel);
            }
            catch (e) {
            }
            ele.find('#userPhone').val(tel);
            ele.find('#telLocal').text(tel);
            ele.find('.telInput').css('display', 'none');
            ele.find('.telCall').css('display', 'block');
            ele.find('#callOutPic .co_tt').html('您的手机 <span>' + tel + '</span> 将接到');
            ele.find('#callOutPic .co_t').text('铁甲的来电请注意接听');
            ele.find('#callOutPic').show();
            ele.find('#dialBox').hide();
            phoneSuccClick(getRandomNum(10000, 99999) + '$' + getRandomNum(1000, 99999999), '免费通话');
            callCityManager(basePhone, tel, baseEqid, baseEquipmentCityId);
        });
    };
    return customElement;
});
