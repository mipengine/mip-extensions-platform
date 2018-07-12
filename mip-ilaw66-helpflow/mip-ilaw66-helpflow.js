/**
 * @file mip-ilaw66-helpflow 组件
 * @author
 */
// preferential_helpflow
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var preferentiallistDate;
        if (window.appBridge && window.appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
            window.appBridge.changeWebviewTitle('超值优惠');
        }

        // 各项目区分颜色
        var channel = localStorage.getItem('channel');
        if (channel === 'eleme') {
            $el.find('.header_block').css('background', '#089EFF');
        }
        else if (channel === 'mmbang' || channel === 'hers') {
            if (channel === 'mmbang') {
                $el.find('.header_block').css('margin-top', '48px');
            }

            $el.find('.header_block').css('background', '#ff6191');
        }
        else if (channel === 'weixin' || channel === 'onstar' || channel
        === 'falv' || channel === 'jbh' || channel === 'linjia') {
            $el.find('.header_block').css('background', '#ff6100');
            $el.find('.header_block').css('color', '#fff');
            $el.find('.glyphicon-menu-left').css('color', '#fff');
        }
        else if (channel === 'WxiaoApp' || channel === 'fengniao' || channel === 'fengniaozb') {
            if (channel === 'WxiaoApp') {
                $el.find('.header_block').hide();
            }
            else {
                $el.find('.header_block').css('background', '#5C7DC0');
            }
        }
        else if (channel === 'dayima') {
            $el.find('.top_header,.header_block').css('background', '#fff');
            $el.find('.div_header,.glyphicon-menu-left:before,.glyphicon,.header_block')
            .css('color', '#000');
        }
        else if (channel !== 'cmbc') {
            $el.find('.header_block').css('background', '#ff6100');
        }

        if (channel === 'winbaoxian') {
            $el.find('.header_block').hide();
            $el.find('#toactivation').css('top', '7px');
        }

        var frompage = getQueryString('frompage');

        // 调用接口遍历卡种类详情
        // 获取从哪个页面进入的，卡券列表页需要调用接口
        var s = window.location.pathname.substring(window.location.pathname.indexOf('preferential'),
        window.location.pathname.length);
        if (s === 'preferential') {
            $.ajax({
                url: 'card/getCard',
                type: 'get',
                success: function (data) {
                    var dataarr = [];
                    var template;
                    for (var j = 0; j < data.length; j++) {
                        dataarr.push(data[j]);
                    }
                    preferentiallistDate = callingInterface(dataarr);
                    // 填充模板--已使用（过期）卡券
                    var preferentiallistHtml = template('preferentiallist_template', preferentiallistDate);
                    $el.find('preferentiallist_content').html(preferentiallistHtml);

                    for (var i = 0; i < dataarr.length; i++) {
                        var temp = dataarr[i];
                        localStorage.setItem('typePrice' + temp.type, temp.price);
                    }

                    // 去购买畅聊卡/包年卡/展业卡
                    $el.find('.preferential-card').click(function (event) {
                        var tocardtype = $el.find(this).data('cardtype');
                        var tocardid = $el.find(this).data('cardid');
                        window.top.location.href = 'buyyearcard?cardType='
                        + tocardtype + '&id=' + tocardid;
                        event.preventDefault();
                    });
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                    var loadStatus = 'error';
                }
            });
        }

        /*帮助信息详细内容操作*/
        var dropdown = $el.find('.dropdown');
        var dropdownArray = Array.prototype.slice.call(dropdown, 0);
        dropdownArray.forEach(function (el) {
            var button = el.querySelector('a[data-toggle="dropdown"]');
            var menu = el.querySelector('.dropdown-menu');
            var arrow = button.querySelector('i.icon-arrow');

            button.onclick = function (event) {
                if (!menu.hasClass('show')) {
                    menu.classList.add('show');
                    menu.classList.remove('hide');
                    arrow.classList.add('open');
                    arrow.classList.remove('close');
                    event.preventDefault();
                }
                else {
                    menu.classList.remove('show');
                    menu.classList.add('hide');
                    arrow.classList.remove('open');
                    arrow.classList.add('close');
                    event.preventDefault();
                }
            };
        });

        Element.prototype.hasClass = function (className) {
            return this.className && new RegExp('(^|\\s)'
            + className + '(\\s|$)').test(this.className);
        };

        var flowid = getQueryString('flowid');
        console.log('帮助流程id' + flowid);
        if (flowid) {
            $el.find('.topbg_useflow' + flowid).show();
        }

        $el.find('.glyphicon').on('click', function () {
            window.top.location.href = getBaseUrl();
        });

        function callingInterface(recordarr) {
            // 调用接口显示使用记录
            var preferentiallistDate = {};
            preferentiallistDate.list = [];
            for (var i = 0; i < recordarr.length; i++) {
                var temp = recordarr[i];
                preferentiallistDate.list.push(temp);
            }
            return preferentiallistDate;
        }

        // 解析url参数值
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }
        // 强行跳转主页为https协议
        function getBaseUrl() {
            var ishttps = 'https:' === document.location.protocol ? true : false;
            var url = window.location.host;
            if (ishttps) {
                url = 'https://' + url;
            }
            else {
                url = 'http://' + url;
            }
            console.log(ishttps);
            console.log(url);
            return url + '/jasmine/';
        }

        /* 自有js */
        // $el.find('img').lazyload({
        //  effect : 'fadeIn'
        // });
        //  民生银行取消头部
        var fromChannelVal = localStorage.getItem('fromChannelVal');
        if (fromChannelVal === 'cmbc') {

            /*$el.find('.header_block').hide();*/
            var backFunc = function () {
                window.history.go(-1);
            };
            $el.find('.header_block').css({
                'color': '#333',
                'background': '#fff',
                'border-bottom': '1px solid #cdcdcd',
                'font-size': '16px'
            });
            $el.find('.glyphicon').css({
                'color': '#333',
                'font-size': '20px',
                'font-weight': 'lighter',
                'left': '8px'
            });
        }

    };

    return customElement;
});
