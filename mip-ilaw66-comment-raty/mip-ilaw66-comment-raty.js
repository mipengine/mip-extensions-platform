/**
 * @file mip-ilaw66-comment-raty 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var sufuStar = (function () {
            // 工具函数
            function gbyId(id) {
                return document.getElementById(id);
            }

            function addEvent(elem, type, func) {
                // 兼容IE
                if (elem.addEventListener) {
                    elem.addEventListener(type, func, false);
                } else if (elem.attachEvent) {
                    elem.attachEvent('on' + type, func);
                }
            }

            function getIndex(event) {
                // 兼容IE
                var e = event || window.event;
                var t = e.target || e.srcElement;
                if (t.tagName.toLowerCase() === 'a') {
                    return parseInt(0, t.innerHTML);
                }
            }

            function appenStar(elem, nums) {
                var frag = document.createDocumentFragment();
                // 为了提高性能,因使用DocumentFragment一次性append,这样页面只重新渲染一次
                for (var i = 0; i < nums; i++) {
                    var a = document.createElement('a');
                    a.innerHTML = i + 1;
                    frag.appendChild(a);
                }
                elem.appendChild(frag);
            }
            // 主体函数
            function star(num, myMsg) {
                var n = num || 5;
                // 当num有值则取其值,无值则取默认值5;
                var clickStar = 0;
                var curentStar = 0;
                var starContainer = gbyId('star-div');
                appenStar(starContainer, n);
                addEvent(starContainer, 'mouseover', over);
                // 采用事件代理模式(通过<a>标签的父元素starContainer来代理事件)
                addEvent(starContainer, 'mouseout', out);
                addEvent(starContainer, 'click', click);

                function over(event) {
                    if (getIndex(event)) {
                        // 若getIndex(event)取不到值,说明当前触发事件的目标不是<a>标签
                        var index = getIndex(event);
                        change(index);
                        //  showInfo(index,msg);
                    }
                }

                function out(event) {
                    change();
                    // 将评分设为已点击状态clickStar
                    // gbyId('star-info').style.display = 'none'
                }

                function click(event) {
                    if (getIndex(event)) {
                        var index = getIndex(event);
                        clickStar = index;
                        // 保存点击状态
                        //  gbyId('star-info').style.display = 'none';
                        //  gbyId('star-span').innerHTML = '<strong>' + index + '分 ' + msg[index - 1].match(/(.+)\|/)[1] + '</strong>'+'<br />'+ msg[index - 1].match(/\|(.+)/)[1];
                    }
                }

                function change(index) {
                    curentStar = index || clickStar;
                    for (var i = 0; i < n; i++) {
                        starContainer.children[i].className = i < curentStar ? 'on' : '';
                    }
                }
            }
            return {
                star: star
            };
        })();
        // 这里的()表示函数立即执行,这样变量sufuStar才能调用匿名函数的返回值star
        // 调用执行: sufuStar.star(num,myMsg),参数可为空,参数num,myMsg将设为默认值
        sufuStar.star();
        // 取消内容显示样式
        function ToastUp(option) {
            this.init(option);
            return this;
        }
        ToastUp.prototype = {
            constructor: ToastUp,
            init: function (option) {
                var This = this;
                This.option = {
                    main: '显示内容'
                };
                $.extend(true, this.option, option || {});
                This.dom();
                This.bindEvent();
            },
            dom: function () {
                var This = this;
                This.body = $('body');
                This.main = '<div class="back__pop ToastUp" id="back__pop">'
+ '<div class="layer__wrapper layer__wrapper__toast"></div>'
+ '<div class="back__popLayer__toast">' + '<span>'
+ This.option.main + '</span>' + '</div>' + '</div>';
                This.body.append(This.main);
                This.ToastUp = $('.ToastUp');
                This.ToastUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  显示内容2秒
                setTimeout(function () {
                    This.ToastUp.remove();
                },
                2000);
            }
        };

        window.ToastUp = ToastUp;

        function toastOr(main) {
            new ToastUp({
                main: main
            });
        }
        var fromChannelVal = localStorage.getItem('fromChannelVal');
        var channel = localStorage.getItem('channel');
        //  页面评价所有label数组
        //  是否点击推荐了一名律师，默认false
        var isRecommend = false;
        //  是否来自文书卡或者见面卡
        var type = getQueryString('type');
        var statueVal = 0;
        // 星星分
        var applyLawyer = 0;
//      if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
//          appBridge.changeWebviewTitle('服务评价');
//      };
        // 各项目区分颜色
        if (channel === 'eleme') {
            $el.find('.header_block,.btn').css('background', '#089EFF');
        } else if (channel === 'mmbang' || channel === 'hers') {
            if (channel === 'mmbang') {
                $el.find('.header_block').css('margin-top', '48px');
            }
            $el.find('.header_block,.btn').css('background', '#ff6191');
        } else if (channel === 'weixin' || channel === 'onstar' || channel
=== 'falv' || channel === 'jbh' || channel === 'linjia') {
            $el.find('.header_block').css('background', '#fe6100');
            $el.find('.btn').css('background', '#fe6100');
            $el.find('.header_block').css('color', '#fff');
            $el.find('.glyphicon-menu-left').css('color', '#fff');
        } else if (channel === 'WxiaoApp' || channel === 'fengniao' || channel === 'fengniaozb') {
            if (channel === 'WxiaoApp') {
                $el.find('.header_block').hide();
            } else {
                $el.find('.header_block').css('background', '#5C7DC0');
            }
            $el.find('.btn').css('background', '#0CBE9F');
        } else if (channel !== 'cmbc') {
            $el.find('.header_block,.btn').css('background', '#fe6100');
        } else if (channel === 'dayima') {
            $el.find('.top_header,.header_block').css('background', '#fff');
            $el.find('.div_header,.glyphicon-menu-left:before,.glyphicon,.header_block').css('color', '#000');
        } else {
            $el.find('.header_block').css('background', '#fe6100');
            $el.find('.btn').css('background', '#fe6100');
            $el.find('.header_block').css('color', '#fff');
            $el.find('.glyphicon-menu-left').css('color', '#fff');
        };

        if (channel === 'winbaoxian') {
            $el.find('.header_block').hide();
        }

        //   $el.find('.star_block').raty({
        //       score : 0
        //   });
        var wH = $el.find(window).height();
        $el.find('body').css('height', wH + 'px');
        //  订单管理
        $el.find('.backfirst-list-alt').click(function () {
            window.top.location.href = 'orderlist';
        });

        $el.find('.link_btn_sysErrConfirm').click(function () {
            $el.find('.popUp_sysErr').hide();
        });

        var wordCount = $el.find('#wordCount');
        var textArea = wordCount.find('textarea');
        var word = wordCount.find('.word');
        statInputNum(textArea, word);

        $el.find('.btn_conment').bind('touchstart',
        function () {
            commitCommentMsg();
        });

        $el.find('#star-div a').click(function () {
            statueVal = $el.find(this).html();
            if ($el.find(this).html() < 3) {
                $el.find('#comment').attr('placeholder', '（选填）若觉得律师服务有问题， 请在此说明');
                $el.find('.star_block span.no_help').css('color', '#FF6100');
                $el.find('.star_block span.ok_help').css('color', '#BBBBBB');
                $el.find('.content_block__msg__level2').show();
                $el.find('.content_block__msg__level1').hide();
                $el.find('.content_block__msg__level1 .userFeedback_unselect').removeClass('userFeedback_select');
            } else {
                $el.find('#comment').attr('placeholder', '（选填）我们想提供更好的服务，您有什么建议？');
                $el.find('.star_block span.ok_help').css('color', '#FF6100');
                $el.find('.star_block span.no_help').css('color', '#BBBBBB');
                $el.find('.content_block__msg__level1').show();
                $el.find('.content_block__msg__level2').hide();
                $el.find('.content_block__msg__level2 .userFeedback_unselect').removeClass('userFeedback_select');
            }
            $el.find('.txt_block').show();
        });
        $el.find('.userFeedback_div span').click(function () {
            $el.find(this).toggleClass('userFeedback_select');
        });

        // 是否打官司new
        $el.find('.allow_block').on('click',
        function () {
            if (!isRecommend) {
                $el.find('.allow_icon1').show();
                $el.find('.allow_icon2').hide();
                isRecommend = true;
                applyLawyer = 1;
            } else {
                $el.find('.allow_icon2').show();
                $el.find('.allow_icon1').hide();
                isRecommend = false;
                applyLawyer = 0;
            }
        });

        $el.find('#requestId').val(getQueryString('requestId'));
        $el.find('#questionType').val(getQueryString('questionType'));

        //   解析URL
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }
        }

        /*
		 * 剩余字数统计
		 * 注意 最大字数只需要在放数字的节点哪里直接写好即可 如：<var class='word'>200</var>
		 */
        function statInputNum(textArea, numItem) {
            var max = 300;
            var curLength;
            textArea[0].setAttribute('maxlength', max);
            curLength = textArea.val().length;
            numItem.text(curLength);
            textArea.on('input propertychange',
            function () {
                var valueV = $el.find(this).val().replace(/[\r\n]/g, '  ').replace(/\n/gi, '');
                //  numItem.text(max - valueV.length);
                numItem.text(valueV.length);
            });
        }

        /*提交评价信息*/
        function commitCommentMsg() {
            var labelTxt = '';
            $el.find('.userFeedback_select').each(function () {
                //  labelTxt += $el.find(this).text('') + ';';
                labelTxt += $el.find(this).data('scorenum') + ',';
            });
            console.log(labelTxt.substring(0, labelTxt.length - 1));
            // 评价标签 选中后以“;”拼接
            if (statueVal < 1) {
                toastOr('请您评价律师服务');
            } else {
                var csrfToken = $el.find('#_csrf').val();
                var requestId = $el.find('#requestId').val();
                var questionType = $el.find('#questionType').val();
                var starLevel = statueVal;
                var comment = $el.find('#comment').val();
                var lawyerLebel = labelTxt.substring(0, labelTxt.length - 1);
                var url = '';
                // 标签评论
                if (type) {
                    url = 'addReviewV3?requestId=' + requestId + '&applyLawyer=' + applyLawyer
+ '&comment=' + comment + '&starLevel=' + starLevel + '&lawyerLebel=' + lawyerLebel
+ '&questionType=' + questionType + '&_csrf=' + csrfToken + '&type=' + type;
                } else {
                    url = 'addReviewV3?requestId=' + requestId + '&applyLawyer='
+ applyLawyer + '&comment=' + comment + '&starLevel=' + starLevel + '&lawyerLebel='
+ lawyerLebel + '&questionType=' + questionType + '&_csrf=' + csrfToken;
                }
                gotoCommitCommentMsg(url, requestId);
            }
        }

        function gotoCommitCommentMsg(url, requestId) {
            $.ajax({
                type: 'POST',
                url: url,
                success: function (data) {
                    if (data === 'ERROR') {
                        // 提交评价失败因已经提交过
                        setTimeout(function () {
                            toastOr('您已经提交过了');
                            window.top.location.href = './';
                        },
                        2000);
                    } else {
                        $el.find('.btn_conment').unbind('touchstart');
                        // 2秒跳转到首页
                        $('body').scrollTop(0);
                        $('body').css('overflow', 'hidden');
                        $el.find('.conment_result').show();
                        setTimeout(function () {
                            window.top.location.href = './';
                        },
                        2000);
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }
                }
            });
        }
    };

    return customElement;
});
