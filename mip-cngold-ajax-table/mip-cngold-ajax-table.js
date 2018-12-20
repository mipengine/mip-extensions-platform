/**
 * @file mip-cngold-ajax-table 组件
 * @author ronnylin
 */

define(function (require) {

    var $ = require('zepto');

    var customElement = require('customElement').create();
    var $ = require('zpeto');

    /**
     *  第一次进入可视区回调，只会执行一次
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        var that = this;
        //  获取组件的dom对象
        var element = this.element;

        fetch(this._makeUrl).then(function (res) {
            return res.json();
        }).then(function (data) {
            that._setData(data, element);
        });
    };

    /**
     * Add two numbers.
     *
     * @param {number} element
     * The first number.
     *@return {string}
     */
    customElement.prototype._makeUrl = function (element) {
        var firstUrl = element.getAttribute('url');
        var codes = element.getAttribute('codes');
        var pramas = element.getAttribute('pramas');
        var sendUrl = '';
        if (!firstUrl) {
            return;
        }
        if (pramas) {
            sendUrl = firstUrl + '?codes=' + codes + pramas;
        }
        else {
            sendUrl = firstUrl + '?codes=' + codes;
        }
        return sendUrl;
    };

    /**
     * Add two numbers.
     *
     * @param {number} resData The first number.
     * @param {number} element
     * The first number.
     *
     */
    customElement.prototype._setData = function (resData, element) {
        var tdArr = element.getElementsByTagName('td');
        //  获取所有dom元素的id, Push进去数组
        for (var i = 0; i < tdArr.length; i++) {
            if (tdArr[i].id === '') {
                continue;
            } else {
                var value = resData[tdArr[i].id.split('q')[0]]
                    ? resData[tdArr[i].id.split('q')[0]]['q' + tdArr[i].id.split('q')[1]] : '';
                $('#' + tdArr[i].id).html(value);
            }
        }

    };
    return customElement;
});
