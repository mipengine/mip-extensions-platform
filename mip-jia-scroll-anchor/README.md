# mip-jia-scroll-anchor

mip-jia-scroll-anchor 定位跳转及滚动

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-scroll-anchor/mip-jia-scroll-anchor.js

## 示例

### 基本用法
```html
<mip-jia-scroll-anchor>
    <script type="application/json">
        {
            "skip":{
                "class":".nav-a",
                "currentClass":"cur",
                "conClass":"",
                "top":54,
                "threshold":200,
                "showmore":true,
                "click":true
            },
            "showmore":{
                "class":"",
                "parent":"",
                "statusClass":"show"
            }
        }
    </script>
    <ul class="fixed-process-tab">
        <li class="nav-a cur">
            <i class="icon icon1"></i>
            <p class="txt">准备</p>
        </li>
        <li class="nav-a">
            <i class="icon icon2"></i>
            <p class="txt">水电</p>
        </li>
        <li class="nav-a">
            <i class="icon icon3"></i>
            <p class="txt">泥木</p>
        </li>
        <li class="nav-a">
            <i class="icon icon1"></i>
            <p class="txt">油漆</p>
        </li>
        <li class="nav-a">
            <i class="icon icon5"></i>
            <p class="txt">竣工</p>
        </li>
        <li class="nav-a">
            <i class="icon icon6"></i>
            <p class="txt">入住</p>
        </li>
    </ul>
</mip-jia-scroll-anchor>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

## 参数

### skip
说明：滚动及点击需要的数据对象
必选项：否
类型：Object

#### currentClass
说明：高亮当前元素的样式名称，在滚动屏幕时，目标容器在屏幕显示时会给对应的 `class` 元素添加该样式名称
必选项：否
类型：字符串
默认值：`current`

#### class
说明： 滚动时添加 `currentClass` 的目标元素
必选项：否
类型：字符串

#### conClass
说明： 点击跳转的容器元素
必选项：否
类型：字符串

#### top
说明：点击跳转时的距离阀值，可调整跳转时容器元素距离顶部的位置
必选项：否
类型：数字
默认值：`10`

#### threshold
说明：调整滚动距离的阀值，可用于滚动元素在屏幕显示位置的判断调整
必选项：否
类型：数字
默认值：`200`

#### showmore
说明：点击的时候是否需要展开更多
必选项：否
类型：boolean

#### click
说明：是否需要点击跳转
必选项：否
类型：boolean


### showmore
说明：滚动及点击需要的数据对象
必选项：否
类型：Object

#### class
说明：点击展开更多的元素
必选项：否
类型：字符串

#### parent
说明：点击展开更多后需要操作的元素
必选项：否
类型：字符串

#### statusClass
说明：点击展开更多后给操作元素添加的class名
必选项：否
类型：字符串
