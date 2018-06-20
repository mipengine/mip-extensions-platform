# mip-anlian-public

mip-anlian-public 项目初始化自用。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-anlian-public/mip-anlian-public.js

## 示例

### 基本用法
```html
<mip-anlian-public>
    <div class="top-title">
        <p><?=$topTitle ?></p>
        <a href="javascript:void(0);" class="searchShow"></a>
        <a href="javascript:history.go(-1);" class="back"></a>
    </div>
    <div class="header-searchbox">
        <div class="search_header clearfix">
            <div class="search-box flo-left">
                <mip-form onsubmit="return false;">
                    <input name="world" id="searchKeyword" type="search" class="input-search" placeholder="搜索">
                </mip-form>
            </div>
            <a href="javascript:void(0);" class="flo-left search-cancel-btn">取消</a>
        </div>
        <div class="searchclose"></div>
    </div>
</mip-anlian-public>
```

## 属性

## 注意事项
项目初始化自用。