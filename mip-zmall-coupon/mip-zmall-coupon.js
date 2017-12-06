/**
 * @file mip-zol-draw 组件
 * @author viewJY
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

    // 授权登录链接
    var LOGIN_URL = '//cashier.zol.com/paygate/baidu/oauth?callbackurl=';

    // 请求频次控制开关
    var switchs = false;

    // 判断element是否存在
    var single = (function () {

        var instance = null;

        return function (selector) {
            if (!instance) {
                instance = document.querySelector(selector);
            }
            return instance;
        };
    })();

    function init() {

        var self = this;
        var url = self.getAttribute('data-url');

        if (url === '' || url === null) {
            return;
        }

        var params = urlParameter();
        var merchantId = params.merchantId ? params.merchantId : '';
        var storeId = params.storeId ? params.storeId : '';
        var userId = window.ZOL_USER_INFO.sid;
        var body = document.querySelector('body');

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'success_jsonpCallback',
            data: {
                merchantId: merchantId,
                userId: userId,
                storeId: storeId
            },
            success: function (res) {

                var r = (typeof res === 'string') ? JSON.parse(res) : res;

                if (r.flag === 1) {
                    switchs = true;
                    var data = createObj(r);
                    var dom = createDom(data);
                    appendEle.call(self, dom);
                    appendBg.call(self, dom);
                }
                else {
                    switchs = false;
                    toast(res.msg);

                    body.classList.remove('over');
                }
            },
            error: function (err) {
                switchs = false;
                toast('数据请求失败');

                body.classList.remove('over');
            }
        });
    }

    function show() {
        var box = document.querySelector('.store-discount');
        var cover = document.querySelector('.cover-mask');
        if (box) {
            box.classList.add('store-discount__show');
            cover.classList.add('store-discount__show');
        }
        return;
    }

    function urlParameter() {

        var url = location.search;
        var theRequest = {};

        if (url.indexOf('?') !== -1) {
            var str = url.substr(1);
            var strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
            }
        }
        return theRequest;
    }

    function createObj(res) {

        if (res === undefined || res === '') {
            return;
        }

        var obj = null;
        var mapUrl = '//api.map.baidu.com/marker?location='
             + res.y + ',' + res.x
             + '&title=' + res.title
             + '&content=' + res.address
             + '&output=html&autoOpen=true/vt=map';

        obj = {
            cardNumber: res.cardNumber || '',
            cardQcodeUrl: res.cardQcodeUrl || '',
            content: res.content || '',
            couponList: res.couponList || [],
            address: res.address ? mapUrl : ''
        };

        return obj;
    }

    function createDom(data) {

        var str = null;
        var code = couponCode(data);
        var gift = couponGift(data);
        var value = couponValue(data);
        var lookAdd = couponAdd(data);

        str = '<div class="store-discount" id="js_dialog">'
            + '<div class="store-discount__hd">到店优惠领取成功</div>'
            + '<div class="store-discount__content">'
            + code
            + gift
            + value
            + '<div class="store-discount__btns flex">'
            + '<a href="#" class="btns-save">保存截图</a>'
            + lookAdd
            + '</div>'
            + '<ul class="store-discount__tips">'
            + '<li>截图保存此页面，到店出示，享受专属优惠，更有贴膜、洗机等服务等待您的光临</li>'
            + '<li>优惠详细使用规则请到店咨询商家。</li>'
            + '</ul>'
            + '</div>'
            + '<div class="store-discount__closebtn"></div>'
            + '</div>';

        return str;
    }

    function couponCode(obj) {

        if (obj === undefined) {
            return;
        }

        var codeStr = '<div class="coupon-code">';
        if (obj.cardNumber !== '') {
            codeStr += '<p>百度专属优惠码：' + obj.cardNumber + '</p>';
        }
        if (obj.cardQcodeUrl !== '') {
            codeStr += '<mip-img src="' + obj.cardQcodeUrl + '" class="pic">';
        }
        codeStr += '</div>';

        return codeStr;
    }

    function couponGift(obj) {

        if (obj === undefined) {
            return;
        }

        var giftStr = '<div class="coupon-gift">';
        if (obj.content !== '') {
            giftStr += '<label>入门礼</label>' + obj.content;
        }
        giftStr += '</div>';

        return giftStr;
    }

    function couponValue(obj) {

        if (obj === undefined) {
            return;
        }

        var valStr = '<div class="coupon-value">';
        if (obj.couponList !== '' && obj.couponList.length > 0) {
            for (var i = 0; i < obj.couponList.length; i++) {
                var coupon = obj.couponList[i];
                if (coupon.conditions === 0) {
                    valStr += '<label><span>' + coupon.couponPrice + '</span></label>';
                }
                else {
                    valStr += '<label><span>满' + coupon.conditionsDetail + '减' + coupon.couponPrice + '</span></label>';
                }
            }
        }
        valStr += '</div>';

        return valStr;
    }

    function couponAdd(obj) {

        if (obj === undefined) {
            return;
        }

        var addStr = '';
        if (obj.address !== '') {
            addStr = '<a href="' + obj.address + '" class="btns-check">查看路线</a>';
        }

        return addStr;
    }

    function appendEle(domStr) {

        if (domStr === undefined) {
            return;
        }

        var self = this;
        var box = self.querySelector('.draw_box');
        append(box, domStr);

        var btn = self.querySelector('.store-discount__closebtn');
        var pic = self.querySelector('.btns-save');

        btn.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            var that = this;
            that.parentNode.classList.add('store-discount__hide');
            that.parentNode.classList.remove('store-discount__show');
            self.querySelector('.cover-mask').classList.add('store-discount__hide');
            self.querySelector('.cover-mask').classList.remove('store-discount__show');

            var body = document.querySelector('body');

            body.classList.remove('over');
        }, false);

        pic.addEventListener('click', function () {
            toast('请同时按下音量下键和Home键');
        });
    }

    /**
     * 提示框
     *
     * @param  {string} str 提示信息
     */
    function toast(str) {

        if (document.getElementById('_j_miptoast')) {
            return;
        }

        var toast = document.createElement('div');
        toast.id = '_j_miptoast';
        toast.className = 'mip-zol-toast';
        toast.innerHTML = '<span>' + str + '</span>';
        document.body.appendChild(toast);
        document.body.style.pointerEvents = 'none';
        setTimeout(function () {
            toast.parentNode.removeChild(toast);
            document.body.style.pointerEvents = 'all';
        }, 800);
    }

    function appendBg() {
        var self = this;
        var str = '<div class="cover-mask cover-mask__visible"></div>';
        var box = self.querySelector('.draw_box');
        append(box, str);
    }

    function html(element, string) {
        if (typeof string === 'string') {
            element.innerHTML = string;
            return string;
        }
        return element.innerHTML;
    }

    function create(htmls) {
        var div = document.createElement('tbody');
        var doc = document.createDocumentFragment();
        html(div, htmls);

        var childrens = children(div);
        for (var i = 0, j = childrens.length; i < j; i++) {
            append(doc, childrens[i]);
        }

        return doc;
    }

    function children(element, tag) {

        if (typeof tag === 'boolean' && tag) {
            return element.childNodes;
        }

        var result = [];
        if (typeof tag === 'string') {
            for (var i = 0, j = element.childNodes.length; i < j; i++) {
                if (element.childNodes[i].nodeName.toLowerCase() === tag.toLowerCase()) {
                    result.push(element.childNodes[i]);
                }
            }
            return result;
        }

        for (var k in element.childNodes) {
            if (element.childNodes[k].nodeType === 1) {
                result.push(element.childNodes[k]);
            }
        }

        return result;
    }

    function append(element, html) {

        if (typeof html === 'string') {
            html = create(html);
        }
        element.appendChild(html);

        return html;
    }

    customElement.prototype.build = function () {

        var self = this;
        var ele = self.element;
        var entry = ele.querySelector('._js_coupon_btn');

        if (!entry) {
            return;
        }

        entry.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var userId = '';
            if (window.ZOL_USER_INFO && window.ZOL_USER_INFO.sid) {
                userId = window.ZOL_USER_INFO.sid;
            }
            if (userId === '') {
                var href = encodeURIComponent(location.href);
                window.location.href = LOGIN_URL + href;
                return;
            }

            if (single('.store-discount') === null) {
                if (!switchs) {
                    init.call(ele);
                }
            }
            else {
                show.call(ele);
            }

            var body = document.querySelector('body');

            body.classList.add('over');
        }, false);
    };

    return customElement;
});
