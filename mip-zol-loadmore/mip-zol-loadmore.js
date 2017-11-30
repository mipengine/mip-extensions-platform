/**
 * @file mip-zol-loadmore 组件
 * @author liuxianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var templates = require('templates');

    /**
     * 拼接接口地址
     *
     * @param  {string} src   原始API地址
     * @param  {Object} query 查询参数对象
     * @return {string}       接口地址
     */
    function getQueryUrl(src, query) {
        var arr = [];
        for (var key in query) {
            if (query.hasOwnProperty(key)) {
                arr.push(key + '=' + query[key]);
            }

        }
        var queryStr = arr.join('&');
        var url = src;
        if (src.indexOf('?') > -1) {
            url += ('&' + queryStr);
        }
        else {
            url += ('?' + queryStr);
        }
        return url;
    }

    /**
     * 初始化对象
     *
     * @constructor
     */
    function init() {

        var self = this;
        var element = self.element;
        var src = element.getAttribute('data-src') || '';
        var appkey = element.getAttribute('appkey') || '';
        var token = element.getAttribute('token');
        var isNeedToken = (token && token === 'true');

        // 如果没有写data-api, 则报错提示
        if (!src) {
            console.error('未填写src字段，不能获取数据');
            element.remove();
            return;
        }

        // 默认参数设置
        self.params = {
            request: true,
            type: 'scroll',
            loading: '加载中',
            failed: '加载失败',
            over: '没有了',
            query: {
                page: 1,
                pn: 10
            }
        };

        // 获取用户设置参数
        try {
            var script = element.querySelector('script[type="application/json"]');
            if (script) {
                var customParams = JSON.parse(script.textContent.toString());
                self.params = util.fn.extend(self.params, customParams);
            }

        }
        catch (e) {
            // eslint-disable-line
            console.warn('json is illegal');
            // eslint-disable-line
            console.warn(e);
            return;
        }

        // 设置获取数据的 url
        self.url = getQueryUrl(src, self.params.query);

        // 如果需要token
        if (isNeedToken) {
            // token 获取
            var tokenApi = '//wap.zol.com.cn/mip/api/MakeToken/GetToken?appkey=' + appkey;

            fetchJsonp(tokenApi, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                if (!res.status) {
                    self.token = res.token;
                    self.params.query.appkey = appkey;
                    self.params.query.token = res.token;
                    // 重新设置获取数据的 url
                    self.url = getQueryUrl(src, self.params.query);
                }
            });
        }
    }

    /**
     * 加载数据
     *
     * @param       {Function} callback 回调函数
     * @constructor
     */
    function load(callback) {
        var self = this;
        fetchJsonp(self.url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            if (!res.status) {
                templates.render(self.element, res.data).then(function (html) {
                    var container = document.getElementById(self.params.container);
                    container.insertAdjacentHTML('beforeend', html);
                });
                var src = self.element.getAttribute('data-src');
                self.params.query.page++;
                self.url = getQueryUrl(src, self.params.query);
                callback(res.data);
            }
            else {
                self.element.isLoading = false;
                self.element.querySelector('.load-more-box').classList.remove('loading');
                toast(self.params.failed);
            }
        });
    }

    /**
     * 提示框
     *
     * @param       {string} str 提示信息
     */
    function toast(str) {
        if (document.getElementById('_j_miptoast')) {
            return;
        }

        var toast = document.createElement('div');
        toast.id = '_j_miptoast';
        toast.className = 'mip-zol-toast';
        toast.innerHTML = '<span>' + str + '</span>';
        document.body.appendChild(toast);
        document.body.style.pointerEvents = 'none';
        setTimeout(function () {
            toast.parentNode.removeChild(toast);
            document.body.style.pointerEvents = 'all';
        }, 1000);
    }

    /**
     * build 方法，元素插入到文档时执行，仅会执行一次
     */
    customElement.prototype.build = function () {
        // 参数初始化
        init.call(this);

        // 获取对应DOM
        var self = this;
        var element = this.element;
        var loadBox = element.querySelector('.load-more-box');
        var trigger = element.querySelector('.load-more-trigger');
        var loadingText = element.querySelector('.load-loading-text');
        var loadOverText = element.querySelector('.load-over-text');

        if (self.params.type === 'click') {
            if (self.params.request) {
                // 需要接口请求数据的情况
                element.isLoading = false;
                trigger.addEventListener('click', function () {
                    var that = this;
                    that.parentNode.classList.add('loading');
                    if (!element.isLoading) {
                        element.isLoading = true;
                        load.call(self, function (data) {
                            element.isLoading = false;
                            that.parentNode.classList.remove('loading');
                            if (data.isEnd) {
                                that.parentNode.classList.add('load-over');
                                loadOverText.innerHTML = self.params.over;
                            }

                        });
                    }

                });
            }
            else {
                // 不需要接口请求数据的情况
                var container = document.getElementById(self.params.container);
                var showedNum = 0;
                // 获取隐藏的总数
                var totalHiddenLength = parseInt(container.getAttribute('data-hidden-total'), 10);
                trigger.addEventListener('click', function () {
                    if (!totalHiddenLength) {
                        toast(self.params.failed);
                    }
                    else {
                        var hiddenList = container.querySelectorAll('.hidden');
                        Array.prototype.forEach.call(hiddenList, function (item, i) {
                            if (i < self.params.query.pn) {
                                item.classList.remove('hidden');
                            }
                        });
                        // 如果全部显示完全  则隐藏更多按钮
                        showedNum += self.params.query.pn;
                        if (showedNum >= totalHiddenLength) {
                            this.parentNode.classList.add('load-over');
                            loadOverText.innerHTML = self.params.over;
                        }
                    }
                });
            }
        }
        else if (self.params.type === 'scroll') {
            loadBox.classList.add('loading');
        }

        // 加载中的文字
        loadingText.innerHTML = self.params.loading;

    };

    /**
     * 进入可视区回调
     *
     * @param  {boolean} inViewport 判断是进入可视区还是离开可视区
     */
    customElement.prototype.viewportCallback = function (inViewport) {
        var self = this;
        var element = self.element;
        var loadBox = element.querySelector('.load-more-box');
        var loadOverText = element.querySelector('.load-over-text');
        var isLoadOver = loadBox.classList.contains('load-over');

        if (inViewport && self.params.type === 'scroll' && !isLoadOver) {
            // 当加载更多元素进入窗口可视区的时候进行加载
            element.isLoading = false;
            if (!element.isLoading) {
                element.isLoading = true;
                load.call(self, function (data) {
                    if (data.isEnd) {
                        loadBox.classList.remove('loading');
                        loadBox.classList.add('load-over');
                        loadOverText.innerHTML = self.params.over;
                    }
                    else {
                        element.isLoading = false;
                    }
                });
            }
        }

    };

    return customElement;
});
