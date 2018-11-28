# mip-hs-answerdelete

mip-hs-answerdelete 组件说明
用于个人中心自己所提问过的问题列表数据进行删除操作，通过data-id属性的绑定进行异步删除当前id的数据
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-answerdelete/mip-hs-answerdelete.js

## 示例

### 基本用法
```html
<mip-hs-answerdelete>
    <mip-hs-answerdelete><span class="answer_delete" data-id="1024">删除</span></mip-hs-answerdelete>
</mip-hs-answerdelete>
```

## 属性
data-id是当前数据用户id，用于异步时参数传到后台进行删除操作
### {属性名}
data-id
说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

