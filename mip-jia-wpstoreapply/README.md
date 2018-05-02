# mip-jia-wpstoreapply

mip-jia-wpstoreapply 旺铺店铺预约

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-wpstoreapply/mip-jia-wpstoreapply.js

## 示例

### 基本用法
```html
<mip-jia-wpstoreapply>
    <script type="application/json">
        {
            "shopId": "64868",
            "sourceReferrer": "http://qa.m.jia.com/wangpu/shanghai/",
            "btn": "#appointmentStore .ap-btn",
            "loading": ".loading-common",
            "tel": "#appointmentStore .mobile"
        }
    </script>
</mip-jia-wpstoreapply>
<div id="appointmentStore">
    <input type="tel" class="mobile" maxlength="11" placeholder="输手机号，享受以上福利">
    <button class="ap-btn">报名</button>
</div>
<div class="loading-common" style="display:none">等我完。。。</div>
```

## 属性

### btn

说明：触发按钮
必选项：是
类型：class || id

### loading

说明：等待icon
必选项：是
类型：class || id

### shopId

说明：店铺ID
必选项：是
类型：string

### sourceReferrer

说明：来源
必选项：是
类型：string

## 注意事项
