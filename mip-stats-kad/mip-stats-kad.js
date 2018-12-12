/**
 * @file mip-stats-kad 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var that = this;
        var element = that.element;
        var account = element.getAttribute('account') || 'UA-3051632-5';
        var configStr = element.getAttribute('config');
        // debugger;
        var configArr = configStr ? JSON.parse(decodeURIComponent(configStr)) : [
            ['_setAllowHash', false],
            ['_addOrganic', 'soso', 'w'],
            ['_addOrganic', 'youdao', 'q'],
            ['_addOrganic', 'sogou', 'query'],
            ['_addOrganic', '360', 'q'],
            ['_addOrganic', 'baidu', 'word'],
            ['_addOrganic', 'baidu', 'q1'],
            ['_addOrganic', 'so.com', 'q'],
            ['_trackPageview']
        ];

        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', account]);
        configArr.forEach(function (val) {
            window._gaq.push(val);
        });

        // 统计组件的依赖，谷歌统计js，必须引入的
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
        ga.onload = function () {
            bindEle();
        };
    };

    function bindEle() {
        // var mipStatsConf = {
        //     event: "click",
        //     data: ['_trackEvent', '百度mip页', '点击事件', '0', 0]
        // };
        // var attr = encodeURIComponent(JSON.stringify(mipStatsConf));
        var mipStatsConfAttr = 'mip-stats-conf';
        var gaEles = document.querySelectorAll('*[' + mipStatsConfAttr + ']');
        gaEles.forEach(function (ele, index) {
            var mipStatsConf = ele.getAttribute(mipStatsConfAttr);
            if (!mipStatsConf) {
                return;
            }
            var statsConf;
            try {
                statsConf = JSON.parse(decodeURIComponent(mipStatsConf));
            } catch (error) {
                console.log('事件跟踪配置有误，元素及错误如下：');
                console.log(ele);
                console.error(error);
                return;
            }
            if (!statsConf || !statsConf.event || !statsConf.data) {
                console.log('事件跟踪配置有误:');
                console.log(ele);
                return;
            }
            var loadedEventClass = 'mip-stats-event-loaded';
            if (ele.classList.contains(loadedEventClass)) {
                return;
            }
            ele.classList.add(loadedEventClass);
            if (statsConf.event === 'load') {
                window._gaq.push(statsConf.data);
            } else {
                ele.addEventListener(statsConf.event, function (event) {
                    window._gaq.push(statsConf.data);
                });
            }
        });
    }
    return customElement;
});