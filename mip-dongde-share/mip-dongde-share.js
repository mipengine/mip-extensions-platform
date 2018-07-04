/**
 * @file mip-dongde-share
 * @author idongde
 */

define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);
        var Share = function () {
            this.init();
            this.addListener();
        };
        Share.prototype.init = function () {
            this.shareBtn = $('.' + $element.attr('share-btn-class'));
            this.shareCloseBtn = $element.find('.share-close-button');
            this.shareWrap = $element.find('.share-wrap');
            this.shareBtnsWrap = this.shareWrap.find('.share-buttons-wrap');
            this.tip = this.shareWrap.find('.tip');
            this.shareWrapShow = false;
            this.tipShow = false;
            // 朋友圈
            this.wechatMomentsShareBtn = this.shareBtnsWrap.find('.icon-share-wechat-moments');
            // 微信
            this.wechatShareBtn = this.shareBtnsWrap.find('.icon-share-wechat');
            // QQ
            this.qqShareBtn = this.shareBtnsWrap.find('.icon-share-qq');
            // 微博
            this.weiboShareBtn = this.shareBtnsWrap.find('.icon-share-weibo');
            // 分享接口
            this.api = {
                weibo: 'https://service.weibo.com/share/share.php',
                qq: 'https://connect.qq.com/widget/shareqq/index.html'
            };
            // 内容页标题
            this.title = $('.' + $element.attr('title-class')).find('.title').text();
            // 内容页网址路径
            this.url = document.URL;
        };
        // 绑定监听事件
        Share.prototype.addListener = function () {
            var self = this;
            this.shareBtn.on('click', function () {
                self.changeShareWrapVisibility();
            });
            this.shareCloseBtn.on('click', function () {
                self.changeShareWrapVisibility();
            });
            this.wechatMomentsShareBtn.on('click', function () {
                self.changeTipVisibility();
            });
            this.wechatShareBtn.on('click', function () {
                self.changeTipVisibility();
            });
            this.qqShareBtn.on('click', function () {
                self.qqShare();
            });
            this.weiboShareBtn.on('click', function () {
                self.weiboShare();
            });
        };
        Share.prototype.qqShare = function () {
            this.tipShow = false;
            this.tip.removeClass('active');
            var href = this.api.qq + '?url=' + this.url + '&title=' + this.title;
            this.qqShareBtn.attr('href', href);
        };
        Share.prototype.weiboShare = function () {
            this.tipShow = false;
            this.tip.removeClass('active');
            var href = this.api.weibo + '?url=' + this.url + '&title=' + this.title;
            this.weiboShareBtn.attr('href', href);
        };
        Share.prototype.changeTipVisibility = function () {
            if (!this.tipShow) {
                this.tipShow = true;
                this.tip.addClass('active');
            }
        };
        Share.prototype.changeShareWrapVisibility = function () {
            if (this.shareWrapShow) {
                this.shareWrapShow = false;
                this.shareWrap.removeClass('active');
                this.tipShow = false;
                this.tip.removeClass('active');
                $('body').removeClass('no-scroll');
            }
            else {
                this.shareWrapShow = true;
                this.shareWrap.addClass('active');
                // 分享弹窗显示时，背景不能滚动
                $('body').addClass('no-scroll');
            }
        };
        new Share();
    };
    return customElem;
});
