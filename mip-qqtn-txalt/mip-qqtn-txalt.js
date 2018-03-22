/**
 * @file mip-qqtn-txalt 组件.点击图片放大，一键下载图片，只有安卓显示。版本1.1.1 配合升级到https协议后的图片路径进行重新获取
 * @author gom3250@qq.com.
 * @version 1.0.1
 *  */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var Util = require('util');
        var naboo = require('naboo');
        var viewport = require('viewport');
        var ele = this.element;
        var elements = [];
        var Gesture = Util.Gesture;
        var css = Util.css;
        var dWidth = viewport.getWidth();
        var dHeight = viewport.getHeight();
        // 增加专属属性供JS使用
        $(ele).find('mip-qqtn-txalt mip-img').each(function (i) {
            var myimgurl = $(this).attr('src');
            var myihao = myimgurl.split('!')[0];
            if (myimgurl.indexOf('pic1') !== -1) {
                var zhimgurl = myimgurl.replace('http://pic1.qqtn.com/qqtn/mb/', 'http://pic.qqtn.com/');
                var zhimgurl = zhimgurl.split('_');
                var impgeshi = (zhimgurl.pop()).split('.');
                $(this).attr({'data-index': i, 'data-original': zhimgurl[0] + '.' + impgeshi.pop()});
            } else {
                $(this).attr({'data-index': i, 'data-original': myihao});
            }
        });
        var ui = {
            defaultSetting: {
                app: 'false',
                appurl: 'http://nz.qqtn.com/zbsq/Apk/gxtx_qqtn.apk',
                nexturl: '',
                download: '保存图片',
                txtxt: '设为头像'
            },
            slider: '',
            downloadBtn: '',
            index: '',
            eLen: 0,
            init: function (index) {
                this.index = index;
                this.eLen = elements.length;
                this.build(index);
                this.setSlide(index);
            },
            build: function (index) {
                var self = this;
                this.createWrap();
                elements.map(function (imgurl, index) {
                    var slide = self.createSlide();
                    // 插入图片
                    var img = new Image();
                    img.src = imgurl;
                    img.onload = function () {
                        css(img, {
                            position: 'absolute',
                            width: '100%',
                            left: 0,
                            top: (dHeight - img.height * dWidth / img.width) / 2 + 'px'
                        });

                        slide.appendChild(img);
                        self.slider.appendChild(slide);
                    };
                });
                self.actions();
            },
            createWrap: function () {
                var overlay = document.createElement('div');
                overlay.id = 'mip-txalt-overlay';

                var slider = document.createElement('div');
                slider.id = 'mip-txalt-slider';
                this.slider = slider;
                // 设置slider宽度
                css(slider, {width: this.eLen * dWidth + 'px'});

                var picdownload = document.createElement('a');
                picdownload.id = 'mip-txalt-download';
                picdownload.innerHTML = ui.defaultSetting.download;
                this.downloadBtn = picdownload;

                var overlayClose = document.createElement('a');
                overlayClose.id = 'mip-txalt-close';

                var downapk = document.createElement('a');
                downapk.id = 'mip-txalt-appdown';
                downapk.innerHTML = ui.defaultSetting.txtxt;
                downapk.href = this.defaultSetting.appurl;

                overlay.appendChild(slider);
                overlay.appendChild(overlayClose);
                overlay.appendChild(picdownload);

                // 判断设备,安卓才下APK
                if (/android/i.test(navigator.userAgent)) {
                    overlay.appendChild(downapk);
                    picdownload.setAttribute('style', 'right:auto;left:15%');
                }

                document.body.appendChild(overlay);


                // 关闭按钮事件监听
                overlayClose.addEventListener('click', function () {
                    document.body.removeChild(overlay);
                });
            },
            createSlide: function () {
                var slide = document.createElement('div');
                slide.className = 'mip-txalt-slide';
                // 初始化slide样式
                css(slide, {width: dWidth, height: dHeight});

                return slide;
            },
            actions: function () {
                // 动作展示
                var self = this;
                var gesture = new Gesture(self.slider, {
                        preventY: true
                    });

                gesture.on('swipe', function (e, data) {
                    var currentIndex;

                    switch (data.swipeDirection) {
                        case 'left':
                            currentIndex = self.index >= self.eLen - 1 ? self.eLen - 1 : ++self.index;
                            break;
                        case 'right':
                            currentIndex = self.index <= 0 ? 0 : --self.index;
                            break;
                    }

                    self.setSlide(currentIndex);
                });
            },
            setSlide: function (index) {
                var self = this;
                var currentX = index * dWidth;
                // 实例化动画
                naboo.animate(self.slider,
                {
                    'transform': 'translateX(-' + currentX + 'px)'
                }, {
                    duration: '0.6s',
                    ease: 'ease-out',
                    delay: 0,
                    mode: 'transition'
                }).start();

                // 设置下载链接
                this.picdownload(index);
            },
            picdownload: function (index) {
                var download = this.downloadBtn;
                download.innerHTML = this.defaultSetting.download;
                download.setAttribute('href', elements[index]);
                download.setAttribute('download', true);
            }
        };
        // 模板渲染，事件绑定
        var element = this.element;
        var imgNodes = element.querySelectorAll('mip-img');
        var nodes = Array.prototype.slice.call(imgNodes);
        nodes.map(function (node) {
            elements.push(node.getAttribute('data-original'));
        });
        // 元素点击监听
        element.addEventListener('click', function (e) {
            if (e.target.nodeName === 'IMG') {
                var index = e.target.parentNode.getAttribute('data-index');
                ui.init(index);
            }
        });
    };
    return customElement;
});
