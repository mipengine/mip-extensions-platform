/**
 * @file mip-jia-tbs 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    // 切换tab
    function cutTable(ele) {
        var nav = ele.attr('data-nav');
        var con = ele.attr('data-con');
        var cur = ele.attr('data-cur');
        $(nav).on('click', function () {
            var index = $(this).index();
            changeClass($(nav), index, cur);
            changeContent($(con), index, cur);
        });
    }

    // nav切换class名, 解决使用mip-semi-fixed被拆分问题
    function changeClass(nav, index, cur) {
        nav.each(function () {
            if ($(this).index() === index) {
                $(this).addClass(cur).siblings().removeClass(cur);
            }
        });
    }

    // content切换显示内容
    function changeContent(con, index, cur) {
        con.eq(index).addClass(cur).siblings().removeClass(cur);
    }

    /**
     * 可能多处使用，固使用build
     */
    customElement.prototype.build = function () {
        var element = $(this.element);
        cutTable(element);
    };

    return customElement;
});
