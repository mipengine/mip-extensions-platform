/**
 * @file mip-jia-index-link 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var CustomElement = util.customStorage;
    var customElement = require('customElement').create();
    var storage = new CustomElement(0);

    // 插入隐藏域,给其他需要城市的地方使用
    function appendcity(ele, obj) {
        $(ele).append('<input type="hidden" id="jiacity" value="' + obj.area_py + '" />');
    }

    // 获取城市
    function cityFn(callback) {
        if (!storage.get('mipcity')) {
            $.ajax({
                url: '//m.jia.com/city/getCurrentAreaNew',
                type: 'get',
                dataType: 'jsonp',
                success: function (a) {
                    if (a.code > 0) {
                        var city = JSON.stringify(a.result.site.area_info);
                        storage.set('mipcity', city, 2592000000);
                        typeof callback === 'function' && callback(a.result.site.area_info);
                    }
                },
                error: function (a) {
                    console.log('获取城市失败');
                }
            });
        }
        else {
            var city = JSON.parse(storage.get('mipcity'));
            typeof callback === 'function' && callback(city);
        }
    }

    customElement.prototype.urlSearch = function () {
        var hrefUrlArr = [];
        var obj = {};
        window.location.search.substr(1) && window.location.search.substr(1).length > 2 && (function () {
            hrefUrlArr = window.location.search.substr(1).split('&');
            for (var i = 0; i < hrefUrlArr.length; i++) {
                var arr = hrefUrlArr[i].split('=');
                obj[arr[0]] = arr[1];
            }
        })();
        return obj;
    };


    customElement.prototype.bindEvent = function () {
        var self = this;
        var obj = self.urlSearch();
        $(self.$button).click(function () {
            var href = $(this).attr('href');
            var url = $(this).data('href');
            var from = obj.from;
            var city = obj.city;
            var datas = $(this)[0].dataset;
            var $obj = {};
            $obj['area_py'] = datas['area_py'];
            $obj['area_cn'] = datas['area_cn'];
            $obj['city_cn'] = datas['city_cn'];
            $obj['city_py'] = datas['city_py'];
            var $url;
            from ? ($url = from, city && ($url = $url.replace(city, datas.area_py)))
                : href ? ($url = href) : url ? ($url = url) : self.clicklink
                ? ($url = self.clicklink + datas.area_py) : ($url = null);
            $obj.area_py && $obj.area_cn && storage.set('mipcity', JSON.stringify($obj), 2592000000);
            $url && (window.top.location.href = $url);
            return false;
        });
    };


    /**
     * build 方法，元素插入到文档时执行，仅会执行一次
     */
    customElement.prototype.build = function () {
        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
        }
        catch (e) {
            thisObj.innerHTML = '';
            return;
        }
        var linkto = data.linkto;
        var changetxt = data.changetxt;
        var changelink = data.changelink;
        this.$button = data.button;
        this.clicklink = data.clicklink;


        cityFn(function (obj) {
            if (linkto) {
                window.top.location.replace(linkto + obj.area_py + '/');
            }
            else {
                $(changetxt).length && $(changetxt).text(obj.area_cn);
                $(changelink).length && $(changelink).each(function (index, item) {
                    var href = $(item).attr('href');
                    if (href !== undefined) {
                        if (href.indexOf('{{city}}') > -1) {
                            href = href.replace(/\{\{city\}\}/g, obj.area_py);
                        }
                        else {
                            href = href.replace(/\/$/, '');
                            href = href + '/' + obj.area_py + '/';
                        }
                        $(this).attr('href', href);
                    }
                });
            }
            appendcity(thisObj, obj);
        });
        this.bindEvent();
    };

    return customElement;
});
