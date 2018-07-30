/**
 * @file mip-3h3-all 组件
 * @author 493886562@qq.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var t = this.element;
        var gtype = t.getAttribute('g_type');
        var siteurl = '//m.3h3.com/';
        if (gtype === '3h3_news') {
            // 点击量统计
            var module = t.getAttribute('module');
            var hitsurl = siteurl + 'ajax.asp?action=4&id=' + t.getAttribute('id');
            if (module !== '') {
                hitsurl += '&module=' + module;
            }
            $.getJSON(hitsurl);
            // 内容缩进
            var con = $(t);
            var txt = con.text();
            var pic = con.find('img');
            var zs = txt.length;
            var piclen = pic.length;
            if (con.height() > 834) {
                var muban = '<section class="click_more"><div class="slide-btn">';
                muban += '<span>展开，查看全部</span><i></i></div></section>';
                var newcon = con.find('.m-con');
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
        } else if (gtype === '3h3_youxi_content_hideshow') {
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
        } else if (gtype === '3h3_youxi_tab') {
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
                con.find('.app_article').show();
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
                con.find('.app_article').show();
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
                con.find('.app_article').hide();
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
                con.find('.app_article').hide();
                con.find('.con-box').hide();
                con.find('.app_guess').hide();
                con.find('.Qtag').hide();
                con.find('.app_appmore').show();
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
            var cnxhNotNullSize = 0;
            con.find('.app_guess #guess_main .guessCont').each(function (index) {
                if ($.trim($(this).html()) === '') {
                    $(this).hide();
                    hdarticle.find('span').eq(index).hide();
                } else {
                    cnxhNotNullSize++;
                }
            });
            if (cnxhNotNullSize === 1) {
                hdarticle.css('width', '50%');
            } else if (cnxhNotNullSize === 0) {
                hdarticle.parent().remove();
                anchor3.hide();
                con.find('.m-anchor li').css('width', '33.3%');
            }
            if ($.trim(hdarticle.html()) === '') {
                hdarticle.parent().remove();
            }
            var appsoft = con.find('.app_soft');
            if ($.trim(appsoft.find('#r_main .apptxt').html()) === '') {
                appsoft.find('.hd_article span').eq(1).remove();
                appsoft.find('.hd_article').css('width', '50%');
            }
        } else if (gtype === '3h3_youxi_downhref') {
            var con = $(t);
            var downaddressa = con.find('#address');
            if (downaddressa.attr('murl') !== '') {
                downaddressa.attr('href', downaddressa.attr('murl'));
            }
        } else if (gtype === '3h3_youxi_imgs') {
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
        } else if (gtype === '3h3_news_tab') {
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
        } else if (gtype === '3h3_youxi_search') {
            var con = $(t);
            var submitbtn = con.attr('submit_btn');
            $(submitbtn).click(function () {
                con.find('form').submit();
            });
        }
    };
    return customElement;
});