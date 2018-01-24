# mip-xuexb-login

前端小武博客异步登录组件，支持跨源站和 MIP-Cache 页的登录解决方案。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-form/mip-form.js,https://c.mipcdn.com/extensions/platform/v1/mip-xuexb-login/mip-xuexb-login.js

## 示例

### 基本用法
```html
<mip-xuexb-login data-url="登录接口链接">
    <mip-form url="登录接口链接">
        <ul>
            <li>
                <label for="username">用户名：</label>
                <input type="text" name="username" required>
            </li>
            <li>
                <label for="password">密码：</label>
                <input type="password" name="password" required>
            </li>
            <li>
                <button type="submit">
                    提交
                </button>
            </li>
        </ul>
    </mip-form>
</mip-xuexb-login>
```

## 属性

### data-url

说明：登录接口链接  
必选项：是  
类型：字符串  

### data-type

说明：异步提交类型
选项：`cors`（使用 [CORS 域方案](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)）、`jsonp`（使用 `JSONP` 跨域）  
必选项：否  
类型：字符串  
默认值：`jsonp`

## 子元素

### [name=username]

说明：用户名文本框  
必选项：是  
类型：输入框节点  
示例：`<input type="text" name="username">`

### [name=password]

说明：密码文本框  
必选项：是  
类型：输入框节点  
示例：`<input type="password" name="password">`

## 注意事项

1. 由于输入框父层元素必须包含 [`<mip-form>` 组件](https://www.mipengine.org/examples/mip-extensions/mip-form.html)，所以需要嵌套使用。
2. `<mip-xuexb-login>` 组件是使用表单的 `submit` 事件异步提交数据，所以必须存在提交按钮，如：`<button type="submit"></button>` 或者 `<input type="submit">` 。
3. CORS 跨域后端配置 `response.header` ：
```
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: request.header.origin || '*'
```
4. 异步接口返回要求：

登录成功返回：
```json
{
    "status": 0
}
```

登录失败返回：
```json
{
    "status": 1,// 非0则认为是错误
    "msg": "错误信息"
}
```

