/**
 * @file 弹出层位置由css中指定
 *
 * @author 381890975@qq.com, maketoday
 * @version 1.0.1
 * @copyright 在mip-sider上修改而成
 */
define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');


    /**
     * [toggle 打开或关闭 popuplayer 入口]
     *
	 * @param  {Object} event 点击事件
     */
    function toggle(event) {

        isOpen.call(this) ? close.call(this, event) : open.call(this);

    }

    /**
     * [open 打开 popuplayer]
     */
    function open() {
        var self = this;
        if (self.runing) {
            return;
        }
        self.runing = true;

        if (isOpen.call(this)) {
            return;
        }

        util.css(self.element, {display: 'block'});
        openMask.call(self);


        self.bodyOverflow = getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        self.element.setAttribute('open', '');



    }

    /**
     * [close 关闭 popuplayer]
     *
     * @param  {Object} event 点击事件
     */
    function close(event) {
        var self = this;
        self.runing = true;
        event.preventDefault();

        self.element.removeAttribute('open');
        util.css(self.element, {display: 'none'});
        document.body.style.overflow = self.bodyOverflow;
        closeMask.call(self);


    }

    /**
     * [closeAll 关闭除了自己的所有层 popuplayer]
     *
     * @param  {Object} event 点击事件
     */
    function closeAll(event) {
        var self = this;
        var id = '';
        var ele = '';
        self.runing = true;
        event.preventDefault();
        var lbclose = false;
        var layer = document.getElementsByClassName('MIP-POPUP-LAYER-MASK');
        for (var i = 0; i < layer.length; i++) {
            id = layer[i].id.split('-')[1];
            if (id === self.id) {
                continue;
            }
            ele = document.getElementById(id);
            if (ele.hasAttribute('open')) {
                ele.removeAttribute('open');
                ele.style.display = 'none';
                layer[i].style.display = 'none';
                lbclose = true;
            }
        }
        if (lbclose) {
            document.body.style.overflow = self.bodyOverflow;
        }
        self.runing = false;
    }

    /**
     * [openMask 打开遮盖层]
     */
    function openMask() {

        var self = this;

        // 不存在遮盖层时先创建
        if (!self.maskElement) {

            const mask = document.createElement('div');
            mask.id = 'mip-' + self.id + '-mask';
            mask.className = 'MIP-POPUP-LAYER-MASK';
            mask.style.display = 'block';

            // body级别dom
            document.body.appendChild(mask);
            mask.addEventListener('touchmove', function (evt) {
                evt.preventDefault();
            }, false);

            self.maskElement = mask;

        }

        self.maskElement.setAttribute('on', 'tap:' + self.id + '.close');

        // 样式设置
        self.maskElement.style.display = 'block';


        self.runing = false;

    }

    /**
     * [closeMask 关闭遮盖层]
     */
    function closeMask() {
        var self = this;
        if (self.maskElement) {

            self.maskElement.style.display = 'none';
            self.runing = false;

        }

    }

    /**
     * [isOpen popuplayer 状态判断]
     *
     * @return {boolean}
     */
    function isOpen() {

        return this.element.hasAttribute('open');

    }

    /**
     * build
     *
     */
    function build() {

        var self = this;
        self.maskElement = false;
        self.id = self.element.id;

        self.addEventAction('open', function () {
            open.call(self);
        });
        self.addEventAction('toggle', function (event) {
            toggle.call(self, event);
        });
        self.addEventAction('close', function (event) {
            close.call(self, event);
        });
        self.addEventAction('closeAll', function (event) {
            closeAll.call(self, event);
        });

    }

    customElement.prototype.build = build;
    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});
