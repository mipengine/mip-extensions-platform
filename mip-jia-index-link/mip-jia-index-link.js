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
        if (!storage.get('city')) {
            $.ajax({
                url: '//m.jia.com/city/getCurrentAreaNew',
                type: 'get',
                dataType: 'jsonp',
                success: function (a) {
                    if (a.code > 0) {
                        var city = JSON.stringify(a.result.site.area_info);
                        storage.set('city', city, 2592000000);
                        typeof callback === 'function' && callback(a.result.site.area_info);
                    }
                },
                error: function (a) {
                    console.log('获取城市失败');
                }
            });
        }
        else {
            var city = JSON.parse(storage.get('city'));
            typeof callback === 'function' && callback(city);
        }
    }


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

        cityFn(function (obj) {
            if (linkto) {
                window.top.location.replace(linkto + obj.area_py + '/');
            }
            else {
                $(changetxt).length && $(changetxt).text(obj.area_cn);
                $(changelink).length && $(changelink).each(function (index, item) {
                    var href = $(item).attr('href');
                    if (href !== undefined) {
                        href = href.replace(/\/$/, '');
                        href = href + '/' + obj.area_py + '/';
                        $(this).attr('href', href);
                    }
                });
            }
            appendcity(thisObj, obj);
        });
    };

    return customElement;
});
