/**
 * @file mip-searchAssociation 组件
 * @author
 */
define(function (require) {
    let customElem = require('customElement').create();
    let fetchJsonp = require('fetch-jsonp');
    customElem.prototype.firstInviewCallback = function () {
        let element = this.element;
        let input =  element.querySelectorAll('.mip-list-more')[0];
        let resultList = element.querySelectorAll('.result-list')[0];
        let src = element.getAttribute('data-src');
        let inputVal = input.value;
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                window.location.href = '/search-kecheng?kw=' + inputVal;
            }
            fetchJsonp(src, {
                kw: inputVal
            }).then(function (res) {
                let searchData = JSON.parse(res);
                let html = '';
                for (let value of searchData) {
                    html += `
                        <li>
                            <a href="${value.url}">${value.kwd}</a>
                        </li>
                    `;
                }
                resultList.innerHTML = html;
            }).catch(function (data) {
            });
        };
    };
    return customElem;
});