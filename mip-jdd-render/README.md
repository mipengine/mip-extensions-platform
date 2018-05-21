# mip-jdd-render

组件主要用Mustache模板渲染组件。可以立即渲染数据，或者注册监听行为，等待渲染。同时渲染成功后触发rendered事件

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jdd-render/mip-jdd-render.js<br/> https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js

## 示例

### 立即渲染
```html
<mip-jdd-render render>
    <script type="application/json">
    	{
    		"content": "立即渲染成功"
    	}	
    </script>
    <template type="mip-mustache">
    	<div>{{content}}</div>
    </template>
</mip-jdd-render>
```

### 监听行为渲染
```html
<button on="tap:render1.render">点击渲染</button>
<mip-jdd-render id="render1">
    <script type="application/json">
    	{
    		"content1": "监听行为渲染成功"
    	}	
    </script>
    <template type="mip-mustache">
    	<div>{{content1}}</div>
    </template>
</mip-jdd-render>
```

### 渲染成功后的回调
```html
<button on="tap:render2.render">点击渲染</button>
<mip-jdd-render id="render2" on="rendered:render3.render">
    <script type="application/json">
    	{
    		"content2": "渲染成功后再渲染render3"
    	}	
    </script>
    <template type="mip-mustache">
    	<div>{{content2}}</div>
    </template>
</mip-jdd-render>
<mip-jdd-render id="render3"">
    <script type="application/json">
    	{
    		"content3": "render3渲染成功"
    	}	
    </script>
    <template type="mip-mustache">
    	<div>{{content3}}</div>
    </template>
</mip-jdd-render>
```

## 属性

### render

说明：mip-jdd-render 标签 含有render属性，就立即渲染mustance,没有则监听render事件。
必选项：否
类型：无
取值范围：无
单位：无
默认值：无

## 注意事项

