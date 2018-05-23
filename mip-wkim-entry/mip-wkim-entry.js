/**
* 寻医问药mip改造 im入口组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2018.05.22
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElem = require('customElement').create();
    var jumpToFn = function (docId) {
        $.ajax({
            type: 'get',
            url: 'https://3g.club.xywy.com/dc_center.php',
            data: {did: docId},
            dataType: 'jsonp',
            success: function (res) {
                if (res.code === 10000) {
                    location.href = res.durl;
                }
            }
        });
    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
        util.event.delegate(document, 'mip-img', 'click', function (e) {
            var docId = $(e.target.parentNode).attr('docId');
            docId !== undefined ? jumpToFn(docId) : null;
        });
    };
    return customElem;
});
