/**
 * @author: 56
 * @date:  2017-5-8
 * @time: 13:35
 * @file: mip-bdb-custom-content.js
 * @contact: bendibao.com
 * @description: show bendibao custom contents
 */
define(function (require) {

    var customElem = require('customElement').create();

    // Builder
    customElem.prototype.firstInviewCallback = function () {

        var element = this.element;
        var webdir = element.getAttribute('webdir');
        var url = element.getAttribute('url');
        var title = element.getAttribute('title');
        var type = element.getAttribute('type');
        if (type === null) {
            type = 'mobile';
        }


        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp('https://api.bendibao.com/weixin_right.php?type=' + type + '&datatype=jsonp&webdir=' + webdir + '&theurl=' + url + '&title=' + title, {
            jsonpCallback: 'jsoncallback',
            jsonpCallbackFunction: 'bdbcallback' + type
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            element.innerHTML = data[0];
        });

    };

    return customElem;

});
