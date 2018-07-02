# mip-ys137-ad

mip-ys137-ad 管理页面上的所有广告位

标题|内容
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-ys137-ad/mip-ys137-ad.js

## 示例

### 普通广告
```html
<mip-ys137-ad id="1">
</mip-ys137-ad>
```
### mip渠道投放广告
```html
<mip-ys137-ad id="1" from='mip' debug='true'>
    <div>默认填充广告</div>
</mip-ys137-ad>
```

## 属性

### id

说明：广告ID
必选项：是
类型：数字
取值范围：>0
默认值：0

### from

说明：投放渠道
必选项：否
类型：字符串
取值范围：mobile,mip,pc,xiongzhang
默认值：mobile

### debug

说明：调试状态
必选项：否
类型：布尔值
取值范围：true,false
默认值：false
