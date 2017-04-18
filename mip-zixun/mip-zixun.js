/**
 * @file mip-zixun 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var element = this.element;
        var kwdStr = element.getAttribute('kwd');
        // <mip kwd="输入关键词"></mip>
        var swt = element.getAttribute('swt');
        // 商务通选择开关 1为华怡快商通 2为都市商务通

        switch (parseInt(swt, 10)) {
            case 1:
                setAddress('http://kefu7.kuaishang.cn/bs/im.htm?cas=57184___267863&fi=67852');
                break;
            case 2:
                setAddress('http://lkt.zoosnet.net/LR/Chatpre.aspx?id=LKT31872005&cid=1486284376577760076446&lng=cn&sid=1490506190111691726115');
                break;
            // default:
            //     setAddress('http://lkt.zoosnet.net/LR/Chatpre.aspx?id=LKT31872005&cid=1486284376577760076446&lng=cn&sid=1490506190111691726115');
            //     break;
        }

        var keyObj = $('meta[name=keywords]').attr('content');
        // 关键词内容赋值给keyObj

        var key = '@@@';
        // 定义key的默认值

        if (keyObj !== 'undefined') {
            key = keyObj;
        }
        // 如果keywords存在内容，把keywords的值赋值给key

        var kwd = $('meta[name=keywords_ext]').attr('content');
        // 定义keywords_ext的内容，赋值给kwd

        if (Boolean(kwd) === false) {
            kwd = kwdStr;
            $('<meta name=\'keywords_ext\' content=\'' + kwd + '\'>').appendTo('head');
        }
        // 如果未设置keywords_ext（keywords_ext值为undefined），使用kwdStr的内容，并添加meta标签
        if (typeof kwd !== 'undefined') {
            key = key + ',' + kwd;
        }
        else {
            kwd = $('meta[name=page-key]');
            if (typeof kwd !== 'undefined') {
                key = key + ',' + kwd;
            }
        }

        var keyword = encodeURI(key);

        var reUrl = encodeURIComponent(window.location.href);
        var url = 'https://sb.11dn.net/index.php?m=Api&c=Js&a=zx&keyword=' + keyword + '&reUrl=' + reUrl + '&site=' + swt + '&mip=1';

        var adId = getQueryString('ad');

        if (typeof (adId) !== 'undefined' && adId != null) {

            url = 'https://sb.11dn.net/index.php?m=Api&c=Js&a=zx&adId=' + adId + '&reUrl=' + reUrl + '&site=' + swt + '&mip=1' + '&keyword=' + keyword;

        }
        $(document).ready(function () {
            $('body').after('<script src=\'' + url + '\' charset=\'utf-8\'></script>');
        });



    };

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    function setAddress(add) {

        $('a[data-link="swt"]').on('click', function () {
            $('a[data-link="swt"]').attr('href', add);
        });
    }
    // 点击按钮时将链接指向商务通默认链接
    return customElement;
});
