# mip-jdd-platwrapper

mip-jdd-platwrapper 平台判断容器

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jdd-platwrapper/mip-jdd-platwrapper.js

## 示例

### 基本用法
```html
<mip-jdd-platwrapper className="hide">
    <div>666</div>
</mip-jdd-platwrapper>
<mip-jdd-platwrapper>
    <div>222</div>
</mip-jdd-platwrapper>
```

## 属性

### className

说明：如果是mip环境则添加该class，不填则直接隐藏

必填：否

格式：字符串

### elseClassName

说明：如果不是mip环境则给wrapper添加该class

必填：否

格式：字符串