# mip-hs-questionzan

mip-hs-questionzan 组件说明
此组件用于详情页面问答评论的点赞，点击后如果赞过则请求取消赞的接口，反之怎请求赞接口进行点赞，返回数据，并加1或减1，
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-questionzan/mip-hs-questionzan.js

## 示例

### 基本用法
```html
<mip-hs-questionzan>
    <mip-hs-questionzan url-unzan ='http://hsanswer.xxx.cn/unzan' url-zan ='http://hsanswer.xxx.cn/zan' url-id ='1024'><i class="zan zanactive"></i>赞</mip-hs-questionzan>
</mip-hs-questionzan>
```

## 属性
url-unzan:是请求取消赞的接口；url-zan:是请求赞的接口；url-id：是当前用户的id；三个属性都是必须选。
### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

