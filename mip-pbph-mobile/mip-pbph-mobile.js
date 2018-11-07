/**
 * @file mip-pbph-mobile 一键一屏（屏幕滚动）
 * @author yhf
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        // 获取页面标识
        var page = document.getElementById('page').innerText;
        if (page === 'membership_system_solution') {
            // 会员系统解决方案-点击tabs切换banner图片
            document.getElementById('btn1').onclick = function () {
                document.getElementById('banner2').style.display = 'none';
                document.getElementById('banner3').style.display = 'none';
                document.getElementById('banner1').style.display = 'block';
            };
            document.getElementById('btn2').onclick = function () {
                document.getElementById('banner1').style.display = 'none';
                document.getElementById('banner3').style.display = 'none';
                document.getElementById('banner2').style.display = 'block';
            };
            document.getElementById('btn3').onclick = function () {
                document.getElementById('banner2').style.display = 'none';
                document.getElementById('banner3').style.display = 'none';
                document.getElementById('banner1').style.display = 'block';
            };
            document.getElementById('btn4').onclick = function () {
                document.getElementById('banner1').style.display = 'none';
                document.getElementById('banner2').style.display = 'none';
                document.getElementById('banner3').style.display = 'block';
            };
        };


        window.onload = function () {
            // 判断一键一屏页面
            if ((page === 'index') || (page === 'gypb')) {
                // 禁止双击事件
                document.documentElement.addEventListener('dblclick', function (e) {
                    e.preventDefault();
                });
                // 检测是否是ios
                var agent = navigator.userAgent.toLowerCase();
                // 缓存上一次tap的时间
                var iLastTouch = null;
                if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
                    document.body.addEventListener('touchend', function (event) {
                        var iNow = new Date().getTime();
                        // 第一次时将iLastTouch设为当前时间+1
                        iLastTouch = iLastTouch || iNow + 1;
                        var delta = iNow - iLastTouch;
                        if (delta < 500 && delta > 0) {
                            event.preventDefault();
                            return false;
                        }
                        iLastTouch = iNow;
                    }, false);
                }
                // 页面标识号
                var direct = 0;
                // 滑动延迟属性
                var scrollStatus = true;
                // 手指滑动距离
                var moveY;
                // 手指停止滑动时y轴坐标
                var endY;
                // 滑动计数器
                var cout = 1;
                // 触摸y轴坐标
                var startY;
                // 触摸x轴坐标
                var startX;
                // 获取触摸对象
                var touch;
                // 滑动方向
                var moveDir;
                // 滑动对象
                var movebox = document.getElementById('Slide');
                // 滑动对象item
                var Li = document.getElementsByClassName('Slide-container');
                // 滑动对象个数
                var lisize = Li.length;
                // 滑动对象item的高度
                var height = document.documentElement.clientHeight;
                // 设置滑动盒子height
                movebox.style.height = (height * parseInt(Li.length, 10)) + 'px';
                var moveboxheight = height * parseInt(Li.length, 10);
                for (var i = 0; i < Li.length; i++) {
                    // 设置滑动item的height，适应屏幕height
                    Li[i].style.height = height + 'px';
                };

                // 滑动对象事件绑定
                // 触摸事件
                movebox.addEventListener('touchstart', boxTouchStart, false);
                // 触摸过程
                movebox.addEventListener('touchmove', boxTouchMove, false);
                // 触摸结束
                movebox.addEventListener('touchend', boxTouchEnd, false);
                function boxTouchStart(e) {

                    // 初始化隐藏不显示页面
                    var opacit = document.getElementsByClassName('opacit');
                    for (var s = 0; s < opacit.length; s++) {
                        opacit[s].style.opacity = '1';
                    };
                    // 获取触摸对象
                    var touch = e.touches[0];
                    // 获取触摸坐标
                    startY = touch.pageY;
                    // 获取触摸坐标
                    startX = touch.pageX;
                    var translateY = movebox.style.webkitTransform.replace(/[^0-9\-,]/g, '');
                    if (translateY === '') {
                        // 初始化偏移值
                        translateY = 0;
                    };
                    // 获取每次触摸时滑动对象X轴的偏移值
                    endY = parseInt(translateY, 10);
                }


                function getAngle(angx, angy) {
                    // 触摸点坐标转化
                    return Math.atan2(angy, angx) * 180 / Math.PI;
                }

                // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
                function getDirection(startX, startY, endx, endy) {
                    var angx = endx - startX;
                    var angy = endy - startY;
                    var result = 0;

                    // 如果滑动距离太短
                    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                        return result;
                    };

                    var angle = getAngle(angx, angy);
                    // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
                    if (angle >= -135 && angle <= -45) {
                        result = 1;
                    } else if (angle > 45 && angle < 135) {
                        result = 2;
                    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                        result = 3;
                    } else if (angle >= -45 && angle <= 45) {
                        result = 4;
                    };

                    return result;
                }

                // 触摸离开
                var endx;
                // 触摸离开
                var endy;
                // 触摸距离
                var pageY2;
                function boxTouchMove(e) {
                    // 阻止页面轮播影响滑动
                    var oZuolist = document.getElementsByClassName('mip-carousel-nextBtn');
                    for (var i = 0; i < oZuolist.length; i++) {
                        oZuolist[i].onclick = function () {
                            direct = 1;
                            return false;
                        };
                    };
                    // 阻止页面轮播影响滑动
                    var oZuolist1 = document.getElementsByClassName('ip-carousel-preBtn');
                    for (var v = 0; i < oZuolist1.length; v++) {
                        oZuolist[v].onclick = function () {
                            direct = 1;
                            return false;
                        };
                    };
                }

                function boxTouchEnd(e) {
                    if (page === 'gypb') {
                        // 轮播页面角标
                        var course = document.getElementsByClassName(' mip-carousel-indicatornow')[0].innerHTML;
                        var time = document.getElementsByClassName('time');
                        var timedian = document.getElementsByClassName('dian');
                        // 根据角标修改页面状态
                        for (var s = 0; s < time.length; s++) {
                            if ((s + 1) === course) {
                                time[s].style.fontWeight = 'bold';
                                timedian[s].style.display = 'block';
                            } else {
                                time[s].style.fontWeight = '';
                                timedian[s].style.display = 'none';
                            };
                        }
                    }
                    // 阻止双击事件
                    document.documentElement.addEventListener('dblclick', function (e) {
                        e.preventDefault();
                    });

                    touch = e.changedTouches[0];
                    // 手指方向移动的距离;
                    moveY = touch.pageY - startY;
                    pageY2 = touch.pageY;

                    endx = touch.pageX;
                    endy = touch.pageY;

                    // 刚开始第一次向下滑动时
                    if (cout === 1 && moveY > 0) {

                        return false;
                    }
                    // 滑动到最后继续向下滑动时
                    if (cout === lisize && moveY < 0) {

                        return false;
                    }
                    var Sliding = Math.abs((parseInt(pageY2, 10) - parseInt(startY, 10)));

                    if (Sliding < 100) {

                        return false;
                    }

                    var direction = getDirection(startX, startY, endx, endy);

                    switch (direction) {
                        case 0:
                            // 未滑动！

                            break;
                        case 1:
                            //  向上
                            direct = 0;
                            break;
                        case 2:
                            //  向下
                            direct = 0;
                            break;
                        case 3:
                            //  向左
                            direct = 1;
                            return false;
                            break;
                        case 4:
                            //  向右
                            direct = 1;
                            return false;
                            break;
                        default:
                    };

                    if (direct === 1) {
                        return false;
                    };

                    // 滑动方向大于0表示向左滑动，小于0表示向右滑动
                    moveDir = moveY < 0 ? true : false;
                    // 手指向下滑动
                    if (moveDir && scrollStatus) {
                        scrollStatus = false;
                        setTimeout(function () {
                            scrollStatus = true;
                            if (cout < lisize) {
                                var oZuolist = document.getElementsByClassName('mip-carousel-nextBtn');
                                for (var i = 0; i < oZuolist.length; i++) {
                                    oZuolist[i].onclick = function () {
                                        direct = 1;
                                        return false;

                                    };
                                };
                                var oZuolist1 = document.getElementsByClassName('ip-carousel-preBtn');
                                for (var v = 0; i < oZuolist1.length; v++) {
                                    oZuolist[v].onclick = function () {
                                        direct = 1;
                                        return false;
                                    };
                                };
                                if (direct === 1) {
                                    return false;
                                } else {
                                    // 页面滑动偏移距离
                                    movebox.style.webkitTransform = 'translateY(' + (endY - height) + 'px)';

                                    cout++;
                                    if (page === 'index') {
                                        pageMonitoring(cout);
                                    };
                                };

                            };
                        }, 400);

                        // 手指向滑动
                    } else if (scrollStatus) {
                        scrollStatus = false;
                        setTimeout(function () {
                            scrollStatus = true;
                            // 滑动到初始状态时返回false
                            if (cout === 1) {
                                return false;
                            } else {
                                var oZuolist = document.getElementsByClassName('mip-carousel-nextBtn');
                                for (var i = 0; i < oZuolist.length; i++) {
                                    oZuolist[i].onclick = function () {
                                        direct = 1;
                                        return false;

                                    };
                                };
                                var oZuolist1 = document.getElementsByClassName('ip-carousel-preBtn');
                                for (var v = 0; i < oZuolist1.length; v++) {
                                    oZuolist[v].onclick = function () {
                                        direct = 1;
                                        return false;

                                    };
                                };
                                if (direct === 1) {
                                    return false;
                                } else {
                                    // 页面滑动偏移距离
                                    movebox.style.webkitTransform = 'translateY(' + (endY + height) + 'px)';

                                    cout--;
                                    if (page === 'index') {
                                        pageMonitoring(cout);
                                    };
                                };

                            };
                        }, 400);

                    };
                }

                var nextpage = document.getElementsByClassName('nextpage');
                // 翻页角标
                var nextsize = 1;
                // 实现点击翻页效果
                nextpage[0].onclick = function () {
                    var opacit = document.getElementsByClassName('opacit');
                    for (var s = 0; s < opacit.length; s++) {

                        opacit[s].style.opacity = '1';


                    };
                    if (cout === lisize) {
                        return false;
                    };
                    console.log(cout);
                    if (cout === 1) {
                        // 翻页偏移
                        movebox.style.webkitTransform = 'translateY(' + -(nextsize * height) + 'px)';
                        direct = 0;

                        cout++;
                        if (page === 'index') {
                            pageMonitoring(cout);
                        };

                    } else {
                        var nextY = movebox.style.webkitTransform.replace(/[^0-9\-,]/g, '');
                        movebox.style.webkitTransform = 'translateY(' + (nextY - height) + 'px)';
                        direct = 0;
                        cout++;
                        if (page === 'index') {
                            pageMonitoring(cout);
                        };

                    };

                };

                document.body.addEventListener('touchmove', function (e) {
                    // 阻止默认的处理方式(阻止下拉滑动的效果)
                    e.preventDefault();
                    // passive 参数不能省略，用来兼容ios和android
                }, {passive: false});

                document.getElementById('nav').addEventListener('touchmove', function (e) {
                    e.stopPropagation();
                }, false);

                // 实现返回顶部功效
                document.getElementById('footertop').onclick = function () {
                    movebox.style.webkitTransform = 'translateY(' + 0 + 'px)';
                    cout = 1;
                    nextsize = 1;
                };
                // 修改下翻页按钮样式
                function pageMonitoring(v) {
                    if ((v === 2) || (v === 4)) {
                        document.getElementById('nextpage').className = '';
                        document.getElementById('nextpage').className = 'nextpage2';
                    } else if (v === 5) {
                        document.getElementById('nextpage').className = '';
                    } else {
                        document.getElementById('nextpage').className = '';
                        document.getElementById('nextpage').className = 'nextpage1';
                    }
                }
            };
        };


// 移动端文字大小适应
        document.documentElement.style.fontSize = window.innerWidth / 10 + 'px';
    };

    return customElement;
});
