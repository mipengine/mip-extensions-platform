/**
 * @file mip-jia-masonrymore 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('jquery');
    var viewPort = require('viewport');
    // 提示层
    function tipMask(msg, duration) {
        duration = duration || 2000;
        if ($('.popup-maskEdit').length > 0) {
            $('.popup-maskEdit').remove();
        }
        $('body').append('<div class="popup-maskEdit">' + msg + '</div>');
        var tipMaskTimer = setTimeout(function () {
            $('.popup-maskEdit').fadeOut(100, function () {
                $(this).remove();
            });
            clearTimeout(tipMaskTimer);
        }, duration);
    }

    // 下拉加载更多
    function moveLoadMore(element, datas) {
        if (datas.action !== 'scroll') {
            $(element).on(datas.action, datas.btn, function () {
                $.ajax({
                    url: datas.url,
                    type: 'get',
                    dataType: 'jsonp',
                    data: datas.params,
                    beforeSend: function () {
                        if ($('.loading-common').length === 0) {
                            $('body').append('<div class="loading-common"></div>');
                        }
                        $('.loading-common').show();
                    },
                    error: function () {
                        tipMask('系统繁忙，请稍后再试！');
                        $('.loading-common').hide();
                    },
                    success: function (data) {
                        if (data.statusCode === '0000') {
                            $(datas.containerclass).append(data.result);
                            if (typeof (datas.type) !== 'undefined' && datas.type === 'masonry') {
                                $(datas.containerclass).masonry().masonry('reload');
                            }
                            datas.params.page_num++;
                        } else {
                            $(element).remove();
                        }
                    }
                });
            });
        } else {
            var status = true;
            var pageCount;
            if (typeof (datas.params.page_count) !== 'undefined') {
                pageCount = datas.params.page_count;
            }
            var pageSize = datas.params.page_size;
            $(window).scroll(function () {
                // 当前页码数大于总页码则不加载
                if (datas.params.page_num > pageCount) {
                    $(datas.loadclass).hide();
                    return false;
                }
                var dotHeight = viewPort.getScrollHeight();
                var winHeight = viewPort.getHeight();
                var winScroll = viewPort.getScrollTop();
                var autoFoot = typeof (datas.autofoot) !== 'undefined' ? datas.autofoot : 50;
                if (status && winScroll + winHeight >= dotHeight - autoFoot) {
                    status = false;
                    $.ajax({
                        url: datas.url,
                        type: 'get',
                        dataType: 'jsonp',
                        data: datas.params,
                        beforeSend: function () {
                            $(datas.loadclass).show();
                        },
                        error: function () {
                            tipMask('系统繁忙，请稍后再试！');
                            $(datas.loadclass).hide();
                        },
                        success: function (data) {
                            if (data.statusCode === '0000') {
                                $(datas.containerclass).append(data.result);
                                if (typeof pageCount === 'undefined' && data.total !== 'undefined') {
                                    pageCount = parseInt(data.total / pageSize, 10);
                                }
                                if (typeof (datas.type) !== 'undefined' && datas.type === 'masonry') {
                                    $(datas.containerclass).masonry().masonry('reload');
                                }
                                datas.params.page_num++;
                                status = true;
                            } else {
                                $(element).remove();
                                $(datas.loadclass).hide();
                            }
                        }
                    });
                }
            });
        }
    }

    /** 第一次进入可视区回调，只会执行一次
     *
     */

    customElement.prototype.firstInviewCallback = function () {

        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
        }
        catch (e) {
            thisObj.innerHTML = '';
            return false;
        }
        if (typeof (data.type) !== 'undefined' && data.type === 'masonry') {
            // 加载瀑布流插件
            var scriptDom = document.createElement('script');
            scriptDom.src = '//mued2.jia.com/js/mobile/optimize/masonry.js';
            document.body.appendChild(scriptDom);
            window.addEventListener('load', function () {
                $(data.masonryclass).find('img').imagesLoaded(function () {
                    $(data.masonryclass).masonry({
                        itemSelector: data.itemselector
                    });
                });
            });
            $(window).scroll(function () {
                $(data.containerclass).masonry().masonry('reload');
            });
        }
        moveLoadMore(thisObj, data);
        // 翻页
        $(data.flipclass).find('.pagination-pages').change(function () {
            if ($(this).val() !== '...') {
                var textval = $(this).find('option:selected').val();
                var linkval = $(this).find('option:selected').attr('data-url');
                location.href = linkval;
                $(data.flipclass).find('.more').text(textval);
            }
        });
    };

    return customElement;
});


