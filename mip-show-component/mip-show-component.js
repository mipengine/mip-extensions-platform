/**
 * @file mip-show-component 组件
 * @author yxl
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        var doc = $(element).find('#zt_cb_product');
        var urlPara = $(element).attr('data-src');
        swiperLawyer2(doc, urlPara);
    };

    customElement.prototype.firstInviewCallback = function () {

    };

    function swiperLawyer2(div, urlPm, params) {
        var liArr = $('.j-tag-list .tag-item');
        var liLen = liArr.length;
        var random = function (m, n) {
            return m + Math.floor(Math.random() * (n - m));
        };
        var ran = random(0, liLen);
        var itemIndex = $(liArr[ran]).attr('data-id');
        $(liArr[ran]).addClass('active scale-1px-4').siblings('li').removeClass('active scale-1px-4');
        $('.j-tag-list').toggleClass('max-height');
        $('.j-more').on('click',
        function () {
            var self = $(this);
            self.toggleClass('down');
            $('.j-tag-list').toggleClass('max-height');
        });
        urlPostProduct(div, urlPm, params, itemIndex);
        $('.j-tag-list').on('click', 'li',
        function () {
            var self = $(this);
            itemIndex = self.attr('data-id');
            self.addClass('active scale-1px-4').siblings('li').removeClass('active scale-1px-4');
            urlPostProduct(div, urlPm, params, itemIndex);
        });
    }
    function urlPostProduct(div, urlPm, params, itemIndex) {
        var divDom = $(div);
        var str = '';
        var urlPm = urlPm || 'indexTwo&nocache=1&position=87&profid=' + itemIndex;
        var urlpath = '//g.findlaw.cn/index.php?m=Touch&a=' + urlPm + '&requestmode=async&jsoncallback=?';
        $.getJSON(urlpath,
        function (data) {
            if (typeof data !== 'undefined' && data !== '' && data != null) {
                var title = '';
                showLawyerTwo(divDom, title, data, params, itemIndex);
                $('#city').html(data.areaInfo.city);
                $('#more-url').attr('href', 'http://m.findlaw.cn/' + data.areaInfo.pinyin + '/');
            } else {
                divDom.html('').show();
            }
        });
    }

    function showLawyerTwo(cosdiv, title, data, params, dataId) {
        var lawyer = '';
        var html = '';
        var postfix = '律师';
        var list = data.proData;
        lawyer += '  <ul class="law-list">';
        var url = '';
        var photo = '';
        var username = '';
        var mobile = '';
        var href = '';
        var honortype = '';
        $.each(list,
        function (index2, law) {
            if (law === '' || law == null) {
                url = 'http://m.findlaw.cn/?c=index&a=lawyerjoin';
                photo = '//img1.findlawimg.com/img/touch_front/v3/global/default.gif';
                username = '诚邀加盟';
                mobile = '400-678-6088';
                href = '<a href="' + url + '" class="const-me scale-1px-4">咨询我</a>';
                honortype = '&nbsp';
            } else {
                if (typeof(law) === 'object' && law.u_uid) {
                    url = 'http://m.findlaw.cn/lawyer/' + law.u_uid + '/';
                    photo = law.u_file110135;
                    username = law.u_username;
                    mobile = law.u_mobile;
                    href = '<a href="https://m.findlaw.cn/lawyer/' + law.u_uid + '/consult/" class="const-me scale-1px-4">咨询我</a>';
                    honortype = law.u_honortype;
                }

            }
            lawyer += ' <li class="law-li">' + ' <a href="' + url + '" class="law-box mr01">'
			+ '<img class="law-img" src="' + photo + '" alt="' + username + postfix + '"></a>'
			+ '<div class="law-name">' + username + '</div>' + ' <p class="tag">' + honortype + '</p>' + href + '</li>';
        });
        lawyer += '</ul>';
        cosdiv.html(lawyer).show();
    }

    return customElement;
});