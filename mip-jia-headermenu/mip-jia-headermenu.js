/**
 * @file mip-jia-headermenu 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');
    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    // 获取城市
    function cityFn(callback) {
        if (!storage.get('city')) {
            $.ajax({
                url: '//m.jia.com/city/getCurrentAreaNew',
                type: 'get',
                dataType: 'jsonp',
                success: function (a) {
                    if (a.code > 0) {
                        var city = JSON.stringify(a.result.site.area_info);
                        storage.set('city', city, 21600000);
                        typeof callback === 'function' && callback();
                    }
                },
                error: function (a) {
                    console.log('获取城市失败');
                }
            });
        } else {
            typeof callback === 'function' && callback();
        }
    }

    cityFn();
    // 获取热门讨论
    function getInvitation() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '//m.jia.com/AssignApi/friend_circle_topic/',
                type: 'get',
                dataType: 'jsonp',
                success: function (data) {
                    if (data.records && data.records.length) {
                        var html = '';
                        for (var i = 0; i < 3; i++) {
                            var labels = '';
                            if (data.records[i].is_top) {
                                labels = '<span class="label pink">顶</span>';
                            } else if (data.records[i].is_recommend) {
                                labels = '<span class="label">精</span>';
                            }
                            html += '<li><a href="' + data.records[i].url
                                + '" tjjj="click_m_index_topic_desc_' + i + '">';
                            html += '<div class="desc">' + labels + '<span class="text">'
                                + data.records[i].title + '</span>';
                            html += '<div class="statistics"><i></i>' + data.records[i].comment_count
                                + '人讨论</div></div></a></li>';
                        }
                        resolve(html);
                    } else {
                        reject();
                    }
                },
                error: function () {
                    reject();
                }
            });
        });
    }

    // 下拉菜单
    var headNav = {

        init: function (thisObj, data) {
            headNav.appendHtml(thisObj, data);
            cityFn(function () {
                var city = JSON.parse(storage.get('city'));
                headNav.setCity(city['area_py'], data);
                // type区分，填充数据
                var type = storage.get('headNavType');
                if (type === 'forum') {
                    headNav.addTopic(data);
                }
            });
        },
        ask: function (thisObj, data) {
            var memuBox = '';
            memuBox += '<div class="bg"></div>';
            memuBox += '<div class="content">';
            memuBox += '<a class="close-btn" href="javascript:;"></a>';
            memuBox += '<ul class="tab-list three">';
            memuBox += '<li>';
            memuBox += '<a href="getCity" tjjj="click_m_detail_more_index">首页</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/ask/" tjjj="click_m_detail_more_ask">问答</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/tuku/tag/" tjjj="click_m_detail_more_meitu">美图</a>';
            memuBox += '</li>';
            memuBox += '</ul>';
            memuBox += '<h4 class="title-text">更多问题</h4>';
            memuBox += '<ul class="tab-list three">';
            memuBox += '<li>';
            memuBox += '<a href="/ask/" tjjj="click_m_detail_more_ask_hot">热点问题</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/ask/lista-1/" tjjj="click_m_detail_more_ask_01">装修流程</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/ask/lista-2/" tjjj="click_m_detail_more_ask_02">家居产品</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/ask/lista-3/" tjjj="click_m_detail_more_ask_03">装修材料</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/ask/lista-67/" tjjj="click_m_detail_more_ask_004">家装设计</a>';
            memuBox += '</li>';
            memuBox += '<li class="special">';
            memuBox += '<a href="/ask/question/" tjjj="click_m_detail_more_ask_goask">我要提问</a>';
            memuBox += '</li>';
            memuBox += '</ul>';
            memuBox += '<ul class="station-list">';
            memuBox += '<li>';
            memuBox += '<a href="/zx/page/ysbj/getCity/" tjjj="click_m_article_details_toubumore_bj">';
            memuBox += '<span class="znbj"></span>';
            memuBox += '<p>智能报价</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zx/freesheji/" tjjj="click_m_article_details_toubumore_sheji">';
            memuBox += '<span class="mfsj"></span>';
            memuBox += '<p>免费设计</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zx/vrbm/" tjjj="click_m_article_details_toubumore_3d">';
            memuBox += '<span class="qjjz"></span>';
            memuBox += '<p>3D全景家装</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/page/mxdtfb.html" tjjj="click_m_detail_more_mxdk">';
            memuBox += '<span class="mxdk"></span>';
            memuBox += '<p>免息贷款</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/event/appcoupon2000/" tjjj="click_m_article_details_toubumore_hb">';
            memuBox += '<span class="zxhb"></span>';
            memuBox += '<p>装修红包</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '</ul>';
            memuBox += '</div>';
            $(data.element).addClass('no-logo');
            $(data.element).append(memuBox);
        },
        normal: function (thisObj, data) {
            var memuBox = '';
            memuBox += '<div class="bg"></div>';
            memuBox += '<div class="content">';
            memuBox += '<a class="close-btn" href="javascript:;"></a>';
            memuBox += '<h3><span class="logo"></span></h3>';
            memuBox += '<ul class="tab-list">';
            memuBox += '<li>';
            memuBox += '<a href="getCity" tjjj="click_m_detail_more_index">首页</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/tuku/tag/" tjjj="click_m_detail_more_meitu">美图</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zx/zxrj/" tjjj="click_m_detail_more_riji">日记</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zx/zuimei/case/" tjjj="click_m_detail_more_anli">案例</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zx/page/xzx/" tjjj="click_m_detail_more_gonglv">攻略</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/video/" tjjj="click_m_detail_more_shipin">视频</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/xuancai/" tjjj="click_m_detail_more_xuancai">选材</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/zxfs/" tjjj="click_m_detail_more_fengshui">风水</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zx/list/getCity/" tjjj="click_m_detail_more_zxgs">装修公司</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/wangpu/getCity/" tjjj="click_m_detail_more_wangpu">口碑旺铺</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/friendCircle/" tjjj="click_m_detail_more_luntan">论坛</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/ask/" tjjj="click_m_detail_more_ask">问答</a>';
            memuBox += '</li>';
            memuBox += '</ul>';
            memuBox += '<ul class="station-list">';
            memuBox += '<li>';
            memuBox += '<a href="/zx/page/ysbj/getCity/" tjjj="click_m_article_details_toubumore_bj">';
            memuBox += '<span class="znbj"></span>';
            memuBox += '<p>智能报价</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zx/freesheji/" tjjj="click_m_article_details_toubumore_sheji">';
            memuBox += '<span class="mfsj"></span>';
            memuBox += '<p>免费设计</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zx/vrbm/" tjjj="click_m_article_details_toubumore_3d">';
            memuBox += '<span class="qjjz"></span>';
            memuBox += '<p>3D全景家装</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/page/mxdtfb.html" tjjj="click_m_detail_more_mxdk">';
            memuBox += '<span class="mxdk"></span>';
            memuBox += '<p>免息贷款</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/event/appcoupon2000/" tjjj="click_m_article_details_toubumore_hb">';
            memuBox += '<span class="zxhb"></span>';
            memuBox += '<p>装修红包</p>';
            memuBox += '</a>';
            memuBox += '</li>';
            memuBox += '</ul>';
            memuBox += '</div>';
            memuBox += '</section>';
            $(data.element).append(memuBox);
        },
        forum: function (thisObj, data) {
            var memuBox = '';
            memuBox += '<section class="head-main-nav no-logo">';
            memuBox += '<div class="bg"></div>';
            memuBox += '<div class="content">';
            memuBox += '<a class="close-btn" href="javascript:;"></a>';
            memuBox += '<ul class="tab-list three">';
            memuBox += '<li>';
            memuBox += '<a href="/getCity/" tjjj="click_m_detail_more_index">首页</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/ask/" tjjj="click_m_detail_more_ask">问答</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/friendCircle/" tjjj="click_m_detail_more_luntan">论坛</a>';
            memuBox += '</li>';
            memuBox += '</ul>';
            memuBox += '<h4 class="title-text">更多圈子</h4>';
            memuBox += '<ul class="tab-list three">';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/newCircle/1/" tjjj="click_m_detail_more_circle1">建材选购</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/newCircle/2/" tjjj="click_m_detail_more_circle2">家居软装</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/newCircle/3/" tjjj="click_m_detail_more_circle3">活动福利</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/newCircle/4/" tjjj="click_m_detail_more_circle4">装修干货</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/newCircle/5/" tjjj="click_m_detail_more_circle5">装修日记</a>';
            memuBox += '</li>';
            memuBox += '<li>';
            memuBox += '<a href="/zixun/newCircle/6/" tjjj="click_m_detail_more_circle6">家人闲聊</a>';
            memuBox += '</li>';
            memuBox += '</ul>';
            memuBox += '<h4 class="title-text">正在热议</h4>';
            memuBox += '<div class="invitations">';
            memuBox += '<ul class="topic-list"></ul>';
            memuBox += '<div class="more-area">';
            memuBox += '<a href="/zixun/friendCircle/" tjjj="click_m_detail_more_luntan">';
            memuBox += '<div class="desc">查看更多<i class="arrows"></i></div>';
            memuBox += '</a>';
            memuBox += '</div>';
            memuBox += '</div>';
            memuBox += '</div>';
            memuBox += '</section>';
            $(data.element).append(memuBox);
        },
        // 替换{{city}}为城市拼音
        setCity: function (city, data) {
            $(data.element).find('a').each(function () {
                var href = $(this).attr('href');
                href = href.replace(/getCity/g, city);
                $(this).attr('href', href);
            });
        },

        // 添加帖子
        addTopic: function (data) {
            getInvitation().then(function (html) {
                $(data.append).append(html);
            }, function () {
                $(data.element).find('.invitations').hide();
            });
        },

        // 添加导航html
        appendHtml: function (thisObj, data) {
            // id为channel存在时，添加导航
            var urlRule = data.type;
            if ($(thisObj).find('#channel').length) {
                var str = '';
                if (typeof urlRule === 'undefined') {
                    str = headNav.normal(thisObj, data);
                    storage.set('headNavType', 'global');
                } else {
                    if (urlRule === 'ask') {
                        str = headNav.ask(thisObj, data);
                        storage.set('headNavType', 'ask');
                    } else if (urlRule === 'forum') {
                        str = headNav.forum(thisObj, data);
                        storage.set('headNavType', 'forum');
                    } else if (urlRule === 'normal') {
                        str = headNav.normal(thisObj, data);
                        storage.set('headNavType', 'global');
                    }
                }
                // 显示导航
                $(thisObj).find('#channel').on('click', function () {
                    $(data.element).show();
                });

                // 隐藏导航
                $(data.element).find('.bg,.close-btn').on('click', function () {
                    $(data.element).hide();
                });
            }
        }
    };
    customElement.prototype.firstInviewCallback = function () {
        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
        }
        catch (e) {
            thisObj.innerHTML = '';
            return false;
        }
        headNav.init(thisObj, data);
        if (typeof data.share !== 'undefined') {
            var UA = window.navigator.userAgent;
            var IsWeiXin = (/MicroMessenger/i.test(UA));
            var IsAndroid = (/Android|HTC/i.test(UA));
            $(data.share).on('click', function () {
                if (IsWeiXin) {
                    $(data.sharebox).css('display', 'block');
                    if (IsAndroid) {
                        $(data.sharebox).find('img')
                            .attr('src', '//mued3.jia.com/image/mobile/toutiao/android_tips.png');
                    }
                } else {
                    $(data.sharebox).addClass('commonTips');
                    $(data.sharebox).find('img').attr('src', '//mued3.jia.com/image/mobile/toutiao/common_tips.png');
                    if ($(data.sharebox).find('.tips_close').length === 0) {
                        $(data.sharebox).append('<a href="javascript:;" class="tips_close">我知道了</a>');
                    }
                    $(data.sharebox).css('display', 'block');
                }
            });
            $(data.sharebox).on('click', function () {
                $(this).hide();
            });
        }
    };

    return customElement;
});
