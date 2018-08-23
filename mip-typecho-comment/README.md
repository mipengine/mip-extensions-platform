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
<h3>已有评论</h3>
<ol class="comment-list">
<li itemscope itemtype="http://schema.org/UserComments" id="comment-142" class="comment-body comment-parent comment-odd">
    <div class="comment-author-avatar">
        <div class="comment-author" itemprop="creator" itemscope itemtype="http://schema.org/Person">
            <mip-img class="avatar" src="https://q.qlogo.cn/g?b=qq&nk=10000&s=100" alt="" width="40" height="40" /></mip-img>
        </div>
        <div class="comment-name">
            <cite class="fn" itemprop="name">在路上</cite>
        </div>
        <div class="comment-reply"><a cid="comment-142" coid="142" href="https://typecho.local/index.php/archives/1/?replyTo=142#respond-post-1" rel="nofollow" target="_parent">回复</a></div>
    </div>
    <div class="comment-content" itemprop="commentText">启动多层评论回复，MIP代码校验通不过。</div>
    <div class="comment-children" itemprop="discusses">
        <ol class="comment-list">
            <li itemscope itemtype="http://schema.org/UserComments" id="comment-144" class="comment-body comment-child comment-level-odd comment-odd">
                <div class="comment-author-avatar">
                    <div class="comment-author" itemprop="creator" itemscope itemtype="http://schema.org/Person">
                        <mip-img class="avatar" src="https://q.qlogo.cn/g?b=qq&nk=10000&s=100" alt="" width="40" height="40" /></mip-img>
                    </div>
                    <div class="comment-name">
                        <cite class="fn" itemprop="name">程序猿</cite>
                    </div>
                    <div class="comment-reply"><a cid="comment-144" coid="144" href="https://typecho.local/index.php/archives/1/?replyTo=144#respond-post-1" rel="nofollow" target="_parent">回复</a></div>
                </div>
                <div class="comment-content" itemprop="commentText">这个组件可以搞定。</div>
                <div class="comment-children" itemprop="discusses">
                    <ol class="comment-list">
                        <li itemscope itemtype="http://schema.org/UserComments" id="comment-152" class="comment-body comment-child comment-level-even comment-odd">
                            <div class="comment-author-avatar">
                                <div class="comment-author" itemprop="creator" itemscope itemtype="http://schema.org/Person">
                                    <mip-img class="avatar" src="https://q.qlogo.cn/g?b=qq&nk=10000&s=100" alt="" width="40" height="40" /></mip-img>
                                </div>
                                <div class="comment-name">
                                    <cite class="fn" itemprop="name">老油条</cite>
                                </div>
                                <div class="comment-reply"><a cid="comment-152" coid="152" href="https://typecho.local/index.php/archives/1/?replyTo=152#respond-post-1" rel="nofollow" target="_parent">回复</a></div>
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
        <a id="cancel-comment-reply-link" target="_parent" href="https://typecho.local/index.php/archives/1/#respond-post-1" rel="nofollow" class="hidden">取消回复</a>
    </div>
<h3 id="response">我要评论</h3>
<mip-form method="post" url="https://typecho.local/index.php/archives/1/comment" id="comment-form" role="form" target="_parent">
    <p><input type="text" name="author" id="author" class="text" value="新用户" required/></p>
    <p><input type="email" name="mail" id="mail" class="text" value="1526987493@qq.com" required placeholder="填写QQ邮箱，头像更炫！" /></p>
    <p><textarea rows="8" cols="50" name="text" id="textarea" class="textarea" required></textarea></p>
    <p><button type="submit" class="submit">提交评论</button></p>
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
