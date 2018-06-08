/**
 * @file mip-alading-interaction 组件
 * @author
 */

define(function (require) {
    var customEle = require('customElement').create();
    var $ = require('jquery'); // 引入jq
    customEle.prototype.firstInviewCallback = function () {

        var shiche = 'false'; // 记录是车还是人
        var mianjian = 'true'; // 记录是免检还是没有免检
        var weizhang = 'true'; // 记录有违章还是没违章
        var baofei = 'true'; // 是否达到报废条件
        var chaxun = 'true'; // 查询是否有结果
        var weihu = 'false'; // 查询系统是否维护中
        var a = $(this.element).find('.bottom1_right');
        var b = $(this.element).find('#staus_right'); // 正常或达到报废标准的显示文本
        var c = $(this.element).find('#license');
        var d = $(this.element).find('#idcard');
        var e = $(this.element).find('#id_staus_right'); // 驾驶人证的正常或违规未处理的显示文本
        var f = $(this.element).find('.cxjgresult');
        var g = $(this.element).find('.ljblwz'); // 无违章时立即办理违章处灰色
        var h = $(this.element).find('#noerror'); // 维护时不显示车牌等信息
        var i = $(this.element).find('#haserror'); // 违章中时的信息
        var j = $(this.element).find('.noresult'); // 没有查询结果时显示这个
        var close = $(this.element).find('.close')[0];
        var cancel = $(this.element).find('#cancel');
        var modal = $(this.element).find('#modal');
        if (mianjian === 'true') {
            $(a[0]).hide();
        }
        if (baofei === 'true') {
            b.html('达到报废标准公告牌证作废');
        }
        if (shiche === 'true') {
            c.show();
            d.hide();
            $(f[0]).show();
            $(f[1]).hide();
        }
        if (shiche === 'false') {
            c.hide();
            d.show();
            $(f[0]).hide();
            $(f[1]).show();
        }
        if (chaxun === 'false') {
            $(f).hide();
            $(j).show();
        }
        if (weizhang === 'false') {
            $(g[0]).css('background', 'rgba(229,229,229,1)');
            $(g[0]).css('color', 'rgba(51,51,51,0.2)');
        }
        if (weihu === 'false') {
            $(h).css('display', 'block');
        }
        if (weihu === 'true') {
            $(i).css('display', 'block');
        }

        this.addEventAction('custom_event', function (event/* 对应的事件对象 */, str /* 事件参数 */) {
            console.log(event);
            if (event.path[1].id === 'delete') {
                modal.show();
            }
            if (event.target.id === 'sure') {
                modal.hide();
            }
            if (event.target.id === 'cancel') {
                modal.hide();
            }
        });
    };
    return customEle;
});
