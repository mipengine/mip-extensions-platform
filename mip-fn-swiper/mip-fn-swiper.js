/**
 * @file mip-fn-swiper 组件
 * @author fn
 * @modify fn 200170626
 */
define(function (require) {
    var customElem = require('customElement').create();
    var util = require('util');

    var carouselParas = {
        boxClass: 'mip-fn-swiper-container',
        wrapBoxClass: 'mip-fn-swiper-wrapper',
        slideBox: 'mip-fn-swiper-slideBox',
        activeitem: 'mip-fn-swiper-activeitem'
    };
    // 按tagName创建一个固定class的tag
    function createTagWithClass(className, tagName) {
        tagName = tagName || 'div';
        var tag = document.createElement(tagName);
        tag.className = className || '';
        return tag;
    }
    // 获取carouse标签下所有非mip layout引入的元素
    function getChildNodes(element) {
        var allChildNodes = element.children;
        var arrNode = Array.prototype.slice.call(allChildNodes);
        var childList = [];

        arrNode.map(function (ele, i) {
            if (ele.tagName.toLowerCase() !== 'mip-i-space') {
                // 如果是 autoplay，则不允许有 popup 功能
                if (element.hasAttribute('autoplay')) {
                    if (ele.hasAttribute('popup')) {
                        ele.removeAttribute('popup');
                    }
                }
                childList.push(ele);
                element.removeChild(ele);
            }

        });
        return childList;
    }

    // 移动函数
    function translateFn(value, time, wrapBox) {
        wrapBox.style.webkitTransform = 'translate3d(' + value + 'px, 0px, 0px)';
        wrapBox.style.transitionDuration = time;
    }
    customElem.prototype.build = function () {
        var ele = this.element;
        var self = this;
        var curGestureClientx = 0;

        var startPos;
        var isScrolling;
        var prvGestureClientx;
        var endPos;
        var imgIndex;

        var eleWidth = ele.clientWidth;
        var commentLink = ele.getAttribute('commentLink') || '';
        var prevAlbum = ele.getAttribute('prevAlbum') || '';
        var nextAlbum = ele.getAttribute('nextAlbum') || '';
        var currentAlbum = ele.getAttribute('currentAlbum') || '';
        var threshold =  ele.getAttribute('threshold');

        var dotItems = [];

        // 获取用户填写属性
        // 是否自动播放
        var isAutoPlay = ele.hasAttribute('autoplay');

        // 图片间隔时长默认为4000
        var isDefer = ele.getAttribute('defer');

        var isDeferNum = (!!isDefer) ? isDefer : 4000;

        // 分页显示器
        var showPageNum = ele.hasAttribute('indicator');

        // 翻页按钮
        var showBtn = ele.hasAttribute('buttonController');

        // 翻页按钮
        var indicatorId = ele.getAttribute('indicatorId');

        // 当前第几屏
        // var imgIdx =  0;
        var imgIdx;

        var pageNum = location.hash.substring(6);
        if (pageNum) {
            imgIdx = Number(pageNum - 1);
        } else {
            imgIdx = 0;
        }

        // 定时器时间hold
        var moveInterval;

        // 获取carousel下的所有节点
        var childNodes = getChildNodes(ele);

        // 图片显示个数
        // 其实图片个数应该为实际个数+2.copy了头和尾的两部分
        var childNum = childNodes.length;


        // length 等于0时，不做任何处理
        if (childNum === 0) {
            return;
        }
        // 将getChildNodes获取的元素拼装轮播dom
        var carouselBox = createTagWithClass(carouselParas.boxClass);

        var wrapBox = createTagWithClass(carouselParas.wrapBoxClass);

        childNodes.map(function (ele, i) {
            var slideBox = createTagWithClass(carouselParas.slideBox);
            slideBox.appendChild(ele);
            slideBox.style.width = (100 / childNum) + '%';
            wrapBox.appendChild(slideBox);

            // 遍历mip-img计算布局
            self.applyFillContent(ele, true);
            // inview callback  bug, TODO
            var MIP = window.MIP || {};
            MIP.prerenderElement(ele);
            var allImgs = ele.querySelectorAll('mip-img');
            var len = allImgs.length;
            for (var idx = 0; idx < len; idx++) {
                self.applyFillContent(allImgs[idx], true);
                MIP.prerenderElement(allImgs[idx]);
            }
        });

        wrapBox.style.width = childNum * 100 + '%';

        carouselBox.appendChild(wrapBox);
        ele.appendChild(carouselBox);
        // 初始渲染时应该改变位置到第一张图
        var initPostion = 0;
        wrapBox.style.webkitTransform = 'translate3d(' + initPostion + 'px, 0, 0)';
        // 绑定wrapBox的手势事件
        // 手势移动的距离
        var diffNum = 0;

        // 绑定手势点击事件
        wrapBox.addEventListener('touchstart', function (event) {
            // 以下兼容横屏时禁止左右滑动
            var touch = event.targetTouches[0];
            startPos = {
                x: touch.pageX,
                y: touch.pageY,
                time: (+new Date)
            };
            isScrolling = 0; // 这个参数判断是垂直滚动还是水平滚动

            // 获取手势点击位置
            prvGestureClientx = touch.pageX;
        }, false);

        wrapBox.addEventListener('touchmove', function (event) {
            // 阻止触摸事件的默认行为，即阻止滚屏
            var touch = event.targetTouches[0];
            endPos = {
                x: touch.pageX - startPos.x,
                y: touch.pageY - startPos.y
            };
            isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; // isScrolling为1时，表示纵向滑动，0为横向滑动
            if (isScrolling === 0) {
                event.preventDefault();
            }

            // 获取手指移动的距离
            diffNum = event.targetTouches[0].pageX - prvGestureClientx;
            curGestureClientx = -imgIdx * eleWidth;
            // 外框同步运动
            translateFn(diffNum + curGestureClientx, '0ms', wrapBox);

        }, false);

        wrapBox.addEventListener('touchend', function (event) {
            // 如果大于设定阈值
            if (Math.abs(diffNum) > eleWidth * threshold) {
                imgIdx = (diffNum > 0) ? imgIdx - 1 : imgIdx + 1;
            }
            // console.log(childNum);
            if (imgIdx === -1) {
                imgIdx = 0;
                pictureGuideFn();
            }
            if (imgIdx === childNum) {
                imgIdx = childNum - 1;
                pictureGuideFn();
            }
            move(wrapBox, imgIdx);
            changeNum(imgIdx + 1);
            originBtn(imgIdx);

        }, false);


        // 图片滑动处理与手势滑动函数endPosition为最终距离,Duration变换时间
        function move(wrapBox, imgIdx, Duration) {
            if (!wrapBox) {
                return;
            }
            // 双保险，确认位移的是 ele 的 width
            if (eleWidth !== ele.clientWidth) {
                eleWidth = ele.clientWidth;
            }

            location.hash = '#page=' + Number(imgIdx + 1);

            var endPosition = -eleWidth * imgIdx;
            if (Duration) {
                translateFn(endPosition, '0ms', wrapBox);
                wrapBox.style.transitionDuration = '0ms';
            }
            else {
                translateFn(endPosition, '300ms', wrapBox);
                wrapBox.style.transitionDuration = '300ms';
            }
        }

        move(wrapBox, imgIdx, '0ms');

        // 改变页码
        function changeNum(num) {
            if (!showPageNum) {
                return;
            }
            var indicatorNow = ele.querySelector('.mip-fn-swiper-indicatornow');
            indicatorNow.innerHTML = num;
        }

        // 指示器
        if (!!showPageNum) {
            indicator();
        }

        // 创建指示器
        function indicator() {
            var indicatorBox = createTagWithClass('mip-fn-swiper-indicatorbox');
            var indicatorBoxWrap = createTagWithClass('mip-fn-swiper-indicatorBoxwrap', 'p');
            var indicatorNow = createTagWithClass('mip-fn-swiper-indicatornow', 'span');
            var indicatorAllNum = createTagWithClass('', 'span');
            // indicatorAllNum.innerHTML = '/' + (childNum - 2);
            indicatorAllNum.innerHTML = '/' + (childNum);
            indicatorNow.innerHTML = imgIdx + 1;
            indicatorBoxWrap.appendChild(indicatorNow);
            indicatorBoxWrap.appendChild(indicatorAllNum);
            indicatorBox.appendChild(indicatorBoxWrap);
            ele.appendChild(indicatorBox);
        }

        // 新增原图标签
        crateOriginBtn();
        // 上一组、下一组
        nextAubunFn();
        // 显示大图初试赋值
        originBtn(0);
        // 显示弹层 by hjw
        function pictureGuideFn() {
            var pictureGuide = ele.querySelector('#pictureGuide');
            var closeBtn = pictureGuide.querySelector('.close');
            // console.log(closeBtn);
            util.css(pictureGuide, 'display', 'block');

            closeBtn.addEventListener('click', function () {
                util.css(pictureGuide, 'display', 'none');
            }, false);
        }
        // 创建原图切换底部工具栏 by hjw
        function crateOriginBtn() {
            var str = '<a data-type="mip" target="_blank" href="' + commentLink + '" class="comment">评论</a>'
            + '<a data-type="mip" target="_blank" class="original">原图</a>';
            var originBtn = document.createElement('div');
            originBtn.className = 'footer';
            originBtn.innerHTML = str;
            ele.appendChild(originBtn);
        }

        // 创建原图切换btn by hjw
        function originBtn(num) {
            var aImg = ele.getElementsByTagName('img');
            var oSrc = aImg[num].src;
            var originBtn = ele.querySelector('.original');
            originBtn.href = oSrc;
        }


        // 创建 picture-guide by hjw
        function nextAubunFn() {
            var str =  '<div class="picture-guide">'
                + '<i class="close">X</i>'
                    + '<div class="return">'
                    + '<a class="goback" href="' + currentAlbum + '">返回重看</a>'
                + '</div>'
                + '<div class="operate">'
                    + '<a data-type="mip" href="' + prevAlbum + '" class="fl">上一篇</a>'
                    + '<a data-type="mip" href="' + nextAlbum + '" class="fr">下一篇</a>'
                + '</div>'
            + '</div>';

            var nextAubun = document.createElement('div');
            nextAubun.className = 'picture-guide-box';
            nextAubun.id = 'pictureGuide';
            nextAubun.innerHTML = str;
            ele.appendChild(nextAubun);
        }


        // 横竖屏兼容处理
        window.addEventListener('resize', function () {
            location.reload();
            var pageNum = location.hash.substring(6);
            if (pageNum) {
                imgIndex = Number(pageNum - 1);
            } else {
                imgIndex = 0;
            }

            eleWidth = ele.clientWidth;
            move(wrapBox, imgIndex, imgIndex, '0ms');
        }, false);

    };
    return customElem;
});

