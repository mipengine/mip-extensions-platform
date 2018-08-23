# mip-hlj-address

选择组件

标题|内容
----|----
类型|公司通用组件
所需脚本|https://c.mipcdn.com/static/v1/mip-hlj-picker/mip-hlj-address.js

# mip-hlj-address

mip-hlj-picker 地址选择弹窗

## 示例

### 基本用法
```html
    <mip-hlj-address class="mip-picker" id="myCityPicker" data-value-el="addressText" data-id-el="city_code" data-api="http://172.16.12.136:8000/json/address.json">
        <script type="application/json">
            {
                "pickerType": "city",
                "type": 3,
                "keys": {
                    "id": "id",
                    "value": "area_name",
                    "childData": "children"
                }
            }
        </script>
    </mip-hlj-address>
```

## 属性

### data-id-el，data-value-el

说明：data-value-el为输出内容input的id，data-id-el为输出id字符串input的ID
必选项：否
类型：字符串
取值范围：字符串
