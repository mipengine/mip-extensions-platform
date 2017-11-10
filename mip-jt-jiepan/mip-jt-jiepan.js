/**
 * @file mip-jt-jiepan 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var JIEPAN_DOMAIN = 'https://kp.cngold.org';
    var num;
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        num = ele.getAttribute('num');
        var url = JIEPAN_DOMAIN + '/analyze/2/?&_=' + new Date().getTime();
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function (json) {
                var reportArr = json;
                var content = '';
                var addClass = '';
                if (reportArr.length > 0) {
                    for (var i = 0; i < num; i++) {
                        addClass = '';
                        if (i === 0) {
                            addClass = 'class="first"';
                        }
                        content += '<li ' + addClass + '>';
                        content += '<a href="https://m.cngold.org/kp/r' + reportArr[i].studioId + '/">';
                        content += '<p class="zbs_detail">';
                        content += '<span class="zbs_detail_name">';
                        content += '<mip-img layout=' + 'responsive' + ' width=' + '50' + ' height=' + '50' + ' src=' + 'https://res.cngoldres.com/' + reportArr[i].expertPhoto + '></mip-img>';
                        content += reportArr[i].expertNickName;
                        content += '</span>';
                        content += '<span class="zbs_detail_define">资深分析师</span>';
                        content += '<span class="zbs_detail_time">' + reportArr[i].time.substring(5) + '</span>';
                        content += '</p></a>';
                        content += '<p class="l_two"><a href="https://m.cngold.org/kp/r' + reportArr[i].studioId + '/">' + reportArr[i].content + '</a><span class="source">来自：<i>';
                        content += '<a href="https://m.cngold.org/kp/r' + reportArr[i].studioId + '/">' + reportArr[i].studioName + '</a></i></span></p>';
                        content += '</li>';
                    }
                }
                else {
                    content += '<p class="pdlr30 mt20 mb20">今日暂无解盘信息！</p>';
                }
                $('#todayAnalyzeId').html(content);
            }
        });
    };

    return customElement;
});
