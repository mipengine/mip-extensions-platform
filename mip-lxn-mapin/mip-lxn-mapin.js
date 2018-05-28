/**
 * @file mip-map 组件
 * @author lxn
 * @mail lan@lanxiniu.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var MAPURL = 'https://api.map.baidu.com/api?';
    var mapData = [];
    // var TYPE = 'script[type="application/json"]';
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
            a.Html.setAttribute('style', 'font-size:' + a.widthProportion() * 100 + 'px!important;height:auto');
        };

        a.changePage();
        setInterval(a.changePage, 1000);
    }
    // 校验电话号码
    function checkPhone(phone) {
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    }
    function AddressSearch(cityName, provinceFilter, pageSize, searchComplete) {
        var that = this;
        that.data = {};
        that.provinceReg = new RegExp(provinceFilter);
        that.searchComplete = searchComplete || function () {};
        that.pageindex = 0;

        var onSearchComplete = function (results) {
            // console.log("_bMap.getStatus", that._bMap.getStatus());
            if (that._bMap.getStatus() === 0) {
                // 判断状态是否正确
                var searchData = {
                    keyword: results.keyword,
                    data: [],
                    pageIndex: results.getPageIndex(),
                    pageNum: results.getNumPages()
                };
                for (var i = 0; i < results.getCurrentNumPois(); i++) {
                    var poi = results.getPoi(i);
                    if (that.provinceReg.test(poi.province)) {
                        searchData.data.push({
                            title: poi.title,
                            address: (poi.address || ''),
                            lat: poi.point.lat,
                            lng: poi.point.lng,
                            city: poi.city,
                            province: poi.province
                        });
                    }

                }
                that.setpageindex(results.getPageIndex());
                that.setCachedData(results.keyword, results.getPageIndex(), searchData);
                that.searchComplete(searchData);
            }
            else {
                that.searchComplete(false);
            }
        };
        that._bMap = new BMap.LocalSearch(cityName, {
            onSearchComplete: onSearchComplete
        });
        that._bMap.setLocation(cityName);
        that._bMap.setPageCapacity(pageSize);
    }

    AddressSearch.prototype.getCachedData = function (keyword, pageIndex) {
        return this.data[keyword + '::' + pageIndex];
    };
    AddressSearch.prototype.setCachedData = function (keyword, pageIndex, searchData) {
        this.data[keyword + '::' + pageIndex] = searchData;
    };

    AddressSearch.prototype.search = function (queryStr) {
        var that = this;

        that.keyword = queryStr;
        that.pageindex = 0;
        var searchData = that.getCachedData(that.keyword, that.pageindex);
        if (searchData) {
            that.searchComplete(searchData);
        }
        else {
            that._bMap.search(that.keyword, {
                forceLocal: true
            });
        }
    };

    AddressSearch.prototype.gotoPrePage = function () {
        var that = this;

        var currentpageindex = that.getpageindex() - 1;
        if (currentpageindex < 0) {
            currentpageindex = 0;
        }

        that.gotoPage(currentpageindex);
    };

    AddressSearch.prototype.gotoNextPage = function () {
        var that = this;

        var currentpageindex = that.getpageindex() + 1;
        if (currentpageindex < that.getPageNum()) {
            that.gotoPage(currentpageindex);
        }
        else {
            that.searchComplete(false);
        }
    };

    AddressSearch.prototype.gotoPage = function (pageIndex) {
        var that = this;

        var searchData = that.getCachedData(that.keyword, pageIndex);
        if (searchData) {
            that.setpageindex(pageIndex);
            that.searchComplete(searchData);
        }
        else {
            that._bMap.gotoPage(pageIndex);
        }
    };

    AddressSearch.prototype.getCityList = function () {
        return this._bMap.getResults().getCityList();
    };
    AddressSearch.prototype.getPageSize = function () {
        return this._bMap.getResults().getCurrentNumPois();
    };
    AddressSearch.prototype.getPageNum = function () {
        return this._bMap.getResults().getNumPages();
    };
    AddressSearch.prototype.getPositionSize = function () {
        return this._bMap.getResults().getNumPois();
    };
    AddressSearch.prototype.getpageindex = function () {
        return this.pageindex;
    };
    AddressSearch.prototype.setpageindex = function (pageIndex) {
        this.pageindex = pageIndex;
    };

    /**
     * 地图类
     *
     * @class
     * @param {HTMLElement} element 地图组件元素
     * @param {Object} config 地图参数
     */
    function BaiduMap(element, config) {
        this.config = config;
        this.ele = element;
    }

    /**
     * 展现地图逻辑入口
     *
     */
    BaiduMap.prototype.show = function () {
        this.init();
        this.append();
    };

    /**
     * 初始化地图请求 URL
     *
     */
    BaiduMap.prototype.init = function () {
        var cf = this.config;
        var pArray = [];
        var pObj = {
            v: cf.version || '2.0',
            ak: cf.ak || '',
            t: new Date().getTime(),
            callback: this.getCb()
        };
        for (var key in pObj) {
            if (pObj.hasOwnProperty(key)) {
                pArray.push(key.concat('=', pObj[key]));
            }

        }
        this.mapUrl = MAPURL + pArray.join('&');
    };

    /**
     * 将地图脚本插入到页面中
     *
     */
    BaiduMap.prototype.append = function () {
        if (!this.config.ak) {
            // console.error('请配置服务密钥（ak）');
            return;
        }

        var ele = document.createElement('script');
        // 外链 百度地图 脚本将脚本引入页面
        ele.src = this.mapUrl;
        document.body.appendChild(ele);
    };

    /**
     * JSON 解析，如果出错则在浏览器中进行提示
     *
     * @param {Object} json 地图参数回调还名称
     * @return {Object|boolean}  解析成功返回 JSON 数据，否则返回 false
     */
    customElement.prototype.jsonParse = function (json) {
        try {
            return JSON.parse(json);
        }
        catch (e) {
            // console.error(e);
            return false;
        }
    };

    /**
     * 绑定全局 callback 函数，并返回回调名称
     *
     * @return {string} 回调名称
     */
    BaiduMap.prototype.getCb = function () {
        window.mapCallback = this.handleResult.bind(this);
        return 'mapCallback';
    };

    /**
     * 处理请求返回后的结果，之后扩展逻辑均在该方法中实现
     *
     */
    BaiduMap.prototype.handleResult = function () {

        /* global BMap */
        var city = localStorage.getItem('focuscity');
        if (city === null) {
            city = '北京';
        }

        var map = new BMap.Map('l-map');
        map.centerAndZoom(city, 12);

        var ele = this.ele;
        var moveOutAddress = ele.querySelector('#move-in-address');
        // 地址
        var suggest = ele.querySelector('#suggestId');
        // 电话号码
        var phoneNum = ele.querySelector('#move-in-phone');
        var addressSearch = new AddressSearch(city,
            '', 20, function (searchData) {
                if (!searchData || !searchData.data || !searchData.data.length) {
                    // 无匹配地址
                    return false;
                }

                // // 查询成功
                var html = '';
                var searchedData = searchData.data;
                mapData = searchedData;
                // console.log(JSON.stringify(searchedData,null,2))
                for (var i = 0; i < searchedData.length; i++) {
                    var item = searchedData[i];
                    html += '<div class="query-list" data-items='
                        + i
                        + '>'
                        + '<h4>' + item.title
                        + '</h4>' + '<p>' + item.address
                        + '</p></div>';
                }
                var addressLIst = ele.querySelector('.address-list');
                $(addressLIst).show().html(html);
            });

        $(ele.querySelector('#suggestId')).on('input', function () {
            addressSearch.search($(this).val());
        });

        $(moveOutAddress).on('click', function () {
            if (suggest.value === '') {
                alert('地址不能为空');
            }
            else if (phoneNum.value === '') {
                alert('联系电话不能为空');
            }
            else if (!checkPhone(phoneNum.value)) {
                alert('号码不符合规范');
            }
            else {

                // 详细信息
                var mOutXx = ele.querySelector('#move-in-xx').value;
                // 联系人
                var mOutPerson = ele.querySelector('#move-in-person').value;
                // 联系电话
                var mOutPhone = ele.querySelector('#move-in-phone').value;
                // 搬出搬入数据
                var moveAddress = JSON.parse(localStorage.getItem('moveAddress'));
                // 判断是否存在搬出地址
                var moveOutKeys = Object.keys(moveAddress.moveout);
                // 判断是否存在搬入地址
                var moveInKeys = Object.keys(moveAddress.movein);
                if (moveOutKeys.length > 0 && moveInKeys.length > 0) {
                    // console.log('地址可以计算');
                    var moveOutItem = moveAddress.moveout.location;
                    var moveInItem = moveAddress.movein.location;
                    var pointOut = new BMap.Point(moveOutItem.lng, moveOutItem.lat);
                    var pointIn = new BMap.Point(moveInItem.lng, moveInItem.lat);
                    localStorage.setItem('distance', (map.getDistance(pointOut, pointIn).toFixed(2)) / 1000);
                }
                else {
                    // console.log('地址不完全');
                }

                // 配置其他信息
                moveAddress.movein.other = {
                    mOutXx: mOutXx,
                    mOutPerson: mOutPerson,
                    mOutPhone: mOutPhone
                };
                localStorage.setItem('moveAddress', JSON.stringify(moveAddress));
                setTimeout(function () {
                    window.top.location.href = 'order';
                }, 500);
            }
        });
    };

    /**
     * 首次进入页面之后加载地图组件
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var addressList = ele.querySelector('.address-list');
        var suggest = ele.querySelector('#suggestId');

        var cfg = {
            ak: '1c738e7908b5e8ec79742527c9796514'
        };
        cfg && new BaiduMap(this.element, cfg).show();

        $(addressList).on('click', '.query-list', function () {
            $(suggest).val($(this).find('h4').text());
            $(addressList).hide();
            var items = mapData[$(this).data('items')];
            var moveAddress = localStorage.getItem('moveAddress');
            if (moveAddress === null) {
                var data = {
                    moveout: {},
                    movein: {
                        location: items,
                        other: {}
                    }
                };
                localStorage.setItem('moveAddress', JSON.stringify(data));
            }
            else {
                moveAddress = JSON.parse(moveAddress);
                moveAddress.movein.location = items;
                localStorage.setItem('moveAddress', JSON.stringify(moveAddress));
            }

        });
    };
    return customElement;
});
