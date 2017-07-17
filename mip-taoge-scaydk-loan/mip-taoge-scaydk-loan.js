/**
 * @file mip-taoge-scaydk-loan 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var options;

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        options = {
            'screenId': element.getAttribute('screen-id') || 'screen',
            'loanContentId': element.getAttribute('loan-content-id') || 'loan_content',
            'boxId': element.getAttribute('box-id') || 'popup'
        };
        // 筛选弹框打开
        $('#' + options.screenId).click(function (event) {
            var b = $('#' + options.boxId);
            if (b.hasClass('show')) {
                b.removeClass('show').addClass('hidden');
            }
            else {
                var top = $('header').height() + $('div.cut').height() + 48;
                var wh = $(window).height();
                b.css({'top': top, 'height': wh - (top + 50)});
                b.removeClass('hidden').addClass('show');
                $(window).scroll(function () {
                    if ($(window).scrollTop() > 0) {
                        b.css({'top': 0, 'height': wh - 50});
                    }
                    else {
                        b.css({
                            'top': top,
                            'height': wh - (top + 50)
                        });
                    }
                });
            }
            event.stopPropagation();
        });
        // 选中或取消
        $('#' + options.boxId + ' > div.content > ul > li > ul > li').click(function (event) {
            if ($(this).hasClass('activ')) {
                $(this).removeClass('activ');
            }
            else {
                $(this).addClass('activ');
                // $(this).addClass('activ').siblings().removeClass('activ');
            }
            event.stopPropagation();
        });
        // 重置
        $('#pop-up-loan-bottom-reset').click(function (event) {
            $('#' + options.boxId + ' > div.content > ul > li > ul > li').removeClass('activ');
            event.stopPropagation();
        });
        // 确定
        $('#pop-up-loan-bottom-ok').click(function (event) {
            $('#' + options.boxId).removeClass('show').addClass('hidden');
            // 筛选业务逻辑写这里...
            // var $fields = ['loan_type', 'loan_term', 'loan_amount', 'repayment_type'];
            var data = {
                'loan_type': new function () {
                    var arr = [];
                    $('#loan_type').find('li.activ').each(function () {
                        arr.push($(this).attr('data-id'));
                    });
                    return arr;
                },
                'loan_term': new function () {
                    var arr = [];
                    $('#loan_term').find('li.activ').each(function () {
                        arr.push($(this).attr('data-id'));
                    });
                    return arr;
                },
                'loan_amount': new function () {
                    var arr = [];
                    $('#loan_amount').find('li.activ').each(function () {
                        arr.push($(this).attr('data-id'));
                    });
                    return arr;
                },
                'repayment_type': new function () {
                    var arr = [];
                    $('#repayment_type').find('li.activ').each(function () {
                        arr.push($(this).attr('data-id'));
                    });
                    return arr;
                }
            };
            var url = getBaseUrl() + '/mip/Article/loan.html';
            var ajaxTimeoutTest = $.ajax({
                type: 'POST',
                timeout: 3000,
                url: url,
                data: data,
                success: function (result) {
                    $('#' + options.loanContentId + ' > table > tbody').empty().html(result);
                    $('#' + options.loanContentId + ' > div.bottom').hide();
                },
                complete: function (XMLHttpRequest, status) {
                    if (status === 'timeout') {
                        ajaxTimeoutTest.abort();
                        // console.log('请求超时');
                    }
                },
                dataType: 'json'
            });
            event.stopPropagation();
        });
    };
    // 当前域名
    function getBaseUrl() {
        // protocol 属性是一个可读可写的字符串，可设置或返回当前 URL 的协议,所有主要浏览器都支持 protocol 属性
        var ishttps;
        if ('https:' === document.location.protocol) {
            ishttps = true;
        }
        else {
            ishttps = false;
        }
        var url = window.location.host;
        if (ishttps) {
            url = 'https://' + url;
        }
        else {
            url = 'http://' + url;
        }
        return url;
    }

    return customElement;
});
