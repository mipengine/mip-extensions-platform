/**
 * @file mip-yuanxiaoku-fastsearch 组件
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

        var schoolScityId = 1;
        var typeId = 19;
        var schoolId = 832;

        $element.find('.select-category ul li .fenshuxian').on('click', function () {
            customStorage.set('fenShuXianCategory', 'gaoxiao');
        });

        var majorSlist = true;
        var majorSbigClassId = 1;
        var majorSsmallClassId = 50538;
        var majorSsmallClassName = '';

        var schoolLlist = true;
        var schoolLevelId = 1;
        var schoolLyear;
        var examineeLocationId = 1;

        var majorLlist = true;
        var majorLbigClassId = 1;
        var majorLsmallClassId = 50538;

        var areaLlist = true;
        var areaLcityId = 1;
        var liberalArtsId = 0;   // 1：文科 2：理科
        var areaLyear;

        // 选择快速搜索分类
        this.addEventAction('load', function (event, str) {
            switch (str) {
                case 'school-s-list':
                    // console.log(str);
                    break;
                case 'school-s-query':
                    // console.log(str);
                    window.location.href = 'schooldetails.html?ID=' + schoolId;
                    break;

                case 'major-s-list':
                    // console.log(str);
                    if (majorSlist) {
                        majorSlist = false;
                        loadMajorS();
                    }
                    break;
                case 'major-s-query':
                    // console.log(str);
                    customStorage.rm('xuanZhuanYeCategory');
                    window.location.href
                    = 'zhuanyedetails.html'
                    + '?name=' +  base64('encode', majorSsmallClassName)
                    + '&Id=' + majorSsmallClassId + '&category=details';
                    break;

                case 'school-l-list':
                    // console.log(str);
                    if (schoolLlist) {
                        schoolLlist = false;
                        loadSchoolL();
                    }
                    break;
                case 'school-l-query':
                    // console.log(str);
                    customStorage.set('fenShuXianCategory', 'gaoxiao');
                    window.location.href
                    = 'fenshuxian.html?category=gaoxiao&gaoXiaoCityId=' + examineeLocationId
                    + '&gaoXiaoLevelId=' + schoolLevelId + '&gaoXiaoYear=' + schoolLyear;
                    break;

                case 'major-l-list':
                    // console.log(str);
                    if (majorLlist) {
                        majorLlist = false;
                        loadMajorL();
                    }
                    break;
                case 'major-l-query':
                    // console.log(str);
                    customStorage.set('fenShuXianCategory', 'zhuanye');
                    window.location.href
                    = 'fenshuxian.html?category=zhuanye'
                    + '&zhuanYeBigClassId=' + majorLbigClassId
                    + '&zhuanYeSmallClassId=' + majorLsmallClassId;
                    break;

                case 'area-l-list':
                    // console.log(str);
                    if (areaLlist) {
                        areaLlist = false;
                        loadAreaL();
                    }
                    break;
                case 'area-l-query':
                    // console.log(str);
                    customStorage.set('fenShuXianCategory', 'diqu');
                    window.location.href
                    = 'fenshuxian.html?category=diqu'
                    + '&diQuCityId=' + areaLcityId + '&diQuLiberalArtsId=' + liberalArtsId
                    + '&diQuYear=' + areaLyear;
                    break;

                default:
                    break;
            }
        });

        loadSchoolS();
        function loadSchoolS() {
            // 城市/地区
            fetch('https://data.api.ppkao.com/Interface/YXK/PublicApi.ashx?action=GetProvinceList')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                var list = decode(json).pList;
                $element.find('.school-s-school-city').data('city-id', list[0].ID)
                .html(
                    list.map(function (item, index) {
                        return (
                            '<option value=\"' + item.ID + '\">' + item.ProvinceName + '</option>'
                        );
                    })
                );
                schoolScityId = $element.find('.school-s-school-city').data('city-id');
            });
            $element.find('.school-s-school-city').on('change', function () {
                schoolScityId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(schoolScityId);
                $element.find('.school-name').html('');
                loadSchoolName('https://data.api.ppkao.com/Interface/YXK/AcademyApi.ashx', {
                    action: 'GetAcademyList',
                    province: schoolScityId,
                    schooltype: typeId,
                    page: 1
                });
            });

            // 学校类型
            fetch('https://data.api.ppkao.com/Interface/YXK/PublicApi.ashx?action=GetCategoryList&typeID=2')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                var list = decode(json).pList;

                $element.find('.school-type').data('type-id', list[0].ID)
                .html(
                    list.map(function (item, index) {
                        return (
                            '<option value=\"' + item.ID + '\">' + item.Name + '</option>'
                        );
                    })
                );
                typeId = $element.find('.school-type').data('type-id');
            });
            $element.find('.school-type').on('change', function () {
                typeId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(typeId);
                $element.find('.school-name').html('');
                loadSchoolName('https://data.api.ppkao.com/Interface/YXK/AcademyApi.ashx', {
                    action: 'GetAcademyList',
                    province: schoolScityId,
                    schooltype: typeId,
                    page: 1
                });
            });

            // 学校名称
            loadSchoolName('https://data.api.ppkao.com/Interface/YXK/AcademyApi.ashx', {
                action: 'GetAcademyList',
                province: schoolScityId,
                schooltype: typeId,
                page: 1
            });

            var firstLoadName = true;
            function loadSchoolName(url, argu) {
                for (var key in argu) {
                    // console.log(key);
                    url = url + '&' + key + '=' + argu[key];
                }
                url = url.replace(/&/, '?');
                // console.log(url);

                fetch(url)
                .then(function (res) {
                    return res.json();
                }).then(function (json) {
                    var obj = decode(json);
                    // console.log(obj);

                    if (obj.S === '0') {
                        $element.find('.school-name').html('<option value="暂无数据">暂无数据</option>');
                        return;
                    }

                    if (firstLoadName) {
                        firstLoadName = false;
                        $element.find('.school-name').html('');
                    }

                    var currentPage = obj.CurrentPage;
                    var pageCount = obj.PageCount;

                    var list = obj.SchoolList;

                    $element.find('.school-name').data('school-id', list[0].ID)
                    .append(
                        list.map(function (item, index) {
                            return (
                                '<option value=\"' + item.ID + '\">' + item.schoolname + '</option>'
                            );
                        })
                    );

                    if (currentPage === '1') {
                        schoolId = $element.find('.school-name').data('school-id');
                    }

                    if (currentPage < pageCount) {
                        currentPage++;
                        loadSchoolName('https://data.api.ppkao.com/Interface/YXK/AcademyApi.ashx', {
                            action: 'GetAcademyList',
                            province: schoolScityId,
                            schooltype: typeId,
                            page: currentPage
                        });
                        // console.log(currentPage);
                    }
                });
            }
            $element.find('.school-name').on('change', function () {
                schoolId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(schoolId);
            });
        }
        function loadMajorS() {
            // 专业大类
            fetch('https://data.api.ppkao.com/Interface/YXK/SchoolSpecialtyApi.ashx?action=GetProfessionalMax')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                var list = decode(json).pList;

                $element.find('.major-s-big-class').data('big-class-id', list[0].ID)
                .html(
                    list.map(function (item, index) {
                        return (
                            '<option value=\"' + item.ID + '\">' + item.Name + '</option>'
                        );
                    })
                );
                majorSbigClassId = $element.find('.major-s-big-class').data('big-class-id');
                loadMajorSsmallClass();
            });
             // 专业小类
            function loadMajorSsmallClass() {
                fetch('https://data.api.ppkao.com/Interface/YXK/SchoolSpecialtyApi.ashx?action=GetProfessionalSmall&zytypeid=' +  majorSbigClassId)
                .then(function (res) {
                    return res.json();
                }).then(function (json) {
                    // console.log(decode(json));
                    var list = decode(json).pList;

                    $element.find('.major-s-small-class').data('small-class-id', list[0].ID)
                    .html(
                        list.map(function (item, index) {
                            return (
                                '<option value=\"' + item.ID + '\">' + item.specialname + '</option>'
                            );
                        })
                    );
                    majorSsmallClassId = $element.find('.major-s-small-class').data('small-class-id');
                    majorSsmallClassName
                    = $element.find('.major-s-small-class').find('option').eq(0).html();
                    // console.log(majorSsmallClassName);
                });
            }
            $element.find('.major-s-big-class').on('change', function () {
                majorSbigClassId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(majorSbigClassId);
                $element.find('.major-s-small-class').html('');

                loadMajorSsmallClass();
            });
            $element.find('.major-s-small-class').on('change', function () {
                majorSsmallClassId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                majorSsmallClassName = $(this).find('option').not(function () {
                    return !this.selected;
                }).html();
                // console.log(majorSsmallClassId, majorSsmallClassName);
            });
        }
        function loadSchoolL() {
            // 考生所在地
            fetch('https://data.api.ppkao.com/Interface/YXK/PublicApi.ashx?action=GetProvinceList')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                var list = decode(json).pList;

                $element.find('.examinee-location').data('examinee-location-id', list[0].ID)
                .html(
                    list.map(function (item, index) {
                        return (
                            '<option value=\"' + item.ID + '\">' + item.ProvinceName + '</option>'
                        );
                    })
                );
                examineeLocationId = $element.find('.examinee-location').data('examinee-location-id');
            });
            $element.find('.examinee-location').on('change', function () {
                examineeLocationId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(examineeLocationId);
            });
            // 院校层次
            fetch('https://data.api.ppkao.com/Interface/YXK/PublicApi.ashx?action=GetBatchList')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                var list = decode(json).pList;

                $element.find('.school-level').data('school-level-id', list[0].ID)
                .html(
                    list.map(function (item, index) {
                        return (
                            '<option value=\"' + item.ID + '\">' + item.Name + '</option>'
                        );
                    })
                );
                schoolLevelId = $element.find('.school-level').data('school-level-id');
            });
            $element.find('.school-level').on('change', function () {
                schoolLevelId = $(this).find('option').not(
                    function () {
                        return !this.selected;
                    }
                ).attr('value');
                // console.log(schoolLevelId);
            });
            // 录取年份
            schoolLyear = $element.find('.school-l-year').data('year');
            $element.find('.school-l-year').on('change', function () {
                schoolLyear = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(schoolLyear);
            });
        }
        function loadMajorL() {
            // 专业大类
            fetch('https://data.api.ppkao.com/Interface/YXK/SchoolSpecialtyApi.ashx?action=GetProfessionalMax')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json))
                var list = decode(json).pList;

                $element.find('.major-l-big-class').data('big-class-id', list[0].ID)
                .html(
                    list.map(function (item, index) {
                        return (
                            '<option value=\"' + item.ID + '\">' + item.Name + '</option>'
                        );
                    })
                );
                majorLbigClassId = $element.find('.major-l-big-class').data('big-class-id');

                loadMajorLsmallClass();
            });
            $element.find('.major-l-big-class').on('change', function () {
                majorLbigClassId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(majorLbigClassId);
                $element.find('.major-l-small-class').html('');

                loadMajorLsmallClass();
            });
            $element.find('.major-l-small-class').on('change', function () {
                majorLsmallClassId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(majorLsmallClassId);
            });
            // 专业小类
            function loadMajorLsmallClass() {
                fetch('https://data.api.ppkao.com/Interface/YXK/SchoolSpecialtyApi.ashx?action=GetProfessionalSmall&zytypeid='
                + majorLbigClassId)
                .then(function (res) {
                    return res.json();
                }).then(function (json) {
                    // console.log(decode(json))
                    var list = decode(json).pList;

                    $element.find('.major-l-small-class').data('small-class-id', list[0].ID)
                    .html(
                        list.map(function (item, index) {
                            return (
                                '<option value=\"' + item.ID + '\">' + item.specialname + '</option>'
                            );
                        })
                    );
                    majorLsmallClassId = $element.find('.major-l-small-class').data('small-class-id');
                });
            }
        }
        function loadAreaL() {
            // 城市/地区
            fetch('https://data.api.ppkao.com/Interface/YXK/PublicApi.ashx?action=GetProvinceList')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json))
                var list = decode(json).pList;
                $element.find('.area-l-school-city').data('city-id', list[0].ID)
                .html(
                    list.map(function (item, index) {
                        return (
                            '<option value=\"' + item.ID + '\">' + item.ProvinceName + '</option>'
                        );
                    })
                );
                areaLcityId = $element.find('.area-l-school-city').data('city-id');
            });
            $element.find('.area-l-school-city').on('change', function () {
                areaLcityId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(areaLcityId);
            });
            // 文理分科
            liberalArtsId = $element.find('.liberal-arts').data('liberal-arts-id');
            $element.find('.liberal-arts').on('change', function () {
                liberalArtsId = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(liberalArtsId);
            });
            // 录取年份
            areaLyear = $element.find('.area-l-year').data('year');
            $element.find('.area-l-year').on('change', function () {
                areaLyear = $(this).find('option').not(function () {
                    return !this.selected;
                }).attr('value');
                // console.log(areaLyear);
            });
        }


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
