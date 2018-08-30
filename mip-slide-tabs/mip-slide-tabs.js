/**
 * @file mip-slide-tabs 组件
 * @author chenwenkai(1084072318@qq.com)
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var aTabL = document.getElementById('tabl');
        var aTit = aTabL.getElementsByTagName('a');
        var aCon = document.getElementsByClassName('tabr_li');
        for (var i = 0; i < aTit.length; i++) {
            aTit[i].index = i;
            if (i === 0) {
                zdClick(0, aTit[0], aCon[0]);
            };
            aTit[i].onclick = function () {
                for (var i = 0; i < aTit.length; i++) {
                    aTit[i].className = '';
                    aCon[i].style = 'display:none';
                };
                this.className = 'active';
                aCon[this.index].style = 'display:block';
                fn(this.index);
            };
        };
        function zdClick(i, atit, acon) {
            for (var i = 0; i < aTit.length; i++) {
                aTit[i].className = '';
                aCon[i].style = 'display:none';
            };
            atit.className = 'active';
            acon.style = 'display:block';
            fn(0);
        }
        function fn(index) {
            var aTitSign = aCon[index];
            var aTitSignAs = aTitSign.getElementsByTagName('a');
            var aConSignLis = aTitSign.getElementsByTagName('li');
            for (var i = 0; i < aTitSignAs.length; i++) {
                if (i === 0) {
                    aTitSignAs[0].className = 'active';
                }
                else {
                    aTitSignAs[i].className = '';
                }
            };
            for (var i = 0; i < aConSignLis.length; i++) {
                if (i === 0) {
                    aConSignLis[0].style = 'display:block';
                }
                else {
                    aConSignLis[i].style = 'display:none';
                }
            };
            for (var i = 0; i < aTitSignAs.length; i++) {
                aTitSignAs[i].index = i;
                aTitSignAs[i].onclick = function () {
                    var as = this.parentNode.getElementsByTagName('a');
                    for (var i = 0; i < as.length; i++) {
                        as[i].className = '';
                    }
                    for (var i = 0; i < aTitSignAs.length; i++) {
                        aConSignLis[i].style = 'display:none';
                    }
                    this.className = 'active';
                    aConSignLis[this.index].style = 'display:block';
                };
            }
        }
    };
    return customElement;
});
