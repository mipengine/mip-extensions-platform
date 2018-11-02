/**
 * @file mip-qqtn-clicktab
 * 点击对应标签隐藏显示div
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        $(ele).find('#m-game-introd').click(function () {
            $(this).addClass('m-hover').siblings().removeClass('m-hover');
            $('section,.showad,.g-previmg-box,.f-tags-box,.f-admorediv,.f-cont-bd').show();
            $('.g-box').show();
            $('.g-down-introd').removeClass('no');
            $('.g-down-introd').removeClass('no-two');
        });
        $(ele).find('#m-game-tutorail').click(function () {
            $(this).addClass('m-hover').siblings().removeClass('m-hover');
            $('.g-previmg-box,.g-down-information,.g-down-recomd,.m-comment,.showad,#g-keyword').hide();
            $('.g-key-ohter,#g-recomd-game,.f-tags-box,.f-admorediv,.f-cont-bd,#comment').hide();
            $('.g-cms-relatedcms').show();
            $('.g-down-introd').addClass('no');
            $('.g-down-introd').removeClass('no-two');
        });
        $(ele).find('#m-game-comment').click(function () {
            $(this).addClass('m-hover').siblings().removeClass('m-hover');
            $('.g-previmg-box,.g-down-information,.g-down-recomd,.g-cms-relatedcms,.showad').hide();
            $('#g-keyword,.g-key-ohter,#g-recomd-game,.f-tags-box,.f-admorediv,.f-cont-bd').hide();
            $('.m-comment,#comment').show();
            $('.g-down-introd').removeClass('no');
            $('.g-down-introd').addClass('no-two');
        });
    };
    return customElement;
});