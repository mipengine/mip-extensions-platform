/**
 * @file mip-zol-m-article-content 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var dataset = Object.assign({}, element.dataset);

        var content = element.querySelector('[data-role="article-content"]');
        var btn = element.querySelector('[data-role="show-whole-article"]');
        if (content && btn) {

            btn.addEventListener('click', function () {
                fetchJsonp('https://m.zol.com.cn/article/article_2017_more.php?show_all=1&mip=1&id=' + dataset.articleId + '&page=' + (parseInt(dataset.nowPage, 10) + 1), {
                    jsonpCallbackFunction: 'loadWholeArticle'
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    if (res.state === 1) {
                        var fragment = document.createDocumentFragment();
                        var oDiv = document.createElement('div');
                        oDiv.innerHTML = res.docContent;
                        while (oDiv.firstChild) {
                            fragment.appendChild(oDiv.firstChild);
                        }
                        content.appendChild(fragment);
                        btn.remove();
                        btn = null;
                    }
                });
            });
        }

    };

    return customElement;
});
