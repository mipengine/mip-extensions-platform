/**
 * @file mip-hc360-performace 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 创建uuid
     */
    function UUID() {
        this.id = this.createUUID();
    }
    UUID.prototype.createUUID = function () {
        var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
        var dc = new Date();
        var t = dc.getTime() - dg.getTime();
        var h = '';
        var tl = UUID.getIntegerBits(t, 0, 31);
        var tm = UUID.getIntegerBits(t, 32, 47);
        var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security version is 2
        var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
        var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
        var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7)
                + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
                + UUID.getIntegerBits(UUID.rand(8191), 0, 7)
                + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
                + UUID.getIntegerBits(UUID.rand(8191), 0, 15);
        return tl + h + tm + h + thv + h + csar + csl + h + n;
    };

    UUID.getIntegerBits = function (val, start, end) {
        var base16 = UUID.returnBase(val, 16);
        var quadArray = [];
        var quadString = '';
        var i = 0;
        for (i = 0; i < base16.length; i++) {
            quadArray.push(base16.substring(i, i + 1));
        }
        for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
            if (!quadArray[i] || quadArray[i] === '') {
                quadString += '0';
            }
            else {
                quadString += quadArray[i];
            }
        }
        return quadString;
    };

    UUID.returnBase = function (number, base) {
        var convert = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        if (number < base) {
            var output = convert[number];
        }
        else {
            var MSD = '' + Math.floor(number / base);
            var LSD = number - MSD * base;
            if (MSD >= base) {
                var output = this.returnBase(MSD, base) + convert[LSD];
            }
            else {
                var output = convert[MSD] + convert[LSD];
            }
        }
        return output;
    };

    UUID.rand = function (max) {
        return Math.floor(Math.random() * max);
    };

    var LocalCookie = (function () {
        return {
            getTodayLastTime: function () {
                var d = new Date();
                var h = 23 - d.getHours();
                var m = 59 - d.getMinutes();
                var s = 60 - d.getSeconds();
                return (h * 3600 + m * 60 + s) * 1000;
            },
            getExpireTimeString: function (day) {
                var time = (day === 0)
                    ? this.getTodayLastTime()
                    : day * 24 * 3600 * 1000;
                var currentTime = new Date().getTime();
                return new Date(currentTime + time).toUTCString();
            },
            setCookie: function (opt) {
                var expire = ';expires=';
                if (isNaN(opt.day)) {
                    expire = '';
                }
                else {
                    expire += this.getExpireTimeString(opt.day);
                }
                var domain = (opt.domain)
                    ? ';domain=' + opt.domain
                    : '';
                var path = (opt.path)
                    ? ';path=' + opt.path
                    : '';
                document.cookie = opt.key + '=' + encodeURIComponent(opt.value) + expire + domain + path;
            },
            getCookie: function (key) {
                var arr;
                var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
                if (arr = document.cookie.match(reg)) {
                    return decodeURIComponent(arr[2]);
                }
                else {
                    return null;
                }
            },
            REMOVE: function (key) {
                this.setCookie({'key': key, 'value': '', 'day': -1});
            }
        };
    })();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        /**
         * 创建pageid
         */
        var pageId = new UUID().createUUID();

        /*必须：pi、pu、vi、ft   有最好：sx、sy、cs、bi、un*/
        var ubaParam = {
            logrecordpage: {
                sx: window.screen.width,
                sy: window.screen.height,
                pi: pageId
            }
        };

        /** 添加pu 页面来源 **/
        try {
            ubaParam.logrecordpage.pu = decodeURIComponent(document.referrer);
        } catch (err) {
            ubaParam.logrecordpage.pu = document.referrer;
        } finally {
            ubaParam.logrecordpage.pu = encodeURIComponent(ubaParam.logrecordpage.pu);
        }

        /*** 添加vi  visitid */
        var hc360Visitid = LocalCookie.getCookie('hc360visitid');
        if (hc360Visitid && hc360Visitid !== '') {
            ubaParam.logrecordpage.vi = hc360Visitid;
        } else {
            var visitid = new UUID().createUUID();
            ubaParam.logrecordpage.vi = visitid;
            LocalCookie.setCookie({
                key: 'hc360visitid',
                value: visitid,
                domain: 'mip-hc360-com.mipcdn.com',
                path: '/',
                day: 3650
            });
        }

        /*** 添加ft 访问时间 */
        var hc360firstTime = LocalCookie.getCookie('hc360first_time');
        if (hc360firstTime && hc360firstTime !== '') {
            ubaParam.logrecordpage.ft = hc360firstTime;
        } else {
            var t = new Date();
            var timeStr = t.getFullYear()
                + '-' + ('0' + (t.getMonth() + 1)).slice(-2)
                + '-' + ('0' + (t.getDate())).slice(-2);
            ubaParam.logrecordpage.ft = timeStr;
            LocalCookie.setCookie({
                key: 'hc360first_time',
                value: timeStr,
                domain: 'mip-hc360-com.mipcdn.com',
                path: '/',
                day: 3650
            });
        }

        /*** 添加un */
        var lastloginusers = LocalCookie.getCookie('lastloginusers');
        if (lastloginusers && lastloginusers !== '') {
            var b = lastloginusers.split(',');
            if (b.length === 1) {
                var c = b[0];
            } else {
                var c = b[b.length - 1].substring(0, b[b.length - 1].length - 1);
            }
            ubaParam.logrecordpage.un = c;
        }

        /*** 添加bi createUUID  */
        var hcBrowserId = LocalCookie.getCookie('hcbrowserid');
        if (hcBrowserId && hcBrowserId !== '') {
            ubaParam.logrecordpage.bi = hcBrowserId;
        } else {
            var browserid = new UUID().createUUID();
            ubaParam.logrecordpage.bi = browserid;
            LocalCookie.setCookie({
                key: 'hcbrowserid',
                value: browserid,
                domain: 'mip-hc360-com.mipcdn.com',
                path: '/',
                day: 3650
            });
        }

        /*** 添加cs 页面编码格式 */
        ubaParam.logrecordpage.cs = 'UTF-8';

        /** 发送用户行为分析请求 */
        fetchJsonp('https://logrecords.hc360.com/logrecordservice/logrecordget?' + getDataString(ubaParam.logrecordpage), {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            console.log(data);
        }).catch(function () {
            return false;
        });

        function getDataString(sendData) {
            var dataString = '';
            for (var i in sendData) {
                dataString += ('&' + i + '=' + sendData[i]);
            };
            return dataString.slice(1);
        }
    };

    return customElement;
});
