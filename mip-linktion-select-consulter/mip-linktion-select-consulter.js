/**
 * @file mip-linktion-select-consulter 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var templateBox = $el.find('#template_box');
        var templates = require('templates');
        var domainsrc = $el.find('#planner_more').data('src');
        var type = $el.find('#planner_more').data('type');
        var change = $el.find('#change');
        var synthesize = $el.find('#synthesize');
        var hot = $el.find('#hot');
        var level = $el.find('#level');

        function sendData(consultUrl, bodyData) {
            fetch(consultUrl, {
                method: 'POST', // or 'PUT'
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bodyData)// data can be `string` or {object}!
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.code === 0) {
                    window.location.reload();
                }
                else {
                    console.log(data.error);
                }
            });
        }
        function fetchfun($el, templateBox, templates, src, type) {
            fetch(src)
            .then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.data) {
                    var items = [];
                    if (type === 'items' && data.status === 0) {
                        items = data.data.items;
                    }
                    else if (type === 'planners' && data.code === 0) {
                        items = data.data.planners;
                    }
                    var html = '';
                    var taghtml = '';
                    items.forEach(function (items) {
                        taghtml = foreachTags(items);
                        html += '<div class="col-lg-4 col-xs-6 col-sm-4 financial-card financial-search-card clearfix">'
                                + '<div class="person-card consult-box financial-planner-box" '
                                + 'data-plannerid=' + items.id + 'data-productid=' + items.id
                                    + 'data-consulturl="http://www.caifu.org/product/consult">'
                                    + '<div class="click-lightbox slide-up">'
                                        + '<button type="button" class="click-hidden">&times;</button>'
                                        + '<h3>咨询TA</h3>'
                                        + '<p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>'
                                        + '<mip-form class="consult-form pc-form" url="https://">'
                                            + '<div class="form-group-input">'
                                                + '<label>姓名</label>'
                                                + '<input type="text" name="name" placeholder="请输入姓名"'
                                                    + 'value="" required="required">'
                                            + '</div>'
                                            + '<div class="form-group-input">'
                                                + '<label>手机</label>'
                                                + '<input type="number" name="phone" placeholder="请输入手机号"'
                                                        + 'value="" required="required">'
                                            + '</div>'
                                            + '<h4 class="checkbox-head">首选联系时间</h4>'
                                            + '<div class="checkbox-flex">'
                                                + '<div class="form-group-checkbox">'
                                                    + '<input type="radio" name=' + items.id + 'day'
                                                    + 'value="1" id=' + items.id + 'day required="required">'
                                                    + '<label for="times-am">白天</label>'
                                                + '</div>'
                                                + '<div class="form-group-checkbox">'
                                                    + '<input type="radio" name=' + items.id
                                                    + 'night value="2" id=' + items.id + 'night required="required">'
                                                    + '<label for="times-pm">晚间</label>'
                                                + '</div>'
                                                + '<div class="form-group-checkbox">'
                                                    + '<input type="radio" name=' + items.id
                                                    + 'anytimes value="3" id=' + items.id
                                                    + 'anytimes required="required">'
                                                    + '<label for="anytimes">任何时刻</label>'
                                                + '</div>'
                                            + '</div>'
                                            + '<button type="button" class="but-submit consult-submit">提交</button>'
                                        + '</mip-form>'
                                    + '</div>'
                                    + '<div class="card-box">'
                                        + '<div class="planner-head">'
                                            + '<mip-img src=' + items.avatar + '></mip-img>'
                                        + '</div>'
                                        + '<div class="info-text">'
                                            + '<div class="text-name">'
                                                + '<p class="planner-name">'
                                                    + items.name + '</p>'
                                                + '<p class="planner-post">咨询顾问</p>'
                                            + '</div>'
                                            + '<div class="planner-label">'
                                                + '<p class="txt-major">专业领域</p>'
                                                + taghtml
                                            + '</div>'
                                        + '</div>'
                                        + '<div class="person-info-txt">'
                                            + '<p>推荐理财师的范围均为购买了此营销视频的理财师；若，15天内，此理财师已经</p>'
                                        + '</div>'
                                    + '</div>'
                                    + '<div class="card-but">'
                                        + '<a href="/planner/' + items.id + '"><button class="planner-submit-about"'
                                            + '>了解TA'
                                        + '</button><a>'
                                        + '<button class="planner-submit-consult but-advisory">咨询TA'
                                        + '</button>'
                                        + '<button class="planner-submit-consult3">咨询中'
                                        + '</button> '
                                    + '</div>'
                                    + '<div class="card-phone-but">'
                                        + '<button class="planner-submit-consult2 but-advisory"'
                                                + 'th:if="${planner != null && planner.consulStatus != 0}"'
                                                + 'on="tap:planner-more.toggle tap:modal-consult.toggle'
                                                + 'tap:MIP.setData({plannerid:' + items.id
                                                + ',productid:' + items.id + '})">'
                                            + '咨询TA'
                                        + '</button>'
                                        + '<!-- 移动端咨询中 -->'
                                        + '<!-- <button class="planner-submit-consult2">咨询中</button> -->'
                                    + '</div>'
                                + '</div>'
                            + '</div>';
                    });
                    templateBox.html(html);
                }
            });
        }
        function foreachTags(items) {
            var taghtml = '';
            if (items.plannerInfo) {
                var workDomains =  items.plannerInfo.workDomains;
                workDomains.forEach(function (itemtag) {
                    taghtml += '<p class="card-label">' + itemtag + ' </p>';
                });
            }
            return taghtml;
        }
        function valifypopValue($el) {
            $el.find('.card-but .but-advisory').on('click', function () {
                $(this).parent().siblings('.click-lightbox').removeClass('slide-up').addClass('slide');
            });
            $el.find('.click-lightbox .click-hidden').on('click', function () {
                $(this).parent('.click-lightbox').removeClass('slide').addClass('slide-up');
            });
            $el.find('.planner-submit-consult').on('click', function () {
                $(this).siblings('.click-lightbox').removeClass('slideUp').addClass('slide');
            });
            $el.find('.but-submit.consult-submit').on('click', function () {
                var inputName = $(this).siblings('.form-group-input').children('input[name="name"]').val();
                var inputPhone = $(this).siblings('.form-group-input').children('input[name="phone"]').val();
                var checkboxArry = $(this).siblings('.checkbox-flex').children('.form-group-checkbox');
                var checkboxR = checkboxArry.children('input[type=radio]:checked').val();
                var plannerId = $(this).parents('.consult-box').data('plannerid');
                var productId = $(this).parents('.consult-box').data('productid');
                var consultUrl = $(this).parents('.consult-box').data('consulturl');
                var phoneForm = $el.find('.phone-form')[0];
                if ($(window).width() < 769) {
                    if (phoneForm.reportValidity()) {
                        var bodyData = {
                            productId: productId,
                            userName: inputName,
                            userMobile: inputPhone,
                            contactTime: checkboxR,
                            plannerId: plannerId
                        };
                        sendData(consultUrl, bodyData);
                    }
                }
                else {
                    if (inputName === '') {
                        alert('请填写姓名');
                    }
                    else if (inputPhone === '') {
                        alert('请填写电话');
                    }
                    else if (checkboxR === undefined) {
                        alert('请选择时间');
                    }
                    else {
                        var bodyData = {
                            productId: productId,
                            userName: inputName,
                            userMobile: inputPhone,
                            contactTime: checkboxR,
                            plannerId: plannerId
                        };
                        sendData(consultUrl, bodyData);
                    }
                }

            });
        }
        if (type === 'change') {
            // fetchfun($el, templateBox, templates, src, 'items');
            change.on('click', function () {
                fetchfun($el, templateBox, templates, domainsrc, 'items');
            });
        }
        else if (type === 'planners') {
            // fetchfun($el, templateBox, templates, src, 'planners');
            hot.on('click', function () {
                var src = domainsrc + '?hot=1';
                fetchfun($el, templateBox, templates, src, 'planners');
            });
            level.on('change', function () {
                if ($(this).val() !== '') {
                    var src = domainsrc + '?level=' + $(this).val();
                    fetchfun($el, templateBox, templates, src, 'planners');
                }
            });
            synthesize.on('click', function () {
                fetchfun($el, templateBox, templates, domainsrc, 'planners');
            });
        }
    };
    return customElement;
});
