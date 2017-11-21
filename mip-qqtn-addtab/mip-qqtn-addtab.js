/**
 * @file mip-qqtn-addtab
 * 组件,用于给选项卡里边的内容增加点击加载内容，每个选项卡对应不同的接口，接口id和接口地址通过模版获取，接口网址为https.,==========经线上测试，firstinviewcallback无法满足效果，必须使用build，请通过=======可能会存在需要从第二页，有的可能会存在从第三页开始读取的情况，将页码放进模版获取=======
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    function addtablist() {
        var p = $('.f-ajul').attr('data-page');
        var ajaxUrl = $('.f-ajul').attr('data-topdateurl');
        var gxId = $('.f-information').attr('data-id');
        $('#more').click(function () {
            $('#more').html('内容正在加载中...');
            var tabid = $('#tab-nav li.hover').attr('data-tabid');
            var tabnum = $('#tab-nav li.hover').index();
            p++;
            fetch(ajaxUrl + 'sajax.asp?action=5&t=' + gxId + '&s=' + tabid + '&num=10&o=0&p=' + p)
                .then(function (res) {
                    return res.text();
                }).then(function (data) {
                    var html = '';
                    var data = (new Function('', 'return' + data))();
                    for (var o = 0; o < data.Title.length; ++o) {
                        html += '<li>';
                        html += '<a href="http://m.qqtn.com/c/' + data.Id[o] + '">';
                        html += '<img src = "' + data.SmallImg[o] + '" />';
                        html += '</a>';
                        html += '<span>' + data.Title[o] + '</span>';
                        var date0 = data.DateAndTime[o].replace(/\//ig, '-');
                        var date = date0.substring(0, data.DateAndTime[o].lastIndexOf(' '));
                        html += '<i>' + date + '</i>';
                        html += '</li>';
                    }
                    $('#tab-div ul').eq(tabnum).append(html);
                    $('#more').html('点击查看更多...');
                }).catch(function (err) {
                    $('#more').html('没有更多内容了...');
                });
        });
    }
    customElement.prototype.build = function () {
        addtablist();
    };
    return customElement;
});
