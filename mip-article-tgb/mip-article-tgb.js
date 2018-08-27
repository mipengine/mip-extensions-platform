/**
 * @file mip-article-tgb 组件
 * @author
 */

define(function (require) {
    'use strict';
    var topicID = '';
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var element = '';
    var catalogID = '';
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
        topicID = element.getAttribute('topicID') || '';
        catalogID = element.getAttribute('catalogID') || '';
    };
    $(function () {
        init();
        function loadImage(el, fn) {
            var img = new Image();
            var src = el.getAttribute('data-original');
            img.src = src;
            img.onload = function () {
                if (!! el.parent) {
                    el.parent.replaceChild(img, el);
                } else {
                    el.src = src;
                }
                fn ? fn() : null;
            };
        }
        // 判断某个元素是否在可见的屏幕内
        function elementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (rect.top >= 0 && rect.left >= 0
            && rect.top <= (window.innerHeight || document.documentElement.clientHeight));
        }
        // 初始化一个图片数组
        var images = [];
        var query = document.querySelectorAll('img.lazy');
        for (var i = 0; i < query.length; i++) {
            if (images[i] !== query[i]) {
                images.push(query[i]);
            }
        };
        // 一边滚动一边加载图片
        function processScroll() {
            try {
                for (var i = 0; i < images.length; i++) {
                    if (elementInViewport(images[i])) {
                        loadImage(images[i],
                        function () {
                            // 加载完图片就从图片数组中删除
                            images.splice(i, i);
                        });
                    }
                };
            } catch (e) {
                showMessage('processScroll:' + e);
            }
        }
        processScroll();
        addEventListener('scroll', processScroll);
    });
    var domainPath = $('.data_none', element).attr('data-type');
    var yuUrl = domainPath;
    // String.prototype.trim = function() {
    //     return this.replace(/(^\s*)|(\s*$)/g, '');
    // }
    var blockID = catalogID;
    function init() {
        if (blockID === 20009) {
            var documentDomain = $('.data_none', element).attr('name');
            var url = documentDomain + '/voteState?topicID=' + topicID;
            sendReq('get', url, '', getReVoteRecord);
        }
    }
    function AddUseful(rid, num, topic, flag) {
        var pageNum = 0;
        if (flag === 'F') {
            var ssoPath = $('.data_none', element).attr('value');
            var documentDomain = $('.data_none', element).attr('name');
            window.top.location.href = ssoPath + '/m/login/index?url=https://m.' + documentDomain + '/Article/' + topicID + '/1';
            return;
        }
        if (flag === 'T') {
            showMessage('您还没有手机验证，请验证后再点赞');
            return;
        }
        var basePath = $('.data_none', element).attr('id');
        var url = basePath + 'mAddUseful?rid=';
        url += rid + '&num=' + num + '&flag=' + topic;
        url += '&topicID=' + topicID + '&pageNum=' + pageNum;
        sendReq('get', url, '', getUseful);
        // asyncfun(url,"",getUseful);
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
                if (topic === 'T' || topic === 'R') {
                    showMessage('赞成功！');
                    var zanNum1 = $('#' + insertFlag.id).text();
                    var zanNum2 = Number(zanNum1) + 1;
                    $('#' + insertFlag.id).text(zanNum2);
                    $('#' + insertFlag.id).parent().css('background-color', '#ffb648');
                    $('.plzan', element).css('background', 'none');
                }
            } else {
                showMessage('您已赞过了');
                return;
            }
        } else {
            showMessage('发生错误，请您联系股天乐');
            return;
        }
    }
    // function topicSubmit(flag) {
    //     if (!flag) {
    //         document.getElementById('firstFlag').value = 'N';
    //     }
    //     var frm = document.forms['newReplyAction'];
    //     document.getElementById('s_content_0').value = edit.getText();
    //     frm.submit();
    //     // 原创与非原创未加
    // }
    function addMyCol(favID, flag) {
        if (flag === 'F') {
            showMessage('您还没有登陆，请登录后再收藏');
            return;
        }
        if (flag === 'T') {
            showMessage('您还没有手机验证，请验证后再收藏');
            return;
        }
        var basePath = $('.data_none').attr('id');
        var url = basePath + '/mAddFavorite?rid=' + favID;
        sendReq('get', url, '', getReturnAddfav);
    }
    function getReturnAddfav(obj) {
        var insertFlag = obj.dto.root;
        var existValue = insertFlag.value;
        if (existValue === 0) {
            showMessage('您已经收藏过了!');
        } else if (existValue === 'error') {
            showMessage('发生错误，请您联系股天乐!');
        } else {
            $('.collectBtn', element).css('color', '#ff9900');
            $('.collectimg', element).attr('src', 'https://css.taoguba.com.cn/images/mNew/yishoucang.png');
            showMessage('收藏成功！');
        }
    }
    function reonsubmit(a) {
        var textValue = document.getElementById('content_body').value;
        if (textValue.trim() === '') {
            showMessage('回复内容不能为空！');
            return false;
        }
        document.getElementById('submit1').disabled = true;
        document.getElementById('submit2').disabled = true;
        document.getElementById('newReplyAction').submit();
    }
    function Open100(str) {
        if (confirm('你确认要提交???')) {
            window.event.returnValue = true;
            document.forms[0].submit();
        } else {
            window.event.returnValue = false;
        }
    }
    isWeiXin();
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
            $('#gzh2', element).show();
        } else {
            return false;
        }
    }
    var zhankaiStatus = 'false';
    function openArticletie() {
        zhankaiStatus = 'true';
        $('.zhankai', element).hide();
        $('.tzitem_text', element).removeClass('hideText');
        var overH = $('.isover', element).offset().top;
        var bodyH = document.body.offsetHeight;
        if (overH > bodyH || overH === bodyH) {
            $('.tzitem_bot', element).addClass('fixBot');
            $('.tzitem_bot', element).attr('data-open', 'true');
        }
        $('.tzitem_hide', element).find('img').attr('src', 'https://css.taoguba.com.cn/images/mNew/shouqi.png');
        $('.tzitem_hide', element).find('span').text('收起');
    }
    $('.tzitem_hide', element).click(function () {
        if (zhankaiStatus === 'true') {
            $('.zhankai', element).show();
            $('.tzitem_text', element).addClass('hideText');
            $('.tzitem_bot', element).removeClass('fixBot');
            $('.tzitem_bot', element).attr('data-open', 'false');
            $('.tzitem_hide', element).find('img').attr('src', 'https://css.taoguba.com.cn/images/mNew/zhankai.png');
            $('.tzitem_hide', element).find('span').text('展开');
            zhankaiStatus = 'false';
            $('html, body').animate({
                scrollTop: $('.Pagetitle').offset().top
            },
            500);
        } else {
            openArticletie();
        }

    });
    var bodyH = $(window).height();
    $(window).scroll(function () {
        var isopen = $('.tzitem_bot', element).attr('data-open');
        var overH = $('.isover', element).offset().top;
        var over2 = $(window).scrollTop();
        if (bodyH + over2 > overH) {
            if (isopen === 'true') {
                $('.tzitem_bot', element).removeClass('fixBot');
            }
        } else {
            if ($('.tzitem_bot', element).hasClass('fixBot')) {} else {
                if (isopen === 'true') {
                    $('.tzitem_bot', element).addClass('fixBot');
                }
            }
        }
    });
    // 添加好友名单
    function addGoodFriend() {
        var getName = $('.HeadInfo_name', element).text();
        var basePath = $('.data_none', element).attr('id');
        var url = basePath + 'mAddFriend?userName=' + getName;
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

    function showMessage(msg) {
        $('#message', element).show().text(msg);
        setTimeout(function () {
            $('#message', element).hide();
        },
        2000);
    }
    // 添加好友验证
    function addFriendInfo() {
        if (document.getElementById('sendtxtcontent').value === '') {
            showMessage('验证信息不能为空');
            return;
        }
        var getName = $('.Mboke_username', element).text();
        var domainPath = $('.data_none', element).attr('data-type');
        var url = domainPath + '/addFriendInfo?recvUserName=';
        url += getName + '&msgText=' + document.getElementById('sendtxtcontent').value;
        var documentDomain = $('.data_none', element).attr('name');
        document.domain = documentDomain;
        var iframe = window.frames['iframeProxy'];
        sendReq('get', url, '',
        function (obj) {
            var str = obj.dto;
            $('.yzBox').hide();
            if (str === 1) {
                showMessage('发送成功!');
                $('.yzBox').hide();
            } else if (str === 0) {
                showMessage('失败，请重试!');
            } else if (str === 2) {
                showMessage('您的关注已经超过2000个，无法再加.');
            }
        });
    }
    function offYZ() {
        $('.yzBox', element).hide();
    }
    function getReVoteRecord(obj) {
        var xmlObj = obj.dto;
        var num = xmlObj.root.num;
        var type = xmlObj.root.type;
        var endVoteFlag = xmlObj.root.endVoteFlag;
        var points = xmlObj.root.points;
        var type1 = '';
        var subStr = '';
        if (type === '票') {
            subStr = '有' + num + '人参与投票,';
        } else {
            var votedNum = xmlObj.root.votedNum;
            subStr = '有' + num + '元参与投票,';
            subStr += '共有';
            subStr += votedNum;
            subStr += '人。';
        }
        var str = '';
        if (xmlObj.root.viewFlag === 'Y') {
            var record = xmlObj.root.Record;
            for (var i = 0; i < record.length; i++) {
                var id = record[i].id;
                var value = record[i].value;
                var v = value / num * 100;
                var innerhtml = document.getElementById('div_' + id).innerHTML;
                if (innerhtml.indexOf('%') > 0) {} else {
                    document.getElementById('div_' + id).innerHTML += value + type + ' (' + v.toFixed(2) + '%)';
                }
                document.getElementById('img_' + id).style.width = Number(v) + 'px';

            }
            if (endVoteFlag === 'Y') {
                str += '<div style="width:100%;font-size:14px;"><span style="float:left;">';
                str += '此投票已于<font color="red">';
                str += xmlObj.root.endVoteTime;
                str += '结束。&nbsp;&nbsp;</font>共';
                str += subStr;
            } else {
                str += '<div style="width:100%;font-size:14px;"><span style="float:left;">';
                str += '您已经投过票了';
                str += '</span><span style="float:right">已';
                str += subStr;
                str += xmlObj.root.endVoteTime;
                str += '截止</span>';
                if (points !== 0) {
                    str += '<br/><span style="width:50%;float:left;">投票发起者给予参与者随机激励积分';
                    str += points;
                    str += '结束后以10为单位随机分发</span>';
                }
                str += '</div>';
            }
        } else {
            str += '<div style="width:100%;font-size:14px;"><span style="float:left;">';
            str += '<input type="button" onclick="inVoteRecord(';
            if (xmlObj.root.userID === 'null') {
                str += '"' + 'F' + '"';
            } else {
                str += '"' + 'T' + '"';
            }
            str += ');" value="投票并显示结果">&nbsp;&nbsp;&nbsp;&nbsp;';
            str += '</span><span style="float:right">已';
            str += subStr;
            str += '此投票将于';
            str += xmlObj.root.endVoteTime;
            str += '截止</span>';
            if (points !== 0) {
                str += '<br/><div style="width:50%;float:right;">投票发起者给予参与者随机激励积分';
                str += points;
                str += '结束后以10为单位随机分发</div>';
            }
            str += '</div>';
        }
        document.getElementById('voteIn', element).innerHTML = str;
    }
    $('#addGoodFriend', element).click(function () {
        addGoodFriend();
    });
    $('#offYZ', element).click(function () {
        offYZ();
    });
    $('#addFriendInfo', element).click(function () {
        addFriendInfo();
    });
    $('#openArticletie', element).click(function () {
        openArticletie();
    });
    return customElement;
});