/**
 * @file 脚本支持
 * @author  mulianju
 * @time  2017-10-25
 * @version 1.0.0
 */
define(function (require, exports) {
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();

    window.ZOL_USER_INFO = {
        // 检查登录状态，登录时返回true，未登录时返回false并跳转登录页
        checkLogState: function () {
            var flag = !!window.ZOL_USER_INFO.userid;
            if (!flag) {
                location.href = '//service.zol.com.cn/user/mlogin.php?backurl=' + encodeURIComponent(location.href);
            }
            return flag;
        }
    };
    var setUserInfo = function (userinfo) {
        for (var item in userinfo) {
            if (userinfo.hasOwnProperty(item) && userinfo[item]) {
                try {
                    Object.defineProperty(window.ZOL_USER_INFO, item, {
                        value: userinfo[item],
                        writable: false
                    });
                } catch (error) {

                }
            }
        }
    };


    // 自定义方法 gotzoluserinfo
    var evt = document.createEvent('Event');
    evt.initEvent('gotzoluserinfo', true, true);
    // 使用build 因为userinfo有全局依赖 必须初始化时候获取
    customElement.prototype.build = function () {
        var element = this.element;
        var role = element.dataset.role;

        element.addEventListener('gotzoluserinfo', function (e) {
            var userinfo = e.ZOL_USER_INFO;
            switch (role) {
                case 'useravatar':
                    if (userinfo) {
                        element.innerHTML = '<a href="' + '//m.zol.com.cn/my/'
                        + '" class="account"><img class="userAvatar" src="' + userinfo.headPic
                        + '" alt="' + userinfo.nickName + '"></a>';
                    } else {
                        [].forEach.call(element.querySelectorAll('a,mip-link'), function (link) {
                            if (link.href) {
                                link.href += location.href;
                            } else if (link.getAttribute('href')) {
                                link.setAttribute('href', link.getAttribute('href') + location.href);
                            }
                        });
                    }
                    break;
                default:
                    break;
            }
        });
        !(function () {
            if (setUserInfo.posting || window.ZOL_USER_INFO.userid) {
                return;
            }
            setUserInfo.posting = true;
            getUserInfo(element.dataset.url, element);
        })();
    };

    function getUserInfo(url, context) {
        fetchJsonp(url || '//service.zol.com.cn/user/getUserInfo.php', {}).then(function (res) {
            return res.json();
        }).then(function (request) {
            if (request.loginStatus === 1) {
                setUserInfo(request.userInfo);
                try {
                    Object.defineProperty(evt, 'ZOL_USER_INFO', {
                        value: request.userInfo,
                        writable: false
                    });
                    context ? context.dispatchEvent(evt) : window.dispatchEvent(evt);
                } catch (error) {

                }

            } else {
                setUserInfo.posting = false;
            }
        });
    }

    return customElement;
});
