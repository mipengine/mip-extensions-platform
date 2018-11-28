# mip-hs-quesattention

mip-hs-quesattention 组件说明
此组件用于详情页面问答评论的关注，点击后如果关注过则请求取消关注的接口，反之怎请求关注接口进行关注，返回数据，并加相应状态。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-quesattention/mip-hs-quesattention.js

## 示例

### 基本用法
```html
<mip-hs-quesattention>
    <mip-hs-quesattention user-id = '1024' url-attention = 'http://hsanswer.xxx.cn/focus' url-unattention='http://hsanswer.xxx.cn/unfocus'><span class="gzkeep gzactive  attention borderRadius">关注</span></mip-hs-quesattention>
</mip-hs-quesattention>
```

## 属性
url-unattention:是请求取消赞的接口；url-attention:是请求赞的接口；user-id：是当前用户的id；三个属性都是必须选。
### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

