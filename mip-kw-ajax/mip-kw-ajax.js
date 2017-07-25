/**
 * @file mip-ajax-data 组件
 * @author Jobs Fan
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /** [bindEven 绑定事件]
     *
     * @param {Object} element [mip-ajax-data元素]
     * @param {Object} params [来自mip-ajax-data的属性]
     * @param {Booleans} once [是否只执行一次]
     */
    function bindEven(element, params, once) {
        window.onload(function () {
            var id = params.id;

            // $.get(params.updateVideoCount, {id: id}, function (data) { });
            fetch(params.updateVideoCount, {
                method: 'get',
                body: {id: id}
            }).then(function (res) { }).then(function (text) { });

            var url = params.url;
            // $.get(url, {id: id}, function (result) {
            //     if (result.code === 0) {
            //         $('.' + params.containerclass).html(result.data.CLICKNUM + ' 阅读量');
            //     }
            // });
            fetch(url, {
                method: 'get',
                body: {id: id}
            }).then(function (res) {
                if (res.code === 0) {
                    $('.' + params.containerclass).html(res.data.CLICKNUM + ' 阅读量');
                }
            }).then(function (text) { });
        });
    }

    /** [构造元素，只会运行一次]
     *
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = this.element;
        var params = JSON.parse($(element).attr('mip-ajax-params').replace(/'/g, '"'));
        bindEven(element, params, typeof ($(element).attr('mip-ajax-mark')) === 'undefined');
    };

    return customElement;
});
