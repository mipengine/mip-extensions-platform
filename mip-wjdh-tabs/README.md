# mip-wjdh-tabs 触摸切换组件（支持滑动）

在普通的tab切换基础上加入触屏滑动

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-wjdh-tabs/mip-wjdh-tabs.js

## 示例

### 基本用法
```html
<mip-wjdh-tabs autoPlay="true" effect="left" delayTime="200" interTime="2500" defaultIndex="0" titOnClassName="on">
    <div class="hd">
        <ul>
            <li>国内</li>
            <li>国际</li>
            <li>时事</li>
        </ul>
    </div>
    <div class="bd">
            <ul>
                <li><a href="#">官方明确感染H7N9高危人群</a></li>
                <li><a href="#">官方明确感染H7N9高危人群</a></li>
                <li><a href="#">官方明确感染H7N9高危人群</a></li>
                <li><a href="#">官方明确感染H7N9高危人群</a></li>
            </ul>
            <ul>
                <li><a href="#">日:沈阳军区部队开赴中朝边境</a></li>
                <li><a href="#">日:沈阳军区部队开赴中朝边境</a></li>
                <li><a href="#">日:沈阳军区部队开赴中朝边境</a></li>
                <li><a href="#">日:沈阳军区部队开赴中朝边境</a></li>
            </ul>
            <ul>
                <li><a href="#">农业占GDP低政府支持力度大</a></li>
                <li><a href="#">农业占GDP低政府支持力度大</a></li>
                <li><a href="#">农业占GDP低政府支持力度大</a></li>
                <li><a href="#">农业占GDP低政府支持力度大</a></li>
            </ul>
    </div>
</mip-wjdh-tabs>
```

## 属性

### autoPlay

说明：是否自动滚动  
必选项：否  
类型：boolean   
取值范围：true|false    
默认值：false   

### effect

说明：效果 || left：左滚动；|| leftLoop：左循环滚动；   
必选项：否  
类型：string    
取值范围：left|leftLoop 
默认值：left    

### delayTime

说明：切换效果持续时间（执行一次效果用多少毫秒）    
必选项：否  
类型：number    
取值范围：0-9999    
默认值：200 

### interTime

说明：自动运行间隔（隔多少毫秒后执行下一个效果）    
必选项：否  
类型：number    
取值范围：0-9999    
默认值：2500    

### defaultIndex

说明：默认的当前位置索引。0是第一个； defaultIndex:1 时，相当于从第2个开始执行  
必选项：否  
类型：number    
默认值：0   

### titOnClassName

说明：当前titCell位置自动增加的class名称    
必选项：否  
类型：string    
默认值：on  

## 注意

属性可以不填    