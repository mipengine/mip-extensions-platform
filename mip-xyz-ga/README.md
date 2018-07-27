# mip-xyz-ga

mip-xyz-ga 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xyz-ga/mip-xyz-ga.js

## 示例

### 基本用法
```html
<div id="showQuickNavigation">button</div>
<mip-xyz-ga>
    <script type="application/json">
        [
            {
                "el": "#showQuickNavigation",
                "depend": "active",
                "event": {
                    "type": "click",
                    "name": "点击",
                    "code": ["newspage-toprightbutton-hide", "newspage-toprightbutton-show"]
                }
            }
        ]
    </script>
</mip-xyz-ga>
```

## 属性

### el

说明：自定义事件的触发对象

必填：否

格式：string

### depend

说明：自定义事件的触发辅助条件

必填：否

格式：String，一般指el上的Toggle ClassName

### event 

说明：事件内容

必填：依赖el

格式：对象

#### type

说明：事件触发类型

必填：是

格式：String, 例如click, mouseover

#### name

说明：事件名称

必填：是

格式：String, GOOGLE分析师记录使用

#### code

说明：事件说明

必填：是

格式：String or Array, GOOGLE分析师记录使用，当depend存在时为Array。




## 注意事项

全局唯一，涵盖GA CORE和自定义事件