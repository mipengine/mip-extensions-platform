# mip-typecho-comment

Typecho评论回复组件

| 标题   | 内容                                                                          |
| ---- | --------------------------------------------------------------------------- |
| 类型   | 通用                                                                          |
| 支持布局 | responsive,fixed-height,fill,container,fixed                                |
| 所需脚本 | <https://c.mipcdn.com/static/v1/mip-typecho-comment/mip-typecho-comment.js> |

## 示例

### 基本用法

```html
<style mip-custom>
.comment-list, .comment-list ol {
    list-style: none;
}

.comment-list li {
    margin-top: 10px;
    padding: 14px;
}

.comment-list li .comment-level-odd {
    background: #999;
}

.comment-list li .comment-level-even {
    background: #FFF;
}

.comment-list li .comment-reply {
    position: absolute;
    bottom: 2px;
    right: 0px;
    font-size: 12px;
}

.comment-author-avatar{
    display: block;
    position:relative;
    height: 40px;
}

.comment-author .avatar {
    background-color: #222;
}

.comment-name{
    position:absolute;
    top:0px;
    padding: 10px 0 0 50px;
}

.comment-content {
    display: block;
    margin-top: 10px;
}

.comment-list .respond {
    margin-top: 15px;
}

.respond .cancel-comment-reply {
    float: right;
    margin-top: 15px;
    font-size: 12px;
}
</style>
<mip-typecho-comment>
    <div id="comments">
        <h3>已有评论</h3>

        <ol class="comment-list">
            <li id="comment-3" class="comment-body comment-parent comment-odd">
                <div class="comment-author-avatar">
                    <div class="comment-author" itemprop="creator">
                        <mip-img class="avatar" src="" alt="" width="40" height="40" /></mip-img>
                    </div>
                    <div class="comment-name">
                        <cite class="fn" itemprop="name">在路上</cite>
                    </div>
                    <div class="comment-reply"><a objective="reply" coid="3" cid="comment-3" rid="respond-post-1" href="" rel="nofollow">回复</a></div>
                </div>
                <div class="comment-content" itemprop="commentText">启动多层评论回复，MIP代码校验通不过。</div>
                <div class="comment-children" itemprop="discusses">
                    <ol class="comment-list">
                        <li id="comment-18" class="comment-body comment-child comment-level-odd comment-odd">
                            <div class="comment-author-avatar">
                                <div class="comment-author" itemprop="creator">
                                    <mip-img class="avatar" src="" alt="" width="40" height="40" /></mip-img>
                                </div>
                                <div class="comment-name">
                                    <cite class="fn" itemprop="name">程序猿</cite>
                                </div>
                                <div class="comment-reply"><a objective="reply" coid="18" cid="comment-18" rid="respond-post-1" href="" rel="nofollow">回复</a></div>
                            </div>
                            <div class="comment-content" itemprop="commentText">这个组件可以搞定。</div>
                            <div class="comment-children" itemprop="discusses">
                                <ol class="comment-list">
                                    <li id="comment-19" class="comment-body comment-child comment-level-even comment-odd">
                                        <div class="comment-author-avatar">
                                            <div class="comment-author" itemprop="creator">
                                                <mip-img class="avatar" src="" alt="" width="40" height="40" /></mip-img>
                                            </div>
                                            <div class="comment-name">
                                                <cite class="fn" itemprop="name">老油条</cite>
                                            </div>
                                            <div class="comment-reply"><a objective="reply" coid="19" cid="comment-19" rid="respond-post-1" href="" rel="nofollow">回复</a></div>
                                        </div>
                                        <div class="comment-content" itemprop="commentText">是的，需要修改几处源代码。</div>
                                    </li>
                                </ol>
                            </div>
                        </li>
                    </ol>
                </div>
            </li>
        </ol>

        <div id="respond-post-1" class="respond">
            <div class="cancel-comment-reply">
                <a id="cancel-comment-reply-link" objective="cancelreply" class="cancelreply" rid="respond-post-1" href="" rel="nofollow" class="cancelreply">取消回复</a> </div>

            <h3 id="response">我要评论</h3>
            <mip-form method="post" url="" id="comment-form" role="form" target="_parent">
                <p><input type="text" name="author" id="author" class="text" value="称呼" required/></p>
                <p><input type="email" name="mail" id="mail" class="text" value="Email" required/></p>
                <p><textarea rows="8" cols="50" name="text" id="textarea" class="textarea" required>内容</textarea></p>
                <p><button type="submit" class="submit-button">提交</button></p>
            </mip-form>
        </div>
    </div>
</mip-typecho-comment>
```
