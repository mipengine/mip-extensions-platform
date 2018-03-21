/**
 * @file mip-cy-quick-question 组件
 * @author 春雨前端开发组
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    require('./initJs');
    var customElement = require('customElement').create();
    var domain = 'https://biztest.chunyu.me';

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.build = function () {
        var $ele = $(this.element);

        /**
         * 初始化依赖第三方组件的部分
         */
        init();

        function init() {
            if (window.CYUI) {
                var uploader = window.CYUI.uploader;
                var gallery = window.CYUI.gallery;
                var alert = window.CYUI.alert;
                var toast = window.CYUI.toast;
                var confirm = window.CYUI.confirm;
                var datePicker = window.CYUI.datePicker;
                var uploadCount = 0;
                var askBtn = $ele.find('.j-ask-btn');
                var descriptionDom = $ele.find('#description');
                var dateDom = $ele.find('#date');

                /**
                 * 上传图片
                 */
                uploader('#cy-uploader', {
                    url: domain + '/files/upload_multi_image/?type=image&return_full=true',
                    auto: true,
                    type: 'file',
                    fileVal: 'fileVal',
                    compress: {
                        width: 1600,
                        height: 1600,
                        quality: .8
                    },
                    onBeforeQueued: function (files) {
                        // `this` 是轮询到的文件, `files` 是所有文件
                        if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(this.type) < 0) {
                            alert('请上传图片');
                            return false;
                        }
                        if (this.size > 10 * 1024 * 1024) {
                            alert('请上传不超过10M的图片');
                            return false;
                        }
                        // 防止一下子选择过多文件
                        if (files.length > 5) {
                            alert('最多只能上传5张图片，请重新选择');
                            return false;
                        }
                        if (uploadCount + 1 > 5) {
                            alert('最多只能上传5张图片');
                            return false;
                        }

                        ++uploadCount;
                        $ele.find('#uploadCount').html(uploadCount);
                    },
                    onQueued: function () {
                        console.log(this);
                    },
                    onBeforeSend: function (data, headers) {
                        console.log(this, data, headers);
                    },
                    onProgress: function (procent) {
                        console.log(this, procent);
                    },
                    onSuccess: function (ret) {
                        toast('图片上传成功');
                        console.log(this, ret);
                    },
                    onError: function (err) {
                        toast('图片上传失败，请重试');
                        console.log(this, err);
                    }
                });

                $ele.find('#uploaderFiles').on('click', 'li', function () {
                    var url = this.getAttribute('style');
                    var $this = $(this);
                    if (url) {
                        url = url.match(/url\((.*?)\)/)[1].replace(/'/g, '');
                    }
                    // gallery 展示图片，删除图片
                    var gallery1 = gallery(url, {
                        className: 'custom-classname',
                        onDelete: function () {
                            confirm('确定删除该图片？', function () {
                                console.log('删除');
                                --uploadCount;
                                $ele.find('#uploadCount').html(uploadCount);
                                $this.remove();
                            });
                            gallery1.hide(function () {
                                console.log('`gallery` has been hidden');
                            });
                        }
                    });
                });

                $ele.find('#showDatePicker').on('click', function () {
                    datePicker({
                        start: 1990,
                        end: getDateStr(),
                        onConfirm: function (result) {
                            var str = '';
                            for (var i = 0; i < result.length; i++) {
                                if (i === 0) {
                                    str += String(result[i].value);
                                }
                                else {
                                    str += '-' + String(result[i].value);
                                }
                            }
                            $ele.find('#showDatePicker').html(str).css('color', '#666');
                            dateDom.val(str);
                            checkSubmitStatus();
                        }
                    });
                });

                askBtn.on('click', function () {
                    if (askBtn.hasClass('disabled')) {
                        return;
                    }
                    if (validateFrom()) {
                        submitFrom();
                    }
                });

                $ele.find('.j-check-label').on('click', function () {
                    checkSubmitStatus();
                });
                descriptionDom.on('input', function () {
                    checkSubmitStatus();
                });

                /**
                 * 检测提交按钮是否可用
                 */
                function checkSubmitStatus() {
                    var description = descriptionDom.val();
                    var len = description.trim().length;
                    var sex = $ele.find('input[name=sex]:checked').val();
                    var date = dateDom.val();
                    if (len && sex && date) {
                        askBtn.removeClass('disabled');
                    }
                    else if (!askBtn.hasClass('disabled')) {
                        askBtn.addClass('disabled');
                    }
                }

                function validateFrom() {
                    var description = descriptionDom.val();
                    var len = description.trim().length;
                    var sex = $ele.find('input[name=sex]:checked').val();
                    var date = dateDom.val();

                    if (len < 10 || len > 1000) {
                        toast('字数限制为10~1000');
                    }
                    else if (!sex) {
                        toast('请选择性别');
                    }
                    else if (!date) {
                        toast('请选择出生日期');
                    }
                    else {
                        return true;
                    }
                }

                function submitFrom() {
                    askBtn.addClass('disabled');
                    var partner = 'chunyu_xzh';
                    var content = JSON.stringify([{
                        type: 'text',
                        text: descriptionDom.val()
                    }, {
                        type: 'patient_meta',
                        sex: $ele.find('input[name=sex]:checked').val(),
                        age: dateDom.val()
                    }]);

                    $.ajax({
                        url: domain + '/cooperation/wap/create_free_problem/',
                        dataType: 'json',
                        type: 'post',
                        cache: false,
                        data: {
                            partner: partner,
                            content: content
                        },
                        complete: function () {
                            askBtn.removeClass('disabled');
                        },
                        success: function (res) {
                            if (res.error === 0) {
                                var problemId = res.problem_id;
                                window.location.href = domain + '/mip/qa_upgrade_page/?problem_id=' + problemId;
                            }
                            else {
                                toast(res.error_msg);
                            }
                        },
                        error: function () {
                            toast('数据加载失败，刷新页面重试');
                        }
                    });
                }

                /**
                 * 计算当前日期
                 * @return {string} 格式'YYYY-MM-DD'
                 */
                function getDateStr() {
                    var date = new Date();
                    var mon = date.getMonth() + 1;
                    var day = date.getDate();
                    var nowDay = date.getFullYear()
                    + '-' + (mon < 10 ? '0' + mon : mon)
                    + '-' + (day < 10 ? '0' + day : day);
                    return nowDay;
                }

            }
            else {
                setTimeout(init, 0);
            }
        }
    };

    return customElement;
});
