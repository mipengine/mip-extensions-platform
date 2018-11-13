/**
 * @file 服务营销组件模版
 * @author maomingyang@baidu.com
 * @date 2018-10-08
 */
define(function (require) {
    return [
        '<template type="mip-etpl">',
            '{% for: {{data}} as {{item}} %}',
                '<div class="ticket-container">',
                    '<div class="ticket-desc-wrapper">',
                        '<div class="ticket-price-wrapper">',
                            '<span class="ticket-currency">¥</span>',
                            '<span class="ticket-price">{{item.activityValue}}</span>',
                        '</div>',
                        '<div class="ticket-desc">',
                            '<span class="ticket-text">{{item.activityDesc}}</span>',
                            '<span class="ticket-mark">领取将同时关注本熊掌号</span>',
                        '</div>',
                    '</div>',
                    '<div class="ticket-btn-wrapper">',
                        '{% var: s = {{item.showStatus}} %}',
                        '<div class="ticket-btn {{s.className}}" data-id="{{item.activityId}}" data-code="{{s.code}}">',
                            '{{s.text}}',
                        '</div>',
                    '</div>',
                '</div>',
            '{% /for %}',
        '</template>'
    ].join('');
});
