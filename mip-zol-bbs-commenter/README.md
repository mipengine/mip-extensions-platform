# mip-zol-bbs-commenter

评论发布模块

标题|内容
----|----
类型|业务
支持布局|N,S|
所需脚本|https://c.mipcdn.com/static/v1/mip-zol-bbs-commenter/mip-zol-bbs-commenter.js

## 示例

### 基本用法
```html
<mip-zol-bbs-commenter class="new-poster mip-element mip-layout-container" data-post-url="//m.zol.com.cn/bbswap/ajax/wapbbs/reply.php?bbs=sjbbs&amp;boardid=34130&amp;bookid=176305" data-upload-pic-url="//m.zol.com.cn/bbswap/uploadFileIiframe.html"></mip-zol-bbs-commenter>
```

## 属性

### data-post-url
说明：发表评论的接口
必选项：是
类型：字符串

### data-upload-pic-url
说明：实现跨域上传图片的iframe地址
必选项：是
类型：字符串


### data-data: {}
说明：提交评论时的追加信息
必选项：否
类型：json对象