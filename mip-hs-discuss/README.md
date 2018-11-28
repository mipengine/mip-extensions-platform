# mip-hs-discuss

mip-hs-discuss 组件说明
此组件用于详情页面的评论列表的渲染并有回复功能，回复功能需要与mip-hs-replay组件一起使用效果更好，评论列表里面的点赞交互处理；
通过点击类disnum渲染插入评论列表数据；
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-discuss/mip-hs-discuss.js

## 示例

### 基本用法
```html
<mip-hs-discuss>
    <mip-hs-discuss data-url='http://hsanswer.xxx.cn/comment/more' user-id='1024'><i class="disnum">收起评论</i><i class="slidup">收起评论</i></mip-hs-discuss>
</mip-hs-discuss>
```

## 属性
data-url：是进行加载列表的时候所要调取的接口数据；
user-id：是进行加载列表的时候所要传过去的当前用户id；
### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

