/**
 * @file mip-zmall-store-filter 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var viewer = require('viewer');

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
            '<li class="item" panel="js_store_filter_province"><span>选择省份/直辖市</span></li>',
            '<li class="item" panel="js_store_filter_city" pid="0"><span>选择城市/区</span></li>',
            '</ul><div class="store-box__filter-layer">',
            '<div id="js_store_filter_province" class="store-box__filter-province">',
            '<ul id="js_store_province" class="store-box__filter-list"></ul></div>',
            '<div id="js_store_filter_city" class="store-box__filter-city">',
            '<ul id="js_store_city" class="store-box__filter-list"></ul></div>',
            '</div><div class="store-box__filter-mask"></div></div>',
            '<div id="js_store_scroller" class="store-box__scroller">',
            '<ul id="js_store_list" class="store-box__list"></ul>',
            '<p class="store-box__more disabled">正在为您加载更多门店...</p>',
            '<div class="store-box__list-empty"><p>很抱歉，当前地区没有门店</p></div>',
            '<div class="store-box__list-loading"></div>',
            '</div><span class="store-box__back">返回</span>',
            '</div>'
        ].join('');

        element.parentNode.style.height = '100%';
        element.innerHTML = storeListLayerHtml;

        setTimeout(function () {
            element.querySelector('#js_store_box').classList.add('show');
        }, 10);

        // 返回按钮禁止移动事件
        var backElm = element.querySelector('.store-box__back');
        backElm.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
        backElm.addEventListener('click', function (e) {
            close(element);
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
    function renderCitys(element, data) {
        var provinceHtml = '';
        var provinceNum = 0;
        data.forEach(function (item) {
            var selected = !item.id ? ' class="selected"' : '';
            provinceHtml += '<li' + selected + ' data-id="' + item.id + '">' + item.name + '</li>';
            provinceNum++;
        });

        var provinceFilterElement = element.querySelector('#js_store_province');
        provinceFilterElement.innerHTML = provinceHtml;
        var provinceScrollerElement = provinceFilterElement.parentNode;
        if (provinceNum > 5) {
            provinceScrollerElement.classList.add('scroll');
            smartScroll(provinceScrollerElement, true);
        }
    }

    // 渲染门店列表
    function renderStore(element, stores, page) {
        var storesHtml = '';
        var total = parseInt(element.storeTotal, 10);
        var storeList = stores;
        if (!element.isPage) {
            var pn = element.getAttribute('pn') ? parseInt(element.getAttribute('pn'), 10) : 10;
            var start = pn * (page - 1);
            storeList = stores.slice(start, start + 10);
        }
        var length = storeList.length;
        var listScrollerElement = element.querySelector('#js_store_scroller');
        var loadMoreElement = element.querySelector('.store-box__more');
        var isSelectType = element.dataset.type && element.dataset.type === 'select';
        storeList.forEach(function (item) {
            if (isSelectType) {
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
            }
            else {
                storesHtml += [
                    '<li class="item"><a data-type="mip" href="' + item.url + '">',
                    '<h4 class="store-list__name">' + item.name + '</h4>',
                    '<p class="store-list_service-hours">' + item.serviceHours + '</p>',
                    '<p class="store-list__address">' + item.address + '</p>',
                    '<div class="store-list__distance">距您' + item.distanceStr + '</div>',
                    '</a></li>'
                ].join('');
            }
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
            // 滚动加载状态
            if (total < 10) {
                loadMoreElement.classList.add('disabled');
                listScrollerElement.scrollLoadEnd = true;
            }
        }
        smartScroll(listScrollerElement, true);
        listScrollerElement.scrollLoading = false;
        element.page = page + 1;
    }

    // 获取数据
    function getStoreData(element, options) {

        var merchantId = element.getAttribute('mid') || 0;
        var url = element.getAttribute('url');
        var lat = element.getAttribute('lat') || 0;
        var lng = element.getAttribute('lng') || 0;
        var pid = (options && options.provinceId) || 0;
        var cid = (options && options.cityId) || 0;
        var pn = element.getAttribute('pn') || 10;

        var page = element.page || 1;

        var listScrollerElement = element.querySelector('#js_store_scroller');
        var loadMoreElement = element.querySelector('.store-box__more');

        var ajaxUrl = url + '&merchantId=' + merchantId + '&lat=' + lat + '&lng=' + lng
                    + '&pid=' + pid + '&cid=' + cid + '&page=' + page + '&number=' + pn;
        if (options && options.isFilter) {
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
                // 数据缓存起来
                element.province = res.province;
                element.storeList = res.storeList;
                element.storeTotal = res.total;

                // 省份城市
                if (!options || !options.isFilter) {
                    renderCitys(element, res.province);
                }

                if (!res.total) {
                    listScrollerElement.classList.add('empty');
                    return;
                }
                // 滚动加载状态
                if ((!element.isPage && res.total <= pn) || (element.isPage && res.isEnd)) {
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
                    if (!element.isPage) {
                        var stores = element.storeList;
                        var page = element.page;
                        renderStore(element, stores, page);
                    }
                    else {
                        var pid = element.pid || 0;
                        var cid = element.cid || 0;
                        getStoreData(element, {
                            provinceId: pid,
                            cityId: cid
                        });
                    }
                }
            }
        });
    }

    // 渲染省份下面城市数据
    function renderCityByProvince(id, element) {
        var provinceData = element.province;
        var cityHtml = '';
        var cityNum = 0;
        provinceData.forEach(function (item) {
            if (id === item.id) {
                item.cityList.forEach(function (citem) {
                    cityHtml += [
                        '<li data-pid="' + item.id + '" data-cid="' + citem.id + '">',
                        citem.name + '</li>'
                    ].join('');
                    cityNum++;
                });
            }
        });
        var cityFilterElement = element.querySelector('#js_store_city');
        cityFilterElement.innerHTML = cityHtml;
        var cityScrollerElement = cityFilterElement.parentNode;
        if (cityNum > 5) {
            cityScrollerElement.classList.add('scroll');
            smartScroll(cityScrollerElement, true);
        }
    }

    // 绑定省份筛选
    function bindProvinceEvent(element) {
        var orderFilterElement = element.querySelector('#js_store_filter_province');
        orderFilterElement.addEventListener('click', function (e) {
            var targetElement = e.target;
            var selected = orderFilterElement.querySelector('.selected');
            if (targetElement.tagName === 'LI') {
                if (targetElement.classList.contains('selected')) {
                    return;
                }
                var id = targetElement.dataset.id;
                var provinceName = targetElement.innerText;
                var provincePanelTrigger = element.querySelector('li[panel="js_store_filter_province"] span');
                var cityPanelTrigger = element.querySelector('li[panel="js_store_filter_city"] span');
                provincePanelTrigger.innerText = provinceName;
                cityPanelTrigger.parentNode.setAttribute('pid', id);
                cityPanelTrigger.innerText = '选择城市/区';

                // 渲染当前选择省份下的城市
                renderCityByProvince(id, element);
                element.pid = id;
                element.cid = 0;
                element.page = 1;

                selected.classList.remove('selected');
                targetElement.classList.add('selected');
                var filterMask = element.querySelector('.store-box__filter-mask');
                filterMask.click();
                getStoreData(element, {
                    provinceId: id,
                    cityId: 0,
                    isFilter: 1
                });
            }
        });
    }

    // 绑定城市筛选
    function bindCityEvent(element) {
        var cityFilterElement = element.querySelector('#js_store_city');
        cityFilterElement.addEventListener('click', function (e) {
            var targetElement = e.target;
            var selected = cityFilterElement.querySelector('.selected');
            if (targetElement.tagName === 'LI') {
                if (targetElement.classList.contains('selected')) {
                    return;
                }
                var provinceId = targetElement.dataset.pid;
                var cityId = targetElement.dataset.cid;
                var cityName = targetElement.innerText;
                selected && selected.classList.remove('selected');
                targetElement.classList.add('selected');
                var filterMask = element.querySelector('.store-box__filter-mask');
                filterMask.click();
                var cityPanelTrigger = element.querySelector('li[panel="js_store_filter_city"] span');
                cityPanelTrigger.innerText = cityName;
                element.pid = provinceId;
                element.cid = cityId;
                element.page = 1;
                getStoreData(element, {
                    provinceId: provinceId,
                    cityId: cityId,
                    isFilter: 1
                });
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
                if (panel === 'js_store_filter_city') {
                    var pid = item.getAttribute('pid');
                    if (pid === '0') {
                        viewer.eventAction.execute('toast', element, {
                            msg: '请先选择省份/直辖市'
                        });
                        return;
                    }
                }
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
            var provincePanel = element.querySelector('#js_store_filter_province');
            var cityPanel = element.querySelector('#js_store_filter_city');
            provincePanel.classList.remove('visible');
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
            window.MIP.setData({
                userPickStoreId: targetElement.value,
                userPickStoreName: data.name,
                userPickStoreAddress: data.address,
                userPickStoreLat: data.lat,
                userPickStoreLng: data.lng,
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
            bindProvinceEvent(element);
            bindCityEvent(element);
            bindListScrollEvent(element);
            bindListSelectEvent(element);
            getStoreData(element);
        }
    }

    customElement.prototype.firstInviewCallback = function () {

        var self = this;
        var element = self.element;

        var onAttr = element.getAttribute('on');
        if (onAttr && onAttr !== '') {
            viewer.eventAction.execute('point', element, {element: element});
        }

        // 是否需要分页请求
        var pagination = element.getAttribute('pagination');
        var isPage = pagination !== null && pagination !== '0' && pagination !== 'false';
        element.isPage = isPage;

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
