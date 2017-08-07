/**
* @author: wangjx
* @date: 2017-04-19
* @file: mip-zpm-commonga.js
*/
define(function (require) {
    var $ = require('zepto');
    var render = function () {
        // seo统计从搜索引擎直接访问简历、投递统计
        var referrer = document.referrer;
        var locationUrl = window.location.href;
        var numDomainMap = {
            121127134: 'www.baidu.com|m.baidu.com|m5.baidu.com|wap.baidu.com',
            121127132: 'sm.cn',
            121127133: 'www.sogou.com|wap.sogou.com',
            121127135: 'www.so.com|www.haosou.com|m.so.com',
            121127136: 'google.com',
            121127137: 'bing.com',
            121127138: 'yahoo.com',
            121127142: 'job.zhaopin.com',
            121127143: 'company.zhaopin.com',
            121127145: 'special.zhaopin.com',
            121127144: 'sou.zhaopin.com',
            121127146: 'other',
            121127139: 'direct'
        };
        if (!(/site=/g.test(locationUrl))) {
            var cooVal = getMcookie('urlfrom');
            var numVal = numDomainMap[cooVal] || '';
            var valReg = new RegExp(numVal.replace(/\./g, '\\.'), 'g');
            if (referrer) {
                if (!numVal || (numVal !== '' && !valReg.test(referrer))) {
                    for (var key in numDomainMap) {
                        var valAry = numDomainMap[key].split('|');
                        for (var i = 0; i < valAry.length; i++) {
                            var doName = valAry[i];
                            var valReg2 = new RegExp(doName.replace(/\./g, '\\.'), 'g');
                            if (valReg2.test(referrer)) {
                                seoFlow(key, doName);
                            }
                        }
                    }
                }
            } else {
                seoFlow('121127139', 'direct');
            }
        }
    };
    window.onload = function () {
        render();
    };
    function getMcookie(Name) {
        var search = Name + '=';
        var returnvalue = '';
        var offset;
        var end;
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset !== -1) {
                offset += search.length;
                end = document.cookie.indexOf(';', offset);
                if (end === -1) {
                    end = document.cookie.length;
                }
                returnvalue = unescape(document.cookie.substring(offset, end));
            }
        }
        if (returnvalue.length < 2) {
            returnvalue = '12001997';
        }
        return returnvalue;
    }
    function seoFlow(bid, cid) {
        (new Image()).src = 'https://cnt.zhaopin.com/Market/whole_counter.jsp?sid=' + bid + '&site=' + cid;
    }
    return {
        render: render
    };
});
