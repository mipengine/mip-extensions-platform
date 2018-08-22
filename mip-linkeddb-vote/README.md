# mip-linkeddb-vote

mip-linkeddb-vote 投票功能 根据投票反对和支持的票数算出比重

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkeddb-vote/mip-linkeddb-vote.js

## 示例

### 基本用法
```html
<mip-linkeddb-vote data-src="xxx" sin-in="xxxn" data-oid1="a.id" data-oid2="b.id" data-cp-id="c.id" >
    <div class="vote-wrap">
        <div class="vote__hd">
            <span class="num oppose-num"></span>
            <div>
                <span class="oppose-line"></span>
                <span class="support-line"></span>
            </div>
            <span class="support-num"></span>
        </div>
        <div class="vote__bd">
            <div class="poll-submit">
                <div class="poll-oppose">
                    <span class="num">5</span>
                    <a href="###" class="oppose-btn">反对</a>
                </div>
                <div>
                    <span>网友投票</span>
                    <span>
                        <i>V</i>
                        <i>S</i>
                    </span>
                </div>
                <div class="poll-support">
                    <span class="num">1</span>
                    <a href="###" class="support-btn">支持</a>
                </div>
            </div>
        </div>
    </div>
</mip-linkeddb-vote>
```

## 属性

### {data-oid1,data-oid2,data-cp-id}

说明：接口参数，标注当前网页的唯一性
必选项：是
类型：字符串
取值范围：无

### {data-src,sin-in}

说明：请求路径，为get请求
必选项：是
类型：字符串
取值范围：无


## 注意事项
当前网页所有的class 都是必须项

