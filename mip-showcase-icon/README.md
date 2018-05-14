# mip-showcase-icon

- 页面iconfont
- 在页面中需要 提前引入 svg相关 symbol
```
<div style="display:none">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
                  <symbol id="close" viewBox="0 0 1024 1024">
                        <title>close</title>
                        <path fill="currentColor" d="M512 456.310154L94.247385 38.557538a39.542154 39.542154 0 0 0-55.689847 0 39.266462 39.266462 0 0 0 0 55.689847L456.310154 512 38.557538 929.752615a39.542154 39.542154 0 0 0 0 55.689847 39.266462 39.266462 0 0 0 55.689847 0L512 567.689846l417.752615 417.752616c15.163077 15.163077 40.290462 15.36 55.689847 0a39.266462 39.266462 0 0 0 0-55.689847L567.689846 512 985.442462 94.247385a39.542154 39.542154 0 0 0 0-55.689847 39.266462 39.266462 0 0 0-55.689847 0L512 456.310154z"
                              p-id="1197" fill="#bfbfbf"></path>

                  </symbol>
                  .....
            </defs>
      </svg>
</div>
```

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-showcase-icon/mip-showcase-icon.js

## 示例

### 基本用法
```html
<mip-showcase-icon type="close"></mip-showcase-icon>
```

## 属性
### type
- close 关闭
- delete 删除
- shopping 购物车
- plus 加号
- reduce 减号
- weeLogo wee咖啡logo


说明：
必选项：是
类型：Boolean
默认值：无

## 注意事项

