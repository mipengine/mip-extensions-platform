/**
* @author: wangjx
* @date: 2017-07-06
* @file: mip-zpm-searchjobs.js
*/
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var CustomStorage = util.customStorage;
    var cs = new CustomStorage(0);
    var render = function () {
        // 经纬度变量
        var jwd = false;
        // body
        var $body = $('body');
        var $SearchLsWrap = $('.indexSearchList');
        var $indexSearchHsClose = $SearchLsWrap.find('.close');
        // 首页搜索
        var $searchWrap = $('#indexSearchContent');
        var SearchInput = $('#indexSearchBox');
        var $searchBtn = $searchWrap.find('.btn');
        var $searchClose = $searchWrap.children('.indexSearchContentTop').children('.close');
        var searchTime;
        var prevStr = '';
        var dtBool = true;
        // 是否登录
        var $userinfo = $('#S_user').attr('data-uid');
        // 筛选遮罩层
        var $screenPop = $('#screenPop');
        // 筛选类型赋值
        var $screenTitLi = $('.screenTitList li');
        // 筛选列表、距窗口顶部距离
        var $screenTitLiWrap = $screenTitLi.parent('ul');
        var screenTitListOfTop = $screenTitLiWrap.offset().top;
        // 筛选类型内容外层
        var $screenList = $('.screenConList');
        // 附近地标地铁赋值
        var $screenFirstConLi = $('.screenConList .tit li');
        // 列表子元素
        var $screenLi = $('.screenConList .wrap .box1 ul li');
        // Swiper
        var mySwiper = {};
        var nimei = {};
        // 需要初始化列表
        var box1List = '.screenConList .wrap .box1';
        var box3List = '.screenConList .wrap .box3';
        var showList = '.screenConList .wrap .showList';
        var $ScrollList = $('.screenConList .wrap .box1,.screenConList .wrap .box3,.screenConList .wrap .showList');
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://img09.zhaopin.com/2012/other/mobile/js/swiper.min.js';
        head.appendChild(script);
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                script.onload = script.onreadystatechange = null;
                // 二级子元素切换 == 地铁、地标、更多
                $screenLi.click(function () {
                    // 获取当前索引
                    var index = $(this).index();
                    // 父级容器
                    var $par = $(this).parents('.wrap');
                    // 获取对应html
                    var newStr = $par.children('.box2').find('ul').eq(index).html();
                    $par.children('.showList').children('ul').html(newStr);
                    $(this).addClass('h').siblings('li').removeClass('h');
                    for (var a in mySwiper) {
                        mySwiper[a].update(true);
                        mySwiper[a].updateSlidesSize();
                    }
                    $('.showList ul').css('-webkit-transform', 'translate3d(0px,0px,0px)');
                });
                for (var i = 0; i < $ScrollList.length; i++) {
                    mySwiper['m' + i] = new window.Swiper($ScrollList[i], {
                        direction: 'vertical',
                        touchRatio: 1.2,
                        mousewheelControl: true,
                        slidesPerView: 'auto',
                        freeMode: true
                    });
                }
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
            SearchInput.val($(this).children('span').text()).focus();
            if (SearchInput.val() !== null && SearchInput.val() !== '') {
                $.ajax({
                    url: 'https://mip.zhaopin.com/searchjob/searchredolent',
                    type: 'post',
                    data: {
                        keyword: SearchInput.val()
                    },
                    success: function (data, textStatus, jqxhr) {
                        $SearchLsWrap.show().children('dd').remove();
                        var sw = SearchInput.val();
                        if (data.HotWords.length > 0) {
                            $.each(data.HotWords, function (i, v) {
                                v.Word = v.Word.replace(sw, '<span class="gl">' + sw + '</span>');
                                $('<dd><a>' + v.Word + '</a><span class="add"></span></dd>').prependTo($SearchLsWrap);
                            });
                            $SearchLsWrap.find('.clear').hide();
                        } else {
                            $SearchLsWrap.find('dt').hide();
                        }
                    }

                });
            }
            prevStr = '';
        });
        // 搜索事件绑定
        $searchBtn.click(function () {
            indexSearchUrl();
            return false;
        });
        if ($userinfo !== '0') {
            // 不看该公司职位
            $('#BlockCompany').click(function () {
                blockCompany();
            });
            // 收藏职位
            $('#Attention').click(function () {
                collectJob();
            });
            // 举报职位
            $('#report').click(function () {
                report();
            });

        } else {
            $('.setshome').click(function () {
                userLogin(true);
            });
            // 不看该公司职位
            $('#BlockCompany').click(function () {
                userLogin(true);
            });
            // 收藏职位
            $('#Attention').click(function () {
                userLogin(true);
            });
            // 举报职位
            $('#report').click(function () {
                userLogin(true);
            });
        }
        // 显示遮罩和菜单
        $('.jobmenu').click(function () {
            $('.jzz').show();
            $('.jzzul').show().attr({
                'data-jobid': $(this).attr('data-jobid'),
                'data-jobname': $(this).attr('data-jobname'),
                'data-cityid': $(this).attr('data-cityid'),
                'data-companname': $(this).attr('data-companname'),
                'data-companyid': $(this).attr('data-companyid')
            });
            event.preventDefault();
            event.stopPropagation();
            removeBodyTouch();
        });
        // 遮罩层关闭
        if ($('.jconfirm')) {
            $('.jconfirm').click(function () {
                $('.jzz').hide();
                $('.jzzul').hide();
                recoveryBodyTouch();
            });
        }
        // 遮罩层关闭
        $('.prompt-menu .btn').click(function () {
            $('.jzz').hide();
            $('.jzzul').hide();
            recoveryBodyTouch();
        });
        SearchInput[0].oninput = function (e) {
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
                    if (prevStr === SearchInput.val()) {
                        return false;
                    }
                    $.ajax({
                        type: 'POST',
                        url: 'https://mip.zhaopin.com/searchjob/SearchRedolent',
                        data: {
                            keyword: SearchInput.val()
                        },
                        success: function (data, textStatus, jqxhr) {
                            $SearchLsWrap.show().children('dd').remove();
                            var sw = SearchInput.val();
                            var lw = $SearchLsWrap;
                            if (data.HotWords.length > 0) {
                                $.each(data.HotWords, function (i, v) {
                                    v.Word = v.Word.replace(sw, '<span class="gl">' + sw + '</span>');
                                    $('<dd><a>' + v.Word + '</a><span class="add"></span></dd>').prependTo(lw);
                                });
                                $SearchLsWrap.find('.clear').hide();
                            } else {
                                $SearchLsWrap.find('dt').hide();
                            }
                        }
                    });
                    prevStr = SearchInput.val();
                }, 500);
            }
        };
        SearchInput.focus(function () {
            if ($(this).val() === '' || $(this).val() === ' ' || $(this).val() === null) {
                if (dtBool) {
                    $SearchLsWrap.show();
                }
            }
        });
        // 搜索历史记录
        // 读取
        var indexSearchHs = cs.get('indexSearchHs');
        if (indexSearchHs === null) {
            indexSearchHs = [];
        } else {
            indexSearchHs = indexSearchHs.split(',');
        }
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
            SearchInput.val($(this).parent('dd').children('a').text());
        });
        // 绑定联想词点击搜索事件
        $(document).on('click', '.indexSearchList a', function () {
            saveSearchLs($(this).text());
            var islurl = 'https://mip.zhaopin.com/searchjob/search?KeyWord=' + $(this).text();
            islurl += '&Location=' + $('#Slocation').attr('data-location') +  '';
            window.location.href = islurl;
        });
        // 筛选外层切换
        $screenTitLi.click(function (e) {
            if ($(this).find('span').html() !== '薪资范围') {
                e.preventDefault();
                e.stopPropagation();
                removeBodyTouch();
            }
            // 移动筛选标题
            $screenTitLiWrap.addClass('f');
            // 获取当前索引
            var index = $(this).index();
            // 显示筛选类型内容
            $screenList.eq(index).addClass('h').siblings('.screenConList').removeClass('h');
            // 当前索引样式
            $(this).addClass('h').siblings('li').removeClass('h');
            // 显示遮罩层
            $screenPop.show();
        });
        // 附近地铁地标切换
        $screenFirstConLi.not('.city').click(function () {
            // 获取当前索引
            $(this).addClass('h').siblings('li').removeClass('h');
            var index = $(this).index() + 1;
            $(this).children('.icon').show().parent().siblings('li').children('.icon').hide();
            $screenList.children('.wrap').eq(index).addClass('h').siblings('.wrap').removeClass('h');
        });
        // 二级子元素切换 == 地铁、地标、更多
        $screenLi.click(function () {
            // 获取当前索引
            var index = $(this).index();
            // 父级容器
            var $par = $(this).parents('.wrap');
            // 获取对应html
            var newStr = $par.children('.box2').find('ul').eq(index).html();
            $par.children('.showList').children('ul').html(newStr);
            $(this).addClass('h').siblings('li').removeClass('h');
            for (var a in mySwiper) {
                mySwiper[a].update(true);
                mySwiper[a].updateSlidesSize();
            }
            $('.showList ul').css('-webkit-transform', 'translate3d(0px,0px,0px)');
        });
        // 遮罩层关闭筛选
        $screenPop.click(function () {
            $(this).hide();
            if ($body.scrollTop() >= screenTitListOfTop) {
                $screenTitLiWrap.addClass('f');
            } else {
                $screenTitLiWrap.removeClass('f');
            }
            $screenList.removeClass('h');
            $screenTitLi.removeClass('h');
            recoveryBodyTouch();
        });
        // 筛选条滚动定位
        $(document).scroll(function () {
            if ($screenPop.css('display') === 'block') {
                $screenTitLiWrap.addClass('f');
                return false;
            }
            if ($body.scrollTop() >= screenTitListOfTop) {
                $screenTitLiWrap.addClass('f');
            } else {
                $screenTitLiWrap.removeClass('f');
            }
        });
        // 横竖屏
        $(window).bind('orientationchange', function () {
            if (window.orientation === 90 || window.orientation === -90) {
                if ($screenPop.css('display') === 'block') {
                    $screenTitLiWrap.addClass('f');
                    removeBodyTouch();
                }
            } else {
                if ($screenPop.css('display') === 'block') {
                    $screenTitLiWrap.addClass('f');
                } else {
                    if ($body.scrollTop() >= screenTitListOfTop) {
                        $screenTitLiWrap.addClass('f');
                    } else {
                        $screenTitLiWrap.removeClass('f');
                    }
                }
            }
        });
        // 返回
        $('.r_returnbk').click(function () {
            window.history.back();
        });
        // jssdk 这个是统计代码，需要挂载到window上
        // 每个文件的code不一样所以需要在每个文件中单独引用
        var a = window;
        var e = document;
        var f = 'script';
        var g = document.location.protocol + '//statistic.zhaopin.cn/sdk/zhaopin_tracker.js';
        var b = 'za';
        var c;
        var d;
        a.ZhaoPinBigdataAnalyticsObject = b;
        a[b] = a[b] || function () {
                    (a[b].q = a[b].q || []).push(arguments);
                };
        a[b].l = 1 * new Date;
        a._ATAD_GIB_NIPOAHZ_ || (c = e.createElement(f), d = e.getElementsByTagName(f)[0],
                c.async = 1, c.src = g, d.parentNode.insertBefore(c, d), a._ATAD_GIB_NIPOAHZ_ = !0);
        window.za('creat', 'A24');
        var basic = {};
        basic['uid'] = Number($userinfo) !== 0 ? $userinfo : '';
        basic['pagecode'] = '6019';
        basic['wdgtid'] = '';
        basic['evtid'] = 'pageopen';
        basic['chnlname'] = document.referrer;
        window.za('track', basic);
    };
    window.onload = function () {
        render();
    };
    // 搜索方法
    function indexSearchUrl() {
        var SearchInput = $('#indexSearchBox');
        if (SearchInput.val() !== null && SearchInput.val() !== '') {
            saveSearchLs(SearchInput.val());
            var url = 'https://mip.zhaopin.com/searchjob/search?KeyWord=' + SearchInput.val();
            url += '&Location=' + $('#Slocation').attr('data-location') + '';
            window.location.href = url;
        }
    }
    // 读取历史记录方法
    function readSearchLs() {
        var indexSearchHs = cs.get('indexSearchHs');
        var $SearchLsWrap = $('.indexSearchList');
        var dtBool = true;
        if (indexSearchHs == null) {
            indexSearchHs = [];
        } else {
            indexSearchHs = indexSearchHs.split(',');
        }
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
        // 判断新搜索关键词是否已存在
        var b = true;
        var indexSearchHs = cs.get('indexSearchHs');
        if (indexSearchHs == null) {
            indexSearchHs = [];
        } else {
            indexSearchHs = indexSearchHs.split(',');
        }
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
    // 筛选标题赋值
    function titVal($s1, $s2) {
        if ($s1.length > 0) {
            $s2.text($s1.attr('value'));
        }
    }
    titVal($('#orderTitVal'), $('#orderTit'));
    titVal($('#salaryTitVal'), $('#salaryTit'));
    titVal($('#educationTitVal'), $('#educationTit'));
    titVal($('#locationTitVal'), $('#locationTit'));
    // 收藏
    function collectJob() {
        var favorate = true;
        var jobId = $('.jzzul').attr('data-jobid');
        var cityId = $('.jzzul').attr('data-cityid');
        $.ajax({
            type: 'post',
            url: 'https://mip.zhaopin.com/Home/FavoritePosition',
            data: {
                positionNumber: jobId,
                cityId: cityId,
                favorite: favorate
            },
            success: function (data, textStatus, jqxhr) {
                $('.jzz').hide();
                $('.jzzul').hide();
                // myCollectList();
                alert('收藏成功');
                recoveryBodyTouch();
            }
        });
    }
    // 收藏职位存本地
    function myCollectList() {
        var newCollectList;
        $.ajax({
            url: 'https://mip.zhaopin.com/Home/MyCollectList',
            type: 'post',
            data: {
                version: '6.3.0'
            },
            success: function (data, textStatus, jqxhr) {
                if (data.FavoritedPositions != null && data.FavoritedPositions.length > 0) {
                    for (var f = 0; f < data.FavoritedPositions.length; f++) {
                        newCollectList += data.FavoritedPositions[f].PositionNumber + ',';
                    }
                    cs.rm('CollectList');
                    cs.set('CollectList', newCollectList);
                }
            }
        });
    }
    // 举报
    function report() {
        var reportUrl = 'https://mip.zhaopin.com/Home/Report';
        var PositionNumber = $('.jzzul').attr('data-jobid');
        var CompanyNumber = $('.jzzul').attr('data-companyid');
        var CompanyName = $('.jzzul').attr('data-companname');
        var PositionName = $('.jzzul').attr('data-jobname');
        var paramUrl = '?PositionNumber=' + PositionNumber + '&CompanyNumber=' + CompanyNumber + '';
        paramUrl += '&CompanyName=' + CompanyName + '&PositionName=' + PositionName + '';
        window.location.href = reportUrl + paramUrl;
    }
    // 不看公司职位
    function blockCompany() {
        var companyId = $('.jzzul').attr('data-companyid');
        $.ajax({
            url: 'https://mip.zhaopin.com/Company/SaveBlockOperate',
            type: 'post',
            data: {
                companyId: companyId
            },
            success: function (data, textStatus, jqxhr) {
                $('.jzz').hide();
                $('.jzzul').hide();
                if (data.StatusCode === 200) {
                    // myBlockList();
                    alert('屏蔽成功');
                    recoveryBodyTouch();
                }
            }
        });
    }
    // 获取黑名单企业列表
    function myBlockList() {
        var $BlockList = cs.get('BlockList');
        $.ajax({
            url: 'https://mip.zhaopin.com/Company/GetBlockCompany',
            type: 'post',
            data: {
                version: '6.3.0'
            },
            success: function (data, textStatus, jqxhr) {
                cs.rm('BlockList');
                cs.set('BlockList', data.Info);
            }
        });
    }
    // 去除body Touch事件
    function removeBodyTouch() {
        var $body = $('body');
        $body.on('touchstart, touchmove', function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        });
    }
    // 恢复body Touch事件
    function recoveryBodyTouch() {
        var $body = $('body');
        $body.off('touchstart, touchmove');
    }
    // 获得url参数
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    // 分页
    function renderPage() {
        // 总条数
        var pageCount = Number($('#pages').attr('data-pages'));
        // 当前页码
        var curent = Number($('#pages').attr('data-curr'));
        var strpage = '';
        // pageindex=X
        var pageindex = getQueryString('pageindex');
        var currentUrl = window.location.href;
        var targetUrl;
        if (pageCount > 1) {
            strpage += '<div class="j_page">';
            if (curent > 1) {
                if (pageindex > 1) {
                    if (currentUrl.indexOf('?pageindex') > -1) {
                        targetUrl = currentUrl.replace('?pageindex=' + pageindex + '', '');
                    } else {
                        targetUrl = currentUrl.replace('&pageindex=' + pageindex + '', '');
                    }
                }
                strpage += '<mip-link rel="nofollow" href="' + targetUrl + '" class="firstpage links"><<</mip-link>';
            }
            var last = curent - 1 >= 0;
            var next = curent + 1 < pageCount;
            if (last) {
                var pageindex = Number(getQueryString('pageindex'));
                if (!pageindex) {
                    pageindex = 1;
                }
                targetUrl = currentUrl.replace('pageindex=' + pageindex + '', '');
                targetUrl = targetUrl + 'pageindex=' + (pageindex - 1) + '';
                strpage += '<mip-link rel="nofollow" href="' + targetUrl + '" class="prevpage links"><</mip-link>';
            }
            var total = pageCount;
            var begin = 0;
            if (curent === 0) {
                begin = curent - 1;
            } else {
                begin = curent + 1;
            }
            var end = begin + 20;
            if (begin < 0) {
                if (end - begin < total)
                {
                    end = end - begin;
                }
                begin = 0;
            }
            if (end > total) {
                if (begin - (end - total) >= 0)
                {
                    begin = begin - (end - total);
                }
                end = total;
            }
            strpage += '<div class="j_pageSeWrap"><span class="pagelogo">logo</span>';
            strpage += '第<span class="text">' + (curent + 1) + '</span>页</div>';
            if (next) {
                var pageindex = Number(getQueryString('pageindex'));
                if (pageindex !== null && pageindex.toString().length > 1) {
                    pageindex = 1;
                }
                var sub = Number(currentUrl.indexOf('pageindex'));
                targetUrl = currentUrl.replace('pageindex=' + pageindex + '', '');
                if (sub > -1) {
                    var fg = currentUrl.substr(sub - 1, 1);
                    targetUrl = targetUrl + 'pageindex=' + (pageindex + 1) + '';
                } else {
                    var mark = Number(currentUrl.indexOf('?'));
                    if (mark > -1) {
                        targetUrl = targetUrl + '&pageindex=' + (pageindex + 1) + '';
                    } else {
                        targetUrl = targetUrl + '?pageindex=' + (pageindex + 1) + '';
                    }

                }


                strpage += '<mip-link rel="nofollow" href="' + targetUrl + '" class="nextpage links">></mip-link>';
            }
            strpage += '</div>';
            $('.r_shadow').append(strpage);
        }
    }
    function curent() {
        $('.j_pageSeWrap select option').each(function () {
            if ($(this).attr('selected') === 'selected') {
                $('.j_page .j_pageSeWrap .text').text($(this).text());
            } else {
                $('.j_page .j_pageSeWrap .text').text(curent + 1);
            }
        });
    }
    renderPage();
    curent();
    // 检查客户端是否已包含登录的cookie 返回bool表示是否已经登录
    function checkCookie() {
        if (window.navigator.cookieEnabled) {
            return true;
        } else {
            return false;
        }
    }
    // 跳转登录
    function userLogin(noreturn) {
        if (checkCookie() === false) {
            alert('您的浏览器不支持cookie将无法登录,请使用其它浏览器');
            return;
        }
        if (noreturn) {
            window.location.href = 'https://mip.zhaopin.com/account/login?prevUrl=' + escape(window.location.href) + '';
        } else {
            window.location.replace('https://mip.zhaopin.com/account/login?prevUrl=' + escape(window.location.href) + '');
        }
    }
    // 获取经纬度
    function getLocation() {
        var mapstr;
        var mapObj;
        var geolocation;
        // 加载地图，调用浏览器定位服务
        mapstr = new window.AMap.Map('container', {
            resizeEnable: true
        });
        mapstr.plugin('AMap.Geolocation', function () {
            geolocation = new window.AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 10000,
                buttonOffset: new window.AMap.Pixel(10, 20),
                zoomToAccuracy: true,
                buttonPosition: 'RB'
            });
            mapstr.addControl(geolocation);
            geolocation.getCurrentPosition();
            window.AMap.event.addListener(geolocation, 'complete', onComplete);
            window.AMap.event.addListener(geolocation, 'error', onError);
        });
    }
    // 获得经纬度后-调用获取城市名称及id接口
    function onComplete(data) {
        // 经纬度变量
        var jwd = false;
        var dataCitycode = cs.get('data-citycode');
        var userLocationLat;
        var userLocationLon;
        var code = $('#Slocation').attr('data-location');
        if (data.coords) {
            userLocationLat = data.coords.latitude;
            userLocationLon = data.coords.longitude;
        } else {
            userLocationLat = data.position.getLat();
            userLocationLon = data.position.getLng();
        }
        if (dataCitycode === undefined && dataCitycode === null) {
            $.ajax({
                type: 'get',
                url: 'https://mip.zhaopin.com/Home/GetCityInfoByLatLng',
                data: {
                    lat: userLocationLat,
                    lng: userLocationLon
                },
                success: function (data, textStatus, jqxhr) {
                    cs.set('data-citycode', data.citycode);
                }
            });
        }
        jwd = true;
        cheakJwd();
    }
    // 获得经纬度失败执行函数
    function onError(error) {
        var jwd = false;
        cheakJwd();
    }
    // 检测经纬度
    function cheakJwd() {
        var jwd = false;
        if (!jwd) {
            $('#fj').hide();
            $('.screenNull1').show();
        } else {
            $('#fj').show();
        }
    }
    cheakJwd();
    return {
        render: render
    };
});
