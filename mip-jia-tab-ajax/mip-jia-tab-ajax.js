/**
 * @file mip-jia-tab-ajax 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var fetchJsonp = require('fetch-jsonp');
    var $ = require('zepto');

    /**
     * [reFn 处理数据]
     *
     * @param  {string} key  键
     * @param  {string} val  值
     * @return  {Function} 匿名函数
     */
    customElement.prototype.reFn = function (key, val) {
        return function () {
            switch (val[0]) {
                case '+':
                    return this[key] + parseFloat(val.slice(1));
                    break;
                case '-':
                    return this[key] - parseFloat(val.slice(1));
                    break;
                case '*':
                    return this[key] * parseFloat(val.slice(1));
                    break;
                case '/':
                    return this[key] / parseFloat(val.slice(1));
                    break;
            }
        };
    };

    /**
     * [replaceFn 处理数据]
     *
     * @param  {string} str  数据源
     * @return  {string} 返回数据
     */
    customElement.prototype.replaceFn = function (str) {
        // 删除str里面的script标签,不是引用外链
        var reg = /<script>.+<\/script>/g;
        var reg1 = /data\-src/g;
        var $str = str.replace(reg, '');
        $str = $str.replace(reg1, 'src');
        return $str;
    };


    /**
     * [renderTemplate 获取模板]
     *
     * @param  {Object} tem  模板元素
     * @param  {Object} data 渲染数据
     * @param  {string} cla  class
     * @param  {number} index 内容索引值
     * @param  {string} type 类型
     * @param  {number} [swiperindex] swiper索引
     */
    customElement.prototype.renderTemplate = function (tem, data, cla, index, type, swiperindex) {

        var self = this;
        var obj = data;
        if (obj instanceof Array) {
            obj = {};
            obj.default = data;
        }
        if (!obj) {
            return;
        }
        if ($(tem).find('template').attr('count')) {
            var $obj = $(tem).find('template').attr('count');
            $obj = JSON.parse($obj);
            for (var x in $obj) {
                if (x.indexOf('.') > -1) {
                    var arr = x.split('.');
                    if (obj[arr[0]]) {
                        obj[arr[0]].forEach(function (item, index) {
                            item['re' + arr[1]] = self.reFn(arr[1], $obj[x]);
                        });
                    }
                    else {
                        obj.default.forEach(function (item, index) {
                            item['re' + arr[1]] = self.reFn(arr[1], $obj[x]);
                        });
                    }
                }
                else {
                    obj.default.forEach(function (item, index) {
                        item['re' + x] = self.reFn(x, $obj[x]);
                    });
                }
            }
        }
        templates.render(
            tem, obj
        ).then(function (htmls) {
                var $ele = $(cla).eq(index);
                var $eleNode = $ele.children('.swiper-wrapper');
                if ($eleNode.length === 0) {
                    $eleNode = null;
                }
                if (type === 'append') {
                    ($eleNode || $ele).append(htmls);
                    self.swiperFn($ele, index, false);
                }
                else if (type === 'html') {
                    ($eleNode || $ele).html(htmls);
                    self.swiperFn($ele, (swiperindex !== undefined ? swiperindex : 0), true);
                }
                $ele.removeClass('loading');
            });
    };

    /**
     * [getUrl 获取最后拼接好的数据请求url]
     *
     * @param  {Object}  ele    目标元素
     *
     * @param  {string}  src    原始 url
     *
     * @return {string}         拼接好的 url
     */
    customElement.prototype.getUrl = function (ele, src) {
        if (!src) {
            console.error('url为空');
            return;
        }
        var url = src;
        if (src.indexOf('?') > 0) {
            url += src[src.length - 1] === '?' ? '' : '&';
        }
        else {
            url += '?';
        }
        var dataset = ele.dataset;
        for (var i in dataset) {
            url += i + '=' + dataset[i] + '&';
        }
        url[url.length - 1] === '&' && (url = url.slice(0, -1));
        return url;
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

        if (self.contype === 'multiple') {
            $(self.ele).eq(self.activeIndex).data('load', true);
            if (self.templateFlag === '0') {
                var $ele = $(self.contain).eq(self.activeIndex);
                var $eleNode = $ele.children('.swiper-wrapper');
                if ($eleNode.length === 0) {
                    $eleNode = null;
                }
                if (self.items) {
                    var datas = self.items.split('.');
                    var len = datas.length;
                    var $datas = null;
                    for (var i = 0; i < len; i++) {
                        $datas = data[datas[i]];
                    }
                    $datas = self.replaceFn($datas);
                    if (!$eleNode && $ele.find('.html-list').length > 0) {
                        $ele.find('.html-list').append($datas);
                    }
                    else {
                        ($eleNode || $ele).append($datas);
                    }
                }
                else {
                    var $datas = self.replaceFn(data);
                    if (!$eleNode && $ele.find('.html-list').length > 0) {
                        $ele.find('.html-list').append($datas);
                    }
                    else {
                        ($eleNode || $ele).append($datas);
                    }
                }
                self.swiperFn($ele, self.activeIndex, false);
                $ele.removeClass('loading');
            }
            else if (self.templateFlag === '1') {
                if (self.items) {
                    var datas = self.items.split('.');
                    var len = datas.length;
                    for (var i = 0; i < len; i++) {
                        datas = data[datas[i]];
                    }
                    self.renderTemplate(self.template, datas, self.contain, self.activeIndex, 'append');
                }
                else {
                    self.renderTemplate(self.template, data, self.contain, self.activeIndex, 'append');
                }
            }
            else if (self.templateFlag === '2') {
                if (self.items[self.activeIndex]) {
                    var datas = self.items[self.activeIndex].split('.');
                    var len = datas.length;
                    for (var i = 0; i < len; i++) {
                        datas = data[datas[i]];
                    }
                    self.renderTemplate(
                        $(self.template[self.activeIndex])[0],
                        datas, self.contain, self.activeIndex, 'append'
                    );
                }
                else {
                    self.renderTemplate($(self.template[self.activeIndex])[0],
                        data, self.contain, self.activeIndex, 'append');
                }
            }
        }
        else if (self.contype === 'once') {
            if (self.templateFlag === '0') {
                var $ele = $(self.contain);
                var $eleNode = $ele.children('.swiper-wrapper');
                if ($eleNode.length === 0) {
                    $eleNode = null;
                }
                if (self.items) {
                    var datas = self.items.split('.');
                    var len = datas.length;
                    var $datas = null;
                    for (var i = 0; i < len; i++) {
                        $datas = data[datas[i]];
                    }
                    $datas = self.replaceFn($datas);
                    if (!$eleNode && $ele.find('.html-list').length > 0) {
                        $ele.find('.html-list').html($datas);
                    }
                    else {
                        ($eleNode || $ele).html($datas);
                    }
                }
                else {
                    var $datas = self.replaceFn(data);
                    if (!$eleNode && $ele.find('.html-list').length > 0) {
                        $ele.find('.html-list').html($datas);
                    }
                    else {
                        ($eleNode || $ele).html($datas);
                    }
                }
                self.swiperFn($ele, 0, true);
                $ele.removeClass('loading');
            }
            else if (self.templateFlag === '1') {
                if (self.items) {
                    var datas = self.items.split('.');
                    var len = datas.length;
                    for (var i = 0; i < len; i++) {
                        datas = data[datas[i]];
                    }
                    self.renderTemplate(self.template, datas, self.contain, 0, 'html');
                }
                else {
                    self.renderTemplate(self.template, data, self.contain, 0, 'html');
                }
            }
        }
        else if (self.contype === 'onces') {
            if (self.templateFlag === '0') {
                if (self.items) {
                    var items = self.items.split(',');
                    items.forEach(function (item, index) {
                        var datas = item.split('.');
                        var len = datas.length;
                        var $datas = null;
                        for (var i = 0; i < len; i++) {
                            $datas = data[datas[i]];
                        }
                        $datas = self.replaceFn($datas);
                        var $ele = $(self.contain[index]);
                        var $eleNode = $ele.children('.swiper-wrapper');
                        if ($eleNode.length === 0) {
                            $eleNode = null;
                        }
                        if (!$eleNode && $ele.find('.html-list').length > 0) {
                            $ele.find('.html-list').html($datas);
                        }
                        else {
                            ($eleNode || $ele).html($datas);
                        }
                        self.swiperFn($ele, index, true);
                        $ele.removeClass('loading');
                    });
                }
            }
            else if (self.templateFlag === '1') {
                if (self.items) {
                    var items = self.items.split(',');
                    items.forEach(function (item, index) {
                        var datas = item.split('.');
                        var len = datas.length;
                        for (var i = 0; i < len; i++) {
                            datas = data[datas[i]];
                        }
                        self.renderTemplate(self.template, datas, self.contain[index], 0, 'html');
                    });
                }
            }
            else if (self.templateFlag === '2') {
                if (self.items) {
                    self.items.forEach(function (item, index) {
                        var datas = item.split('.');
                        var len = datas.length;
                        for (var i = 0; i < len; i++) {
                            datas = data[datas[i]];
                        }
                        self.renderTemplate($(self.template[index])[0],
                            datas, self.contain[index], 0, 'html', index);
                    });
                }
            }
        }
    };

    /**
     * [request 数据请求]
     *
     * @param  {string} src ajax请求的url
     */

    customElement.prototype.request = function (ele, src) {
        var self = this;
        var url = self.getUrl(ele, src);
        if (self.contain instanceof Array) {
            self.contain.forEach(function (item) {
                $(item).addClass('loading');
            });
        }
        else {
            $(self.contain).addClass('loading');
        }
        fetchJsonp(url, {
            jsonpCallback: 'callback',
            timeout: self.timeout
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            self.htmlFun(data);
        });
    };

    /**
     * [swiperFn swiper处理函数]
     *
     * @param  {Object} ele 目标元素
     * @param  {number} index 索引值
     * @param  {boolean} flag 是否需要reInit
     */

    customElement.prototype.swiperFn = function (ele, index, flag) {
        var self = this;
        var swiper = self.swiper;
        if (ele[0].swiper && flag) {
            ele[0].swiper.update(true);
            ele[0].swiper.slideTo(0, 0);
            return;
        }
        if (!swiper) {
            return;
        }
        try {
            var data = JSON.parse(swiper);
            /* global Swiper */
            if (data instanceof Array) {
                if (data[index].noswiper !== 'true') {
                    if (data[index].myele) {
                        $(data[index].myele).forEach(function (item) {
                            item.swiper = new Swiper(item, data[index]);
                        });
                    }
                    else {
                        ele[0].swiper = new Swiper(ele[0], data[index]);
                    }
                }
            }
            else {
                if (data.noswiper !== 'true') {
                    if (data.myele) {
                        $(data[index].myele).forEach(function (item) {
                            item.swiper = new Swiper(item, data);
                        });
                    }
                    else {
                        ele[0].swiper = new Swiper(ele[0], data);
                    }
                }
            }
        }
        catch (e) {
            console.error('swiper参数格式错误');
        }
    };

    /**
     * [bindevent 绑定事件]
     *
     */

    customElement.prototype.bindevent = function () {
        var self = this;
        $(self.element).find(self.ele).on('click', function () {
            if ($(this).hasClass(self.cur)) {
                return;
            }
            var index = $(self.ele).index(this);
            self.activeIndex = index;
            $(this).addClass(self.cur).siblings().removeClass(self.cur);
            var con = $(self.contain);
            con.length > 1 && con.removeClass(self.show).addClass(self.hide)
                .eq(index).addClass(self.show).removeClass(self.hide);
            if ($(this).data('load')) {
                con.eq(index).removeClass('loading');
                return;
            }
            if (!self.url) {
                var url = $(this).attr('url');
                if (url) {
                    self.request(this, url);
                }
                else {
                    if (con.get(index).swiper) {
                        con.get(index).swiper.update(true);
                    }
                }
            }
            else {
                self.url && self.request(this, self.url);
            }
        });
        var tri = $(self.element).find('[trigger-click]');
        if (tri.hasClass(self._ele) && tri.hasClass(self.cur)) {
            tri.removeClass(self.cur).trigger('click');
        }
    };


    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = this.element;
        self.ele = element.getAttribute('tab-element');
        self._ele = self.ele.replace('.', '');
        self.cur = element.getAttribute('tab-current') || 'cur';
        self.contain = element.getAttribute('tab-contain');
        self.show = element.getAttribute('tab-con-show') || 'show';
        self.hide = element.getAttribute('tab-con-hide') || 'hide';
        self.url = element.getAttribute('tab-url');
        self.timeout = element.getAttribute('timeout') || 5000;
        self.templateFlag = element.getAttribute('tab-template');
        self.swiper = element.getAttribute('swiper-params');
        if (!self.ele || !self.contain) {
            console.error('mip-jia-tab-ajax 的 tab-element 和 tab-contain 属性不能为空');
            return;
        }

        if (self.contain.indexOf(',') > -1) {
            // 只有一个contains,contains里面有多个板块更改html
            self.contain = self.contain.split(',');
            if (self.templateFlag === '1') {
                self.template = $(element).find('[templateparent]')[0];
                self.items = self.template.getAttribute('data-items');
            }
            else if (self.templateFlag === '2') {
                self.template = [];
                self.items = [];
                self.contain.forEach(function (item, index) {
                    var $item = item.replace('.', '');
                    self.template.push('#template_' + $item);
                    self.items.push($('#template_' + $item).data('items'));
                });
            }
            else if (self.templateFlag === '0') {
                self.items = element.getAttribute('tab-items');
            }
            self.contype = 'onces';
        }
        else if ($(self.contain).length > 1) {
            // 多个contains
            if (self.templateFlag === '1') {
                self.template = $(element).find('[templateparent]')[0];
                self.items = self.template.getAttribute('data-items');
            }
            else if (self.templateFlag === '2') {
                self.template = [];
                self.items = [];
                $(self.contain).forEach(function (item, index) {
                    var $item = self.contain.replace('.', '');
                    self.template.push('#template_' + $item + index);
                    self.items.push($('#template_' + $item + index).data('items'));
                });
            }
            else if (self.templateFlag === '0') {
                self.items = element.getAttribute('tab-items');
            }
            self.contype = 'multiple';
        }
        else if ($(self.contain).length === 1) {
            // 只有一个contains
            if (self.templateFlag === '1') {
                self.template = $(element).find('[templateparent]')[0];
                self.items = self.template.getAttribute('data-items');
            }
            else if (self.templateFlag === '0') {
                self.items = element.getAttribute('tab-items');
            }
            self.contype = 'once';
        }
        self.bindevent();
    };

    return customElement;
});
