/**
 * @file mip-cehome-sellso 组件
 * @author
 */

define(function (require) {

    window.loading = 1;
    var $ = require('zepto');

    var ext = {};
    var getExtdata = function () {
        var extdata = {};
        $('script.json-inline').each(function (i, ele) {
            var name = $(ele).attr('data-name');
            var value = $(ele).text();
            var configObj = JSON.parse(value);
            extdata[name] = configObj;
        });

        return extdata;
    };
    ext = getExtdata();

    var myIndexUrl = ext.info.myIndexUrl;
    var threadTopUrl = ext.info.threadTopUrl;
    var forumListUrl = ext.info.forumListUrl;
    var forumIndexUrl = ext.info.forumIndexUrl;
    var getBrandUrl = ext.info.getBrandUrl;
    var getModelUrl = ext.info.getModelUrl;
    var getCityUrl = ext.info.getCityUrl;
    var baseSearchUrl = ext.info.baseSearchUrl;
    var sort = 'lt';
    var currentPage = 1;
    var threadInfoUrl = ext.info.threadInfoUrl;
    var otherInfoUrl = ext.info.otherInfoUrl;
    var currentEq = ext.info.currentEq;
    var currentEqid = ext.info.currentEqid;
    var currentBrand = ext.info.currentBrand;
    var currentBrandid = ext.info.currentBrandid;
    var currentModelid = ext.info.currentModelid;
    var currentProid = ext.info.currentProid;
    var currentCityid = ext.info.currentCityid;
    var currentDistrictid = '0';
    var currentPricerange = ext.info.currentPricerange;
    var currentWorkhours = ext.info.currentWorkhours;
    var currentMdate = ext.info.currentMdate;

    var getDataUrl = function () {
        var url = window.location.href;
        var arr = url.split('/');
        var newArr = [];
        var i;
        for (i in arr) {
            var ret = arr[i].match(/^(lt|dl)_(\d+)$/);
            if (ret !== null) {
                var temp = arr[i].split('_');
                sort = temp[0];
                currentPage = Number(temp[1]);
                console.log(currentPage);
            } else {
                if (arr[i] !== '') {
                    newArr[i] = arr[i];
                }
            }
        }

        return newArr.join('/');
    };

    var dataUrl = getDataUrl();
    var pageUrl = dataUrl;

    $(window).scroll(function () {

        if (dataUrl === '') {
            return;
        }

        var scrollTop = $(this).scrollTop();
        var windowHeight = $(this).height();
        var scrollHeight = $(document).height() - 5;
        if (scrollTop > 600) {
            $('.toTop').show();
        } else {
            $('.toTop').hide();
        }

        if ((scrollTop + windowHeight >= scrollHeight) && window.loading) {

            $('#loadedAll').hide();
            window.loading = 0;
            console.log('loading');

            if (currentPage === 1) {
                window.loading = 1;
                currentPage = 2;
                $('#loading').hide();
                return;
            }

            $('#loading').show();
            var url = dataUrl + '/' + sort + '_' + currentPage;

            fetch(url, {
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-CSRF-TOKEN': $('meta[name=\'csrf_token\']').attr('content')
                },
                body: 'inajax=1',
                credentials: 'include'

            }).then(function (res) {

                if (res.status === 200) {
                    res.text().then(function (responseText) {
                        var objRet = $.parseJSON(responseText);
                        if (objRet.code === '0' && objRet.data) {
                            var obj = objRet.data;
                            var str = '';
                            var i;
                            var j;
                            for (i in obj) {

                                var strimg = '';
                                var strhonor = '';
                                for (j in obj[i].honor) {
                                    strhonor += '<mip-img class="medal" src="'
                                    + obj[i].honor[j] + '"></mip-img>';
                                }

                                var classNum = obj[i].image.length >= 3
                                ? 3 : obj[i].image.length;
                                var className = 'col' + classNum;

                                for (j in obj[i].image) {

                                    if (typeof(obj[i].image[j]) === 'object') {
                                        var imgSrc = obj[i].image[j].img;
                                    } else {
                                        var imgSrc = obj[i].image[j];
                                    }

                                    strimg += '<li class="' + className
                                    + '"><a href="' + threadInfoUrl + '/'
                                    + obj[i].tid + '/"><mip-img  src="'
                                    + imgSrc + '"></mip-img></a></li>';
                                }

                                var strstamp = '';
                                if (obj[i].stamp !== '') {
                                    strstamp = '<em class=\'label\'>'
                                    + obj[i].stampStr + '</em>';
                                }

                                str += '<div class="single">\
                                            <div class="userBox">\
                                                <a href="'
                                                + otherInfoUrl
                                                + '/'
                                                + obj[i].encryptUid
                                                + '/"><mip-img \
                                                class="userImg" src="'
                                                + obj[i].avatar
                                                + '"></mip-img></a>\
                                                <div class="userInfo">\
                                                    <div class="user">\
                                                        <h3 class="username">\
                                                        <a href="'
                                                        + otherInfoUrl
                                                        + '/'
                                                        + obj[i].encryptUid
                                                        + '/">'
                                                        + obj[i].username
                                                        + '</a></h3>\
                                                        <em class="level">'
                                                        + obj[i].lv + '</em>\
                                                        ' + strhonor + '\
                                                        <em class="views">\
                                                        <i class="eye"></i>'
                                                        + obj[i].viewsStr
                                                        + '</em>\
                                                    </div>\
                                                    <p class="time">'
                                                    + obj[i].datelineStr
                                                    + '</p>\
                                                </div>\
                                            </div>\
                                            <h2 class="postTitle">'
                                            + strstamp + '<a href="'
                                            + threadInfoUrl + '/'
                                            + obj[i].tid + '/">'
                                            + obj[i].title + '</a></h2>\
                                            <p class="postCon"><a href="'
                                            + threadInfoUrl + '/'
                                            + obj[i].tid + '/">'
                                            + obj[i].summary + '</a></p>\
                                            <ul class="imgBox">\
                                            ' + strimg + '\
                                            </ul>\
                                            <div class="numBox">\
                                                <div tid="' + obj[i].tid
                                                + '" rel="tid" class="num">\
                                                <i class="zan"></i><em>'
                                                + (obj[i].praise > 0
                                                ? obj[i].praiseStr : '赞')
                                                + '</em></div>\
                                                <div tid="' + obj[i].tid
                                                + '" rel="tid" class="num">\
                                                <i class="msg"></i><em>'
                                                + (obj[i].replies > 0
                                                ? obj[i].repliesStr : '回帖')
                                                + '</em></div>\
                                                <div class="num">\
                                                <i class="share"></i><em>'
                                                + (obj[i].share > 0
                                                ? obj[i].shareStr : '转发')
                                                + '</em></div>\
                                            </div>\
                                        </div>';
                            }

                            if (str !== '') {
                                $('#loading').hide();
                                $('#group').append(str);
                                currentPage += 1;
                                window.loading = 1;
                            } else {
                                $('#loading').hide();
                                $('#loadedAll').show();
                                setTimeout('window.loading=1', 1000);
                            }
                        }
                    });
                } else {
                    $('#loading').hide();
                    window.loading = 1;
                }

            }, function (error) {
                $('#loading').hide();
                window.loading = 1;
            });

        }

        $(document).ready(function () {
            window.nofindAvatar();
            window.bindOpenFunc();
        });

    });

    $(function () {
        $('.listfilter').on('click', '.item .val', function () {
            var t = $(this);
            var type = t.attr('rel');
            if (type === 'brand') {
                if (currentEq === '') {
                    alert('请先选择机型');
                    return;
                }
            }

            t.parent().toggleClass('open').siblings().removeClass('open');
            if ($('.listfilter .open').length) {
                var st = $('body').scrollTop();
                $('.mask').show();
            } else {
                var st = -parseFloat($('body').css('top'));
                $('.mask').hide();
            }
        });


        function initBrand(eqId, from) {
            $.get(getBrandUrl + '/' + eqId, [], function (data) {
                var obj = $.parseJSON(data);
                var list = obj.data.brand_list;
                var groupStr = '';
                var charStr = '';
                var str = '';
                var strStart = '<div class="left">\
                                    <div class="group">\
                                        <ul class="groupUl">\
                                        <li rel="brand" brand="" \
                                        brandId="0" data-txt="品牌">全部品牌</li>\
                                        </ul>\
                                    </div>';
                var strEnd = '</div>';
                var i;
                for (i in list) {

                    var itemStr = '';
                    var j;
                    for (j in list[i]) {
                        itemStr += '<li rel="brand" brand="'
                        + list[i][j].identifier + '" brandId="'
                        + list[i][j].id + '" ><em>'
                        + list[i][j].name + '</em><i class="arrowR"></i></li>';
                    }

                    charStr += '<li data-alpha="A">' + i + '</li>';
                    groupStr += '<div class="group" class="' + i + '">\
                                    <p class="alpha">' + i + '</p>\
                                    <ul class="groupUl">\
                                    ' + itemStr + '\
                                    </ul>\
                                 </div>';
                }

                charStr = '<ol class="navAlpha">' + charStr + '</ol>';
                str = strStart + groupStr + strEnd
                    + '<div id="modelList" class="right"></div>' + charStr;

                $('#brandList').html(str);

                if (from === 'fromSelect') {
                    currentBrand = '';
                    currentBrandid = '0';
                    $('#brandCon').removeClass('selected');
                    $('#brandText').text('品牌');
                }
            });
        }

        if (parseInt(currentEqid, 10) > 0) {
            initBrand(currentEqid, 'fromUrl');
        }

        function initModel(eqId, brandId) {
            $.get(getModelUrl + '/'
                + eqId + '/' + brandId, [], function (data) {
                    var obj = $.parseJSON(data);
                    var list = obj.data;

                    var str = '';
                    var i;
                    for (i in list) {
                        str += '<li rel="model" modelId="'
                        + list[i].id + '" ><em>' + list[i].name + '</em></li>';
                    }

                    str = '<ul rel="model" modelId="0" class="hideUl">\
                    <li rel="model" modelId="0" ><em>不限</em></li>'
                    + str + '</ul>';

                    $('#modelList').html(str);
                });
        }

        if (parseInt(currentEqid, 10) > 0 && parseInt(currentBrandid, 10) > 0) {
            initModel(currentEqid, currentBrandid);
        }

        function initCity(proId) {
            $.get(getCityUrl + '/' + proId, [], function (data) {
                var obj = $.parseJSON(data);
                var list = obj.data.city_list;
                var str = '';
                var i;
                for (i in list) {
                    str += '<li rel="city" cityId="'
                    + list[i].id + '" ><em>' + list[i].name + '</em></li>';
                }
                str = '<li rel="city" cityId="0" class="cur"\
                data-txt="不限"><em>不限</em></li>' + str;
                $('#cityList').html(str);
            });
        }

        if (parseInt(currentProid, 10) > 0) {
            initCity(currentProid);
        }

        $('#eqList li').on('click', function () {
            console.log($(this));
            var obj = $(this);
            var eqId = obj.attr('eqId');
            var eq = obj.attr('eq');
            initBrand(eqId, 'fromSelect');
            currentEqid = eqId;
            currentEq = eq;
            if (currentEq === '') {
                window.location.href = baseSearchUrl + '/';
            } else {
                window.location.href = baseSearchUrl + '/' + currentEq + '/';
            }
        });

        $('.listfilter').on('click', '.hideUl li', function () {
            var t = $(this);
            var index = t.index();
            var txt = t.data('txt') ? t.data('txt') : t.text();
            if (t.data('txt') && !t.closest('.right').length) {
                t.closest('.item').removeClass('selected')
                .find('.defaultVal').text(txt);
            } else {
                t.closest('.item').addClass('selected')
                .find('.defaultVal').text(txt);
            }
            t.closest('.hideUl').find('.cur').removeClass('cur');
            t.addClass('cur').closest('.item').removeClass('open');
            $('.mask').hide();

            var type = t.attr('rel');
            if (type === 'model') {
                var modelId = t.attr('modelId');
                currentModelid = modelId;
                if (currentModelid === '0') {
                    window.location.href = baseSearchUrl + '/' + currentEq
                    + '/' + currentBrand + '/';
                } else {
                    window.location.href = baseSearchUrl + '/' + currentEq
                    + '/' + currentBrand + '/' + currentModelid
                    + '_' + currentProid + '_' + currentCityid + '_0_0_0_0_0/';
                }

            } else if (type === 'city') {
                var cityId = t.attr('cityId');
                currentCityid = cityId;

                if (currentBrand !== '') {
                    window.location.href = baseSearchUrl + '/' + currentEq
                    + '/' + currentBrand + '/' + currentModelid + '_'
                    + currentProid + '_' + currentCityid + '_0_0_0_0_0/';
                } else {
                    window.location.href = baseSearchUrl + '/' + currentEq
                    + '/' + currentModelid + '_' + currentProid + '_'
                    + currentCityid + '_0_0_0_0_0/';
                }

            }
        });

        $('.hideBox').on('click', '.groupUl li', function () {
            var t = $(this);
            var type = t.attr('rel');

            if (type === 'brand') {
                var eqId = currentEqid;
                var brandId = t.attr('brandId');
                var brand = t.attr('brand');

                initModel(eqId, brandId);
                currentBrandid = brandId;
                currentBrand = brand;
                currentEq = (currentEq === '') ? 'wajueji' : currentEq;

                if (brandId === '0') {
                    window.location.href = baseSearchUrl + '/' + currentEq + '/';
                }

            } else if (type === 'zone') {
                var proId = t.attr('proId');
                initCity(proId);
                currentProid = proId;
                currentEq = (currentEq === '') ? 'wajueji' : currentEq;

                if (proId === '0') {
                    if (currentBrand === '') {
                        window.location.href = baseSearchUrl + '/' + currentEq + '/';
                    } else {
                        window.location.href = baseSearchUrl
                        + '/' + currentEq + '/' + currentBrand + '/';
                    }
                }
            }

            t.closest('.left').find('.cur').removeClass('cur');
            t.addClass('cur');
            var txt = '';

            if (t.data('txt')) {
                return;
            }

            if (t.closest('.hideBox').find('.right').css('display')
                === 'none') {
                t.closest('.hideBox').find('.navAlpha').addClass('hide');
                t.closest('.hideBox').find('.right').show();
                t.closest('.left').find('.arrowR').hide();
            } else {
                t.closest('.hideBox').find('.navAlpha').removeClass('hide');
                t.closest('.hideBox').find('.right').hide();
                t.closest('.left').find('.arrowR').show();
            }
        });

        $('.hideBox').on('click', '.filterUl li', function () {
            $(this).addClass('cur').siblings().removeClass('cur');
            var type = $(this).attr('rel');
            if (type === 'priceRange') {
                currentPricerange = $(this).attr('value');
            } else if (type === 'workHours') {
                currentWorkhours = $(this).attr('value');
            } else if (type === 'mdate') {
                currentMdate = $(this).attr('value');
            }
        });

        $('.hideBox').on('click', '.sureBtn', function () {
            $(this).closest('.item').removeClass('open');
            $('.mask').hide();
            var year = $.trim($('#year').text());
            var month = $.trim($('#month').text());
            var day = $.trim($('#day').text());
            var startDate = '0';
            if (year !== '' && month !== '' && day !== '') {
                startDate = year + '' + month + '' + day;
            }

            currentEq = (currentEq === '') ? 'wajueji' : currentEq;

            var queryUri = '';
            if (currentEq !== '') {
                queryUri = currentEq;
                var condition = '';

                if (startDate !== '0'
                || currentModelid !== '0'
                || currentProid !== '0'
                || currentCityid !== '0'
                || currentDistrictid !== '0'
                || currentPricerange !== '0'
                || currentWorkhours !== '0'
                || currentMdate !== '0') {

                    condition = currentModelid + '_'
                    + currentProid + '_' + currentCityid
                    + '_' + currentDistrictid + '_'
                    + currentPricerange + '_'
                    + currentWorkhours + '_'
                    + currentMdate + '_' + startDate;
                }

                if (currentBrand !== '' && condition !== '') {
                    queryUri = currentEq + '/' + currentBrand + '/'
                        + condition;
                } else if (currentBrand === '' && condition !== '') {
                    queryUri = currentEq + '/' + condition;
                } else if (currentBrand !== '' && condition === '') {
                    queryUri = currentEq + '/' + currentBrand;
                }
            }

            var url = (queryUri !== '') ? baseSearchUrl + '/'
                + queryUri + '/' : baseSearchUrl + '/';

            window.location.href = url;
        });


        $('.hideDate').on('change', function () {
            var t = $(this);
            var date = t.val();
            var dateArr = date.split('-');
            t.closest('.dateBox').find('.yearVal').html(dateArr[0]);
            t.closest('.dateBox').find('.monthVal').html(dateArr[1]);
            t.closest('.dateBox').find('.dayVal').html(dateArr[2]);
        });

        // 字母定位
        var brandNavObj = document.getElementById('navAlpha');
        var touch = {
            parent: null,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            ulTop: 0,
            liW: 0,
            liH: 0,
            startLi: null
        };
        brandNavObj.addEventListener('touchstart', function (e) {
            e.stopPropagation();
            e.preventDefault();
            touch.parent = $(this).closest('.hideBox').find('.left');
            touch.ulTop = $(brandNavObj).offset().top;
            touch.startLi = $(brandNavObj)
            .find('li[data-alpha=\'' + e.target.innerText + '\']');
            touch.startX = e.touches[0].pageX;
            touch.startY = e.touches[0].pageY;
            touch.liW = $(brandNavObj).find('li').width();
            touch.liH = $(brandNavObj).find('li').height();
            var scrollTop = touch.parent
            .find('.' + e.target.innerText).offset().top
            - touch.parent.find('.group:first').offset().top;
            touch.parent.scrollTop(scrollTop);
        }, false);

        brandNavObj.addEventListener('touchmove', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (!e.touches[0]) {
                return;
            }
            touch.moveX = e.touches[0].pageX;
            touch.moveY = e.touches[0].pageY;
            var index = parseInt((touch.moveY - touch.ul_top) / touch.li_H, 10);
            if (index >= 0 && index < $(brandNavObj).find('li').length
                && Math.abs(touch.moveX - touch.startX) < touch.li_W) {
                var curAlpha = $(brandNavObj)
                .find('li').eq(index).data('alpha');
                console.log(curAlpha);
                var scrollTop = touch.parent.find('.' + curAlpha).offset().top
                - touch.parent.find('.group:first').offset().top;
                touch.parent.scrollTop(scrollTop);
            }
        }, false);
        brandNavObj.addEventListener('touchend', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (!e.touches[0]) {
                return;
            }
            touch.moveY = e.touches[0].pageY;
        }, false);
    });


    $('#indexLink').click(function () {
        window.location.href = 'https://m.cehome.com/news/';
    });

    $('#productLink').click(function () {
        window.location.href = 'https://m.cehome.com/zhengji/';
    });

    $('#myIndexLink').click(function () {
        window.location.href = myIndexUrl;
    });


    var render = function () {
        $('#loadedAll').hide();
        $('#loading').hide();

        window.bindOpenFunc();
        window.nofindAvatar();
        window.nofindImg();
    };

    window.onload = function () {
        render();
    };

    return {
        render: render
    };

});
