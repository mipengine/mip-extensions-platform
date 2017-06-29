/**
 * @file mip-ad-link 康网图片增加链接代码
 * @author cnkang
 */
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        $('#article_body').find('mip-img').parent().css('text-indent', 'initial');
        $('#article_body').find('mip-img').parent().css('text-align', 'center');
        $('#article_body').find('mip-img').parent().append('<a  href="https://m.cnkang.com/pic/" class="tianjia">点击图片，查看无码私图（套图）</a>');
        $(function () {
            var imgs = $('#article_body mip-img');
            if (imgs.length) {
                $.ajax({
                    url: 'https://m.cnkang.com/cnkang/getarticleimglink',
                    dataType: 'jsonp',
                    data: '',
                    jsonp: 'callback',
                    success: function (data) {
                        var urls = data.url;
                        urls = shuffle(urls).slice(0, imgs.length);
                        imgs.each(function (index, el) {
                            $(this).wrap('<a href = ' + urls[index] + '/></a>');
                        });
                    }
                });
            }
            function shuffle(array) {
                var currentIndex = array.length;
                while (0 !== currentIndex && 0 !== undefined) {
                    var randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    var temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }
        });
        $('[data-wtf]').on('click', function (event) {
            event.preventDefault();
            var jumpUrl = $(this).attr('data-wtf');
            location.href = jumpUrl;
        });
    };
    return customElement;
});
