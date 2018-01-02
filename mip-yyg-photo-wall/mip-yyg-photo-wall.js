/**
 * @file mip-yyg-photo-wall 组件
 * @author Summer
 *
 * User:技术支持组 Summer
 * 图片滑屏幕处理类库wImagePopMove插件
 * 该组件需要配合wTouchMove组件合用
 *
 * */

define(function (require) {

    var $ = require('zepto');
    var wTouchMove = require('./wTouchMove');
    var customElement = require('customElement').create();

    /**
     * 存储对象
     * @type {{}}
     */
    var mip = {};

    /**
     * 对外默认参数
     * @type {{active: string}}
     */
    var parmas = {
        bigSuffix: ''
    };

    /**
     * 禁用屏幕滚动移动功能
     * @type {{stopTouchMove: stopTouchMove, startTouchMove: startTouchMove, touchMoveFn: touchMoveFn}}
     */
    var pare = {

        /*
         * 处理侧边栏出现禁用document触摸事件
         * */
        stopTouchMove: function () {
            $('body').css('overflow', 'hidden');
            document.addEventListener('touchmove', pare.touchMoveFn, true);
        },

        /*
         * 启用document触摸事件
         * */
        startTouchMove: function () {
            $('body').css('overflow', '');
            document.removeEventListener('touchmove', pare.touchMoveFn, true);
        },

        touchMoveFn: function (e) {
            e.preventDefault();
        }
    };

    var PhotoWall = function (index) {

        this.init(index);
    };

    PhotoWall.prototype.init = function (index) {

        var that = this;
        var obj = this.creatElem();
        this.moveBox = obj.imgBox;
        this.outBg = obj.outBg;

        this.move();
        this.changeBoxLevel(index, true);
        pare.stopTouchMove();

    };

    PhotoWall.prototype.move = function () {
        var that = this;
        var showSize = 1;

        that.moveBox.currentIndex = 0;

        wTouchMove({
            elem: that.moveBox,
            startFn: function () {

            },
            moveFn: function () {

            },
            endFn: function (obj) {
                var changeIndex = 0;
                var elem = obj.getElem();

                if (obj.parm.moveLong > 0) {
                    changeIndex = elem.currentIndex - 1;

                    if (changeIndex < 0) {
                        changeIndex = 0;
                    }
                    that.changeBoxLevel(changeIndex);
                } else {

                    changeIndex = elem.currentIndex + 1;
                    if (changeIndex >= elem.childSize - showSize) {
                        changeIndex = elem.childSize - showSize;
                    }
                    that.changeBoxLevel(changeIndex);
                }
            },
            type: 'left'

        });

    };

    PhotoWall.prototype.changeBoxLevel = function (index, isFirst) {
        var that = this;
        var moveBox = this.moveBox;
        var changeIndex = -$('li', moveBox).width() * index + 'px';

        if (isFirst) {

            moveBox.css({
                left: changeIndex
            });

            result();
        } else {
            moveBox.animate({
                    left: changeIndex
                },
                300, 'ease-out',
                function () {
                    result();

                }
            );
        }

        function result() {
            moveBox.currentIndex = index;
            that.uploadImg();
        }

    };

    PhotoWall.prototype.uploadImg = function (curIndexVal) {
        var that = this;
        var moveBox = that.moveBox;
        var moveChildElem = $('li', moveBox);
        var curIndex = curIndexVal ? curIndexVal : moveBox.currentIndex;

        var liElem = $(moveChildElem[curIndex]);
        var imgElem = $('img', liElem);
        var srcVal = imgElem.attr('_src');

        // 如果存在不下载图片
        if (imgElem.attr('src')) {
            return;
        }

        var img = new Image();
        img.src = srcVal;

        img.onload = function () {

            imgElem.attr('src', srcVal);
            // 元素渲染完成后实现 否则chrome有问题
            imgElem[0].onload = function () {
                imgElem.css('margin-top', -imgElem.height() / 2);
            };

        };

    };

    PhotoWall.prototype.close = function () {
        var that = this;

        pare.startTouchMove();
        this.outBg.remove();
    };

    PhotoWall.prototype.creatElem = function () {

        var that = this;

        /*
         * 创建黑色背景
         * */
        var body = $('body');
        var outBg = $('<div class="out_bg"></div>');

        /*
         * 创建主体图片浏览内容
         * */
        var imgBox = creatImgBox();

        /*
         * 创建关闭按钮
         * */
        var closeBt = $('<span class="pop_close_bt"></span>');
        closeBt.on('touchstart tap', function (e) {
            e.preventDefault();
            that.close();
        });
        outBg.append(closeBt);

        mip.elem.append(outBg);


        return {
            outBg: outBg,
            imgBox: imgBox
        };

        /*
         * 创建主体数据
         * */
        function creatImgBox() {
            var mipImgs = mip.mipImgElems;

            var elem = $('<ul class="pop_img_box"></ul>');
            elem.width(body.width() * mipImgs.length);
            elem.childSize = mipImgs.length;

            mipImgs.each(function () {

                var nowImgUrl = $(this).attr('src');

                var imgElem = $('<li><img _src="' + nowImgUrl.split('?')[0] + '?' + mip.attrs.bigSuffix + '" /></li>');
                imgElem.css('width', body.width());
                elem.append(imgElem);
            });

            return elem.appendTo(outBg);
        }

    };

    customElement.prototype.firstInviewCallback = function () {

        mip.self = this;
        mip.elem = $(this.element);

        mip.attrs = {
            bigSuffix: this.element.getAttribute('bigSuffix') || parmas.bigSuffix
        };

        // 获取mip-img元素
        mip.mipImgElems = mip.elem.find('mip-img');

        mip.mipImgElems.on('click', function () {

            var index = mip.mipImgElems.indexOf(this);
            console.log(index);

            new PhotoWall(index);

        });

    };

    return customElement;
});
