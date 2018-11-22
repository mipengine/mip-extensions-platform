# mip-hs-collect

mip-hs-collect 组件说明
异步收藏效果实现，未登录下限制并跳转登录页，collectnum类是当前用户id
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-collect/mip-hs-collect.js

## 示例

### 基本用法
```html
<mip-hs-collect>
    <mip-hs-collect url-collect='http://hsanswer.xxx.cn/zan' url-uncollect='http://hsanswer.xxx.cn/unzan' class="collect">收藏</mip-hs-collect>
	<div class="collectnum hide">24</div>
</mip-hs-collect>
```

## 属性

### {属性名}
其中url-collect属性是要请求赞接口的数据返回状态，url-uncollect属性是要请求取消赞赞接口的数据返回状态
说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

