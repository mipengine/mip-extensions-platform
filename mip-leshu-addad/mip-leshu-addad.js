/**
 * @file mip-leshu-addad 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    // mip 组件开发支持zepto
    var $ = require('zepto');
    // mip 异步请求使用fetch和fetch-jsonp
    customElement.prototype.firstInviewCallback = function () {
        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp('//m.9k9k.com/operation/iplocation.php?ac=getposcall', {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
		/**
         * 全局匹配btnbox下的a链接，发现不符合规则的替换url
         */
        // 推荐, 组件内选择
            var ele = this.element;
            var lists = ele.querySelectorAll('.btnbox a');
            lists.each(function () {
                if ($(this).attr('modeid') === ',12,' && data.recomdCity) {
                    /**
                     * 区分ios和android分别替换
                     */
                    if ($(this).attr('href') !== 'undefined' && $(this).attr('class') === 'ios') {
                        $(this).attr('href', data.locaUrl[0]);
                        $(this).html('<i></i>苹果版下载 (' + data.locaSize[1] + 'MB)');
                    }
                    if ($(this).attr('href') !== 'undefined' && $(this).attr('class') === 'android') {
                        $(this).attr('href', data.locaUrl[1]);
                        $(this).html('<i></i>安卓版下载 (' + data.locaSize[0] + 'MB)');
                    }
                }
            });
        });
    };
    return customElement;
});


