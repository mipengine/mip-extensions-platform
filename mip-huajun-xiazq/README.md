# mip-huajun-xiazq

mip-huajun-xiazq 用来支持本站特点id的操作

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-huajun-xiazq/mip-huajun-xiazq.js

## 示例
<mip-huajun-xiazq>
<div class="label">
    <if condition='($soft_type eq "android") and ($soft_detail.id neq 585412)'><em class="icon checkhover"></em>使用豌豆荚下载</if>
</div>
<if condition='$soft_type eq "win"'>
    <a target="_blank" id="pc_android" href="<?php echo $soft_detail['depth'] ?>" rel="nofollow" ><button class="neirongye_xzxx_btn">豌豆荚下载</button></a>
<else />
    <if condition='$no_relname eq 1'>
    <button id="download" class="neirongye_xzxx_btn" class = "ptdownload inline" >普通下载</button>
    <elseif condition = '($soft_type eq book) and ($soft_detail.id lt 1025229)' />
    <a target="_blank" id="download" href="<?php echo $soft_detail['depth'] ?>" class = "ptdownload dinline" rel="nofollow"><button class="neirongye_xzxx_btn">下载阅读王看全文</button></a>
    <elseif condition = '($soft_type eq book) and ($soft_detail.id egt 1025229)' />
    <a target="_blank" id="download" href="<?php echo $soft_detail['depth'] ?>" class = "ptdownload dinline" rel="nofollow"><button class="neirongye_xzxx_btn">下载快雷阅读器看全文</button></a>
    <else />
    <a target="_blank" id="download" href="<?php echo $soft_detail['depth'] ?>" class = "ptdownload dinline" rel="nofollow"><button class="neirongye_xzxx_btn">普通下载</button></a>
    </if>
</if>
<?php if ($soft_type=="android") { ?>
<a id="spdownload" href="<?php echo $soft_detail['jsdown'] ?>" class = "spdownload hide" ><button class="neirongye_xzxx_btn">豌豆荚下载</button></a>
<?php }?>
<div class="tx_text">
    <if condition='$soft_type eq "android"'><p class="text1" class = "dinline" >使用普通下载无法避免流量劫持，下载较慢等问题，建议选择极速下载安全高速下载！</p>
    <p class="text2 hide" >豌豆荚应用市场，将为您提供豌豆荚极速的下载体验，应用种类繁多，安全无毒。</p></if>
    <if condition='$no_relname eq 1'><p>该软件暂时未落实实名认证信息，暂不提供下载，敬请谅解！后续进展华军软件园会持续跟踪，敬请期待！</p></if>
</div>
</mip-huajun-xiazq>
### 基本用法
```html
<mip-huajun-xiazq>
    自定义内容，可以嵌套其他组件
</mip-huajun-xiazq>
```

