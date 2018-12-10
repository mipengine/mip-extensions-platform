# mip-change-async

异步刷新页面数据

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-change-async/mip-change-async.js

## 示例

### 基本用法
```html

<button on='tap:change-async.send'>触发按钮</button>
<mip-change-async id='change-async' url='http://picture_management.sandbox.fh21.com.cn/api/pic_list' block='#block' active-class='active'>
    <template type='mip-mustache'>
	 	<h1>21</h1>
	</template>
</mip-change-async>

<div id="block">替换内容</div>

<script src='https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js'></script>


```

## 属性

### url

说明：请求路径
必选项：是
类型：字符串


### data

说明：请求参数
必选项：否


### block

说明：填充元素
必选项：是


### active-class

说明：活动样式
必选项：否


## 注意事项

