/**
 * @file mip-kmway-count 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var sendRef = function () {
        var self = this;
        var url = self.element.getAttribute('urlRef');
        var ref = document.referrer;

        url = url + ref;

        fetch(url, {
            method: 'GET'
        });
    };

    var sendCodes = function () {
        var self = this;
        var url = self.element.getAttribute('urlCode');
        var cmsadposs = document.querySelectorAll('[data-type="cmsadpos"]');
        var codes = '';

        if (cmsadposs.length > 0) {
            for (var i = 0; i < cmsadposs.length; i++) {
                codes += ',' + cmsadposs[i].getAttribute('data-id');
            }
            if (codes !== '') {
                var urls = url + codes;
                fetch(urls, {
                    method: 'GET'
                });
            }
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var self = this;
        sendRef.call(this);
        sendCodes.call(this);

        this.addEventAction('sendGuest', function (event, url) {
            fetch(url, {
                method: 'GET'
            });
        });

        document.addEventListener('click', function (e) {
            var tar = e.target;
            var url = self.element.getAttribute('urlAdid');

            if (tar.getAttribute('data-type') === 'cmsad') {
                var adid = tar.getAttribute('data-id');

                if (adid != null) {
                    var urls = url + adid;
                    fetch(urls, {
                        method: 'GET'
                    });
                }
            }
        });
    };

    return customElement;
});
