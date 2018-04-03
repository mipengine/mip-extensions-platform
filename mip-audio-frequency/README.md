# mip-audio-frequency
mip-audio-frequency 使用随机数生成动态的值，将值的大小反映在柱状图的高低上

标题|内容
----|----
类型|业务,定制
支持布局|responsive,flex,container
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-audio-frequency/mip-audio-frequency.js

## 示例

### 基本用法
```html
<mip-audio-frequency id="mip-audio-frequency" class="mip-audio-frequency" 
    audio-wrap-class="mip-audio"
    audio-stoped-class="mip-audio-stopped-icon"
    audio-playing-class="mip-audio-playing-icon"
    row="37" cloumn="20"
    >
    <div class="frequency-wrapper">
        <div class="frequency">
            <div class="top">
                <ul>
                </ul>
            </div>
            <div class="bottom">
                <ul>
                </ul>
            </div>
        </div>
    </div>
</mip-audio-frequency>
``` 

## 说明
### id
必须：是
用于绑定mip事件，详见mip文档

### class
必须：是
用于自定义样式

### audio-wrap-class
必须：是
包含audio标签的父级元素class

### audio-stoped-class
必须：是
audio暂停时显示的按钮的class

### audio-playing-class
必须：是
audio播放时显示的按钮的class

### row
必须：是
频谱图横向排列的柱状条的个数

## cloumn
必须：是
表示每个柱状条是由多少个小方块累积而成
         

## 注意事项  
- 该频谱图是上下轴对称的
- row和cloumn不建议设置过多，会有性能问题
