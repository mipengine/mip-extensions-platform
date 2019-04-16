/**
 * @file mip-qqtn-dnumber
 * 给下载按钮添加onclick并记录点击下载次数
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var SoftID = $(ele).find('.f-information').attr('data-id');
        var SoftLinkID = $(ele).find('.f-information').attr('data-id');
        var downclick = 'softCount(' + SoftID + ',' + SoftID + ')';
        $(ele).find('#address').attr('data-number', downclick);
        var httpreqUest = true;
        function sendreqUest(url, Temp, ref, tb) {
            // 初始化、指定处理函数、发送请求的函数
            httpreqUest = false;
            // document.domain = "yxdown.com";
            // 开始初始化XMLHttpRequest对象
            if (window.XMLHttpRequest) {
            // Mozilla 浏览器
                httpreqUest = new XMLHttpRequest();
                if (httpreqUest.overrideMimeType) {
                // 设置MiME类别
                    httpreqUest.overrideMimeType('text/xml');
                }
            } else if (window.ActiveXObject) {
            // IE浏览器
                try {
                    httpreqUest = new ActiveXObject('Msxml2.XMLHTTP');
                }
                catch (e) {
                    try {
                        httpreqUest = new ActiveXObject('Microsoft.XMLHTTP');
                    }
                    catch (e) {};
                }
            }
            if (!httpreqUest) {
            // 异常，创建对象实例失败
            // window.alert('不能创建XMLHttpRequest对象实例.');
                return false;
            }
            httpreqUest.onreadystatechange = ref;
            // 确定发送请求的方式和URL以及是否同步执行下段代码
            httpreqUest.open('Post', url, tb);
            httpreqUest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpreqUest.send(Temp);
        }
        $(ele).find('#address').click(function () {
        // 统计点击次数
            var Url = 'Action=6&SoftLinkID=' + escape(SoftLinkID) + '&SoftID=' + escape(SoftID);
            var ref = function () {
            // 处理返回数据
                if (httpreqUest.readyState === 4) {
                // 判断对象状态
                    if (httpreqUest.status === 200) {
                    // 信息已经成功返回，开始处理信息
                        var requestText = httpreqUest.responseText;
                        // alert(requestText)
                    } else {
                        // var requestText=httprequest.responseText;
                        // alert(requestText)
                    }
                }
            };
            sendreqUest('https://m.qqtn.com/ajax.asp', Url, ref, true);
        });
    };
    return customElement;
});



