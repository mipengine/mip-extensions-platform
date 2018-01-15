/**
 * @file mip-yuanxiaoku-schoollist 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

   // build说明: 首屏组件，在首屏展示，需要尽快加载
    customElement.prototype.build = render;

    function render() {
        var element = this.element;
        var url = 'https://data.api.ppkao.com' + element.dataset.url + '?action=' + element.dataset.action;

        // console.log(url)

        var $ele = $(element);

        fetch(url)
        .then(function (res) {
            return res.json();
        }).then(function (json) {
            // console.log(decode(json))
            var schoolList = decode(json).SchoolList;

            $ele.find('.college-list').html(
                schoolList.map(function (item, index) {
                    return (
                        '<li>'
                        +    '<a href=\'schooldetails.html?ID=' + item.ID + '\'>'
                        +        '<section>'
                        +            '<span>'
                        +                '<mip-img src=\"' + (item.Logo
                                            ? item.Logo : '../static/images/none.png') + '\"></mip-img>'
                        +            '</span>'
                        +            '<h4>' + item.schoolname + '</h4>'
                        +        '</section>'
                        +        '<p>查看详情</p>'
                        +    '</a>'
                        + '</li>'
                    );
                })
            );
        });


        function getRequest() {
            var url = location.href;    // 获取url中"?"符后的字串
            var theRequest = {};
            var strs;
            if (url) {
                var str = url.substr(url.indexOf('?') + 1);
                strs = str.split('&');
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
                }
            }
            // console.log(url, theRequest);

            return theRequest;
        }
        function decode(obj) {
            var res = {};
            Object.keys(obj).forEach(function (i) {
                var val = obj[i];
                if (Array.isArray(val)) {
                    res[i] = [];
                    val.forEach(function (item) {
                        res[i].push(decode(item));
                    });
                } else {
                    if (val instanceof Object) {
                        res[i] = decode(val);
                    } else {
                        res[i] = base64('decode', val);
                    }
                }
            });
            return res;
        }
        function base64(fun, val) {
            // private property
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            // public method for encoding
            function encode(input) {
                var output = '';
                var chr1;
                var chr2;
                var chr3;
                var enc1;
                var enc2;
                var enc3;
                var enc4;
                var i = 0;
                input = utf8Encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output
                        + keyStr.charAt(enc1) + keyStr.charAt(enc2)
                        + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                }
                return output;
            }

            // public method for decoding
            function decode(input) {
                if (input === 'undefined' || input === null || undefined === '' || input === '0') {
                    return input;
                }
                var output = '';
                var chr1;
                var chr2;
                var chr3;
                var enc1;
                var enc2;
                var enc3;
                var enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
                while (i < input.length) {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 !== 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 !== 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = utf8Decode(output);
                return output;
            }

            // private method for UTF-8 encoding
            function utf8Encode(string) {
                string = string.replace(/\r\n/g, '\n');
                var utftext = '';
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }
                return utftext;
            }

            // private method for UTF-8 decoding
            function utf8Decode(utftext) {
                var string = '';
                var i = 0;
                var c = 0;
                var c1 = 0;
                var c2 = 0;
                var c3 = 0;
                while (i < utftext.length) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }

            switch (fun) {
                case 'encode':
                    return encode(val);
                    break;
                case 'decode':
                    return decode(val);
                    break;
                default:
                    break;
            }
        }
    }

    return customElement;
});
