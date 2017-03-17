/**
 * @file mip-game4399-download 组件
 *
 * @author wyc
 * @time 2017-03-16
 */
define(function (require) {
    var zepto = require('zepto');
    var util = require('util');
    var defaultFunc = {
        build: function () {
            var $el = zepto(this.element);
            var platform = util.platform;
            var prevClass = 'mip-game4399-download';
            var gameloadUrl = '';
            if (platform.isIos()) {
                gameloadUrl = $el.attr('ios-downsrc');
            }
            else if (platform.isAndroid()) {
                gameloadUrl = $el.attr('android-downsrc');
            }
            else {
                gameloadUrl = $el.attr('other-downsrc');
            }
            if (!gameloadUrl) {
                gameloadUrl = $el.attr('android-downsrc');
            }
            var html = [];
            html.push('<div class="' + prevClass + '-box ' + prevClass + '-pm10">    ');
            html.push('<div class="' + prevClass + '-content">        ');
            html.push('<div class="' + prevClass + '-textbox">');
            html.push('<div class="' + prevClass + '-text">');
            html.push('<p>' + $el.attr('texttip') + '</p></div></div>');
            html.push('<div class="' + prevClass + '-downbtn">');
            html.push('<a href="' + gameloadUrl + '" target="_blank">' + $el.attr('downbtntext') + '</a></div>');
            html.push('    </div>');
            html.push('</div>');
            $el.html(html.join(''));
        },
        // 创建元素回调
        createdCallback: null,
        // 向文档中插入节点回调
        attachedCallback: null,
        // 从文档中移出节点回调
        detachedCallback: null,
        // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
        firstInviewCallback: null,
        // 进入或离开可视区回调，每次状态变化都会执行,一个参数，true 进入可视区;false 离开可视区
        viewportCallback: null,
        // 控制viewportCallback、firstInviewCallback是否提前执行
        // 轮播图片等可使用此方法提前渲染
        // 判断条件，可自定义。返回值为true时,viewportCallback、firstInviewCallback会在元素build后执行
        prerenderAllowed: null
    };

    var customElem = require('customElement').create();
    for (var i in defaultFunc) {
        if (typeof defaultFunc[i] === 'function') {
            customElem.prototype[i] = defaultFunc[i];
        }
    }
    return customElem;
});
