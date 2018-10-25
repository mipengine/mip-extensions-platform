/**
 * @file mip-haitweet-template-list 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 渲染Dom元素
     *
     * @param {*} data 渲染数据
     */
    function render(data) {
        var self = this;
        var nodeList = [];
        if (data && data instanceof Array) {
            var fragment = document.createDocumentFragment();
            data.map(function (item) {
                var node = document.createElement('div');
                node.innerHTML = item.name;
                node.setAttribute('role', 'listitem');
                node.setAttribute('role-id', item.id);
                node.setAttribute('role-name', item.name);
                node.classList = ['item'];
                nodeList.push(node);
                fragment.appendChild(node);
            });
        }
        // 绑定click事件
        nodeList.forEach(function (n) {
            n.addEventListener('click', function (event) {
                var activeItem = self.element.getElementsByClassName('active')[0];
                if (activeItem) {
                    activeItem.classList.remove('active');
                }
                event.target.classList.add('active');
            });
        });
        self.container.appendChild(fragment);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;

        self.container = document.createElement('div');
        self.applyFillContent(this.container);
        self.element.appendChild(this.container);

        if (!self.container.hasAttribute('role')) {
            self.container.setAttribute('role', 'list');
        }

        var url = '//www.haitweet.com/?s=/api/template';
        fetch(url)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                if (data.results) {
                    render.call(self, data.results);
                }
            });
    };

    return customElement;
});
