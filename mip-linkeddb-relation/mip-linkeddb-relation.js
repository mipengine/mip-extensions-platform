/**
 * @file mip-linkeddb-relation 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var d3 = require('./d3.min');
    var Base64 = require('./base64.min');
    var MakeSvgPicClass = require('./d3-rolesMap.min').MakeSvgPicClass;

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var graph = $(this.element).find('#roleMap').data('graph');
        if (graph) {
            var base = new Base64();
            var rolesData = JSON.parse(base.decode(graph));
            var configs = {
                nodes: rolesData.nodes,
                links: rolesData.links,
                width: $(this.element).find('#roleMap').width(),
                height: $(this.element).find('#roleMap').height()
            };
            new MakeSvgPicClass('roleMap', configs);
        }
    };
    return customElement;
});
