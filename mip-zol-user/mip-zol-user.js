/**
 * @file 脚本支持
 * @author  mulianju
 * @time  2017-10-25
 * @version 1.0.0
 */
define(function (require, exports) {
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();

    window.ZOL_USER_INFO = {};
    var setUserInfo = function (userinfo) {
        for (var item in userinfo) {
            if (userinfo.hasOwnProperty(item) && userinfo[item]) {
                try {
                    Object.defineProperty(window.ZOL_USER_INFO, item, {
                        value: userinfo[item],
                        writable: false
                    });
                }
                catch (error) {

                }
            }
        }
    };
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var role = element.dataset.role;
        window.addEventListener('gotzoluserinfo', function (e) {
            var userinfo = e.ZOL_USER_INFO;
            switch (role) {
                case 'useravatar':
                    if (userinfo) {
                        element.innerHTML = '<a href="' + userinfo.myUrl
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
    };

    // 自定义方法 gotzoluserinfo
    var evt = document.createEvent('Event');
    evt.initEvent('gotzoluserinfo', true, true);

    fetchJsonp('//service.zol.com.cn/user/getUserInfo.php', {}).then(function (res) {
        return res.json();
    }).then(function (request) {
        if (request.loginStatus === 1) {
            setUserInfo(request.userInfo);
            try {
                Object.defineProperty(evt, 'ZOL_USER_INFO', {
                    value: request.userInfo,
                    writable: false
                });
            }
            catch (error) {

            }
        }
        window.dispatchEvent(evt);
    });
    return customElement;
});
