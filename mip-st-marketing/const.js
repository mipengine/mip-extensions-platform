/**
 * @file 服务营销组件常量文件
 * @author maomingyang@baidu.com
 * @date 2018.10.17
 */
define(function (require) {

    // var SERVER_URL = 'http://cp01-ocean-768.epc.baidu.com:8875/';
    var SERVER_URL = 'https://xiongzhang.baidu.com/';

    var URL = {
        // 获取优惠券接口
        TICKET_LIST: SERVER_URL + 'opensc/market/getarrivableticket',
        // 领取优惠券接口
        GET_COUPON: SERVER_URL + 'opensc/market/Voucher',
        // 领取成功Mip页地址
        COUPON_SUCC_MIP: SERVER_URL + 'opensc/wps/redeemSuccess',
        // COUPON_SUCC_MIP: 'http://m-meishij-net.mipcdn.com/c/s/m.meishij.net/html5/mip/zuofa/hongshaorou_239.html',
        // 打点URL
        LOG_URL: 'https://rqs.baidu.com/service/api/rqs?rqt=303'
    };

    var CONST = {
        // 券状态为‘立即领取’时的状态码
        CAN_RECEIVE_CODE: 0,
        // 券状态为‘去查看’时的状态码
        CAN_CHECK_CODE: 1,
        // 券状态为‘已领完’时的状态码
        CAN_NOT_RECEIVE_CODE: 2,
        // 延续登录操作的合法时间间隔
        TIME_INTERVAL: 1 * 60 * 1000,
        // 领取成功提示信息
        RECEIVE_OK_MSG: '恭喜您领取成功',
        // 已领取提示信息
        ALREADY_RECEIVE_MSG: '抱歉，您已领过该券',
        // 已领完提示信息
        TICKETS_DONE_MSG: '抱歉，本次优惠券已领完',
        // 已领取提示信息
        LOGIN_ERR: '登录失败，请重新登录',
        // 领取成功也标题
        COUPON_SUCC_MIP_TITLE: '兑换券'
    };

    var ERROR = {
        // xzh-id必填
        XZH_ID_PARAMS_ERR: 'xzh-id必填！',
        // 解析券列表数据错误
        TICKETS_PARSE_ERR: '解析优惠券列表数据错误！',
        // 获取券列表失败
        TICKETS_GET_ERR: '获取券列表失败！',
        // 解析领取券数据错误
        COUPON_PARSE_ERR: '解析领取优惠券数据错误！',
        // 领取券失败
        COUPON_GET_ERR: '领取券失败！'
    };

    // 优惠券状态
    var TICKET_STATUS = {
        CAN_RECEIVE: {
            code: CONST.CAN_RECEIVE_CODE,
            className: 'can-receive',
            text: '立即领取'
        },
        CAN_CHECK: {
            code: CONST.CAN_CHECK_CODE,
            className: 'can-check',
            text: '去查看'
        },
        CAN_NOT_RECEIVE: {
            code: CONST.CAN_NOT_RECEIVE_CODE,
            className: 'can-not-receive',
            text: '已领完'
        }
    };

    // 服务器返回的状态码
    var SERVER_CODE = {
        NO_LOGIN_CODE: 306014,
        TICKETS_DONE_CODE: 70010020016
    };

    return $.extend({}, URL, CONST, ERROR, TICKET_STATUS, SERVER_CODE);
});
