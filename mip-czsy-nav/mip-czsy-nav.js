/**
 * @file 菜单 mip-czsy-nav
 * @author sunwr
 * @time 2017.06
 */
define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    function build() {
        var element = this.element;
        render(element);
    }

    /**
     * 渲染dom
     *
     * @param  {obj} me this
     */
    function render(me) {
        var $this = $(me);
        var id = $this.data('id');
        var $btnWrap = '<div class="mmenu"><span class="span1"></span>'
		+ '<span class="span2"></span><span class="span3"></span></div>'
		+ '<div class="mmenu_shad"></div>';
        $this.prepend($btnWrap);
        addClass($('.mmenu'), '#'
		+ id);
        addClass($('.mmenu_shad'), '#'
		+ id);
    }

	/**
     * 增加按钮按下class对应颜色
     *
     * @param {obj} $dom dom object
	 * @param {obj} strid dom object
     */
    function addClass($dom, strid) {
        $dom.on('click', function () {
            $(strid).toggleClass('active');
            $('.mmenu').toggleClass('active');
            $('.mmenu_shad').toggleClass('active');
        });
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElement.prototype.build = build;
    return customElement;
});
