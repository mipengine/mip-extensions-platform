/**
 * @file mip-signmatch 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    function init() {
        if (localStorage.MatchSignIDNv) {
            matchSignShange(0, parseInt(localStorage.MatchSignIDNv, 0));
        }
        if (localStorage.MatchSignIDNan) {
            matchSignShange(1, parseInt(localStorage.MatchSignIDNan, 0));
        }
    }
    var flag;
    function sexSelect() {
        $('#SIGNNV').click(function (e) {
            flag = 0;
            showSelect();
        });
        $('#SIGNNAN').click(function (e) {
            flag = 1;
            showSelect();
        });
    }
    function showSelect() {
        var signSelect = $('#MATCHSIGNSELECT');
        if (flag === 0) {
            signSelect.removeClass('nansheng').addClass('nvsheng');
        } else {
            signSelect.removeClass('nvsheng').addClass('nansheng');
        }
        signSelect.show();
        $('#MATCHSHADOW').show();
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        }, false);
    }
    function shadowSlick() {
        $('#MATCHSHADOW').click(function () {
            $('#MATCHSIGNSELECT').hide();
            $('#MATCHSHADOW').hide();
            $('body').unbind('touchmove');
        });
    }
    function signSelect() {
        $('#MATCHSIGNSELECT').find('li').click(function () {
            var signId = $(this).attr('val');
            matchSignShange(flag, signId);
            $('#MATCHSIGNSELECT').hide();
            $('#MATCHSHADOW').hide();
            $('body').unbind('touchmove');
        });
    }
    function matchSignShange(flag, signId) {
        var iDown = '<i class="iconfont icon-down" />';
        var sign = getSignById(signId);
        if (flag === 0) {
            var obj = $('#SIGNNV');
            var emName = sign.ChineseName.replace('座', '女');
            obj.find('em').text(emName).append(iDown);
            obj.removeClass().addClass('sign_logo nv ' + sign.PinYinShort);
            $('#MATCHSIGN2').val(sign.SignID);
            localStorage.MatchSignIDNv = sign.SignID;
        } else {
            var obj = $('#SIGNNAN');
            var emName = sign.ChineseName.replace('座', '男');
            obj.find('em').text(emName).append(iDown);
            obj.removeClass().addClass('sign_logo nan ' + sign.PinYinShort);
            $('#MATCHSIGN1').val(sign.SignID);
            localStorage.MatchSignIDNan = sign.SignID;
        }
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
        ;
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
    init();
    sexSelect();
    shadowSlick();
    signSelect();
    return customElement;
});

