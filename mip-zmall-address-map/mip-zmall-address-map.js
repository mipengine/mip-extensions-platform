/**
 * @file mip-zmall-address-map 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();

    var baiduMapApiLoaded = false;

    window.HOST_TYPE = 2;

    // 载入百度地图API
    function initBaiduMapScript(ele, callback) {
        // 只需插入一次
        if (baiduMapApiLoaded) {
            return;
        }
        var akAttr = ele.getAttribute('data-ak');
        var ak = akAttr ? akAttr : 'N5KBzk1oUZc92TCC0lzwlcv1wOEwsYIO';
        var scriptElement = document.createElement('script');
        scriptElement.onload = scriptElement.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                if (typeof callback === 'function') {
                    callback();
                }
                if (scriptElement.parentNode) {
                    scriptElement.parentNode.removeChild(scriptElement);
                }
                scriptElement.onload = scriptElement.onreadystatechange = null;
            }
        };
        scriptElement.src = '//api.map.baidu.com/getscript?v=2.0&ak=' + ak;
        // 往组件里插入百度地图API
        ele.appendChild(scriptElement);
        baiduMapApiLoaded = true;
    }

    /**
     * 创建地址编辑层
     *
     * @param {HTMLElement} element 组件DOM
     */
    function create(element) {

        var addressMapHtml = [
            '<div id="js_map_box" class="map-fix">',
            '<div class="map-fix__search"><div class="search-box">',
            '<input type="text" placeholder="地图中找不到？直接输入地址" class="search-keyword">',
            '</div></div><div class="map-fix__box">',
            '<div id="js_map" class="map-fix__map"></div>',
            '<div id="js_map_scroller" class="map-fix__scroller"></div>',
            '</div><span class="map-fix__back" on="tap:myMapPicker.close">返回</span>',
            '</div>'
        ].join('');

        element.parentNode.style.height = '100%';
        element.innerHTML = addressMapHtml;

        setTimeout(function () {
            element.querySelector('#js_map_box').classList.add('show');
        }, 10);

        // 搜索框和返回按钮禁止移动事件
        var searchElm = element.querySelector('.map-fix__search');
        var backElm = element.querySelector('.map-fix__back');
        searchElm.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
        backElm.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });

        // 列表滚动根据情况来定
        var listElm = element.querySelector('#js_map_scroller');
        smartScroll(listElm, true);
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

    // 获取搜索关键字。省份+城市+县+街道
    function getSearchStr(baiduAddress) {
        var searchKeywordsArr = [];
        if (baiduAddress.province !== '') {
            searchKeywordsArr.push(baiduAddress.province);
        }
        if (baiduAddress.city !== '' && searchKeywordsArr.indexOf(baiduAddress.city) < 0) {
            searchKeywordsArr.push(baiduAddress.city);
        }
        if (baiduAddress.district !== '' && searchKeywordsArr.indexOf(baiduAddress.district) < 0) {
            searchKeywordsArr.push(baiduAddress.district);
        }
        if (baiduAddress.street !== '' && searchKeywordsArr.indexOf(baiduAddress.street) < 0) {
            searchKeywordsArr.push(baiduAddress.street);
        }
        return searchKeywordsArr.length && searchKeywordsArr.join(', ');
    }

    // 移动地图，根据中心点获取周边POI
    function getLocalPOIByPoint(map, point, element) {
        var geoc = new window.BMap.Geocoder();
        geoc.getLocation(point, function (rs) {
            var address = rs.addressComponents;
            var value = getSearchStr(address);
            setUserPlace(map, value, element);
        });
    }

    // 根据用户当前位置，自动匹配地址
    function setUserLocation() {

        var element = this.element;

        // 创建地图实例
        var map = new window.BMap.Map('js_map');

        // 优先用户选择的城市, 通过mip-data拿到数据
        var userSelectedCityName = window.m.userSelectedCityName;
        if (userSelectedCityName !== '') {
            var userSelectedLat = window.m.userSelectedLat;
            var userSelectedLng = window.m.userSelectedLng;
            var value = userSelectedCityName;
            if (userSelectedLat && userSelectedLng) {
                // 创建点坐标
                var point = new window.BMap.Point(userSelectedLng, userSelectedLat);
                map.centerAndZoom(point, 17);
                value = window.m.userSelectedPOI;
            }
            else {
                map.centerAndZoom(userSelectedCityName, 17);
            }
            if (value !== element.userSelectedCityName) {
                setUserPlace(map, value, element);
            }
        }
        else {
            var geolocation = new window.BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {

                if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
                    // 创建点坐标
                    var point = new window.BMap.Point(r.point.lng, r.point.lat);
                    map.centerAndZoom(point, 17);

                    // 自动搜索POI
                    var address = r.address;
                    var value = getSearchStr(address);
                    setUserPlace(map, value, element);
                }
            }, {enableHighAccuracy: true});
        }

        // 移动地图
        map.addEventListener('dragend', function () {
            var center = map.getCenter();
            getLocalPOIByPoint(map, center, element);
        });

        // 搜索框
        bindSearchEvent(map, element);
    }

    // 搜索框
    function bindSearchEvent(map, element) {
        var search = element.querySelector('input[type=text]');
        var listElm = element.querySelector('#js_map_scroller');
        search.addEventListener('focus', function () {
            element.parentNode.style.height = '100%';
            element.querySelector('.map-fix__box').classList.add('searching');
            var emptyElm = element.querySelector('#js_map_scroller .search__empty');
            emptyElm && (emptyElm.innerHTML = '输入关键字，查找附近位置');
            smartScroll(listElm, true);
        });
        search.addEventListener('input', function () {
            var value = this.value;
            if (value.trim() !== '') {
                setUserPlace(map, value, element, true);
            }
        });
        search.addEventListener('blur', function () {
            var value = this.value;
            if (value.trim() === '') {
                element.querySelector('.map-fix__box').classList.remove('searching');
                var center = map.getCenter();
                getLocalPOIByPoint(map, center, element);
                var emptyElm = element.querySelector('#js_map_scroller .search__empty');
                if (emptyElm) {
                    emptyElm.innerHTML = '拖动地图，查找附近位置';
                }
            }
        });
    }

    // POI事件绑定
    function bindSelectEvent(element, userSelectedCityName) {
        var container = element.querySelector('#js_map_scroller');
        container.addEventListener('click', function (e) {
            var targetElm = e.target;
            var targetItem = targetElm;
            if (targetElm.tagName === 'UL') {
                return;
            }
            else if (targetElm.tagName === 'H4' || targetElm.tagName === 'P') {
                targetItem = targetElm.parentNode;
            }
            var title = targetItem.getAttribute('data-title');
            var lat = targetItem.getAttribute('data-lat');
            var lng = targetItem.getAttribute('data-lng');
            window.MIP.setData({
                userSelectedPOI: title,
                userSelectedCityName: userSelectedCityName,
                userSelectedLat: lat,
                userSelectedLng: lng
            });
            // 设置地址保存按钮是否可用
            var mipComponentsAddress = document.getElementById('address');
            mipComponentsAddress && mipComponentsAddress.customElement.enable();
            // 关闭
            close(element);
        });
    }

    // 设置周边POI列表
    function setUserPlace(map, value, element, search) {
        // 记录选择
        element.userSelectedCityName = value;
        // 数据列表
        var resultPanel = element.querySelector('#js_map_scroller');
        // 空数据状态
        var emptyStr = '<div class="search__empty">拖动地图，查找附近位置</div>';
        if (search) {
            emptyStr = '<p class="search__fail">很遗憾，该区域可能不在地球</p>';
        }
        var local;
        // 配置
        var options = {
            onSearchComplete: function (results) {
                var userSelectedCityName = '';
                if (!search) {
                    var keyword = results.keyword;
                    var keywordArr = keyword.split(', ');
                    userSelectedCityName = keywordArr[0];
                    userSelectedCityName += keywordArr[1] ? (' ' + keywordArr[1]) : '';
                }
                else {
                    userSelectedCityName = results.province;
                    if (results.city && results.city !== results.province) {
                        userSelectedCityName += (' ' + results.city);
                    }
                }

                // 判断状态是否正确
                if (local.getStatus() === window.BMAP_STATUS_SUCCESS) {
                    var s = [];
                    for (var i = 0; i < results.getCurrentNumPois(); i++) {
                        var poi = results.getPoi(i);
                        var lat = poi.point.lat;
                        var lng = poi.point.lng;
                        var itemHtml = [
                            '<li data-title="' + poi.title + '" data-lat="' + lat + '" data-lng="' + lng + '">',
                            '<h4>' + poi.title + '</h4>',
                            '<p>' + poi.address + '</p>',
                            '</li>'
                        ].join('');
                        s.push(itemHtml);
                    }
                    var html = s.length ? ('<ul class="search-result__list">' + s.join('') + '</ul>') : emptyStr;
                    resultPanel.innerHTML = html;
                }
                else {
                    resultPanel.innerHTML = emptyStr;
                }
                bindSelectEvent(element, userSelectedCityName);
            }
        };
        local = new window.BMap.LocalSearch(map, options);
        local.search(value);
    }

    function close(element) {
        element.querySelector('#js_map_box').classList.remove('show');
        setTimeout(function () {
            element.parentNode.style.height = 'auto';
        }, 300);
    }

    function open() {
        var self = this;
        var element = self.element;
        var mapLayer = element.querySelector('#js_map_box');
        if (mapLayer) {
            element.parentNode.style.height = '100%';
            mapLayer.classList.add('show');
            setUserLocation.call(self);
        }
        else {
            create(element);
            initBaiduMapScript(element, function () {
                setUserLocation.call(self);
            });
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
