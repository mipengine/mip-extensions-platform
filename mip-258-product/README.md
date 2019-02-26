# mip-258-product

mip-258-product 修改内容，判断内容是否含有符合价格单位'￥','.00'的规格，若不符合则添加。并给自身增加样式。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-258-product/mip-258-product.js

## 示例

### 基本用法
```html
<style lang="less">
    body{height:1500px!important;}
    .changePrice{text-align: center;line-height: 45px;}

</style>
<div id="price">￥123.00</div>
<mip-258-product class="changePrice" target="price" change-price="234">
    点击这里1
</mip-258-product>
<mip-258-product class="changePrice" target="price" change-price="567">
    点击这里2
</mip-258-product>
```

## 属性

### target

说明：指向需要修改内容的dom，支持queryselector
必选项：是
类型：字符串
取值范围：queryselector内容

## 注意事项

### change-price

说明：需要修改的dom的内容
必选项：是
类型：字符串

## 注意事项

