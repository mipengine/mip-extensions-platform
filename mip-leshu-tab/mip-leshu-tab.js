/**
 * @file mip-leshu-tab 组件
 * @author
 */

define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * tab逻辑层
     * @param {Obect} node 节点
     */
    function setTab(node) {
        var tabNode = $(node);
        var tab = tabNode.find('.leshu-tab');

        /**
         * 初始化添加cur
         */

        tab.each(function (index, item) {
            $(this).children('span').eq(0).addClass('cur');
        });

        /**
         * 初始化隐藏状态
         */

        tabNode.find('.leshu-tab-con').each(function (index, item) {
            $(this).children('div').eq(0).show().siblings().hide();
        });

        /**
         * 点击事件
         */

        tab.on('click', 'span', function (params) {
            var self = $(this);
            var parent = self.closest('.leshu-tab-view');
            var tabCon = parent.children('.leshu-tab-con');
            self.addClass('cur').siblings().removeClass('cur');
            tabCon.children('div').eq(self.index()).show().siblings().hide();
        });
    }

    /**
     * 初始化-构建初始化元素
     */
    customElement.prototype.firstInviewCallback = function () {
        setTab(this.element);
    };

    return customElement;
});