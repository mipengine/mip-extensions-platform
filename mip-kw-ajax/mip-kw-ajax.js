/**
 * @file mip-kw-ajax 组件
 * @author Wang Tao
 * @version 1.0.0
 */

define(function (require) {

    var customElement = require('customElement').create();

    /** [构造元素，只会运行一次]
     *
     */
    customElement.prototype.build = function () {
        var params = document.getElementById('mipKwAjax');

        params = params.getAttribute('mip-ajax-params');
        fetch('https://www.365tang.cn/mip/updateVideoCount?id= ' + params, {
            method: 'get'
        }).then(function (res) { }).then(function (text) { });
        fetch('https://www.365tang.cn/mip/getVideoCount?id= ' + params, {
            method: 'get'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            if (res.code === 0) {
                document.getElementById('praise').innerHTML = res.data.CLICKNUM + ' 阅读量';
            }
        });

        var moreContent = document.getElementById('moreBtn');
        moreContent.addEventListener('click', function () {
            if (moreContent.firstElementChild.className === 'open') {
                moreContent.firstElementChild.className = '';
                moreContent.firstElementChild.innerHTML = '展开全部内容';
                document.getElementById('articleContent').className = 'articleContent';
            } else {
                moreContent.firstElementChild.className = 'open';
                moreContent.firstElementChild.innerHTML = '收起';
                document.getElementById('articleContent').className = 'articleContent open';
            }
        });
    };
    return customElement;
});
