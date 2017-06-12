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


        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp('https://api.bendibao.com/weixin_right.php?type=mobile&datatype=jsonp&webdir=' + webdir + '&theurl=' + url + '&title=' + title, {
            jsonpCallback: 'jsoncallback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            element.innerHTML = data[0];
            if (data[1]) {
                if (document.querySelector('.content')) {
                    var oParent = document.querySelector('.content');
                    var newNode = document.createElement('div');
                    var reforeNode = document.querySelector('.leading');
                    newNode.innerHTML = data[1];
                    oParent.insertBefore(newNode, reforeNode.nextSibling);
                }
            }
        });

    };

    return customElem;

});
