/**
 * @file 常用方法
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    module.exports = {
        getComment: function getComment(callback, pnode, level) {
            var cnode;
            var cnodes = (pnode || document.body).childNodes;
            level = level ? --level : 10;
            if (!level) {
                return;
            }
            for (var i = 0; cnode = cnodes[i++];) {
                if (cnode.nodeType === 8) {
                    callback && callback(cnode);
                } else if (cnode.childNodes.length > 0) {
                    getComment(callback, cnode, level);
                }
            }
        },
        loadScript: function (src, node) {
            var script = document.createElement('script');
            script.src = src + (src.indexOf('?') > 0 ? '&' : '?') + '_=' + Math.random();
            if (node) {
                node.parentNode.insertBefore(script, node);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        },
        trim: function (str) {
            return str ? ('' + str).replace(/\s/g, '') : '';
        },
        parseJSON: function (str) {
            if (window.JSON) {
                return JSON.parse(str);
            } else {
                return Function('return ' + str)();
            }
        },
        getCookie: function (name) {
            var value = '; ' + document.cookie;
            var parts = value.split('; ' + name + '=');
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
            return '';
        },
        setCookie: function (name, val) {
            document.cookie = name + '=' + val;
        },
        indexOf: function (array, search) {
            if (array.indexOf) {
                return array.indexOf(search);
            } else {
                return '#' + array.join('#') + '#' .indexOf('#' + search + '#');
            }
        },
        addEventListener: function (element, type, fn) {
            if (document.addEventListener) {
                element.addEventListener(type, fn, false);
            } else {
                element.attachEvent('on' + type, fn);
            }
        },
        removeEventListener: function (element, type, fn) {
            if (document.removeEventListener) {
                element.removeEventListener(type, fn, false);
            } else {
                element.detachEvent('on' + type, fn);
            }
        },
        log: function (url, split) {
            var tmp;
            var img;
            split = split || '|';
            var urlArr = this.isArray(url) ? url : url.split(split);
            while (tmp = urlArr.shift()) {
                img = new Image();
                img.src = tmp;
            }
        },
        isArray: function (arg) {
            return '[object Array]' === Object.prototype.toString.call(arg);
        },
        merge: function (arg1, arg2) {
            var ret;
            if (!this.isArray(arg1)) {
                ret = {};
                if (typeof Object.assign === 'function') {
                    ret = Object.assign({}, arg1, arg2);
                } else {
                    for (var prop in arg1) {
                        ret[prop] = arg1[prop];
                    }
                    for (var prop in arg2) {
                        ret[prop] = arg2[prop];
                    }
                }
            }
            return ret;
        },
        firstLetterUppercase: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    };
});
