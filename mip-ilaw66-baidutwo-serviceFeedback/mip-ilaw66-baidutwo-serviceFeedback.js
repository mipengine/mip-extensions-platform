/**
 * @file mip-ilaw66-baidutwo-serviceFeedback 组件
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

        // 先选出 textarea 和 统计字数 dom 节点

        var textArea = $el.find('#wordCount textarea');
        var word = $el.find('#wordCount .word');
        var sessionId = getQueryString('sessionId');
        //      setTimeout(function () {
        //          sessionId = $el.find('#sesiid').html();
        //          console.log(sessionId);
        //      }, 1000);
        // 调用
        statInputNum(textArea, word);

        $el.find('.serviceFeedback_topay').click(function () {

            var csrfToken = $el.find('#_csrf').val();
            var textval = textArea.val();

            if (textval.length < 1) {

                tipfc('请写下您的意见或建议，再提交');
                return;
            }

            // 调用接口传输数据
            $.ajax({
                type: 'POST',
                url: 'userFeedBack?opinion=' + textval + '&_csrf=' + csrfToken + '&sessionId=' + sessionId,
                success: function (data) {
                    if (data === 'OK') {
                        tipfc('感谢反馈，我们将严谨核实与处理');
                        setTimeout(function () {
                            location.href = 'mipilaw66baidu_couponPay?requestId=' + getQueryString('requestId')
                            + '&questionType=' + getQueryString('questionType') + '&sessionId=' + sessionId;
                        }, 2000);
                    }
                    else if (data === 'ERROR') {
                        tipfc('提交失败');
                    }

                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        });
        $el.find('.serviceFeedback_toindex').click(function () {
            tipfc('感谢反馈，我们将严谨核实与处理');
            setTimeout(function () {
                location.href = './';
            }, 2000);
        });
        function tipfc(content) {
            $el.find('.toortip ').show();
            $el.find('.toortip .tip').html(content);
            setTimeout(function () {
                $el.find('.toortip ').hide();
            }, 1500);
        }

        /*
         * 剩余字数统计
         * 注意 最大字数只需要在放数字的节点哪里直接写好即可 如：<var class="word">200</var>
         */
        function statInputNum(textArea, numItem) {
            var max = 300;
            var curLength;
            textArea[0].setAttribute('maxlength', max);
            curLength = textArea.val().length;
            numItem.text(curLength);
            textArea.on('input propertychange', function () {
                var Value = $(this).val().replace(/[\r\n]/g, '  ').replace(/\n/gi, '');
                // numItem.text(max - Value.length);
                numItem.text(Value.length);
                console.log(Value + ':' + Value.length);
            });
        }

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
