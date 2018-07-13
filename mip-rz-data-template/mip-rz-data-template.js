/**
 * @file mip-rz-data-template 组件
 * @author
 */

define(function (require) {
    'use strict';

    let customElement = require('customElement').create();
    let templates = require('templates');
    let util = require('util');
    let viewer = require('viewer');
    // 复制剪切
    let ClipboardJS = require('./clipboard.min');
    function getQuery(url) {
        url = url || location.href;
        let query = url.split('?')[1] || '';
        if (!query) {
            return {};
        }
        return query.split('&').reduce(function (obj, item) {
            let data = item.split('=');
            obj[data[0]] = decodeURIComponent(data[1]);
            return obj;
        }, {});
    }

    function copyfun(element) {
        let diyclipboard = new ClipboardJS('.wechatcopybtn');
        diyclipboard.on('success', function (e) {
            let toastdiv = element.getElementsByClassName('diy-toast')[0];
            toastdiv.innerHTML = '已复制，请打开微信搜索公众号';
            toastdiv.classList.add('diy-toast-show');
            setTimeout(() => {
                toastdiv.classList.remove('diy-toast-show');
            }, 1500);
        });
        diyclipboard.on('error', function (e) {
            console.log(e);
        });
    }

    function handTime(time) {
        if (time.indexOf('-') !== -1) {
            let arr = time.split('-');
            return arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
        } else {
            return time;
        }
    }
    function talkfull(element, arr, order, num) {
        if (arr) {
            let tempw = window.innerWidth || document.documentElement.clientWidth;
            let tempw2 = tempw * 0.88;
            let temparr = [];
            arr.forEach(function (item, index) {
                let tempobj = {
                    w: tempw2,
                    h: tempw2 * .75
                };
                if (num === 1) {
                    tempobj.src = item.pic;
                    tempobj.title = item.desp;
                } else if (num === 2) {
                    tempobj.src = item.orgPic;
                    tempobj.title = item.honorName;
                };
                temparr.push(tempobj);
            });
            viewer.eventAction.execute('usefull', element, {
                order: order,
                items: temparr
            });
        };
    }
    function realfull(element, data) {
        let imgitem = element.querySelectorAll('.img-item');
        setTimeout(function () {
            if (imgitem) {
                for (let index = 0; index < imgitem.length; index++) {
                    imgitem[index].querySelector('mip-img').addEventListener('click', function () {
                        let order = Number(imgitem[index].dataset['order']);
                        if (imgitem[index].classList.contains('liveshot-img')) {
                            // 实拍照片
                            talkfull(element, data.compPhotos, order, 1);
                        } else if (imgitem[index].classList.contains('qualhonor-img')) {
                            // 资质荣誉
                            talkfull(element, data.honorCertificate, order, 2);
                        }
                    }, false);
                }
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        let element = this.element;
        // 获取当前页面的所有query
        let query = getQuery();
        fetch('https://v123.baidu.com/xzhpageajax', {
            method: 'POST',
            body: 'camId=' + query.id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
            // 转json
            return res.json();
        }, function () {
            // 向外界组件暴露加载失败事件
        }).then(function (res) {
            if (!res.code) {
                // 加载成功
                // 渲染模板
                if (res.data.regCapital) {
                    res.data.regCapital = res.data.regCapital.split('.')[0];
                };
                if (res.data.authTime) {
                    res.data.authTime = handTime(res.data.authTime);
                };
                if (res.data.regTime) {
                    res.data.regTime = handTime(res.data.regTime);
                };
                if (res.data.effTime) {
                    res.data.effTime = handTime(res.data.effTime);
                };
                templates.render(element, res.data).then(function (html) {
                    element.innerHTML = html;
                    if (res.data.brandBackground) {
                        let pageTitle = element.querySelectorAll('.top-title')[0];
                        util.css(pageTitle, 'backgroundImage', 'url(' + res.data.brandBackground + ')');
                    };
                    copyfun(element);
                    realfull(element, res.data);
                });
            }
        });
    };

    return customElement;
});
