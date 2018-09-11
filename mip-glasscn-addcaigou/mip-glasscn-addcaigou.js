/**
 * @file mip-glasscn-addcaigou 组件
 * @author
 */

define(function (require) {
    'use strict';
    var baseUrl = 'https://api.glass.cn/api/v1/GlassCn';
    var $ = require('jquery');
    var customElement = require('customElement').create();
    var tpl = '<div class="caigouTips" style="display: none;">'
        + '<div class="layui-layer-title" style="cursor: move;">快速采购留言</div>'
        + '<div id="" class="layui-layer-content">'
        + '<div class="memberhfform layui-layer-wrap" id="memberbox" style="padding:10px;">'
        + '<dl>'
        + '<dt><em>称呼</em><input type="text" name="name" class="logintxt" placeholder="请输入称呼" maxlength="10"></dt>'
        + '<dt><em>手机</em><input type="text" name="tel" class="regtxt" placeholder="请输入您的手机号码" maxlength="11"></dt>'
        + '<dt><em>留言</em><textarea name="content" cols="" rows=""'
        + 'placeholder="输入您的留言" class="textarea roundimgx"></textarea></dt>'
        + '<dt id="addCaigouCode" style="display:none;"><em>验证码</em><input type="text"'
        + 'name="checkcode" class="yanzhengma" placeholder="请输入验证码" maxlength="4">'
        + '<span class="ercodeBox"><img src="" id="addCaigouImg" /></span></dt>'
        + '<dd><input id="lytj" type="button" onclick="" value="提交留言" class="tjhfbut roundimgx"></dd>'
        + '</dl>'
        + '</div>'
        + '</div>'
        + '<span class="layui-layer-setwin" id="closeAddCaigou">'
        + '<a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;">x</a></span>'
        + '<span class="layui-layer-resize"></span>'
        + '</div>';
    var cover = '<div class="layui-layer-shade" id="layui-layer-shade3" times="3" '
       + 'style="z-index: 19891016; background-color: rgb(0, 0, 0); opacity: 0.3; display: none;"></div>';
    var purchaseClose = function () {
        $('.caigouTips').hide();
        $('#layui-layer-shade3').hide();
    };
    var purchaseShow = function () {
        $('.caigouTips').show();
        $('#layui-layer-shade3').show();
    };
    var purchaseGetCheckCode = function (func) {
        var imgUrl = baseUrl + '/Purchase/GetAddPurchaseCode?v=' + Date.parse(new Date());
        $('#addCaigouCode').find('.ercode').show();
        $('#addCaigouImg').attr('src', imgUrl);
        if (func !== undefined) {
            window.setTimeout(function () {
                func();
            }, 100);
        }
    };
    var purchaseAlert = function (content) {
        alert(content);
    };
    var purchaseDoAdd = function () {
        var fullName = $.trim($('.caigouTips').find('input[name=name]').val());
        var mobile = $.trim($('.caigouTips').find('input[name=tel]').val());
        var content = $.trim($('.caigouTips').find('textarea').val());
        var checkcode = $.trim($('.caigouTips').find('input[name=checkcode]').val());
        if (fullName === '') {
            alert('请输入称呼');
            return;
        } else if (mobile === '') {
            alert('请输入手机号码');
            return;
        } else if (content === '') {
            alert('请输入采购留言');
            return;
        }
        $.ajax({
            type: 'POST',
            url: baseUrl + '/Purchase/AddPurchaseInfos?v=' + Date.parse(new Date()),
            data: {
                fullName: fullName,
                mobile: mobile,
                content: content,
                checkcode: checkcode,
                posttype: 'mobile'
            },
            dataType: 'json',
            success: function (res) {
                if (res.result === true) {
                    purchaseAlert(res.title);
                    purchaseClose();
                    $('.caigouTips').find('input[name=name]').val('');
                    $('.caigouTips').find('input[name=tel]').val('');
                    $('.caigouTips').find('textarea').val('');
                    $('.caigouTips').find('input[name=checkcode]').val('');
                } else {
                    if (res.content === 'InputCheckCode') {
                        $('#addCaigouCode').show();
                        purchaseGetCheckCode(function () {
                            alert('请输入验证码');
                        });

                    } else if (res.content === 'CheckCodeWrong') {
                        alert('验证码错误');
                    } else if (res.content === 'OverMax') {
                        purchaseAlert(res.title);
                    }
                }
            }
        });
    };
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        element.addEventListener('click', function () {
            if ($('.caigouTips').length === 0) {
                $('body').append(tpl);
                $('#closeAddCaigou').click(function () {
                    purchaseClose();
                });
                $('.ercodeBox').click(function () {
                    purchaseGetCheckCode();
                });
                $('#lytj').off().click(function () {
                    purchaseDoAdd();
                });
            }
            if ($('#layui-layer-shade3').length === 0) {
                $('body').append(cover);
            }
            purchaseShow();
        });


    };
    return customElement;
});
