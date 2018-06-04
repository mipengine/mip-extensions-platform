/**
 * @file mip-jia-footertlplus 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var viewport = require('viewport');
    var fixedElement = require('fixed-element');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    var scrollTop = {
        body: 0,
        documentElement: 0,
        offset: 0
    };

    // 获取城市
    function cityFn(callback) {
        if (!storage.get('city') || storage.get('city') === 'false') {
            $.ajax({
                url: '//mip.m.jia.com/city/getCurrentAreaNew',
                type: 'get',
                dataType: 'jsonp',
                success: function (a) {
                    if (a.code > 0) {
                        var city = JSON.stringify(a.result.site.area_info);
                        storage.set('city', city, 3600000);
                        typeof callback === 'function' && callback(a.result.site.area_info);
                    }
                },
                error: function (a) {
                    console.log('获取城市失败');
                }
            });
        }
        else {
            var city = JSON.parse(storage.get('city'));
            typeof callback === 'function' && callback(city);
        }
    }

    function showpopmask(ele) {
        fixedElement.hideFixedLayer(fixedElement._fixedLayer);
        // 保存页面当前滚动状态，因为设置overflow:hidden后页面会滚动到顶部
        scrollTop.body = document.body.scrollTop;
        scrollTop.documentElement = document.documentElement.scrollTop;
        scrollTop.offset = window.pageYOffset;
        document.documentElement.classList.add('mip-no-scroll');
        ele.find('.popmask').show();
        ele.find('.fixed-footer').show();
    }

    function hidepopmask(ele) {
        fixedElement.showFixedLayer(fixedElement._fixedLayer);
        document.documentElement.classList.remove('mip-no-scroll');
        // 恢复页面滚动状态到弹层打开之前
        if (typeof (document.body.scrollTo) === 'function') {
            // 先判断存在，因为safari浏览器没有document.body.scrollTo方法
            document.body.scrollTo(0, scrollTop.body);
        }
        if (typeof (document.documentElement.scrollTo) === 'function') {
            // 先判断存在，因为safari浏览器没有document.documentElement.scrollTo方法
            document.documentElement.scrollTo(0, scrollTop.documentElement);
        }
        window.scrollTo(0, scrollTop.offset);
        ele.find('.popmask').hide();
        ele.find('.fixed-footer').hide();
        ele.find('.form-input.phone').blur();
        ele.find('.fixed-footer').attr('class', 'fixed-footer').find('.item').removeClass('cur');
    }

    // [装修、团购、旺铺] 公钥
    var keyArr = {
        zx: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8hgXGmTam'
        + '/ZBj9q8UteZ+1Z0sja7g7gQBR1RxfVJBbxGMwLgmW2uc+ij4F'
        + 'fFsr6poM2IO64JfDxl+9H1tmEq6kEmuju7ue4b/4KcMTftKGjr+'
        + 'DtbNiwtFhLKIU6iQRKjetWor8pj7/arhR5weSh04AWwEFQNsQchqM2eA7gEs2wIDAQAB',
        tg: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCC0w+gQPas'
        + 'CFul1A/LVYfU4A2C0niMgcb9t+nftc5behMmf5l0aT6fmMa1e+'
        + 'wdfmzleVljEaFcnVi/yOY13HqPa5fymwkVC6k+7beVnFUTDUSK5'
        + 'SJTep+jSHmNCKPM+nVhm2xQu+SjZbxbeIiFdm0mfSJH/8faNXdiWU4rv9NuwIDAQAB',
        wp: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAurXXoxX'
        + 'AHK4vwRMDDQRFhkQH6tDbVN/k69JGBAGxm2N4+2TVDCKWrBqKjgm'
        + 'jQSqubHiURa9O3bfAXUDYyV7S3/Vajc+NP0kU0l6Fl8q4AldSsQkSf'
        + 'Lq5NrcxU0QsXJbfRCEIyS+lfG9/O+XGVrvpy21hOqs6Zmgvsa5//d6BT'
        + 'C31FOb/d9H4C/iFgIXqAvcEJms+agPpXTMDDjxbB6/6P8qZoqKR1iztv3'
        + 'bzwowU7YRpMVwwdr74K+ka7p0Y+KnnE4oiX3b5rDfQ/GOdG9OJhpGMAUkpR'
        + 'jXy01hu9bT+ep7sYTlhVPhwr+8OICO7tsxNoNW7InOix26oY0IvqWcGjwIDAQAB'
    };

    /**
     * 加密手机号
     *
     * @class
     * @param {number or string} phone 手机号
     * @param {string} type 接口类型：zx(装修)、tg(团购)、wp(旺铺)
     */

    function mobileEncrypt(phone, type) {
        /* global JiaJSEncrypt */
        var JSEncrypt = new JiaJSEncrypt();
        JSEncrypt.setKey(keyArr[type]);
        return JSEncrypt.encrypt(phone);
    }


    var zxbjPage = {
        usFlag: false,
        init: function (data, ele) {
            this.eles = ele;
            zxbjPage.method.bottomTonglan(data, ele);
        },
        arr: [
            {
                'title': '0元户型设计',
                'tit': '专业设计师1对1服务 3份设计方案PK',
                'btn': '申请免费设计服务',
                'class': 'sheji',
                'extra': '{id:10002}'
            },
            {
                'title': '10秒获取装修报价',
                'tit': '给你专业、公正、透明的装修报价',
                'btn': '免费获取报价明细',
                'class': 'baojia',
                'extra': '{id:10001}'
            },
            {
                'title': '装修专享贷 0元拎包入住',
                'tit': '0利息 0手续费 无抵押 仅限100户',
                'btn': '查看我的贷款额度',
                'class': 'mxd',
                'extra': '{id:10007}'
            },
            {
                'title': '全景VR设计',
                'tit': '根据户型 定制720 全景家装方案',
                'btn': '限时免费设计定制',
                'class': 'qjdz',
                'extra': '{id:10008}'
            }
        ],
        method: {
            bottomTonglan: function (data, ele) {
                var $this = $(ele);
                var str = '';
                str += '<div class="popmask"></div>';

                str += '<mip-fixed type="bottom" class="fixed-footer">';
                str += '<div class="fixed-footer-box">';
                str += '<div class="item sj" bdsl-click-service="" bdsl-extra="{id:10002}">';
                str += '<i class="icon pos1"></i>';
                str += '<p class="txt">免费设计</p>';
                str += '</div>';
                str += '<div class="item bj" bdsl-click-service="" bdsl-extra="{id:10001}">';
                str += '<i class="icon pos2"></i>';
                str += '<p class="txt">智能报价</p>';
                str += '</div>';
                if (data.hbdisplay !== 'hidden') {
                    str += '<div class="hb-wrap footer_xrhb"';
                    str += 'bdsl-click-service="" bdsl-extra="{id:10003}">';
                    str += '</div>';
                }
                str += '<div class="item dk" bdsl-click-service="" bdsl-extra="{id:10007}">';
                str += '<i class="icon pos3"></i>';
                str += '<p class="txt">专享贷</p>';
                str += '</div>';
                str += '<div class="item qj" bdsl-click-service="" bdsl-extra="{id:10008}">';
                str += '<i class="icon pos4"></i>';
                str += '<p class="txt">全景定制</p>';
                str += '</div>';
                str += '</div>';
                str += '<div class="fixed-footer-pop">';
                str += '<div class="fixed-footer-pop-box">';
                str += '<div class="topimg"></div>';
                str += '<em class="close"></em>';
                str += '<div class="pop-box">';
                str += '<dl class="form-dl">';
                str += '<dt class="form-dt">房屋面积</dt>';
                str += '<dd class="form-dd area">';
                str += '<input type="tel" class="form-input area" placeholder="80" maxlength="6" />';
                str += '<em>m&sup2;</em>';
                str += '</dd>';
                str += '</dl>';
                str += '<dl class="form-dl">';
                str += '<dt class="form-dt">联系方式</dt>';
                str += '<dd class="form-dd">';
                str += '<input type="tel" class="form-input phone" placeholder="请输入您的手机号" ';
                str += 'maxlength="11" bdsl-key="phone" bdsl-required="^1[3|4|5|6|7|8|9]\\d{9}$"';
                str += ' bdsl-name-footerform="" />';
                str += '</dd>';
                str += '</dl>';
                str += '<div class="btn-box">';
                str += '<a class="footer-btn" bdsl-extra="{id:10002}" bdsl-submit="footerform">申请免费设计服务</a>';
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '<div class="ask-zxbj-loading"></div>';
                str += '</div>';
                str += '</mip-fixed>';
                $this.append(str);

                cityFn();

                zxbjPage.method.windowScroll(data, ele);

                // 点击展开按钮
                zxbjPage.method.clickUpFun(data, ele);

                // 点击报名按钮
                zxbjPage.method.zxbjSubmitBtn(data, ele);

                // 加载图片
                zxbjPage.method.loadImg('//mued3.jia.com/image/mobile/toutiao/footer-top-1.png');
                zxbjPage.method.loadImg('//mued3.jia.com/image/mobile/toutiao/footer-top-2.png');
                zxbjPage.method.loadImg('//mued3.jia.com/image/mobile/toutiao/footer-top-3.png');
                zxbjPage.method.loadImg('//mued3.jia.com/image/mobile/toutiao/footer-top-4.png');
            },
            scrollFun: function (data, ele) {
                var $this = $(ele);
                // 滚动条滚动的距离
                var scrollTop = viewport.getScrollTop();
                // 内容高度
                var domHeight = viewport.getScrollHeight();
                // 视口高度
                var viewHei = viewport.getHeight();
                // 如果用户自行做了操作 则此处不影响用户操作
                if (zxbjPage.usFlag || storage.get('usFlag') === 'true') {
                    return false;
                }
                // 滚动超过一屏
                if ($(data.scrollClass).length > 0) {
                    var eleTop = $(data.scrollClass).offset().top;
                    if (location.host === 'm.jia.com' || util.platform.isAndroid()) {
                        if (eleTop <= scrollTop + viewHei / 2) {
                            storage.set('usFlag', 'true', 21600000);
                            zxbjPage.usFlag = true;
                            $this.find('.footer_xrhb').trigger('click');
                        }
                    }
                    else {
                        if (eleTop <= viewHei / 2) {
                            storage.set('usFlag', 'true', 21600000);
                            zxbjPage.usFlag = true;
                            $this.find('.footer_xrhb').trigger('click');
                        }
                    }
                }
            },
            windowScroll: function (data, ele) {
                storage.rm('usFlag');
                // 滚动事件
                viewport.on('scroll', function () {
                    if (storage.get('usFlag') === 'true') {
                        return false;
                    }
                    zxbjPage.method.scrollFun(data, ele);
                });
            },
            changeHtml: function (obj, ele) {
                $(ele).find('.btn-box .footer-btn').html(obj.btn)
                    .attr('bdsl-extra', obj.extra)
                    .parents('.fixed-footer-pop-box')
                    .attr('class', 'fixed-footer-pop-box ' + obj['class'])
                    .find('.title').html(obj.title)
                    .siblings('.tit').html('<span>' + obj.tit + '</span>');
                $(ele).find('.fixed-footer')
                    .attr('class', 'fixed-footer ' + obj['class']);
            },
            loadImg: function (url) {
                var img = new Image();
                img.onload = function () {
                    img.onload = img.onerror = img.onabort = null;
                    img = null;
                };
                img.src = url;
            },
            clickUpFun: function (data, ele) {
                var $this = $(ele).find('.item');
                var $ele = $(ele).find('.fixed-footer-pop');
                // 点击show弹层
                $(data.ele).on('click', function () {
                    var index = $(data.ele).index(this);
                    $(ele).find('.item').eq(index).trigger('click');
                });
                // 点击展开按钮
                $this.on('click', function () {
                    var index = $this.index(this);
                    zxbjPage.method.changeHtml(zxbjPage.arr[index], ele);
                    $ele.removeAttr('style');
                    $(ele).find('.form-input.phone').blur();
                    if ($(this).hasClass('cur')) {
                        hidepopmask($(ele));
                        $(this).removeClass('cur');
                        $ele.removeClass('show');
                        $(ele).find('.fixed-footer').attr('class', 'fixed-footer');
                    }
                    else {
                        if ($('.fixed-footer .item').hasClass('cur')) {
                            $(this).addClass('cur').siblings().removeClass('cur');
                            $ele.hide().removeClass('show');
                            setTimeout(function () {
                                $ele.show().addClass('show');
                            }, 10);
                        }
                        else {
                            showpopmask($(ele));
                            $(this).addClass('cur').siblings().removeClass('cur');
                            $ele.addClass('show');
                        }
                    }
                });

                $ele.find('.close').on('click', function () {
                    hidepopmask($(ele));
                    $ele.removeAttr('style');
                    $ele.removeClass('show');
                });
                $(ele).find('.popmask').on('click', function () {
                    hidepopmask($(ele));
                    $ele.removeAttr('style');
                    $ele.removeClass('show');
                });
                $(ele).find('.hb-wrap').on('click', function () {
                    $(ele).find('.popmask').hide();
                    $(ele).find('.fixed-footer').hide();
                    $(ele).find('.form-input.phone').blur();
                    $(ele).find('.fixed-footer').attr('class', 'fixed-footer').find('.item').removeClass('cur');
                    $ele.removeAttr('style');
                    $ele.removeClass('show');
                });
            },
            zxbjSubmitBtn: function (data, ele) {
                var $this = $(ele);
                // 点击报名按钮
                $this.find('.footer-btn').on('click', function () {
                    var mobile = $.trim($(ele).find('.form-input.phone').val());
                    var area = $.trim($(ele).find('.form-input.area').val()) || '80';
                    var re = /^1[3|4|5|6|7|8|9]\d{9}$/;
                    if (mobile === '') {
                        zxbjPage.method.tipMask('请输入您的电话');
                    }
                    else if (!re.test(mobile)) {
                        zxbjPage.method.tipMask('请输入正确的手机号');
                    }
                    else {
                        $this.find('.ask-zxbj-loading').show();
                        if ($(this).parents('.fixed-footer-pop-box').hasClass('sheji')) {
                            zxbjPage.method.shejiAajx(data, ele, data.skipto[0]);
                        }
                        else if ($(this).parents('.fixed-footer-pop-box').hasClass('mxd')) {
                            zxbjPage.method.mxdAajx(data, ele, data.skipto[2]);
                        }
                        else if ($(this).parents('.fixed-footer-pop-box').hasClass('qjdz')) {
                            zxbjPage.method.shejiAajx(data, ele, data.skipto[3]);
                        }
                        else if ($(this).parents('.fixed-footer-pop-box').hasClass('baojia')) {
                            zxbjPage.method.zxAjax(data, ele, data.skipto[1]);
                        }
                    }
                });
            },

            shejiAajx: function (data, ele, url) {
                var $this = $(ele);
                var mobile = $.trim($(ele).find('.form-input.phone').val());
                var area = $.trim($(ele).find('.form-input.area').val()) || '80';
                var $city = JSON.parse(storage.get('city'));
                var index = $this.find('.item').index($this.find('.item.cur'));

                var applyData = {
                    city: $city['area_py'],
                    mobile: mobileEncrypt(mobile, 'zx'),
                    memo: area + '平方'
                };
                applyData['inversion_point'] = '户型设计';
                for (var x in data) {
                    if (x === 'username') {
                        applyData['username'] = data['username'][index];
                    }
                    else {
                        applyData[x] = data[x];
                    }
                }
                $.ajax({
                    type: 'get',
                    url: 'https://mip.m.jia.com/new_zhuangxiu/AjaxSaveNewShopApplyNoCodeJsonp',
                    data: applyData,
                    dataType: 'jsonp',
                    success: function (data) {
                        $this.find('.ask-zxbj-loading').hide();
                        if (data.status === 200) {
                            window.top.location.href = url;
                        }
                        else {
                            zxbjPage.method.tipMask(data.info);
                        }
                    },
                    complete: function () {
                        $this.find('.ask-zxbj-loading').hide();
                    },
                    error: function () {
                        $this.find('.ask-zxbj-loading').hide();
                        zxbjPage.method.tipMask('系统繁忙，请稍后再试！');
                    }
                });
            },

            mxdAajx: function (data, ele, url) {
                var $this = $(ele);
                var mobile = $.trim($(ele).find('.form-input.phone').val());
                var area = $.trim($(ele).find('.form-input.area').val()) || '80';
                var $city = JSON.parse(storage.get('city'));
                var applyData = {
                    city: $city['area_py'],
                    mobile: mobileEncrypt(mobile, 'zx'),
                    memo: area + '平方'
                };
                applyData['areaflag_name'] = $city['area_cn'];
                applyData['inversion_point'] = '免息贷MIP站';
                applyData['username'] = '免息贷';
                applyData['source'] = data.source;
                applyData['selfUrl'] = data.self_url;
                $.ajax({
                    type: 'get',
                    url: 'https://mip.m.jia.com/JiaZhuangxiuTouFang/ajaxDaikuanApply',
                    data: applyData,
                    dataType: 'jsonp',
                    success: function (data) {
                        $this.find('.ask-zxbj-loading').hide();
                        if (data.status === 200) {
                            window.top.location.href = url;
                        }
                        else {
                            zxbjPage.method.tipMask(data.info);
                        }
                    },
                    complete: function () {
                        $this.find('.ask-zxbj-loading').hide();
                    },
                    error: function () {
                        $this.find('.ask-zxbj-loading').hide();
                        zxbjPage.method.tipMask('系统繁忙，请稍后再试！');
                    }
                });
            },


            zxAjax: function (data, ele, url) {
                var $this = $(ele);
                var mobile = $.trim($(ele).find('.form-input.phone').val());
                var area = $.trim($(ele).find('.form-input.area').val()) || '80';
                var $city = JSON.parse(storage.get('city'));
                var index = $this.find('.item').index($this.find('.item.cur'));
                var yusuanPostD = {
                    areaname: $city['area_cn'],
                    pro: $city['city_cn'],
                    area: area,
                    areaflag: $city['area_py'],
                    fjnum: '2',
                    ktnum: '1',
                    wsjnum: '1',
                    cfjnum: '1',
                    ytnum: '1'
                };
                var applyData = {
                    city: $city['area_py'],
                    baojia: '',
                    mobile: mobileEncrypt(mobile, 'zx'),
                    memo: area + '平方,' + yusuanPostD.fjnum + '室,' + yusuanPostD.ktnum + '厅,' + yusuanPostD.wsjnum + '卫'
                };
                for (var x in data) {
                    if (x === 'username') {
                        applyData['username'] = data['username'][index];
                    }
                    else {
                        applyData[x] = data[x];
                    }
                }
                if (area < 35) {
                    zxbjPage.method.zxbmFun(applyData, yusuanPostD, url);
                }
                else if (area > 180) {
                    zxbjPage.method.zxbmFun(applyData, yusuanPostD, url);
                }
                else {
                    $.ajax({
                        url: 'https://mip.m.jia.com/JiaZhuangxiu/qOpenYusuan/',
                        type: 'get',
                        dataType: 'jsonp',
                        data: yusuanPostD,
                        jsonp: 'callback',
                        timeout: 10000,
                        success: function (msg) {
                            applyData.baojia = msg.info.total_price;
                            zxbjPage.method.zxbmFun(ele, applyData, yusuanPostD, url);
                        },
                        error: function () {
                            zxbjPage.method.zxbmFun(ele, applyData, yusuanPostD, url);
                        }
                    });
                }
            },
            zxbmFun: function (ele, applyData, detailData, url) {
                $.ajax({
                    type: 'get',
                    url: 'https://mip.m.jia.com/new_zhuangxiu/AjaxSaveNewShopApplyNoCodeJsonp',
                    data: applyData,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (e) {
                        $(ele).find('.ask-zxbj-loading').hide();
                        if (e.status === 200) {
                            window.top.location.href = url + '/?qj_from=new&type=app&yusuanRequest='
                                + '{%22pro%22:%22' + detailData.pro + '%22,%22areaname%22:%22'
                                + detailData.areaname + '%22,%22area%22:%22' + detailData.area
                                + '%22,%22areaflag%22:%22' + detailData.areaflag + '%22,%22fj_num%22:%22'
                                + detailData.fjnum + '%22,%22kt_num%22:%22' + detailData.ktnum
                                + '%22,%22wsj_num%22:%22' + detailData.wsjnum + '%22,%22cfj_num%22:%22'
                                + detailData.cfjnum + '%22,%22yt_num%22:%22' + detailData.ytnum + '%22}';
                        }
                        else {
                            zxbjPage.method.tipMask(e.info);
                        }
                    },
                    error: function () {
                        $(ele).find('.ask-zxbj-loading').hide();
                        zxbjPage.method.tipMask('网络异常');
                    }
                });
            },
            tipMask: function (msg, duration) {
                // 弹出提示层
                var that = $(zxbjPage.eles);
                clearTimeout(window.tipMaskTimer);
                window.tipMaskTimer = null;
                duration = duration || 2000;
                if ($(that).find('.popup-maskEdit').length > 0) {
                    $(that).find('.popup-maskEdit').remove();
                }
                $(that).append('<div class="popup-maskEdit">' + msg + '</div>');
                window.tipMaskTimer = setTimeout(function () {
                    $(that).find('.popup-maskEdit').fadeOut(100, function () {
                        $(this).remove();
                    });
                }, duration);
            }
        }
    };

    // html代码在底部，页面进来时就要运行呈现给用户，所以用build
    customElement.prototype.build = function () {
        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
        }
        catch (e) {
            thisObj.innerHTML = '';
            return false;
        }
        zxbjPage.init(data, thisObj);
    };

    return customElement;
});
