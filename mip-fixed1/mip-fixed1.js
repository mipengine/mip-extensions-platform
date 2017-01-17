/**
 * @file 广告插件

 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * build
     */
    function build() {
        var self = this;
        self.addEventAction('close', function (event) {
            event.preventDefault();
            util.css(self.element, 'display', 'none');
        });

    }

    customElement.prototype.build = build;

    return customElement;
});

