/**
 * @file mip-njt-ad 组件  mip.nongjitong.com 广告引入
 * @author houjinlong
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {

        // TODO
        var element = this.element;
        var ajaxXml = element.getAttribute('ajaxXml') || '/adm/15.xml';
        var ajaxIp = element.getAttribute('ajaxIp');
        var pagename = element.getAttribute('pagename');
        var ptypeid = element.getAttribute('ptypeid');
        var pcategoryid = element.getAttribute('pcategoryid');
        var adplace = element.getAttribute('adplace');
        var remoteIpInfo = false;

        adplace = adplace ? adplace.split(',') : ['m_b1'];

        loadXml();

        function loadXml() {
            $.ajax({
                type: 'GET',
                url: ajaxXml,
                dataType: 'xml',
                success: function (responsexml) {
                    if (ajaxIp) {
                        loadIp(responsexml);
                    } else {
                        for (var i = 0; i < adplace.length; i++) {
                            loadadm(responsexml, '', '', adplace[i]);
                        }
                    }
                }
            });
        }
        function loadIp(responsexml) {
            $.ajax({
                type: 'GET',
                url: ajaxIp,
                dataType: 'script',
                success: function () {
                    if (remoteIpInfo) {
                        if (remoteIpInfo.ret === 1) {
                            for (var i = 0; i < adplace.length; i++) {
                                loadadm(responsexml, remoteIpInfo.province, remoteIpInfo.city, adplace[i]);
                            }
                        }
                        else {
                            for (var i = 0; i < adplace.length; i++) {
                                loadadm(responsexml, '', '', adplace[i]);
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < adplace.length; i++) {
                            loadadm(responsexml, '', '', adplace[i]);
                        }
                        var errReportStr = '<img src="https://error-report.danongchang.cn/img.aspx?Appname=njtwap&priority=10&Url=' + window.location.href + '&Errcode=njtwap" />';
                        $(errReportStr).appendTo(document.body);
                    }
                },
                error: function (e) {
                    checkAdmIPajax(responsexml);
                }
            });
        }
        function loadadm(admxml, province, city, placeName) {
            $(admxml).find('adplace').each(function () {
                if ($(this).find('placeName').text() === placeName) {
                    $(this).find('item').each(function () {
                        if (($(this).find('pagename').text() === ''
                        || $(this).find('pagename').text().indexOf(pagename) >= 0)
                        && ($(this).find('typeid').text() === ''
                        || $(this).find('typeid').text().indexOf(ptypeid) >= 0)
                        && ($(this).find('categoryid').text() === ''
                        || $(this).find('categoryid').text().indexOf(pcategoryid) >= 0)
                        && ($(this).find('province').text() === ''
                        || $(this).find('province').text().indexOf(province) >= 0
                        || province.indexOf($(this).find('province').text()) >= 0)
                        && ($(this).find('city').text() === ''
                        || $(this).find('city').text().indexOf(city) >= 0
                        || city.indexOf($(this).find('city').text()) >= 0)) {
                            $('#' + placeName).html($(this).find('adcode').text())
                            .css('overflow', 'hidden')
                            .find('img').css({
                                'display': 'block',
                                'max-width': '100%',
                                'margin': '2% auto'
                            });
                            return false;
                        }
                    });
                    return false;
                }
            });
        }
        function checkAdmIPajax(responsexml) {
            for (var i = 0; i < adplace.length; i++) {
                loadadm(responsexml, '', '', adplace[i]);
            }
            var errReportStr = '<img src="https://error-report.danongchang.cn/img.aspx?Appname=njtwap&priority=5&Url=' + window.location.href + '&Errcode=admipajax" />';
            $(errReportStr).appendTo(document.body);
        }
    };
    return customElement;
});
