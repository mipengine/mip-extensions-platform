/**
* 寻医问药mip改造 im入口组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2018.06.01
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElem = require('customElement').create();
    var jumpToFn = function (docId, elem) {
        $.ajax({
            type: 'get',
            url: 'https://3g.club.xywy.com/dc_center.php',
            data: {did: docId},
            dataType: 'jsonp',
            success: function (res) {
                if (res.code === 10000) {
                    $(elem).find('.XYWYBD_jump').attr('href', res.durl).trigger('click');
                }
            }
        });
    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
        var tagA = document.createElement('a');
        tagA.className = 'XYWYBD_jump';
        tagA.href = '';
        tagA.innerHTML = 'XYWYBD_jump';
        tagA.style.display = 'none';
        $(this.element).append(tagA);
        util.event.delegate(document, 'mip-img', 'touchend', function (e) {
            var docId = $(e.target.parentNode).attr('docId');
            docId !== undefined ? jumpToFn(docId, this.element) : null;
        });
    };
    return customElem;
});
