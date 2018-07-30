/**
 * @file 内容懒加载tab组件
 *
 * @author liyinan
 */

/* global m */
define(function (require) {
    /* eslint-disable */
    var $ = require('zepto');

    var customElement = require('customElement').create();
    var Tab = require('./tab');
    var EPISODE_RANGE = 25;
    var EPISODE_PAGE_SIZE = 50;
    var ICON_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAMAAAA/D5+aAAAAUVBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmbIinYlAAAAGnRSTlMABKqP+IFs7+fStaZaSjsuGBAK3tzGw3gkIaqv3YsAAABmSURBVBjTddE5FoMwEMBQGcy+Q1bd/6Cp8xir/aWARKn3FFjdAK2O5020gVp9HjexStCowx4JtOr1iQTmrP0WCSxZuzUSWDvNSySw9ZrnSOD7UNtIYB/UUOB4lQTOsSSQpqp84U9+ascIWXpxA/QAAAAASUVORK5CYII=';
    var ALLOW_SCROLL = 'allow-scroll';
    var TOGGLE_MORE = 'toggle-more';
    var CURRENT = 'current';
    var TYPE = 'type';
    var WRAPPER_CLS = 'mip-st-lazy-tab';
    var CONTENT_CLS = 'mip-st-lazy-tab-content';
    var SELECTED_CLS = 'mip-st-lazy-tab-nav-selected';
    var ITEM_CLS = 'mip-st-lazy-tab-nav-li';
    var NAV_CLS = 'mip-st-lazy-tab-nav';
    var VIEW_CLS = 'mip-st-lazy-tab-nav-view';
    var TOGGLE_CLS = 'mip-st-lazy-tab-nav-toggle';
    var BOTTOM_CLS = 'mip-st-lazy-tab-nav-bottom';
    var TPL_REG = /\{\{\w}}/g;

    var templates = require('templates');


    /**
     * 渲染
     */
    customElement.prototype.build = function () {
        var el = this.element;
        var type = el.getAttribute(TYPE);
        var _this = this;
        this.addEventAction('dataloaded', function (data) {
            templates.render(el, data).then(function (html) {
                el.innerHTML = html;
                if (!data.spu_cate.length) {
                    // 如果是无tab模式，就不再渲染这个组件，这个组件就当一个div用
                    return;
                }

                //_this.tabConfig = {
                //    "allow-scroll": true,
                //    "toggle-more": true,
                //    "toggle-label": "请选择分类"
                //};
                // mip不让template里套script，检测到了就无法用sf打开
                // 所以只好用div放个json，然后display:none;
                // 不要问我四不四撒，我也不想这样做
                _this.tabConfig = JSON.parse(el.querySelector('div[type="application/json"]').innerHTML);
                switch (type) {
                    case 'episode':
                        var $result = generateWrapper.call(this);
                        if (_this.tabConfig[TOGGLE_MORE]) {
                            $result = generateToggle.call(this, $result);
                        }
                        generateEpisode.call(
                            _this,
                            $result,
                            el.getAttribute('total'),
                            el.getAttribute(CURRENT),
                            el.getAttribute('text-tpl'),
                            el.getAttribute('link-tpl'),
                            el.getAttribute('head-title')
                        );
                        break;
                    case 'bottom':
                    default:
                        generateCommonTab.call(_this, $result);
                }
            });
        });

    }

    function generateCommonTab() {
        var el = this.element;
        var $el = $(el);
        var type = el.getAttribute(TYPE);
        var allowScroll = !!this.tabConfig[ALLOW_SCROLL];
        var toggleMore = !!this.tabConfig[TOGGLE_MORE];
        var current = parseInt(el.getAttribute(CURRENT), 0) || 0;
        var $header = null;
        $el.addClass(WRAPPER_CLS);

        if (type === 'bottom') {
            $header = $(el.children.item(el.children.length - 1));
        } else {
            $header = $(el.children.item(0));
        }

        $header.detach();
        $header.children().each(function (index, element) {
            var $element = $(element);
            if (current === index) {
                $element.addClass(SELECTED_CLS);
            }
            $element.addClass(ITEM_CLS);
        });
        if (allowScroll) {
            $header
                .addClass(VIEW_CLS)
                .append(
                    $('<div class="' + NAV_CLS + '"></div>')
                    .append($header.children())
                );
            if (toggleMore) {
                // $header.append('<div class="mip-st-lazy-tab-nav-toggle"><img src=' + ICON_SRC + '></div>');
                $header.append('<div class="mip-st-lazy-tab-nav-toggle"><div class="mip-st-lazy-tab-nav-toggle-gradient"></div><i class="mip-st-lazy-tab-nav-toggle-btn"></i></div>');
            }
        } else {
            $header
                .addClass('mip-st-lazy-tab-row-tile')
                .append(
                    $('<div class="' + NAV_CLS + '"></div>')
                        .append($header.children())
                );
        }

        $el.children()
            .addClass(CONTENT_CLS)
            .css('display', 'none')
            .eq(current)
            .css('display', 'block');

        if (type === 'bottom') {
            $el.append($header);
        } else {
            $el.prepend($header);
        }

        new Tab($el, {
            allowScroll: allowScroll,
            current: parseInt($el.attr(CURRENT), 10) || 1,
            toggleMore: toggleMore,
            toggleLabel: this.tabConfig['toggle-label'] || '请选择',
            currentClass: SELECTED_CLS,
            navWrapperClass: NAV_CLS,
            viewClass: VIEW_CLS,
            contClass: CONTENT_CLS,
            navClass: ITEM_CLS,
            logClass: 'mip-st-lazy-tab-log',
            toggleClass: TOGGLE_CLS,
            layerClass: 'mip-st-lazy-tab-nav-layer',
            layerUlClass: 'mip-st-lazy-tab-nav-layer-ul'
        });
    }

    /**
     * 生成剧集选择下拉列表
     * @returns {jQuery|HTMLElement}
     */

    function generateEpisodeDown(linkTpl) {
        var $el = $(this.element);
        var pageSize = parseInt($el.attr('page-size'), 10) || EPISODE_PAGE_SIZE;
        var currentNum = parseInt($el.attr(CURRENT), 10) || 1;
        var totalNum = parseInt($el.attr('total'), 10) || 1;
        var tabCount = Math.ceil(totalNum / pageSize);
        var tabCurNum = Math.floor((currentNum - 1) / pageSize);
        var tabList = [];


        for (var i = 0; i < tabCount; i++) {
            var from = pageSize * i + 1;
            var to = Math.min(totalNum, pageSize * (i + 1));
            tabList.push({
                from: from,
                to : to,
                text: '' + from + (from < to ? ' - ' + to : '')
            });
        }


        var wrapper = $('<div class="' + WRAPPER_CLS + '"></div>');
        wrapper.append(
            tabList.map(function (v, index) {
                var epFragment = '<div class="'
                    + CONTENT_CLS
                    + ' mip-st-lazy-tab-episode-content" '
                    + (index === tabCurNum ? '' : 'style="display:none;" ')
                    + ' >';
                for (var j = v.from; j <= v.to; j++) {
                    var selectedClass = j === currentNum ? 'mip-st-lazy-tab-episode-item-selected' : '';
                    var link = (linkTpl ? ' href="' + linkTpl.replace(TPL_REG, j) + '"' : '' );
                    epFragment = epFragment
                        + '<span class="mip-st-lazy-tab-episode-item '
                        + selectedClass + '"'
                        + link + '>'
                        + j
                        + '</span>';
                }
                epFragment += '</div>';
                return epFragment;
            }).join('')
        );

        if (tabCount > 1) {
            var tabFragment = '';
            var scrollNum = 4;
            if (tabCount > scrollNum) {
                tabFragment = '<div class="' + VIEW_CLS + '">';
            }
            tabFragment += '<ul class="' + NAV_CLS + ' ' + BOTTOM_CLS + ' ' + 'mip-st-lazy-tab-episode-bottom-nav">';
            tabFragment += tabList.map(function (v, index) {
                var selectedClass = index === tabCurNum ? SELECTED_CLS : '';
                return '<li class="' + ITEM_CLS + ' ' + selectedClass + '">' + v.text + '</li>';
            }).join('');
            tabFragment += '</ul>';
            if (tabCount > scrollNum) {
                tabFragment += '</div>';
            }
            wrapper.append(tabFragment);

            new Tab(wrapper, {
                allowScroll: tabCount > scrollNum,
                current: Math.floor((currentNum - 1) / pageSize) || 1,
                currentClass: SELECTED_CLS,
                navWrapperClass: NAV_CLS,
                viewClass: VIEW_CLS,
                contClass: CONTENT_CLS,
                navClass: ITEM_CLS,
                logClass: 'mip-st-lazy-tab-log',
                toggleClass: TOGGLE_CLS
            })
        }
        return wrapper;
    }

    function generateWrapper() {
        var $el = $(this.element);
        var $result = null;
        $el.addClass(WRAPPER_CLS);
        var totalNum = parseInt($el.attr('total'), 10) || 1;
        if (totalNum > 4) {
            $result = $('<div class="' + VIEW_CLS + '">'
                + '<ul class="' + NAV_CLS + '"></ul>'
                + '</div>'
            );
        } else {
            $result = $('<div class="mip-st-lazy-tab-row-tile">'
                + '<ul class="' + NAV_CLS + '"></ul>'
                + '</div>'
            );
        }
        return $result;
    }

    function generateToggle($result) {
        var $el = $(this.element);
        var totalNum = parseInt($el.attr('total'), 10) || 1;
        if (totalNum <= 4) {
            return $result;
        }

        $result.append('<div class="' + TOGGLE_CLS + '">'
            + '<img src=' + ICON_SRC + '>'
            + '</div>');
        return $result;
    }

    function generateEpisode($result, total, current, textTpl, linkTpl, headTitle) {
        var $el = $(this.element);

        var totalNum = parseInt(total, 10);
        var currentNum = parseInt(current, 10) || 1;
        var tpl = textTpl || '第{x}集';
        var html = '';
        for (var i = Math.max(1, currentNum - EPISODE_RANGE),
                 r = Math.min(totalNum, currentNum + EPISODE_RANGE);
             i <= r;
             i++) {
            html = html
                + '<a class="' + ITEM_CLS + ' '
                + (i === currentNum ? SELECTED_CLS : '')+ '" '
                + (linkTpl ? ' href="' + linkTpl.replace(TPL_REG, i) + '"' : '' ) + '>'
                + tpl.replace(TPL_REG, '' + i)
                + '</a>';
        }

        $result.find('.' + NAV_CLS).append(html);
        $el.empty().append($result);


        var tab = new Tab($el, {
            allowScroll: !!this.tabConfig[ALLOW_SCROLL],
            toggleMore: false,
            current: currentNum || 1,
            currentClass: SELECTED_CLS,
            navWrapperClass: NAV_CLS,
            viewClass: VIEW_CLS,
            navClass: ITEM_CLS,
            logClass: 'mip-st-lazy-tab-log',
            toggleClass: TOGGLE_CLS,
            toggleLabel: this.tabConfig['toggle-label'] || '请选择'
        });

        // override toggle-more
        (function register(ptr) {
            var _this = tab;
            var $navLayer = $('<div class="mip-st-lazy-tab-nav-layer"><p>' + _this.toggleLabel + '</p></div>');
            var $navLayerUl = $('<ul class="mip-st-lazy-tab-nav-layer-ul"></ul>');
            var $mask = $('<div class="mip-st-lazy-tab-mask"></div>');

            _this.toggleState = 0;   // 展开状态 0-收起,1-展开

            // 事件代理
            $navLayerUl.on('click', '.mip-st-lazy-tab-episode-item ', function(){
                toggleUp();
            });

            $mask.on('click', function () {
                toggleUp();
            }).on('touchmove', function (e) {
                e.preventDefault();
            });

            _this.toggle.on('click', function() {
                if (_this.toggleState == 0) {
                    // 点击时为收起
                    toggleDown();
                } else {
                    // 点击时为展开
                    toggleUp();
                }
            });

            // 收起
            function toggleUp() {
                $navLayerUl.empty();
                $navLayer.hide();
                $mask.hide();
                $el
                    .find('.mip-st-lazy-tab-nav-toggle,.mip-st-lazy-tab-scroll-touch')
                    .css({'position': '', 'top': ''});
                $el
                    .find('.mip-st-lazy-tab-nav-layer')
                    .css({'position': '', 'border-top': '', 'top': ''});
                _this.toggle.css({
                    '-webkit-transform': 'scaleY(1)',
                    'transform': 'scaleY(1)'
                });
                _this.toggleState = 0;
            }

            // 展开
            function toggleDown() {
                $navLayerUl.html(generateEpisodeDown.call(ptr, linkTpl));
                $navLayer.append($navLayerUl);
                $el.append($mask.show());
                _this.view.after($navLayer.show());
                $el
                    .find('.mip-st-lazy-tab-scroll-touch,.mip-st-lazy-tab-nav-toggle')
                    .css({'position': 'fixed', 'top': '1px'});
                $el
                    .find('.mip-st-lazy-tab-nav-layer')
                    .css({'position': 'fixed', 'border-top': '1px solid #ccc', 'top': '0'});
                _this.toggle.css({
                    '-webkit-transform': 'scaleY(1)',
                    'transform': 'scaleY(-1)'
                });
                _this.toggleState = 1;
            }
        })(this);


        $el.delegate('.' + ITEM_CLS + ', .mip-st-lazy-tab-episode-item', 'click' , function(ev) {

            ev.preventDefault();

            var href = $(this).attr("href");

            if (!href) {
                return;
            }


            // 顶部标题
            var head = $(this).text();

            if (!head) {
                head = $(this).find('.' + ITEM_CLS).text();
            }

            var message = {
                "event": "loadiframe",
                "data": {
                    "url": href,
                    "title": headTitle || head,
                    "click": $el.data('click')
                }
            };

            if (window.parent !== window) {
                window.parent.postMessage(message, '*');
            }
            else {
                location.href = href;
            }

        });
    }

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;

});
