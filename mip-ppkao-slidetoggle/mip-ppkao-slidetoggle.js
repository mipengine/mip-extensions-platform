/**
 * @file mip-ppkao-slidetoggle 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var showmore = $(ele);
        var button = showmore.parents('.kaoshi-fenlei').find('.title span');
        button.on('click', function () {
            showmore.find('.kemulist li').slideToggle(400);
        });
        var questionsContainer = showmore.parents('.kaoshi-fenlei').find('.questions-container');
        showmore.find('.kemulist li').on('click', function () {
            button.find('b').text($(this).text());
            // questions-container.find('ul').html();
        });
    };

    return customElement;
});
