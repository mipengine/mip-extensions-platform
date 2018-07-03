/**
 * @file mip-leshu-clicksum 组件
 * @author guyx@leshu.com
 */

define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var fetchJsonp = require('fetch-jsonp');

    var customElement = require('customElement').create();

    // 点击汇总逻辑层
    function setClicksum(node) {
        var ClickNode = $(node);
        var clicksum = ClickNode.find('.leshu-clicksum');
        /**
         * 点击事件
         */
        clicksum.on('click', 'a', function (params) {
            var self = $(this);
            fetchJsonp('//m.9k9k.com/operation/iplocation.php?ac=getposcall', {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                /**
                * a链接，url点击统计
                */
                if (self.attr('modeid') === ',12,' && data.recomdCity) {
                    if (self.attr('datahref') !== 'undefined' && self.attr('class') === 'ios') {
                        window.top.location.href = data.locaUrl[0];
                    }
                    if (self.attr('datahref') !== 'undefined' && self.attr('class') === 'android') {
                        window.top.location.href = data.locaUrl[1];
                    }
                } else {
                    if (self.attr('datahref') !== 'undefined') {
                        window.top.location.href = self.attr('datahref');
                    }
                }
            });
        });
    }

    /**
     * 初始化-构建初始化元素
     */
    customElement.prototype.firstInviewCallback = function () {
        setClicksum(this.element);
    };

    return customElement;
});

