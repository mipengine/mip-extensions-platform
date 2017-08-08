/**
 * @fileoverview suda_map统计
 * @author wangfeng@staff.sina.com.cn
 * @date 2014-09-22
 */

define(function () {

    var suda_pageId = 0,			//页面id
        suda_per = 100,				//抽样概率
        suda_addRequestTime = false,	//打开请求link时的当前时间
        suda_sessionId = "Apache",
        suda_domainRoot = "",
        suda_cookie_sessionId = "",
        suda_userId = "ustat",
        suda_statuId = "statuid",
        suda_cookie_userID = "",
        suda_cookie_statuId = '',
        suda_pageRef = document.referrer,	//当前的referer
        suda_pageUrl = document.URL,			//当前url
        prtl = 'https:' == window.location.protocol ? 'https://' : 'http://',
        domain = 'https:' == window.location.protocol ? 'sbeacon.sina.com.cn' : 'beacon.sina.com.cn',
        suda_mapAajx_url = prtl + domain + '/b.gif',
        suda_hash = '';


    if (suda_pageRef == "") {
        suda_pageRef = "newpage";
    }

    /*
     * url处理,去掉"#"
     */
    function getRealUrl(pUrl, changeHash) {

        var ps = 0;
        ps = pUrl.indexOf("#");
        if (ps > 0) {
            if (changeHash) suda_hash = pUrl.substring(ps);
            return pUrl.substring(0, ps);
        } else {
            if (changeHash) suda_hash = '';
            return pUrl;
        }
    }

    /*
     * 获取被点击元素的文本
     */
    function getText(pHtml) {
        var ps = 0;
        var pe = 0;
        var pstr = pHtml;
        while (1) {
            ps = pstr.indexOf("<");
            pe = pstr.indexOf(">", ps);
            if (ps >= 0 && pe >= 0 && pe > ps) {
                pstr = pstr.substring(0, ps) + pstr.substring(pe + 1, pstr.length);
            } else {
                break;
            }
        }
        return pstr;
    }

    /*
     * 获取域名
     */
    function getDomainRoot() {
        //已经保存直接返回
        if ("" != suda_domainRoot) return suda_domainRoot;

        var _suds_cmp_domainRoot = "";
        var _suds_cmp_pageUrl = suda_pageUrl.toLowerCase();

        var pe = _suds_cmp_pageUrl.indexOf("sina.");
        if (pe > 0) {
            //sina.cn
            _suds_cmp_domainRoot = "sina.cn";
        } else {
            //取第一个.和/之间的部分作为域名
            var ps = _suds_cmp_pageUrl.indexOf(".");
            if (ps > 0) {
                ps = ps + 1;
            } else {
                return "";
            }

            pe = _suds_cmp_pageUrl.indexOf("/", ps);
            if (pe < 0) {
                pe = _suds_cmp_pageUrl.length;
            }

            _suds_cmp_domainRoot = _suds_cmp_pageUrl.substring(ps, pe);
        }
        suda_domainRoot = _suds_cmp_domainRoot;
        return _suds_cmp_domainRoot;
    }

    /*
     * 获取cookie
     */
    function getCookie(ckName) {
        var start = document.cookie.indexOf(ckName + "=");
        if (-1 == start) {
            return "";
        }
        start = document.cookie.indexOf("=", start) + 1;
        var end = document.cookie.indexOf(";", start);
        if (0 >= end) {
            end = document.cookie.length;
        }
        ckValue = document.cookie.substring(start, end);
        return ckValue;
    }

    /*
     * 设置cookie，expires 是有效期
     */
    function setCookie(ckName, ckValue, expires) {
        if (ckValue != null) {
            _suds_cmp_domainRoot = getDomainRoot();
            if (("undefined" == expires) || (null == expires)) {
                document.cookie = ckName + "=" + ckValue + "; domain=" + _suds_cmp_domainRoot + "; path=/";
            }
            else {
                var now = new Date();
                var time = now.getTime();
                time = time + 86400000 * expires;
                now.setTime(time);
                time = now.getTime();
                document.cookie = ckName + "=" + ckValue + "; domain=" + _suds_cmp_domainRoot + "; expires=" + now.toUTCString() + "; path=/";
            }
        }
    }


    /*
     * 检查apache session_id
     */
    function checkSudsClickMapSessionId() {
        ckTmp = getCookie(suda_sessionId);
        if ("" == ckTmp) {
            var now = new Date();
            ckTmp = Math.random() * 10000000000000 + "." + now.getTime();
            setCookie(suda_sessionId, ckTmp);
        }
        return ckTmp;
    }

    /*
     * SUDA统计初始化
     */
    function sudaCountInit() {
        //随机数抽样
        var r_num = Math.floor(Math.random() * 100);

        //判断是否被抽中
        if (r_num < suda_per) {

            window.suda = true;

            //获取cookie信息
            if ("" == suda_cookie_sessionId) {
                suda_cookie_sessionId = checkSudsClickMapSessionId(suda_sessionId);
            }
            if ("" == suda_cookie_userID) {
                suda_cookie_userID = getCookie(suda_userId);
            }
            if ("" == suda_cookie_statuId) {
                suda_cookie_statuId = getCookie(suda_statuId);
            }


            try {
                //通过document 判断是否是IE
                //是IE
                if (!document.addEventListener) {
                    document.attachEvent("onclick", sudaClickMap);   //鼠标点击时触发此事件
                    window.attachEvent('onload', sudaFrameClick);		//为frame绑定事件
                }
                //非IE浏览器，火狐
                else {
                    document.addEventListener("click", sudaClickMap, false);
                    window.addEventListener('load', sudaFrameClick, false);
                }
            } catch (ex) {
            }

            suda_pageRef = escape(getRealUrl(window.document.referrer));
            suda_pageUrl = escape(getRealUrl(window.document.URL));

        } else {
            return 0;
        }
    }

    /*
     * 发送请求
     */
    function sudaSend(clickInfo, linkHref, aTargetType, SIMAconfig) {
        var uId = ''
        if (typeof sudaMapConfig.uId != 'undefined') {
            uId = sudaMapConfig.uId;
        }

        if (typeof sudaMapConfig.addRequestTime != 'undefined') {
            suda_addRequestTime = sudaMapConfig.addRequestTime;
        }

        strSudsClickMapQuest = suda_pageUrl + "|*|" + clickInfo + "|*|" + suda_cookie_sessionId + "|*|" + suda_cookie_userID + "|*|" + suda_pageRef + "|*|" + suda_pageId + "|*|" + uId + "|*|" + suda_cookie_statuId;

        var url = suda_mapAajx_url + "?" + strSudsClickMapQuest;
        var img = new Image();
        window.SUDAPIC = img;
        img.src = url;
        //发sima
        window.SIMA(SIMAconfig);

        //如果是A对象，那么重新启动跳转
        var tmpLink = linkHref.toLocaleLowerCase();
        if (linkHref && tmpLink.indexOf('javascript:') == -1) {
            setTimeout(function () {
                //为性能统计提供兼容,增加请求时间和用户标识（随机）
                if (suda_addRequestTime) {
                    var curTime = new Date().getTime(),
                        userId = 'user' + curTime + Math.random().toString().slice(2),
                        conn = (linkHref.indexOf('?') > -1) ? '&' : '?';
                    linkHref = linkHref + conn + 'clicktime=' + curTime + '&userid=' + userId;
                }
                console.log(linkHref, suda_hash)
                if (aTargetType == '_blank') {
                    var ua = window.navigator.userAgent.toLowerCase();

                    if (/ucbrowser/i.test(ua)) {

                        window.location.href = 'ext:wo:' + linkHref + suda_hash;
                    }
                    else if (/qqbrowser/i.test(ua)) {
                        window.location.href = linkHref + suda_hash;
                    }
                    else {
                        window.open(linkHref + suda_hash);
                    }

                } else {
                    window.location.href = linkHref + suda_hash;
                }
            }, 200)
        }
    }

    /*
     * 获取某类型的父对象
     */
    function getParentNode(o, name, max) {
        for (var i = 0; i < max; i++) {
            if (!o.parentNode || o == document) {
                return null;
            }
            o = o.parentNode;
            if (name == o.tagName) {
                break;
            }
        }
        if (i >= max) {
            return null;
        } else {
            return o;
        }
    }


    /*
     * 点击地图时执行
     */
    function sudaClickMap(e) {

        var e = e || event,
            o = e.srcElement || e.target;

        if (o == null && o == document) {
            return false;
        }

        var targetType = "",	//类型
            targetTitle = "",	//标题
            targetHref = "",	//链接
            currLinkObj = '',	//A对象
            aTargetType = '';	//A对象打开类型

        //判断对象类型，找到对象上级A对象。
        if ("A" == o.tagName) {

            //链接
            targetType = 'txt';
            targetTitle = getText(o.innerHTML);
            targetHref = getRealUrl(o.href, true);
            aTargetType = o.getAttribute("target");
            currLinkObj = o;

        } else if ("IMG" == o.tagName) {

            targetType = 'img';
            targetTitle = o.alt;
            //向上找链接
            var obj = getParentNode(o, 'A', 8);
            if (obj) {
                targetHref = getRealUrl(obj.href, true);
                aTargetType = obj.getAttribute("target");
                currLinkObj = obj;
            }
        } else {
            targetType = 'txt';
            targetTitle = getText(o.innerHTML);
            //向上找链接
            var obj = getParentNode(o, 'A', 8);
            if (obj) {
                targetHref = getRealUrl(obj.href, true);
                aTargetType = obj.getAttribute("target");
                currLinkObj = obj;
            }
        }


        var sudaName = '',
            type = o.tagName,		//当前对象类型
            index = '';
        var isNotMatch = false;

        try {
            for (i = 0; i < 10; i++) {
                //检查是否根节点
                if (o == document) {
                    break;
                }
                //检查是否存在统计标签
                var tag = o.getAttribute('data-sudaclick');

                if (tag) {
                    var targetTagName = o.getAttribute('data-sudatagname');
                    if (targetTagName) {
                        isNotMatch = true;
                        var targetTagNames = targetTagName.split(',');
                        targetTagNames.forEach(function (tagName) {
                            console.log(tagName.toUpperCase(), type)
                            if (tagName.toUpperCase() == type) {
                                isNotMatch = false;
                            }

                        })

                    }

                    sudaName = tag;
                    //计算当前对象的序列
                    var allObj = o.getElementsByTagName('A');
                    for (var n = 0; n < allObj.length; n++) {
                        if (allObj[n].innerHTML == currLinkObj.innerHTML) {
                            index = n;
                            break;
                        }
                    }
                    break;
                }
                if (!o.parentNode) {
                    break;
                } else {
                    o = o.parentNode;
                }
            }
        } catch (ex) {
        }
        if (isNotMatch) {
            return;
        }

        //是统计模块，发起请求
        if (sudaName) {
            if (targetHref) {
                e.preventDefault();	//先阻止默认
            }

            //针对长title的内容进行截断处理
            if (targetTitle && targetTitle.length > 30) {
                targetTitle = targetTitle.substr(0, 30);
            }

            var now = new Date();
            var currTime = now.getTime();
            var SIMAconfig = {
                "data": {
                    "index": index,
                    "aid": sudaName,
                    "url": targetHref
                },
                "action": '_click'
            }
            var clickInfo = "t=" + targetType + ",s=" + targetTitle + ",h=" + escape(targetHref) + ",ct=" + currTime + ",aid=" + sudaName + "-" + index + "|";
            sudaSend(clickInfo, targetHref, aTargetType, SIMAconfig);


        }

    }

    /*
     * 在frame中suda统计初始化
     */
    function sudaFrameClick() {
        sudaFrameClickWin(window);
    }

    /*
     * 递归绑定frame中的事件
     */
    function sudaFrameClickWin(win) {
        var frm = win.frames;
        for (var i = 0; i < frm.length; i++) {
            try {
                if (frm[i].location != "") {
                    if (frm[i].document != null) {
                        if (!document.addEventListener) {
                            frm[i].document.detachEvent("onclick", sudaClickMap);
                            frm[i].document.attachEvent("onclick", sudaClickMap);
                        } else {
                            frm[i].document.removeEventListener("click", sudaClickMap, false);
                            frm[i].document.addEventListener("click", sudaClickMap, false);
                        }
                        sudaFrameClickWin(frm[i]);
                    }
                }
            } catch (e) {
            }
        }
    }


    /*
     * SUDA公开的统计方法
     * suda统计初始化：pid：页面id;  per: 抽样率
     */
    window.suda_init = window.suds_init = function (pid, per) {
        var argsLen = arguments.length;
        if (argsLen > 0) {
            suda_pageId = pid;
            suda_per = per;
            if (typeof window.getUserInfo === 'function') {
                window.getUserInfo(function (re) {
                    if (re && re.uid) {
                        window.sudaMapConfig.uId = re.uid;
                    }
                    sudaCountInit();
                }, true);
            } else {
                sudaCountInit();
            }
        }
    }

    /*
     * SUDA公开的统计方法
     * suda统计初始化：pid：页面id;  per: 抽样率
     var	obj = {
     'name': sudaName,		// 不可省， 统计对象的名称
     'type': 'img/txt/btn',	// 可省， 统计对象的类型，目前只区分img、txt、btn三种
     'title': title,			// 可省， 统计对象的标题或摘要
     'index': index+1,		// 可省， 统计对象在整个区域中的索引。
     'href' : A链接地址
     }
     */
    window.suda_count = window.suds_count = function (obj) {
        if (!obj.name) {
            return false;
        }

        if (!obj.type) {
            obj.type = 'btn';
        }
        if (!obj.title) {
            obj.title = '';
        }
        if (!obj.index) {
            obj.index = 0;
        }
        if (!obj.href) {
            obj.href = '';
        }

        var targetHref = '',
            aTargetType = '',
            currTime = new Date().getTime(),
            clickInfo = "t=" + obj.type + ",s=" + obj.title + ",h=" + escape(obj.href) + ",ct=" + currTime + ",aid=" + obj.name + "-" + obj.index + "|";

        if (obj.target == undefined) {
            aTargetType = '';
        } else {
            aTargetType = obj.target;
        }

        sudaSend(clickInfo, targetHref, aTargetType);
    }

    function platform() {
        var ua = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(ua) ? "ios" : "android";
    }

    function getUid(fn) {
        if (window.checkLogin()) {
            window.getUserInfo(function (re) {
                fn && fn(re.uid || '');
            })

        }
        else {
            fn && fn('');
        }

    }

    function getRK() {
        var time = new Date().getTime();
        var random = Math.random();
        return "" + time + "_" + random;
    }

    function createRequest(url) {
        var img = new Image();
        img.src = url;
    }

    function getAccesstype() {
        return "";
    }

    function getUserId() {

        var guid, uid;
        if (typeof window.getCookie === 'function') {
            //alert(document.cookie)
            guid = getCookie(suda_userId) || '';

        }
        if (typeof window.userInfo === 'object') {
            uid = userInfo.uid || '';

        }
        return (uid || '') + ';' + (guid || '');

    }

    window.SIMA = function (option) {

        if (!option || !option.action || !option.data) {
            return;
        }

        var prtl = 'https:' == window.location.protocol ? 'https://' : 'http://';

        var domain = 'https:' == window.location.protocol ? 'sbeacon.sina.com.cn' : 'beacon.sina.com.cn';

        var mrt_gif = prtl + domain + '/mrt.gif?';

        var channel = window.location.href.match(/\w+\.sina\.cn/) || "";
        channel = channel ? channel[0].split('.')[0] : "";

        var method = option.action;
        switch (method) {
            case "_click" :
                var method = "CLICK";
                break;
            case "_exposure" :
            case "_loadmore" :
                var method = "SLIDE";
                break;
            default :
                var method = "";
                break;
        }
        for (i in option.data) {
            if (typeof option.data[i] == "string") {
                option.data[i] = option.data[i].replace(/(\n|\t)/ig, "");
            }
        }
        var os = platform(),
            rk = getRK(),
            accesstype = getAccesstype();
        if (!option.pk) {
            if (option.data.cre || option.data.mod) {
                option.pk = "187522";
            }
            else {
                option.pk = "187523";
            }
        }


        // console.log(json, JSON.stringify(json))
        getUid(function (uid) {
            option.data.uid = getUserId();
            var json = {

                "_pk": option.pk,
                "_src": "web",
                "_rk": rk,
                "_v": "1.0",
                "_cp": {
                    "os": os,
                    "uid": uid,
                    "accesstype": accesstype
                },
                "_ep": [{
                    "attribute": option.data,
                    "channel": channel ? ("wap_" + channel) : "",
                    "ek": option.action,
                    "ref": getRealUrl(window.document.referrer) || "",
                    "et": "custom",
                    "src": getRealUrl(window.location.href) || "",
                    "method": method,
                    "timestamp": new Date().getTime()

                }]
            }
            createRequest(mrt_gif + JSON.stringify(json));


        })

    }


});
