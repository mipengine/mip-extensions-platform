/**
 * @file 引入春雨内部UI通用组件
 * @author 春雨前端开发组
 */
define(function () {
    'use strict';
    var scriptId = 'CYUI_DUP_JS';
    var jsSrc = 'https://media2.chunyuyisheng.com/@/cyui/0.0.1/cyui.window.js';
    var CYUI_DUP_JS = document.getElementById(scriptId);

    if (CYUI_DUP_JS) {
        return CYUI_DUP_JS;
    }

    var script = document.createElement('script');
    script.src = jsSrc;
    script.id = scriptId;
    document.body.appendChild(script);
});
