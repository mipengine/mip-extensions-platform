/**
 * @file mip-consultmore-wl 组件
 * @author
 */
define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var jDiv = ele.find('.re-ul-list .help-num');
        var jLength = jDiv.length;
        var jQids = [];
        var url = ele.attr('data-src');
        var qid = ele.attr('data-qid');
        var isExit = false;
        // 精品咨询
        if (jLength > 0) {
            for (var i = 0; i < jLength; i++) {
                jQids.push(jDiv.eq(i).attr('data-id'));
            }
        }
        console.log(jQids);
        $.ajax({
            type: 'post',
            url: url,
            data: {
                'qid': qid,
                'jQids': jQids,
                'request': 'aysn'
            },
            dataType: 'json',
            success: function (ret) {
                    if (ret.jingAsk) {
                        for (var i = 0; i < jLength; i++) {
                            var qid = jDiv.eq(i).attr('data-id');
                            var num = ret.jingAsk[qid];
                            if ('undefined' !== num && num !== '' && num !== null) {
                                jDiv.eq(i).text('已帮助' + num + '人');
                            } else {
                                jDiv.eq(i).text('已帮助' + num + '人');
                            }
                        }
                    }
                }
        });
    };
    return customElement;
});