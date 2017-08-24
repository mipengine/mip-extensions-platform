/**
 * @file mip-trilobite-log 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {

        var Url = {
            parse: function (url) {
                var a = document.createElement('a');
                a.href = url;
                return {
                    source: url,
                    protocol: a.protocol.replace(':', ''),
                    host: a.hostname,
                    port: a.port,
                    query: a.search,
                    params: (function () {
                        var ret = {};
                        var seg = a.search.replace(/^\?/, '').split('&');
                        var len = seg.length;
                        var i = 0;
                        var s;
                        for (; i < len; i++) {
                            if (!seg[i]) {
                                continue;
                            }

                            s = seg[i].split('=');
                            ret[s[0]] = s[1];
                        }
                        return ret;
                    })(),
                    // file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
                    hash: a.hash.replace('#', ''),
                    path: a.pathname.replace(/^([^\/])/, '/$1'),
                    // relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
                    segments: a.pathname.replace(/^\//, '').split('/')
                };
            }
        };

        var Log = {

            print: function () {
                var projectName = window.PROJECT || 'default';
                var projectPath = window.PROJECTPATH || 'appweb';
                var urlRet = Url.parse(location.href);
                var url = '/' + projectPath + '/' + projectName + '/log';
                url += urlRet.query;

                var track = Array.prototype.slice.call(arguments).join('@');
                if (urlRet.query) {
                    url += '&';
                }
                else {
                    url += '?';
                }

                url += 'track=' + track;
                var appwebImg = new Image();
                appwebImg.src = url;
            },

            /**
             * 为打log地址增加 额外参数
             *
             * @param {Object} obj 额外参数对象
             * @param {Array} logstrs 数组
             */
            diyPrint: function (obj, logstrs) {
                var projectName = window.PROJECT || 'default';
                var projectPath = window.PROJECTPATH || 'appweb';
                var urlRet = Url.parse(location.href);
                var url = '/' + projectPath + '/' + projectName + '/log';
                url += urlRet.query;

                var track = Array.prototype.slice.call(logstrs).join('@');
                if (urlRet.query) {
                    url += '&';
                }
                else {
                    url += '?';
                }

                url += 'track=' + track;
                for (var p in obj) {
                    url += '&' + p + '=' + obj[p];
                }

                var appwebImg = new Image();
                appwebImg.src = url;
            },

            /**
             * 区分log
             *
             * @param {Array} logstrs 数组
             */
            dis: function (logstrs) {
                var proInfo = window.PROJECTINFO || {};
                var logs = [];
                var name = proInfo.name || 'default';
                logs.push(name);
                if (proInfo.actId) {
                    logs.push(proInfo.actId);
                }

                if (proInfo.topicId) {
                    logs.push(proInfo.topicId);
                }

                logstrs.push(logs.join('_'));
                this.print.apply(this, logstrs);
            },

            /**
             * 日志打点
             *
             * @param {Array} logstrs 数组
             * @param {Object} obj 额外参数对象
             * @example
             *  trace(['click'], {client_ip: '111.111.111.11'})
             */
            trace: function (logstrs, obj) {
                var projectName = window.PROJECT || 'weekend24hours';
                var projectPath = window.PROJECTPATH || 'appweb';
                var url = '/' + projectPath + '/' + projectName + '/log';
                var urlRet = Url.parse(location.href);
                let actId = window.PAGEINFO && window.PAGEINFO.pageInfo
                    ? window.PAGEINFO.pageInfo.actId : urlRet.params.actId;
                if (actId) {
                    logstrs.unshift(actId);
                }

                url += urlRet.query;
                if (urlRet.query) {
                    url += '&';
                }
                else {
                    url += '?';
                }
                var querys = [];
                if (obj) {
                    for (var k in obj) {
                        querys.push(k + '=' + obj[k]);
                    }
                }

                var track = Array.prototype.slice.call(logstrs).join('@');
                querys.push('track=' + track);
                url += querys.join('&');
                var appwebImg = new Image();
                appwebImg.src = url;
            }

        };

        var listLog = {
            init: function () {
                this.bindEvent();
            },
            bindEvent: function () {
                $('.listDownload').click(function () {
                    Log.trace(['trilobite', 'listDownload']);
                });

                $('.listArticle').click(function () {
                    Log.trace(['trilobite', 'listArticle']);
                });

                $('#detailSource').click(function () {
                    Log.trace(['trilobite', 'detailSource']);
                });

                $('.detailVideo').click(function () {
                    Log.trace(['trilobite', 'detailVideo']);
                });

                $('#detailDownload').click(function () {
                    Log.trace(['trilobite', 'detailDownload']);
                });
            }
        };

        listLog.init();

    };

    return customElement;
});
