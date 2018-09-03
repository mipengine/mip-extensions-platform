/**
 * @file mip-blog-tgb 组件
 * @author
 */

define(function (require) {
    'use strict';
    var userID = '';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var ssoPath = '';
    var sessionUserID = '';
    var sessionRole = '';
    var blogerName = '';
    var element = '';
    var addtopicID = '';
    // String.prototype.trim = function() {
    //     return this.replace(/(^\s*)|(\s*$)/g, "");
    // };
    function sendReq(method, siteUrl, data, callback) {
        $.ajax({
            type: method,
            cache: false,
            dataType: 'json',
            data: data,
            url: encodeURI(siteUrl),
            success: function (data) {
                if (data.status) {
                    callback(data);
                } else {
                    alert(data.errorMessage);
                }
            },
            error: function (error) {}
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element2 = this.element;
        element = element2;
        userID = element.getAttribute('userID') || '';
        ssoPath = element.getAttribute('ssoPath') || '';
        sessionUserID = element.getAttribute('sessionUserID') || '';
        sessionRole = element.getAttribute('sessionRole') || '';
        blogerName = element.getAttribute('blogerName') || '';
        $('#mbokeTitleBlog', element).click(function () {
            $('.Mboke_content', element).hide();
            $('.Mboke_title', element).removeClass('Mboke_title_active');
            $(this).addClass('Mboke_title_active');
            $('.indexContent', element).show();
        });
        // 近期讨论个股
        $('#mbokeTitleStock', element).click(function () {
            $('.Mboke_content', element).hide();
            $('.Mboke_title', element).removeClass('Mboke_title_active');
            $(this).addClass('Mboke_title_active');
            $('.geguContent', element).show();
            jQajax();
        });
        // 热文推荐栏目点击事件
        $('#mbokeTitleRe', element).click(function () {
            $('.Mboke_content', element).hide();
            $('.Mboke_title', element).removeClass('Mboke_title_active');
            $(this).addClass('Mboke_title_active');
            $('.hotContent', element).show();
            hotAjax();
            zanPlClickb();
        });
        zanPlClick();
        var bkUrl = window.top.location.href;
        // bkUrl='http://m.taoguba.yl/mip/blog/4132';
        var bkuserID = bkUrl.split('blog/')[1];
        $.ajax({
            url: '/blogUseMsg?userID=' + bkuserID,
            dataType: 'json',
            async: false,
            success: function (data) {
                var dto = data.dto;
                $('.BKjy', element).text(dto.allNum);
                $('.BKgz', element).text(dto.totalFollowNum);
                $('.BKfs', element).text(dto.totalFansNum);
                var userId = $('.Mboke').attr('data-id');
                // alert( $('.BKjy', element).text());
                if (bkuserID !== userId) {
                    if (dto.focusType === 'Y') {
                        $('.BKgz_btn', element).html(
                        '<div class="Mboke_userGZ mhasGZ"    id="delFriendDiv">已关注 </div>');
                    } else {
                        $('.BKgz_btn', element).html(
                        '<div class="Mboke_userGZ munGZ"  id="addGoodFriendDiv"  >关注</div>');
                    }
                }
            }
        });
        // 关注
        $('#addGoodFriendDiv', element).click(function () {
            addGoodFriend();
        });
        // 取消关注
        $('#delFriendDiv', element).click(function () {
            delFriend();
        });
        $('.yzBox_Off', element).click(function () {
            offYZ();
        });
        $('#yzInfo_R', element).click(function () {
            addFriendInfo();
        });
        // 确定
        $('#focusYes', element).click(function () {
            focusYes();
        });
        // 取消
        $('#focusNo', element).click(function () {
            focusNo();
        });
        // 登录头像更换
    };
    function zanPlClick() {
        // 博客首页和热文推荐点赞
        $('.addUsefulClick', element).click(function () {
            var flag = 'S';
            if (sessionUserID === null || sessionUserID === '') {
                flag = 'F';
            } else if (sessionRole !== null && sessionRole === 'noActive') {
                flag = 'T';
            } else {
                flag = 'S';
            }
            var Zannum = '0';
            var topic = 'T';
            var ridID = $(this).attr('name');
            addUseful(ridID, Zannum, topic, flag);
        });
        $('.contentBtnClick', element).click(function () {
            // 判断是否登陆
            isLogin();
            var rID = $(this).attr('name');
            articleMopenAPP(rID, 0);
        });
    }
    function zanPlClickb() {
        // 博客首页和热文推荐点赞
        $('.addUsefulClickb', element).click(function () {
            var flag = 'S';
            if (sessionUserID === null || sessionUserID === '') {
                flag = 'F';
            } else if (sessionRole !== null && sessionRole === 'noActive') {
                flag = 'T';
            } else {
                flag = 'S';
            }
            var Zannum = '0';
            var topic = 'T';
            var ridID = $(this).attr('name');
            addUseful(ridID, Zannum, topic, flag);
        });
        $('.contentBtnClickb', element).click(function () {
            // 判断是否登陆
            isLogin();
            var rID = $(this).attr('name');
            articleMopenAPP(rID, 0);
        });
    }
    function zanPlClickc() {
        // 博客首页和热文推荐点赞
        $('.addUsefulClickc', element).click(function () {
            var flag = 'S';
            if (sessionUserID === null || sessionUserID === '') {
                flag = 'F';
            } else if (sessionRole !== null && sessionRole === 'noActive') {
                flag = 'T';
            } else {
                flag = 'S';
            }
            var Zannum = '0';
            var topic = 'T';
            var ridID = $(this).attr('name');
            addUseful(ridID, Zannum, topic, flag);
        });
        $('.contentBtnClickc', element).click(function () {
            // 判断是否登陆
            isLogin();
            var rID = $(this).attr('name');
            articleMopenAPP(rID, 0);
        });
    }
    // 热文推荐
    function hotAjax() {
        $.ajax({
            type: 'GET',
            url: '/mGetUseFulList',
            dataType: 'json',
            async: false,
            success: function (data) {
                var arr = data.dto;
                var str = '';
                for (var i = 0; i < arr.length; i++) {
                    str += '  <div class="hotContentItem">';
                    str += '  <div>';
                    str += '  <div class="Head left">';
                    str += '  <a class="HeadInfo left" href="/blog/' + arr[i].userID + '">';
                    str += '  <mip-img    layout="responsive" width="100" height="100" src="https://image.taoguba.com.cn/img/';
                    str += arr[i].portrait + '" alt="" class="HeadInfo_img"></mip-img>';
                    if (Number(arr[i].auth) === 55) {
                        str += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/daV.png" alt="" class="HeadIndo_dav"></mip-img>';
                    }
                    str += '  </a>';
                    str += '   <a class="HeadInfo_name left" href="/blog/';
                    str += arr[i].userID + '">' + arr[i].userName + '</a>';
                    if (arr[i].auth > 0) {
                        str += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/VIP.png" alt="" class="Mboke_usergrade2"></mip-img>';
                    }
                    str += '  </div>';
                    str += '  <span class="content_time right">' + getTime1(arr[i].postDate) + '发布主贴</span>';
                    str += '  <div class="clear"></div>';
                    str += '   </div>';
                    str += '   <a class="contentTitle" href="/Article/';
                    str += arr[i].topicID + '/1">' + arr[i].subject + '</a>';
                    str += '    <a class="content_text" href="/Article/' + arr[i].topicID + '/1">';
                    str += '      【摘要】' + arr[i].content;
                    str += '   </a>';
                    str += '  <div class="contentBtns">';
                    str += '   <div class="contentBtn left zanBtn  addUsefulClickb"   name="' + arr[i].topicID + '">';
                    str += '    <mip-img src="https://css.taoguba.com.cn/images/mNew/zan.png" class="img1" alt=""></mip-img>';
                    str += '    <span  class="contentBtns_span">赞(' + arr[i].usefulNum + ')</span>';
                    str += '    </div>';
                    str += '   <div class="contentBtn left viewBtn">';
                    str += '    <mip-img src="https://css.taoguba.com.cn/images/mNew/liulan.png" class="img2" alt=""></mip-img>';
                    str += '    <span  class="viewBtn_span">浏览(' + arr[i].totalViewNum + ')</span>';
                    str += '  </div>';
                    str += '  <div class="contentBtn left plBtn  contentBtnClickb"   name="' + arr[i].topicID + '">';
                    str += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/pinglun.png" class="img3" alt=""></mip-img>';
                    str += '  <span  class="plBtn_span">评论(' + arr[i].totalReplyNum + ')</span>';
                    str += '  </div>';
                    str += '  <div class="clear"></div>';
                    str += '  </div> </div>';
                }
                $('.hotContentItems', element).html(str);
            }
        });
    }
    function getTime1(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var H = date.getHours();
        if (H < 10) {
            H = '0' + H;
        }
        var m = date.getMinutes();
        if (m < 10) {
            m = '0' + m;
        }
        var result = year + '-' + month + '-' + day + '   ' + H + ':' + m;
        return result;
    }
    // 判断是否登录
    function isLogin() {
        var isLogin = userID;
        if (Number(isLogin) === 0) {
            window.top.location.href = ssoPath + '/m/login/index';
        } else {
            return;
        }
    }
    // 添加好友名单
    function addGoodFriend() {
        isLogin();
        var getName = $('.Mboke_username', element).text();
        var baseurl = $('.div_head_data', element).attr('id');
        var url = baseurl + 'mAddFriend?userName=' + getName;
        sendReq('get', url, '', getReturnGood);
    }
    function getReturnGood(obj) {
        var str = obj.dto;
        if (str.type !== 'error') {
            if (str.type === '3') {
                var msg = '已经在您的关注列表中了';
                showMessage(msg);
            }
            if (str.type === '4') {
                var msg = '已经在您的黑名单列表中了';
                showMessage(msg);
            }
            if (str.type === '5') {
                var msg = '您在此用户的黑名单列表中了';
                showMessage(msg);
            }
            if (str.type === 'N') {
                var msg = '对方不允许添加';
                showMessage(msg);
            }
            if (str.type === 'SF') {
                var msg = '报歉，您因违反社区规则，此功能暂时不能用。';
                showMessage(msg);
            }
            if (str.type === 'F') {
                var msg = '由于对方ID被封,您不能关注他!';
                showMessage(msg);
            }
            if (str.type === 'TM') {
                var msg = '关注超过2000个，无法再添加';
                showMessage(msg);
            }
            if (str.type === 'R') {
                $('.yzBox').show();
            }
            if (str.type === 'Y') {
                var msg = '恭喜您！关注成功';
                showMessage(msg);

            }
            if (str.type === 'EN') {
                var msg = '不存在此用户';
                showMessage(msg);
            }
            if (str.type === 'EF') {
                var msg = '您不能关注自己';
                showMessage(msg);
            }
        } else {
            var msg = '出错啦';
            showMessage(msg);
        }
    }
    // 删除好友
    function delFriend() {
        $('.focusBox', element).show();
    }
    function focusNo() {
        $('.focusBox', element).hide();
    }
    function getReturnDel(obj) {
        var message = document.getElementById('message');
        var str = obj.dto;
        if (str.type !== 'error') {
            if (str.type === 'Y') {
                var msg = '取消成功';
                showMessage(msg);
                setTimeout(function () {
                    window.location.reload();
                },
                1000);
            }
        }
    }
    function getReturnOrder(obj) {
        var message = document.getElementById('message');
        var str = obj.dto;
        if (str.type === 'error') {
            var msg = '出错了，请联系股天乐';
            showMessage(msg);
        } else if (str.type === 'EN') {
            var msg = '用户名不存在';
            showMessage(msg);
        } else if (str.type === 'E') {
            var msg = '已经存在';
            showMessage(msg);
        } else if (str.type === 'EF') {
            var msg = '不能关注自己';
            showMessage(msg);
        } else if (str.type === 'Y') {
            var msg = '添加成功！';
            $('.Mboke_userGZ').text('已关注').removeClass('munGZ').addClass('mhasGZ');
        } else if (str.type === 'nopoint') {
            var msg = '积分不足，请到PC版上充值，谢谢';
            showMessage(msg);
        }
    }
    function showMessage(msg) {
        $('#message', element).show().text(msg);
        setTimeout(function () {
            $('#message', element).hide();
        },
        2000);
    }
    function offYZ() {
        $('.yzBox', element).hide();
    }
    // 博客首页下拉加载更多
    function bkAjax(page) {
        var url = window.top.location.href;
        var userID = url.split('/blog/')[1];
        $.ajax({
            type: 'GET',
            url: '/mBlogTopicAjax?userID=' + userID + '&sortFlag=W&pageNo=' + page,
            dataType: 'json',
            async: false,
            success: function (data) {
                var portrait = $('.Mboke_userimg', element).attr('src');
                var arr = data.dto.listTopic;
                var Auth = $('.Mboke_userHead', element).attr('data-auth');
                var str = '';
                for (var i = 0; i < arr.length; i++) {
                    str += '  <div class="indexContentItem">';
                    str += '  <div>';
                    str += '  <div class="Head left">';
                    str += '  <div class="HeadInfo left">';
                    str += '  <mip-img src="' + portrait;
                    str += '" alt="" class="HeadInfo_img"  layout="responsive" width="100" height="100"></mip-img>';
                    if (Number(Auth) === 55) {
                        str += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/daV.png" alt="" class="HeadIndo_dav"></mip-img>';
                    }
                    str += '  </div>';
                    str += '   <span class="HeadInfo_name left">' + arr[i].userName + '</span>';
                    if (Auth > 0) {
                        str += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/VIP.png" alt="" class="Mboke_usergrade2 left"></mip-img>';
                    }
                    str += '  </div>';
                    str += '  <span class="content_time right">' + getTime1(arr[i].postDate) + '发布主贴</span>';
                    str += '  <div class="clear"></div>';
                    str += '   </div>';
                    str += '   <a class="contentTitle" href="/Article/';
                    str += arr[i].topicID + '/1">' + arr[i].subject + '</a>';
                    str += '    <a class="content_text" href="/Article/' + arr[i].topicID + '/1">';
                    str += '      【摘要】' + arr[i].content;
                    str += '   </a>';
                    str += '  <div class="contentBtns">';
                    var flag = 'S';
                    if (sessionUserID === null || sessionUserID === '') {
                        flag = 'F';
                    } else if (sessionRole !== null && sessionRole === 'noActive') {
                        flag = 'T';
                    } else {
                        flag = 'S';
                    }
                    var ridID = arr[i].topicID;
                    var Zannum = '0';
                    var topic = 'T';
                    str += '   <div class="contentBtn left zanBtn  addUsefulClickc"  name="' + ridID + '">';
                    str += '    <mip-img src="https://css.taoguba.com.cn/images/mNew/zan.png" class="img1" alt=""></mip-img>';
                    str += '    <span class="contentBtns_span">赞(' + arr[i].usefulNum + ')</span>';
                    str += '    </div>';
                    str += '   <div class="contentBtn left viewBtn">';
                    str += '    <mip-img src="https://css.taoguba.com.cn/images/mNew/liulan.png" class="img2" alt=""></mip-img>';
                    str += '    <span  class="viewBtn_span">浏览(' + arr[i].totalViewNum + ')</span>';
                    str += '  </div>';
                    str += '  <div class="contentBtn left plBtn contentBtnClickc"  name="' + ridID + '" >';
                    str += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/pinglun.png" class="img3" alt=""></mip-img>';
                    str += '  <span  class="plBtn_span" >评论(' + arr[i].totalReplyNum + ')</span>';
                    str += '  </div>';
                    str += '  <div class="clear"></div>';
                    str += '  </div> </div>';
                }
                if (arr.length > 0) {
                    $('.indexContentItems2', element).append(str);
                }
            }
        });
    }
    var loadJS = function (params) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.onload = script.onreadystatechange = script.onerror = function () {
            if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) {
                return;
            }
            script.onload = script.onreadystatechange = script.onerror = null;
            script.src = '';
            script.parentNode.removeChild(script);
            script = null;
            if (params.listCode) {
                params.callback(params.listCode);
            } else {
                params.callback();
            }
        };
        script.charset = params.charset || document.charset || document.characterSet || 'gb2312';
        script.src = params.src;
        try {
            head.appendChild(script);
        } catch (exp) {}
    };
    function loadGU(list) {
        loadJS({
            src: 'https://hq.sinajs.cn/list=' + list,
            charset: 'gb2312',
            callback: function () {
                var stocks = list.split(',');
                for (var j = 0; j < stocks.length; j++) {
                    var winStr = 'hq_str_' + stocks[j];
                    if (window[winStr] !== '') {
                        var winInfo = window[winStr].split(',');
                        var zd = (winInfo[3] - winInfo[2]).toFixed(2);
                        if (Number(winInfo[2]) === 0) {
                            continue;
                        }
                        var zdRate = (winInfo[3] - winInfo[2]) / winInfo[2] * 100;
                        var zdRateStr = zdRate.toFixed(2) + '%';
                        var winColor = '#ff3e1e';
                        var xianjia = winInfo[3];
                        if (winInfo[3] < winInfo[2]) {
                            winColor = '#228a06';
                            zd = '↓ ' + zd;
                        } else {
                            zd = '↑ ' + zd;
                        }
                        $('#xianjia_' + stocks[j], element).css('color', winColor).html(xianjia);
                        $('#zhangfu_' + stocks[j], element).css('color', winColor).html(zd);
                        $('#zhangfurate_' + stocks[j], element).css('color', winColor).html(zdRateStr);
                    }
                }
            }
        });
    }
    // 近期讨论个股
    function jQajax() {
        var url2 = window.top.location.href;
        var userID2 = url2.split('/blog/')[1];
        var domainPath = '';
        if (url2.indexOf('taoguba.xsq') > -1) {
            domainPath = 'https://www.taoguba.xsq';
        } else if (url2.indexOf('taoguba.test') > -1) {
            domainPath = 'https://www.taoguba.test';
        } else if (url2.indexOf('taoguba.com.cn') > -1) {
            domainPath = 'https://www.taoguba.com.cn';
        } else if (url2.indexOf('taoguba.cu') > -1) {
            domainPath = 'https://www.taoguba.cu';
        }
        $.ajax({
            type: 'GET',
            url: '/mGetBlogStock?blogID=' + userID2,
            dataType: 'json',
            success: function (data) {
                var dto = data.dto;
                var arr = dto.stockList;
                var str = '';
                var baseurl = $('.div_head_data', element).attr('id');
                for (var i = 0; i < arr.length; i++) {
                    str += '   <div class="geguContentItem">';
                    str += '    <a href="' + baseurl + 'mip/quotes/' + arr[i].stockCode;
                    str += '" class="geguitem width3 left">';
                    str += '  <p class="gegu_name" >' + arr[i].keywordName + '</p>';
                    str += ' <span class="gegu_num" >' + arr[i].stockCode + '</span>';
                    str += '  </a>';
                    str += ' <span class="gegu_price  width3 left" id="xianjia_' + arr[i].stockCode + '">--</span>';
                    str += ' <span class="gegu_upnum  width3 left" id="zhangfurate_' + arr[i].stockCode + '">--</span>';
                    str += ' <div class="clear"></div>';
                    str += '  </div>';
                }
                if (arr.length > 0) {
                    $('.geguContentItems', element).html(str);
                    loadGU(dto.listStock);
                } else {
                    $('.geguContent', element).html('<mip-img src="https://css.taoguba.com.cn/images/mNew/wuneirong.png" class="wuneirong_img"></mip-img>');
                }
            }
        });
    }
    function addUseful(rid, num, topic, flag) {
        var pageNum = 0;
        if (flag === 'F') {
            // alert("您还没有登陆，请登录后再点赞");
            window.top.location.href = ssoPath + '/m/login/index?url=https://m.<%=documentDomain%>/Article/<c:out value="${topicID}"/>/1';
            return;
        }
        if (flag === 'T') {
            showMessage('您还没有手机验证，请验证后再点赞');
            return;
        }
        var baseurl = $('.div_head_data', element).attr('id');
        var url = baseurl + 'mAddUseful?rid=' + rid + '&num=';
        url += num + '&flag=' + topic + '&topicID=' + rid + '&pageNum=' + pageNum;
        sendReq('get', url, '', getUseful);
    }

    function getUseful(obj) {
        var insertFlag = obj.dto.root;
        var str = insertFlag.value;
        if (str !== 'error') {
            if (str === 'lock') {
                var lockend = insertFlag.lockend;
                showMessage('抱歉由于您涉及恶意点赞行为，暂时不能点赞, 解除时间为：' + lockend);
            } else if (str === '999999') {
                showMessage('您投票速度太快了，请休息30秒以后再投票吧！');
            } else if (str === '999998') {
                showMessage('您不能投自己的票，让其他用户帮您投吧！');
            } else if (str !== '0') {
                var topic = insertFlag.flag;
                if (topic === 'T') {
                    // document.getElementById("topicUseful").innerHTML = "已赞";
                    showMessage('赞成功！');
                }
            } else {
                showMessage('您已点赞过了');
                return;
            }
        } else {
            showMessage('发生错误，请您联系股天乐');
            return;
        }
    }
    var BKsize = $('.indexContentItems', element).attr('data-size');
    if (Number(BKsize) === 0) {
        $('.Mboke_content', element).hide();
        $('.Mboke_title', element).removeClass('Mboke_title_active');
        $('.hotContent', element).show();
        hotAjax();
        $('.Mboke_title', element).eq(2).addClass('Mboke_title_active');
    }
    var page = 0;
    var scroll2Num = 1;
    $(window).scroll(function () {
        var top = $('.indexContentItems2', element).offset().top;
        var h = $('.Mfoot_new').height();
        var baseH = top - h;
        var scrollH = $(window).scrollTop() + 500;
        if (scrollH > baseH) {
            page = Math.ceil(scrollH / baseH);
            if (page > scroll2Num) {
                bkAjax(page);
                scroll2Num++;
                zanPlClickc();
            }
        }
    });
    // var url='http://m.taoguba.yl/blogUseMsg?userID=' + bkuserID;
    // var fetchJsonp = require('fetch-jsonp');
    // fetchJsonp(url, {
    //     jsonpCallback: 'cb'
    // }).then(function (res) {
    //     return res.json();
    // }).then(function (data) {
    //     console.log(data);
    // });
    // // 添加订阅
    // function addOrder() {
    //     var getName = blogerName;
    //     var baseurl = $('.div_head_data', element).attr('id');
    //     var url = baseurl + 'mAddSubscriptionUser?userName=' + getName;
    //     sendReq('get', url, '', getReturnOrder);
    // }
    // function toActivity(type, userID, blogName) {
    //     var param = '{"to":"Friends","params":[{"name":"userID","value":"';
    //     param += userID + '"},{"name":"type","value":"' + type + '"}';
    //     if (blogName !== '') {
    //         param += ',{"name":"blogName","value":"' + blogName + '"}';
    //     }
    //     param += ']}';
    //     // alert(param);
    //     AndroidAPI.callJava('toActivity', param);
    // }
    function focusYes() {
        var url2 = window.top.location.href;
        var relationID = url2.split('/blog/')[1];
        var url = '/delGoodFriend?relationID=' + relationID;
        $('.focusBox', element).hide();
        sendReq('get', url, '', getReturnDel);
    }
    function addFriendInfo() {
        if (document.getElementById('sendtxtcontent').value === '') {
            showMessage('验证信息不能为空');
            return;
        }
        var getName = $('.Mboke_username', element).text();
        var url = '/mip/addFriendInfo?recvUserName=';
        url += getName + '&msgText=' + document.getElementById('sendtxtcontent').value;
        sendReq('get', url, '',
        function (obj) {
            var str = obj.dto;
            $('.yzBox').hide();
            if (Number(str) === 1) {
                showMessage('发送成功!');
                $('.yzBox').hide();
            } else if (Number(str) === 0) {
                showMessage('失败，请重试!');
            } else if (Number(str) === 2) {
                showMessage('您的关注已经超过2000个，无法再加。');
            }
        });
    }
    // 帖子评论
    function articleMopenAPP(topicID, replyID) {
        // 判断当前位Android 还是iOS
        var u = navigator.userAgent;
        var app = navigator.appVersion;
        // g
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        // ios终端
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
                } else {
                    window.close();
                }
            },
            25);
            if (Number(topicID) === 0) {
                window.top.location.href = 'taoguba://taoguba.com.cn';
            } else {
                isLogin();
                if (Number(replyID) === 0) {
                    window.top.location.href = 'taoguba://app.topic/openTopic?topicId=' + topicID;
                } else {
                    window.top.location.href = 'taoguba://app.topic/openTopic?topicId=' + topicID + '&replyId=' + replyID;
                }
            }

        }
        if (isIOS) {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
                } else {
                    window.close();
                }
            },
            25);
            if (Number(topicID) === 0) {
                window.top.location.href = 'tgbiosapp://';
            } else {
                isLogin();
                window.top.location.href = 'tgbiosapp://?type=openTopic&topicId=' + topicID + '&replyId=' + replyID;
            }
        }

    }
    return customElement;
});