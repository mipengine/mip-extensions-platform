/**
 * @file mip-pcgroup-commentshow 组件
 * @author xuhuanlin
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var cindex = 0;
    var nowUrl = location.href;

    // 表情配置
    var faces = {
        url: '//www.pconline.com.cn/images/comment/face',
        hz: '.gif',
        name: ['[嘻嘻]', '[酷]', '[汗]', '[鄙视]', '[阴险]', '[强]', '[弱]', '[花]', '[便便]', '[亲]'],
        code: ['{201}', '{202}', '{203}', '{204}', '{205}', '{206}', '{207}', '{208}', '{209}', '{210}'],
        nameAuto: ['[微笑]', '[撇嘴]', '[色]', '[发呆]', '[得意]', '[流泪]', '[害羞]', '[闭嘴]', '[睡]',
                '[大哭]', '[尴尬]', '[发怒]', '[调皮]', '[呲牙]', '[惊讶]', '[难过]', '[酷]', '[冷汗]',
                '[抓狂]', '[吐]', '[偷笑]', '[可爱]', '[白眼]', '[傲慢]', '[饿]', '[困]', '[惊恐]', '[流汗]',
                '[憨笑]', '[大兵]', '[奋斗]', '[咒骂]', '[疑问]', '[嘘]', '[晕]', '[衰]', '[骷髅]', '[敲打]',
                '[再见]', '[擦汗]', '[抠鼻]', '[鼓掌]', '[糗大了]', '[坏笑]', '[左哼哼]', '[右哼哼]', '[哈欠]',
                '[鄙视]', '[委屈]', '[快哭了]', '[阴险]', '[亲亲]', '[吓]', '[可怜]', '[示爱]', '[菜刀]',
                '[啤酒]', '[咖啡]', '[饭]', '[猪头]', '[玫瑰]', '[凋谢]', '[爱心]', '[心碎]', '[蛋糕]', '[闪电]',
                '[炸弹]', '[便便]', '[月亮]', '[太阳]', '[礼物]', '[拥抱]', '[强]', '[弱]', '[握手]', '[胜利]',
                '[抱拳]', '[勾引]', '[拳头]', '[差劲]', '[爱你]', '[no]'],
        codeAuto: ['{3001}', '{3002}', '{3003}', '{3004}', '{3005}', '{3006}', '{3007}', '{3008}', '{3009}',
                '{3010}', '{3011}', '{3012}', '{3013}', '{3014}', '{3015}', '{3016}', '{3017}', '{3018}', '{3019}',
                '{3020}', '{3021}', '{3022}', '{3023}', '{3024}', '{3025}', '{3026}', '{3027}', '{3028}', '{3029}',
                '{3030}', '{3031}', '{3032}', '{3033}', '{3034}', '{3035}', '{3036}', '{3037}', '{3038}', '{3039}',
                '{3040}', '{3041}', '{3042}', '{3043}', '{3044}', '{3045}', '{3046}', '{3047}', '{3048}', '{3049}',
                '{3050}', '{3051}', '{3052}', '{3053}', '{3054}', '{3055}', '{3056}', '{3057}', '{3058}', '{3059}',
                '{3060}', '{3061}', '{3062}', '{3063}', '{3064}', '{3065}', '{3066}', '{3067}', '{3068}', '{3069}',
                '{3070}', '{3071}', '{3072}', '{3073}', '{3074}', '{3075}', '{3076}', '{3077}', '{3078}', '{3079}',
                '{3080}', '{3081}', '{3082}']
    };
    var comment = {
        ipJson: '//whois.pconline.com.cn/ipJson.jsp', // 获取城市
        cookieName: 'mip_pcgroup_areaciyty',
        cookieUser: 'common_session_id',
        domain: '',
        area: '广东省广州市',
        zIndex: 0, // 层级
        config: [],
        isWX: false, // 是否微信浏览器
        client: 6, // 7是微信,6是wap
        userId: '00000000', // 空的用户名
        head: '',
        nickName: '',
        fixConfig: {
            cmtaction: '//cmt.{{domain}}/action/comment/list_new_json.jsp?', // 获取评论
            cmtUrl: '//cmt.{{domain}}/action/comment/create.jsp?', // 发布评论
            voteUrl: '//cmt.{{domain}}/action/comment/support.jsp', // 顶按钮
            yzmPic: '//captcha.{{domain}}/captcha/v.jpg?', // 验证码接口
            pageNo: 1, // 当前分页页码
            pageSize: 5, // 每页返回数据的条数
            pageLoad: false, // 防止多次请求数据的开关
            domain: '', // 当前组件的域名
            pageUrl: '', // 当前组件评论的url
            pageTitle: '', // 当前组件评论的title
            showUser: false, // 是否已经显示用户信息
            needCaptcha: false // 是否需要验证码
        },

        // 登录地址
        loginUrl: {
            pconline: '//g.pconline.com.cn/x/login/?return=' + nowUrl,
            pcauto: '//m.pcauto.com.cn/my/passport/mobileLogin.jsp?return=' + nowUrl,
            pcbaby: '//m.pcbaby.com.cn/x/login/?return=' + nowUrl,
            pclady: '//g.pclady.com.cn/x/login/?return=' + nowUrl,
            pchouse: '//m.pchouse.com.cn/x/login/?return=' + nowUrl,
            geeknev: '//my.geeknev.com/my/passport/login.jsp?return=' + nowUrl
        },

        /**
        *   退出url
        *
        *   @param {string} site 网站标注
        *   @return {string} 返回退出地址
        *
        */
        logoutStr: function (site) {
            var domain = site + '.com.cn';
            if (site === 'geeknev') {
                domain = site + '.com';
            }

            var url = '//passport3.' + domain + '/passport3/passport/logout_b.jsp?';
            url += 'return=http://www1.pconline.com.cn/public/mip/jump/jump.html' + encodeURIComponent('?ret=' + nowUrl.split('?')[0]);
            return url;
        },

        logoutUrl: {
            pconline: '',
            pcauto: '',
            pcbaby: '',
            pclady: '',
            pchouse: '',
            geeknev: ''
        },

        /**
        *   表情的配置，url（表情url）、hz(表情后缀)、name(表情显示的中文名)、code(表情对应的提交字符)
        */
        faces: {
            url: {
                pconline: faces.url,
                pcauto: faces.url,
                pcbaby: faces.url,
                pclady: faces.url,
                pchouse: faces.url,
                geeknev: faces.url
            },
            hz: {
                pconline: faces.hz,
                pcauto: faces.hz,
                pcbaby: faces.hz,
                pclady: faces.hz,
                pchouse: faces.hz,
                geeknev: faces.hz
            },
            name: {
                pconline: faces.name,
                pcauto: faces.nameAuto,
                pclady: faces.name,
                pcbaby: faces.name,
                pchouse: faces.name,
                geeknev: faces.nameAuto
            },
            code: {
                pconline: faces.code,
                pcauto: faces.codeAuto,
                pclady: faces.code,
                pcbaby: faces.code,
                pchouse: faces.code,
                geeknev: faces.codeAuto
            }
        },

        /**
        *   同步json
        *
        *   @param {Object} obj1 宿主json
        *   @param {Object} obj2 要同步的json
        *
        */
        extend: function (obj1, obj2) {
            var attr;
            for (attr in obj2) {
                if (obj2.hasOwnProperty(attr)) {
                    obj1[attr] = obj2[attr];
                }
            }
        },

        /**
        *   显示
        *
        *   @param {Object} obj 当前显示的js原生对象
        *
        */
        show: function (obj) {
            obj.style.display = 'block';
        },

        /**
        *   隐藏
        *
        *   @param {Object} obj 当前隐藏的js原生对象
        *
        */
        hide: function (obj) {
            obj.style.display = 'none';
        },

        /**
        *   表情字符转换成符合的字符
        *
        *   @param {string} str 当前遍历对象
        *   @param {num} index 页面多个组件时，用来区分的。
        *   @return {string} 返回替换好的字符
        *
        */
        translateFace: function (str, index) {
            var t = this;
            var c = t.config[index];
            var code = t.faces.code[c.site];
            var name = t.faces.name[c.site];
            var p;
            for (var i = code.length - 1; i >= 0; i--) {
                p = new RegExp(name[i].replace('[', '\\[').replace(']', '\\]'), 'gm');
                str = str.replace(p, code[i]);
            }
            return str;
        },

        /**
        *   匹配当前对象是不是包含指定样式名
        *
        *   @param {Object} ele 当前遍历对象
        *   @param {string} selector 样式名
        *   @return {string} 返回true或false
        *
        */
        matchSelector: function (ele, selector) {
            if (selector.charAt(0) === '#') {
                return ele.id === selector.slice(1);
            }
            if (selector.charAt(0) === '.') {
                return (' ' + ele.className + ' ').indexOf(' ' + selector.slice(1) + ' ') !== -1;
            }
            return ele.tagName.toLowerCase() === selector.toLowerCase();
        },

        /**
        *   遍历父及dom，找到指定样式名的就返回
        *
        *   @param {Object} ele 当前点击按钮对象
        *   @param {string} selector 样式名
        *   @return {Object} 返回匹配到的对象
        *
        */
        closest: function (ele, selector) {
            var t = this;
            var result;
            var tmp = ele.parentNode;
            while (tmp) {
                if (t.matchSelector(tmp, selector)) {
                    result = tmp;
                    break;
                }
                tmp = tmp.parentNode;
            }
            return result;
        },

        /**
        *   在textarea插入
        *
        *   @param {Object} obj textarea回复框对象
        *   @param {string} str 要在光标里插入的字符
        *
        */
        insertText: function (obj, str) {
            if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                var startPos = obj.selectionStart;
                var endPos = obj.selectionEnd;
                var cursorPos = startPos;
                var tmpStr = obj.value;
                obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
                cursorPos += str.length;
                obj.selectionStart = obj.selectionEnd = cursorPos;
            }
            else {
                obj.value += str;
            }
        },

        // 光标移到最后
        moveEnd: function (obj) {
            obj.focus();
            var len = obj.value.length;
            if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                obj.selectionStart = obj.selectionEnd = len;
            }
        },

        /**
        *   转码
        *
        *   @param {json} data 传进来的json对象
        *   @return {json} 返回对指定字段的转码
        *
        */
        encodeDataValue: function (data) {
            var ls = ['title', 'username', 'area', 'content'];
            for (var i in data) {
                if (ls.indexOf(i) !== -1) {
                    data[i] = encodeURIComponent(encodeURIComponent(data[i]));
                }
            }
            return data;
        },

        /**
        *   格式化数据
        *
        *   @param {json} obj 传进来的json对象
        *   @return {string} 返回url的&字符串
        *
        */
        serialize: function (obj) {
            var ret = [];
            var i;
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    ret.push('' + i + '=' + obj[i]);
                }
            }
            return ret.join('&');
        },

        /**
        *   获取cookie
        *
        *   @param {string} cname cookie名
        *   @return {string} 返回cookie值，没有返回null
        *
        */
        getCookie: function (cname) {
            cname = encodeURIComponent(cname);
            var allCookie = document.cookie.split(';');
            var tempCookie = '';
            var cookieName = '';
            var cookValue = '';
            var cookieFound = false;
            var i = '';
            var len = allCookie.length;
            for (i = 0; i < len; i++) {
                tempCookie = allCookie[i].split('=');
                cookieName = tempCookie[0].replace(/^\s+|\s+$/g, '');
                if (cookieName === cname) {
                    cookieFound = true;
                    if (tempCookie.length > 1) {
                        cookValue = decodeURIComponent(tempCookie[1].replace(/^\s+|\s+$/g, ''));
                    }
                    return cookValue;
                }

                tempCookie = null;
                cookieName = '';
            }
            if (!cookieFound) {
                return null;
            }
        },

        /**
        *   写入cookie
        *
        *   @param {string} name cookie名
        *   @param {string} value cookie值
        *   @param {num} expires cookie过期时间
        *   @param {string} path cookie路径
        *   @param {string} domain cookie域名
        *   @param {string} secure cookie来源
        *
        */
        setCookie: function (name, value, expires, path, domain, secure) {
            var today = new Date();
            today.setTime(today.getTime());
            if (expires) {
                expires = expires * 1000 * 60 * 60 * 24;
            }
            var experDay = new Date(today.getTime() + (expires));
            document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
            + ((expires) ? ';expires=' + experDay.toGMTString() : '')
            + ((path) ? ';path=' + path : '')
            + ((domain) ? ';domain=' + domain : '')
            + ((secure) ? ';secure' : '');
        },

        // 保证登录后只执行一次
        showUserStatus: false,

        /**
        *   显示用户昵称
        *
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        showUser: function (index) {
            var t = this;
            var c = t.config[index];
            var u = window.PCGROUND_USER_INFO;

            if (c.showUser) {
                return;
            }

            if (u && u.id > 0) {
                var html = '欢迎你，<a class="">' + u.nickName + '</a> | ';
                html += '<a href="' + t.logoutUrl[c.site] + '" class="m-cmt-loginout">退出</a>';
                c.cmtUser.innerHTML = html;
                c.showUser = true;
                c.cmtLoginout = c.element.querySelector('.m-cmt-loginout');
            }
        },

        /**
        *   检查用户是否登录，依赖mip-pcgroup-user组件
        *
        *   @param {num} index 页面多个组件时，用来区分的。
        *   @return {boolean} 返回true或false
        *
        */
        checkLogin: function (index) {
            var t = this;
            var u = window.PCGROUND_USER_INFO;
            if (u && u.id > 0) {
                t.userId = u.id;
                t.head = u.head;
                t.nickName = u.nickName;
                t.showUser(index);
                return true;
            }

            return false;
        },

        // 提示弹窗js原生对象，保存起来，方便调用。
        toastObg: null,

        // 提示弹窗定时器，防止多个触发是只执行最后一个。
        toastTimer: null,

        /**
        *   当前组件的提示弹窗简易方法
        *
        *   @param {string} str 提示的文字内容。
        *   @param {num} index 页面多个组件时，用来区分的。
        *   @param {num} time 弹窗保留显示的时间，默认是1秒。
        *   @param {Object} fn 弹窗结束后的回调。
        *
        */
        toast: function (str, index, time, fn) {
            if (!str) {
                return;
            }

            var t = this;
            var obj = t.config[index];

            time = time || 1000;

            t.zIndex++;
            obj.element.style.zIndex = t.zIndex;

            obj.toastObg.innerHTML = '<span>' + str + '</span>';
            obj.toastObg.style.display = 'block';

            clearTimeout(t.toastTimer);
            t.toastTimer = setTimeout(function () {
                obj.toastObg.innerHTML = '';
                obj.toastObg.style.display = 'none';
                fn && fn();
            }, time);

        },

        // 检查是不是微信浏览器
        checkWx: function () {
            var ua = navigator.userAgent.toLowerCase();
            this.isWX = /micromessenger/i.test(ua);
            this.client = /micromessenger/i.test(ua) ? 7 : 6;
        },

        /**
        *   通过接口获取当前城市
        */
        getArea: function () {
            var t = this;
            var str = '';

            t.domain = document.domain;

            if (t.getCookie(t.cookieName)) {
                t.area = t.getCookie(t.cookieName);
            }
            else {
                fetchJsonp(t.ipJson, {
                    jsonpCallback: 'callback',
                    jsonpCallbackFunction: 'callback'
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    if (data.pro === data.city) {
                        str = data.city;
                    }
                    else {
                        str = data.pro + data.city;
                    }

                    t.setCookie(t.cookieName, str, 90, '/', t.domain);
                    t.area = str;
                });
            }
        },

        // 当前点击回复按钮的父级（多级），保存起来
        bindItem: null,

        // 当前点击回复按钮，保存起来
        bindObj: null,

        /**
        *   回复按钮点击后执行的方法
        *
        *   @param {Object} obj 表情显示和隐藏的js原生对象。
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        bindFeedback: function (obj, index) {
            var t = this;
            var item;
            var metaData;
            var c = t.config[index];
            var cpost = c.cmtPost;

            if (!t.checkLogin(index)) {
                t.toast('请先登录', index, 1000, function () {
                    window.location.href = t.loginUrl[c.site];
                });
            }
            else {
                item = t.closest(obj, '.m-cmt-list-item');
                if (!item) {
                    return;
                }

                metaData = item.getAttribute('data-meta').split(',');

                if (cpost.parentNode === item) {
                    if (obj.innerHTML === '回复') {
                        obj.innerHTML = '收起';
                        t.show(cpost);
                        c.cmtTextarea.placeholder = '回复' + metaData[0] + '楼（' + metaData[1] + '）：';
                    }
                    else {
                        obj.innerHTML = '回复';
                        t.hide(cpost);
                    }
                }
                else {
                    if (t.bindObj) {
                        t.bindObj.innerHTML = '回复';
                    }

                    obj.innerHTML = '收起';
                    item.insertBefore(cpost, item.querySelector('.m-cmt-list-other'));
                    t.show(cpost);
                    c.cmtTextarea.placeholder = '回复' + metaData[0] + '楼（' + metaData[1] + '）：';
                }

                t.bindObj = obj;
                t.bindItem = item;
            }
        },

        /**
        *   顶按钮点击后执行的方法
        *
        *   @param {Object} obj 表情显示和隐藏的js原生对象。
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        bindDing: function (obj, index) {
            var t = this;
            var c = t.config[index];
            var url = c.voteUrl;
            var html = '';

            if (!obj.getAttribute('data-id')) {
                return;
            }

            url += '?cid=' + obj.getAttribute('data-id') + '&sp=2&version=2&r=' + Math.random();

            fetchJsonp(url, {
                jsonpCallback: 'callback',
                jsonpCallbackFunction: 'support' + index
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.code === 1) {
                    html = obj.innerHTML;
                    html = html.split('(')[1].split(')')[0];
                    obj.innerHTML = '顶(' + (parseInt(html, 10) + 1) + ')';
                }
                else {
                    t.toast(data.msg, index);
                }
            });

        },

        /**
        *   表情框的显示和隐藏
        *
        *   @param {Object} obj 表情显示和隐藏的js原生对象。
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        bindFace: function (obj, index) {
            var t = this;
            var c = t.config[index];
            if (c.cmtFacebox.style.display === 'block') {
                c.cmtFacebox.style.display = 'none';
            }
            else {
                c.cmtFacebox.style.display = 'block';
            }
        },

        /**
        *   点击表情后输入textarea框
        *
        *   @param {Object} obj 当前点击表情的js原生对象。
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        bindFacein: function (obj, index) {
            var t = this;
            var c = t.config[index];
            if (obj.title) {
                t.insertText(c.cmtTextarea, obj.title);
                t.moveEnd(c.cmtTextarea);
            }
        },

        /**
        *   需要验证码是进行操作
        *
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        bindYzm: function (index) {
            var t = this;
            var c = t.config[index];

            c.needCaptcha = true;
            t.show(c.cmtYzm);
            c.cmtYzmpic.src = c.yzmPic + new Date().getTime();
            c.cmtYzminp.value = '';
        },

        /**
        *   回复提交成功后执行
        *
        *   @param {json} data 提交回复后的json状态。
        *   @param {num} index 页面多个组件时，用来区分的。
        *   @param {Object} fn 回调函数。
        *
        */
        bindSumbitDone: function (data, index, fn) {
            var t = this;
            var c = t.config[index];
            // 成功
            if (data.resultCode >= 0) {
                // 插入内容
                t.prependNewComment(data, index);

                // 提交后清除已经发表的评论数据
                c.cmtTextarea.value = '';
                c.cmtYzminp.value = '';

                // 收起回复框
                t.bindFeedback(t.bindObj, index);

                // 回到评论顶部
                window.scrollTo(0, c.element.offsetTop);
            }
            else {
                // 要验证码
                if (data.resultCode === -9 || data.commentCount > 5) {
                    t.bindYzm(index);
                }

                t.toast(data.resultMsg, index);
            }

            fn && fn();
        },

        // 防止回复按钮多次提交的开关
        bindSumbitStatus: false,

        /**
        *   点击回复后执行
        *
        *   @param {Object} obj 点击提交按钮的js原生对象，可以对其进行相关操作。
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        bindSumbit: function (obj, index) {
            var t = this;

            if (t.bindSumbitStatus) {
                return;
            }

            var c = t.config[index];
            var metaData = t.bindItem.getAttribute('data-meta').split(',');
            var u = window.PCGROUND_USER_INFO;

            if (!c.cmtTextarea.value) {
                t.toast('请输入回复内容', index);
                return;
            }

            // 获取数据
            var ret = {
                isEncode: 1,
                encodeHtml: 1, // 对输入的html标签进行编码
                windowname: 0,
                url: c.pageUrl,
                title: c.pageTitle,
                id: c.cmtTid || '',
                username: u && u.id > 0 ? u.nickName : t.area + '网友',
                needCaptcha: c.needCaptcha,
                client: t.isWX ? 7 : 6,
                captcha: c.cmtYzminp.value.trim(),
                replyFloor2: metaData[0],
                content: t.translateFace(c.cmtTextarea.value.trim(), index)
            };

            if (ret.content.length > 500) {
                t.toast('评论内容字数不能超过500！', index);
                return;
            }

            if (c.needCaptcha && c.cmtYzminp.value === '') {
                t.toast('请填写验证码。', index);
                return;
            }

            // 转码
            ret = t.encodeDataValue(ret);
            // 格式化
            ret = t.serialize(ret);

            t.bindSumbitStatus = true;

            fetchJsonp(c.cmtUrl + ret, {
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                t.bindSumbitDone(data, index, function () {
                    t.bindSumbitStatus = false;
                });
            });
        },

        /**
        *   绑定事件，用了事件委托
        *
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        bind: function (index) {
            var t = this;
            var c = t.config[index];
            var ele = c.element;

            ele.addEventListener('click', function (ev) {
                ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                var nodeName = target.nodeName.toLowerCase();
                var className = target.className;
                if (nodeName === 'a') {
                    // 捕捉顶按钮
                    if (className === 'm-cmt-list-item-ding') {
                        t.bindDing(target, index);
                    }

                    // 捕捉回复按钮
                    if (className === 'm-cmt-list-item-repost') {
                        t.bindFeedback(target, index);
                    }
                }

                if (nodeName === 'span') {
                    // 捕捉表情按钮
                    if (className === 'm-cmt-post-face-btn') {
                        t.bindFace(target, index);
                    }
                }

                if (nodeName === 'img') {
                    // 捕捉表情按钮
                    if (className === 'm-cmt-facegif') {
                        t.bindFacein(target, index);
                    }
                }

                if (nodeName === 'input') {
                    // 捕捉回复按钮
                    if (className === 'm-cmt-post-btn') {
                        t.bindSumbit(target, index);
                    }
                }
            });

            // 获取城市
            t.getArea();

            // 判断是不是微信
            t.checkWx();

            // 绑定加载更多
            c.listMore.addEventListener('click', function () {
                c.listMore.innerHTML = '加载中...';
                c.pageNo = c.pageNo + 1;
                t.getInfo(index, function (n) {
                    c.listMore.innerHTML = '再加载' + n + '条';
                });
            });

            // 绑定表情
            // 通过code和name生成html
            var str = '';
            var code = t.faces.code[c.site];
            var name = t.faces.name[c.site];
            var url = t.faces.url[c.site];
            var hz = t.faces.hz[c.site];
            var i = 0;
            var n = code.length;

            for (i = 0; i < n; i++) {
                str += '<img class="m-cmt-facegif" title="' + name[i] + '" ';
                str += 'src="' + url + code[i].replace('{', '').replace('}', '') + hz + '" />';
            }

            str += '<div class="m-cmt-clearfix"></div>';

            c.cmtFacebox.innerHTML = str;

            // 登录后显示呢称,延迟一点，避免另外一个组件没同步到
            t.showUser(index);
        },

        /**
        *   获取data传过来楼层的内容
        *
        *   @param {Json} data 获取内容传过来的data
        *   @param {num} index 页面多个组件时，用来区分的。
        *   @return {html} 返回组装好的html bindItem 是当前点击回复按钮的父级（多层）
        *
        */
        createReplay: function (data, index) {
            var t = this;
            var reg = new RegExp(/http:\/\//g);
            var html = '<div class="m-cmt-list-item-repeat">';

            data.replyRef && (html += t.createReplay(data.replyRef, index));

            html += '<div class="m-cmt-list-item-inner"><div class="m-cmt-list-item-th">';
            html += ('<span class="m-cmt-list-item-name">' + data.nickName + '</span>');
            html += ('<span class="m-cmt-list-item-floor">' + data.floor + '\u697c</span>');
            html += '</div>' + ('<div class="m-cmt-list-item-body">' + data.content.replace(reg, '//') + '</div>');
            return html + '</div></div>';
        },

        /**
        *   获取当前用户回复后获取回复楼层的内容
        *
        *   @return {html} 返回组装好的html bindItem 是当前点击回复按钮的父级（多层）
        *
        */
        generateReplay: function () {
            var t = this;
            if (!t.bindItem) {
                return '';
            }
            var c1 = t.bindItem.querySelector('.m-cmt-list-item-tb > .m-cmt-list-item-body'); // 该评论的内容
            var c2 = t.bindItem.querySelector('.m-cmt-list-item-tb .m-cmt-list-item-repeat'); // 该评论的嵌套，如果有
            var c3 = t.bindItem.getAttribute('data-meta').split(',');

            var html = '<div class="m-cmt-list-item-repeat">';
            if (c2) {
                html += '<div class="m-cmt-list-item-repeat">' + (c2.innerHTML || '') + '</div>';
            }

            html += '<div class="m-cmt-list-item-inner">'
                + '<div class="m-cmt-list-item-th">'
                + '<span class="m-cmt-list-item-name">' + c3[1] + '</span>'
                + '<span class="m-cmt-list-item-floor">' + c3[0] + '楼</span>'
                + '</div>'
                + '<div class="m-cmt-list-item-body">' + (c1.innerHTML || '') + '</div>'
                + '</div>';
            html += '</div>';
            return html;
        },

        /**
        *   回复后的内容组装
        *
        *   @param {Json} data 获取内容传过来的data
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        prependNewComment: function (data, index) {
            var t = this;
            var c = t.config[index];
            var divEle = document.createElement('div');
            divEle.className = 'm-cmt-list-item';
            divEle.setAttribute('data-meta', data.floor + ', ' + data.showName + ', ' + data.commentId);
            // 是否微信 手机
            var clientClass = t.client === 7 ? 'wechat' : 'mobile';
            // 用户有没有登陆，取得用户id
            var noNameClass = t.userId !== '' ? '' : 'none';

            var html = '';
            html += '<div class="m-cmt-list-item-con">';
            html += '<div class="m-cmt-list-item-th">';
            html += '<span class="m-cmt-list-item-name ' + clientClass + ' ' + noNameClass + '">';
            html += data.showName + '</span>';
            html += '<span class="m-cmt-list-item-floor">' + data.floor + '楼</span>';
            html += '</div>';
            html += '<div class="m-cmt-list-item-tb">';
            html += t.generateReplay();
            html += '<div class="m-cmt-list-item-body">' + data.brief + '</div>';
            html += '</div>';
            html += '<div class="m-cmt-list-item-tf">';
            html += '<div class="m-cmt-list-item-tip">感谢参与评论，您的评论内容将在审核后公开。</div>';
            html += '</div>';
            html += '</div>';
            divEle.innerHTML = html;
            if (c.listElemt.children.length === 0) {
                c.listElemt.appendChild(divEle);
            }
            else {
                c.listElemt.insertBefore(divEle, c.listElemt.firstElementChild);
            }
        },

        buildHtml: function (d, index) {
            var t = this;
            var i = 0;
            var n = 0;
            var html = '';
            var clientClass = '';

            n = d.length;

            for (i = 0; i < n; i++) {
                // 是否微信 手机
                clientClass = d[i].client === 7 ? 'wechat' : (d[i].client === 6) ? 'mobile' : '';
                html += '<div class="m-cmt-list-item"';
                html += '   data-meta="' + d[i].floor + ',' + d[i].nickName + ',' + d[i].id + '">';
                html += '   <div class="m-cmt-list-item-th">';
                html += '   <span class="m-cmt-list-item-name ' + clientClass + '">' + d[i].nickName + '</span>';
                html += '   <span class="m-cmt-list-item-floor">' + d[i].floor + '楼</span>';
                html += '   </div>';
                html += '   <div class="m-cmt-list-item-tb">';
                html += (d[i].replyRef ? t.createReplay(d[i].replyRef, index) : '');
                html += '       <div class="m-cmt-list-item-body">' + d[i].content + '</div>';
                html += '   </div>';
                html += '   <div class="m-cmt-list-item-tf">';
                html += '       <span class="m-cmt-list-item-date">' + d[i].createTime + '</span>';
                html += '       <span class="m-cmt-list-item-btns">';
                html += '       <a class="m-cmt-list-item-ding" data-id="' + d[i].id + '">顶(' + d[i].support + ')</a>';
                html += '       <a class="m-cmt-list-item-repost">回复</a>';
                html += '       </span>',
                html += '   </div>',
                html += '</div>';

            }

            return html;
        },

        /**
        *   点击加载更多的内容组装
        *
        *   @param {Json} data 获取内容传过来的data
        *   @param {num} index 页面多个组件时，用来区分的。
        *   @param {Object} fn 回调函数。
        *
        */
        appendHtml: function (data, index, fn) {
            var t = this;
            var e = data;
            var d = e.data || [];
            var c = t.config[index];
            var i = 0;
            var n = 0;
            var xn = 0;
            var html = '';

            if (c.pageNo < e.availablePageCount - 1) {
                xn = c.pageSize;
            }
            else {
                xn = e.availableTotal - c.pageNo * c.pageSize;
            }

            n = d.length;

            if (n < c.pageSize || c.pageNo * c.pageSize >= e.availableTotal) {
                c.listMore.style.display = 'none';
            }

            if (n < 1) {
                return;
            }

            html = t.buildHtml(d, html);

            var divTemp = document.createElement('div');
            var nodes = null;
            var fragment = document.createDocumentFragment();

            divTemp.innerHTML = html;
            nodes = divTemp.childNodes;

            for (i = 0, n = nodes.length; i < n; i += 1) {
                fragment.appendChild(nodes[i].cloneNode(true));
            }

            c.listElemt.appendChild(fragment);

            // 据说下面这样子世界会更清净
            nodes = null;
            fragment = null;

            fn && fn(xn);
        },

        /**
        *   获取对象并保存起来
        *
        *   @param {Object} ele 当前对象
        *   @param {json} data 接口获取的数据
        *   @param {Object} fn 回调函数。
        *
        */
        creatFn: function (ele, data, fn) {
            ele.toastObg = ele.element.querySelector('.m-cmt-toast');
            ele.listElemt = ele.element.querySelector('.m-cmt-list');
            ele.listMore = ele.element.querySelector('.m-cmt-more');
            ele.cmtPost = ele.element.querySelector('.m-cmt-post');
            ele.cmtFacebtn = ele.element.querySelector('.m-cmt-post-face-btn');
            ele.cmtFacebox = ele.element.querySelector('.m-cmt-post-face-list');
            ele.cmtTextarea = ele.element.querySelector('textarea');
            ele.cmtYzm = ele.element.querySelector('.m-cmt-post-identify');
            ele.cmtYzminp = ele.element.querySelector('.m-cmt-post-identify input');
            ele.cmtYzmpic = ele.element.querySelector('.m-cmt-post-identify img');
            ele.cmtBtn = ele.element.querySelector('.m-cmt-post-btn');
            ele.cmtUser = ele.element.querySelector('.m-cmt-post-user');
            ele.cmtTid = data.tId;

            fn && fn();
        },

        /**
        *   首次初始化html内容
        *
        *   @param {Json} data 获取内容传过来的data
        *   @param {num} index 页面多个组件时，用来区分的。
        *   @param {Object} fn 回调函数。
        *
        */
        createHtml: function (data, index, fn) {
            var t = this;
            var e = data;
            var d = e.data || [];
            var c = t.config[index];
            var n = 0;
            var html = '';
            var xn = 0;

            if (e.availablePageCount > 2) {
                xn = c.pageSize;
            }
            else {
                if (e.availableTotal > c.pageSize) {
                    xn = e.availableTotal - c.pageSize;
                }
            }

            n = d.length;
            if (n < 1) {
                html = '<div class="m-cmt-loading"><p>暂无评论</p></div>';
                t.config[index].element.innerHTML = html;
                return;
            }
            html = '<div class="m-cmt-list">';
            html += t.buildHtml(d, index);
            html += '</div>';
            html += '<div class="m-cmt-post">';
            html += '   <div class="m-cmt-post-top">';
            html += '       <div class="m-cmt-post-face">';
            html += '           <span class="m-cmt-post-face-btn"></span>';
            html += '           <span class="m-cmt-post-face-list f-dn"></span>';
            html += '       </div>';
            html += '       <span class="m-cmt-post-user"><a href="' + t.loginUrl[c.site] + '">登录</a></span>';
            html += '   </div>';
            html += '   <div class="m-cmt-post-textarea"><textarea placeholder="回复潜水大王："></textarea></div>';
            html += '   <p class="m-cmt-post-identify" style="display:none;">';
            html += '       <span><input type="text" placeholder="请输入验证码"></span>';
            html += '       <img src="//www.' + c.domain + '/blank.gif">';
            html += '   </p>';
            html += '   <div class="m-cmt-post-btn-wrap">';
            html += '       <input type="submit" name="" value="发表" class="m-cmt-post-btn">';
            html += '   </div>';
            html += '</div>';
            html += '<a class="m-cmt-more" href="javascript:">再加载' + xn + '条</a>';
            html += '<div class="m-cmt-toast"></div>';
            c.element.innerHTML = html;
            t.creatFn(c, e, function () {
                t.bind(index);
                if (e.availableTotal > c.pageSize) {
                    c.listMore.style.display = 'block';
                }
                fn && fn();
            });
        },

        /**
        *   获取评论内容
        *
        *   @param {num} index 页面多个组件时，用来区分的。
        *   @param {Object} fn 回调函数。
        *
        */
        getInfo: function (index, fn) {
            var t = this;
            var c = t.config[index];
            var url = c.cmtaction;

            // 防止多次请求
            if (c.pageLoad) {
                return;
            }

            url += 'url=' + c.pageUrl + '&pageSize=' + c.pageSize + '&pageNo=' + c.pageNo + '&reverse=0&urlHandle=1';

            c.pageLoad = true;

            fetchJsonp(url, {
                jsonpCallback: 'callback',
                jsonpCallbackFunction: 'getCommentList' + index
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (c.pageNo === 1) {
                    t.createHtml(data, index, fn);
                }
                else {
                    t.appendHtml(data, index, fn);
                }

                c.pageLoad = false;
            });
        },

        /**
        *   初始化
        *
        *   @param {num} index 页面多个组件时，用来区分的。
        *
        */
        init: function (index) {
            var t = this;
            var c = t.config[index];

            c.element.innerHTML = '<div class="m-cmt-loading"><p>正在加载中...</p></div>';
            c.cmtaction = c.cmtaction.replace('{{domain}}', c.domain);
            c.cmtUrl = c.cmtUrl.replace('{{domain}}', c.domain);
            c.voteUrl = c.voteUrl.replace('{{domain}}', c.domain);
            c.yzmPic = c.yzmPic.replace('{{domain}}', c.domain);
            t.getInfo(index);
            t.logoutUrl.pconline = t.logoutStr('pconline');
            t.logoutUrl.pcauto = t.logoutStr('pcauto');
            t.logoutUrl.pclady = t.logoutStr('pclady');
            t.logoutUrl.pcbaby = t.logoutStr('pcbaby');
            t.logoutUrl.pchouse = t.logoutStr('pchouse');
            t.logoutUrl.geeknev = t.logoutStr('geeknev');
        }
    };

    /**
    * 第一次进入可视区回调，只会执行一次
    */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var site = element.getAttribute('data-site');
        var url = element.getAttribute('data-cmturl');
        var title = element.getAttribute('data-title');
        var pageSize = element.getAttribute('data-pagesize') || comment.fixConfig.pageSize;
        if (!site) {
            return;
        }
        var domain = site + '.com.cn';
        var tjson = {};
        comment.extend(tjson, comment.fixConfig);
        if (site === 'geeknev') {
            domain = site + 'com';
        }
        element.setAttribute('data-index', cindex);
        tjson.site = site;
        tjson.domain = domain;
        tjson.pageUrl = url;
        tjson.pageTitle = title;
        tjson.element = element;
        tjson.pageSize = parseInt(pageSize, 10);
        element.classList.add('mip-comment-' + site);
        if (!url) {
            return;
        }
        comment.config.push(tjson);
        comment.init(cindex);
        cindex++;
    };

    return customElement;
});
