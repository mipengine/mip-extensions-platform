# mip-kuhou-all

mip-kuhou-all 用来显示更多内容，且显示后隐藏该按钮。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-kuhou-all/mip-kuhou-all.js

## 示例

### 根据高度控制
```html
 <mip-kuhou-all maxheight='40' animatetime='.3'>
     <div showmorebox>
        <div>todo<br><br><br><br>aasd<br><br>撒大声地</div>
      </div>
      <p showmorebtn>
          <span class="mip-kuhou-btnshow">点击显示</span>          
      </p>
 </mip-kuhou-all>
```

## 属性

### maxheight

说明：高度阀值,单位为像素。如果元素高度超出阈值，隐藏超出部分，显示"显示更多按钮"
必选项：否
类型：数字

## animatetime

说明：展开收起动画时间
必选项：否   
类型：数字 
备注:  只有与maxheight一起使用时生效

## kuhoubox

说明：内容显示框，即需要隐藏显示的dom
必选项：是  
备注:  一个mip-kuhou-all内只允许出现一个kuhoubox

## kuhoubtn

说明：显示更多按钮dom
必选项：是  
备注:  一个mip-kuhou-all内只允许出现一个 kuhoubtn 且单机后 按钮会消失不在出现。


