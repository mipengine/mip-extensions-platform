/**
 * @file mip-qinbao-customaudio 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var textArr;
    var audioUrl = '';
    var itemIndex = 0;
    var audioIndex = 0;
    var pageIndex = 0;
    var customaudio = {
        panelShow: function (o) {
            $('.art-body .item').each(function (index) {
                var HTML = '<div class="qin_audio"><div class="audio_icon" data-index="' + index + '"';
                HTML += 'title="' + $(this).find('p').eq(0).text() + '">听声音</div></div>';
                $(this).prepend(HTML);
            });
            var t = this;
            $(o).each(function () {
                $(this).click(function () {
                    itemIndex = $(this).attr('data-index');
                    t.getText(itemIndex);
                    t.getAudio(itemIndex);
                });
            });
        },
        end: function () {
            var t =  this;
            $('#audio-sound audio').unbind('ended').bind('ended', function () {
                pageIndex++;
                var len = textArr.length;
                if (len - pageIndex > 0) {
                    t.getAudio(pageIndex);
                }
                else {
                    var maxLen = $('.art-body .item').length;
                    var next = parseInt(audioIndex, 10) + parseInt(1, 10);
                    if (parseInt(maxLen, 10) - parseInt(next, 10) > 0) {
                        audioIndex++;
                        t.getText(audioIndex);
                        t.getAudio(audioIndex);
                    }
                    else {
                        $('.audio_panel i.control').addClass('play');
                    }
                }

            });
        },
        panelLoad: function (src) {
            $('.audio_control').remove();
            src = (src) ? src : 'https://m.qbaobei.com/Public/Home/qbaobeimobile2/mp3/station.mp3';
            var html = '<mip-audio src="' + src + '" class="audio_control" id="audio-sound">';
            html += '<ul controller>';
            html += '<i class="horn"></i>';
            html += '<font>正在收听：</font>';
            html += '<s><em></em></s>';
            html += '<div class="audio_panel">';
            html += '<i class="prev"></i>';
            html += '<i play-button class="control mip-audio-playing-icon"></i>';
            html += '<i class="next"></i>';
            html += '<i class="close"></i>';
            html += '</div>';
            html += '<div seekbar>';
            html += '<div seekbar-fill class="bg-color-pink2"></div>';
            html += '<div seekbar-button class="bg-color-pink3"></div>';
            html += '</div>';
            html += '<div current-time class="color-gray">00:00</div>';
            html += '<div total-time class="color-gray">--:--</div>';
            html += '</ul>';
            html += '</mip-audio>';
            $('body').append(html);
            $('.audio_control').show();
            $('[play-button]').trigger('click');
            this.panelPos('.audio_control');
            this.end();
            $('.audio_control').find('em').text($('.art-body .audio_icon').eq(itemIndex).attr('title'));
            this.playControl();
        },
        playControl: function () {
            var t = this;
            var em = $('.audio_control em');
            var t1;
            var t2;
            var t3;
            $('[play-button]').click(function () {
                em.css({left: 0});
                if ($(this).attr('class').search('mip-audio-playing-icon') === -1) {
                    clearTimeout(t1);
                    clearTimeout(t2);
                    clearTimeout(t3);
                }
                else {
                    scrollTitle();
                }
            });
            $('.audio_panel i.close').unbind('click').click(function () {
                $('.audio_control').remove();
            });
            function scrollTitle() {
                var w = Math.floor($('.audio_control ul').width() - $('.audio_control i.horn').width()
                - $('.audio_control font').width() - $('.audio_control .audio_panel').width() - 25);
                $('.audio_control s').css({width: w});
                var ewid = em.width();
                if (ewid > w) {
                    em.text(em.text() + em.text());
                    t1 = setTimeout(scroll, 800);
                }

                function scroll() {
                    if (ewid > Math.abs(parseInt(em.css('left'), 10))) {
                        em.css({left: parseInt(em.css('left'), 10) - 1 + 'px'});
                        t2 = setTimeout(scroll, 30);
                    }
                    else {
                        t3 = setTimeout(scroll2, 30);
                    }
                }

                function scroll2() {
                    em.css({left: 0});
                    scroll();
                }

            }
            scrollTitle();
            $('.audio_panel i.prev').unbind('click').click(function () {
                t.preAudio();
            });

            $('.audio_panel i.next').unbind('click').click(function () {
                t.nextAudio();

            });

        },

        scrollA: function (o) {
            var t = this;
            window.onscroll = function () {
                t.panelPos(o);
            };
        },

        panelPos: function (o) {
            o = $(o);
            var winTop = $(window).scrollTop();
            var dTop = $('header').eq(0).height();
            if (winTop > dTop) {
                o.css({top: 0, position: 'fixed'});
            }
            else {
                o.css({top: dTop, position: 'absolute'});
            }
        },
        getText: function (index) {
            audioIndex = index;
            var strArr = [];
            pageIndex = 0;
            $('.art-body .item').eq(index).find('p').each(
                function () {
                    var str = $(this).text();
                    str = str.replace(/<\/?.+?>/g, '');
                    str = str.replace(/^\s*$/g, '');
                    str = str.replace(/%/g, '%25');
                    str = str.replace(/#/g, '%23');
                    str = str.replace(/&/g, '%26');
                    str = str.replace(/\+/g, '%2B');
                    str = str.replace(/\//g, '%2F');
                    str = str.replace(/\\/g, '%5C');
                    str = str.replace(/:/g, '%3A');
                    str = str.replace(/=/g, '%3D');
                    str = str.replace(/\?/g, '%3F');
                    if (str) {
                        strArr.push(str);
                    }
                }
            );
            textArr = strArr;
        },
        getAudio: function (index) {
            var t = this;
            if ($('.art-body .item').eq(index).find('.audio_icon').attr('title')) {
                $('.audio_control').find('em').text($('.art-body .item').eq(index).find('.audio_icon').attr('title'));
            }
            var p = pageIndex;
            var len = textArr.length;
            var url = 'https://dynamic.qbaobei.com/dynamic.php?s=Qbaobeimobile/getTextToAudio';
            if (len - p > 0) {
                var text = textArr[p];
                if (text) {
                    if (audioUrl === '') {
                        $.ajax({
                            type: 'GET',
                            async: true,
                            url: url,
                            dataType: 'jsonp',
                            jsonp: 'callback',
                            jsonCallback: 'callback',
                            success: function (json) {
                                var status = json.status;
                                if (status === 200) {
                                    audioUrl = json.url;
                                    t.panelLoad(audioUrl + '&tex=' + text);
                                }
                                else {
                                    alert('获取百度接口url错误');
                                }
                            }
                        });
                    }
                    else {
                        t.panelLoad(audioUrl + '&tex=' + text);
                    }
                }
            }
        },
        nextAudio: function () {
            var t = this;
            var maxLen = $('.art-body .item').length;
            var next = parseInt(audioIndex, 10) + parseInt(1, 10);
            if (parseInt(maxLen, 10) - parseInt(next, 10) > 0) {
                audioIndex++;
                var titl = $('.art-body .item').eq(audioIndex).find('.audio_icon').attr('title');
                $('.audio_control').find('em').text(titl);
                t.getText(audioIndex);
                t.getAudio(audioIndex);
            }

        },
        preAudio: function () {
            var t = this;
            var pre = audioIndex - 1;
            if (pre >= 0) {
                audioIndex--;
                t.getText(audioIndex);
                t.getAudio(audioIndex);
            }

        },
        init: function () {
            if ($('.art-body .item').length > 0 && $('#doc-id').val() !== '402790') {
                this.panelShow('.audio_icon');
                this.scrollA('.audio_control');
            }
        }

    };
    customElement.prototype.build = function () {
        customaudio.init();
    };

    return customElement;
});
