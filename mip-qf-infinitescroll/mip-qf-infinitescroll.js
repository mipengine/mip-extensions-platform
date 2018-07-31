/**
 * @file mip-qf-infinitescroll 组件
 * @author 9-lives
 */

define(function (require) {
    const parsePackInfo = require('./parsePackInfo');
    const mustache = require('templates');
    const utils = require('./utils');

    let customElement = require('customElement').create();
    let component; // 组件元素
    let btn; // 加载按钮
    let params; // jsonp 参数
    let properties; // HTML 属性
    let itemNum = 0; // 当前数据序号

    let scroll = {};

    // 按钮相关
    let btnLoading = {
        // 增加点击事件监听
        addHandler() {
            btn.addEventListener('click', btnLoading.handler, false);
        },
        // 点击事件监听
        handler() {
            // 增加滚动监听
            scroll.addHandler();
            // 移除按钮点击事件监听
            btn.removeEventListener('click', btnLoading.handler);
            scroll.trigger();
        },
        // 移除点击事件监听
        rmHandler() {
            btn.removeEventListener('click', btnLoading.handler, false);
        }
    };

    // 加载相关
    let loading = {
        // 加载失败回调
        failure() {
            if (btn) {
                btn.innerText = properties.failedTxt;
                // 移除滚动监听
                scroll.rmHandler();
                // 增加按钮点击事件监听
                btnLoading.addHandler();
            }

            loading.finally();
        },
        // 最终加载回调，无论成功或失败均会执行
        finally() {
            loading.isLoading = false;
        },
        // 加载状态
        isLoading: false,
        // 加载
        load() {
            loading.isLoading = true;
            if (btn) {
                btn.innerText = properties.loadingTxt;
            }

            /* eslint-disable */
            utils.getDataByJsonp(loading.failure, loading.success, properties.timeout, utils.setUrlParams(properties.url, params));
            /* eslint-disable */
        },
        // 加载成功回调
        success(data) {
            params.pageIndex++;

            if (!data || (data instanceof Array && data.length === 0)) {
                // 无数据返回，加载完毕
                window.removeEventListener('scroll', scroll.handler);
                return;
            }

            // 处理数据
            for (let d of data) {
                // 下载链接
                if (d.downloadlink) {
                    d.downloadlink = parsePackInfo(d.downloadlink, properties.mbPrefix, properties.nonMBPrefix);
                }

                // 序号
                if (!d.itemnum) {
                    d.itemnum = ++itemNum;
                }
            }

            mustache.render(component.element, data)
                .then(function (rs) {
                    let ul = component.element.querySelector('ul');

                    if (rs instanceof Array) {
                        rs = rs.join('');
                    }

                    ul.innerHTML += rs;
                });

            loading.finally();
        }
    };

    // 滚动相关
    scroll = {
        // 增加滚动事件监听
        addHandler() {
            window.addEventListener('scroll', scroll.handler, utils.isPassiveEvtSupport() ? {
                passive: true
            } : false);
        },
        // 滚动事件监听
        handler() {
            utils.rqFrame.call(window, scroll.trigger);
        },
        // 移除滚动事件监听
        rmHandler() {
            window.removeEventListener('scroll', scroll.handler);
        },
        // 触发器
        trigger() {
            if (loading.isLoading) {
                // 正在加载，不重复触发
                return;
            }

            /* eslint-disable */
            let btmPos = window.innerHeight + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop); // 视口底部到文档顶部高度
            /* eslint-disable */
            let limitHt = component.element.offsetTop - properties.gap;

            if (btmPos > limitHt) {
                loading.load();
            }
        }
    };

    customElement.prototype.createdCallback = function () {
        component = this;
        btn = component.element.querySelector('.mip-qf-infinitescroll-btn');

        params = utils.getCustomParams(this.element);
        properties = utils.getHtmlProperties(this.element);

        if (!params || !properties) {
            return error();
        }
    };

    customElement.prototype.attachedCallback = function () {
        scroll.handler();
        scroll.addHandler();
    };

    customElement.prototype.detachedCallback = function () {
        if (btn) {
            scroll.rmHandler();
        }

        scroll.rmHandler();
    };

    return customElement;

    // 错误处理
    function error() {
        return this.element.remove();
    }
});
