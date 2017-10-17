/**
 * @file mip-cehome-threadlist 组件
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

    console.log(ext);

    var i;
    var currentTypeid = Number(ext.info.currentTypeid);
    var currentSortid = Number(ext.info.currentSortid);
    var dataUrl = ext.info.dataUrl;
    var pageUrl = ext.info.pageUrl;
    var currentPage = 1;
    var threadInfoUrl = ext.info.threadInfoUrl;
    var otherInfoUrl = ext.info.otherInfoUrl;
    var uniStr = ext.info.uniStr;
    var fid = ext.info.fid;
    var soUrl = ext.info.soUrl;
    var myIndexUrl = ext.info.myIndexUrl;
    var threadTopUrl = ext.info.threadTopUrl;
    var forumListUrl = ext.info.forumListUrl;
    var forumIndexUrl = ext.info.forumIndexUrl;

    $('#indexLink').click(function () {
        window.location.href = 'https://m.cehome.com/news/';
    });

    $('#productLink').click(function () {
        window.location.href = 'https://m.cehome.com/zhengji/';
    });

    $('#myIndexLink').click(function () {
        window.location.href = ext.info.myIndexUrl;
    });

    $(function () {

        $(window).scroll(function () {

            if (ext.info.dataUrl === '') {
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

            if ((scrollTop + windowHeight > scrollHeight) && window.loading) {

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

                var url = dataUrl + '/' + currentPage + '/'
 + currentTypeid + '/' + currentSortid + '/';

                fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-CSRF-TOKEN': $('meta[name=\'csrf_token\']').attr('content')
                    },
                    body: 'inajax=1&uniStr=' + ext.info.uniStr,
                    credentials: 'include'

                }).then(function (res) {

                    if (res.status === 200) {
                        res.text().then(function (responseText) {
                            var objRet = $.parseJSON(responseText);
                            if (objRet.code === '0' && objRet.data) {
                                var obj = objRet.data;
                                var str = '';

                                for (i in obj) {

                                    var strimg = '';
                                    var strhonor = '';
                                    var j;
                                    var n;
                                    for (j in obj[i].honor) {
                                        strhonor += '<mip-img class=\'medal\' src=\''
                                         + obj[i].honor[j] + '\'></mip-img>';
                                    }

                                    var classNum = obj[i].image.length >= 3 ? 3 : obj[i].image.length;
                                    var className = 'col' + classNum;

                                    for (n in obj[i].image) {

                                        if (typeof(obj[i].image[n]) === 'object') {
                                            var imgSrc = obj[i].image[n].img;
                                        } else {
                                            var imgSrc = obj[i].image[n];
                                        }

                                        strimg += '<li class="'
     + className + '"><a href="' + ext.info.threadInfoUrl + '/'
     + obj[i].tid + '/"><mip-img src="' + imgSrc + '"></mip-img></a></li>';
                                    }

                                    var strstamp = '';
                                    if (obj[i].stamp !== '') {
                                        strstamp = '<em class=\'label\'>' + obj[i].stampStr + '</em>';
                                    }

                                    str += '<div class="single">\
                                                <div class="userBox">\
                                                    <a href="'
     + ext.info.otherInfoUrl + '/' + obj[i].encryptUid
     + '/"><mip-img class="userImg" src="' + obj[i].avatar + '"></mip-img></a>\
                                                    <div class="userInfo">\
                                                        <div class="user">\
    <h3 class="username"><a href="' + ext.info.otherInfoUrl + '/'
     + obj[i].encryptUid + '/">' + obj[i].username + '</a></h3>\
    <em class="level">' + obj[i].lv + '</em>\
    ' + strhonor + '\
    <em class="views"><i class="eye"></i>' + obj[i].viewsStr + '</em>\
                                                        </div>\
    <p class="time">' + obj[i].datelineStr + '</p>\
                                                    </div>\
                                                </div>\
                                                <h2 class="postTitle">'
     + strstamp + '<a href="' + ext.info.threadInfoUrl + '/' + obj[i].tid + '/">'
     + obj[i].title + '</a></h2>\
                                                <p class="postCon"><a href="'
     + ext.info.threadInfoUrl + '/'
     + obj[i].tid + '/">' + obj[i].summary + '</a></p>\
                                                <ul class="imgBox">\
                                                ' + strimg + '\
                                                </ul>\
                                                <div class="numBox">\
                                                    <div tid="' + obj[i].tid
     + '" rel="tid" class="num"><i class="zan"></i><em>'
     + (obj[i].praise > 0 ? obj[i].praiseStr : '赞') + '</em></div>\
                                                    <div tid="' + obj[i].tid
     + '" rel="tid" class="num"><i class="msg"></i><em>'
     + (obj[i].replies > 0 ? obj[i].repliesStr : '回帖') + '</em></div>\
    <div class="num"><i class="share"></i><em>'
     + (obj[i].share > 0 ? obj[i].shareStr : '转发') + '</em></div>\
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

                    console.log('nextpage is--' + currentPage);

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

    });

    $(function () {
        $('.listfilter').on('click', '.item .val',
        function () {
            $(this).parent().toggleClass('open').siblings().removeClass('open');
            if ($('.listfilter .open').length) {
                var st = $('body').scrollTop();
                $('.mask').show();
            } else {
                var st = -parseFloat($('body').css('top'));
                $('.mask').hide();
            }
        });

        $('.listfilter').on('click', '.hideUl li',
        function () {
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
            if (type === 'typeid') {
                var typeid = t.attr('value');
                var sortid = Number(currentSortid);
                var url = sortid > 0 ? (pageUrl + '/1/' + typeid + '/' + sortid + '/')
                    : (pageUrl + '/1/' + typeid + '/');
                window.location.href = url;
            } else if (type === 'sortid') {

                var sortid = Number(t.attr('value'));
                var typeid = Number(currentTypeid);
                var url = sortid > 0 ? (pageUrl + '/1/' + typeid + '/' + sortid + '/')
                    : (pageUrl + '/1/' + typeid + '/');

                if (fid === 15 && sortid === 74) {
                    url = soUrl;
                }

                window.location.href = url;
            }
        });

        if (fid === 15 && currentSortid === 74) {
            window.location.href = soUrl;
        }

        $('.hideBox').on('click', '.groupUl li',
        function () {
            var t = $(this);

            var type = t.attr('rel');
            console.log(type);

            t.closest('.left').find('.cur').removeClass('cur');
            t.addClass('cur');
            var txt = '';

            if (t.data('txt')) {
                return;
            }

            if (t.closest('.hideBox').find('.right').css('display') === 'none')
                {
                t.closest('.hideBox').find('.navAlpha').addClass('hide');
                t.closest('.hideBox').find('.right').show();
                t.closest('.left').find('.arrowR').hide();
            } else {
                t.closest('.hideBox').find('.navAlpha').removeClass('hide');
                t.closest('.hideBox').find('.right').hide();
                t.closest('.left').find('.arrowR').show();
            }
        });

        $('.hideBox').on('click', '.filterUl li',
        function () {
            $(this).addClass('cur').siblings().removeClass('cur');
        });

        $('.hideDate').on('change',
        function () {
            var t = $(this);
            var date = t.val();
            var dateArr = date.split('-');
            t.closest('.dateBox').find('.yearVal').html(dateArr[0]);
            t.closest('.dateBox').find('.monthVal').html(dateArr[1]);
            t.closest('.dateBox').find('.dayVal').html(dateArr[2]);
        });

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
        brandNavObj.addEventListener('touchstart',
        function (e) {
            e.stopPropagation();
            e.preventDefault();
            touch.parent = $(this).closest('.hideBox').find('.left');
            touch.ulTop = $(brandNavObj).offset().top;
            touch.startLi = $(brandNavObj).find('li[data-alpha=\''
 + e.target.innerText + '\']');
            touch.startX = e.touches[0].pageX;
            touch.startY = e.touches[0].pageY;
            touch.liW = $(brandNavObj).find('li').width();
            touch.liH = $(brandNavObj).find('li').height();
            var scrollTop = touch.parent.find('.'
 + e.target.innerText).offset().top - touch.parent.find('.group:first').offset().top;
            touch.parent.scrollTop(scrollTop);
        },
        false);

        brandNavObj.addEventListener('touchmove',
        function (e) {
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
                var scrollTop = touch.parent.find('.' + curAlpha).offset().top
                - touch.parent.find('.group:first').offset().top;
                touch.parent.scrollTop(scrollTop);
            }
        },
        false);
        brandNavObj.addEventListener('touchend',
        function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (!e.touches[0]) {
                return;
            }
            touch.moveY = e.touches[0].pageY;
        },
        false);
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
