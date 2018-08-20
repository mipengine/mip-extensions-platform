/**
 * @file mip-typecho-comment Typecho评论回复的MIP组件
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
            $('mip-typecho-comment a').on('click', function () {
                var objective = this.getAttribute('objective');
                var cid = this.getAttribute('cid');
                var coid = this.getAttribute('coid');
                var rid = this.getAttribute('rid');

                if (objective === 'reply') {
                    var comment = ele.querySelector('#' + cid);
                    var response = ele.querySelector('#' + rid);
                    var input = ele.querySelector('#comment-parent');

                    if ('mip-form' === response.tagName) {
                        var form = response;
                    }

                    else {
                        var form = response.getElementsByTagName('mip-form')[0];
                    }

                    var textarea = response.getElementsByTagName('textarea')[0];

                    if (null == input) {

                        $('<input id="comment-parent"></input>').appendTo(form);

                        input = ele.querySelector('#comment-parent');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'parent');
                        input.setAttribute('value', coid);
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

                if (objective === 'cancelreply') {
                    response = ele.querySelector('#' + rid);
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

        });

    };

    return customElement;
});
