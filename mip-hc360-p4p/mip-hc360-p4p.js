/**
 * @file mip-hc360-p4p 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var fetchJsonp = require('fetch-jsonp');
    var $ = require('zepto');
    /**
     * 第一次进入可视区回调，只会执行一次
     */

    function UUID() {
        this.id = this.createUUID();
    }
    UUID.prototype.createUUID = function () {
        var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
        var dc = new Date();
        var t = dc.getTime() - dg.getTime();
        var h = '';
        var tl = UUID.getIntegerBits(t, 0, 31);
        var tm = UUID.getIntegerBits(t, 32, 47);
        var thv = UUID.getIntegerBits(t, 48, 59) + '1';
        var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
        var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
        var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7)
            + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
            + UUID.getIntegerBits(UUID.rand(8191), 0, 7)
            + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
            + UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number is two octets long
        return tl + h + tm + h + thv + h + csar + csl + h + n;
    };
    UUID.getIntegerBits = function (val, start, end) {
        var base16 = UUID.returnBase(val, 16);
        var quadArray = [];
        var quadString = '';
        var i = 0;
        for (i = 0; i < base16.length; i++) {
            quadArray.push(base16.substring(i, i + 1));
        };

        for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
            if (!quadArray[i] || quadArray[i] === '') {
                quadString += '0';
            } else {
                quadString += quadArray[i];
            };

        };

        return quadString;
    };
    UUID.returnBase = function (number, base) {
        var convert = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ];
        if (number < base) {
            var output = convert[number];
        } else {
            var MSD = '' + Math.floor(number / base);
            var LSD = number - MSD * base;
            var output;
            if (MSD >= base) {
                output = this.returnBase(MSD, base) + convert[LSD];
            } else {
                output = convert[MSD] + convert[LSD];
            };
        };
        return output;
    };
    UUID.rand = function (max) {
        return Math.floor(Math.random() * max);
    };

    function sendJsonp(paramsUrl, callback) {
        fetchJsonp(paramsUrl, {
            jsonpCallback: 'jsoncallback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            callback(data);
        }).
        catch(function () {
            return false;
        });
    }

    function getDataString(sendData) {
        var dataString = '';
        for (var i in sendData) {
            dataString += ('&' + i + '=' + sendData[i]);
        };
        return dataString.slice(1);
    }

    function getp4pData(sendData) {
        var self = this;
        var dataString = 'https://s.hc360.com/getmmtlast.cgi?' + getDataString(sendData);
        sendJsonp(dataString, function (data) {
            renderElement.call(self, data);
        });
    }
    /**
     * 数据处理过滤
     * result {Array} 请求的数据
     */

    function renderElement(result) {
        var self = this;
        var searchResultInfo = result.searchResultInfo;
        self.searchResultfoGrayScale = result.searchResultfoGrayScale;
        if (self.element.hasAttribute('quality')) {
            searchResultInfo = searchResultInfo.filter(function (product) {
                if (Number(product.searchResultfoIsRecomHQ) === 1) {
                    return product;
                };
            });
        };
        var numLength = 6;
        if (self.element.hasAttribute('num')) {
            numLength = Number(self.element.getAttribute('num'));
        };
        var dataList = searchResultInfo.slice(0, numLength);
        if (self.element.hasAttribute('fill')) {
            var fillNum = numLength - searchResultInfo.length;
            if (fillNum > 0) {
                var dataString = 'https://s.hc360.com/cgi-bin/getmmtlast.cgi?' + getDataString({
                    w: self.word,
                    sys: 'mobile',
                    bus: 'hcmpcg',
                    ts: 1,
                    e: fillNum
                });
                sendJsonp(dataString, function (data) {
                    var newList = dataList.concat(data.searchResultInfo);
                    setTimeout(function () {
                        templates.render(self.element, newList).then(render.bind(self, newList));
                    }, 1000);
                });
            } else {
                setTimeout(function () {
                    templates.render(self.element, dataList).then(render.bind(self, dataList));
                }, 1000);
            };
        } else {
            if (dataList.length < 6) {
                self.element.innerHTML = '';
                return false;
            }
            setTimeout(function () {
                templates.render(self.element, dataList).then(render.bind(self, dataList));
            }, 1000);
        };
    }
    /**
     * 数据渲染为dom元素
     * data {Array} 请求的数据
     * htmls {Array} 模板渲染的数据
     */

    function render(data, htmls) {
        var self = this;
        var fragment = '';
        if (data.length === 0) {
            self.element.innerHTML = '';
            return false;
        }

        self.element.innerHTML = '';
        htmls.map(function (html, ind) {
            var eleHtml = $(html);
            if (Number(data[ind].searchResultfoIsRecomHQ) === 1) {
                eleHtml.attr('class', 'quality');
            };
            eleHtml.attr('index', ind).appendTo(self.element);
        });
        feeDeduction.call(self, data);
    }
    /**
     * 绑定点击事件发送p4p商机扣费
     * data {Array} 请求的数据
     * 委托事件点击元素
     */

    function feeDeduction(data) {
        var self = this;
        var undelegate = $(self.element).on('click', '[index]', function () {
            var index = this.getAttribute('index');
            dataProcessing.call(self, data, data[index], index);
        });
    }
    /**
     * 商机扣费参数处理
     * datalist {Array} 所有数据
     * data {Object} 点击当前下标的元素的数据
     * data {index} 点击当前元素的下标
     */

    function dataProcessing(datalist, data, index) {
        var self = this;
        var params = {};
        index = Number(index);
        params.keyword = encodeURIComponent(encodeURIComponent(self.word)) || '';
        params.providerid = data.searchResultfoProviderid;
        params.userid = data.searchResultfoUserId || '0';
        params.bcid = data.searchResultfoId;
        params.p4punique = data.searchResultfoUnique || data.searchResultfoUnique;
        params.username = data.searchResultfoUserName;
        params.unitid = data.searchResultfoUnitId || 0;
        params.planid = data.searchResultfoPlanId || 0;
        params.price = data.searchResultfoUseBid || 0;
        params.islike = data.searchResultfoMatchRule || 0;
        params.sortpos = index + 1;
        params.nextprice = datalist[index + 1] && datalist[index + 1].searchResultfoUseBid || 0;
        params.isnextlike = datalist[index + 1] && datalist[index + 1].searchResultfoMatchRule || 0;
        params.lastPrecisePrice = 0;
        params.clickreferer = self.referrer;
        params.onekeytype = data.searchResultfoKypromote;
        params.nextonekeytype = datalist[index + 1] && datalist[index + 1].searchResultfoKypromote;
        params.abtest = self.searchResultfoGrayScale || 0;
        params.pageid = new UUID().createUUID();
        params._ = new Date() * 1;
        sendDilling(params);
    }
    /**
     * 数据发送函数
     * result {Object} 接口所有参数
     */

    function sendDilling(result) {
        var dataString = 'https://p4pserver.org.hc360.com/p4pserver/doAnticheating?' + getDataString(result);
        sendJsonp(dataString, function () {
            console.log('ok');
        });
    }

    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var attrObj = {};
        var newAttr = ele.attributes;
        var parent = document.createElement('div');
        parent.className = 'spinner';
        var strDom = '';
        for (var i = 0; i < 5; i ++) {
            strDom += '<div class="rect' + i + '"></div>';
        };
        parent.innerHTML = strDom;
        ele.appendChild(parent);
        for (var i = 0; i < Object.keys(newAttr).length; i++) {
            attrObj[newAttr[i].name] = newAttr[i].value;
        };
        if (ele.hasAttribute('word')) {
            this.word = attrObj.word;
            this.referrer = attrObj.referrer;
            var script = ele.querySelector('script[type="application/json"]');
            var data = script ? JSON.parse(script.textContent.toString()) : null;
            data.w = this.word;
            getp4pData.call(this, data);
            return false;
        };
    };
    return customElement;
});
