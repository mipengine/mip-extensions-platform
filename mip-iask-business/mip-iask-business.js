/**
* @file 脚本支持
* @author hejieye
* @time  2018-04-23
* @version 2.1.5
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var busUid = '';
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
	    var  keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
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
	        var  enc4;
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
	var loadStatsToken = function() {
    	// 等广告全部加载完成，最后加载百度统计的token
    	var $tokenDiv = document.querySelector('.mip-stats-token-div');
    	var $tokenValue = document.querySelector('.mip-token-value');
    	$tokenDiv.innerHTML = '<mip-stats-baidu token="' + $tokenValue.innerHTML + '"></mip-stats-baidu>';
    };
    var ipLoad = function (callback) {
    	var url = 'https://mipp.iask.cn/iplookup/search?format=json&callback=?';
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
    var getChannel = function () {
        var list = {};
        var $that = document.querySelectorAll('.channel_source li');
        if($that.length > 0) {
        	for(var i=0; i< $that.length; i ++) {
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
    var advLogInfo = function (sourceType, mode) {
    	var ele = this.document;
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
        var source = getChannel()[sourceType] || 999;
        uid = getUserId(source, uid, adOwnerId) || busUid;
        var pos = $that.getAttribute('pos') || '';
        var pv = '';
        if(pos === undefined || pos === 'undefined') {
        	pos = '';
        }
        ipLoad(function (data) {
            ip = data.ip || '';
            province = data.province || '';
            city = data.city || '';
            if (!!materialTag) {
                materialTag = materialTag.replace('[', '').replace(']', '');
            }
            pv = encodeURI('pv=' + mode + '_' + qid + '_' + ip + '_' + province + '_' + city + '_' + materialTag
            + '_' + qcid + '_' + cid + '_' + source + '_' + uid + '_' + pos);
            var url = 'https://mipp.iask.cn/advLogInfo?' + pv;
            $.ajax({
                type: 'GET',
                url: url
            });
        });
    };
    
    var advLogInfoClick = function (ele, $that, newSource) {
    	$(ele).on('click', function(){
    		 var pos = $(this).attr('pos');
             var url = $(this).attr('href');
             openURL(pos, url, $that, newSource);
    	});
    };

    function openURL(pos, url, $that, newSource) {
    	var sources = $that.getAttribute('sources');
    	var sysource = $that.getAttribute('sysources');
    	if (sysource === 'COMMERCIAL_ZWZD') {
    		sysource = 'COOPERATE_COMMERCIAL';
        }
    	if(newSource != '') {
    		sources = newSource;
    	}
    	$that.setAttribute('pos', pos);
        advLogInfo(sources, 1);
        window.top.open(url);
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
    var putQiyeInfo = function (companyName, drName, website, picLocal, statsBaidu, pos) {
    	var ele = this.document;
     	var $thatQS = ele.querySelectorAll('.qs_bar');
     	var $thatDiv = ele.querySelectorAll('.mip_as_other_qiye_div');
        if (companyName.length > 9) {
            companyName = companyName.substring(0, 9);
        }
        if(drName !== null && drName.length > 15) {
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
        	if ($thatQS.length > 0) {
        		$thatQS[0].innerHTML = htmls;
        	}
        	else if($thatDiv.length > 0){
        		$thatDiv[0].innerHTML = htmls;
        	}
        	advLogInfoClick('.mip_as_other_qiye_div .href_log', ele.querySelector('.paramDiv'), '');
        } catch (e) {
        	console.log(e);
		}
    };
    
    // 品牌企业信息广告
    var putBrandQiyeInfo = function (companyName, drName, website, picLocal, statsBaidu, pos, brandLink) {
    	var ele = this.document;
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
        htmls += '<span class=\'btn-ask href_log\' href=' + website + ' ' + statsBaidu + ' pos="' + pos + '">咨询专家</span>';
        htmls += '</div>';
        htmls += '</div>';
        if ($thatQS.length > 0) {
    		$thatQS[0].innerHTML = htmls;
    		advLogInfoClick('.qs_bar .href_log', ele.querySelector('.paramDiv'), '');
    	}
    	else if($thatDiv.length > 0){
    		$thatDiv[0].innerHTML = htmls;
    		advLogInfoClick('.mip_as_other_qiye_div .href_log', ele.querySelector('.paramDiv'), '');
    	}
    };
    
    // 保险企业信息广告
    var putBaoXiangQiyeInfo = function (picLink, picLocal, statsBaidu, pos) {
    	var ele = this.document;
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
        	else if($thatDiv.length > 0){
        		$thatDiv[0].innerHTML = htmls;
        	}
        	advLogInfoClick('.mip_as_other_qiye_div .href_log', ele.querySelector('.paramDiv'), '');
        } catch (e) {
        	console.log(e);
		}
    };
    
    // feed 广告
    var feedInfo = function (statsBaidu, userImg,useName, shortIntroduce, materialIntroduce, materialLink, picList, pos) {
    	var ele = this.document;
    	var $that = ele.querySelector('.youlai_feed_div');
    	var $thatLink = ele.querySelector('.youlai_feed_div a');
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
        if($thatFeed.length > 0) {
        	for(var i = 0; i < $thatFeed.length; i ++) {
        		$thatFeed[i].innerHTML = '<mip-img class="mip-img" src="' + picList[i] + '"></mip-img>';
        	}
        }
        addClass($that, 'show');
        advLogInfoClick('.youlai_feed_div .href_log', ele.querySelector('.paramDiv'), '');
    };
    // 商业广告
    var busBottomAM = function () {
    	var $thatBottomDiv = document.querySelector('.mip_as_bottm_div');
    	var $thatBottom = document.querySelectorAll('.bus_bottom_div div');
    	var $thatHot = document.querySelectorAll('.bus_hot_recommend_div div');
    	var $thatRecomd = document.querySelector('.hot_recomd_div');
    	var $thatHotSpot = document.querySelectorAll('.bus_hot_spot div');
    	if($thatBottom.length > 0) {
    		for(var i = 0; i<$thatBottom.length; i ++ ) {
    			var area = $thatBottom[i].getAttribute('area');
    			var imgurl = $thatBottom[i].getAttribute('imgurl');
    			var picurl = $thatBottom[i].getAttribute('picurl');
    			busUid = $thatBottom[i].getAttribute('uid');
    			if (area === '') { // 区域为空表示投放全国
                    $thatBottomDiv.innerHTML = putMXfAd(imgurl, picurl, '', '');
                    advLogInfoClick('.mip_as_bottm_div .href_log', document.querySelector('.paramDiv'), '');
                }
                else {
                    ipLoad(function (data) {
                        if (area.indexOf(data.province) > -1) {
                            $thatBottomDiv.innerHTML = putMXfAd(imgurl, picurl, '', '');
                            advLogInfoClick('.mip_as_bottm_div .href_log', document.querySelector('.paramDiv'), '');
                        }
                    });
                }
    		}
    	}
    	if($thatHot.length > 0) {
    		for(var i=0; i< $thatHot.length; i ++) {
    			var area = $thatHot[i].getAttribute('area');
    			var url = $thatHot[i].getAttribute('texturl');
    			var img = $thatHot[i].getAttribute('img');
    			var title = $thatHot[i].getAttribute('imgtitle');
    			busUid = $thatHot[i].getAttribute('uid');
    			if (area === '') {
    				var str = hotRecommendUnLi(url, img, title, '', '');
    				var liDom = document.createElement("li");
    				liDom.innerHTML = str;
    				document.querySelector('.hot-tui-list').appendChild(liDom);
                }
                else {
                    ipLoad(function (data) {
                    	var str = hotRecommendUnLi(url, img, title, '', '');
        				var liDom = document.createElement("li");
        				liDom.innerHTML = str;
        				document.querySelector('.hot-tui-list').appendChild(liDom);
                    });
                }
    		}
    		addClass($thatRecomd, 'show');
    		advLogInfoClick('.hot_recomd_div .href_log', document.querySelector('.paramDiv'), '');
    	}
    	
    	if($thatHotSpot.length > 0) {
    		for(var i=0; i<$thatHotSpot.length; i++) {
    			var area = $thatHotSpot[i].getAttribute('area');
    			var url = $thatHotSpot[i].getAttribute('texturl');
    			var title = $thatHotSpot[i].getAttribute('imgtitle');
    			busUid = $thatHotSpot[i].getAttribute('uid');
    			if (area === '') {
    				var str = hotSpotUnLi(url, title);
    				var liDom = document.createElement("li");
    				liDom.innerHTML = str;
    				document.querySelector('.hot-point-list').appendChild(liDom);
                }
                else {
                    ipLoad(function (data) {
                    	var str = hotSpotUnLi(url, title);
        				var liDom = document.createElement("li");
        				liDom.innerHTML = str;
        				document.querySelector('.hot-point-list').appendChild(liDom);
                    });
                }
    		}
    		advLogInfoClick('.hot-point-list .href_log', document.querySelector('.paramDiv'), '');
    	}
    	loadStatsToken();
    };
    var validatePut = function () {
    	var ele = this.document;
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
    var removeBaiduAd = function () {
    	var $that = document.querySelectorAll('.mip_baidu_sy');
    	if($that.length > 0) {
    		for(var i=0; i<$that.length; i++) {
    			var t = $that[i];
    			t.parentNode.removeChild(t);
    		}
    	}
    };
    var youLai = function (data) {
    	var ele = this.document;
    	var $thatDiv = ele.querySelector('.mip_as_bottm_div');
    	var $thatHotList = ele.querySelector('.hot-tui-list');
    	var $thatHotDiv = ele.querySelector('.hot_recomd_div');
        var json = data.adList;
        for (var key in json) {
            if (json[key].type === '4') {
                var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_1000", "skip", "MIP_SY_1000_top"]};
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                $thatDiv.innerHTML = putMXfAd(json[key].picLink, json[key].picUrl, baiduObj, '');
                advLogInfoClick('.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
            }
            else if (json[key].type === '3') {  // 企业信息
                var obj = json[key];
                var companyName = obj.companyName || '';
                var drName   = obj.drName  || '';
                var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_1000", "skip", "MIP_SY_1000_qy"]};
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                putQiyeInfo(drName, companyName, data.website, obj.picUrl, baiduObj, '');
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
                var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_1000", "skip", "MIP_SY_1000_feed"]};
                var baiduObj = encodeURIStr(baiduStr);
                feedInfo(baiduObj, obj2.picUrl, obj2.companyName,obj.describe, obj.title, obj.picLink, picList, '');
            }
            else if (json[key].type === '6') {
                var obj = json[key];
                var picList = obj.adDetailList;
                var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_1000", "skip", "MIP_SY_1000_mpic"]};
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                var str = '';
                for (var pic in picList) {
                    var picLink = obj.picLink;
                    var picUrl = picList[pic].picUrl;
                    var describe = picList[pic].describe;
                    str += hotRecommend(picLink, picUrl, describe, baiduObj, '');
                }
                $thatHotList.innerHTML = str;
                addClass($thatHotDiv, 'show');
                advLogInfoClick('.hot-tui-list .href_log', ele.querySelector('.paramDiv'), '');
            }
        }
        loadStatsToken();
    };
    
    var soulew = function (data, channelNumber) {
    	var ele = this.document;
    	var $thatDiv = ele.querySelector('.mip_as_bottm_div');
    	var $thatHotList = ele.querySelector('.hot-tui-list');
    	var $thatHotDiv = ele.querySelector('.hot_recomd_div');
        var json = data.adList;
        for (var key in json) {
            if (json[key].type === '4') {
                var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_"+channelNumber, "skip", "MIP_SY_"+channelNumber+"_SY"]};
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                $thatDiv.innerHTML = putMXfAd(json[key].picLink, json[key].picUrl, baiduObj, '');
                advLogInfoClick('.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
            }
            else if (json[key].type === '3') {  // 企业信息
                var obj = json[key];
                var companyName = obj.companyName || '';
                var drName   = obj.drName  || '';
                var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_"+channelNumber, "skip", "MIP_SY_"+channelNumber+"_SY"]};
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                putQiyeInfo(drName, companyName, data.website, obj.picUrl, baiduObj, '');
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
                var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_"+channelNumber, "skip", "MIP_SY_"+channelNumber+"_SY"]};
                var baiduObj = encodeURIStr(baiduStr);
                feedInfo(baiduObj, obj2.picUrl, obj.companyName, obj.describe,obj.title, obj.picLink, picList, '');
            }
            else if (json[key].type === '6') {
                var obj = json[key];
                var picList = obj.adDetailList;
                var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_"+channelNumber, "skip", "MIP_SY_"+channelNumber+"_SY"]};
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                var str = '';
                for (var pic in picList) {
                    var picLink = obj.picLink;
                    var picUrl = picList[pic].picUrl;
                    var describe = picList[pic].describe;
                    str += hotRecommend(picLink, picUrl, describe, baiduObj, '');
                }
                $thatHotList.innerHTML = str;
                addClass($thatHotDiv, 'show');
                advLogInfoClick('.hot-tui-list .href_log', ele.querySelector('.paramDiv'), '');
            }
        }
        loadStatsToken();
    };
    
    var removeClass = function (obj, cls) {
        var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
    	obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
    	var removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    	removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    	obj.className = removed;//替换原来的 class.
    };
    var addClass = function (obj, cls) {
        var obj_class = ' '+obj.className+' ';
      	var add = obj_class +' ' + cls;
      	obj.className = add;
    };
    var brandMedical = function (data) { // 品牌医疗
        var json = data.adList;
        var qiyeData = null;
        var ele = this.document;
    	var $thatDiv = ele.querySelector('.mip_as_bottm_div');
    	var $thatHotList = ele.querySelector('.hot-tui-list');
    	var $thatHotDiv = ele.querySelector('.hot_recomd_div');
        for (var k in json) {
        	if (json[k].adType === 3) {
        		qiyeData = json[k];
        	}
        }
        for (var key in json) {
            if (json[key].adType === 1) {
            	var tempStr = {"type":"click", "data":["_trackEvent", "MIP_SY_800", "skip", "MIP_SY_800_top"]};
                var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
                $thatDiv.innerHTML = putMXfAd(json[key].materialLink, json[key].materialImg, statsBaidu, '');
                advLogInfoClick('.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
            }
            else if (json[key].adType === 3) {  // 企业信息
                var obj = qiyeData;
                var companyName = obj.shortIntroduce || '';
                var drName   = obj.brandName  || '';
                var tempStr = {"type":"click", "data":["_trackEvent", "MIP_SY_800", "skip", "MIP_SY_800_qy"]};
                var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
                putQiyeInfo(drName, companyName, obj.materialLink, obj.materialImg, statsBaidu, '');
            }
            else if (json[key].adType === 5) {
            	var obj = json[key];
    			var picList = new Array(0);
    			var materImg = obj.materialImg.split(",");
    			for(var k in materImg) {
    				picList.push(materImg[k]);
    			}
                var tempStr = {"type":"click", "data":["_trackEvent", "MIP_SY_800", "skip", "MIP_SY_800_feed"]};
                var statsBaidu = encodeURIStr(tempStr);
                feedInfo(statsBaidu, qiyeData.materialImg, qiyeData.brandName, obj.materialIntroduce, obj.shortIntroduce, obj.materialLink, picList, '');
            }
            else if (json[key].adType === 6) {
                var obj = json[key];
                var tempStr = {"type":"click", "data":["_trackEvent", "MIP_SY_800", "skip", "MIP_SY_800_mpic"]};
                var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
                var arrayPic = new Array(0);
    			var arrayDesc = new Array(0);
    			var materImg = obj.materialImg.split(",");
    			var materDesc = obj.materialIntroduce.split("|");
    			for(var index in materImg) {
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
                advLogInfoClick('.hot-tui-list .href_log', ele.querySelector('.paramDiv'), '');
            }
        }
        loadStatsToken();
    };
    
    var tianZhu = function (data) {
    	var ele = this.document;
    	var $thatDiv = ele.querySelector('.mip_as_bottm_div');
        var tempStr = {"type":"click", "data":["_trackEvent", "MIP_SY_300", "skip", "MIP_SY_300_sj"]};
        var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
        $thatDiv.innerHTML = putMXfAd(data.pics[3].picLink, data.pics[3].picLocal, statsBaidu, '');
        advLogInfoClick('.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'), '');
        loadStatsToken();
    };
    // 商业广告标准版企业信息
    var commercialSqc  = function (divData, commercialStandardHover) {
    	var ele = this.document;
    	var $thatDiv = ele.querySelector('.mip_as_bottm_div');
        var tempStr = {"type":"click", "data":["_trackEvent", "MIP_SY_600", "skip", "MIP_SY_600_2_qy"]};
        var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
        var imgsrc = divData.getAttribute('imgsrc');
        var brandname = divData.getAttribute('brandname');
        var link = divData.getAttribute('link');
        var introduce = divData.getAttribute('introduce');
        var uid =  divData.getAttribute('uid');
    	var brandLink = 'http://m.iask.sina.com.cn/brand/' + uid + '.html';
    	putBrandQiyeInfo(brandname, introduce, link, imgsrc, statsBaidu, '', brandLink);
        var tImgSrc = commercialStandardHover.getAttribute('imgsrc');
        var tLink = commercialStandardHover.getAttribute('link');
        var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_600", "skip", "MIP_SY_600_2_top"]};
        var baiduTop = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
        $thatDiv.innerHTML = putMXfAd(tLink, tImgSrc, baiduTop, '');
        
    };
    var loadAd = function (sources, openId, questionId, version) {
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
        else if(sources === 'COOPERATE_BRAND_MARKET' && version === '4') {
        	type = 'PPYL';
        }
        else if(sources === 'COOPERATE_SOULE') {
        	type = 'SLW';
        }
        else if(sources === 'COOPERATE_HUAXIN') {
        	type = 'HX';
        }
        else if (type === '') {
            return;
        }
        var url = 'https://mipp.iask.cn/t/wlsh?openCorporationId=' + openId + '&type=' + type +"&questionId=" + questionId + "&version=" + version;
        $.get(url,
        function (data) {
            var base = new Base64();
            var res = $.parseJSON(data);
            if (res.succ === 'Y') {
                var json = $.parseJSON(base.decode(res.html));
                var htmls = '';
                if (type === 'YL') {
                    youLai(json);
                    return;
                }
                if (type === 'TZ') {
                    tianZhu(json);
                    return;
                }
                if (type === 'PPYL') {
                	brandMedical(json);
                	return;
                }
                if (type === 'SLW') {
                	soulew(json, 101);
                	return;
                };
                if(type === 'HX') {
                	soulew(json, 102);
                	return;
                };
                if (type === 'XYH') {
                    isHuasheng = false;
                    htmls = putMXfAd(json.pics[1].picLink, json.pics[1].picLocal, '');
                }
                else {
                    var pic = json.pics[3] || '';
                    htmls = putMXfAd(pic.picLink, pic.picLocal, '');
                    var companyName = json.companyName || '';
                    var drName = json.drName || '';
                    var website = json.website || '';
                    var pic = json.pics[0] || '';
                    putQiyeInfo(companyName, drName, website, pic.picLocal, '', '');
                }
                $('.mip_as_bottm_div').empty();
                $('.mip_as_bottm_div').append(htmls);
                advLogInfoClick('.mip_as_bottm_div .href_log', document.querySelector('.paramDiv'), '');
                loadStatsToken();
            }
        });
    };
    // 加载url中的js
    var loadURLJS = function (tags, params, sourceType, questionId, $thatParam, $thatLog) {
        var url = 'https://mipp.iask.cn/mib/tag/';
        var arry = tags.split(':');
        var youlaiTag = '';
        var runhaiTag = '';
        for (var i = 0; i < arry.length; i++) {
        	youlaiTag =arry[i].replace('[', '').replace(']', '');
        	runhaiTag = "runhai"+arry[i].replace('[', '').replace(']', '');
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
                    mainTags: paramsArry[5],// 病种
                    province: province,
                    provinceCode: provinceCode,
                    qCid: qCid,
                    bCid: bCid,
                    city: city,
                    cityCode:cityCode,
                    lenGood: parseInt(paramsArry[0], 0),   // 好评回答数量
                    lenother:  parseInt(paramsArry[1], 0),// 普通答案数量
                    commercialSource: paramsArry[3],	 // 商业广告类型
                    qSourceType: paramsArry[2],	// 来源
                    qTags: paramsArry[4], // 标签
                    nowTime: getSysTime()
                });
                // 友来包月
                $.get(url+youlaiTag, function (datas) {
                	var youlaiArray = null;
                	var runhaiArray = null;
                    try {
                        var res = $.parseJSON(datas);
                        if (res.succ === 'Y') { // 不等于空
                        	var cmJsonData = $.parseJSON(res.html);
                            if ('undefined' !== typeof cmJsonData) {
                            	youlaiArray = loadData(param, cmJsonData);
                            }
                        }
                        $.get(url+runhaiTag, function (result) {
                            try {
                                var res = $.parseJSON(result);
                                if (res.succ === 'Y') { // 不等于空
                                	var cmJsonData = $.parseJSON(res.html);
                                    if ('undefined' !== typeof cmJsonData) {
                                        runhaiArray = loadData(param, cmJsonData);
                                    }
                                }
                                if(youlaiArray != null && youlaiArray.length > 0) {
                                	for(var i = 0; i < youlaiArray.length; i ++) {
                                		adPut(youlaiArray[i]);
                                	}
                                	advLogInfo(sourceType, 0);
                                }
                                if(runhaiArray != null && runhaiArray.length > 0) {
                                	removeBaiduAd();
                                	var runhaiData = runhaiArray[Math.floor(Math.random()*runhaiArray.length)];
                                	runhaiPut(runhaiData);
                                	advLogInfo('COOPERATE_RUNHAI', 0);
                                }
                                if((runhaiArray == null || runhaiArray.length == 0)
                                		&& (youlaiArray == null || youlaiArray.length == 0)) {
                                	loadEffect(questionId, $thatParam, $thatLog); // 加载效果广告
                                }else{
                                	loadStatsToken();
                                }
                            } catch (e) {
                            	console.log(e);
                            }
                        });
                    } catch (e) {}
                });
                if(youlaiTag === '') {
                	loadEffect(questionId, $thatParam, $thatLog); // 加载效果广告
                }
            });
        }
        catch (e) {
        }

    };

    // 加载效果广告
    var loadEffect = function (questionId, $thatParam, $thatLog) {
    	if ($thatLog.length === 0) {
            var sourceType = 'COOPERATE_EFFECT';
            $thatParam.setAttribute('sources', sourceType);
            // 商业效果广告
            effectAvertisement(questionId, sourceType);
        }
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
        var array = new Array();
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
                    if (checkTime(options.nowTime, startTime, endTime) && checkTag(options.qTags, qTags, options.mainTags, hexToDec(mainTags))){
                    	if(isDeliveryArea == 'Y') {
                    		array.push(val);
                    	}else if(!options.city){
                    		array.push(val);
                    	}else if(checkProvinceCode(options.provinceCode, provinceCode) && checkCityCode(options.cityCode, cityCode)){
                    		array.push(val);
                    	} else if(checkProvince(options.province, hexToDec(province), nprovince) && checkCity(options.city, hexToDec(city), ncity)) {
                    		array.push(val);
                    	}
                    	
                    }
                }
            }
            catch (e) {}
        });
        if(array.length === 0) {
        	return null;
        }
        return array;
    };
    
    // 润海广告
    var runhaiPut = function (data) {
    	var ele = this.document;
    	var $paramDiv = ele.querySelector('.paramDiv');
        var json = data.adList;
        var adUserId = data.adUserId;
        for (var key in json) {
        	var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_2000", "skip", "MIP_SY_2000_"+json[key].type]};
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
        	if (json[key].type === '1') {  // answerInfo feed 广告
        		var object = json[key];
        		var answerConNumber = parseInt($paramDiv.getAttribute('answerConNumber') || 0);
        		var goodNum = parseInt($paramDiv.getAttribute("goodLen") || 0);
        		var otherNum = parseInt($paramDiv.getAttribute("otherLen") || 0);
        		var answerTotal = goodNum + otherNum;
        		var numTotal = false;
        		if ((answerTotal == 1 && answerConNumber != 0 && answerConNumber < 170) || (answerTotal == 2 && answerConNumber != 0 && answerConNumber < 160)){
        			numTotal = true;
        		}
        		monthlyFeed1('.critics-list', adUserId, object, numTotal, baiduObj);
        		advLogInfoClick('.runhai_feed1 .href_log', $paramDiv, 'COOPERATE_RUNHAI');
        	}
        	else if(json[key].type === '2') {
        		var object = json[key];
        		monthlyZixun('.new-similar-dl', adUserId, object, baiduObj);
        		advLogInfoClick('.runhai_zixun .href_log', $paramDiv, 'COOPERATE_RUNHAI');
        	}
        	else if (json[key].type === '4') {
        		var object = json[key];
        		monthlyWenzhil('.wait_answer_question','everyone_wenzhil1', adUserId, object, baiduObj);
        		advLogInfoClick('.everyone_wenzhil1 .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
            else if (json[key].type === '5') {
            	var object = json[key];
            	monthlyFeed2('.hot-top',adUserId, object, baiduObj);
            	advLogInfoClick('.runhaiFeed2 .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
            else if (json[key].type === '3') {	// 热门推荐
                var obj = json[key];
                monthlyHotRecommend('.relative_kownlege', adUserId, obj, baiduObj);
                advLogInfoClick('.hot_recomd_div .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
            else if(json[key].type === '6') {
            	var object = json[key];
        		monthlyWenzhil('.everyone_notices_div', 'everyone_wenzhil2', adUserId, object, baiduObj);
        		advLogInfoClick('.everyone_wenzhil2 .href_log', $paramDiv, 'COOPERATE_RUNHAI');
            }
        }
    };
    
    var monthlyHotRecommend = function(clazz, adUserId, object, baiduObj) {
        var html = '<div class="hot-tui hot_recomd_div" >';
        html += '<h3>热门推荐<span class="icon-bai"></span></h3>';
        html += '<ul class="hot-tui-list href_log" uid="'+adUserId+'" href="'+object.picLink+'" '+baiduObj+' pos="'+object.type+'">';
        for(var i in object.adDetailList) {
        	html += '<li><mip-img class="mip-img" src="' + object.adDetailList[i].picUrl + '">';
        	html += '<p class="mip-img-subtitle">' + subStringIask(hexToDec(object.adDetailList[i].describe),8) + '</p>';
        	html += '</mip-img></li>';
        }
        html += '    </ul>';
        html += '</div>';
        $(clazz).after(html);
    };
    var monthlyFeed1 = function (clazz, adUserId, object, numTotal, baiduObj) {
    	var html = '<div class="m-yy-con runhai_feed1" >';
    	html += '<div class="href_log" uid="'+adUserId+'" href="'+object.picLink+'" pos="'+object.type+'" '+baiduObj+'>'
		html+='<h2 class="m-yy-title">'+subStringIask(hexToDec(object.title),24)+'</h2>';
		if (!numTotal){
			html+='<ul class="m-yy-list href_log" uid="'+adUserId+'" href="'+object.picLink+'" pos="'+object.type+'" '+baiduObj+'>';
			html+='<li><span class="feed-span"><mip-img src="'+object.picList[0]+'" class="mip-img"></mip-img></span></li>';
			html+='<li><span class="feed-span"><mip-img src="'+object.picList[1]+'" class="mip-img"></mip-img></span></li>';
			html+='<li><span class="feed-span"><mip-img src="'+object.picList[2]+'" class="mip-img"></mip-img></span></li>';
			html+='</ul>';
		}
		html+='<p class="m-yy-text">'+subStringIask(hexToDec(object.describe),60)+'</p>';
		html+='<div class="m-yy-info">';
		html+='<div class="m-left">';
		html+='<div class="m-user-img"><mip-img src="/static/images/w-v03/head_normal_50.png" class="mip-img"></mip-img></div>';
		html+='<span class="m-user-name">'+subStringIask(hexToDec(object.companyName),14)+'</span>';
		html+='<span class="time">1小时前</span>';
		html+='<span class="icon-tui">广告</span>';
		html+='</div>';
		html+='<span class="m-yy-link">查看详情</span>';
		html+='</div></div></div>';
		$(clazz).append(html);
    };
    var monthlyZixun = function (clazz, adUserId, object, baiduObj) {
		var html = '<div class="m-doc-con runhai_zixun">';
		html += '<i class="icon-feed-tui"></i>';
		html += '<h2 class="m-doc-title">'+hexToDec(object.title)+'</h2>';
		html += '<ul class="m-doc-list href_log" uid="'+adUserId+'" href='+object.picLink+'  pos="'+object.type+'" '+baiduObj+'>';
		for(var index in object.adDetailList) {
			var obj = object.adDetailList[index];
			html += '<li><div class="doc-item"><div class="doc-pic"><mip-img src="'+obj.picUrl+'" class="mip-img"></mip-img></div>';
			html += '<p class="doc-name">'+hexToDec(obj.name)+'</p><p class="doc-text">'+hexToDec(obj.describe)+'</p>';
			html += '<span class="btn-doc" >向TA提问</span></div></li>';
		}
		html += '</ul>';
		html += '</div>';
		$(clazz).after(html);
    };
    var monthlyFeed2 = function (clazz, adUserId, object, baiduObj) {
    	var html = '<div class="m-focus-tui-con runhaiFeed2" >';
		html += '<ul class="m-focus-tui-list href_log" href="'+ object.picLink+'" uid="'+adUserId+'"  pos="'+object.type+'" '+baiduObj+'>';
		for(var index in object.adDetailList){
			var obj = object.adDetailList[index];
			html += '<li><div class="pic-con">';
			
			html += '<mip-img src="'+obj.picUrl+'" class="mip-img"></mip-img></div><div class="text-con"><p class="text">'+hexToDec(obj.describe)+'</p>';
			html += '<span class="view-more">查看详情</span></div><i class="icon-feed-tui"></i></li>';
		}
		html += '</ul>';
		html += '</div>';
		$(clazz).after(html);
    };
    var monthlyWenzhil = function (clazz, clickClass, adUserId, object, baiduObj) {
    	var html = '<ul class="m-word-tui '+clickClass+' ">';
		for(var index in object.adDetailList){
			var obj = object.adDetailList[index];
			html += '<li class="href_log" uid="'+adUserId+'" href="'+object.adDetailList[0].picLink+'"   pos="'+object.type+'" '+baiduObj+'>'+hexToDec(obj.describe)+'<i class="icon-feed-tui"></i></li>';
		}
		html += '</ul>';
		$(clazz).after(html);
    };
    var adPut = function (val) {
        if (val === undefined) {
            return;
        }
        var adPosition = val.adPosition;
        var arry = adPosition.split(',');
        for (var i = 0; i < arry.length; i++) {
            callMethod(arry[i], val);
        }
    };
    var callMethod = function (tp, val) {
        try {
            if (tp === '1') {
                put1(val);
            } else if (tp === '2') {
                put2(val);
            } else if (tp === '3') {
                put3(val);
            }
        }
        catch (e) {}
    };
    var put1 = function (val) {
    	var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_202", "skip", "MIP_SY_202_sy1"]};
        var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
        putQiyeInfo(hexToDec(val.hospitalName), hexToDec(val.contacts), val.url, val.logo, baiduObj, '');
    };
    var put2 = function (val) {
    	var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_202", "skip", "MIP_SY_202_sy2"]};
    	var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
    	putQiyeInfo(hexToDec(val.hospitalName), hexToDec(val.contacts), val.url, val.logo, baiduObj, '');
    };
    var put3 = function (val) {
    	var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_202", "skip", "MIP_SY_202_sy2"]};
    	var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
    	var $that = document.querySelector('.mip_as_bottm_div');
    	$that.innerHTML = putMXfAd(val.url, val.mSuspensionImage, baiduObj, '');
    	advLogInfoClick('.mip_as_bottm_div .href_log', document.querySelector('.paramDiv'));
    };

    var hexToDec = function (str) {
    	try {
    		if (str.indexOf("\\u") != -1){
    			str = str.replace(/\\/g,"%");
    			return unescape(str);
    		}
    		return str;
    	} catch (e) {
    		return str;
    	}
    };
    var checkTime = function (nowTime, startTime, endTime) {
        if (startTime <= nowTime && nowTime < endTime) {
            return true;
        }
        return false;
    };
    var checkCity = function (city, putCity, nCity) {
        if(nCity.indexOf(city) != -1){
			return false;
		}
		if(putCity == '不限' || putCity == ''){
			return true;
		}
		var arrays = putCity.split(",");
		
		for (var i = 0; i < arrays.length; i++) {
			var arr = arrays[i];
			var arrsub = arr.substring(arr.length-1,arr.length);
			if (arrsub == "州" || arrsub == "县"){
				arr = arr.substring(0, arr.length-1);
			}
			if (city.indexOf(arr) != -1){
				return true;
			}
		}
		return putCity.indexOf(city) != -1?true:false;
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
    var checkProvinceCode = function(provinceCode, putProvinceCode){
    	if (provinceCode == "" || putProvinceCode == ""){
    		return false;
    	}
    	return putProvinceCode.indexOf(provinceCode) > -1 ? true : false;
    };
    var checkCityCode = function(cityCode, putCityCode) {
		if (cityCode == "" || putCityCode == ""){
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
    // 广告
    var currencyAM = function (sourceType, openId, questionId, version) {
        loadAd(sourceType, openId, questionId, version);
        advLogInfo(sourceType, 0);
    };
    var southnetwork = function (openId) {
    	var ele = this.document;
    	var $thatHotList = ele.querySelector('.hot-tui-list');
    	var $thatHotDiv = ele.querySelector('.hot_recomd_div');
    	var $that = ele.querySelector('.mip_as_bottm_div');
        var url = 'https://imgv2-ssl.g3user.com/api/iask.php?uid=' + openId + '&type=m&callback=?';
        try {
            $.getJSON(url, function (data) {
            	removeBaiduAd();
                var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_100", "skip", "MIP_SY_100_sj"]};
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                var htmls = putMXfAd(data.mobile.link, data.mobile.pic, baiduObj, '');
            	$that.innerHTML = htmls;
                putQiyeInfo(data.logo.brand, data.logo.intro, data.logo.link, data.logo.pic, baiduObj, '');
                advLogInfoClick('.mip_as_bottm_div .href_log', document.querySelector('.paramDiv'));
                if(data.feed !== null && data.feed.length > 0) {
                	var str = '';
                	for(var index in data.feed) {
                		var picLink = data.feed[index].link;
                		var picUrl = data.feed[index].pic;
                		var picDesc = data.feed[index].title;
                		str += hotRecommend(picLink, picUrl, picDesc, baiduObj, '');
                	}
                	$thatHotList.innerHTML = str;
                	addClass($thatHotDiv, 'show');
                	advLogInfoClick('.hot-tui-list .href_log', document.querySelector('.paramDiv'));
                }
                advLogInfo('COOPERATE_SOUTHNETWORK', 0);
                loadStatsToken();
            });
        }
        catch (e) {}
    };
    
    // 商业效果广告
    var effectAvertisement = function (questionId, sourceType) {
        ipLoad(function (data) {
            var provinceCode = data.provinceCode;
            var url = 'https://mipp.iask.cn/mib/tag/test?q=' + questionId + '&c=' + provinceCode;
            try {
                $.getJSON(url, function (res) {
                    if (res.jsonData != null) {
                        advEffectCallBack(res.jsonData);
                        advLogInfo(sourceType, 0);
                        loadStatsToken();
                    } else {
                    	advLogInfo('', 0);
                    }
                });
            }
            catch (e) {
            }
        });
    };
    var advEffectCallBack = function (dd) {
    	var ele = this.document;
    	var $that = ele.querySelector('.paramDiv');
    	var $thatDiv = ele.querySelector('.baidu_label_div');
        var list = dd.materialList;
        var ve = dd.version;
        var channelCode = dd.channelCode;
        $that.setAttribute('uid', dd.userId);
        if ("2" !== ve) {
        	// 如果不是标准版，则删除百度广告
        	removeBaiduAd();
        }
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if (ve === '1') {
                showEffectAdv(obj, 1, channelCode);
            }
            else if (ve === '2') {
                showEffectAdv(obj, 2, channelCode);
            }
			else {
                showEffectAdv(obj, 3, channelCode);
            }
        }
        var baiduStr = {"type":"load", "data":["_setPageTag", "MIP_SY_700", "skip", "MIP_SY_效果广告"]};
        var baiduObj = '<div data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '" ></div>';
        $thatDiv.innerHTML = baiduObj;
    };
    var showEffectAdv = function (json, tp, channelCode) {
    	var ele = this.document;
    	var $that = ele.querySelector('.mip_as_bottm_div');
    	var $thatParam = ele.querySelector('.paramDiv');
        if (json.adType === '3') {
            var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_700", "skip", "MIP_SY_700_" + tp + "_qiye"]};
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var brandLink = '';
            var uid = $thatParam.getAttribute('uid');
            if('10002' === channelCode) {
            	brandLink = json.materialLink;  // 南方网通效果广告-链接跳转自己的物料链接
            }
            else {
            	brandLink = 'http://m.iask.sina.com.cn/brand/' + uid + '.html';
            }
            putBrandQiyeInfo(json.brandName, json.shortIntroduce, json.materialLink, json.materialImg, baiduObj, '', brandLink);
            return;
        }
        if (json.adType === '2') {
            return;
        }
        // 旗舰版feed
        if (json.adType === '5') {
            var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_700", "skip", "MIP_SY_700_" + tp + "_feed"]};
            var materialImg = json.materialImg;
            var picList = materialImg.split(',');
            var picUrl = 'http://tp2.sinaimg.cn/1169181841/50/0/1';
            feedInfo(encodeURIStr(baiduStr), picUrl, json.brandName, json.shortIntroduce, json.materialIntroduce, json.materialLink, picList, '');
            return;
        }
        // 旗舰版-顶部悬浮
        if (json.materialType === '5' && tp === 1) {
            var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_700", "skip", "MIP_SY_700_" + tp + "_top"]};
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj, '');
            $that.innerHTML = htmls;
            advLogInfoClick('.mip_as_bottm_div .href_log', document.querySelector('.paramDiv'));
            return;
        }
        // 标准版顶部悬浮
        if (json.materialType === '5' && tp === 2) {
            var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_700", "skip", "MIP_SY_700_" + tp + "_top"]};
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj, '');
            $that.innerHTML = htmls;
            advLogInfoClick('.mip_as_bottm_div .href_log', document.querySelector('.paramDiv'));
            return;
        }
        // 专业版-顶部悬浮
        if (json.materialType === '5' && tp === 3) {
            var baiduStr = {"type":"click", "data":["_trackEvent", "MIP_SY_700", "skip", "MIP_SY_700_" + tp + "_top"]};
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj, '');
            $that.innerHTML = htmls;
            advLogInfoClick('.mip_as_bottm_div .href_log', document.querySelector('.paramDiv'));
            return;
        }
    };
    var brandAvertisement = function (sourceType) {
        advLogInfo(sourceType, 0);
        advLogInfoClick('.href_log', document.querySelector('.paramDiv'));
        loadStatsToken();
    };
    // 保险广告
    var iAskDisplayHtml = {
        iaskCallMethod: function (opts) {
            var type = opts.type;
            var dsbo = this.iaskInsuranceLabel(type);
            if (type === '1') {
                this.topSuspension(opts, dsbo);		// 顶部悬浮
            }
            else if (type === '2') {
                this.answerInfo(opts, dsbo);			// 企业信息
            }
            else if (type === '3') {
                this.imageTel(opts, dsbo);
            }
            else if (type === '4') {
                this.hot(opts, dsbo);	   // 热门推荐
            }
            else if (type === '5') {
                this.feed(opts, dsbo);			// feed 广告
            }
            else if (type === '6') {
                this.wenzilian(opts, dsbo);	// 文字链接
            }
            else if (type === '7') {
                this.tuijian(opts, dsbo);	// 推荐
            }
            else if (type === '8') {
                this.info(opts, dsbo);
            }
        },
        getUUid: function () {  // 随机ID
            return 'iAsk-uuid-' + Math.random().toString(36).slice(2);
        },
        topSuspension: function (opts, dsbo) {
        	var $that = document.querySelector('.mip_as_bottm_div');
        	var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
        	$that.innerHTML = putMXfAdTel(opts.phone, opts.mPicUrl, statsBaidu, opts.type);
        	advLogInfoClick('.mip_as_bottm_div .href_log', document.querySelector('.paramDiv'));
        },
        answerInfo: function (opts, dsbo) {
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            putBaoXiangQiyeInfo(opts.phone, 'http://pic.iask.cn/fimg/1508386968_1196.jpg', statsBaidu, opts.type);
        },
        feed: function (opts, dsbo) {
            var object = this.conversionsObject(opts);
            feedInfo(dsbo, object.picUrl, object.companyName, object.title, object.describe, object.picLink, object.picList, object.type);
        },
        hot: function (opts, dsbo) {
        	var $that = document.querySelector('.hot-tui-list');
        	var $thatDiv = document.querySelector('.hot_recomd_div');
            var object = this.conversionsObject(opts);
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var str = '';
            for (var pic in object.adDetailList) {
                var picUrl = object.adDetailList[pic].picUrl;
                var describe = object.adDetailList[pic].describe;
                str += hotRecommend(object.picLink, picUrl, describe, statsBaidu, object.type);
            }
            $that.innerHTML = str;
            $($thatDiv).addClass("show");
            advLogInfoClick('.hot-tui-list .href_log', document.querySelector('.paramDiv'));
        },
        tuijian: function (opts, dsbo) {
        	var $that = document.querySelector('.wj_relative_kownlege');
        	var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var object = this.conversionsObject(opts);
            var html = '<div class="api-pic-con" url="' + object.picLink + '" pos="' + object.type + '"';
            html += 'czctype="' + object.czctype + '" czcskip="skip" czcintroduce="' + object.czcintroduce + '">';
            html += '<h2 class="api-pic-title">为您推荐<span class="icon-bai"></span></h2>';
            html += '<ul class="api-pic-list">';
            html += '<li><div class="href_log" href="' + object.adDetailList[0].picLink + '" pos="' + object.type + '" ' + statsBaidu + '>';
            html += '<mip-img class=\'mip-img\' src="' + object.adDetailList[0].picUrl + '"></mip-img>';
            html += '<p class=\'mip-img-subtitle\'>' + object.adDetailList[0].describe + '</p></div></li>';
            html += '<li><div class="href_log" href="' + object.adDetailList[1].picLink + '" pos="' + object.type + '" ' + statsBaidu + '>';
            html += '<mip-img class=\'mip-img\' src="' + object.adDetailList[1].picUrl + '"></mip-img>';
            html += '<p class=\'mip-img-subtitle\'>' + object.adDetailList[1].describe + '</p></div></li>';
            html += '<li><div class="href_log" href="' + object.adDetailList[2].picLink + '" pos="' + object.type + '" ' + statsBaidu + '>';
            html += '<mip-img class=\'mip-img\' src="' + object.adDetailList[2].picUrl + '"></mip-img>';
            html += '<p class=\'mip-img-subtitle\'>' + object.adDetailList[2].describe + '</p></div></li>';
            html += '</ul></div>';
            $that.innerHTML = html;
            advLogInfoClick('.wj_relative_kownlege .href_log', document.querySelector('.paramDiv'));
        },
        wenzilian: function (opts, dsbo) {
        	var $that = document.querySelector('.wj_wait_question_as');
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var object = this.conversionsObject(opts);
            var html = '<ul class="answer-list mt0">';
            html += '<li><a class="href_log" target=\'_blank\'  pos="' + object.type + '" ';
            html += 'href="' + object.adDetailList[0].picLink + '" ' + statsBaidu + '>';
            html += subStringIask(object.adDetailList[0].describe, 8) + '</a></li>';
            html += '<li><a class="href_log" target=\'_blank\'  pos="' + object.type + '"';
            html += 'href="' + object.adDetailList[1].picLink + '" ' + statsBaidu + '>';
            html += subStringIask(object.adDetailList[1].describe, 8) + '</a></li>';
            html += '<li><a class="href_log" target=\'_blank\'  pos="' + object.type + '"';
            html += 'href="' + object.adDetailList[2].picLink + '" ' + statsBaidu + '>';
            html += subStringIask(object.adDetailList[2].describe, 8) + '</a>';
            html += '<span class="recommend-txtlink-tui2 fr"><span class="icon-bai"></span></li>';
            html += '</ul>';
            $that.innerHTML = html;
            addClass($that, 'background-color-eee');
            advLogInfoClick('.wj_wait_question_as .href_log', document.querySelector('.paramDiv'));
        },
        image: function (opts, dsbo) {
        	var $that = document.querySelector('.wj_djgz_as');
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var object = this.conversionsObject(opts);
            var html = '<div class="api-pic-con href_log" href="' + object.picLink + '"';
            html += 'pos="' + object.type + '" ' + statsBaidu + '>';
            html += '<mip-img class="mip-img height105" src="' + object.mpicUrl + '">';
            html += '</mip-img><span class=\'icon-tui\'>广告</span></div>';
            $that.innerHTML = html;
            advLogInfoClick('.wj_djgz_as .href_log', document.querySelector('.paramDiv'));
        },
        imageTel: function (opts, dsbo) {
        	var $that = document.querySelector('.wj_djgz_as');
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var object = this.conversionsObject(opts);
            var html = '<div class="api-pic-con"'+ statsBaidu + '><a href="tel:' + object.picLink + '">';
            html += '<mip-img class="mip-img height105" src="' + object.mpicUrl + '">';
            html += '</mip-img><span class=\'icon-tui\'>广告</span></a></div>';
            $that.innerHTML = html;
            advLogInfoClick('.wj_djgz_as .href_log', document.querySelector('.paramDiv'));
        },
        info: function (opts, dsbo) {
        	var $that = document.querySelector('.wj_hot_top_as');
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var object = this.conversionsObject(opts);
            var html = '<div class="recommend-me-main recoTYmain" url="' + object.picLink + '"';
            html += 'pos="' + object.type + '" czctype="' + object.czctype + '" czcskip="skip"';
            html += 'czcintroduce="' + object.czcintroduce + '">';
            html += '<ul class="recommend-me-ul">';
            html += '<li class="recommend-me-txt fl">';
            html += '<p class=\'recommend-me-tatle\'> <a class="href_log" target=\'_blank\'';
            html += 'href=' + object.picLink + ' pos="' + object.type + '"';
            html += statsBaidu + '>' + object.title + '</a></p>';
            html += '<p class="recommend-me-link"><span><a class="href_log" target=\'_blank\'';
            html += 'href="' + object.picLink + '" pos="' + object.type + '" ' + statsBaidu + '>';
            html += '查看详情 &gt;</a></span><span class="recommend-me-tui2 fr"><span class="icon-bai"></span></span></p>';
            html += '</li>';
            html += '<li class="recommend-me-img fl"><mip-img class="mip-img"';
            html += 'src="' + object.picUrl + '"></mip-img></li>';
            html += '</ul></div>';
            $that.innerHTML = html;
            advLogInfoClick('.wj_hot_top_as .href_log', document.querySelector('.paramDiv'));
        },
        iaskInsuranceLabel: function (type) {
        	var $that = document.querySelectorAll('.iaskInsuranceDsbo')[0];
            var dsbo = $that.getAttribute('dsbo');
            return dsbo.replace('number', type);
        },
        conversionsObject: function (opts) {
            var nObject = opts;
            nObject.title = opts.title || '';
            nObject.picLink  = opts.picLink  || '';
            nObject.picList  = opts.picList  || {};
            nObject.describe = opts.describe || '';
            nObject.picUrl   = opts.picUrl || '';
            nObject.mpicUrl  = opts.mpicUrl || opts.picUrl || '';
            nObject.phone    = opts.phone || '';
            nObject.czctype  = 'MIP_SY_901';
            nObject.czcintroduce  = 'MIP_SY_901_' + opts.type;
            nObject.companyName = opts.companyName  || '';
            nObject.pos  = opts.pos || '';
            
            return nObject;
        }
    };
    var iaskInsurance = function (data) {
    	var ele = this.document;
    	var $that = ele.querySelector('.paramDiv');
    	$that.setAttribute('sources', 'COOPERATE_BAOXIAN');
        try {
            var base = new Base64();
            var res = $.parseJSON(data);
            var json = null;
            if (res.succ === 'Y') {
                json = $.parseJSON(base.decode(res.html));
            }
            else {
                return;
            }
            var url = json.website;
            // 去掉百度广告
            removeBaiduAd();
            for (var index in json.adList) {
                var obj = json.adList[index];
                obj.website = url;
                iAskDisplayHtml.iaskCallMethod(obj);
            }
            if (typeof data.successCallBack === 'function') {
                data.successCallBack();
            }
            // 给点击事件做来源
            advLogInfo('COOPERATE_BAOXIAN', 0);
            loadStatsToken();
        }
        catch (e) {
        	console.log(e);
            if (typeof data.failCallBack === 'function') {
                data.failCallBack();
            }
        }
    };
    // 选择投放广告
    var selectAS = function () {
    	var ele = this.document;
    	var $thatParam = ele.querySelector('.paramDiv');
    	var $thatHover = ele.querySelector('.commercialStandardHover');
    	var $thatQiye = ele.querySelector('.commercialStandard_qiye_cp');
    	var sourceType = $thatParam.getAttribute('sources');
        var sources = $thatParam.getAttribute("sysources") == null ? sourceType : $thatParam.getAttribute("sysources");
        var version = $thatParam.getAttribute('syversion') == null ? $thatParam.getAttribute('version') : $thatParam.getAttribute('syversion');
        var openId = $thatParam.getAttribute('openId');
        var tags = $thatParam.getAttribute('tags');
        var params = $thatParam.getAttribute('params');
        var mainTags  = $thatParam.getAttribute('maintags');
        var questionId = $thatParam.getAttribute('qid');
        var qcid = $thatParam.getAttribute('qcid');
        if (sources === 'COMMERCIAL_IAD' || sources === 'COMMERCIAL_ZWZD' || sources === 'COMMERCIAL_CAD') {
            // 商业广告
            removeBaiduAd();
            busBottomAM();
            if (sources === 'COMMERCIAL_ZWZD') {
                sources = 'COOPERATE_COMMERCIAL';
            }
            advLogInfo(sources, 0);
        }
        else if ((sources === 'COOPERATE_BRAND' || sources === 'COOPERATE_BRAND_MARKET')
        		&& (version === '1' || version === '3')) {
            // 商业广告-旗舰版、专业版本
            brandAvertisement(sources);
        }
        else if (sourceType === 'COOPERATE_BRAND' && version === '2') {
            // 商业广告-标准版
        	$thatParam.setAttribute('sources', 'COOPERATE_BRAND');
            commercialSqc($thatQiye, $thatHover);
            advLogInfo('COOPERATE_BRAND', 0);
            advLogInfoClick('.mip_as_bottm_div .href_log', ele.querySelector('.paramDiv'));
            loadStatsToken();
        }
        else if (sourceType === 'COOPERATE_HUASHENG' || sourceType === 'COOPERATE_HUASHENG_QA'
        	|| sourceType === 'COOPERATE_YOULAI' || sourceType === 'COOPERATE_TIANZHU' 
        	|| sourceType === 'COOPERATE_BRAND_MARKET' || sourceType === 'COOPERATE_SOULE' || sourceType === 'COOPERATE_HUAXIN') {
            // 第三方合作广告
            if (sourceType === 'COOPERATE_YOULAI' || sourceType === 'COOPERATE_TIANZHU'
            	|| sourceType === 'COOPERATE_SOULE' || sourceType === 'COOPERATE_HUAXIN'
            	|| (sourceType === 'COOPERATE_BRAND_MARKET' && version === '4')) {
                // 需要删除百度广告
                removeBaiduAd();
            }
            currencyAM(sourceType, openId, questionId, version);
        }
        else if (sourceType === 'COOPERATE_SOUTHNETWORK') {
            // 南方网通广告
            southnetwork(openId);
        }
        else if ('82' === qcid && (mainTags.indexOf('意外险') > -1
        || mainTags.indexOf('品牌词') > -1 || mainTags.indexOf('少儿险') > -1
        || mainTags.indexOf('重疾险') > -1 || mainTags.indexOf('保险') > -1)) {
            var nowTime = getSysTime();
            var startTime = ele.querySelectorAll('.bxStartTime')[0].innerText;
            var endTime   = ele.querySelectorAll('.bxEndTime')[0].innerText;
            if (startTime <= nowTime && nowTime < endTime) {
                // 商业广告-保险标签投放
                var url = 'https://mipp.iask.cn/t/wlsh?type=BX&bxt=';
                if (mainTags.indexOf('少儿险') > -1) {
                    url += 'jl';
                }
                else if (mainTags.indexOf('品牌词') > -1 || mainTags.indexOf('意外险') > -1 || mainTags.indexOf('保险') > -1) {
                    url += 'at';
                }
                else if (mainTags.indexOf('重疾险') > -1) {
                    url += 'il';
                }
                $.get(url, function (data) {
                    iaskInsurance(data);
                });
            }
        }
        else if (sourceType !== 'COOPERATE_HUASHENG' && sourceType !== 'COOPERATE_HUASHENG_QA') {
        	var $thatLog = ele.querySelectorAll('.href_log');
            if (tags) {
            	sourceType = 'COOPERATE_HUASHENG_BY';
                $thatParam.setAttribute('sources', sourceType);
                loadURLJS(tags, params, sourceType, questionId, $thatParam, $thatLog);
            }
        }
    };
    
    var selectCommercail = function() {
    	var ele = this.document;
    	var $thatDiv = ele.querySelectorAll('.mip_as_bottm_div');
    	var $that = ele.querySelectorAll('.paramDiv');
        if (validatePut()) {
            var nowTime = getSysTime();
            var startTime = ele.querySelector('.yongyouStartTime').innerText;
            var endTime   = ele.querySelector('.yongyouEndTime').innerText;
            if (startTime <= nowTime && nowTime < endTime) {
                // 删除百度广告
                removeBaiduAd();
                var putUrl = ele.querySelector('.yongyouPutUrl').innerText;
                var picUrl = ele.querySelector('.yongyouPicUrl').innerText;
                $thatDiv.append(putTestButHtml(putUrl, picUrl));
                var urlr = 'https://mipp.iask.cn/t/mipdf?t=yongyou';
                $.ajax({
                    type: 'GET',
                    url: urlr,
                    dataType: 'html',
                    success: function (data) {
                        if (!!data) {
                        	ele.querySelector('.breadcast_middle_commercial').innerHTML = '';
                        	ele.querySelectorAll('.breadcast_middle_commercial').innerHTML = data;
                            advLogInfoClick('.breadcast_middle_commercial .href_log', ele.querySelector('.paramDiv'));
                        }
                    }
                });
                var sources = $that.getAttribute('sources');
                advLogInfo(sources, 0);
                loadStatsToken();
            }
        }
        
    };
    var effects = {
            newLoadAd: function () {
                selectAS();
            },
            commercialLoad: function () {
            	selectCommercail();
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

