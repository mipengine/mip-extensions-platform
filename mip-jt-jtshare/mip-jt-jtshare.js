/**
 * @file mip-jt-jtshare 分享组件
 * @author
 * 说明: ------> qzone  sina tqq  douban 这些分享链接是http链接,并且这里http不用引起本组件https站点报错问题
 * http://sns.qzone.qq.com
 * http://service.weibo.com
 * http://connect.qq.com
 * http://www.douban.com
 */

define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element2 = this.element;
        (function ($, window, document) {
            var qzone = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey'
                + '?url={url}&title={title}&pics={pic}&summary={content}';
            var sina = 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false';
            var tqq = 'http://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}';
            var douban = 'http://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}';
            var weixin = 'https://wenda.cngold.org/api.htm?text={url}';

            $.fn.socialShare = function (options, param) {
                if (typeof options === 'string') {
                    var method = $.fn.socialShare.methods[options];
                    if (method) {
                        return method(this, param);
                    }
                } else {
                    init(this, options);
                }
            };
            $.fn.socialShare.defaults = {
                url: window.location.href,
                title: document.title,
                content: '',
                pic: '',
                type: 'm1',
                target: 'jtshare_m1'
            };
            $.fn.initShare = function (options) {
                init(this, options);
                var settings = $.extend({}, $.fn.socialShare.defaults, options);
                if (options.type === 'm1') {
                    var sharehtml = '<div class="jtshare_m_1" style="display: none;">'
                        + '	<div class="jtshare_m_article_1 jtshare_m_content_1">'
                        + '		<p class="jtshare_m_tit_1">分享到</p>'
                        + '		<div  data-bd-bind="0">'
                        + '			<ul class="jtshare_m_app_1 clearfix">'
                        + '			<li><a id="weixin_share" href="javascript:void(0);" class="jtshare_m_weixin_1" '
                        + 'data-cmd="weixin">微信朋友圈</a></li>'
                        + '				<li><a id="weibo_share" href="javascript:void(0);" class="jtshare_m_weibo_1" '
                        + 'data-cmd="tsina">新浪微博</a></li>'
                        + '				<li><a id="qzone_share" href="javascript:void(0);" class="jtshare_m_qzone_1" '
                        + 'data-cmd="qzone_share">QQ空间</a></li>'
                        + '				<li><a id="qq_share" href="javascript:void(0);" class="jtshare_m_qq_1" '
                        + 'data-cmd="qq_share">QQ好友</a></li>'
                        + '			</ul>'
                        + '		</div>'
                        + '		<div class="jtshare_m_close_1"></div>'
                        + '	</div>'
                        + '</div>'
                        + '<div class="jtshare_m_cover_1" style="display: none;"></div>';
                    $('body').append(sharehtml);
                    $(document).on('click', '.jtshare_m_1 .jtshare_m_close_1', function () {
                        $('.jtshare_m_1').fadeOut();
                        $('.jtshare_m_cover_1').fadeOut();
                        $('.jtshare_m_weixin_qrcode_1').hide();
                    });
                    $(document).on('click', settings.target, function () {
                        $('.jtshare_m_cover_1').fadeIn();
                        $('.jtshare_m_1').fadeIn();
                    });
                    $('#weixin_share').on('click', function () {
                        $(this).socialShare('weixinShare', settings);
                    });
                    $('#weibo_share').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('#qzone_share').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('#qq_share').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });
                } else if (options.type === 'm11') {
                    var sharehtml = '<div class="jtshare_m_1" style="display: none;">'
                        + '	<div class="jtshare_m_article_1 jtshare_m_content_1">'
                        + '		<p class="jtshare_m_tit_1">分享到</p>'
                        + '		<div  data-bd-bind="0">'
                        + '			<ul class="jtshare_m_app_1 clearfix">'
                        + '				<li><a id="weixin_share" href="javascript:void(0);" class="jtshare_m_weixin_2"'
                        + ' data-cmd="weixin">微信</a></li>'
                        + '				<li><a id="weixinFriend_share" href="javascript:void(0);" '
                        + 'class="jtshare_m_weixin_1" data-cmd="weixinFriend">微信朋友圈</a></li>'
                        + '				<li><a id="weibo_share" href="javascript:void(0);" class="jtshare_m_weibo_1" '
                        + 'data-cmd="tsina">新浪微博</a></li>'
                        + '				<li><a id="qzone_share" href="javascript:void(0);" class="jtshare_m_qzone_1" '
                        + 'data-cmd="qzone_share">QQ空间</a></li>'
                        + '				<li><a id="qq_share" href="javascript:void(0);" class="jtshare_m_qq_1" '
                        + 'data-cmd="qq_share">QQ好友</a></li>'
                        + '			</ul>'
                        + '		</div>'
                        + '		<div class="jtshare_m_close_1"></div>'
                        + '	</div>'
                        + '</div>'
                        + '<div class="jtshare_m_cover_1" style="display: none;"></div>';
                    $('body').append(sharehtml);
                    $(document).on('click', '.jtshare_m_1 .jtshare_m_close_1', function () {
                        $('.jtshare_m_1').fadeOut();
                        $('.jtshare_m_cover_1').fadeOut();
                        $('.jtshare_m_weixin_qrcode_1').hide();
                    });
                    $(document).on('click', settings.target, function () {
                        $('.jtshare_m_cover_1').fadeIn();
                        $('.jtshare_m_1').fadeIn();
                    });
                    $('#weixin_share').on('click', function () {
                        $(this).socialShare('weixinShareM', settings);
                    });
                    $('#weixinFriend_share').on('click', function () {
                        $(this).socialShare('weixinFriendShareM', settings);
                    });
                    $('#weibo_share').on('click', function () {
                        $(this).socialShare('sinaWeiboShareM', settings);
                    });
                    $('#qzone_share').on('click', function () {
                        $(this).socialShare('qzoneShareM', settings);
                    });
                    $('#qq_share').on('click', function () {
                        $(this).socialShare('qqShareM', settings);
                    });
                }
                else if (options.type === 'm2') {
                    var sharehtml = ''
                        + '<div class="jtshare_m_2">'
                        + '	<div class="jtshare_m_article_2">'
                        + '		<p class="jtshare_m_tit_1"><span class="jtshare_to">分享到</span>'
                        + '<span class="jtshare_to_b"></span></p>'
                        + '		<div data-bd-bind="0">'
                        + '			<ul class="jtshare_m_app_1 clearfix">'
                        + '				<li><a id="weixinfri_share" href="javascript:void(0);" '
                        + 'class="jtshare_m_weixin_fri_1" data-cmd="weixin"></a></li>'
                        + '				<li><a id="weibo_share" href="javascript:void(0);" '
                        + 'class="jtshare_m_weibo_1" data-cmd="tsina"></a></li>'
                        + '				<li><a id="qzone_share" href="javascript:void(0);" class="jtshare_m_qzone_1" '
                        + 'data-cmd="qzone_share"></a></li>'
                        + '				<li><a id="qq_share" href="javascript:void(0);" class="jtshare_m_qq_1" '
                        + 'data-cmd="qq_share"></a></li>'
                        + '			</ul>'
                        + '		</div>'
                        + '		<div class="jtshare_m_close_1"></div>'
                        + '		<div class="share-url" style="">'
                        + '			<p>长按复制下方链接，去粘贴给好友吧</p>'
                        + '			<div class="jtshare_comment_share_url">' + settings.url + '</div>'
                        + '		</div>'
                        + '	</div>'
                        + '</div>'
                        + '<div class="jtshare_m_cover_2"></div>';
                    $('' + options.target + '').html(sharehtml);
                    $('.share_m_icon').click(function () {
                        $('.jtshare_m_2').show();
                        $('.jtshare_m_cover_2').show();
                        $('#share-url').hide();
                    });
                    $('.jtshare_m_close_1').click(function () {
                        event.stopPropagation();
                        event.preventDefault();
                        $('.jtshare_m_2').hide();
                        $('.jtshare_m_cover_2').hide();
                        $('.jtshare_m_weixin_qrcode_1').hide();
                    });
                    $('.jtshare_m_weixin_1').click(function () {
                        $('#share-url').show();
                    });
                    $('.jtshare_m_weixin_fri_1').click(function () {
                        $('#share-url').show();
                    });
                    $('#weixinfri_share').on('click', function () {
                        $(this).socialShare('weixinShare', settings);
                    });
                    $('#weibo_share').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('#qzone_share').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('#qq_share').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });
                } else if (options.type === 'm3') {
                    var sharehtml = ''
                        + '<div class="jtshare_m_3">'
                        + '	<div class="jtshare_m_article_3">'
                        + '		<p class="jtshare_m_tit_1"><span class="jtshare_to">分享到</span>'
                        + '<span class="jtshare_to_b"></span></p>'
                        + '		<div data-bd-bind="0">'
                        + '			<ul class="jtshare_m_app_1 clearfix">'
                        + '				<li><a id="weixinfri_share" href="javascript:void(0);" '
                        + 'class="jtshare_m_weixin_fri_1" data-cmd="weixin"></a></li>'
                        + '				<li><a id="weibo_share" href="javascript:void(0);" class="jtshare_m_weibo_1" '
                        + 'data-cmd="tsina"></a></li>'
                        + '				<li><a id="qzone_share" href="javascript:void(0);" class="jtshare_m_qzone_1" '
                        + 'data-cmd="qzone_share"></a></li>'
                        + '				<li><a id="qq_share" href="javascript:void(0);" class="jtshare_m_qq_1" '
                        + 'data-cmd="qq_share"></a></li>'
                        + '			</ul>'
                        + '		</div>'
                        + '		<div class="jtshare_m_close_1"></div>'
                        + '		<div class="share-url" style="">'
                        + '			<p>长按复制下方链接，去粘贴给好友吧</p>'
                        + '			<div class="jtshare_comment_share_url">' + settings.url + '</div>'
                        + '		</div>'
                        + '	</div>'
                        + '</div>'
                        + '<div class="jtshare_m_cover_3"></div>';
                    $('' + options.target + '').html(sharehtml);
                    $('.share_m_icon').click(function () {
                        $('.jtshare_m_3').show();
                        $('.jtshare_m_cover_3').show();
                        $('#share-url').hide();
                    });
                    $('.jtshare_m_close_1').click(function () {
                        event.stopPropagation();
                        event.preventDefault();
                        $('.jtshare_m_3').hide();
                        $('.jtshare_m_cover_3').hide();
                        $('.jtshare_m_weixin_qrcode_1').hide();
                    });
                    $('.jtshare_m_weixin_1').click(function () {
                        $('#share-url').show();
                    });
                    $('.jtshare_m_weixin_fri_1').click(function () {
                        $('#share-url').show();
                    });
                    $('#weixinfri_share').on('click', function () {
                        $(this).socialShare('weixinShare', settings);
                        $('.jtshare_m_cover_3').show();
                    });
                    $('#weibo_share').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('#qzone_share').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('#qq_share').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });

                } else if (options.type === 'm4') {
                    var sharehtml = ''
                        + '<div class="jtshare_m_4">'
                        + '	<div class="jtshare_m_article_4">'
                        + '		<p class="jtshare_m_tit_1">'
                        + '			<span class="jtshare_to">分享到</span>'
                        + '			<span class="jtshare_to_b"></span>'
                        + '		</p>'
                        + '		<div data-bd-bind="0">'
                        + '			<ul class="jtshare_m_app_1 clearfix">'
                        + '				<li><a id="weixinfri_share" href="javascript:void(0);" '
                        + 'class="jtshare_m_weixin_fri_1" data-cmd="weixin"></a></li>'
                        + '				<li><a id="weibo_share" href="javascript:void(0);"'
                        + 'class="jtshare_m_weibo_1" data-cmd="tsina"></a></li>'
                        + '				<li><a id="qzone_share" href="javascript:void(0);" '
                        + 'class="jtshare_m_qzone_1" data-cmd="qzone_share"></a></li>'
                        + '				<li><a id="qq_share" href="javascript:void(0);" '
                        + 'class="jtshare_m_qq_1" data-cmd="qq_share"></a></li>'
                        + '			</ul>'
                        + '		</div>'
                        + '	</div>'
                        + '</div>'
                        + '';
                    $('' + options.target + '').html(sharehtml);
                    $('.share_m_icon').click(function () {
                        $('.jtshare_m_4').show();
                        $('#share-url').hide();
                    });
                    $('.jtshare_m_close_1').click(function () {
                        event.stopPropagation();
                        event.preventDefault();
                        $('.jtshare_m_4').hide();
                        $('.jtshare_m_cover_3').hide();
                        $('.jtshare_m_weixin_qrcode_1').hide();
                    });
                    $('.jtshare_m_weixin_1').click(function () {
                        $('#share-url').show();
                    });
                    $('.jtshare_m_weixin_fri_1').click(function () {
                        $('#share-url').show();
                    });

                    $('#weixinfri_share').on('click', function () {
                        $(this).socialShare('weixinShare', settings);
                        $('.jtshare_m_cover_3').show();
                    });
                    $('#weibo_share').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('#qzone_share').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('#qq_share').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });

                } else if (options.type === 'm5') {
                    var sharehtml = ''
                        + '<div class="jtshare_m_5" style="display: none;">  '
                        + '  <div class="jtshare_m_article_5">  '
                        + '   <div class="jtshare_m_tit_1">分享到</div>  '
                        + '   <div data-bd-bind="0">  '
                        + '    <ul class="jtshare_m_app_1 clearfix">  '
                        + '     <li><a id="weixin_share" href="javascript:void(0);" class="jtshare_m_weixin_1" '
                        + 'data-cmd="weixin"><i></i>微信朋友圈</a></li> '
                        + '     <li><a id="weibo_share" href="javascript:void(0);" class="jtshare_m_weibo_1" '
                        + 'data-cmd="tsina"><i></i>新浪微博</a></li>  '
                        + '     <li><a id="qq_share" href="javascript:void(0);" class="jtshare_m_qq_1" '
                        + 'data-cmd="qq_share"><i></i>QQ好友</a></li>  '
                        + '     <li><a id="qzone_share" href="javascript:void(0);" class="jtshare_m_qzone_1" '
                        + 'data-cmd="qzone_share"><i></i>QQ空间</a></li>  '
                        + '    </ul>  '
                        + '   </div>  '
                        + '   <div class="jtshare_m_close_1">取消</div>  '
                        + '  </div> '
                        + '</div> '
                        + '<div class="jtshare_m_cover_5" style="display: none;"></div>';
                    $('body').append(sharehtml);
                    $('' + options.target + '').click(function () {
                        $('.jtshare_m_5').show();
                        $('.jtshare_m_cover_5').show();
                    });
                    $('.jtshare_m_close_1').click(function () {
                        event.stopPropagation();
                        event.preventDefault();
                        $('.jtshare_m_5').hide();
                        $('.jtshare_m_cover_5').hide();
                        $('.jtshare_m_weixin_qrcode_1').hide();
                    });
                    $('#weixin_share').on('click', function () {
                        $(this).socialShare('weixinShare', settings);
                        $('.jtshare_m_cover_5').show();
                    });
                    $('#weibo_share').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('#qq_share').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });
                    $('#qzone_share').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                } else if (options.type === 'm6') {
                    var sharehtml = ''
                        + '<div class="jtshare_m_6" style="display: none;">'
                        + '	<div class="jtshare_m_tit">下载</div>'
                        + '   <div class="jtshare_download_btn clearfix">'
                        + '     <a href="http://a.app.qq.com/o/simple.jsp?pkgname=cn.jijinhao.td.android" '
                        + 'target="_blank" title="集金号">'
                        + '       <img src="img/m_jtshare_download_jjh.png" alt="集金号" />'
                        + '       <p>集金号</p>'
                        + '     </a>'
                        + '     <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.sangame.jjhcps.android" '
                        + 'target="_blank" title="金投网">'
                        + '       <img src="img/m_jtshare_download_jtw.png" alt="金投网" />'
                        + '       <p>金投网</p>'
                        + '     </a>'
                        + '     <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jijinhao.xuetang" '
                        + 'target="_blank" title="集金学堂">'
                        + '       <img src="img/m_jtshare_download_jjxt.png" alt="集金学堂" />'
                        + '       <p>集金学堂</p>'
                        + '     </a>'
                        + '   </div>'
                        + '   <div class="jtshare_m_close_1">取消</div>'
                        + '</div>'
                        + '<div class="jtshare_m_cover_6" style="display: none;"></div>';
                    $('body').append(sharehtml);
                    $('' + options.target + '').click(function () {
                        $('.jtshare_m_6').show();
                        $('.jtshare_m_cover_6').show();
                    });
                    $('.jtshare_m_close_1').click(function () {
                        event.stopPropagation();
                        event.preventDefault();
                        $('.jtshare_m_6').hide();
                        $('.jtshare_m_cover_6').hide();
                    });
                }
                else if (options.type === 'pc1') {
                    var sharehtml = ''
                        + '<ul class="jtshare_pc_1 jtshare_pc_1_fr">'
                        + '	<span class="jtshare_pc_1_share-to">分享到：</span>'
                        + '	<li class="jtshare_pc_weixin_1">'
                        + '		<div id="wenxin_share" data-cmd="weixin">'
                        + '			<a href="javascript:void(0)" title="weixin"></a>'
                        + '		</div>'
                        + '		<div class="jtshare_pc_erweima_1" >'
                        + '			<img src="https://wenda.cngold.org/api.htm?text='
                        + settings.url + '" alt="' + settings.title + '">'
                        + '			<div>扫码分享到微信</div>'
                        + '		</div>'
                        + '	</li>'
                        + '	<li class="jtshare_pc_weibo_1">'
                        + '		<div id="weibo_share" data-cmd="tsina">'
                        + '			<a href="javascript:void(0)" title="微博"></a>'
                        + '		</div>'
                        + '	</li>'
                        + '	<li class="jtshare_pc_qq_1">'
                        + '		<div id="qq_share"  data-cmd="qq_share">'
                        + '			<a href="javascript:void(0)"  title="qq"></a>'
                        + '		</div>'
                        + '	</li>'
                        + '	<li class="jtshare_pc_zone_1">'
                        + '		<div id="qzone_share"   data-cmd="qzone_share">'
                        + '			<a href="javascript:void(0)" title="空间"></a>'
                        + '		</div>'
                        + '	</li>'
                        + '	<li class="jtshare_pc_favor_1">  '
                        + '		<div id="favorate" onclick="addFavorite(\''
                        + settings.url + '\',\'' + settings.title + '\',\''
                        + settings.target.substring(1, settings.target.length) + 'success\')" data-cmd="favorate">'
                        + '			<a href="javascript:void(0)" title="收藏"></a>'
                        + '		</div>'
                        + '		<div class="jtsher_favor_layer '
                        + settings.target.substring(1, settings.target.length)
                        + 'success">收藏成功<a href="#" target="_blank"  '
                        + 'class="ucfavorate" title="我的收藏">查看我的收藏 ></a></div>'
                        + '	</li>'
                        + '</ul>';
                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);
                    $('#weibo_share').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('#qzone_share').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('#qq_share').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });
                } else if (options.type === 'pc2') {
                    var sharehtml = ''
                        + '<div class="jtshare_pc_2">'
                        + '	<div class="jtshare_pc">'
                        + '		<span class="jtshare_to" data-cmd="jtshare_to">分享到:</span>'
                        + '		<a href="javascript:void(0)" title="微信" id="weixin_share" '
                        + 'data-cmd="weixin" class="jt_weixin"></a>'
                        + '		<a href="javascript:void(0)" title="微博" id="weibo_share" '
                        + 'data-cmd="tsina" class="jt_weibo"></a>'
                        + '		<a href="javascript:void(0)" title="qq" id="qq_share"  '
                        + 'data-cmd="qq_share" class="jt_qq"></a>'
                        + '		<a href="javascript:void(0)" title="空间" id="qzone_share"  '
                        + 'data-cmd="qzone_share" class="jt_qzone"></a>'
                        + '		<a href="javascript:void(0)" title="收藏" id="favorate" '
                        + 'data-cmd="favorate" onclick="addFavorite(\'' + settings.url + '\',\''
                        + settings.title + '\',\'' + settings.target.substring(1, settings.target.length)
                        + 'success\')" class="jt_favor"></a> '
                        + '	</div>'
                        + '	<div class="jtsher_favor_layer '
                        + settings.target.substring(1, settings.target.length) + 'success">收藏成功<a href="#" '
                        + 'target="_blank" class="ucfavorate" title="我的收藏">查看我的收藏 &gt;</a></div>'
                        + '</div>';
                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);

                    $('.jt_weixin').on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                        $('.jtshare_pc_erweima_2').show();
                    });
                    $('.jt_weibo').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.jt_qzone').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('.jt_qq').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });

                } else if (options.type === 'pc3') {

                    var sharehtml = ''
                        + '<div class="jtshare_pc_3">'
                        + '	<div class="jtshare_pc">'
                        + '		<span class="jtshare_to" data-cmd="jtshare_to">分享到:</span>'
                        + '		<a href="javascript:void(0)" title="微信" id="weixin_share" '
                        + 'data-cmd="weixin" class="jt_weixin"></a>'
                        + '		<a href="javascript:void(0)" title="微博" id="weibo_share" '
                        + 'data-cmd="tsina" class="jt_weibo"></a>'
                        + '		<a href="javascript:void(0)" title="qq" id="qq_share"  '
                        + 'data-cmd="qq_share" class="jt_qq"></a>'
                        + '		<a href="javascript:void(0)" title="空间" id="qzone_share"  '
                        + 'data-cmd="qzone_share" class="jt_qzone"></a>'
                        + '		<a href="javascript:void(0)" title="收藏" id="favorate"'
                        + 'data-cmd="favorate" onclick="addFavorite(\'' + settings.url + '\',\''
                        + settings.title + '\',\'' + settings.target.substring(1, settings.target.length)
                        + 'success\')" '
                        + 'class="jt_favor"></a> '
                        + '	</div>'
                        + '	<div class="jtsher_favor_layer ' + settings.target.substring(1,
                            settings.target.length) + 'success">收藏成功<a href="#" target="_blank" class="ucfavorate" '
                        + 'title="我的收藏">查看我的收藏 &gt;</a></div>'
                        + '</div>';

                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);

                    $('.jt_weixin').on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                        $('.jtshare_pc_erweima_2').show();
                    });

                    $('.jt_weibo').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.jt_qzone').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('.jt_qq').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });

                } else if (options.type === 'pc4') {
                    var sharehtml = ''
                        + '<div class="jtshare_pc_4">'
                        + '	<div class="jtshare_pc">'
                        + '		<a href="javascript:void(0)" title="微信" class="weixin_share_pc4 jt_weixin" '
                        + 'data-cmd="weixin"></a>'
                        + '		<a href="javascript:void(0)" title="微博" class="weibo_share_pc4 jt_weibo" '
                        + 'data-cmd="tsina"></a>'
                        + '		<a href="javascript:void(0)" title="qq" class="qq_share_pc4 jt_qq"  '
                        + 'data-cmd="qq_share"></a>'
                        + '		<a href="javascript:void(0)" title="空间" class="qzone_share_pc4 jt_qzone"  '
                        + 'data-cmd="qzone_share"></a>'
                        + '		<a href="javascript:void(0)" title="收藏" id="favorate" data-cmd="favorate" '
                        + 'onclick="addFavorite(\'' + settings.url + '\',\'' + settings.title + '\',\''
                        + settings.target.substring(1, settings.target.length) + 'success\')" class="jt_favor"></a> '
                        + '	</div>'
                        + '	<div class="jtsher_favor_layer ' + settings.target.substring(1, settings.target.length)
                        + 'success">收藏成功<a href="#" target="_blank" class="ucfavorate" '
                        + 'title="我的收藏">查看我的收藏 &gt;</a></div>'
                        + '</div>';

                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);

                    $('.weixin_share_pc4').on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                    });
                    $('.weibo_share_pc4').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.qzone_share_pc4').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('.qq_share_pc4').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });

                    $('.jt_weixin').click(function () {
                        $('.jtshare_pc_erweima_2').show();
                    });


                } else if (options.type === 'pc7') {

                    var sharehtml = ''
                        + '<div class="jtshare_pc_7">'
                        + '	<div class="jtshare_pc">'
                        + '		<span class="jtshare_to" data-cmd="jtshare_to">分享到:</span>'
                        + '		<a href="javascript:void(0)" title="微信" id="weixin_share" '
                        + 'data-cmd="weixin" class="jt_weixin"></a>'
                        + '		<a href="javascript:void(0)" title="微博" id="weibo_share" '
                        + 'data-cmd="tsina" class="jt_weibo"></a>'
                        + '		<a href="javascript:void(0)" title="qq" id="qq_share"  '
                        + 'data-cmd="qq_share" class="jt_qq"></a>'
                        + '		<a href="javascript:void(0)" title="空间" id="qzone_share" '
                        + 'data-cmd="qzone_share" class="jt_qzone"></a>'
                        + '		<a href="javascript:void(0)" title="收藏" id="favorate" '
                        + 'data-cmd="favorate" onclick="addFavorite(\'' + settings.url + '\',\'' + settings.title
                        + '\',\'' + settings.target.substring(1, settings.target.length)
                        + 'success\')" class="jt_favor"></a> '
                        + '	</div>'
                        + '	<div class="jtsher_favor_layer ' + settings.target.substring(1, settings.target.length)
                        + 'success">收藏成功<a href="#" target="_blank" class="ucfavorate" '
                        + 'title="我的收藏">查看我的收藏 &gt;</a></div>'
                        + '</div>';

                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);

                    $('.jt_weixin').on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                        $('.jtshare_pc_erweima_2').show();
                    });

                    $('.jt_weibo').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.jt_qzone').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('.jt_qq').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });
                } else if (options.type === 'pc8') {
                    var sharehtml = ''
                        + '<div class="jtshare_pc_8">'
                        + '	<div class="jtshare_pc">'
                        + '		<span class="jtshare_to" data-cmd="jtshare_to">分享到:</span>'
                        + '		<a href="javascript:void(0)" title="微信" id="weixin_share" '
                        + 'data-cmd="weixin" class="jt_weixin"></a>'
                        + '		<a href="javascript:void(0)" title="微博" id="weibo_share" '
                        + 'data-cmd="tsina" class="jt_weibo"></a>'
                        + '		<a href="javascript:void(0)" title="qq" id="qq_share"  '
                        + 'data-cmd="qq_share" class="jt_qq"></a>'
                        + '		<a href="javascript:void(0)" title="空间" id="qzone_share"  '
                        + 'data-cmd="qzone_share" class="jt_qzone"></a>'
                        + '		<a href="javascript:void(0)" title="收藏" id="favorate" '
                        + 'data-cmd="favorate" onclick="addFavorite(\'' + settings.url + '\',\'' + settings.title
                        + '\',\'' + settings.target.substring(1, settings.target.length)
                        + 'success\')" class="jt_favor"></a> '
                        + '	</div>'
                        + '	<div class="jtsher_favor_layer ' + settings.target.substring(1, settings.target.length)
                        + 'success">收藏成功<a href="#" target="_blank" class="ucfavorate" '
                        + 'title="我的收藏">查看我的收藏 &gt;</a></div>'
                        + '</div>';
                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);

                    $('.jt_weixin').on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                        $('.jtshare_pc_erweima_2').show();
                    });
                    $('.jt_weibo').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.jt_qzone').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('.jt_qq').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });

                } else if (options.type === 'pc5') {
                    var sharehtml = ''
                        + '<div class="jtshare_pc_5">'
                        + '	<span class="jtshare_more" data-cmd="jtshare_more"></span>'
                        + '	<div class="jtshare_pc">'
                        + '		<span class="jtshare_more_hover" data-cmd="jtshare_more_hover"></span>'
                        + '		<div class="a_bor">'
                        + '			<a href="javascript:void(0)" title="微信" id="weixin_share" '
                        + 'data-cmd="weixin" class="jt_weixin">微信分享</a>'
                        + '			<a href="javascript:void(0)" title="微博" id="weibo_share" '
                        + 'data-cmd="tsina" class="jt_weibo">新浪微博</a>'
                        + '			<a href="javascript:void(0)" title="qq" id="qq_share"  '
                        + 'data-cmd="qq_share" class="jt_qq">QQ好友</a>'
                        + '			<a href="javascript:void(0)" title="空间" id="qzone_share"  '
                        + 'data-cmd="qzone_share" class="jt_qzone">QQ空间</a>'
                        + '			<a href="javascript:void(0)" title="收藏" id="favorate" data-cmd="favorate" '
                        + 'onclick="addFavorite(\'' + settings.url + '\',\'' + settings.title + '--\',\''
                        + settings.target.substring(1, settings.target.length)
                        + 'success\')" class="jt_favor">收藏</a> '
                        + '		</div>'
                        + '	</div>'
                        + '	<div class="jtsher_favor_layer ' + settings.target.substring(1, settings.target.length)
                        + 'success">收藏成功<a href="#" target="_blank" class="ucfavorate" '
                        + 'title="我的收藏">查看我的收藏 &gt;</a></div>'
                        + '</div>';
                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);

                    $('.jt_weixin').on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                        $('.jtshare_pc_erweima_2').show();
                    });
                    $('.jt_weibo').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.jt_qzone').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('.jt_qq').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });


                } else if (options.type === 'pc6') {
                    var sharehtml = ''
                        + '<div class="jtshare_pc_5">'
                        + '	<span class="jtshare_more" data-cmd="jtshare_more"></span>'
                        + '	<div class="jtshare_pc">'
                        + '		<span class="jtshare_more_hover" data-cmd="jtshare_more_hover"></span>'
                        + '		<div class="a_bor">'
                        + '			<a href="javascript:void(0)" title="微信" id="weixin_share" '
                        + 'data-cmd="weixin" class="jt_weixin">微信分享</a>'
                        + '			<a href="javascript:void(0)" title="微博" id="weibo_share" '
                        + 'data-cmd="tsina" class="jt_weibo">新浪微博</a>'
                        + '			<a href="javascript:void(0)" title="qq" id="qq_share"  '
                        + 'data-cmd="qq_share" class="jt_qq">QQ好友</a>'
                        + '			<a href="javascript:void(0)" title="收藏" id="favorate" '
                        + 'data-cmd="favorate" onclick="addFavorite(\'' + settings.url + '\',\'' + settings.title
                        + '--\',\'' + settings.target.substring(1, settings.target.length)
                        + 'success\')" class="jt_favor">收藏</a> '
                        + '		</div>'
                        + '	</div>'
                        + '	<div class="jtsher_favor_layer ' + settings.target.substring(1, settings.target.length)
                        + 'success">收藏成功<a href="#" target="_blank" class="ucfavorate" '
                        + 'title="我的收藏">查看我的收藏 &gt;</a></div>'
                        + '</div>';

                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);
                    $('.jt_weixin').on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                        $('.jtshare_pc_erweima_2').show();
                    });

                    $('.jt_weibo').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.jt_qzone').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('.jt_qq').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });


                } else if (options.type === 'pc61') {

                    var targid = options.target;
                    if (targid) {
                        targid = targid.replace('.', '');
                    }
                    var sharehtml = ''
                        + '<div class="jtshare_pc_5">'
                        + '	<span class="jtshare_more" data-cmd="jtshare_more"></span>'
                        + '	<div class="jtshare_pc">'
                        + '		<span class="jtshare_more_hover" data-cmd="jtshare_more_hover"></span>'
                        + '		<div class="a_bor">'
                        + '			<a href="javascript:void(0)" title="微信" id="weixin_share" '
                        + 'data-cmd="weixin" class="jt_weixin jt_weixin' + targid + '">微信分享</a>'
                        + '			<a href="javascript:void(0)" title="微博" id="weibo_share" '
                        + 'data-cmd="tsina" class="jt_weibo jt_weibo' + targid + '">新浪微博</a>'
                        + '			<a href="javascript:void(0)" title="qq" id="qq_share"  '
                        + 'data-cmd="qq_share" class="jt_qq jt_qq' + targid + '">QQ好友</a>'
                        + '			<a href="javascript:void(0)" title="空间" id="qzone_share"  '
                        + 'data-cmd="qzone_share" class="jt_qzone jt_qzone' + targid + '">QQ空间</a>'
                        + '			<a href="javascript:void(0)" title="收藏" id="favorate" '
                        + 'data-cmd="favorate"  onclick="addFavorite(\'' + settings.url + '\',\'' + settings.title
                        + '--\',\'' + settings.target.substring(1, settings.target.length)
                        + 'success\')" class="jt_favor">收藏</a> '
                        + '		</div>'
                        + '	</div>'
                        + '	<div class="jtsher_favor_layer ' + settings.target.substring(1, settings.target.length)
                        + 'success">收藏成功<a href="#" target="_blank" class="ucfavorate" '
                        + 'title="我的收藏">查看我的收藏 &gt;</a></div>'
                        + '</div>';
                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);

                    $('.jt_weixin' + targid).on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                        $('.jtshare_pc_erweima_2').show();
                    });

                    $('.jt_weibo' + targid).on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.jt_qzone' + targid).on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('.jt_qq' + targid).on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });

                } else if (options.type === 'pc9') {
                    var sharehtml = ''
                        + '<div class="jtshare_pc_9">'
                        + '	<em class="sina jt_weibo"><a class="bds_tsina "></a></em>'
                        + '	<em class="qq jt_qzone"><a class="bds_qzone "></a></em>'
                        + '	<em class="zone jt_qq"><a class="bds_tqq "></a></em>'
                        + '</div>';
                    $('' + options.target + '').html(sharehtml);
                    applogin($('' + options.target + ''), sharehtml, settings);
                    $('.jt_weibo').on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.jt_qzone').on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });
                    $('.jt_qq').on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });
                } else if (options.type === 'pc10') {
                    var targid = options.target;
                    if (targid) {
                        targid = targid.replace('.', '');
                    }
                    var sharehtml = ''
                        + '<div class="jtshare_pc_10">'
                        + '    <div class="zj_share  clearfix">'
                        + '        <div class="share_btn"></div>'
                        + '        <div class="zj_share_box">'
                        + '            <a href="javascript:void(0)" class="copy         copy'
                        + targid + '"       data-cmd="' + options.url + '" title="复制网站">复制网站</a>'
                        + '            <a href="javascript:void(0)" class="bds_sqq      bds_sqq'
                        + targid + '"    data-cmd="sqq"    title="分享到QQ">QQ好友</a>'
                        + '            <a href="javascript:void(0)" class="bds_weixin   bds_weixin'
                        + targid + '" data-cmd="weixin" title="分享到微信">微信分享</a>'
                        + '            <a href="javascript:void(0)" class="bds_tsina    bds_tsina'
                        + targid + '"  data-cmd="tsina"  title="分享到新浪微博">新浪微博</a>'
                        + '            <a href="javascript:void(0)" class="bds_qzone    bds_qzone'
                        + targid + '"  data-cmd="qzone"  title="分享到QQ空间">QQ空间</a>'
                        + '        </div>'
                        + '    </div>'
                        + '</div>'
                        + '';
                    $(options.target).html(sharehtml);
                    $('.zj_share').mouseover(function () {
                        $(this).stop();
                        $('.share_btn').addClass('share_btn_hover');
                        $(this).animate({left: '0'});
                    });
                    $('.zj_share').mouseout(function () {
                        $(this).stop();
                        $('.share_btn').removeClass('share_btn_hover');
                        $(this).animate({left: '-142px'});
                    });
                    $('.copy' + targid).on('click', function () {
                        $(this).socialShare('-142px', settings);
                    });
                    $('.bds_sqq' + targid).on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });
                    $('.bds_weixin' + targid).on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                        $('.jtshare_pc_erweima_2').show();
                    });
                    $('.bds_tsina' + targid).on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });
                    $('.bds_qzone' + targid).on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });

                } else if (options.type === 'pc11') {
                    var targid = options.target;
                    if (targid) {
                        targid = targid.replace('.', '');
                    }
                    var sharehtml = ''
                        + '<div class="jtshare_pc_11">'
                        + '    <div class="zj_share  clearfix">'
                        + '        <div class="share_btn"></div>'
                        + '        <div class="zj_share_box">'
                        + '            <a href="javascript:void(0)" class="copy 		  copy'
                        + targid + '" data-cmd="' + options.url + '" title="复制网站">复制网站</a>'
                        + '            <a href="javascript:void(0)" class="bds_sqq      bds_sqq'
                        + targid + '"    data-cmd="sqq"    title="分享到QQ">QQ好友</a>'
                        + '            <a href="javascript:void(0)" class="bds_weixin   bds_weixin'
                        + targid + '" data-cmd="weixin" title="分享到微信">微信分享</a>'
                        + '            <a href="javascript:void(0)" class="bds_tsina    bds_tsina'
                        + targid + '"  data-cmd="tsina"  title="分享到新浪微博">新浪微博</a>'
                        + '            <a href="javascript:void(0)" class="bds_qzone    bds_qzone'
                        + targid + '"  data-cmd="qzone"  title="分享到QQ空间">QQ空间</a>'
                        + '        </div>'
                        + '    </div>'
                        + '</div>'
                        + '';
                    $(options.target).html(sharehtml);
                    $('.zj_share').mouseover(function () {
                        $(this).stop();
                        $('.share_btn').addClass('share_btn_hover');
                        $(this).animate({left: '0'});
                    });
                    $('.zj_share').mouseout(function () {
                        $(this).stop();
                        $('.share_btn').removeClass('share_btn_hover');
                        $(this).animate({left: '-142px'});
                    });

                    $('.copy' + targid).on('click', function () {
                        $(this).socialShare('clickCopy', settings);
                    });

                    $('.bds_sqq' + targid).on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });

                    $('.bds_weixin' + targid).on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                    });

                    $('.bds_tsina' + targid).on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });

                    $('.bds_qzone' + targid).on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });

                    $('.bds_weixin' + targid).click(function () {
                        $('.jtshare_pc_erweima_2').show();
                    });

                } else if (options.type === 'pc12') {

                    var targid = options.target;
                    if (targid) {
                        targid = targid.replace('.', '');
                    }
                    var sharehtml = ''
                        + '<div class="jtshare_pc_12">'
                        + '    <div class="zj_share  clearfix">'
                        + '        <div class="share_btn"></div>'
                        + '        <div class="zj_share_box">'
                        + '            <a href="javascript:void(0)" class="copy 		  copy'
                        + targid + '" data-cmd="' + options.url + '" title="复制网站">复制网站</a>'
                        + '            <a href="javascript:void(0)" class="bds_sqq      bds_sqq'
                        + targid + '"    data-cmd="sqq"    title="分享到QQ">QQ好友</a>'
                        + '            <a href="javascript:void(0)" class="bds_weixin   bds_weixin'
                        + targid + '" data-cmd="weixin" title="分享到微信">微信分享</a>'
                        + '            <a href="javascript:void(0)" class="bds_tsina    bds_tsina'
                        + targid + '"  data-cmd="tsina"  title="分享到新浪微博">新浪微博</a>'
                        + '            <a href="javascript:void(0)" class="bds_qzone    bds_qzone'
                        + targid + '"  data-cmd="qzone"  title="分享到QQ空间">QQ空间</a>'
                        + '        </div>'
                        + '    </div>'
                        + '</div>'
                        + '';

                    $(options.target).html(sharehtml);

                    $('.zj_share').mouseover(function () {
                        $(this).stop();
                        $('.share_btn').addClass('share_btn_hover');
                        $(this).animate({left: '0'});
                    });
                    $('.zj_share').mouseout(function () {
                        $(this).stop();
                        $('.share_btn').removeClass('share_btn_hover');
                        $(this).animate({left: '-142px'});
                    });

                    $('.copy' + targid).on('click', function () {
                        $(this).socialShare('clickCopy', settings);
                    });

                    $('.bds_sqq' + targid).on('click', function () {
                        $(this).socialShare('qqShare', settings);
                    });

                    $('.bds_weixin' + targid).on('click', function () {
                        $(this).socialShare('weixinSharePC', settings);
                    });

                    $('.bds_tsina' + targid).on('click', function () {
                        $(this).socialShare('weiboShare', settings);
                    });

                    $('.bds_qzone' + targid).on('click', function () {
                        $(this).socialShare('qzoneShare', settings);
                    });

                    $('.bds_weixin' + targid).click(function () {
                        $('.jtshare_pc_erweima_2').show();
                    });

                }

            };

            function init(target, options) {
                var settings = $.extend({}, $.fn.socialShare.defaults, options);
                console.log(settings);
                var msbMain = '<a class="msb_main">分享:</a>';
                var socialGroup = '<div class="social_group" >'
                   + '<a class="msb_network_button weixin">weixin</a>'
                   + '<a class="msb_network_button sina">sina</a>'
                   + '<a class="msb_network_button tQQ">tQQ</a>'
                   + '<a class="msb_network_button qZone">qZone</a>'
                   + '<a class="msb_network_button douban">douban</a>'
                   + '</div>';
                $(target).append(msbMain);
                $(target).append(socialGroup);
                $(target).addClass('socialShare');
                $(document).on('click', '.msb_network_button.tQQ', function () {
                    tQQ(this, settings);
                });
                $(document).on('click', '.msb_network_button.qZone', function () {
                    qZone(this, settings);
                });
                $(document).on('click', '.msb_network_button.sina', function () {
                    sinaWeibo(this, settings);
                });
                $(document).on('click', '.msb_network_button.douban', function () {
                    doubanShare(this, settings);
                });
                $(document).on('click', '.msb_network_button.weixin', function () {
                    weixinShare(this, settings);
                    weixinSharePC(this, settings);
                });
                $(document).on('click', '.msb_main', function () {
                    if ($(this).hasClass('disabled')) {
                        return;
                    }
                    // 动画时间
                    var e = 500;
                    // 延迟时间
                    var t = 250;
                    // 分享组件的个数
                    var r = $(this).parent().find('.msb_network_button').length;
                    var i = 60;
                    var s = e + (r - 1) * t;
                    var o = 1;
                    var a = $(this).outerWidth();
                    var f = $(this).outerHeight();
                    var c = $(this).parent().find('.msb_network_button:eq(0)').outerWidth();
                    var h = $(this).parent().find('.msb_network_button:eq(0)').outerHeight();
                    var p = (a - c) / 2; // 起始位置
                    var d = (f - h) / 2; // 起始位置
                    var v = 0 / 180 * Math.PI;
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('disabled').delay(s).queue(function (e) {
                            $(this).removeClass('disabled').addClass('active');
                            e();
                        });
                        $(this).parent().find('.msb_network_button').each(function () {
                            var n = p + (p + i * o) * Math.cos(v) * 0.8; // 结束位置
                            var r = d + (d + i * o) * Math.sin(v); // 结束位置
                            $(this).css({
                                display: 'block',
                                left: p + 'px',
                                top: d + 'px'
                            }).stop().delay(t * o).animate({
                                left: n + 'px',
                                top: r + 'px'
                            }, e);
                            o++;
                        });
                    } else {
                        o = r;
                        $(this).addClass('disabled').delay(s).queue(function (e) {
                            $(this).removeClass('disabled').removeClass('active');
                            e();
                        });
                        $(this).parent().find('.msb_network_button').each(function () {
                            $(this).stop().delay(t * o).animate({
                                left: p,
                                top: d
                            }, e);
                            o--;
                        });
                    }
                });
            }

            function replaceAPI(api, options) {
                api = api.replace('{url}', options.url);
                api = api.replace('{title}', options.title);
                api = api.replace('{content}', options.content);
                api = api.replace('{pic}', options.pic);
                return api;
            }

            function oPenWindow(URL) {
                // 弹出窗口的url
                var openUrl = URL;
                // 弹出窗口的宽度;
                var iWidth = 630;
                // 弹出窗口的高度;
                var iHeight = 580;
                // 获得窗口的垂直位置;
                var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
                // 获得窗口的水平位置;
                var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
                window.open(openUrl);
            }

            function tQQ(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                oPenWindow(replaceAPI(tqq, options));
            }

            function qZone(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                oPenWindow(replaceAPI(qzone, options));
            }

            function sinaWeibo(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                oPenWindow(replaceAPI(sina, options));
            }

            function doubanShare(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                oPenWindow(replaceAPI(douban, options));
            }

            function weixinShare(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                showWX(replaceAPI(weixin, options));
            }

            function weixinSharePC(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                showwWPC(replaceAPI(weixin, options));
            }

            function clickCopy(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
            }

            function weixinShareM(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                openWX(replaceAPI(weixin, options), options);
            }

            function weixinFriendShareM(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                openWXFriend(replaceAPI(weixin, options), options);
            }

            function sinaWeiboShareM(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                openSinaWeibo(replaceAPI(weixin, options), options);
            }

            function qqShareM(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                openQQ(replaceAPI(weixin, options), options);
            }

            function qzoneShareM(target, options) {
                var options = $.extend({}, $.fn.socialShare.defaults, options);
                openQzone(replaceAPI(weixin, options), options);
            }

            function autocenter() {
                var bodyW = parseInt(document.documentElement.clientWidth, 10);
                var bodyH = parseInt(document.documentElement.clientHeight, 10);
                var elW = $('.jtshare_m_weixin_qrcode_1').outerWidth();
                var elH = $('.jtshare_m_weixin_qrcode_1').outerHeight();
                $('.jtshare_m_weixin_qrcode_1').css('left', (bodyW - elW) / 2);
                $('.jtshare_m_weixin_qrcode_1').css('top', (bodyH - elH) / 2);
            }

            function showWX(url) {
                var weixing = '<div class="jtshare_m_weixin_qrcode_1">'
                    + '		<div class="bd_weixin_popup_head">'
                    + '			<span>分享到微信朋友圈</span>'
                    + '			<a href="javascript:void(0)" class="bd_weixin_popup_close">×</a>'
                    + '		</div>'
                    + '		<div class="erweima">'
                    + '			<img class="erweimas" src="" />'
                    + '		</div>'
                    + '		<p class="msgs">打开微信，点击右上角的  + ，<br/> 使用“扫一扫”即可将网页分享至朋友圈。</p>'
                    + '	</div>';
                $('body').append(weixing);
                $('.erweimas').attr('src', url);
                autocenter();
                $('.jtshare_m_weixin_qrcode_1').show();
            }

            function applogin(target, sharehtml, settings) {
                if ($('.jtshare_login_layer').length === 0) {
                    sharehtml = sharehtml
                        + '<div class="login_layer clearfix fz14 yahei jtshare_login_layer">'
                        + '	<form method="post" id="loginForm" name="loginForm" class="fl">'
                        + '		<div class="userN">'
                        + '			<input type="text" placeholder="手机/邮箱" id="username" name="username"  '
                        + 'onchange="onchangeUser(this)"> '
                        + '		</div>'
                        + '		<div class="alert-box-p">账号或密码错误</div>'
                        + '		<div class="pwd">'
                        + '			<input type="password" placeholder="密码" id="password" name="password"  '
                        + 'onchange="onchangePw(this)">'
                        + '		</div>'
                        + '		<div class="clearfix fz12 song">'
                        + '			<div class="fl rem_pwd clearfix">'
                        + '				<input type="checkbox" class="remb_pwd" name="rememberMe" id="rememberMe" '
                        + 'value="true" tabindex="4" checked="checked">'
                        + '				<span class="checkbox checked">'
                        + '		<img src="https://res.cngoldres.com/passport/cngold/images/popImage/gou.png">'
                        + '				</span>'
                        + '				<span>记住登陆</span>'
                        + '			</div>'
                        + '			<a href="https://passport2.cngold.org/account/password/forgot.htm?service='
                        + settings.url + '&clientType=0" class="fr forgot_pwd">忘记密码？</a>'
                        + '		</div>'
                        + '		<div class="btn">'
                        + '		<button type="button" name="submitForm" onclick="formSubmitByIndex();">登录</button>'
                        + '		</div>'
                        + '	</form>'
                        + '	<div class="fr other">'
                        + '		<ul>'
                        + '			<li>第三方账号登录</li>'
                        + '			<li class="qq">'
                        + '				<a href="https://passport2.cngold.org/account/tencent/login.htm?service='
                        + settings.url + '">'
                        + '<img src="https://res.cngoldres.com/passport/cngold/images/popImage/qq.png">QQ账号登录</a>'
                        + '			</li>'
                        + '			<li class="wx">'
                        + '				<a href="https://passport2.cngold.org/account/wechat/login.htm?service='
                        + settings.url + '">'
                        + '<img src="https://res.cngoldres.com/passport/cngold/images/popImage/wx.png">微信账号登录</a>'
                        + '			</li>'
                        + '			<li class="sina">'
                        + '				<a href="https://passport2.cngold.org/account/weibo/login.htm?service='
                        + settings.url + '">'
                        + '<img src="https://res.cngoldres.com/passport/cngold/images/popImage/sina.png">微博账号登录</a>'
                        + '			</li>'
                        + '		</ul>'
                        + '	</div>'
                        + '	<span class="close" id="close">×</span>'
                        + '</div>';
                    target.html(sharehtml);
                }
            }

            function openWX(url, options) {
                var opt = initoptin(options);
                opt.shareurl = url;
                // 分享微信
                share('weixin', opt, options);
            }

            function openWXFriend(url, options) {
                var opt = initoptin(options);
                opt.shareurl = url;
                // 分享朋友圈
                share('weixinFriend', opt, options);
            }

            function openSinaWeibo(url, options) {
                var opt = initoptin(options);
                opt.shareurl = url;
                // 分享到微博
                share('sinaWeibo', opt, options);
            }

            function openQQ(url, options) {
                var opt = initoptin(options);
                opt.shareurl = url;
                // 分享qq
                share('QQ', opt, options);
            }

            function openQzone(url, options) {
                var opt = initoptin(options);
                opt.shareurl = url;
                // 分享qq
                share('QZone', opt, options);
            }

            function initoptin(options) {
                return {
                    url: options.url || document.location.href || '',
                    title: options.title || document.title || '',
                    desc: options.desc || document.title || '',
                    img: options.img || document.getElementsByTagName('img').length > 0
                    && document.getElementsByTagName('img')[0].src || '',
                    imgTitle: options.imgTitle || document.title || '',
                    from: options.from || window.location.host
                };
            }

            $(document).on('click', '.bd_weixin_popup_close', function () {
                $('.jtshare_m_weixin_qrcode_1').remove();
                $('.jtshare_m_cover_3').remove();
                $('.jtshare_m_cover_2').remove();
            });

            function showwWPC(url, tit) {
                var sharecode = '<div class="jtshare_pc_erweima_2" >'
                    + '	<div class="tit">'
                    + '		<span>扫码分享到微信</span>'
                    + ' 		<a href="javascript:void(0);" class="jtshare_close">×</a>'
                    + '	</div>'
                    + '		<img src="" alt="">'
                    + '</div>';
                $('body').append(sharecode);
                $('.jtshare_pc_erweima_2 img').attr('src', url);
                $('.jtshare_pc_erweima_2 .jtshare_close').click(function () {
                    $('.jtshare_pc_erweima_2').hide();
                });
            }
            var browser = '';
            $.fn.socialShare.methods = {
                // 初始化方法
                init: function (jq, options) {
                    return jq.each(function () {
                        init(this, options);
                    });
                },
                qqShare: function (jq, options) {
                    return jq.each(function () {
                        tQQ(this, options);
                    });
                },
                qzoneShare: function (jq, options) {
                    return jq.each(function () {
                        qZone(this, options);
                    });
                },
                weiboShare: function (jq, options) {
                    return jq.each(function () {
                        sinaWeibo(this, options);
                    });
                },
                doubanShare: function (jq, options) {
                    return jq.each(function () {
                        doubanShare(this, options);
                    });
                },
                weixinShare: function (jq, options) {
                    return jq.each(function () {
                        weixinShare(this, options);
                    });
                },
                weixinSharePC: function (jq, options) {
                    return jq.each(function () {
                        weixinSharePC(this, options);
                    });
                },
                weixinShareM: function (jq, options) {
                    return jq.each(function () {
                        weixinShareM(this, options);
                    });
                },
                weixinFriendShareM: function (jq, options) {
                    return jq.each(function () {
                        weixinFriendShareM(this, options);
                    });
                },
                sinaWeiboShareM: function (jq, options) {
                    return jq.each(function () {
                        sinaWeiboShareM(this, options);
                    });
                },
                qqShareM: function (jq, options) {
                    return jq.each(function () {
                        qqShareM(this, options);
                    });
                },
                qzoneShareM: function (jq, options) {
                    return jq.each(function () {
                        qzoneShareM(this, options);
                    });
                },
                clickCopy: function (jq, options) {
                    return jq.each(function () {
                        clickCopy(this, options);
                    });
                }
            };
            var qApiSrc = {
                lower: '//3gimg.qq.com/html5/js/qb.js',
                higher: '//jsapi.qq.com/get?api=app.share'
            };
            var bLevel = {
                qq: {forbid: 0, lower: 1, higher: 2},
                uc: {forbid: 0, allow: 1}
            };
            var UA = navigator.appVersion;
            var isqqBrowser = (UA.split('MQQBrowser/').length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
            var isucBrowser = (UA.split('UCBrowser/').length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
            var version = {
                uc: '',
                qq: ''
            };
            var isWeixin = false;
            var ucAppList = {
                sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '\u65b0\u6d6a\u5fae\u535a'],
                weixin: ['kWeixin', 'WechatFriends', 1, '\u5fae\u4fe1\u597d\u53cb'],
                weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '\u5fae\u4fe1\u670b\u53cb\u5708'],
                QQ: ['kQQ', 'QQ', '4', 'QQ\u597d\u53cb'],
                QZone: ['kQZone', 'QZone', '3', 'QQ\u7a7a\u95f4']
            };

            function share(toApp, opt, options) {
                var title = opt.title;
                var url = opt.url;
                var desc = opt.desc;
                var img = opt.img;
                var imgTitle = opt.imgTitle;
                var from = opt.from;
                if (isucBrowser) {
                    toApp = toApp === '' ? '' : (platformOs === 'iPhone'
                        ? ucAppList[toApp][0] : ucAppList[toApp][1]);
                    if (toApp === 'QZone') {
                        var B = 'mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url='
                            + img + '&title=' + title + '&description=' + desc + '&url=' + url + '&app_name=' + from;
                        var k = document.createElement('div');
                        k.style.visibility = 'hidden';
                        k.innerHTML = '<iframe src="'  + B + '" scrolling="no" width="1" height="1"></iframe>';
                        document.body.appendChild(k);
                        setTimeout(function () {
                            k && k.parentNode && k.parentNode.removeChild(k);
                        }, 5E3);
                    }
                    if (!ucweb) {
                        var ucweb = '';
                    }
                    if (!ucbrowser) {
                        var ucbrowser = '';
                    }
                    if (typeof(ucweb) !== 'undefined') {
                        ucweb.startRequest('shell.page_share', [title, title, url, toApp, '', '@' + from, '']);
                    } else {
                        if (typeof(ucbrowser) !== 'undefined') {
                            ucbrowser.web_share(title, title, url, toApp, '', '@' + from, '');
                        } else {
                        }
                    }
                } else {
                    if (isqqBrowser && !isWeixin) {
                        toApp = toApp === '' ? '' : ucAppList[toApp][2];
                        var ah = {
                            url: url,
                            title: title,
                            description: desc,
                            imgUrl: img,
                            imgTitle: imgTitle,
                            // 微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,
                            // 复制网址10,分享到微博11,创意分享13
                            toApp: toApp,
                            cusTxt: '请输入此时此刻想要分享的内容'
                        };
                        ah = toApp === '' ? '' : ah;
                        if (typeof(browser) !== 'undefined') {
                            if (typeof(browser.app) !== 'undefined' && isqqBrowser === bLevel.qq.higher) {
                                browser.app.share(ah);
                            }
                        } else {
                            if (typeof(window.qb) !== 'undefined' && isqqBrowser === bLevel.qq.lower) {
                                window.qb.share(ah);
                            } else {
                            }
                        }
                    } else {
                        if (toApp === 'weixinFriend') {
                            showWX(opt.shareurl);
                        } else if (toApp === 'weixin') {
                            showWX(opt.shareurl);
                        } else if (toApp === 'sinaWeibo') {
                            oPenWindow(replaceAPI(sina, options));
                        } else if (toApp === 'QQ') {
                            oPenWindow(replaceAPI(tqq, options));
                        } else if (toApp === 'QZone') {
                            oPenWindow(replaceAPI(qzone, options));
                        }
                    }
                }
            }

            function isloadqqApi() {
                if (isqqBrowser) {
                    var b = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
                    var d = document.createElement('script');
                    var a = document.getElementsByTagName('body')[0];
                    d.setAttribute('src', b);
                    a.appendChild(d);
                }
            }

            function getPlantform() {
                var ua = navigator.userAgent;
                if ((ua.indexOf('iPhone') > -1 || ua.indexOf('iPod') > -1)) {
                    return 'iPhone';
                }
                return 'Android';
            }

            function isWeixinFun() {
                var a = UA.toLowerCase();
                if (a.match(/MicroMessenger/i) === 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            }

            function getVersion(c) {
                var a = c.split('.');
                return parseFloat(a[0] + '.' + a[1]);
            }
            var platformOs = '';
            function initnative() {
                platformOs = getPlantform();
                version.qq = isqqBrowser ? getVersion(UA.split('MQQBrowser/')[1]) : 0;
                version.uc = isucBrowser ? getVersion(UA.split('UCBrowser/')[1]) : 0;
                isWeixin = isWeixinFun();
                if ((isqqBrowser && version.qq < 5.4 && platformOs === 'iPhone')
                    || (isqqBrowser && version.qq < 5.3 && platformOs === 'Android')) {
                    isqqBrowser = bLevel.qq.forbid;
                } else {
                    if (isqqBrowser && version.qq < 5.4 && platformOs === 'Android') {
                        isqqBrowser = bLevel.qq.lower;
                    } else if (isucBrowser && ((version.uc < 10.2 && platformOs === 'iPhone')
                            || (version.uc < 9.7 && platformOs === 'Android'))) {
                        isucBrowser = bLevel.uc.forbid;

                    }
                }
                isloadqqApi();
            }

            initnative();

        })($, window, document);

        function addFavorite(url, title, target) {
            if (getCookieLoginMemberId && typeof(getCookieLoginMemberId) === 'function') {
                var loginName = getCookieLoginMemberId('IDENTITY');
                if (loginName.length > 0) {
                    $('.' + target).show();
                    $('.jtsher_favor_layer').mouseover(function () {
                        $(this).show();
                    }).mouseout(function () {
                        $(this).hide();
                    });
                    $('.jt_favor').mouseout(function () {
                        $('.jtsher_favor_layer').hide();
                    });
                    addUcFavorites(url, title);
                } else {
                    $('.jtshare_login_layer').show();
                    $('#favorate').click(function () {
                        $('.jtshare_login_layer').show();
                    });
                    $('#close').click(function () {
                        $(this).parent().hide();
                    });
                }
            }
        }

        function addUcFavorites(urlparam, titleparam) {
            if (!urlparam) {
                urlparam = window.location.href;
            }
            if (!titleparam) {
                titleparam = document.title;
            }
            var urltemp = urlparam;
            urltemp = urltemp.substring(urltemp.indexOf('//') + 2, urltemp.length);
            var host = '//' + urltemp.substring(0, urltemp.indexOf('/'));
            var url = urlparam;
            var title = encodeURI(titleparam);
            var memberId = getCookieLoginMemberId('IDENTITY');
            $('.ucfavorate').attr('href', '//my.cngold.org/' + memberId + '/favorites/index.htm');
            var data = '?title=' + encodeURI(title) + '&url=' + url + '&channelUrl=' + host;
            $.ajax({
                url: '//my.cngold.org/' + memberId + '/favorites/add.htm' + data,
                type: 'GET',
                crossDomain: true,
                jsonp: 'jsoncallback',
                dataType: 'jsonp',
                success: function (flag) {
                }
            });
        }

        function getCookieLoginMemberId(objName) {
            var arrStr = document.cookie.split('; ');
            for (var i = 0; i < arrStr.length; i++) {
                var cookieStr = decodeURIComponent(arrStr[i]);
                var temp = cookieStr.split('=');
                if (temp[0] === objName) {
                    return unescape(temp[1]);
                }

            }
            return '';
        }

        function onchangeUser(obj) {
            $('input[name=\'username\']').val(obj.value);
        }

        function onchangePw(obj) {
            $('input[name=\'password\']').val(obj.value);
        }

        var type = $(element2).attr('type');
        var target = $(element2).attr('target');
        var url = $(element2).attr('url');
        var title = $(element2).attr('title');
        var content = $(element2).attr('content');
        var pic = $(element2).attr('pic');
        $.fn.initShare({type: type, target: target, url: url, title: title, content: content, pic: pic});
    };
    return customElement;
});
