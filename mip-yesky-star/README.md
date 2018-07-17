# mip-yesky-star

mip-yesky-star 是一个获取长度动态显示几颗星星评分得组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-yesky-star/mip-yesky-star.js

## 示例
<mip-yesky-star data-wid="84.0%">
   <a href="http://wap.yesky.com/product/product/1026/1026252/comment.shtml">网友点评分：
    <p class="starbg"><span class="star"></span></p> <em>27点评</em>
   </a>
</mip-yesky-star>

### 基本用法
```html
<mip-yesky-star>
    自定义内容，可以嵌套其他组件
</mip-yesky-star>
```

## 属性
## data-wid

说明：获取从后台传的数据长度
必选项：是
类型：number
取值范围：0%-100%
单位：无
默认值：无

## 注意事项
注意传入的data-wid的值，根据值的不同动态显示效果


