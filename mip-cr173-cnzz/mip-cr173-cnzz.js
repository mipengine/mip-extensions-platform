/**
* @file CNZZ统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var pageAttr = {
        rootId: $('.f-information').attr('data-rootid'),
        healthRootId: $('.f-health-rootid').html().split(',')
    };
    customElement.prototype.build = function () {
        if ($.inArray(pageAttr.rootId, pageAttr.healthRootId) === -1) {
            $('body').append('<span id=\'cnzz_stat_icon_3608757\'></span>');
            var cnzzCount = document.createElement('script');
            cnzzCount.src = 'https://s12.cnzz.com/z_stat.php?id=3608757&web_id=3608757';
            $('body').append(cnzzCount);
        }
        else {
            $('body').append('<span id=\'cnzz_stat_icon_3608757\'></span>');
            var cnzzCount = document.createElement('script');
            cnzzCount.src = 'https://s12.cnzz.com/z_stat.php?id=3608757&web_id=3608757';
            $('body').append(cnzzCount);
        }
    };
    return customElement;
});

