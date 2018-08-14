# mip-qtkj-roll

mip-qtkj-roll 滚动效果，支持上下左右滚动

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qtkj-roll/mip-qtkj-roll.js

## 示例

### 基本用法
```html
<mip-qtkj-roll direction="2" step="1" delayWidth="150" speed="50" delayTime="3000" wateTime="1000">
    <ul>
        <li><a>1111111111111</a></li>
        <li><a>2222222222222</a></li>
        <li><a>3333333333333</a></li>
        <li><a>4444444444444</a></li>
        <li><a>5555555555555</a></li>
    </ul>        
</mip-qtkj-roll>
```

## 属性

### direction

说明：方向
必选项：是
类型：字符串
取值范围：0:向上,1:向下,2:向左,3:向右
## 注意事项:左右滚动的子元素需要转换为行内活行内块儿元素


### step

说明：滚动的步长
必选项：否
类型：字符串


### delayWidth

说明：左右滚动每次间歇滚动的长度
必选项：否
类型：字符串


### delayHeight

说明：上下滚动每次间歇滚动的高度
必选项：否
类型：字符串


### speed

说明：滚动速度，数值越小，滚动越快
必选项：否
类型：字符串
默认值：30


### delayTime

说明：间歇停顿时间(0为不停顿,1000=1秒)
必选项：否
类型：字符串


### waitTime

说明：开始时的等待时间(0为不等待,1000=1秒)
必选项：否
类型：字符串