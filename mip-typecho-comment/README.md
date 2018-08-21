# mip-typecho-comment Typecho评论回复组件
| 标题 | 内容 |
| ---- | --------------------------------------------------------------------------- |
| 类型 | 通用 |
| 支持布局 | responsive,fixed-height,fill,container,fixed |
| 所需脚本 |<https://c.mipcdn.com/static/v1/mip-typecho-comment/mip-typecho-comment.js>|

## 示例

### 基本用法

```html
<link rel="stylesheet" type="text/css" href="https://typecho.local/usr/themes/default/style.css">
<mip-typecho-comment target="respond-post-1">
    <div id="comments">
        <h3>已有 3 条反馈</h3>

        <ol class="comment-list">
            <li itemscope itemtype="http://schema.org/UserComments" id="comment-8" class="comment-body comment-parent comment-odd">
                <div class="comment-author-avatar">
                    <div class="comment-author" itemprop="creator" itemscope itemtype="http://schema.org/Person">
                        <mip-img class="avatar" src="https://secure.gravatar.com/avatar/6659571a92b67f94236de7fe81eda285?s=80&r=G&d=identicon" alt="" width="40" height="40" /></mip-img>
                    </div>
                    <div class="comment-name">
                        <cite class="fn" itemprop="name">在路上</cite>
                    </div>
                    <div class="comment-meta">
                        <a href="https://typecho.local/index.php/archives/1/#comment-8"><time itemprop="commentTime" datetime="2018-08-20T15:43:54+00:00">15:43, August 20th, 2018</time></a>
                    </div>
                    <div class="comment-reply"><a cid="comment-8" coid="8" href="https://typecho.local/index.php/archives/1/?replyTo=8#respond-post-1" rel="nofollow" target="_parent">回复</a></div>
                </div>
                <div class="comment-content" itemprop="commentText">启动多层评论回复，MIP代码校验通不过。</div>
                <div class="comment-children" itemprop="discusses">
                    <ol class="comment-list">
                        <li itemscope itemtype="http://schema.org/UserComments" id="comment-10" class="comment-body comment-child comment-level-odd comment-odd">
                            <div class="comment-author-avatar">
                                <div class="comment-author" itemprop="creator" itemscope itemtype="http://schema.org/Person">
                                    <mip-img class="avatar" src="https://secure.gravatar.com/avatar/6659571a92b67f94236de7fe81eda285?s=80&r=G&d=identicon" alt="" width="40" height="40" /></mip-img>
                                </div>
                                <div class="comment-name">
                                    <cite class="fn" itemprop="name">程序猿</cite>
                                </div>
                                <div class="comment-meta">
                                    <a href="https://typecho.local/index.php/archives/1/#comment-10"><time itemprop="commentTime" datetime="2018-08-20T15:44:35+00:00">15:44, August 20th, 2018</time></a>
                                </div>
                                <div class="comment-reply"><a cid="comment-10" coid="10" href="https://typecho.local/index.php/archives/1/?replyTo=10#respond-post-1" rel="nofollow" target="_parent">回复</a></div>
                            </div>
                            <div class="comment-content" itemprop="commentText">这个组件可以搞定。</div>
                            <div class="comment-children" itemprop="discusses">
                                <ol class="comment-list">
                                    <li itemscope itemtype="http://schema.org/UserComments" id="comment-12" class="comment-body comment-child comment-level-even comment-odd">
                                        <div class="comment-author-avatar">
                                            <div class="comment-author" itemprop="creator" itemscope itemtype="http://schema.org/Person">
                                                <mip-img class="avatar" src="https://secure.gravatar.com/avatar/6659571a92b67f94236de7fe81eda285?s=80&r=G&d=identicon" alt="" width="40" height="40" /></mip-img>
                                            </div>
                                            <div class="comment-name">
                                                <cite class="fn" itemprop="name">老油条</cite>
                                            </div>
                                            <div class="comment-meta">
                                                <a href="https://typecho.local/index.php/archives/1/#comment-12"><time itemprop="commentTime" datetime="2018-08-20T15:45:04+00:00">15:45, August 20th, 2018</time></a>
                                            </div>
                                            <div class="comment-reply"><a cid="comment-12" coid="12" href="https://typecho.local/index.php/archives/1/?replyTo=12#respond-post-1" rel="nofollow" target="_parent">回复</a></div>
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
                <a id="cancel-comment-reply-link" target="_parent" href="https://typecho.local/index.php/archives/1/#respond-post-1" rel="nofollow" class="cancelreply">取消回复</a> </div>

            <h3 id="response">我要反馈</h3>
            <mip-form method="post" url="https://typecho.local/index.php/archives/1/comment" id="comment-form" role="form" target="_parent">
                <p>
                    <label for="author" class="required">称呼</label>
                    <input type="text" name="author" id="author" class="text" value="新客户" required/>
                </p>
                <p>
                    <label for="mail" class="required">电子邮箱</label>
                    <input type="email" name="mail" id="mail" class="text" value="1526987493@qq.com" required placeholder="填写QQ邮箱，头像更炫！" />
                </p>
                <p>
                    <label for="textarea" class="required">内容</label>
                    <textarea rows="8" cols="50" name="text" id="textarea" class="textarea" required></textarea>
                </p>
                <p>
                    <button id="btn" type="submit" class="submit-button">提交反馈</button>
                </p>
            </mip-form>
        </div>
    </div>
</mip-typecho-comment>
<script src="https://c.mipcdn.com/static/v1/mip.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-form/mip-form.js"></script>

```

## 属性

### target
必选项：是  
类型：字符串  
说明：确定文章目标的参数
