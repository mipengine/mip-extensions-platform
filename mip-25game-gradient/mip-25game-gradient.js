/**
 * @file mip-25game-gradient 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var imgId = element.getAttribute('elementid');
        var defaultcolor = element.getAttribute('defaultcolor');
        var icon = document.getElementById(imgId);
        var image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = icon.getAttribute('src');
        image.onload = function () {
            var imgWidth = this.width;
            var imgHeight = this.height;
            var xz = 0;
            if (imgWidth > 96) {
                xz = (imgWidth - 96) / 2;
                imgWidth = 96;
            }
            canvas.width = imgWidth;
            canvas.height = 40;
            context.drawImage(this, xz, xz + 30, imgWidth, 40, 0, 0, imgWidth, 40);
            var imageData = context.getImageData(0, 0, imgWidth, 40);
            var arrBox = [];
            var length = imageData.data.length;
            for (var i = 0; i < length; i++) {
                if (i % 4 === 0) {
                    var x = i / 4 % imgWidth + 1;
                    var y = Math.floor(i / 4 / imgWidth) + 1;
                    if (imageData.data[i + 3] === 255) {
                        var grayLevel = imageData.data[i] * 0.299 + imageData.data[i + 1] * 0.587;
                        grayLevel = grayLevel + imageData.data[i + 2] * 0.114;
                        if (grayLevel < 180) {
                            var Hex = gethex(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
                            if (!inArray(Hex, arrBox + 1)) {
                                arrBox.push(Hex);
                            }
                        }
                    }
                }
            }
            var colorOne = '#' + arrBox[randomNum(0, arrBox.length)];
            if (colorOne === '#undefined') {
                colorOne = defaultcolor;
            }
            var colorTwo = '#' + arrBox[randomNum(0, arrBox.length)];
            if (colorTwo === '#undefined') {
                colorTwo = defaultcolor;
            }
            var html = 'background: -prefix-linear-gradient(left top, ' + colorOne + ', ' + colorTwo + ');';
            html = html + 'background: linear-gradient(to bottom right, ' + colorOne + ', ' + colorTwo + ');';
            element.setAttribute('style', html);
            function gethex(r, g, b) {
                r = r.toString(16);
                g = g.toString(16);
                b = b.toString(16);
                r.length === 1 ? r = '0' + r : '';
                g.length === 1 ? g = '0' + g : '';
                b.length === 1 ? b = '0' + b : '';
                var hex = r + g + b;
                if (r.slice(0, 1) === r.slice(1, 1) && g.slice(0, 1) === g.slice(1, 1)
                    && b.slice(0, 1) === b.slice(1, 1)) {
                    hex = r.slice(0, 1) + g.slice(0, 1) + b.slice(0, 1);
                }
                return hex;
            }
            function inArray(stringToSearch, arrayToSearch) {
                for (var s = 0; s < arrayToSearch.length; s++) {
                    var thisEntry = arrayToSearch[s].toString();
                    if (thisEntry === stringToSearch) {
                        return true;
                    }
                }
                return false;
            }
            function randomNum(Min, Max) {
                var Range = Max - Min;
                var Rand = Math.random();
                var num = Min + Math.floor(Rand * Range);
                return num;
            }
        };
    };
    return customElement;
});
