/**
* Ѱҽ��ҩmip���� �°���������
* @file �ű�֧��
* @author jqthink@gmail.com
* @time 2017.07.03
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var ua = navigator.userAgent;
    var loadAd = function (elem, className, content) {
        var el = document.createElement('div');
        var script = document.createElement('script');
        var json = null;
        var arr = [];
        var res = content.replace(/\[|\,\s*|\]/g, function (matchs) {
            if (matchs === '[') {
                return '["';
            }
            else if ($.trim(matchs) === ',') {
                return '","';
            }
            else if (matchs === ']') {
                return '"]';
            }
        });
        if (typeof window.adStore === 'undefined') {
            window.adStore = {};
        }
        json = JSON.parse(res);
        arr.push('adStore["' + json[0] + '"]');
        arr.push('=');
        arr.push('"' + json[1] + '"');
        el.className = className;
        script.type = 'text/javascript';
        script.innerHTML = arr.join('');
        $(elem).append(el);
        $(el).append(script);
    };
    var parse = function (obj, userAgent, subject) {
        if (typeof  obj !== 'object') {
            return;
        }
        var tmp = obj;
        var x;
        for (x in tmp) {
            if (x.substr(0, 2) === 'if' || x === 'elseif') {
                if (tmp[x].hasOwnProperty('condition_type')) {
                    if (tmp[x].condition_type === 'ua') {
                        var reg = new RegExp(tmp[x].condition);
                        if (reg.test(userAgent)) {
                            if (tmp[x].hasOwnProperty('return_value')) {
                                return JSON.stringify(tmp[x].return_value).replace(/"|"/g, '');
                            }
                            else {
                                return parse(tmp[x].body, userAgent, subject);
                            }
                        }
                    }
                    else if (tmp[x].condition_type === 'in_array') {
                        if (tmp[x].condition.indexOf(subject) > -1) {
                            if (tmp[x].hasOwnProperty('return_value')) {
                                return JSON.stringify(tmp[x].return_value).replace(/"|"/g, '');
                            }
							else {
                                return parse(tmp[x].body, userAgent, subject);
                            }
                        }
                    }
                }
            }
			else {
                if (tmp[x].hasOwnProperty('return_value')) {
                    return JSON.stringify(tmp[x].return_value).replace(/"|"/g, '');
                }
                else {
                    return parse(tmp[x].body, userAgent, subject);
                }
            }
        }
    };
    // build ������Ԫ�ز��뵽�ĵ�ʱִ�У�����ִ��һ��
    customElem.prototype.build = function () {
     // this.element ��ȡ����ǰʵ����Ӧ�� dom Ԫ��
        var elem = this.element;
        var elStr = $(elem).attr('el');
        var adStr = $(elem).attr('ads');
        var complex = $(elem).attr('complex');
        var subject = parseInt($(elem).attr('subject'), 10);
        var adJson = null;
        var domain = document.domain;
        var url = document.URL;
        if (complex === 'on') {
            adJson = JSON.parse($(elem).attr('adJson'));
            loadAd(elem, elStr, parse(adJson, ua, subject));
        }
        else {
            if (domain === '3g.xywy.com') {
                $('mip-fixed[type="top"]').hide();
                $('.hot-news-panel').addClass('none');
                $('.mobile-ad-rnk1-panel').removeClass('none');
                $('.mobile-ad-rnk2-panel').removeClass('none');
            }
            if (url.indexOf('mipcache.bdstatic.com') > -1 && url.indexOf('3g.xywy.com') > -1) {
                $('mip-fixed[type="bottom"]').hide();
                $('.mobile-ad-rnk3-panel').removeClass('none');
            }
            loadAd(elem, elStr, adStr);
        }
    };
    return customElem;
});
