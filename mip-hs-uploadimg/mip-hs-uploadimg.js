/**
 * @file mip-hs-uploadimg 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('jquery');
    // 因为有些方法zepto不支持，比如is等
    var customElement = require('customElement').create();

    /**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        ~(function (win) {
            var htmls = '<input type="file" name="" id="" class="imgFiles" style="display: none" '
                + 'accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" multiple>'
                + '<div class="header">'
                + '<span class="imgClick">'
                + '</span>'
                + '</div>'
                + '<div class="imgAll">'
                + '<ul>'
                + '</ul>'
                + '</div>';
            var ImgUploadeFiles = function (obj, fn) {
                var This = this;
                this.bom = document.querySelector(obj);

                if (fn) {
                    fn.call(This);
                }

                this.ready();

            };
            var dataArr = [];
            var ImgFileupload = function (b, imgName, imgSrc, imgSize, callback) {
                this.b = b;
                this.imgName = imgName;
                this.imgSize = imgSize;
                this.imgSrc = imgSrc;
                this.callback = callback;
            };
            var Private = function () {};
            Private.prototype = {
                startUploadImg: function (o, files, MAX, callback, W, H) {
                    dataArr.length = 0;
                    var This = this;
                    var fileImgArr = [];

                    if (files.length > MAX) {
                        //				require('alert').alert.openAlert('不能大于' + MAX + '张');
                        alert('不能大于' + MAX + '张');
                        return false;
                    }

                    var lens = $(o).find('li').length;
                    if (lens >= MAX) {
                        //				require('alert').alert.openAlert('不能大于' + MAX + '张');
                        alert('不能大于' + MAX + '张');
                        return false;
                    }

                    for (var i = 0, file; file = files[i++];) {

                        var reader = new FileReader();
                        reader.onload = (function (file) {
                            return function (ev) {
                                var image = new Image();
                                image.onload = function () {
                                    var width = image.width;
                                    var height = image.height;

                                    fileImgArr.push({
                                        fileSrc: ev.target.result,
                                        fileName: file.name,
                                        fileSize: file.size,
                                        height: height,
                                        width: width
                                    });
                                };
                                image.src = ev.target.result;

                            };
                        })(file);
                        reader.readAsDataURL(file);
                    }
                    // 创建分时函数
                    var imgTimeSlice = This.timeChunk(fileImgArr, function (file) {
                        if (file.width > W || file.height > H) {
                            alert('图片不能大于' + W + '*' + H + '像素');
                            return false;
                        }

                        // 调用图片类
                        var up = new ImgFileupload(o, file.fileName, file.fileSrc, file.fileSize, callback);
                        up.init();
                    }, 1);
                    imgTimeSlice(); // 调用分时函数
                },
                timeChunk: function (arr, fn, count) {
                    var obj;
                    var t;
                    var len = arr.length;
                    var start = function () {
                        for (var i = 0; i < Math.min(count || 1, arr.length); i++) {
                            var obj = arr.shift();
                            fn(obj);
                        }
                    };
                    return function () {
                        t = setInterval(function () {
                            if (arr.length === 0) {
                                return clearInterval(t);
                            }

                            start();
                        }, 200);
                    };
                }
            };
            ImgUploadeFiles.prototype = {
                init: function (o) {
                    this.MAX = o.MAX || 3;
                    this.callback = o.callback;
                    this.MW = o.MW || 10000;
                    this.MH = o.MH || 10000;
                },
                ready: function () {
                    var self = this;
                    this.dom = document.createElement('div');
                    this.dom.className = 'imgFileUploade';
                    this.dom.innerHTML = htmls;
                    this.bom.appendChild(this.dom);
                    this.files = this.bom.querySelector('.imgFiles');
                    this.fileClick = this.bom.querySelector('.imgClick');
                    this.fileBtn(this.fileClick, this.files);
                    //			this.imgcontent = this.bom.querySelector('.imgcontent');
                    //			this.imgcontent.innerHTML = '请上传<b style="color:red">' + this.MAX + '</b>张' + self.MW + ' * ' + self.MH + '像素的图片';

                },
                fileBtn: function (c, f) {
                    var self = this;
                    var imgAll = $(c).parent().parent().find('.imgAll ul');
                    $(c).off().on('click', function () {
                        $(f).click();

                        $(f).off().on('change', function () {
                            var This = this;
                            var Drivate = new Private();
                            Drivate.startUploadImg(imgAll, This.files, self.MAX, self.callback, self.MW, self.MH);
                        });
                    });
                }
            };

            var delIdnum = 1; // 删除id用于判断删除个数
            ImgFileupload.prototype.init = function () {
                delIdnum++;
                var self = this;
                this.dom = document.createElement('li');
                this.dom.innerHTML = '<mip-img src="'
                    + this.imgSrc
                    + '" alt="" data-src="'
                    + this.imgSrc
                    + '" class="imsg"><mip-img>'
                    + '<i class="delImg">'
                    + 'X'
                    + '</i>';
                $(this.dom).attr({
                    'data-delId': delIdnum,
                    'data-delName': this.imgName
                });
                $(this.b).append(this.dom);
                var sImg = new Image();
                sImg.src = $(this.dom).find('img').attr('data-src');
                sImg.onload = function () {
                    $(self.dom).find('img').attr('src', sImg.src);
                };
                dataArr.push({
                    delId: delIdnum,
                    src: this.imgSrc
                });
                self.callback(dataArr);
                // $(this.b).parent().parent().parent().attr('data-dataImgs',JSON.stringify(dataArr));
                var delAll = $(this.b).find('.delImg');
                for (var i = 0; i < delAll.length; i++) {
                    $(delAll[i]).off().on('click', function () {
                        $(this).parent().parent().parent().fadeOut('slow', function () {
                            $(this).remove();
                        });
                        var deid = $(this).parent().attr('data-delId');
                        for (var n = 0; n < dataArr.length; n++) {
                            if (dataArr[n].delId === deid) {
                                dataArr.splice(n, 1);
                            }

                        }
                        self.callback(dataArr);
                        // $(this.b).parent().parent().parent().attr('data-dataImgs',JSON.stringify(dataArr))

                    });
                }
                var Imgpreview = $(this.b).find('img');
                for (var k = 0; k < Imgpreview.length; k++) {
                    $(Imgpreview[k]).off().on('click', function () {
                        console.log($(this).attr('src'));
                    });
                }

            };

            win.ImgUploadeFiles = ImgUploadeFiles;
            var imgFile = new ImgUploadeFiles('.imgbox', function (e) {
                this.init({
                    MAX: 3, // 限制个数
                    MH: 5800, // 像素限制高度
                    MW: 5900, // 像素限制宽度
                    callback: function (arr) {
                        console.log(arr);
                    }
                });
            });
        })(window);

    };

    return customElement;
});
