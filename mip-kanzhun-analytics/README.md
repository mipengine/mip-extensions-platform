# mip-kanzhun-analytics

mip-kanzhun-analytics 是看准为自身页面添加的统计埋点。

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed

## 示例

### 使用方法

一个页面只允许存在一个mip-kanzhun-analytics元素

```html
<mip-kanzhun-analytics>
</mip-kanzhun-analytics>
```

### 测试统计

```html
<div ka="test-element">
    <p>元素点击，进行统计</p>
</div>
```

## 注意事项

1、每个页面只引入一次即可