/**
 * @file mip-yesky-cai 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        function setCookie(name, value, iDay) {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + iDay);
            document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate;
        }
        function getCookie(name) {
            var arr = document.cookie.split('; ');
            var i = 0;
            for (i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('=');
                if (arr2[0] === name) {
                    var getC = decodeURIComponent(arr2[1]);
                    return getC;
                }
            }
            return '';
        }
        $(element).find('.clidown').click(function () {
            var id = $(this).siblings('.cid').html();
            var caicookie = getCookie('yicai' + id);
            var cspan = $(this).siblings('.cnum').find('span');
            var cnum = $(this).siblings('.cnum').find('span').html();
            var caii = $(this).siblings('.cnum').find('i');
            if (caicookie === 1) {
                // 因无法写入组件内，必须要全局选择
                $('.daiy_yc').show();
                setTimeout(function () {
                    $('.daiy_yc').css('display', 'none');
                }, 1000);
            }
            else {
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    // url: 'test.json',
                    url: 'https://openproduct.yesky.com/wechatapp/xinpin/voteSpokesman.json?spokesmanid=' + id + '&type=1',
                    success: function () {
                        caii.show();
                        cspan.html(parseInt(cnum, 10) + 1);
                        setTimeout(function () {
                            caii.css('display', 'none');
                        }, 1000);
                        setCookie('yicai' + id, '1');
                    }
                });
            }
        });
    };

    return customElement;
});
