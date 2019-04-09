/**
 * @file mip-jm-articletelphone 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
			 * 第一次进入可视区回调，只会执行一次
			 */
    customElement.prototype.firstInviewCallback = function () {
        var $element = $(this.element);
        var $form = $element.find('form');
        var $searchBtn = $element.find('.call_foot_btn');

        var cateId = $('mip-jm-articletelphone').attr('data-phonecateid');
        var articleId = $('mip-jm-articletelphone').attr('data-phonearticleid');
        var dataUrl = $('mip-jm-articletelphone').attr('data-phoneurl');
        var dataRemark = $('mip-jm-articletelphone').attr('data-phoneremark');

        var $phone = $element.find('.call_foot_phone');

        $searchBtn.on('click', function () {
            forSearch($phone);
        });

        $form.on('submit', function () {
            forSearch($phone);
            return false;
        });

        $form.on('keydown', function (e) {
            var keycode = e.keyCode;
            if (keycode === 13 || keycode === 9) {
                e.preventDefault();
                forSearch($phone);
                $phone.blur();
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

        function forSearch($phone) {
            var phone = $phone.val();
            if ($.trim(phone).length === 0) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '手机号码不能为空');

                return false;
            }

            if (!(/^1[34578]\d{9}$/.test(phone))) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '请输入正确的手机号码');

                return false;
            }

            ajaxRequest(phone, cateId, articleId, dataRemark);
        }
        // ajax请求获取页面跳转地址
        function ajaxRequest(phone, cateId, articleId, dataRemark) {
            var formData = new FormData();
            formData.append('phone', phone);
            formData.append('cate_id', cateId);
            formData.append('article_id', articleId);
            formData.append('remark', dataRemark);
            fetch(dataUrl, {
                method: 'POST',
                body: formData
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                if (response.status === 1) {
                    openAlart(response.msg, function () {
                        window.top.location.href = response.url;
                    });
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
