/**
 * @file mip-home 组件
 * @author yangsw
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var element = null;
    var gloScrollCurrPage = 1;
    function showAllContent(obj, id, page) {
        //  初始化 isopen 属性
        if (!element.find(obj).attr('isOpen')) {
            // $(obj).attr({ isOpen: 'close' });
            element.find(obj).attr('isOpen', 'close');
        }
        if (element.find(obj).attr('isOpen') === 'close') {
            //  收起
            element.find('div[name=\'content_' + page + '_' + id + '\']').each(function () {
                $(this).removeClass('text-hidden-3');
            });
            element.find(obj).attr('isOpen', 'open');
            //  $(obj).attr({ isOpen: 'open' });
            element.find(obj).text('收起');
        }
        else if (element.find(obj).attr('isOpen') === 'open') {
            //  展开
            element.find('div[name=\'content_' + page + '_' + id + '\']').each(function () {
                $(this).addClass('text-hidden-3');
            });
            element.find(obj).attr('isOpen', 'close');
            //  $(obj).attr({ isOpen: 'close' });
            element.find(obj).text('展开');
        }
    }
    function init() {
        var jsonText = JSON.parse(element.find('#jsonText').attr('name'));
        // 展开收起
        element.find('.user-list-text-hide').each(function (i, j) {
            var idText = $(j).attr('id');
            var ids = idText.split('_');
            var page = ids[1];
            var id = ids[2];
            $(j).unbind('click').click(function () {
                event.preventDefault();
                showAllContent($(j), id, page);
            });
        });
        // 点击播放
        element.find('.user-list-audio').each(function (i, j) {
            var idText = $(j).find('label').attr('id');
            var ids = idText.split('_');
            var page = ids[1];
            var id = ids[2];
            element.find('#audio-play-btn_' + page + '_' + id).click(function () {
                $(this).find('i').css('display', 'none');
            });
        });

        element.find('#collect').click(function () {
            document.getElementsByClassName('user-dialog')[0].style.display = 'block';
        });

        element.find('#no').click(function () {
            event.preventDefault();
            document.getElementsByClassName('user-dialog')[0].style.display = 'none';
        });

        element.find('#yes').click(function () {
            var url = '/page/operationUser?userId=' + jsonText.userId + '&kolId=';
            url += jsonText.kolId + '&sessionId=' + jsonText.sessionId;
            if (jsonText.isFollow === 0) {
                // 收藏
                url = url + '&operation=1';
            }
            else {
                // 取消收藏
                url = url + '&operation=2';
            }
            $.get(url, function (htmlPack) {
                var json = JSON.parse(htmlPack);
                if (json.flag === true) {
                    var operation = json.operation;
                    if (operation === 1) {
                        jsonText.isFollow = 1;
                        $('#collect').removeClass('icon-line-star').addClass('icon-star').text('已收藏');
                        $('#collectText').text('确定不再收藏这位专家?');
                    }
                    else if (operation === 2) {
                        jsonText.isFollow = 0;
                        $('#collect').removeClass('icon-star').addClass('icon-line-star').text('收藏');
                        $('#collectText').text('确定收藏这位专家?');
                    }
                }
                document.getElementsByClassName('user-dialog')[0].style.display = 'none';
            });
        });

        var container = element.find('#con');
        var scrollTimeout;
        var viewport = require('viewport');
        viewport.on('scroll', function () {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function () {
                var totalheight = parseFloat($(window).scrollTop()) + parseFloat($(window).height());
                if (totalheight >= $(document).height()) {
                    var count = jsonText.total;
                    var url = '/page/homeMore?kolId=' + jsonText.kolId;
                    initScrollPage(count, url, container, true);
                }
            }, 500);
        });

    }
    // 自动滚动翻页
    function initScrollPage(countNumber, apiurl, container, flaghide) {
        // 存在第二页
        if (countNumber > 1) {

            var length = element.find('#loading .loadingSpan').find('span').length;
            if (length === 0) {
                element.find('#loading span').text('努力加载中');
            }
            else {
                element.find('#loading').show();
            }
        }
        else {
            element.find('#loading').hide();
            return;
        }
        var currPage = ++gloScrollCurrPage;
        gloScrollCurrPage = gloScrollCurrPage;
        var pageSize = 10;
        var totalPage = countNumber % pageSize === 0 ? countNumber / pageSize : countNumber / pageSize + 1;

        if (countNumber > (currPage - 1) * pageSize && totalPage >= currPage) {
            loadScrollMoreList(apiurl, currPage, container);
        }
        else {
            if (flaghide) {
                element.find('#loading span').text('好厉害，你已翻完全内容啦~ ');
                // setTimeout(function() { $('#loading').css('opacity','0');}, 2000);
            }
        }
    }
    // 翻页方法
    function loadScrollMoreList(apiUrl, currPage, container) {
        var url = '';
        if (apiUrl.indexOf('?') > 0) {
            url = apiUrl + '&page=' + currPage;
        }
        else {
            url = apiUrl + '?page=' + currPage;
        }
        $.get(url, function (htmlPack) {
            if (htmlPack !== 'no_data') {
                container.append(htmlPack);
                /* eslint-disable max-nested-callbacks */
                // 展开收起
                element.find('.user-list-text-hide').each(function (i, j) {
                    var idText = $(j).attr('id');
                    var ids = idText.split('_');
                    var page = ids[1];
                    var id = ids[2];
                    $(j).unbind('click').click(function () {
                        event.preventDefault();
                        showAllContent($(j), id, page);
                    });
                });
                // 点击播放
                element.find('.user-list-audio').each(function (i, j) {
                    var idText = $(j).find('label').attr('id');
                    var ids = idText.split('_');
                    var page = ids[1];
                    var id = ids[2];
                    element.find('#audio-play-btn_' + page + '_' + id).click(function () {
                        $(this).find('i').css('display', 'none');
                    });
                });
            }
            else {
                $('#loading span').text('好厉害，你已翻完全内容啦~ ');
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        element = $(this.element);
        gloScrollCurrPage = 1;
        init();
    };
    return customElement;
});
