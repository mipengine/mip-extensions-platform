/**
 * @file mip-jt-comment 组件
 * @author woke
 */
 /* global MCommentDetailGlob, createjscssfile, commentUtils, org, getCookieByName, intCommentMethod, showDigit,
 dealDigitClickEvent, dealTime, commentDiv, packUpCommentBlock, assembleCommentData, firstPublishComment, defindAlert,
 replyComment, showCommentBlock, clearGlobCommentData, clearGlobReplyData, showTopics
 */
define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();
    function includeLinkStyle(url) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    function includeJavaScript(url) {
        var c = document.createElement('script');
        c.async = true;
        c.type = 'text/javascript';
        c.src = url;
        document.getElementsByTagName('head')[0].appendChild(c);
    }
    function replacejscssfile(oldfilename, newfilename, filetype) {
        var targetelement = (filetype === 'js') ? 'script' : (filetype === 'css') ? 'link' : 'none';
        var targetattr = (filetype === 'js') ? 'src' : (filetype === 'css') ? 'href' : 'none';
        var allsuspects = document.getElementsByTagName(targetelement);
        for (var i = allsuspects.length; i >= 0; i--) {
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) !== null
            && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) !== -1) {
                var newelement = createjscssfile(newfilename, filetype);
                allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
            }
        }
    }
    includeLinkStyle('https://res.cngoldres.com/libs/jtshare/1.0.8/css/jtshare.css');
    includeLinkStyle('https://res.cngoldres.com/libs/jtcomment/2.7.0/css/comment_mobile.css');
    includeJavaScript('https://res.cngoldres.com/libs/jtshare/1.0.8/jtshare.js');
    includeJavaScript('https://res.cngoldres.com/libs/jtcomment/2.7.0/CommentCoreLibrary.min.js');
    includeJavaScript('https://res.cngoldres.com/libs/jtcomment/2.7.0/comment_mobile.js');
    includeJavaScript('https://res.cngoldres.com/libs/jtcomment/2.7.0/comment_barrage.js');
    var commentUtils;

    function __namespace__(ns, parent) {
        if (parent == null) {
            parent = self;
        }
        for (var each in ns) {
            if (parent[each] != null) {
                __namespace__(ns[each], parent[each]);
            }
            else {
                parent[each] = ns[each];
            }
        }
        return;
    }
    __namespace__({
        org: {
            cngold: {
                comment: (function () {
                    function CommentUtils() {
                        CommentUtils.prototype.subUrl = function (urlStr) {
                            var endIndex = urlStr.length;
                            if (urlStr.indexOf('.html') !== -1) {
                                endIndex = urlStr.indexOf('.html') + 5;
                            }
                            else if (urlStr.indexOf('.htm') !== -1) {
                                endIndex = urlStr.indexOf('.htm') + 4;
                            }
                            urlStr = urlStr.substring(0, endIndex);
                            if (urlStr.indexOf('?') !== -1) {
                                urlStr.substring(0, urlStr.indexOf('?'));
                            }
                            return urlStr;
                        };
                        CommentUtils.prototype.getKey = function (urlStr) {
                            if (urlStr.indexOf('.htm') !== -1) {
                                urlStr = urlStr.substring(urlStr.lastIndexOf('/') + 1, urlStr.lastIndexOf('.htm'));
                            } else {
                                urlStr = urlStr.substring(urlStr.lastIndexOf('/') + 1, urlStr.length);
                                if (urlStr.indexOf('?') !== -1) {
                                    urlStr = urlStr.substring(0, urlStr.indexOf('?'));
                                }
                            }
                            var reg = /[0-9]_(p|P)?[0-9]/;
                            if (reg.test(urlStr)) {
                                urlStr = urlStr.substring(0, urlStr.lastIndexOf('_') + 1);
                            }
                            urlStr = urlStr.replace(/[^0-9]/ig, '');
                            return urlStr;
                        };
                        // 去URL的分页
                        CommentUtils.prototype.subUrlPage = function (urlStr) {
                            if (urlStr === null || urlStr === '' || urlStr === undefined) {
                                return urlStr;
                            }
                            var reg = /[0-9](_[0-9])\.htm/;
                            var r = urlStr.match(reg);
                            if (r != null && r.length > 1) {
                                urlStr = urlStr.replace(r[1], '');
                            }
                            return urlStr;
                        };
                        // 处理url 返回文章id
                        CommentUtils.prototype.dealUrl = function (urlStr) {
                            if (typeof (commentUtils) !== 'undefined' && typeof (commentUtils.getKey) === 'function') {
                                return commentUtils.getKey(urlStr);
                            }
                            if (urlStr.indexOf('.htm') !== -1) {
                                urlStr = urlStr.substring(urlStr.lastIndexOf('/') + 1, urlStr.lastIndexOf('.htm'));
                            }
                            else {
                                urlStr = urlStr.substring(urlStr.lastIndexOf('/') + 1, urlStr.length);
                                if (urlStr.indexOf('?') !== -1) {
                                    urlStr = urlStr.substring(0, urlStr.indexOf('?'));
                                }
                            }
                            var reg = /[0-9]_(p|P)?[0-9]/;
                            if (reg.test(urlStr)) {
                                urlStr = urlStr.substring(0, urlStr.lastIndexOf('_') + 1);
                            }
                            urlStr = urlStr.replace(/[^0-9]/ig, '');
                            return urlStr;
                        };
                        // 创建CSS或JS
                        CommentUtils.prototype.createjscssfile = function (filename, filetype) {
                            if (filetype === 'js') {
                                var fileref = document.createElement('script');
                                fileref.setAttribute('type', 'text/javascript');
                                fileref.setAttribute('src', filename);
                            }
                            else if (filetype === 'css') {
                                fileref = document.createElement('link');
                                fileref.setAttribute('rel', 'stylesheet');
                                fileref.setAttribute('type', 'text/css');
                                fileref.setAttribute('href', filename);
                            }
                            return fileref;
                        };
                        // 替换CSS
                        CommentUtils.prototype.replacejscssfile = function (oldfilename, newfilename, filetype) {
                            var targetelement = (filetype === 'js') ? 'script' : (filetype === 'css') ? 'link' : 'none';
                            var targetattr = (filetype === 'js') ? 'src' : (filetype === 'css') ? 'href' : 'none';
                            var allsuspects = document.getElementsByTagName(targetelement);
                            for (var i = allsuspects.length; i >= 0; i--) {
                                if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) !== null
                                && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) !== -1) {
                                    var newelement = CommentUtils.prototype.createjscssfile(newfilename, filetype);
                                    allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
                                }
                            }
                        };
                    }
                    return {CommentUtils: CommentUtils};
                })()
            }
        }
    });
    commentUtils = new org.cngold.comment.CommentUtils;
    // 弹幕位置设置
    $(window).load(function () {
            if ($('.article_con,.article-con').find('img').length > 0) {
                var targetImg = $('.article_con,.article-con').find('img').eq(0);
                var targetImgTop = targetImg.offset().top - $('.article_con,.article-con').offset().top;
                var targetImgH = targetImg.height();
                var barrageBarH = $('.barrage_bar').outerHeight();
                $('.barrage_container').css({'top': targetImgTop, 'width': targetImg.width()});
                $('#barrageContain').height('1.5rem');
            }
        });
    // 加载数据
    function showCommentData(data) {
        var commentList = data.comments;
        var commentDigit = data.commentThumbUp;
        var commentNum = data.commentNum;
        var commentStr = '';
        // 评论条数
        if (commentNum !== undefined && commentNum !== 0) {
            $('.comment_num').show().text(commentNum);
            $('#count-visit').show().text(commentNum);
        }
        else {
        // 数量为0时隐藏
            $('.comment_num').hide();
            $('#count-visit').hide();
        }
        MCommentDetailGlob.commentConstant.commentKey = data.commentKey;
        if (commentList === null || commentList === undefined) {
            return;
        }
        if (commentList === null || commentList === undefined || commentList.length === 0) {
            commentStr += '<div class="comment_emptyComment"><img src="https://res.cngoldres.com/mobile/comment/images/empty.png" alt="无评论"/><div>暂无评论，点击马上抢沙发</div></div>';
        }
        else {
            commentStr = showCommentList(commentList);
        }
        $('.comment_custom_comment_detail').empty().append(commentStr);
        // 点赞数据展现
        showDigit(commentDigit);
        // 点赞事件绑定
        dealDigitClickEvent();
        // 回复 点击事件绑定
        dealReplyClickEvent();
        dealInputClickEvet();
    }
    var replyE = '';
    // 插入成功执行函数
    function createSuccess(commentContent) {
        packUpCommentBlock();
        var commentStr = '';
        var commentData = assembleCommentData(commentContent);
        // 判断是不是回复
        if (!replyE) {
            commentStr += commentDiv(commentData);
            // 隐藏沙发
            if ($('.comment_emptyComment').length !== 0 && $('.comment_emptyComment').css('display') !== 'none') {
                $('.comment_emptyComment').hide();
                // 展示
                $('.comment_custom_comment_detail').prepend(commentStr);
                firstPublishComment();
            }
            else {
			// 展示
                $('.comment_custom_comment_detail').prepend(commentStr);
                defindAlert('发表成功！');
            }
            // 绑定回复 点击事件
            dealReplyClickEvent();
            // 点赞事件绑定
            dealDigitClickEvent();
            window.location.hash = '#comment_cngold-comment';
        }
        else {
		// 如果是回复则 找到当前的类是否是直接回复
            if ($(replyE).hasClass('comment_mCommentBody') || $(replyE).hasClass('comment-reply')) {
			// 判断有没有回复信息
                if ($(replyE).parent().parent().find('.reply_comment_mCommentModel').length > 0) {
				// 如果有回复的信息 则直接加内容
                    commentStr = replyComment(commentData, 0);
                    $(replyE).parent().parent().find('.reply_comment_mCommentModel')
                    .find('.reply_details:first').before(commentStr);
                }
                else {// 否则 要加回复信息
                    commentStr = replyComment(commentData, 1);
                    $(replyE).parent().parent().append(commentStr);
                }
            }
		else {// 不是直接回复 那就是 回复里的回复
                commentStr = replyComment(commentData, 0);
                $(replyE).parent().parent().find('.reply_details:first').before(commentStr);
            }
            replyE = '';
            dealReplyClickEvent();
        }
    }

    // 回复按钮 绑定事件,评论页面和评论详情页面的回复按钮是跳转到评论回复页面中去
    function dealReplyClickEvent() {
        $('.reply_seemore').off('click').on('click', function () {
        // 回复触发函数
            MCommentDetailGlob.replyData.id = $(this).siblings('.comment_mCommentHeader')
            .find('.comment_id').val() || $(this).parents().parents()
            .find('.comment_mCommentHeader').find('.comment_id').val();
            MCommentDetailGlob.replyData.nickName = $(this).parents('.comment_mCommentModel')
            .find('.comment_name span:first').text() || $(this).parents().parents()
            .find('.comment_mCommentHeader').find('.comment_name span:first').text();
            MCommentDetailGlob.replyData.commentContent = $(this).parents('.comment_mCommentModel')
            .find('.comment_mCommentBody:first').text() || $(this).parents().parents()
            .find('.comment_mCommentBody:first').text();

            if (MCommentDetailGlob.replyData.id === -1) {
                defindAlert('请刷新后再回复');
            } else {
                var url = MCommentDetailGlob.commentConstant.commentDomain + '/m_comment_reply.htm?topCommentId='
                + MCommentDetailGlob.replyData.id + '&commentKey=' + MCommentDetailGlob.commentConstant.commentKey;
                document.location.href = url;
            }
        });
        $('.comment_mCommentBody, .comment-reply').off('click').on('click', function () {
        // 回复触发函数
            MCommentDetailGlob.replyData.id = $(this).siblings('.comment_mCommentHeader').find('.comment_id').val();
            MCommentDetailGlob.replyData.nickName = $(this).parents('.comment_mCommentModel')
            .find('.comment_name span:first').text();
            MCommentDetailGlob.replyData.commentContent = $(this).parents('.comment_mCommentModel')
            .find('.comment_mCommentBody:first').text();
            MCommentDetailGlob.replyData.topCommentId = $(this).siblings('.comment_mCommentHeader')
            .find('.comment_id').val();
            // 设置placeholder
            $('#comment_comment_detail').attr('placeholder', '回复：' + $.trim(MCommentDetailGlob.replyData.nickName));
            if (MCommentDetailGlob.replyData.id === -1) {
                defindAlert('请刷新后再回复');
            } else {
                showCommentBlock();
            }
            replyE = $(this);
        });
        // 回复触发函数
        $('.reply_content').off('click').on('click', function () {
            // 回复触发函数
            MCommentDetailGlob.replyData.id = $(this).parent().find('.comment_mCommentHeader')
            .find('.comment_id').val();
            MCommentDetailGlob.replyData.nickName = $(this).parent().find('.comment_mCommentHeader')
            .find('.reply_uname').text();
            MCommentDetailGlob.replyData.commentContent = $(this).parent().find('.reply_content').text();
            MCommentDetailGlob.replyData.topCommentId = $(this).parent().find('.topCommentId').val();
            // 设置placeholder
            $('#comment_comment_detail').attr('placeholder', '回复：' + $.trim(MCommentDetailGlob.replyData.nickName));
            if (MCommentDetailGlob.replyData.id === -1) {
                defindAlert('请刷新后再回复');
            } else {
                showCommentBlock();
            }
            replyE = $(this);
        });
    }

    // 将数据展现到界面上去
    function showCommentList(commentList) {
        var commentStr = '';
        if (commentList !== null && commentList !== undefined && commentList.length > 0) {
            for (var i = 0; i < commentList.length; i++) {
                var first = commentList[i];
                first.createdAt = dealTime(first.createdAt);
                if (first.photo === '') {
                    first.photo = MCommentDetailGlob.commentConstant.userPhoto;
                }
                if (first.nickName === '') {
                    first.nickName = first.commentAddress;
                }
                commentStr += commentDiv(first, 'comment_reply');
            }
            var url = encodeURI(MCommentDetailGlob.commentConstant.commentDomain + '/m_comment_detail.htm?commentKey='
            + MCommentDetailGlob.commentConstant.commentKey + '&commentUrl=' + window.location.href);
            var readMoreStr = '<a class="comment_mores" href="' + url + '"><p>查看更多评论<img src="https://res.cngoldres.com/mobile/comment/images/right_arrow.png" alt="" /></p></a>';
            commentStr += readMoreStr;
        }
        return commentStr;
    }
    // 点击输入的时候 评论和评论详情页面需要清空 全局变量 中的数据，但是回复页面中需要保留
    function dealInputClickEvet() {
        // 点击输入
        $('.comment_repely_input input').focus(function () {
            showCommentBlock();
            clearGlobCommentData();
            clearGlobReplyData();
            // 设置placeholder
            $('#comment_comment_detail').attr('placeholder', '请输入评论内容...');
        });
        $('.comment_emptyComment').on('click', function () {
            console.log('testtt');
            showCommentBlock();
            clearGlobCommentData();
            clearGlobReplyData();
            // 设置placeholder
            $('#comment_comment_detail').attr('placeholder', '请输入评论内容...');
        });
    }

    function commentBtnClick() {
        var exist = $('#comment_cngold-comment').length;
        if (exist > 0) {
            var t = $('#comment_cngold-comment').offset().top;
            $('html,body').animate({scrollTop: t + 'px'}, 500);
        } else {
            if ($('.comment_num').html() === undefined
            || $('.comment_num').html() === '' || $('.comment_num').html() === '0') {
                $('.comment_repely_input input').focus();
            } else {
                var detailUrl = encodeURI(MCommentDetailGlob.commentConstant.commentDomain
                + '/m_comment_detail.htm?commentKey=' + MCommentDetailGlob.commentConstant.commentKey
                + '&commentUrl=' + window.location.href);
                location.href = detailUrl;
            }
        }
    }
    // 弹幕html结构
    function barrageHtml() {
        var str = ''
            + '<!-- 弹幕 -->'
            + '<div class="barrage_container">'
            + '	<div class="barrage_bar">'
            + '		<span class="b_controll" id="b_controll"><i class="on">弹幕</i></span>'
            + '		<span class="sent_comment_btn" onclick="showCommentBlock()">'
            + '<i class="article_sprite"></i>我要吐槽</span>'
            + '	</div>'
            + '	<!--显示弹幕div开始-->'
            + '	<div id="barrageContain" class="feng-ccl-panel comment_barrageContain">'
            + '		<div class="abp" id="feng-player">'
            + '			<div class="container" id="commentCanvas">'
            + '			</div>'
            + '		</div>'
            + '	</div>'
            + '	<!--显示弹幕div结束-->'
            + '</div>'
            + '<!-- 弹幕结束 -->';
        return str;
    }
    // 判断滚动条滚动方向
    function scroll(fn) {
        var beforeScrollTop = document.body.scrollTop;
        var fn = fn || function () {};
        window.addEventListener('scroll', function () {
            var afterScrollTop = document.body.scrollTop;
            var delta = afterScrollTop - Math.abs(beforeScrollTop);
            // if( delta === 0 ) return false;
            fn(delta > 0 ? 'down' : 'up');
            beforeScrollTop = afterScrollTop;
        }, false);
    }
    // 加载 热门话题
    $(function () {
        showTopics();
    });


/**
* 第一次进入可视区回调，只会执行一次
*/
    customElement.prototype.firstInviewCallback = function () {
        $(function () {
                var str = '<!--人机验证弹窗-->'
				+ '<div class=\"comment_tanchaun\" style=\"display:none\">'
				+  '<div class=\"comment_tanchuan_div_mobile\">'
				+    '<a class=\"comment_guan\" href=\"javascript:void(0)\">'
				+     '<img src=\"https://res.cngoldres.com/comment/cngold/image/x_guanbi.gif\">'
				+     '</a>'
				+     '<p>提交前请先进行人机识别验证！</p>'
				+     '<!-- 验证码-->'
				+     '<div class=\"l-captcha\"'
				+     'data-site-key=\"e3e0b5fa719a8dcaaff769e9e67d7865\" data-callback=\"getResponse\"></div>'
				+     '</div>'
				+     '<div class=\"comment_bg\"></div>'
				+     '</div>'
				+    '<!--沙发动画-->'
				+ '<div class=\"comment-animation\">'
				+ '<img src=\"https://res.cngoldres.com/comment/cngold/image/f-sofa.png\" class=\"comment-sofa-animation\"/>'
				+ '</div>'
				+ '<!-- 评论内容 -->'
				+ '<div id=\"comment_cngold-comment\" class=\"comment_mCommentArea\">'
				+ '	<h2><span></span>最新评论</h2>'
				+ '	<div class=\"comment_custom_comment_detail\">'
				+ '     <div class=\"comment_emptyComment\">'
				+ '			<img src=\"https://res.cngoldres.com/mobile/comment/images/empty.png\" alt=\"无评论\"/>'
				+ '         <div class=\"empty-desc\">暂无评论，点击马上抢沙发</div>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>'
				+ '<!-- 评论内容结束 -->'
				+ '<!--发布样式展现 -->'
				+ '<div class=\"comment_success\" style=\"display: none;\"></div>'
				+ '<!--半透明层-->'
				+ '<div class=\"comment_cover\" style=\"display: none;\"></div>'
				+ '<!--底部评论框-->'
				+ '<div class=\"comment_repely_input\">'
				+ '	<input type=\"text\" placeholder=\"我来说几句\" />'
				+ '	<div class=\"comment_input_btns\">'
				+ '		<a href=\"javascript:void(0);\" onclick=\"commentBtnClick()\"'
				+ '      class=\"comment_detail_link\" title=\"\">'
				+ '			<div class=\"comment_input_comment\">'
				+ '				<span class=\"comment_num\"></span>'
				+ '				<img src=\"https://res.cngoldres.com/mobile/images/m_comment26_icon_1.png\" alt=\"\"/>'
				+ '			</div>'
				+ '		</a>'
				+ '		<a href=\"javascript:void(0);\">'
				+ '			<div class=\"comment_fl comment_input_share jtshare_m1\">'
				+ '				<img src=\"https://res.cngoldres.com/mobile/images/m_comment26_icon_2.png\" alt=\"分享\"/>'
				+ '			</div>'
				+ '		</a>'
				+ '		<a href=\"javascript:void(0);\">'
				+ '			<div class=\"comment_input_jjh\">'
				+ '				<img src=\"https://res.cngoldres.com/mobile/images/m_comment26_icon_3.png\" alt=\"下载\"/>'
				+ '			</div>'
				+ '		</a>'
				+ '	</div>'
				+ '</div>'
				+ '<!--评论输入框-->'
				+ '<form class=\"comment_f_c\">'
				+ ' <div class=\"comment_f_c_top\">写评论</div>'
				+ '	<textarea id=\"comment_comment_detail\" rows=\"3\" cols=\"\" placeholder=\"请输入评论内容...\"></textarea>'
				+ '	<div class=\"commnet_username\" id=\"comment_username\" onclick="chekLogin();">'
				+ MCommentDetailGlob.commentData.alertNickName
				+ ' </div>'
				+ '	<div class=\"comment_btnsGroup\">'
				+ '	<div class=\"comment_input_btns\"><span class=\"comment_f_c_btn comment_quxiao\">取消</span></div>'
				+ '	<div class=\"comment_fr\"><span class=\"comment_f_c_btn comment_fabiao\">发送</span></div>'
				+ '	 </div>'
				+ '</form>'
				+ '<!--遮罩层2-->'
                + '<div class="comment_cover comment_cover2" style="display: none;"></div>';

                var commentInsertDiv = $('#comment_html_div');
                if (commentInsertDiv === undefined) {
                    return;
                }
                commentInsertDiv.append(str);
                includeJavaScript('https://captcha.luosimao.com/static/js/api.js?_=' + Date.parse(new Date()));
                // 初始化全局变量数据
                var articleUrl = 'https://mip.jin99.net/ag/xw3980442.html';
                articleUrl = commentUtils.subUrl(articleUrl);
                // 适配mip的url
                if (articleUrl.indexOf('/c/s/') > 0) {
                    var articleLength = articleUrl.substr(0, articleUrl.indexOf('/c/s/')).length + 8;
                    articleUrl = 'https://m' + articleUrl.substring(articleLength);
                } else if (articleUrl.indexOf('mip') > 0) {
                    articleUrl = articleUrl.replace(/mip/g, 'm');
                } else {
                    articleUrl = articleUrl;
                }
                // 截取url末尾中的主键
                var articleId = commentUtils.dealUrl(articleUrl);
                MCommentDetailGlob.commentConstant.articleId = articleId;
                var titleVar = document.title;
                var titleArray = [];
                titleArray = titleVar.split('-');
                if (titleArray.length > 2) {
                    titleVar = titleArray[0];
                    for (var i = 1; i < titleArray.length - 2; i++) {
                        titleVar += '-' + titleArray[i];
                    }
                }
                MCommentDetailGlob.commentConstant.articleTitle = titleVar;
                MCommentDetailGlob.commentConstant.articleUrl = articleUrl;
                MCommentDetailGlob.commentConstant.commentDomain = 'https://comment2.cngold.org';
                // 发起js调用，获取手机端数据
                $.ajax({
                    type: 'get',
                    url: MCommentDetailGlob.commentConstant.commentDomain + '/show_comment_detail.htm',
                    data: {
                        commentKey: MCommentDetailGlob.commentConstant.articleId,
                        sourceType: 2,
                        url: MCommentDetailGlob.commentConstant.articleUrl,
                        userId: getCookieByName('IDENTITY')
                    },
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'commentCallBack',
                    success: function (data) {
                        console.log(data);
                        if (data.flag) {
                            showCommentData($.parseJSON(data.data));
                        }
                    }
                });
                //  初始化一些方法
                intCommentMethod();
                dealInputClickEvet();
                // 分享
                $.fn.initShare({type: 'm5', target: '.jtshare_m1'});
                $.fn.initShare({type: 'm6', target: '.comment_input_jjh'});
                // 插入弹幕结构
                if ($('.article_con,.article-con').find('img').length > 0) {
                    var acfun = barrageHtml();
                    $('.article_con,.article-con').append(acfun);
                }
                scroll(function (direction) {
                    if (direction === 'down') {
                        $('.comment_repely_input').css('bottom', '-.98rem');
                        // 当底部有广告时执行
                        if ($('.bottom-banner').length > 0) {
                            $('.bottom-banner').css('bottom', '0rem');
                        }
                    }
                    else {
                        if ($('.bottom-banner').length > 0) {
                            $('.bottom-banner').css('bottom', '.98rem');
                        }
                        $('.comment_repely_input').css('bottom', '0');
                    }
                });
            });

    };
    return customElement;
});
