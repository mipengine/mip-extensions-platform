/**
 * @file mip-objectpropertycheck-min 元素属性检测，可根据检测到的属性与条件匹配，做出一些操作，比如说检测某个元素内的子元素长度，如果大于某个值，让另外一个元素做出什么改变，让另外一个元素做出什么改变  以添加class的形式体现
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO 这是一款min版本，目前只实现了判断元素的高度，元素子元素的长度，实际上，这里应该需要一个属性检测接口，检测传递的值格式是否正确
        var ele = this.element;
        // 需要检测的元素以及目录元素。
        var dataCheck = ele.getAttribute('data-checkobj');
        var dataTarget = ele.getAttribute('data-target');
        var oCheckObj = document.querySelector(dataCheck);
        var oTargetObj = document.querySelector(dataTarget);
        // 需要检测的属性
        var property = ele.getAttribute('data-property');
        // 状态值。
        var flan = ele.getAttribute('data-flan');
        // 条件
        var eqCondition = ele.getAttribute('data-eq-condition');
        var gtCondition = ele.getAttribute('data-gt-condition');
        var ltCondition = ele.getAttribute('data-lt-condition');
        // 执行语句
        if (oCheckObj && oTargetObj) {
            switch (flan) {
                case 'true':
                    // 表示的是一个对象的直接属性，而不是CSS属性 比如说：obj.offsetWidth;obj.width;……
                    var dataProperty = oCheckObj[property];
                    condition(dataProperty.toString());
                    break;
                case 'false':
                    // 表示的是一个对象子元素的长度。length;obj.children.length;
                    var subObj = oCheckObj.children;
                    var len = subObj.length;
                    condition(len.toString());
                    break;
                case 'custom':
                    var dataProperty1 = oCheckObj.getAttribute(property);
                    var arr = dataProperty1.slice(':');
                    var num = arr[1] - 0;
                    var h = window.screen.height * num;
                    customCon(h);
                    break;
                default:
                // 获取CSS样式。比如说style.这里还没有做。
                    console.log('这里还没有做');
            }
        }
        // comdition
        function condition(con) {
            if (eqCondition) {
                if (con === eqCondition) {
                    oTargetObj.classList.add('mip-objectpropertycheck-target-eqcondition');
                }
            }
            else if (gtCondition) {
                if (con > gtCondition) {
                    oTargetObj.classList.add('mip-objectpropertycheck-target-gtcondition');
                }
            }
            else if (ltCondition) {
                if (con < gtCondition) {
                    oTargetObj.classList.add('mip-objectpropertycheck-target-ltcondition');
                }
            }
        }
        // customCom
        function customCon(con) {
            var objOffsetH = oCheckObj.offsetHeight;
            if (objOffsetH < con) {
                oTargetObj.classList.add('mip-objectpropertycheck-target-ltcondition');
            }
            else if (objOffsetH > con) {
                oTargetObj.classList.add('mip-objectpropertycheck-target-gtcondition');
            }
            else {
                oTargetObj.classList.add('mip-objectpropertycheck-target-eqcondition');
            }
        }
    };

    return customElement;
});
