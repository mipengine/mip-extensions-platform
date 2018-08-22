/**
 * @file mip-linkeddb-vote 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    require('./jquery-weui');
    // jquery-weui-min 此为定制化精简模块,内部只包含本组件中使用的功能
    // 一下列举定制化模块包含模块详情
    // jquery-extend  jquery 依赖模块
    // template7  模板模块
    // $.confirm  使用 modal   提示用户操作的弹出层模块
    // $.toast    使用 toast   信息提示框模块

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        /* 支持反对占比 */
        var ele = this.element;
        var voteBd = $(ele).find('.vote__bd');
        var voteHd = $(ele).find('.vote__hd');
        var supportNumEl = voteBd.find('.poll-support').find('.num');
        var opposeNumEl = voteBd.find('.poll-oppose').find('.num');
        var supportPercentageEl = voteHd.find('.support-num');
        var opposePercentageEl = voteHd.find('.oppose-num');
        var supportLineEl = voteHd.find('.support-line');
        var opposeLineEl = voteHd.find('.oppose-line');

        // 获取支持和反对数返回一个数组包含各自对应的百分比
        function calculatePercentage(supportNumEl, opposeNumEl, supportPercentageEl, opposePercentageEl
            , supportLineEl, opposeLineEl) {
            var supportNum = +supportNumEl.text();
            var opposeNum = +opposeNumEl.text();
            var sumNum = opposeNum + supportNum;
            var supportPercentage = parseInt((supportNum / sumNum) * 100, 10);
            var opposePercentage = 100 - supportPercentage;
            opposePercentage = isNaN(opposePercentage) ? 0 : opposePercentage;
            supportPercentage = isNaN(supportPercentage) ? 0 : supportPercentage;
            supportPercentageEl.text(supportPercentage + '%');
            opposePercentageEl.text(opposePercentage + '%');
            supportLineEl.css('width', supportPercentage + '%');
            opposeLineEl.css('width', opposePercentage + '%');
        }

        calculatePercentage(supportNumEl, opposeNumEl, supportPercentageEl, opposePercentageEl
            , supportLineEl, opposeLineEl);

        var person1Oid = $(ele).attr('data-oid1');
        var person2Oid = $(ele).attr('data-oid2');
        var cpId = $(ele).attr('data-cp-id');
        var url = ele.getAttribute('data-src');
        var sin = ele.getAttribute('sin-in');

        // 投票  @param that 当前元素按钮，支持或反对  @param voteUrlFlag 投票的 URL 标记 （1 支持， -1 反对）
        function sendGetToVote(that, voteUrlFlag) {
            $.get(url + person1Oid + '-' + person2Oid + '/vote/?act=' + voteUrlFlag, function (res) {
                if (res.response === '-2') {
                    $.confirm('登录后投票', '操作提示', function () {
                        window.location.href = sin + window.location.origin + window.location.pathname;
                    }, function () {
                    });
                    return false;
                } else if (res.response === '1') {
                    $.toast('投票成功！');
                    pollSubmit.find('.oppose-btn').off('click');
                    pollSubmit.find('.support-btn').off('click');
                    $(that).siblings().text(+$(that).siblings().text() + 1);
                    calculatePercentage(supportNumEl, opposeNumEl, supportPercentageEl, opposePercentageEl
                        , supportLineEl, opposeLineEl);
                } else {
                    $.toast(res.error, 'forbidden');
                }
            });
        }

        /* 投票 */
        var voteWrap = $(ele).find('.vote-wrap');
        var pollSubmit = voteWrap.find('.poll-submit');
        pollSubmit.find('.oppose-btn').on('click', function () {
            var that = this;
            sendGetToVote(that, '-1');
        });

        pollSubmit.find('.support-btn').on('click', function () {
            var that = this;
            sendGetToVote(that, '1');
        });
    };

    return customElement;
});
