# mip-qbb-comment

mip-qbb-comment 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-qbb-comment/mip-qbb-comment.js

## 示例
```html
<mip-qbb-comment>
        <section class="comments-wrap">
            <div class="comment-item2">
                <div class="bd-title-wrap">
                 <div class="bd-title">最新评论<a class="" href="/comment-list/id/32214/model/Down" target="_blank">查看全部1条评论</a></div>
                </div>
                <div class="comments-list">
                    <p class="comments-user-info"><span class="name">cutemantou</span><span class="time">02-21 01:58</span></p>
                    <p class="comments-user-text">对宝宝的成长很有用处</p>
                </div>
                <input type="button" class="btn btn-w" value="我要评论">
                <input type="hidden" data-id="32214" data-model="Down" id="comment" class="commenthid">
            </div>

            <div class="comments-box">
                <div class="title">我来说两句<span class="tit">您还可以输入<em>140</em>个字</span></div>
                <textarea placeholder="在这里输入您的精彩评论吧" id="comments-show" class="comments-show"></textarea>
                <div class="buttons">
                    <input type="button" class="btn btn-cancel" value="取消">
                    <input type="button" class="btn btn-ok btn-notj" value="提交" disabled="">
                </div>
            </div>
        </section>
</mip-qbb-comment>
```

