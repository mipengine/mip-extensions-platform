# mip-nph

mip-nph 组件说明

标题|内容
----|----
类型|通用
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-nph/mip-nph.js

## 示例

### 基本用法
```html
<mip-nph>
    <script type="application/json">
        [{
            "selector" : ".j_sinanews",
            "config" : {
                "iosNativeUrl":"sinanews://params={\"id\":\"2841-91938-hdpic\"}",
                "androidNativeUrl":"sinanews://params={\"id\":\"2841-91938-hdpic\"}",
                "downloadswitch":"1",
                "iosInstallUrl":"https://so.sina.cn/palmnews/?id=145&cu_pos=0000&cu_domain=&cu_type=index",
                "androidInstallUrl":"https://so.sina.cn/palmnews/?id=145&cu_pos=0000&cu_domain=&cu_type=index",
                "ios9Url":"http://sapi.sina.cn/Callup.php?newsid=2841-91938-hdpic",
                "ios9Weixin":"http://sapi.sina.cn/Callup.php?golinkUrl=http%3A%2F%2Fa.app.qq.com%2Fo%2Fsimple.jsp%3Fpkgname%3Dcom.sina.news%26ckey%3DCK1346428841879",
                "openByWeixin":"http://a.app.qq.com/o/simple.jsp?pkgname=com.sina.news&ckey=CK1346428841879"
            }
        },
        {
            "selector" : ".j_wy",
            "config" : {
                "iosNativeUrl":"newsapp://doc/CP34KA5O0001899N?s=news_wap_doclist",
                "androidNativeUrl":"newsapp://doc/CP34KA5O0001899N?s=news_wap_doclist",
                "downloadswitch":"1",
                "iosInstallUrl":"https://download.ws.126.net/3g/client/newsreader_news_wap_doclist.apk",
                "androidInstallUrl":"https://download.ws.126.net/3g/client/newsreader_news_wap_doclist.apk",
                "ios9Url":"http://m.163.com/newsapp/applinks.html?path=%2Fdoc%2FCP34KA5O0001899N&s=sps_ulink&ss=news_wap_doclist",
                "ios9Weixin":"https://download.ws.126.net/3g/client/newsreader_news_wap_doclist.apk",
                "openByWeixin":"https://download.ws.126.net/3g/client/newsreader_news_wap_doclist.apk"
            }
        }
        ]
    </script>
</mip-nph>
```

## 属性

### {selector}
说明：{选择器}  
必选项：{是}

### {config}
说明：{呼起参数}  
必选项：{是}
