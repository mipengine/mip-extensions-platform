# mip-xz6-comment

mip-xz6-comment 用来支持小说详情页的评论

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-xz6-comment/mip-xz6-comment.js

## 示例

在MIP HTML中,直接使用标签, 用于网站评论。示例如下:

```
<mip-xz6-comment>
    <section  class="wrap" id="comment">
        <div class="hd">
            <h3>网友评论</h3>
        </div>
        <div id="view-comment" class="reviews">
            <div class="post">
                <header><span class="fb">我要跟贴</span></header>
                <ul id="comment-list">
                </ul>
                <footer class="button-status-complete">
                    <span class="button">更多评论</span>
                </footer>
            </div>
        </div>
        <mip-form method="post" url="https://m.xz6.com/" id="submit" class="post">
            <fieldset class="w-text">
                <textarea></textarea>
            </fieldset>
            <fieldset class="w-button">
                <input id="verify" class="button disable" type="submit" value="提交跟贴"  hidefocus="true" />
                <span id="cancel" class="button">取消</span>
            </fieldset>
            <input name="username" type="hidden" class="inputText" id="username" value="网友" size="16" />
            <input name="password" type="hidden" class="inputText" id="password" value="" size="16" />
            <input name="classid" type="hidden" id="classid" value="111" />
            <input name="repid" type="hidden" id="repid" value="0" />
            <input type="hidden" id="app-id" value="135022" />
        </mip-form >
    </section>
</mip-xz6-comment>
```
