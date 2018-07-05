/**
 * @file mip-alading-interaction 组件
 * @author
 */

define(function (require) {
    function getUrlParam(name) { // 用于获取url的参数后置参数
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null; // 返回参数值
    }
    var customEle = require('customElement').create();
    var $ = require('zepto');// 引入zepto
    customEle.prototype.firstInviewCallback = function () {
        // var baseUrl = 'http://test.xx-motor.com/';
        var baseUrl = 'https://yz-alipay.fundway.net/';
        var reg = /[^0-9a-zA-Z]/g;
        var reg1 = /[0-9a-zA-Z]/g;
        var shiche = ''; // 记录是车还是人
        var mianjian = 'false'; // 记录是免检还是没有免检
        // var weizhang = 'true';  记录有违章还是没违章
        var newsture = ''; // 记录查询信息是否有误 true为信息正确，false为信息错误
        var baofei = 'true'; // 是否达到报废条件
        var chaxun = 'none'; // 查询是否有结果
        var weihu = 'false'; // 查询系统是否维护中
        var chaxuned = 'false'; // 记录是否查询过
        var a = $(this.element).find('.bottom1_right'); // 六年免检按钮
        var b = $(this.element).find('#staus_right'); // 正常或达到报废标准的显示文本
        var c = $(this.element).find('#license');
        var d = $(this.element).find('#idcard');
        var e = $(this.element).find('#id_staus_right'); // 驾驶人证的正常或违规未处理的显示文本
        var f = $(this.element).find('.cxjgresult');
        var myorder = $(this.element).find('.ckwddd');
        var g = $(this.element).find('.ljblwz'); // 无违章时立即办理违章处灰色
        var h = $(this.element).find('#noerror'); // 维护时不显示车牌等信息
        var i = $(this.element).find('#haserror'); // 违章中时的信息
        var j = $(this.element).find('.noresult'); // 没有查询结果时显示这个
        var k = $(this.element).find('#carid'); // 显示行驶证的地方
        var l = $(this.element).find('#id_carid'); // 显示驾驶证的地方
        var m = $(this.element).find('.weizhangcishu');
        var n = $(this.element).find('.fakuanshu');
        var o = $(this.element).find('.koufenshu');
        var p = $(this.element).find('.tyyxqz');
        var q = $(this.element).find('.qzbfsj');
        var r = $(this.element).find('#leijijifen');
        var s = $(this.element).find('.cxjg');
        var t = $(this.element).find('#carid');
        var u = $(this.element).find('.chufajuedingshu');
        var v = $(this.element).find('#tip1');
        var bottom = $(this.element).find('#fix_bottom');
        var modal = $(this.element).find('#modal');
        var but = $(this.element).find('.bottom1_right');
        var newsfalsetip = $(this.element).find('#newerror'); // 驾驶证查询信息错误时显示这个
        var newsfalsetip2 = $(this.element).find('#newerror2'); // 机动车证查询信息错误时显示这个
        var options = {headers: {'X-CLIENT-SOURCE': escape('百度'),
        'X-CHANNEL-ID': '4291', 'X-CHANNEL-NAME': escape('百度阿拉丁')}};
        // 如果能获取到驾驶证号则使用驾驶证接口
        if (getUrlParam('license_no')) {
            getUrlParam('file_no');
            fetch('https://gdjmt.gdsecurity.cn:8081/jmt-api/aladdin/getLicenseInfo?license_no='
                + getUrlParam('license_no') + '&file_no='
                + getUrlParam('file_no'), options).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    // console.log(res);
                    shiche = 'false';
                    console.log(res.errcode);
                    if (res.errcode === 0) {
                        d.show();
                        myorder.show();
                        g.show();
                    }
                    if (res.errcode === -200) {
                        $(h).css('display', 'none');
                        newsfalsetip.show();

                    }
                    var realLicense =  res.result.license_no.replace(reg, '');
                    var licenseLength = realLicense.length;
                    var one = realLicense.substring(0, licenseLength - 10);
                    var two = realLicense.substring(licenseLength - 10, licenseLength - 1).replace(reg1, '*');
                    var three = realLicense.substring(licenseLength - 1);
                    var chulied = one.concat(two, three);
                    e.html(res.result.status);
                    l.html(chulied);
                    m.html(res.result.undeal_count);
                    n.html(res.result.undeal_amount_of_money);
                    o.html(res.result.undeal_amount_of_score);
                    p.html('审核有效期：' + res.result.check_date);
                    q.html('下次体检日期：' + res.result.valid_date);
                    r.html('累计记分：' + res.result.ljjf + '分');
                    v.html('是否确定清除驾驶人信息');
                    if (res.result_set.length > 0) {
                        chaxun = 'true';
                        $(s).css('display', 'inline-block');
                        $(f).show();
                        var divdom = '';
                        for (var a = 0; a < res.result_set.length; a++) {
                            divdom = divdom + '<div class="eachresult"><div class="cxjgitem_1">'
                            + res.result_set[a].cljgmc
                            + '</div>' + '<div class="cxjgfgx"></div>'
                            + '<div class="weifadetail"><div class="weifashijian">'
                            + '<div class="time_left_item">违法时间</div>'
                            + '<div class="time_right_item">' + res.result_set[a].wfsj
                            + '</div></div><div class="weifadizhi">'
                            + '<div class="address_left_item">违法地址</div>'
                            + '<div class="address_right_item">' + res.result_set[a].wfdz
                            + '</div></div><div class="weifaxingwei">'
                            + '<div class="behavior_left_item">违法行为</div>'
                            + '<div class="behavior_right_item">' + res.result_set[a].wfxw
                            + '</div></div>'
                            + '<div class="fakuanjine"><div class="jine_left_item">罚款金额</div>'
                            + '<div class="jine_right_item">'
                            + '<strong class="amount">' + res.result_set[a].fkje + '</strong>元</div></div>'
                            + '<div class="weijijifen"><div class="jifen_left_item">违纪记分</div>'
                            + '<div class="jifen_right_item"><strong class="amount">' + res.result_set[a].wfjfs
                            + '</strong>分</div></div>' + '<div class="zhinajin">'
                            + '<div class="zhinajin_left_item">滞纳金</div>'
                            + '<div class="zhinajin_right_item"><strong class="amount">'
                            + res.result_set[a].znj + '</strong>元</div>'
                            + '</div><div class="juedingshubianhao">'
                            + '<div class="juedingshu_left_item">决定书编号</div><div class="juedingshu_right_item">'
                            + res.result_set[a].jdsbh + '</div></div></div></div>';
                              // divdom = divdom + divdom;
                            $(f[0]).html(divdom);
                        }
                    }
                    if (res.result_set.length === 0) {
                        $(g).css('background', 'rgba(229,229,229,1)');
                        $(g).css('color', 'rgba(51,51,51,0.2)');
                        chaxun = 'false';
                        $(u).html('查询车辆违章');
                        j.show();
                        $(s).css('display', 'inline-block');
                    }
                    if ($(document.body).height() + 50 > $(window).height()) {
                        $(bottom).css('position', 'inherit'); // 根据页面最大高度与当前窗口高度决定底部是否悬浮
                    }
                });
        }
        // 如果能获取
        if (getUrlParam('plate_no')) {
            getUrlParam('car_type');
            getUrlParam('eng_no');
            fetch('https://gdjmt.gdsecurity.cn:8081/jmt-api/aladdin/getCarInfo?plate_no='
                + getUrlParam('plate_no') + '&car_type='
                + getUrlParam('car_type') + '&eng_no='
                + getUrlParam('eng_no'), options).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    console.log(res.errcode);
                    if (res.errcode === 0) {
                        c.show();
                        myorder.show();
                        g.show();
                    }
                    if (res.errcode === -200) {
                        $(h).css('display', 'none');
                        newsfalsetip2.show();

                    }
                    t.html(res.result.hphm);
                    m.html(res.result.undeal_count);
                    n.html(res.result.undeal_amount_of_money);
                    o.html(res.result.undeal_amount_of_score);
                    b.html(res.result.status);
                    p.html('检验有效期至：' + res.result.valid_date);
                    q.html('强制报废时间：' + res.result.invalidated_date);
                    var divdom = '';
                    if (res.result_set.length > 0) {
                    // console.log('违法记录有' + res.result_set.length + '条');
                        chaxun = 'true';
                        $(s).css('display', 'inline-block');
                        $(f).show();
                        for (var a = 0; a < res.result_set.length; a++) {
                            divdom = divdom + '<div class="eachresult"><div class="cxjgitem_1">'
                            + res.result_set[a].cjjgmc + '</div>'
                            + '<div class="cxjgfgx"></div>' + '<div class="weifadetail"><div class="weifashijian">'
                            + '<div class="time_left_item">违法时间</div>'
                            + '<div class="time_right_item">'
                            + res.result_set[a].wfsj
                            + '</div></div><div class="weifadizhi">'
                            + '<div class="address_left_item">违法地址</div>'
                            + '<div class="address_right_item">'
                            +  res.result_set[a].wfdz
                            + '</div></div><div class="weifaxingwei">'
                            + '<div class="behavior_left_item">违法行为</div>'
                            + '<div class="behavior_right_item">'
                            + res.result_set[a].wfxw
                            + '</div></div>'
                            + '<div class="fakuanjine"><div class="jine_left_item">罚款金额</div>'
                            + '<div class="jine_right_item">'
                            + '<strong class="amount">'
                            + res.result_set[a].fkje
                            + '</strong>元</div></div>'
                            + '<div class="weijijifen"><div class="jifen_left_item">违纪记分</div>'
                            + '<div class="jifen_right_item"><strong class="amount">' + res.result_set[a].wfjfs
                            + '</strong>分</div></div></div></div>';
                             // divdom = divdom + divdom;
                            $(f[1]).html(divdom);
                        }
                    }
                    if (res.result_set.length === 0) {
                        $(g).css('background', 'rgba(229,229,229,1)');
                        $(g).css('color', 'rgba(51,51,51,0.2)');
                        chaxun = 'false';
                        $(u).html('我有处罚决定书');
                        j.show();
                        $(s).css('display', 'inline-block');
                    }
                    if ($(document.body).height() + 50 > $(window).height()) {
                        $(bottom).css('position', 'inherit');
                    }
                    // if (res.result.online === 1) {
                       //  but.css('display', 'block');
                    // }  第一版本不上6年免检 屏蔽6年免检按钮
                });
        }

        if (!getUrlParam('plate_no') && !getUrlParam('license_no')) {
            $(h).css('display', 'none');
            newsfalsetip.show();
        }
        if (mianjian === 'true') {
        }
        if (baofei === 'true') {
            b.html('达到报废标准公告牌证作废');
        }
        if (shiche === 'true') {
            // c.show();
            // d.hide();
          // $(f[0]).show();
          // $(f[1]).hide();
        }
        if (shiche === 'false') {
            /*c.hide();*/
            // d.show();
            // $(f[0]).hide();
            // $(f[1]).show();
        }
        if (chaxun === 'false') {
            $(j).show();
        }
        if (weihu === 'false') {
            $(h).css('display', 'block');
        }
        if (weihu === 'true') {
            $(i).css('display', 'block');
        }

        this.addEventAction('custom_event', function (event /* 对应的事件对象 */, str /* 事件参数 */) {
            // 不要用event做判断，IOS跟安卓不一样
            if (str === 'cxclwzOrwyjfjds') {  // ‘查询车辆违章’或者‘我有处罚决定’
                if (getUrlParam('license_no')) {
                    window.top.location.href = baseUrl + 'yzcw-web-admin/login/xmd/xmd_baidu_xzh/illegal_payment/auth';
                }
                if (getUrlParam('plate_no')) {
                    window.top.location.href = baseUrl
                    + 'yzcw-web-admin/login/xmd/xmd_baidu_xzh/site_illegal_payment/auth';
                }
            }
            if (str === 'delete') {  // 驾驶证/机动车证的右上角按钮
                modal.show();
            }
            if (str === 'ckwddd') { // 两种证的查看我的订单按钮都跳转到同一个页面
                window.top.location.href = baseUrl + 'yzcw-web-admin/login/xmd/xmd_baidu_xzh/myOrder/auth';
            }
            if (str === 'ljblwz') { // 两种证的立即办理违章跳转不同页面
                if (g[0].style.background === 'rgb(229, 229, 229)') { // 当没有违章时按钮是灰的,这个时候点击没用
                }
                else {
                    if (getUrlParam('license_no')) {
                        window.top.location.href = baseUrl
                        + 'yzcw-web-admin/login/xmd/xmd_baidu_xzh/site_illegal_payment/auth';
                    }
                    if (getUrlParam('plate_no')) {
                        var plateNo = getUrlParam('plate_no');
                        plateNo = plateNo.substr(0, 1) === '粤' ? plateNo : '粤' + plateNo;
                        window.top.location.href = baseUrl + 'yzcw-web-admin/login/'
                        + 'xmd/xmd_baidu_xzh/illegal_result/auth?'
                        + 'PLATENUMBER=' + plateNo + '&FDJH=' + getUrlParam('eng_no')
                        + '&PLATETYPE=' + getUrlParam('car_type');
                    }
                }
            }
            if (str === 'sure') {
                modal.hide();
                if (shiche === 'false') {
                    window.top.location.href = 'https://www.baidu.com/s?wd=驾驶人违法查询';
                }
                else
                {
                    window.top.location.href = 'https://www.baidu.com/s?wd=违章查询';
                }

            }
            if (str === 'inputagain') { // 当用户信息输入错误时点击重新输入
                if (getUrlParam('license_no')) {
                    window.top.location.href = 'https://www.baidu.com/s?wd=驾驶人违法查询';
                }
                else {
                    window.top.location.href = 'https://www.baidu.com/s?wd=违章查询';
                }
            }
            if (str === 'cancel') {
                modal.hide();
            }
            if (str === 'ckwddd') { // 这个没用了
                $(s).css('display', 'inline-block');
                if (chaxuned === 'false' && chaxun === 'false') {
                    j.show();
                }
                if (chaxuned === 'false' && chaxun === 'true') {
                    if (shiche === 'true') {
                        $(f[1]).show();
                        $(f[0]).hide();
                    }
                    if (shiche === 'false') {
                        $(f[1]).hide();
                        $(f[0]).show();
                    }
                }
            }
        });
    };
    return customEle;
});
