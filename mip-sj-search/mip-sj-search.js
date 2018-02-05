/**
 * @file mip-sj-search 组件
 * @author
 */

define(function (require) {
    // 类对象
    var $ = require('jquery');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var $element = $(element);
        var $back = $element.find('.mip-sj-search-back');
        var $search = $element.find('.mip-sj-search-icon');
        var $input =  $element.find('#mip-sj-search-input input');

        function clearInput() {
            $input.val('');
        }

        $back.on('click', function () {
            $element.animate({
                left: '100%'
            }, 300, function () {
                $element.hide();
            });
        });

        $search.on('click', function () {
            var prefix = $('#page-prefix').val();
            var searchCtn = $input.val();
            searchCtn = $.trim(searchCtn);
            if (searchCtn === '') {
                return;
            }
            window.location.href = prefix + '?q=' + searchCtn;
        });

        // 绑定事件，其它元素可通过 on="xxx" 触发
        this.addEventAction('showOut', function (event/* 对应的事件对象 */, str /* 事件参数 */) {
            clearInput();
            $element.show();
            $element.animate({
                left: '0%'
            }, 300, function () {
                $input.focus();
            });
        });

        $element.css('left', '100%').hide();


    };

    return customElement;
});
