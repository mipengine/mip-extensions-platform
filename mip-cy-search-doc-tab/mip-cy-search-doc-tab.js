/**
 * @file mip-cy-tab 组件
 * @author 春雨前端开发组
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Modal = require('./modal');
    var customElement = require('customElement').create();
    var domain = 'https://m.chunyuyisheng.com';

    /**
     * 第一次进入可视区回调，只会执行一次
    */
    customElement.prototype.build = function () {
        var $ele = $(this.element);
        var tabId = $ele.attr('tab-id') || '';
        var $tabs = $('#' + tabId + ' li', $ele);
        var $items = $('.mip-cy-item', $ele);
        var modal = new Modal($ele, clearAll);

        // 切换顶部
        $tabs.on('click', function () {
            var $this = $(this);
            var itemId = $this.data('id');
            var curItem = $('#' + itemId, $ele);
            $items.hide();
            curItem.css('display', 'flex');
            modal.open();
            if ($this.hasClass('cur')) {
                return;
            }

            $tabs.removeClass('cur');
            $this.addClass('cur');
            setData('itemId', itemId);
        });

        // 选择一级条目
        $('.sub-item-start li', $items).on('click', function () {
            var $this = $(this);
            var id = $this.data('id');
            var name = $this.data('name');
            var nameVal = $this.data(name);
            var sName = $this.data('subName');
            var itemId = getData('itemId');
            var $parent;
            var $ulList;
            var index;

            setData('new-' + name, nameVal);
            setData('new-' + name + '-id', id);
            if (!id) {
                setData(name, nameVal);
                setData(name + '-id', id);
                setData(sName, '');
                setData(sName + '-id', '');
                renderDocList(getSrc());
                modal.close();
                setTitle(itemId, getData(name));
            }

            if ($this.hasClass('cur')) {
                return;
            }

            $parent = $this.parent('ul');
            $parent.find('li').removeClass('cur');
            $this.addClass('cur');

            // 展示二级目录
            $ulList = $('#' + itemId + ' .sub-item-end').find('ul');
            index = $this.index();
            $ulList.hide();
            $ulList.eq(index).show();
        });

        // 选择二级条目
        $('.sub-item-end li', $items).on('click', function () {
            var $this = $(this);
            var id = $this.data('id');
            var name = $this.data('name');
            var nameVal = $this.data(name);
            var sName = $this.data('superName');
            var itemId = getData('itemId');
            setData(sName + '-id', getData('new-' + sName + '-id'));
            setData(sName, getData('new-' + sName));
            setData(name + '-id', id);
            setData(name, nameVal);
            renderDocList(getSrc());
            setTitle(itemId, getData(name) || getData(sName));
            modal.close();
        });

        // 搜索框相关事件
        $('#mip-cy-query', $ele).bind('input propertychange', function () {
            setData('query', $.trim($('#mip-cy-query').val()));
        });
        $('#mip-cy-search', $ele).on('submit', function (event) {
            event.preventDefault();
            $('#mip-cy-query', $ele).blur();
            renderDocList(getSrc());
            modal.close();
        });

        function setData(name, value) {
            if (!name) {
                return;
            }

            $ele.data(name, value || '');
        }

        function getData(name) {
            return $ele.data(name) || '';
        }

        function setTitle(tabId, name) {
            var $li = $('li[data-id="' + tabId + '"]', $ele);
            name = name || $li.data('defaultName');
            $('.title', $li).text(name);
        }

        function getSrc() {
            var url = domain + '/mip/search_doctor/?';
            var paras = [
                'clinic_no=' + getData('clinicId'),
                '&second_class_clinic_no=' + getData('scnId'),
                '&province=' + getData('provinceId'),
                '&city=' + getData('cityId'),
                '&query=' + getData('query')
            ].join('');

            return url + paras;
        }

        function renderDocList(src) {
            var html = [
                '<mip-cy-list template="mip-cy-doc-list"',
                ' src=' + src,
                ' id="mip-cy-list" has-more pnName="page" preLoad>',
                '</mip-cy-list>'
            ].join('');

            $('#cy-doc-list-wrap').html(html);
        }

        function clearAll() {
            $tabs.removeClass('cur');
            $items.hide();
        }
    };

    return customElement;
});
