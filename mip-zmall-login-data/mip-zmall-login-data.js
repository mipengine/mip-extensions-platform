/**
 * @file mip-zol-data 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var viewer = require('viewer');

    /**
     * Build Constructor
     * 仿照官方mip-data 来写的，因为官方mip-data并不能登录后执行，所以加了登录后执行的机制
     * 因官方此处采用了 build 所以延用官方的方式
     *
     */
    customElement.prototype.build = function () {
        this.win = window;
        var src = this.element.getAttribute('src');
        var typeArr = this.element.getAttribute('type');
        var isNormalData = typeArr === 'normal';
        if (isNormalData && src) {
            this.getData(src);
        }
        // 登录后请求数据
        this.addEventAction('load', function (event) {
            if (src && event.sessionId && event.sessionId !== '') {
                this.getData(src + '&sessionId=' + event.sessionId);
            }
        });
    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    /**
     * Post Message to bind module
     *
     * @param {Object} data data value
     */
    customElement.prototype.postMessage = function (data) {
        window.m = window.m ? window.m : {};
        var loc = this.win.location;
        var domain = loc.protocol + '//' + loc.host;
        this.win.postMessage({
            type: 'bind',
            m: data
        }, domain);
    };

    /**
     * Get mip data via fetch
     *
     * @param {string} url fetch url
     */
    customElement.prototype.getData = function (url) {
        var element = this.element;
        if (!url || url === '') {
            return;
        }
        var me = this;
        fetch(url, {
            credentials: 'include'
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    viewer.eventAction.execute('loaded', element, {data: data});
                    me.postMessage(data);
                });
            }
            else {
                console.error('Fetch rquest failed!'); // eslint-disable-line
            }
        }).catch(function (e) {
            console.error(e); // eslint-disable-line
        });
    };

    return customElement;
});
