/**
 * @file mip-st-imguploader 组件
 * @author
 */

/* global MIP */

define(function (require) {
    'use strict';
    var uploader = require('./uploader');
    var viewer = require('viewer');
    var customElement = require('customElement').create();


    customElement.prototype.setData = function () {
        var element = this.element;
        var field = element.getAttribute('field');
        var previewEls = element.querySelectorAll('.img-preview');
        var urls = [];
        for (var i = 0; i < previewEls.length; i++) {
            urls.push(previewEls[i].picUrl);
        }
        var data = {};
        data[field] = urls.join(',');
        MIP.setData(data);
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        var element = this.element;
        var url = element.getAttribute('url');
        this.setData();
        var html = '';
        html += '<div class="imguploader-root">';
        html += '    <div class="imguploader-img-container">';
        html += '       <div class="add-image">';
        html += '           <div class="img-inner-container">';
        html += '           </div>';
        html += '       </div>';
        html += '       <div class="imguploader-desc">最多上传6张照片</div>';
        html += '    </div>';
        html += '    <form class="imguploader-add-container hide">';
        html += '        <input type="file" name="file" accept="image/*">';
        html += '    </form>';
        html += '</div>';
        element.innerHTML = html;
        var addImageBtn = element.querySelector('.add-image');
        var imgContainer = element.querySelector('.imguploader-img-container');
        var imgUpLoaderDesc = element.querySelector('.imguploader-desc');
        var input = element.querySelector('.imguploader-add-container input');
        addImageBtn.addEventListener('click', function () {
            input.click();
        }, false);
        input.addEventListener('change', function (e) {
            // hack img size
            if (e.target.files[0].size > 10 * 1000 * 1000) {
                viewer.eventAction.execute('showMsg', element, {
                    text: '上传的图片大小不得超过10M'
                });
                input.value = '';
                return;
            }

            var html = '';
            html += '<div class="img-inner-container">';
            html += '   <div class="percentage">正在加载...</div>';
            html += '   <div class="close-btn"></div>';
            html += '</div>';
            var el = document.createElement('div');
            el.className = 'img-preview';
            el.innerHTML = html;
            var closeBtn = el.querySelector('.close-btn');
            var percentEl = el.querySelector('.percentage');
            imgContainer.insertBefore(el, addImageBtn);
            var previewEls = element.querySelectorAll('.img-preview');
            if (previewEls.length >= 6) {
                addImageBtn.classList.add('hide');
            }
            if (previewEls.length > 0) {
                imgUpLoaderDesc.classList.add('hide');
            }

            closeBtn.addEventListener('click', function () {
                addImageBtn.classList.remove('hide');
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
                var previewEls = element.querySelectorAll('.img-preview');
                if (previewEls.length === 0) {
                    imgUpLoaderDesc.classList.remove('hide');
                }
                me.setData();
            }, false);

            if (!input.value) {
                return;
            }

            uploader(e, {
                method: 'POST',
                form: element.querySelector('form'),
                url: url,
                ratio: 0.1,
                onprogress: function (e) {
                    // 显示固定文字
                    // var percent = parseInt(e.loaded * 100 / e.total, 10);
                    // percentEl.innerHTML = percent + '%';
                },
                onparse: function (err, info) {
                    if (!err) {
                        // 设置预览
                        el.childNodes[0].style.backgroundImage = 'url(' + info.data + ')';
                    }
                },
                callback: function (err, info) {
                    input.value = '';
                    if (!err) {
                        // 利用元素缓存当前url
                        el.picUrl = info.image_url;
                        // 删除上传进度元素，其实设置一个style隐藏也行，不过用不上了还是删了吧
                        percentEl.parentNode.removeChild(percentEl);
                        me.setData();
                    }
                    else {
                        viewer.eventAction.execute('showerrmsg', element, {
                            text: err,
                            buttons: [
                                {
                                    id: 'ok',
                                    value: '重新上传'
                                }
                            ]
                        });
                    }
                }
            });
        }, false);
    };

    return customElement;
});
