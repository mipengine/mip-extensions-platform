/**
 * @file 上传文件组件
 *
 * @author liyinan
 * @version 1.0.0
 * @date 2018-05-04
 */

define(function (require) {
    function upload(file, options) {
        var form = options.form;
        var ratio = options.ratio || 0.1;
        options.callback = options.callback || function () {};
        if (!/image/.test(file.type)) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // patch subsampling bug
                // http://jsfiddle.net/gWY2a/24/
                var drawImage = ctx.drawImage;
                ctx.drawImage = function (drawImg, sx, sy, sw, sh, dx, dy, dw, dh) {
                    /* eslint-enable */
                    // Execute several cases (Firefox does not handle undefined as no param)
                    // by call (apply is bad performance)
                    if (arguments.length === 9) {
                        drawImage.call(ctx, drawImg, sx, sy, sw, sh, dx, dy, dw, dh);
                    }
                    else if (typeof sw !== 'undefined') {
                        drawImage.call(ctx, drawImg, sx, sy, sw, sh);
                    }
                    else {
                        drawImage.call(ctx, drawImg, sx, sy);
                    }
                };
                var height = img.height * ratio;
                var width = img.width * ratio;
                canvas.height = height;
                canvas.width = width;
                ctx.drawImage(img, 0, 0, width, height);
                // var base64 = canvas.toDataURL('image/png');
                var info = {
                    file: file,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: e.target.result
                };
                if (options.onparse) {
                    options.onparse(null, info);
                }
                canvas.toBlob(function (blob) {
                    if (!options.validate || options.validate(info)) {
                        // fetch 没有progress功能，只好用xhr
                        var xhr = new XMLHttpRequest();
                        var method = options.method || 'get';
                        var formData = new FormData();
                        formData.append('file', new File([blob], file.name, {type: file.type}));
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    try {
                                        var res = JSON.parse(xhr.responseText);
                                        if (!res.code) {
                                            // res.data.base64 = base64;
                                            options.callback(null, res.data);
                                        }
                                        else {
                                            options.callback(res.msg);
                                        }
                                    }
                                    catch (e) {
                                        options.callback(e);
                                    }
                                }
                            }
                        };
                        xhr.onprogress = options.onprogress;
                        xhr.open(method, options.url, true);
                        xhr.send(formData);
                    }
                });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    return function (e, options) {
        if (!options.url) {
            throw 'uploader param url missing';
        }
        var files = e.target.files;
        // hack
        for (var i = 0; i < 1; i++) {

            var f = files[i];
            if (!f || !f.size) {
                continue;
            }
            upload(f, options);
        }
    };
});
