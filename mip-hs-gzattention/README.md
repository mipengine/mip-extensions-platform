# mip-hs-gzattention

mip-hs-gzattention 组件说明
此组件用于个人主页页面里关注和取消关注的操作,点击关注调用关注接口数据返回，反之则调用取消关注接口返回数据，改变状态。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-gzattention/mip-hs-gzattention.js

## 示例

### 基本用法
```html
<mip-hs-gzattention>
    <mip-hs-gzattention user-id = '1024' url-attention = 'http://hsanswer.xxx.cn/focus' url-unattention='http://hsanswer.xxx.cn/unfocus'>
                        <span class="attention  gzactive borderRadius">已关注</span>
      </mip-hs-gzattention>
</mip-hs-gzattention>
```

## 属性
user-id：用户id；
url-attention：关注接口；
url-unattention：取消关注接口；
三者必选
### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

