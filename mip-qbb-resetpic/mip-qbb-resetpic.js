/**
 * @file mip-qbb-resetpic 重置图片大小
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {

        function resetPic() {
            var obj = $('.show-imgs');
            var oli = obj.find('.swiper-slide');
            var Img = oli.find('img');
            var imgo = new Image();
            var jtw;
            var jth;
            if (Img.length > 0) {
                imgo.src = Img.first().attr('src');
                imgo.onload = function () {
                    obj.show();
                    jtw = Img.first().width();
                    jth = Img.first().height();
                    if (jtw > jth) {
                        oli.css({width: '230px', height: '135px'});
                    }
                    else {
                        oli.css({width: '145px', height: '220px'});
                    }
                };
            }
        }

        resetPic();

    };

    return customElement;
});
