/**
 * @file mip-typecho-comment Typecho 移动加速版 评论回复的MIP组件
 * @author Zhao Zhiping<izzhip@qq.com>
 */

define(function (require) {

    'use strict';

    var util = require('util');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var ele = this.element;

        $(ele).on('click', 'a', function () {

            var target = ele.getAttribute('target');

            var cid = this.getAttribute('cid');
            var coid = this.getAttribute('coid');
            var objective = this.innerHTML;

            if (objective === '回复') {

                this.setAttribute('id', 'reply' + coid);

                var comment = ele.querySelector('#' + cid);
                var response = ele.querySelector('#' + target);
                var input = ele.querySelector('#comment-parent');
                var form = 'form' === response.tagName ? response : response.querySelector('form');
                var textarea = form.querySelector('textarea');

                if (null == input) {

                    input = util.dom.create('<input></input>');

                    input.setAttribute('id', 'comment-parent');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', 'parent');

                    form.appendChild(input);

                }

                if (null == ele.querySelector('#comment-form-place-holder')) {

                    var holder = util.dom.create('<div></div>');

                    holder.setAttribute('id', 'comment-form-place-holder');

                    response.parentNode.insertBefore(holder, response);

                }

                var content = comment.querySelector('.comment-content');

                if (content.parentNode.lastChild === content) {

                    content.parentNode.appendChild(response);

                }

                else {

                    content.parentNode.insertBefore(response, content.nextSibling);

                }

                input.setAttribute('value', coid);

                var author = ele.querySelector('#author');

                if (!author.getAttribute('value')) {

                    author.focus();

                }

                else {

                    textarea.focus();

                }

                var cancel = ele.querySelector('#cancel-comment-reply-link');

                if (cancel.getAttribute('from')) {

                    var from = ele.querySelector('#' + cancel.getAttribute('from'));
                    from.setAttribute('class', '');

                }

                cancel.setAttribute('from', this.getAttribute('id'));
                cancel.setAttribute('class', '');

                this.setAttribute('class', 'hidden');

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

                holder.parentNode.insertBefore(response, holder);
                holder.parentNode.removeChild(holder);

                this.setAttribute('class', 'hidden');

                var from = ele.querySelector('#' + this.getAttribute('from'));
                from.setAttribute('class', '');

                return false;
            }

        });

    };

    return customElement;

});
