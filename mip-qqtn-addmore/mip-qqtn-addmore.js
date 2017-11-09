/**
 * @file mip-qqtn-addmore
 * 增加点击加载内容，并且根据h1标签的标题是否包含下拉关键字，下拉的数据是否有置顶属性，来进行排序。mip的下拉无法满足需求。该接口页码和接口网址通过模版获取，接口网址为https.,=========划重点-----经线上测试，firstinviewcallback无法触发，必须使用build，必须使用build，必须使用build，必须使用build，否则没有效果。请通过=======
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var fileid = $('.f-information').attr('data-id');
    function addmorelist() {
        var pageCount = 0;
        var pageData = {};
        var p = $('.f-addmore').attr('data-page');
        var ajaxUrl = $('.f-addmore').attr('data-topdateurl');
        var add1 = '<section class="g-cms-relatedcms"><dl class="g-title"><dt>猜你喜欢</dt>';
        add1 += '<dd></dd></dl><ul class="m-tuwen-new" id="f-tuwen"></ul></section>';
        var add2 = '<div class="f-moreadd" style="height: 36px; line-height:36px;';
        add2 += 'text-align:center; font-size:16px; color:#666">点击加载更多..</div>';
        function showMore() {
            $('.f-addmore').prepend(add1);
            $('#f-tuwen').after(add2);
        }
        function pushNews(data, i, newPageData) {
            var tempData = pageData;
            if (newPageData) {
                tempData = newPageData;
            }
            tempData.nKeys.push(data.nKeys[i]);
            tempData.UrlPath.push(data.UrlPath[i]);
            tempData.addtime.push(data.addtime[i]);
            tempData.nImages.push(data.nImages[i]);
            tempData.nImgNum.push(data.nImgNum[i]);
            tempData.nResID.push(data.nResID[i]);
            tempData.nding.push(data.nding[i]);
            tempData.ndingday.push(data.ndingday[i]);
            tempData.ndingtime.push(data.ndingtime[i]);
            tempData.ntitle.push(data.ntitle[i]);
        }
        function sortData(title, data) {
            var nKeysObj = data.nKeys;
            var history = [];
            for (var i = 0; i < nKeysObj.length; i++) {
                var key = nKeysObj[i];
                var keys = key.split(',');
                for (var j = 0; j < keys.length; j++) {
                    if (title.indexOf(keys[j]) !== -1) {
                        pushNews(data, i);
                        history.push(i);
                        break;
                    }
                }
            }
            for (var i = 0; i < nKeysObj.length; i++) {
                var flag = true;
                for (var j = 0; j < history.length; j++) {
                    if (i === history[j]) {
                        flag = false;
                    }
                }
                if (flag) {
                    pushNews(data, i);
                }
            }
            var newPageData = {
                'nKeys': [],
                'UrlPath': [],
                'addtime': [],
                'nImages': [],
                'nImgNum': [],
                'nResID': [],
                'nding': [],
                'ndingday': [],
                'ndingtime': [],
                'ntitle': []
            };
            history = [];
            var nKeysObj = pageData.nKeys;
            for (var i = 0; i < nKeysObj.length; i++) {
                var nding = pageData.nding[i];
                var ndingtime = pageData.ndingtime[i];
                if (nding === 1) {
                    var dingdate = new Date(ndingtime);
                    var date = new Date();
                    if (dingdate.getTime() > date.getTime()) {
                        history.push(i);
                        pushNews(pageData, i, newPageData);
                    }
                }
            }
            for (var i = 0; i < nKeysObj.length; i++) {
                var flag = true;
                for (var j = 0; j < history.length; j++) {
                    if (i === history[j]) {
                        flag = false;
                    }
                }
                if (flag) {
                    pushNews(pageData, i, newPageData);
                }
            }
            pageData = newPageData;
        }
        function getPageData() {
            var newPageData = {
                'nKeys': [],
                'UrlPath': [],
                'addtime': [],
                'nImages': [],
                'nImgNum': [],
                'nResID': [],
                'nding': [],
                'ndingday': [],
                'ndingtime': [],
                'ntitle': []
            };
            var n = 0;
            for (var i = (0 + pageCount) * 5; i < pageData.nResID.length; i++) {
                pushNews(pageData, i, newPageData);
                n++;
                if (n >= 5) {
                    break;
                }
            }
            return newPageData;
        }
        function showHtml() {
            var objJson = getPageData();
            if (objJson.nResID.length === 0) {
                $('.f-moreadd').hide();
                return;
            }
            var html = '';
            for (var i = 0; i < objJson.nResID.length; i++) {
                var uimg = objJson.nImages[i].split(',');
                var imglist = '';
                if (objJson.UrlPath[i].split('/')[4] !== fileid) {
                    for (var m = 0; m < uimg.length; m++) {
                        imglist += '<i><mip-img src="' + uimg[m] + '"></mip-img></i>';
                    }
                    html += '<li class="g-imgnum-' + objJson.nImgNum[i] + '">';
                    html += '<a href="' + objJson.UrlPath[i] + '" class="g-cd-left"><mip-img src="' + uimg[0] + '" >';
                    html += '</mip-img></a><a href="' + objJson.UrlPath[i] + '" class="g-cd-right">';
                    html += '<strong>' + objJson.ntitle[i] + '</strong>';
                    html += '<b>' + imglist + '</b><em><i>' + objJson.addtime[i] + '</i></em></a>';
                    html += '</li>';
                }
            }
            $('#f-tuwen').append(html);
        }
        function addNews() {
            var ntitle = $('h1').text();
            var newapp = ajaxUrl;
            fetch(newapp)
            .then(function (res) {
                    return res.text();
                }).then(function (data) {
                    var data = (new Function('', 'return' + data))();
                    pageData = {
                        'nKeys': [],
                        'UrlPath': [],
                        'addtime': [],
                        'nImages': [],
                        'nImgNum': [],
                        'nResID': [],
                        'nding': [],
                        'ndingday': [],
                        'ndingtime': [],
                        'ntitle': []
                    };
                    sortData(ntitle, data);
                    showHtml();
                }).catch(function (err) {
                });
        }
        showMore();
        addNews();
        $('.f-moreadd').click(function () {
            pageCount++;
            showHtml();
            return false;
        });
    }
    customElement.prototype.build = function () {
        addmorelist();
    };
    return customElement;
});
