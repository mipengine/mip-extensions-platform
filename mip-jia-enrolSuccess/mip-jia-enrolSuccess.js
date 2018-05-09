/**
 * @file mip-jia-enrolSuccess 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var showMaskComTimer = null;
    // 弹出提示层
    function tipMask(msg, tips, duration) {
        clearTimeout(window.tipMaskTimer);
        window.tipMaskTimer = null;
        duration = duration || 2000;
        $(tips).text(msg).show().css('transform', 'translate(-50%,-50%);');
        window.tipMaskTimer = setTimeout(function () {
            $(tips).fadeOut(100, function () {
                $(this).hide();
            });
        }, duration);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var thisObj = this.element;
        self.ele = thisObj.getAttribute('tab-element');
        self.cur = thisObj.getAttribute('tab-current') || 'active';
        self.area = thisObj.getAttribute('area-select');
        self.yt = thisObj.getAttribute('bq-yt');
        self.fx = thisObj.getAttribute('bq-fx');
        self.city = thisObj.getAttribute('city') || 'shanghai';
        self.tips = thisObj.getAttribute('tips') || '.popup-maskEdit';
        $(self.ele).click(function () {
            $(this).addClass(self.cur).siblings().removeClass(self.cur);
        });
        $(thisObj).find('.huoqu_data').click(function () {
            var bqyt = $(self.yt).find('.active');
            var bqfx = $(self.fx).find('.active');
            var bqyttxt = bqyt.find('a p').text();
            var bqfxtxt = bqfx.find('a p').text();
            var memo1 = $(self.area).find('span').text();
            var memo2 = $(self.area).find('select').val();
            var memo = '房屋所在地：' + 　memo1 + ' ' + memo2 + '#装修用途：' + 　bqyttxt + '#房型：' + bqfxtxt;
            if (memo2 === '选择地区') {
                tipMask('请选择房屋所在区域', self.tips);
                return;
            }

            if (bqyt.length < 1) {
                tipMask('请选择装修用途', self.tips);
                return;
            }

            if (bqfx.length < 1) {
                tipMask('请选择房型', self.tips);
                return;
            }

            $.ajax({
                url: '//m.jia.com/JiaZhuangxiu/AjaxSaveNewShopApplyUserGuide',
                type: 'post',
                dataType: 'jsonp',
                data: {
                    'fj_num': 0,
                    'kt_num': 0,
                    'wsj_num': 0,
                    'cfj_num': 0,
                    'yt_num': 0,
                    'memo': memo,
                    'ticket_id': 0
                },
                success: function (res) {
                    location.href = '//m.jia.com/zx/huodong/' + self.city;
                }
            });
        });
    };

    return customElement;
});