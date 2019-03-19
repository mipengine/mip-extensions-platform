/**
 * @file mip-jm-searchtop 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
	 * 构造元素，只会运行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var $element = $(this.element);
        var $form = $element.find('form');
        var $input = $element.find('[data-role="searchKey"]');
        var $searchBtn = $element.find('[data-role="searchIcon"]');

        $searchBtn.on('click', function () {
            forSearch($input);
        });
        $form.on('keydown', function (e) {
            var keycode = e.keyCode;
            if (keycode === 13 || keycode === 9) {
                e.preventDefault();
                forSearch($input);
                $input.blur();
                return false;
            }

        });
        var mo = function (e) {
            e.preventDefault();
        };
        function getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scrollTop = document.body.scrollTop;
            }

            return scrollTop;
        }

        /***禁止滑动***/
        function stop() {
            document.body.style.overflow = 'hidden';
            document.addEventListener('touchmove', mo, false); // 禁止页面滑动
        }

        /***取消滑动限制***/
        function move() {
            document.body.style.overflow = ''; // 出现滚动条
            document.removeEventListener('touchmove', mo, false);
        }

        function closearticle($modelbg, $model) {
            $modelbg.fadeOut(300);
            $model.fadeOut(300);
            move();
        }

        function openarticle($modelbg, $model, $text) {
            stop();
            $modelbg.bind('touchmove', function (e) {
                e.preventDefault();
            });
            $model.bind('touchmove', function (e) {
                e.preventDefault();
            });
            $model.css('top', getScrollTop() + 300 + 'px');
            $modelbg.css('height', getScrollTop() + 1000 + 'px');
            $element.find('.text').text($text);
            $modelbg.fadeIn(300);
            $model.fadeIn(300);
        }

        function openAlart($showtext, callback) {
            stop();
            $element.find('.qx_close').show();
            openarticle($element.find('.model_bg'), $element.find('.article_model'), $showtext);
            if (callback) {
                $element.find('.article_close').click(function () {
                    closearticle($element.find('.model_bg'), $element.find('.article_model'));
                    callback();
                });
            }
        }

        $element.find('.article_close').click(function () {
            closearticle($element.find('.model_bg'), $element.find('.article_model'));
        });

        function forSearch($this) {
            var zkey = $this.val();
            if (zkey === '') {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '请输入搜索关键字');
                return false;
            }

            ajaxRequest(zkey);
        }
        // ajax请求获取页面跳转地址
        function ajaxRequest(key) {
            var formData = new FormData();
            var formUrl = '/Project/search';
            formData.append('name', key);
            fetch(formUrl, {
                method: 'POST',
                body: formData
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                if (response.status === 1) {
                    window.top.location.href = response.url;
                }
                else if (response.status === 0) {
                    openarticle($element.find('.model_bg'), $element.find('.article_model'), response.msg);
                }

            }).catch(function (e) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '网络错误，请稍后重试。');

            });
        }
    };
    return customElement;
});
