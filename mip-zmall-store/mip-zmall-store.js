/**
 * @file mip-zmall-store 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 创建门店列表层
     *
     * @param {HTMLElement} element 组件DOM
     */
    function create(element) {

        var storeListLayerHtml = [
            '<div id="js_store_box" class="store-box">',
            '<div class="store-box__filter">',
            '<ul id="js_store_filter_tab" class="store-box__tab flex">',
            '<li class="item" panel="js_store_filter_city"><span>选择地区</span></li>',
            '<li class="item" panel="js_store_filter_order"><span>排序条件</span></li>',
            '</ul><div class="store-box__filter-layer">',
            '<div id="js_store_filter_city" class="store-box__filter-city">',
            '<ul id="js_store_citys" class="store-box__filter-list"></ul></div>',
            '<div id="js_store_filter_order" class="store-box__filter-order">',
            '<ul class="store-box__filter-list">',
            '<li data-order="1" class="selected">按收货地址排序</li>',
            '<li data-order="2">按当前距离排序</li>',
            '</ul></div>',
            '</div><div class="store-box__filter-mask"></div></div>',
            '<div id="js_store_scroller" class="store-box__scroller">',
            '<ul id="js_store_list" class="store-box__list"></ul>',
            '<p class="store-box__more disabled">正在为您加载更多门店...</p>',
            '<div class="store-box__list-empty"><p>很抱歉，当前地区没有门店</p></div>',
            '<div class="store-box__list-loading"></div>',
            '</div><span class="store-box__back" on="click:myStorePicker.close">返回</span>',
            '</div>'
        ].join('');

        element.parentNode.style.height = '100%';
        element.innerHTML = storeListLayerHtml;

        setTimeout(function () {
            element.querySelector('#js_store_box').classList.add('show');
        }, 10);

        // 搜索框和返回按钮禁止移动事件
        var backElm = element.querySelector('.store-box__back');
        backElm.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });

        // 排序筛选
        var orderPanel = element.querySelector('#js_store_filter_order');
        orderPanel && orderPanel.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });

    }

    // 处理弹层上面的滚动
    function smartScroll(container, selectorScrollable) {
        // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
        if (!selectorScrollable || container.isBindScroll) {
            return;
        }

        var data = {
            posY: 0,
            maxscroll: 0
        };

        // 事件处理
        container.addEventListener('touchstart', function (e) {
            var events = e.touches[0] || e;
            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = container.scrollTop;
            // 是否可以滚动
            data.maxscroll = container.scrollHeight - container.clientHeight;
        });

        container.addEventListener('touchmove', function (e) {
            var events = e.touches[0] || e;
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0) {
                // 禁止滚动
                e.preventDefault();
            }
            // 当前的滚动高度
            var scrollTop = container.scrollTop;
            // 移动距离
            var distanceY = events.pageY - data.posY;

            // 上下边缘检测
            if (distanceY > 0 && scrollTop === 0) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                e.preventDefault();
                return;
            }

            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                e.preventDefault();
                return;
            }
        });

        container.addEventListener('touchend', function (e) {
            data.maxscroll = 0;
        });

        // 防止多次重复绑定
        container.isBindScroll = true;
    }

    // 渲染城市
    function renderCity(element, citys) {
        var citysHtml = '';
        //  class="selected"
        citys.forEach(function (item) {
            var selected = !item.id ? ' class="selected"' : '';
            citysHtml += '<li' + selected + ' data-id="' + item.id + '">' + item.name + '</li>';
        });
        var cityFilterElement = element.querySelector('#js_store_citys');
        cityFilterElement.innerHTML = citysHtml;
        var cityScrollerElement = cityFilterElement.parentNode;
        if (citys.length > 5) {
            cityScrollerElement.classList.add('scroll');
        }
        smartScroll(cityScrollerElement, true);
    }

    // 渲染门店列表
    function renderStore(element, stores, page) {
        var storesHtml = '';
        var length = stores.length;
        var listScrollerElement = element.querySelector('#js_store_scroller');
        var loadMoreElement = element.querySelector('.store-box__more');
        stores.forEach(function (item) {
            storesHtml += [
                '<li class="item"><label for="s_' + item.storeId + '">',
                '<p class="store-list__name">' + item.name + '</p>',
                '<p class="store-list__address">' + item.address + '</p>',
                '<p class="store-list__distance">距您收货地址' + item.distanceStr + '</p>',
                '<input name="store" type="radio" id="s_' + item.storeId + '" data-name="' + item.name + '"',
                ' data-address="' + item.address + '" data-distance="' + item.distanceStr + '"',
                ' data-lat="' + item.lat + '" data-lng="' + item.lng + '" value="' + item.storeId + '">',
                '<span class="radio"></span>',
                '</label></li>'
            ].join('');
        });
        var storeListElement = element.querySelector('#js_store_list');
        if (page > 1) {
            storeListElement.insertAdjacentHTML('beforeend', storesHtml);
            // 滚动加载状态
            if (length < 10) {
                loadMoreElement.classList.add('disabled');
                listScrollerElement.scrollLoadEnd = true;
            }
        }
        else {
            storeListElement.innerHTML = storesHtml;
        }
        smartScroll(listScrollerElement, true);
        listScrollerElement.scrollLoading = false;
        element.page = page + 1;
    }

    // 获取数据
    function getStoreData(element, cityId, order, page, isFilter) {
        var lat = element.getAttribute('lat') || 0;
        var lng = element.getAttribute('lng') || 0;
        var merchantId = element.getAttribute('mid') || 0;
        var url = element.getAttribute('url');

        var listScrollerElement = element.querySelector('#js_store_scroller');
        var loadMoreElement = element.querySelector('.store-box__more');

        cityId = cityId || 0;
        page = page || 1;
        order = order || 1;
        var ajaxUrl = url + '&merchantId=' + merchantId + '&cityId=' + cityId
                    + '&lat=' + lat + '&lng=' + lng + '&order=' + order + '&page=' + page;
        if (isFilter) {
            ajaxUrl += '&isFilter=1';
        }

        // 加载中
        listScrollerElement.scrollLoading = true;

        fetchJsonp(ajaxUrl, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            if (res.flag) {
                // 城市
                if (!res.isFilter && page === 1) {
                    renderCity(element, res.city);
                }
                if (!res.total) {
                    listScrollerElement.classList.add('empty');
                    return;
                }
                // 滚动加载状态
                if (res.total <= 10) {
                    loadMoreElement.classList.add('disabled');
                    listScrollerElement.scrollLoadEnd = true;
                }
                else {
                    loadMoreElement.classList.remove('disabled');
                    listScrollerElement.scrollLoadEnd = false;
                }
                listScrollerElement.classList.add('loaded');
                renderStore(element, res.storeList, page);
            }
        });
    }

    // 滚动事件
    function bindListScrollEvent(element) {
        var scroller = element.querySelector('#js_store_scroller');
        scroller.addEventListener('scroll', function () {
            if (!this.scrollLoadEnd && !this.scrollLoading) {
                var scrollY = scroller.scrollTop;
                if (scroller.scrollHeight - scroller.clientHeight === scrollY) {
                    getStoreData(element, element.cityId, element.order, element.page, element.isFilter);
                }
            }
        });
    }

    // 绑定城市筛选
    function bindCityEvent(element) {
        var cityFilterElement = element.querySelector('#js_store_citys');
        cityFilterElement.addEventListener('click', function (e) {
            var targetElement = e.target;
            var selected = cityFilterElement.querySelector('.selected');
            if (targetElement.tagName === 'LI') {
                if (targetElement.classList.contains('selected')) {
                    return;
                }
                var cityId = targetElement.dataset.id;
                element.cityId = cityId;
                element.isFilter = 1;
                getStoreData(element, cityId, element.order, 1, 1);
                selected.classList.remove('selected');
                targetElement.classList.add('selected');
                var filterMask = element.querySelector('.store-box__filter-mask');
                filterMask.click();
            }
        });
    }

    // 绑定排序筛选
    function bindOrderEvent(element) {
        var orderFilterElement = element.querySelector('#js_store_filter_order');
        orderFilterElement.addEventListener('click', function (e) {
            var targetElement = e.target;
            var selected = orderFilterElement.querySelector('.selected');
            if (targetElement.tagName === 'LI') {
                if (targetElement.classList.contains('selected')) {
                    return;
                }
                var orderId = targetElement.dataset.order;
                element.order = orderId;
                element.isFilter = 1;
                getStoreData(element, element.cityId, orderId, 1, 1);
                selected.classList.remove('selected');
                targetElement.classList.add('selected');
                var filterMask = element.querySelector('.store-box__filter-mask');
                filterMask.click();
            }
        });
    }

    // 筛选事件
    function bindFilterEvent(element) {
        var filterTab = element.querySelector('#js_store_filter_tab');
        var filterItems = filterTab.querySelectorAll('li');
        [].forEach.call(filterItems, function (item) {
            item.addEventListener('click', function () {
                var panel = item.getAttribute('panel');
                var panelElement = element.querySelector('#' + panel);
                var parentsElement = filterTab.parentNode;
                if (item.classList.contains('current')) {
                    parentsElement.classList.remove('visible');
                    item.classList.remove('current');
                    panelElement.classList.remove('visible');
                }
                else {
                    parentsElement.classList.add('visible');
                    panelElement.classList.add('visible');
                    var currentFilterItem = filterTab.querySelector('.current');
                    if (currentFilterItem) {
                        currentFilterItem.classList.remove('current');
                        var currentPanel = currentFilterItem.getAttribute('panel');
                        var currentPanelElement = element.querySelector('#' + currentPanel);
                        currentPanelElement.classList.remove('visible');
                    }
                    item.classList.add('current');
                }
            });
        });
        // mask
        var filterMask = element.querySelector('.store-box__filter-mask');
        filterMask.addEventListener('click', function () {
            var parent = filterMask.parentNode;
            parent.classList.remove('visible');
            filterTab.querySelector('.current').classList.remove('current');
            var orderPanel = element.querySelector('#js_store_filter_order');
            var cityPanel = element.querySelector('#js_store_filter_city');
            orderPanel.classList.remove('visible');
            cityPanel.classList.remove('visible');
        });
        filterMask.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
        filterTab.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
    }

    // 选择事件
    function bindListSelectEvent(element) {
        var listBox = element.querySelector('#js_store_list');
        listBox.addEventListener('change', function (e) {
            var targetElement = e.target;
            var data = targetElement.dataset;
            var storeInfo  = {
                data: {
                    address: data.address,
                    lat: data.lat,
                    lng: data.lng,
                    name: data.name,
                    storeId: targetElement.value
                },
                status: 0
            };
            window.MIP.setData({
                storeInfo: storeInfo,
                userPickDistance: data.distance
            });
            close(element);
        }, false);
    }

    // 关闭
    function close(element) {
        element.querySelector('#js_store_box').classList.remove('show');
        setTimeout(function () {
            element.parentNode.style.height = 'auto';
        }, 300);
    }

    // 打开
    function open() {
        var self = this;
        var element = self.element;
        var storeLayer = element.querySelector('#js_store_box');
        if (storeLayer) {
            element.parentNode.style.height = '100%';
            storeLayer.classList.add('show');
        }
        else {
            create(element);
            bindFilterEvent(element);
            bindCityEvent(element);
            bindOrderEvent(element);
            bindListScrollEvent(element);
            bindListSelectEvent(element);
            getStoreData(element);
        }
    }

    customElement.prototype.build = function () {

        var self = this;
        var element = self.element;

        self.addEventAction('open', function () {
            open.call(self);
        });

        self.addEventAction('close', function () {
            close(element);
        });
    };

    customElement.prototype.open = function () {
        open.call(this);
    };

    return customElement;

});
