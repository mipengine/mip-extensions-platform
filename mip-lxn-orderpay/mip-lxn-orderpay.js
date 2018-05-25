/**
 * @file mip-lxn-orderpay 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
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
            var str = 'px!important; height: 100% !important;';
            a.Html.setAttribute('style', 'font-size:' + a.widthProportion() * 100 + str);

        };

        a.changePage();

        setInterval(a.changePage, 1000);
    }
    // 全局时间格式化输出     new Date().format('yyyy-MM-dd hh:mm:ss')

    // 时间格式化

    function formate(date, format) {
        var args = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (var i in args) {
            if (args.hasOwnProperty(i)) {
                var n = args[i];
                if (new RegExp('(' + i + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length));
                }
            }

        }
        return format;
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        $('body').css({
            height: '100% !important'
        });

        // 搬家时间
        var moveTime = ele.querySelector('#move-time');
        // 搬出地址
        var moveOut = ele.querySelector('#move-out');
        // 搬出电梯
        var outDianti = ele.querySelector('#out-dianti');
        // 车型
        var carType = ele.querySelector('#car-type');
        // 搬入地址
        var moveIn = ele.querySelector('#move-in');
        // 搬入电梯
        var inDianti = ele.querySelector('#in-dianti');

        var pilllist = ele.querySelector('#pilllist');
        var orderMsg = localStorage.getItem('ordermsg');

        if (orderMsg !== null) {
            orderMsg = JSON.parse(orderMsg);
            // 账单数据
            var pilllistData = orderMsg.billList;
            // 账单html
            var html = '';

            // 时间赋值
            moveTime.innerHTML = formate(new Date(orderMsg.TransTime), 'MM月dd日- hh:mm');
            // 搬家地址赋值
            orderMsg.poiList.forEach(function (item) {
                if (item.deliverType === 1) {
                    moveOut.innerHTML = item.deliverAddress;
                }
                else {
                    moveIn.innerHTML = item.deliverAddress;
                }
            });
            // 搬出电梯
            if (Number(orderMsg.start_stairs_num.code) === 0) {
                outDianti.innerHTML = '有电梯';
            }
            else {
                outDianti.innerHTML = '无电梯';
            }
            // 搬入电梯
            if (Number(orderMsg.end_stairs_num.code) === 0) {
                inDianti.innerHTML = '有电梯';
            }
            else {
                inDianti.innerHTML = '无电梯';
            }

            // 车型
            switch (orderMsg.CarType) {
                case 3:
                    carType.innerHTML = '小面';
                    break;
                case 2:
                    carType.innerHTML = '金杯';
                    break;
                case 20:
                    carType.innerHTML = '箱货';
                    break;
                default:
                    break;
            }
            // 详情列表赋值
            for (var i = 0; i < pilllistData.length; i++) {
                if (pilllistData[i].title === '合计') {
                    html += '<li><span>' + pilllistData[i].title
                        + '</span><span class="total right">'
                        + pilllistData[i].content
                        + '</span></li>';
                }
                else {
                    html += '<li><span>' + pilllistData[i].title
                        + '</span><span class="right">'
                        + pilllistData[i].content
                        + '</span></li>';
                }
            }

            // 订单详情
            pilllist.innerHTML = html;
        }

        var surePay = ele.querySelector('#sure-pay');
        surePay.addEventListener('click', function () {
            // console.log('点击');
            // sessionid KEY
            var keys = 'mip-login-xzh:sessionId://www.lanxiniu.com/Baidu/back';
            var sessionid = localStorage.getItem(keys);
            var ordername = orderMsg.OrderNum;
            //   提交参数
            var PARAMS = {};
            PARAMS.token = sessionid;
            PARAMS.orderNum = ordername;
            //   创建表单提交
            var temp = document.createElement('form');
            temp.action = 'https://www.lanxiniu.com/Baidu/pay';
            temp.method = 'post';
            temp.style.display = 'none';

            for (var x in PARAMS) {
                if (PARAMS.hasOwnProperty(x)) {
                    var opt = document.createElement('textarea');
                    opt.name = x;
                    opt.value = PARAMS[x];
                    temp.appendChild(opt);
                }

            }

            document.body.appendChild(temp);
            temp.submit();

        }, false);

    };
    return customElement;
});
