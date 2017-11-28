/**
 * @file mip-all-checkout 组件
 * @author fe.xiaowu@gmail.com
 */

define(function (require) {
    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var element = this.element;
        var dataset = element.dataset;
        var allElem = [].slice.call(element.querySelectorAll(dataset.allSelector || '.mip-all-checkout-btn'));
        var filterElem = [].slice.call(element.querySelectorAll(dataset.filterSelector || '.mip-all-checkout-input'));

        /**
         * 获取元素集中选中的元素
         *
         * @param {HTMLElements} elems 元素数组
         * @return {HTMLElements}
         */
        var getChecked = function (elems) {
            return elems.filter(function (el) {
                return !!el.checked;
            });
        };

        /**
         * 操作元素集选中状态
         *
         * @param {HTMLElements} elems 元素数组
         * @param {boolean} checked 是否选中
         */
        var setCheck = function (elems, checked) {
            elems.forEach(function (el) {
                el.checked = checked;
            });
        };

        allElem.forEach(function (elem) {
            elem.addEventListener('change', function () {
                setCheck(filterElem, this.checked);
                setCheck(allElem, this.checked);
            });
        });

        filterElem.forEach(function (elem) {
            elem.addEventListener('change', function () {
                setCheck(allElem, getChecked(filterElem).length === filterElem.length);
            });
        });

        // 如果已经有一个全选按钮被选中
        if (getChecked(allElem).length > 0) {
            setCheck(allElem, true);
            setCheck(filterElem, true);
        }

        // 如果默认全部选中了
        else if (getChecked(filterElem).length === filterElem.length) {
            setCheck(allElem, true);
            setCheck(filterElem, true);
        }
    };

    return customElement;
});
