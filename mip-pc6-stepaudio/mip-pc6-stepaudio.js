/**
 * @file 分步阅读音频
 * @author lj
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        var audioUrl = 'https://tongji.pc6.com/statistics.php?&action=9&encode=utf8&text=';
        var ele = this.element;
        var txtele = $(ele).find('div');
        $(txtele).each(function (index) {
            var num = index + 1;
            var tempStr = '<div class="v_audio">';
            tempStr += '<div class="num"><span>' + num + '</span>/<span>' + $(txtele).length + '</span></div>';
            tempStr += '<div class="audio_icon" data-index="' + index + '">听语音</div>';
            tempStr += '</div>';
            $(this).prepend(tempStr);
        });
        $(ele).find('div.audio_icon').click(function () {
            var str = String($(this).parents('div').find('p').text());
            str = str.replace(/<\/?.+?>/g, '');
            str = str.replace(/^\s*$/g, '');
            str = str.replace(/%/g, '%25');
            str = str.replace(/#/g, '%23');
            str = str.replace(/&/g, '%26');
            str = str.replace(/\+/g, '%2B');
            str = str.replace(/\//g, '%2F');
            str = str.replace(/\\/g, '%5C');
            str = str.replace(/:/g, '%3A');
            str = str.replace(/=/g, '%3D');
            str = str.replace(/\?/g, '%3F');
            if ($(ele).find('#audio-sound')) {
                $(ele).find('#audio-sound').remove();
            }
            var ta = '<mip-audio id="audio-sound" autoplay src="';
            ta += audioUrl + str;
            ta += '" layout="fixed-height" height="50"></mip-audio>';
            $(ele).prepend(ta);
        });
    };
    return customElem;
});
