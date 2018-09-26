# mip-ck-union-ad

mip-ck-union-ad 主要用于投放搜狗广告及其它第三方广告 

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ck-union-ad/mip-ck-union-ad.js

## 示例

### 基本用法
```html
<mip-ck-union-ad ad-type="sogou" ad-id="984035" ad-width="20" ad-height="5">
    自定义内容，可以嵌套其他组件
</mip-ck-union-ad>
```

## 属性

### ad-type

说明：广告联盟类型
必选项：否
类型：字符串
取值范围：sogou
默认值：sogou

### ad-id 

说明: 广告id
必选项：是
类型：数字

### ad-width

说明: 广告宽度
必选项：否
类型：数字

### ad-width

说明: 广告高度
必选项：否
类型：数字

### ad-src

说明: 网盟js外链地址
必选项：否
类型：合法的js外链地址


## 注意事项
如果ad-type='sogou'，则ad-src的默认值是：//theta.sogoucdn.com/wap/js/aw.js
