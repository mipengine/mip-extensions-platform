/**
 * @file mip-typecho-comment Typecho 移动加速版 评论回复的MIP组件
 * @author Zhao Zhiping<izzhip@qq.com>
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var ele = this.element;

        $(ele).ready(function () {
            $('mip-typecho-comment a').click(function () {
                var target = $(ele).attr('target');
                var cid = $(this).attr('cid');
                var coid = $(this).attr('coid');
                var objective = this.innerHTML;

                var btn = ele.querySelector('#btn');
                $(btn).attr('coid', coid);

                $('mip-typecho-comment button').attr('coid', coid);

                if (objective === '回复') {
                    var comment = ele.querySelector('#' + cid);
                    var response = ele.querySelector('#' + target);
                    var input = ele.querySelector('#comment-parent');
                    var form = response.querySelector('#comment-form');
                    var textarea = form.querySelector('#textarea');

                    if (null == input) {
                        $('<input id="comment-parent"></input>').appendTo(form);
                        input = form.querySelector('#comment-parent');
                        $(input).attr('type', 'hidden');
                        $(input).attr('name', 'parent');
                        $(input).attr('value', coid);
                    }

                    if (null == ele.querySelector('#comment-form-place-holder')) {

                        $('<div id="comment-form-place-holder"></div>').appendTo(ele);

                        var holder = ele.querySelector('#comment-form-place-holder');

                        response.parentNode.insertBefore(holder, response);
                    }

                    var list = comment.getElementsByTagName('div');

                    for (var i = 0; i < list.length; i++) {
                        if (list.item(i).className === 'comment-content') {
                            var content = list.item(i);
                            break;
                        }
                    }

                    $(response).insertAfter(content);

                    ele.querySelector('#cancel-comment-reply-link').setAttribute('class', '');

                    if (null != textarea && 'text' === textarea.name) {
                        textarea.focus();
                    }

                    return false;
                }

                if (objective === '取消回复') {
                    response = ele.querySelector('#' + target);
                    holder = ele.querySelector('#comment-form-place-holder');
                    input = ele.querySelector('#comment-parent');

                    if (null != input) {
                        input.parentNode.removeChild(input);
                    }

                    if (null == holder) {
                        return true;
                    }

                    ele.querySelector('#cancel-comment-reply-link').setAttribute('class', 'cancelreply');
                    holder.parentNode.insertBefore(response, holder);

                    return false;
                }

            });

            $('mip-typecho-comment button').click(function () {
                var btn = ele.querySelector('#btn');
                var form = ele.querySelector('#comment-form');

                $(form).attr('url', $(form).attr('url') + '?parent=' + $(btn).attr('coid'));

                $(form).submit();
            });

        });

    };

    return customElement;
});
