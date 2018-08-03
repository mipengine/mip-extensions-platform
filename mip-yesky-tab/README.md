# mip-yesky-tab

mip-yesky-tab 切换li动态加载对应数据

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-yesky-tab/mip-yesky-tab.js

## 示例
<mip-yesky-tab productId="1049907">
<mip-vd-tabs allow-scroll current="0" class="nav_box" >
    <section id="line">
        <li alt="100"><em>全部</em>(103)</li>
        <li alt="0"><i>整体外观</i>(11)</li>
        <li alt="3"><i>场景实拍</i>(10)</li>
        <li alt="2"><i>机身细节</i>(5)</li>
        <li alt="11"><i>高清观赏</i>(35)</li>
        <li alt="4"><i>评测图</i>(22)</li>
        <li alt="8"><i>样张图片</i>(17)</li>
        <li alt="14" class="last"><i>大咖图</i>(2)</li>
        <span id="right-more"><a href="#"><mip-img
                src="http://www.yesky.com/TLimages2009/yesky/images/wimg/cprightm.png" alt="#"></mip-img></a></span>
    </section>
</mip-vd-tabs>
</mip-yesky-tab>
### 基本用法
```html
<mip-yesky-tab>
    自定义内容，可以嵌套其他组件
</mip-yesky-tab>
```

## 属性

### productId

说明：获得产品的id
必选项：是
类型：string
单位：无
默认值：无

## 注意事项

