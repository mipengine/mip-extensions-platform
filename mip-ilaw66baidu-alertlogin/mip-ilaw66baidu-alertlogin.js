/**
 * @file mip-ilaw66baidu-alertlogin 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 验证登陆组件，在首屏展示，需要尽快加载
	 */

    customElement.prototype.build = function () {

        this.addEventAction('login', function (event) {
            // 这里可以输出登录之后的数据
            // 获取用户信息
            //			event.userInfo;
            sessionStorage.setItem('islogins', 1);
            // 后端交互会话标识
            //     event.sessionId;
            console.log('登录');
        });
        this.addEventAction('error', function (event) {
            // 这里可以输出登录之后的数据
            // 获取用户信息
            //			event.userInfo;
            //          sessionStorage.setItem('islogins', 1);
            // 后端交互会话标识
            //     event.sessionId;
            console.log('cuow');
        });

    };

    return customElement;
});
