# mip-ilaw66-call-order

mip-ilaw66-call-order 组件说明
新显示后台返回的呼叫中心号码，防止是因律师未接电话又下了一个单，然后调用的不同的呼叫中心
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-call-order/mip-ilaw66-call-order.js

## 示例

### 基本用法
```html
<mip-ilaw66-call-order>
     <div class="link_bottom linkingDom">
        <img class="link_avatar" src="images/bg_touxaingnan.png" />
        <div class="link_lawyerName "></div>
        <div class="link_lawyerType">擅长类型：<span class="typeOfLawyer"></span></div>
        <div class="link_lawyerType link_lawyerType__commentFromUser">用户好评：<span class="goodCommentRate"></span></div>
    </div>
    <div class="link_middle linkingDom">
        <div>律师已来电，请留意手机接听来电</div>
        <i class="link_phone"><span>021</span>-61291712</i>
        <div>隐私保障：您的号码将隐藏不对律师展示</div>
        <img class="link_iconPhone " src="images/cion_phone.png" />
    </div>
    <div class="banner_top linkingDom">
        通话总时长不足60秒不收费
    </div>
    <div id="pop_consulationEnd">
        <div class="main">
            <img src="images/bg_touxaingnan.png" class="end_avatar" />
            <div class="end_name">王律师</div>
            <div class="end_type">擅长类型：<span></span></div>
            <div class="end_type end_type__commentFromUser">用户好评：<span class="goodCommentRate"></span></div>
        </div>
        <div class="outOfUnusual">
            <div id="js-gotoPay" class="gotoPay js-gotoPay">去付律师辛苦费</div>
            <div class="end_unusual">通话异常 &gt;</div>
        </div>
        <div class="inOfUnusual">
            <div class="outGotoPay outGotoPay__recall">重新呼叫</div>
            <div class="outGotoPay unusual_type js-gotoPay">已得到解答，去付律师辛苦费</div>
        </div>
        <!-- 通话异常选项 B -->
        <div class="pop_unusual" id="pop_unusual">
            <div class="unusual_wrapper"></div>
            <div class="unusual_popLayer">
                <div class="unusual_type type_dropline">意外掉线</div>
                <div class="unusual_type type_nocall">没有电话打进来</div>
                <div class="unusual_type type_cancell">取消</div>
            </div>
        </div>
    </div>
</mip-ilaw66-call-order>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

