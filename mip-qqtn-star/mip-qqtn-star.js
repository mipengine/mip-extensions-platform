/**
 * @file mip-qqtn-star
 * 获取配置文件地区以及信息进行判断，覆盖原始内容
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var fhieldur = ele.getAttribute('data-shield');
        // 获取配置文件地区信息
        fetchJsonp('https://ca.6071.com/shield/index/c/' + fhieldur, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var starok = data['starCityOpen'];
            // 配置文件是否启用
            var dqcity = data['city'];
            // 获取当前地区名称
            var starCity = data.starCity;
            // 获取配置文件设置屏蔽地区名称
            if (starok) {
                if ($.inArray(dqcity, starCity) !== -1) {
                    // 属于屏蔽地区执行
                    var xjtxt = $(ele).find('.f-information').attr('data-attr');
                    // 获取软件信息免费、下架、收费属性
                    var djstar = $(ele).find('.f-information').attr('data-star');
                    // 获取软件信息等级
                    if (djstar !== 'undefined' && djstar === '1' && xjtxt !== '下架') {
                        // 软件等级为1并且软件信息不属于下架执行
                        dengji();
                    }
                    function dengji() {
                        $(ele).find('.m-down-msg ,.g-previmg-box ,.g-down-information').remove();
                        $(ele).find('.g-nav-full').after(data.startxt[0]);
                        $(ele).find('.f-maincms-cont').html(data.starinfo[0]);
                        $(ele).find('#details img').css('border', '20px');
                    }
                }
            }
        });
    };
    return customElement;
});



