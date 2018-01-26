/**
 * @file mip-jia-footerzxbj 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);


    // 获取城市
    function cityFn(callback) {
        if (!storage.get('city')) {
            $.ajax({
                url: '//m.jia.com/city/getCurrentAreaNew',
                type: 'get',
                dataType: 'jsonp',
                success: function (a) {
                    if (a.code > 0) {
                        var city = JSON.stringify(a.result.site.area_info);
                        storage.set('city', city, 21600000);
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


    // 加密


    var zxbjPage = {
        usFlag: false,
        vot: -1,
        screenNum: $(window).height(),
        isIndex: 0,
        init: function (data, ele) {
            // 报完名不显示弹窗
            if (!storage.get('us_pop')) {
                zxbjPage.method.bottomTonglan(data, ele);
            }
            else {
                $('.footerzxbj-wrap').hide();
            }
        },
        method: {
            bottomTonglan: function (data, ele) {
                var $this = $(ele);
                var str = '';
                str += '<section class="toutiao-ask-zxbj">';
                str += '<div class="ask-zxbj-loading"></div>';
                str += '<a href="javascript:;" class="ask-zxbj-up">';
                str += '<div class="ask-zxbj-banner">';
                str += '<div class="op-bg"></div>';
                str += '<div class="huangxiaoming"></div>';
                str += '<div class="bom-counter-screen T-counter-screen">';
                str += '<div class="bom-screen-nexine T-screen-nexine clearfix">';
                str += '<em>元</em>';
                str += '<span></span>';
                str += '<span></span>';
                str += '<span></span>';
                str += '<span></span>';
                str += '<span></span>';
                str += '<span></span>';
                str += '</div>';
                str += '</div>';
                str += '<aside class="zxbj-text text-dif">';
                str += '<h2 class="tit">装修该花多少钱？</h2>';
                str += '<p class="des"><em>5秒</em>获取免费报价</p>';
                str += '</aside>';
                str += '<div class="jiantou up"><i></i></div>';
                str += '<span class="calculate-btn">立即计算</span>';
                str += '</div>';
                str += '</a>';
                str += '<div class="ask-zxbj-box">';
                str += '<div class="zxbj-wrap zxbj-js cur">';
                str += '<div class="ysbj-counter-screen T-counter-screen">';
                str += '<div class="ysbj-screen-nexine T-screen-nexine clearfix">';
                str += '<label>你家的装修预算</label>';
                str += '<em>元</em>';
                str += '<span></span>';
                str += '<span></span>';
                str += '<span></span>';
                str += '<span></span>';
                str += '<span></span>';
                str += '<span></span>';
                str += '</div>';
                str += '</div>';
                str += '<div class="apply-input"><input type="tel" name="area" maxlength="4" value="80"';
                str += ' placeholder="请输入您的房屋面积 " /><em>m&sup2;</em></div>';
                str += '<ul class="zxbj-work clearfix">';
                str += '<li>';
                str += '<select name="ws" id="ws">';
                str += '<option value="1">1室</option>';
                str += '<option value="2" selected>2室</option>';
                str += '<option value="3">3室</option>';
                str += '<option value="4">4室</option>';
                str += '<option value="5">5室</option>';
                str += '</select>';
                str += '<label for="ws"></label>';
                str += '</li>';
                str += '<li>';
                str += '<select name="kt" id="kt">';
                str += '<option value="1" selected>1厅</option>';
                str += '<option value="2">2厅</option>';
                str += '<option value="3">3厅</option>';
                str += '<option value="4">4厅</option>';
                str += '<option value="5">5厅</option>';
                str += '</select>';
                str += '<label for="kt"></label>';
                str += '</li>';
                str += '<li>';
                str += '<select name="wsj" id="wsj">';
                str += '<option value="1" selected>1卫</option>';
                str += '<option value="2">2卫</option>';
                str += '<option value="3">3卫</option>';
                str += '<option value="4">4卫</option>';
                str += '<option value="5">5卫</option>';
                str += '</select>';
                str += '<label for="wsj"></label>';
                str += '</li>';
                str += '<li>';
                str += '<select name="cf" id="cf">';
                str += '<option value="1" selected>1厨</option>';
                str += '<option value="2">2厨</option>';
                str += '<option value="3">3厨</option>';
                str += '<option value="4">4厨</option>';
                str += '<option value="5">5厨</option>';
                str += '</select>';
                str += '<label for="cf"></label>';
                str += '</li>';
                str += '</ul>';
                str += '<div class="apply-input">';
                str += '<input type="tel" name="zxbjMobile" maxlength="11" placeholder="输入手机号，短信接收详细报价清单" /></div>';
                str += '<div class="apply-button"><a href="javascript:;" class="zxbj-submit-btn">立即计算</a></div>';
                str += '</div>';

                str += '</div>';
                str += '</section>';
                $this.append(str);
                setTimeout(function () {
                    $this.find('.toutiao-ask-zxbj').css('bottom', zxbjPage.isIndex);
                }, 1000);

                cityFn();

                zxbjPage.method.randomNumber($this.find('.bom-screen-nexine span'));
                zxbjPage.method.randomNumber($this.find('.ysbj-screen-nexine span'));
                zxbjPage.method.windowScroll(ele);

                // 点击展开按钮
                zxbjPage.method.clickUpFun(ele);

                // 点击报名按钮
                zxbjPage.method.zxbjSubmitBtn(data, ele);
            },
            randomNumber: function (demp) {
                // 随机价格
                var num = 0;
                var len = 0;
                var ge = '';
                var shi = '';
                var bai = '';
                var qian = '';
                var wan = '';
                var shiwan = '';
                setInterval(function () {
                    num = Math.ceil(Math.random() * 190000) + 10000;
                    len = num.toString().length;
                    ge = num.toString().substring(len - 1);
                    shi = num.toString().substring(len - 2, len - 1);
                    bai = num.toString().substring(len - 3, len - 2);
                    qian = num.toString().substring(len - 4, len - 3);
                    if (len >= 5) {
                        wan = num.toString().substring(len - 5, len - 4);
                        shiwan = '';
                    }
                    if (len === 6) {
                        shiwan = 1;
                    }
                    demp.removeClass();
                    demp.eq(0).addClass('ge num' + ge);
                    demp.eq(1).addClass('shi num' + shi);
                    demp.eq(2).addClass('bai num' + bai);
                    demp.eq(3).addClass('qian num' + qian);
                    demp.eq(4).addClass('wan num' + wan);
                    demp.eq(5).addClass('shiwan num' + shiwan);
                }, 300);
            },
            isPositiveNum: function (s) {
                // 是否为正整数
                var re = /^[0-9]*[1-9][0-9]*$/;
                return re.test(s);
            },
            scrollFun: function (ele) {
                var $this = $(ele);
                // 滚动效果
                var scrHeight = $(window).scrollTop();
                // 滚动条滚动的距离
                var domHeight = $(document).height();
                var boxHeight = $this.find('.ask-zxbj-box').height();
                var bottom = parseInt($this.find('.toutiao-ask-zxbj').css('bottom'), 10);
                // 如果用户自行做了操作 则此处不影响用户操作
                if (zxbjPage.usFlag || storage.get('usFlag') === 'true') {
                    return false;
                }
                // 滚动条到最底部的时候
                if (bottom >= boxHeight && (domHeight <= ($(window).height() + scrHeight))) {
                    $this.find('.toutiao-ask-zxbj')
                        .css('bottom', zxbjPage.isIndex + boxHeight + 'px')
                        .addClass('box-conversion');
                    $this.find('.ask-zxbj-up').find('.jiantou').removeClass('up');
                }
                if ((bottom + scrHeight - zxbjPage.vot) < 0) {
                    // 完全收起
                    $this.find('.toutiao-ask-zxbj').css('bottom', zxbjPage.isIndex).removeClass('box-conversion');
                    $this.find('.ask-zxbj-up').find('.jiantou').addClass('up');
                    if (bottom > zxbjPage.isIndex) {
                        storage.set('usFlag', true);
                    }
                }
                else if ((bottom + scrHeight - zxbjPage.vot) >= boxHeight) {
                    // 完全展开
                    if (storage.get('usFlag') === 'false' || !storage.get('usFlag')) {
                        $this.find('.toutiao-ask-zxbj')
                            .css('bottom', zxbjPage.isIndex + boxHeight + 'px')
                            .addClass('box-conversion');
                        $this.find('.ask-zxbj-up').find('.jiantou').removeClass('up');
                    }
                    storage.set('usFlag', true);
                }
                else if (scrHeight > zxbjPage.screenNum) {
                    // 展开中...
                    if ((domHeight <= ($(window).height() + scrHeight))) {
                        $this.find('.toutiao-ask-zxbj')
                            .css('bottom', zxbjPage.isIndex + boxHeight + 'px');
                    }
                    else {
                        $this.find('.toutiao-ask-zxbj')
                            .css('bottom', (zxbjPage.isIndex + bottom + scrHeight - zxbjPage.vot) + 'px');
                    }
                }
                else if (scrHeight < zxbjPage.vot && (bottom + scrHeight - zxbjPage.vot) > 0) {
                    // 收起中...
                    if (bottom === zxbjPage.isIndex) {
                        zxbjPage.usFlag = true;
                        return false;
                    }
                    if (scrHeight === 0) {
                        $this.find('.toutiao-ask-zxbj').css('bottom', zxbjPage.isIndex);
                        zxbjPage.usFlag = true;
                    }
                    else {
                        $this.find('.toutiao-ask-zxbj').css('bottom', (bottom + scrHeight - zxbjPage.vot) + 'px');
                    }
                }
                zxbjPage.vot = scrHeight;
            },
            windowScroll: function (ele) {
                // 滚动事件
                $(window).scroll(function () {
                    if (storage.get('usFlag') === 'true') {
                        return false;
                    }
                    zxbjPage.method.scrollFun(ele);
                });
                zxbjPage.method.scrollFun(ele);
            },
            clickUpFun: function (ele) {
                var $this = $(ele);
                // 点击展开按钮
                $this.find('.ask-zxbj-up').on('click', function () {
                    var thatJt = $(this).find('.jiantou');
                    storage.set('usFlag', true);
                    if (thatJt.hasClass('up')) {
                        thatJt.removeClass('up');
                        $this.find('.toutiao-ask-zxbj')
                            .css('bottom', zxbjPage.isIndex + $this.find('.ask-zxbj-box').height() + 'px')
                            .addClass('box-conversion');
                    }
                    else {
                        thatJt.addClass('up');
                        $this.find('.toutiao-ask-zxbj').css('bottom', zxbjPage.isIndex).removeClass('box-conversion');
                    }

                });
            },
            zxbjSubmitBtn: function (data, ele) {
                var $this = $(ele);
                // 点击报名按钮
                $this.find('.zxbj-submit-btn').on('click', function () {
                    var area = $this.find('input[name=area]').val();
                    var mobile = $this.find('input[name=zxbjMobile]').val();
                    var re = /^1[3|4|5|7|8]\d{9}$/;
                    if (!zxbjPage.method.isPositiveNum(area)) {
                        tipMask('请输入正确的面积');
                        return false;
                    }
                    else if (mobile === '') {
                        tipMask('请输入您的电话');
                        return false;
                    }
                    else if (!re.test(mobile)) {
                        tipMask('请输入正确的手机号');
                        return false;
                    }
                    else {
                        $this.find('.ask-zxbj-loading').show();
                        zxbjPage.method.commonPop(data, ele);
                    }
                });
            },
            commonPop: function (data, ele) {
                var $this = $(ele);
                var mobile = $this.find('input[name=zxbjMobile]').val();
                var area = $this.find('input[name=area]').val();
                var ws = $this.find('select[name=ws]').val();
                var kt = $this.find('select[name=kt]').val();
                var wsj = $this.find('select[name=wsj]').val();
                var cf = $this.find('select[name=cf]').val();
                var $city = JSON.parse(storage.get('city'));
                var yusuanPostD = {
                    areaname: $city['area_cn'],
                    pro: $city['city_cn'],
                    area: area,
                    areaflag: $city['area_py'],
                    fjnum: parseInt(ws, 10) || '2',
                    ktnum: parseInt(kt, 10) || '1',
                    wsjnum: parseInt(wsj, 10) || '1',
                    cfjnum: 1,
                    ytnum: 1
                };
                var applyData = {
                    city: $city['area_py'],
                    baojia: '',
                    mobile: mobile,
                    memo: area + '平方,' + yusuanPostD.fjnum + '室,' + yusuanPostD.ktnum + '厅,' + yusuanPostD.wsjnum + '卫'
                };
                for (var x in data) {
                    applyData[x] = data[x];
                }
                if (area < 35) {
                    zxbjPage.method.zxbmFun(applyData, yusuanPostD);
                }
                else if (area > 180) {
                    zxbjPage.method.zxbmFun(applyData, yusuanPostD);
                }
                else {
                    $.ajax({
                        url: 'https://m.jia.com/JiaZhuangxiu/qOpenYusuan/',
                        type: 'get',
                        dataType: 'jsonp',
                        data: yusuanPostD,
                        jsonp: 'callback',
                        success: function (msg) {
                            applyData.baojia = msg.info.total_price;
                            // applyData.all = msg.info.total_price;
                            zxbjPage.method.zxbmFun(applyData, yusuanPostD);
                        }
                    });
                }
            },
            zxbmFun: function (applyData, detailData) {
                $.ajax({
                    type: 'get',
                    url: 'https://m.jia.com/new_zhuangxiu/AjaxSaveNewShopApplyNoCodeJsonp',
                    data: applyData,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (e) {
                        if (e.status === 200) {
                            storage.set('us_pop', 'true', 21600000);
                            $('.popmask,.loading-common,.ask-zxbj-loading').hide();
                            window.top.location.href = 'https://m.jia.com/JiaZhuangxiuTmp/yusuan_success_20160825/?qj_from=new&type=app&yusuanRequest='
                                + '{%22pro%22:%22' + detailData.pro + '%22,%22areaname%22:%22'
                                + detailData.areaname + '%22,%22area%22:%22' + detailData.area
                                + '%22,%22areaflag%22:%22' + detailData.areaflag + '%22,%22fj_num%22:%22'
                                + detailData.fjnum + '%22,%22kt_num%22:%22' + detailData.ktnum
                                + '%22,%22wsj_num%22:%22' + detailData.wsjnum + '%22,%22cfj_num%22:%22'
                                + detailData.cfjnum + '%22,%22yt_num%22:%22' + detailData.ytnum + '%22}';
                        }
                        else {
                            $('.popmask,.footer-tc-box,.ask-zxbj-loading,.loading-common').hide();
                            tipMask(e.info);
                        }
                    },
                    error: function () {
                        $('.popmask,.footer-tc-box,.ask-zxbj-loading,.loading-common').hide();
                        tipMask('网络异常');
                    }
                });
            }
        }
    };

    // 弹出提示层
    function tipMask(msg, duration) {
        clearTimeout(window.tipMaskTimer);
        window.tipMaskTimer = null;
        duration = duration || 2000;
        if ($('.popup-maskEdit').length > 0) {
            $('.popup-maskEdit').remove();
        }
        $('body').append('<div class="popup-maskEdit">' + msg + '</div>');
        window.tipMaskTimer = setTimeout(function () {
            $('.popup-maskEdit').fadeOut(100, function () {
                $(this).remove();
            });
        }, duration);
    }

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
