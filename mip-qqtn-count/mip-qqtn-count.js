/**
 * @file mip-alert 个人统计
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    function qqtnCount() {
        var webInfo = {
            Rootid: $('.f-information').attr('data-rootid'),
            Username: $('.f-information').attr('data-Username'),
            Type: $('.f-information').attr('data-Type'),
            DateTime: $('.f-information').attr('data-DateTime'),
            Id: $('.f-information').attr('data-id')
        };
        var src = 'https://count.612.com//index.php?m=r';
        var charset = '&charset=' + getPageCharset();
        var atime = '&atime=' + webInfo.DateTime;
        var ref = '&ref=' + encodeURIComponent(document.referrer);
        var url = '&url=' + encodeURIComponent(window.location.href);
        var username = '&username=' + encodeURIComponent(webInfo.Username);
        var type = '&type=' + webInfo.Type;
        var rid = '&rid=' + webInfo.Id;
        var platform = '&platform=2';
        var content = '&content=' + encodeURIComponent(document.title);
        var bjtj = $('.f-tjname').html();
        var tjname = bjtj.split('|');
        if (compareDate(webInfo.DateTime, '2015/11/1')) {
            var jsStrdate = src + charset + atime + ref + url + username + type + rid + platform + content;
            document.write('<iframe src="' + jsStrdate + '" width="0" height="0" style="display:none;"></iframe>');
            var bjname = webInfo.Username;
            var cnzzprotocol = 'https://';
            var cnzzid;
            var cnzzsite;
            if (bjname !== '') {
                if (tjname.legend > 1) {
                    for (var i = 0; i < tjname.length; i++) {
                        if (bjname = tjname[i].split(',')[0]) {
                            cnzzid = tjname[i].split(',')[1];
                            cnzzsite = tjname[i].split(',')[2];
                        }
                    }
                }
                if (typeof cnzzid === 'number' && typeof cnzzsite === 'string') {
                    var jsStr = '%3Cspan id=\'cnzz_stat_icon_';
                    jsStr += cnzzid + '\'%3E%3C/span%3E%3Cscript src=\'';
                    jsStr += cnzzprotocol;
                    jsStr += cnzzsite;
                    jsStr += '/stat.php%3Fid%3D';
                    jsStr += cnzzid;
                    jsStr += '%26show%3Dpic1\' type=\'text/javascript\'%3E%3C/script%3E';
                    document.write(unescape(jsStr));
                }
            }
        }
    }
    function getPageCharset() {
        var charSet = '';
        var oType = getBrowser();
        switch (oType) {
            case 'IE':
                charSet = document.charset;
                break;
            case 'FIREFOX':
                charSet = document.characterSet;
                break;
            default:
                break;
        }
        return charSet;
    }
    function getBrowser() {
        var oType = '';
        if (navigator.userAgent.indexOf('MSIE') !== -1) {
            oType = 'IE';
        }
        else if (navigator.userAgent.indexOf('Firefox') !== -1) {
            oType = 'FIREFOX';
        }

        return oType;
    }
    function compareDate(d1, d2) {
        return ((new Date(d1.replace(/-/g, '\/'))) > (new Date(d2.replace(/-/g, '\/'))));
    }
    customElement.prototype.build = function () {
        qqtnCount();
    };

    return customElement;
});
