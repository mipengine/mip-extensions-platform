# mip-fh-dropload

mip-fh-dropload 用来支持页面下拉加载

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-fh-dropload/mip-fh-dropload.js

## 示例

```html
<mip-fh-dropload mip-dropload-params="{'url': 'https://******.cn/sex/api/newslist?cid=3830&channel=1&pagesize=10&cid2=26196', 'isclick': 'iscroll'}">
    <section class="dropload-list">
        <ul>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>
            <li>
                加载的内容，第一页用来站位置的……
            </li>

        </ul>
        <template type="mip-mustache">
            {{#data}}
            <li>
                {{title}}
            </li>
            {{/data}}
        </template>
        <p class="button-footer"><span>上拉查看更多...</span></p>
    </section>
</mip-fh-dropload>
```
## 属性

### mip-dropload-params

说明：ajax请求参数
必选项：是   
类型：数组格式的字符串   
取值范围：请求url（包含数据）， iscroll是否需要滚动加载（Boolean）  
单位：无   
默认值：无   
