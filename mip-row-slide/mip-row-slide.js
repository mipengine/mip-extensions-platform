/**
 * @file mip-row-slide 横向滑动组件主文件
 * @author idongde
 */

define(function (require) {
    var $ = require('jquery');
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        // element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);
        var rowListWrap = $element.find('.row-slide-wrap');
        var rowList = $element.find('.row-slide');
        var rowListItem = rowList.find('.row-slide-item');
        var contentListWrap = $element.find('.chapter-content-wrap');
        var contentList = contentListWrap.find('.chapter-content-item');
        var listWidth = 0;
        var rowListWrapWidth = rowListWrap.outerWidth(true);
        var clientWidth =  document.body.clientWidth;
        var lastEleWidth = rowListItem.last().outerWidth(true);
        var curLeft = 0;
        var curIndex;
        // 初始化滑动列表宽度
        checkListWidth();
        // 监听标签点击事件
        bindClick();
        // 初始化标签对应内容的显示
        initContentVisiblity();
        // 监听touch事件
        function bindSwipe() {
            var startPosition;
            var endPosition;
            var deltaX;
            var deltaY;
            var moveDistance;
            var seleItemLeft = rowList.find('.selected').offset().left;
            var seleItemWidth = rowList.find('.selected').outerWidth(true);
            if (seleItemLeft > clientWidth - seleItemWidth) {
                // 初始化列表滑动位置
                initListPosition();
            }
            rowList.on('touchstart', function (e) {
                curLeft = parseInt(rowList.css('left').split('px').slice(0, 1).join(), 10); // 每次滑动开始时获取之前已移动的距离
                var touch = e.originalEvent.targetTouches[0];
                startPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };
            });
            rowList.on('touchmove', function (e) {
                var touch = e.originalEvent.targetTouches[0];
                endPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };
                deltaX = (endPosition.x - startPosition.x);
                deltaY = (endPosition.y - startPosition.y);
                if (deltaX > 0) {
                    // 列表右移
                    moveDistance = Math.floor(
                        Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2))
                    );
                    checkReachLeft(moveDistance, 'right');
                }
                else if (deltaX < 0) {
                    // 列表左移
                    moveDistance = -Math.floor(
                        Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2))
                    );
                    checkReachLeft(moveDistance, 'left');
                }
            });
            rowList.on('touchend', function () {
                curLeft = parseInt(rowList.css('left').split('px').slice(0, 1).join(), 10);
                // 获取停止触摸时最后一个元素距最左边的距离
                var lastLeft = rowListItem.last().offset().left;
                if (lastLeft <= clientWidth - lastEleWidth) {
                    // 右端回弹
                    // 计算溢出值
                    var overValue = lastLeft - (clientWidth - lastEleWidth * 2);
                    rowList.animate({left: curLeft + lastEleWidth - overValue}, 200);
                }
                else if (curLeft <= 0) {
                    return;
                }
                else if (0 < curLeft <= 50) {
                    // 左端回弹
                    rowList.animate({left: '0'}, 200);
                }
            });
        }
        function bindClick() {
            rowListItem.on('click', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                // 获取标签id
                var rowId = $(this).attr('row-id');
                // 先添加class再获取
                var seleItemLeft = rowList.find('.selected').offset().left;
                var seleItemWidth = rowList.find('.selected').outerWidth(true);
                curIndex = $(this).index();
                if (seleItemLeft > clientWidth - seleItemWidth) {
                    // 向左滚动
                    moveList(-seleItemWidth, 'click');
                }
                else if (seleItemLeft < 0) {
                    // 向右滚动
                    moveList(seleItemWidth, 'click');
                }
                // 切换标签对应的内容
                switchContent(rowId);
            });
        }
        function checkListWidth() {
            rowListItem.map(function (index, item) {
                listWidth += $(item).outerWidth(true);
            });
            if (listWidth >= rowListWrapWidth) {
                // 设置总宽度
                rowList.css({width: listWidth});
                bindSwipe();
            }
        }
        // 横向滑动效果
        function moveList(distance, type) {
            if (type === '') {
                return;
            }
            // 获取之前已移动的距离
            var left = curLeft;
            if (type === 'right') {
                left = left + distance;
                rowList.css({
                    left: left
                });
            }
            else if (type === 'left') {
                left = left + distance;
                rowList.css({
                    left: left
                });
            }
            else if (type === 'click') {
                var lastIndex = rowList.find('.row-slide-item').last().index();
                // 点击的为最后一个
                if (lastIndex === curIndex) {
                    rowList.animate({left: -listWidth + rowListWrapWidth}, 200);
                }
                // 点击的为第一个
                else if (curIndex === 0) {
                    rowList.animate({left: 0}, 200);
                }
                else {
                    rowList.animate({left: left + distance}, 200);
                }
            }
        }
        // 滑动到边界时可以多滑动一点，类似于弹簧效果
        function checkReachLeft(distance, type) {
            var lastLeft = rowListItem.last().offset().left;
            var firstWidth = rowListItem.first().outerWidth(true);
            var offsetLeft = rowList.offset().left;
            if (offsetLeft >= firstWidth) {
                return;
            }
            else if (lastLeft <= clientWidth - lastEleWidth * 2) {
                return;
            }
            moveList(distance, type);
        }
        function initListPosition(anime) {
            var brforeItemLeft = rowList.find('.selected').prev().offset().left;
            rowList.css({
                left: -brforeItemLeft
            });
            curLeft = -brforeItemLeft;
        }
        function initContentVisiblity() {
            var rowId = rowList.find('.selected').attr('row-id');
            $.each(contentList, function (index, node) {
                var columnId = $(node).attr('column-id');
                if (columnId === rowId) {
                    $(node).show();
                }
            });
        }
        function switchContent(rowId) {
            $.each(contentList, function (index, node) {
                var columnId = $(node).attr('column-id');
                if (columnId === rowId) {
                    $(node).fadeIn(200).siblings().fadeOut(0);
                }
                else {
                    $(node).fadeOut(0);
                }
            });
        }
    };
    return customElem;
});






