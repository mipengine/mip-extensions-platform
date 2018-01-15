/**
 * @file mip-dftt-pageNewsList 组件
 * @author 1611185386@qq.com
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var GLOBAL = {};
    var newsNum = 10;
    var isHttps = (window.location.protocol.indexOf('https') >= 0) || false; // 判断是否是https协议
    var $hnList = $('#J_hn_list'); // 热点新闻列表
    var pullUpFinished = true;
    var data = ''; // 请求接口获取的数据
    GLOBAL.namespace = function (str) {
        var arr = str.split('.');
        var o = GLOBAL;
        for (var i = (arr[0] === 'GLOBAL') ? 1 : 0; i < arr.length; i++) {
            o[arr[i]] = o[arr[i]] || {};
            o = o[arr[i]];
        }
    };

    GLOBAL.namespace('Util');
    GLOBAL.namespace('et');
    GLOBAL.Util = {

        /**
         * 字符串转换成时间（毫秒）
         * @param  {[type]} str 时间字符串（格式：2016-02-26 09:12）
         * 注意：iphone不支持（格式：2016-02-26 09:12）需要转换成：（格式：2016/02/26 09:12）
         * @return {[type]}     [description]
         */
        strToTime: function (str) {
            try {
                return Date.parse(str.replace(/-/g, '/'));
            }
            catch (e) {
                console.error(e);
                return false;
            }
        },

        /**
         * 计算指定时间与当前时间的时间差 并转换成相应格式字符串
         * 如：xx分钟前，xx小时前，昨天 xx:xx，前天 xx:xx，xx-xx xx:xx
         * @param  {[type]} str 时间字符串（格式：2016-02-26 09:12）
         * @return {[type]}     [description]
         */
        getSpecialTimeStr: function (str) {
            var targetTime = this.strToTime(str);
            if (!targetTime) {
                return false;
            }
            var currentTime = new Date().getTime();
            var tdoa = Number(currentTime - targetTime);
            var dayTime = 24 * 60 * 60 * 1000; // 1天
            var hourTime = 60 * 60 * 1000; // 1小时
            var minuteTime = 60 * 1000; // 1分钟

            if (tdoa >= dayTime) { // 天
                var h = tdoa / dayTime;
                if (h > 2) {
                    return this.timeToString(targetTime);
                } else if (h > 1) {
                    return '前天';
                } else {
                    return '昨天';
                }
            } else if (tdoa >= hourTime) { // 小时
                return Math.floor(tdoa / hourTime) + '小时前';
            } else if (tdoa >= minuteTime) {
                return Math.floor(tdoa / minuteTime) + '分钟前';
            } else {
                return '最新';
                // return Math.floor(tdoa / 1000) + '秒前';
            }
        },

        /**
         * Javascript获取页面来源(referer)
         * @from http://www.au92.com/archives/javascript-get-referer.html
         * @return {[type]} [description]
         */
        getReferrer: function () {
            var referrer = '';
            try {
                referrer = window.top.document.referrer;
            } catch (e) {
                if (window.parent) {
                    try {
                        referrer = window.parent.document.referrer;
                    } catch (e2) {
                        referrer = '';
                    }
                }
            }
            if (referrer === '') {
                referrer = document.referrer;
            }
            return referrer;
        },

        /**
         * 获取url中参数的值
         * @param  {[type]} name 参数名
         * @return {[type]}      参数值
         */
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        },

        /**
         * 获取url（排除url中参数）
         * @return {[type]} [description]
         */
        getUrlNoParams: function () {
            var locaUrl = window.location.href;
            var endIndex = 0;
            if (locaUrl.indexOf('?') >= 0) {
                endIndex = locaUrl.indexOf('?');
                return locaUrl.substring(0, endIndex);
            }
            if (locaUrl.indexOf('#') >= 0) {
                endIndex = locaUrl.indexOf('#');
                return locaUrl.substring(0, endIndex);
            }
            return locaUrl;
        },

        /**
         * OS的判断
         * @return {[type]} [description]
         */
        getOsType: function () {
            var agent = navigator.userAgent.toLowerCase();
            var osType = '';
            var index = '';
            var version = '';
            if (/android/i.test(navigator.userAgent)) {
                index = agent.indexOf('android');
                version = agent.substr(index + 8, 3);
                osType = 'Android ' + version;
            }
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                index = agent.indexOf('os');
                version = agent.substr(index + 3, 4);
                osType = 'iOS ' + version;
            }
            if (/Linux/i.test(navigator.userAgent) && !/android/i.test(navigator.userAgent)) {
                if (!/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    osType = 'Linux';
                }
            }
            if (/windows|win32/i.test(navigator.userAgent)) {
                osType = 'windows32';
            }
            if (/windows|win64/i.test(navigator.userAgent)) {
                osType = 'windows64';
            }
            return osType;
        }
    };
    function CookiesObj() {
    }
    CookiesObj.prototype = {
        remove: function (a) {
            var c = new Date();
            c.setTime(c.getTime() - 1);
            var b = 0;
            document.cookie = a + '=' + b + '; expires=' + c.toGMTString();
        },
        get: function (c) {
            var a;
            var f = document.cookie;
            var e = f.indexOf(c + '=');
            if (e > -1) {
                var start = f.indexOf('=', e) + 1;
                var b = f.indexOf(';', start);
                if (b === -1) {
                    b = f.length;
                }
                a = f.substring(start, b);
            }
            return a;
        },
        set: function (c, f, b) {
            var a = '';
            var domainVal = '';
            var path = '';
            if (typeof (b) !== 'undefined') {
                if (b.domain) {
                    domainVal = 'domain=' + b.domain;
                }
                if (b.expires) {
                    var e = new Date();
                    e.setTime(e.getTime() + Number(b) * 24 * 3600 * 1000);
                    a = 'expires = ' + e.toGMTString();
                }
                if (b.path) {
                    path = 'path=' + b.path;
                }
            } else {
                domainVal = '';
            }
            document.cookie = c + '=' + f + ';' + path + ';' + a + ';' + domainVal;
        }
    };
    var Cookies = new CookiesObj();
    var ime = GLOBAL.Util.getQueryString('ime') || '';
    var deviceid = GLOBAL.Util.getQueryString('deviceid') || 'null';
    var apptypeid = GLOBAL.Util.getQueryString('apptypeid') || null;
    // 存储新闻类别
    try {
        var newstypeE = document.getElementById('newstype');
        GLOBAL.et.newsType = newstypeE ? newstypeE.value : 'toutiao';
        GLOBAL.et.newsType = (GLOBAL.et.newsType === 'weikandian') ? 'toutiao' : GLOBAL.et.newsType;
    } catch (e) {
        console.error('newstype has error: \n', e);
    }
    var url = GLOBAL.Util.getUrlNoParams();
    try {
        // 缓存用户id（365天）
        GLOBAL.et.uid = Cookies.get('user_id');
        if (!GLOBAL.et.uid) {
            GLOBAL.et.uid = (+new Date()) + Math.random().toString(10).substring(2, 6);
            Cookies.set('user_id', GLOBAL.et.uid, {expires: 365, path: '/', domain: 'eastday.com'});
        }
        // 缓存渠道号（6小时）
        GLOBAL.et.qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid') || 'null';
        if (GLOBAL.et.qid) {
            Cookies.set('qid', GLOBAL.et.qid, {expires: 0.25, path: '/', domain: 'eastday.com'});
        }
    } catch (e) {
        console.warn('set uid and qid has error: \n', e);
    }
    var specialChannel = [];
    // 通过搜索引擎进入的（渠道处理）
    try {
        if (!GLOBAL.Util.getQueryString('qid')) {
            specialChannel = [
                {referer: 'baidu.com', qid: 'baiducom'},
                {referer: 'so.com', qid: '360so'},
                {referer: 'sogou.com', qid: 'sogoucom'},
                {referer: 'sm.cn', qid: 'smcn'},
                {referer: 'm.tq1.uodoo.com', qid: 'smcn'}
            ];
            for (var i = 0; i < specialChannel.length; i++) {
                if (GLOBAL.Util.getReferrer() && GLOBAL.Util.getReferrer().indexOf(specialChannel[i].referer) !== -1) {
                    GLOBAL.et.qid = specialChannel[i].qid;
                    break;
                }
            }
        }
    }
    catch (e) {
        console.error('Fix SEO has error: \n', e);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        function EastDetails() {
            // this.hotNewsUrl = 'http://106.75.3.64/newsmore_h5detail/newspool';            // 热点新闻url(测试)
            this.hotNewsUrl = element.getAttribute('data-url') || 'http://106.75.3.64/newsmore_h5detail/newspool'; // 热点新闻url
            this.startKey = '';
            this.pageNum = 1;
            this.log = null; // 日志对象
        }
        EastDetails.prototype = {
            loadHotNewsData: function () {
                var scope = this;
                $.ajax({
                    url: scope.hotNewsUrl,
                    data: {
                        htps: isHttps ? '1' : '0',
                        type: GLOBAL.et.newsType, // 新闻类别
                        qid: GLOBAL.et.qid, // 渠道
                        uid: ime || GLOBAL.et.uid, // 用户ID
                        newsnum: newsNum, // 新闻数量 默认10条
                        ishot: GLOBAL.Util.getQueryString('ishot') || 'null', // 是否是热点新闻
                        recommendtype: GLOBAL.Util.getQueryString('recommendtype') || 'null', // 推荐新闻的类别
                        url: GLOBAL.Util.getUrlNoParams(), // 当前新闻的url（纯净的url）
                        os: GLOBAL.Util.getOsType(), // 操作系统
                        pgnum: scope.pageNum // 当前请求第几页数据
                    },
                    dataType: 'jsonp',
                    timeout: 8000,
                    jsonp: 'jsonpcallback',
                    beforeSend: function () {
                        pullUpFinished = false;
                    },
                    success: function (rst) {
                        data = rst ? rst.data : '';
                        var kws = rst ? rst.kwds : '';
                        scope.startKey = rst.endkey || '';
                        // 加载赞踩按钮
                        // if (GLOBAL.et.voteQids.contains(GLOBAL.et.qid)) {
                        //     if (scope.pageNum === 1) {
                        //         scope.generateVoteDom(rst);
                        //     }
                        // }
                        if (data) {
                            // if (GLOBAL.et.qid === 'ioswechat') {
                            //     scope.getDsp(function (dspData) {
                            //         scope.loadHotNewsForWechat(data, scope.pageNum++, dspData);
                            //         pullUpFinished = true;
                            //     });
                            // } else if (GLOBAL.et.gg.my.nogg) {
                            //     scope.loadHotNews(data, scope.pageNum++, []);
                            //     pullUpFinished = true;
                            // } else {
                            //     scope.getDsp(function (dspData) {
                            //         scope.loadHotNews(data, scope.pageNum++, dspData);
                            //         pullUpFinished = true;
                            //     });
                            // }
                            scope.loadHotNews(data, scope.pageNum++, []);
                            pullUpFinished = true;
                        } else {
                            console.warn('未获取到数据!');
                        }
                        // 新需求：针对特殊的渠道不添加关键词搜索链接。
                        // if (!noKwsQids.contains(GLOBAL.et.qid) && kws && !issdkqid) {
                        //     scope.highlightKeywords(kws);
                        // }
                    },
                    error: function () {
                        pullUpFinished = true;
                    }
                });
            },

            /**
             * 加载热点新闻
             *
             * @param  {Array} data 新闻数据
             * @param {number} pgnum 页数
             * @param {Object} dspData dsp数据
             * @return {boolean} 如果数据为空，返回false
             */
            loadHotNews: function (data, pgnum, dspData) {
                var scope = this;
                if (!data || !data.length) {
                    return false;
                }
                // if (pgnum === 1) {
                //     // 热点新闻标题
                //     $hotNews.append('<div class="section-title hn-title"><h2><span></span>热点新闻<span class="line" ' + (appBgColor ? 'style='background-color:' + appBgColor + ';'' : '') + ' ></span></h2></div>');
                //     // 热点新闻列表
                //     $hotNews.append($hnList);
                //     // 特殊渠道无上拉加载功能（故加载动画也不需要）
                //     if (!noInfiniteScrollQids.contains(GLOBAL.et.qid)) {
                //         // loading动画
                //         $hotNews.append($loading);
                //     }
                // }
                var len = data.length;
                var ttaccid = GLOBAL.Util.getQueryString('ttaccid');
                var softtype = GLOBAL.Util.getQueryString('softtype');
                var softname = GLOBAL.Util.getQueryString('softname');
                var ver = GLOBAL.Util.getQueryString('ver');
                var appqid = GLOBAL.Util.getQueryString('appqid');
                var ttloginid = GLOBAL.Util.getQueryString('ttloginid');
                var appver = GLOBAL.Util.getQueryString('appver');
                for (var i = 0; i < len; i++) {
                    var item = data[i];
                    var url = item.url;
                    var dateStr = item.date;
                    var topic = item.topic;
                    var source = item.source;
                    var imgArr = item.miniimg;
                    var recommendtype = item.recommendtype ? item.recommendtype : '-1';
                    var ispicnews = item.ispicnews; // 大图新闻(1)、小图新闻(0)、无图新闻(-1)
                    var ispartner = Number(item.ispartner) || '';
                    var partnerId = item.partner_id || '';
                    var titledisplay = item.titledisplay || '';
                    var type = item.type;
                    var subtype = item.subtype;
                    var imgLen = imgArr.length;
                    var hot = Number(item.hotnews); // 热门
                    // var rec = Number(item.isrecom); // 推荐
                    // var nuanwen = Number(item.isnxw); // 暖文
                    var idx = i + 1;
                    var fr = GLOBAL.Util.getUrlNoParams();
                    var advStr = '';
                    var tagStr = '';
                    idx = idx + (pgnum - 1) * 10;
                    // url处理（对于不带域名的链接需要自己拼接域名）
                    if (ispartner !== 1) {
                        url += '?qid=' + GLOBAL.et.qid + '&idx=' + idx + '&fr=' + fr + '&recommendtype='
                            + recommendtype + '&deviceid=' + deviceid + '&pgnum=' + pgnum;
                        if (ttaccid) {
                            url += ('&ttaccid=' + ttaccid);
                        }
                        if (ime) {
                            url += ('&ime=' + ime);
                        }
                        if (apptypeid !== null) {
                            url += ('&apptypeid=' + apptypeid);
                        }
                        if (hot) {
                            url += '&ishot=1';
                        }
                        if (softtype) {
                            url += ('&softtype=' + softtype);
                        }
                        if (softname) {
                            url += ('&softname=' + softname);
                        }
                        if (ver) {
                            url += ('&ver=' + ver);
                        }
                        if (appqid) {
                            url += ('&appqid=' + appqid);
                        }
                        if (ttloginid) {
                            url += ('&ttloginid=' + ttloginid);
                        }
                        if (appver) {
                            url += ('&appver=' + appver);
                        }
                    }

                    // 类别处理
                    if (titledisplay) { // 新处理方式
                        titledisplay = titledisplay.toString();
                        // titledisplay = '00000100';
                        var isZd = Number(titledisplay.charAt(titledisplay.length - 1)); // 是否是置顶
                        var isHot = Number(titledisplay.charAt(titledisplay.length - 2)); // 是否是热门
                        var isRec = Number(titledisplay.charAt(titledisplay.length - 3)); // 是否是推荐
                        var isZt = Number(titledisplay.charAt(titledisplay.length - 4)); // 是否是专题
                        var isVideo = Number(titledisplay.charAt(titledisplay.length - 5)); // 是否是视频
                        var isYc = Number(titledisplay.charAt(titledisplay.length - 6)); // 是否是原创
                        var isPartner = Number(titledisplay.charAt(titledisplay.length - 7)); // 是否是广告
                        var isNuanwen = Number(titledisplay.charAt(titledisplay.length - 8)); // 是否是暖文

                        if (isZd === 1) {
                            tagStr += '<i class="tag-zd">顶</i>';
                        }
                        if (isHot === 1) {
                            tagStr += '<i class="tag-hot">热门</i>';
                        }
                        if (isRec === 1) {
                            tagStr += '<i class="tag-rec">推荐</i>';
                        }
                        if (isZt === 1) {
                            tagStr += '<i class="tag-zt">专题</i>';
                        }
                        if (isVideo === 1) {
                            tagStr += '<i class="tag-video">视频</i>';
                        }
                        if (isYc === 1) {
                            tagStr += '<i class="tag-yc">原创</i>';
                        }
                        if (isPartner === 1) {
                            tagStr += '<i class="tag-gg">广告</i>';
                            advStr = 'class="J-promote-news" data-advid="' + partnerId + '"';
                        }
                        if (isNuanwen === 1) {
                            tagStr += '<i class="tag-nuanwen">暖文</i>';
                        }
                    }

                    /* ======== 新闻流 ========= */
                    if (Number(ispicnews) === 1) { // 大图模式
                        imgArr = item.lbimg;
                        $hnList.append([
                            '<section class="news-item news-img-lg">',
                            '<a ' + advStr + ' data-type="' + type + '" ',
                            'data-subtype="' + subtype + '" href="' + url + '" class="news-link">',
                            '<h3 class="title dotdot line3">' + topic + '</h3>',
                            '<p class="img img-bg">',
                            '<img class="img" src="' + imgArr[0].src + '"></image>',
                            '</p>',
                            '<p class="tags">',
                            '<em class="tag tag-time">' + (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
                            '<em class="tag tag-src">' + source + '</em>',
                            '</p>',
                            '</a>',
                            '</section>'
                        ].join(''));
                    } else if (Number(ispicnews) === 0) {
                        if (imgLen >= 3) { // 三图模式
                            $hnList.append([
                                '<section class="news-item news-img3">',
                                '<a ' + advStr + ' data-type="' + type + '" ',
                                'data-subtype="' + subtype + '" href="' + url + '" class="news-link">',
                                '<div class="info">',
                                '<h3 class="title dotdot line3">' + topic + '</h3>',
                                '</div>',
                                '<div class="img">',
                                '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[0].src + '"></div>',
                                '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[1].src + '"></div>',
                                '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[2].src + '"></div>',
                                '</div>',
                                '<p class="tags">',
                                '<em class="tag tag-time">',
                                (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
                                '<em class="tag tag-src">' + source + '</em>',
                                '</p>',
                                '</a>',
                                '</section>'
                            ].join(''));
                        } else if (imgLen >= 1) { // 单图模式
                            $hnList.append([
                                '<section class="news-item news-img1">',
                                '<a ' + advStr + ' data-type="' + type + '" ',
                                'data-subtype="' + subtype + '" href="' + url + '" class="news-link">',
                                '<div class="info">',
                                '<h3 class="title dotdot line3">' + topic + '</h3>',
                                '<p class="tags">',
                                '<em class="tag tag-time">',
                                (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
                                '<em class="tag tag-src">' + source + '</em>',
                                '</p>',
                                '</div>',
                                '<div class="img img-bg"><img data-lbimg="',
                                    item.lbimg[0] ? item.lbimg[0].src : '',
                                    'class="image" src="' + imgArr[0].src + '"></div>',
                                '</a>',
                                '</section>'
                            ].join(''));
                        }
                        // if (imgLen !== 0) {
                        //     // 收集顶部app引导下载轮播图中的新闻数据
                        //     topNewsArr.push({
                        //         url: url,
                        //         imgSrc: imgArr[0].src,
                        //         title: topic
                        //     });
                        // }
                    }

                    // try {
                    //     scope.loadGg(i, len, dspData);
                    // } catch (e) {
                    //     console.error(e);
                    // }
                }

                // 判断新闻加载完成的标志
                // hasListNews = true;
            }
        };
        var eastDetails = new EastDetails();
        eastDetails.loadHotNewsData();
    };

    return customElement;
});
