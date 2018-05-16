/**
 * @author:JDDFE
 * @date: 2018-05-10
 * @file mip-jdd-recent.js
 *
 */

define(function (require) {
    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;
    var localStorage = new CustomStorage(0);

    var PLACE_KEY = 'kaijiang.recent.place';
    var HEIGHT_KEY = 'kaijiang.recent.height';

    // firstInviewCallback说明：创建html元素
    customElement.prototype.firstInviewCallback = function () {
        var el = this.element;
        // type height 高频 place 地方
        var type = el.getAttribute('type');
        var host = el.getAttribute('host');
        var list = getRecent(type === 'place' ? PLACE_KEY : HEIGHT_KEY);
        var html = createRecentHtml(list, host, type);
        el.innerHTML = html;
    };

    // build说明：创建时绑定点击事件
    customElement.prototype.build = function () {
        var el = this.element;
        var list = getLotteryItemList();
        var type = el.getAttribute('type');
        bindClickEvent(list, type);
    };

    /**
     * 创建html
     *
     * @param {any} list 列表
     * @param {any} host host
     * @param {any} type 类型
     * @return {string}
     */
    function createRecentHtml(list, host, type) {
        if (list.length > 0) {
            var html = '<div class="last-view">';
            html += '<div class="aladdin-tit">最近查看</div>';
            html += '<div class="last-info">';
            var a = '';
            var b = '';
            var c = '';
            var d = '';
            var e = '';
            var issue = '';
            for (var index = 0; index < list.length; index++) {
                a = '<a class="view-txt" recent="lotteryName=' + list[index].lotteryName + '&lotteryId=';
                b = list[index].lotteryId + '&lotteryType=' + list[index].lotteryType + '&';
                c = (type === 'place' ? ('issueNo=' + list[index].issueNo) : ('issueDay=' + list[index].issueDay));
                issue = list[index].lotteryId, type === 'height' ? list[index].issueDay : list[index].issueNo;
                d = '" href="' + getJumpUrl(host, type, issue);
                e = '">' + list[index].lotteryName + '</a>';
                html += (a + b + c + d + e);
            }
            html += '</div>';
            html += '</div>';
            return html;
        }

        return '';
    }

    /**
     * 获取跳转链接
     *
     * @param {any} host host
     * @param {any} type 类型 place height
     * @param {any} lotteryId 彩种id
     * @param {any} issue 期次
     * @return {string} 跳转链接
     */
    function getJumpUrl(host, type, lotteryId, issue) {
        if (type === 'height') {
            return '//' + host + '/list/' + lotteryId + '/' + issue + location.search;
        }

        if (type === 'place') {
            return '//' + host + '/detail/' + lotteryId + '/' + issue + location.search;
        }
    }

    /**
     * 绑定点击事件
     *
     * @param {any} lotteryItemList 彩种列表
     * @param {any} type 类型
     */
    function bindClickEvent(lotteryItemList, type) {
        for (var index = 0; index < lotteryItemList.length; index++) {
            (function (i) {
                var current = lotteryItemList[i];
                current.dom.addEventListener('click', function () {
                    saveRecent(current.data, type);
                });
            })(index);
        }
    }

    /**
     * 获取列表
     *
     * @return {Array}
     */
    function getLotteryItemList() {
        var nodeList = document.querySelectorAll('[recent]');
        var lotteryItemList = [];
        for (var i = 0; i < nodeList.length; i++) {
            var current = nodeList[i];
            var attr = current.getAttribute('recent');
            if (attr === '') {
                return;
            }

            var data = convertQueryStringToJSON(attr);

            lotteryItemList.push({
                dom: current,
                data: data
            });
        }

        return lotteryItemList;
    }

    /**
     * 保存
     *
     * @param {any} item 项目
     * @param {any} type 类型
     */
    function saveRecent(item, type) {
        var key = type === 'place' ? PLACE_KEY : HEIGHT_KEY;
        var data = [];
        try {
            data = JSON.parse(localStorage.get(key)) || [];
        }
        catch (error) {
            console.warn(error);
        }

        if (data.length > 10) {
            data = data.slice(0, 10);
        }

        var ids = data.map(function (o) {
            return o.lotteryId;
        });

        var i = ids.indexOf(item.lotteryId);

        if (i > -1) {
            data.splice(i, 1);
        }

        data.unshift(item);
        localStorage.set(key, JSON.stringify(data));
    }

    /**
     * 读取
     *
     * @param {any} type 类型
     * @return {Array}
     */
    function getRecent(type) {
        // return [{ "lotteryName": "浙江飞鱼", "lotteryId": "2033", "lotteryType": "2", "issueDay": "2018-04-09" }, { "lotteryName": "江苏快三", "lotteryId": "2071", "lotteryType": "2", "issueDay": "2018-04-04" }, { "lotteryName": "北京11选5", "lotteryId": "2020", "lotteryType": "2", "issueDay": "2018-04-04" }, { "lotteryName": "江苏11选5", "lotteryId": "2011", "lotteryType": "2", "issueDay": "2018-04-04" }, { "lotteryName": "重庆快乐十分", "lotteryId": "2084", "lotteryType": "2", "issueDay": "2018-04-18" }, { "lotteryName": "山东十一运夺金", "lotteryId": "2001", "lotteryType": "2", "issueDay": "2018-05-07" }, { "lotteryName": "江西11选5", "lotteryId": "2088", "lotteryType": "2", "issueDay": "2018-04-19" }, { "lotteryName": "江西快3", "lotteryId": "2035", "lotteryType": "2", "issueDay": "2018-04-18" }];
        var data = [];
        try {
            data = JSON.parse(localStorage.get(type)) || [];
        }
        catch (error) {
            console.warn(error);
        }

        return data.slice(0, 10);
    }

    /**
     * 把query转换为对象
     *
     * @param {string} query 传入的字符串，如：a=3&b=4
     * @return {Object} 返回对象
     */
    function convertQueryStringToJSON(query) {
        var queryStringArr = query.split('&');
        var result = {};
        queryStringArr.forEach(function (item, index) {
            var match = item.split('=');
            if (match[0] && match[0] !== '' && match[1] && match[1] !== '') {
                result[match[0]] = window.decodeURIComponent(match[1]);
            }

        });
        return JSON.parse(JSON.stringify(result));
    }

    /**
     * 判断是否是空对象
     *
     * @param  {Object} object 需要判断的对象
     * @return {boolean}
     */
    function isEmptyObject(object) {
        for (var t in object) {
            if (object.hasOwnProperty(t)) {
                return !1;
            }

        }
        return !0;
    }

    return customElement;
});
