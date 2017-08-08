/**
 * @file mip-mipengine-preview 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();


    /**
     * 初始化，给每个按钮绑定点击事件，点击时触发组件切换
     *
     * @param  {Object} ele DOM 元素
     */
    function init(ele) {
        var previewBtn = ele;

        // 给预览按钮绑定事件
        previewBtn.setAttribute('on', 'tap:example-lightbox.open');
        previewBtn.addEventListener('click', showPreview, false);

        // 给lightbox弹层绑定关闭事件
        var lightboxFills = document.querySelectorAll('mip-lightbox .mip-fill-content');
        for (var i = 0; i < lightboxFills.length; i++) {
            var lightbox = lightboxFills[i];
            lightbox.setAttribute('on', 'tap:example-lightbox.close');
        }
    }

    /**
     * 拼装页面内容，显示在 iframe 中
     *
     * @param  {Object} e dom
     */
    function showPreview(e) {
        var heading = getPreHeading(e.target);
        var mipCss = '<link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css">';
        var customCss = '.preview-heading{color: white; background:#2d3c59; padding: 10px 2px; font-weight:300;}';
        var customCssDom = '<style mip-custom>' + customCss + '</style>';
        var presetDom = document.getElementsByClassName('example-preset')[0];
        var preset = presetDom ? decodeURIComponent(presetDom.dataset.string) : '';
        var htmlStr = e.target.nextElementSibling.innerText;
        var mipjs = '<script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>';
        var jsStr = getDependencyJs();

        var iframeText = heading + mipCss + customCssDom + preset + htmlStr + mipjs + jsStr;

        var iframe = document.getElementById('iframe');
        iframe.srcdoc = iframeText;
        // 兼容 IE
        iframe.contentDocument.body.innerHTML = iframeText;
    }

    // 查找组件依赖的javascript
    function getDependencyJs() {
        var links = document.querySelectorAll('.markdown-body table a');
        var jsStr = [];
        for (var i = 0; i < links.length; i++) {
            var link = links[i].innerText;
            if (link.match('//mipcache.bdstatic.com/static/')) {
                jsStr.push('<script src="' + link + '"></script>');
            }
        }
        return jsStr.join('\n');
    }

    // 从指定预览按钮向前，选取最近的h[1-6]标题并返回
    function getPreHeading(ele) {
        var pre = ele.previousElementSibling;
        var match = pre.tagName.match(/^H([1-6])/);
        if (match && match[0]) {
            var head = match[0].toLowerCase();
            return '<' + head + ' class="preview-heading">' + pre.innerText + '</' + head + '>';
        }
        return getPreHeading(pre);
    }


    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        init(element);
    };

    return customElement;
});
