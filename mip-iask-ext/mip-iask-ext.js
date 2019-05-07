/**
* @file 脚本支持
* @author  hejieye
* @time  2018-09-19
* @version 1.3.4
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // 页面交互效果
    var effects = {
        // 标签切换
        switchBlock: function () {
            $('.similar-nav').on('click', 'li',
            function () {
                event.preventDefault();
                try {
                    $(this).siblings().removeClass('current');
                    $(this).addClass('current');
                    var index = $(this).index();
                    var nodes = $('.relative_kownlege').find('.tabs-con');
                    $(nodes).hide();
                    $(nodes).slice(index, index + 1).show();
                }
                catch (e) {}
            });
        },
        // 换一换
        changeMore: function () {
            $('.link-change').on('click', function (event) {
                event.preventDefault();
                try {
                    var pagesize = parseInt($(this).attr('showSize'), 10);
                    var childNodes = $(this).parent().next().children();
                    var pagecount = $(this).attr('pagecount');
                    if (!pagecount) {
                        pagecount = pagesize;
                    }
                    if (pagecount >= childNodes.length) {
                        pagecount = 0;
                    }
                    var endcount = Number(pagecount) + pagesize;
                    $(childNodes).hide();
                    $(childNodes).slice(pagecount, endcount).show();
                    $(this).attr('pagecount', endcount);
                }
                catch (e) {}
            });
        },
        // 相关知识换一换
        kownlegMore: function () {
            $('.kownleg-change').on('click', function (event) {
                event.preventDefault();
                $('div.similar').find('div.show').removeClass('show').addClass('hide').appendTo($('div.similar'));
                var i = 1;
                $('div.similar').find('div.hide').each(function () {
                    if (i === 1) {
                        $(this).removeClass('hide').addClass('show');
                    }
                    i ++;
                });
            });
        },
        // 展开 or 收起
        openOrStop: function () {
            $('.os-click').on('click',
            function (event) {
                event.preventDefault();
                try {
                    var txt = $(this);
                    if (txt.text() === '[展开]') {
                        txt.text('[收起]');
                        txt.prev().show();
                    }
                    else {
                        txt.text('[展开]');
                        txt.prev().hide();
                    }
                }
                catch (e) {}
            });
        },
        // 问题搜索
        btnSearch: function () {
            $('.btn-search').click(function () {
                var content = $('.search-input').val();
                if (content.trim().length < 2) {
                    alert('关键字必须大于等于2个字!');
                    return;
                }
                effects.openUrl('//m.iask.sina.com.cn/search/1.html?content=' + content);
            });
        },
        // 提问
        btnSend: function () {
            try {
                $('.btn-send').click(function () {
                    event.preventDefault();
                    var content = $('.search-input').val();
                    effects.openUrl('//m.iask.sina.com.cn/ask?content=' + content);
                });
            }
            catch (e) {}
        },
        // 验证登录信息
        checkLogin: function () {
            /*该参数是作为组件外部参数,所以需要用到全局选择器*/
            var $that = document.querySelector('.paramDiv');
            var cid = $that.getAttribute('cid');
            var checkLoginUrl = '//m.iask.sina.com.cn/checkLogin?mip=' + Math.random() + '&cid=' + cid;
            $.get(checkLoginUrl);
        },
        userInfoHide: function () {
            $(document).click(function (event) {
                $('.user-more').hide();
            });
            $('.user-more').click(function (event) {
                event.stopPropagation();
            });
        },
        // 折叠
        accordion: function () {
            $('.iask-show-more').click(function () {
                $(this).parent().siblings('.iask-accordion').each(function () {
                    $(this).show();
                });
                $(this).hide();
                $(this).siblings('.iask-show-less').show();
            });
            $('.iask-show-less').click(function () {
                $(this).parent().siblings('.iask-accordion').each(function () {
                    $(this).hide();
                });
                $(this).hide();
                $(this).siblings('.iask-show-more').show();
            });
        },
        openUrl: function (url) {
            var $that = document.querySelectorAll('.camnpr');
            if ($that.length > 0) {
                for (var i = 0; i < $that.length; i++) {
                    var t = $that[i];
                    t.parentNode.removeChild(t);
                }
            }
            var a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('class', 'camnpr');
            document.body.appendChild(a);
            a.click();
        },
        login: function () {
            $('.icon-ency-login').click(function (event) {
                window.document.location = 'https://iask.sina.com.cn/cas/m/logins?pf=1&location=' + encodeURIComponent(window.document.location) + '&terminal=m&businessSys=iask';
                // window.document.location = 'https://iask.sina.com.cn/cas/m/bind?pf=1&location='+encodeURIComponent(window.document.location)+'&terminal=m&businessSys=iask&mobile=1312312';
            });
        },
        reportHide: function () {
            $('.cannelReport').click(function (event) {
                $('.report-body').hide();
            });
        },
        checkSearch: function (value) {
            var ref = '';
            if (document.referrer.length > 0) {
                ref = document.referrer;
            }
            try {
                if (ref.length === 0 && opener.location.href.length > 0) {
                    ref = opener.location.href;
                }
            } catch (e) {}

            return ref.indexOf(value) > -1;
        },
        openWindowUrl: function (ele, url) {
            var $that = ele.querySelectorAll('.camnpr');
            if ($that.length > 0) {
                for (var i = 0; i < $that.length; i++) {
                    var t = $that[i];
                    t.parentNode.removeChild(t);
                }
            }
            var a = ele.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('target', '_blank');
            a.setAttribute('class', 'camnpr');
            ele.body.appendChild(a);
            a.click();
        },
        searchToPage: function (ele, value, flag) {
            if (value) {
                var url = window.location.href;
                if (url.lastIndexOf('?') > -1) {
                    url += '&searchid=' + flag;
                }
                else {
                    url += '?searchid=' + flag;
                }
                this.openWindowUrl(ele, url);
            }
        },

        antSearch: function (element) {

            var type = element.getAttribute('type');

            var value = element.getAttribute('value');

            var flag = element.getAttribute('flag');

            if (type === 'search') {
                var searchValue = this.checkSearch(value);
                this.searchToPage(element, searchValue, flag);
            }
        },
        init: function (element) {
            this.switchBlock();
            this.changeMore();
            this.openOrStop();
            this.btnSearch();
            this.btnSend();
            this.checkLogin();
            this.userInfoHide();
            this.accordion();
            this.kownlegMore();
            this.login();
            this.reportHide();
            this.antSearch(element);
        }
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        effects.init(element);
    };

    return customElem;
});
