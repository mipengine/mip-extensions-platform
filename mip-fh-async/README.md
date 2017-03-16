# mip-fh-async 

mip-fh-async 用来支持整站全网异步接口渲染组件

标题|内容
----|----
类型|通用
支持布局|N/A
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-fh-async/mip-fh-async.js

## 示例
基本用法

```html
<style mip-custom>
    .active { color: red; }
</style>

<button on="tap:mip-fh-async.send">
    <span>
        click me!
    </span>
</button>

<mip-fh-async id="mip-fh-async" url="https://partners.fh21.com.cn/partners/showcodejsonp?callback=?" 
data='{"ab": "test", "url": "http://fh21.com.cn", "http://": "september"}' block="div#xxoo" active-class="active" 
jsonp="callback">
    <template type="mip-mustache">
        <h2>
            {{errmsg}}
        </h2>
    </template>
</mip-fh-async>

<div id="xxoo">这些内容将会会替换</div>

<script defer async src="/local-extension-loader/mip-mustache.js"></script>
```

## 属性

### url 

说明：ajax请求路径
必填：是
类型: string

### data

说明：ajax请求所需参数
必填：否
类型：json

### block

说明：需要填充渲染的模板容器，合法的dom选择器
必填：否
类型：string

### active-class
说明：为绑定事件的节点元素添加请求活跃状态下的class
必填：否
类型：string

