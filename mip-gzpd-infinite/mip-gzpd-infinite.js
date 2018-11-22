/**
 * @file mip-gzpd-infinite.js
 * @description mip-gzpd-alert函数
 * @author jfdsies
 */

define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    /**
     * 需要使用的变量
     */
    var page;
    var keyword;
    var urlFilter;
    // 获取数据的链接
    var url;
    // 是否处于获取数据阶段
    var loading;
    // var ddhost;
    // var ddq;

    // var insertAfter = function (newNode, referenceNode) {
    //     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    // };
    var setData = function (ele, template, data) {
        var output = '';
        for (let i = 0; i < data.length; i++) {
            var row = data[i];
            var rowHtml;
            if (row.img.length === 3) {
                rowHtml = template[1];
            }
            else if (row.img.length > 0) {
                rowHtml = template[0];
            }
            else {
                continue;
            }
            for (let ii in row) {
                if (!row.hasOwnProperty(ii)) {
                    continue;
                }
                if (ii === 'img') {
                    for (let iii in row[ii]) {
                        if (!row[ii].hasOwnProperty(iii)) {
                            continue;
                        }
                        rowHtml = rowHtml.replace(new RegExp('{{' + ii + '_' + iii + '}}', 'g'), row[ii][iii]);
                    }
                }
                else {
                    rowHtml = rowHtml.replace(new RegExp('{{' + ii + '}}', 'g'), row[ii]);
                }
            }
            rowHtml = rowHtml.replace(new RegExp('{{page}}', 'g'), page);
            rowHtml = rowHtml.replace(new RegExp('{{index}}', 'g'), i);

            // switch (i) {
            //     case 1: rowHtml += '<li class="pic"><mip-ad type="baidu-wm-ext" domain="'+ddhost+'" token="'+ddq[0]+'"><div id="'+ddq[0]+'"></div></mip-ad></li>';break;
            //     case 4: rowHtml += '<li class="pic"><mip-ad type="baidu-wm-ext" domain="'+ddhost+'" token="'+ddq[1]+'"><div id="'+ddq[1]+'"></div></mip-ad></li>';break;
            // }

            output += rowHtml;
        }
        $(ele).append(output);

        // var script1 = document.createElement('script');
        // script1.type = 'text/javascript';
        // script1.src = 'https://' + ddhost + '/' + ddq[Math.floor(Math.random() * ddq.length)] + '.js';
        // var b = ele.querySelectorAll('#lipic-' + page + '-2')[0];
        // insertAfter(script1, b);

        // var script2 = document.createElement('script');
        // script2.type = 'text/javascript';
        // script2.src = 'https://' + ddhost + '/' + ddq[Math.floor(Math.random() * ddq.length)] + '.js';
        // var bb = ele.querySelectorAll('#lipic-' + page + '-5')[0];
        // insertAfter(script2, bb);
    };
    var getData = function (ele, template, url) {
        if (loading) {
            return;
        }
        loading = true;

        $.ajax({
            type: 'GET',
            url: url,
            data: {page: page, keyword: keyword, url: urlFilter},
            dataType: 'jsonp',
            success: function (res) {
                if (res.code && res.code === 200) {
                    setData(ele, template, res.list);
                    page++;
                }
            },
            complete: function () {
                loading = false;
            }
        });
    };

    customElem.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var template = ele.innerHTML.match(/<template>([\s\S]*?)<\/template>/g);
        for (var i = 0; i < template.length; i++) {
            template[i] = template[i].replace(/<[\/]*template>\s+/g, '');
        }
        ele.innerHTML = '';

        // 起始页码
        page = ele.getAttribute('startPage') || 1;
        // 相关文章关键词
        keyword = ele.getAttribute('keyword') || '';

        urlFilter = ele.getAttribute('filter') || '';

        $.getJSON('//my.pincai.com/wx_app/miniapp/config/mip.infinite.json', function (config) {
            if (config.code !== 200) {
                return;
            }
            url = config.url;
            // ddhost = config.ddhost;
            // ddq = config.ddq;

            if ($(document).height() <= $(window).height()) {
                getData(ele, template, url);
            }
            $(window).scroll(function () {
                if ($(window).scrollTop() >= ($(document).height() - $(window).height() - $(window).height() * 0.2)) {
                    getData(ele, template, url);
                }
            });
        });
    };

    return customElem;
});
