/**
 * @file mip-cr173-eject 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var templates = require('templates');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var pageInfo = {
        id: $('.f-information').attr('data-id'),
        path: $('.f-information').attr('data-path'),
        categroyId: Math.ceil($('.f-information').attr('data-categroyId')),
        rootId: $('.f-information').attr('data-rootid'),
        commendid: $('.f-information').attr('data-commendid'),
        system: $('.f-information').attr('data-system'),
        ppaddress: $('.f-information').attr('data-ppaddress'),
        ismoney: $('.f-information').attr('data-ismoney'),
        toprecomdandroid: $('.f-toprecomd-azhtml').html(),
        toprecomdios: $('.f-toprecomd-ioshtml').html(),
        ejectandroid: $('.f-android-eject').html(),
        ejectOhterAndroid: $('f-outer-city-android').html()
    };
    var addRecomdHtml = {
        init: function () {
            this.addRecomdHtml(); // 添加推荐游戏
        },
        addRecomdHtml: function () {
            var androidDateArry = JSON.parse(pageInfo.toprecomdandroid); // 获取安卓数据
            var iosDateArry = JSON.parse(pageInfo.toprecomdios); // 获取ios数据
            var androidData = {
                list: []
            };
            var iosData = {
                list: []
            };
            var i = 0;
            for (i = 0; i < androidDateArry.length; i++) {
                var title = androidDateArry[i][0];
                var url = androidDateArry[i][1];
                var smallimg = androidDateArry[i][2];
                var amp = '&amp;';
                if (url.indexOf(amp) !== -1) {
                    url = url.replace(new RegExp(amp, 'g'), '&');
                }
                androidData.list.push({title: title, url: url, smallimg: smallimg});
            }
            for (i = 0; i < iosDateArry.length; i++) {
                var amp = '&amp;';
                if (iosDateArry[i][1].indexOf(amp) !== -1) {
                    iosDateArry[i][1] = iosDateArry[i][1].replace(new RegExp(amp, 'g'), '&');
                }
                iosData.list.push({title: iosDateArry[i][0], url: iosDateArry[i][1], smallimg: iosDateArry[i][2]});
            }

            if (platform.isAndroid()) {
                // 获取数据后，通过 template 模板渲染到页面的

                this.addDate(document.querySelector('.group'), androidData);
            }
            else {
                // 获取数据后，通过 template 模板渲染到页面的
                this.addDate(document.querySelector('.group'), iosData);
            }
        },
        addDate: function (htmldom, date) {
            // 获取数据后，通过 template 模板渲染到页面的
            templates.render(htmldom, date).then(function (html) {
                htmldom.innerHTML = html;
            });
        }

    };
    customElement.prototype.build = function () {
        addRecomdHtml.init();
    };

    return customElement;
});
