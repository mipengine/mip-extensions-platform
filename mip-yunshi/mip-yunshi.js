/**
 * @file mip-yunshi 组件
 * @author zuixingzuo
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();
    var dataYS = require('./data');
    var YUNSHISIGNID = 1;
    var YUNSHITIME = 0;
    customElement.prototype.firstInviewCallback = function () {
        toolYunshi();
        mxzYunshi();
    };
    function toolYunshi() {
        var obj = $('#YUNSHIBOX');
        if (obj.length === 0) {
            return;
        }

        // 默认SIGNID
        if (localStorage.YunshiSignID) {
            YUNSHISIGNID = parseInt(localStorage.YunshiSignID, 0);
        }
        toolYunshiChange();

        // 星座选择
        $('#YUNSHISIGN').click(function (e) {
            yunshiSignSelectAdd();
            $('#YUNSHISIGNSELECT').show();
            $('#YUNSHISHADOW').show();
            $('body').on('touchmove', function (e) {
                e.preventDefault();
            }, false);
        });

        // 日期切换
        $('#YUNSHITIME li').click(function () {
            YUNSHITIME = parseInt($(this).attr('val'), 0);
            $(this)
                .siblings()
                .removeClass();
            $(this).addClass('cur');
            toolYunshiChange();
        });
    }

    // 星座切换框
    function yunshiSignSelectAdd() {
        var obj = $('#YUNSHISIGNSELECT');
        if (obj.length > 0) {
            return;
        }

        // 星座列表
        var html = '<div id="YUNSHISHADOW" class="shadow"></div><div id="YUNSHISIGNSELECT" class="sign_select">'
            + '<span class="sign_select_name"></span>'
            + '<ul>'
            + '<li class="by" val="1"><span></span>白羊座</li>'
            + '<li class="jn" val="2"><span></span>金牛座</li>'
            + '<li class="sz" val="3"><span></span>双子座</li>'
            + '<li class="jx" val="4"><span></span>巨蟹座</li>'
            + '<li class="shz" val="5"><span></span>狮子座</li>'
            + '<li class="cn" val="6"><span></span>处女座</li>'
            + '<li class="tc" val="7"><span></span>天秤座</li>'
            + '<li class="tx" val="8"><span></span>天蝎座</li>'
            + '<li class="ss" val="9"><span></span>射手座</li>'
            + '<li class="mj" val="10"><span></span>摩羯座</li>'
            + '<li class="sp" val="11"><span></span>水瓶座</li>'
            + '<li class="sy" val="12"><span></span>双鱼座</li>'
            + '</ul></div>';
        $('body').append(html);

        // 点击幕布
        $('#YUNSHISHADOW').on('click', function () {
            $('#YUNSHISIGNSELECT').hide();
            $('#YUNSHISHADOW').hide();
            $('body').unbind('touchmove');
        });

        // 星座切换
        $('#YUNSHISIGNSELECT li').click(function () {
            YUNSHISIGNID = $(this).attr('val');

            $('#YUNSHISIGNSELECT').hide();
            $('#YUNSHISHADOW').hide();
            $('body').unbind('touchmove');

            toolYunshiChange();
        });
    }

    // 运势切换
    function toolYunshiChange() {
        var sign = getSignById(YUNSHISIGNID);
        var time = YUNSHITIME;
        var data = getEval(sign, time);
        // 头像
        var iDown = '<i class="iconfont icon-down" />';
        $('#YUNSHISIGN').removeClass().addClass('sign_logo ' + sign.PinYinShort);
        $('#YUNSHISIGN').find('em').text(sign.ChineseName).append(iDown);

        // 指数
        var star = 'star' + data.star;
        $('#YUNSHIBOX').find('.p1 span').removeClass().addClass('star ' + star);

        // 内容
        var str = data.description;
        if (str.length > 35) {
            str = str.substring(0, 35) + '...';
        }
        $('#YUNSHIBOX')
            .find('.p2')
            .html('<a data-type="mip" href="' + data.url + '">' + str + '<span>[详情]</span></a>');

        // Cookies
        localStorage.YunshiSignID = sign.SignID;
    }

    function mxzYunshi() {
        var obj = $('#MXZYUNSHI');
        if (obj.length === 0) {
            return;
        }
        ;
        var signID = obj.attr('sid');
        var sign = getSignById(signID);
        var data = getEval(sign, 0);

        obj.find('.start').addClass('start' + data.star);
        obj.find('p a').before(data.description);
    }

    function getSignById(signID) {
        var chineseName;
        var pinYinShort;
        var pinYinName;
        var englishName;
        var dateSub;
        signID = parseInt(signID, 0);
        switch (signID) {
            case 0:
                chineseName = '';
                pinYinShort = '';
                pinYinName = '';
                englishName = '';
                dateSub = '';
                break;
            case 1:
                chineseName = '白羊座';
                pinYinShort = 'by';
                pinYinName = 'baiyang';
                englishName = 'aries';
                dateSub = '3月21日-4月20日';
                break;
            case 2:
                chineseName = '金牛座';
                pinYinShort = 'jn';
                pinYinName = 'jinniu';
                englishName = 'taurus';
                dateSub = '4月21日-5月21日';
                break;
            case 3:
                chineseName = '双子座';
                pinYinShort = 'sz';
                pinYinName = 'shuangzi';
                englishName = 'gemini';
                dateSub = '5月22日-6月21日';
                break;
            case 4:
                chineseName = '巨蟹座';
                pinYinShort = 'jx';
                pinYinName = 'juxie';
                englishName = 'cancer';
                dateSub = '6月22日-7月23日';
                break;
            case 5:
                chineseName = '狮子座';
                pinYinShort = 'shz';
                pinYinName = 'shizi';
                englishName = 'leo';
                dateSub = '7月24日-8月23日';
                break;
            case 6:
                chineseName = '处女座';
                pinYinShort = 'cn';
                pinYinName = 'chunv';
                englishName = 'virgo';
                dateSub = '8月24日-9月23日';
                break;
            case 7:
                chineseName = '天秤座';
                pinYinShort = 'tc';
                pinYinName = 'tiancheng';
                englishName = 'libra';
                dateSub = '9月24日-10月23日';
                break;
            case 8:
                chineseName = '天蝎座';
                pinYinShort = 'tx';
                pinYinName = 'tianxie';
                englishName = 'scorpio';
                dateSub = '10月24日-11月22日';
                break;
            case 9:
                chineseName = '射手座';
                pinYinShort = 'ss';
                pinYinName = 'sheshou';
                englishName = 'sagittarius';
                dateSub = '11月23日-12月21日';
                break;
            case 10:
                chineseName = '摩羯座';
                pinYinShort = 'mj';
                pinYinName = 'mojie';
                englishName = 'capricorn';
                dateSub = '12月22日-1月20日';
                break;
            case 11:
                chineseName = '水瓶座';
                pinYinShort = 'sp';
                pinYinName = 'shuiping';
                englishName = 'aquarius';
                dateSub = '1月21日-2月19日';
                break;
            case 12:
                chineseName = '双鱼座';
                pinYinShort = 'sy';
                pinYinName = 'shuangyu';
                englishName = 'pisces';
                dateSub = '2月20日-3月20日';
                break;
        }

        var sign = {
            SignID: signID,
            ChineseName: chineseName,
            PinYinShort: pinYinShort,
            PinYinName: pinYinName,
            EnglishName: englishName,
            DateSub: dateSub
        };

        return sign;
    }

    function getEval(sign, time) {
        switch (sign.PinYinName) {
            case 'baiyang':
                return dataYS.baiyang[time];
                break;
            case 'jinniu':
                return dataYS.jinniu[time];
                break;
            case 'shuangzi':
                return dataYS.shuangzi[time];
                break;
            case 'juxie':
                return dataYS.juxie[time];
                break;
            case 'shizi':
                return dataYS.shizi[time];
                break;
            case 'chunv':
                return dataYS.chunv[time];
                break;
            case 'tiancheng':
                return dataYS.tiancheng[time];
                break;
            case 'tianxie':
                return dataYS.tianxie[time];
                break;
            case 'sheshou':
                return dataYS.sheshou[time];
                break;
            case 'mojie':
                return dataYS.mojie[time];
                break;
            case 'shuiping':
                return dataYS.shuiping[time];
                break;
            case 'shuangyu':
                return dataYS.shuangyu[time];
                break;
        }
    }
    return customElement;
});

