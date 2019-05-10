/**
 * @author wangsha@mail.china.cn
 *
 * @file mip-chinacn-getvideourl 组件
 */
define(function (require) {
    var customElement = require('customElement').create();
    var md5 = require('./md5.min');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        var myVideo = element.querySelector('mip-video');
        var request = false;
        myVideo.addEventListener('click', function () {
            if (request === true) {
                return;
            } else {
                myVideo.pause();
                var id = element.querySelector('#id').value;
                var k = md5('chinavideoplay');
                fetch('https://www.china.cn/video_api.php?a=play&k=' + k + '&t=mip&id=' + id + '')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (myJson) {
                        request = true;
                        var videoUrl = myJson.data;
                        var videoBox = element.querySelector('video');
                        myVideo.setAttribute('src', videoUrl);
                        videoBox.play();
                    }).catch(function (e) {
                        console.log(e);
                    });
            }
        });
    };
    return customElement;

});