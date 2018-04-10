/**
 * @file 工具
 * @author wangshikun@kanzhun.com
 * */
define(function (require) {

    var Path = require('./path');

    var inProduction = location.hostname.indexOf('kanzhun.com') >= 0;
    var DOMAIN = inProduction ? 't.kanzhun.com' : '192.168.1.251';

    /**
     * 加载图片并附上额外参数
     * @param  {string} src    图片名称
     * @param  {Object} params 请求图片附带的参数
     */
    function loadImg(src, params) {
        var img = new Image();

        // 做一次签名。 后续的code，需要判断这个签名
        var __a = params['__a'];
        var __t = Math.floor(params['_'] / 100);

        if (__a && __t) {
            var s = __a + __t;
            var sign = 0;

            for (var i = 0; i < s.length; i++) {
                sign += s.charCodeAt(i);
            }

            params['_'] = __t * 100 + sign % 100;
        }

        img.src = 'http://' + DOMAIN + src + '?' + Path.packParams(params);
    }

    return {
        inProduction: inProduction,
        loadImg: loadImg
    };
});