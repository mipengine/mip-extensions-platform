# mip-hs-dropload

mip-hs-dropload 组件说明
更多内容加载分页，进行下拉加载
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-dropload/mip-hs-dropload.js

## 示例

### 基本用法
```html
<mip-hs-dropload mip-dropload-params="{'url': 'https://', 'isclick': 'iscroll'}">
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
</mip-hs-dropload>
```

## 属性

### {属性名}

说明：{ajax请求参数}
必选项：{是}
类型：{数组格式的字符串}
取值范围：{请求url（包含数据）， iscroll是否需要滚动加载（Boolean）}
单位：{单位}
默认值：{默认值}

## 注意事项

