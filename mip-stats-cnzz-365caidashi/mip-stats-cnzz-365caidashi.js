/**
 * @file mip-stats-cnzz-365caidashi   主要的作用是引入第三方流量统计功能——CNZZ  财大师项目专属，其他项目组切勿套用。
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO 引入第三方流量统计——CNZZ  财大师项目专属，其他项目组切勿套用。已存在的CNZZ组件，并不适合我司，他们的src是s11，我司的统计src是s19开头和s13开头。
        // 现有的cnzz组件中的src是s11.cnzz.com/z_stat.php?
        // 我司的cnzz统计中的src是s19.cnzz.com/z_stat.php?
        var ele = this.element;
        var cnzzProtocol = (('https:' === document.location.protocol) ? ' https://' : ' http://');
        var oSpan = document.createElement('span');
        oSpan.id = 'cnzz_stat_icon_1264625668';
        var script = document.createElement('script');
        script.src = cnzzProtocol + 's19.cnzz.com/z_stat.php?id=1264625668&show=pic';
        ele.appendChild(oSpan);
        ele.appendChild('script');
        ele.style.display = 'none';
    };
    return customElement;
});
