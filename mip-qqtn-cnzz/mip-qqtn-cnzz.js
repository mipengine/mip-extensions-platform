/**
* @file CNZZ统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/
define(function (require) {
    var customElement = require('customElement').create();
    function mipcnzz() {
        var cnzzprotocol = 'https://';
        var cnzzid;
        var cnzzsite;
        var jsStr = '%3Cspan id=\'cnzz_stat_icon_5932461';
        jsStr += cnzzid + '\'%3E%3C/span%3E%3Cscript src=\'';
        jsStr += cnzzprotocol;
        jsStr += cnzzsite;
        jsStr += 's12.cnzz.com/stat.php%3Fid%3D593246';
        jsStr += cnzzid;
        jsStr += '%26show%3Dpic1\' type=\'text/javascript\'%3E%3C/script%3E';
        document.write(unescape(jsStr));
    }
    customElement.prototype.build = function () {
        mipcnzz();
    };
    return customElement;
});
