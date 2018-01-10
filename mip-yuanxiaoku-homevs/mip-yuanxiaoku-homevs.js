/**
 * @file mip-yuanxiaoku-homevs 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var util = require('util');
    var CustomStorage = util.customStorage;
    var customStorage = new CustomStorage(0);

    // build说明: 导航组件，在首屏展示，需要尽快加载
    customElement.prototype.build = render;
    function render() {
        var element = this.element;
        var $element = $(element);

        var vsSchool = JSON.parse(customStorage.get('vsSchool'));

        var vsCount = vsSchool.length ? vsSchool.length : '0';

        if (vsCount !== '0') {
            $element.find('#school-vs i').html(vsCount);
            $element.find('#school-vs i').show();
        }
    }

    return customElement;
});
