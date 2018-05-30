/**
* @file 脚本支持
* @author  hejieye
* @time  2018-05-22
* @version 1.3.3
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // 页面交互效果
    var effects = {
        // 标签切换
        switchBlock: function () {
            // 因为多个功能都集成在一个组件内，所以需要用到全局的选择器
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
            // 因为多个功能都集成在一个组件内，所以需要用到全局的选择器
            $('.link-change').on('click', function (event) {
                event.preventDefault();
                try {
                    var pagesize = parseInt($(this).attr('showSize'));
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
        kownlegMore: function() {
            // 因为多个功能都集成在一个组件内，所以需要用到全局的选择器
        	$('.kownleg-change').on('click', function (event) {
                event.preventDefault();
        		$("div.similar").find("div.show").removeClass("show").addClass("hide").appendTo($("div.similar"));
        		var i = 1;
        		$('div.similar').find('div.hide').each(function (){
        			if(i == 1) {
        				$(this).removeClass('hide').addClass('show');
        			}
        			i ++;
        		});
        	});
        },
        // 展开 or 收起
        openOrStop: function () {
            // 因为多个功能都集成在一个组件内，所以需要用到全局的选择器
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
            // 因为多个功能都集成在一个组件内，所以需要用到全局的选择器
            $('.btn-search').click(function () {
                var content = $('.search-input').val();
                if (content.trim().length < 2) {
                    alert('关键字必须大于等于2个字!');
                    return;
                }
                effects.openUrl('https://mipp.iask.cn/search/1.html?content=' + content);
            });
        },
        // 提问
        btnSend: function () {
            try {
                // 因为多个功能都集成在一个组件内，所以需要用到全局的选择器
                $('.btn-send').click(function () {
                    event.preventDefault();
                    var content = $('.search-input').val();
                    effects.openUrl('https://mipp.iask.cn/ask?content=' + content);
                });
            }
            catch (e) {}
        },
        // 验证登录信息
        checkLogin: function () {
            // 因为多个功能都集成在一个组件内，所以需要用到全局的选择器
            /*该参数是作为组件外部参数,所以需要用到全局选择器*/
            var $that = document.querySelector('.paramDiv');
    	    var cid = $that.getAttribute("cid");
            var checkLoginUrl = 'https://mipp.iask.cn/checkLogin?mip=' + Math.random() + '&cid=' + cid;;
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
        accordion : function () {
            // 因为多个功能都集成在一个组件内，所以需要用到全局的选择器
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
        openUrl : function (url) {
        	var $that = document.querySelectorAll('.camnpr');
        	if($that.length > 0) {
        		for(var i=0; i<$that.length; i++) {
        			var t = $that[i];
        			t.parentNode.removeChild(t);
        		}
        	}
             var a = document.createElement("a");  
             a.setAttribute("href", url);  
             a.setAttribute("class", "camnpr");  
             ele.body.appendChild(a);  
             a.click();
        },
        init: function () {
            this.switchBlock();
            this.changeMore();
            this.openOrStop();
            this.btnSearch();
            this.btnSend();
            this.checkLogin();
            this.userInfoHide();
            this.accordion();
            this.kownlegMore();
        }
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        effects.init();
    };

    return customElem;
});
