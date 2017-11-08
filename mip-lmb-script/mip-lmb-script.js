/**
* @file     辣妈帮mip:URL跳转、关闭元素显示、点击切换元素显示组件
* @author   981993907@qq.com
*/
define(function (require) {
    var customEle = require('customElement').create();
    customEle.prototype.firstInviewCallback = function () {
        // URL跳转
        this.addEventAction('urlJump', function (event, url) {
            if (url) {
                location.href = url;
                // console.log(url);
            }
        });
        // 切换元素显示
        this.addEventAction('toggleEle', function (event, id) {
            if (id) {
                var elemen = document.getElementById(id);
                if (elemen.style.display === 'none') {
                    elemen.style.display = 'block';
                } else {
                    elemen.style.display = 'none';
                }
            }
        });
        // 隐藏元素
        this.addEventAction('closeEle', function (event, id) {
            if (id) {
                document.getElementById(id).style.display = 'none';
            }
        });
    };
    return customEle;
});
