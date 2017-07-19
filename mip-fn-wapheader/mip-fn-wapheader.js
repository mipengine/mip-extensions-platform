/**
 * @file mip-fn-wapheader 组件
 * @author fn
 */
define(function (require) {
    var customElem = require('customElement').create();

    function getCookie(cname) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(cname + '=');
            if (start !== -1) {
                start = start + cname.length + 1;
                var end = document.cookie.indexOf(';', start);
                if (end === -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return '';
    }
    // 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        var bbusername = getCookie('bbusername');
        var searchUrl = element.getAttribute('searchUrl');
        var mapUrl = element.getAttribute('mapUrl');
        var classUrl = element.getAttribute('classUrl');
        var imgSrc = element.getAttribute('imgSrc');
        var channelName = element.getAttribute('channelName');
        var channelUrl = element.getAttribute('channelUrl');
        var username = element.getAttribute('bbusername');
        var headerStr;
        if (bbusername) {
            headerStr = ''
                + '<div class="header-user">'
                + '<a href="' + classUrl + '" class="goback">返回上一页</a>'
                + '<a href="' + channelUrl + '" class="name">' + channelName + '</a>'
                + '<div class="control">'
                + '<a href="' + searchUrl + '" class="searchUrl">搜索</a>'
                + '<span class="avator">'
                + '<mip-img layout="responsive" id="headerControl" width="30" height="30" src="' + imgSrc + '"></span>'
                + '<a href="' + mapUrl + '" class="map">map</a>'
                + '</div>'
                + '</div>'
                + '<div class="username-layer">'
                + '<a href="http://my.fengniao.com/login.php?action=logout&url=' + window.location + '" class="login-out-button">退出</a>'
                + '<span class="avator">'
                + '<mip-img layout="responsive" width="30" height="30" src="' + imgSrc + '"></span>'
                + '<span class="username">' + username + '</span>'
                + '<span class="close-username"></span>'
                + '</div>';

        } else {
            headerStr = ''

                + '<div class="header-user">'
                + '<a href="' + classUrl + '" class="goback">返回上一页</a>'
                + '<a href="' + channelUrl + '" class="name">' + channelName + '</a>'
                + '<div id="headerControl" class="control">'
                + '<a href="' + searchUrl + '" class="searchUrl">搜索</a>'
                + '<span class="avator">'
                + '<a href="/login.php?url=' + window.location + '" class="login-btn">登录</a>'
                + '</span>'
                + '</div>'
                + '</div>';
        }
        element.innerHTML = headerStr;

        var headerControl = element.querySelector('#headerControl');

        headerControl.addEventListener('click', function () {
            element.classList.toggle('show-user-layer');
        }, false);
    };

    return customElem;

});

