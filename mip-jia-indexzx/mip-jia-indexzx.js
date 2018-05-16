/**
 * @file mip-jia-indexzx 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var Mswiper = require('./swiper');

    /**
     * [replaceFn 处理数据]
     *
     */
    customElement.prototype.replaceFn = function () {
        var self = this;
        var $self = $(self.element);
        $self.find('img.loading,img.lazy_img').each(function (index, item) {
            var $src = $(item).attr('imgSrc') || $(item).attr('data-src');
            $src && $(item).attr('src', $src);
        });
    };

    /**
     * [htmlFun 将获取到的数据放入容器]
     *
     * @param  {Object|string}  data    数据
     *
     *
     */
    customElement.prototype.htmlFun = function (data) {
        var self = this;
        var $self = $(self.element);
        if (!data.data) {
            return;
        }
        $self.append(data.data);
        var obj1 = $self.find('.swiper-container-company')[0];
        var obj2 = $self.find('.swiper-container-service')[0];
        var params = {
            'slidesPerView': 2.5,
            'spaceBetween': 10
        };
        new Mswiper(obj1, params);
        new Mswiper(obj2, params);
        self.replaceFn();
    };

    /**
     * [request 数据请求]
     *
     */

    customElement.prototype.request = function () {
        var self = this;
        $.ajax({
            url: self.url,
            type: 'get',
            dataType: 'jsonp',
            data: self.params,
            timeout: 10000,
            success: function (render) {
                self.htmlFun(render);
            },
            error: function () {
                self.htmlFun('');
            }
        });
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
        }
        catch (e) {
            thisObj.innerHTML = '';
            return;
        }
        self.url = data.url;
        self.params = data.params;
        self.request();
    };

    return customElement;
});
