/**
 * @file 广告js
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    var util = require('./util');
    var config = require('./config');
    var components = {
        Baidu: require('./components/baidu'),
        Code: require('./components/code'),
        Pic: require('./components/picture'),
        Iframe: require('./components/iframe'),
        Iframecode: require('./components/iframe_code')
    };
    var templates = {
        txt: require('./templates/txt'),
        code: require('./templates/code'),
        normal: require('./templates/normal')
    };
    // 页面广告注释节点数组，一般在手动请求广告时用到
    var asyncAdComments = {};
    // 扩展js需要渲染的广告数组，比如a广告需要用js1，b广告需要用js2渲染
    var extensionJsBarConfs = {};

    /**
     * 请求广告数据
     *
     * @param {Array} ids 广告位id数组
     * @param {number} pid 广告位id，一般在手动请求广告时用来，接口返回内容会不一样
     */
    function requestAd(ids, pid) {
        if (ids.length > 0) {
            var src = config.view + ids.join(',');
            if (pid) {
                src += '&pid=' + pid;
            }
            util.fun.loadScript(src);
        }
    }

    /**
     * 向页面插入广告
     *
     * @param {Function} Fn 广告渲染类
     * @param {Object} adBarAndAdComment 广告对象，包含广告条json对象和注释节点
     */
    function insertAd(Fn, adBarAndAdComment) {
        if (Fn) {
            var ad = new Fn(adBarAndAdComment.adBar).create(util);
            for (var i = 0; i < ad.elements.length; i++) {
                adBarAndAdComment.adComment.parentNode.appendChild(ad.elements[i]);
            }
        }
    }

    /**
     * 处理广告位数据
     *
     * @param {Array} adPlace 广告位数组，包含多个广告条
     * @param {Object} adComment 当前广告位对应的广告注释节点
     */
    function place(adPlace, adComment) {
        var hasRotate = {};
        adPlace = util.ad.sort(adPlace);
        for (var i = 0; i < adPlace.length; i++) {
            var adBar = adPlace[i];
            if (typeof adBar.rotate === 'number' || util.ad.rotate(adBar, hasRotate)) {
                bar(adBar, adComment);
            }
        }
    }

    /**
     * 处理广告条数据
     *
     * @param {Object} adBar 广告条json对象
     * @param {Object} adComment 当前广告位对应的广告注释节点
     */
    function bar(adBar, adComment) {
        var type = adBar.type;
        var adBarAndAdComment = {
            adBar: adBar,
            adComment: adComment
        };
        if (util.ad.checkOS(adBar) && util.ad.checkCity(adBar) && util.ad.checkProduct(adBar)) {
            if (templates[type]) {
                insertAd(templates[type](adBar, components), adBarAndAdComment);
            } else {
                if (extensionJsBarConfs[type]) {
                    extensionJsBarConfs[type].push(adBarAndAdComment);
                } else {
                    extensionJsBarConfs[type] = [adBarAndAdComment];
                    loadExtensionJs(type);
                }
            }
        }
    }

    /**
     * 加载扩展js
     *
     * @param {string} type 扩展js名字
     */
    function loadExtensionJs(type) {
        var src = config.extension + type + '.js';
        util.fun.loadScript(src);
    }

    /**
     * 广告回调方法
     *
     * @param {Array} ads 广告数据数组
     * @param {number} id 当前返回和页面广告位对应标识，一般在手动请求广告时用
     */
    function adCallback(ads, id) {
        if (id && asyncAdComments[id]) {
            place(ads[0], asyncAdComments[id]);
        }
    }

    /**
     * 广告扩展方法请求回调
     *
     * @param {string} type 广告类型
     * @param {Function} fn 广告扩展方法
     */
    function adExtensionCallback(type, fn) {
        var f = fn(components);
        for (var i = 0; i < extensionJsBarConfs[type].length; i++) {
            var ad = extensionJsBarConfs[type][i];
            insertAd(f, ad);
        }
        extensionJsBarConfs[type].push = function (ad) {
            insertAd(f, ad);
        };
    }

    /**
     * 广告全局方法，可在页面手动调用生成广告
     *
     * @param {Object} adComment 广告注释节点
     * @param {number} pid 广告位id
     */
    function adGlobalFunction(adComment, pid) {
        if (pid) {
            asyncAdComments[pid] = adComment;
            requestAd([pid], pid);
        }
    }

    window._da_ = {
        cb: adCallback,
        ec: adExtensionCallback,
        render: adGlobalFunction
    };
});
