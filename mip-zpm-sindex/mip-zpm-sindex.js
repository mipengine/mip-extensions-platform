/**
* @author: wangjx
* @date: 2017-04-19
* @file: mip-zpm-sindex.js
*/
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var CustomStorage = util.customStorage;
    var cs = new CustomStorage(0);
    var render = function () {
        // 首页搜索
        var $searchWrap = $('#indexSearchContent');
        var $searchInput = $('#indexSearchBox');
        var $searchBtn = $searchWrap.find('.btn');
        var $searchClose = $searchWrap.children('.indexSearchContentTop').children('.close');
        var searchTime;
        var prevStr = '';
        var dtBool = true;
        var $userinfo = $('#userinfor').attr('data-name');
        var $SearchLsWrap = $('.indexSearchList');
        var $indexSearchHsClose = $SearchLsWrap.find('.close');
        // 容器高度
        $searchWrap.height($(document).height());
        // 绑定弹出搜索页面关闭按钮
        $searchClose.click(function () {
            $searchWrap.hide();
        });
        // 绑定首页搜索点击事件
        $('.indexSearch .content').click(function () {
            $searchWrap.show();
            readSearchLs();
            $searchInput.val('').focus();
            prevStr = '';
        });
        // 搜索事件绑定
        $searchBtn.click(function () {
            indexSearchUrl();
            return false;
        });
        // cs历史记录
        // 读取
        var indexSearchHs = cs.get('indexSearchHs');
        if (indexSearchHs === null) {
            indexSearchHs = [];
        } else {
            indexSearchHs = indexSearchHs.split(',');
        }
        $searchInput[0].oninput = function (e) {
            // 回车换行事件
            if (event.keyCode === 13) {
                indexSearchUrl();
                return false;
            }
            // 重新读取历史记录
            if ($(this).val() === '' || $(this).val() === ' ' || $(this).val() === null) {
                readSearchLs();
                prevStr = '';
            } else {
                clearTimeout(searchTime);
                searchTime = setTimeout(function () {
                    if (prevStr === $searchInput.val()) {
                        return false;
                    }
                    $.post('/searchjob/SearchRedolent', {
                        keyword: $searchInput.val()
                    }, function (data, textStatus, jqxhr) {
                        $SearchLsWrap.show().children('dd').remove();
                        var sw = $searchInput.val();
                        if (data.HotWords.length > 0) {
                            $.each(data.HotWords, function (i, v) {
                                v.Word = v.Word.replace(sw, '<span class="gl">' + sw + '</span>');
                                $('<dd><a>' + v.Word + '</a><span class="add"></span></dd>').prependTo($SearchLsWrap);
                            });
                            $SearchLsWrap.find('.clear').hide();
                        } else {
                            $SearchLsWrap.find('dt').hide();
                        }
                    }, 'json');
                    prevStr = $searchInput.val();

                }, 500);
            }
        };
        $searchInput.focus(function () {
            if ($(this).val() === '' || $(this).val() === ' ' || $(this).val() === null) {
                if (dtBool) {
                    $SearchLsWrap.show();
                }
            }
        });
        // 清除
        $('.indexSearchList dt .clear').click(function () {
            cs.rm('indexSearchHs');
            indexSearchHs = [];
            $SearchLsWrap.hide().children('dd').remove();
            dtBool = false;
        });

        // 绑定历史记录关闭事件
        $indexSearchHsClose.click(function () {
            $SearchLsWrap.hide();
        });
        // 绑定关键词添加输入框事件
        $(document).on('click', '.indexSearchList .add', function () {
            $searchInput.val($(this).parent('dd').children('a').text());
        });
        // 绑定联想词点击搜索事件
        $(document).on('click', '.indexSearchList a', function () {
            saveSearchLs($(this).text());
            var keyurl = '/searchjob/search?Location=' + $('#userinfor').attr('data-citycode') + '';
            keyurl += '&KeyWord=' + $(this).text() + '';
            window.location.href = keyurl;
        });
        // 底部浮层
        $('.indexLayer_Close').on('click', function () {
            $('.indexLayer').hide();
        });
        // vivo手机不显示广告，注册浮层
        var vivo = navigator.userAgent.toLowerCase().indexOf('vivo') > -1;
        if (!vivo) {
            $('.indexLayer').show();
        }
        if (vivo) {
            $('#j_focus').remove();
        }
        // 导航来源跳转至M首页取消页面弹窗
        // Hao123、uc导航精品文字、uc酷站精品文字、uc导航分类文字
        // uc酷站分类文字、华为、手百网F址站、QQ浏览器、魅族浏览器
        var paraDialog = getQueryString('utm_source');
        var noDialog = ('haouczcucflzchuaweishoubaiwangzhiqqmeizuzcmeizuggmeizuzc').indexOf(paraDialog) > -1;
        if (!cs.get('toppayDialog')) {
            cs.set('toppayDialog', '');
        }
        if (!noDialog) {
            if (!vivo) {
                if (cs.get('toppayDialog') !== '1') {
                    if (!cs.get('zp-auth')) {
                        $('.toppay').show();
                        cs.set('toppayDialog', '1');
                    }
                }
            }
        }
        $('.toppay .detail').on('click', function (e) {
            e.stopPropagation();
        });
        $('.salarydelete').on('click', function () {
            $('.toppay').hide(200, function () {
                $(this).removeAttr('style');
            });
        });
        // seo需求M站vivo来源取消顶部图片
        if (paraDialog) {
            var vivo = ('vivo').indexOf(paraDialog) > -1;
            var meizumz = 'meizumz' === paraDialog.toLowerCase();
            var meizugg = 'meizugg' === paraDialog.toLowerCase();
            if (vivo || meizumz || meizugg || 'meizuzc' === paraDialog.toLowerCase()) {
                cs.set('utm_source_vivo', 'vivo');
                $('#j_focus').remove();
                $('.indexLayer').remove();
                $('.toppay').remove();
            } else {
                cs.rm('utm_source_vivo');
            }
        }
        if (getCookie('source')) {
            var smeizumz = getCookie('source').toLowerCase() === 'meizumz';
            var smeizuzc = getCookie('source').toLowerCase() === 'meizuzc';
            if (smeizumz || smeizuzc || getCookie('source').toLowerCase() === 'meizugg') {
                $('#j_focus').remove();
                $('.indexLayer').remove();
                $('.toppay').remove();
            }
        }
        // 热门职位
        var $hotDt = $('.j_hotJobsList .warp .list b');
        var $hotHref = $('.j_hotJobsList .warp .list a');
        $hotDt.click(function () {
            if ($(this).parents('dt').next('dd').css('display') === 'block') {
                $(this).removeClass('h').parent('dt').next('dd').hide();
            } else {
                $(this).addClass('h').parent('dt').next('dd').show();
            }
            $(this).parents('li').siblings('li').find('dd').hide();
            $(this).parents('li').siblings('li').find('b').removeClass('h');
        });
        $hotHref.click(function () {
            $(this).parents('dd').hide();
            window.location.href = $(this).attr('href');
        });
        $('#hotjobs_btn').click(function () {
            var t = $(this).children('font').text();
            if (t === '展开全部') {
                $(this).children('font').text('收起');
            } else {
                $(this).children('font').text('展开全部');
            }
            $(this).children('i').toggleClass('h');
            $(this).prev('.warp').toggleClass('h');
        });
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://img09.zhaopin.com/2012/other/mobile/js/swipe.js';
        head.appendChild(script);
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                script.onload = script.onreadystatechange = null;
                // 首页banner
                var time;
                window.indexAppWrap = new window.Swipe(document.getElementById('j_focus'), {
                    auto: 3000,
                    disableScroll: false,
                    callback: function () {
                        clearTimeout(time);
                        time = setTimeout(function () {
                            window.indexAppWrap.next();
                        }, 3000);
                    }
                });
            }
        };
        var amap = document.createElement('script');
        amap.type = 'text/javascript';
        amap.src = 'https://webapi.amap.com/maps?v=1.3&key=c4746acf0aa8c8a139fae3a1a47fc9a0';
        head.appendChild(amap);
        amap.onload = amap.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                amap.onload = amap.onreadystatechange = null;
                getLocation();
            }
        };
        if ($userinfo !== '0') {
            // 置顶
            $('#zhiding').click(function () {
                resumeTopIndexEvent();
            });
            // 刷新
            $('#refreshresume').click(function () {
                refreshResume();
            });
            // 求职统计
            $('#jobStat').click(function () {
                jobStatisticsEvent();
            });
        } else {
            $('#zhiding').click(function () {
                window.location.href = '/account/login';
            });
            $('#refreshresume').click(function () {
                window.location.href = '/account/login';
            });
            $('#jobStat').click(function () {
                window.location.href = '/account/login';
            });

        }
        // highpin
        var zpUser = document.cookie.indexOf('zp-auth');
        if (getCookie('zp-auth') !== null || zpUser > -1) {
            var newURL = 'https://m.highpin.cn/?fromType=861&zp-auth=' + getCookie('zp-auth') + '';
            $('.highpin').children('a').attr('href', newURL);
        }
    };
    window.onload = function () {
        render();
    };
    // 搜索方法
    function indexSearchUrl() {
        var $searchInput = $('#indexSearchBox');
        if ($searchInput.val() !== null && $searchInput.val() !== '') {
            saveSearchLs($searchInput.val());
            var citycode = $('#userinfor').attr('data-citycode');
            window.location.href = '/searchjob/search?Location=' + citycode + '&KeyWord=' + $searchInput.val() + '';
        }
    }
    // 读取历史记录方法
    function readSearchLs() {
        var indexSearchHs = cs.get('indexSearchHs');
        if (indexSearchHs == null) {
            indexSearchHs = [];
        } else {
            indexSearchHs = indexSearchHs.split(',');
        }
        var $SearchLsWrap = $('.indexSearchList');
        var dtBool = true;
        if (indexSearchHs.length > 0) {
            $SearchLsWrap.children('dd').remove();
            $.each(indexSearchHs, function (i, v) {
                $('<dd><a>' + v + '</a><span class="add"></span></dd>').prependTo($SearchLsWrap);
            });
            $SearchLsWrap.show().find('dt').show().children('.clear').show();
        } else {
            dtBool = false;
            $SearchLsWrap.hide();
        }
    }
    // 保存最新历史记录方法
    function saveSearchLs(hsStr) {
        var indexSearchHs = cs.get('indexSearchHs');
        if (indexSearchHs == null) {
            indexSearchHs = [];
        } else {
            indexSearchHs = indexSearchHs.split(',');
        }
        // 判断新搜索关键词是否已存在
        var b = true;
        for (var i = 0; i <= indexSearchHs.length; i++) {
            if (indexSearchHs[i] === hsStr) {
                b = false;
                break;
            }
        }
        if (b) {
            indexSearchHs.push(hsStr);
            if (indexSearchHs.length > 5) {
                indexSearchHs.shift();
            }
            cs.set('indexSearchHs', indexSearchHs);
            return false;
        }
    }
    // URL参数
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) {
            return unescape(r[2]);
        }
        return null;
    }
    // 点击置顶简历
    function resumeTopIndexEvent() {
        if ($('#MyInfo') !== null && $('#MyInfo').length !== 0) {
            var resumeId = $('#MyInfo').attr('data-id');
            var resumeTitle = $('#MyInfo').attr('data-name');
            var resumeNum = $('#MyInfo').attr('data-number');
            var resumeVer = $('#MyInfo').attr('data-version');
            var topurl = '/home/resumetopindex?payPoint=34a95223a071419da275719ea2a55daf';
            topurl += '&resumeId=' + resumeId + '&resumeNum=' + resumeNum + '&resumeVer=' + resumeVer + '';
            topurl += '&resumeTitle=' + resumeTitle + '&enterSource=19&appplat=7&d=m&channel=zhaopin';
            window.location.href = topurl;
        } else {
            window.location.href = '/resume/index';
        }
    }
    // 刷新简历
    function refreshResume() {
        $.post('/searchjob/ResumeRefresh', {
                data: {version: '6.3.0'}
            }, function (data) {
                var Refreshtxt = data.StatusDescription;
                if ($('#userinfor').attr('data-resumerefreshflag') === 'false') {
                    alert(Refreshtxt);
                } else {
                    var resumeId = $('#resuemlist').attr('data-id');
                    var name = $('#resuemlist').attr('data-name');
                    var resumeNum = $('#resuemlist').attr('data-number');
                    var resumeVer = $('#resuemlist').attr('data-version');
                    var refrurl = '/home/ResumeTopIndex?payPoint=34a95223a071419da275719ea2a55daf';
                    refrurl += '&resumeId=' + resumeId + '&resumeNum=' + resumeNum +  '&resumeVer=' + resumeVer + '';
                    refrurl += '&resumeTitle=' + name + '&enterSource=10&appplat=7&clickpoint=0';
                    window.location = refrurl;
                }
            });
    }
    // 点击求职统计
    function jobStatisticsEvent() {
        if ($('#MyInfo') !== null && $('#MyInfo').length !== 0) {
            var resumeId = $('#MyInfo').attr('data-id');
            var resumeTitle = $('#MyInfo').attr('data-name');
            var resumeNum = $('#MyInfo').attr('data-number');
            var resumeVer = $('#MyInfo').attr('data-version');
            var jobsurl = '/home/jobstatistics?resumeId=' + resumeId + '&resumeNum=' + resumeNum + '';
            jobsurl += '&resumeVer= ' + resumeVer + '&resumeTitle=' + resumeTitle + '&appplat=7';
            window.location.href = jobsurl;
        } else {
            window.location.href = '/resume/index';
        }
    }
    // cookie
    function getCookie(objName) {
        var arrStr = document.cookie.split('; ');
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split('=');
            if (temp[0] === objName) {
                return unescape(temp[1]);
            }
        }
    }
    // 获取经纬度
    function getLocation() {
        var geolocation;
        var mapObj;
        var locationNaCode = getCookie('LocationNavigatorCode');
        if (locationNaCode !== undefined && locationNaCode !== null) {
            var locationObj = {};
            locationObj.coords = {};
            var locationNaArr = locationNaCode.split(',');
            locationObj.coords.latitude = locationNaArr[0];
            locationObj.coords.longitude = locationNaArr[1];
            onComplete(locationObj);
        } else {
            // 加载地图，调用浏览器定位服务
            mapObj = new window.AMap.Map('container', {
                resizeEnable: true
            });
            mapObj.plugin('AMap.Geolocation', function () {
                geolocation = new window.AMap.Geolocation({
                    enableHighAccuracy: true,
                    timeout: 10000,
                    buttonOffset: new window.AMap.Pixel(10, 20),
                    zoomToAccuracy: true,
                    buttonPosition: 'RB'
                });
                mapObj.addControl(geolocation);
                geolocation.getCurrentPosition();
                window.AMap.event.addListener(geolocation, 'complete', onComplete);
                window.AMap.event.addListener(geolocation, 'error', onError);

            });
        }
    }
    // 解析定位结果
    function onComplete(data) {
        var userLocationLat;
        var userLocationLon;
        var locationNaCode = getCookie('LocationNavigatorCode');
        if (data.coords) {
            userLocationLat = data.coords.latitude;
            userLocationLon = data.coords.longitude;
        } else {
            userLocationLat = data.position.getLat();
            userLocationLon = data.position.getLng();
        }
        if (locationNaCode === undefined && locationNaCode === null) {
            // 储存经纬度cookie
            var date = new Date();
            date.setDate(date.getDate() + 3);
            var strcookie = 'LocationNavigatorCode=' + userLocationLat + '';
            strcookie += ',' + userLocationLon + ';path=/;expires=' + date.toGMTString() + '';
            document.cookie = strcookie;
        }
        // 获取城市name
        var code = $('#userinfor').attr('data-citycode');
        $.get('/Home/GetCityInfoByLatLng',
        {lat: userLocationLat, lng: userLocationLon},
        function (data, textStatus, jqxhr) {
            if ($('.j_searchTop .position span').text() === 'ȫ��') {
                $('.j_searchTop .position span').text(data.cityname);
            }
        });
    }
    // 获得经纬度失败执行函数
    function onError(data) {
        var str = data.info;
    }
    return {
        render: render
    };
});
