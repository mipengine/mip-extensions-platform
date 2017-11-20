/**
 * @file mip-ppkao-subjectjingyanviewmore 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var button = $(ele);
        var categoryID = ele.dataset.categoryid;
        var channelID = ele.dataset.channelid;
        var classID = ele.dataset.classid;
        var page = 1;
        button.on('click', function () {
            viewMore();
        });
        $(function () {
            $(window).scroll(function (e) {
                var bodyh = $('body').height();
                var scrtop = $('body').scrollTop();
                var winh = window.innerHeight;
                if (scrtop >= bodyh - winh - 100) {
                    viewMore();
                }
            });
        });
        function viewMore() {
            page = page + 1;
            $.ajax({
                type: 'get',
                async: false,
                url: '//dynamic.ppkao.com/Interface/PageAPI.ashx'
                + '?action=GetArticleByClassIDJY'
                + '&CategoryID=' + categoryID
                + '&ChannelID=' + channelID
                + '&ClassID=' + classID
                + '&page=' + page,
                dataType: 'jsonp',
                cache: true,
                contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                jsonp: 'callback',  // 传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonpCallback: 'callback',  // 自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success: function (data) {
                    // 返回的数据用data.d获取内容
                    if (data.name === null || data.name === '') {
                        button.html('暂无更多内容');
                    } else {
                        $('#zx_item').append(data.name);
                    }
                },
                error: function (err) {
                    // alert(err.statusText);
                }
            });
        }
    };

    return customElement;
});
