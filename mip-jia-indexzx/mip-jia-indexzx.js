/**
 * @file mip-jia-indexzx 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

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
        /* global Swiper */
        new Swiper(obj1, params);
        new Swiper(obj2, params);
        self.replaceFn();
    };

    /**
     * [request 数据请求]
     *
     */

    customElement.prototype.request = function () {
        var self = this;
        var params = {
            ztzx: self.ztzx,
            zxcoupon: self.zxcoupon
        };
        $.ajax({
            url: self.url,
            type: 'get',
            dataType: 'jsonp',
            data: params,
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
     * build 方法，元素插入到文档时执行，仅会执行一次
     */
    customElement.prototype.build = function () {
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
        self.ztzx = data.ztzx;
        self.zxcoupon = data.zxcoupon;
        self.request();
    };

    return customElement;
});
