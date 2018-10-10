/**
* @file 脚本支持
* @author hejieye
* @time  2018-09-20
* @version 2.1.11
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var busUid = '';
    // var httpPath = 'https://mipp.iask.cn';
    var httpPath = 'https://m.iask.sina.com.cn';
    var fetchJsonp = require('fetch-jsonp');
    var utf8Encode = function (string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var utf8Decode = function (utftext) {
        var string = '';
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
    var Base64 = function () {
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        this.encode = function (input) {
            var output = '';
            var chr1;
            var chr2;
            var chr3;
            var enc1;
            var enc2;
            var enc3;
            var enc4;
            var i = 0;
            var input = utf8Encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            return output;
        };
        this.decode = function (input) {
            if (input.indexOf('appid') !== -1 || input.indexOf('smqid') !== -1 || input.indexOf('adList') !== -1) {
                return input;
            }
            var output = '';
            var chr1;
            var chr2;
            var chr3;
            var enc1;
            var enc2;
            var enc3;
            var enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
            while (i < input.length) {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = utf8Decode(output);
            return output;
        };
    };
    var encodeURIStr = function (str) {
        var result = encodeURIComponent(JSON.stringify(str));
        return result;
    };
    var loadStatsToken = function ($tokenDiv, token) {
        $tokenDiv.innerHTML = '<mip-stats-baidu token="' + token + '"></mip-stats-baidu>';
    };
    var ipLoad = function (callback) {
        var url = 'https://ipip.iask.cn/iplookup/search?format=json&callback=?';
        // var url = 'https://mipp.iask.cn/iplookup/search?format=json&ip=43.226.37.75&callback=?';
        try {
            $.getJSON(url, function (data) {
                callback(data);
            });
        }
      catch (e) {}
    };
    var hotRecommendUnLi = function (url, img, title, statsBaid, pos) {
        var htmls = '';
        if (pos === '') {
            htmls += '<div href=' + url + ' target=\'_blank\' class=\'href_log\'' + statsBaid + '>';
        }
        else {
            htmls += '<div href=' + url + ' target=\'_blank\' pos="' + pos + '" class=\'href_log\'' + statsBaid + '>';
        }
        htmls += '<mip-img class=\'mip-img\' src=' + img + '>';
        htmls += '<p class=\'mip-img-subtitle\'>' + title + '</p>';
        htmls += '</mip-img>';
        htmls += '</div>';
        return htmls;
    };
    var hotRecommend = function (url, img, title, statsBaid, pos) {
        var htmls = '';
        htmls += '<li>';
        if (pos === '') {
            htmls += '<div href=' + url + ' target=\'_blank\' class=\'href_log\'' + statsBaid + '>';
        }
        else {
            htmls += '<div href=' + url + ' target=\'_blank\' pos="' + pos + '" class=\'href_log\'' + statsBaid + '>';
        }
        htmls += '<mip-img class=\'mip-img\' src=' + img + '>';
        htmls += '<p class=\'mip-img-subtitle\'>' + title + '</p>';
        htmls += '</mip-img>';
        htmls += '</div></li>';
        return htmls;
    };
    var hotSpotUnLi = function (url, title) {
        var htmls = '';
        htmls += '<a href=' + url + ' target=\'_blank\' class=\'href_log\'>' + title + '</a>';
        return htmls;
    };
    var getChannel = function (ele) {
        var list = {};
        var $that = ele.querySelectorAll('.channel_source li');
        if ($that.length > 0) {
            for (var i = 0; i < $that.length; i ++) {
                var txt = $that[i].getAttribute('txt');
                var val = $that[i].getAttribute('val');
                list[txt] = val;
            }
        }
        return list;
    };
    var getUserId = function (source, uid, adOwnerId) {
        if (source === '202' || source === '500' || source === '501'
        || source === '600' || source === '700' || source === '800') {
            return uid;
        }
        else if (source === '1000' || source === '101') {
            return adOwnerId;
        }
        return '';
    };
    var getSysTime = function () {
        var mydate = new Date();
        var month = mydate.getMonth() + 1;
        var day = mydate.getDate();
        var hours = mydate.getHours();
        var minutes = mydate.getMinutes();
        var seconds = mydate.getSeconds();
        return mydate.getFullYear() + '-' + (month < 10 ? '0' + month : month)
        + '-' + (day < 10 ? '0' + day : day) + ' ' + (hours < 10 ? '0' + hours : hours)
        + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    };
    var removeClass = function (obj, cls) {
        var objClass = ' ' + obj.className + ' ';
        objClass = objClass.replace(/(\s+)/gi, ' ');
        var removed = objClass.replace(' ' + cls +  ' ', ' ');
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');
        obj.className = removed;
    };
    var addClass = function (obj, cls) {
        var objClass = ' ' + obj.className + ' ';
        var add = objClass + ' ' + cls;
        obj.className = add;
    };
    var advLogInfo = function (ele, sourceType, mode) {
        var $that = ele.querySelector('.paramDiv');
        var qid = $that.getAttribute('qid') || '';
        var materialTag = $that.getAttribute('mainTags') || '';
        var ip = '';
        var province = '';
        var city = '';
        var qcid = $that.getAttribute('qcid') || '';
        var cid = $that.getAttribute('cid') || '';
        var uid = $that.getAttribute('uid') || '';
        var adOwnerId = $that.getAttribute('adOwnerId') || '';
        var source = getChannel(ele)[sourceType] || 999;
        uid = getUserId(source, uid, adOwnerId) || busUid;
        var pos = $that.getAttribute('pos') || '';
        var pv = '';
        if (pos === undefined || pos === 'undefined') {
            pos = '';
        }
        // uid = '';
        ipLoad(function (data) {
            ip = data.ip || '';
            province = data.province || '';
            city = data.city || '';
            if (!!materialTag) {
                materialTag = materialTag.replace('[', '').replace(']', '');
            }
            pv = encodeURI('pv=' + mode + '_' + qid + '_' + ip + '_' + province + '_' + city + '_' + materialTag
            + '_' + qcid + '_' + cid + '_' + source + '_' + uid + '_' + pos);
            var url = httpPath + '/advLogInfo?' + pv;
            $.get(url);
        });
    };
    var advLogInfoClick = function (ele, clazz, $that, newSource) {
        $(clazz).on('click', function () {
            var pos = $(this).attr('pos');
            var url = $(this).attr('href');
            openURL(ele, pos, url, $that, newSource);
        });
    };
    function openURL(ele, pos, url, $that, newSource) {
        var sources = $that.getAttribute('sources');
        var sysource = $that.getAttribute('sysources');
        if (sysource === 'COMMERCIAL_ZWZD') {
            sysource = 'COOPERATE_COMMERCIAL';
        }
        if (newSource !== '' && newSource !== undefined) {
            sources = newSource;
        }
        $that.setAttribute('pos', pos);
        advLogInfo(ele, sources, 1);
        openWindowUrl(ele, url);
    }
    function openWindowUrl(ele, url) {
        var $that = ele.querySelectorAll('.camnpr');
        if ($that.length > 0) {
            for (var i = 0; i < $that.length; i++) {
                var t = $that[i];
                t.parentNode.removeChild(t);
            }
        }
        var a = ele.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.setAttribute('class', 'camnpr');
        ele.body.appendChild(a);
        a.click();
    }
    var subStringIask = function (str, size) {
        if (!str) {
            return '';
        }
        if (str.length > size) {
            return str.substring(0, size) + '...';
        }
        return str;
    };
 // 动态添加 mip-fixed悬浮广告
    var putMXfAd = function (picLink, picLocal, statsBaidu, pos) {
        var htmls = '';
        htmls += '<mip-fixed type=\'top\' id=\'customid\' >';
        htmls += '<div class=\'mip-adbd\'>';
        htmls += '<div on=\'tap:customid.close\' class=\'mip-adbd-close\'><span>关闭</span></div>';
        if (pos === '') {
            htmls += '<div href=' + picLink + ' class=\'href_log\' ' + statsBaidu + '>';
        }
        else {
            htmls += '<div href=' + picLink + ' pos="' + pos + '" class=\'href_log\'' + statsBaidu + '>';
        }
        htmls += '<mip-img class=\'mip-img bottom-img\' src=' + picLocal + '></mip-img>';
        htmls += '</div>';
        htmls += '<span class=\'icon-bai-bottom\'></span>';
        htmls += '</div></mip-fixed>';
        return htmls;
    };
    // 顶部悬浮广告-拨打电话
    var putMXfAdTel = function (picLink, picLocal, statsBaidu, pos) {
        var htmls = '';
        htmls += '<mip-fixed type=\'top\' id=\'customid\' >';
        htmls += '<div class=\'mip-adbd\'>';
        htmls += '<div on=\'tap:customid.close\' class=\'mip-adbd-close\'><span>关闭</span></div>';
        if (pos === '') {
            htmls += '<a href="tel:' + picLink + '"  ' + statsBaidu + '>';
        }
        else {
            htmls += '<a href="tel:' + picLink + '" pos="' + pos + '" ' + statsBaidu + '>';
        }
        htmls += '<mip-img class=\'mip-img bottom-img\' src=' + picLocal + '></mip-img>';
        htmls += '</a>';
        htmls += '<span class=\'icon-bai-bottom\'></span>';
        htmls += '</div></mip-fixed>';
        return htmls;
    };
    // 企业信息广告
    var putQiyeInfo = function (ele, companyName, drName, website, picLocal, statsBaidu, pos, newSource) {
        var $thatQS = ele.querySelectorAll('.qs_bar');
        var $thatDiv = ele.querySelectorAll('.mip_as_other_qiye_div');
        if (companyName.length > 9) {
            companyName = companyName.substring(0, 9);
        }
        if (drName !== null && drName.length > 15) {
            drName = drName.substring(0, 15);
        }
        var htmls = '<div class=\'firms-con href_log\' href=' + website + ' ' + statsBaidu + ' pos="' + pos + '">';
        htmls += '<div class=\'firms-pic\'>';
        htmls += '<mip-img class=\'mip-img\' src=' + picLocal + '></mip-img>';
        htmls += '<span class=\'icon-v\'></span>';
        htmls += '</div>';
        htmls += '<div class=\'firms-text\'>';
        htmls += '<p><span class=\'name\'>' + companyName + '</span>';
        htmls += '<span class=\'time\'> 1小时前</span><span class=\'icon-tui\'>广告</span></p>';
        htmls += '<p>' + drName + '</p>';
        htmls += '</div>';
        htmls += '<span class=\'btn-ask \' >咨询专家</span>';
        htmls += '</div>';
        htmls += '</div>';
        try {
            var $thatQSHLog = ele.querySelectorAll('.qs_bar .href_log');
            var $thatDivHLog = ele.querySelectorAll('.mip_as_other_qiye_div .href_log');
            if ($thatQS.length >= 1 && $thatQSHLog.length === 0) {
                $thatQS[0].innerHTML = htmls;
            }
            else if ($thatQS.length > 1 && $thatQSHLog.length > 0) {
                $thatQS[1].innerHTML = htmls;
            }
            else if ($thatDiv.length >= 1 && $thatDivHLog.length === 0) {
                $thatDiv[0].innerHTML = htmls;
            }
            else if ($thatDiv.length >= 1 && $thatQSHLog.length > 0) {
                $thatDiv[0].innerHTML = htmls;
            }
            else {
                $thatDiv[1].innerHTML = htmls;
            }
            $('.qs_bar .href_log').unbind();
            $('.mip_as_other_qiye_div .href_log').unbind();
            advLogInfoClick(ele, '.qs_bar .href_log', ele.querySelector('.paramDiv'), newSource);
            advLogInfoClick(ele, '.mip_as_other_qiye_div .href_log', ele.querySelector('.paramDiv'), newSource);
        } catch (e) {
            console.log(e);
        }
    };
    // 品牌企业信息广告
    var putBrandQiyeInfo = function (ele, companyName, drName, website, picLocal, statsBaidu, pos, brandLink) {
        var $thatQS = ele.querySelectorAll('.qs_bar');
        var $thatDiv = ele.querySelectorAll('.mip_as_other_qiye_div');
        if (companyName.length > 9) {
            companyName = companyName.substring(0, 9);
        }
        var htmls = '<div class=\'firms-con\' >';
        htmls += '<div class=\'firms-pic\' ><a href=' + brandLink + '>';
        htmls += '<mip-img class=\'mip-img\' src=' + picLocal + '></mip-img>';
        htmls += '<span class=\'icon-v\'></span>';
        htmls += '</a></div>';
        htmls += '<div class=\'firms-text\'>';
        htmls += '<p><a href=' + brandLink + '><span class=\'name \'>' + companyName + '</span></a>';
        htmls += '<span class=\'time\'> 1小时前</span><span class=\'icon-tui\'>广告</span></p>';
        htmls += '<p class=\' href_log\' href=' + website + ' ' + statsBaidu + ' pos="' + pos + '">' + drName + '</p>';
        htmls += '</div>';
        htmls += '<span class=\'btn-ask href_log\'';
        htmls += 'href=' + website + ' ' + statsBaidu + ' pos="' + pos + '">咨询专家</span>';
        htmls += '</div>';
        htmls += '</div>';
        if ($thatQS.length > 0) {
            $thatQS[0].innerHTML = htmls;
            advLogInfoClick(ele, '.qs_bar .href_log', ele.querySelector('.paramDiv'), '');
        }
        else if ($thatDiv.length > 0) {
            $thatDiv[0].innerHTML = htmls;
            advLogInfoClick(ele, '.mip_as_other_qiye_div .href_log', ele.querySelector('.paramDiv'), '');
        }
    };
    // 保险企业信息广告
    var putBaoXiangQiyeInfo = function (ele, picLink, picLocal, statsBaidu, pos) {
        var $thatQS = ele.querySelectorAll('.qs_bar');
        var $thatDiv = ele.querySelectorAll('.mip_as_other_qiye_div');
        var htmls = '';
        if (pos === '') {
            htmls += '<a href="tel:' + picLink + '"  ' + statsBaidu + '>';
        }
        else {
            htmls += '<a href="tel:' + picLink + '" pos="' + pos + '" ' + statsBaidu + '>';
        }
        htmls += '<mip-img class=\'mip-img baoxiang-img\' src=' + picLocal + '></mip-img>';
        htmls += '</a>';
        try {
            if ($thatQS.length > 0) {
                $thatQS[0].innerHTML = htmls;
            }
            else if ($thatDiv.length > 0) {
                $thatDiv[0].innerHTML = htmls;
            }
            advLogInfoClick(ele, '.mip_as_other_qiye_div .href_log', ele.querySelector('.paramDiv'), '');
        } catch (e) {
            console.log(e);
        }
    };
    var feedInfo = function (ele, statsBaidu, userImg, useName, shortIntroduce,
     materialIntroduce, materialLink, picList, pos) {
        var $that = ele.querySelector('.youlai_feed_div');
        var $thatLink = ele.querySelector('.youlai_feed_div span');
        var $thatFeed = ele.querySelectorAll('.youlai_feed_div .youlai_feed');
        var objPicUrl = '<mip-img class="mip-img" src="' + userImg + '"></mip-img>';
        ele.querySelector('.youlai_feed_div .youlai_feed_title').innerHTML = materialIntroduce;
        ele.querySelector('.youlai_feed_div .youlai_feed_use_img').innerHTML = objPicUrl;
        ele.querySelector('.youlai_feed_div .youlai_feed_use_name').innerHTML = useName;
        ele.querySelector('.youlai_feed_div .youlai_feed_txt').innerHTML = shortIntroduce;
        $thatLink.setAttribute('pos', pos);
        $thatLink.setAttribute('href', materialLink);
        $thatLink.setAttribute('class', 'href_log');
        $thatLink.setAttribute('data-stats-baidu-obj', statsBaidu);
        if ($thatFeed.length > 0) {
            for (var i = 0; i < $thatFeed.length; i++) {
                $thatFeed[i].innerHTML = '<mip-img class="mip-img" src="' + picList[i] + '"></mip-img>';
            }
        }
        addClass($that, 'show');
        advLogInfoClick(ele, '.youlai_feed_div .href_log', ele.querySelector('.paramDiv'), '');
    };
    // 商业广告
    var busBottomAM = function (ele, $tokenDiv, token) {
        var $thatBottomDiv = ele.querySelector('.mip_as_bottm_div');
        var $thatBottom = ele.querySelectorAll('.bus_bottom_div div');
        var $thatHot = ele.querySelectorAll('.bus_hot_recommend_div div');
        var $thatRecomd = ele.querySelector('.hot_recomd_div');
        var $thatHotSpot = ele.querySelectorAll('.bus_hot_spot div');
        if ($thatBottom.length > 0) {
            for (var i = 0; i < $thatBottom.length; i++) {
                var area = $thatBottom[i].getAttribute('area');
                var imgurl = $thatBottom[i].getAttribute('imgurl');
                var picurl = $thatBottom[i].getAttribute('picurl');
                busUid = $thatBottom[i].getAttribute('uid');
                if (area === '') {
                    $thatBottomDiv.innerHTML = putMXfAd(imgurl, picurl, '', '');
                    advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
                }
                else {
                    ipLoad(function (data) {
                        if (area.indexOf(data.province) > -1) {
                            $thatBottomDiv.innerHTML = putMXfAd(imgurl, picurl, '', '');
                            advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
                        }
                    });
                }
            }
        }
        if ($thatHot.length > 0) {
            for (var i = 0; i < $thatHot.length; i ++) {
                var area = $thatHot[i].getAttribute('area');
                var url = $thatHot[i].getAttribute('texturl');
                var img = $thatHot[i].getAttribute('img');
                var title = $thatHot[i].getAttribute('imgtitle');
                busUid = $thatHot[i].getAttribute('uid');
                if (area === '') {
                    var str = hotRecommendUnLi(url, img, title, '', '');
                    var liDom = ele.createElement('li');
                    liDom.innerHTML = str;
                    ele.querySelector('.hot-tui-list').appendChild(liDom);
                }
                else {
                    ipLoad(function (data) {
                        var str = hotRecommendUnLi(url, img, title, '', '');
                        var liDom = ele.createElement('li');
                        liDom.innerHTML = str;
                        ele.querySelector('.hot-tui-list').appendChild(liDom);
                    });
                }
            }
            addClass($thatRecomd, 'show');
            advLogInfoClick(ele, '.hot_recomd_div .href_log', ele.querySelector('.paramDiv'), '');
        }
        if ($thatHotSpot.length > 0) {
            for (var i = 0; i < $thatHotSpot.length; i++) {
                var area = $thatHotSpot[i].getAttribute('area');
                var url = $thatHotSpot[i].getAttribute('texturl');
                var title = $thatHotSpot[i].getAttribute('imgtitle');
                busUid = $thatHotSpot[i].getAttribute('uid');
                if (area === '') {
                    var str = hotSpotUnLi(url, title);
                    var liDom = ele.createElement('li');
                    liDom.innerHTML = str;
                    ele.querySelector('.hot-point-list').appendChild(liDom);
                }
                else {
                    ipLoad(function (data) {
                        var str = hotSpotUnLi(url, title);
                        var liDom = ele.createElement('li');
                        liDom.innerHTML = str;
                        ele.querySelector('.hot-point-list').appendChild(liDom);
                    });
                }
            }
            advLogInfoClick(ele, '.hot-point-list .href_log', ele.querySelector('.paramDiv'), '');
        }
        loadStatsToken($tokenDiv, token);
    };
    var validatePut = function (ele) {
        var $that = ele.querySelectorAll('.paramDiv')[0];
        var mmaintags = $that.getAttribute('mainTags');
        var qcid = $that.getAttribute('qcid') || '';
        var sources = $that.getAttribute('sources');
        var version = $that.getAttribute('version');
        var iscommercial = $that.getAttribute('iscommercial');
        if ('COOPERATE_BRAND' === sources && version === '2') {
            return false;
        }
        if (iscommercial === 'true' && sources !== 'COOPERATE_COMMERCIAL') {    // 过滤掉第三合作广告
            return false;
        }
        if (qcid === '82' && (mmaintags.indexOf('财务税务') !== -1 || mmaintags.indexOf('商业工具') !== -1)) {
            return true;
        }
        return false;
    };
    var putTestButHtml = function (putUrl, picUrl) {
        var statsBaidu = 'data-stats-baidu-obj="%20%7B%22type%22:%22click%22,'
        + '%22data%22:%22%5B\'_setCustomVar\',%20\'100m,%20\'0\',%20\'8002m\'%5D%22%7D"';
        return putMXfAd(putUrl, picUrl, statsBaidu, '');
    };
    // 移除百度广告
    var removeBaiduAd = function (ele) {
        var $that = ele.querySelectorAll('.mip_baidu_sy');
        if ($that.length > 0) {
            for (var i = 0; i < $that.length; i++) {
                var t = $that[i];
                t.parentNode.removeChild(t);
            }
        }
    };
    var removeInfo = function (ele) {
        var $that = ele.querySelectorAll('.info-flow-json');
        if ($that.length > 0) {
            for (var i = 0; i < $that.length; i++) {
                var t = $that[i];
                t.parentNode.removeChild(t);
            }
        }
    };
    var hexToDec = function (str) {
        try {
            if (str.indexOf('\\u') !== -1) {
                str = str.replace(/\\/g, '%');
                return unescape(str);
            }
            return str;
        }
        catch (e) {
            return str;
        }
    };
    var youLai = function (ele, data) {
        var $thatDiv = ele.querySelector('.mip_as_bottm_div');
        var $thatHotList = ele.querySelector('.hot-tui-list');
        var $thatHotDiv = ele.querySelector('.hot_recomd_div');
        var $tokenDiv = ele.querySelector('.mip-stats-token-div');
        var token = ele.querySelector('.mip-token-value').innerHTML;
        var json = data.adList;
        var baiduStr = '';
        var baiduObj = '';
        for (var key in json) {
            if (json[key].type === '4') {
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1000', 'skip', 'MIP_SY_1000_top']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                $thatDiv.innerHTML = putMXfAd(json[key].picLink, json[key].picUrl, baiduObj, '1');
                advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
            }
            else if (json[key].type === '3') {  // 企业信息
                var obj = json[key];
                var companyName = obj.companyName;
                var drName   = obj.drName;
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1000', 'skip', 'MIP_SY_1000_qy']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                putQiyeInfo(ele, drName, companyName, data.website, obj.picUrl, baiduObj, '2');
            }
            else if (json[key].type === '5') {
                var obj2 = {};
                for (var k in json) {
                    if (json[k].type === '3') {
                        obj2 = json[k];
                    }
                }
                var obj = json[key];
                var picList = obj.picList;
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1000', 'skip', 'MIP_SY_1000_feed']};
                baiduObj = encodeURIStr(baiduStr);
                feedInfo(ele, baiduObj, obj2.picUrl, obj2.companyName, obj.describe, obj.title,
                 obj.picLink, picList, '3');
            }
            else if (json[key].type === '6') {
                var obj = json[key];
                var picList = obj.adDetailList;
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1000', 'skip', 'MIP_SY_1000_mpic']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                var str = '';
                for (var pic in picList) {
                    var picLink = obj.picLink;
                    var picUrl = picList[pic].picUrl;
                    var describe = picList[pic].describe;
                    str += hotRecommend(picLink, picUrl, describe, baiduObj, '4');
                }
                $thatHotList.innerHTML = str;
                addClass($thatHotDiv, 'show');
                advLogInfoClick(ele, '.hot-tui-list .href_log', ele.querySelector('.paramDiv'), '');
            }
        }
        loadStatsToken($tokenDiv, token);
    };
    var soulew = function (ele, data, cn) {
        var $thatDiv = ele.querySelector('.mip_as_bottm_div');
        var $thatHotList = ele.querySelector('.hot-tui-list');
        var $thatHotDiv = ele.querySelector('.hot_recomd_div');
        var $tokenDiv = ele.querySelector('.mip-stats-token-div');
        var token = ele.querySelector('.mip-token-value').innerHTML;
        var json = data.adList;
        var bStr = '';
        var baiduObj = '';
        for (var key in json) {
            if (json[key].type === '4') {
                bStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_' + cn, 'skip', 'MIP_SY_' + cn + '_all']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(bStr) + '"';
                $thatDiv.innerHTML = putMXfAd(json[key].picLink, json[key].picUrl, baiduObj, '');
                advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
            }
            else if (json[key].type === '3') {  // 企业信息
                var obj = json[key];
                var companyName = obj.companyName;
                var drName   = obj.drName;
                bStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_' + cn, 'skip', 'MIP_SY_' + cn + '_all']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(bStr) + '"';
                putQiyeInfo(ele, drName, companyName, data.website, obj.picUrl, baiduObj, '');
            }
            else if (json[key].type === '5') {
                var obj2 = {};
                for (var k in json) {
                    if (json[k].type === '3') {
                        obj2 = json[k];
                    }
                }
                var obj = json[key];
                var picList = obj.picList;
                bStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_' + cn, 'skip', 'MIP_SY_' + cn + '_all']};
                baiduObj = encodeURIStr(bStr);
                feedInfo(ele, baiduObj, obj2.picUrl, obj.companyName, obj.describe,
                obj.title, obj.picLink, picList, '');
            }
            else if (json[key].type === '6') {
                var obj = json[key];
                var picList = obj.adDetailList;
                bStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_' + cn, 'skip', 'MIP_SY_' + cn + '_all']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(bStr) + '"';
                var str = '';
                for (var pic in picList) {
                    var picLink = obj.picLink;
                    var picUrl = picList[pic].picUrl;
                    var describe = picList[pic].describe;
                    str += hotRecommend(picLink, picUrl, describe, baiduObj, '');
                }
                $thatHotList.innerHTML = str;
                addClass($thatHotDiv, 'show');
                advLogInfoClick(ele, '.hot-tui-list .href_log', ele.querySelector('.paramDiv'), '');
            }
        }
        loadStatsToken($tokenDiv, token);
    };
    var brandMedical = function (ele, data) { // 品牌医疗
        var json = data.adList;
        var qiyeData = null;
        var $thatDiv = ele.querySelector('.mip_as_bottm_div');
        var $thatHotList = ele.querySelector('.hot-tui-list');
        var $thatHotDiv = ele.querySelector('.hot_recomd_div');
        var $tokenDiv = ele.querySelector('.mip-stats-token-div');
        var token = ele.querySelector('.mip-token-value').innerHTML;
        var tempStr = '';
        var statsBaidu = '';
        for (var k in json) {
            if (json[k].adType === 3) {
                qiyeData = json[k];
            }
        }
        for (var key in json) {
            if (json[key].adType === 1) {
                tempStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_800_yl', 'skip', 'MIP_SY_800_yl']};
                statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
                $thatDiv.innerHTML = putMXfAd(json[key].materialLink, json[key].materialImg, statsBaidu, '');
                advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
            }
            else if (json[key].adType === 3) {
                var obj = qiyeData;
                var companyName = obj.shortIntroduce;
                var drName   = obj.brandName;
                tempStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_800_yl', 'skip', 'MIP_SY_800_yl']};
                statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
                putQiyeInfo(ele, drName, companyName, obj.materialLink, obj.materialImg, statsBaidu, '');
            }
            else if (json[key].adType === 5) {
                var obj = json[key];
                var picList = new Array(0);
                var materImg = obj.materialImg.split(',');
                for (var k in materImg) {
                    picList.push(materImg[k]);
                }
                tempStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_800_yl', 'skip', 'MIP_SY_800_yl']};
                statsBaidu = encodeURIStr(tempStr);
                feedInfo(ele, statsBaidu, qiyeData.materialImg, qiyeData.brandName,
                 obj.materialIntroduce, obj.shortIntroduce, obj.materialLink, picList, '');
            }
            else if (json[key].adType === 6) {
                var obj = json[key];
                tempStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_800_yl', 'skip', 'MIP_SY_800_yl']};
                statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
                var arrayPic = new Array(0);
                var arrayDesc = new Array(0);
                var materImg = obj.materialImg.split(',');
                var materDesc = obj.materialIntroduce.split('|');
                for (var index in materImg) {
                    arrayPic.push(materImg[index]);
                    arrayDesc.push(materDesc[index]);
                }
                var str = '';
                for (var pic in arrayPic) {
                    var picLink = obj.materialLink;
                    var picUrl = arrayPic[pic];
                    var describe = arrayDesc[pic];
                    str += hotRecommend(picLink, picUrl, describe, statsBaidu, '');
                }
                $thatHotList.innerHTML = str;
                removeClass($thatHotDiv, 'mask');
                advLogInfoClick(ele, '.hot-tui-list .href_log', ele.querySelector('.paramDiv'), '');
            }
        }
        loadStatsToken($tokenDiv, token);
    };
    var tianZhu = function (ele, data) {
        var $thatDiv = ele.querySelector('.mip_as_bottm_div');
        var $tokenDiv = ele.querySelector('.mip-stats-token-div');
        var token = ele.querySelector('.mip-token-value').innerHTML;
        var tempStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_300', 'skip', 'MIP_SY_300_all']};
        var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
        $thatDiv.innerHTML = putMXfAd(data.pics[3].picLink, data.pics[3].picLocal, statsBaidu, '');
        advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
        loadStatsToken($tokenDiv, token);
    };
    // 商业广告标准版企业信息
    var commercialSqc  = function (ele, divData, commercialStandardHover) {
        var $thatDiv = ele.querySelector('.mip_as_bottm_div');
        var tempStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_600', 'skip', 'MIP_SY_600_bz']};
        var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
        var imgsrc = divData.getAttribute('imgsrc');
        var brandname = divData.getAttribute('brandname');
        var link = divData.getAttribute('link');
        var introduce = divData.getAttribute('introduce');
        var uid =  divData.getAttribute('uid');
        var brandLink = httpPath + '/brand/' + uid + '.html';
        putBrandQiyeInfo(ele, brandname, introduce, link, imgsrc, statsBaidu, '', brandLink);
        var tImgSrc = commercialStandardHover.getAttribute('imgsrc');
        var tLink = commercialStandardHover.getAttribute('link');
        var baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_600', 'skip', 'MIP_SY_600_bz']};
        var baiduTop = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
        $thatDiv.innerHTML = putMXfAd(tLink, tImgSrc, baiduTop, '');
    };
    var loadAd = function (ele, sources, openId, questionId, version) {
        var type = '';
        if (sources === 'COOPERATE_HUASHENG') {
            type = 'HS';
        }
        else if (sources === 'COOPERATE_HUASHENG_QA') {
            type = 'HSQA';
        }
        else if (sources === 'COOPERATE_YOULAI') {
            type = 'YL';
        }
        else if (sources === 'COOPERATE_TIANZHU') {
            type = 'TZ';
        }
        else if (sources === 'COOPERATE_BRAND_MARKET' && version === '4') {
            type = 'PPYL';
        }
        else if (sources === 'COOPERATE_SOULE') {
            type = 'SLW';
        }
        else if (sources === 'COOPERATE_HUAXIN') {
            type = 'HX';
        }
        else if (type === '') {
            return;
        }
        var url = httpPath + '/t/wlsh?openCorporationId=' + openId + '&type=' + type;
        url += '&questionId=' + questionId + '&version=' + version;
        $.get(url,
        function (data) {
            var base = new Base64();
            var res = $.parseJSON(data);
            if (res.succ === 'Y') {
                var json = $.parseJSON(base.decode(res.html));
                var htmls = '';
                if (type === 'YL') {
                    youLai(ele, json);
                    return;
                }
                if (type === 'TZ') {
                    tianZhu(ele, json);
                    return;
                }
                if (type === 'PPYL') {
                    brandMedical(ele, json);
                    return;
                }
                if (type === 'SLW') {
                    soulew(ele, json, 101);
                    return;
                };
                if (type === 'HX') {
                    soulew(ele, json, 102);
                    return;
                };
                var pic = json.pics[3] || '';
                htmls = putMXfAd(pic.picLink, pic.picLocal, '');
                var companyName = json.companyName || '';
                var drName = json.drName || '';
                var website = json.website || '';
                var pic = json.pics[0] || '';
                putQiyeInfo(ele, companyName, drName, website, pic.picLocal, '', '');
                var $that = ele.querySelector('.mip_as_bottm_div');
                $that.innerHTML = htmls;
                advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
                var $tokenDiv = ele.querySelector('.mip-stats-token-div');
                var token = ele.querySelector('.mip-token-value').innerHTML;
                loadStatsToken($tokenDiv, token);
            }
        });
    };
    var loadInit = function (options) {
        var defaults = {
            province: '',
            lenGood: 0,
            lenother: 0,
            commercialSource: '',
            qSourceType: ''
        };
        var opts = $.extend(defaults, options);
        return opts;
    };
    var loadData = function (options, cmJsonData) {
        if (options.commercialSource === 'COMMERCIAL_ZWZD' || options.qSourceType === 'COOPERATE_SOUTHNETWORK'
        || options.qSourceType === 'COOPERATE_HUASHENG'
        || options.qSourceType === 'COOPERATE_HUASHENG_QA') {
            return null;
        }
        var array = new Array(0);
        $.each(cmJsonData,
        function (index) {
            try {
                var val = cmJsonData[index];
                var qTags = val.qTags;
                var mainTags = val.mainTags;
                var startTime = val.startTime;
                var endTime = val.endTime;
                var province = '不限';
                var nprovince = '不限';
                var city = '不限';
                var ncity = '不限';
                var isDeliveryArea = val.isDeliveryArea;
                var provinceCode = val.provinceCode;
                var cityCode = val.cityCode;
                if (!!val.city) {
                    city = val.city;
                }
                if (!!val.ncity) {
                    ncity = val.ncity;
                }
                if (!!val.province) {
                    province = val.province;
                }
                if (!!val.nprovince) {
                    nprovince = val.nprovince;
                }
                if (options.qCid === '79' || options.bCid === '147') {
                    if (checkTime(options.nowTime, startTime, endTime)
                     && checkTag(options.qTags, qTags, options.mainTags, hexToDec(mainTags))) {
                        if (isDeliveryArea === 'Y') {
                            array.push(val);
                        }
                        else if (!options.city) {
                            array.push(val);
                        }
                        else if (checkProvinceCode(options.provinceCode, provinceCode)
                         && checkCityCode(options.cityCode, cityCode)) {
                            array.push(val);
                        }
                        else if (checkProvince(options.province, hexToDec(province), nprovince)
                         && checkCity(options.city, hexToDec(city), ncity)) {
                            array.push(val);
                        }
                    }
                }
            }
            catch (e) {}
        });
        if (array.length === 0) {
            return null;
        }
        return array;
    };
    var loadURLJS = function (ele, tags, params, sourceType, questionId, $thatParam, $thatLog, $tokenDiv, token) {
        var url = httpPath + '/mib/tag/';
        var arry = tags.split(':');
        var youlaiTag = '';
        var runhaiTag = '';
        var visitFlag = true;
        for (var i = 0; i < arry.length; i++) {
            youlaiTag = arry[i].replace('[', '').replace(']', '');
            if (youlaiTag === '') {
                visitFlag = false;
            }
            runhaiTag = 'runhai' + youlaiTag;
            if (visitFlag) {
                break;
            }
        }
        try {
            var province = ''; // 省份
            var provinceCode = ''; // 省份code
            var city = ''; // 城市
            var cityCode = ''; // 城市code
            var paramsArry = params.split(':');
            var qCid = paramsArry[6] || '79';
            var bCid = paramsArry[7];
            ipLoad(function (data) {
                province = data.province;
                provinceCode = data.provinceCode;
                city = data.city;
                cityCode = data.cityCode;
                var param = loadInit({
                    mainTags: paramsArry[5],
                    province: province,
                    provinceCode: provinceCode,
                    qCid: qCid,
                    bCid: bCid,
                    city: city,
                    cityCode: cityCode,
                    lenGood: parseInt(paramsArry[0], 0),
                    lenother: parseInt(paramsArry[1], 0),
                    commercialSource: paramsArry[3],
                    qSourceType: paramsArry[2],
                    qTags: paramsArry[4],
                    nowTime: getSysTime()
                });
                if (visitFlag) {
                    fetchJsonp(url + youlaiTag, {
                        jsonpCallback: 'callback'
                    }).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        var youlaiArray = loadData(param, data);
                        fetchJsonp(url + runhaiTag, {
                            jsonpCallback: 'callback'
                        }).then(function (res) {
                            return res.json();
                        }).then(function (datas) {
                            var runhaiArray = loadData(param, datas);
                            if (youlaiArray !== null && youlaiArray.length > 0) {
                                for (var i = 0; i < youlaiArray.length; i++) {
                                    adPut(ele, youlaiArray[i]);
                                }
                                advLogInfo(ele, sourceType, 0);
                            }
                            if (runhaiArray !== null && runhaiArray.length > 0) {
                                removeBaiduAd(ele);
                                var runhaiData = runhaiArray[Math.floor(Math.random() * runhaiArray.length)];
                                runhaiPut(ele, runhaiData);
                                advLogInfo(ele, 'COOPERATE_RUNHAI', 0);
                            }
                            if ((runhaiArray === null || runhaiArray.length === 0)
                                    && (youlaiArray === null || youlaiArray.length === 0)) {
                                loadEffect(ele, questionId, $thatParam, $thatLog, $tokenDiv, token);
                            }
                            else {
                                loadStatsToken($tokenDiv, token);
                            }
                        });
                    });
                }
                if (!visitFlag) {
                    loadEffect(ele, questionId, $thatParam, $thatLog, $tokenDiv, token); // 加载效果广告
                }
            });
        }
        catch (e) {
        }
    };
    // 加载效果广告
    var loadEffect = function (ele, questionId, $thatParam, $thatLog, $tokenDiv, token) {
        if ($thatLog.length === 0) {
            var sourceType = 'COOPERATE_EFFECT';
            $thatParam.setAttribute('sources', sourceType);
            // 商业效果广告
            effectAvertisement(ele, questionId, sourceType, $tokenDiv, token);
        }
    };
    // 润海广告
    var runhaiPut = function (ele, data) {
        var $paramDiv = ele.querySelector('.paramDiv');
        var json = data.adList;
        var adUserId = data.adUserId;
        var baiduStr = '';
        var baiduObj = '';
        for (var key in json) {
            if (json[key].type === '1') {  // answerInfo feed 广告
                var object = json[key];
                var answerConNumber = parseInt($paramDiv.getAttribute('answerConNumber'), 0);
                var goodNum = parseInt($paramDiv.getAttribute('goodLen'), 0);
                var otherNum = parseInt($paramDiv.getAttribute('otherLen'), 0);
                var answerTotal = goodNum + otherNum;
                var numTotal = false;
                if ((answerTotal === 1 && answerConNumber !== 0 && answerConNumber < 170)
                 || (answerTotal === 2 && answerConNumber !== 0 && answerConNumber < 160)) {
                    numTotal = true;
                }
                var $that = ele.querySelectorAll('.critics-list');
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1001', 'skip', 'MIP_SY_1001_feed']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                monthlyFeed1($that, adUserId, object, numTotal, baiduObj, '1');
                advLogInfoClick(ele, '.runhai_feed1 .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
            else if (json[key].type === '2') {
                var object = json[key];
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1001', 'skip', 'MIP_SY_1001_zx']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                monthlyZixun('.new-similar-dl', adUserId, object, baiduObj, '2');
                advLogInfoClick(ele, '.runhai_zixun .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
            else if (json[key].type === '4') {
                var object = json[key];
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1001', 'skip', 'MIP_SY_1001_wzlz']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                monthlyWenzhil('.wait_answer_question', 'everyone_wenzhil1', adUserId, object, baiduObj, '4');
                advLogInfoClick(ele, '.everyone_wenzhil1 .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
            else if (json[key].type === '5') {
                var object = json[key];
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1001', 'skip', 'MIP_SY_1001_feed2']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                monthlyFeed2('.hot-top', adUserId, object, baiduObj, '5');
                advLogInfoClick(ele, '.runhaiFeed2 .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
            else if (json[key].type === '3') {  // 热门推荐
                var obj = json[key];
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1001', 'skip', 'MIP_SY_1001_qt']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                monthlyHotRecommend('.relative_kownlege', adUserId, obj, baiduObj, '3');
                advLogInfoClick(ele, '.hot_recomd_div .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
            else if (json[key].type === '6') {
                var object = json[key];
                baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_1001', 'skip', 'MIP_SY_1001_wzly']};
                baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                monthlyWenzhil('.everyone_notices_div', 'everyone_wenzhil2', adUserId, object, baiduObj, '6');
                advLogInfoClick(ele, '.everyone_wenzhil2 .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
        }
    };
    var monthlyHotRecommend = function (clazz, adUserId, object, baiduObj, pos) {
        var html = '<div class="hot-tui hot_recomd_div" >';
        html += '<h3>热门推荐<span class="icon-bai"></span></h3>';
        html += '<ul class="hot-tui-list href_log" uid="' + adUserId + '"';
        html += ' href="' + object.picLink + '" ' + baiduObj + ' pos="' + pos + '">';
        for (var i in object.adDetailList) {
            html += '<li><mip-img class="mip-img" src="' + object.adDetailList[i].picUrl + '">';
            var describe = object.adDetailList[i].describe;
            html += '<p class="mip-img-subtitle">' + subStringIask(hexToDec(describe), 8) + '</p>';
            html += '</mip-img></li>';
        }
        html += '    </ul>';
        html += '</div>';
        $(clazz).after(html);
    };
    var monthlyFeed1 = function ($that, adUserId, object, numTotal, baiduObj, pos) {
        var html = '<div class="m-yy-con runhai_feed1" >';
        html += '<div class="href_log" uid="' + adUserId + '"';
        html += ' href="' + object.picLink + '" pos="' + pos + '" ' + baiduObj + '>';
        html += '<h2 class="m-yy-title">' + subStringIask(hexToDec(object.title), 24) + '</h2>';
        if (!numTotal) {
            html += '<ul class="m-yy-list href_log" uid="' + adUserId + '"';
            html += ' href="' + object.picLink + '" pos="' + object.type + '" ' + baiduObj + '>';
            html += '<li><span class="feed-span"><mip-img src="' + object.picList[0] + '"';
            html += ' class="mip-img"></mip-img></span></li>';
            html += '<li><span class="feed-span"><mip-img src="' + object.picList[1] + '"';
            html += ' class="mip-img"></mip-img></span></li>';
            html += '<li><span class="feed-span"><mip-img src="' + object.picList[2] + '"';
            html += ' class="mip-img"></mip-img></span></li>';
            html += '</ul>';
        }
        html += '<p class="m-yy-text">' + subStringIask(hexToDec(object.describe), 60) + '</p>';
        html += '<div class="m-yy-info">';
        html += '<div class="m-left">';
        html += '<div class="m-user-img"><mip-img src="/static/images/w-v03/head_normal_50.png"';
        html += ' class="mip-img"></mip-img></div>';
        html += '<span class="m-user-name">' + subStringIask(hexToDec(object.companyName), 14) + '</span>';
        html += '<span class="time">1小时前</span>';
        html += '<span class="icon-tui">广告</span>';
        html += '</div>';
        html += '<span class="m-yy-link">查看详情</span>';
        html += '</div></div></div>';
        var index = $that.length - 1;
        if ($that.length > 0) {
            var newdiv = document.createElement('div');
            newdiv.innerHTML = html;
            $that[index].parentNode.appendChild(newdiv);
        }
    };
    var monthlyZixun = function (clazz, adUserId, object, baiduObj, pos) {
        var html = '<div class="m-doc-con runhai_zixun">';
        html += '<i class="icon-feed-tui"></i>';
        html += '<h2 class="m-doc-title">' + hexToDec(object.title) + '</h2>';
        html += '<ul class="m-doc-list href_log" uid="' + adUserId + '"';
        html += ' href=' + object.picLink + '  pos="' + pos + '" ' + baiduObj + '>';
        for (var index in object.adDetailList) {
            var obj = object.adDetailList[index];
            html += '<li><div class="doc-item"><div class="doc-pic">';
            html += '<mip-img src="' + obj.picUrl + '" class="mip-img"></mip-img></div>';
            html += '<p class="doc-name">' + hexToDec(obj.name) + '</p>';
            html += '<p class="doc-text">' + hexToDec(obj.describe) + '</p>';
            html += '<span class="btn-doc" >向TA提问</span></div></li>';
        }
        html += '</ul>';
        html += '</div>';
        $(clazz).after(html);
    };
    var monthlyFeed2 = function (clazz, adUserId, object, baiduObj, pos) {
        var html = '<div class="m-focus-tui-con runhaiFeed2" >';
        html += '<ul class="m-focus-tui-list href_log" href="' + object.picLink + '"';
        html += ' uid="' + adUserId + '"  pos="' + pos + '" ' + baiduObj + '>';
        for (var index in object.adDetailList) {
            var obj = object.adDetailList[index];
            html += '<li><div class="pic-con">';
            html += '<mip-img src="' + obj.picUrl + '" class="mip-img"></mip-img></div>';
            html += '<div class="text-con"><p class="text">' + hexToDec(obj.describe) + '</p>';
            html += '<span class="view-more">查看详情</span></div><i class="icon-feed-tui"></i></li>';
        }
        html += '</ul>';
        html += '</div>';
        $(clazz).after(html);
    };
    var monthlyWenzhil = function (clazz, clickClass, adUserId, object, baiduObj, pos) {
        var html = '<ul class="m-word-tui ' + clickClass + ' ">';
        for (var index in object.adDetailList) {
            var obj = object.adDetailList[index];
            html += '<li class="href_log" uid="' + adUserId + '" href="' + object.adDetailList[0].picLink + '"';
            html += 'pos="' + pos + '"' + baiduObj + '>' + hexToDec(obj.describe) + '<i';
            html += ' class="icon-feed-tui"></i></li>';
        }
        html += '</ul>';
        $(clazz).after(html);
    };
    var adPut = function (ele, val) {
        if (val === undefined) {
            return;
        }
        var adPosition = val.adPosition;
        var arry = adPosition.split(',');
        for (var i = 0; i < arry.length; i++) {
            callMethod(ele, arry[i], val);
        }
    };
    var callMethod = function (ele, tp, val) {
        try {
            if (tp === '1') {
                put1(ele, val);
            }
            else if (tp === '2') {
                put2(ele, val);
            }
            else if (tp === '3') {
                put3(ele, val);
            }
        }
        catch (e) {}
    };
    var put1 = function (ele, val) {
        var baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_202', 'skip', 'MIP_SY_202_qy1']};
        var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
        putQiyeInfo(ele, hexToDec(val.hospitalName), hexToDec(val.contacts), val.url, val.logo, baiduObj, '1');
    };
    var put2 = function (ele, val) {
        var baiduStr = {type: 'click', data: ['_trackEvent', 'skip', 'MIP_SY_202_qy2']};
        var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
        putQiyeInfo(ele, hexToDec(val.hospitalName), hexToDec(val.contacts), val.url, val.logo, baiduObj, '2');
    };
    var put3 = function (ele, val) {
        var baiduStr = {type: 'click', data: ['_trackEvent', 'skip', 'MIP_SY_202_fx3']};
        var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
        var $that = ele.querySelector('.mip_as_bottm_div');
        $that.innerHTML = putMXfAd(val.url, val.mSuspensionImage, baiduObj, '3');
        advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'));
    };
    var checkTime = function (nowTime, startTime, endTime) {
        if (startTime <= nowTime && nowTime < endTime) {
            return true;
        }
        return false;
    };
    var checkCity = function (city, putCity, nCity) {
        if (nCity.indexOf(city) !== -1) {
            return false;
        }
        if (putCity === '不限' || putCity === '') {
            return true;
        }
        var arrays = putCity.split(',');
        for (var i = 0; i < arrays.length; i++) {
            var arr = arrays[i];
            var arrsub = arr.substring(arr.length - 1, arr.length);
            if (arrsub === '州' || arrsub === '县') {
                arr = arr.substring(0, arr.length - 1);
            }
            if (city.indexOf(arr) !== -1) {
                return true;
            }
        }
        return putCity.indexOf(city) > -1 ? true : false;
    };
    var checkProvince = function (province, putProvince, nprovince) {
        if (nprovince.indexOf(province) !== -1 && nprovince !== '不限') {
            return false;
        }
        if (putProvince === '不限') {
            return true;
        }
        if (putProvince.indexOf(province) !== -1) {
            return true;
        }
        return false;
    };
    var checkProvinceCode = function (provinceCode, putProvinceCode) {
        if (provinceCode === '' || putProvinceCode === '') {
            return false;
        }
        return putProvinceCode.indexOf(provinceCode) > -1 ? true : false;
    };
    var checkCityCode = function (cityCode, putCityCode) {
        if (cityCode === '' || putCityCode === '') {
            return false;
        }
        return putCityCode.indexOf(cityCode) > -1 ? true : false;
    };
    var checkTag = function (tag, putTag, mainTags, putMainTags) {
        if (!!putTag) {
            var arr = putTag.split(',');
            for (var i = 0; i < arr.length; i++) {
                if (tag.indexOf(arr[i]) !== -1) {
                    return true;
                }
            }
        }
        if (!!putMainTags) {
            var arr = putMainTags.split(',');
            for (var i = 0; i < arr.length; i++) {
                if (mainTags.indexOf(arr[i]) !== -1) {
                    return true;
                }
            }
        }
        return false;
    };
    var fRandomBy = function (under, over) {
        switch (arguments.length) {
            case 1 :
                return parseInt((Math.random() * under + 1), 0);
            case 2:
                return parseInt((Math.random() * (over - under + 1) + under), 0);
            default:
                return 0;
        }
    };
    // 广告
    var currencyAM = function (ele, sourceType, openId, questionId, version) {
        loadAd(ele, sourceType, openId, questionId, version);
        advLogInfo(ele, sourceType, 0);
    };
    // 南方网通底部悬浮广告
    var southnetwork = function (ele, openId) {
        var $thatHotList = ele.querySelector('.hot-tui-list');
        var $thatHotDiv = ele.querySelector('.hot_recomd_div');
        var $that = document.querySelector('.mip_as_bottm_div');
        var $tokenDiv = ele.querySelector('.mip-stats-token-div');
        var token = ele.querySelector('.mip-token-value').innerHTML;
        var type = 'SOUTH';
        var version = ele.querySelector('.paramDiv').getAttribute('version');
        var channel = version === '4' ? '104' : '100';
        var sourceType =  version === '4' ? 'COOPERATE_SOUTHNETWORK_4' : 'COOPERATE_SOUTHNETWORK';
        var dataEvent = 'MIP_SY_' + channel;
        try {
            var url = httpPath + '/t/wlsh?openCorporationId=' + openId + '&type=' + type;
            $.get(url,
            function (data) {
                var base = new Base64();
                var res = $.parseJSON(data);
                if (res.succ === 'Y') {
                    removeBaiduAd(ele);
                    var json = $.parseJSON(base.decode(res.html));
                    for (var i in json.adList) {
                        var material = json.adList[i];
                        if (material.materialType === '5') {
                            var bStr = {type: 'click', data: ['_trackEvent', dataEvent, 'skip', dataEvent + '_tp']};
                            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(bStr) + '"';
                            var htmls = putMXfAd(material.picLink, material.picUrl, baiduObj, '2');
                            var classMipBottm = '.mip_as_bottm_div .href_log';
                            $that.innerHTML = htmls;
                            advLogInfoClick(ele, classMipBottm, ele.querySelector('.paramDiv'), sourceType);
                        }
                        else if (material.type === '3') {
                            var bStr = {type: 'click', data: ['_trackEvent', dataEvent, 'skip', dataEvent + '_qy']};
                            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(bStr) + '"';
                            putQiyeInfo(ele, material.companyName, material.descb,
                             json.website, material.picUrl, baiduObj, '3', sourceType);
                        }
                        else if (material.type === '8') {
                            var bStr = {type: 'click', data: ['_trackEvent', dataEvent, 'skip', dataEvent + '_qt']};
                            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(bStr) + '"';
                            var str = '';
                            for (var index in material.adDetailList) {
                                var picLink = material.picLink;
                                var picUrl = material.adDetailList[index].picUrl;
                                var picDesc = material.adDetailList[index].describe;
                                str += hotRecommend(picLink, picUrl, picDesc, baiduObj, '1');
                            }
                            $thatHotList.innerHTML = str;
                            addClass($thatHotDiv, 'show');
                            advLogInfoClick(ele, '.hot-tui-list .href_log', ele.querySelector('.paramDiv'), sourceType);
                        }
                    }
                    advLogInfo(ele, sourceType, 0);
                    loadStatsToken($tokenDiv, token);
                }
            });
        }
        catch (e) {}
    };
    var yunwangke = function (ele, openId, questionId, version) {
        var $thatHotList = ele.querySelector('.hot-tui-list');
        var $thatHotDiv = ele.querySelector('.hot_recomd_div');
        var $that = ele.querySelector('.mip_as_bottm_div');
        var $tokenDiv = ele.querySelector('.mip-stats-token-div');
        var token = ele.querySelector('.mip-token-value').innerHTML;
        var url = httpPath + '/t/wlsh?openCorporationId=' + openId;
        url += '&type=YWK&questionId=' + questionId + '&version=' + version;
        $.get(url, function (data) {
            var base = new Base64();
            var res = $.parseJSON(data);
            if (res.succ === 'Y') {
                removeBaiduAd(ele);
                var json = $.parseJSON(base.decode(res.html));
                var basedata = json.adList;
                var baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_103', 'skip', 'MIP_SY_103_all']};
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                for (var key in basedata) {
                    var obj = basedata[key];
                    if (obj.type === '1' && obj.materialType === '5') {
                        var htmls = putMXfAd(obj.picLink, obj.picUrl, baiduObj, '');
                        $that.innerHTML = htmls;
                        advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'));
                    }
                    else if (obj.type === '3') {
                        var website = json.website;
                        var companyName = obj.companyName;
                        var drName   = obj.descb;
                        putQiyeInfo(ele, companyName, drName, website, obj.picUrl, baiduObj, '');
                    }
                    else if (obj.type === '8') {
                        var str = '';
                        var picList = obj.adDetailList;
                        var picLink = obj.picLink;
                        for (var i = 0; i < picList.length; i++) {
                            var pic = picList[i].picUrl;
                            var picDesc = picList[i].describe;
                            str += hotRecommend(picLink, pic, picDesc, baiduObj, '');
                        }
                        $thatHotList.innerHTML = str;
                        addClass($thatHotDiv, 'show');
                        advLogInfoClick(ele, '.hot-tui-list .href_log', ele.querySelector('.paramDiv'));
                    }
                }
                advLogInfo(ele, 'COOPERATE_YUNWANG', 0);
                loadStatsToken($tokenDiv, token);
                removeBaiduAd(ele);
            }
        });
    };
    var getmainCategoryPics = function (ele) {
        var list = {};
        var $that = ele.querySelectorAll('.mianCategoryPics li');
        if ($that.length > 0) {
            for (var i = 0; i < $that.length; i ++) {
                var cid = $that[i].getAttribute('cid');
                var val = $that[i].getAttribute('val');
                var picArr = val.split(',');
                list[cid] = picArr;
            }
        }
        return list;
    };
    var loadMImagesrc = function (picsArr, cid) {
        var list = picsArr[cid];
        if (undefined === list) {
            list = picsArr['0000'];
        }
        var cur = fRandomBy(0, list.length - 1);
        var pic = list[cur];
        return pic;
    };
    var getFlowEmbed = function (ele, classFlag, tp) {
        var $that = ele.querySelectorAll('.flow-info-params li');
        var htmls = '';
        if ($that.length > 0) {
            for (var i = 0; i < $that.length; i ++) {
                var clazz = $that[i].getAttribute('class');
                var domainBd = $that[i].getAttribute('domain');
                var tokenBd = $that[i].getAttribute('token');
                var index = $that[i].getAttribute('tp');
                if (classFlag.indexOf(clazz) > -1 && tp === index) {
                    htmls = '<mip-embed type="baidu-wm-ext" domain="' + domainBd + '"';
                    htmls += ' token="' + tokenBd + '" ><div id="' + tokenBd + '"></div></mip-embed>';
                    break;
                }
            }
        }
        return htmls;
    };
    var addFlowEmbed = function (ele, clazz) {
        var $that = ele.querySelectorAll(clazz);
        if ($that.length > 0) {
            for (var i = 0; i < $that.length; i++) {
                var c = $that[i].getAttribute('class');
                var tp = $that[i].getAttribute('tq');
                if (c.indexOf('hide') > -1) {
                    continue;
                }
                if ($that[i].innerHTML !== '') {
                    continue;
                }
                $that[i].innerHTML = getFlowEmbed(ele, c, tp);
            }
        }
    };
    var infoFlow = function (ele) {
        try {
            var $that = ele.querySelector('.info-flow-json-data');
            if ($that !== null) {
                removeInfo(ele);
                $('.info-flow-json-data').removeClass('hide').addClass('show');
            }
            else {
                return;
            }
            var picsArr = getmainCategoryPics(ele);
            var $that = ele.querySelectorAll('.issues-list .category-img');
            if ($that.length > 0) {
                for (var i = 0; i < $that.length; i++) {
                    var cid = $that[i].getAttribute('cid');
                    var pic = loadMImagesrc(picsArr, cid);
                    var img = '<mip-img class="mip-img"';
                    img += ' src="http://pic.iask.cn/fimg/' + pic + '_560.jpg" ></mip-img>';
                    $that[i].innerHTML = img;
                    picsArr = removeArray(ele, picsArr, cid, pic);
                }
            }
            addFlowEmbed(ele, '.issues-item .xgzs-info-flow');
            addFlowEmbed(ele, '.issues-item .bd-info-flow');
        }
        catch (e) {
        }
    };
    var removeArray = function (ele, picsArr, cid, val) {
        var list = picsArr[cid];
        if (undefined === list) {
            list = picsArr['0000'];
        }
        for (var i = 0; i < list.length; i++) {
            if (list[i] === val) {
                list.splice(i, 1);
            }
        }
        if (list.length === 0) {
            list = picsArr['0000'];
            if (list.length === 0) {
                return getmainCategoryPics(ele);
            }
        }
        picsArr[cid] = list;
        return picsArr;
    };
    var issuesChange = function (clazz) {
        $(clazz).click(function () {
            var $notices = $('.relationRecommend');
            $notices.find('li.show').removeClass('show').addClass('hide').appendTo($notices);
            var i = 0;
            $notices.find('li.hide').each(function () {
                if (i === 6) {
                    return;
                }
                i ++;
                $(this).removeClass('hide').addClass('show');
            });
            addFlowEmbed(document, '.issues-item .xgzs-info-flow');
        });
    };
    // 商业效果广告
    var effectAvertisement = function (ele, questionId, sourceType, $tokenDiv, token) {
        ipLoad(function (data) {
            var provinceCode = data.provinceCode;
            var url = httpPath + '/mib/tag/test?q=' + questionId + '&c=' + provinceCode;
            try {
                $.getJSON(url, function (res) {
                    if (res.jsonData != null) {
                        advEffectCallBack(ele, res.jsonData);
                        advLogInfo(ele, sourceType, 0);
                        loadStatsToken($tokenDiv, token);
                    }
                    else {
                        advLogInfo(ele, '', 0);
                        // 信息流图片
                        infoFlow(ele);
                    }
                });
            }
            catch (e) {
            }
        });
    };
    var advEffectCallBack = function (ele, materiel) {
        var $that = ele.querySelector('.paramDiv');
        var $thatDiv = ele.querySelector('.baidu_label_div');
        var list = materiel.materialList;
        var version = materiel.version;
        var channelCode = materiel.channelCode;
        $that.setAttribute('uid', materiel.userId);
        if ('2' !== version) {
            // 如果不是标准版，则删除百度广告
            removeBaiduAd(ele);
        }
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if (version === '1') {
                showEffectAdv(ele, obj, 1, channelCode);
            }
            else if (version === '2') {
                showEffectAdv(ele, obj, 2, channelCode);
            }
            else {
                showEffectAdv(ele, obj, 3, channelCode);
            }
        }
        var baiduStr = {'type': 'load', 'data': ['_setPageTag', 'MIP_SY_700', 'skip', 'MIP_SY_效果广告']};
        var baiduObj = '<div data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '" ></div>';
        $thatDiv.innerHTML = baiduObj;
    };
    var showEffectAdv = function (ele, json, tp, channelCode) {
        var $that = ele.querySelector('.mip_as_bottm_div');
        var $thatParam = ele.querySelector('.paramDiv');
        if (json.adType === '3') {
            var baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_700', 'skip', 'MIP_SY_700_qy']};
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var brandLink = '';
            var uid = $thatParam.getAttribute('uid');
            if ('10002' === channelCode) {
                brandLink = json.materialLink;  // 南方网通效果广告-链接跳转自己的物料链接
            }
            else {
                brandLink = httpPath + '/brand/' + uid + '.html';
            }
            putBrandQiyeInfo(ele, json.brandName, json.shortIntroduce,
             json.materialLink, json.materialImg, baiduObj, '3', brandLink);
            return;
        }
        if (json.adType === '2') {
            return;
        }
        // 旗舰版feed
        if (json.adType === '5') {
            var baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_700', 'skip', 'MIP_SY_700_feed']};
            var materialImg = json.materialImg;
            var picList = materialImg.split(',');
            var picUrl = 'http://tp2.sinaimg.cn/1169181841/50/0/1';
            feedInfo(ele, encodeURIStr(baiduStr), picUrl, json.brandName,
             json.shortIntroduce, json.materialIntroduce, json.materialLink, picList, '2');
            return;
        }
        // 旗舰版-顶部悬浮
        if (json.materialType === '5' && tp === 1) {
            var baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_700', 'skip', 'MIP_SY_700_tp']};
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj, '1');
            $that.innerHTML = htmls;
            advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'));
            return;
        }
        // 标准版顶部悬浮
        if (json.materialType === '5' && tp === 2) {
            var baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_700', 'skip', 'MIP_SY_700_tp']};
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj, '1');
            $that.innerHTML = htmls;
            advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'));
            return;
        }
        // 专业版-顶部悬浮
        if (json.materialType === '5' && tp === 3) {
            var baiduStr = {type: 'click', data: ['_trackEvent', 'MIP_SY_700', 'skip', 'MIP_SY_700_tp']};
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj, '1');
            $that.innerHTML = htmls;
            advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'));
            return;
        }
    };
    var brandAvertisement = function (ele, sourceType, $tokenDiv, token) {
        advLogInfo(ele, sourceType, 0);
        advLogInfoClick(ele, '.href_log', ele.querySelector('.paramDiv'));
        loadStatsToken($tokenDiv, token);
    };
    var checkData2017 = function (postDate) {
        var d1 = new Date(postDate);
        var d2 = new Date('2017-11-01 00:00:00');
        if (d1.getFullYear() < d2.getFullYear()) {
            return 3;
        }
        if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() < d2.getMonth()) {
            return 3;
        }
        if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() <= d2.getDate()) {
            return 3;
        }
        return 1;
    };
    var checkDate = function (thetime) {
        var d1 = new Date(thetime);
        var d2 = new Date();
        if (d1.getFullYear() < d2.getFullYear()) {
            return false;
        }
        if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() < d2.getMonth()) {
            return false;
        }
        if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() < d2.getDate()) {
            return false;
        }
        return true;
    };
    var addDateYear = function (time, num) {
        var d1 = new Date(time);
        var d2 = new Date(d1);
        d2.setFullYear(d2.getFullYear() + num);
        d2.setDate(d2.getDate() - 1);
        return d2;
    };
    // 选择投放广告
    var selectAS = function () {
        // 因为参数都定义在了组件外部，所以需要使用全局选择器
        var ele = this.document;
        var $thatParam = ele.querySelector('.paramDiv');
        var $thatHover = ele.querySelector('.commercialStandardHover');
        var $thatQiye = ele.querySelector('.commercialStandard_qiye_cp');
        var sourceType = $thatParam.getAttribute('sources');
        var sources = $thatParam.getAttribute('sysources') == null ? sourceType : $thatParam.getAttribute('sysources');
        var version1 = $thatParam.getAttribute('version');
        var version2 = $thatParam.getAttribute('syversion');
        var version = $thatParam.getAttribute('syversion') == null ? version1 : version2;
        var openId = $thatParam.getAttribute('openId');
        var tags = $thatParam.getAttribute('tags');
        var params = $thatParam.getAttribute('params');
        var mainTags  = $thatParam.getAttribute('maintags');
        var questionId = $thatParam.getAttribute('qid');
        var qcid = $thatParam.getAttribute('qcid');
        var postDate = $thatParam.getAttribute('postDate');
        var $tokenDiv = ele.querySelector('.mip-stats-token-div');
        var token = ele.querySelector('.mip-token-value').innerHTML;
        if (sources === 'COMMERCIAL_IAD' || sources === 'COMMERCIAL_ZWZD' || sources === 'COMMERCIAL_CAD') {
            // 商业广告
            removeBaiduAd(ele);
            busBottomAM(ele, $tokenDiv, token);
            if (sources === 'COMMERCIAL_ZWZD') {
                sources = 'COOPERATE_COMMERCIAL';
            }
            advLogInfo(ele, sources, 0);
        }
        else if ((sources === 'COOPERATE_BRAND' || sources === 'COOPERATE_BRAND_MARKET')
                && (version === '1' || version === '3')) {
            // 商业广告-旗舰版、专业版本
            brandAvertisement(ele, sources, $tokenDiv, token);
        }
        else if (sourceType === 'COOPERATE_BRAND' && version === '2') {
            // 商业广告-标准版
            $thatParam.setAttribute('sources', 'COOPERATE_BRAND');
            commercialSqc(ele, $thatQiye, $thatHover);
            advLogInfo(ele, 'COOPERATE_BRAND', 0);
            advLogInfoClick(ele, '.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'));
            loadStatsToken($tokenDiv, token);
        }
        else if (sourceType === 'COOPERATE_HUASHENG' || sourceType === 'COOPERATE_HUASHENG_QA'
            || sourceType === 'COOPERATE_YOULAI' || sourceType === 'COOPERATE_TIANZHU'
            || sourceType === 'COOPERATE_BRAND_MARKET'
             || sourceType === 'COOPERATE_SOULE' || sourceType === 'COOPERATE_HUAXIN') {
            // 第三方合作广告
            if (sourceType === 'COOPERATE_YOULAI' || sourceType === 'COOPERATE_TIANZHU'
                || sourceType === 'COOPERATE_SOULE' || sourceType === 'COOPERATE_HUAXIN'
                || (sourceType === 'COOPERATE_BRAND_MARKET' && version === '4')) {
                // 需要删除百度广告
                removeBaiduAd(ele);
            }
            currencyAM(ele, sourceType, openId, questionId, version);
        }
        else if (sourceType === 'COOPERATE_SOUTHNETWORK'
            && checkDate(addDateYear(postDate, checkData2017(postDate)))) {
            // 南方网通广告
            southnetwork(ele, openId);
        }
        else if (sourceType === 'COOPERATE_YUNWANG') {
            // 云网客广告
            yunwangke(ele, openId, questionId, version);
        }
        else if (sourceType !== 'COOPERATE_HUASHENG' && sourceType !== 'COOPERATE_HUASHENG_QA') {
            var $thatLog = ele.querySelectorAll('.href_log');
            if (tags) {
                sourceType = 'COOPERATE_HUASHENG_BY';
                $thatParam.setAttribute('sources', sourceType);
                loadURLJS(ele, tags, params, sourceType, questionId, $thatParam, $thatLog, $tokenDiv, token);
            }
        }
    };
    var selectCommercail = function () {
        var ele = this.document;
        var $thatDiv = ele.querySelectorAll('.mip_as_bottm_div');
        var $that = ele.querySelectorAll('.paramDiv');
        var $tokenDiv = ele.querySelector('.mip-stats-token-div');
        var token = ele.querySelector('.mip-token-value').innerHTML;
        if (validatePut(ele)) {
            var nowTime = getSysTime();
            var startTime = ele.querySelector('.yongyouStartTime').innerText;
            var endTime   = ele.querySelector('.yongyouEndTime').innerText;
            if (startTime <= nowTime && nowTime < endTime) {
                // 删除百度广告
                removeBaiduAd(ele);
                var putUrl = ele.querySelector('.yongyouPutUrl').innerText;
                var picUrl = ele.querySelector('.yongyouPicUrl').innerText;
                $thatDiv.innerHTML = putTestButHtml(putUrl, picUrl);
                var urlr = httpPath + '/t/mipdf?t=yongyou';
                $.ajax({
                    type: 'GET',
                    url: urlr,
                    dataType: 'html',
                    success: function (data) {
                        if (!!data) {
                            ele.querySelector('.breadcast_middle_commercial').innerHTML = '';
                            ele.querySelectorAll('.breadcast_middle_commercial').innerHTML = data;
                            var breadcastClass = '.breadcast_middle_commercial .href_log';
                            advLogInfoClick(ele, breadcastClass, ele.querySelector('.paramDiv'));
                        }
                    }
                });
                var sources = $that.getAttribute('sources');
                advLogInfo(ele, sources, 0);
                loadStatsToken($tokenDiv, token);
            }
        }
    };
    var effects = {
            newLoadAd: function () {
                selectAS();
            },
            commercialLoad: function () {
                selectCommercail();
                issuesChange('.issues-change');
            },
            init: function () {
                this.newLoadAd();
                this.commercialLoad();
            }
        };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        effects.init();
    };
    return customElem;
});
