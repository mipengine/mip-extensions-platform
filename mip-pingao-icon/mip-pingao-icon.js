/**
 * @file mip-pingao-icon 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');

    var customElement = require('customElement').create();

    var dataData = [];

    function $(str) {
        return document.getElementById(str);
    }

    /**
     * ajax request
     *
     * @param {string} url 地址
     * @param {string} method 回掉方法
     */
    function httpRequest(url, method) {
        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp(url).then(function (response) {

            return response.json();

        }).then(function (json) {

            method(json);

        }).catch(function (ex) {

        });
    }

    /**
     * 关闭广告
     */
    function close() {
        if (Math.floor(Math.random() * 100 + 1) <= dataData.falseClose) {
            skip();
        }
        else {
            $('icon').className += ' hide';
        }
    }

    /**
     * 连接跳转
     */
    function skip() {
        window.open(dataData.url, '_blank');
    }

    /**
     * 切换
     */
    function change() {
        var i = 1;
        setInterval(function () {

            if (i >= (dataData.imageArr.length)) {
                i = 0;
            }

            dataData.image = dataData.imageArr[i];
            dataData.url = dataData.urlArr[i];

            $('image').setAttribute('src', dataData.image);

            i++;
        },
        dataData.changeTime);
    }

    /**
     * 抖动
     */
    function action() {
        setInterval(function () {

            var num = 0;
            var int = setInterval(function () {
                if (num === 20) {
                    $('image').className = 'buttonleft';
                    clearInterval(int);
                }
                else {
                    if (num % 2 === 0) {
                        $('image').className = 'topright';
                    }
                    else {
                        $('image').className = 'buttonleft';
                    }
                }
                num++;
            },
            50);
        },
        dataData.actionTime);
    }

    /**
     * 统计pv
     */
    function statisPv() {
        httpRequest(dataData.pvUrl, function (data) {


        });
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;

        var domain = ele.getAttribute('domain');
        var parameter = ele.getAttribute('parameter');

        httpRequest('http://' + domain + '/' + parameter, function (data) {

            if (data.state === true) {

                dataData = data.data;
                ele.innerHTML = dataData.html;

                $('close').addEventListener('click', close);

                $('href').addEventListener('click', skip);

                change();

                action();

                if (Math.floor(Math.random() * 100 + 1) <= dataData.recordPv) {
                    statisPv();
                }
            }

        });

    };

    return customElement;
});
