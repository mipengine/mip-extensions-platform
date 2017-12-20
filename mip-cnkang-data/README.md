# mip-cnkang-data

mip-cnkang-data 康网直投广告组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-cnkang-data/mip-cnkang-data.js

## 示例

### 基本用法
```html
<div id="tags" data-cateid="19,50"></div>
<mip-fixed  type="bottom" id="ck-ad-52">
       <div class="ck-ad-52">
            <span class="btn-ck-ad-52" on="tap:ck-ad-52.close">关闭</span>
        </div>
       <mip-cnkang-data ck-ad-pid="52" lazy="true"></mip-cnkang-data>
</mip-fixed>
```
```style
mip-fixed[type="top"], mip-fixed[type="bottom"]{ overflow:inherit;}
```


