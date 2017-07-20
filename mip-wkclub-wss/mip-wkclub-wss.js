/**
* 寻医问药mip改造 问答顶部搜索分词组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2017.07.20
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
        var elem = this.element;
        var title = document.title;
        var desp = $('meta[name="description"]').attr('content');
        var searchInput = $('.' + $(elem).attr('el'));
        var url = $(elem).attr('url');
        $.ajax({
            url: url,
            type: 'get',
            data: {keyword: encodeURIComponent(title + desp)},
            dataType: 'jsonp',
            success: function (res) {
                if (res.code === '200') {
                    searchInput.val(res.data[0].word);
                }
            }
        });
    };
    return customElem;
});
