/**
 * @file mip-yesky-zan 组件
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

        $(element).find('.cliup').click(function () {
            var id = $(this).siblings('.dyid').html();
            var dycookie = getCookie('yizan' + id);
            var zspan = $(this).siblings('.znum').find('span');
            var zani = $(this).siblings('.znum').find('i');
            var znum = $(this).siblings('.znum').find('span').html();
            var url = 'https://openproduct.yesky.com/wechatapp/xinpin/voteSpokesman.jsonp?spokesmanid=' + id + '&type=0';
            function zanHide() {
                setTimeout(function () {
                    zani.css('display', 'none');
                }, 2000);
            }
            if (dycookie === 1) {
                // 因无法写入组件内，必须要全局选择
                $('.daiy_yzl').show();
                setTimeout(function () {
                    $('.daiy_yzl').css('display', 'none');
                }, 2000);
            }

            else {
                fetch(url, {
                    method: 'GET',
                    header: {
                        'Content-type': 'application/json'
                    }
                }).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    zani.show();
                    zspan.html(parseInt(znum, 10) + 1);
                    zanHide();
                    setCookie('yizan' + id, '1');
                });
            }
        });
    };
    return customElement;
});
