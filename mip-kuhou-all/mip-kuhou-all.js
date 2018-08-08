/**
 * @file mip-kuhou-all 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    customElement.prototype.build = function () {
        var element = this.element;
		// 单机按钮
        var clickBtn = element.querySelector('[showmorebtn]');
        // 显示框
        var showBox = element.querySelector('[showmorebox]');
		// 获取高度
        var maxHeight = element.getAttribute('maxheight');
        var animateTime = element.getAttribute('animatetime') || 0;
        if (maxHeight && !isNaN(maxHeight)) {
            kuhou();
        }
		else {
            maxHeight = 0;
            kuhou();
        }
        // 避免初始加载闪现
        util.css(element, {
            visibility: 'visible'
        });
		// 控制高度
        function kuhou() {
			// 获取主体高度
            var showBoxHei = util.rect.getElementOffset(showBox).height;
            if (showBoxHei > maxHeight) {
                util.css(showBox, {
                    height: maxHeight + 'px',
                    overflow: 'hidden'
                });
                // 显示更多按钮
                var showMoreBtn = element.querySelector('.showmorebtn');
                util.css(showMoreBtn, {
                    display: 'block'
                });
                // 绑定显示更多按钮
                clickBtn.addEventListener('click', function () {
                    // 如果现在为打开状态
                    if (this.classList.contains('mip-kuhou-boxshow')) {
                        this.classList.remove('mip-kuhou-boxshow');
                        util.css(showBox, {
                            height: maxHeight + 'px'
                        });
                        changeBtnText({
                            display: 'block'
                        }, {
                            display: 'none'
                        });
                    }
					else {
                        this.classList.add('mip-showmore-boxshow');
                        util.css(showBox, {
                            height: showBoxHei + 'px',
                            transition: 'height ' + animateTime + 's'
                        });
                        var runtime = animateTime * 1000;
                        setTimeout(function () {
                            // 防止内部出现懒加载元素导致高度计算不对
                            util.css(showBox, {
                                transition: 'height 0s',
                                height: 'auto'
                            });
                        }, runtime);
                        changeBtnText({
                            display: 'none'
                        }, {
                            display: 'none'
                        });
                    }
                });
            }
        }
        function changeBtnText(showBtnObj, hideBtnObj) {
            var btnShow = element.querySelector('.mip-kuhou-btnshow');
            changeBtnShow(btnShow, showBtnObj);
        }
        function changeBtnShow(obj, cssObj) {
            util.css(obj, cssObj);
        }
    };
    return customElement;
});
