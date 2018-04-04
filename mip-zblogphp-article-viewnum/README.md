# mip-zblogphp-article-viewnum

MIP Z-BlogPHP支持组件 之 访问量

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-zblogphp-article-viewnum/mip-zblogphp-article-viewnum.js

## 使用方法


以下为在Z-BlogPHP模板内使用方法：
1. 参考[MIP主题开发指南](https://wiki.zblogcn.com/doku.php?id=zblogphp:development:plugins:mip)，先对MIP插件提供支持。
2. 将文章列表的``{$article.ViewNums}``换成
```html
<mip-zblogphp-article-viewnum post-id="{$article.ID}" default="{$article.ViewNums}" update="0" ></mip-zblogphp-article-viewnum>
```
3. 将文章页的``{$article.ViewNums}``换成
```html
<mip-zblogphp-article-viewnum post-id="{$article.ID}" default="{$article.ViewNums}" update="1" ></mip-zblogphp-article-viewnum>
```
4. 在主题的``footer.php``内插入
```html
<script src="https://c.mipcdn.com/static/v1/mip-zblogphp-article-viewnum/mip-zblogphp-article-viewnum.js"></script>
```

### 示例
```html
<mip-zblogphp-article-viewnum post-id="{$article.ID}" default="{$article.CommNums}" update="1"></mip-zblogphp-article-viewnum>
```

## 属性

### post-id
默认值：无  
说明：用于提交的文章ID  
必选项：是  
类型：字符串  
取值范围：数值  
单位：无  
默认值：''  

### default

说明：在未向Z-BlogPHP请求前的默认值  
必选项：否  
类型：字符串  
取值范围：数值  
单位：无  
默认值：0  

### update

说明：是否更新访问量  
必选项：否  
类型：数字  
取值范围：0 | 1  
单位：无  
默认值：0  
