/**
 * @file mip-tiebaobei-listfixcall 组件
 * @author weiss
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        // var urlHost = window.location.host;
        var ele = $(this.element);
        var par = ele.closest('.lightbox-wrap');
        // var apiUrl = '';
        // if (urlHost === 'm.tiebaobei.com' || (urlHost === 'h5.tiebaobei.com')) {
        //     apiUrl = 'https://api2.tiebaobei.com/';
        // }
        // else if (urlHost === 'm.test.tiebaobei.com' || (urlHost === 'h5.test.tiebaobei.com')) {
        //     apiUrl = 'http://api2.test.tiebaobei.com/';
        // }
        // else {
        //     apiUrl = 'http://api2.test.tiebaobei.com/';
        // }
        var script = this.element.querySelector('script[type="application/json"]');
        var textContent = JSON.parse(script.textContent);
        var apiUrl = textContent.apiUrl;
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
            par.find('#dialBox .Jclose,.dialBtn').addClass('isFreeTel');
            par.find('#dialBox').show();
            par.find('#dialBox .inp input').focus();
        });
        par.find('#dialBox .Jclose').on('click', function (e) {
            e.stopPropagation();
            par.find('#dialBox').hide();
        });
        par.find('#dialBox .clear').on('click', function () {
            par.find(this).closest('div').find('input').focus().val('');
        });
        par.find('#callOutPic .co_c').on('click', function () {
            par.find('#callOutPic').hide();
        });
        this.addEventAction('telBtn_event', function (event/* 对应的事件对象 */, str /* 事件参数 */) {
            event.stopPropagation();
            event.preventDefault();
            par.find('#dialBox').show();
            par.find('#dialBox .inp input').focus();
            par.find('#dialBox .Jclose,.dialBtn').removeClass('isFreeTel');
            par.find('.dialBtn').attr({
                'eqid': str
            });
        });
        // 拨打电话提交按钮
        par.find('.dialBtn').on('click', function (e) {
            // e.stopPropagation();
            var ths = $(this);
            var mobileReg = /^1+\d{10}$/;
            if (mobileReg.test(par.find('#userPhone').val())) {
                par.find('#callOutPic .co_tt').html('您的手机 <span>' + par.find('#userPhone').val() + '</span> 将接到');
                par.find('#callOutPic .co_t').text('铁甲的来电请注意接听');
                par.find('#callOutPic').show();
                par.find('#dialBox').hide();
                var uniqueSymbol = getRandomNum(10000, 99999) + '$' + getRandomNum(10000, 99999999);
                var datass = '';
                if (ths.hasClass('isFreeTel')) {
                    datass = '?customerNumber=' + par.find('#userPhone').val();
                    datass += '&pageFromType=L';
                    datass += '&uniqueSymbol=' +  uniqueSymbol;
                    datass += '&channel=61';
                    datass += '&hotlineShare=""';
                    datass += '&currentUserId=""';
                    datass += '&currentUserWorkPhone=""';
                    datass += '&code=""';
                    datass += '&distinctId=' + getRandomNum(10000, 99999999);
                }
                else {
                    datass = '?customerNumber=' + par.find('#userPhone').val();
                    datass = '?eqId=' + ths.attr('eqid');
                    datass += '&pageFromType=L';
                    datass += '&uniqueSymbol=' +  uniqueSymbol;
                    datass += '&channel=61';
                    datass += '&hotlineShare=""';
                    datass += '&currentUserId=""';
                    datass += '&currentUserWorkPhone=""';
                    datass += '&code=""';
                    datass += '&distinctId=' + getRandomNum(10000, 99999999);
                }
                fetchJsonp(apiUrl + 'api/app/callCenter' + datass, {
                    jsonpCallback: 'callback'
                }).then(function (response) {
                    return response.json();
                }).then(function (result) {
                    if (parseInt(result.ret, 10) === 0) {
                        par.find('#dialBox').hide();
                    }
                    else if (parseInt(result.ret, 10) === 1106) {
                        par.find('#dialBox').hide();
                        par.find('.srlj-wrap-con').show();
                        par.find('#checkYzm').focus();
                        par.find('#callOutPic').hide();
                    }
                    else if (parseInt(result.ret, 10) === 1104) {
                        par.find('#callOutPic').find('.co_tt').text('');
                        par.find('#callOutPic').find('.co_t').text('验证失败，请在24小时后再发起通话');
                        par.find('#callOutPic').show();
                    }
                    else {
                        par.find('#callOutPic').find('.co_tt').text('');
                        par.find('#callOutPic').find('.co_t').text('信号不太好, 请再试一下吧');
                        par.find('#callOutPic').show();
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