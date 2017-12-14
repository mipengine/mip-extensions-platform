/**
 * @file mip-jia-style-test 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var errorTips = ['请选择你的房屋状态!', '请选择你的房型!', '请选择你的预算!', '请选择你的家庭情况!', '请选择你的喜欢的风格!'];
    var res = {
        'list': [{
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s1.jpg',
            'img_info': '现代简约风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s2.jpg',
            'img_info': '地中海风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s3.jpg',
            'img_info': '田园风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s4.jpg',
            'img_info': '欧式风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s5.jpg',
            'img_info': '自然风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s6.jpg',
            'img_info': '传统风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s7.jpg',
            'img_info': '中国古典风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s8.jpg',
            'img_info': '现代风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s9.jpg',
            'img_info': '后现代风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s10.jpg',
            'img_info': '乡土风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s11.jpg',
            'img_info': '古罗马风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s12.jpg',
            'img_info': '哥特式风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s13.jpg',
            'img_info': '和式风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s14.jpg',
            'img_info': '巴洛克风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s15.jpg',
            'img_info': '洛可可风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s16.jpg',
            'img_info': '日本传统风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s17.jpg',
            'img_info': '希腊古典风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s18.jpg',
            'img_info': '新古典主义风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s19.jpg',
            'img_info': '古埃及风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s20.jpg',
            'img_info': '伊斯兰装修'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s21.jpg',
            'img_info': '意大利风格'
        }, {
            'img': '//mued3.jia.com/image/mobile/zhuangxiu/fengge/s22.jpg',
            'img_info': '混合型风格'
        }
        ]
    };
    var numArr = [];

    function createRandom2(num, from, to) {
        var json = {};
        while (numArr.length < num) {
            // 产生单个随机数
            var ranNum = Math.floor(Math.random() * (to - from)) + from;
            // 通过判断json对象的索引值是否存在 来标记 是否重复
            if (!json[ranNum]) {
                json[ranNum] = 1;
                numArr.push(ranNum);
            }
        }
        return numArr;
    }

    createRandom2(6, 0, 21);
    function nextTipFn(index, obj) {
        var styleBmVal = obj.find('.page_com' + (index + 1)).find('.choose_ul li.on p').text();
        if (!styleBmVal) {
            tipMask(obj, errorTips[index]);
        }
        else {
            obj.find('.page_com').hide();
            obj.find('.page_com').eq(index + 1).show();
            obj.find('input[name=house' + (index + 1) + ']').val(styleBmVal);
            if (index === 1) {
                if (styleBmVal === '一房') {
                    obj.find('.page_com').eq(index + 1).find('.choose_ul').hide();
                    obj.find('.page_com').eq(index + 1).find('.choose_ul').hide();
                    obj.find('.page_com').eq(index + 1).find('.choose_ul').eq(index - 1).show();
                }
                else if (styleBmVal === '二房') {
                    obj.find('.page_com').eq(index + 1).find('.choose_ul').hide();
                    obj.find('.page_com').eq(index + 1).find('.choose_ul').eq(index).show();
                }
                else if (styleBmVal === '三房') {
                    obj.find('.page_com').eq(index + 1).find('.choose_ul').hide();
                    obj.find('.page_com').eq(index + 1).find('.choose_ul').eq(index + 1).show();
                }
                else if (styleBmVal === '大宅别墅') {
                    obj.find('.page_com').eq(index + 1).find('.choose_ul').hide();
                    obj.find('.page_com').eq(index + 1).find('.choose_ul').eq(index + 2).show();
                }
            }
        }
    }

    // 弹出提示层
    function tipMask(obj, msg, duration) {
        duration = duration || 2000;
        obj.find('.popup-mask').text(msg);
        obj.find('.popup-mask').addClass('show');
        var tipMaskTimer = setTimeout(function () {
            obj.find('.popup-mask').fadeOut(100, function () {
                $(this).removeClass('show');
            });
            clearTimeout(tipMaskTimer);
        }, duration);
    }

    customElement.prototype.firstInviewCallback = function () {
        var thisObj = this.element;
        var clickParentObj = $(thisObj).find('.page_com');
        $(thisObj).find('.prev_step').click(function () {
            var index = $(this).parents('.page_com').index();
            clickParentObj.hide();
            clickParentObj.eq(index - 1).show();
        });
        $(thisObj).find('.choose_ul li').click(function () {
            $(this).parents('.page_com').find('.choose_ul li').removeClass('on');
            $(this).addClass('on');
            var index = $(this).parents('.page_com').index();
            if (index === 4) {
                var lastVal = $(thisObj).find('.page_com'
                    + (index + 1)).find('.choose_ul li.on .mip-img').attr('title');
                $(thisObj).find('input[name=house' + (index + 1) + ']').val(lastVal);
            }
        });
        $(thisObj).find('.next_step').click(function () {
            var index = $(this).parents('.page_com').index();
            nextTipFn(index, $(thisObj));
        });
        // 随机取出6条数据
        for (var i = 0; i < numArr.length; i++) {
            var numI = numArr[i];
            $(thisObj).find('#choose_ul li').eq(i).find('mip-img').attr('src', res.list[numI].img);
            $(thisObj).find('#choose_ul li').eq(i).find('mip-img').attr('title', res.list[numI].img_info);
        }
    };
    return customElement;

});
