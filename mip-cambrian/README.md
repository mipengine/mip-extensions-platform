# mip-cambrian

mip-cambrian 熊掌号组件，

调用此组件，会向SuperFrame 传递熊掌号id，

SuperFrame获取相关数据后，更新TitleBar为熊掌号样式效果

| 标题   | 内容                                       |
| ---- | ---------------------------------------- |
| 类型   | 业务                                       |
| 支持布局 | responsive,fixed-height,fill,container,fixed |
| 所需脚本 | https://c.mipcdn.com/extensions/platform/v1/mip-cambrian/mip-cambrian.js |

## 示例

### 基本用法
```html
<mip-cambrian site-id="12345"></mip-cambrian>
```

## 属性

### site-id

说明：熊掌号唯一id
必选项：是
类型：字符串


## 使用说明


### 适用场景

适用于经MIP改造的第三方站点

### 样式效果


<img src="http://agroup-bos.cdn.bcebos.com/3a9663565e7b38b204ea0af113f99ca9a67c9099" width="300" alt="顶bar效果"/>

### 使用步骤

#### 步骤一： 引入熊掌号MIP组件的SDK

在页面mip.js代码

```
<script src="https://c.mipcdn.com/static/v1/mip.js"></script>
```
之后、`</body>`标签前添加熊掌号mip组件的文件:

```html
 <script src="https://c.mipcdn.com/extensions/platform/v1/mip-cambrian/mip-cambrian.js"></script>
```

**注意：** 当使用熊掌号mip组件时，页面内的熊掌号结构化数据必须位于`mip-cambrian`代码之前。

#### 步骤二：使用熊掌号MIP组件

```html
<mip-cambrian site-id="熊掌号ID"></mip-cambrian>
```

`site-id`为熊掌号ID，请填写正确的ID，否则无法正常展现。如，熊掌号ID为123456，则使用时 为：`<mip-cambrian site-id="123456"></mip-cambrian>`

#### 步骤三：提交页面数据到百度

具体方式请咨询相关业务同学

### 效果预览

如果页面符合MIP规范，且已正确使用mip-cambrain组件，可以通过下方的方式预览效果：

* 打开[MIP PATH 转换工具](https://www.mipengine.org/mippath.html)
* 在输入框内输入页面的地址
* 在生成的mip path里，复制`百度结果页`地址，如`https://m.baidu.com/mip/c/www.mipengine.org/index.html`
* 在浏览器访问刚才复制的地址，即可看到效果

