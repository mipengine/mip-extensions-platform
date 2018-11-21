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
        var changeTemplateBox = $el.find('#change_template_box');
        var templates = require('templates');
        var domainsrc = $el.find('#planner_more').data('src');
        var type = $el.find('#planner_more').data('type');
        var change = $el.find('#change');
        var synthesize = $el.find('#synthesize');
        var hot = $el.find('#hot');
        var level = $el.find('#level');
        function sendData(consultUrl, bodyData, that) {
            fetch(consultUrl, {
                method: 'POST', // or 'PUT'
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bodyData)// data can be `string` or {object}!
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.code === 0) {
                    if ($(window).width() < 769) {
                        // that.parents('.click-lightbox-phone').siblings('.modal-header').children('.close').trigger('click');
                        // $el.find('.active-consult').text('咨询中').removeClass('but-advisory').addClass('consulting');
                        showTips('发送成功', 'success');
                        reload();
                    } else {
                        showTips('发送成功', 'success');
                        that.parents('.click-lightbox').children('.click-hidden').click();
                        that.parents('.click-lightbox').siblings('.card-but')
                        .children('.but-advisory').text('咨询中').removeClass('but-advisory')
                        .addClass('consulting').off('click');
                    }
                }
                else {
                    console.log(data.error);
                }
            });
        }
        function reload() {
            setTimeout(function () {
                window.location.reload();
            }, 3000);
        }
        function fetchfun($el, templateBox, templates, src, type, productid) {
            fetch(src)
            .then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.data) {
                    if (type === 'items' && data.status === 0) {
                        var changeItems = data.data.items;
                        var changehtml = '';
                        var changeTagHtml = '';
                        var changeReturnHtml = '';
                        var changeHasAvatar = '';
                        changeItems.forEach(function (items) {
                            changeTagHtml = foreachTags(items);
                            changeReturnHtml = ifConsulting(items);
                            changeHasAvatar = hasAvatar(items);
                            changehtml += '<div class="consult-box" data-plannerid=' + items.id
                                        + ' data-productid=' + productid
                                        + ' data-consulturl="http://www.caifu.org/product/consult">'
                                        + '<div class="person-card">'
                                        // + '<div class="click-lightbox slide-up">'
                                        //     + '<button type="button" class="click-hidden">&times;</button>'
                                        //     + '<h3>咨询TA</h3>'
                                        //     + '<p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>'
                                        //     + '<mip-form class="consult-form pc-form" url="https://">'
                                        //         + '<div class="form-group-input">'
                                        //             + '<label>姓名</label>'
                                        //             + '<input type="text" name="name" placeholder="请输入姓名"'
                                        //             + 'required="required"}">'
                                        //         + '</div>'
                                        //         + '<div class="form-group-input">'
                                        //             + '<label>手机</label>'
                                        //             + '<input type="number" name="phone" placeholder="请输入手机号"'
                                        //             + 'required="required"}">'
                                        //         + '</div>'
                                        //         + '<h4 class="checkbox-head">首选联系时间</h4>'
                                        //         + '<div class="checkbox-flex">'
                                        //             + '<div class="form-group-checkbox">'
                                        //                 + '<input type="radio" name="times" id="' + items.id
                                        //                 + 'day" value="1" required="required">'
                                        //                 + '<label for="' + items.id + 'day">白天</label>'
                                        //             + '</div>'
                                        //             + '<div class="form-group-checkbox">'
                                        //                 + '<input type="radio" name="times" id="' + items.id
                                        //                 + 'night " value="2" required="required">'
                                        //                 + '<label for="' + items.id + 'night ">晚间</label>'
                                        //             + '</div>'
                                        //             + '<div class="form-group-checkbox">'
                                        //                 + '<input type="radio" name="times" id="' + items.id
                                        //                 + 'anytime" value="3" required="required">'
                                        //                 + '<label for="' + items.id + 'anytime">任何时刻</label>'
                                        //             + '</div>'
                                        //         + '</div>'
                                        //         + '<button type="button" class="but-submit consult-submit">提交</button>'
                                        //     + '</mip-form>'
                                        // + '</div>'
                                        + '<div class="card-box">'
                                            + '<div class="person-icon">'
                                                + '<mip-img src=' + changeHasAvatar + '></mip-img>'
                                            + '</div>'
                                            + '<div class="info-text">'
                                                + '<div class="text-name">'
                                                    + '<p class="person-name">' + items.name + '</p>'
                                                    + '<p class="person-info"> ' + items.gradeName + '</p>'
                                                + '</div>'
                                                + '<div class="info-label">'
                                                    + changeTagHtml
                                                + '</div>'
                                            + '</div>'
                                            + '<div class="person-info-txt">'
                                                + '<p>推荐理财师的范围均为购买了此营销视频的理财师；若，15天内，此理财师已经</p>'
                                            + '</div>'
                                        + '</div>'
                                        + '<div class="card-but">'
                                            + '<a href="/planner/' + items.id + '" class="but-about">了解TA</a>'
                                            // + changeReturnHtml
                                        + '</div>'
                                    + '</div>'
                                + '</div>';
                        });
                        changeTemplateBox.html(changehtml);
                        valifypopValue($el, productid);
                    }
                    else if (type === 'planners' && data.code === 0) {
                        var items = data.data.planners;
                        var html = '';
                        var taghtml = '';
                        var returnHtml = '';
                        var returnPhoneHtml = '';
                        var returnAvatar = '';
                        items.forEach(function (items) {
                            taghtml = foreachTags(items);
                            returnHtml = ifConsultingPlanner(items);
                            returnPhoneHtml = ifPhoneConsultingPlanner(items);
                            returnAvatar = hasAvatar(items);
                            html += '<div class="col-lg-4 col-xs-6 col-sm-4'
                                    + ' clearfix">'
                                    + '<div class="person-card consult-box"'
                                    + ' data-plannerid=' + items.id + ' data-productid=' +  productid
                                        + ' data-consulturl="http://www.caifu.org/product/consult">'
                                        // + '<div class="click-lightbox slide-up">'
                                        //     + '<button type="button" class="click-hidden">&times;</button>'
                                        //     + '<h3>咨询TA</h3>'
                                        //     + '<p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>'
                                        //     + '<mip-form class="consult-form pc-form" url="https://">'
                                        //         + '<div class="form-group-input">'
                                        //             + '<label>姓名</label>'
                                        //             + '<input type="text" name="name" placeholder="请输入姓名"'
                                        //                 + ' value="" required="required">'
                                        //         + '</div>'
                                        //         + '<div class="form-group-input">'
                                        //             + '<label>手机</label>'
                                        //             + '<input type="number" name="phone" placeholder="请输入手机号"'
                                        //                     + ' value="" required="required">'
                                        //         + '</div>'
                                        //         + '<h4 class="checkbox-head">首选联系时间</h4>'
                                        //         + '<div class="checkbox-flex">'
                                        //             + '<div class="form-group-checkbox">'
                                        //                 + '<input type="radio" name="picktime"'
                                        //                 + ' value="1" id=' + items.id + 'day required="required">'
                                        //                 + '<label for=' + items.id + 'day>白天</label>'
                                        //             + '</div>'
                                        //             + '<div class="form-group-checkbox">'
                                        //                 + '<input type="radio" name="picktime"'
                                        //                 + ' value="2" id=' + items.id
                                        //                 + 'night required="required">'
                                        //                 + '<label for=' + items.id + 'night>晚间</label>'
                                        //             + '</div>'
                                        //             + '<div class="form-group-checkbox">'
                                        //                 + '<input type="radio" name="picktime"'
                                        //                 + ' value="3" id=' + items.id
                                        //                 + 'anytimes required="required">'
                                        //                 + '<label for=' + items.id + 'anytimes>任何时刻</label>'
                                        //             + '</div>'
                                        //         + '</div>'
                                        //         + '<button type="button" class="but-submit consult-submit">提交</button>'
                                        //     + '</mip-form>'
                                        // + '</div>'
                                        + '<div class="card-box">'
                                            + '<div class="person-icon">'
                                                + '<mip-img src=' + returnAvatar + ' ></mip-img>'
                                            + '</div>'
                                            + '<div class="info-text">'
                                                + '<div class="text-name">'
                                                    + '<p class="planner-name">'
                                                        + items.name + '</p>'
                                                    + '<p class="planner-post"> ' + items.gradeName + '</p>'
                                                + '</div>'
                                                + '<div class="planner-label">'
                                                    + taghtml
                                                + '</div>'
                                            + '</div>'
                                        + '</div>'
                                        + '<div class="card-but">'
                                            + '<a href="/planner/' + items.id + '"><button class="but-about"'
                                                + '>了解TA'
                                            + '</button></a>'
                                            // + returnHtml
                                        + '</div>'
                                        + '<div class="card-phone-but">'
                                        // + returnPhoneHtml
                                            + '<a href="/planner/' + items.id + '"><button class="but-about"'
                                                + '>了解TA'
                                            + '</button></a>'
                                        + '</div>'
                                    + '</div>'
                                + '</div>';
                        });
                        templateBox.html(html);
                        valifypopValue($el, productid);
                    }
                }
            });
        }
        function hasAvatar(items) {
            var returnAvatar = '';
            if (items.avatar) {
                returnAvatar = items.avatar;
            } else {
                returnAvatar = '/img/head.jpg';
            }
            return returnAvatar;
        }
        function ifPhoneConsultingPlanner(items) {
            var returnPhoneHtml = '';
            if (items.consulStatus === 0) {
                returnPhoneHtml = '<button class="planner-submit-consult2 but-about"'
                            + 'on="tap:planner-more.toggle tap:modal-consult.toggle'
                            + ' tap:MIP.setData({plannerid:' + items.id
                            + ',productid:' + items.id + '})">'
                            + '咨询TA'
                            + '</button>';
            }
            else if (items.consulStatus === 1) {
                returnPhoneHtml = '<button class="planner-submit-consult2">咨询中</button>';
            }
            return returnPhoneHtml;
        }
        function ifConsultingPlanner(items) {
            var returnPlannerHtml = '';
            if (items.consulStatus === 0) {
                returnPlannerHtml = ' <button class="planner-submit-consult but-advisory" type="button" >咨询TA</button>';
            }
            else if (items.consulStatus === 1) {
                returnPlannerHtml = ' <button class="planner-submit-consult3" type="button">咨询中</button>';
            }
            return returnPlannerHtml;
        }
        function ifConsulting(items) {
            var returnHtml = '';
            if (items.consulStatus === 0) {
                returnHtml = ' <button class="but-advisory" type="button">咨询TA</button>';
            }
            else if (items.consulStatus === 1) {
                returnHtml = ' <button type="button" class="but-during">咨询中</button>';
            }
            return returnHtml;
        }
        function foreachTags(items) {
            var taghtml = '';
            if (items.plannerInfo) {
                taghtml = '<p class="txt-major">专业领域</p>';
                var workDomains =  items.plannerInfo.workDomains;
                workDomains.forEach(function (itemtag) {
                    taghtml += '<p class="card-label">' + itemtag + ' </p>';
                });
            }
            return taghtml;
        }
        function hideHints() {
            setTimeout(function () {
                $el.find('.web-hint').fadeOut();
            }, 6000);
        }
        function showTips(text, status) {
            var hintsHtml = '';
            if (status === 'err') {
                hintsHtml = '<div class="web-error web-hint">'
                            + '<p>' + text + '</p>'
                            + '</div>';
            }
            else if (status === 'success') {
                hintsHtml = '<div class="web-hint web-succeed">'
                            + ' <p>' + text + '</p>'
                            + ' </div>';
            }
            $el.find('.hints').html(hintsHtml);
            hideHints();
        }
        function valifypopValue($el, productid) {
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
                var plannerId = '';
                var consultUrl = '';
                var inputName = $(this).siblings('.form-group-input').children('input[name="name"]').val();
                var inputPhone = $(this).siblings('.form-group-input').children('input[name="phone"]').val();
                var checkboxArry = $(this).siblings('.checkbox-flex').children('.form-group-checkbox');
                var checkboxR = checkboxArry.children('input[type=radio]:checked').val();
                plannerId = $(this).parents('.consult-box').data('plannerid');
                consultUrl = $(this).parents('.consult-box').data('consulturl');
                if (inputName === '') {
                    showTips('请填写姓名', 'err');
                }
                else if (inputPhone === '') {
                    showTips('请填写手机号码', 'err');
                }
                else if (inputPhone.length !== 11) {
                    showTips('请填写完整的手机号码', 'err');
                }
                else if (checkboxR === undefined) {
                    showTips('请选联系择时间', 'err');
                }
                else if ($(window).width() < 769) {
                    plannerId = $(this).parents('.click-lightbox-phone').data('plannerid');
                    var productId = $(this).parents('.click-lightbox-phone').data('productid');
                    consultUrl = $(this).parents('.click-lightbox-phone').data('consulturl');
                    var bodyData = {
                        productId: productId,
                        userName: inputName,
                        userMobile: inputPhone,
                        contactTime: checkboxR,
                        plannerId: plannerId
                    };
                    sendData(consultUrl, bodyData, $(this));
                }
                else {
                    var bodyData = {
                        productId: productid,
                        userName: inputName,
                        userMobile: inputPhone,
                        contactTime: checkboxR,
                        plannerId: plannerId
                    };
                    sendData(consultUrl, bodyData, $(this));
                }
            });

        }
        if (type === 'change') {
            change.on('click', function (e) {
                var productid = $(this).data('productid');
                console.log(productid);
                if (productid !== undefined) {
                    var src = domainsrc + '?&productId=' + productid;
                } else {
                    var src = domainsrc;
                }
                fetchfun($el, templateBox, templates, src, 'items', productid);
            });
        }
        else if (type === 'planners') {
            hot.on('click', function () {
                var productid = $(this).parents('.more-wrap-productid').data('productid');
                console.log(productid);
                if (productid !== undefined) {
                    var src = domainsrc + '?hot=1' + '&productId=' +  productid;
                } else {
                    var src = domainsrc + '?hot=1';
                }
                fetchfun($el, templateBox, templates, src, 'planners', productid);
            });
            level.on('change', function () {
                if ($(this).val() !== '') {
                    var productid = $(this).parents('.more-wrap-productid').data('productid');
                    console.log(productid);
                    if (productid !== undefined) {
                        var src = domainsrc + '?level=' + $(this).val() + '&productId=' + productid;
                    } else {
                        var src = domainsrc + '?level=' + $(this).val();
                    }
                    fetchfun($el, templateBox, templates, src, 'planners', productid);
                }
            });
            synthesize.on('click', function () {
                var productid = $(this).parents('.more-wrap-productid').data('productid');
                console.log(productid);
                if (productid !== undefined) {
                    var src = domainsrc + '?&productId=' + productid;
                } else {
                    var src = domainsrc;
                }
                fetchfun($el, templateBox, templates, src, 'planners', productid);
            });
        }
    };
    return customElement;
});
