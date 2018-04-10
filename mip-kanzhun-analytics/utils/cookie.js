/**
 * @file cookie操作
 * @author wangshikun@kanzhun.com
 * */
define(function () {

    /**
     * 创建cookie
     * @param  {string} name   cookie名
     * @param  {string} value  cookie值
     * @param  {number} days   cookie有效天数
     * @param  {string} domain cookie生效的域名
     */
    function createCookie(name, value, days, domain) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        }

        if (days && domain) {
            removeCookie(name);
        }

        var myCookie = name + '=' + value + expires + '; path=/';
        if (domain) {
            myCookie += ';domain=' + domain;
        }

        document.cookie = myCookie;
    }

    /**
     * 删除cookie
     * @param  {string} name cookie名
     */
    function removeCookie(name) {
        var myCookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        var domains = [
            '.kanzhun.com',

            'www.kanzhun.com',
            '.www.kanzhun.com',

            'm.kanzhun.com',
            '.m.kanzhun.com',

            't.kanzhun.com',
            '.t.kanzhun.com'
        ];

        for (var i = 0; i < domains.length; i++) {
            // remove all possible domains
            document.cookie = myCookie + 'domain=' + domains[i];
            document.cookie = myCookie + 'domain=' + domains[i] + '; path=/';
        }

        // remove cookie without domain
        document.cookie = myCookie;
        document.cookie = myCookie + '; path=/';
    }

    /**
     * 读取cookie
     * @param  {string} name 需要读取的cookie名字
     * @return {string}      读取到的cookie值
     */
    function readCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }

        return null;
    }

    return {
        createCookie: createCookie,
        removeCookie: removeCookie,
        readCookie: readCookie
    };
});