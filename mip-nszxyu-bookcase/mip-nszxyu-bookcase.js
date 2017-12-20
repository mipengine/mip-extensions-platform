/**
 * @file mip-nszxyu-read 组件
 * @author nszxyu
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    customElement.prototype.build = function () {
        var element = this.element;
        var mipBookType = $(element).attr('mip-book-type');
        switch (mipBookType) {
            case 'add_recent':
                addRecent(element);
                break;
            case 'show_recent' :
                showRecent(element);
                break;
            case 'event' :
                var baseUrl = $(element).attr('mip-book-url');
                bindEvent(this, baseUrl);
                break;
        }
    };

    /**
     * [注册绑定删除最近阅读/添加书签/添加书架点击事件]
     *
     * @param {Object} self [来自this元素]
     * @param {string} url [书架的url]
     */
    function bindEvent(self, url) {
        self.addEventAction('remove_recent', function (event, str) {
            if (typeof (str) === 'undefined') {
                return;
            }
            removeRecentBook(str);
            location.reload();
        });

        self.addEventAction('add_bookcase', function (event, str) {
            if (typeof (str) === 'undefined') {
                return;
            }
            var e = event.srcElement;
            $.post(url, {action: 'addbookinfo', bid: str}, function (t) {
                t = t.replace(/\s/g, '');
                if (t === '1') {
                    e.innerHTML = '加入书架成功！';
                }
                if (t === '2') {
                    e.innerHTML = '加入书架失败！';
                }
                if (t === '3') {
                    e.innerHTML = '您还没有登录！';
                }
                if (t === '4') {
                    e.innerHTML = '该书已在书架中！';
                }
            });
        });

        self.addEventAction('add_bookmark', function (event, str) {
            if (typeof (str) === 'undefined') {
                return;
            }
            var param = str.split(',');
            if (param.length !== 2) {
                return;
            }
            var e = event.srcElement;
            $.post(url, {action: 'addbookmark', bid: param[0], aid: param[1]}, function (t) {
                t = t.replace(/\s/g, '');
                if (t === '1') {
                    e.innerHTML = '加入书签成功！';
                }
                if (t === '2') {
                    e.innerHTML = '加入书签失败！';
                }
                if (t === '3') {
                    e.innerHTML = '您还没有登录！';
                }
                if (t === '4') {
                    e.innerHTML = '该书签已存在！';
                }
            });
        });
    }

    /**
     * [添加最近阅读到存储]
     *
     * @param {Object} element [mip-nszxyu-bookcase对象]
     */
    function addRecent(element) {
        var configElement = $(element).find('#mip-book-param');
        if (configElement.length === 0) {
            return;
        }
        var config = JSON.parse(configElement.html());
        var primaryKey = $(element).attr('mip-book-primary');
        var primaryId  = config[primaryKey];
        addRecentBook(primaryId, config);
    }

    /**
     * [添加最近阅读到存储]
     *
     * @param {string} key [主键]
     * @param {Object} data [小说数据]
     */
    function addRecentBook(key, data) {
        var recentBook = getRecentBookAll();
        recentBook[key] = data;
        storage.set('recent_book', JSON.stringify(recentBook));
    }

    /**
     * [展示最近阅读]
     *
     * @param {Object} element [mip-nszxyu-bookcase对象]
     * @return {null}
     */
    function showRecent(element) {
        var templates = require('templates');

        var listTpl = $(element).find('[mip-book-list]');
        if (listTpl.length === 0) {
            return null;
        }
        var emptyTpl = $(element).find('[mip-book-empty]');
        var recentBook = getRecentBookAll();

        if (JSON.stringify(recentBook) === '{}') {
            if (emptyTpl.length === 0) {
                return null;
            }
            templates.render(emptyTpl[0], {}).then(function (html) {
                $(element).append(html);
            });
            return null;
        }

        for (var k in recentBook) {
            templates.render(listTpl[0], recentBook[k]).then(function (html) {
                $(element).append(html);
            });
        }
    }

    /**
     * [从存储中移除最近阅读]
     *
     * @param {string} id [主键]
     */
    function removeRecentBook(id) {
        var recentBook = getRecentBookAll();
        delete recentBook[id];
        storage.set('recent_book', JSON.stringify(recentBook));
    }

    /**
     * [从存储中获取最近阅读列表]
     *
     * @return {string}
     */
    function getRecentBookAll() {
        var recentBook = storage.get('recent_book') || '{}';
        recentBook = JSON.parse(recentBook);
        return recentBook;
    }

    return customElement;
});
