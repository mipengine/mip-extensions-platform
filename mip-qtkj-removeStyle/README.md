# mip-qtkj-removeStyle

mip-qtkj-removeStyle 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qtkj-removeStyle/mip-qtkj-removeStyle.js

## 示例

### 基本用法
```html
<mip-qtkj-removeStyle>
    <div class="remove-style" style="background:#f00;">
        <p style="background:#00f;color:#f0f;">
            <span style="color:#00f">
                <span style="color:#00f">
                    <span style="color:#00f">
                        <span style="color:#00f">
                            111111111111
                        </span>
                    </span>
                </span>
            </span>
        </p>
    </div>
</mip-qtkj-removeStyle>
```

## 属性

### remove-style

说明：需要去除style属性的最外层的类名
必选项：是
类型：字符串

## 从含remove-style的类名那一层算，最多可嵌套6层，超出的无法去除style属性。

