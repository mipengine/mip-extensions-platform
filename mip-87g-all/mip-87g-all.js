/**
 * @file mip-87g-all 组件
 * @author 493886562@qq.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var t = this.element;
        var gtype = t.getAttribute('g_type');
        var siteurl = '//www.87g.com/';
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
            var con = $(t);
            var txt = con.text();
            var pic = con.find('img');
            var zs = txt.length;
            var piclen = pic.length;
            var tj = con.height();
            if ((zs > 300 || piclen > 3) && tj > 834) {
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
            var txt = con.text();
            var pic = con.find('img');
            var zs = txt.length;
            var piclen = pic.length;
            var tj = con.height();
            if ((zs > 300 || piclen > 3) && tj > 834) {
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
        }
    };
    return customElement;
});