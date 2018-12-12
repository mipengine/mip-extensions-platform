# mip-watch-search

mip-watch-search 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-watch-search/mip-watch-search.js

## 示例

### 基本用法
```html
<mip-watch-search>
        <script src="https://res.wx.qq.com/open/libs/weuijs/1.1.4/weui.min.js"></script>
        <div class="search">
            <div class="search-left">
                <div class="search-left-select">
                    <mip-img
                            class="img1"
                            layout="responsive"
                            width="1"
                            height="1"
                            src="../assets/img/icon_positioning.png">
                    </mip-img>
                    <!--<img src="../assets/img/icon_positioning.png" alt="" class="img1">-->
                    <span>上海</span>
                    <mip-img
                            class="img2"
                            layout="responsive"
                            width="1"
                            height="1"
                            src="../assets/img/icon_selected_triangle.png">
                    </mip-img>
                    <!--<img src="../assets/img/icon_selected_triangle.png" alt="" class="img2">-->
                </div>
                <span class="line"></span>
                <mip-form class="txt-wrapper" url="https://baidu.com">
                    <input type="text" class="txt" placeholder="输入店铺或区域"/>
                </mip-form>
                <!--<input type="text" class="txt" placeholder="输入店铺或区域"/>-->
            </div>
            <div class="search-right">
                <button>查询</button>
            </div>
        </div>
</mip-watch-search>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

