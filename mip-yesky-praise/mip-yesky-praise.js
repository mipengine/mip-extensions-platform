/**
 * @file  mip-yesky-praise 点赞组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var $href = window.location.href;
    var num = $href.lastIndexOf('/');
    var $host = $href.slice(0, num);
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var supportobj = $(element);
        var answerid = $(element).attr('id');
        $(element).click(function (e) {
            e.stopPropagation();
            $.ajax({
                type: 'GET',
                url: $host + '/index.php?answer/ajaxhassupport/' + answerid,
                cache: false,
                success: function (hassupport) {
                    if (hassupport !== '1') {
                        $.ajax({
                            type: 'GET',
                            cache: false,
                            url: $host + '/index.php?answer/ajaxaddsupport/' + answerid,
                            success: function (comments) {
                                supportobj.find('.agree-num').html(comments);
                            }
                        });
                    }
                    else {
                        $(element).find('.mip-praise-fu').show();
                        setTimeout(function () {
                            $(element).find('.mip-praise-fu').hide();
                        }, 2000);
                    }
                }
            });
        });
    };
    return customElement;
});


