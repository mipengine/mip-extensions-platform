/**
 * @file mip-change-page 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // 获取元素
        let myThis = this.element;
        // 获取元素
        let domBox = myThis.querySelector('#box');
        let domPage = myThis.querySelector('#page');
        let domList = myThis.querySelector('.list');
        let domBoxboxs = myThis.querySelectorAll('.boxboxs');

        let preNum = 0;

        let jsonLen = domBoxboxs.length;
        // 设置规则
        let each = parseInt(myThis.getAttribute('data-number'), 10);
        let page = Math.ceil(jsonLen / each);

        // 设置内容
        for (let i = 0; i < each; i++) {
            let domP = '<div class="mip-change-boxs">';
            domP += domBoxboxs[i].innerHTML;
            domP += '</div>';
            domBox.innerHTML += domP;
        }

        // 设置列表页数
        for (let i = 0; i < page; i++) {
            let domA = document.createElement('a');
            domA.href = 'javascript:;';
            domA.innerHTML = i + 1;
            domList.insertBefore(domA, null);
        }
        // 获取元素
        let domListChild = domList.children;
        // 获取页数
        let domListLen = domListChild.length;

        // 记录上一次单击的元素
        let preDom = domList.children[0];
        preDom.className = 'current';

        // 切换页
        domList.addEventListener('click', function (e) {
            // 获取目标元素
            let target = e.target;
            // 获取目标元素的标签名，并统一转换成小写
            let targetName = target.nodeName.toLocaleLowerCase();
            if (targetName === 'a') {
                // 添加class
                preDom.className = '';
                target.className = 'current';
                // 改变当前单击的元素。
                preDom = target;
                // 改变当前元素索引
                preNum = target.innerHTML - 1;
                // 先清空上个页面的内容
                domBox.innerHTML = '';
                // 因为顺序在1，2，3的时候没有规则，所以进行了判断。
                if (target.innerHTML !== '1') {
                    if (target.innerHTML === '2') {
                        // 遍历每页的条数，并将内容添加到domBox中。
                        for (let i = 0; i < each; i++) {
                            let arrJsonCurrent = domBoxboxs[i - 1 + (target.innerHTML * (each - 1))];
                            if (arrJsonCurrent == null) {
                                break;
                            }

                            let domP = '<div class="mip-change-boxs">';
                            domP += arrJsonCurrent.innerHTML;
                            domP += '</div>';
                            domBox.innerHTML += domP;
                        }
                    }
                    else if (target.innerHTML === '3') {
                        for (let i = 0; i < each; i++) {
                            let arrJsonCurrent = domBoxboxs[i + (target.innerHTML * (each - 1))];
                            if (arrJsonCurrent == null) {
                                break;
                            }

                            let domP = '<div class="mip-change-boxs">';
                            domP += arrJsonCurrent.innerHTML;
                            domP += '</div>';
                            domBox.innerHTML += domP;
                        }
                    }
                    else {
                        for (let i = 0; i < each; i++) {
                            var numa = target.innerHTML - each;
                            var numb = target.innerHTML * (each - 1);
                            let arrJsonCurrent = domBoxboxs[i + numa + numb];
                            if (arrJsonCurrent == null) {
                                break;
                            }

                            let domP = '<div class="mip-change-boxs">';
                            domP += arrJsonCurrent.innerHTML;
                            domP += '</div>';
                            domBox.innerHTML += domP;
                        }
                    }
                }
                else {
                    for (let i = 0; i < each; i++) {
                        let arrJsonCurrent = domBoxboxs[i];
                        if (arrJsonCurrent == null) {
                            break;
                        }

                        let domP = '<div class="mip-change-boxs">';
                        domP += arrJsonCurrent.innerHTML;
                        domP += '</div>';
                        domBox.innerHTML += domP;
                    }
                }
            }

        });
        // 获取上一页和下一页元素
        let pagePreDom = document.getElementById('pre');
        let pageNextDom = document.getElementById('next');
        // 上一页
        pagePreDom.addEventListener('click', function () {
            // 判断当前元素索引
            if (preNum > 0) {
                preNum--;
            }

            changeHtml(domBox, preNum, each);
        });
        // 下一页
        pageNextDom.addEventListener('click', function () {
            // 判断当前元素索引
            if (preNum < domListLen - 1) {
                preNum++;
            }

            changeHtml(domBox, preNum, each);
        });
        // 改变box内容
        function changeHtml(domBox, currentNum, each) {
            domBox.innerHTML = '';
            preDom.className = '';
            domListChild[currentNum].className = 'current';
            preDom = domListChild[currentNum];
            switch (currentNum) {
                case 0:
                    // 遍历元素
                    for (let i = 0; i < each; i++) {
                        let arrJsonCurrent = domBoxboxs[currentNum + i];
                        if (arrJsonCurrent == null) {
                            break;
                        }

                        let domP = '<div class="mip-change-boxs">';
                        domP += arrJsonCurrent.innerHTML;
                        domP += '</div>';
                        domBox.innerHTML += domP;
                    }
                    break;
                case 1:
                    // 遍历元素
                    for (let i = 0; i < each; i++) {
                        let arrJsonCurrent = domBoxboxs[each + i];
                        if (arrJsonCurrent == null) {
                            break;
                        }

                        let domP = '<div class="mip-change-boxs">';
                        domP += arrJsonCurrent.innerHTML;
                        domP += '</div>';
                        domBox.innerHTML += domP;
                    }
                    break;
                default:
                    // 遍历元素
                    for (let i = 0; i < each; i++) {
                        let arrJsonCurrent = domBoxboxs[currentNum * each + i];
                        if (arrJsonCurrent == null) {
                            break;
                        }

                        let domP = '<div class="mip-change-boxs">';
                        domP += arrJsonCurrent.innerHTML;
                        domP += '</div>';
                        domBox.innerHTML += domP;
                    }
                    break;
            }
        }
    };

    return customElement;
});
