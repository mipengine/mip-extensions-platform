/**
 * @file mip-qz-fadan 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {

        var ele = this.element;
        var configItem = {
            address: ele.getAttribute('address'),
            name: ele.getAttribute('name'),
            phone: ele.getAttribute('phone'),
            size: ele.getAttribute('size'),
            area: ele.getAttribute('area')
        };
        var url =  ele.getAttribute('url');
        var btnText = ele.getAttribute('btnText');
        var domArray = {
            address: {
                dom: '<div class="qz_input_box"><input type="text" name="address"'
                + 'placeholder="请选择您所在地址" class="address"></div>'
            },
            name: {
                dom: '<div class="qz_input_box">'
                + '<input type="text" name="name" placeholder="怎么称呼您" class="name"></div>'
            },
            phone: {
                dom: '<div class="qz_input_box">'
                + '<input type="tel" name="phone" placeholder="输入您的手机号获取设计方案" class="phone" maxlength="11"></div>'
            },
            size: {
                dom: '<div class="qz_input_box">'
                + '<input type="number" name="mianji" placeholder="请输入您的房屋面积" class="mianji" maxlength="4">'
                + '<span>㎡</span></div>'
            },
            area: {
                dom: '<div class="qz_input_box"><input  name="xiaoqu" placeholder="填写小区名称以便准确匹配" class="xiaoqu"></div>'
            }
        };
        var baseDom = '<div class="qz_content_box"> <form action=' + url + ' class="qz_fadan_form">';
        for (var i in configItem) {
            if (configItem[i]) {
                baseDom = baseDom + domArray[i].dom;
            }
        }

        baseDom = baseDom + '<div class="qz_disclamer">'
        + '<input type="checkbox" class="checked" checked="checked">'
        + '<span>我已阅读并同意齐装网的</span><a href="http://m.qizuang.com/about/disclaimer">《免责申明》<u></u></a></div>'
        + '<div class="qz_input_box no_border"><div class="qz_get_button">' + btnText + '</div></div></form></div>';
        ele.innerHTML = baseDom;
        var button = ele.getElementsByClassName('qz_get_button')[0];
        if (url) {
            ele.getElementsByClassName('qz_fadan_form')[0].action = url;
        } else {
            console.error('表单提交地址不能为空');
            return false;
        }

        button.addEventListener('click', function () {
            for (var i in configItem) {
                if (configItem[i]) {
                    var classNode = ele.getElementsByClassName(configItem[i])[0];
                    switch (configItem[i]) {
                        case 'address':
                            var address = ele.getElementsByClassName('address')[0];
                            if (checkNull(address.value)) {
                                alert('请选择您所在地址');
                                address.focus();
                                return false;
                            }

                            break;
                        case 'name':
                            var name = ele.getElementsByClassName('name')[0];
                            if (checkNull(name.value)) {
                                alert('请输入您的称呼');
                                name.focus();
                                return false;
                            }

                            break;
                        case 'phone':
                            var phone = ele.getElementsByClassName('phone')[0];
                            if (telReg(phone.value)) {
                                alert('请输入正确的手机号码');
                                phone.focus();
                                return false;
                            }

                            break;
                        case 'mianji':
                            var size = ele.getElementsByClassName('mianji')[0];
                            if (checkNull(size.value)) {
                                alert('房屋面积不能为空');
                                size.focus();
                                return false;
                            }

                            if (size.value > 10000) {
                                alert('房屋面积不能超过10000');
                                size.focus();
                                return false;
                            }

                            break;
                        case 'xiaoqu':
                            var area = ele.getElementsByClassName('xiaoqu')[0];
                            if (checkNull(area.value)) {
                                alert('请输入您所在的小区');
                                area.focus();
                                return false;
                            }

                            if (!isNaN(area.value)) {
                                alert('小区名不能为纯数字');
                                area.focus();
                                return false;
                            }
                            break;
                    }
                }
            }
            this.parentNode.parentNode.submit();
        });
    };

    // 手机验证
    function telReg(tel) {
        var str = '^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$';
        var newReg = new RegExp(str);
        return !newReg.test(tel);
    }
    // 非空验证
    function checkNull(ele) {
        return ele === '';
    }

    return customElement;
});
