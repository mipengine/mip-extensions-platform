# mip-zol-gauge

mip-zol-gauge 指针图表插件

标题|内容
----|----
类型|公司通用组件
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-zol-gauge/mip-zol-gauge.js

## 示例
### 1.0.1修改
组件单位调整

### 基本用法
```html
<mip-zol-gauge data-val="8857">
    <div class="color-temperature" >
        <div class="pointer"></div>
    </div>
</mip-zol-gauge>
```
### 点击从新渲染的方法
- 给 <mip-zol-gauge> 标签添加一个自定义的 id=customid。
- 给需要点击切换的标签添加属性 on="tap:customid.gauge_refresh"。

## 属性

### data-val

说明：显示的数值
必选项：是
类型：String
取值范围：4000-10000
单位：无
默认值：无

