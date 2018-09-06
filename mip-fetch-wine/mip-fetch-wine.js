/**
 * @file mip-fetch-wine 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var chateauId = element.querySelector('#chateauId').value;
        var url = 'https://mip-test.wine-world.com/winery/ajax/wine?id=' + chateauId;
        fetch(url, {
            method: 'POST',
            header: {
                'Content-type': 'application/json'
            }
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.rows.length > 0) {
                var list1 = element.querySelector('#list_1');
                list1.innerHTML = '';
                var jkshow = element.querySelector('#jkshow');
                jkshow.style = 'display:none';
                var html = '';
                for (var i = 0; i < json.rows.length; i++) {
                    html += ' <div class="vinbox"><a href=' + json.rows[i].url
                    + '><dl class="vin-list"><dt> <mip-img  src=' + json.rows[i].cover
                    + ' width="80"  height="80"></mip-img></dt><dd><span class="vin-name-cn">'
                    + json.rows[i].cname + '</span><span class="vin-name-en">'
                    + json.rows[i].fname + '</span><p>产区：' + json.rows[i].areaName + ' <br />酿酒葡萄：'
                    + json.rows[i].grapeName + '</p></dd></dl></a>' + json.rows[i].productShopUrl + '</div>';
                }
                list1.innerHTML += html;
            }
            else {
                var jkshow = element.querySelector('#jkshow');
                jkshow.style = 'display:block';
            }
        });
    };
    return customElement;
});
