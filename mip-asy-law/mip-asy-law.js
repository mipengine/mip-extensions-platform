/**
 * @file mip-asy-law 组件
 * @author YanChengLong
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /** [bindEven 绑定事件]
     *
     * @param {Object} element [mip-asy-law元素]
     * @param {Object} params [来自mip-asy-law的属性]
     */
    function bindEven(element, params) {
        $(document).ready(function () {
            if (!params.url) {
                return;
            };
            $.ajax({
                url: params.url,
                type: 'GET',
                dataType: 'jsonp',
                success: function (result) {
                    $('#' + params.containerId).append(toHtml(result));
                }
            });
        });
    }

    function label(prof) {
        if (prof && prof.length > 0) {
            if (prof.length > 3) {
                prof.length = 3;
            }
            var arr = prof.map(function (value) {
                return (
                    '<span class="label-item">' + value.name + '</span>'
                );
            });
            return (arr.join(''));
        }
        return '';
    }

    function honest(card, username) {
        if (card && card.wltflag) {
            return '<mip-img class="icon-badge" src="http://img1.findlawimg.com/img/touch_front/v3/global/icon-honest.png" class="icon-badge"+alt="' + username + '律师"></mip-img>';
        }
        return '';
    }

    function toHtml(data) {
        var html = data.proData.map(function (value) {
            return (
                '<div class="swiper-slide">\n'
                + '    <div class="common-team-info">\n'
                + '        <span class="team-badge">\n'
                + honest(value.u_card, value.u_username)
                + '        </span>\n'
                + '        <a href="http://m.findlaw.cn/lawyer/' + value.u_uid + '/" class="info-photo">\n'
                + '            <mip-img class="img" src="' + value.u_file6464 + '" alt="'
                + value.u_username + '律师"></mip-img>\n'
                + '        </a>\n'
                + '        <a href="http://m.findlaw.cn/lawyer/' + value.u_uid + '/" class="info-title">' + value.u_username + '</a>\n'
                + '        <p class="team-labels">\n'
                + label(value.u_prof)
                + '        </p>\n'
                + '        <span on="tap:consult-lightbox.toggle">\n'
                + '            <a href="https://m.findlaw.cn/lawyer/' + value.u_uid + '/consult/" class="team-consult" >咨询我</a>\n'
                + '        </span>\n'
                + '    </div>\n'
                + '</div>'
            );
        });
        return ('<div class="swiper-wrapper item-' + data.proData.length + '">' + html.join('') + '</div>');
    }

    /** [构造元素，只会运行一次]
     *
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var params = JSON.parse($(element).attr('mip-ajax-params').replace(/'/g, '"'));
        bindEven(element, params);
    };

    return customElement;
});
