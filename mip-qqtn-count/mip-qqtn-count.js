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
        if (compareDate(webInfo.DateTime, '2015/11/1')) {
            var jsStrdate = src + charset + atime + ref + url + username + type + rid + platform + content;
            document.write('<iframe src="' + jsStrdate + '" width="0" height="0" style="display:none;"></iframe>');
            var bjname = webInfo.Username;
            var cnzzprotocol = 'https://';
            var cnzzid;
            var cnzzsite;
            if (bjname !== '') {
                switch (bjname) {
                    case 'wyz':
                        cnzzid = 1256765412, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'caozhi':
                        cnzzid = 1256765785, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'zqr':
                        cnzzid = 1256765801, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'liucui':
                        cnzzid = 1257643251, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'yjw':
                        cnzzid = 1258159606, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'xhl':
                        cnzzid = 1258750045, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'lxl':
                        cnzzid = 1259099543, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'wangkang':
                        cnzzid = 1259711734, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'zhangdi':
                        cnzzid = 1259956349, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'guanxi':
                        cnzzid = 1260279967, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'wuying':
                        cnzzid = 1260279990, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'gaodou':
                        cnzzid = 1260551152, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'sml':
                        cnzzid = 1260551136, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'chenggang':
                        cnzzid = 1260551116, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'yangchao':
                        cnzzid = 1260870449, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'zhoufang':
                        cnzzid = 1261377139, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'yinzhiyao':
                        cnzzid = 1261377146, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'huangshan':
                        cnzzid = 1261377155, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'wanwenting':
                        cnzzid = 1261377180, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'wwy':
                        cnzzid = 1261494959, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'yinpan':
                        cnzzid = 1261494963, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'yuanna':
                        cnzzid = 1261494967, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'zaq':
                        cnzzid = 1261494975, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'zzl':
                        cnzzid = 1261494978, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'jilin':
                        cnzzid = 1261494988, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'zyp':
                        cnzzid = 1261660650, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'tjy':
                        cnzzid = 1261660653, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'cyl':
                        cnzzid = 1261660654, cnzzsite = 's95.cnzz.com';
                        break;
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
