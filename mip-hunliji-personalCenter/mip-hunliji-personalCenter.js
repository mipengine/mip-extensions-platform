/**
 * @file mip-hunliji-personalCenter 组件
 * @author
 */

define(function (require) {
    'use strict';
    const $ = require('zepto');

    const customElement = require('customElement').create();

    function getOrderList(url, sessionId, element) {
        $.ajax({
            url: url,
            type: 'get',
            xhrFields: {
                withCredentials: true
            },
            data: {
                sessionid: sessionId,
                'per_page': 99999999
            },
            success: function (result) {
                let html = '';
                let msgList = '';
                let msgContent = '';
                let unreadCount = '';
                let data = '';
                if (result.data) {
                    data = result.data;
                    for (let i = 0; i < result.data.msg_list.length; i++) {
                        if (result.data.msg_list[i].lastMsg) {
                            switch (result.data.msg_list[i].lastMsg.kind) {
                                case 'text':
                                    msgContent = '<p>' + result.data.msg_list[i].lastMsg.content + '</p>';
                                    break;
                                case 'voice':
                                    msgContent = '<p>[语音]</p>';
                                    break;
                                case 'image':
                                    msgContent = '<p>[图片]</p>';
                                    break;
                                default:
                                    msgContent = '<p></p>';
                            }
                        }
                        if (data.msg_list[i].channelUser.unread_count !== 0) {
                            unreadCount = '<span><i>' + data.msg_list[i].channelUser.unread_count + '</i></span>';
                        }

                        msgList += '<li data-attr="' + data.msg_list[i].id + '">\
                            <a href="/p/wedding/Public/wap/m/mip_baidu/chat/dist/index.html?id='
                            + data.msg_list[i].merchant.user_id + '">\
                            <div class="chat_avatar">\
                            ' + unreadCount + '\
                            <mip-img layout="container"\
                            src="' + data.msg_list[i].toUser.avatar + '?imageView2/1/w/100/h100">\
                            </mip-img>\
                            </div>\
                            </a>\
                            <div class="chat_right">\
                            <a href="/p/wedding/Public/wap/m/mip_baidu/chat/dist/index.html?id='
                             + data.msg_list[i].merchant.user_id + '">\
                                <div class="chat-top">\
                                    <h3>' + data.msg_list[i].merchant.name + '</h3>\
                                    <span>' + data.msg_list[i].created_at.substring(0, 10) + '</span>\
                                </div>\
                            </a>\
                                <div class="chat-message clearfix">\
                                    <a href="/p/wedding/Public/wap/m/mip_baidu/chat/dist/index.html?id='
                                     + data.msg_list[i].merchant.user_id + '">' + msgContent + '</a>\
                                    <mip-hunliji-deleteChanel data-id="' + data.msg_list[i].id + '" data-url="https://m.hunliji.com/baidu/delMsg">\
                                        <span class="chat-message-del">删除</span>\
                                    </mip-hunliji-deleteChanel>\
                                </div>\
                            </div>\
                        </li>';
                        unreadCount = '';
                    }

                    html += '<div class="personal_info">\
                                <div class="header_info">\
                                    <h3>' + data.user.nick + '</h3>\
                                    <a data-type="mip" data-title="收藏" href="/baidu/mySetMealCollector">\
                                    <p><span>' + data.user.collector_count + '</span><i>收藏</i></p></a>\
                                    <a data-type="mip" data-title="预约" href="/baidu/myAppointment">\
                                    <p><span>' + data.user.appointment_count + '</span><i>预约</i></p></a>\
                                </div>\
                                <div class="header_avatar">\
                                <mip-img layout="container" src="' + data.user.avatar + '?imageView2/2/w/148">\
                                </mip-img>\
                                </div>\
                            </div>\
                            <div class="system_message">\
                                <a  data-type="mip" data-title="系统消息"  href="/baidu/systemMessage">\
                                    <div class="system_message_top clearfix">\
                                        <p>系统消息</p>\
                                        <span>' + data.created_at.substring(0, 10) + '</span>\
                                    </div>\
                                    <p class="system_message_content">' + data.news + '</p>\
                                </a>\
                            </div>\
                            <div class="chat_list">\
                                <ul>' + msgList + '</ul>\
                            </div>';

                    $(element).html(html);

                }
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        const element = this.element;
        let sessionId = '';
        const url = $(element).attr('data-url');
        this.addEventAction('customLogin', function (e) {
            sessionId = e.sessionId;
            getOrderList(url, sessionId, element);
        });
    };

    return customElement;
});
