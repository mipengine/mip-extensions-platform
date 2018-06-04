/**
 * @file 复制文本并提示
 * @author lj
*/
define(function (require) {
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var copyele = ele.querySelector('p');
        var tipele = ele.querySelector('section');
        function copy(str) {
            var save = function (e) {
                e.clipboardData.setData('text/plain', str);
                e.preventDefault();
            };
            document.addEventListener('copy', save);
            document.execCommand('copy');
            if (tipele.querySelector('div')) {
                return false;
            }
            var html = '<div id="cpsTips"><mip-img class="img" src="https://m.pc6.com/public/img/success.png"></mip-img><div class="txt">复制成功</div><div class="cpsTips_bg"></div></div>';
            tipele.insertAdjacentHTML('beforeend', html);
            setTimeout(function () {
                tipele.removeChild(tipele.querySelector('div'));
            }, 500);
        }
        copyele.addEventListener('click', function (ev) {
            copy(ev.target.getAttribute('txt'));
        });
    };
    return customElem;
});
