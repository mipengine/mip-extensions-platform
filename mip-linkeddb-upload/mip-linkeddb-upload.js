/**
 * @file mip-linkeddb-upload 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    require('./jquery-weui');
    // jquery-weui-min 此为定制化精简模块,内部只包含本组件中使用的功能
    // 一下列举定制化模块包含模块详情
    // jquery-extend  jquery 依赖模块
    // template7  模板模块
    // $.confirm  使用 modal   提示用户操作的弹出层模块
    // $.toptip   使用 toptip  顶部提示模块
    // $.toast    使用 toast   信息提示框模块

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var content = $(ele).parent();
        var cpId = $(ele).attr('data-cp-id');
        var photoAlbumWrap = $(ele).find('.photo-album-wrap');
        var setImgModal = function () {
            var allPhotos = photoAlbumWrap.find('.upload-num').find('.file-limit').text();
            var overPhotos = photoAlbumWrap.find('.upload-num').find('.now-cnt').text();
            var photoProportion = Math.floor((+overPhotos / +allPhotos) * 100);
            photoAlbumWrap.find('.img-modal').css('left', photoProportion + '%');
        };
        setImgModal();
        // 发送ajax请求
        var sendAjax = function (url, data, fun, fun2, fun3) {
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                data: data,
                cache: false, // 不缓存
                processData: false, // jQuery不要去处理发送的数据
                contentType: false, // jQuery不要去设置Content-Type请求头
                beforeSend: function () {
                    if (fun2) {
                        fun2();
                    }
                },
                success: function (res) {
                    console.log(res);
                    if (res.response === '1') {
                        $.toast(res.message);
                        fun(res);
                    } else {
                        $.toast(res.message, 'forbidden');
                    }
                },
                complete: function () {
                    if (fun3) {
                        fun3();
                    }
                }
            });
        };
        // 上传图片 @param $ele input 元素   @param url 上传地址  @param method 上传方式   @param fun 回调函数 @param fun2 回调函数 (显示 loading)  @param fun3 回调函数 (提示查看拼图)
        var upLoadPic = function ($ele, url, fun, fun2, fun3) {
            $($ele).on('change', function () {
                var thisFile = this.files[0];
                if (thisFile) {
                    if (['image/jpg', 'image/jpeg', 'image/png'].indexOf(thisFile.type) >= 0) {
                        var formData = new FormData();
                        formData.append('img', thisFile);
                        sendAjax(url + cpId, 'post', formData, fun, fun2, fun3);
                    } else {
                        $.toptip('点击图片查看保存拼图', 'warning');
                    }
                }
            });
        };
        /* 提示登录 */
        var sign = $(ele).attr('sign-in');
        var promptLogin = function ($ele) {
            $($ele).on('click', function (event) {
                event = event || window.event;
                event.preventDefault();
                $.confirm('登录后操作', '操作提示', function () {
                    window.location.href = sign + window.location.origin + window.location.pathname;
                },
                    function () {
                    });
                return false;
            });
        };
        /* 检查登录 */
        var user = $(ele).attr('sign-in-id');
        var upload = $(ele).find('.photo-album-wrap').attr('upload');
        var request = $(ele).find('.photo-album-wrap').attr('upload-pic');
        var film = $(ele).find('.photo-album-wrap').attr('film');
        $.get(user, function (res) {
            console.log(res);
            if (res.response === '-2') {
                promptLogin('#imgInput0');
                promptLogin('#imgInput1');
            } else {
                // 上传拼图图片
                upLoadPic('#imgInput0', upload, 'POST', function (res) {
                    console.log(res);
                    photoAlbumWrap.find('.upload-num')
                        .find('.now-cnt')
                        .text(+photoAlbumWrap.find('.upload-num').find('.file-limit').text() - res.data.left_cnt);
                    setImgModal();
                    if (res.data.left_cnt <= 5) {
                        $.toptip('请上传 jpg 或者 png 图片！', 'success');
                        $.post(request + cpId, function (res) {
                            console.log(res);
                            if (res.response === '1') {
                                $('#defaultPic').attr('src', res.data).addClass('hidden');
                                $('#defaultMosicPic').attr('src', res.data).removeClass('hidden');
                                $('.input0-wrap').addClass('hidden');
                                $('.input1-wrap').removeClass('hidden');
                                $('.upload-num').addClass('hidden');
                                $('.img-modal').addClass('hidden');
                            } else {
                                alert(res.message, 'forbidden');
                            }
                        });
                    }
                });

                // 上传底图图片
                upLoadPic('#imgInput1', film, 'POST', function (res) {
                    console.log(res.data);
                    content.find('.mosic-loading-toast').remove();
                    content.find('.weui-mask_transparent').remove();
                    $('#defaultMosicPic').attr('src', res.data);
                }, function () {
                    content.append('<div class="weui-mask_transparent"></div>'
                        + '<div class="weui-toast weui_loading_toast'
                        + ' mosic-loading-toast weui-toast--visible">'
                        + '<div class="weui_loading">'
                        + '<i class="weui-loading weui-icon_toast"></i>'
                        + '</div>'
                        + '<p class="weui-toast_content">${trText.synthesizingPuzzle}</p>'
                        + '</div>');
                }, function () {
                    $.toptip('点击图片查看保存拼图', 'success');
                });
            }
        });

        /* 查看上传图片 */
        var isFirstView = true;
        var isClick = $(ele).find('.photo-album__hd').attr('data-src');
        $(ele).find('.view-photo-album').on('click', function () {
            if (isFirstView) {
                content.append('<div class="weui-mask_transparent album-mask"></div>'
                    + '<div class="weui-toast weui_loading_toast album-loading-toast weui-toast--visible">'
                    + '<div class="weui_loading">'
                    + '<i class="weui-loading weui-icon_toast"></i>'
                    + '</div>'
                    + '</div>');
                $.get(isClick + cpId, function (res) {
                    content.find('.album-loading-toast').remove();
                    content.find('.album-mask').remove();
                    isFirstView = false;
                    if (res.response === '1') {
                        var swiperSlideHtml = '';
                        var photoArr = res.data;
                        $.each(photoArr, function (index, item) {
                            swiperSlideHtml += '<div class="swiper-slide"><mip-img src="${item}" alt="" class="img">'
                                + '</mip-img></div>';
                        });
                        var swiperWrapperHtml = '<div class="swiper-wrapper">${swiperSlideHtml}</div>';
                        var swiperContainerHtml = '<div class="swiper-container photo-swiper">'
                            + '${swiperWrapperHtml}<div class="swiper-pagination"></div></div>';

                        content.append(swiperContainerHtml);

                        // var photoSwiper = new Swiper('.photo-swiper', {
                        //     pagination: {
                        //         el: '.swiper-pagination',
                        //         type: 'fraction',
                        //     },
                        // });
                        content.find('.photo-swiper').addClass('show');
                        content.addClass('z-index-cover');
                        $(document.body).addClass('overflow');
                        hiddenPhotoSwiper();
                    } else {
                        $.toast(res.message, 'forbidden');
                    }
                });
            } else {
                content.find('.photo-swiper').addClass('show');
                content.addClass('z-index-cover');
                $(document.body).addClass('overflow');
                hiddenPhotoSwiper();
            }
        });
        function hiddenPhotoSwiper() {
            $(document.body).find('.photo-swiper').on('click', function () {
                $(this).removeClass('show');
                content.removeClass('z-index-cover');
                $(document.body).removeClass('overflow');
            });
        }
    };

    return customElement;
});
