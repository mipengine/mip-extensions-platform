# mip-zmall-tab-ajax

公用的ajax切换数据的选项卡，业务组件，与mip-zol-loadmore配合使用

标题|内容
----|----
类型|业务通用组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-tab-ajax/mip-zmall-tab-ajax.js

## 示例

### 基本用法
```html
<mip-fixed type="top">
    <mip-zmall-tab-ajax>
    <script type="application/json">
        {
            "activeClassName": "current",
            "defaultIndex": 0,
            "tabs": [
                {
                    "text": "全部",
                    "on": "MyOrderList.refresh([{name:'orderStatus',value:0}])"
                },
                {
                    "text": "待付款",
                    "on": "MyOrderList.refresh([{name:'orderStatus',value:2}])"
                },
                {
                    "text": "待发货",
                    "on": "MyOrderList.refresh([{name:'orderStatus',value:3}])"
                },
                {
                    "text": "待收货",
                    "on": "MyOrderList.refresh([{name:'orderStatus',value:4}])"
                }
            ]
        }
    </script>
    </mip-zmall-tab-ajax>
</mip-fixed>
```

需要配合 `mip-zol-loadmore` 组件来使用，因为涉及到滚动加载更多。配合方式：

```html
<div id="js_order_list" class="order-list-box"></div>
<mip-zol-loadmore id="MyOrderList" on="elementFinded:MyOrder.changeStatus" data-src="path/to/api" template="tpl-order-list">
<!-- 此处为 mip-zol-loadmore 的配置参数。具体请参考 mip-zol-loadmore 的用法 -->
</mip-zol-loadmore>
```

mip-zol-loadmore 的用法 参考 https://github.com/mipengine/mip-extensions-platform/tree/master/mip-zol-loadmore


## 属性

## 注意事项

每个TAB执行的方法 `MyOrderList.refresh` 是由 `mip-zol-loadmore` 对外提供的方法。