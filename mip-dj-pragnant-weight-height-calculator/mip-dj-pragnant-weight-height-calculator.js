/**
 * @file mip-pragnant-weight-height-calculator 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    var formatCount = function (count) {
        return (Math.round(count * 100) / 100).toFixed(2) - 0;
    };

    var html = '\
        <div class="mip-dj-pragnant-weight-height-calculator">\
            <div class="form">\
                <div class="form__item">\
                    <div class="item__label">\
                        您的身高(cm):\
                    </div>\
                    <div class="item__value">\
                        <input class="input-control input--height" placeholder="请填写" value="160"/>\
                    </div>\
                </div>\
\
                <div class="form__item">\
                    <div class="item__label">\
                        孕前体重(kg):\
                    </div>\
                    <div class="item__value">\
                        <input class="input-control input--weight" placeholder="请填写" value="50"/>\
                    </div>\
                </div>\
            </div>\
\
            <div class="submit-wrapper">\
                <button type="button" class="calculate-btn">点击计算</button>\
            </div>\
\
            <div class="calculate-result-wrapper">\
                <div class="calculate-result">\
                    <div class="result-bg"></div>\
                        <div class="result-data">\
                            <p class="summary-wrapper">\
                                计算结果\
                            </p>\
\
                            <p>\
                                孕前标准体重: <span class="result__before-pragnant-weight count">0kg</span>\
                            </p>\
                            \
                            <p>\
                                孕前肥胖度: <span class="result__before-pragnant-fat count">0%</span>\
                                \
                                肥胖度BMI: <span class="result__fat-bmi count">0%</span>\
                            </p>\
\
                            <p>\
                                安产理想体重: <span class="result__childbirth-perfect-weight count">0kg</span>\
                            </p>\
                        </div>\
                </div>\
            </div>\
        </div>\
    ';

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        element.innerHTML = html;

        var $scope = $(element);
        var $calculateBtn = $scope.find('.calculate-btn');
        var $beforePragWeightCount = $scope.find('.result__before-pragnant-weight');
        var $beforePragFatCount = $scope.find('.result__before-pragnant-fat');
        var $fatBMICount = $scope.find('.result__fat-bmi');
        var $birthPerfectWeightCount = $scope.find('.result__childbirth-perfect-weight');
        var $calculateResultWrapper = $scope.find('.calculate-result-wrapper');

        $calculateBtn.on('click', function () {
            var height = $scope.find('.input--height').val() - 0;
            var weight = $scope.find('.input--weight').val() - 0;

            // 孕前标准体重
            var beforePragWeightCount = formatCount((height * height) * 21 / 10000);
            // 孕前肥胖度
            var beforePragFatCount = formatCount((weight - beforePragWeightCount) / beforePragWeightCount * 100);
            // 安产理想体重
            var birthPerfectWeightCount = formatCount((weight / (height * height)) * 10000);
            // 肥胖度BMI
            var fatBMICount = formatCount((birthPerfectWeightCount * 0.88 + 6.65) * (height * height) / 10000);

            $beforePragWeightCount.text(beforePragWeightCount + 'kg');
            $beforePragFatCount.text(beforePragFatCount + '%');
            $birthPerfectWeightCount.text(birthPerfectWeightCount + 'kg');
            $fatBMICount.text(fatBMICount + '%');

            $calculateResultWrapper.addClass('calculate-result-wrapper--show');
        });
    };

    return customElement;
});
