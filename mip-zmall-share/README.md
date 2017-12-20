# mip-zmall-share

ZOl商成商品详情分享组件

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-fixed/mip-fixed.js<br>https://c.mipcdn.com/static/v1/mip-share/mip-share.js<br>https://c.mipcdn.com/extensions/platform/v1/mip-zmall-share/mip-zmall-share.js

## 版本更新

### 1.0.1

- 解决了一些bug

## 示例

### 基本用法
```html
<mip-zmall-share data-btn-id="shareBtn">
    <mip-fixed type="bottom">
        <div class="mip-share-container">
            <mip-share></mip-share>
        </div>
    </mip-fixed>
</mip-zmall-share>
```

## 属性

### data-btn-id

说明：绑定的分享按钮     
必选项：是         
类型：String        
默认值：""

## 注意事项
