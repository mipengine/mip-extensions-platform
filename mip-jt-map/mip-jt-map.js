/**
 * @file mip-jt-map 金投地图组件
 * @author
 */
/*  global BMap */
/*  global BMAP_ANIMATION_BOUNCE */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element2 = this.element;
        var de = document.documentElement;
        var re = 'orientationchange' in window ? 'orientationchange' : 'resize';
        var recalc = function () {
            var cw = de.clientWidth;
            if (!cw) {
                return;
            }
            de.style.fontSize = cw >= 750 ? '100px' : 100 * (cw / 750) + 'px';
        };
        recalc();
        if (!document.addEventListener) {
            return;
        }
        window.addEventListener(re, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);

        var myHead = document.getElementsByTagName('head').item(0);

        function loadJs(url) {
            var myScript = document.createElement('script');
            myScript.type = 'text/javascript';
            myScript.src = url;
            myHead.appendChild(myScript);
        }

        (function () {
            window.HOST_TYPE = '2';
            loadJs('https://api.map.baidu.com/getscript?v=2.0&ak=sZzrsDFeUUKQ1x9Cvz29b7oG8is3aNP5&s=1');
        })();
        loadJs('https://dup.baidustatic.com/js/ds.js');


        var ele = this.element;
        var baiyunMap = new BaiyunMap(ele);

        var longitudes = $(element2).attr('longitude');
        var latitudes = $(element2).attr('latitude');
        var searchAddr = $(element2).attr('searchAddr');
        var lng = $(element2).attr('lng');
        var lat = $(element2).attr('lat');

        window.addEventListener('load', function () {
            // 根据搜索地址获取经纬度 定位
            if (searchAddr !== '' && typeof (searchAddr) !== 'undefined') {
                $.ajax({
                    type: 'GET',
                    data: {address: searchAddr},
                    url: 'https://mip.cngold.org/energy/m_getLongLat.html',
                    dataType: 'json',
                    jsonpCallback: 'returnMsg',
                    success: function (data) {
                        if (data.flag) {
                            longitudes = data.data.lng;
                            latitudes = data.data.lat;
                            baiyunMap.map();
                        }
                    }
                });
            }
            else {
                baiyunMap.map();
            }
            // 注册查询方式
            ele.dataset.way && baiyunMap.way();
        });

        /**
         * 地图操作类
         *
         * @param {html} ele 当前mip-baiyun-map元素
         * @class       BaiyunMap
         */
        function BaiyunMap(ele) {
            this.mapElement = ele;
            this.imap;
        }

        /**
         * map init
         */

        BaiyunMap.prototype.map = function () {
            var id = 'allmap';
            var zoom = 15;
            var x = typeof (longitudes) !== 'undefined' ? longitudes : 120.118;
            var y = typeof (latitudes) !== 'undefined' ? latitudes : 30.294;

            // 初始化中心点必须存在
            if (!x || !y) {
                return;
            }
            this.imap = new BMap.Map(id);
            var point = new BMap.Point(x, y);
            this.imap.centerAndZoom(point, zoom);
            // 创建标注
            var marker = new BMap.Marker(point);
            this.imap.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        };

        /**
         * what way
         */
        BaiyunMap.prototype.way = function () {
            var self = this;
            this.mapElement.addEventListener('click', function (e) {
                var targetEle = e.target;
                if (targetEle.parentElement.id === 'tip') {
                    self.wayId = Number(targetEle.dataset.id);
                    // 选中
                    var butArr = [].slice.call(targetEle.parentElement.children);
                    butArr.forEach(function (e) {
                        e.className = '';
                    });
                    targetEle.className = 'cur';
                }
            });
        };


        /**
         * get route way 获取当前位置到目的地线路
         */
        if (lng !== '' && typeof (lng) !== 'undefined' && lat !== '' && typeof (lat) !== 'undefined') {
            navigator.geolocation.getCurrentPosition(getRoute, showError, {
                enableHighAccuracy: true,
                maximumAge: 2000
            });
        }
        function getRoute(position) {
            var end = new BMap.Point(lng, lat);
            this.imap.clearOverlays();
            var options;
            // options = {
            //     renderOptions: {map: this.imap, panel: this.resultElement.id || 'l-result'}
            // };
            options = {
                renderOptions: {map: this.imap},
                policy: 0
            };
            var transit = new BMap.TransitRoute(this.imap, options);
            transit.search(position, end);
        }

        // 根据定位获取周边网点
        var postHtml = $(element2).attr('postHtml');
        if (postHtml !== '' && typeof (postHtml) !== 'undefined' && postHtml === 'jyzwd') {
            navigator.geolocation.getCurrentPosition(initData, showError, {
                enableHighAccuracy: true,
                maximumAge: 2000
            });
        }
        function initData(position) {
            $.ajax({
                type: 'GET',
                data: {Longitude: position.coords.longitude, Latitude: position.coords.latitude, cityName: ''},
                url: 'https://mip.cngold.org/energy/m_getDistance.html',
                dataType: 'json',
                jsonpCallback: 'returnMsg',
                success: function (data) {
                    var dataList = data.data;
                    var str = '';
                    if (data.flag && dataList.length > 0) {
                        for (var i = 0; i < dataList.length; i++) {
                            var index = i + 1;
                            if (index < 5) {
                                str += '<dl class="jyz_content_dl"><dt class="clearfix mgLR30"><span class="fr">'
                                    + dataList[i].distance + ' km</span><a href="/energy/m_jyzwd' + dataList[i].id
                                    + '.html" title="' + dataList[i].name + '">' + index + '. ' + dataList[i].name
                                    + '</a></dt><dd class="con mgLR30"><a href="/energy/m_jyzwd' + dataList[i].id
                                    + '.html" title="' + dataList[i].name + '">' + dataList[i].adress
                                    + '</a></dd><dd class="lianxi mgLR30"><a href="tel:' + dataList[i].telephone
                                    + '" title="' + dataList[i].name + '" class="dianhua"><i class="icon"></i>电话</a>'
                                    + '<em class="icon"></em><a href="/energy/m_jyzwd' + dataList[i].id
                                    + '.html" title="' + dataList[i].name + '" class="xiangqing"><i class="icon">'
                                    + '</i>详情</a></dd></dl>';
                            }
                        }
                    }
                    str += '<a href="https://m.cngold.org/energy/m_jyzwd.html" title="查看列表结果" class="chakan mt20 mgLR30">查看列表结果</a>';
                    $('.jyz_content').html(str);
                }
            });
        }

        function showError(error) {
            // alert('定位失败')
        }

        $('body').scroll(function () {
            // var rmqh_j = $('.quancheng_1').height();
            var gdth = $('div.quancheng').offset().top;
            if (gdth <= 0) {
                $('.zimu').css('top', '5%');
            }
            else {
                $('.zimu').css('top', '20%');
            }
        });

        $('.jiayaouzhan_tit a.tit').click(function () {
            $(this).addClass('on').next().toggle()
                .parent().siblings().children('a.tit').removeClass('on').next().hide();
            if ($('.quancheng').css('display') === 'block') {
                $('body,html').addClass('noscroll');
            }
            else {
                $('body,html').removeClass('noscroll');
            }
        });

        // 全局导航
        $('.overall').click(function () {
            $('.overall-nav').show();
            $('body,html').addClass('overhide');
        });
        $('.overall_title a.back').click(function () {
            $('.overall-nav').hide();
            $('body,html').removeClass('overhide');
        });
        // 菜单下拉
        $('.nav_down').bind('click', function () {
            if ($(this).hasClass('deg')) {
                $(this).removeClass('deg');
                $('.show-nav1').fadeOut();
                $('.pool-nav2').fadeOut();
            }
            else {
                $(this).addClass('deg');
                $('.show-nav1').fadeIn();
                $('.pool-nav2').fadeOut();
            }
        });

        // 股票全部导航更多弹开收起
        $('.stock-menu-more-tip').click(function () {
            $('.stock-menuAll').css('display', 'block');
        });
        $('.menuAllclose').click(function () {
            $('.stock-menuAll').css('display', 'none');
        });
        // 回到顶部
        $(window).scroll(function () {
            // 滑动菜单吸附
            var topadH = $('.top-important').height();
            var toplogoH = $('.top-logo').height();
            var scrollH = topadH + toplogoH;
            if ($(window).scrollTop() >= scrollH) {
                $('nav').addClass('nav_position');
            }
            else {
                $('nav').removeClass('nav_position');
            }

            if ($(window).scrollTop() >= 300) { // 向下滚动像素大于这个值时，即出现小火箭~
                $('.actGotop').fadeIn(300); // 火箭淡入的时间，越小出现的越快~
            }
            else {
                $('.actGotop').fadeOut(300); // 火箭淡出的时间，越小消失的越快~
            }
        });
        $('.actGotop').click(function () {
            $('html,body').animate({scrollTop: '0px'}, 800);// 火箭动画停留时间，越小消失的越快~
        });

    };

    return customElement;
});
