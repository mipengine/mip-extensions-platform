/**
 * @file mip-jia-stylexam 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var styleSwiper;
    var manner = {
        currentStage: 1,
        selectImageList: [],
        ignoreImageList: [],
        init: function (obj, data) {
            this.event.guideClick(obj);
            this.event.imgItemClick(obj, data);
            this.event.navClick(obj, data);
            this.event.inputCheck(obj);
            this.event.radioClick(obj);
            this.event.freeDecorationClick(obj, data);
            this.method.displayImage(0, obj, data);
        },
        event: {
            guideClick: function (obj) {
                obj.find('.test-btn').click(function () {
                    obj.find('.love-section').show();
                    obj.find('.guide-section').hide();
                    manner.event.swiperInit();
                });
            },
            swiperInit: function () {
                var Swipern = window.Swiper;
                styleSwiper = new Swipern('.style-swiper-container', {
                    pagination: '.swiper-pagination',
                    onlyExternal: true,
                    paginationType: 'progress',
                    watchSlidesProgress: true,
                    paginationProgressRender: function (swiper, progressbarClass) {
                        return '<p class="group-title">第<a>' + 1 + '</a>轮</p>'
                            + '<div class="progress-box"><span class="' + progressbarClass + '"></span></div>'
                            + '<span class="percent">' + swiper.progress + '%</span>';
                    }
                });
            },
            inputCheck: function (obj) {
                obj.find('#phoneNum').on('input', function () {
                    var phone = obj.find('#phoneNum').val();
                    if (!phone || phone.length < 11) {
                        if (!obj.find('#freeGetDecoration').hasClass('disable')) {
                            obj.find('#freeGetDecoration').addClass('disable');
                        }
                        return false;
                    }
                    if (manner.method.validateData(obj) && manner.method.checkPhone(obj)) {
                        obj.find('#freeGetDecoration').removeClass('disable');
                        obj.find('.quotation-wrong').addClass('none').find('.wrong-text').html('');
                    }
                    else if (!obj.find('#freeGetDecoration').hasClass('disable')) {
                        obj.find('#freeGetDecoration').addClass('disable');
                    }
                });
            },
            navClick: function (obj, data) {
                obj.find('.nav-back').click(function () {
                    if (manner.currentStage === 1) {
                        obj.find('.nav-title').html('风格测试');
                        if (styleSwiper.activeIndex === 0) {
                            obj.find('.love-section').hide();
                            obj.find('.guide-section').show();
                        }
                        else {
                            styleSwiper.slidePrev();
                            manner.method.refushSwiperMessage(obj);
                        }
                    }
                    if (manner.currentStage === 2) {
                        manner.method.switchStage(1, obj);
                    }
                });
            },
            imgItemClick: function (obj, data) {
                obj.find('.img-item').on('click', function () {
                    var activeIndex = styleSwiper.activeIndex;
                    manner.selectImageList.splice(activeIndex, manner.selectImageList.length - activeIndex);
                    manner.ignoreImageList.splice(activeIndex, manner.ignoreImageList.length - activeIndex);
                    manner.method.addSelectImage($(this).data('image'));
                    manner.method.addIgnoreImage($(this).siblings().data('image'));
                    manner.method.displayImage(activeIndex + 1, obj, data);
                    if (activeIndex === 5) {
                        manner.method.switchStage(2, obj);
                        var examResult = manner.method.examResult();
                        obj.find('.style').val(data.styleMapping[examResult]);
                    }
                    styleSwiper.slideNext();
                    manner.method.refushSwiperMessage(obj);
                });
            },
            radioClick: function (obj) {
                obj.find('input[name=chk],input[name=chk2]').on('click', function () {
                    if (manner.method.validateData(obj) && manner.method.checkPhone(obj)) {
                        obj.find('#freeGetDecoration').removeClass('disable');
                        obj.find('.quotation-wrong').addClass('none').find('.wrong-text').html('');
                    }
                    else if (!obj.find('#freeGetDecoration').hasClass('disable')) {
                        obj.find('#freeGetDecoration').addClass('disable');
                    }
                    obj.find('.jtjg').val(obj.find('input[name=chk]:checked')
                        .closest('.structure-item').find('p').html());
                    obj.find('.zxys').val(obj.find('input[name=chk2]:checked').siblings().html());
                });
            },
            freeDecorationClick: function (obj, data) {
                obj.find('#freeGetDecoration').click(function () {
                    if (obj.find('#freeGetDecoration').hasClass('disable')) {
                        return false;
                    }
                    var phone = obj.find('#phoneNum').val();
                    var structure = obj.find('.structure-item input[type="radio"]:checked')
                        .closest('.structure-item').find('p').html();
                    var budget = obj.find('.budget-item input[type="radio"]:checked').siblings().html();
                    var examResult = manner.method.examResult();

                    if (!phone || phone.length < 11) {
                        obj.find('.quotation-wrong').removeClass('none').find('.wrong-text').html('注：请填写正确的手机号码！');
                        return false;
                    }
                    if (!examResult || examResult === undefined || examResult.length <= 0) {
                        obj.find('.quotation-wrong').removeClass('none').find('.wrong-text').html('注：风格测试失败，请重新测试！');
                        obj.find('#freeGetDecoration').removeClass('disable');
                        return false;
                    }
                    window.location.href = data.resultlink + '?style=' + data.styleMapping[examResult]
                        + '&phone=' + phone + '&structure=' + encodeURIComponent(structure)
                        + '&budget=' + encodeURIComponent(budget);
                });
            }
        },
        method: {
            refushSwiperMessage: function (obj) {
                obj.find('.percent').html(styleSwiper.progress * 100 + '%');
                obj.find('.group-title').html('第<a>' + (styleSwiper.activeIndex + 1) + '</a>轮');
            },
            addSelectImage: function (value) {
                manner.selectImageList.push(value);
            },
            addIgnoreImage: function (value) {
                manner.ignoreImageList.push(value);
            },
            displayImage: function (imgGroupIndex, obj, data) {
                var imgGroupItem = obj.find('.imgGroup').eq(imgGroupIndex);
                var imgAIndex;
                var imgBIndex;
                switch (imgGroupIndex) {
                    case 1:
                        imgAIndex = 8;
                        imgBIndex = 12;
                        break;
                    case 2:
                        imgAIndex = 16;
                        imgBIndex = 20;
                        break;
                    case 3:
                        imgAIndex = parseInt(manner.selectImageList[0], 10) + 1;
                        imgBIndex = parseInt(manner.selectImageList[1], 10) + 1;
                        break;
                    case 4:
                        imgAIndex = parseInt(manner.selectImageList[2], 10) + 1;
                        imgBIndex = parseInt(manner.ignoreImageList[3], 10) + 1;
                        break;
                    case 5:
                        imgAIndex = parseInt(manner.selectImageList[4], 10) + 1;
                        imgBIndex = parseInt(manner.selectImageList[3], 10) + 1;
                        break;
                    default:
                        imgAIndex = 0;
                        imgBIndex = 4;
                        break;
                }
                obj.find(imgGroupItem).find('.img-item').eq(0).data('image', imgAIndex);
                obj.find(imgGroupItem).find('.img-item').eq(1).data('image', imgBIndex);
                obj.trigger('scroll');
                obj.find(imgGroupItem).find('mip-img').eq(0).attr('src', data.dataImageList[imgAIndex]);
                obj.find(imgGroupItem).find('mip-img').eq(1).attr('src', data.dataImageList[imgBIndex]);
            },
            examResult: function () {
                var aStyle = 0;
                var bStyle = 0;
                var cStyle = 0;
                var dStyle = 0;
                var eStyle = 0;
                var fStyle = 0;
                for (var i = 0; i < manner.selectImageList.length; i++) {
                    var value = manner.selectImageList[i];
                    if (0 <= value && value < 4) {
                        aStyle += 1;
                        continue;
                    }
                    if (4 <= value && value < 8) {
                        bStyle += 1;
                        continue;
                    }
                    if (8 <= value && value < 12) {
                        cStyle += 1;
                        continue;
                    }
                    if (12 <= value && value < 16) {
                        dStyle += 1;
                        continue;
                    }
                    if (16 <= value && value < 20) {
                        eStyle += 1;
                        continue;
                    }
                    if (20 <= value && value < 24) {
                        fStyle += 1;
                    }
                }
                if (aStyle >= 3) {
                    return '美式';
                }
                if (bStyle >= 3) {
                    return '中式';
                }
                if (cStyle >= 3) {
                    return '田园';
                }
                if (dStyle >= 3) {
                    return '地中海';
                }
                if (eStyle >= 3) {
                    return '简约';
                }
                if (fStyle >= 3) {
                    return '欧式';
                }
            },
            switchStage: function (stage, obj) {
                if (stage === 1) {
                    obj.find('.nav-title').html('风格测试');
                    obj.find('.page-first').show();
                    obj.find('.page-second').hide();
                    manner.currentStage = 1;
                }
                if (stage === 2) {
                    obj.find('.nav-title').html('您的装修要求');
                    obj.find('.page-first').hide();
                    obj.find('.page-second').show();
                    manner.currentStage = 2;
                }
                obj.find('.manner').scrollTop(0);
            },
            filltext: function (ele, textdetail, status) {
                var thisEle = $(ele);
                if (textdetail !== '') {
                    thisEle.parent('.require-default').find('.require-text').html(textdetail);
                }
                if (status && status === 'error') {
                    thisEle.parent('.require-default').removeClass('fill').find('.require-kh,.require-text');
                } else {
                    thisEle.parent('.require-default').addClass('fill');
                }
            },
            checkPhone: function (obj) {
                var ele = obj.find('#phoneNum');
                var eleOld = ele.parent().find('.require-text').html();
                var textdetail = ele.val();
                if (ele.hasClass('none')) {
                    textdetail = eleOld;
                }
                var regexp = /0?(13|14|15|17|18)[0-9]{9}/;
                if (textdetail.trim() === '') {
                    manner.method.filltext(ele, textdetail, 'error');
                    return false;
                } else if (regexp.test(textdetail)) {
                    obj.find('.quotation-wrong').addClass('none').find('.wrong-text').html('');
                    manner.method.filltext(ele, textdetail);
                    return true;
                } else {
                    manner.method.filltext(ele, textdetail, 'error');
                    obj.find('.quotation-wrong').removeClass('none').find('.wrong-text').html('注：手机号有误，请重新输入');
                    return false;
                }
            },
            validateData: function (obj) {
                var familyStruct = obj.find('input[name=chk]:checked').val();
                var budget = obj.find('input[name=chk2]:checked').val();
                var phone = obj.find('#phoneNum').val();
                if (!familyStruct || !budget || phone.length === 0) {
                    return false;
                }
                return true;
            }
        }
    };

    customElement.prototype.firstInviewCallback = function () {
        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
        }
        catch (e) {
            return false;
        }
        window.addEventListener('load', function () {
            manner.init($(thisObj), data);
        });

    };

    return customElement;
});
