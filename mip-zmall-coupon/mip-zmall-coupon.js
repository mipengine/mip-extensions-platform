/**
 * @file mip-zol-draw 组件
 * @author viewJY
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 提示框，需自定义样式
     *
     * @param  {string} str 提示信息
     */
    function toast(str) {
        if (this.querySelector('._j_miptoast')) {
            return;
        }
        var toast = document.createElement('div');
        toast.className = '_j_miptoast mip-zol-toast';
        toast.innerHTML = '<span>' + str + '</span>';
        this.appendChild(toast);
        setTimeout(function () {
            toast.parentNode.removeChild(toast);
        }, 800);
    }

    // 授权登录链接
    var LOGIN_URL = '//cashier.zol.com/paygate/baidu/oauth?callbackurl=';

    function init(callback) {

        var self = this;
        var url = self.getAttribute('data-url');

        if (url === '' || url === null) {
            return;
        }

        var merchantId = self.dataset.merchantId ? self.dataset.merchantId : '';
        var storeId = self.dataset.storeId ? self.dataset.storeId : '';
        var userId = window.ZOL_USER_INFO.sid;

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
                    var data = createObj(r);
                    var dom = createDom(data);
                    appendEle.call(self, dom);
                    callback();
                }
                else {
                    toast.call(self, res.msg);
                }
            },
            error: function (err) {
                toast.call(self, '数据请求失败');
            }
        });
    }

    function show() {
        var dataset = this.dataset;
        if (dataset.target && dataset.target !== '') {
            // 因为 iframe 包含页面时， mip-fixed 的元素build的时候会被 挪到 页面底部
            var couponLayer = document.querySelector('mip-fixed[zmall-fixed-id="' + dataset.target + '"]');
            couponLayer.classList.add('mip-zmall-coupon-show');
            couponLayer.addEventListener('touchmove', canselTouchmove);
        }
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

        str = '<div class="mip-zmall-coupon-layer store-discount" id="_js_coupon_layer">'
            + '<div class="store-discount__hd">到店优惠领取成功</div>'
            + '<div class="store-discount__content">'
            + code
            + gift
            + value
            + '<div class="store-discount__btns flex">'
            + '<span id="_js_coupon_save_pic" class="btns-save">保存截图</span>'
            + lookAdd
            + '</div>'
            + '<ul class="store-discount__tips">'
            + '<li>截图保存此页面，到店出示，享受专属优惠，更有贴膜、洗机等服务等待您的光临</li>'
            + '<li>优惠详细使用规则请到店咨询商家。</li>'
            + '</ul>'
            + '</div>'
            + '<div id="_js_coupon_close" class="store-discount__closebtn"></div>'
            + '</div><div class="mip-zmall-coupon-mask"></div>';

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

        var giftStr = '';
        if (obj.content !== '') {
            giftStr += '<div class="coupon-gift"><label>入门礼</label>' + obj.content + '</div>';
        }

        return giftStr;
    }

    function couponValue(obj) {

        if (obj === undefined) {
            return;
        }

        var valStr = '';
        if (obj.couponList !== '' && obj.couponList.length > 0) {
            valStr = '<div class="coupon-value"><div class="coupon-value-inner">';
            for (var i = 0; i < obj.couponList.length; i++) {
                var coupon = obj.couponList[i];
                if (coupon.conditions === 0) {
                    valStr += '<label><span>' + coupon.couponPrice + '</span></label>';
                }
                else {
                    valStr += '<label><span>满' + coupon.conditionsDetail + '减' + coupon.couponPrice + '</span></label>';
                }
            }
            valStr += '</div></div>';
        }

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
        var dataset = this.dataset;
        if (!dataset.target || dataset.target === '') {
            return;
        }

        // 因为 iframe 包含页面时， mip-fixed 的元素build的时候会被 挪到 页面底部
        var couponLayer = document.querySelector('mip-fixed[zmall-fixed-id="' + dataset.target + '"]');
        append(couponLayer, domStr);

        var close = couponLayer.querySelector('#_js_coupon_close');
        var save = couponLayer.querySelector('#_js_coupon_save_pic');

        close.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            couponLayer.classList.remove('mip-zmall-coupon-show');
            couponLayer.removeEventListener('touchmove', canselTouchmove);
        }, false);

        save.addEventListener('click', function () {
            toast.call(couponLayer, '请使用手机截屏功能');
        });

        couponLayer.addEventListener('touchmove', canselTouchmove);
    }

    function canselTouchmove(e) {
        e.preventDefault();
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

    // buil说明：因为有两处在用，且有一处是吸底，所以需要用build
    customElement.prototype.build = function () {

        var self = this;
        var ele = self.element;
        var dataset = ele.dataset;

        // 因为 iframe 包含页面时， mip-fixed 的元素build的时候会被 挪到 页面底部
        var couponLayer = document.querySelector('mip-fixed[zmall-fixed-id="' + dataset.target + '"]');

        // 找到触发优惠券弹层的DOM，因不止一处触发，故而用 document.querySelectorAll 来获取
        var entrys = document.querySelectorAll('div[on="' + dataset.trigger + '"]');
        if (!entrys.length) {
            return;
        }

        // 循环绑定事件
        [].forEach.call(entrys, function (entry, index) {
            entry.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                var userId = '';
                if (window.ZOL_USER_INFO && window.ZOL_USER_INFO.sid) {
                    userId = window.ZOL_USER_INFO.sid;
                }
                if (userId === '') {
                    var href = encodeURIComponent(location.href);
                    window.location.href = LOGIN_URL + href;
                    return;
                }

                var hasCoupon = couponLayer.querySelector('#_js_coupon_layer');
                if (hasCoupon) {
                    show.call(ele);
                }
                else {
                    init.call(ele, function () {
                        couponLayer.classList.add('mip-zmall-coupon-show');
                    });
                }
            }, false);
        });
    };

    return customElement;
});
