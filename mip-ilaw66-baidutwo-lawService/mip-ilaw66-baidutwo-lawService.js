/**
 * @file mip-ilaw66-baidutwo-lawService 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);

        var demand = [0, 0, 0, 0, 0];
        $el.find('.lawservice_div').click(function () {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                flagParam($(this).data('serviceid'), true);
            }
            else {
                flagParam($(this).data('serviceid'), false);
            }
            //      console.log(demand);
        });
        $el.find('.lawservice_commit').click(function () {
            if (!checkParam()) {
                //          toastOr("请选择您需要的服务，再提交");
                tipfc('请选择您需要的服务，再提交');
                return;
            }

            //      console.log(getQueryString("requestId"));
            commitParam();
        });
        function tipfc(content) {
            $el.find('.toortip ').show();
            $el.find('.toortip .tip').html(content);
            setTimeout(function () {
                $el.find('.toortip ').hide();
            }, 1500);
        }
        function commitParam() {
            //      var param = {
            //          serviceId: getQueryString("requestId"),
            //          suitUserdemand: demand[0],
            //          meetUserdemand: demand[1],
            //          letterUserdemand: demand[2],
            //          contractUserdemand: demand[3]
            //      };
            $.ajax({
                type: 'POST',
                url: 'saveConsultingSummary?serviceId='
                    + getQueryString('requestId') + '&suitUserdemand=' + demand[0]
                    + '&meetUserdemand=' + demand[1] + '&letterUserdemand=' + demand[2]
                    + '&contractUserdemand=' + demand[3],
                //          data: param,
                success: function (data) {
                    if (data.status === 'OK') {
                        //                  toastOr("提交成功");
                        tipfc('提交成功');
                        setTimeout(function () {
                            window.top.location.href = 'comment?requestId=' + getQueryString('requestId')
                            + '&questionType=' + getQueryString('questionType');
                        }, 2000);
                    }

                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        //                  window.location.reload();
                    }

                }
            });
        }
        function checkParam() {
            var t = false;
            demand.forEach(function (item) {
                if (item === 1) {
                    t = true;
                }

            });
            return t;
        }
        function flagParam(param, flg) {
            if (flg) {
                demand[param] = 1;
            }
            else {
                demand[param] = 0;
            }
        }
        // 解析url参数值
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }
    };

    return customElement;
});
