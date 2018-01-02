/**
 * @file mip-yuanxiaoku-homevs 组件
 * @author
 */

define(function (require) {
    let $ = require('zepto');
    let customElement = require('customElement').create();

    // build说明: 导航组件，在首屏展示，需要尽快加载
    customElement.prototype.build = render;
    function render() {
        let element = this.element;
        let $element = $(element);

        let vsSchool = JSON.parse(sessionStorage.vsSchool);

        let vsCount = vsSchool.length ? vsSchool.length : '0';

        if (vsCount !== '0') {
            $element.find('#school-vs i').html(vsCount);
            $element.find('#school-vs i').show();
        }
    }

    return customElement;
});
