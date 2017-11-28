/**
 * @file mip-jt-calc-homeyk 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    function areasChange(th) {
        if (17 === parseInt(th, 10)) {
            document.getElementById('area').value = document
                .getElementById('job').value;
        }
        else if (14 === parseInt(th, 10)) {
            document.getElementById('area').value = document
                .getElementById('people').value;
        }
        else if (19 === parseInt(th, 10)) {
            document.getElementById('area').value = document
                .getElementById('commerce').value;
        }
        else {
            document.getElementById('area').value = document
                .getElementById('others').value;
        }

    }

    function keyPress() {
        var keyCode = event.keyCode;
        if ((keyCode >= 48 && keyCode <= 57)) {
            event.returnValue = true;
        }
        else {
            event.returnValue = false;
        }
    }

    function cal() {
        var k = document.getElementById('trade').value;
        var s = document.getElementById('lists').value;
        var n = document.getElementById('grapnum').value;
        var a = document.getElementById('openprice').value;
        var b = document.getElementById('ordinaryprice').value;
        var p = document.getElementById('area').value;
        var z = n * k * b * s - n * k * a * s - n * k * a * p / 10000 - n * k
            * b * p / 10000;
        document.getElementById('show').value = z;
    }

    customElement.prototype.firstInviewCallback = function () {
        // TODO
        $('#areas').change(function () {
            areasChange(this.value);
        });
        $('#grapnum').keypress(function () {
            keyPress();
        });
        $('#openprice').keypress(function (event) {
            if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 46 || /\.\d\d$/.test(this.value)) {
                event.returnValue = false;
            }

        });
        $('#ordinaryprice').keypress(function (event) {
            if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 46 || /\.\d\d$/.test(this.value)) {
                event.returnValue = false;
            }
        });
        $('#calBtn').click(function () {
            cal();
        });
    };

    return customElement;
});
