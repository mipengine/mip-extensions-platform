/**
 * @file mip-add-game 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var game = {az: [{'id': 612144, 'link': 'http://m.yxdown.com/app/612144.html', 'categoryid': 166, 'name': '传奇无双', 'icover': 'http://i-4.yxdown.com/2017/5/9/KCg5MHg5MCkp/38570f1c-c484-4b44-a4e4-ef8b450a9281.png', 'categoryName': '角色扮演', 'pclink': 'http://www.yxdown.com/app/612144.html', 'cover': 'http://i-4.yxdown.com/2017/5/9/38570f1c-c484-4b44-a4e4-ef8b450a9281.png', 'categorylink': 'http://www.yxdown.com/azyx/jiaose/', 'version': 'v1.3.5'}, {'id': 651670, 'link': 'http://m.yxdown.com/app/651670.html', 'categoryid': 166, 'name': '阿拉德之怒', 'icover': 'http://i-4.yxdown.com/2017/10/18/KCg5MHg5MCkp/66dfaba1-56a1-4f17-aa50-57962901f46f.png', 'categoryName': '角色扮演', 'pclink': 'http://www.yxdown.com/app/651670.html', 'cover': 'http://i-4.yxdown.com/2017/10/18/66dfaba1-56a1-4f17-aa50-57962901f46f.png', 'categorylink': 'http://www.yxdown.com/azyx/jiaose/', 'version': 'v1.11.1.59977'}, {'id': 612201, 'link': 'http://m.yxdown.com/app/612201.html', 'categoryid': 167, 'name': '街机金蟾捕鱼OL', 'icover': 'http://i-2.yxdown.com/2015/3/11/KCg5MHg5MCkp/cdeec373-832e-476c-8777-4bacdbf807c0.jpg', 'categoryName': '益智休闲', 'pclink': 'http://www.yxdown.com/app/612201.html', 'cover': 'http://i-2.yxdown.com/2015/3/11/cdeec373-832e-476c-8777-4bacdbf807c0.jpg', 'categorylink': 'http://www.yxdown.com/azyx/xiuxian/', 'version': 'v3.0.0'}, {'id': 662567, 'link': 'http://m.yxdown.com/app/662567.html', 'categoryid': 173, 'name': '纪念碑谷2', 'icover': 'http://i-4.yxdown.com/2017/11/7/KCg5MHg5MCkp/840a168a-af04-4ae5-a952-49469d83b29b.png', 'categoryName': '冒险解谜', 'pclink': 'http://www.yxdown.com/app/662567.html', 'cover': 'http://i-4.yxdown.com/2017/11/7/840a168a-af04-4ae5-a952-49469d83b29b.png', 'categorylink': 'http://www.yxdown.com/azyx/maoxian/', 'version': 'v1.11.0'}], ios: [{'id': 665751, 'link': 'http://m.yxdown.com/app/665751.html', 'categoryid': 197, 'name': '生化危城', 'icover': 'http://i-4.yxdown.com/2017/11/15/KCg5MHg5MCkp/463fce5a-e33f-48ea-8e35-04aa38214ce7.png', 'categoryName': '策略塔防', 'pclink': 'http://www.yxdown.com/app/665751.html', 'cover': 'http://i-4.yxdown.com/2017/11/15/463fce5a-e33f-48ea-8e35-04aa38214ce7.png', 'categorylink': 'http://www.yxdown.com/apple/celue/', 'version': 'v1.5.8'}, {'id': 629158, 'link': 'http://m.yxdown.com/app/629158.html', 'categoryid': 194, 'name': '魂之轨迹', 'icover': 'http://i-4.yxdown.com/2017/8/21/KCg5MHg5MCkp/1e409cda-9d01-4af6-88b7-4c6fff7de811.png', 'categoryName': '角色扮演', 'pclink': 'http://www.yxdown.com/app/629158.html', 'cover': 'http://i-4.yxdown.com/2017/8/21/1e409cda-9d01-4af6-88b7-4c6fff7de811.png', 'categorylink': 'http://www.yxdown.com/apple/juese/', 'version': 'v 2.19.5'}, {'id': 646284, 'link': 'http://m.yxdown.com/app/646284.html', 'categoryid': 194, 'name': '大天使之剑H5', 'icover': 'http://i-4.yxdown.com/2017/9/29/KCg5MHg5MCkp/672bc6a6-50d1-4170-93a5-83a742f2cb98.png', 'categoryName': '角色扮演', 'pclink': 'http://www.yxdown.com/app/646284.html', 'cover': 'http://i-4.yxdown.com/2017/9/29/672bc6a6-50d1-4170-93a5-83a742f2cb98.png', 'categorylink': 'http://www.yxdown.com/apple/juese/', 'version': 'v2.4.3'}, {'id': 654998, 'link': 'http://m.yxdown.com/app/654998.html', 'categoryid': 194, 'name': '阿拉德之怒mg版本', 'icover': 'http://i-4.yxdown.com/2017/11/23/KCg5MHg5MCkp/cebf932f-653e-4226-8f70-ccbd5dd80bf9.png', 'categoryName': '角色扮演', 'pclink': 'http://www.yxdown.com/app/654998.html', 'cover': 'http://i-4.yxdown.com/2017/11/23/cebf932f-653e-4226-8f70-ccbd5dd80bf9.png', 'categorylink': 'http://www.yxdown.com/apple/juese/', 'version': 'v1.4.1.51198'}]};
        var arr = [];
        var util = require('util');
        var platform = util.platform;
        if (platform.isIos()) {
            for (var i = 0; i < game.ios.length; i++) {
                arr.push('<li><a href=' + game.ios[i].link + ' data-id=' + game.ios[i].id + '>');
                arr.push('<mip-img src=' + game.ios[i].icover + ' alt=' + game.ios[i].name + '></mip-img>');
                arr.push('<span>' + game.ios[i].name + '</span>');
                arr.push('</a></li>');
            };
        } else {
            for (var i = 0; i < game.az.length; i++) {
                arr.push('<li><a href=' + game.az[i].link + ' data-id=' + game.az[i].id + '>');
                arr.push('<mip-img src=' + game.az[i].icover + ' alt=' + game.az[i].name + '></mip-img>');
                arr.push('<span>' + game.az[i].name + '</span>');
                arr.push('</a></li>');
            };
        };
        ele.innerHTML = arr.join('');
    };
    return customElement;
});