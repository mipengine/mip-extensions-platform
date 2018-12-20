/**
 * @file mip-hlvask 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        var pid = element.getAttribute('hlvask-pid');
        var cid = element.getAttribute('hlvask-cid');
        var guid = element.getAttribute('hlvask-guid');
        $('#doask').on('click', function () {
            var askcontent = $('#askContent').val();
            var asktel = $('#askTel').val();
            $.post('https://mip.66law.cn/ajax/question_ajax.aspx', {type: 'ask', pid: pid, cid: cid, guid: guid, content: askcontent, tel: asktel}, function (res) {
                if (res.state === 1) {
                    window.location.href = 'http://m.66law.cn/user/public_admin/myquestion.aspx';
                }
                $('#show-tj').find('span').text(res.msg);
                $('#show-tj').show();
            }, 'json');
            setTimeout(function () {
                $('#show-tj').hide();
            }, 4000);
        });
    };
    return customElement;
});
