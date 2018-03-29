# mip-nszxyu-read

mip-nszxyu-read 主要用于jieqi小说网阅读功能，包括调整字体大小，护眼模式，夜间模式

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-nszxyu-read/mip-nszxyu-read.js

## 示例

### 通过mip-nszxyu-read注册事件
```html
<mip-nszxyu-read id="read">
<script id="mip-nszxyu-read" type="application/json">
{
  "dark": {
    "#element1" : ["background-color: rgb(251,246,236)","background-color: rgb(50,50,50)"],
    ".class1"   : ["light","dark"]
  },
  "eye" : {
    "#element1" : ["background-color: rgb(251,246,236)","background-color: rgb(230,236,210)"],
    ".class1"   : ["normal","eye"]
  },
  "font" : {
    "big"       : {"#element2" : ["","font-size:26px"]},
    "middle"    : {"#element2" : ["","font-size:22px"]},
    "small"     : {"#element2" : ["","font-size:16px"]}
  }
}
</script>
</mip-nszxyu-read>
<div on="tap:read.dark">关灯</div>
<div on="tap:read.eye">护眼</div>
<div on="tap:read.font(big)">大</div>
<div on="tap:read.font(middle)">中</div>
<div on="tap:read.font(small)">小</div>
<div id="element1" style="width: 100px;height: 100px; display: block; background-color: rgb(251,246,236)"></div>
<div id="element2">字体大小</div>
```

## 注意事项

上面的sample只是为了方便展示效果，正常情况不应该直接在元素写css

