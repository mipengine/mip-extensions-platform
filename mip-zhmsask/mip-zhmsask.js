/**
 * @file mip-zhmsask 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var sexSelectSpans = element.querySelectorAll('span');
        var Sex = 1;
        sexSelectSpans.forEach(function (v, i) {
            v.addEventListener('click', function () {
                v.classList.add('mip-zhmsask-cur');
                Sex = v.getAttribute('data-value');
                if (i === 0) {
                    v.nextElementSibling.classList.remove('mip-zhmsask-cur');
                }
                else {
                    v.previousElementSibling.classList.remove('mip-zhmsask-cur');
                }
            }, false);
        });
        var isSubmit = false;
        var submitBtn = element.querySelector('.mip-zhmsask-submit-btn');
        submitBtn.addEventListener('click', function () {
            if (isSubmit) {
                return false;
            }
            isSubmit = true;
            var data = {};
            data.MerchantId = element.getAttribute('merchantid');
            data.BrandId = element.getAttribute('brandid');
            data.CategoryId = element.getAttribute('cateid');
            data.SourceUrl = element.getAttribute('source');
            data.ProvinceId = element.getAttribute('pid');
            data.CityId = element.getAttribute('cid');
            data.Nickname = element.querySelector('input[name="nickname"]').value;
            data.Sex = Sex;
            data.Tel = element.querySelector('input[name="tel"]').value;
            data.Weixin = element.querySelector('input[name="weixin"]').value;
            data.QQ = element.querySelector('input[name="qq"]').value;
            data.Question = element.querySelector('textarea[name="question"]').value;
            var opts = {
                method: 'POST',
                body: JSON.stringify(data)
            };
            fetch('https://mip.zhms.cn/brand/addconsultation/', opts)
            .then(function (response) {
                isSubmit = false;
                return response.json();
            })
            .then(function (res) {
                if (res.state !== 0) {
                    alert(res.msg);
                }
                else {
                    element.querySelector('input[name="nickname"]').value = '';
                    element.querySelector('input[name="tel"]').value = '';
                    element.querySelector('input[name="weixin"]').value = '';
                    element.querySelector('input[name="qq"]').value = '';
                    element.querySelector('textarea[name="question"]').value = '';
                    alert('咨询提交成功');
                }
                isSubmit = false;
            })
            .catch(function (res) {
                isSubmit = false;
                alert('提交失败');
            });
            return false;
        });
    };
    return customElement;
});
