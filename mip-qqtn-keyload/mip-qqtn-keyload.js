/**
 * @file mip-qqtn-keyload
 * 点击按钮根据接口加载更多数据,接口id和接口地址通过模版获取，接口网址为https.。
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var ajaxUrl = ele.getAttribute('data-topdateurl');
        var idkey = $(ele).find('.f-rootid').attr('data-id');
        var p = 2;
        var PageCount = 0;
        $(ele).find('#more').click(function () {
            $(this).html('\u5185\u5bb9\u6b63\u5728\u52a0\u8f7d\u4e2d\u002e\u002e\u002e');
            p = p + 1;
            fetch(ajaxUrl + 'sajax.asp?action=4&t=' + idkey + '&s=4&num=12&o=resrank desc,updatetime&p=' + p)
                .then(function (res) {
                    return res.text();
                }).then(function (msg) {
                    // var objJson = eval( '(' + msg + ')');
                    var objJson = (new Function('', 'return' + msg))();
                    var html = '';
                    for (var i = 0; i < objJson.ResName.length; i++) {
                        var txttime = objJson.UpdateTime[i].lastIndexOf(' ');
                        html += '<div class=\"g-cont-game m-nodown-box\">';
                        html += '<a href="/q/' + objJson.softId[i] + '" class=\"g-game-img\">';
                        html += '<em><mip-img src="' + objJson.SmallImg[i] + '"></mip-img></em>';
                        html += '<p>';
                        html += '<strong>' + objJson.ResName[i] + objJson.ResVer[i] + '</strong>';
                        html += '<mip-img src="https://m.qqtn.com/img/star' + objJson.ResRank[i] + '.png"></mip-img>';
                        html += '<b>' + objJson.CatalogName[i] + ' / <span class="m-softsize">';
                        html += '' + objJson.ResSize[i] + '</span> / ';
                        html += '' + objJson.UpdateTime[i].replace(/\//ig, '-').substring(0, txttime);
                        html += '</b>';
                        html += '</p>';
                        html += '</a>';
                        html += '<p class=\"g-more-box\"><a href="/q/' + objJson.softId[i] + '" class=\"g-game-btn\">';
                        html += '下载';
                        html += '</a></p>';
                        html += '</div>';
                    }
                    $(ele).find('#infocon').append(html);
                    $(ele).find('#more').html('\u70b9\u51fb\u67e5\u770b\u66f4\u591a\u002e\u002e\u002e');
                }).catch(function (err) {
                    $(ele).find('#more').html('\u6ca1\u6709\u66f4\u591a\u5185\u5bb9\u4e86\u002e\u002e\u002e');
                });
        });
    };
    return customElement;
});
