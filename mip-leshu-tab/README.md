# mip-leshu-tab

可多层嵌套tab切换组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-leshu-tabs/mip-leshu-tab.js

## 示例

### 基本用法
```html
<mip-leshu-tab>
    <div class="leshu-tab-view">
        <div class="leshu-tab">
            <span>demo1</span>
            <span>demo2</span>
            <span>demo3</span>
        </div>
        <div class="leshu-tab-con">
            <div>demoCon1</div>
            <div>
                <div class="leshu-tab-view">
                    <div class="leshu-tab">
                        <span>demo4</span>
                        <span>demo5</span>
                        <span>demo6</span>
                    </div>
                    <div class="leshu-tab-con">
                        <div>demoCon4</div>
                        <div>demoCon5</div>
                        <div>demoCon6</div>
                    </div>
                </div>
            </div>
            <div>demoCon3</div>
        </div>
    </div>
</mip-leshu-tab>
```
## 属性

不需要指定属性，

## 注意事项
一个class类名leshu-tab-view 为一个容器节点，仅限嵌套在leshu-tab-con内的任意DIV内，即可实现多层嵌套，
leshu-tab类里面的格式只能是span其它则无效