/**
 * @file mip-ilaw66-allies-statistics 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var cnzzProtocol = (('https:' === document.location.protocol) ? ' https://' : ' http://');
        $(this.element).html(unescape('%3Cspan id="cnzz_stat_icon_1259843835"%3E%3C/span%3E%3Cscript src=""'
+ cnzzProtocol + 's4.cnzz.com/z_stat.php%3Fid%3D1259843835 type="text/javascript"%3E%3C/script%3E'));
        document.getElementById('cnzz_stat_icon_1259843835').style.display = 'none';
    };

    return customElement;
});
