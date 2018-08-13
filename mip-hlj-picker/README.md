# mip-hlj-picker

选择组件

标题|内容
----|----
类型|公司通用组件
所需脚本|https://c.mipcdn.com/static/v1/mip-hlj-picker/mip-hlj-picker.js

# mip-hlj-picker

mip-hlj-picker 弹窗选择组件，支持1-3级的弹窗

## 示例

### 基本用法
```html
    <mip-hlj-picker class="mip-picker" id="myPrice" data-value-el="priceText" data-id-el="price">
        <script type="application/json">
            {
                "type": 0,
                "data": [{
                    "id": "1000以下",
                    "name": "1000以下"
                }, {
                    "id": "1000-2000",
                    "name": "1000-2000"
                }, {
                    "id": "2000-5000",
                    "name": "2000-5000"
                }, {
                    "id": "5000-10000",
                    "name": "5000-10000"
                }, {
                    "id": "10000-15000",
                    "name": "10000-15000"
                }, {
                    "id": "15000-20000",
                    "name": "15000-20000"
                }, {
                    "id": "20000-30000",
                    "name": "20000-30000"
                }, {
                    "id": "30000以上",
                    "name": "30000以上"
                }],
                "keys": {
                    "id": "id",
                    "value": "name",
                    "childData": "children"
                }
            }
        </script>
    </mip-hlj-picker>
```

## 属性

### data-id-el，data-value-el

说明：data-value-el为输出内容input的id，data-id-el为输出id字符串input的ID
必选项：否
类型：字符串
取值范围：字符串
