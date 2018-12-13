/**
 * @file mip-img-upload 组件
 * @author
 */

define(function (require) {
    'use strict';
    let $ = require('zepto');
    let customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        // let ele = this.element
        $('.star ul li').click(function () {
            $(this).addClass('active');
            $(this).prevAll('li').addClass('active');
            $(this).nextAll('li').removeClass('active');
        });

        $('.default').click(function () {
            $('.upload-txt').click();
        });

        let imgList = [];

        $('.upload-txt').change(function (e) {
            if ($('.upload-cell').length !== 5) {
                let reads = new FileReader();
                let file = e.target.files[0];
                if (file) {
                    reads.readAsDataURL(file);
                    reads.onload = function () {
                        imgList.push(this.result);
                        $('.default').before(`
                            <div class='upload-cell' style='background-image: url(${this.result})'>
                                 <p class='upload-cell-close'></p>
                            </div>
                        `);
                        $('.num-wrapper .num').text(imgList.length);
                    };
                }
            }

        });

        $('.upload').on('click', '.upload-cell-close', function (e) {
            e.stopPropagation();
            let index = $(this).parent('.upload-cell').index();
            imgList.splice(index, 1);
            $(this).parent('.upload-cell').remove();
            $('.num-wrapper .num').text(imgList.length);

        });

        $('.btn').click(function () {
            console.log(imgList);
        });
    };

    return customElement;
});
