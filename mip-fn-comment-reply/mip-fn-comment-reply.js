/**
 * @file mip-fn-reply 组件
 * @author wangyan
 */
define(function (require) {
    var zepto = require('zepto');
    var customElem = require('customElement').create();
    function getCookie(cname) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(cname + '=');
            if (start !== -1) {
                start = start + cname.length + 1;
                var end = document.cookie.indexOf(';', start);
                if (end === -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return '';
    }
    // 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;

        var articleid = element.getAttribute('articleid');
        var replyid = element.getAttribute('replyid');
        var replyPath = element.getAttribute('reply_path');
        var replyUserid = element.getAttribute('reply_userid');
        var replyUsername = element.getAttribute('reply_username');



        $('#content').on('click', function () {
            $(this).siblings('.post-button').removeClass('disable-button');
        });

        element.addEventListener('touchstart', function () {
            var obj = document.getElementById('content');
            var cookie = getCookie('bbusername');
            if (!cookie) {
                var cururl = window.location.href;
                window.location.href = '/login.php?url=' + cururl;
                return false;
            }

            if (replyid) {
                obj.value = '回复@' + replyUsername + ':';
            } else {
                obj.value = '';
            }

            var bArticleid = document.getElementById('form_articleid');
            bArticleid.value = articleid;

            var bReplyid = document.getElementById('form_replyid');
            bReplyid.value = replyid;

            var bReplyPath = document.getElementById('form_reply_path');
            bReplyPath.value = replyPath;

            var bReplyUserid = document.getElementById('form_reply_userid');
            bReplyUserid.value = replyUserid;


            var bReplyUsername = document.getElementById('form_reply_username');
            bReplyUsername.value = replyUsername;

            document.getElementById('form_action').value = 'postComment';

        }, false);

    };



    return customElem;
});

