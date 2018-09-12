/**
 * @file 360doc 自定义逻辑组件
 * @author www.360doc.com技术部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = $(this.element);
        try {
            if ($(element.find('.yc_user')).length !== 0) {
                if ($(element.find('.hiddenoriginal')).val() === '1') {
                    $(element.find('.yc_user')).show();
                    rewardlist.original = 1;
                    rewardlist.artid = $(element.find('.hiddenartid')).val();
                    rewardlist.userid = $(element.find('.hiddenuserid')).val();
                    rewardlist.showRewardDiv();
                }
            }
            if ($(element.find('.yc_z')).length !== 0) {
                $(element.find('.yc_z')).on('click', function (event) {
                    event.preventDefault();
                    var jsondata = 'url=' + encodeURIComponent(window.location.href) + '&aid='
                        + $(element.find('.hiddenartid')).val();
                    window.top.location.href = 'http://www.360doc.cn/weixinreward/mipreward.aspx?' + jsondata;
                });
            }
        }
        catch (e) { }
    };
    var rewardlist = {
        type: 'mip',
        queryStartID: 0,
        lastRewarUserID: 0,
        showRewardLoading: false,
        rewardLoading: false,
        orderid: 0,
        paytype: 9,
        artid: '',
        userid: '',
        original: '',
        IntervalunQuery: null,
        // 显示赞赏列表div
        showRewardDiv: function () {
            if (!rewardlist.showRewardLoading) {
                rewardlist.showRewardLoading = true;
                var sign = rewardlist.xfejh({
                    'op': 'getartuserinfo', 'type': rewardlist.type, 'artuserid':
                    rewardlist.userid
                });
                $.ajax({
                    url: 'https://account.360doc.com/ajax/QueryHandler.ashx?op=getartuserinfo',
                    dataType: 'jsonp',
                    data: {artuserid: rewardlist.userid, type: rewardlist.type, sign: sign},
                    success: function (result) {
                        rewardlist.showRewardLoading = false;
                        // decodeURIComponent
                        if (result.status === '1') {
                            $('.yc_user').show();
                            var user1html = '<div class=\'d1\'>';
                            user1html += '<p class=\'fl\'><a href=\'http://www.360doc.cn/userhome.aspx?userid=' + rewardlist.userid + '\' target=\'_blank\'><img src=\'' + decodeURIComponent(result.userphoto) + '\' /></a></p>';
                            user1html += '<div class=\'fl yc_user_data\'>';
                            user1html += '<p><a href=\'http://www.360doc.cn/userhome.aspx?userid=' + rewardlist.userid + '\' target=\'_blank\'>' + decodeURIComponent(result.username) + '</a></p>';
                            user1html += '<div class=\'yc_star\'>' + rewardlist.getStarrank(result.degree)
                                + '</div>';
                            user1html += '</div>';
                            user1html += '<a href=\'http://www.360doc.cn/login.aspx?url='
                            + encodeURIComponent('http://www.360doc.cn/article/' + rewardlist.userid + '_'
                                + rewardlist.artid + '.html?addfollow=2&url2=http://www.360doc.cn/index.html')
                            + '\' class=\'fr yc_btn\'></a>';
                            user1html += '</div>';
                            user1html += '<div class=\'text\'>' + decodeURIComponent(result.description) + '</div>';
                            $('.yc_user_1').html(user1html).show();
                            rewardlist.getRewardUserList();
                        }
                    }
                });
            }
        },
        // 获取前10个赞赏用户列表
        getRewardUserList: function () {
            var sign = rewardlist.xfejh({
                'op': 'gettipuserlist',
                'type': rewardlist.type,
                'aid': rewardlist.artid,
                'dn': '10',
                'id': '0'
            });
            $.ajax({
                url: 'https://account.360doc.com/ajax/QueryHandler.ashx?op=gettipuserlist',
                dataType: 'jsonp',
                data: {aid: rewardlist.artid, dn: 10, id: 0, type: rewardlist.type, sign: sign},
                success: function (result) {
                    // $('#rewarduserslist').remove();     //先清空
                    if (result.status === '1' && result.count > 0 && result.userlist.length > 0) {
                        $('.rewarduserslist').html('<span class=\'spantotalrewardcount\'>共'
                            + ' <i id=\'totalrewardcount\'>' + result.count + '</i> 人赞赏</span>');
                        var rewarduserhref = '';
                        var rewardusername = '';
                        var rewarduserphoto = '';
                        for (var i = 0; i < result.userlist.length; i++) {
                            if (result.userlist[i].userid === '-1') {
                                rewarduserhref = 'javascript:void(0);';
                                rewardusername = '游客';
                                rewarduserphoto = '<img src=\'http://pubimage.360doc.com/payment/\' + (result.userlist[i].paytype == 1 ? \'wx\' : \'zfb\') + \'.jpg\' title=\'游客\'/>';
                            }
                            else {
                                rewarduserhref = 'http://www.360doc.cn/userhome.aspx?userid=' + result.userlist[i].userid;
                                rewardusername = rewardlist.autoAddEllipsis(result.userlist[i].nickname, 14);
                                rewarduserphoto = '<img src=\'' + result.userlist[i].photo
                                    + '\' title=\'' + result.userlist[i].nickname + '\'/>';
                            }
                            $('.spantotalrewardcount').before('<a href=\'' + rewarduserhref
                                + '\' class=\'ara1\' '
                                + (result.userlist[i].userid === '-1' ? '' : ' target=\'_blank\'')
                                + '>' + rewarduserphoto + '</a>');
                        }
                    }
                }
            });
        },
        // 星级
        getStarrank: function (strStarrank) {
            var html = '';
            var s1 = 0;
            var s2 = 0;
            if (strStarrank % 2 === 0) {
                s1 = parseInt(strStarrank / 2, 10);
            }
            else {
                s1 = parseInt(strStarrank / 2, 10);
                s2 = 1;
            }
            for (var i = 0; i < s1; i++) {
                html += '<i class=\'\'></i>';
            }
            for (var i = 0; i < s2; i++) {
                html += '<i class=\'s1\'></i>';
            }
            for (var i = 0; i < (5 - s1 - s2); i++) {
                html += '<i class=\'s2\'></i>';
            }

            return html;
        },
        // 展示赞赏弹出层
        showRewardAlert: function () {
            var jsondata = 'url=' + encodeURIComponent(window.location.href) + '&aid=' + rewardlist.artid;
            window.top.location.href = 'http://www.360doc.cn/weixinreward/mipreward.aspx?' + jsondata;
            return;
        },
        // 处理过长的字符串，截取并添加省略号
        autoAddEllipsis: function (pStr, pLen) {
            var ret = rewardlist.cutString(pStr, pLen);
            var cutFlag = ret.cutflag;
            var cutStringn = ret.cutstring;

            if ('1' === cutFlag) {
                return cutStringn + '...';
            }
            else {
                return cutStringn;
            }
        },
        // 取得指定长度的字符串
        cutString: function (pStr, pLen) {
            // 原字符串长度
            var strLen = pStr.length;
            var tmpCode;
            var cutString;
            // 默认情况下，返回的字符串是原字符串的一部分
            var cutFlag = '1';
            var lenCount = 0;
            var ret = false;
            if (strLen <= pLen / 2) {
                cutString = pStr;
                ret = true;
            }
            if (!ret) {
                for (var i = 0; i < strLen; i++) {
                    if (rewardlist.isFull(pStr.charAt(i))) {
                        lenCount += 2;
                    }
                    else {
                        lenCount += 1;
                    }
                    if (lenCount > pLen) {
                        cutString = pStr.substring(0, i);
                        ret = true;
                        break;
                    }
                    else if (lenCount === pLen) {
                        cutString = pStr.substring(0, i + 1);
                        ret = true;
                        break;
                    }
                }
            }
            if (!ret) {
                cutString = pStr;
                ret = true;
            }
            if (cutString.length === strLen) {
                cutFlag = '0';
            }
            return {'cutstring': cutString, 'cutflag': cutFlag};
        },
        // 判断是否为全角
        isFull: function (pChar) {
            if ((pChar.charCodeAt(0) > 128)) {
                return true;
            }
            else {
                return false;
            }
        },
        xfejh: function (param) {
            var signStr = '';
            for (var key in param) {
                if (!(typeof (param[key]) === 'string' && param[key] === '')) {
                    signStr += key + '=' + param[key] + '&';
                }
            }
            if (signStr.substr(signStr.length - 1, 1) === '&') {
                signStr = signStr.substr(0, signStr.length - 1);
            }
            var array = signStr.split('&');
            array.sort();
            var rel = '';
            for (var i = 0; i < array.length; i++) {
                rel += array[i];
            }
            var array = rel.split('=');
            array.sort();
            var rel = '';
            for (i = 0; i < array.length; i++) {
                rel += array[i];
            }
            return rel + Date.parse(new Date());
        }
    };

    return customElem;
});
