/**
 * @file mip-cr173-mg 判断网页标题进行内容替换，判断条件已写入网页，内容不会进行修改。
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    function cr173mgc() {
        var webInfo = {
            Rootid: $('.f-information').attr('data-rootid'),
            Username: $('.f-information').attr('data-Username'),
            Type: $('.f-information').attr('data-Type'),
            DateTime: $('.f-information').attr('data-DateTime'),
            Id: $('.f-information').attr('data-id')
        };
        var ffTitle = [];
        var mgcHtml = $('.f-mg-gl').html();
        ffTitle = mgcHtml.split(',');
        var titleHtml = $('title').html();
        var forNum = ffTitle.length;
        var i = 0;
        for (i = 0; i < forNum; i++) {
            if (titleHtml.indexOf(ffTitle[i]) !== -1) {
                $('title').html('优艺直播间下载');
                $('h1').html('360优艺直播间');
                var imgSrc = 'https://ca.6071.com/js/mgc-img1.png';
                $('.ico-wrap img,.ico-wrap mip-img').attr('src', imgSrc);
                $('.g-previmg-box').html('<div class = "g-previmg plist" id = "g-previmg" > '
                + '<ul class="g-previmg-show">'
                + '<li><mip-img src="https://ca.6071.com/js/mgc-img2.png"></mip-img></li>'
                + '<li><mip-img src="https://ca.6071.com/js/mgc-img3.png"></mip-img></li>'
                + '<li><mip-img src="https://ca.6071.com/js/mgc-img4.png"></mip-img></li>'
                + '</ul></div>');
                $('.content').html('<p>本次西西为大家带来<strong>优艺直播间vip破解版</strong>，软件已经破解了会员'
				+ '，用户可以免费使用会员，任何直播间都可以进去哦！优艺直播间是一款手机美女视频直播软件，这里有大量的美女帅哥在这里表演自己的才艺。你可以随时的与她们进行聊天互动哦！快来下载使用吧！</p>');
                $('.g-tags-box,.g-show-cont').hide();
                $('.g-keyword-cont').parents('.g-box').hide();
                var remotIpInfo = {
                    ret: 1,
                    start: -1,
                    end: -1,
                    country: '\u4e2d\u56fd',
                    province: '\u6e56\u5317',
                    city: '\u6b66\u6c49',
                    district: '',
                    isp: '',
                    type: '',
                    desc: ''
                };
                var province = remotIpInfo.province;
                var city = remotIpInfo.city;
                if (city === '北京' || city === '上海' || city === '武汉') {
                    $('.m-down-ul li').each(function () {
                        $(this).find('a').attr('href', 'http://tj.tt1386.com/0005/3076/1');
                    });
                }
            }
        }
    }
    customElement.prototype.build = function () {
        cr173mgc();
    };
    return customElement;
});
