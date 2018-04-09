/**
 * @file mip-87g-all 组件
 * @author 493886562@qq.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var t = this.element;
        var gtype = t.getAttribute('g_type');
        if (gtype === 'g87_news') {
            var siteurl = '//www.87g.com/';
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
        }
    };
    return customElement;
});