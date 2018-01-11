/**
 * @file mip-yuanxiaoku-diqufenshuxian 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var $element = $(element);
        var newDate = new Date();
        var currentYear = newDate.getFullYear() - 1;
        var yearArr = [];
        for (var i = 0; i < 15; i++) {
            yearArr.push(currentYear - i);
        }

        var diQuYear = getRequest().diQuYear;
        var diQuCityId = getRequest().diQuCityId;
        var diQuLevelId = getRequest().diQuLevelId;
        var diQuLiberalArtsId = getRequest().diQuLiberalArtsId;

        loadContent(diQuYear);
        var gradeLineList;
        function loadContent(year) {
            $element.find('.diqufenshuxian-container .canvasWrapper').show();
            $element.find('.load-info .none').hide();
            $element.find('.load-info .loading').show();

            fetch('https://data.api.ppkao.com/Interface/YXK/GradeLineApi.ashx?action=GetGradeLineYear&provinceid='
            + diQuCityId + '&bathid=' + diQuLevelId)
            .then(function (res) {
                return res.json();
            }).then(function (json) {
                // console.log(decode(json));
                var list = decode(json);
                gradeLineList = list.GradeLineList;

                if (list.S === '0') {
                    $element.find('.load-info .loading').hide();
                    $element.find('.diqufenshuxian-container .canvasWrapper').hide();
                    $element.find('.diqufenshuxian-container .zanwu-shuju').show();
                    return;
                } else {
                    $element.find('.top-title h1').html(gradeLineList[0].province);
                    $element.find('[on=\'tap:diqufenshuxian.load(' + diQuYear + ')\']').triggerHandler('click');

                    if (diQuLiberalArtsId === '1') {
                        $element.find('.diqufenshuxian-container .canvasWrapper .like').hide();
                    } else {
                        if (diQuLiberalArtsId === '2') {
                            $element.find('.diqufenshuxian-container .canvasWrapper .wenke').hide();
                        }
                    }

                    loadFenShuXian(year);
                    loadFenShuXianTotal();
                }

                $element.find('.load-info .loading').hide();
            });
        }

        function loadFenShuXian(year) {
            $element.find('.diqufenshuxian-container .zanwu-shuju').hide();
            if (gradeLineList == null) {
                $element.find('.diqufenshuxian-container .zanwu-shuju').show();
                return;
            }
            $element.find('.diqufenshuxian-container ul.liberal-arts').html('');
            var fenShuXianShow = true;
            gradeLineList.map(function (item, index) {
                if (item.year === year) {
                    fenShuXianShow = false;
                    if (item.type === '文科' && (diQuLiberalArtsId === '0' || diQuLiberalArtsId === '1')) {
                        $element.find('.diqufenshuxian-container ul.liberal-arts').append(
                            '<li class=\'arts\'>'
                            +    '<p>考生类别：<span>' + item.type + '</span></p>'
                            +    '<p>最低分数控制线：<span>' + item.score + '分</span></p>'
                            +    '<p>批次：<span>' + item.bath + '</span></p></li>'
                            + '</li>'
                        );
                    }
                    if (item.type === '理科' && (diQuLiberalArtsId === '0' || diQuLiberalArtsId === '2')) {
                        $element.find('.diqufenshuxian-container ul.liberal-arts').append(
                            '<li class=\'liberal\'>'
                            +    '<p>考生类别：<span>' + item.type + '</span></p>'
                            +    '<p>最低分数控制线：<span>' + item.score + '分</span></p>'
                            +    '<p>批次：<span>' + item.bath + '</span></p></li>'
                            + '</li>'
                        );
                    }
                }
            });
            if (fenShuXianShow) {
                $element.find('.diqufenshuxian-container .zanwu-shuju').show();
            }
        }
        function loadFenShuXianTotal() {
            var showYearCount = 8;

            var scoreWen = new Array(showYearCount);

            var scoreLi = new Array(showYearCount);

            var showYearArr = yearArr.slice(0, showYearCount);

            // console.log(showYearArr);

            gradeLineList.map(function (item, index) {
                var order = yearArr.indexOf(parseInt(item.year, 10));
                // console.log(order, item.year);
                if (item.type === '文科' && (diQuLiberalArtsId === '0' || diQuLiberalArtsId === '1')) {
                    item.score !== '0'
                    ? scoreWen.splice(order, 1, parseInt(item.score, 10))
                    : scoreWen.splice(order, 1, '');
                }
                if (item.type === '理科' && (diQuLiberalArtsId === '0' || diQuLiberalArtsId === '2')) {
                    item.score !== '0'
                    ? scoreLi.splice(order, 1, parseInt(item.score, 10))
                    : scoreLi.splice(order, 1, '');
                }
            });

            // console.log('文科');
            // console.log(scoreWen);

            // console.log('理科');
            // console.log(scoreLi);

            var lineChartData = {
                labels: showYearArr,
                datasets: [
                    {
                        fillColor: 'rgba(86, 136, 193, 0.5)',
                        strokeColor: 'rgba(86, 136, 193, 0.5)',
                        pointColor: 'rgba(86, 136, 193, 0.8)',
                        pointStrokeColor: 'rgba(255, 255, 255, 0.8)',
                        data: scoreWen
                    },
                    {
                        fillColor: 'rgba(202, 122, 163, 0.5)',
                        strokeColor: 'rgba(202, 122, 163, 0.5)',
                        pointColor: 'rgba(202, 122, 163, 0.8)',
                        pointStrokeColor: 'rgba(255, 255, 255, 0.8)',
                        data: scoreLi
                    }
                ]
            };

            var options = {
                scaleOverlay: false,
                scaleOverride: true,
                scaleSteps: 10,
                scaleStepWidth: 50,
                scaleStartValue: 250,
                scaleLineColor: 'rgba(242,242,242,1)',
                scaleLineWidth: 1,
                scaleShowLabels: true,
                scaleLabel: '<%= value %>',
                scaleFontFamily: 'microsoft yahei',
                scaleFontSize: 12,
                scaleFontStyle: 'normal',
                scaleFontColor: '#a5a5a5',
                scaleShowGridLines: true,
                scaleGridLineColor: 'rgba(242,242,242,1)',
                scaleGridLineWidth: 1,
                bezierCurve: true,
                pointDot: true,
                pointDotRadius: 3, // 内圈圆的半径
                pointDotStrokeWidth: 1, // 外圈圆的半径
                datasetStroke: true,
                datasetStrokeWidth: 2,
                datasetFill: true,
                animation: true,
                animationSteps: 100,
                animationEasing: 'easeOutQuart',
                onAnimationComplete: null
            };

            var lineChart = $element.find('#lineChartCanvas').get(0).getContext('2d');
            lineChartFun(lineChartData, options, lineChart);
        }

        this.addEventAction('load', function (event, str) {
            // console.log(str);
            loadFenShuXian(str);
        });

        function getRequest() {
            var url = location.href;    // 获取url中"?"符后的字串
            var theRequest = {};
            var strs;
            if (url) {
                var str = url.substr(url.indexOf('?') + 1);
                strs = str.split('&');
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
                }
            }
            // console.log(url, theRequest);

            return theRequest;
        }
        function decode(obj) {
            var res = {};
            Object.keys(obj).forEach(function (i) {
                var val = obj[i];
                if (Array.isArray(val)) {
                    res[i] = [];
                    val.forEach(function (item) {
                        res[i].push(decode(item));
                    });
                } else {
                    if (val instanceof Object) {
                        res[i] = decode(val);
                    } else {
                        res[i] = base64('decode', val);
                    }
                }
            });
            return res;
        }
        function base64(fun, val) {
            // private property
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            // public method for encoding
            function encode(input) {
                var output = '';
                var chr1;
                var chr2;
                var chr3;
                var enc1;
                var enc2;
                var enc3;
                var enc4;
                var i = 0;
                input = utf8Encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output
                        + keyStr.charAt(enc1) + keyStr.charAt(enc2)
                        + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                }
                return output;
            }

            // public method for decoding
            function decode(input) {
                if (input === 'undefined' || input === null || undefined === '' || input === '0') {
                    return input;
                }
                var output = '';
                var chr1;
                var chr2;
                var chr3;
                var enc1;
                var enc2;
                var enc3;
                var enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
                while (i < input.length) {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 !== 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 !== 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = utf8Decode(output);
                return output;
            }

            // private method for UTF-8 encoding
            function utf8Encode(string) {
                string = string.replace(/\r\n/g, '\n');
                var utftext = '';
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }
                return utftext;
            }

            // private method for UTF-8 decoding
            function utf8Decode(utftext) {
                var string = '';
                var i = 0;
                var c = 0;
                var c1 = 0;
                var c2 = 0;
                var c3 = 0;
                while (i < utftext.length) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }

            switch (fun) {
                case 'encode':
                    return encode(val);
                    break;
                case 'decode':
                    return decode(val);
                    break;
                default:
                    break;
            }
        }
        function lineChartFun(data, config, ctx) {
            var width = (
                window.outerWidth
                || document.documentElement.offsetWidth
                || document.body.offsetWidth
            ) * 1.002;
            var height = width / 2;
            if (window.devicePixelRatio) {
                ctx.canvas.style.width = width + 'px';
                ctx.canvas.style.height = height + 'px';
                ctx.canvas.height = height * window.devicePixelRatio;
                ctx.canvas.width = width * window.devicePixelRatio;
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            }

            function easeOutQuart(t) {
                return -1 * ((t = t / 1 - 1) * t * t * t - 1);
            }
            var maxSize;
            var scaleHop;
            var calculatedScale;
            var labelHeight;
            var scaleHeight;
            var valueBounds;
            var labelTemplateString;
            var valueHop;
            var widestXLabel;
            var xAxisLength;
            var yAxisPosX;
            var xAxisPosY;
            var rotateLabels = 0;
            line();
            function line() {
                calculateDrawingSizes();
                valueBounds = getValueBounds();
                labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : '';
                if (!config.scaleOverride) {
                    calculatedScale = calculateScale(
                        scaleHeight,
                        valueBounds.maxSteps,
                        valueBounds.minSteps,
                        valueBounds.maxValue,
                        valueBounds.minValue,
                        labelTemplateString
                    );
                } else {
                    calculatedScale = {
                        steps: config.scaleSteps,
                        stepValue: config.scaleStepWidth,
                        graphMin: config.scaleStartValue,
                        labels: []
                    };
                    for (var i = 0; i < calculatedScale.steps; i++) {
                        if (labelTemplateString) {
                            calculatedScale.labels.push(
                                tmpl(
                                    labelTemplateString,
                                    {
                                        value: (config.scaleStartValue
                                            + config.scaleStepWidth
                                            + (config.scaleStepWidth * i))
                                            .toFixed(getDecimalPlaces(config.scaleStepWidth))
                                    }
                                )
                            );
                        }
                    }
                }
                scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
                calculateXAxisSize();
                animationLoop(config, drawScale, drawLines, ctx);
            }
            function drawLines(animPc) {
                for (var i = 0; i < data.datasets.length; i++) {
                    ctx.strokeStyle = data.datasets[i].strokeColor;
                    ctx.lineWidth = config.datasetStrokeWidth;
                    ctx.beginPath();
                    ctx.moveTo(
                        yAxisPosX,
                        xAxisPosY - animPc
                        * (calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop))
                    );
                    for (var j = 1; j < data.datasets[i].data.length; j++) {
                        if (config.bezierCurve) {
                            ctx.bezierCurveTo(
                                xPos(j - 1),
                                yPos(i, j - 1),
                                xPos(j - 0.5),
                                yPos(i, j),
                                xPos(j),
                                yPos(i, j)
                            );
                        } else {
                            ctx.lineTo(xPos(j), yPos(i, j));
                        }
                    }
                    ctx.stroke();
                    if (config.datasetFill) {
                        ctx.lineTo(yAxisPosX + (valueHop * (data.datasets[i].data.length - 1)), xAxisPosY);
                        ctx.lineTo(yAxisPosX, xAxisPosY);
                        ctx.closePath();
                        ctx.fillStyle = data.datasets[i].fillColor;
                        ctx.fill();
                    } else {
                        ctx.closePath();
                    }
                    if (config.pointDot) {
                        ctx.fillStyle = data.datasets[i].pointColor;
                        ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                        ctx.lineWidth = config.pointDotStrokeWidth;
                        for (var k = 0; k < data.datasets[i].data.length; k++) {
                            ctx.beginPath();
                            ctx.arc(
                                yAxisPosX + (valueHop * k),
                                xAxisPosY - animPc
                                * (calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop)),
                                config.pointDotRadius,
                                0, Math.PI * 2, true
                            );
                            ctx.fill();
                            ctx.stroke();
                        }
                    }
                }
                function yPos(dataSet, iteration) {
                    return (
                        xAxisPosY - animPc
                        * (calculateOffset(data.datasets[dataSet].data[iteration], calculatedScale, scaleHop))
                    );
                }
                function xPos(iteration) {
                    return yAxisPosX + (valueHop * iteration);
                }
            }
            function drawScale() {
                ctx.lineWidth = config.scaleLineWidth;
                ctx.strokeStyle = config.scaleLineColor;
                ctx.beginPath();
                ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
                ctx.lineTo(width - (widestXLabel / 2) - xAxisLength - 5, xAxisPosY);
                ctx.stroke();
                if (rotateLabels > 0) {
                    ctx.save();
                    ctx.textAlign = 'right';
                } else {
                    ctx.textAlign = 'center';
                }
                ctx.fillStyle = config.scaleFontColor;
                for (var i = 0; i < data.labels.length; i++) {
                    ctx.save();
                    if (rotateLabels > 0) {
                        ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
                        ctx.rotate(-(rotateLabels * (Math.PI / 180)));
                        ctx.fillText(data.labels[i], 0, 0);
                        ctx.restore();
                    } else {
                        ctx.fillText(
                            data.labels[i],
                            yAxisPosX + i * valueHop,
                            xAxisPosY + config.scaleFontSize + 3
                        );
                    }
                    ctx.beginPath();
                    ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
                    if (config.scaleShowGridLines && i > 0) {
                        ctx.lineWidth = config.scaleGridLineWidth;
                        ctx.strokeStyle = config.scaleGridLineColor;
                        ctx.lineTo(yAxisPosX + i * valueHop, 5);
                    } else {
                        ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
                    }
                    ctx.stroke();
                }
                // Y axis
                ctx.lineWidth = config.scaleLineWidth;
                ctx.strokeStyle = config.scaleLineColor;
                ctx.beginPath();
                ctx.moveTo(yAxisPosX, xAxisPosY + 5);
                ctx.lineTo(yAxisPosX, 5);
                ctx.stroke();
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                for (var j = 0; j < calculatedScale.steps; j++) {
                    ctx.beginPath();
                    ctx.moveTo(yAxisPosX - 3, xAxisPosY - ((j + 1) * scaleHop));
                    if (config.scaleShowGridLines) {
                        ctx.lineWidth = config.scaleGridLineWidth;
                        ctx.strokeStyle = config.scaleGridLineColor;
                        ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - ((j + 1) * scaleHop));
                    } else {
                        ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - ((j + 1) * scaleHop));
                    }
                    ctx.stroke();
                    if (config.scaleShowLabels) {
                        ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - ((j + 1) * scaleHop));
                    }
                }
            }
            function calculateXAxisSize() {
                var longestText = 1;
                // if we are showing the labels
                if (config.scaleShowLabels) {
                    ctx.font = config.scaleFontStyle + ' ' + config.scaleFontSize + 'px ' + config.scaleFontFamily;
                    for (var i = 0; i < calculatedScale.labels.length; i++) {
                        var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
                        longestText = (measuredText > longestText) ? measuredText : longestText;
                    }
                    // Add a little extra padding from the y axis
                    longestText += 10;
                }
                xAxisLength = width - longestText - widestXLabel;
                valueHop = Math.floor(xAxisLength / (data.labels.length - 1));
                yAxisPosX = width - widestXLabel / 2 - xAxisLength;
                xAxisPosY = scaleHeight + config.scaleFontSize / 2;
            }
            function calculateDrawingSizes() {
                maxSize = height;
                // Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
                ctx.font = config.scaleFontStyle + ' '
                    + config.scaleFontSize + 'px ' + config.scaleFontFamily;
                widestXLabel = 1;
                for (var i = 0; i < data.labels.length; i++) {
                    var textLength = ctx.measureText(data.labels[i]).width;
                    // If the text length is longer - make that equal to longest text!
                    widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel;
                }
                if (width / data.labels.length < widestXLabel) {
                    rotateLabels = 45;
                    if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
                        rotateLabels = 90;
                        maxSize -= widestXLabel;
                    } else {
                        maxSize -= Math.sin(rotateLabels) * widestXLabel;
                    }
                } else {
                    maxSize -= config.scaleFontSize;
                }
                maxSize -= 5;
                labelHeight = config.scaleFontSize;
                maxSize -= labelHeight;
                scaleHeight = maxSize;
            }
            function getValueBounds() {
                var upperValue = Number.MIN_VALUE;
                var lowerValue = Number.MAX_VALUE;
                for (var i = 0; i < data.datasets.length; i++) {
                    for (var j = 0; j < data.datasets[i].data.length; j++) {
                        if (data.datasets[i].data[j] > upperValue) {
                            upperValue = data.datasets[i].data[j];
                        }
                        if (data.datasets[i].data[j] < lowerValue) {
                            lowerValue = data.datasets[i].data[j];
                        }
                    }
                };
                var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
                var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));
                return {
                    maxValue: upperValue,
                    minValue: lowerValue,
                    maxSteps: maxSteps,
                    minSteps: minSteps
                };
            }
            function clear(c) {
                c.clearRect(0, 0, width, height);
            }
            function mergeChartConfig(defaults, userDefined) {
                var returnObj = {};
                for (var attrname in defaults) {
                    returnObj[attrname] = defaults[attrname];
                }
                for (var attrname in userDefined) {
                    returnObj[attrname] = userDefined[attrname];
                }
                return returnObj;
            }
            function calculateOffset(val, calculatedScale, scaleHop) {
                var outerValue = calculatedScale.steps * calculatedScale.stepValue;
                var adjustedValue = val - calculatedScale.graphMin;
                var scalingFactor = capValue(adjustedValue / outerValue, 1, 0);
                return (scaleHop * calculatedScale.steps) * scalingFactor;
            }
            function animationLoop(config, drawScale, drawData, ctx) {
                var animFrameAmount = (config.animation) ? 1 / capValue(config.animationSteps, Number.MAX_VALUE, 1) : 1;
                var easingFunction = easeOutQuart;
                var percentAnimComplete = (config.animation) ? 0 : 1;
                var requestAnimFrame = (function () {
                    return window.requestAnimationFrame
                        || window.webkitRequestAnimationFrame
                        || window.mozRequestAnimationFrame
                        || window.oRequestAnimationFrame
                        || window.msRequestAnimationFrame
                        || function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
                })();
                if (typeof drawScale !== 'function') {
                    drawScale = function () {};
                }
                requestAnimFrame(animLoop);
                function animateFrame() {
                    var easeAdjustedAnimationPercent = (config.animation)
                        ? capValue(easingFunction(percentAnimComplete), null, 0)
                        : 1;
                    clear(ctx);
                    if (config.scaleOverlay) {
                        drawData(easeAdjustedAnimationPercent);
                        drawScale();
                    } else {
                        drawScale();
                        drawData(easeAdjustedAnimationPercent);
                    }
                }
                function animLoop() {
                    // We need to check if the animation is incomplete (less than 1), or complete (1).
                    percentAnimComplete += animFrameAmount;
                    animateFrame();
                    // Stop the loop continuing forever
                    if (percentAnimComplete <= 1) {
                        requestAnimFrame(animLoop);
                    } else {
                        if (typeof config.onAnimationComplete === 'function') {
                            config.onAnimationComplete();
                        }
                    }
                }
            }
            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
            function capValue(valueToCap, maxValue, minValue) {
                if (isNumber(maxValue)) {
                    if (valueToCap > maxValue) {
                        return maxValue;
                    }
                }
                if (isNumber(minValue)) {
                    if (valueToCap < minValue) {
                        return minValue;
                    }
                }
                return valueToCap;
            }
            function getDecimalPlaces(num) {
                var numberOfDecimalPlaces;
                if (num % 1 !== 0) {
                    return num.toString().split('.')[1].length;
                } else {
                    return 0;
                }
            }
            function calculateScale(drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
                var graphMin;
                var graphMax;
                var graphRange;
                var stepValue;
                var numberOfSteps;
                var valueRange;
                var rangeOrderOfMagnitude;
                var decimalNum;
                valueRange = maxValue - minValue;
                rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);
                graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude)))
                    * Math.pow(10, rangeOrderOfMagnitude);
                graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude)))
                    * Math.pow(10, rangeOrderOfMagnitude);
                graphRange = graphMax - graphMin;
                stepValue = Math.pow(10, rangeOrderOfMagnitude);
                numberOfSteps = Math.round(graphRange / stepValue);
                // Compare number of steps to the max and min for that size graph, and add in half steps if need be.
                while (numberOfSteps < minSteps || numberOfSteps > maxSteps) {
                    if (numberOfSteps < minSteps) {
                        stepValue /= 2;
                        numberOfSteps = Math.round(graphRange / stepValue);
                    } else {
                        stepValue *= 2;
                        numberOfSteps = Math.round(graphRange / stepValue);
                    }
                };
                // Create an array of all the labels by interpolating the string.
                var labels = [];
                if (labelTemplateString) {
                    // Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
                    for (var i = 1; i < numberOfSteps + 1; i++) {
                        labels.push(
                            tmpl(
                                labelTemplateString,
                                {
                                    value: (graphMin + (stepValue * i))
                                    .toFixed(getDecimalPlaces(stepValue))
                                }
                            )
                        );
                    }
                }
                return {
                    steps: numberOfSteps,
                    stepValue: stepValue,
                    graphMin: graphMin,
                    labels: labels
                };
                function calculateOrderOfMagnitude(val) {
                    return Math.floor(Math.log(val) / Math.LN10);
                }
            }
            function tmpl(str, data) {
                var fn = !/\W/.test(str) ? $.cache[str] = $.cache[str]
                || tmpl(document.getElementById(str).innerHTML)
                : new Function('obj',
                    'var p=[],print=function(){p.push.apply(p,arguments);};'
                    + 'with(obj){p.push("'
                    + str
                    .replace(/[\r\t\n]/g, ' ')
                    .split('<%').join('\t')
                    .replace(/((^|%>)[^\t]*)'/g, '$1\r')
                    .replace(/\t=(.*?)%>/g, '",$1,"')
                    .split('\t').join('");')
                    .split('%>').join('p.push("')
                    .split('\r').join('\\"')
                + '");}return p.join("");');
                return data ? fn(data) : fn;
            }
        }
    };

    return customElement;
});
