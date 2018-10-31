# mip-yunshi

根据使用用户去点击获取星座的信息而取得星座的解释；

标题|内容
----|----
类型|通用
支持布局|responsive
所需脚本|https://c.mipcdn.com/static/v1/mip-yunshi/mip-yunshi.js

## 示例
```html
    <div id="YUNSHIBOX" class="yunshi_box index">
        <div id="YUNSHISIGN" class="sign_logo">
            <span></span>
            <em>白羊座<i class="iconfont icon-down"></i></em>
        </div>
        <div class="yunshi_cnt">
            <p class="p1">运势指数 <span class="star"></span></p>
            <p class="p2"><a data-type="mip" href="https://mip.shenpo.com/yunshi/" data-title="星座运势查询">[详情]</a></p>
            <ul id="YUNSHITIME" class="time">
                <li val="0" class="cur">今日</li>
                <li val="1">明日</li>
                <li val="2">本周</li>
                <li val="3">本月</li>
            </ul>
        </div>
    </div>
    <mip-yunshi>
        <script src="https://c.mipcdn.com/static/v1/mip-yunshi/mip-yunshi.js"></script>
    </mip-yunshi>
```
### 基本用法
直接引用文件，根据页面上的HTML元素去完成用户的点击


## 技术实现原理
id 为驼峰式命名，页面的dom的id要和js里写的完全一样
