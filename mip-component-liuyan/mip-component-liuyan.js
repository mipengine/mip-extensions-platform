/**
 * @file mip-component-liuyan 组件
 * @author
 */
define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var viewport = require('viewport');
        var element = this.element;
        var submiting = false;
        var mask = element.querySelector('.mask');
        var btnClose = element.querySelector('.close');
        var formSelector = '.' + element.dataset.type;
        var isFreetalk = element.dataset.type === 'freetalk';
        var fetchUrl = element.dataset.fetchurl;

        var open = function (userid) {
            var form = mask.querySelector(formSelector);
            if (!form) {
                var sForm = element.querySelector(formSelector);
                form = sForm.cloneNode(true);
                form.classList.remove('hidden');
                mask.appendChild(form);
                form.querySelector('.close').classList.remove('hidden');
                form.querySelector('.submit').addEventListener('click', submit);
            }
            if (userid) {
                form.querySelector('.UserID').value = userid;
            }
            mask.style.display = 'block';
            setTimeout(function () {
                mask.classList.add('show');
            }, 0);
        };
        var close = function () {
            if (event.target === mask || event.target.classList.contains('close')) {
                mask.classList.remove('show');
                setTimeout(function () {
                    mask.style.display = 'none';
                }, 300);
            }
        };

        var getFormObjData = function (form) {
            var formData = {
                UserID: form.querySelector('[name=UserID]').value.trim(),
                Phone: form.querySelector('[name=Phone]').value.trim()
            };
            if (!isFreetalk) {
                var sexDom = form.querySelector('[name=Sex]:checked');
                formData.Sex = sexDom ? sexDom.value.trim() : '先生';
                formData.Name = form.querySelector('[name=Name]').value.trim();
                formData.Content = form.querySelector('[name=Content]').value.trim();
            }
            return formData;
        };

        var toFormData = function (obj) {
            var formData = new FormData();
            for (var key in obj) {
                formData.append(key, obj[key]);
            };
            return formData;
        };

        var checkForm = function (formData) {
            if (!isFreetalk && !formData.Name) {
                return '姓名不能为空';
            }
            if (!formData.Phone) {
                return '手机号码不能为空';
            } else {
                var reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (!reg.exec(formData.Phone)) {
                    return '手机号码格式不正确';
                }
            }
        };

        var submit = function () {
            if (submiting) {
                return;
            }
            submiting = true;
            var form = event.target.closest(formSelector);
            var formData = getFormObjData(form);
            var checkResult = checkForm(formData);
            if (checkResult) {
                alert(checkResult);
                submiting = false;
                return;
            }
            if (!formData.Content) {
                formData.Content = '对此项目很感兴趣，想加盟，请速与我联系';
            }
            fetch(fetchUrl, {
                method: 'POST',
                body: toFormData(formData)
            }).then(function (response) {
                return response.text();
            });

            submiting = false;
            if (isFreetalk) {
                form.appendChild(dialog.get('留言发送提示', '我们将稍后和您联系，请保持电话畅通！', true));
            } else {
                form.appendChild(dialog.get('留言发送提示', '谢谢关注，留言已提交成功！', true));
            }
        };

        // 提交返回的样式框
        var dialog = {
            get: function (headInfo, contentInfo, isShowWx) {

                var domDialog = document.createElement('div');
                domDialog.className = 'dialog';

                var domHead = document.createElement('div');
                domHead.className = 'dialog-head';
                domHead.innerText = headInfo;
                domHead.addEventListener('click', dialog.close);

                var domContent = document.createElement('div');
                domContent.className = 'dialog-content';

                var domInfo = document.createElement('p');
                domInfo.innerText = contentInfo;

                domDialog.appendChild(domHead);
                domDialog.appendChild(domContent);
                domContent.appendChild(domInfo);

                return domDialog;
            },
            close: function () {
                event.target.closest('.dialog').remove();
            }
        };

        this.addEventAction('open', function (event, userid) {
            open(userid);
        });
        mask.addEventListener('click', close);
        btnClose.addEventListener('click', close);
        element.querySelector('.submit').addEventListener('click', submit);
    };
    customElement.prototype.prerenderAllowed = function () {
        return true;
    };
    return customElement;
});