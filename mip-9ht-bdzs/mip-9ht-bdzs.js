/**
 * @file mip-9ht-bdzs 组件
 * @author lj
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var soUrl = 'http://s.9ht.com/cse/search?';
        var sopQ = '';
        document.getElementById('bdcs-search-form-submit').onclick = function (event) {
            var e = event || window.event;
            e.preventDefault();
            window.event.returnValue = false;
            sopQ = document.getElementsByName('q')[0].value;
            if (sopQ !== '') {
                window.open(soUrl + 's=10517699197560052058&nsid=3&entry=1&ie=gbk&q=' + sopQ);
            }
        };
    };
    return customElement;
});
