/**
 * @file mip-zol-like 组件
 * @author jiao.yang@zol.com.cn
 */

define(function (require) {

    var fetchJsonp = require('fetch-jsonp');

    var customElement = require('customElement').create();

    /**
     * 提示框，需自定义样式
     *
     * @param  {string} str 提示信息
     */
    function toast(str) {
        if (this.querySelector('._j_miptoast')) {
            return;
        }

        var toast = document.createElement('div');
        toast.className = '_j_miptoast mip-zol-toast';
        toast.innerHTML = '<span>' + str + '</span>';
        this.appendChild(toast);
        document.body.style.pointerEvents = 'none';
        setTimeout(function () {
            toast.parentNode.removeChild(toast);
            document.body.style.pointerEvents = 'all';
        }, 800);
    }

    /**
     * 拼接接口地址
     *
     * @param  {string} src   原始API地址
     * @param  {string} query 查询参数
     * @return {string}       接口地址
     */
    function getQueryUrl(src, query) {
        var url = src;
        if (src.indexOf('?') > -1) {
            url += ('&' + query);
        }
        else {
            url += ('?' + query);
        }
        return url;
    }

    /**
     * 点赞方法
     *
     * @param  {Function} callback 回调函数
     */
    function like(callback) {

        var self = this;
        var ele = self.element;
        var url = ele.dataset.src;
        var query = ele.dataset.query;

        // 点评状态
        if (ele.dataset.status) {
            query += '&status=' + ele.dataset.status;
        }

        // 登录信息
        if (window.ZOL_USER_INFO.sid) {
            query += '&userId=' + window.ZOL_USER_INFO.sid;
        }

        url = getQueryUrl(url, query);

        // 请求接口
        fetchJsonp(url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            // 防止快点
            self.lock = false;
            callback && callback(res);
        });
    }

    customElement.prototype.firstInviewCallback = function () {

        var self = this;
        var ele = self.element;
        var data = ele.dataset;
        var canCansel = (data.cansel && data.cansel === 'true');
        var status = data.status ? data.status : 0;
        var doneClass = data.done;
        var isNeedCallback = (data.callback && data.callback === 'true');
        var likeElm = ele.querySelector('._js_mip_like');
        var numElm = likeElm.querySelector('em');

        if (status !== null && status === '1') {
            likeElm.classList.add(doneClass);
        }

        var changeLikeNum = function () {
            var voteNum = numElm.innerText || numElm.textContent;
            voteNum = voteNum.match(/\d+/);
            voteNum = voteNum ? parseInt(voteNum[0], 10) : 0;
            if (likeElm.classList.contains(doneClass)) {
                if (!canCansel) {
                    return;
                }
                likeElm.classList.remove(doneClass);
                var num = (voteNum - 1 > 0) ? voteNum - 1 : 0;
                numElm.innerHTML = num ? '(' + num + ')' : '';
            }
            else {
                likeElm.classList.add(doneClass);
                var numStr = '(' + (voteNum + 1) + ')';
                numElm.innerHTML = numStr;
            }
        };

        likeElm.addEventListener('click', function () {

            // 防止快点
            if (self.lock) {
                toast.call(self, '点击太快啦~');
                return;
            }
            self.lock = true;

            // 改变状态
            if (likeElm.classList.contains(doneClass)) {
                if (!canCansel) {
                    return;
                }
                ele.setAttribute('data-status', '0');
            }
            else {
                ele.setAttribute('data-status', '1');
            }

            // 如果需要回调函数
            if (isNeedCallback) {
                like.call(self, function (res) {
                    if (!res.status) {
                        changeLikeNum();
                        // to do
                    }
                    else {
                        toast.call(self, res.message);
                    }
                });
            }
            else {
                changeLikeNum();
                like.call(self);
            }
        });
    };

    return customElement;
});
