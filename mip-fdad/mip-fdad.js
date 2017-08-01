/**
 * @file mip-fdad 组件
 * @author deiphi@qq.com
 */

window.CUSTOMER = {};

define(function (require) {
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    var domain = 'https://static.tj.familydoctor.com.cn';
    var domainIP = 'https://ggtj.tj.familydoctor.com.cn';
    var customer = {
        ids: [], // 所有广告id
        baseUrl: domain + '/c/e/',
        placeUrl: domain + '/c/a/',
        area: null, // 缓存的地区数据{pid, id}
        areaStorageName: '__customer_area', // storage名称
        statis: {
            url: 'https://click.tj.familydoctor.com.cn/',
            ap: 'ap',
            apd: 'apd',
            record: recordPv
        },
        place: {
            items: [], // 广告位数据
            ids: [], // 广告位id数组
            className: '__customer_place',
            sectionName: '__customer_section',
            sectionWrapName: '__customer_sec_wrap',
            getSections: getPlaceSections,
            append: appendAd,
            mutiple: {}  // 轮播或叠楼
        },
        isUrl: isUrl, // 按URL
        isDis: isDisease, // 按疾病
        isDep: isDepartment, // 按科室
        isBro: isBrowser, // 浏览器
        isCus: isCustom, // 自定义
        isMob: isMobile, // 按平台
        isArea: isArea, // 按地区
        doctors: matchDoctors, // 按医生
        setDis: setDisease, // 设置疾病
        setAskDis: setAskDisease, // 设置ask疾病
        setDep: setDepartment, // 设置科室
        setDoc: setDoctor, // 设置医生
        setCus: setCustom, // 设置自定义标签
        loadArea: loadArea, // 异步加载地区
        data: {
            disease: null,
            askDisease: null,
            department: [],
            customs: [],
            doctors: [],
            mips: []
        },
        setId: setCustomerId, // 设置广告id
        mutiple: mutiple, // 轮播 或 列表
        handle: handle, // 处理并插入广告
        slider: slider,
        ajax: ajax,
        ready: ready,
        delay: delay,
        getElements: getElements,
        getQueryString: getQueryString,
        getPlaceUrl: getPlaceUrl,
        mipAdd: mipAdd,
        mipGet: mipGet,
        getScript: getScript,
        support: {
            flex: supportFlex
        }
    };

    // 匹配url
    function isUrl(urls) {
        if (!urls) {
            return false;
        }

        if (typeof urls === 'string') {
            urls = [urls];
        }

        var i = urls.length;
        var url = window.location.href;

        while (i--) {
            if (url.indexOf(urls[i]) !== -1) {
                return true;
            }
        }

        return false;
    }

    // 匹配疾病
    function isDisease(ids, askIds) {
        if (!(ids instanceof Array)) {
            return false;
        }

        if (!(askIds instanceof Array)) {
            askIds = [];
        }

        return contains(ids, customer.data.disease) || contains(askIds, customer.data.askDisease);
    }

    // 匹配科室
    function isDepartment(ids) {
        var departments = customer.data.department;

        if (!departments.length) {
            return false;
        }

        if (departments.length === 1) {
            return contains(ids, departments[0]);
        }

        if (departments.length === 2) {
            return contains(ids, departments[0]) || contains(ids, departments[1]);
        }
    }

    // 获取所有匹配到的医生id
    function matchDoctors(ids) {
        var doctors = [];

        if (!ids) {
            return false;
        }

        if (typeof ids === 'number') {
            ids = [ids];
        }

        for (var i = 0, len = ids.length; i < len; i++) {
            if (contains(customer.data.doctors, ids[i])) {
                doctors.push(ids[i]);
            }
        }

        return doctors;
    }

    // 匹配自定义标签
    function isCustom(tags) {
        if (!tags) {
            return false;
        }

        if (typeof tags === 'string') {
            tags = [tags];
        }

        for (var i = 0, len = tags.length; i < len; i++) {
            if (contains(customer.data.customs, tags[i])) {
                return true;
            }
        }

        return false;
    }

    // 匹配浏览器
    function isBrowser(key) {
        var userAgent = window.navigator.userAgent.toLowerCase();
        var arr = [];
        var i = 0;
        var flag = false;

        switch (key) {
            case 'uc':
                arr.push('UCBrowser');
                break;
            case 'baidu':
                arr.push('baidu');
                break;
            case 'qq':
                arr.push('QQBrowser');
                break;
            case '360':
                arr.push('QIHU');
                break;
            case 'chrome':
                arr.push('chrome');
                break;
            case 'ie':
                arr.push('msie');
                break;
            case 'firefox':
                arr.push('firefox');
                break;
            case 'sougou':
                arr.push('MetaSr');
                break;
            case 'weixin':
                arr.push('micromessenger');
                break;
        }

        i = arr.length;

        while (i--) {
            flag = userAgent.indexOf(arr[i].toLowerCase()) !== -1;
        }

        return flag;
    }

    // 获取地区(从storage获取)
    function getArea() {
        if (customer.area) {
            return customer.area;
        }

        var area = storage.get(customer.areaStorageName);

        if (!area) {
            return null;
        }

        area = decodeURIComponent(area);
        area = window.JSON.parse(area);

        customer.area = area;
        return area;
    }

    // 设置地区(写入storage，缓存12小时)
    function setArea(area) {
        storage.set(customer.areaStorageName, encodeURIComponent(area), 12 * 60 * 60 * 1000);
    }

    // 异步加载地区
    function loadArea(callback) {
        var url = domainIP;
        var callback = typeof callback === 'function' ? callback : function () {};
        var ip = getQueryString(window.location.href, 'ip');// 用于测试ip

        if (ip) {
            url += '?ip=' + ip;
        } else if (getArea()) {
            callback();
            return;
        }

        ajax({
            url: url,
            success: function (res) {
                if (!res) {
                    callback();
                    return;
                }

                res = window.JSON.parse(res);

                if (res && res.pid > 0) {
                    setArea('{"id": ' + res.id + ', "pid": ' + res.pid + '}');// id市, pid省
                    customer.area = {id: res.id, pid: res.pid};
                }

                callback();
            },
            error: function () {
                callback();
            }
        });
    }

    // 匹配地区(根据IP匹配)
    function isArea(ids) {
        var area = getArea();

        if (!area) {
            return false;
        }

        if (!area.pid || !area.id) {
            return false;
        }

        if (contains(ids, area.pid) || contains(ids, area.id)) {
            return true;
        }

        return false;
    }

    // 设置疾病id
    function setDisease(id) {
        id = parseInt(id, 10) || null;
        customer.data.disease = id;
    }

    // 设置ask疾病id
    function setAskDisease(id) {
        id = parseInt(id, 10) || null;
        customer.data.askDisease = id;
    }

    // 设置科室id
    function setDepartment(id1, id2) {
        id1 = parseInt(id1, 10) || null;
        id2 = parseInt(id2, 10) || null;

        id1 && customer.data.department.push(id1);
        id2 && customer.data.department.push(id2);
    }

    // 设置医生id
    function setDoctor(ids) {
        if (!ids) {
            return;
        }

        var doctors = customer.data.doctors;

        if (typeof ids === 'string') {
            parseInt(ids, 10) && doctors.push(parseInt(ids, 10));
            return;
        }

        if (typeof ids === 'number') {
            doctors.push(ids);
            return;
        }

        if (ids instanceof Array) {
            for (var i = 0, len = ids.length; i < len; i++) {
                if (!contains(doctors, ids[i])) {
                    doctors.push(ids[i]);
                }
            }
        }
    }

    // 设置自定义标签
    function setCustom(tags) {
        if (!tags) {
            return;
        }

        var customs = customer.data.customs;

        if (typeof tags === 'string') {
            customs.push(tags);
            return;
        }

        if (tags instanceof Array) {
            for (var i = 0, len = tags.length; i < len; i++) {
                if (!contains(customs, tags[i])) {
                    customs.push(tags[i]);
                }
            }
        }
    }

    // 处理旧的广告配置数据
    function oldDataInit() {
        // ask 疾病 id
        if (!customer.data.askDisease) {
            setAskDisease(window.haomeitjyDiseaseId);
        }

        if (!customer.data.department.length) {
            var c1 = window.haomeitjyCategoryL1 && parseInt(window.haomeitjyCategoryL1, 10);
            var c2 = window.haomeitjyCategoryL2 && parseInt(window.haomeitjyCategoryL2, 10);

            setDepartment(c1 || null, c2 || null);
        }

        if (!customer.data.doctors.length && window.LiangChuangDoctorIds) {
            var ids = window.LiangChuangDoctorIds.split(',');
            var i = ids.length;
            var arr = [];

            while (i--) {
                arr.push(parseInt(ids[i], 10));
            }
            setDoctor(arr);
        }
    }

    function ready(callback) {
        oldDataInit();
        (typeof callback === 'function') && callback(customer);
    }

    // 处理广告(非联盟广告)
    function handle(options) {
        customer.place.append(getElements(customer.place.className));
        setCustomerId(options.cid);

        var box = getPlaceBox(options.pid);
        var customerUrl = getCustomerUrl(options.cid);
        var wrap = document.createElement('div');
        var mtp = null;

        if (!customer.place.mutiple[options.pid]) {
            customer.place.mutiple[options.pid] = {};
        }

        mtp = customer.place.mutiple[options.pid];
        mtp.total = mtp.total || options.total;// 广告总数(轮播或叠楼)
        mtp.arr = mtp.arr || [];// 广告数组(轮播或叠楼)
        mtp.cur = mtp.cur || 0;// 当前处理的广告(轮播或叠楼)

        if (!box) {
            // console.error('place not found.');
        }

        // 先排序后渲染轮播或叠楼广告
        var handleMutiple = function () {
            var list = mtp.arr.sort(function (a, b) {
                return a.order - b.order;
            });

            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i];

                item.wrap.appendChild(item.section);
                execScript(item.res, item.box);
                execStyle(item.res, item.box);
            }
        };

        var success = function (res) {
            var section = document.createElement('div');

            wrap.className = options.sectionWrapName || customer.place.sectionWrapName;
            section.className = options.className || customer.place.sectionName;
            section.innerHTML = res;

            options.displayType && setStyles(box, getDisplayStyles(options.displayType));
            options.styles && setStyles(box, options.styles);
            options.wrapStyles && setStyles(wrap, options.wrapStyles);
            options.sectionStyles && setStyles(wrap, options.sectionStyles);

            setTimeout(function () {
                renderCloseButton(box, options.styles);
            }, 500);

            var $wrap = getElements(wrap.className, box);

            if (!$wrap.length) {
                box.innerHTML = '';
                box.appendChild(wrap);
                renderPlaceDiyStyles(box, options.styles);
            } else {
                wrap = $wrap[0];
            }

            if (options.order != null) {
                mtp.arr.push({order: options.order, section: section, res: res, box: box, wrap: wrap});
                mtp.cur++;

                if (mtp.cur === mtp.total) {
                    handleMutiple();
                }
            } else {
                wrap.appendChild(section);
                execScript(res, box);
                execStyle(res, box);
            }
        };

        ajax({
            url: customerUrl,
            success: success,
            error: function () {
                // console.error('ajax error')
            }
        });

        return {box: box};
    }

    function getPlaceDiyStyles(styles) {
        if (!styles) {
            return null;
        }

        var parseStyles = function (str) {
            var options = str.split(';');
            var data = {};
            var i = options.length;

            try {
                while (i--) {
                    var arr = options[i].split(':');
                    data[trim(arr[0])] = trim(arr[1]).replace(/'/g, '');
                }
            } catch (e) {
                // console.error('diy styles error:' + e);
            }

            return data;
        };

        var getDiyStyles = function () {
            var arr = [];

            for (var key in styles) {
                if (key.substring(0, 1) === '_') {
                    arr.push({name: key, styles: parseStyles(styles[key])});
                }
            }

            return arr;
        };

        return getDiyStyles();
    }

    function getPlaceDiySettings(styles) {
        if (!styles || !styles.diy) {
            return null;
        }

        var options = styles.diy.split(',');
        var data = {};
        var i = options.length;

        try {
            while (i--) {
                var arr = options[i].split(':');
                data[trim(arr[0])] = trim(arr[1]);
            }
        } catch (e) {
            // console.error('diy styles settings error:' + e);
        }

        return data;
    }

    function renderPlaceDiyStyles(box, styles) {
        if (!box || !styles) {
            return;
        }

        var data = getPlaceDiyStyles(styles);

        var render = function (obj) {
            var ele = document.createElement('div');

            ele.className = obj.name;
            setStyles(ele, obj.styles);
            obj.styles._html && (ele.innerHTML = obj.styles._html);
            box.appendChild(ele);
        };

        for (var i = 0, len = data.length; i < len; i++) {
            render(data[i]);
        }
    }

    // 添加“广告”标识和关闭按钮
    function renderCloseButton(box, styles) {
        if (!box || !styles) {
            return;
        }

        var isClose;
        var isName;
        var isOut;
        var pos;
        var close;
        var radius;
        var obj = getPlaceDiySettings(styles);
        var height = 18;

        if (!obj) {
            return;
        }

        if (obj.isClose === 'true') {
            isClose = true;
        } else {
            isClose = false;
        }

        if (obj.isName === 'true') {
            isName = true;
        } else {
            isName = false;
        }

        if (obj.isOut === 'true') {
            isOut = true;
        } else {
            isOut = false;
        }

        pos = obj.position ? obj.position : 'right|bottom';

        close = document.createElement('a');
        close.innerHTML = (isClose ? 'X' : '') + ((isClose && isName) ? ' ' : '') + (isName ? '&#24191;&#21578;' : '');
        close.style.position = 'absolute';
        close.style.height = isMobile() ? '14px' : '18px';
        close.style.lineHeight = isMobile() ? '14px' : '18px';
        close.style.padding = isMobile() ? '1px 2px' : '0 5px';
        close.style.color = '#ccc';
        close.style.fontSize = isMobile() ? '10px' : '12px';
        close.style.cursor = 'pointer';
        close.style.background = '#bbb';

        switch (pos) {
            case 'left|top':
                radius = '0 0 4px 0';
                break;
            case 'left|bottom':
                radius = '0 4px 0 0';
                break;
            case 'right|top':
                radius = '0 0 0 4px';
                break;
            default:
                radius = '4px 0 0 0';
        }

        pos = pos.split('|');

        if (pos.length < 2) {
            pos[0] = 'right';
            pos[1] = 'bottom';
        }

        if (isOut) {
            close.style[pos[1]] = -height + 'px';
        } else {
            close.style[pos[1]] = 0;
        }

        close.style[pos[0]] = 0;
        box.appendChild(close);

        if (window.addEventListener) {
            !isOut && (close.style.borderRadius = radius);
            close.style.background = 'rgba(0,0,0,.5)';
        }

        if (isClose) {
            close.onclick = function () {
                box.style.display = 'none';
            };
        }

        if (box.style.position !== 'fixed' && box.style.position !== 'absolute') {
            box.style.position = 'relative';
        }
    }

    // 获取广告位div
    function getPlaceBox(placeId) {
        var pos = -1;
        var items = customer.place.items;
        var len = items.length;

        for (var i = 0; i < len; i++) {
            if (items[i].id === placeId) {
                pos = i;
                break;
            }
        }

        if (pos !== -1) {
            return customer.place.items[pos].box;
        }

        return null;
    }

    // 获取广告位里面的所有项
    function getPlaceSections(box, className) {
        className = className || customer.place.sectionName;

        return getElements(className, box);
    }

    // 添加广告到广告位
    function appendAd(list) {
        var ids = customer.place.ids;
        var items = customer.place.items;

        for (var i = 0, len = list.length; i < len; i++) {
            var item = list[i];
            var id = parseInt(item.getAttribute('data-id'), 10);

            if (!contains(ids, id)) {
                items.push({box: item, id: id});
                ids.push(id);
            }
        }
    }

    // 获取广告素材url
    function getCustomerUrl(id) {
        var str = id.toString();
        var fileName = 'customer' + id + '.html';
        var dir = '';
        var count = 9;

        if (str.length < count) {
            str = '000000000' + str;
        }

        str = substr(str, -count);
        dir = str.substring(0, 3) + '/' + str.substring(3, 6) + '/';

        return customer.baseUrl + dir + fileName;
    }

    // 获取广告位url
    function getPlaceUrl(id) {
        var str = id.toString();
        var fileName = 'ggw_' + id + '.js';
        var dir = '';
        var count = 9;

        if (str.length < count) {
            str = '000000000' + str;
        }

        str = substr(str, -count);
        dir = str.substring(3, 6) + '/';

        return customer.placeUrl + dir + fileName;
    }

    // 设置广告id
    function setCustomerId(cid) {
        if (!contains(customer.ids, cid)) {
            customer.ids.push(cid);
        }
    }

    // 记录广告展示数量
    function recordPv() {
        var aps = customer.ids.join(',');// 广告id
        var pps = customer.place.ids.join(',');// 广告位id
        var params = '';
        var count = 10;
        var timer = null;

        var send = function () {
            params = customer.statis.ap + '=' + aps + '&' + customer.statis.apd + '=' + pps;

            getScript(customer.statis.url + '?' + params);
        };

        if (aps || pps) {
            send();
        }
    }

    // 加载js
    function getScript(url, options) {
        var head = document.getElementsByTagName('head')[0];
        var js = document.createElement('script');
        var isLoaded = false;

        options = options || {};
        options.success = options.success || function () {};
        options.error = options.error || function () {};

        js.type = 'text/javascript';
        js.src = url;
        head.appendChild(js);

        js.onreadystatechange = function () {
            if (isLoaded) {
                return;
            }

            if (js.readyState === 'loaded' || js.readyState === 'complete') {
                isLoaded = true;
                options.success();
            }
        };

        js.onload = function () {
            if (isLoaded) {
                return;
            }

            isLoaded = true;
            options.success();
        };

        js.onerror = function () {
            options.error();
        };
    }

    function ajax(options) {
        var defaults = {
            url: '',
            params: '',
            success: function () {},
            error: function () {},
            complete: function () {}
        };

        extend(defaults, options);

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var status = xhr.status;

                if (status >= 200 && status < 300 || status === 304) {
                    defaults.success(xhr.responseText, status, xhr);
                } else {
                    defaults.error(status, xhr);
                }
            }

            defaults.complete(xhr);
        };

        if (defaults.params) {
            defaults.url = defaults.url.indexOf('?') !== -1 ? (defaults.url + '&') : (defaults.url + '?');
        }

        xhr.open('GET', defaults.url + defaults.params, true);
        xhr.send(null);

        return xhr;
    }

    // 执行js代码
    function execScript(str, context) {
        var script = document.createElement('script');
        var exp = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
        var match = exp.exec(str);
        var scriptText = '';

        if (!match || !match[1]) {
            return;
        }

        scriptText = match[1];
        script.type = 'text/javascript';

        try {
            script.appendChild(document.createTextNode(scriptText));
        } catch (ex) {
            script.text = scriptText;
        }

        context = context || document.body;
        context.appendChild(script);
    }

    // 执行css代码
    function execStyle(str, context) {
        var style = document.createElement('style');
        var exp = /<style\b[^>]*>([\s\S]*?)<\/style>/gm;
        var match = exp.exec(str);
        var styleText = '';

        if (!match || !match[1]) {
            return;
        }

        styleText = match[1];
        style.type = 'text/css';

        try {
            style.appendChild(document.createTextNode(styleText));
        } catch (ex) {
            style.styleSheet.cssText = styleText;
        }

        context = context || document.body;
        context.appendChild(style);
    }

    // 加载并继续js代码
    function loadJsExec(url, context) {
        var script = document.createElement('script');

        context = context || document.body;
        script.type = 'text/javascript';
        script.src = url;
        context.appendChild(script);
    }

    // 获取节点集合
    function getElements(className, context) {
        var list = [];

        context = context || document;

        if (context.querySelectorAll) {
            list = context.querySelectorAll('.' + className);
        } else if (!!window.jQuery) {
            jQuery(context).find('.' + className).each(function () {
                list.push(this);
            });
        } else {
            var arr = [];

            arr = context.getElementsByTagName('div');

            for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i];

                if (item.className.indexOf(className) !== -1) {
                    list.push(item);
                }
            }
        }

        return list;
    }

    function extend(a, b, deep) {
        for (var i in b) {
            if (deep && typeof b[i] === 'object' && b[i] !== null) {
                a[i] = a[i] || {};
                arguments.callee(a[i], b[i]);
            } else {
                if (b.hasOwnProperty(i)) {
                    a[i] = b[i];
                }
            }
        }
        return a;
    }

    // 判断元素是否存在
    function contains(arr, val) {
        var i = arr.length;

        while (i--) {
            if (arr[i] === val) {
                return true;
            }
        }

        return false;
    }

    // 设置样式
    function setStyles(elem, styles) {
        for (var key in styles) {
            if (key.substring(0, 1) !== '_' || key !== 'diy') {
                elem.style[key] = styles[key];
            }
        }
    }

    // 通过key获取值
    function getValueByKey(arr, key) {
        if (!arr || !key) {
            return null;
        }

        key = key.toString();

        for (var i = 0, len = arr.length; i < len; i++) {
            for (var m in arr[i]) {
                if (m === key) {
                    return arr[i][m];
                }
            }
        }

        return null;
    }

    // 轮播插件
    function slider(options) {
        var defaults = {
            box: null,
            items: null,
            auto: true,
            slider: true,
            duration: 3,
            width: 'auto',
            height: 'auto',
            styles: {}
        };
        var timer = null;
        var current = 0;
        var $current = null;
        var total = 0;

        extend(defaults, options);
        defaults.box.style.width = defaults.width;
        defaults.box.style.height = defaults.height;

        if (!defaults.items) {
            defaults.items = getPlaceSections(defaults.box);
        }

        if (defaults.items.length < 2) {
            return;
        }

        total = defaults.items.length;
        $current = defaults.items[current];

        if (defaults.slider) {
            for (var i = 0; i < total; i++) {
                if (i > 0) {
                    defaults.items[i].style.display = 'none';
                }
            }
        }

        if (defaults.slider && defaults.auto) {
            setTimeout(scroll, defaults.duration * 1000);

            defaults.box.onmouseover = function () {
                clearInterval(timer);
            };

            defaults.box.onmouseout = scroll;
        }

        function scroll() {
            clearInterval(timer);

            timer = setInterval(function () {
                if (current >= total - 1) {
                    current = -1;
                }

                current++;
                defaults.items[current].style.display = 'block';
                $current.style.display = 'none';
                $current = defaults.items[current];

            }, defaults.duration * 1000);
        }
    }

    // 启动轮播 或 列表广告
    function mutiple(options) {
        var list = options.list;
        var box = null;
        var ids = [];// 要显示的广告id数组(权重最高)

        if (!list.length) {
            return;
        }

        var getMaxLevelIndex = function () {
            var index = -1;
            var max = null;
            var i = list.length;

            while (i--) {
                if (!max || list[i].level > max) {
                    if (list[i].ids.length) {
                        max = list[i].level;
                        index = i;
                    }
                }
            }

            return index;
        };

        // 渲染水平排列的广告
        var renderHorizontal = function () {
            var sections = getElements(customer.place.sectionName, box);
            var len = sections.length;
            var wrap = sections[0].parentNode;
            var width = Math.floor(box.scrollWidth / len) + 'px';

            wrap.style.overflow = 'hidden';

            if (customer.support.flex()) {
                wrap.style.display = '-webkit-flex';
                wrap.style.display = 'flex';
                wrap.style.alignItems = 'stretch';
                wrap.style.textAlign = 'center';
            }

            for (var i = 0; i < len; i++) {
                sections[i].style.width = width;

                if (customer.support.flex()) {
                    sections[i].style.flex = 1;
                    sections[i].style.webkitFlex = 1;
                } else {
                    sections[i].style.float = 'left';
                }
            }
        };

        var initNormal = function (callback) {
            var index = getMaxLevelIndex();// 获取最高权重的广告

            if (index === -1) {
                return;
            }

            ids = list[index].ids;

            for (var i = 0, len = ids.length; i < len; i++) {
                var obj = handle({pid: options.pid, cid: ids[i], order: i, total: len});
                box = obj.box;
            }

            options.box = box;

            delay(callback, 500);
        };

        initNormal(function () {
            if (ids.length) {
                if (options.type && options.type === 'slider') {
                    options.slider = true;
                }

                if (options.slider) {
                    slider(options);
                }

                if (ids.length > 1 && options.type && options.type === 'horizontal') {
                    renderHorizontal();
                }
            }

            setStyles(box, options.styles);
            renderPlaceDiyStyles(box, options.styles);
            renderCloseButton(box, options.styles);
        });
    }

    // 延迟函数
    function delay(fn, milliscond) {
        if (!fn) {
            return;
        }

        milliscond = milliscond || 0;

        setTimeout(function () {
            (typeof fn === 'function') && fn();
        }, milliscond);
    }

    // 获取要显示的样式
    function getDisplayStyles(type) {
        var style = {position: 'fixed', zIndex: 200, background: 'white'};

        switch (type) {
            case 'top':
                style.top = 0;
                style.left = 0;
                style.right = 0;
                style.width = '100%';
                break;
            case 'bottom':
                style.bottom = 0;
                style.left = 0;
                style.right = 0;
                style.width = '100%';
                break;
            case 'leftTop':
                style.top = '30px';
                style.left = '30px';
                break;
            case 'rightTop':
                style.top = '30px';
                style.right = '30px';
                break;
            case 'leftBottom':
                style.bottom = '30px';
                style.left = '30px';
                break;
            case 'rightBottom':
                style.bottom = '30px';
                style.right = '30px';
                break;
            default:
                style = {};
        }

        return style;
    }

    // 判断是否移动端
    function isMobile() {
        var isMob = /android|iphone|ipad|ipod|windows phone/i.test(window.navigator.userAgent);

        isMobile = function () {
            return isMob;
        };

        return isMob;
    }

    // 字符串截图
    function substr(str, start, len) {
        if (start < 0) {
            start = str.length + start;
        }

        return str.substr(start, len);
    }

    function trim(str) {
        if (!str) {
            return '';
        }

        if (String.prototype.trim) {
            return str.trim();
        }

        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

    function getQueryString(url, name) {
        var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i');

        if (reg.test(url)) {
            return decodeURIComponent(RegExp.$2.replace(/\+/g, ' '));
        }

        return '';
    }

    function supportFlex() {
        var div = document.createElement('div');
        var support = ('-webkit-flex' in div.style || 'flex' in div.style);

        customer.support.flex = function () {
            return support;
        };

        return support;
    }

    function mipAdd(str, pid) {
        var arr1 = str.split('//');
        var str1 = arr1.length > 1 ? arr1[1] : '';
        var str2 = str1.split('.js')[0];
        var arr2 = str2.split('/');

        if (arr2.length < 2) {
            // console.warn('baidu union string error');
            return;
        }

        customer.data.mips.push({pid: pid, domain: arr2[0], token: arr2[1]});
    }

    function mipGet(pid) {
        if (!customer.data.mips.length) {
            return null;
        }

        var mips = customer.data.mips;

        for (var i = 0, len = mips.length; i < len; i++) {
            if (pid === mips[i].pid) {
                return mips[i];
            }
        }

        return null;
    }

    window.CUSTOMER = customer;

    (function (win, doc, customer) {
        customer = win.CUSTOMER;
        var isRecord = false;
        var total = 100;
        var record = function (ms) {
            if (isRecord) {
                return;
            }

            isRecord = true;

            var count = customer.getElements(customer.place.className).length;

            var timer = setInterval(function () {
                if (customer.ids.length >= count) {
                    clearInterval(timer);
                    customer.statis.record();
                }

                if (!total--) {
                    clearInterval(timer);
                    customer.statis.record();
                }
            }, ms || 50);
        };

        if (document.readyState !== 'loading') {
            record();
        } else if (window.addEventListener) {
            window.addEventListener('DOMContentLoaded', record);
        }
    })(window, document);

    var render = function (that, me, domain, token) {

        var self = that;

        if (domain && token) {

            var script = document.createElement('script');
            script.src = document.location.protocol + '//' + domain + '/' + token + '.js';
            document.body.appendChild(script);

            var fixedElement = require('fixed-element');
            var layer = fixedElement._fixedLayer;
            var child = document.getElementById(token);

            child.addEventListener('DOMSubtreeModified', function (e) {
                var elem = window.getComputedStyle(child, null);
                var pos = elem && elem.getPropertyValue('position') ? elem.getPropertyValue('position') : '';
                if (layer && layer.querySelector('#' + token)) {
                    return;
                }
                if (pos === 'fixed' && layer) {
                    var idx = document.querySelectorAll('mip-fixed').length;
                    var data = {
                        element: child.parentElement,
                        id: 'Fixed' + idx
                    };
                    fixedElement.moveToFixedLayer(data, parseInt(idx, 10));
                }
            }, false);

        } else {
            // console.error('请输入正确的 domain 或者 token');
        }
    };

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var me = this;
        var ele = this.element;
        var id = parseInt(ele.getAttribute('data-id'), 10);
        var div = document.createElement('div');
        var url = window.CUSTOMER.getPlaceUrl(id);

        window.CUSTOMER.getScript(url, {
            success: function () {
                var mipad = window.CUSTOMER.mipGet(id);

                if (mipad) {
                    try {
                        div.id = mipad.token;
                        ele.appendChild(div);
                        ele.classList.add('mip-adbd');
                        render(ele, me, mipad.domain, mipad.token);
                    } catch (e) {}
                }
            }
        });
    };

    return customElement;
});
