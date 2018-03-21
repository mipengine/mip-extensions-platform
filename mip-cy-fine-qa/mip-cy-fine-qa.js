/**
 * @file mip-cy-fine-qa 组件
 * @author 春雨前端开发组
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var positiveCaches = {};
    var $ = require('zepto');
    var domain = 'https://biztest.chunyu.me';
    var $qaWrap = '';

    customElement.prototype.build = function () {
        var $ele = $(this.element);
        var doctorId = $ele.attr('doctor-id') || '';
        $qaWrap = $ele.find('.J-cy-mip-fine-qa-wrap');

        getFineQA('all', doctorId);
        $ele.find('.J-cy-mip-fine-qa').on('click', function () {
            var $this = $(this);
            var type = $this.data('type') || 'undefined';
            var html = positiveCaches[type];
            $ele.find('.J-cy-mip-fine-qa').removeClass('cur');
            $this.addClass('cur');
            if (html) {
                $qaWrap.html(html);
            }
            else {
                getFineQA(type, doctorId);
            }
        });
    };

    function getFineQA(type, doctorId) {
        $.ajax({
            url: domain + '/m/doctor/' + doctorId + '/qa/',
            dataType: 'json',
            data: {
                'is_json': 1,
                'page_count': 3,
                'query': type
            },
            success: function (res) {
                var problemList = res && res.problem_list || [];
                var len = problemList.length;
                var i = 0;
                var item;
                var html = ['<div class="fine-qa-list">'];
                for (i = 0; i < len; i++) {
                    item = problemList[i];
                    html.push('<a href="/mip/qa/');
                    html.push(item.id);
                    html.push('/" class="fine-qa">');
                    html.push('<div class="fine-qa-title">');
                    html.push('<div class="fine-qa-ask-tag">问</div><div><div>');
                    if (item.title) {
                        html.push(item.title);
                    }
                    html.push('</div>');
                    html.push('<p class="fine-qa-content">');
                    html.push(item.ask);
                    html.push('</p></div></div></a>');
                }
                if (len === 0) {
                    html.push('<div class="no-content">没有相关内容</div>');
                }
                html.push('</div>');
                positiveCaches[type] = html.join('');
                $qaWrap.html(positiveCaches[type]);
            }
        });
    }
    return customElement;
});
