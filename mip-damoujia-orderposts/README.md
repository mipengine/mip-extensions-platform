# mip-damoujia-orderposts

mip-damoujia-orderposts 用于div点击后切换div显示 并可以对图片进行选择和数量操作然后进行统计

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-damoujia-orderposts/mip-damoujia-orderposts.js

## 示例
```html
<section>
<div class="page-world">
    <div class="page-section first">
        <div class="section-content">
        </div>
    </div>
     <div class="page-section second">
         <div class="section-content">
         </div>
     </div>
</div>
</section>
```

### 基本用法
```html
<mip-damoujia-orderposts>
<div class="container">
    <div class="page-section">
          <div class="section-header">
          <button>上一步</button>
    </div>
    </div>
    <div class="pic-section">
        <img src="/common/mobile/img/zmj/entry_garden.png">
        <div class="handler-section">
            <div class="handler-warpper">
                <button class="btn-left"></button>
                <span>1</span>
                <button class="btn-right"></button>
            </div>
            <div class="flag"></div>
        </div>
    </div>
</div>
</mip-damoujia-orderposts>
```

## button
说明：.container .page-section .section-header 下的button按钮具有切换列表页的功能 
       点击后页面计数前翻一页 页面为page-section
必选项: 否
默认值：auto

## btn-confirm
说明：class类别 当上级元素为.fg .qk的时候点击则切换下一页页面显示 
必选项: 否
默认值：auto

##pic-section
说明：class类别  当此类被点击之后 则自身追加一个selected  然后遍历上级的ul并清空已选择的selected
    防止重复selected