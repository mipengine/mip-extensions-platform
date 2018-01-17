/**
 * @file mip-bkmy-audio 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $ = require('jquery');
        $('.aud').click(function () {
            var ids = $(this).attr('id');
            if (ids) {
                var idNum = ids.split('_');
                for (var i = 0; i < 5; i++) {
                    if (idNum[1] !== i + '') {
                        var audio = document.getElementById('mip-audio_' + i).children[0];
                        audio.pause();
                        $('#controller_' + i).removeClass('mip-audio-playing-icon');
                    }
                }
            }
        });
    };
    return customElement;
});


