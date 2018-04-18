/**
 * @file mip-custom-showmore 组件
 * @author JennyL
 */

define(function (require) {
    var showmoreEle = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');
    var timeoutArray = [];
    var staticOpt = {
        bottomShadowClass: 'mip-custom-showmore-gradient',
        btnClassWhenUnfold: 'mip-custom-showmore-btn-unfold'
    };

    /**
     * 构造元素，只会运行一次
     */
    showmoreEle.prototype.build = function () {
        var me = this;
        // 获取用户配置
        this._initOpts();

        // 初始化折叠，根据元素高度和限制高度判断是否需要折叠
        this._initHeight();

        // 暴露展开收起事件，供外界调用
        this.addEventAction('toggle', function (event) {
            me.toggle(event);
        });

        // 兼容手机横竖屏切换时，字数重新排列高度变化情况
        window.addEventListener('orientationchange', function () {
            me._initHeight();
        }, false);
        window.addEventListener('resize', function () {
            me._initHeight();
        }, false);
    };

    /**
     * 组件被移除时，清除计时器
     */
    showmoreEle.prototype.detachedCallback = function () {
        var tArr = timeoutArray && timeoutArray[this.element.id] || [];
        for (var i = 0; i < tArr.length; i++) {
            window.clearTimeout(tArr[i]);
        }
    };

    /**
     * 获取用户配置, 初始化参数
     */
    showmoreEle.prototype._initOpts = function () {
        var element = this.element;
        // 点击按钮
        this.button = this.element.querySelector('.mip-custom-showmore-btn');
        this.buttonDisplay = getComputedStyle(this.button).display;
        // 动画时间
        this.animateTime = element.getAttribute('animate-time');
        if (this.animateTime === null || isNaN(this.animateTime)) {
            // 默认展开收起动画时间0.24s
            this.animateTime = 0.24;
        }

        // 配置收起时底部渐变
        this.bottomShadow = element.getAttribute('bottom-shadow') === '1';
        // 支持配置最大高度
        this.maxHeight = element.getAttribute('max-height');
    };

    /**
     * 初始化折叠，根据元素高度和限制高度判断是否需要折叠
     */
    showmoreEle.prototype._initHeight = function () {
        // 获取页面元素高度
        var eleHeight;
        var showmoreEle = this.element;
        if (showmoreEle.style.height && showmoreEle.style.height.match('px')) {
            // 处于折叠状态获取真实高度，窗口宽高改变时
            eleHeight = getHeightUnfold(showmoreEle);
        }
        else {
            // 初始化，组件处于展开状态
            eleHeight = util.rect.getElementOffset(showmoreEle).height;
        }

        // 获取折叠元素目标高度
        var viewportHeight = viewport.getHeight();
        var hash = window.MIP.hash.get('mipanchor');
        if (hash === 'from-ad') {
            // 来自广告页，合作页正文强制0.5屏折叠
            this.maxHeight = viewportHeight * 0.5;
        }
        else if (!this.maxHeight) {
            // 默认1.5屏幕折叠
            this.maxHeight = viewportHeight * 1.5;
        }

        // 如果高度大于阈值
        if (eleHeight > this.maxHeight) {
            util.css(showmoreEle, {
                height: this.maxHeight + 'px',
                overflow: 'hidden'
            });
            // 改变按钮的样式值 - 改为点击可展开
            this.changeBtnStyle('fold');
        }
        else {
            // 高度小于阈值，高度自动贴合内容
            util.css(showmoreEle, 'height', 'auto');
            // 改变按钮的样式 - 不需要折叠，隐藏按钮
            util.css(this.button, 'display', 'none');
        }
        // 显示默认隐藏的showmore, 避免初始加载闪现
        util.css(showmoreEle, {
            visibility: 'visible'
        });
    };

    // 改变按钮的样式值 - showmore改为隐藏状态, 按钮为“收起”
    showmoreEle.prototype.changeBtnStyle = function (type) {
        // 选中 showmore 的div
        if (type === 'fold') {
            // 开始折叠，隐藏内容
            // 删除按钮展开class(可自定义样式)
            this.button.classList.remove(staticOpt.btnClassWhenUnfold);
            // 增加bottom渐变
            this.element.classList.add(staticOpt.bottomShadowClass);
            // debugger;
            if (!this.button.dataset.tounfoldtext) {
                // 初次打开，保存data-tounfoldtext参数
                this.button.setAttribute('data-tounfoldtext', this.button.innerHTML);
            }
            else {
                // 展开收起，修改文字为【展开更多】
                this.button.innerHTML = this.button.dataset.tounfoldtext;
            }
        }
        else if ((type === 'unfold')) {
            // 开始展开，显示内容操作
            // 增加按钮展开class(可自定义样式)
            this.button.classList.add(staticOpt.btnClassWhenUnfold);
            // 处理bottom渐变
            this.element.classList.remove(staticOpt.bottomShadowClass);
            // 修改文字为【收起】
            // debugger;
            // this.button.setAttribute('data-tofoldtext', this.button.innerHTML);
            this.button.innerHTML = this.button.dataset.tofoldtext;
        }

    };

    // 高度阈值控制
    showmoreEle.prototype.toggle = function (event) {
        var classList = this.element.classList;
        var clickBtn = this.button;
        var opt = {};
        opt.aniTime = this.animateTime;
        if (classList.contains('mip-showmore-boxshow')) {
            this.bottomShadow && this.element.classList.add(staticOpt.bottomShadowClass);
            // 隐藏超出高度的内容
            classList.remove('mip-showmore-boxshow');
            opt.type = 'fold';
            opt.tarHeight = this.maxHeight + 'px';
            opt.cbFun = function (showmore, clickBtn) {
                showmore.changeBtnStyle('fold');
            }.bind(undefined, this, clickBtn);
        }
        else {
            // 显示超出高度的内容
            this.bottomShadow && this.element.classList.remove(staticOpt.bottomShadowClass);
            classList.add('mip-showmore-boxshow');
            opt.type = 'unfold';
            opt.cbFun = function (showmore, clickBtn) {
                showmore.changeBtnStyle('unfold');
                showmore.element.style.height = 'auto';
            }.bind(undefined, this, clickBtn);
        }
        heightAni({
            ele: this.element,
            type: opt.type,
            transitionTime: opt.aniTime,
            tarHeight: opt.tarHeight,
            oriHeight: opt.oriHeight,
            cbFun: opt.cbFun
        });
    };

    /** 高度变化动画。固定高度展开为auto
     * Make height transiton for element that has unknown height.
     * height transiton from 0px/40px to whatever height element will be.
     *
     * author&maintainer liangjiaying<jiaojiaomao220@163.com>
     *
     * @param  {Object} opt options
     * @example
     * {
     *     "ele": document.getElementById('id1'), // target DOM
     *     "type": "fold",                  // "fold" or "unfold"
     *     "transitionTime": "0.3",         // seconds, animation time
     *     "tarHeight": "140px",            // DOM height when animation ends
     *     "oriHeight": "20px",             // DOM height when animation begins
     *     "cbFun": function() {}.bind()    //callback, exec after animation
     * }
     */
    function heightAni(opt) {
        var element = opt.ele;
        var type = opt.type;
        var transitionTime;
        var timeoutArr = timeoutArray || [];

        if (!type || !element) {
            return;
        }

        if (opt.transitionTime === undefined || isNaN(opt.transitionTime)) {
            // if transition time is not set, set into 0.24s
            transitionTime = 0.24;
        }
        else {
            // '0.2s' -> 0.2, 20 -> 1, -0.5 -> 0.5
            transitionTime = Math.min(parseFloat(opt.transitionTime), 1);
        }

        // use ?: to make sure oriHeight won't be rewrite when opt.oriHeight is set to 0
        var oriHeight = (opt.oriHeight !== undefined ? opt.oriHeight : getComputedStyle(element).height);
        var tarHeight;
        var cbFun = opt.cbFun || function () {};

        if (type === 'unfold') {

            // make sure tarHeight won't be rewrite when opt.tarHeight is set to 0
            if (opt.tarHeight !== undefined) {
                tarHeight = opt.tarHeight;
            }
            else {
                // before set height to auto, remove animation.
                // or bad animation happens in iphone 4s
                element.style.transition = 'height 0s';
                element.style.height = 'auto';
                tarHeight = getComputedStyle(element).height;
            }

            // set height to auto after transition,
            // in case of height change of inside element later.
            var timeout1 = setTimeout(function () {
                // before set height to auto, remove animation.
                // or bad animation happens in iphone 4s
                element.style.transition = 'height 0s';
                element.style.height = 'auto';
            }, transitionTime * 1000);
            timeoutArr[0] = timeout1;
        }
        else if (type === 'fold') {
            tarHeight = opt.tarHeight || 0;
        }

        element.style.height = oriHeight;
        // now start the animation
        var timeout2 = setTimeout(function () {
            element.style.transition = 'height ' + transitionTime + 's';
            // XXX: in setTimeout, or there won't be any animation
            element.style.height = tarHeight;
        }, 10);
        // after transition, exec callback functions
        var timeout3 = setTimeout(function () {
            cbFun();
        }, transitionTime * 1000);

        // save timeout, for later clearTimeout
        timeoutArr[element.id] = timeoutArr[element.id] || [];
        timeoutArr[element.id][1] = timeout2;
        timeoutArr[element.id][2] = timeout3;
    }

    /** 获取折叠元素的真实高度
     * get real height of DOM without height restrictions
     *
     * @param  {Object} dom some dom
     * @return {number}     height
     */
    function getHeightUnfold(dom) {
        var fakeNode = document.createElement('div');
        var style = getComputedStyle(dom);
        fakeNode.innerHTML = dom.innerHTML;

        fakeNode.style.padding = style.padding;
        fakeNode.style.margin = style.margin;
        fakeNode.style.border = style.border;

        fakeNode.style.position = 'absolute';
        // 先插入再改样式，以防元素属性在createdCallback中被添加覆盖
        dom.parentNode.insertBefore(fakeNode, dom);
        fakeNode.style.height = 'auto';
        fakeNode.style.visibility = 'hidden';

        var height = util.rect.getElementOffset(fakeNode).height;
        dom.parentNode.removeChild(fakeNode);

        return height;
    }

    return showmoreEle;
});
