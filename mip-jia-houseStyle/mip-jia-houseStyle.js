/**
 * @file mip-jia-houseStyle 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    // 根据传入面积获取室厅卫的数量
    function fenFn(obj, area) {
        if (area <= 60) {
            obj.find('input[name="shi1"]').val(1);
            obj.find('input[name="ting1"]').val(1);
            obj.find('input[name="chu1"]').val(1);
            obj.find('input[name="wei1"]').val(1);
        }
        else if (area > 60 && area <= 90) {
            obj.find('input[name="shi1"]').val(2);
            obj.find('input[name="ting1"]').val(1);
            obj.find('input[name="chu1"]').val(1);
            obj.find('input[name="wei1"]').val(1);
        }
        else if (area > 90 && area <= 110) {
            obj.find('input[name="shi1"]').val(3);
            obj.find('input[name="ting1"]').val(1);
            obj.find('input[name="chu1"]').val(1);
            obj.find('input[name="wei1"]').val(1);
        }
        else if (area > 110 && area <= 130) {
            obj.find('input[name="shi1"]').val(3);
            obj.find('input[name="ting1"]').val(2);
            obj.find('input[name="chu1"]').val(1);
            obj.find('input[name="wei1"]').val(1);
        }
        else if (area > 130 && area <= 150) {
            obj.find('input[name="shi1"]').val(3);
            obj.find('input[name="ting1"]').val(2);
            obj.find('input[name="chu1"]').val(1);
            obj.find('input[name="wei1"]').val(2);
        }
        else if (area > 150 && area <= 180) {
            obj.find('input[name="shi1"]').val(4);
            obj.find('input[name="ting1"]').val(2);
            obj.find('input[name="chu1"]').val(1);
            obj.find('input[name="wei1"]').val(2);

        }
        else if (area > 180) {
            obj.find('input[name="shi1"]').val(4);
            obj.find('input[name="ting1"]').val(2);
            obj.find('input[name="chu1"]').val(1);
            obj.find('input[name="wei1"]').val(2);
        }
    }

    var urlHrefObject = (function () {
        var hrefUrlArr = [];
        var obj = {};
        if (window.location.search.substr(1) && window.location.search.substr(1).length > 2) {
            hrefUrlArr = window.location.search.substr(1).split('&');
            for (var i = 0; i < hrefUrlArr.length; i++) {
                var arr = hrefUrlArr[i].split('=');
                obj[arr[0]] = arr[1];
            }
        }
        return obj;
    })();

    function validateArea(obj) {
        obj.find('#pm_area').change(function () {
            var pmArea = parseInt(obj.find('#pm_area').val(), 10);
            fenFn(obj, pmArea);
        });
        // 改变select的值
        obj.find('.zx-select').change(function () {
            var curObj = this;
            var index = curObj.selectedIndex;
            var text = curObj.options[index].text;
            obj.find('.fg-title').text(text);
        });
        // 点击加号按钮
        obj.find('.add-btn').click(function () {
            var i = parseInt($(this).prev().prev().val(), 10);
            var maxNum = 2;
            if ($(this).prev().text() === '室') {
                maxNum = 6;
            }
            else if ($(this).prev().text() === '厅') {
                maxNum = 5;
            }
            else if ($(this).prev().text() === '厨') {
                maxNum = 2;
            }
            else if ($(this).prev().text() === '卫') {
                maxNum = 4;
            }
            if (i < maxNum) {
                i++;
                $(this).prev().prev().val(i);
            }
        });
        // 点击减号按钮
        obj.find('.minus-btn').click(function () {
            var i = parseInt($(this).next().val(), 10);
            if (i > 1) {
                i--;
                $(this).next().val(i);
            }
        });
        // 判断链接带的id号给面积、风格、室赋值
        if (urlHrefObject.sid === 'sid1') {
            if (urlHrefObject.picid) {
                $.ajax({
                    url: '//m.jia.com/new_zhuangxiu/get_aladdin_dantu',
                    type: 'get',
                    data: {'pic_id': urlHrefObject.picid},
                    success: function (data) {
                        if (data.status === 200) {
                            if (data.squre !== undefined && data.squre !== '' && data.squre !== '0') {
                                obj.find('#pm_area').val(parseInt(data.squre, 10));
                            }
                            if (data.bedroomNum !== undefined && data.bedroomNum !== '' && data.bedroomNum !== '0') {
                                obj.find('#shi').val(parseInt(data.bedroomNum, 10));
                            }
                            if (data.genre !== undefined && data.genre !== '') {
                                obj.find('.fg-title').text(data.genre + '风格');
                                obj.find('.zx-select').val(data.genre + '风格');
                            }
                        }
                    },
                    error: function () {
                    }
                });
            }
            if (urlHrefObject.picids) {
                $.ajax({
                    url: '//m.jia.com/new_zhuangxiu/get_aladdin_tuji',
                    type: 'get',
                    data: {'pic_ids': urlHrefObject.picids},
                    success: function (data) {
                        if (data.status === 200) {
                            if (data.squre !== undefined && data.squre !== '' && data.squre !== '0') {
                                obj.find('#pm_area').val(parseInt(data.squre, 10));
                            }
                            if (data.bedroomNum !== undefined && data.bedroomNum !== '' && data.bedroomNum !== '0') {
                                obj.find('#shi').val(parseInt(data.bedroomNum, 10));
                            }
                            if (data.genre !== undefined && data.genre !== '') {
                                obj.find('.fg-title').text(data.genre + '风格');
                                obj.find('.zx-select').val(data.genre + '风格');
                            }
                        }
                    },
                    error: function () {
                    }
                });
            }
        }
    }

    customElement.prototype.firstInviewCallback = function () {
        var thisObj = this.element;
        validateArea($(thisObj));
    };
    return customElement;
});
