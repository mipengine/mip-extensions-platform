/**
 * @file
 * 搜狗广告
 * @author 169kang
 * @version 1.1.1
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var ele = this.element;
        var adId = ele.getAttribute('ad_id');
        var width = ele.getAttribute('ad_width') ? ele.getAttribute('ad_width') : 20;
        var height = ele.getAttribute('ad_height') ? ele.getAttribute('ad_height') : 2;
        var index = ele.getAttribute('ad_index') ? ele.getAttribute('ad_index') : 1;
        var div = document.createElement('div');
        var divattr = document.createAttribute('id');
        divattr.value = 'sogou_wap_' + adId + index;
        div.setAttributeNode(divattr);
        var scriptTag1 = document.createElement('script');
        scriptTag1.src = 'https://theta.sogoucdn.com/wap/js/aw.js',
        scriptTag1.setAttribute('async', 'true');
        var scriptTag2 = document.createElement('script');
        scriptTag2.innerHTML = 'var sogou_div = document.getElementById("sogou_wap_' + adId + index + '");'
		+ 'window.sogou_un = window.sogou_un || [];window.sogou_un.push({id:"'
        + '' + adId + '",ele:sogou_div,w:' + '' + width + ',h:' + '' + height + '});';
        ele.appendChild(div);
        ele.appendChild(scriptTag2);
        ele.appendChild(scriptTag1);
    };
    return customElement;
});
