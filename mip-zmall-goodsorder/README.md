# mip-zmall-goodsorder

商城订单处理组件，包括删除、确认收货、取消订单等

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-goodsorder/mip-zmall-goodsorder.js

## 更新

- 1.0.1 增加登录用户的判断
- 1.0.0 fix MIP页面使用JS跳转，跳转操作必须使用 `window.top.location.href=""`

## 示例

### 基本用法
```html
<mip-zmall-goodsorder id="MyOrder" data-ajax-url="path/to/api" on="success:MyOrderList.findElement">
<script type="application/json">{"canselOrderReason": []}</script>
</mip-zmall-goodsorder>
```

## 属性

### data-ajax-url

说明：处理订单的API接口      
必选项：是

### on

说明：处理订单成功后回调方法
必选项：是

## application/json

此处是传入一些数据。比如取消订单时候的 “取消原因” 列表。

## 注意事项

因为订单列表页是通过 `mip-zol-scroll-load` 来加载订单列表的，所以在列表页需要配合 `mip-zol-scroll-load` 组件来使用，配合方式：

```html
<div id="js_order_list" class="order-list-box"></div>
<mip-zol-scroll-load id="MyOrderList" on="elementFinded:MyOrder.changeStatus" data-src="path/to/api" template="tpl-order-list">
<!-- 此处为 mip-zol-scroll-load 的配置参数。具体请参考 mip-zol-scroll-load 的用法 -->
</mip-zol-scroll-load>
```

mip-zol-scroll-load 的用法 参考 https://github.com/mipengine/mip-extensions-platform/tree/master/mip-zol-scroll-load

订单详情页是通过 `mip-zol-mrender` 来加载订单的，所以需要配合 `mip-zol-mrender` 组件来使用，配合方式：

```html
<mip-zol-mrender id="MyOrderDetail" on="elementFinded:MyOrder.changeStatus" m-bind:data="!orderInfo.status?'m.orderInfo.data':''">
<!-- 此处为 mip-zol-mrender 的template结构。具体请参考 mip-zol-mrender 的用法 -->
</mip-zol-mrender>
```

mip-zol-mrender 的用法 参考 https://github.com/mipengine/mip-extensions-platform/tree/master/mip-zol-mrender



