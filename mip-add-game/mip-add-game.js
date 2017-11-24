/**
 * @file mip-add-game 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var util = require('util');
        var platform = util.platform;
        var url = 'http://m.yxdown.com/cache/api/open/az/item/rec/list.json?count=8';
        if (platform.isIos()) {
            url = 'http://m.yxdown.com/cache/api/open/app/item/rec/list.json?count=8';
        };
        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp(url).then(function (res) {
            return res.json();
        }).then(function (data) {
            var data = data.data;
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var ent = data[i];
                arr.push('<li><a href=' + ent.link + ' data-id=' + ent.id + ' class="add_game_list">');
                arr.push('<mip-img src=' + ent.icover + ' alt=' + ent.name + '></mip-img>');
                arr.push('<span>' + ent.name + '</span>');
                arr.push('</a></li>');
            };
            ele.innerHTML = arr.join('');
        });
        var soft = {
            fetch: function (id) {
                var gameUrl = 'http://m.yxdown.com/api/down.ashx/getdownlink?type=url&id=' + id;
                fetch(gameUrl).then(function (res) {
                    var text =  res.text();
                }).then(function (text) {
                    window.location.href = text;
                });
            }
        };
        var timer = setInterval(function () {
            var addGame = document.querySelectorAll('.add_game_list');
            if (addGame.length > 0) {
                for (var i = 0; i < addGame.length; i++) {
                    addGame[i].addEventListener('click', function (e) {
                        e.preventDefault();
                        var id = this.getAttribute('data-id');
                        soft.fetch(id);
                    }, false);
                };
                clearInterval(timer);
            };
        }, 300);
    };
    return customElement;
});