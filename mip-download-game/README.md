# mip-download-game

mip-download-game 点击进行游戏异步下载的按钮

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-download-game/mip-download-game.js

## 示例

### 基本用法
```html
<style>
	#dialog{position:fixed;background:#999;padding:.8em 0;z-index:100000;border-radius:5px;display:none;}
	#dialog p{padding:0 2em;color:#FFF;font-size:1.5em}
</style>
<span class="welfare_download_a">
	<mip-download-game class="download_game" game_id="8" mobile_domain="http://127.0.0.1/qdazzle_home/mobile/">
		点击下载
	</mip-download-game>
</span>
<mip-stats-baidu>
    <script type="application/json">
        {
            "token": "3ea8e396cbe13315220a28aac8d18a50",
            "_setCustomVar": [1, "login", "1", 2],
            "_setAutoPageview": [true]
        }
    </script>
</mip-stats-baidu>
<mip-stats-baidu token="3ea8e396cbe13315220a28aac8d18a50"></mip-stats-baidu>
<script src="https://mipcache.bdstatic.com/static/v1/mip-stats-baidu/mip-stats-baidu.js"></script><!--百度统计-->
```

## 属性1

### game_id

说明：游戏id值
必选项：是
类型：字符串
取值范围：字符串
默认值：无

## 注意事项

## 属性2

### mobile_domain

说明：下载路径域名
必选项：是
类型：字符串
取值范围：字符串
默认值：无

## 注意事项


