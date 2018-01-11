/**
 * @file mip-yuanxiaoku-schooldetails 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var $element = $(element);
        var newDate = new Date();
        var currentYear = newDate.getFullYear() - 1;
        var yearArr = [];
        for (var i = 0; i < 15; i++) {
            yearArr.push(currentYear - i);
        }
        var schoolId = getRequest().ID;

        // 批次
        function loadPiCi(label, callBackSuccess) {
            fetch('https://data.api.ppkao.com/Interface/YXK/PublicApi.ashx?action=GetBatchList')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                var list = decode(json).pList;

                $element.find(label)
                .html(
                    list.map(function (item, index) {
                        return (
                            '<option value=\"' + item.ID + '\">' + item.Name + '</option>'
                        );
                    })
                );
                callBackSuccess(list[0].ID);
            });
        }
        // 文理分科
        function loadLiberalArts(label) {
            $element.find(label)
            .html(
                '<option value=\"0\">不限</option>'
                + '<option value=\"1\">文科</option>'
                + '<option value=\"2\">理科</option>'
            );
        }
        // 城市
        function loadCity(label, callBackSuccess) {
            fetch('https://data.api.ppkao.com/Interface/YXK/PublicApi.ashx?action=GetProvinceList')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                var list = decode(json).pList;
                $element.find(label)
                .html(
                    list.map(function (item, index) {
                        return (
                            '<option value=\"' + item.ID + '\">' + item.ProvinceName + '</option>'
                        );
                    })
                );
                callBackSuccess(list[0].ID);
            });
        }
        function loadYear(label) {
            $element.find(label)
            .append(
                yearArr.map(function (item, index) {
                    return (
                        '<option value=\"' + item + '\">' + item + '</option>'
                    );
                })
            );
        }
        // 选择select切换条件
        function loadSelectVal(label, callBackSuccess) {
            $element.find(label).on('change', function () {
                var optVal = $(this).find('option').not(
                    function () {
                        return !this.selected;
                    }
                ).attr('value');
                // console.log(optVal);
                callBackSuccess(optVal);
            });
        }

        // 学校概况
        loadSurvey();
        function loadSurvey() {
            $element.find('.survey .content .zanwu-shuju').hide();
            $element.find('.survey .basic-info .zanwu-shuju').hide();
            $element.find('.survey .load-info .loading').show();

            fetch('https://data.api.ppkao.com/Interface/YXK/AcademyApi.ashx?action=GetAcademyByID&Id=' + schoolId)
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json))
                if (decode(json).S === '0') {
                    $element.find('.survey .basic-info .zanwu-shuju').show();
                    $element.find('.survey .load-info .loading').hide();
                    return;
                }

                var list = decode(json).SchoolList;

                $element.find('.top-title h1').html(list[0].schoolname);

                $element.find('.survey .basic-info .basic-info-content').html(
                    list.map(function (item, index) {
                        return (
                            '<section>'
                            +    '<i>'
                            +        '<mip-img src=\"' + (item.Logo
                                        ? item.Logo
                                        : '../static/images/none.png') + '\"></mip-img>'
                            +    '</i>'
                            +    '<aside>'
                            +        '<h2>' + item.schoolname + '</h2>'
                            +        '<p>' + (item.f211 === '0' ? '' : '985高校、')
                            +            (item.f211 === '0' ? '' : '211高校、')
                            +            item.membership + '</p>'
                            +    '</aside>'
                            + '</section>'
                            + '<article>'
                            +    '<ul>'
                            +        '<li>所在地：<b>' + (item.province ? item.province : '--') + '</b></li>'
                            +        '<li>院士：<b>' + (item.Academician !== '0' ? item.Academician : '--')
                            +            (item.Academician !== '0' ? '个' : '') + '</b></li>'
                            +        '<li>硕士点：<b>' + (item.MasterPilot !== '0' ? item.MasterPilot : '--')
                            +            (item.MasterPilot !== '0' ? '个' : '') + '</b></li>'
                            +        '<li>博士点：<b>' + (item.DoctorStation !== '0' ? item.DoctorStation : '--')
                            +            (item.DoctorStation !== '0' ? '个' : '') + '</b></li>'
                            +        '<li style=\'width: 66.66%\'>类型：<b>' + (item.schoolnature
                                        ? item.schoolnature : '--') + '</b></li>'
                            +        '<li style=\'width: 100%\'>隶属于：<b>' + (item.membership
                                        ? item.membership : '--') + '</b></li>'
                            +        '<li style=\'width: 100%\'>国家重点学科：<b>'
                            +           (item.KeySubject !== '0' ? item.KeySubject : '--')
                            +           (item.KeySubject !== '0' ? '个' : '') + '</b></li>'
                            +    '</ul>'
                            + '</article>'
                        );
                    })
                );

                $element.find('.history-l .basic-info .basic-info-content').html(
                    list.map(function (item, index) {
                        return (
                            '<section>'
                            +    '<i>'
                            +        '<mip-img src=\"' + (item.Logo
                                        ? item.Logo : '../static/images/none.png') + '\"></mip-img>'
                            +    '</i>'
                            +    '<aside>'
                            +        '<h2>' + item.schoolname + '</h2>'
                            +        '<p>' + (item.f211 ? '985高校、' : '')
                                        + (item.f211 ? '211高校、' : '') + item.membership + '</p>'
                            +    '</aside>'
                            + '</section>'
                        );
                    })
                );

                $element.find('.survey .load-info .loading').hide();
            });

            fetch('https://data.api.ppkao.com//Interface/YXK/IntroduceApi.ashx?action=GetIntroduceList&SchoolID='
            + schoolId + '&CategoryID=1')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json))
                if (decode(json).S === '0') {
                    $element.find('.survey .content .zanwu-shuju').show();
                    $element.find('.survey .load-info .loading').hide();
                    return;
                }

                var list = decode(json).IntroduceList;

                $element.find('.survey .content .gaikuang').html(
                    list.map(function (item, index) {
                        return (
                            '<aside>'
                            +    '<h2>' + item.Title + '</h2>'
                            +    '<section>'
                            +        item.Introduce
                            +    '</section>'
                            + '</aside>'
                        );
                    })
                );

                $element.find('.survey .load-info .loading').hide();
            });
        }

        // 招生专业
        var majorRyear;
        var majorRliberalArtsId = '0';
        var majorRcityId;
        function loadMajorR() {
            $element.find('.major-r .zanwu-shuju').hide();
            $element.find('.major-r .load-info .loading').show();

            majorRyear = $element.find('.major-r-year').data('year');

            loadYear('.major-r-year');
            loadLiberalArts('.major-r-liberal-arts');
            loadCity('.major-r-city', function (optVal) {
                majorRcityId = optVal;
            });

            loadSelectVal('.major-r-year', function (optVal) {
                majorRyear = optVal;
            });
            loadSelectVal('.major-r-liberal-arts', function (optVal) {
                majorRliberalArtsId = optVal;
            });
            loadSelectVal('.major-r-city', function (optVal) {
                majorRcityId = optVal;
            });

            var whileMajorR = setInterval(function () {
                if (majorRyear && majorRliberalArtsId && majorRcityId) {
                    majorR();

                    clearInterval(whileMajorR);
                    // console.log('招生专业');
                }
            }, 300);
        }
        function majorR() {
            $element.find('.major-r .zanwu-shuju').hide();
            $element.find('.major-r .load-info .loading').show();
            $element.find('.major-r .container .search-result > h2').html('');
            $element.find('.major-r .container .search-result ul').html('');

            fetch('https://data.api.ppkao.com/Interface/YXK/AcademyMajorApi.ashx?action=GetAcademyMajorList&SchoolID=' + schoolId + '&AreaID=' + majorRcityId + '&Year=' + majorRyear + (majorRliberalArtsId === '0' ? '' : '&wl=' + majorRliberalArtsId))
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));

                if (decode(json).S === '0') {
                    $element.find('.major-r .zanwu-shuju').show();
                    $element.find('.major-r .load-info .loading').hide();
                    return;
                }

                var list = decode(json).MajorList;

                $element.find('.major-r .container .search-result > h2').html(
                    list[0].schoolname + '【' + list[0].year + '】年在【' + list[0].ProvinceName + '】地区'
                    + (majorRliberalArtsId === '1' ? '【文科】' : '')
                    + (majorRliberalArtsId === '2' ? '【理科】' : '') + '录取专业'
                );
                $element.find('.major-r .container .search-result ul').html(
                    list.map((item, index) => {
                        return (
                            '<li data-zhuanye-id=\"' + item.zid + '\">'
                            +    '<span>' + item.specialname + '</span>'
                            +    '<b>查看详情</b>'
                            + '</li>'
                        );
                    })
                );

                $element.find('.major-r .load-info .loading').hide();
            });
        }
        $element.find('.major-r .container .search-result').on('click', 'ul li', function () {
            $element.find('.major-r-zhuanye-details').addClass('active');
            $element.find('.major-r-zhuanye-details .load-info .loading').show();
            $element.find('.major-r-zhuanye-details .zanwu-shuju').hide();
            $element.find('.major-r-zhuanye-details .container >article').html('');
            $element.find('.major-r-zhuanye-details .title h2').html('专业介绍');

            var zhuanYeId = $(this).data('zhuanye-id');
            majorRdetails(zhuanYeId);
        });
        $element.find('.major-r-zhuanye-details').on('click', '.title .quxiao', function () {
            $element.find('.major-r-zhuanye-details').removeClass('active');
        });
        function majorRdetails(Id) {
            fetch('https://data.api.ppkao.com/Interface/YXK/SchoolSpecialtyApi.ashx?action=GetSpecialtyIntro&schoolid='
            + schoolId + '&zid=' + Id)
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                if (decode(json).S === '0') {
                    $element.find('.major-r-zhuanye-details .load-info .loading').hide();
                    $element.find('.major-r-zhuanye-details .zanwu-shuju').show();
                    return;
                }

                var list = decode(json).pList;

                $element.find('.major-r-zhuanye-details .title h2').html(`专业介绍-${list[0].name}`);
                $element.find('.major-r-zhuanye-details .container >article').html(
                    list.map(function (item, index) {
                        return (
                            item.intro
                        );
                    })
                );

                $element.find('.major-r-zhuanye-details .load-info .loading').hide();
            });
        }

        // 专业分数线
        var majorLyear;
        var majorLliberalArtsId = '0';
        var majorLcityId;
        function loadMajorL() {
            $element.find('.major-l .zanwu-shuju').hide();
            $element.find('.major-l .load-info .loading').show();

            majorLyear = $element.find('.major-l-year').data('year');
            // console.log(majorLyear);

            loadYear('.major-l-year');
            loadLiberalArts('.major-l-liberal-arts');
            loadCity('.major-l-city', function (optVal) {
                majorLcityId = optVal;
            });

            loadSelectVal('.major-l-year', function (optVal) {
                majorLyear = optVal;
            });
            loadSelectVal('.major-l-liberal-arts', function (optVal) {
                majorLliberalArtsId = optVal;
            });
            loadSelectVal('.major-l-city', function (optVal) {
                majorLcityId = optVal;
            });

            var whilemajorL = setInterval(function () {
                if (majorLyear && majorLliberalArtsId && majorLcityId) {
                    majorL();

                    clearInterval(whilemajorL);
                    // console.log('专业分数线')
                }
            }, 300);
        }
        var majorLpage = 1;
        var majorLcurrentPage = 1;
        var majorLpageCount = 1;

        var loadMajorLinfo = true;
        function majorL() {
            $element.find('.major-l .zanwu-shuju').hide();
            $element.find('.major-l .load-info .loading').show();
            $element.find('.major-l .container .search-result > h2').html('');
            $element.find('.major-l .container .search-result ul').html('');

            majorLscroll();
        }
        function majorLscroll() {
            $element.find('.major-l .load-info .loading').show();
            $element.find('.major-l .load-info .none').hide();
            $element.find('.major-l .zanwu-shuju').hide();

            fetch('https://data.api.ppkao.com/Interface/YXK/AcademyMajorApi.ashx?action=GetSchoolMajorLine&SchoolID='
            + schoolId + '&province=' + majorLcityId + '&Year=' + majorLyear
            + (majorLliberalArtsId === '0' ? '' : '&wl=' + majorLliberalArtsId) + '&page=' + majorLpage)
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json))
                var list = decode(json);

                if (list.S === '0') {
                    $element.find('.major-l .zanwu-shuju').show();
                    $element.find('.major-l .load-info .loading').hide();
                    return;
                }

                var schoolList = list.sList;

                majorLcurrentPage = parseInt(list.CurrentPage, 10);
                majorLpageCount = parseInt(list.PageCount, 10);
                // console.log(majorLcurrentPage, majorLpageCount)

                $element.find('.major-l .container .search-result > h2').html(
                    schoolList[0].schoolName + '【' + schoolList[0].year + '】'
                    + '年在【' + schoolList[0].province + '】地区'
                    + (majorLliberalArtsId === '1' ? '【文科】' : '')
                    + (majorLliberalArtsId === '2' ? '【理科】' : '') + '专业分数线'
                );
                $element.find('.major-l .container .search-result ul').append(
                    schoolList.map(function (item, index) {
                        return (
                            '<li data-zhuanye-id=\"${item.zid}\">'
                            +    '<h2>'
                            +        '<span>' + item.specialname + '</span>'
                            +        '<b class=\"check\"></b>'
                            +    '</h2>'
                            +    '<div class=\"details\">'
                            +        '<span>'
                            +            '<b class=\"dalei\">'
                            +                '专业大类：'
                            +                '<i>'
                            +                   '<mip-img src=\"http://static.ppkao.com/phone/new/image/sx.gif\"</mip-img>'
                            +                '</i>'
                            +            '</b>'
                            +            '<b>专业小类：<i>' + item.sname + '</i></b>'
                            +        '</span>'
                            +        '<span>'
                            +            '<b>最高分：<i>' + (item.maxfs === '0' ? '--' : item.maxf) + '</i></b>'
                            +            '<b>平均分：<i>' + (item.varfs === '0' ? '--' : item.varfs) + '</i></b>'
                            +            '<b>最低分：<i>' + (item.minfs === '0' ? '--' : item.minfs) + '</i></b>'
                            +        '</span>'
                            +        '<span>'
                            +            '<b>批次：<i>' + item.pc + '</i></b>'
                            +            '<b>文理：<i>' + item.stype + '</i></b>'
                            +            '<b>年份：<i>' + item.year + '</i></b>'
                            +        '</span>'
                            +    '</div>'
                            + '</li>'
                        );
                    })
                );

                $element.find('.major-l .load-info .loading').hide();

                if (majorLcurrentPage === majorLpageCount) {
                    $element.find('.major-l .load-info .none').show();
                    return;
                }

                loadMajorLinfo = true;
            });
        }
        $element.find('.major-l').on('scroll', function () {
            var height = $(this).height();
            var scrTop = $(this).scrollTop();
            var scrHeight = $(this)[0].scrollHeight;
            if (height >= scrHeight - scrTop - 100) {
                if (majorLcurrentPage < majorLpageCount && loadMajorLinfo) {
                    loadMajorLinfo = false;
                    majorLpage++;
                    majorLscroll();
                }
            }
        });
        $element.find('.major-l').on('click', '.search-result h2', function () {
            var thIs = $(this);

            thIs.find('.check').toggleClass('active');
            thIs.parents('li').find('.details').toggle();

            var zhuanyeId = thIs.parents('li').data('zhuanye-id');

            fetch('https://data.api.ppkao.com/Interface/YXK/SchoolSpecialtyApi.ashx?action=SelectProfessionalByid&zid=' + zhuanyeId)
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json))

                if (decode(json).S === '0') {
                    thIs.parents('li').find('.details .dalei i').html(
                        '--'
                    );
                    return;
                }

                var list = decode(json).pList;

                thIs.parents('li').find('.details .dalei i').html(
                    (list[0].zytype ? list[0].zytype : '--')
                );
            });
        });


        // 历史分数线
        var historyLcityId;
        var historyLpiCiId;
        var historyLliberalArtsId = '0';

        var historyLyear = yearArr[0];
        function loadHistoryL() {
            $element.find('.history-l .zanwu-shuju').hide();
            $element.find('.history-l .load-info .loading').show();

            loadCity('.history-l-city', function (optVal) {
                historyLcityId = optVal;
            });
            loadPiCi('.history-l-pici', function (optVal) {
                historyLpiCiId = optVal;
            });
            loadLiberalArts('.history-l-liberal-arts');

            loadSelectVal('.history-l-city', function (optVal) {
                historyLcityId = optVal;
            });
            loadSelectVal('.history-l-pici', function (optVal) {
                historyLpiCiId = optVal;
            });
            loadSelectVal('.history-l-liberal-arts', function (optVal) {
                historyLliberalArtsId = optVal;
            });

            var whileHistoryL = setInterval(function () {
                if (historyLcityId && historyLpiCiId && historyLliberalArtsId && historyLyear && yearArr) {
                    historyL(historyLyear);
                    historyLtotal();
                    clearInterval(whileHistoryL);
                    // console.log('历史分数线');
                }
            }, 300);
        }
        function historyL(year) {
            $element.find('.history-l .container .search-result article').html('');
            $element.find('.history-l .zanwu-shuju').hide();
            $element.find('.history-l .load-info .none').hide();
            $element.find('.history-l .load-info .loading').show();

            fetch('https://data.api.ppkao.com/Interface/YXK/FractionalLineApi.ashx?action=GetFractionalLine&schoolid='
            + schoolId + '&provinceid=' + historyLcityId
            + (historyLliberalArtsId === '0' ? '' : '&wlid=' + historyLliberalArtsId)
            + '&batchid=' + historyLpiCiId + '&year=' + year)
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));

                if (decode(json).S === '0') {
                    $element.find('.history-l .zanwu-shuju').show();
                    $element.find('.history-l .load-info .loading').hide();
                    return;
                }

                var list = decode(json).LineList;

                $element.find('.history-l .container .search-result article').html(
                    list.map(function (item, index) {
                        return (
                            '<aside>'
                            +    '<span>'
                            +        '最高分：<i>' + (item.max === '0' ? '--' : item.max) + '</i>'
                            +    '</span>'
                            +    '<span>'
                            +        '平均分：<i>' + (item.var === '0' ? '--' : item.var) + '</i>'
                            +    '</span>'
                            +    '<span>'
                            +        '最低分：<i>' + (item.min === '0' ? '--' : item.min) + '</i>'
                            +    '</span>'
                            +    '<span>'
                            +        '录取人数：<i>' + (item.num === '0' ? '--' : item.num) + '</i>'
                            +    '</span>'
                            +    '<span> '
                            +        '批次：<i>' + item.batch + '</i>'
                            +    '</span>'
                            +    '<span>'
                            +        '文理：<i>' + item.studenttype + '</i>'
                            +    '</span>'
                            + '</aside>'
                        );
                    })
                );

                $element.find('.history-l .load-info .loading').hide();
            });
        }
        var historyLpage = 1;
        var historyLcurrentPage = 1;
        var historyLpageCount = 1;
        function historyLtotal() {
            $element.find('.history-l .canvasWrapper').show();
            $element.find('.lineChartCanvas-li').html('');
            $element.find('.lineChartCanvas-wen').html('');

            fetch('https://data.api.ppkao.com/Interface/YXK/FractionalLineApi.ashx?action=GetFractionalLine&schoolid='
            + schoolId + '&provinceid=' + historyLcityId + '&batchid=' + historyLpiCiId)
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));

                if (decode(json).S === '0') {
                    $element.find('.history-l .zanwu-shuju').show();
                    $element.find('.history-l .load-info .loading').hide();
                    $element.find('.history-l .canvasWrapper').hide();
                    return;
                }

                var list = decode(json).LineList;
                // console.table(list);

                var showYearCount = 8;

                var highestScoreLi = new Array(showYearCount);
                var averageScoreLi = new Array(showYearCount);
                var minimumScoreLi = new Array(showYearCount);

                var highestScoreWen = new Array(showYearCount);
                var averageScoreWen = new Array(showYearCount);
                var minimumScoreWen = new Array(showYearCount);

                var showYearArr = yearArr.slice(0, showYearCount);

                list.map(function (item, index) {
                    var inDex = yearArr.indexOf(parseInt(item.year, 10));
                    // console.log(index);
                    if (item.studenttype === '理科') {
                        item.max !== '0'
                        ? highestScoreLi.splice(inDex, 1, item.max) : highestScoreLi.splice(inDex, 1, '');
                        item.var !== '0'
                        ? averageScoreLi.splice(inDex, 1, item.var) : averageScoreLi.splice(inDex, 1, '');
                        item.min !== '0'
                        ? minimumScoreLi.splice(inDex, 1, item.min) : minimumScoreLi.splice(inDex, 1, '');
                    }
                    if (item.studenttype === '文科') {
                        item.max !== '0'
                        ? highestScoreWen.splice(inDex, 1, item.max) : highestScoreWen.splice(inDex, 1, '');
                        item.var !== '0'
                        ? averageScoreWen.splice(inDex, 1, item.var) : averageScoreWen.splice(inDex, 1, '');
                        item.min !== '0'
                        ? minimumScoreWen.splice(inDex, 1, item.min) : minimumScoreWen.splice(inDex, 1, '');
                    }
                });
                // console.log('理科');
                // console.log(highestScoreLi, averageScoreLi, minimumScoreLi);
                // console.log('文科');
                // console.log(highestScoreWen, averageScoreWen, minimumScoreWen);

                var lineChartDataLi = {
                    labels: showYearArr,
                    datasets: [
                        {
                            fillColor: 'rgba(86, 136, 193, 0.5)',
                            strokeColor: 'rgba(86, 136, 193, 0.5)',
                            pointColor: 'rgba(86, 136, 193, 0.8)',
                            pointStrokeColor: 'rgba(255, 255, 255, 0.8)',
                            data: highestScoreLi
                        },
                        {
                            fillColor: 'rgba(202, 122, 163, 0.5)',
                            strokeColor: 'rgba(202, 122, 163, 0.5)',
                            pointColor: 'rgba(202, 122, 163, 0.8)',
                            pointStrokeColor: 'rgba(255, 255, 255, 0.8)',
                            data: averageScoreLi
                        },
                        {
                            fillColor: 'rgba(175, 159, 202, 0.5)',
                            strokeColor: 'rgba(175, 159, 202, 0.5)',
                            pointColor: 'rgba(175, 159, 202, 0.8)',
                            pointStrokeColor: 'rgba(255, 255, 255, 0.8)',
                            data: minimumScoreLi
                        }
                    ]
                };

                var lineChartDataWen = {
                    labels: showYearArr,
                    datasets: [
                        {
                            fillColor: 'rgba(86, 136, 193, 0.8)',
                            strokeColor: 'rgba(86, 136, 193, 0.5)',
                            pointColor: 'rgba(86, 136, 193, 0.5)',
                            pointStrokeColor: '#fff',
                            data: highestScoreLi
                        },
                        {
                            fillColor: 'rgba(202, 122, 163, 0.8)',
                            strokeColor: 'rgba(202, 122, 163, 0.5)',
                            pointColor: 'rgba(202, 122, 163, 0.5)',
                            pointStrokeColor: '#fff',
                            data: averageScoreLi
                        },
                        {
                            fillColor: 'rgba(175, 159, 202, 0.8)',
                            strokeColor: 'rgba(175, 159, 202, 0.5)',
                            pointColor: 'rgba(175, 159, 202, 0.5)',
                            pointStrokeColor: '#fff',
                            data: minimumScoreLi
                        }
                    ]
                };

                var options = {
                    scaleOverlay: false,
                    scaleOverride: true,
                    scaleSteps: 10,
                    scaleStepWidth: 50,
                    scaleStartValue: 250,
                    scaleLineColor: 'rgba(242,242,242,1)',
                    scaleLineWidth: 1,
                    scaleShowLabels: true,
                    scaleLabel: '<%= value %>',
                    scaleFontFamily: 'microsoft yahei',
                    scaleFontSize: 12,
                    scaleFontStyle: 'normal',
                    scaleFontColor: '#a5a5a5',
                    scaleShowGridLines: true,
                    scaleGridLineColor: 'rgba(242,242,242,1)',
                    scaleGridLineWidth: 1,
                    bezierCurve: true,
                    pointDot: true,
                    pointDotRadius: 3, // 内圈圆的半径
                    pointDotStrokeWidth: 1, // 外圈圆的半径
                    datasetStroke: true,
                    datasetStrokeWidth: 2,
                    datasetFill: true,
                    animation: true,
                    animationSteps: 100,
                    animationEasing: 'easeOutQuart',
                    onAnimationComplete: null
                };

                $element.find('.lineChartCanvas-box h2.like, .lineChartCanvas-box h2.wenke').hide();
                if (historyLliberalArtsId === '0' || historyLliberalArtsId === '2') {
                    $element.find('.lineChartCanvas-box h2.like').show();
                    $element.find('.lineChartCanvas-li').html('<canvas id="lineChartCanvasLi"></canvas>');
                    var lineChartLi = $element.find('#lineChartCanvasLi').get(0).getContext('2d');
                    lineChartFun(lineChartDataLi, options, lineChartLi);
                }
                if (historyLliberalArtsId === '0' || historyLliberalArtsId === '1') {
                    $element.find('.lineChartCanvas-box h2.wenke').show();
                    $element.find('.lineChartCanvas-wen').html('<canvas id="lineChartCanvasWen"></canvas>');
                    var lineChartWen = $element.find('#lineChartCanvasWen').get(0).getContext('2d');
                    lineChartFun(lineChartDataWen, options, lineChartWen);
                }
            });
        }

        // 招生信息
        function loadInformationR() {
            $element.find('.information-r .zanwu-shuju').hide();
            $element.find('.information-r .load-info .loading').show();

            fetch('https://data.api.ppkao.com//Interface/YXK/IntroduceApi.ashx?action=GetIntroduceList&SchoolID='
            + schoolId + '&CategoryID=2')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                if (decode(json).S === '0') {
                    $element.find('.information-r .zanwu-shuju').show();
                    $element.find('.information-r .load-info .loading').hide();
                    return;
                }

                var list = decode(json).IntroduceList;

                $element.find('.information-r article').html(
                    list.map(function (item, index) {
                        return (
                            '<aside>'
                            +    '<h2>' + item.Title + '</h2>'
                            +    '<section>'
                            +        item.Introduce
                            +    '</section>'
                            + '</aside>'
                        );
                    })
                );

                $element.find('.information-r .load-info .loading').hide();
            });
        }

        // 报考指南
        function loadGuide() {
            $element.find('.guide .zanwu-shuju').hide();
            $element.find('.guide .load-info .loading').show();

            fetch('https://data.api.ppkao.com//Interface/YXK/IntroduceApi.ashx?action=GetIntroduceList&SchoolID='
            + schoolId + '&CategoryID=3')
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json))
                if (decode(json).S === '0') {
                    $element.find('.guide .zanwu-shuju').show();
                    $element.find('.guide .load-info .loading').hide();
                    return;
                }

                var list = decode(json).IntroduceList;

                $element.find('.guide article').html(
                    list.map(function (item, index) {
                        return (
                            '<aside>'
                            +    '<h2>' + item.Title + '</h2>'
                            +    '<section>'
                            +        item.Introduce
                            +    '</section>'
                            + '</aside>'
                        );
                    })
                );

                $element.find('.guide .load-info .loading').hide();
            });
        }

        var majorRinfo = true;
        var majorLinfo = true;
        var historyLinfo = true;
        var informationRinfo = true;
        var guideInfo = true;
        // 选择导航栏
        this.addEventAction('load', function (event, str) {
            switch (str) {
                case 'survey':
                    // console.log(str);
                    break;

                case 'major-r':
                    // console.log(str);
                    if (majorRinfo) {
                        majorRinfo = false;
                        loadMajorR();
                    }
                    break;
                case 'major-r-query':
                    // console.log(str);
                    majorR();
                    break;

                case 'major-l':
                    // console.log(str);
                    if (majorLinfo) {
                        majorLinfo = false;
                        loadMajorL();
                    }
                    break;
                case 'major-l-query':
                    // console.log(str);
                    majorL();
                    break;

                case 'history-l':
                    // console.log(str);
                    if (historyLinfo) {
                        historyLinfo = false;
                        loadHistoryL();
                    }
                    break;
                case 'history-l-query':
                    // console.log(str);
                    historyL(historyLyear);
                    historyLtotal();
                    break;

                case 'information-r':
                    // console.log(str);
                    if (informationRinfo) {
                        informationRinfo = false;
                        loadInformationR();
                    }
                    break;

                case 'guide':
                    // console.log(str);
                    if (guideInfo) {
                        guideInfo = false;
                        loadGuide();
                    }
                    break;

                case yearArr[0]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[1]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[2]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[3]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[4]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[5]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[6]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[7]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[8]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[9]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[10]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[11]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[12]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[13]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                case yearArr[14]:
                    // console.log(str);
                    historyLyear = str;
                    historyL(str);
                    break;
                default:
                    break;
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
        function lineChartFun(data, config, ctx) {
            var width = (
                window.outerWidth
                || document.documentElement.offsetWidth
                || document.body.offsetWidth
            ) * 1.002;
            var height = width / 2;
            // console.log(width, height);
            if (window.devicePixelRatio) {
                ctx.canvas.style.width = width + 'px';
                ctx.canvas.style.height = height + 'px';
                ctx.canvas.height = height * window.devicePixelRatio;
                ctx.canvas.width = width * window.devicePixelRatio;
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            }

            function easeOutQuart(t) {
                return -1 * ((t = t / 1 - 1) * t * t * t - 1);
            }
            var maxSize;
            var scaleHop;
            var calculatedScale;
            var labelHeight;
            var scaleHeight;
            var valueBounds;
            var labelTemplateString;
            var valueHop;
            var widestXLabel;
            var xAxisLength;
            var yAxisPosX;
            var xAxisPosY;
            var rotateLabels = 0;
            line();
            function line() {
                calculateDrawingSizes();
                valueBounds = getValueBounds();
                labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : '';
                if (!config.scaleOverride) {
                    calculatedScale = calculateScale(
                        scaleHeight,
                        valueBounds.maxSteps,
                        valueBounds.minSteps,
                        valueBounds.maxValue,
                        valueBounds.minValue,
                        labelTemplateString
                    );
                } else {
                    calculatedScale = {
                        steps: config.scaleSteps,
                        stepValue: config.scaleStepWidth,
                        graphMin: config.scaleStartValue,
                        labels: []
                    };
                    for (var i = 0; i < calculatedScale.steps; i++) {
                        if (labelTemplateString) {
                            calculatedScale.labels.push(
                                tmpl(
                                    labelTemplateString,
                                    {
                                        value: (config.scaleStartValue
                                            + config.scaleStepWidth
                                            + (config.scaleStepWidth * i))
                                            .toFixed(getDecimalPlaces(config.scaleStepWidth))
                                    }
                                )
                            );
                        }
                    }
                }
                scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
                calculateXAxisSize();
                animationLoop(config, drawScale, drawLines, ctx);
            }
            function drawLines(animPc) {
                for (var i = 0; i < data.datasets.length; i++) {
                    ctx.strokeStyle = data.datasets[i].strokeColor;
                    ctx.lineWidth = config.datasetStrokeWidth;
                    ctx.beginPath();
                    ctx.moveTo(
                        yAxisPosX,
                        xAxisPosY - animPc
                        * (calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop))
                    );
                    for (var j = 1; j < data.datasets[i].data.length; j++) {
                        if (config.bezierCurve) {
                            ctx.bezierCurveTo(
                                xPos(j - 1),
                                yPos(i, j - 1),
                                xPos(j - 0.5),
                                yPos(i, j),
                                xPos(j),
                                yPos(i, j)
                            );
                        } else {
                            ctx.lineTo(xPos(j), yPos(i, j));
                        }
                    }
                    ctx.stroke();
                    if (config.datasetFill) {
                        ctx.lineTo(yAxisPosX + (valueHop * (data.datasets[i].data.length - 1)), xAxisPosY);
                        ctx.lineTo(yAxisPosX, xAxisPosY);
                        ctx.closePath();
                        ctx.fillStyle = data.datasets[i].fillColor;
                        ctx.fill();
                    } else {
                        ctx.closePath();
                    }
                    if (config.pointDot) {
                        ctx.fillStyle = data.datasets[i].pointColor;
                        ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                        ctx.lineWidth = config.pointDotStrokeWidth;
                        for (var k = 0; k < data.datasets[i].data.length; k++) {
                            ctx.beginPath();
                            ctx.arc(
                                yAxisPosX + (valueHop * k),
                                xAxisPosY - animPc
                                * (calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop)),
                                config.pointDotRadius,
                                0, Math.PI * 2, true
                            );
                            ctx.fill();
                            ctx.stroke();
                        }
                    }
                }
                function yPos(dataSet, iteration) {
                    return (
                        xAxisPosY - animPc
                        * (calculateOffset(data.datasets[dataSet].data[iteration], calculatedScale, scaleHop))
                    );
                }
                function xPos(iteration) {
                    return yAxisPosX + (valueHop * iteration);
                }
            }
            function drawScale() {
                ctx.lineWidth = config.scaleLineWidth;
                ctx.strokeStyle = config.scaleLineColor;
                ctx.beginPath();
                ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
                ctx.lineTo(width - (widestXLabel / 2) - xAxisLength - 5, xAxisPosY);
                ctx.stroke();
                if (rotateLabels > 0) {
                    ctx.save();
                    ctx.textAlign = 'right';
                } else {
                    ctx.textAlign = 'center';
                }
                ctx.fillStyle = config.scaleFontColor;
                for (var i = 0; i < data.labels.length; i++) {
                    ctx.save();
                    if (rotateLabels > 0) {
                        ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
                        ctx.rotate(-(rotateLabels * (Math.PI / 180)));
                        ctx.fillText(data.labels[i], 0, 0);
                        ctx.restore();
                    } else {
                        ctx.fillText(
                            data.labels[i],
                            yAxisPosX + i * valueHop,
                            xAxisPosY + config.scaleFontSize + 3
                        );
                    }
                    ctx.beginPath();
                    ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
                    if (config.scaleShowGridLines && i > 0) {
                        ctx.lineWidth = config.scaleGridLineWidth;
                        ctx.strokeStyle = config.scaleGridLineColor;
                        ctx.lineTo(yAxisPosX + i * valueHop, 5);
                    } else {
                        ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
                    }
                    ctx.stroke();
                }
                // Y axis
                ctx.lineWidth = config.scaleLineWidth;
                ctx.strokeStyle = config.scaleLineColor;
                ctx.beginPath();
                ctx.moveTo(yAxisPosX, xAxisPosY + 5);
                ctx.lineTo(yAxisPosX, 5);
                ctx.stroke();
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                for (var j = 0; j < calculatedScale.steps; j++) {
                    ctx.beginPath();
                    ctx.moveTo(yAxisPosX - 3, xAxisPosY - ((j + 1) * scaleHop));
                    if (config.scaleShowGridLines) {
                        ctx.lineWidth = config.scaleGridLineWidth;
                        ctx.strokeStyle = config.scaleGridLineColor;
                        ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - ((j + 1) * scaleHop));
                    } else {
                        ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - ((j + 1) * scaleHop));
                    }
                    ctx.stroke();
                    if (config.scaleShowLabels) {
                        ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - ((j + 1) * scaleHop));
                    }
                }
            }
            function calculateXAxisSize() {
                var longestText = 1;
                // if we are showing the labels
                if (config.scaleShowLabels) {
                    ctx.font = config.scaleFontStyle + ' ' + config.scaleFontSize + 'px ' + config.scaleFontFamily;
                    for (var i = 0; i < calculatedScale.labels.length; i++) {
                        var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
                        longestText = (measuredText > longestText) ? measuredText : longestText;
                    }
                    // Add a little extra padding from the y axis
                    longestText += 10;
                }
                xAxisLength = width - longestText - widestXLabel;
                valueHop = Math.floor(xAxisLength / (data.labels.length - 1));
                yAxisPosX = width - widestXLabel / 2 - xAxisLength;
                xAxisPosY = scaleHeight + config.scaleFontSize / 2;
            }
            function calculateDrawingSizes() {
                maxSize = height;
                // Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
                ctx.font = config.scaleFontStyle + ' '
                    + config.scaleFontSize + 'px ' + config.scaleFontFamily;
                widestXLabel = 1;
                for (var i = 0; i < data.labels.length; i++) {
                    var textLength = ctx.measureText(data.labels[i]).width;
                    // If the text length is longer - make that equal to longest text!
                    widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel;
                }
                if (width / data.labels.length < widestXLabel) {
                    rotateLabels = 45;
                    if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
                        rotateLabels = 90;
                        maxSize -= widestXLabel;
                    } else {
                        maxSize -= Math.sin(rotateLabels) * widestXLabel;
                    }
                } else {
                    maxSize -= config.scaleFontSize;
                }
                maxSize -= 5;
                labelHeight = config.scaleFontSize;
                maxSize -= labelHeight;
                scaleHeight = maxSize;
            }
            function getValueBounds() {
                var upperValue = Number.MIN_VALUE;
                var lowerValue = Number.MAX_VALUE;
                for (var i = 0; i < data.datasets.length; i++) {
                    for (var j = 0; j < data.datasets[i].data.length; j++) {
                        if (data.datasets[i].data[j] > upperValue) {
                            upperValue = data.datasets[i].data[j];
                        }
                        if (data.datasets[i].data[j] < lowerValue) {
                            lowerValue = data.datasets[i].data[j];
                        }
                    }
                };
                var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
                var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));
                return {
                    maxValue: upperValue,
                    minValue: lowerValue,
                    maxSteps: maxSteps,
                    minSteps: minSteps
                };
            }
            function clear(c) {
                c.clearRect(0, 0, width, height);
            }
            function mergeChartConfig(defaults, userDefined) {
                var returnObj = {};
                for (var attrname in defaults) {
                    returnObj[attrname] = defaults[attrname];
                }
                for (var attrname in userDefined) {
                    returnObj[attrname] = userDefined[attrname];
                }
                return returnObj;
            }
            function calculateOffset(val, calculatedScale, scaleHop) {
                var outerValue = calculatedScale.steps * calculatedScale.stepValue;
                var adjustedValue = val - calculatedScale.graphMin;
                var scalingFactor = capValue(adjustedValue / outerValue, 1, 0);
                return (scaleHop * calculatedScale.steps) * scalingFactor;
            }
            function animationLoop(config, drawScale, drawData, ctx) {
                var animFrameAmount = (config.animation) ? 1 / capValue(config.animationSteps, Number.MAX_VALUE, 1) : 1;
                var easingFunction = easeOutQuart;
                var percentAnimComplete = (config.animation) ? 0 : 1;
                var requestAnimFrame = (function () {
                    return window.requestAnimationFrame
                        || window.webkitRequestAnimationFrame
                        || window.mozRequestAnimationFrame
                        || window.oRequestAnimationFrame
                        || window.msRequestAnimationFrame
                        || function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
                })();
                if (typeof drawScale !== 'function') {
                    drawScale = function () {};
                }
                requestAnimFrame(animLoop);
                function animateFrame() {
                    var easeAdjustedAnimationPercent = (config.animation)
                        ? capValue(easingFunction(percentAnimComplete), null, 0)
                        : 1;
                    clear(ctx);
                    if (config.scaleOverlay) {
                        drawData(easeAdjustedAnimationPercent);
                        drawScale();
                    } else {
                        drawScale();
                        drawData(easeAdjustedAnimationPercent);
                    }
                }
                function animLoop() {
                    // We need to check if the animation is incomplete (less than 1), or complete (1).
                    percentAnimComplete += animFrameAmount;
                    animateFrame();
                    // Stop the loop continuing forever
                    if (percentAnimComplete <= 1) {
                        requestAnimFrame(animLoop);
                    } else {
                        if (typeof config.onAnimationComplete === 'function') {
                            config.onAnimationComplete();
                        }
                    }
                }
            }
            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
            function capValue(valueToCap, maxValue, minValue) {
                if (isNumber(maxValue)) {
                    if (valueToCap > maxValue) {
                        return maxValue;
                    }
                }
                if (isNumber(minValue)) {
                    if (valueToCap < minValue) {
                        return minValue;
                    }
                }
                return valueToCap;
            }
            function getDecimalPlaces(num) {
                var numberOfDecimalPlaces;
                if (num % 1 !== 0) {
                    return num.toString().split('.')[1].length;
                } else {
                    return 0;
                }
            }
            function calculateScale(drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
                var graphMin;
                var graphMax;
                var graphRange;
                var stepValue;
                var numberOfSteps;
                var valueRange;
                var rangeOrderOfMagnitude;
                var decimalNum;
                valueRange = maxValue - minValue;
                rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);
                graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude)))
                    * Math.pow(10, rangeOrderOfMagnitude);
                graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude)))
                    * Math.pow(10, rangeOrderOfMagnitude);
                graphRange = graphMax - graphMin;
                stepValue = Math.pow(10, rangeOrderOfMagnitude);
                numberOfSteps = Math.round(graphRange / stepValue);
                // Compare number of steps to the max and min for that size graph, and add in half steps if need be.
                while (numberOfSteps < minSteps || numberOfSteps > maxSteps) {
                    if (numberOfSteps < minSteps) {
                        stepValue /= 2;
                        numberOfSteps = Math.round(graphRange / stepValue);
                    } else {
                        stepValue *= 2;
                        numberOfSteps = Math.round(graphRange / stepValue);
                    }
                };
                // Create an array of all the labels by interpolating the string.
                var labels = [];
                if (labelTemplateString) {
                    // Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
                    for (var i = 1; i < numberOfSteps + 1; i++) {
                        labels.push(
                            tmpl(
                                labelTemplateString,
                                {
                                    value: (graphMin + (stepValue * i))
                                    .toFixed(getDecimalPlaces(stepValue))
                                }
                            )
                        );
                    }
                }
                return {
                    steps: numberOfSteps,
                    stepValue: stepValue,
                    graphMin: graphMin,
                    labels: labels
                };
                function calculateOrderOfMagnitude(val) {
                    return Math.floor(Math.log(val) / Math.LN10);
                }
            }
            function tmpl(str, data) {
                var fn = !/\W/.test(str) ? $.cache[str] = $.cache[str]
                || tmpl(document.getElementById(str).innerHTML)
                : new Function('obj',
                    'var p=[],print=function(){p.push.apply(p,arguments);};'
                    + 'with(obj){p.push("'
                    + str
                    .replace(/[\r\t\n]/g, ' ')
                    .split('<%').join('\t')
                    .replace(/((^|%>)[^\t]*)'/g, '$1\r')
                    .replace(/\t=(.*?)%>/g, '",$1,"')
                    .split('\t').join('");')
                    .split('%>').join('p.push("')
                    .split('\r').join('\\"')
                + '");}return p.join("");');
                return data ? fn(data) : fn;
            }
        }
    };

    return customElement;
});
