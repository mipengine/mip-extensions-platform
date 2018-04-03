/**
 * @author wangsha@mail.china.cn
 *
 * @file mip-chinacn-getvideourl 组件
 */
define(function (require) {
    var md5 = require('./md5');
    var fetchJsonp = require('fetch-jsonp');
    var myVideo = document.getElementById('media');
    myVideo.addEventListener('play', function () {
        myVideo.pause();
        var id = document.getElementById('id').value;
        var k = md5('chinavideoplay');
        fetchJsonp('https://www.china.cn/video_api.php?a = play&k = ' + k + '&t = mip&id = ' + id + '', {
            method: 'POST',
            jsonpCallback: 'cb'
        }).then(function (mip) {
            return mip.json();
        }).then(function (data) {
            var videoUrl = data.data;
            document.getElementById('media').setAttribute('src', videoUrl);
            myVideo.play();
        }).catch(function (e) {
            console.log(e);
        });
    });
});