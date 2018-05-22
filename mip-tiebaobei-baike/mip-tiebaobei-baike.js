/**
 * @file mip-tiebaobei-baike 组件
 * @author weiss
 */
define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        // var ext = {};
        // var getExtdata = function () {
        //     var extdata = {};
        //     $('script.json-inline').each(function (i, ele) {
        //         var name = $(ele).attr('data-name');
        //         var value = $(ele).text();
        //         extdata[name] = JSON.parse(value);
        //     });
        //     return extdata;
        // };
        // ext = getExtdata();
        // var jumpHtmlUrl = ext.info.jumpHtmlUrl;
        var script = this.element.querySelector('script[type="application/json"]');
        var textContent = JSON.parse(script.textContent);
        var jumpHtmlUrl = textContent.jumpHtmlUrl;


        var pPoints = function (key, pagePlate, buttonName, href) {
            if (href) {
                window.top.location.href = href;
                // var hasCalled = false;
                // setTimeout(track_a_click,1000);
                // function track_a_click(){
                //     if(!hasCalled){
                //         hasCalled = true;
                //         window.location.href = href;
                //     }
                // }
                // sa.track( key, {
                //     page_plate      : pagePlate,
                //     button_name     :  buttonName
                // },track_a_click);
            }
            else {
                // sa.track( key, {
                //     page_plate      : pagePlate,
                //     button_name     :  buttonName
                // });
            }
        };
        var baikeGetRequest = function (ajaxParams, callback) {
            var urlStr = ajaxParams.url;
            $.ajax({
                url: urlStr,
                type: 'post',
                data: ajaxParams.data,
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader('client', 'm');
                    request.setRequestHeader('version', '2400');
                },
                success: function (result) {
                    callback && callback(result);
                },
                error: function (result) {
                    // alert("错误提示");
                }
            });
        };
        $(function () {
            // 百科获取类型列表
            baikeGetRequest({url: textContent.esjTypeListUrl}, function (result) {
                // console.log(result);
                if (parseInt(result.ret, 10) === 0) {
                    var data = {};
                    // 类型
                    data.typeList = result.data;
                    // var typeHtml = template("typeListScript",data);
                    // console.log(data.typeList)
                    var typeHtml = '';
                    for (var k = 0; k < data.typeList.length; k++) {
                        if (k === 0) {
                            typeHtml += '<li class="act" data-id="' + data.typeList[k].id + '">';
                        }
                        else {
                            typeHtml += '<li data-id="' + data.typeList[k].id + '">';
                        }
                        typeHtml += data.typeList[k].name + '</li>';
                    }
                    ele.find('#typeList').html(typeHtml);
                    // 二级分类
                    data.subTypeList = result.data;
                    // data.subTypeList.url = jumpHtmlUrl;
                    // var subTypeHtml = template("subTypeListScript", data);
                    // console.log(data.subTypeList)
                    var subTypeHtml = '';
                    for (var i = 0; i < data.subTypeList.length; i++) {
                        if (i === 0) {
                            subTypeHtml += '<div class="item act">';
                        }
                        else {
                            subTypeHtml += '<div class="item">';
                        }
                        for (var j = 0; j < data.subTypeList[i].items.length; j++) {
                            if (j < 3) {
                                var bObj = {
                                    oba: data.subTypeList[i].items[j].items.id,
                                    obb: data.subTypeList[i].items[j].name,
                                    obc: data.subTypeList[i].name,
                                    obd: data.subTypeList[i].items[j].items.name
                                };
                                subTypeHtml += '<a href=' + jumpHtmlUrl + 'baikeDetail.html?newsId=';
                                subTypeHtml += bObj.oba + '&newsType=N';
                                subTypeHtml += '&newsTxtType=' + bObj.obb + '&newsParTxtType=' + bObj.obc + '>';
                                subTypeHtml += '<em>[' + bObj.obb + ']</em>' + bObj.obd + '</a>';
                            }
                        }
                        subTypeHtml += '</div>';
                    }
                    ele.find('#subTypeList').html(subTypeHtml);
                }
            });
            ele.find('#typeList').on('click', 'li', function () {
                var th = $(this);
                var index = th.index();
                ele.find('#typeList li').removeClass('act');
                th.addClass('act');
                ele.find('#subTypeList .item').removeClass('act').eq(index).addClass('act');
                pPoints('E4', '铁甲百科', th.text());
            });
            // 更多按钮
            ele.find('.baike-wrap .m-header a').eq(0).click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                pPoints('E4', '铁甲百科', '铁甲百科更多', $(this).attr('href'));
            });
            // a标签点击
            ele.find('#subTypeList').on('click', 'a', function (e) {
                e.preventDefault();
                e.stopPropagation();
                pPoints('E4', '铁甲百科', '铁甲百科详情链接', $(this).attr('href'));
            });
        });
    };
    return customElement;
});
