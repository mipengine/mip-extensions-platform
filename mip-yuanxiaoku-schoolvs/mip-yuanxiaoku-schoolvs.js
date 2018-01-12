/**
 * @file mip-yuanxiaoku-schoolvs 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var util = require('util');
    var CustomStorage = util.customStorage;
    var customStorage = new CustomStorage(0);

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var $element = $(element);
        var schoolPage = 1;
        var vsCityId;

        var isLoadSchool = false;

        // 添加学校
        $element.find('.add-button').on('click', function () {
            $element.find('.city-list').addClass('active');
        });
        $element.find('.vs-school-list').on('click', 'ul li .shanchu', function () {
            var index =  $(this).parents('li').index();
            var parseVsSchool = JSON.parse(customStorage.get('vsSchool'));
            parseVsSchool.splice(index, 1);
            customStorage.set('vsSchool', JSON.stringify(parseVsSchool));
            isLoadSchool = false;
            loadVsCount();
            $(this).parents('li').addClass('remove');
            var thIs = $(this);
            setTimeout(function () {
                thIs.parents('li').remove();
            }, 300);
            $element.find('.vs-result .result-content .name-list .mip-vd-tabs-nav li').eq(index).remove();
            $element.find('.vs-result .result-content .zonghe-canshu .mip-vd-tabs-nav li').eq(index).remove();
        });
        // 开始对比
        $element.find('.kaishi-duibi').on('click', function () {
            var schoolIdArr = [];
            $element.find('.vs-school-list ul li').map(
                function (index, item) {
                    schoolIdArr.push(item.dataset.schoolId);
                }
            );
            // console.log(schoolIdArr);
            if (arrRepeat(schoolIdArr)) {
                if (confirm('存在同一所学校，确定要比对吗！')) {
                    $element.find('.vs-result').addClass('active').css({zIndex: 12});
                } else {
                    return;
                }
            } else {
                $element.find('.vs-result').addClass('active').css({zIndex: 12});
            }
        });
        function arrRepeat(arr) {
            var arrStr = JSON.stringify(arr);
            for (var i = 0; i < arr.length; i++) {
                if ((arrStr.match(new RegExp(arr[i], 'g')).length) > 1) {
                    return true;
                }
            };
            return false;
        }
        // 院校对比
        $element.find('.vs-result').on('click', '.title .quxiao', function () {
            $element.find('.vs-result').removeClass('active').css({zIndex: 'initial'});
        });

        // 地区列表
        $element.find('.city-list').on('click', '.title .quxiao', function () {
            $element.find('.city-list').removeClass('active');
        });
        $element.find('.city-list').on('click', '.list-content ul li', function () {
            $element.find('.school-list .list-content ul').html('');
            $element.find('.school-list').addClass('active').css({zIndex: 11});
            $element.find('.school-list .title h2').html($(this).text());

            schoolPage = 1;
            vsCityId = $(this).data('city-id');
            // console.log(vsCityId);
            loadSchool(vsCityId);
        });

        // 学校列表
        $element.find('.school-list').on('click', '.title .quxiao', function () {
            $element.find('.school-list').removeClass('active').css({zIndex: 'initial'});
            // $element.find('.city-list').removeClass('active');
        });

        $element.find('.school-list').on('click', '.list-content ul li h2 > p', function (event) {
            $(this).toggleClass('active');
            $(this).parents('li').find('.details').toggle();
        });

        $element.find('.school-list').on('click', '.list-content ul li h2 > section', function (event) {
            customStorage.set('vsSchool', (customStorage.get('vsSchool') ? customStorage.get('vsSchool') : '[]'));
            var parseVsSchool = JSON.parse(customStorage.get('vsSchool'));

            if (parseVsSchool == null || parseVsSchool.length < 4) {
                parseVsSchool.push({schoolId: $(this).parents('li').data('school-id')});

                customStorage.set('vsSchool', JSON.stringify(parseVsSchool));
            } else {
                alert('最多选择4所学校！');
                return;
            }

            $element.find('.school-list').removeClass('active').css({zIndex: 'initial'});
            $element.find('.city-list').removeClass('active');

            isLoadSchool = true;
            loadVsCount();
        });

        var firstVsCount = true;
        loadVsCount();
        function loadVsCount() {
            $element.find('.vs-school-list .load-info .none').hide();
            $element.find('.vs-school-list .load-info .loading').show();

            if (!customStorage.get('vsSchool')) {
                $element.find('.vs-school-list .load-info .loading').hide();
                $element.find('.kaishi-duibi').hide();
                $element.find('.add-button').show();
                return;
            }

            var vsCount = JSON.parse(customStorage.get('vsSchool'));
            // console.log(vsCount);

            if (vsCount.length >= 2) {
                if (vsCount.length >= 4) {
                    $element.find('.add-button').hide();
                    $element.find('.kaishi-duibi').show();
                } else {
                    $element.find('.kaishi-duibi').show();
                    $element.find('.add-button').show();
                    $element.find('.add-button').addClass('active');
                }
            } else {
                if (vsCount.length >= 1) {
                    $element.find('.kaishi-duibi').hide();
                    $element.find('.add-button').show();
                    $element.find('.add-button').removeClass('active');
                } else {
                    $element.find('.kaishi-duibi').hide();
                    $element.find('.add-button').show();
                    $element.find('.add-button').removeClass('active');
                    $element.find('.vs-school-list .load-info .loading').hide();
                    return;
                }
            }

            if (firstVsCount) {
                firstVsCount = false;
                $element.find('.vs-school-list ul').html('');
                $element.find('.vs-result .result-content .name-list .mip-vd-tabs-nav').html('');
                $element.find('.vs-result .result-content .zonghe-canshu .mip-vd-tabs-nav').html('');

                var totalCount = vsCount.length;

                var currentCount = 1;

                fetchVsSchool(vsCount[currentCount - 1].schoolId);

                function fetchVsSchool(schoolId) {
                    fetch('https://data.api.ppkao.com/Interface/YXK/AcademyApi.ashx?action=GetAcademyByID&Id=' + schoolId)
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (json) {
                        // console.log(decode(json));
                        var list = decode(json).SchoolList;
                        // Banner页
                        $element.find('.vs-school-list ul').append(
                            list.map(function (item, index) {
                                return (
                                    '<li class=\'active\' data-school-id=\'' + item.ID + '\'>'
                                    +    '<i>'
                                    +        '<mip-img src=\"' + (item.Logo
                                                ? item.Logo
                                                : '../static/images/none.png') + '\"></mip-img>'
                                    +    '</i>'
                                    +    '<span>'
                                    +        '<h2>' + item.schoolname + '</h2>'
                                    +        '<b>' + item.membership + '</b>'
                                    +    '</span>'
                                    +    '<b class=\'shanchu iconfont icon-x\'></b>'
                                    + '</li>'
                                );
                            })
                        );

                        $element.find('.vs-school-list .load-info .loading').hide();

                        // 对比页
                        $element.find('.vs-result .result-content .name-list .mip-vd-tabs-nav').append(
                            list.map(function (item, index) {
                                return (
                                    '<li>'
                                    +    '<span>'
                                    +        '<mip-img src=\"' + (item.Logo
                                                ? item.Logo
                                                : '../static/images/none.png') + '\"></mip-img>'
                                    +    '</span>'
                                    +    '<h2>' + item.schoolname + '</h2>'
                                    + '</li>'
                                );
                            })
                        );
                        $element.find('.vs-result .result-content .zonghe-canshu .mip-vd-tabs-nav').append(
                            list.map(function (item, index) {
                                return (
                                    '<li>'
                                    +    '<span>' + item.schooltype + '</span>'
                                    +    '<span>' + item.province + '</span>'
                                    +    '<span>' + (item.f211 === '0' ? '否' : '是') + '</span>'
                                    +    '<span>' + (item.f985 === '0' ? '否' : '是') + '</span>'
                                    +    '<span>' + item.membership + '</span>'
                                    +    '<span>' + (item.DoctorStation === '0' ? '--' : item.DoctorStation) + '</span>'
                                    +    '<span class=\'zhongdian-xueke\'>' + (item.KeySubject === '0'
                                            ? '--'
                                            : item.KeySubject) + '</span>'
                                    +    '<span><a href=\'schooldetails.html?ID=' + item.ID + '\'>查看详情</a></span>'
                                    +    '<span><a href=\'' + item.guanwang + '\'>进入</a></span>'
                                    +    '<span class=\'shoufei-biaozhun\'>' + item.shoufei + '</span>'
                                    + '</li>'
                                );
                            })
                        );

                        // 根据本地学校的数量
                        currentCount++;
                        if (currentCount <= totalCount) {
                            setTimeout(function () {
                                fetchVsSchool(vsCount[currentCount - 1].schoolId);
                            }, 200);
                        }
                    });
                }
            } else {
                if (isLoadSchool) {
                    isLoadSchool = false;

                    fetch('https://data.api.ppkao.com/Interface/YXK/AcademyApi.ashx?action=GetAcademyByID&Id='
                    + vsCount[vsCount.length - 1].schoolId)
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (json) {
                        // console.log(decode(json));
                        var list = decode(json).SchoolList;
                        // Banner页
                        $element.find('.vs-school-list ul').append(
                            list.map(function (item, index) {
                                return (
                                    '<li class=\'active\' data-school-id=\'' + item.ID + '\'>'
                                    +    '<i>'
                                    +        '<mip-img src=\"' + (item.Logo
                                                ? item.Logo
                                                : '../static/images/none.png') + '\"></mip-img>'
                                    +    '</i>'
                                    +    '<span>'
                                    +        '<h2>' + item.schoolname + '</h2>'
                                    +        '<b>' + item.membership + '</b>'
                                    +    '</span>'
                                    +    '<b class=\'shanchu iconfont icon-x\'></b>'
                                    + '</li>'
                                );
                            })
                        );

                        $element.find('.vs-school-list .load-info .loading').hide();

                        // 对比页
                        $element.find('.vs-result .result-content .name-list .mip-vd-tabs-nav').append(
                            list.map(function (item, index) {
                                return (
                                    '<li>'
                                    +    '<span>'
                                    +        '<mip-img src=\"' + (item.Logo
                                                ? item.Logo
                                                : '../static/images/none.png') + '\"></mip-img>'
                                    +    '</span>'
                                    +    '<h2>' + item.schoolname + '</h2>'
                                    + '</li>'
                                );
                            })
                        );
                        $element.find('.vs-result .result-content .zonghe-canshu .mip-vd-tabs-nav').append(
                            list.map(function (item, index) {
                                return (
                                    '<li>'
                                    +    '<span>' + item.schooltype + '</span>'
                                    +    '<span>' + item.province + '</span>'
                                    +    '<span>' + (item.f211 === '0' ? '否' : '是') + '</span>'
                                    +    '<span>' + (item.f985 === '0' ? '否' : '是') + '</span>'
                                    +    '<span>' + item.membership + '</span>'
                                    +    '<span>' + (item.DoctorStation === '0' ? '--' : item.DoctorStation) + '</span>'
                                    +    '<span class=\'zhongdian-xueke\'>' + (item.KeySubject === '0'
                                            ? '--'
                                            : item.KeySubject) + '</span>'
                                    +    '<span><a href=\'schooldetails.html?ID=' + item.ID + '\'>查看详情</a></span>'
                                    +    '<span><a href=\'' + item.guanwang + '\'>进入</a></span>'
                                    +    '<span class=\'shoufei-biaozhun\'>' + item.shoufei + '</span>'
                                    + '</li>'
                                );
                            })
                        );
                    });
                } else {
                    $element.find('.vs-school-list .load-info .loading').hide();
                }
            }
        }

        loadCity();
        function loadCity() {
            $element.find('.city-list .load-info .none').hide();
            $element.find('.city-list .load-info .loading').show();

            fetch('https://data.api.ppkao.com/Interface/YXK/PublicApi.ashx?action=GetProvinceList')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json))
                var list = decode(json).pList;
                $element.find('.city-list .list-content ul')
                .html(
                    list.map(function (item, index) {
                        return (
                            '<li data-city-id=\'' + item.ID + '\'>'
                            +    item.ProvinceName
                            + '</li>'
                        );
                    })
                );
                $element.find('.city-list .load-info .loading').hide();
                $element.find('.city-list .load-info .none').show();
            });
        }

        var schoolCurrentPage = 1;
        var schoolPageCount = 1;
        var loadSchoolInfo = true;
        function loadSchool(vsCityId) {
            $element.find('.school-list .list-content .load-info .none').hide();
            $element.find('.school-list .list-content .load-info .loading').show();

            fetch('https://data.api.ppkao.com/Interface/YXK/AcademyApi.ashx?action=GetAcademyList&province='
            + vsCityId + '&page=' + schoolPage)
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                var list = decode(json);

                if (list.S === '0') {
                    $element.find('.school-list .list-content .load-info .loading').hide();
                    $element.find('.school-list .list-content .load-info .none').show();
                    return;
                }

                var schoolList = decode(json).SchoolList;

                schoolCurrentPage = parseInt(list.CurrentPage, 10);
                schoolPageCount = parseInt(list.PageCount, 10);
                // console.log(schoolCurrentPage, schoolPageCount);

                $element.find('.school-list .list-content ul').append(
                    schoolList.map(function (item, index) {
                        return (
                            '<li data-school-id=\'' + item.ID + '\'>'
                            +    '<h2>'
                            +        '<section>'
                            +            '<span>'
                            +                '<mip-img src=\"' + (item.Logo
                                                ? item.Logo
                                                : '../static/images/none.png') + '\"></mip-img>'
                            +            '</span>'
                            +            '<h4>' + item.schoolname + '</h4>'
                            +        '</section>'
                            +        '<p></p>'
                            +    '</h2>'
                            +    '<div class=\'details\'>'
                            +        '<article>'
                            +            '<span>'
                            +                '学校所在地：<b>' + item.province + '</b>'
                            +            '</span>'
                            +            '<span>'
                            +                '学校类型：<b>' + item.schoolproperty + '</b>'
                            +            '</span>'
                            +            '<span>'
                            +                '院校性质：<b>' + item.schoolnature + '</b>'
                            +            '</span>'
                            +            '<span>'
                            +                '院校代码：<b>' + item.schoolcode + '</b>'
                            +            '</span>'
                            +        '</article>'
                            +    '</div>'
                            + '</li>'
                        );
                    })
                );

                $element.find('.school-list .list-content .load-info .loading').hide();

                if (schoolCurrentPage === schoolPageCount) {
                    $element.find('.school-list .list-content .load-info .none').show();
                    return;
                }

                loadSchoolInfo = true;
            });
        }
        // 页面 scroll 事件
        $element.find('.school-list .list-content').on('scroll', function () {
            var height = $(this).height();
            var scrTop = $(this).scrollTop();
            var scrHeight = $(this)[0].scrollHeight;
            if (height >= scrHeight - scrTop - 100) {
                if (schoolCurrentPage < schoolPageCount && loadSchoolInfo) {
                    loadSchoolInfo = false;
                    schoolPage++;
                    loadSchool(vsCityId);
                }
            }
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
    };

    return customElement;
});
