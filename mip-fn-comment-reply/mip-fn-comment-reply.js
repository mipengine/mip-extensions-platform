/**
 * @file mip-fn-reply 组件
 * @author wangyan
 */
define(function (require) {
    var zepto = require('zepto');
    var customElem = require('customElement').create();

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

    // 创建元素回调
    customElem.prototype.createdCallback = function () {
        // console.log('created');
    };
    // 向文档中插入节点回调
    customElem.prototype.attachedCallback = function () {
        // console.log('attached');
    };
    // 从文档中移出节点回调
    customElem.prototype.detachedCallback = function () {
        // console.log('detached');
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        // console.log('first in viewport');
    };
    // 进入或离开可视区回调，每次状态变化都会执行
    customElem.prototype.viewportCallback = function (isInView) {
        // true 进入可视区;false 离开可视区
        // console.log(isInView);
    };
    // 控制viewportCallback、firstInviewCallback是否提前执行
    // 轮播图片等可使用此方法提前渲染
    customElem.prototype.prerenderAllowed = function () {
        // 判断条件，可自定义。返回值为true时,viewportCallback、firstInviewCallback会在元素build后执行
        return !!this.isCarouselImg;
    };
    // 生命周期 function list，根据组件情况选用 end


    return customElem;
});

