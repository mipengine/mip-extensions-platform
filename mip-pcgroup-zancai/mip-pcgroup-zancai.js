/**
 * @file mip-pcgroup-zancai 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var index = 0;
    var eArry = [];
    var sidArray = [];
    var elem = [];

    var comm = {

        url: '//bip.pcauto.com.cn/intf/article.jsp',

        bipDo: function (index, siteId, act, fn) {
            var url = this.url + '?act=addArtAgree&articleId=' + sidArray[index];
            url += '&siteId=' + siteId + '&isAgree=' + act;
            fetchJsonp(url).then(function (res) {
                return res.json();
            }).then(function (data) {
                fn && fn(data);
            });
        },

        bipBind: function (index, siteId, d) {
            var elemt = elem[index];
            var btn1 = elemt.querySelectorAll('.agree')[0];
            var btn2 = elemt.querySelectorAll('.against')[0];
            var tips = elemt.querySelectorAll('.sup-tip')[0];
            var timer = null;
            var num = elemt.querySelectorAll('span');

            function showTips(str) {
                clearTimeout(timer);
                tips.innerHTML = str;
                tips.style.dsiplay = 'block';
                timer = setTimeout(function () {
                    tips.style.dsiplay = 'none';
                    tips.innerHTML = '';
                }, 1000);
            }

            btn1.onclick = function () {
                if (d.isAgree > 0) {
                    showTips('该文章已被该IP用户赞过');
                    return;
                }
                comm.bipDo(index, siteId, 1, function (data) {
                    if (data.code < 1) {
                        num[0].innerHTML = parseInt(parseInt(num[0].innerHTML, 10) + 1, 10);
                        d.isAgree = 1;
                    }
                    else {
                        showTips(data.message);
                    }
                });
            };
            btn2.onclick = function () {
                if (d.isAgree > 0) {
                    showTips('该文章已被该IP用户踩过');
                    return;
                }
                comm.bipDo(index, siteId, 2, function (data) {
                    if (data.code < 1) {
                        num[1].innerHTML = parseInt(parseInt(num[1].innerHTML, 10) + 1, 10);
                        d.isAgree = 2;
                    }
                    else {
                        showTips(data.message);
                    }
                });
            };
        },

        bipShow: function (index, siteId, data) {
            var html = '<div class="art-tools"><div class="agree">';
            html += '   <p><span>' + data.agreeCount + '</span><i>赞</i></p>';
            html += '   </div><div class="against">';
            html += '   <p><span>' + data.againstCount + '</span><i>踩</i></p>';
            html += '   </div><div class="sup-tip"></div>';
            html += '</div>';
            elem[index].innerHTML = html;
            comm.bipBind(index, siteId, data);
        },

        bipGet: function (index, siteId) {
            var url = this.url + '?act=getArticleCount&articleId=' + sidArray[index] + '&siteId=' + siteId;
            fetchJsonp(url).then(function (res) {
                return res.json();
            }).then(function (data) {
                comm.bipShow(index, siteId, data);
            });
        },

        init: function (index, siteId) {
            this.bipGet(index, siteId);
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var site = element.getAttribute('data-site');
        var articleId = element.getAttribute('data-articleId');

        eArry.push(element);
        sidArray.push(articleId);
        elem.push(element);

        element.setAttribute('data-index', index);
        element.classList.add('mip-zancai-' + site);

        var siteIds = {
            pconline: 1,
            pcauto: 2,
            pclady: 4,
            pcbaby: 5,
            pchouse: 6,
            greeknev: 7
        };

        var siteId = siteIds[site];
        if (!siteId || !site || !articleId) {
            index++;
            return;
        }

        comm.init(index, siteId);
        index++;
    };

    return customElement;
});
