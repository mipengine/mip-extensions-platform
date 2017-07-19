/**
 * @file mip-taoge-scaydk-calculator 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // select选中事件
        $('div.LoanCalcu div.col-xs-12 div.row select').change(function (e) {
            var t = $(this).find('option').not(function () {
                return !this.selected;
            }).text();
            $(this).prev().find('p').text(t);
        });
        // 计算器
        toolBox();
    };
    // 贷款计算器
    function toolBox() {
        // 贷款方式选择时
        $('#LoanCalcu_mode').change(function () {
            var selec = $(this).val();
            $('#LoanCalcu_interest').val(selec / 100);
        });
        // 计算
        $('#LoanCalcu_tool').click(function () {
            var stillMode = $('#still_mode').val();
            // 还款方式
            var mode = parseFloat($('#LoanCalcu_mode').val());
            // 贷款类型
            var loan = parseFloat($('#LoanCalcu_loan').val());
            // 贷款金额
            var interest = parseFloat($('#LoanCalcu_interest').val() / 100);
            // 月利率
            var time = parseFloat($('#LoanCalcu_time').val());
            // 贷款时间
            if (stillMode === '-1') {
                error('请选择还款方式');
                return false;
            }
            if (mode === '-1') {
                error('请选择贷款方式');
                return false;
            }
            if (time === '-1') {
                error('请输入偿还期限');
                return false;
            }
            if (loan === '') {
                error('请输入贷款金额');
                return false;
            }
            if (interest === '') {
                error('请输入月利率');
                return false;
            }
            if (stillMode === '等额本息') {
                // =(B4*C4*(1+C4)^D4)/((1+C4)^D4-1)
                // 月供=〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕
                var b4 = loan;
                var c4 = interest;
                var c41 = 1 + c4;
                // 方
                var bx1 = Math.pow(c41, time);
                // 月供
                var month = ((b4 * c4 * bx1) / (bx1 - 1)).toFixed(2);
                // 总利息=【〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕】*还款月数-贷款本金
                // 总利息
                var gross = (month * time - loan).toFixed(2);
                $('#LoanCalcu_num').val((parseFloat(loan) + parseFloat(gross) - parseFloat(loan)).toFixed(2));
                $('#LoanCalcu_num1').val(month);
            }
            else {
                // 总利息=〔(贷款本金÷还款月数+贷款本金×月利率)+贷款本金÷还款月数×(1+月利率)〕÷2×还款月数-贷款本金
                var bx55 = (((loan / time + loan * interest) + loan / time * (1 + interest)) / 2 * time - loan)
                    .toFixed(2);
                // 月均月供=【〔(贷款本金÷还款月数+贷款本金×月利率)+贷款本金÷还款月数×(1+月利率)〕÷2×还款月数-贷款本金+贷款本金】/还款期数
                var month1 = ((parseFloat(bx55) + parseFloat(loan)) / time).toFixed(2);
                $('#LoanCalcu_num').val((parseFloat(loan) + parseFloat(bx55) - parseFloat(loan)).toFixed(2));
                $('#LoanCalcu_num1').val(month1);
            }
        });
        $('#LoanCalcu_reset').click(function () {
            $(this).parents('div.tag.LoanCalcu').find('select').prop('selectedIndex', 0);
            $(this).parents('div.tag.LoanCalcu').find('input').val('');
            $(this).parents('div.tag.LoanCalcu').find('div > div > div.col-xs-7 > p').text('');
        });
    }

    // 错误信息
    function error(msg) {
        alert(msg);
    }

    return customElement;
});
