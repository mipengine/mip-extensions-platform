/**
 * @author wangsha@mail.china.cn
 *
 * @file mip-chinacn-getvideourl 组件
 */
define(function (require) {
    var customElement = require('customElement').create();
    var md5 = require('./md5.min');
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;
        var myVideo = element.querySelector('video');
        myVideo.addEventListener('play', function () {
            myVideo.pause();
            var id = element.querySelector('#id').value;
            var k = md5('chinavideoplay');
            fetchJsonp('https://www.china.cn/video_api.php?a = play&k = ' + k + '&t = mip&id = ' + id + '', {
                method: 'POST',
                jsonpCallback: 'cb'
            }).then(function (mip) {
                return mip.json();
            }).then(function (data) {
                var videoUrl = data.data;
                myVideo.setAttribute('src', videoUrl);
                myVideo.play();
            }).catch(function (e) {
                console.log(e);
            });
        });
    };
    return customElement;

});