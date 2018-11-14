/**
 * @file mip-download-game 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        ele.addEventListener('click', function () {
            var gameId = ele.getAttribute('game_id');
            if (gameId <= 0) {
                return false;
            }
            var mobileDomain = ele.getAttribute('mobile_domain');
            var u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                window.top.location.href = mobileDomain + 'index.php?c=game&a=download_count&game_id=' + gameId;
            }
            else if (u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1 || u.indexOf('iPod') > -1) {
                var options = {
                    url: mobileDomain + 'index.php?c=game&a=ajax_get_download',
                    type: 'POST',
                    dataType: 'json',
                    data: {'game_id': gameId},
                    success: function (data) {
                        if (data.code === 1) {
                            showDialog('游戏不存在');
                        }
                        else if (data.code === 0) {
                            showDialog(data.msg);
                        }
                        else if (data.code === 5) {
                            window.top.location.href = data.url;
                        }
                    }
                };
                $.ajax(options);
            }
            else if (u.indexOf('Windows Phone') > -1) {
                showDialog('暂无此设备下载地址');
            }
            else {
                showDialog('暂无此设备下载地址');
            }
        });
    };
    return customElement;
});


function showDialog(msg) {
    var dialog = '<div id="dialog" class="border-radius"><div style="text-align:center;"></div><p>message</p></div>';
    $(dialog).appendTo($('body'));
    $('#dialog p').html(msg);
    $('#dialog').show();
    $('#dialog').css({
        top: '50%',
        left: '50%',
        marginTop: -$('#dialog').height() / 2,
        marginLeft: -$('#dialog').width() / 2
    });
    setTimeout(function () {
        $('#dialog').fadeOut(2000);
    }, 2000);
}
