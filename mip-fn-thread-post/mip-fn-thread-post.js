/**
 * @file mip-fn-thread-post 组件
 * @author
 */
define(function (require) {

    var zepto = require('zepto');
    var customElem = require('customElement').create();

    // 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;

        var url = element.getAttribute('url');

        var form = element.querySelector('form');

        var button = element.querySelector('.post-button');

        var content = element.querySelector('#content');

        button.onclick = function () {
            var className = $(this).hasClass('disable-tag');
            if (className) {
                return false;
            }

            var str = $('form').serialize(); // 序列化表单值

            if (content.value) {
                $.ajax({
                    url: url,
                    type: 'post',
                    data: str,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code === 1) {
                            if (data.content.url) {
                                window.location.href = (data.content.url);
                            } else {
                                window.location.reload();
                            }
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function () {
                        alert('网络通讯异常，请稍后再试。');
                        return false;
                    }
                });
            } else {
                alert('请输入内容');
            }
        };
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
