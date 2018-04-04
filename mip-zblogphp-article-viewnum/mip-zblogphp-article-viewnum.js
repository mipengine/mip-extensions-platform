/**
 * @file mip-zblogphp-article-viewnum
 * @author zsx@zsxsoft.com
 */
define(function (require) {
    var customElem = require('customElement').create();
    var getIdList = [];
    var updateIdList = [];
    var updateTimeout = null;

    if (!window.zblogphp) {
        window.zblogphp = {};
    }

    var requestForArticleId = function () {
        var bloghostElement = document.querySelector('meta[name=bloghost]');
        var bloghost = bloghostElement.getAttribute('content');

        if (!bloghostElement) {
            console.error('您还未设置博客域名');
            return;
        }

        var src = bloghost + '?mip&component=article_viewnum&gets=';
        src += encodeURIComponent(getIdList.join(','));
        src += '&updates=' + encodeURIComponent(updateIdList.join(','));

        fetch(src).then(function (s) {
            return s.json();
        }).then(function (t) {
            Object.keys(t).forEach(function (key) {
                var item = t[key];
                window.postMessage({
                    from: 'zblogphp',
                    event: 'viewnums',
                    id: key,
                    value: item
                }, '*');
            });
        }).catch(function (e) {
            console.error(e);
        });

    };

    customElem.prototype.build = function () {
        var element = this.element;
        var postId = (element.getAttribute('post-id') || '1').toString();
        var defaultValue = element.getAttribute('default') || '0';
        var isUpdate = (element.getAttribute('update') || '1') === '1';
        var commentElement = document.querySelector('mip-zblogphp-comment');
        var appendElement = document.createElement('span');

        var onMessageEvent = function (event) {
            var data = event.data;
            if (data.from !== 'zblogphp') {
                return;
            }

            switch (data.event) {
                case 'viewnums':
                    if (data.id.toString() === postId) {
                        appendElement.innerHTML = data.value;
                    }
            }
        };

        appendElement.innerHTML = defaultValue;
        element.appendChild(appendElement);

        if (commentElement === null) { // if we have comment component, it will auto increase viewnums, so ignore it
            if (updateTimeout !== null) {
                clearTimeout(updateTimeout);
                updateTimeout = null;
            }

            if (isUpdate) {
                updateIdList.push(postId);
            }
            else {
                getIdList.push(postId);
            }
            updateTimeout = setTimeout(requestForArticleId, 500);
        }

        window.addEventListener('message', onMessageEvent);

        if (window.zblogphp.viewnums) { // receive data from ``comment`` when comment is loaded before this component
            window.postMessage(window.zblogphp.viewnums, '*');
        }

    };

    return customElem;
});
