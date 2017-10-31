/**
 * @file mip-wygx-imgslider 组件.
 * @author east_qiu@gmail.com.
 * @version 1.0.0
 */

define(function (require) {

    var customElement = require('customElement').create();

    var Util = require('util');
    var naboo = require('naboo');
    var templates = require('templates');
    var viewport = require('viewport');
    var elements = [];
    var Gesture = Util.Gesture;
    var css = Util.css;

    var dWidth = viewport.getWidth(); // 设备宽度
    var dHeight = viewport.getHeight(); // 设备高度


    var ui = {
        defaultSetting: {
            app: 'false',
            appurl: 'http://m.woyaogexing.com/app/wygxw.apk',
            nexturl: '',
            download: '保存图片'
        },
        slider: '',
        downloadBtn: '',
        index: '',
        eLen: 0,
        init: function (index) {
            this.index = index;
            this.eLen = this.defaultSetting.app === 'true' ? elements.length + 1 : elements.length;

            this.build(index);
            this.setSlide(index);
        },
        build: function (index) {

            var self = this;
            this.createWrap();
            elements.map(function (ele, index) {

                var slide = self.createSlide();

                // 插入图片
                var img = new Image();
                img.src = ele.src;
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

            // 利用定时器做异步
            setTimeout(function () {
                self.defaultSetting.app === 'true' ? self.appdownload() : false;
            }, 0);
        },
        createWrap: function () {
            var overlay = document.createElement('div');
            overlay.id = 'mip-wygx-overlay';

            var slider = document.createElement('div');
            slider.id = 'mip-wygx-slider';
            this.slider = slider;
            // 设置slider宽度
            css(slider, {width: this.eLen * dWidth + 'px'});

            var picdownload = document.createElement('a');
            picdownload.id = 'mip-wygx-download';
            picdownload.innerHTML = ui.defaultSetting.download;
            this.downloadBtn = picdownload;

            var overlayClose = document.createElement('a');
            overlayClose.id = 'mip-wygx-close';

            overlay.appendChild(slider);
            overlay.appendChild(overlayClose);
            overlay.appendChild(picdownload);

            document.body.appendChild(overlay);


            // 关闭按钮事件监听
            overlayClose.addEventListener('click', function () {
                document.body.removeChild(overlay);
            });
        },
        createSlide: function () {
            var slide = document.createElement('div');
            slide.className = 'mip-wygx-slide';
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
            if (index === this.eLen - 1) {
                download.innerHTML = '下一组';
                download.setAttribute('href', this.defaultSetting.nexturl);
                download.removeAttribute('download');
            }
            else {
                download.innerHTML = this.defaultSetting.download;
                download.setAttribute('href', elements[index].src);
                download.setAttribute('download', true);
            }
        },
        appdownload: function () {

            var appdownload = document.createElement('a');
            appdownload.download = true;
            appdownload.id = 'mip-wygx-appdown';
            appdownload.href = this.defaultSetting.appurl;

            var appimg = document.createElement('span');
            appimg.id = 'mip-wygx-image';

            var p1 = document.createElement('p');
            p1.innerHTML = '下载我要个性APP';

            var p2 = document.createElement('p');
            p2.innerHTML = '获取更多高清头像';

            var slide = this.createSlide();

            appdownload.appendChild(appimg);
            appdownload.appendChild(p1);
            appdownload.appendChild(p2);
            slide.appendChild(appdownload);
            this.slider.appendChild(slide);

            var offset = Util.rect.getElementOffset(appdownload);
            css(appdownload, {marginTop: (dHeight - offset.height) / 2});
        }
    };

    // 组件初次进入屏幕时加载事件，作为性能优化
    customElement.prototype.firstInviewCallback = function () {
        // 模板渲染，事件绑定
        var element = this.element;

        // 获取页面数据
        var script = element.querySelector('script[type="application/json"]');
        var data = script ? JSON.parse(script.textContent.toString()) : null;
        this.data = Object.values(data)[0];
        elements = this.data;

        // 模板渲染
        templates.render(element, data).then(function (html) {
            element.innerHTML = html;
        });

        // 对象合并
        Object.assign(ui.defaultSetting, {
            app: element.getAttribute('data-app'),
            appurl: element.getAttribute('data-appurl'),
            nexturl: element.getAttribute('data-nexturl'),
            download: element.getAttribute('data-downText')
        }, ui.defaultSetting);

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
