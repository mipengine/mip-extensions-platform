/**
 * @file mip-qqtngx-shrinknav 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var templates = require('templates');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var pageAttr = {
        catalogid: Math.ceil($('.f-information').attr('data-categroyId'))
    };
    var customData = { // 获取数据
        gxqmData: JSON.parse($('.f-gx-data-' + pageAttr.catalogid).html())
    };
    var pageTitle = {
        titleText: $('.f-gx-name-' + pageAttr.catalogid).text().replace(/\s+/g, '')
    };
    var dataArray = { // 设置数组
        gxArrayHot: [],
        gxArray: []
    };
    var pageJs = {
        init: function () {
            this.replaceTitle(); // 替换标题
            this.addNavData(); // 添加导航数据
            this.hideBtn(); // 点击显示影藏
        },
        replaceTitle: function () {
            $('.f-page-title').text(pageTitle.titleText);
        },
        addNavData: function () {
            var gxData = customData.gxqmData; // 个性签名数
            var amp = '&amp;';
            var i = 0;
            // 获取热门列表
            for (i = 0; i < 10; i++) {
                var name = gxData[i][1];
                var url = gxData[i][0];
                if (url.indexOf(amp) !== -1) {
                    url = url.replace(new RegExp(amp, 'g'), '&');
                }

                dataArray.gxArrayHot.push({name: name, url: url});
            }
            // 获取非热门列表
            for (i = 10; i < gxData.length; i++) {
                var name = gxData[i][1];
                var url = gxData[i][0];
                if (url.indexOf(amp) !== -1) {
                    url = url.replace(new RegExp(amp, 'g'), '&');
                }

                dataArray.gxArray.push({name: name, url: url});
            }
            // 获取数据后，通过 template 模板渲染到页面的
            this.addDateFunction(document.querySelector('.g-gxhot-nav'), dataArray);
            this.addDateFunction(document.querySelector('.g-gxhide-nav'), dataArray);
        },
        hideBtn: function () {
            $('.m-classnav-hide h3').text('全部标签（' + Math.ceil(customData.gxqmData.length - 10) + '）');
            var textOff = '';
            var textObtain = setInterval(function () {
                textOff = $('.g-gxhot-nav li').first().text();
                if (textOff !== '') {
                    clearInterval(textObtain);
                    $('.g-gxhot-nav li').click(function () {
                        var thisBtnName = $(this).text().replace(/\s+/g, '');
                        if (thisBtnName === '更多') {
                            $(this).html('<a href="javascript:;">收起</a>');
                            $('.m-classnav-hide').show();
                        }
                        else if (thisBtnName === '收起') {
                            $(this).html('<a href="javascript:;">更多</a>');
                            $('.m-classnav-hide').hide();
                        }
                    });
                }

            }, 1000);

        },
        addDateFunction: function (htmldom, date) {
            // 获取数据后，通过 template 模板渲染到页面的
            templates.render(htmldom, date).then(function (html) {
                htmldom.innerHTML = html;
            });
        }
    };

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        pageJs.init(); // 启动
    };

    return customElement;
});
