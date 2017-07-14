/**
 * @file 呼起自动扫描呼起事件，并处理主动呼起事件
 * @author tingling
 */
define(function (require) {

    // var aUtils = require('./aUtils');
    var util = require('util');
    var aUtils = util.platform;
    var callAppEvent = require('./CallNativeCom_2');
    var clickInternal = 3 * 1000;
    var isDebug = !!document.location.href.match(/debug\=1/ig);
    var aCallLocked = false;
    var sinaHead = {
        news: {type: 'news', head: 'sinanews', ios9Https: 'https://sapi.sina.cn/Callup.php'},
        sports: {type: 'sports', head: 'sinasports', ios9Https: ''}
    };

    /**
	*自动添加点击事件，并获取k参数
    */
    var getClickTargetInfo = {
        domClass: 'j_call_native_mip',
        dataName: {
            docid: null,
            callupid: null,
            globalswitch: '0',
            media: 'sinawap',
            app: null,
            domain: null,
            channel: null,
            type: null,
            calluptype: '',
            position: null,
            url: null,
            downloadk: null,
            golink: '',
            clicksuda: '',
            weiboSlience: ''
        },
        getDomInfo: function (dom) {
            var className = dom.className;
            var domInfo = {};
            var domData = dom.dataset;

            domInfo.isCallNative = className.indexOf(this.domClass) > -1;
            if (domInfo.isCallNative) {
                domInfo.paramsid = domData.paramsid || '';
                domInfo.paramslivetype = domData.paramslivetype || '';
                domInfo.paramstype = domData.paramstype || '';
                domInfo.paramsvid = domData.paramsvid || '';
                domInfo.paramsmatchid = domData.paramsmatchid || '';
                domInfo.callupid = domData.callupid;
                domInfo.globalSwitch = domData.globalswitch || '0';
                domInfo.downloadswitch = domData.downloadswitch || '1';
                domInfo.media = domData.media || 'sinawap';
                domInfo.app = domData.app;
                domInfo.domain = domData.domain;
                domInfo.channel = domData.channel;
                domInfo.type = domData.type;
                domInfo.calluptype = domData.calluptype || '';
                domInfo.position = getPos(domData.position);
                domInfo.url = (domData.url || '').replace(/url/ig, 'ur\\l');
                domInfo.kid = domData.kid;
                domInfo.golink = domData.golink || '',
                    domInfo.clickSuda = domData.clicksuda || '';
                domInfo.weiboSlience = domData.weiboslience || '';
                domInfo.locked = !!parseInt(domData.locked, 10) || false;
                domInfo.targetEl = dom;
            }

            function getPos(pos) {
                !pos && (pos = 1);
                var aLen = pos.toString().length;

                if (aLen < 3) {
                    pos = ('000' + pos).substr(-3, 3);
                }

                return pos;
            }
            return domInfo;
        },
        findDom: function (dom) {
            var maxDeep = 10;
            var domInfo = {};

            for (var o = 0; o < maxDeep; o++) {
                domInfo.info = this.getDomInfo(dom);
                if (domInfo.info.isCallNative) {
                    domInfo.dom = dom;
                    break;
                }
                else {
                    dom = dom.parentElement;
                }

            }
            return domInfo;
        },
        findTargetInfo: function (dom) {
            var domInfo = this.findDom(dom);

            return (domInfo && domInfo.info) || null;
        },
        bindEventForApp: function (obj, ev, fn) {
            if (!document.addEventListener) {
                obj.attachEvent(ev, fn);
            }
            else {
                obj.addEventListener(ev, fn, true);
            }
        },
        stopDefault: function (e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
        },
        addLock: function (dom) {
            aCallLocked = true;
            setTimeout(function () {
                aCallLocked = false;
            }, clickInternal);
        },
        bindTarget: function ($obj) {
            var self = this;
            this.bindEventForApp($obj, 'click', function (e) {
                var dom = e.target;
                var targetInfo = self.findTargetInfo(dom);
                var isLock = aCallLocked || false;

                if (targetInfo.isCallNative && !isLock) {
                    self.addLock(dom);
                    self.openOrDownloadApp(targetInfo);
                }

                self.stopDefault(e);

            });
        },
        getParamsStr: function (params) {
            var allStr = '{';
            for (var o in params) {
                allStr += '"' + o + '":"' + params[o] + '"\,';
            }
            allStr = allStr.slice(0, -1);
            return allStr + '}';
        },
        getSchemeInfo: function (type) {
            var aInfo = {};
            var aSinaHead = sinaHead;

            switch (type) {
                case aSinaHead.sports.type:
                    aInfo.name = aSinaHead.sports.type;
                    aInfo.head = aSinaHead.sports.head;
                    aInfo.ios9Https = aSinaHead.sports.ios9Https;
                    aInfo.downloadUrl = 'https://sports.sina.cn/app_download.d.html?id=1';
                    aInfo.wxUrl = 'https://sports.sina.cn/app_download.d.html?id=1';
                    break;
                default:
                    aInfo.name = aSinaHead.news.type;
                    aInfo.head = aSinaHead.news.head;
                    aInfo.ios9Https = aSinaHead.news.ios9Https;
                    aInfo.wxUrl = ['h', 't', 't', 'p'].join('') + '://a.app.qq.com/o/simple.jsp?pkgname=com.sina.news&ckey=CK1346428841879';
                    break;
            }
            return aInfo;
        },
        pageType: {event: 'event', h5: 'h5', doc: 'doc'},
        checkDefined: function (aValue) {
            return typeof aValue !== 'undefined';
        },
        checkBoxExistsSub: function (box, subKeyList) {
            if (!this.checkDefined(box)) {
                return;
            }
            var o = '';
            for (o in subKeyList) {
                var item = subKeyList[o];
                if (this.checkDefined(box[item])) {
                    return box[item].length > 0;
                }
            }
        },
        openOrDownloadApp: function (config) {
            var data = {};
            var self = this;
            var aConfig = config;
            var jumpConfig = {};
            var app = config.app || 'news';
            var schemeInfo = this.getSchemeInfo(app) || {};
            var isDomDocId = self.checkBoxExistsSub(config, ['callupid', 'docid']);
            var isH5Url = self.checkDefined(config) && aConfig.url !== undefined && aConfig.url.length > 0;
            var isDownloadK = self.checkDefined(config) && config.downloadk !== undefined && config.downloadk;
            var isGolink = self.checkDefined(config) && config.golink !== undefined && config.golink.length > 0;
            var isEvent = self.checkDefined(config) && config.paramsid;
            var isKid = self.checkDefined(config) && config.kid !== undefined && config.kid;

            var nativeUrl = '';
            var params = '';
            var golink = '';
            var schemeParams = '';
            var ios9Params = '';
            var ios9Url = '';
            var aType = '';
            var aPageType = this.pageType;

            if (isEvent) {
                aType = aPageType.event;
            }

            if (isH5Url && !isEvent) {
                aType = aPageType.h5;
            }

            if (isDomDocId) {
                aType = aPageType.doc;
            }

            switch (aType) {
                case aPageType.event:
                    params = {
                        id: config.paramsid,
                        livetype: config.paramslivetype,
                        type: config.paramstype,
                        vid: config.paramsvid,
                        matchid: config.paramsmatchid
                    };
                    ios9Params = 'params=' + encodeURIComponent(this.getParamsStr(params));
                    schemeParams = 'params=' + this.getParamsStr(params);
                    break;
                case aPageType.h5:
                    params = {
                        url: aConfig.url
                    };
                    ios9Params = 'params=' + encodeURIComponent(this.getParamsStr(params));
                    schemeParams = 'url=' + aConfig.url;
                    break;
                case aPageType.doc:
                    var aNewsId = '';
                    aNewsId = config.callupid || config.docid + '-comos-news-cms';

                    params = {
                        id: aNewsId,
                        type: config.paramstype || ''
                    };
                    ios9Params = 'newsid=' + aNewsId;
                    schemeParams = 'params=' + this.getParamsStr(params);
                    break;
                default:
                    schemeParams = 'sina.cn';
                    break;
            }

            nativeUrl = schemeInfo.head + '://' + schemeParams;
            if (schemeInfo.ios9Https) {
                ios9Url = schemeInfo.ios9Https + '?' + (ios9Params ? ios9Params : schemeParams);
            }

            data = {
                iosNativeUrl: nativeUrl,
                androidNativeUrl: nativeUrl,
                ios9Url: ios9Url,
                weixn: schemeInfo.wxUrl
            };

            if (isGolink) {
                golink = config.golink;
                data.weixn = config.golink;
                if (data.ios9Url) {
                    data.ios9Url = schemeInfo.ios9Https
                        + '?golinkUrl='
                        + encodeURIComponent(golink)
                        + '&' + (ios9Params ? ios9Params : schemeParams);
                }
                data.ios9Weixin = data.ios9Url;
            }
            else {

                var aSinaHead = sinaHead;
                switch (schemeInfo.name) {
                    case aSinaHead.sports.type:
                        if (schemeInfo.downloadUrl) {
                            golink = data.weixn = schemeInfo.downloadUrl;
                            !config.weiboSlience && (config.weiboSlience = schemeInfo.downloadUrl);
                        }

                        break;
                    default:
                        isDownloadK && (golink = 'https://interface.sina.cn/wap_api/ls/jump_client.d.html?k=' + config.downloadk);
                        isKid && (golink = 'https://so.sina.cn/palmnews/?id=' + config.kid);
                        data.ios9Url && (data.ios9Weixin = schemeInfo.ios9Https
                            + '?golinkUrl=' + encodeURIComponent(data.weixn) + '&'
                            + (ios9Params ? ios9Params : schemeParams));
                        break;
                }
            }

            if (parseInt(config.downloadswitch, 10) < 1) {
                data.ios9Url && (data.ios9Url = schemeInfo.ios9Https
                    + '?golinkUrl=' + encodeURIComponent(golink) + '&downloadswitch=0'
                    + '&' + (ios9Params ? ios9Params : schemeParams));
            }

            jumpConfig = {
                iosNativeUrl: data.iosNativeUrl,
                androidNativeUrl: data.androidNativeUrl,
                downloadswitch: config.downloadswitch || '1',
                iosInstallUrl: golink,
                androidInstallUrl: golink,
                ios9Url: data.ios9Url,
                ios9Weixin: data.ios9Weixin,
                weiboSlience: config.weiboSlience,
                openByWeixin: data.weixn,
                isType: 'DOM',
                paramsK: aConfig,
                calluptype: config.calluptype,
                position: config.position,
                targetEl: config.targetEl
            };
            // callAppEvent.trigger('callapp_open_native', jumpConfig);
            goOpenNative(jumpConfig);
        },
        init: function () {

            var nativeAppBox = document.body.querySelectorAll('.' + this.domClass);
            var o = 0;
            var self = this;

            while (nativeAppBox && o < nativeAppBox.length) {
                var aItems = nativeAppBox.item(o);
                var aStatus = aItems.getAttribute('bind-target');
                var href = aItems.getAttribute('href');
                var pos = aItems.getAttribute('data-position');
                if (!aStatus) {
                    if (href && href.indexOf('javascript:') < 0) {
                        aItems.setAttribute('data-golink', href);
                        aItems.setAttribute('href', 'javascript:void(0);');
                        !pos && (aItems.setAttribute('data-position', '1'));
                    }

                    self.bindTarget(aItems);
                    aItems.setAttribute('bind-target', 'binded');
                }

                o++;
            }
        }
    };


    /**
     * 新闻客户端呼起，添加k统计信息
	*/
    var addStatisticsK = {
        config: {},
        weiboSlience: 'sinaweibo://appsdownload?APPID=84475',
        TYPE: {dom: 'DOM', push: 'PUSH', other: 'OTHER'},
        keyListOrder: ['media', 'domain', 'channel', 'type', 'position', 'timeStamp', 'url'],
        getURLParams: function () {
            var search = document.location.search;
            var isCUPos = search.indexOf('cu_pos') > -1;

            function getQueryString(name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                var r = window.location.search.substr(1).match(reg);
                var context = '';
                if (r !== null) {
                    context = r[2];
                }

                reg = null;
                r = null;
                return context === null || context === '' || context === 'undefined' ? '' : context;
            }

            if (isCUPos) {
                return {
                    domain: getQueryString('cu_domain'),
                    type: getQueryString('cu_type'),
                    channel: getQueryString('cu_channel') || getQueryString('cu_domain'),
                    position: getQueryString('cu_pos')
                };
            }

            return false;
        },
        getAutoParams: function () {
            var aFromUrlParams = this.getURLParams();
            var aKInfo = {
                media: 'sinawap',
                domain: document.domain.split('.')[0],
                channel: 'news',
                type: 'article',
                position: '0000',
                timeStamp: (new Date()).getTime(),
                url: window.location.href
            };
            if (aFromUrlParams) {
                aKInfo.domain = aFromUrlParams.domain || aKInfo.domain;
                aKInfo.channel = aFromUrlParams.channel || aKInfo.channel;
                aKInfo.type = aFromUrlParams.type || aKInfo.type;
                aKInfo.position = aFromUrlParams.position || aKInfo.pos;
            }
            return aKInfo;
        },
        getKInfo: function () {
            var aParams = this.config;
            var aConfig = this.config;
            var aFAuto = this.getAutoParams();
            var aFConfig = typeof aConfig.paramsK !== 'undefined' && aConfig.paramsK || '';

            aParams.media = (aFConfig && aFConfig.media) || aFAuto.media;
            aParams.domain = (aFConfig && aFConfig.domain) || aFAuto.domain;
            aParams.channel = (aFConfig && aFConfig.channel) || aFAuto.channel;
            aParams.type = (aFConfig && aFConfig.type) || aFAuto.type;
            aParams.position = (aFConfig && aFConfig.position) || aFAuto.position;
            aParams.timeStamp = (new Date()).getTime();
            aParams.url = (aFConfig && aFConfig.url) || aFAuto.url;

            return aParams;
        },
        getNativeUrl: function (aNativeUrl) {
            var self = this;
            var schemeHead = sinaHead.news.head + '://';
            var sportsHead = sinaHead.sports.head + '://';
            var ios9Head = isDebug ? 'langshou_api.dev.sina.cn/public/Callup.php' : 'sapi.sina.cn/Callup.php';
            var nativeUrl = aNativeUrl || '';
            var isSinanews = nativeUrl.indexOf(schemeHead) > -1 || nativeUrl.indexOf(ios9Head) > -1
                || nativeUrl.indexOf(sportsHead) > -1;
            var noParamK = !nativeUrl.match(/(sinanews:\/\/)(\S*)(k\=)(\S*)/)
                || !nativeUrl.match(/(sinasports:\/\/)(\S*)(k\=)(\S*)/)
                || !nativeUrl.match(/(api.sina.cn\/Callup.php)(\S*)(k\=)/);
            var hasParam = nativeUrl.length > schemeHead.length;
            var aKeyListOrder = self.keyListOrder;
            var aKeyInfo = self.getKInfo();
            var aKeyArr = [];
            var joinMark = '';

            if (isSinanews && noParamK) {
                var tmp = '';
                for (var o in aKeyListOrder) {
                    var name = aKeyListOrder[o];
                    tmp = aKeyInfo[name];
                    if (name === 'url') {
                        tmp = encodeURIComponent(aKeyInfo[name]);
                    }

                    if (name === 'position') {
                        tmp = (aKeyInfo.calluptype || '') + aKeyInfo.position;
                    }

                    aKeyArr.push(tmp);
                }
                if (hasParam) {
                    joinMark = '::';
                }

                nativeUrl += joinMark + 'k=' + aKeyArr.join('*');
            }

            return nativeUrl;
        },
        getUniqKey: function (key) {
            var code = ['A', 'z', 'C', 'E', 'd', 'H', 'j', 'v', 'k', 'L'];
            var timestamp = (new Date()).getTime();
            function getRandomCode() {
                var org = '' + (parseInt(Math.random() * 10000, 10));
                return [].map.call(org, function (item) {
                    return code[item];
                }).join('');
            }
            key = key || '';
            return key + getRandomCode() + timestamp;
        },
        getInstallUrl: function (aInstallUrl) {
            var aConfig = this.getAutoParams();
            var installUrl = aInstallUrl || '';

            if (!installUrl) {
                return installUrl;
            }

            if (installUrl.indexOf('?') <= -1) {
                installUrl += '?';
            }

            if (installUrl.indexOf('cu_pos=') <= -1) {
                installUrl += '&cu_pos=' + aConfig.position
                    + '&cu_domain=' + aConfig.domain + '&cu_type=' + aConfig.type;
            }

            return installUrl;
        },
        getAndroidInstallUrl: function (aInstallUrl, weiboUrl) {
            var self = this;
            var slienceUrl = weiboUrl || self.weiboSlience;
            var isWeibo = aUtils.isWeiboApp();
            var weiboVersion = parseInt(aUtils.getOsVersion(), 10);
            var isAndroid = aUtils.isAndroid();
            var isDefaultDownload
                = aInstallUrl.match(/jump_client.d.html|so.sina.cn\/palmnews|app\/download|app\_download/g);

            if (!!isDefaultDownload && isWeibo && isAndroid && weiboVersion >= 6) {
                return slienceUrl;
            }

            return self.getInstallUrl(aInstallUrl);
        },
        toAddNewsStaticParams: function (config) {
            var aConfig = config || {};
            var self = this;
            var isContainDownloadSwitch = aConfig.hasOwnProperty('downloadswitch');

            if (aConfig.iosNativeUrl === aConfig.androidNativeUrl) {
                aConfig.iosNativeUrl = aConfig.androidNativeUrl = self.getNativeUrl(aConfig.iosNativeUrl);
            }
            else {
                aConfig.iosNativeUrl = self.getNativeUrl(aConfig.iosNativeUrl);
                aConfig.androidNativeUrl = self.getNativeUrl(aConfig.androidNativeUrl);
            }

            if (isContainDownloadSwitch && parseInt(aConfig.downloadswitch, 10) || !isContainDownloadSwitch) {
                aConfig.iosInstallUrl = self.getInstallUrl(aConfig.iosInstallUrl);
                aConfig.androidInstallUrl = self.getAndroidInstallUrl(aConfig.androidInstallUrl, aConfig.weiboSlience);
                aConfig.ios9Url = self.getNativeUrl(aConfig.ios9Url);
                aConfig.ios9Weixin = self.getNativeUrl(aConfig.ios9Weixin);
            }
            else {
                aConfig.iosInstallUrl = aConfig.androidInstallUrl = '';
                if (aConfig.ios9Url && !aConfig.ios9Url.match(/downloadswitch=0/ig)) {
                    var connect = aConfig.ios9Url.match(/\?/ig) ? '&' : '?';
                    aConfig.ios9Url += connect + 'downloadswitch=0';
                }
            }

            return aConfig;
        },
        init: function (config) {
            var aConfig = config || {};
            var newsHead = sinaHead.news.head + '://';
            var sportsHead = sinaHead.sports.head + '://';
            var nativeUrl = aConfig.androidNativeUrl || aConfig.iosNativeUrl || '';
            var isSina = nativeUrl.indexOf(newsHead) > -1 || nativeUrl.indexOf(sportsHead) > -1;

            this.config = aConfig;
            if (isSina) {
                aConfig = this.toAddNewsStaticParams(aConfig);
            }

            return aConfig;
        }

    };

    function goOpenNative(config) {
        var aConfig = addStatisticsK.init(config) || {};
        callAppEvent.openApp(aConfig);
    }

    function init() {
        getClickTargetInfo.init();
    }
    init();
    return callAppEvent;
});

/**
 * 触发打开呼起浮层
 * callAppEvent.trigger('callapp_open_native',config);
 */
