# mip-linkeddb-dropdown

mip-linkeddb-dropdown  判断type  `type === 'tv,movie' or 'person'` 加载一段网页 {% include "xxx.html" %}
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkeddb-dropdown/mip-linkeddb-dropdown.js

## 示例

### 基本用法
```html
<mip-linkeddb-dropdown>
	<div class="assembly">
        <div class="all-list" data-type="{{type}}">
            <ul class="infinite-list">
				{% include "xxx.html" %}
            </ul>
        </div>
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
    </div>
</mip-linkeddb-dropdown>
```
## 注意事项

说明：由于数据接口加载的是一段网页，不能直接用mip-infinitescroll，所以才针对做的组件。判断type类型，根据不同的类型输出不同的一段网页。