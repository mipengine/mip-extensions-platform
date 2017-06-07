/**
 * @file 星游广告组件
 * @author Zhelin(chengzhelin@stargame.com)
 */

define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();

    // 配置参数
    var ajaxUrl = 'https://gg.stargame.com/ad.ashx?pid=';
    var date = new Date();

    date = date.getTime();
    // 获取数据
    function getAdInfo(pid, cb) {
        $.ajax({
            url: ajaxUrl + pid,
            type: 'get',
            dataType: 'jsonp',
            async: false,
            success: function (db) {
                cb(dataMerge(db));
            }
        });
    }

    // 整理数据
    function dataMerge(db) {
        var storage = {};
        var showurl = [];

        if (db.length > 1) {
            var itemPrev = db[0];
            var itemNext = db[db.length - 1];
            for (var i in itemPrev) {
                if (i === 'showurl' && itemPrev[i] && itemNext[i]) {
                    showurl.push(itemPrev[i].replace(/^http/, 'https'), itemNext[i].replace(/^http/, 'https'));
                    storage[i] = showurl;
                    continue;
                }

                storage[i] = itemNext[i] || itemPrev[i];
                if (typeof storage[i] === 'string') {
                    storage[i] = storage[i].replace(/^http/, 'https');
                }
            }

        }
        else {
            for (var j in  db[0]) {
                if (db[0].hasOwnProperty(j)) {
                    storage[j] = db[0][j];
                    if (typeof storage[j] === 'string') {
                        storage[j] = storage[j].replace(/^http/, 'https');
                    }
                }
            }
        }
        return storage;
    }

    // 返回时间数据
    function showAd(url) {
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            data: {
                t: date
            }
        });
    }

    // 页面首次加载
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = $(this.element);
        var pid = element.attr('sg-ad-pid');

        getAdInfo(pid, function (db) {
            var $adImg = $('<mip-img></mip-img>');
            var $tipImg = $('<mip-img></mip-img>');
            var $btnClose = $('<button>关闭</button>');
            var $link = $('<a></a>');

            $adImg.attr('class', 'gg_adbox').attr('src', db.box);

            $tipImg
                .attr('class', 'gg_adbox_tips')
                .attr('src', 'https://gg.stargame.com/images/mark.png');

            $link.append($adImg);
            $link.append($tipImg);
            $link.append($btnClose);

            var ua = navigator.userAgent;
            if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
                $link.attr('href', db.hiturl).appendTo(element);
            }
            else if (ua.indexOf('iPhone') > -1) {
                $link.appendTo(element);
            }

            $btnClose.click(function () {
                element.remove();
                return false;
            });

            $link.click(function () {
                if (!$link.attr('href')) {
                    alert('暂不支持此系统的下载！');
                    return false;
                }
            });
            if (db.showurl instanceof Array) {
                for (var i in db.showurl) {
                    if (db.showurl.hasOwnProperty(i)) {
                        showAd(db.showurl[i]);
                    }
                }
            }
            else {
                showAd(db.showurl);
            }
        });
    };

    return customElem;
});
