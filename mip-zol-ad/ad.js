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
        MFeed: require('./components/m_feed'),
        Iframecode: require('./components/iframe_code')
    };
    var templates = {
        code: require('./templates/code'),
        mInfoFlow: require('./templates/feed'),
        normal: require('./templates/normal')
    };
    // 页面广告注释节点数组
    var adComments = [];
    // 页面广告注释节点数组，一般在手动请求广告时用到
    var asyncAdComments = {};
    // 扩展js需要渲染的广告数组，比如a广告需要用js1，b广告需要用js2渲染
    var extensionJsBarConfs = {};
    // 页面自行设置的方法，在解析广告注释的时候调用
    var beforFun = window[config.beforFun] || {};
    // 页面自行设置的方法，在渲染广告的时候调用
    var afterFun = window[config.afterFun] || {};

    /**
     * 解析页面广告注释
     *
     * @param {Object} comment 页面注释节点
     * @return {number} 广告位id
     */
    function parseComment(comment) {
        var pid;
        var obj;
        var nodeValue;
        var keyword = config.keyword;
        nodeValue = util.fun.trim(comment.nodeValue);
        if (nodeValue && nodeValue.substr(0, keyword.length) === keyword) {
            obj = util.fun.parseJSON(nodeValue.replace(keyword, ''));
            pid = obj.place;
            if (obj.id && beforFun[obj.id]) {
                pid = ('' + beforFun[obj.id](obj.place));
            }
            comment.pageFunId = obj.id;
        }
        return pid;
    }

    /**
     * 获取页面所有广告注释id，并把注释节点保存到adComments中
     *
     * @return {Array} 广告id数组
     */
    function getAdComments() {
        var ids = [];
        util.fun.getComment(function (comment) {
            var pid = parseComment(comment);
            if (pid) {
                ids.push(pid);
                adComments.push(comment);
            }
        });
        return ids;
    }

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
            ad.appendAfterFn && ad.appendAfterFn();
            if (!adBarAndAdComment.adComment.parentNode.adHeight) {
                adBarAndAdComment.adComment.parentNode.adHeight = 0;
            }
            adBarAndAdComment.adComment.parentNode.adHeight += (+ad.height + 10);
            // 特殊处理文章页360广告
            if (adBarAndAdComment.adBar.loc_id === 27263 && document.getElementById('mv_ad_dom')) {
                loadExtensionJs('qhad-article');
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
        if (util.ad.checkOS(adBar) && util.ad.checkCity(adBar)) {
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
        var adComment;
        if (id && asyncAdComments[id]) {
            place(ads[0], asyncAdComments[id]);
            return;
        }
        for (var i = 0; i < ads.length; i++) {
            var adPlace = ads[i];
            adComment = adComments.shift();
            if (adComment.pageFunId && afterFun[adComment.pageFunId]) {
                afterFun[adComment.pageFunId](new PageFun(adPlace, adComment));
            } else {
                place(adPlace, adComment);
            }
        }
    }

    /**
     * 页面自定义方法参数，在bms_after_fun中调用
     *
     * @param {Object} adPlace 广告位数组
     * @param {Object} adComment 当前广告位对应的广告注释节点
     */
    function PageFun(adPlace, adComment) {
        this.adPlace = adPlace;
        this.adComment = adComment;
    }

    /**
     * 生产广告，页面需调用此方法才能生成广告
     */
    PageFun.prototype.render = function () {
        place(this.adPlace, this.adComment);
    };

    /**
     * 获取广告高度，需调用生成广告方法后调用
     *
     * @return {number} 广告高度
     */
    PageFun.prototype.getHeight = function () {
        return this.adComment.parentNode.adHeight;
    };

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
        pid = pid || parseComment(adComment);
        if (pid) {
            asyncAdComments[pid] = adComment;
            requestAd([pid], pid);
        }
    }

    /**
     * 广告初始化，解析广告占位，发送数据请求
     *
     * @param {Object} template 外部传入的模版对象
     * @param {Object} component 外部传入的组件对象
     */
    function init(template, component) {
        var adComments;
        if (template) {
            templates = util.fun.merge(templates, template);
        }
        if (component) {
            components = util.fun.merge(components, component);
        }
        if (!window[config.noGet]) {
            adComments = getAdComments();
        }
        if (!window[config.noReq] && adComments) {
            requestAd(adComments);
        }
    }
    module.exports = {
        init: init
    };
    window._da_ = {
        cb: adCallback,
        ec: adExtensionCallback,
        render: adGlobalFunction,
        util: util
    };
});
