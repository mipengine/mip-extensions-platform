/**
* search
* @file search nav component
* @author 873920193@qq.com
* @version 1.0
* @copyright 2018 188soft.com, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function init(surla, surlb) {
        if ($('#basic-addon').length > 0) {
            $('#basic-addon').click(function (e) {
                e.stopPropagation();
                e.preventDefault();
                var keyword = $('#keyword').val();
                if (keyword === '') {
                    alert('请输入搜索词');
                    return false;
                }

                window.open(surla + keyword + surlb);
            });
            //
            document.onkeydown = function (e) {
                var ev = document.all ? window.event : e;
                if (ev.keyCode === 13) {
                    $('#basic-addon').click();
                    return false;
                }

            };
        }
    }
    //
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        var surla = $(element).attr('surla');
        var surlb = $(element).attr('surlb');
        init(surla, surlb);
    };
    return customElem;
});
