/**
 * @file mip-qqtn-addwxbtn
 * 获取配置文件地区以及信息进行判断，覆盖原始内容
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var fhieldur = ele.getAttribute('data-shield');
        // 获取配置文件地区信息
        fetchJsonp('https://ca.6071.com/shield/index/c/' + fhieldur, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var starok = data['wxaddbtnOK'];
            // 配置文件是否启用
            if (starok) {
                // 启用配置文件 执行添加按钮
                var wxgzbtn = '<em class="newsnext foucs_dyh"><a href="javascript:;">关注+</a></em>';
                $(ele).find('.g-cms-content em').append(wxgzbtn);
                // 添加配置文件内容
                $(ele).find('.g-cms-content').after(data.addwxbtn[0]);
                $(ele).find('.foucs_dyh').click(function () {
                // 执行点击事件
                    $(ele).find('.wefocus_bg').show();
                    $(ele).find('.wefocus_a').show();
                    $(ele).find('.wefocus_a').css('margin-top', - $(ele).find('.wefocus_a').height() / 2 + 'px');
                });
                $(ele).find('.wefocus_bg,.wefocus_clo').click(function () {
                    $(ele).find('.wefocus_a,.wefocus_bg').hide();
                });
            }
        });
    };
    return customElement;
});



