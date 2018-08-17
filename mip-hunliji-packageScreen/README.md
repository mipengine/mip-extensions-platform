# mip-hunliji-packageScreen

mip-hunliji-packageScreen 套餐列表筛选

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hunliji-packageScreen/mip-hunliji-packageScreen.js

## 示例

### 基本用法
```html
<mip-hunliji-packageScreen>
            <div class="package_screen">
                <div class="package_screen_type">
                    <ul id="typeclick">
                        <li data-type="screen_box1" data-list="">婚纱摄影<i></i></li><!-- 

                         --><li data-type="screen_box2" data-list="">区域<i></i></li><!-- 

                          --><li data-type="screen_box3" data-list="">综合排序<i></i></li><!-- 

                           --><li data-type="screen_box4" data-list="">筛选</li>
                    </ul>
                    <div id="package_screen_content">
                        <dl class="screen_box1">
                            <dd data-list="1">1</dd>
                            <dd data-list="2">2</dd>
                            <dd data-list="3">3</dd>
                            <dd data-list="4">4</dd>
                            <dd data-list="5">5</dd>
                            <dd data-list="6">6</dd>
                        </dl>
                        <dl class="screen_box2">
                            <dd data-list="21">21</dd>
                            <dd data-list="22">22</dd>
                            <dd data-list="23">23</dd>
                            <dd data-list="24">24</dd>
                        </dl>
                        <dl class="screen_box3">
                            <dd data-list="31">31</dd>
                            <dd data-list="32">32</dd>
                            <dd data-list="33">33</dd>
                            <dd data-list="34">34</dd>
                        </dl>
                        <dl class="screen_box4">
                            <dt>价格 :<input type="number" id=ip1>-<input type="number" id=ip2></dt>
                            <dt><button id='btn_clear'>重置</button><button id="btn_submit">确定</button></dt>
                        </dl>
                    </div>
                </div>
            </div>
        </mip-hunliji-packageScreen>
```

## 属性

### {data-type}

说明：{筛选dl的class名}
必选项：{是}

## 注意事项

