/**
 * @file mip-openweb-search 组件
 * @author JennyL(jiaojiaomao220@163.com)
 */

define(function (require) {

    var customElement = require('customElement').create();

    var $ = require('./ghostHunter');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $btns = $(this.element);
        var rssUrl = $(this.element).attr('rss');
        var $resultsDom = $($(this.element).attr('resultsDom'));

        if (!rssUrl) {
            console.error('mip-openweb-search初始化失败，rss参数无效');
            return;
        }
        else if (!$resultsDom.length) {
            console.error('mip-openweb-search初始化失败，resultsDom参数无效');
            return;
        }

        $btns.on('click', formSubmit)
            .on('touchend', formSubmit);

        function formSubmit(e) {
            $('.form-input').blur();
            $(e.target).closest('form').trigger('submit');

            // 修改overflow为了触发重绘，解决在ios safari浏览器中
            // 键盘弹出状态下展示lightbox,lightbox不能滚动问题。
            $('#search-lightbox').css('overflow', 'hidden');
            window.setTimeout(function () {
                $('#search-lightbox').css('overflow', 'auto');
            }, 200);
        }

        // 配置搜索
        var resultTpl = '<a href=\'<%link%>\'>'
            + '<h2><%title%></h2><span><%pubDate%></span>'
            + '<span><%category%></span></span>'
            + '<p><%description%></p></a>';

        var ghostOpt = {
            results: $resultsDom,
            rss: rssUrl,
            infoTpl: '<p>搜索到<%amount%>篇相关文章</p>',
            resultTpl: resultTpl
        };

        // 两个search-field对应pc导航和H5侧边栏导航输入框
        $('#search-field').ghostHunter(ghostOpt);
        $('#search-field2').ghostHunter(ghostOpt);
    };

    return customElement;
});
