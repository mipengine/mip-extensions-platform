# mip-fh-thirdpartyAd

mip-fh-thirdpartyAd 用来支持淘宝，谷歌广告，搜狗广告联盟

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-fh-thirdpartyAd/mip-fh-thirdpartyAd.js

## 示例

### 基本用法
```html
<mip-fh-thirdpartyAd token="909184">
    自定义内容，可以嵌套其他组件
</mip-fh-thirdpartyAd>
```

## 属性

### type

说明：第三方广告类别
必选项：是
类型：字符串
取值范围：alibaba | google | sogou

### token

说明：网盟id
必选项：是
类型：字符串

### ad-id

说明：搜狗网盟id
必选项：是
类型：字符串

### ad-width

说明：搜狗广告宽度
必选项：否
类型：数字
取值范围：>0

### ad-height

说明：搜狗广告高度
必选项：否
类型：数字
取值范围：>0

### ad-close

说明：允许关闭
必选项：是
类型：数字
取值范围：1 | 0

## 注意事项

