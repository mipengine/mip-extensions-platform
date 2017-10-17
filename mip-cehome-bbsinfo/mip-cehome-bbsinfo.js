/**
 * @file mip-cehome-bbsinfo 组件
 * @author
 */

define(function (require) {
    window.loading = 1;
    var $ = require('zepto');

    var ext = {};
    var getExtdata = function () {
        var extdata = {};
        $('script.json-inline').each(function (i, ele) {
            var name = $(ele).attr('data-name');
            var value = $(ele).text();
            extdata[name] = JSON.parse(value);
        });

        return extdata;
    };
    ext = getExtdata();
    console.log(ext);

    var tid = ext.info.tid;
    var otherId = ext.info.otherId;
    var sort = ext.info.sort;
    var currentPage = 1;
    var dataUrl = ext.info.dataUrl;
    var threadInfoUrl = ext.info.threadInfoUrl;
    var otherInfoUrl = ext.info.otherInfoUrl;
    var eqid = ext.info.eqid;
    var title = ext.info.title;
    var desc = ext.info.desc;
    var apiUrl = ext.info.apiUrl;
    var uids = ext.info.uids;
    var hasParam = ext.info.hasParam;
    var shareUrl = ext.info.shareUrl;
    var shareLogUrl = ext.info.shareLogUrl;
    var addShareUrl = ext.info.addShareUrl;
    var viewLogUrl = ext.info.viewLogUrl;
    var tbbRecUrl = ext.info.tbbRecUrl;
    var tbbNewIcon = ext.info.tbbNewIcon;
    var tbbBzIcon = ext.info.tbbBzIcon;
    var tbbYgcIcon = ext.info.tbbYgcIcon;
    var tbbIcon14 = ext.info.tbbIcon14;
    var tbbIcon15 = ext.info.tbbIcon15;
    var tbbIcon16 = ext.info.tbbIcon16;
    var tbbZyIcon = ext.info.tbbZyIcon;

    $(function () {

        $(window).scroll(function () {

            if (ext.info.eqid) {
                return;
            }

            var scrollTop = $(this).scrollTop();
            var windowHeight = $(this).height();
            var scrollHeight = $(document).height() - 5;

            if (scrollTop > 600) {
                $('.toTop').show();
            } else {
                $('.toTop').hide();
            }

            if ((scrollTop + windowHeight > scrollHeight) && window.loading) {

                $('#loadedAll').hide();
                window.loading = 0;
                console.log('loading');

                if (currentPage === 1) {
                    window.loading = 1;
                    currentPage = 2;
                    $('#loading').hide();
                    return;
                }

                $('#loading').show();

                var url = ext.info.dataUrl + '/' + currentPage;

                fetch(url, {
                    method: 'get',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    credentials: 'include'

                }).then(function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        res.text().then(function (responseText) {
                            var objRet = $.parseJSON(responseText);
                            if (objRet.code === '0' && objRet.data) {
                                var obj = objRet.data;
                                var str = '';
                                var i;
                                for (i in obj) {

                                    var strimg = '';
                                    var strhonor = '';
                                    var j;
                                    for (j in obj[i].honor) {
                                        strhonor += '<mip-img class="medal" src="' + obj[i].honor[j] + '"></mip-img>';
                                    }

                                    for (j in obj[i].image) {
                                        strimg += '<mip-img src="' + obj[i].image[j] + '"></mip-img>';
                                    }

                                    var flClass = '';
                                    var fl = obj[i].floor === 1 ? '沙发' : obj[i].floor + '楼';
                                    if (fl === '1楼') {
                                        fl = '沙发';
                                        flClass = 'first';
                                    }

                                    var strreply = '';
                                    var strreplydel = '';

                                    if (obj[i].replyDel === 'Y') {
                                        strreplydel = '该内容已被原作者删除';
                                    } else {
                                        strreplydel = '回复<em class="avatar">'
                                        + obj[i].replyUsername
                                        + '</em>' + obj[i].replyTitle;
                                    }

                                    if (obj[i].replyId > 0) {
                                        strreply = '<div class="replyUser">\
                                                        <p>' + strreplydel + '</p>\
                                                     </div>';
                                    }

                                    var strhost = '';
                                    if (obj[i].tuid > 0 && obj[i].tuid === obj[i].uid) {
                                        strhost = '<em class="host"></em>';
                                    }

                                    var strmessage = '';
                                    var delclass = '';
                                    if (obj[i].isDel === 'Y') {
                                        strmessage = '该内容已被原作者删除';
                                        delclass = 'deleted';
                                    } else {
                                        strmessage = obj[i].message;
                                    }

                                    str += '<div class="item">\
                                                    <div class="userBox">\
                                                        <a href="'
                                                        + otherInfoUrl + '/'
                                                        + obj[i].encryptUid
                                                        + '/">\
                                                        <mip-img class="userImg" \
                                                        src="'
                                                        + obj[i].avatar
                                                        + '"></mip-img></a>\
                                                        <div class="userInfo">\
                                                            <div class="user">\
                                                                <a href="'
                                                                + otherInfoUrl
                                                                + '/'
                                                                + obj[i].encryptUid
                                                                + '/">\
                                                                <h3 \
                                                                class="username">'
                                                                + obj[i].username
                                                                + '</h3></a>\
                                                                <em class="level">'
                                                                + obj[i].lv
                                                                + '</em>\
                                                                ' + strhonor + '\
                                                                ' + strhost + '\
                                                                <em class="floor '
                                                                + flClass
                                                                + '">' + fl
                                                                + '</em>\
                                                            </div>\
                                                            <p class="time">'
                                                            + obj[i].datelineStr
                                                            + '</p>\
                                                        </div>\
                                                    </div>\
                                                    <div class="postCon '
                                                    + delclass + '">'
                                                    + strmessage + '</div>\
                                                    ' + strreply + '\
                                                    <div onclick="openApp('
                                                    + obj[i].tid
                                                    + ')" class="reply">\
                                                    <em class="replyBtn">回复</em>\
                                                    </div>\
                                                </div>';
                                }

                                if (str !== '') {
                                    $('#loading').hide();
                                    $('#replyList').append(str);
                                    currentPage += 1;
                                    window.loading = 1;
                                } else {
                                    $('#loading').hide();
                                    $('#loadedAll').show();
                                    setTimeout('window.loading=1', 1000);
                                }
                            }

                            console.log('nextpage is--' + currentPage);

                        });

                    } else {

                        $('#loading').hide();
                        window.loading = 1;
                    }

                }, function (error) {

                    $('#loading').hide();
                    window.loading = 1;

                });

            }

            window.nofindAvatar();
            window.infoOpenApp();

        });

        function scrollUp(dis) {
            var t = $(window).scrollTop();
            $('body').prop('scrollTop', t - dis);
        }

        $('#toSort').click(function () {
            var eqid = ext.info.eqid;
            var otherId = ext.info.otherId;
            var tid = ext.info.tid;
            var threadInfoUrl = ext.info.threadInfoUrl;

            otherId = otherId === '' ? 0 : otherId;
            var sort = $('#toSort').attr('data-order');

            if (eqid) {
                var url = threadInfoUrl + '/' + tid + '/'
                + otherId + '/' + sort + '/' + '?eqid=' + eqid;
            } else {
                var url = threadInfoUrl + '/' + tid + '/'
                + otherId + '/' + sort + '/';
            }

            window.location.href = url;
        });

        function scrollToEnd() {
            var h = $(document).height() - $(window).height();
            $('body').scrollTop(h);
        }

        $('#cancleShareBtn').click(function () {
            if (!window.isWeiXin()) {
                $('.mask').hide();
                $('.shareBox').hide();
            }
        });

        $('div.openAppBtn').click(function () {
            if (window.isWeiXin()) {
                $('#wxmask').show();
                $('#shareTxt').show();
            } else {
                window.openApp(ext.info.tid);
            }
        });

        $('#wxmask').click(function () {
            $('#wxmask').hide();
            $('#shareTxt').hide();
        });

    });

    window.goto = function (obj) {
        window.location.href = $(obj).attr('rel');
    };

    window.closeTopad = function () {
        $('#topad').hide();
    };

    $('#topad').on('click', function (e) {
        var obj = e.target;
        if ($(obj).attr('class') !== 'closeBtn') {
            window.openApp(tid);
        }
    });

    $('#topad > i').on('click', function () {
        window.closeTopad();
    });

    $('#bds_copy, #bds_qzone, #bds_tsina').on('click', function () {

        fetch(addShareUrl, {
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8', // 设置表单提交的编码方式，php那边才能用$_POST获取数据
                'X-CSRF-TOKEN': $('meta[name=\'csrf_token\']').attr('content')
            },
            body: '',
            credentials: 'include'

        }).then(function (res) {
            console.log(res);
        }, function (error) {
            console.log(error);
        });

    });

    $('#wxmask').click(function () {
        $('#rankshare').hide();
    });

    function viewLog() {
        var fetchJsonp = require('fetch-jsonp');
        var params = 'sharePeopleUids=' + ext.info.uids + '&shareId=' + ext.info.tid + '&shareType=4';
        fetchJsonp(ext.info.viewLogUrl + '?' + params, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            jsonpCallback: 'callback',
            credentials: 'include'

        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            // console.log(data);
        });
    }

    function shareLog() {
        fetch(ext.info.shareLogUrl, {
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8', // 设置表单提交的编码方式，php那边才能用$_POST获取数据
                'X-CSRF-TOKEN': $('meta[name=\'csrf_token\']').attr('content')
            },
            body: 'tid=' + ext.info.tid,
            credentials: 'include'

        }).then(function (res) {
            console.log(res);
            if (res.status === 200) {
                res.text().then(function (responseText) {
                    var objRet = $.parseJSON(responseText);
                    if (objRet.code === '0') {
                        $('#wxmask').show();
                        $('#rankshare').show();
                        $('#rankshare').css({'transform':
                        'translate(-50%, -50%)', 'z-index': '20'});
                    }

                });
            }

        }, function (error) {
            console.log(error);
        });
    }

    function loadTbbRec() {

        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp(ext.info.tbbRecUrl, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            jsonpCallback: 'callback',
            credentials: 'include'

        }).then(function (res) {
            var obj = res.json();
            obj.then(function (data) {
                var str = '';
                var i;
                for (i in data) {
                    var item = data[i];
                    var shoufuStr = '';
                    if (item.downPaymentStr) {
                        shoufuStr = '<span class="downpayment">首付'
                        + item.downPaymentStr + '万</span>';
                    }

                    var newStr = '';
                    if (item.showNewUpload) {
                        newStr = '<span class="xsj_icon"><img src="'
                        + ext.info.tbbNewIcon + '"></span>';
                    }

                    var baozhenStr = '';
                    if (item.showTiejiaBao) {
                        baozhenStr = '<span class="tjb_icon"><img src="'
                        + ext.info.tbbBzIcon + '"></span>';
                    }

                    var yjcStr = '';
                    if (item.level < 3 && item.inspectStatus === 5
                        && item.equipmentSource !== 4
                        && item.equipmentSource !== 5) {
                        yjcStr = '<span class="jc_icon"><img src="'
                        + ext.info.tbbYgcIcon + '"></span>';
                    } else if (item.level === 3 && item.inspectStatus === 5
                        && item.equipmentSource !== 4
                        && item.equipmentSource !== 5) {
                        yjcStr = '<span class="jc_icon"><img src="'
                        + ext.info.tbbYgcIcon + '"></span>';
                    }

                    var cheshangStr = '';
                    if (item.equipmentSource === 4
                        && item.promiseStatus === 1) {
                        cheshangStr = '<span class="cs2_icon"><img src="'
                        + ext.info.tbbIcon14 + '"></span>\
                                   <span class="cs_icon"><img src="'
                                   + ext.info.tbbIcon16 + '"></span>';
                    } else if (item.equipmentSource === 4
                        && item.promiseStatus === 2) {
                        cheshangStr = '<span class="cs_icon"><img src="'
                        + ext.info.tbbIcon15 + '"></span>\
                                   <span class="cs_icon"><img src="'
                                   + ext.info.tbbIcon16 + '"></span>';
                    } else if (item.equipmentSource === 4
                        && item.promiseStatus === 3) {
                        cheshangStr = '<span class="cs_icon"><img src="'
                        + ext.info.tbbIcon15 + '"></span>\
                                   <span class="cs2_icon"><img src="'
                                   + ext.info.tbbIcon14 + '"></span>\
                                   <span class="cs_icon"><img src="'
                                   + ext.info.tbbIcon16 + '"></span>';
                    }

                    var zyStr = '';
                    if (item.showSelfSupport) {
                        zyStr = '<span class="zy_icon"><img src="'
                        + ext.info.tbbZyIcon + '"></span>';
                    }

                    var hourStr = '';
                    var yearStr = '';
                    if (item.outDate === 0 || item.outDate === null) {
                        yearStr = '年限不详'
                        + '&nbsp;&nbsp;<em>|</em>&nbsp;&nbsp;';
                    } else {
                        yearStr = item.outDate + '年'
                        + '&nbsp;&nbsp;<em>|</em>&nbsp;&nbsp;';
                    }

                    if (item.hours === 0 || item.hours === null) {
                        hourStr = '小时不详'
                        + '&nbsp;&nbsp;<em>|</em>&nbsp;&nbsp;';
                    } else {
                        hourStr = item.hours
                        + '小时' + '&nbsp;&nbsp;<em>|</em>';
                    }

                    str += '<a href="javascript:void(0);" eqid="'
                        + item.id + '" brand="'
                        + item.brandName
                        + '" model="'
                        + item.modelName
                        + '" category="'
                        + item.categoryName
                        + '" tonnage="'
                        + item.tonnage
                        + '" outdate="'
                        + item.outDate
                        + '" createTime="'
                        + item.createTime
                        + '" parkingplace="'
                        + item.provinceName
                        + '-' + item.cityName
                        + '" price="' + item.price
                        + '" hours="' + item.hours
                        + '" eqsource="' + item.equipmentSource
                        + '" rel="' + item.detailUrl
                        + '" onclick="goto(this);"><li>\
                            <div class="list-lt">\
                                <img src="'
                                + item.firstImgPathDto.pathMid
                                + '" class="img-lazyload">\
                            </div>\
                            <div class="pd-info newPd_info_31">\
                                <h3>' + item.brandName + '&nbsp;'
                                + item.modelName + '&nbsp;'
                                + item.categoryName + '</h3>\
                                <div class="taimAddrWrap">\
                                    <span class="pd-time">'
                                    + yearStr + '' + hourStr
                                    + '</span><span class="adr_t">'
                                    + item.provinceName + '-'
                                    + item.cityName + '</span>\
                                </div>\
                                <div class="price-icon">\
                                    <div class="price">'
                                    + item.formatPrice + '<i>万</i>\
                                            ' + shoufuStr + '\
                                    </div>\
                                </div>\
                                <div class="index-icon">\
                                    ' + newStr + '\
                                    ' + baozhenStr + '\
                                    ' + yjcStr + '\
                                    ' + cheshangStr + '\
                                    ' + zyStr + '\
                                </div>\
                            </div>\
                        </li></a>';
                }

                $('#carlist').append(str);
            });

        }).then(function (data) {
            // console.log(data);
        });
    }

    function wxshare(config) {

        var title = config.title;
        var desc = config.desc;
        var apiUrl = config.apiUrl;
        var shareUrl = config.shareUrl;
        var imgUrl = config.imgUrl;
        var pageUrl = location.href.split('#')[0];

        var arr = {
            'pageUrl': pageUrl
        };

        fetch(apiUrl + '/?pageUrl=' + pageUrl, {
            method: 'get',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            credentials: 'include'

        }).then(function (res) {
            if (res.status === 200) {
                res.text().then(function (responseText) {
                    var data = $.parseJSON(responseText);
                    var signPackage = data.data;
                    window.wx.config({
                        debug: false,
                        appId: signPackage.appId,
                        timestamp: signPackage.timestamp,
                        nonceStr: signPackage.nonceStr,
                        signature: signPackage.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onVoiceRecordEnd',
                            'playVoice',
                            'onVoicePlayEnd',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard'
                        ]
                    });

                    window.wx.ready(function () {
                        window.wx.onMenuShareAppMessage({
                            title: title,
                            desc: desc,
                            link: shareUrl,
                            imgUrl: imgUrl,
                            type: '',
                            dataUrl: '',
                            success: function () {
                                shareLog();
                            },
                            cancel: function () {
                            }
                        });

                        window.wx.onMenuShareTimeline({
                            title: title,
                            link: shareUrl,
                            imgUrl: imgUrl,
                            success: function () {
                                shareLog();
                            },
                            cancel: function () {
                            }
                        });
                    });

                });
            }

        }, function (error) {
            console.log(error);
        });

    }

    window.infoOpenApp = function () {
        $('em.replyBtn').click(function () {
            var tid = $(this).attr('tid');
            window.openApp(tid);
        });
    };

    var render = function () {

        $('#loadedAll').hide();
        $('#loading').hide();

        loadUgc();

        $('em.replyBtn').click(function () {
            var tid = $(this).attr('tid');
            window.openApp(tid);
        });

        window.infoOpenApp();

        if (ext.info.eqid) {
            loadTbbRec();
        }

        if (window.isWeiXin() && ext.info.uids && ext.info.hasParam) {
            viewLog();
        }

        require(['https://res.wx.qq.com/open/js/jweixin-1.0.0'],
            function (wx) {
                window.wx = wx;
                var shareConfig = {
                    'title': ext.info.title,
                    'desc': ext.info.desc,
                    'apiUrl': ext.info.apiUrl,
                    'shareUrl': ext.info.shareUrl,
                    'imgUrl': 'https://m.cehome.com/bbs/img/wxshare.png'
                };
                wxshare(shareConfig);
            }
        );

    };

    function loadUgc() {
        require(['//imgcache.qq.com/open/qcloud/video/vcplayer/TcPlayer'],
        function (e) {
            window.TcPlayer = e.TcPlayer;
            if ($('.ugc_video').length) {
                var videoId = $('.ugc_video').attr('id');
                var videoSrc = $('#' + videoId).data('url');
                var posterSrc = $('#' + videoId).data('img');

                var player = new window.TcPlayer(videoId, {
                    'm3u8': videoSrc,
                    'autoplay': false,
                    'coverpic': {'style': 'cover', 'src': posterSrc},
                    'width': '100%',
                    'height': '200',
                    'x5_fullscreen': false,
                    'x5_type': 'h5'
                });
                $('#' + videoId + ' .vcp-player').append('<i class="playBtn"></i>');
                $('.ugc_video').on('click', '.playBtn', function () {
                    player.play();
                });
                $('.vcp-player').removeClass('touchable');
            }
        });
    }

    window.onload = function () {
        render();
        window.nofindAvatar();
        window.nofindImg();
    };

    return {
        render: render
    };

});
