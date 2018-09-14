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
            } else {
                var isClick = false;
                setTimeout(function () {
                    con.find('.app_guess .hd_article span').each(function (index) {
                        if ($(this).css('display') !== 'none' && isClick === false) {
                            $(this).click();
                            isClick = true;
                        }
                    });
                }, 600);
            }
            var appsoft = con.find('.app_soft');
            if ($.trim(appsoft.find('#m-rel .m-option').eq(1).html()) === '') {
                appsoft.find('#m-rel .tab-1 li').eq(1).remove();
            }
            if ($.trim(appsoft.find('#m-rel .m-option').eq(0).html()) === ''
                && $.trim(appsoft.find('#m-rel .m-option').eq(1).html()) === '') {
                appsoft.remove();
            }
            var apparticle = con.find('.app_article');
            var apparticleNotNullSize = 0;
            apparticle.find('#xg_main .xg_main_ul .xg_list ul').each(function (index) {
                if ($.trim($(this).html()) !== '') {
                    apparticleNotNullSize++;
                } else {
                    con.find('.hd_article span').eq(index).hide();
                }
            });
            apparticle.find('.hd_article span').each(function (index) {
                if ($(this).css('display') !== 'none') {
                    $(this).click();
                    return false;
                }
            });
            if (apparticleNotNullSize === 0) {
                apparticle.remove();
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
        } else if (gtype === '3h3_zt_show_menu') {
            var con = $(t);
            var headsearch = con.find('.headsearch');
            headsearch.click(function () {
                if (con.find('.search-box').css('display') === 'block') {
                    con.find('.search-box').hide();
                } else {
                    con.find('.search-box').show();
                }
            });
            var navbtn = con.find('.nav-btn');
            navbtn.click(function () {
                if (con.find('.nav').css('display') === 'block') {
                    con.find('.nav').hide();
                } else {
                    con.find('.nav').show();
                }
            });
            con.find('.m-aside .menu').show();
            var menubtn = con.find('.m-aside .menu');
            menubtn.click(function () {
                if (con.find('.body-masking').css('display') === 'block') {
                    con.find('.body-masking').hide();
                } else {
                    con.find('.body-masking').show();
                }
            });
            var bodymasking = con.find('.body-masking');
            bodymasking.click(function () {
                bodymasking.hide();
            });
        }
    };
    return customElement;
});