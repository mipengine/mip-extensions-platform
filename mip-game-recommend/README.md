# mip-game-recommend

mip-game-recommend 游戏下载组件

标题|内容
----|----
类型|通用
支持布局|fill,container
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-game-recommend/mip-game-recommend.js

## 示例

### 基本用法
```html
<mip-game-recommend src="xxx">
<div class="game-recommend-hd">大家还在玩</div>
<div class="game-recommend-bd">
    <div class="iscoll-container" data-role="games-container">
    </div>
</div>
<template type="mip-mustache">
    <ul>
        {{#gameList}}
        <li class="game-item">
            <div class="item-detail">
                <a href="{{detailUrl}}" target="_blank">
                    <mip-img
                        layout="responsive" 
                        height="120"
                        width="120"
                        src={{img}}>
                    </mip-img>
                </a>
                <p class="name">{{name}}</p>
                <p class="des">{{type}} {{size}}</p>
                <a href={{downloadUrl}} class="game-download" target="_blank">下载</a>
            </div>
        </li>
        {{/gameList}}
    </ul>
</template>
</mip-game-recommend>
```

### 同步数据

```html
<mip-game-recommend synchronous-data>
<script type="application/json">
{
    "gameList": [
       {
           "name": "永恒纪元12",
           "androidUrl": "http://gdown.baidu.com/data/wisegame/9dc8397fbf5b1abe/meila_2050405.apk",
           "iosUrl": "https://itunes.apple.com/cn/app/mei-la/id624943498",
           "img": "http://image.diyiyou.com/game/201708/19163329yr7s.png",
           "size": "151M",
           "type": "角色",
           "detailUrl": "https://mobile.baidu.com/item?docid=22095760"
       },
       {
           "name": "卧虎藏龙贰",
           "androidUrl": "http://gdown.baidu.com/data/wisegame/9dc8397fbf5b1abe/meila_2050405.apk",
           "iosUrl": "https://itunes.apple.com/cn/app/mei-la/id624943498",
           "img": "http://image.diyiyou.com/game/201704/14114503ttyc.png",
           "size": "557M",
           "type": "角色",
           "detailUrl": "https://mobile.baidu.com/item?docid=22095760"
       },
       {
           "name": "王者传奇",
           "androidUrl": "http://gdown.baidu.com/data/wisegame/9dc8397fbf5b1abe/meila_2050405.apk",
           "iosUrl": "https://itunes.apple.com/cn/app/mei-la/id624943498",
           "img": "http://image.diyiyou.com/game/201708/182148054ent.png",
           "size": "168M",
           "type": "角色",
           "detailUrl": "https://mobile.baidu.com/item?docid=22095760"
       },
       {
           "name": "诛仙手游",
           "androidUrl": "http://gdown.baidu.com/data/wisegame/9dc8397fbf5b1abe/meila_2050405.apk",
           "iosUrl": "https://itunes.apple.com/cn/app/mei-la/id624943498",
           "img": "http://image.diyiyou.com/game/201707/05194528nijf.png",
           "size": "654M",
           "type": "角色",
           "detailUrl": "https://mobile.baidu.com/item?docid=22095760"
       },
       {
           "name": "诛仙手游",
           "androidUrl": "http://gdown.baidu.com/data/wisegame/9dc8397fbf5b1abe/meila_2050405.apk",
           "iosUrl": "https://itunes.apple.com/cn/app/mei-la/id624943498",
           "img": "http://image.diyiyou.com/game/201707/05194528nijf.png",
           "size": "654M",
           "type": "角色",
           "detailUrl": "https://mobile.baidu.com/item?docid=22095760"
       },
       {
           "name": "诛仙手游",
           "androidUrl": "http://gdown.baidu.com/data/wisegame/9dc8397fbf5b1abe/meila_2050405.apk",
           "iosUrl": "https://itunes.apple.com/cn/app/mei-la/id624943498",
           "img": "http://image.diyiyou.com/game/201707/05194528nijf.png",
           "size": "654M",
           "type": "角色",
           "detailUrl": "https://mobile.baidu.com/item?docid=22095760"
       },
       {
           "name": "诛仙手游",
           "androidUrl": "http://gdown.baidu.com/data/wisegame/9dc8397fbf5b1abe/meila_2050405.apk",
           "iosUrl": "https://itunes.apple.com/cn/app/mei-la/id624943498",
           "img": "http://image.diyiyou.com/game/201707/05194528nijf.png",
           "size": "654M",
           "type": "角色",
           "detailUrl": "https://mobile.baidu.com/item?docid=22095760"
       },
       {
           "name": "诛仙手游",
           "androidUrl": "http://gdown.baidu.com/data/wisegame/9dc8397fbf5b1abe/meila_2050405.apk",
           "iosUrl": "https://itunes.apple.com/cn/app/mei-la/id624943498",
           "img": "http://image.diyiyou.com/game/201707/05194528nijf.png",
           "size": "654M",
           "type": "角色",
           "detailUrl": "https://mobile.baidu.com/item?docid=22095760"
       }
   ]
}
</script>
<div class="game-recommend-hd">大家还在玩</div>
<div class="game-recommend-bd">
    <div class="iscoll-container" data-role="games-container">
    </div>
</div>
<template type="mip-mustache">
    <ul>
        {{#gameList}}
        <li class="game-item">
            <div class="item-detail">
                <a href="{{detailUrl}}" target="_blank">
                    <mip-img
                        layout="responsive" 
                        height="120"
                        width="120"
                        src={{img}}>
                    </mip-img>
                </a>
                <p class="name">{{name}}</p>
                <p class="des">{{type}} {{size}}</p>
                <a href={{downloadUrl}} class="game-download" target="_blank">下载</a>
            </div>
        </li>
        {{/gameList}}
    </ul>
</template>
</mip-game-recommend>

## 属性

### src

说明：异步请求的数据接口    
必选项：否    
类型：字符串    
取值范围：无  
单位：无    
默认值：无

### synchronous-data

说明：使用同步数据开关属性    
必选项：否    
类型：字符串    
取值范围：无    
单位：无    
默认值：无 

## 注意事项

