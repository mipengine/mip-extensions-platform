/**
 * @file mip-jia-footerzxbj 组件
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

    function showpopmask(ele) {
        fixedElement.hideFixedLayer(fixedElement._fixedLayer);
        // 保存页面当前滚动状态，因为设置overflow:hidden后页面会滚动到顶部
        scrollTop.body = document.body.scrollTop;
        scrollTop.documentElement = document.documentElement.scrollTop;
        scrollTop.offset = window.pageYOffset;
        document.documentElement.classList.add('mip-no-scroll');
        ele.find('.popmask').show();
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
    }

    // [装修、团购、旺铺] 公钥
    var keyArr = {
        'zx': 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8hgXGmTam'
        + '/ZBj9q8UteZ+1Z0sja7g7gQBR1RxfVJBbxGMwLgmW2uc+ij4F'
        + 'fFsr6poM2IO64JfDxl+9H1tmEq6kEmuju7ue4b/4KcMTftKGjr+'
        + 'DtbNiwtFhLKIU6iQRKjetWor8pj7/arhR5weSh04AWwEFQNsQchqM2eA7gEs2wIDAQAB',
        'tg': 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCC0w+gQPas'
        + 'CFul1A/LVYfU4A2C0niMgcb9t+nftc5behMmf5l0aT6fmMa1e+'
        + 'wdfmzleVljEaFcnVi/yOY13HqPa5fymwkVC6k+7beVnFUTDUSK5'
        + 'SJTep+jSHmNCKPM+nVhm2xQu+SjZbxbeIiFdm0mfSJH/8faNXdiWU4rv9NuwIDAQAB',
        'wp': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAurXXoxX'
        + 'AHK4vwRMDDQRFhkQH6tDbVN/k69JGBAGxm2N4+2TVDCKWrBqKjgm'
        + 'jQSqubHiURa9O3bfAXUDYyV7S3/Vajc+NP0kU0l6Fl8q4AldSsQkSf'
        + 'Lq5NrcxU0QsXJbfRCEIyS+lfG9/O+XGVrvpy21hOqs6Zmgvsa5//d6BT'
        + 'C31FOb/d9H4C/iFgIXqAvcEJms+agPpXTMDDjxbB6/6P8qZoqKR1iztv3'
        + 'bzwowU7YRpMVwwdr74K+ka7p0Y+KnnE4oiX3b5rDfQ/GOdG9OJhpGMAUkpR'
        + 'jXy01hu9bT+ep7sYTlhVPhwr+8OICO7tsxNoNW7InOix26oY0IvqWcGjwIDAQAB'
    };

    // 手机号加密
    function loadEncrypt() {
        if (typeof JSEncryptExports !== 'object') {
            var loadNode = document.createElement('script');
            loadNode.type = 'text/javascript';

            // 手机号加密js,AMD方式jsencrypt.js无法通过校验,请知晓
            loadNode.src = '//mued2.jia.com/js/mobile/jsencrypt.js';
            document.body.appendChild(loadNode);
        }
    }

    /**
     * 加密手机号
     *
     * @class
     * @param {number or string} phone 手机号
     * @param {string} type 接口类型：zx(装修)、tg(团购)、wp(旺铺)
     */

    function mobileEncrypt(phone, type) {
        /* global JSEncryptExports */
        var JSEncrypt = new JSEncryptExports.JSEncrypt();
        JSEncrypt.setKey(keyArr[type]);
        return JSEncrypt.encrypt(phone);
    }


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
                $('.footerzxbj-box,.footerzxbj-wrap').remove();
            }
        },
        method: {
            bottomTonglan: function (data, ele) {
                var $this = $(ele);
                var str = '';
                str += '<div class="popmask"></div>';
                str += '<mip-fixed type="bottom" class="bottom-base toutiao-ask-zxbj box-conversion">';
                str += '<div class="ask-zxbj-loading"></div>';
                str += '<div class="ask-zxbj-up">';
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
                str += '<div class="jiantou"><i></i></div>';
                str += '<span class="calculate-btn">立即计算</span>';
                str += '</div>';
                str += '</div>';
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
                str += ' placeholder="请输入您的房屋面积 " bdsl-key="area" bdsl-name-articleZx=""';
                str += ' bdsl-required /><em>m&sup2;</em></div>';
                str += '<ul class="zxbj-work clearfix">';
                str += '<li>';
                str += '<select name="ws" id="ws" bdsl-key="shi" bdsl-name-articleZx="">';
                str += '<option value="1">1室</option>';
                str += '<option value="2" selected>2室</option>';
                str += '<option value="3">3室</option>';
                str += '<option value="4">4室</option>';
                str += '<option value="5">5室</option>';
                str += '</select>';
                str += '<label for="ws"></label>';
                str += '</li>';
                str += '<li>';
                str += '<select name="kt" id="kt" bdsl-key="ting" bdsl-name-articleZx="">';
                str += '<option value="1" selected>1厅</option>';
                str += '<option value="2">2厅</option>';
                str += '<option value="3">3厅</option>';
                str += '<option value="4">4厅</option>';
                str += '<option value="5">5厅</option>';
                str += '</select>';
                str += '<label for="kt"></label>';
                str += '</li>';
                str += '<li>';
                str += '<select name="wsj" id="wsj" bdsl-key="wei" bdsl-name-articleZx="">';
                str += '<option value="1" selected>1卫</option>';
                str += '<option value="2">2卫</option>';
                str += '<option value="3">3卫</option>';
                str += '<option value="4">4卫</option>';
                str += '<option value="5">5卫</option>';
                str += '</select>';
                str += '<label for="wsj"></label>';
                str += '</li>';
                str += '<li>';
                str += '<select name="cf" id="cf" bdsl-key="chu" bdsl-name-articleZx="">';
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
                str += '<input type="tel" name="zxbjMobile" maxlength="11" bdsl-key="phone"';
                str += ' bdsl-required="^1[3|4|5|7|8]\\d{9}$"';
                str += ' bdsl-name-articlezx="" placeholder="输入手机号，短信接收详细报价清单" /></div>';
                str += '<div class="apply-button"><a href="javascript:;" class="zxbj-submit-btn"';
                str += ' bdsl-extra="{id:10001}" bdsl-submit="articleZx">立即计算</a></div>';
                str += '</div>';

                str += '</div>';
                str += '</mip-fixed>';
                $this.append(str);

                cityFn();

                zxbjPage.method.randomNumber($this.find('.ysbj-screen-nexine span'));
                zxbjPage.method.windowScroll(ele);

                // 点击展开按钮
                zxbjPage.method.clickUpFun(data, ele);

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
                if (scrollTop > viewHei) {
                    storage.set('usFlag', 'true', 21600000);
                    showpopmask($this);
                    $this.find('.toutiao-ask-zxbj').addClass('show');
                }
            },
            windowScroll: function (ele) {
                // 滚动事件
                viewport.on('scroll', function () {
                    if (storage.get('usFlag') === 'true') {
                        return false;
                    }
                    zxbjPage.method.scrollFun(ele);
                });
                // zxbjPage.method.scrollFun(ele);
            },
            clickUpFun: function (data, ele) {
                var $this = $(data.ele);
                var $ele = $(ele).find('.toutiao-ask-zxbj');
                // 点击展开按钮
                $this.on('click', function () {
                    storage.set('usFlag', 'true', 21600000);
                    showpopmask($ele.parent());
                    $ele.addClass('show');
                });
                $ele.find('.ask-zxbj-up').on('click', function () {
                    hidepopmask($ele.parent());
                    $ele.removeClass('show');
                });
                $(ele).find('.popmask').on('click', function () {
                    hidepopmask($ele.parent());
                    $ele.removeClass('show');
                });
            },
            zxbjSubmitBtn: function (data, ele) {
                var $this = $(ele);
                // 点击报名按钮
                $this.find('.zxbj-submit-btn').on('click', function () {
                    var area = $this.find('input[name=area]').val();
                    var mobile = $this.find('input[name=zxbjMobile]').val();
                    var re = /^1[3|4|5|6|7|8|9]\d{9}$/;
                    if (!zxbjPage.method.isPositiveNum(area)) {
                        tipMask('请输入正确的面积');
                    }
                    else if (mobile === '') {
                        tipMask('请输入您的电话');
                    }
                    else if (!re.test(mobile)) {
                        tipMask('请输入正确的手机号');
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
                    mobile: mobileEncrypt(mobile, 'zx'),
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
                            $('.loading-common,.ask-zxbj-loading').hide();
                            window.top.location.href = 'https://m.jia.com/newzx/yusuan_success/?qj_from=new&type=app&yusuanRequest='
                                + '{%22pro%22:%22' + detailData.pro + '%22,%22areaname%22:%22'
                                + detailData.areaname + '%22,%22area%22:%22' + detailData.area
                                + '%22,%22areaflag%22:%22' + detailData.areaflag + '%22,%22fj_num%22:%22'
                                + detailData.fjnum + '%22,%22kt_num%22:%22' + detailData.ktnum
                                + '%22,%22wsj_num%22:%22' + detailData.wsjnum + '%22,%22cfj_num%22:%22'
                                + detailData.cfjnum + '%22,%22yt_num%22:%22' + detailData.ytnum + '%22}';
                        }
                        else {
                            $('.footer-tc-box,.ask-zxbj-loading,.loading-common').hide();
                            tipMask(e.info);
                        }
                    },
                    error: function () {
                        $('.footer-tc-box,.ask-zxbj-loading,.loading-common').hide();
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
        zxbjPage.method.randomNumber($(data.ele).find('.bom-screen-nexine span'));
        // 加密
        loadEncrypt();
    };

    return customElement;
});
