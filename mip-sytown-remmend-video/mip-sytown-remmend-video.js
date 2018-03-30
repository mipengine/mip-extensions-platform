/**
 * @file mip-sytown-remmend-video 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    var sytownList = {

        init: function (element) {
            this.el = element;
            this.ids = this.el.getAttribute('video-id') || '';
            this.DOMAIN = 'https://api.sytown.cn';
            this.ALINK = location.protocol + '//' + location.hostname + ':' + location.port + location.pathname;
            if (!this.ids) {
                return;
            }

            this.getList();
        },

        getList: function () {
            var that = this;
            var urls = this.DOMAIN + '/FrameWeb/FrameService/Api.ashx';
            var data = '{"_type":"getlist","_datatype":"",'
            + '"_dataid":"VideoDetails_Select","_timestamp":1522118544,'
            + '"_source":"weixin","_platform":"h5","_equipment":"","_version":"",'
            + '"_userid":"","_param":{"VideoID":"' + this.ids + '"},'
            + '"_sign":"d7efac0b2ea6b8025de58a686f6159b0","dataType":"json"}';
            $.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                url: urls,
                data: data,
                success: function (res) {
                    that.render(res.data[0]);
                }
            });
        },

        createHtml: function (res) {
            var remmendList = res.RecommendAudioColumn || [];
            if (!res || remmendList.length <= 0) {
                return;
            }

            var str = '';
            for (var i = 0, len = remmendList.length; i < len; i++) {
                str += '<a class="sytown-flex list-item" href=' + this.ALINK + '?id=' + remmendList[i].VideoID + '>'
                            + '<div class="flex-none list-none">'
                                + '<i class="icon-play"></i>'
                                + '<img src="' + remmendList[i].PicturePath + '" alt="">'
                                + '<span class="timer">' + remmendList[i].duration + '</span>'
                            + '</div>'
                            + '<div class="flex-1 list-content">'
                                + '<h6 class="title">' + remmendList[i].VideoName + '</h6>'
                                + '<div class="doctor-info">'
                                    + '<img src="' + res.AnchorDoctorsAvatar + '" alt="" class="doctor-img">'
                                    + '<span class="doctor-span">' + res.AnchorDoctorsDepartments + '</span>'
                                    + '<span class="doctor-span">' + res.AnchorDoctorsHospital + '</span>'
                                + '</div>'
                            + '</div>'
                        + '</a>';
            }
            return str;
        },

        render: function (res) {
            var str = this.createHtml(res);
            if (!str || str.length <= 0) {
                return;
            }

            var parentDom = '<section class="list-panel">'
                                + '<h5 class="sytown-flex flex-align panel-title">推荐</h5>'
                                + '<div class="panel-body">'
                                    + str
                                + '</div>'
                            + '</section>';
            this.el.innerHTML = parentDom;
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        sytownList.init(element);
    };

    return customElement;
});
