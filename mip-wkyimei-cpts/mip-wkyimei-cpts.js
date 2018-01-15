/**
* 寻医问药mip改造 医美项目广告组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2018.01.12
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var timer = null;
    var count = 0;
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        timer = setInterval(function () {
            var length = $('section').length;
            ++count;
            if (length) {
                clearInterval(timer);
                timer = null;
                // 由于医美(与百度)合作的广告是异步方式，只有广告出来后，才能排序插入dom
                // 此处不会影响性能，当有广告后，就立即清除了定时器
                $('section').each(function (index, item) {
                    if (item.id === 'ht_thd_service_clk') {
                        $('.area-item').eq(index).append($('#service'));
                        $('#service').append(item);
                    }
                    else if (item.id === ' ht_thd_case_clk') {
                        $('.area-item').eq(index).append($('#case'));
                        $('#case').append(item);
                    }
                    else if (item.id === 'ht_thd_hospital_clk') {
                        $('.area-item').eq(index).append($('#hospital'));
                        $('#hospital').append(item);
                    }
                    else if (item.id === 'ht_thd_doctor_clk') {
                        $('.area-item').eq(index).append($('#doctor'));
                        $('#doctor').append(item);
                    }
                });
                $('.wrap-recommand').removeClass('none');
            }
            else {
                if (count > 10) {
                    clearInterval(timer);
                    timer = null;
                    $('.wrap-recommand').removeClass('none');
                }
            }
        }, 500);
    };
    return customElem;
});
