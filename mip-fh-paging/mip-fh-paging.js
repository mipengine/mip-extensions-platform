/**
 * @author: laoono
 * @date:  2017-01-13
 * @time: 15:35
 * @file: mip-fh-paging.js
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {

    var customElem = require('customElement').create();
    var util = require('util');

    /**
     * 获取元素绑定的异步属性
     *
     * @param {Object} element [组件节点]
     * @return {Object}
     */
    function getOpt(element) {
        var id = element.id;
        var url = element.getAttribute('url');
        var view = element.getAttribute('view');
        var force = element.hasAttribute('force') || false;

        // 元素参数
        var opt = {
            id: id,
            url: url,
            view: view || 'detail',
            force: force
        };

        return opt;
    }

    /**
     * [render 渲染方法]
     *
     */
    function render() {
        var self = this;
        var element = self.element;
        var data = getPageData(element) || {};


        var opt = getOpt(element);
        var url = opt.url;
        var view = opt.view;
        var force = opt.force;

        if (!util.fn.isPlainObject(data) && !force) {
            return;
        }
        var curr = data.curr || 1;
        var total = data.total || 1;
        var prev = data.prev || {};
        var next = data.next || {};

        if (total === 1 && !force) {
            return;
        }

        var options = [];
        var selectBoxHtml;
        var option;
        var $select;

        // 分页容器节点
        var $prev = document.createElement('a');
        var $next = document.createElement('a');
        var $selectBox = document.createElement('div');
        var $wrap = document.createElement('div');

        var $prevTxt = view === 'list' ? '首页' : '上一篇';
        var $nextTxt = view === 'list' ? '末页' : '下一篇';

        $selectBox.className = 'mip-fh-paging-curr-box';
        $wrap.className = 'mip-fh-paging-wrap';

        $prev.textContent = curr === 1 ? $prevTxt : '上一页';

        $prev.href = curr === 1 ? prev.url : repalceUrl(url, [curr - 1]);

        $next.textContent = curr === total ? $nextTxt : '下一页';

        $next.href = curr === total ? next.url : repalceUrl(url, [curr + 1]);

        element.appendChild($wrap);

        [$prev, $selectBox, $next].forEach(function (val) {
            $wrap.appendChild(val);
        });

        // 保存所有的分页option
        for (var n = 1; n <= total; n++) {
            option = '<option ' + (curr === n ? 'selected' : '') + ' value="' + n + '">' + n + '</option>';
            options.push(option);
        }

        selectBoxHtml = [
            '<select class="mip-fh-paging-select">',
            options.join(''),
            '</select>',
            '<i class="mip-fh-paging-arrow"></i>'
        ];

        selectBoxHtml.unshift('<span class="mip-fh-paging-curr">', curr, '</span>'
            , '<em>/</em>', '<span class="mip-fh-paging-total">', total, '</span>');

        $selectBox.innerHTML = selectBoxHtml.join('');

        $select = element.querySelector('select');

        // 监听select的change事件
        $select.addEventListener('change', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var value = this.value;

            location.href = repalceUrl(url, [value]);
        }, false);
    }

    /**
     * repalceUrl 替换分布url
     *
     * @param {string} url 链接
     * @param {Array} nums 替换的数组
     * @return {*|string}
     *
     */
    function repalceUrl(url, nums) {
        url = url || '';
        nums = Array.isArray(nums) ? nums : [];

        var reg = /\$\d+/gi;
        var urls = url.match(reg);


        urls.forEach(function (val, key) {

            url = url.replace(val, nums[key]);
        });

        return url;
    }

    /**
     * getPageData 获取分布数据
     *
     * @param {Object} element 组件节点
     * @return {null}
     */
    function getPageData(element) {
        var script = element.querySelector('script[type="application/json"]');
        var data = script ? JSON.parse(script.textContent.toString()) : null;

        return data;
    }

    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.build = render;

    return customElem;
});
