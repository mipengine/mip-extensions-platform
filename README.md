# mip-hs-praise

mip-hs-praise 组件说明
异步点赞效果实现，未登录下限制并跳转登录页，i是点赞数量，constants类是当前用户id
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-praise/mip-hs-praise.js

## 示例

### 基本用法
```html
<mip-hs-praise>
    <mip-hs-praise url-zan='http://hsanswer.altke.cn/zan' url-unzan='http://hsanswer.altke.cn/unzan' class="praise"><i>2</i>赞</mip-hs-praise >
	<div class="constants hide">24</div>
</mip-hs-praise>
```

## 属性

### {属性名}
其中url-zan属性是要请求赞接口的数据返回状态，url-unzan属性是要请求取消赞赞接口的数据返回状态
说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

