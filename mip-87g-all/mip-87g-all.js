/**
 * @file mip-87g-all 组件
 * @author 493886562@qq.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var t = this.element;
        var gtype = t.getAttribute('g_type');
        var siteurl = '//m.87g.cn/';
        if (gtype === 'g87_news') {
            // 点击量统计
            var module = t.getAttribute('module');
            var hitsurl = siteurl + 'api.php?op=count&modelid=' + t.getAttribute('modelid')
            + '&id=' + t.getAttribute('my_id');
            if (module !== '') {
                hitsurl += '&module=' + module;
            }
            $.getJSON(hitsurl);
            // 内容缩进
            var con = $(t).find('.artbody');
            var txt = con.text();
            var pic = con.find('img');
            if (con.height() > 834) {
                var muban = '<section class="click_more"><div class="slide-btn">';
                muban += '<span>展开，查看全部</span><i></i></div></section>';
                var newcon = con.find('.artbody');
                newcon.addClass('wraptext');
                newcon.after(muban);
                newcon.css({
                    'height': '834px',
                    'overflow': 'hidden',
                    'visibility': 'visible',
                    'position': 'relative'
                });
                newcon.addClass('snbg');
                var btn = con.find('.click_more');
                btn.click(function () {
                    con.removeClass('wraptext');
                    newcon.removeClass('snbg').removeAttr('style');
                    $(this).remove();
                });
            }
        } else if (gtype === 'g87_youxi_content_hideshow') {
            // 内容缩进
            var con = $(t);
            if (con.height() > 200) {
                var newcon = con.find('.m-con');
                newcon.addClass('wraptext');
                newcon.addClass('snbg');
                var btn = con.find('.m-show');
                btn.click(function () {
                    if ($(this).hasClass('show')) {
                        newcon.addClass('wraptext');
                        newcon.addClass('snbg');
                        $(this).removeClass('show');
                    } else {
                        newcon.removeClass('wraptext');
                        newcon.removeClass('snbg');
                        $(this).addClass('show');
                    }
                });
            } else {
                con.find('.m-show').hide();
            }
        } else if (gtype === 'g87_youxi_tab') {
            var con = $(t);
            var anchor1 = con.find('.m-anchor').find('li').eq(0);
            var anchor2 = con.find('.m-anchor').find('li').eq(1);
            var anchor3 = con.find('.m-anchor').find('li').eq(2);
            var anchor4 = con.find('.m-anchor').find('li').eq(3);
            anchor1.click(function () {
                con.find('.app_intro').show();
                con.find('.app_soft').show();
                con.find('.ztshow').show();
                con.find('.ztshow').next().show();
                con.find('.con-box').show();
                con.find('.app_guess').show();
                con.find('.Qtag').show();
                con.find('.app_appmore').show();
                $(this).addClass('on');
                anchor2.removeClass('on');
                anchor3.removeClass('on');
                anchor4.removeClass('on');
            });
            anchor2.click(function () {
                con.find('.app_intro').hide();
                con.find('.app_soft').show();
                con.find('.ztshow').show();
                con.find('.ztshow').next().show();
                con.find('.con-box').show();
                con.find('.app_guess').show();
                con.find('.Qtag').show();
                con.find('.app_appmore').show();
                $(this).addClass('on');
                anchor1.removeClass('on');
                anchor3.removeClass('on');
                anchor4.removeClass('on');
            });
            anchor3.click(function () {
                con.find('.app_intro').hide();
                con.find('.app_soft').hide();
                con.find('.ztshow').hide();
                con.find('.ztshow').next().hide();
                con.find('.con-box').hide();
                con.find('.app_guess').show();
                con.find('.Qtag').show();
                con.find('.app_appmore').show();
                $(this).addClass('on');
                anchor1.removeClass('on');
                anchor2.removeClass('on');
                anchor4.removeClass('on');
            });
            anchor4.click(function () {
                con.find('.app_intro').hide();
                con.find('.app_soft').hide();
                con.find('.ztshow').hide();
                con.find('.ztshow').next().hide();
                con.find('.con-box').hide();
                con.find('.app_guess').hide();
                con.find('.Qtag').hide();
                con.find('.app_appmore').hide();
                $(this).addClass('on');
                anchor1.removeClass('on');
                anchor2.removeClass('on');
                anchor3.removeClass('on');
            });
            var txtlist1 = con.find('.txt-list1');
            if ($.trim(txtlist1.html()) === '') {
                txtlist1.parent().remove();
            }
            var hdarticle = con.find('.app_guess .hd_article');
            if ($.trim(hdarticle.html()) === '') {
                hdarticle.parent().remove();
            }
            var appsoft = con.find('.app_soft');
            if ($.trim(appsoft.find('#r_main .apptxt').html()) === '') {
                appsoft.find('.hd_article span').eq(1).remove();
                appsoft.find('.hd_article').css('width', '50%');
            }
            if ($.trim(appsoft.find('#r_main .apptxt').html()) === ''
                && $.trim(appsoft.find('#r_main .androidList').html()) === '') {
                appsoft.parent().next().remove();
                appsoft.parent().remove();
            }
        } else if (gtype === 'g87_youxi_downhref') {
            var con = $(t);
            var downaddressa = con.find('#address');
            downaddressa.attr('href', downaddressa.attr('android'));
            var ua = navigator.userAgent.toLowerCase();
            var isiphone = /iphone|ipad|ipod/.test(ua);
            // 如果是苹果设备
            if (isiphone) {
                downaddressa.addClass('downaddressa1');
                if (downaddressa.attr('itunes') !== '') {
                    downaddressa.attr('href', downaddressa.attr('itunes'));
                } else if (downaddressa.attr('ios') !== '') {
                    downaddressa.attr('href', downaddressa.attr('ios'));
                }
                if (downaddressa.attr('itunes') === '' && downaddressa.attr('ios') === ''
                    && downaddressa.attr('h5') === '' && downaddressa.attr('is_subscribe') !== ',1,') {
                    downaddressa.addClass('downaddressa2');
                    downaddressa.attr('href', '#');
                    downaddressa.text('暂不支持iOS系统');
                }
            } else {
                if (downaddressa.attr('android') === '' && downaddressa.attr('h5') === ''
                    && downaddressa.attr('is_subscribe') !== ',1,') {
                    downaddressa.addClass('downaddressa3');
                    downaddressa.attr('href', '#');
                    downaddressa.text('暂不支持安卓系统');
                }
            }
            // 判断H5地址
            if (downaddressa.attr('h5') !== '') {
                downaddressa.attr('href', downaddressa.attr('h5'));
                downaddressa.text('立即开始游戏');
                downaddressa.addClass('downaddressa4');
            }
            if (((downaddressa.attr('android') === '' && downaddressa.attr('itunes') === ''
                && downaddressa.attr('ios') === '' && downaddressa.attr('h5') === '')
                || downaddressa.attr('hz_error_url') === ',1,'
                || downaddressa.attr('is_stop_gm') === ',1,') && downaddressa.attr('is_subscribe') !== ',1,') {
                downaddressa.attr('href', '#');
                downaddressa.css('background', 'rgb(204, 204, 204)');
                downaddressa.text('暂无下载');
                if (downaddressa.attr('is_stop_gm') === ',1,') {
                    downaddressa.text('游戏已停止运营');
                }
            }
            // 如果是订阅
            if (downaddressa.attr('is_subscribe') === ',1,') {
                var subhtml = '<div id="js-pack-get-dialog" class="pack-get-dialog hide"';
                subhtml += ' style="top: 20%; left: 10%;width:300px;height:351px;">';
                subhtml += '<div id="js-get-dialog-tab" class="get-dialog-hd" style="padding-left: 10px;">';
                subhtml += '<a href="#" class="js-pack-site-tab" style="padding-left:0px;">';
                subhtml += '订阅：' + downaddressa.attr('down_title') + '</a></div> ';
                subhtml += '<div class="get-dialog-bd" style="height: 313px;"><div class="pack-by-weixin clearfix" ';
                subhtml += 'style="padding: 10px 30px;">';
                subhtml += '<div class="weixin-qrcode" style="float: unset;width:auto;"> ';
                subhtml += '<mip-img src="//www.87g.com/statics/images/qrcode_for_dy.jpg"></mip-img>';
                subhtml += ' <b style="color:#666;line-height: 1.5;">请用手机微信扫描二维码订阅~</b>';
                subhtml += ' <b style="color:#666;line-height: 1.5;">订阅后可及时接受活动、礼包、开测和开放下载的提醒！</b>';
                subhtml += '<b style="line-height: 1.5;">订阅功能说明</b></div></div> </div> <a class="pack-get-close" ';
                subhtml += 'href="#">关闭</a> </div>';
                subhtml += '<div class="fancybox-overlay fancybox-overlay-fixed hide" ';
                subhtml += 'style="width: auto; height: auto;;"></div>';
                downaddressa.text('订阅游戏');
                downaddressa.attr('href', '#');
                downaddressa.addClass('downaddressa5');
                downaddressa.addClass('subscribe_btn');
                downaddressa.parent().after(subhtml);
                downaddressa.click(function () {
                    if (con.find('.pack-get-dialog').hasClass('hide')) {
                        con.find('.pack-get-dialog').removeClass('hide');
                        con.find('.fancybox-overlay').removeClass('hide');
                    } else {
                        con.find('.pack-get-dialog').addClass('hide');
                        con.find('.fancybox-overlay').addClass('hide');
                    }
                });
                var packgetclose = con.find('.pack-get-close');
                packgetclose.click(function () {
                    con.find('.pack-get-dialog').addClass('hide');
                    con.find('.fancybox-overlay').addClass('hide');
                });
            }
            // 下载量统计
            downaddressa.click(function () {
                var hitsurl = siteurl + 'api.php?op=down_count&modelid=' + t.getAttribute('modelid')
                + '&id=' + t.getAttribute('my_id') + '&catid=' + t.getAttribute('catid');
                $.getJSON(hitsurl);
            });
            if (con.find('.down_flag').length > 0) {
                $.get(siteurl + 'index.php?m=content&c=content_ajax&a=get_down_flag', function (date) {
                    if (date === 1) {
                        var addresshtml = '<a style="background: rgb(204, 204, 204);" href="javascript:;">已经下架</a>';
                        con.find('.down_flag').html(addresshtml);
                    }
                });
            }
        } else if (gtype === 'g87_youxi_imgs') {
            var con = $(t);
            setTimeout(function () {
                var firstImgHeight = con.find('.m-slide1 ul li').eq(0).find('img').height();
                var firstImgWidth = con.find('.m-slide1 ul li').eq(0).find('img').width();
                if (firstImgHeight < firstImgWidth) {
                    con.find('.m-slide1').addClass('banner_pics');
                    con.find('.m-slide1').css('height', '150px');
                } else {
                    con.find('.m-slide1').css('height', firstImgHeight);
                }
            }, 500);
        } else if (gtype === 'g87_news_tab') {
            var con = $(t);
            var tabsnav = con.attr('tabs-nav');
            var navcur = con.attr('nav-cur');
            var tabskey = con.attr('tabs-key');
            con.find(tabskey).each(function (index) {
                if ($.trim($(this).find('ul').html()) === '') {
                    $(this).remove();
                    con.find(tabsnav).eq(index).remove();
                }
            });
            con.find(tabskey).hide();
            con.find(tabsnav).click(function () {
                con.find(tabskey).hide();
                con.find(tabskey).eq($(this).index()).show();
                con.find(tabsnav).removeClass(navcur);
                $(this).addClass(navcur);
            });
            if (con.find(tabsnav).length === 1) {
                con.find(tabsnav).parent().css('width', '50%');
            }
            con.find(tabsnav).eq(0).click();
        }
    };
    return customElement;
});