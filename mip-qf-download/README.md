# mip-qf-download mip-七风-下载组件。

湖南七风的 web 端下载逻辑。

标题|内容
----|----
类型|通用
支持布局|responsive, fixed-height, fill, container, fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-download/mip-qf-download.js

## 示例

- `apk-href` android 原始下载链接
- `class-disabled` 缺少下载链接时增加类
- `ipa-href` ios 原始下载链接
- `ipa-prefix-mb` ios 越狱包手机百度下载地址前缀。
- `ipa-prefix-nonmb` ios 越狱包非手机百度下载地址前缀。
- `prefix` ios 越狱包非手机百度下载地址前缀。

```html
<mip-qf-download apk-href="fgame/dlstat?gid=158471&type=apk" class-disabled="btn-disabled" ipa-href="fgame/dlstat?gid=158471&type=ipa&cp=6&jailbreak=N" ipa-prefix-mb="guide/mbInstruction.shtml?link=/" ipa-prefix-nonmb="guide/usInstruction.shtml?link=/" on="wechat:wechatmaskid.open" prefix="https://mtest.119you.com/">
    <a>安卓 / ios官方包下载按钮</a>
</mip-qf-download>

<mip-qf-download apk-href="fgame/dlstat?gid=158471&type=apk" class-disabled="btn-disabled" ipa-href="fgame/dlstat?gid=158471&type=ipa&cp=6&jailbreak=Y" ipa-prefix-mb="guide/mbInstruction.shtml?link=/" ipa-prefix-nonmb="guide/usInstruction.shtml?link=/" on="wechat:wechatmaskid.open" prefix="https://mtest.119you.com/">
    <a>安卓 / ios越狱包下载按钮</a>
</mip-qf-download>

<mip-qf-download apk-href="" class-disabled="btn-disabled" ipa-href="" ipa-prefix-mb="guide/mbInstruction.shtml?link=/" ipa-prefix-nonmb="guide/usInstruction.shtml?link=/" on="wechat:wechatmaskid.open" prefix="https://mtest.119you.com/">
    <a>安卓 / ios 空下载按钮</a>
</mip-qf-download>
```
