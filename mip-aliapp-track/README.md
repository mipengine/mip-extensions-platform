# mip-aliapp-track

mip-aliapp-track 为阿里应用分发移动端页实现了统计功能

标题|内容
----|----
类型|业务
支持布局|不使用布局
所需脚本|https://c.mipcdn.com/static/v1/mip-netease-tracker/mip-aliapp-track.js

## 示例

### 基本使用

```html
<body>
<div class="log-param-f pageview-log" param-f="detail" data-app-id="7701857"></div>
<div class="log-param-f" param-f="detail_rec">
    <a data-app-id="7701857" data-app-vid="200677543" data-app-name="绝地求生：刺激战场" data-app-pname="com.tencent.tmgp.pubgmhd" data-app-vcode="5351" data-app-vname="0.8.6" data-app-icon="http://android-artworks.25pp.com/fs08/2018/07/05/1/109_ce446dd849b85e0f98e4f37f622f729d_con_130x130.png" data-app-rtype="1" class="install-btn download-log" href="http://127.0.0.1:7012/apps/com.tencent.tmgp.pubgmhd/binding?source=wap_baidu_mip_download">安全下载</a>
</div>
<div class="log-param-f" param-f="detail_abc">
    <a data-app-id="7701857" data-app-vid="200677543" data-app-name="绝地求生：刺激战场" data-app-pname="com.tencent.tmgp.pubgmhd" data-app-vcode="5351" data-app-vname="0.8.6" data-app-icon="http://android-artworks.25pp.com/fs08/2018/07/05/1/109_ce446dd849b85e0f98e4f37f622f729d_con_130x130.png" data-app-rtype="1" class="install-btn click-log">点击安全下载</a>
</div>
<mip-aliapp-track>
<script type="application/json">
{
    "host": "https://track.uc.cn",
    "path": "/collect",
    "ppz": "5",
    "setting": {
        "click": {
            "selector": ".click-log"
        },
        "download": {
            "selector": ".download-log"
        },
        "pageview": {
            "selector": ".pageview-log"
        }
    }
}
</script>
</mip-aliapp-track>
</body>
```

## 属性

无