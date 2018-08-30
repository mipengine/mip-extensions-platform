/**
 * @file mip-xin-re 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var number = 'one';
    var fullCodeTemp = '';
    var element2 = '';
    var tsStatus = 'false';
    var xlStatus = 'true';
    var scroll2Num = 1;
    function sendReq(method, siteUrl, data, callback) {
        $.ajax({
            type: method,
            cache: false,
            dataType: 'json',
            data: data,
            url: encodeURI(siteUrl),
            success: function (data) {
                if (data.status) {
                    callback(data);
                } else {
                    alert(data.errorMessage);
                }
            },
            error: function (error) {}
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        element2 = element;
        fullCodeTemp = element.getAttribute('fullCode') || '';
        tsStatus = 'false';
        xlStatus = 'true';
        // 最热点击事件监听
        element.querySelector('#zuihot').onclick = function () {
            uptodateOnclickRe(element);
        };
        // 最新点击事件监听
        element.querySelector('#zuiupdate').onclick = function () {
            uptodateOnclickXin(element);
        };
        uptodateOnclickRe(element);
        $(window).scroll(function () {
            var type = element.querySelector('#addMore_data').getAttribute('data-type');
            var top = $('#addMore_data', element).offset().top;
            var h = $('.Mfoot_new', element).height();
            var baseH = top - h;
            var scrollH = $(window).scrollTop() + 600;
            var isLook = $('.Mfoot_new', element).offset().top;
            if (isLook >= $(window).scrollTop() && isLook < ($(window).scrollTop() + $(window).height())) {
                if (xlStatus === 'true') {
                    xlStatus = 'false';
                    scroll2Num++;
                    dropData(type, scroll2Num, element);
                }
            }
        });
        // 最新最热主贴和跟帖的点赞
        $('.hotxinClick', element2).click(function () {
            var rid = $(this).attr('name');
            var topic = $(this).attr('data-type');
            var flag = $(this).attr('data-utype');
            addUseful(rid, '0', topic, flag);
        });
        // 最新最热主贴跟帖淘说说评论
        $('.pltwr', element2).click(function () {
            var dataTopic = $(this).attr('data-topic');
            articleMopenAPP(dataTopic, 0);
        });
        // 最新最热淘说说点赞
        $('.taoShuoClick', element2).click(function () {
            var dataTopic = $(this).attr('data-topic');
            addWeiboUseful(dataTopic);
        });
        // 涉及股票的点击事件
        $('.stockArrClick', element2).click(function () {
            var dataXu = $(this).attr('data-xu');
            var dataUtype = $(this).attr('data-utype');
            stockArr(this, dataXu, dataUtype);
        });
        // 暂无更多讨论的跳转
        $('.toupdateClickMip', element2).click(function () {
            var dataType = $(this).attr('data-type');
            toupdateClick(dataType);
        });
    };
    function uptodateOnclickRe(element) {
        var url = '';
        element.querySelector('#bottom_tit').innerHTML = '';
        element.querySelector('#neiContent').innerHTML = '';
        element.querySelector('#addMore_data').innerHTML = '';
        scroll2Num = 1;
        var classVal = element.querySelector('#zuihot').getAttribute('class');
        classVal = classVal.replace('mhq_changeType_act', '');
        element.querySelector('#zuihot').setAttribute('class', classVal);
        element.querySelector('#zuiupdate').setAttribute('class', classVal);
        element.querySelector('#zuihot').classList.add('mhq_changeType_act');
        element.querySelector('#addMore_data').setAttribute('data-type', 'hot');
        url = '/uptodate?fullCode=';
        url += fullCodeTemp + '&type=r';
        asyncfun(url, uptodate, element, 'r');
    }
    function uptodateOnclickXin(element) {
        var url = '';
        element.querySelector('#bottom_tit').innerHTML = '';
        element.querySelector('#neiContent').innerHTML = '';
        element.querySelector('#addMore_data').innerHTML = '';
        scroll2Num = 1;
        var classVal = element.querySelector('#zuiupdate').getAttribute('class');
        classVal = classVal.replace('mhq_changeType_act', '');
        element.querySelector('#zuihot').setAttribute('class', classVal);
        element.querySelector('#zuiupdate').setAttribute('class', classVal);
        element.querySelector('#zuiupdate').classList.add('mhq_changeType_act');
        element.querySelector('#addMore_data').setAttribute('data-type', 'new');
        url = '/uptodate?fullCode=';
        url += fullCodeTemp + '&type=x';
        asyncfun(url, uptodate, element, 'x');
    }
    function asyncfun(url, uptodate, element, type) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (data) {
                uptodate(data, element);
            },
            timeout: 30000,
            async: true,
            // 超时时间设置，单位毫秒
            complete: function (XMLHttpRequest, status) {
                // 请求完成后最终执行参数
                if (status === 'timeout') {
                    // 超时,status还有success,error等值的情况
                    alert('超时');
                }
            }
        });
        // var data = '';
        // if (type === 'r') {
        //     data =
        // } else if (type === 'x') {}
        // data = JSON.stringify(data);
        // uptodate(data, element);
    }
    // 最新最热回调函数
    function uptodate(data, element) {
        var data = JSON.parse(data);
        $('#neiContent').html('');
        var record = data.dto.coolAttr.record;
        var type = data.dto.type;
        var html = '';
        var perPageNum = data.dto.perPageNum;
        // 页数
        var pageNum = data.dto.pageNum;
        if (type === 'r') {
            // 最热时，将总页数存入value；
            element.querySelector('#addMore_data').setAttribute('value', pageNum);
        }
        if (Number(record.length) > 0 && type === 'x') {
            // 最新有数据
            element.querySelector('#neiContent').innerHTML = createMdata(record, perPageNum, element);
        } else if (type === 'x' && Number(record.length) === 0) {
            // 最新没数据
            var html2 = '<div class="center "><mip-img class="undefinedData"';
            html2 += 'src="https://css.taoguba.com.cn/images/quotes/unContent.png">';
            html2 += '</mip-img><span class="center moreInfo">暂无讨论</span></div>';
            element.querySelector('#neiContent').innerHTML = html2;
        } else if (number === 'one' && type === 'r' && Number(record.length) <= 5) {
            // 最热首次访问，且条数小于等于5时，跳转到最新，已验证
            number = 'two';
            var fullCode = fullCodeTemp;
            uptodateOnclickXin(element);
            // uptodateOnclick(fullCode, 'x', number);
            // element.querySelector("zuiupdate").click();
        } else if ('r' === type && Number(record.length) === 0 && number === 'two') {
            // 最热第2次，即点击最热无数据情况，已验证
            var html2 = '<div class="center "><mip-img class="undefinedData"';
            html2 += 'src="https://css.taoguba.com.cn/images/quotes/unContent.png">';
            html2 += '</mip-img><span class="center moreInfo">暂无讨论</span></div>';
            element.querySelector('#neiContent').innerHTML = html2;
        } else if ('r' === type && record.length > 0 && number === 'two') {
            // 最热点击事件有数据，已验证
            element.querySelector('#neiContent').innerHTML = createMdata(record, perPageNum, element);
        } else if (number === 'one' && type === 'r' && Number(record.length) > 5) {
            // 最热首次访问条数大于5情况，已验证
            element.querySelector('#neiContent').innerHTML = createMdata(record, perPageNum, element);
        }
    }

    // 数据拼接
    function createMdata(record, perPageNum, element) {
        var html = '';
        // 存入 最新 数据分页需要的时间参数
        if (element.querySelector('#addMore_data').getAttribute('data-type') === 'new') {
            element.querySelector('#zuiupdate').setAttribute('data-time', record[record.length - 1].actionDate);
        }
        // alert(record.length);
        for (let i = 0; i < record.length; i++) {
            html += ' <div class="mhq_GuItem">';
            html += ' <div class="mhq_GuItem_top">';
            html += ' <a class="mhq_GuItem_head left" href="/blog/' + record[i].userID + '">';
            html += ' <mip-img src="https://image.taoguba.com.cn/img/' + record[i].img;
            html += '" alt="" class="img1"  layout="responsive" width="10" height="10"></mip-img>';
            if (Number(record[i].auth) === 55) {
                html += '<mip-img src="https://css.taoguba.com.cn/images/mNew/daV.png" alt="" class="img2"></mip-img>';
            }
            html += '</a>';
            html += '<div class="mhq_GuItem_info left">';
            html += '<a href="/blog/' + record[i].userID + '">' + record[i].userName + '</a>';
            if (record[i].auth > 0) {
                html += '   <mip-img src="https://css.taoguba.com.cn/images/mNew/VIP.png" alt="" class="mhq_GuItem_vip1"></mip-img>';
            }
            html += '<p>粉丝' + record[i].totalFansNum + '</p>';
            html += '</div>';
            html += '<span class="right mhq_GuItem_time">';
            var time = timestampToTime(record[i].actionDate);
            if ('T' === record[i].rType) {
                html += '主贴发布于' + time;
            } else if ('W' === record[i].rType) {
                html += '淘说说发布于' + time;
            } else if ('R' === record[i].rType) {
                html += '发布了跟帖' + time;
            }
            html += '</span>';
            html += '<div class="clear"></div>';
            html += '</div>';
            if (record[i].rType === 'T') {
                html += '<a class="mhq_GuItem_subject" href="/Article/' + record[i].rID + '/1">';
                html += record[i].subject;
                html += '</a>';
                var tjArr = record[i].stockAttr;
                if (tjArr != null) {
                    if (tjArr.length > 0) {
                        var stockArr = '';
                        if (tjArr.length > 5) {
                            html += ' <div class="whItem_gu left"> ';
                            html += '谈及股票 ';
                            html += '<span id="openStock' + i + '"  class="openStock_div">';
                            for (var z = 0; z < 5; z++) {
                                html += '<a href="/quotes/' + tjArr[z].stockCode;
                                html += '"  target="_blank">' + tjArr[z].stockName + '&nbsp;</a>';
                            }
                            html += '等' + tjArr.length + '支 </span> ';
                            for (var m = 0; m < tjArr.length; m++) {
                                stockArr += ' <a href="/quotes/' + tjArr[m].stockCode;
                                stockArr += '" target="_blank">' + tjArr[m].stockName + '&nbsp;</a>';
                            }
                            html += '<span id="stockArr' + i + '"   class="stockArr_span" >' + stockArr + '</span>';
                            html += ' <mip-img src="https://css.taoguba.com.cn/images/mNew/zhankai3.png"';
                            html += 'layout="responsive" width="300"';
                            html += 'height="100"  data-opne="false"  class="stockArrClick"  ';
                            html += '" alt=""   data-xu="' + i + '"  data-utype="0"  class="whItem_gu_more"></mip-img>';
                        } else {
                            html += ' <div class="whItem_gu "> ';
                            html += ' <div class="left">谈及股票 ';
                            for (var m = 0; m < tjArr.length; m++) {
                                html += ' <a href="/quotes/' + tjArr[m].stockCode;
                                html += '" target="_blank">' + tjArr[m].stockName + '&nbsp;</a>';
                            }
                            html += '</div>';
                        }
                    } else {
                        html += ' <div class="whItem_gu ">';
                    }
                }
                html += '<div class="clear"></div> ';
                html += '</div> ';
                html += '<div class="mhq_GuItem_subject2">';
                html += '[摘要]' + record[i].body;
                html += '</div>';
                html += '  <div class="mhq_GuItem_btns">';
                html += '  <div class="mhq_GuItem_btn zanBtn left  hotxinClick"   name="' + record[i].rID;
                html += '"   data-type="' + record[i].rID + '"  data-utype="T">';
                html += '   <mip-img src="https://css.taoguba.com.cn/images/mNew/zan.png" class="left" alt=""></mip-img>';
                html += '   <span class="left">赞(' + record[i].usefulNum + ')</span>';
                html += '   </div>';
                html += '   <div class="mhq_GuItem_btn viewBtn left viewBtn_div"   >';
                html += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/liulan.png" alt="" ></mip-img>';
                html += '  <span >浏览(' + record[i].viewNum + ')</span>';
                html += '  </div>';
                html += '  <div class="mhq_GuItem_btn plBtn left">';
                html += '<span class="right pltwr"  data-topic="' + record[i].rID + '"';
                html += '>评论(' + record[i].replyNum + ')</span>';
                html += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/pinglun.png" alt="" class="right"></mip-img>';
                html += '  </div><div class="clear"></div></div>';
            }
            if (record[i].rType === 'W') {
                html += '  <div class="mhq_GuItem_subject2">';
                html += record[i].body;
                html += '  </div>';
                var Sflag = '"' + 'S' + '"';
                html += '  <div class="mhq_GuItem_btns">';
                html += '  <div class="mhq_GuItem_btn zanBtn left  taoShuoClick"   data-topic="';
                html += record[i].rID + '" >';
                html += '   <mip-img src="https://css.taoguba.com.cn/images/mNew/zan.png" class="left" alt=""></mip-img>';
                html += '   <span class="left">赞(' + record[i].usefulNum + ')</span>';
                html += '   </div>';
                html += '  <div class="mhq_GuItem_btn plBtn right  pltwr" data-topic="' + record[i].otherID + '" >';
                html += '<span class="right">评论(' + record[i].replyNum + ')</span>';
                html += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/pinglun.png" alt="" class="right"></mip-img>';
                html += '  </div><div class="clear"></div></div>';
            }
            if (record[i].rType === 'R') {
                html += '  <div class="mhq_GuItem_subject2">';
                html += record[i].body;
                html += '  </div>';
                html += '<div class="mhq_RItem">';
                html += '     <div class="mhq_RItem_top">';
                html += '  <a class="mhq_RItem_head left" href="/blog/' + record[i].tops.userID + '">';
                html += ' <mip-img src="https://image.taoguba.com.cn/img/' + record[i].tops.images;
                html += '" alt="" class="img1"  layout="responsive" width="10" height="10"></mip-img>';
                if (Number(record[i].tops.auth) === 55) {
                    html += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/daV.png" alt="" class="img2"></mip-img>';
                }
                html += '  </a>';
                html += '  <a class="mhq_RItem_name left" href="/blog/';
                html += record[i].tops.userID + '">' + record[i].tops.userName + '</a>';
                if (record[i].tops.auth > 0) {
                    html += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/VIP.png" alt="" class="mhq_RItem_vip2 left"></mip-img>';
                }
                html += '  <span class="mhq_RItem_time right">主贴发布于';
                html += timestampToTime(record[i].tops.postDate) + '</span>';
                html += '  <div class="clear"></div>';
                html += '  </div>';
                html += ' <a class="mhq_GuItem_subject" href="/Article/' + record[i].tops.topicID + '/1">';
                html += record[i].tops.subject;
                html += '  </a>';
                var tjArr2 = record[i].tops.stockAttr;
                if (tjArr2 != null) {
                    if (tjArr2.length > 0) {
                        if (tjArr2.length > 5) {
                            html += ' <div class="whItem_gu "> ';
                            html += ' <div class="left">谈及股票 ';
                            html += '<span id="RopenStock' + i + '"   class="RopenStock_span">';
                            for (var z = 0; z < 5; z++) {
                                html += '<a href="/quotes/' + tjArr2[z].stockCode;
                                html += '"  target="_blank">' + tjArr2[z].stockName + '&nbsp;</a>';
                            }
                            html += '等' + tjArr2.length + '支 </span> ';
                            var stockArr = '';
                            for (var m = 0; m < tjArr2.length; m++) {
                                stockArr += ' <a href="/quotes/' + tjArr2[m].stockCode;
                                stockArr += '" target="_blank">' + tjArr2[m].stockName + '&nbsp;</a>';
                            }
                            html += '<span id="RstockArr' + i + '"   class="RstockArr_span">' + stockArr + '</span>';
                            html += ' <mip-img src="https://css.taoguba.com.cn/images/mNew/zhankai3.png"';
                            html += 'layout="responsive" width="300" height="100"';
                            html += '  data-opne="false"  class="stockArrClick"  ';
                            html += ' alt=""  data-xu="' + i;
                            html += '"  data-utype="1" class="whItem_gu_more "></mip-img></div> ';
                        } else {
                            html += ' <div class="whItem_gu"> ';
                            html += ' <div class="left">谈及股票 ';
                            for (var m = 0; m < tjArr2.length; m++) {
                                html += ' <a href="/quotes/' + tjArr2[m].stockCode;
                                html += '" target="_blank">' + tjArr2[m].stockName + '&nbsp;</a>';
                            }
                            html += '</div>';
                        }
                    } else {
                        html += ' <div class="whItem_gu"> ';
                    }
                }
                html += '  <div class="clear"></div></div> ';
                html += ' <div class="mhq_RItem_view">';
                html += record[i].tops.viewNum + '人浏览&nbsp;/&nbsp;' + record[i].tops.replyNum + '条回复';
                html += '   </div>';
                html += '   </div>';
                html += '  <div class="mhq_GuItem_btns">';
                html += '  <div class="mhq_GuItem_btn zanBtn left  hotxinClick"  name="' + record[i].otherID;
                html += '"  data-type="' + record[i].rID + '"   data-utype="R">';
                html += '   <mip-img src="https://css.taoguba.com.cn/images/mNew/zan.png" class="left" alt=""></mip-img>';
                html += '   <span class="left">赞(' + record[i].usefulNum + ')</span>';
                html += '   </div>';
                html += '  <div class="mhq_GuItem_btn plBtn right  pltwr"  data-topic="' + record[i].otherID + '" >';
                html += '<span class="right">评论</span>';
                html += '  <mip-img src="https://css.taoguba.com.cn/images/mNew/pinglun.png" alt="" class="right"></mip-img>';
                html += '  </div><div class="clear"></div></div>';
            }
            html += ' </div>';
        }
        return html;
    }
    // 时间戳转化为年月日
    function timestampToTime(timestamp) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return Y + M + D + h + m;
    }

    function toupdateClick(type) {
        if (Number(type) === 1) {
            var fullCode = fullCodeTemp;
            $(window).scrollTop($('#zuiupdate', element2).offset().top - 50);
            uptodateOnclickXin(element2);
        } else {
            var fullCode = fullCodeTemp;
            $(window).scrollTop($('#zuihot', element2).offset().top - 50);
            uptodateOnclickRe(element2);
        }
    }

    function dropData(type, page, element) {
        var fullCode = fullCodeTemp;
        if (type === 'hot') {
            var url = '';
            url = '/uptodate?fullCode=';
            url += fullCodeTemp + '&type=r&pageNo=';
            url += page;
            asyncfun(url, XLuptodate, element, 'r');
        } else {
            var time = $('#zuiupdate', element).attr('data-time');
            var url = '';
            url = '/uptodate?fullCode=';
            url += fullCodeTemp + '&type=x&actionDate=';
            url += time;
            asyncfun(url, XLuptodate, element, 'x');
        }
    }

    function XLuptodate(data, element) {
        var record = data.dto.coolAttr.record;
        // 每页多少条
        var perPageNum = data.dto.perPageNum;
        var type = data.dto.type;
        if (record.length > 0) {
            // 下拉有数据
            var html = createMdata(record, perPageNum, element);
            $('#addMore_data', element).append(html);
            xlStatus = 'true';
        } else {
            if (tsStatus === 'false') {
                var type = $('#addMore_data', element).attr('data-type');
                if (type === 'hot') {
                    tsStatus = 'true';
                    $('#bottom_tit', element).html('<div class="center  center_div  toupdateClickMip"  data-type="1"'
                    + '><span class=" moreInfo_di">'
                    + '暂无更多热门讨论，进入“<span class="zuixin_p">最新</span>”查看全部讨论</span></div>');
                } else {
                    tsStatus = 'true';
                    $('#bottom_tit', element).html('<div class="center  center_div toupdateClickMip"  data-type="2"'
                    + '><span class=" moreInfo_di">暂无更多热门讨论，进入“'
                    + '<span class="zuixin_p">最热</span>”查看全部讨论</span></div>');
                }

            }
        }
    }
    // 跟帖主帖点赞
    function addUseful(rid, num, topic, flag) {
        isLogin();
        var dataUrl = $('.div_head_data', element2).attr('data-url');
        var url = dataUrl + 'mAddUseful?rid=' + rid
        + '&num=' + num + '&flag=' + flag + '&topicID=' + topic + '&pageNum=0';

        sendReq('get', url, '', getUseful);
    }
    function getUseful(obj) {
        var insertFlag = obj.dto.root;
        var str = insertFlag.value;
        if (str !== 'error') {
            if (str === 'lock') {
                var lockend = insertFlag.lockend;
                showMessage('抱歉由于您涉及恶意点赞行为，暂时不能点赞, 解除时间为：' + lockend);
            } else if (str === '999999') {
                showMessage('您投票速度太快了，请休息30秒以后再投票吧！');
            } else if (str === '999998') {
                showMessage('您不能投自己的票，让其他用户帮您投吧！');
            } else if (str !== '0') {
                var topic = insertFlag.flag;
                if (topic === 'T') {
                    // document.getElementById("topicUseful").innerHTML = "已赞";
                    showMessage('赞成功！');
                    var zanNum1 = $('#' + insertFlag.id).text();
                    var zanNum2 = Number(zanNum1) + 1;
                    $('#' + insertFlag.id).text(zanNum2);
                    $('#' + insertFlag.id).parent().css('background-color', '#ffb648');
                }
            } else {
                showMessage('您已点赞过了');
                return;
            }
        } else {
            showMessage('发生错误，请您联系股天乐');
            return;
        }
    }
    // 判断是否登录
    function isLogin() {
        var userID = $('.div_head_data', element2).attr('data-type');
        var ssoPath = $('.div_head_data', element2).attr('name');
        var isLogin = userID;
        if (Number(isLogin) === 0) {
            window.top.location.href = ssoPath + '/m/login/index';
        } else {
            return;
        }
    }
    // 帖子评论
    function articleMopenAPP(topicID, replyID) {
        // 判断当前位Android 还是iOS
        var u = navigator.userAgent;
        var app = navigator.appVersion;
        // g
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        // ios终端
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
                } else {
                    window.close();
                }
            },
            25);
            if (Number(topicID) === 0) {
                window.top.location.href = 'taoguba://taoguba.com.cn';
            } else {
                isLogin();
                if (Number(replyID) === 0) {
                    window.top.location.href = 'taoguba://app.topic/openTopic?topicId=' + topicID;
                } else {
                    window.top.location.href = 'taoguba://app.topic/openTopic?topicId=' + topicID + '&replyId=' + replyID;
                }
            }

        }
        if (isIOS) {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
                } else {
                    window.close();
                }
            },
            25);
            if (Number(topicID) === 0) {
                window.top.location.href = 'tgbiosapp://';
            } else {
                isLogin();
                window.top.location.href = 'tgbiosapp://?type=openTopic&topicId=' + topicID + '&replyId=' + replyID;
            }
        }

    }
    function stockArr(obj, id, type, first) {
        var Isopen = $(obj).attr('data-open');
        if (Isopen === 'true') {
            if (Number(type) === 0) {
                $('#stockArr' + id, element2).css('display', 'none');
                $('#openStock' + id, element2).css('display', 'inline');
            } else {
                $('#RstockArr' + id, element2).css('display', 'none');
                $('#RopenStock' + id, element2).css('display', 'inline');
            }
            $(obj).attr('data-open', 'false');
            $(obj).attr('src', 'https://css.taoguba.com.cn/images/mNew/zhankai3.png');
        } else {
            // alert(id);
            if (Number(type) === 0) {
                $('#stockArr' + id, element2).css('display', 'inline');
                $('#openStock' + id, element2).css('display', 'none');
            } else {
                $('#RstockArr' + id, element2).css('display', 'inline');
                $('#RopenStock' + id, element2).css('display', 'none');
            }
            $(obj).attr('data-open', 'true');
            $(obj).attr('src', 'https://css.taoguba.com.cn/images/mNew/shouqi3.png');
        }
    }

    function addWeiboUseful(feedID) {
        var dataUrl = $('.div_head_data', element2).attr('data-url');
        var url = dataUrl + 'addWeiboUseful?feedID=' + feedID + '&flag=W' + '&callback=?';
        sendReq('get', url, '',
        function (json) {
            var flag = json.dto.result;
            if (flag === 'lockend') {
                var lockend = json.lockend;
                showMessage('抱歉由于您涉及恶意点赞行为，暂时不能点赞, 解除时间为：' + lockend);
            } else if (flag === '0') {
                showMessage('系统错误！');
            } else if (flag === '999999') {
                showMessage('您投票速度太快了，请休息30秒以后再投票吧！');
            } else if (flag === '999998') {
                showMessage('您不能投自个的票，让其他用户帮您投吧，谢谢。');
            } else if (Number(flag) < 100000 && Number(flag) > 0) {
                showMessage('点赞成功，说说赞加1');
                var getLink = document.getElementById('a_useful_' + feedID);
                if (getLink !== null) {
                    getLink.innerHTML = '赞(' + flag + ')';
                }
            } else if (flag === '10000086') {
                showMessage('账号被封，无法点赞。');
            } else {
                showMessage('您已经投过票了，一个ID对同一信息内容只允许投一票，谢谢');
                return;
            }
        });
    }
    function showMessage(msg) {
        $('#message', element2).show().text(msg);
        setTimeout(function () {
            $('#message', element2).hide();
        },
        2000);
    }
    return customElement;
});