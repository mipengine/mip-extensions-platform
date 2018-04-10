/**
 * @file path操作
 * @author wangshikun@kanzhun.com
 * */
define(function () {

    /**
     * 从uri中获取主机名，如http://www.kanzhun.com => kanzhun.com
     * @param  {string} uri uri
     * @return {string}     hostname
     */
    function getHostname(uri) {
        var link = document.createElement('a');
        if (uri) {
            link.href = uri;
            return link.hostname;
        } else {
            return '';
        }
    }

    /**
     * 获取url中指定参数的值
     * @param  {string} variable 参数名
     * @return {string}          获取的参数名
     */
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (pair.length === 2 && decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return '';
    }

    /**
     * 将参数对象整合为一个参数字符串
     * @param  {Object} params    参数对象
     * @param  {string} seperator 参数分隔符
     * @return {string}           合并完成的参数字符串，例name=wangxiaoer&age=20
     */
    function packParams(params, seperator) {
        seperator = seperator || '&';
        var qs = [];
        for (var key in params) {
            qs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
        return qs.join(seperator);
    }

    /**
     * 解析url参数
     * @param  {string} str       要解析的url字符串
     * @param  {string} seperator url参数分隔符
     * @return {Object}           提取的url参数对象
     */
    function parseParams(str, seperator) {
        var params = {};
        if (str) {
            // 出现冒号处理str
            if (str.indexOf('%22') === 0) {
                str = str.substr(3, str.length - 6);
            }
            var parts = str.split(seperator);
            for (var i = 0; i < parts.length; i++) {
                var kv = parts[i].split('=');
                if (kv.length === 2) {
                    params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
                }
            }
        }
        return params;
    }

    /**
     * 删除域名
     * @param  {string} url 要删除域名的url
     * @return {string}     删除过域名的url
     * http://www.kanzhun.com -> www.kanzhun.com
     */
    function removeDomain(url) {
        if (url.indexOf('http') === 0) {
            var idx = url.indexOf('/', 7);
            if (idx > 0) {
                url = url.substr(idx);
            }
        }

        return url;
    }

    return {
        getHostname: getHostname,
        getQueryVariable: getQueryVariable,
        parseParams: parseParams,
        packParams: packParams,
        removeDomain: removeDomain
    };
});