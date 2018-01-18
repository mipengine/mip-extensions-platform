/**
* @author: wangjx
* @date: 2017-04-19
* @file: mip-zpm-jobdetail.js
*/
define(function (require) {
    var $ = require('zepto');
    var render = function () {
        var $rightMore = $('.j_header .rightMore');
        var $userinfo = $('#jobdetail').attr('data-id');
        var jobId = $('#jobdetail').attr('data-jobnumber');
        // 反馈通
        var isfed = ($('#jobdetail').attr('data-isfed')) ? 'true' : 'false';
        // 下载广告随机显示
        var num = Math.ceil(Math.random() * 3);
        var str = '#appdownload' + num + '';
        $(str).css('display', 'block').siblings('.app_download').hide();
        $(str).children('a').css('display', 'block');
        // logo
        $('.mip-replaced-content').css('border-radius', '50%');
        $('.mip-replaced-content').css('border-radius', '50%');
        // 返回
        $('.r_returnbk').click(function () {
            window.history.back();
        });
        // 右上角更多操作,关闭
        if ($rightMore) {
            $rightMore.click(function () {
                $('.moreactions').show();
                $('.prompt-menu').show();
                event.preventDefault();
            });
        }
        $('.prompt-menu .btn').click(function () {
            $('.moreactions').hide();
            $('.prompt-menu').hide();
        });
        $('.jconfirm').click(function () {
            $('.jconfirm').hide();
            $('.prompt-menu').hide();
            $('.compaydetail-more').hide();
        });
        // 访问超量，登录
        var zpUser = document.cookie.indexOf('zp-auth');
        if (isLocalStorageSupported() === false && (getCookie('zp-auth') === null || zpUser === -1)) {
            window.location.href = 'https://mip.zhaopin.com/account/login/account/login';
        }
        // 访问量
        var jobPage;
        jobPage = localStorage.getItem('jobPage');
        if (jobPage < '50') {
            jobPage++;
            localStorage.setItem('jobPage', jobPage);
        } else if (getCookie('zp-auth') === null) {
            window.location.href = 'https://mip.zhaopin.com/account/login?prevUrl=' + escape(window.location.href) + '';
        }
        // 是否登录,登录后进行其他操作
        if ($userinfo !== '0') {
            // 投递
            $('.btn-now-apply').click(function () {
                nowapply();
            });
            // 短信打开触屏站 投递职位
            $('.subway_Btn').click(function () {
                contactMe();
            });
            // 收藏
            $('.add-favorite').click(function () {
                collectJob($('#jobdetail').attr('data-jobnumber'), $('#jobdetail').attr('data-cityid'));
            });
        } else {
            $('.btn-now-apply').click(function () {
                userLogin(true);
            });
            $('.add-favorite').click(function () {
                userLogin(true);
            });
            $('.subway_Btn').click(function () {
                userLogin(true);
            });
        }
        // 收藏职位状态
        var CollectList;
        CollectList = localStorage.getItem('CollectList');
        if (CollectList !== null && CollectList !== '' && typeof (CollectList) !== 'undefined') {
            if ($userinfo !== null) {
                if (CollectList.indexOf(jobId) !== -1) {
                    $('.add-favorite').html('取消收藏');
                }
            }
        }
        // 举报
        $('.blacklist').click(function () {
            report();
        });
        // 投递二次确认
        $('.qrtd .btn.l').click(function () {
            $('#qrtd').hide();
            $('.qrtd').hide();
        });
        $('.qrtd .btn.r').click(function () {
            $('#qrtd').hide();
            $('.qrtd').hide();
            getResumeNumber();
        });
        // 等待查阅关闭
        $('.waitingNumber .btn').click(function () {
            $('.waitingNumberWrap').hide();
        });
        // 关闭置顶服务提示
        $('.resumeTop .rtclose').click(function () {
            rtclose();
        });
        // 弹出时取消滚动
        $('.jobsFeedBackWrap').on('touchmove', function () {
            event.preventDefault();
        });
        // 开通反馈通
        $('.V5-1_ktfkt .kt').on('click', function () {
            $('.jobsFeedBackWrap').hide();
            $.ajax({
                url: 'https://mip.zhaopin.com/home/SetFeedBack',
                type: 'post',
                data: {
                    use: true
                },
                success: function (data, textStatus, jqxhr) {
                    isfed = true;
                    getResumeNumber();
                }
            });
        });
        // 忽略开通
        $('.V5-1_ktfkt .hl').on('click', function () {
            $('.jobsFeedBackWrap').hide();
            isfed = true;
            getResumeNumber(true);
            $.ajax({
                url: 'https://mip.zhaopin.com/home/SetFeedBack',
                type: 'post',
                data: {
                    use: false
                },
                success: function (data, textStatus, jqxhr) {}
            });
        });
        // 选择默认简历
        var t = document.getElementsByClassName('forResumeLi');
        // 取消选择默认简历
        $('.resumecancel').click(function () {
            didSelect(-1);
        });
        // 职位来源打开职位详情页
        var url = window.location.href;
        if (url.indexOf('t === -1') !== -1) {
            $('.wrap-button').hide();
            $('.subwayBox').show();
        }
        // jssdk 这个是统计代码，需要挂载到window上
        // 每个文件的code不一样所以需要在每个文件中单独引用
        var a = window;
        var e = document;
        var f = 'script';
        var g = document.location.protocol + '//statistic.zhaopin.cn/sdk/zhaopin_tracker.js';
        var b = 'za';
        var c;
        var d;
        a.ZhaoPinBigdataAnalyticsObject = b;
        a[b] = a[b] || function () {
                    (a[b].q = a[b].q || []).push(arguments);
                };
        a[b].l = 1 * new Date;
        a._ATAD_GIB_NIPOAHZ_ || (c = e.createElement(f), d = e.getElementsByTagName(f)[0],
                c.async = 1, c.src = g, d.parentNode.insertBefore(c, d), a._ATAD_GIB_NIPOAHZ_ = !0);
        window.za('creat', 'A24');
        var basic = {};
        basic['uid'] = $userinfo || '';
        basic['pagecode'] = '6020';
        basic['wdgtid'] = '';
        basic['evtid'] = 'pageopen';
        basic['chnlname'] = 'https://m.baidu.com/from=844b/s?word=%E6%99%BA%E8%81%94%E6%8B%9B%E8%81%98&sa=tb&ts=4521339&t_kt=0&ie=utf-8&rsv_t=c084r1HBnlmdWPcjNqcpQXFgg0covw0gRT1YwxNAEXV41LTaLT5gDeIFGg&rsv_pq=11504130240738664133&ss=100&tj=1&t_it=1&rqlang=zh&rsv_sug4=9677&inputT=8769&from=844b&isid=98D843641331458917737&mod=0&async=1';
        window.za('track', basic);
    };
    window.onload = function () {
        render();
    };
    // 投递简历
    function contactMe() {
        $('.subway_Btn').attr('disabled', 'true');
        $('.subway_Btn').removeAttr('onclick');
        getResumeNumber();
        event.preventDefault();
    }
    function isLocalStorageSupported() {
        var testKey = 'test';
        var storage = window.sessionStorage;
        try {
            storage.setItem(testKey, 'testValue');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }
    // 收藏职位
    function collectJob(jobId, cityId, favorate) {
        var favorOp = true;
        if ($('.add-favorite').html() === '取消收藏') {
            favorOp = false;
        }
        favorate = favorOp;
        $.ajax({
            url: 'https://mip.zhaopin.com/Home/FavoritePosition',
            type: 'post',
            data: {
                positionNumber: jobId,
                cityId: cityId,
                favorite: favorate
            },
            success: function (data, textStatus, jqxhr) {
                // myCollectList();
                if ($('.add-favorite').html() === '收藏职位') {
                    favorOp = false; // dis favor
                    $('.add-favorite').html('取消收藏');
                    alert('收藏成功');
                } else {
                    favorOp = true;
                    $('.add-favorite').html('收藏职位');
                    alert('取消收藏成功');
                }
                $('.moreactions').hide();
                $('.prompt-menu').hide();
            }
        });
    }
    // 收藏职位存本地
    function myCollectList() {
        var newCollectList;
        $.ajax({
            url: 'https://mip.zhaopin.com/Home/MyCollectList',
            type: 'post',
            data: {
                version: '6.3.0'
            },
            success: function (data, textStatus, jqxhr) {
                if (data.FavoritedPositions != null && data.FavoritedPositions.length > 0) {
                    for (var f = 0; f < data.FavoritedPositions.length; f++) {
                        newCollectList += data.FavoritedPositions[f].PositionNumber + ',';
                    }
                    localStorage.removeItem('CollectList');
                    localStorage.setItem('CollectList', newCollectList);
                }
            }
        });
    }
    // 投递简历
    function nowapply() {
        $('#qrtd').show();
        $('.qrtd').show();
        event.preventDefault();
    }
    // 申请职位
    function getResumeNumber(hl) {
        $('.subway_Btn').attr('onclick', '');
        $('.cgshenqingbtn').attr('onclick', '');
        // 反馈通
        var isfed = ($('#jobdetail').attr('data-isfed')) ? 'true' : 'false';
        $.ajax({
            url: 'https://mip.zhaopin.com/Searchjob/ResumeNumbers',
            type: 'post',
            data: {
                version: '6.3.0'
            },
            success: function (data, textStatus, jqxhr) {
                if (data.StatusCode !== 200) {
                    window.setTimeout(function () {
                        location.reload();
                    }, 2000);
                }
                var fedReturn = true;
                var resumeLen = data.List.length;
                if (resumeLen >= 1) {
                    // 是否开通反馈通
                    if (!isfed) {
                        fedReturn = setFeedbackNum();
                    }
                }
                // 是否为忽略
                if (hl) {
                    isfed = false;
                }
                // 未开通是否继续
                if (fedReturn) {
                    if (resumeLen === 1) {
                        if (data.List[0].DefaultType === 0) {
                            setDefaultResume(data.List[0].Number,
                                            data.List[0].Version,
                                            data.List[0].Language,
                                            data.List[0].Id,
                                            data.List[0].Integrity,
                                            data.List[0].IntegrityEng,
                                            data.List[0].PostStatus,
                                            data.List[0].Name);
                        } else {
                            applyjob(data.List[0].Number,
                                    data.List[0].Version,
                                    data.List[0].Language,
                                    data.List[0].Name,
                                    data.List[0].Id);
                        }
                    } else if (resumeLen > 1) {
                        // 循环创建选择简历列表
                        $('#popupPanel ul .forResumeLi').remove();
                        var str = '';
                        $.each(data.List, function (k, v) {
                            str += '<li class="forResumeLi"';
                            str += ' data-number="' + v.Number + '",data-version="' + v.Version + '"';
                            str += ',data-lanuage="' + v.Language + '",data-id="' + v.Id + '"';
                            str += ',data-Integrity="' + v.Integrity + '",data-IntegrityEng="' + v.IntegrityEng + '"';
                            str += ',data-PostStatus="' + v.PostStatus + '",data-Name="' + v.Name + '">';
                            str += '' + v.Name + '</li>';
                        });
                        $('#popupPanel .resumetop').after(str);
                        // 显示列表
                        select();
                    } else {
                        alert('请完善您的简历');
                        window.location.href = 'https://mip.zhaopin.com/Resume/index';
                    }
                }
            },
            error: function (data) {
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        });
    }
    // 选择默认简历
    function select() {
        $('#popupPanel').show().css('margin-top', -$('#popupPanel').height() / 2);
    }
    // 设置默认简历
    function setDefaultResume(number, Version, Language, id, wznumber, wznumberEn, resumeFlag, Name) {
        if (resumeFlag === 0) {
            alert('请完善您的简历');
            window.location.href = 'https://mip.zhaopin.com/Resume/index';
            return false;
        }
        $('#popupPanel-screen,#popupPanel-popup').hide();
        $.ajax({
            url: 'https://mip.zhaopin.com/Searchjob/SetDefaultResume',
            type: 'post',
            data: {
                resumeNumber: number,
                resumeId: id,
                resumeVersion: Version,
                language: resumeFlag
            },
            success: function (data, textStatus, jqxhr) {
                if (data.StatusCode !== 200) {
                    window.setTimeout(function () {
                        location.reload();
                    }, 2000);
                } else {
                    applyjob(number, Version, Language, Name, id);
                }
            },
            error: function (data) {
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        });
    }
    // 判断简历完整度 返回1为中文完整 2为英文完整 3为中英文完整
    function resumeIntegrity(number, numberEN) {
        if (number >= 46 && numberEN >= 46) {
            return '3';
        } else if (numberEN >= 46) {
            return '2';
        } else if (number >= 46) {
            return '1';
        } else {
            return false;
        }
    }
    // 表示选择了某个列表中的项
    // 如果 resumeId为-1表示关闭对话框
    function didSelect(resumeId) {
        if (resumeId === -1) {
            $('#popupPanel').hide();
            return;
        } else {
            applyjob($('#jobdetail').attr('data-jobnumber'),
                    $('#jobdetail').attr('data-cityid'),
                    resumeId,
                    document.getElementById('btnapply'));
            $('#popupPanel').hide();
        }
    }
    // 申请职位
    function applyjob(resumeid, Version, Language, Name, Id) {
        $('.subway_Btn').html('已通知HR').attr('onclick', '').addClass('hover');
        $('.cgshenqingbtn').html('已投递').attr('onclick', '').addClass('hover');
        var gaUtmzUtmcsr = parseAnalyticsCookie() || {};
        $.ajax({
            url: 'https://mip.zhaopin.com/searchjob/apply',
            type: 'post',
            data: {
                jobID: 'CC253509722J90250171000',
                cityID: '703',
                resumeNumber: resumeid,
                resumeVersion: Version,
                resumeLanguage: Language,
                need5Dot0: 1,
                source: gaUtmzUtmcsr.utmcsr
            },
            success: function (data, textStatus, jqxhr) {
                if (data.StatusCode !== 200) {
                    window.setTimeout(function () {
                        location.reload();
                    }, 2000);
                }
                $('.cgshenqingbtn').html('已投递').attr('onclick', '').addClass('hover');
                $('#popupPanel').hide();
                // 短信打开
                var url = window.location.href;
                if (url.indexOf('t === -1') === -1) {
                    $('.cgshenqingbtn').attr('data-ApplyForQueueCount', data.ApplyForQueueCount);
                    var resumeTopTime = localStorage.getItem('resumeTopTime');
                    if (resumeTopTime !== null) {
                        var timestamp  = new Date().getTime();
                        var h = Math.floor((timestamp - resumeTopTime) / 1000 / 60 / 60 % 24);
                        if (h >= 24) {
                            resumeTop(resumeid, Version, Name, Id);
                        } else {
                            if (data.ApplyForQueueCount !== -1) {
                                $('.waitingNumberWrap.s').show();
                                $('.waitingNumberWrap.s').find('.tit').children('span').text(data.ApplyForQueueCount);
                            } else {
                                $('.waitingNumberWrap.h').show();
                            }
                        }
                    } else {
                        resumeTop(resumeid, Version, Name, Id);
                    }
                } else {
                    $('.aui-dialog-mask').show();
                    window.setTimeout(function () {
                        $('.aui-dialog-mask').remove();
                    }, 2000);
                }
            },
            error: function (data) {
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        });
    }
    // 置顶商品
    function resumeTop(resumeNum, resumeVer, resumeTitle, resumeId) {
        $.ajax({
            url: 'https://mip.zhaopin.com/home/getresumetopindex',
            type: 'post',
            data: {
                payPoint: '34a95223a071419da275719ea2a55daf',
                resumeId: resumeId,
                resumeNum: resumeNum,
                resumeVer: resumeVer,
                resumeTitle: resumeTitle,
                enterSource: '15',
                appplat: '7'
            },
            success: function (data, textStatus, jqxhr) {
                $('.resumeTop .pay_row li').remove();
                var pList = '';
                var url1 = '';
                $.each(data.productList.Productes, function (k, p) {
                    url1 += 'https://mip.zhaopin.com/home/payorder?payPoint=34a95223a071419da275719ea2a55daf';
                    url1 += '&resumeId=' + data.resumeId + '';
                    url1 += '&resumeNum=' + data.resumeNum + '';
                    url1 += '&resumeVer=' + data.resumeVer + '';
                    url1 += '&resumeTitle=' + escape(data.resumeTitle) + '';
                    url1 += '&pId=' + p.Pid + '';
                    url1 += '&enterSource=15&appplat=7';
                    if (p.PIsRecommend === 1) {
                        var Recommend = 'focused __ga__index_producttjt_001';
                        var hint = '<div class="hintmessage"></div>';
                        pList += '<li class=' + Recommend + '>';
                        pList += '<a href="' + url1 + '" onclick="rtclose();">';
                        pList += '<span><em>' + p.PName + '</em>简历置顶</span>';
                        pList += '<div class="tc"><i class="prime_price">￥' + p.PPrice + '</i>';
                        pList += '<i class="new_price">￥' + p.ProductCutoff + '</i></div></a>' + hint + '</li>';
                    } else {
                        pList += '<li><a href="' + url1 + '" onclick="rtclose();">';
                        pList += '<span><em>' + p.PName + '</em>简历置顶</span>';
                        pList += '<div class="tc"><i class="prime_price">￥' + p.PPrice + '</i>';
                        pList += '<i class="new_price">￥' + p.ProductCutoff + '</i></div></a></li>';
                    }
                });
                $('.resumeTop .pay_row').append(pList);
                // 0未开通 1已开通
                if (data.isResumeTopService === 1) {
                    // 是否24小时
                    if (data.ServiceExpireds !== null && data.ServiceExpireds.message !== null) {
                        // 是否为空
                        if (data.productList.Productes !== null && data.productList.Productes.length > 1) {
                            $('.waitingNumberWrap.rt').show();
                            $('.resumeTop').show();
                            var datatopText = '您的简历置顶服务即将到期，昨天简历被查看了';
                            datatopText += '<span class="red">' + data.expireViewed.viewed.Viewed + '次</span>，';
                            datatopText += '打败了<span class="red">' + data.expireViewed.viewed.DefeatPercent + '';
                            datatopText += '%</span>的求职者，要保持吗？';
                            $('.resumeTop .topText').html(datatopText);
                        } else {
                            var ApplyForQueueCount = $('.cgshenqingbtn').attr('data-ApplyForQueueCount');
                            if (ApplyForQueueCount !== -1) {
                                $('.waitingNumberWrap.s').show().find('.tit').children('span').text(ApplyForQueueCount);
                            } else {
                                $('.waitingNumberWrap.h').show();
                            }
                        }
                    } else {
                        var ApplyForQueueCount = $('.cgshenqingbtn').attr('data-ApplyForQueueCount');
                        if (ApplyForQueueCount !== -1) {
                            $('.waitingNumberWrap.s').show().find('.tit').children('span').text(ApplyForQueueCount);
                        } else {
                            $('.waitingNumberWrap.h').show();
                        }
                    }
                } else {
                    $('.waitingNumberWrap.rt').show();
                    $('.resumeTop').show();
                    $('.resumeTop .topText').html('还在一个一个的申请职位？赶快置顶你的简历,让HR第一时间看到你！');
                }
            }
        });
    }
    function rtclose() {
        $('.waitingNumberWrap.rt').hide();
        $('.resumeTop').hide();
        var myDate = new Date().getTime();
        localStorage.setItem('resumeTopTime', myDate);
        recoveryBodyTouch();
    }
    // 举报
    function report() {
        var reportUrl = 'https://mip.zhaopin.com/Home/Report';
        var PositionNumber = $('#jobdetail').attr('data-jobnumber');
        var CompanyNumber = $('#jobdetail').attr('data-compnumber');
        var CompanyName = $('#jobdetail').attr('data-compname');
        var PositionName = $('#jobdetail').attr('data-jobname');
        var paramUrl = '?PositionNumber=' + PositionNumber + '&CompanyNumber=' + CompanyNumber + '';
        paramUrl += '&CompanyName=' + CompanyName + '&PositionName=' + PositionName + '';
        window.location.href = reportUrl + paramUrl;
    }
    function setFeedbackNum() {
        if (window.localStorage) {
            // localStorage
            if (localStorage.getItem('FeedbackNum') === 3) {
                return true;
            }
            if (localStorage.getItem('FeedbackNum') === null) {
                localStorage.setItem('FeedbackNum', '1');
                $('.jobsFeedBackWrap').show();
                return false;
            } else {
                var num = localStorage.getItem('FeedbackNum');
                num++;
                localStorage.setItem('FeedbackNum', num);
                $('.jobsFeedBackWrap').show();
                return false;
            }
        }
    }
    // 去除body Touch事件
    function removeBodyTouch() {
        $('body').on('touchstart, touchmove', function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        });
    }
    // 恢复body Touch事件
    function recoveryBodyTouch() {
        $('body').off('touchstart, touchmove');
    }
    // 检查客户端是否已包含登录的cookie 返回bool表示是否已经登录
    function checkCookie() {
        if (window.navigator.cookieEnabled) {
            return true;
        } else {
            return false;
        }
    }
    function getCookie(objName) {
        var arrStr = document.cookie.split('; ');
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split('=');
            if (temp[0] === objName) {
                return unescape(temp[1]);
            }
        }
    }
    // 获取ga统计cookie(utmcsr)
    function parseAnalyticsCookie() {
        var values = {};
        var cookie = readCookie('__utmz');
        if (cookie) {
            var z = cookie.split('.');
            if (z.length >= 4) {
                var y = z[4].split('|');
                for (var i = 0; i < y.length; i++) {
                    var pair = y[i].split('=');
                    values[pair[0]] = pair[1];
                }
            }
        }
        return values;
    }
    // ga读取cookie
    function readCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
    // 跳转登录
    function userLogin(noreturn) {
        if (checkCookie() === false) {
            alert('您的浏览器不支持cookie将无法登录,请使用其它浏览器');
            return;
        }
        if (noreturn) {
            window.location.href = 'https://mip.zhaopin.com/account/login?prevUrl=' + escape(window.location.href) + '';
        } else {
            window.location.replace('https://mip.zhaopin.com/account/login?prevUrl=' + escape(window.location.href) + '');
        }
    }
    return {
        render: render
    };
});
