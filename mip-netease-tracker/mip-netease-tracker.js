/**
 * @file 调用统计方法
 * @author zhangyiding@corp.netease.com
 */

/* global define */
define(function (require) {
    var mipNeteaseTracker = require('customElement').create();
    var tracker = require('./tracker')('wap');
    tracker.pageTracker();
    return mipNeteaseTracker;
});
