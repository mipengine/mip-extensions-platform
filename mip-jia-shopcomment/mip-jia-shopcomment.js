/**
 * @file mip-jia-shopcomment 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    // 提示层
    function tipMask(msg, duration) {
        clearTimeout(window.tipMaskTimer);
        window.tipMaskTimer = null;
        duration = duration || 2000;
        if ($('.popup-maskEdit').length > 0) {
            $('.popup-maskEdit').remove();
        }
        $('body').append('<div class="popup-maskEdit">' + msg + '</div>');
        window.tipMaskTimer = setTimeout(function () {
            $('.popup-maskEdit').fadeOut(100, function () {
                $(this).remove();
            });
        }, duration);
    }

    function commentStr(data) {
        var imgStr = getImgStr(data.evaluationImagesList);
        var replyStr = getReplyStr(data.replyViewList, data.evaluationId);
        var userImg = data.userImg ? data.userImg : '//mued3.jia.com/image/mobile/wxStore/userDefault.jpg';
        var commentStr = [
            '<div class="evaluation-box">',
            '    <div class="user-msg">',
            '        <mip-img',
            '            layout="responsive" ',
            '            width="60" ',
            '            height="60"',
            '            src="' + userImg + '">',
            '        </mip-img>',
            '        <span class="name">' + data.userName + '</span>',
            '        <span class="time">' + data.textCreateTime + '</span>',
            '    </div>',
            '    <p class="txt-desc">' + data.description + '</p>',
            imgStr,
            replyStr,
            '    <div class="tools-view">',
            '        <span class="delete-btn"></span>',
            '        <div class="desc">',
            '            <span class="zan" data-shopId="' + data.shopId + '" ',
            '                data-evaluationId="' + data.evaluationId + '">',
            '                <i class="z-icon"></i>',
            '                <em class="num">' + data.zanTotalCount + '</em>',
            '            </span>',
            '            <span class="reply-item" data-evaluationId="' + data.evaluationId + '" ',
            '                data-parentName="' + data.userName + '">',
            '                <i class="e-icon"></i>',
            data.evaluationReplyCount,
            '            </span>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join('');
        return commentStr;
    }


    // 图片
    function getImgStr(data) {
        var str = '';
        if (data && data.length) {
            str += '<div class="photos-view">';
            for (var i = 0; i < data.length; i++) {
                if (i < 4) {
                    str += '<mip-img layout="responsive" width="120" height="120" popup ';
                    str += 'src="//imgwangpu.tg.com.cn/' + data[i].imageUrl + '"></mip-img>';
                } else {
                    break;
                }
            }
            str += '</div>';
        }
        return str;
    }

    // 评论
    function getReplyStr(data, id) {
        var str = '';
        if (data && data.length) {
            str += '<div class="reply-msg">';
            str += '<mip-showmore maxheight="100" animatetime=".2" id="showmore' + id + '">';
            str += '<div class="txt">';
            for (var i = 0; i < data.length; i++) {
                str += '<p class="reply-item" data-evaluationId="' + data[i].evaluationId;
                str += '" data-replyId="' + data[i].replyId + '" data-parentName="' + data[i].userName + '">';
                if (!!data[i].parentId) {
                    str += '<span class="name">' + data[i].userName + '</span><em>回复</em>';
                    str += '<span class="name">' + data[i].parentName + '</span>：' + data[i].content;
                } else {
                    str += '<span class="name">' + data[i].userName + '</span>：' + data[i].content;
                }
                str += '</p>';
            }
            str += '</div>';
            str += '</mip-showmore>';
            str += '<p on="tap:showmore' + id + '.toggle" data-closeclass="mip-showmore-open" class="view-more">';
            str += '<span class="show">展开<i class="arrow-icon"></i></span>';
            str += '<span class="hidden">收起<i class="arrow-icon"></i></span></p></div>';
        }
        return str;
    }

    // 加载数据
    function setPageData(res, acBtn, box) {
        res.json().then(function (data) {
            // console.log(data);
            if (data && data.shopEvaluations && data.shopEvaluations.length) {
                acBtn.attr({'pageNo': data.pageNo});
                if (data.pageNo < data.totalPage) {
                    acBtn.css('display', 'block');
                }
                var cData = data.shopEvaluations;
                var str = '';
                for (var i = 0; i < cData.length; i++) {
                    var items = commentStr(cData[i]);
                    str += items;
                }
                box.append(str);

                // 隐藏高度不足的showmore
                $('mip-showmore').each(function () {
                    if ($(this).attr('style').indexOf('height') === -1) {
                        $(this).next().hide();
                    }
                });
            } else {

                // 没有内容显示
                $('.nocomment-box').show();
            }
        });
    }

    var isComEnd = true;
    function getDom(box, url, loadingBox, acBtn) {
        if (isComEnd) {
            isComEnd = false;
            loadingBox.css('display', 'block');
            acBtn.css('display', 'none');
            fetch(url, {
                mode: 'cors',
                method: 'post',
                credentials: 'include'
            }).then(function (res) {
                if (res.ok) {
                    setPageData(res, acBtn, box);
                } else {
                    console.log(res.statusText);
                }
                isComEnd = true;
                loadingBox.css('display', 'none');
            }).catch(function (err) {
                console.log('Fetch错误:' + err);
                isComEnd = true;
                loadingBox.css('display', 'none');
            });
        }
    }


    customElement.prototype.build = function () {
        var $ele = $(this.element);
        var commentBox = $ele.find('.evaluation-detail');
        var rUrl = $ele.attr('data-url');
        var rPage = $ele.attr('data-page');
        var loadingBox = $ele.find('.wait-icon');
        var acBtn = $ele.find('.loading-more');
        var goUrl = '';
        if (rUrl.indexOf('?') !== '-1') {
            goUrl = rUrl + '&page=' + rPage;
        } else {
            goUrl = rUrl + '?page=' + rPage;
        }

        getDom(commentBox, goUrl, loadingBox, acBtn);

        acBtn.click(function () {
            var pageNo = parseInt($(this).attr('pageNo'), 10) + 1;
            if (rUrl.indexOf('?') !== '-1') {
                goUrl = rUrl + '&page=' + pageNo;
            } else {
                goUrl = rUrl + '?page=' + pageNo;
            }
            getDom(commentBox, goUrl, loadingBox, $(this));
        });

        var enDatas = $ele.find('script[evaluation]');
        var enabled = !!enDatas;
        if (!enabled) {
            return false;
        }
        var configJson = JSON.parse(enDatas.text());

        var replyPopStr = [
            '<div class="reply-pop-mask"></div>',
            '    <div class="post-reply-pop fixed-pop">',
            '        <div class="pop-content">',
            '            <div class="pop-detail">',
            '                <mip-form>',
            '                    <textarea placeholder="回复上海傲胜地板"></textarea>',
            '                </mip-form>',
            '                <div class="btns">',
            '                    <span class="cancel">取消</span>',
            '                    <span class="btn">提交</span>',
            '                </div>',
            '            </div>',
            '        </div>',
            '    </div>'
        ].join('');

        $('body').append(replyPopStr);

        // 点赞
        var isZanEnd = true;
        $ele.on('click', '.zan', function () {
            var $self = $(this);
            var shopid = $self.attr('data-shopid');
            var evaluationid = $self.attr('data-evaluationid');
            var isZan = !!!$self.hasClass('cur');
            var $num = $self.find('.num');
            var parms = {shopId: shopid, evaluationId: evaluationid, isZan: isZan};

            $('.loading-icon').css('display', 'block');
            if (isZanEnd) {
                isZanEnd = false;
                fetch(configJson.zan_url, {
                    mode: 'cors',
                    method: 'post',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(parms),
                    credentials: 'include'
                }).then(function (res) {
                    $('.loading-icon').css('display', 'none');
                    if (res.ok) {
                        if (isZan) {
                            $self.addClass('cur');
                            $num.text(parseInt($num.text(), 10) + 1);
                            tipMask('点赞成功~', 1000);
                        } else {
                            $self.removeClass('cur');
                            $num.text(parseInt($num.text(), 10) - 1);
                            tipMask('取消点赞~', 1000);
                        }
                    } else {
                        console.log(res.statusText);
                    }
                    isZanEnd = true;
                }).catch(function (err) {
                    $('.loading-icon').css('display', 'none');
                    console.log('Fetch错误:' + err);
                    isZanEnd = true;
                });
            }
        });

        // 回复
        var isReplyEnd = true;
        $ele.on('click', '.reply-item', function () {
            var evaluationid = $(this).attr('data-evaluationid');
            var replyid = $(this).attr('data-replyid');
            var parentname = $(this).attr('data-parentname');
            var boxId = $(this).parents('.evaluation-box').find('mip-showmore').attr('id');
            var replyPop = $('.post-reply-pop');
            var popMask = $('.reply-pop-mask');

            replyPop.find('textarea').attr('placeholder', '回复' + parentname);
            replyPop.find('.btn').attr({
                'data-evaluationid': evaluationid,
                'data-replyid': replyid,
                'data-parentname': parentname,
                'data-box-id': boxId
            });
            replyPop.css('display', 'block');
            popMask.css('display', 'block');
        });

        function setReplySucc(res, boxId) {
            var str = '';
            res.json().then(function (data) {
                str = '<p class="reply-item" data-evaluationId="' + data.evaluationId + '" ';
                str += 'data-replyId="' + data.replyId + '" data-parentName="' + data.userName + '">';
                if (!!data.parentId) {
                    str += '<span class="name">' + data.userName + '</span><em>回复</em>';
                    str += '<span class="name">' + data.parentName + '</span>：' + data.content;
                } else {
                    str += '<span class="name">' + data.userName + '</span>：' + data.content;
                }
                str += '</p>';
                $('#' + boxId).find('.txt').append(str);
                $('.post-reply-pop, .reply-pop-mask').css('display', 'none');
                tipMask('回复成功~', 1000);
            });
        }

        $('.post-reply-pop .btn').click(function () {
            var txt = $(this).parents('.pop-detail').find('textarea').val();
            var evaluationid = $(this).attr('data-evaluationid');
            var replyid = $(this).attr('data-replyid');
            var parentname = $(this).attr('data-parentname');
            var boxId = $(this).attr('data-box-id');
            if (txt && txt.trim()) {
                var parms = {
                    evaluationId: evaluationid,
                    replyId: replyid,
                    content: txt,
                    parentName: parentname
                };
                $('.loading-icon').css('display', 'block');
                if (isReplyEnd) {
                    isReplyEnd = false;
                    fetch(configJson.reply_url, {
                        mode: 'cors',
                        method: 'post',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify(parms),
                        credentials: 'include'
                    }).then(function (res) {
                        $('.loading-icon').css('display', 'none');
                        if (res.ok) {
                            setReplySucc(res, boxId);
                        }
                        else {
                            console.log(res.statusText);
                        }
                        isReplyEnd = true;
                    }).catch(function (err) {
                        $('.loading-icon').css('display', 'none');
                        console.log('Fetch错误:' + err);
                        isReplyEnd = true;
                    });
                }
            } else {
                tipMask('请输入评论内容~', 1000);
            }
        });

        $('.post-reply-pop .cancel, .reply-pop-mask').click(function () {
            $('.post-reply-pop, .reply-pop-mask').css('display', 'none');
        });

    };

    return customElement;
});


