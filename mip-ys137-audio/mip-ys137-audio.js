/**
 * @author: mj
 * @date:  2018-08-21
 * @time: 14:39
 * @file: mip-ys137-audio.js
 * @contact: regboy@qq.com
 * @description: 音频播放器
 */
define(function (require) {
    var customElem = require('customElement').create();
    var $ = require('zepto');
    // 初始化插件
    var init = function (element) {
        var duration = element.getAttribute('duration');
        var src = element.getAttribute('src');
        var html = $('<div class="doctor_audio_player"></div>');
        html.append('<div class="d_a_p_wrapper"></div>');
        var audio = document.createElement('audio');
        $(audio).attr({
            'src': src,
            'controls': '',
            'data-duration': duration,
            'preload': 'none'
        });
        html.find('.d_a_p_wrapper').append(audio);
        $(element).append(html);
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.ys137.com/js/audio_player.js';
        document.body.appendChild(script);
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        init(this.element);
    };
    return customElem;
});
