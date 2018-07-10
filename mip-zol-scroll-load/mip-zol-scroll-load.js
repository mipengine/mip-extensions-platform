/**
 * @file mip-zol-scroll-load 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var viewer = require('viewer');
    var fetchJsonp = require('fetch-jsonp');
    var templates = require('templates');
    var viewport = require('viewport');

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
            console.error('未填写src字段，不能获取数据'); // eslint-disable-line
            element.remove();
            return;
        }

        // 默认参数设置
        self.params = {
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
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
            return;
        }

        // 设置获取数据的 url
        self.url = getQueryUrl(src, self.params.query);

        // 是否从第一页开始
        self.params.isFirstPage = (self.params.query.page === 1);

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
     * 提示框
     *
     * @param       {string} str 提示信息
     */
    function toast(str) {
        if (this.querySelector('._j_miptoast')) {
            return;
        }
        var toast = document.createElement('div');
        toast.className = '_j_miptoast mip-zol-toast';
        toast.innerHTML = '<span>' + str + '</span>';
        this.appendChild(toast);
        setTimeout(function () {
            toast.parentNode.removeChild(toast);
        }, 800);
    }

    // load 数据
    function loadDataHandle(isRefresh, callback) {
        var self = this;
        var element = self.element;
        var scrollLoadStatus = element.querySelector('.js_load_status');
        var loadOverText = scrollLoadStatus.querySelector('.load-over-text');
        var loadEmptyText = scrollLoadStatus.querySelector('.load-empty-text');
        // 是否是重载数据
        element.isRefresh = isRefresh;
        // 当加载更多元素进入窗口可视区的时候进行加载
        if (!element.isLoading) {
            element.isLoading = true;
            fetchJsonp(self.url, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                if (!res.status) {
                    var data = res.data;
                    templates.render(self.element, data).then(function (html) {
                        self.container.insertAdjacentHTML('beforeend', html);
                        callback();
                    });
                    if (!data.items.length && data.page === 1) {
                        scrollLoadStatus.classList.remove('loading');
                        scrollLoadStatus.classList.add('load-empty');
                        loadEmptyText.innerHTML = self.params.empty;
                        self.scrollLock = true;
                    }
                    else if (data.isEnd) {
                        scrollLoadStatus.classList.remove('loading');
                        scrollLoadStatus.classList.add('load-over');
                        loadOverText.innerHTML = self.params.over;
                        self.scrollLock = true;
                    }
                    element.isLoading = false;
                    var src = self.element.getAttribute('data-src');
                    self.params.query.page++;
                    self.url = getQueryUrl(src, self.params.query);
                    element.isRefresh = false;
                }
                else {
                    element.isLoading = false;
                    scrollLoadStatus.classList.remove('loading');
                    toast.call(self, self.params.failed);
                    callback();
                }
            });
        }
    }

    /**
     * Simplified variable writing, such as m.name.firstName, we can write as name.firstName
     *
     * @param {string} exp value of directive
     * @return {string} anonymous funtion which change runtime scope and return expression
     */
    function getWithResult(exp) {
        return new Function((''
            + 'with(this){'
            +   'try {'
            +       'return ' + exp
            +   '} catch (e) {'
            +       'throw e'
            +   '}'
            + '}'
        ));
    }

    function refreshViewport() {
        this.scrollerHeight = viewport.getScrollHeight(); // 滚动容器高度
        this.wrapperHeight = viewport.getHeight(); // 可视区高度
        this.currentScrollTop = viewport.getScrollTop(); // 当前滚动条位置
    }

    function initScrollLoad(isRefresh) {
        var self = this;
        self.scrollerHeight = viewport.getScrollHeight(); // 滚动容器高度
        self.wrapperHeight = viewport.getHeight(); // 可视区高度
        self.currentScrollTop = viewport.getScrollTop(); // 当前滚动条位置
        viewport.on('scroll', function () {
            if (self.scrollLock) {
                return;
            }
            // 获取当前滚动条位置
            self.currentScrollTop = viewport.getScrollTop();
            // 某些浏览器(安卓QQ)滚动时会隐藏头部但不触发resize,需要反复获取 wtf...
            self.wrapperHeight = viewport.getHeight();
            // 到底了
            if (self.currentScrollTop >= self.scrollerHeight - self.wrapperHeight) {
                loadDataHandle.call(self, isRefresh, function () {
                    refreshViewport.call(self);
                });
            }
        });
        // 若初始即不满一屏,trigger scroll事件触发加载
        if (self.currentScrollTop >= self.scrollerHeight - self.wrapperHeight) {
            viewport.trigger('scroll');
        }
    }

    /**
     * build 方法，元素插入到文档时执行，仅会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;

        // 参数初始化
        init.call(this);

        // 获取对应DOM
        var element = this.element;
        var scrollLoadStatus = element.querySelector('.js_load_status');
        var loadingText = scrollLoadStatus.querySelector('.load-loading-text');
        var container = element.querySelector('.js_container');

        self.container = container;

        scrollLoadStatus.classList.add('loading');

        // 加载中的文字
        loadingText.innerHTML = self.params.loading;
        self.scrollLock = false;

        initScrollLoad.call(self);

        // 滚动加载的适合向外提供方法
        self.addEventAction('refresh', function (e, extra) {
            container.innerHTML = '';
            refreshViewport();
            self.scrollLock = false;
            scrollLoadStatus.classList.remove('load-over', 'load-empty');
            scrollLoadStatus.classList.add('loading');
            var src = element.getAttribute('data-src') || '';
            var query = self.params.query;
            query.page = 1;
            var extraQuery = [];
            if (e.extraQuery && e.extraQuery.length) {
                e.extraQuery.forEach(function (item) {
                    extraQuery.push(item);
                });
            }
            if (extra) {
                extra = getWithResult(extra)();
                if (Array.isArray(extra) && extra.length) {
                    extra.forEach(function (item) {
                        extraQuery.push(item);
                    });
                }
            }
            if (extraQuery.length) {
                extraQuery.forEach(function (item) {
                    if (item.value !== '') {
                        query[item.name] = item.value;
                    }
                });
            }
            self.url = getQueryUrl(src, query);
            initScrollLoad.call(self, true);
        });

        // 绑定找到组件下面元素的方法，并返回给其他组件使用
        self.addEventAction('findElement', function (e) {
            var roleSelector = e.itemRole;
            var roleElements = [];
            roleSelector.forEach(function (item) {
                roleElements.push(container.querySelector('#' + item));
            });
            viewer.eventAction.execute('elementFinded', self.element, {
                roleElement: roleElements,
                targetElement: e.targetElement
            });
        });
    };

    return customElement;
});
