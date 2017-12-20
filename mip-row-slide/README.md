# mip-row-slide
mip-row-slide 横向滑动区块组件,区块可展示每个区块的对应内容

标题|内容
----|----
类型|业务,定制
支持布局|responsive,flex,container
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-row-slide/mip-row-slide.js

## 示例

### 基本用法
```html
<mip-row-slide>
    <div class="album-wrap">
        <div class="chapter-wrap row-slide-wrap">
            <div class="chapter row-slide">
                <div class="chapter-item row-slide-item">
                    <p>专辑章节标题</p>
                </div>
                <div class="chapter-item row-slide-item">
                    <p>专辑章节标题</p>
                </div>
                <div class="chapter-item row-slide-item selected">
                    <p>专辑章节标题</p>
                </div>
                ...
            </div>
        </div>
        <div class="chapter-content-wrap">
            <div class="chapter-content">
                <ul class="chapter-content-item">
                    <li class="section">
                        <a href="xxx">
                            <div class="section-thumb">
                                <mip-img layout="responsive" width="xx" height="xx" src="xxx"></mip-img>
                                <span class="icon-play"></span>
                            </div>
                            <div class="section-content">
                                <p class="section-title">该章节对应每一小节的标题</p>
                                <p class="section-time">
                                    <span class="icon-time"></span>
                                    <span class="dur-time">03:15</span>
                                </p>
                            </div>
                        </a>
                    </li>
                    ...
                </ul>
                ...
            </div>
        </div>
    </div>
</mip-row-slide>
``` 

## class说明       

### chapter-content-item
说明：该章节所对应的内容,该标签的数量与章节数量一致                                                                             

### section
说明：该章节所对应的每一小节,该标签视具体数量而定                                                                         

### section-thumb
说明：每一小节内容的缩略图                      

#### icon-play
说明：缩略图上的播放图标                            

#### section-title
说明：每一小节的标题                        

#### icon-time
说明：内容时长的图标        

#### dur-time
说明：内容时长            

## 注意事项  
- 仅针对具体业务定制,横向滑动区块组件,区块可展示每个区块的对应内容,是对tab切换和横向滑动的封装
