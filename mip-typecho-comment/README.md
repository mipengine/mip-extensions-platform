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

input[type="text"], input[type="email"], input[type="url"], input[type="password"], textarea {
    -webkit-appearance: none;
    appearance: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0;
    padding: 6px;
    width: 100%;
    border: .5px solid #E9E9E9;
    margin: -0.5px;
    border-radius: 2px;
    font-size: 13px;
}

.comment-list, .comment-list ol {
    margin: 0;
    padding: 0;
    list-style: none;
}

.comment-list li {
    margin-top: 10px;
    padding: 14px;
    border: .5px solid #EEE;
}

.comment-list li.comment-level-odd {
    background: #F6F6F3;
}

.comment-list li.comment-level-even {
    background: #FFF;
}

.comment-list li.comment-by-author {
    background: #FFF9E8;
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
    float: left;
    border-radius: 50%;
    background-color: #aaa;
}

.comment-name cite {
    font-weight: bold;
    font-style: normal;
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
    border-top: .5px solid #EEE;
}

.respond .cancel-comment-reply {
    float: right;
    margin-top: 15px;
    font-size: 12px;
}

#comment-form label {
    display: block;
    margin-bottom: .5em;
    font-weight: bold;
}

#comment-form .required:after {
    color: #C00;
    content: " *";
}
</style>
<mip-typecho-comment>
<div id="comments">
    <ol class="comment-list">
        <li itemscope itemtype="http://schema.org/UserComments" id="comment-98" class="comment-body comment-parent comment-odd">
            <div class="comment-author-avatar">
                <div class="comment-author" itemprop="creator" itemscope itemtype="http://schema.org/Person">
                    <mip-img class="avatar" src="" alt="" width="40" height="40" /></mip-img>
                </div>
                <div class="comment-name">
                    <cite class="fn" itemprop="name">任杰</cite>
                </div>
                <div class="comment-reply">
                    <span target="reply" coid="98" cid="comment-98" rid="respond-post-9">回复</span>
                </div>
            </div>
            <div class="comment-content" itemprop="commentText">如果谁要注册商标，欢迎回复我的时候告诉我联系方式。</div>
            <div class="comment-children" itemprop="discusses">
                <ol class="comment-list">
                    <li itemscope itemtype="http://schema.org/UserComments" id="comment-112" class="comment-body comment-child comment-level-odd comment-odd">
                        <div class="comment-author-avatar">
                            <div class="comment-author" itemprop="creator" itemscope itemtype="http://schema.org/Person">
                                <mip-img class="avatar" src="" alt="" width="40" height="40" /></mip-img>
                            </div>
                            <div class="comment-name">
                                <cite class="fn" itemprop="name">地灵</cite>
                            </div>
                            <div class="comment-reply">
                                <span target="reply" coid="112" cid="comment-112" rid="respond-post-9">回复</span>
                            </div>
                        </div>
                        <div class="comment-content" itemprop="commentText">你们一个二个都是牛人了，我才摸清这个行业的门道。没有想的那么容易哦！好多问题都暂时解决不了呢。</div>
                        <div class="comment-children" itemprop="discusses">
                            <ol class="comment-list">
                                <li itemscope itemtype="http://schema.org/UserComments" id="comment-113" class="comment-body comment-child comment-level-even comment-odd">
                                    <div class="comment-author-avatar">
                                        <div class="comment-author" itemprop="creator" itemscope itemtype="http://schema.org/Person">
                                            <mip-img class="avatar" src="" alt="" width="40" height="40" /></mip-img>
                                        </div>
                                        <div class="comment-name">
                                            <cite class="fn" itemprop="name">圆佳</cite>
                                        </div>
                                        <div class="comment-meta">
                                        </div>
                                        <div class="comment-reply">
                                            <span target="reply" coid="113" cid="comment-113" rid="respond-post-9">回复</span>
                                        </div>
                                    </div>
                                    <div class="comment-content" itemprop="commentText">我也想试一试！</div>
                                </li>
                            </ol>
                        </div>
                    </li>
                </ol>
            </div>
        </li>
    </ol>
    <div id="respond-post-9" class="respond">
        <div class="cancel-comment-reply">
            <span target="cancelreply" class="cancelreply" id="cancel-comment-reply-link" rid="respond-post-9">取消回复</span>
        </div>

        <h3 id="response">添加新反馈</h3>
        <mip-form method="post" url="" id="comment-form" role="form" target="_parent">
            <p>
                <label for="author" class="required">称呼</label>
                <input type="text" name="author" id="author" class="text" value="" required/>
            </p>
            <p>
                <label for="mail" class="required">电子邮箱</label>
                <input type="email" name="mail" id="mail" class="text" value="" required placeholder="填写QQ邮箱，头像更炫！" />
            </p>
            <p>
                <label for="textarea" class="required">内容</label>
                <textarea rows="8" cols="50" name="text" id="textarea" class="textarea" required></textarea>
            </p>
            <p>
                <button type="submit" class="submit-button">提交反馈</button>
            </p>
        </mip-form>
    </div>
</div>
</mip-typecho-comment>
```
