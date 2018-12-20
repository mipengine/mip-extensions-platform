/**
 * @file mip-load-more 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');

    var customElement = require('customElement').create();

    function getData(src, moreNum, clickName, dataName) {
        $.ajax({
            type: 'GET',
            url: src + '&flag=' + moreNum + '&now=' + Math.random(),
            dataType: 'json',
            success: function (reponse) {
                var data = reponse;
                if (data === 0) {
                    $('#' + clickName).css({border: 'none', background: 'none'});
                    $('#' + clickName).html('到底啦，已经没有更多了哦!');
                }
                else {
                    $('#' + dataName).html(reponse);
                }
            },
            error: function (xhr, type) {
                alert('Ajax error!');
            }
        });
    }

    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;
        var resSrc = element.getAttribute('data-src') || '';
        var onName = element.getAttribute('data-on') || '';
        var resName = element.getAttribute('data-name') || '';
        var counter = 0;

        // 如果没有写data-src, 则报错提示
        if (!resSrc) {
            alert('未填写src字段，不能获取数据');
            element.remove();
            return;
        }
        if (!onName) {
            alert('请填写点击的对象');
            element.remove();
            return;
        }
        if (!resName) {
            alert('请填写要输出的位置（元素id）');
            element.remove();
            return;
        }
        $('#' + resName).show();
        // 监听加载更多
        $(element).on('click', '#' + onName, function () {
            var number = document.getElementById('more_num').innerHTML;
            counter++;
            getData(resSrc, number, onName, resName);
            var num = number - 1 + 2;
            $('#more_num').html(num);
        });
    };

    return customElement;
});
