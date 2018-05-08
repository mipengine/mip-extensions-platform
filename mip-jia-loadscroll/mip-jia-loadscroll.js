/**
 * @file mip-jia-loadscroll 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var templates = require('templates');
    // zepto 某些方法没有,比如.is(':visible')
    var $ = require('jquery');
    var viewport = require('viewport');


    /**
     * 无限加载
     *
     * @class
     * @param {Object} element 当前组件
     * @param {Object} cfg 所需参数
     */
    var Infinite = function (element, cfg) {
        this.cfg = cfg;
        this.element = element;
    };

    Infinite.prototype = {
        init: function () {
            this.setParams();
            this.bindEvent();
        },
        // 处理传进来的参数
        setParams: function () {
            // request参数
            var p = this.cfg.request;
            this.url = p.url.trim();
            if (!this.url) {
                console.error('必须填写请求url');
            }
            this.jsonpCallback = p.jsonpCallback || 'callback';
            this.params = p.params;

            // 请求是否完成
            this.requestEnd = true;

            // 接口还有没有数据
            this.loadEnd = false;

            // 页码 && button && loading
            var r = this.cfg.response;
            this.pageSizeKey = r.pageSizeKey;
            this.pageSize = this.params[this.pageSizeKey];
            this.event = r.event || 'scroll';
            this.bottomDistance = r.bottomDistance;
            this.$btn = $(r.button);
            this.$loading = $(r.loadingBox);
            this.$parentBox = $(r.parentBox);
            this.multiple = r.multiple;
        },
        bindEvent: function () {
            var that = this;
            if (that.event === 'click') {
                that.$btn && that.$btn.on('click', function () {
                    that.control();
                });
            } else {
                var dis = that.bottomDistance;
                viewport.on('scroll', function () {
                    if (viewport.getHeight() + viewport.getScrollTop() >= viewport.getScrollHeight() - dis) {
                        that.$parentBox.is(':visible') && that.control();
                    }
                });
            }
        },
        control: function () {
            if (this.requestEnd && !this.loadEnd) {
                this.getResponse();
            }
        },
        getResponse: function () {
            var that = this;
            that.requestEnd = false;
            that.$loading.show();
            that.$btn.hide();
            that.params[that.pageSizeKey] = that.pageSize;
            that.pageSize++;
            that.triggerRequest();
        },
        render: function (res) {
            var that = this;
            var data = that.cfg.response;
            var tier = data.params && data.params.trim();
            if (!res) {
                that.$loading.html('网络错误，请连网后刷新');
                return;
            }
            // 获取数据
            var msg = res;
            if (tier) {
                tier = tier.split('.');
                for (var i = 0; i < tier.length; i++) {
                    msg = msg[tier[i]];
                }
                if (!msg) {
                    that.loadEnd = true;
                    that.$parentBox.siblings('.loading-none').show();
                }
            }

            // append元素
            if (that.multiple) {
                var $mul = that.multiple.split('.');
                $mul.forEach(function (item, index) {
                    that.$parentBox.find('.multiple-box').eq(index).append(that.replaceFn(msg[item]));
                    if (msg[item] === '') {
                        that.loadEnd = true;
                        that.$parentBox.find('.loading-none').show();
                    }
                });
            }
            else {
                that.$parentBox.append(that.replaceFn(msg));
            }

            // 处理图片
            that.$parentBox.find('img.loading,img.lazy_img').each(function (index, item) {
                var $src = $(item).attr('imgSrc') || $(item).attr('data-src');
                $src && $(item).attr('src', $src);
            });

            that.requestEnd = true;
            that.$loading.hide();
            !that.loadEnd && that.$btn.show();
        },

        /**
         * send ajax
         *
         *
         */
        triggerRequest: function () {
            var that = this;
            $.ajax({
                url: that.url,
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: that.jsonpCallback,
                data: that.params,
                timeout: 10000,
                success: function (render) {
                    that.render(render);
                },
                error: function () {
                    that.render('');
                }
            });
        },

        /**
         * [replaceFn 处理数据]
         *
         * @param  {string} str  数据源
         * @return  {string} 返回数据
         */
        replaceFn: function (str) {
            // 删除str里面的script标签,不是引用外链
            var reg = /<script>.+<\/script>/g;
            var reg1 = /data\-src/g;
            var $str = str.replace(reg, '');
            $str = $str.replace(reg1, 'src');
            return $str;
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;

        var scriptEle = element.querySelector('script[type="application/json"]');
        try {
            var cfg = JSON.parse(scriptEle.textContent);
        }
        catch (e) {
            console.error(e);
            return;
        }

        new Infinite(element, cfg).init();
    };

    return customElement;
});
