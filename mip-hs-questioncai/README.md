# mip-hs-questioncai

mip-hs-questioncai 组件说明
此组件用于详情页面问答评论的踩，点击后如果踩过则请求取消踩的接口，反之怎请求赞接口进行点踩，返回数据，并加相应状态。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-questioncai/mip-hs-questioncai.js

## 示例

### 基本用法
```html
<mip-hs-questioncai>
    <mip-hs-questioncai url-uncai ='http://hsanswer.xxx.cn/uncai' url-cai ='http://hsanswer.xxx.cn/cai' url-id ='1024'><span class="removezan borderRadius cai caiactive"></span></mip-hs-questioncai>
</mip-hs-questioncai>
```

## 属性
url-uncai:是请求取消赞的接口；url-cai:是请求赞的接口；url-id：是当前用户的id；三个属性都是必须选。
### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

